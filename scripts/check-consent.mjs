/**
 * Behaviour checks for src/lib/consent.ts: a stored choice is re-applied as
 * it was made, and storage that throws never takes the page down.
 *
 * It bundles the real module with posthog-js swapped for a recorder, and runs
 * it against a fake window, so no browser is needed.
 *
 *   npm run check:consent
 */

import { build } from "esbuild";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { rm } from "node:fs/promises";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "node_modules", ".cache", "consent-check.mjs");

await build({
  entryPoints: [join(root, "src", "lib", "consent.ts")],
  outfile: out,
  bundle: true,
  format: "esm",
  platform: "neutral",
  logLevel: "warning",
  plugins: [
    {
      name: "posthog-stub",
      setup(b) {
        b.onResolve({ filter: /^posthog-js$/ }, () => ({
          path: "posthog",
          namespace: "stub",
        }));
        b.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
          contents: `export default {
            opt_in_capturing: () => globalThis.__calls.push("ph:in"),
            opt_out_capturing: () => globalThis.__calls.push("ph:out"),
          };`,
        }));
      },
    },
  ],
});

const KEY = "upspeech_cookie_consent";
let store = {};
const memoryStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => {
    store[k] = String(v);
  },
  removeItem: (k) => {
    delete store[k];
  },
};
const throwingStorage = {
  getItem: () => {
    throw new Error("SecurityError");
  },
  setItem: () => {
    throw new Error("SecurityError");
  },
  removeItem: () => {
    throw new Error("SecurityError");
  },
};

globalThis.__calls = [];
globalThis.window = globalThis;
globalThis.gtag = (cmd, action, cfg) => globalThis.__calls.push(["gtag", cfg]);
globalThis.clarity = () => {};
globalThis.localStorage = memoryStorage;

const consent = await import(pathToFileURL(out).href + `?t=${Date.now()}`);

const results = [];
const check = (name, pass, detail) => results.push({ name, pass, detail });
const lastGtag = () =>
  globalThis.__calls.filter((c) => Array.isArray(c)).at(-1)?.[1];

// 1. Re-applying an analytics-only choice keeps advertising denied and leaves
// the stored timestamp alone.
const stored = { analytics: true, advertising: false, timestamp: 1 };
store = { [KEY]: JSON.stringify(stored) };
globalThis.__calls = [];
consent.applyConsent(consent.getConsentState());
check(
  "analytics-only stays analytics-only on load",
  lastGtag()?.analytics_storage === "granted" &&
    lastGtag()?.ad_storage === "denied" &&
    globalThis.__calls.includes("ph:in"),
  JSON.stringify(globalThis.__calls),
);
check(
  "loading does not rewrite the stored choice",
  store[KEY] === JSON.stringify(stored),
  store[KEY],
);

// 2. A stored decline re-applies as a decline.
store = { [KEY]: JSON.stringify({ analytics: false, advertising: false }) };
globalThis.__calls = [];
consent.applyConsent(consent.getConsentState());
check(
  "a stored decline opts PostHog out",
  globalThis.__calls.includes("ph:out") &&
    lastGtag()?.analytics_storage === "denied",
  JSON.stringify(globalThis.__calls),
);

// 3. Grant writes a full choice.
store = {};
consent.grantConsent();
check(
  "grant stores analytics and advertising",
  JSON.parse(store[KEY] ?? "{}").advertising === true,
  store[KEY],
);

// 4. Storage that throws.
globalThis.localStorage = throwingStorage;
let threw = null;
try {
  check("hasConsent is false", consent.hasConsent() === false, "");
  check("getConsentState is null", consent.getConsentState() === null, "");
  consent.grantConsent();
  consent.denyConsent();
  consent.clearConsent();
} catch (err) {
  threw = err;
}
check("nothing throws when storage does", threw === null, String(threw));

await rm(out, { force: true });

let failed = 0;
for (const { name, pass, detail } of results) {
  console.log(
    `${pass ? "PASS" : "FAIL"}  ${name}${pass ? "" : `  (got: ${detail})`}`,
  );
  if (!pass) failed++;
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
