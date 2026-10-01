/**
 * Behaviour checks for the campaign capture in src/lib/utm.ts, which the site
 * has no test runner for. It bundles the real module and runs it against a
 * stubbed sessionStorage.
 *
 *   npm run check:utm
 */

import { build } from "esbuild";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { rm } from "node:fs/promises";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "node_modules", ".cache", "utm-module.mjs");
await build({
  entryPoints: [join(root, "src", "lib", "utm.ts")],
  outfile: out,
  bundle: true,
  format: "esm",
  platform: "node",
  logLevel: "warning",
});
const { captureCampaign, getCampaign, leadEventProperties } = await import(
  pathToFileURL(out).href + `?t=${Date.now()}`
);

let store = new Map();
let blocked = false;
globalThis.sessionStorage = {
  getItem: (k) => {
    if (blocked) throw new Error("SecurityError");
    return store.has(k) ? store.get(k) : null;
  },
  setItem: (k, v) => {
    if (blocked) throw new Error("SecurityError");
    store.set(k, String(v));
  },
};
const reset = () => {
  store = new Map();
  blocked = false;
};

let failures = 0;
const check = (name, actual, expected) => {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`  ok   ${name}`);
  } else {
    failures++;
    console.log(`  FAIL ${name}\n       expected ${e}\n       got      ${a}`);
  }
};

reset();
captureCampaign("?utm_source=linkedin&utm_medium=social&utm_campaign=autumn");
check("captures the tags", getCampaign(), {
  source: "linkedin",
  medium: "social",
  campaign: "autumn",
});

captureCampaign("?ref=nothing");
check(
  "an untagged visit keeps the earlier tags",
  getCampaign().source,
  "linkedin",
);

reset();
captureCampaign(`?utm_content=${"a".repeat(150)}`);
check("cuts a value at 100 characters", getCampaign().content.length, 100);

reset();
captureCampaign(
  "?utm_campaign=" + encodeURIComponent("lançamento‮evil<b>\u0007 2026_q4"),
);
check(
  "drops control characters, bidi marks and markup, keeps letters",
  getCampaign().campaign,
  "lançamentoevilb 2026_q4",
);

reset();
captureCampaign("?utm_source=" + encodeURIComponent("‮\u0007"));
check("a value with nothing allowed is not stored", getCampaign(), {});

reset();
blocked = true;
captureCampaign("?utm_source=linkedin");
check("blocked storage neither throws nor returns tags", getCampaign(), {});

reset();
store.set("upspeech_campaign", "{not json");
check("corrupt storage reads as no campaign", getCampaign(), {});

reset();
store.set("upspeech_campaign", JSON.stringify({ source: 4, medium: "x" }));
check("ignores a stored value that is not a string", getCampaign(), {
  medium: "x",
});

check(
  "the lead event never carries the typed name or email",
  Object.keys(
    leadEventProperties(
      {
        name: "Ana Silva",
        email: "ana@example.com",
        role: "speech-therapist",
        clinicSize: "small",
        company: "",
      },
      { source: "a", medium: "b", campaign: "c", content: "d" },
    ),
  ).sort(),
  ["campaign", "clinic_size", "content", "medium", "role", "source"],
);
check(
  "an unanswered clinic size is left out",
  leadEventProperties({ role: "other", clinicSize: "" }, {}).clinic_size,
  undefined,
);

await rm(out, { force: true });
if (failures) {
  console.log(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log("\nall utm checks passed");
