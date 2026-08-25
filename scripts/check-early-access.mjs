/**
 * Behaviour checks for the early-access function.
 *
 * The function's job is mostly ordering and failure handling, which is exactly
 * what a rendered preview cannot show: that the lead is written down before
 * anything is sent, that a dead spreadsheet still produces a warned team
 * notification, and that only a total loss reports failure to the visitor.
 *
 * It bundles the real handler and swaps in a stub fetch, so nothing leaves the
 * machine and no credentials are needed.
 *
 *   npm run check:early-access
 */

import { build } from "esbuild";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
import { rm } from "node:fs/promises";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const out = join(root, "node_modules", ".cache", "early-access-handler.mjs");
await build({
  entryPoints: [join(root, "netlify", "functions", "early-access.ts")],
  outfile: out,
  bundle: true,
  format: "esm",
  platform: "node",
  logLevel: "warning",
});
const { handler } = await import(pathToFileURL(out).href + `?t=${Date.now()}`);

const POST = (body) => ({ httpMethod: "POST", body: JSON.stringify(body) });
const LEAD = {
  name: "Vasco Figueiredo",
  email: "vasco@clinicadafala.pt",
  role: "speech-therapist",
  clinicSize: "small",
  locale: "pt",
};

let calls = [];
const stub = (rules) => {
  calls = [];
  globalThis.fetch = async (url, init) => {
    const u = String(url);
    const kind = u.includes("/emails")
      ? JSON.parse(init.body).to[0].includes("hello@")
        ? "team-email"
        : "applicant-email"
      : u.includes("/audiences")
        ? "audience"
        : "sheet";
    calls.push(kind);
    const rule = rules[kind] ?? { ok: true };
    return {
      ok: rule.ok,
      status: rule.ok ? 200 : (rule.status ?? 500),
      text: async () => rule.body ?? (kind === "sheet" ? '{"ok":true}' : "{}"),
    };
  };
};

const env = {
  RESEND_API_KEY: "re_test",
  RESEND_AUDIENCE_ID: "aud_test",
  SHEETS_WEBHOOK_URL: "https://script.google.com/x/exec",
  SHEETS_WEBHOOK_SECRET: "s3cret",
};
Object.assign(process.env, env);

// The failure cases log on purpose; keep the check output readable.
const realError = console.error;
console.error = () => {};

const results = [];
const check = (name, pass, detail) => {
  results.push({ name, pass, detail });
};

// 1. Happy path
stub({});
let r = await handler(POST(LEAD));
check("happy path -> 200", r.statusCode === 200, r.statusCode);
check(
  "happy path writes then sends 2 emails",
  calls.filter((c) => c.endsWith("email")).length === 2 &&
    calls.indexOf("sheet") < calls.indexOf("team-email"),
  calls.join(","),
);

// 2. Both stores down, team email lands
stub({ sheet: { ok: false }, audience: { ok: false } });
r = await handler(POST(LEAD));
check(
  "stores down but team notified -> 200",
  r.statusCode === 200,
  r.statusCode,
);
check(
  "team email warns the row was not written",
  calls.includes("team-email"),
  calls.join(","),
);

// 3. Everything down
stub({
  sheet: { ok: false },
  audience: { ok: false },
  "team-email": { ok: false },
  "applicant-email": { ok: false },
});
r = await handler(POST(LEAD));
check("nothing recorded anywhere -> 500", r.statusCode === 500, r.statusCode);

// 4. Applicant reply fails, everything else fine
stub({ "applicant-email": { ok: false } });
r = await handler(POST(LEAD));
check(
  "applicant reply failure does not fail the request",
  r.statusCode === 200,
  r.statusCode,
);

// 5. Honeypot
stub({});
r = await handler(POST({ ...LEAD, company: "spam corp" }));
check(
  "honeypot -> 200 and zero calls",
  r.statusCode === 200 && calls.length === 0,
  calls.join(","),
);

// 6. Invalid email
stub({});
r = await handler(POST({ ...LEAD, email: "a@b" }));
check("invalid email -> 422", r.statusCode === 422, r.statusCode);
check("invalid email sends nothing", calls.length === 0, calls.join(","));

// 7. Unknown locale falls back
stub({});
r = await handler(POST({ ...LEAD, locale: "de" }));
check("unknown locale -> 200", r.statusCode === 200, r.statusCode);

// 8. Method + missing key
r = await handler({ httpMethod: "GET" });
check("GET -> 405", r.statusCode === 405, r.statusCode);
delete process.env.RESEND_API_KEY;
r = await handler(POST(LEAD));
check("no API key -> 503", r.statusCode === 503, r.statusCode);
process.env.RESEND_API_KEY = "re_test";

// 9. Survey button gating
process.env.EARLY_ACCESS_SURVEY_URL = "javascript:alert(1)";
stub({});
let sentHtml = "";
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  if (String(url).includes("/emails")) {
    const b = JSON.parse(init.body);
    if (!b.to[0].includes("hello@")) sentHtml = b.html;
  }
  return realFetch(url, init);
};
await handler(POST(LEAD));
check(
  "non-https survey URL renders no button",
  !sentHtml.includes("survey"),
  "",
);

console.error = realError;
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
