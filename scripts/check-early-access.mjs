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
  profile: "therapist",
  request: "early",
  consent: true,
  locale: "pt",
};
const WAITLIST = {
  email: "maria@example.com",
  profile: "patient",
  request: "waitlist",
  companion: "lumo",
  consent: true,
  locale: "en",
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

// 10. Campaign tags reach the sheet row and the team email
globalThis.fetch = realFetch;
const captureBodies = () => {
  const bodies = {};
  const stubbed = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    const u = String(url);
    if (u.includes("script.google.com")) bodies.sheet = JSON.parse(init.body);
    if (u.includes("/emails")) {
      const b = JSON.parse(init.body);
      if (b.to[0].includes("hello@")) bodies.team = b.text;
    }
    return stubbed(url, init);
  };
  return bodies;
};
stub({});
let bodies = captureBodies();
await handler(
  POST({
    ...LEAD,
    source: "linkedin",
    medium: "social\nx",
    campaign: "autumn-slp",
    content: "c".repeat(300),
  }),
);
check(
  "sheet row carries source, medium, campaign and content",
  bodies.sheet?.source === "linkedin" &&
    bodies.sheet?.medium === "social x" &&
    bodies.sheet?.campaign === "autumn-slp" &&
    bodies.sheet?.content.length === 100,
  JSON.stringify(bodies.sheet),
);
check(
  "team email names the campaign",
  bodies.team?.includes("linkedin / social x / autumn-slp"),
  bodies.team,
);

stub({});
bodies = captureBodies();
await handler(POST(LEAD));
check(
  "untagged lead writes empty campaign cells",
  bodies.sheet?.source === "" && bodies.sheet?.campaign === "",
  JSON.stringify(bodies.sheet),
);
check(
  "untagged lead is marked in the team email",
  bodies.team?.includes("Campaign: Untagged"),
  bodies.team,
);

// 11. A value Sheets would run as a formula reaches the row as text
stub({});
bodies = captureBodies();
await handler(
  POST({
    ...LEAD,
    name: '=HYPERLINK("https://example.com","x")',
    source: "=1+1",
    campaign: "@sum",
    medium: "social",
  }),
);
check(
  "formula-looking cells reach the sheet escaped",
  bodies.sheet?.name === `'=HYPERLINK("https://example.com","x")` &&
    bodies.sheet?.source === "'=1+1" &&
    bodies.sheet?.campaign === "'@sum" &&
    bodies.sheet?.medium === "social",
  JSON.stringify(bodies.sheet),
);
check(
  "the team email shows the value without the apostrophe",
  bodies.team?.includes("=1+1") && !bodies.team?.includes("'=1+1"),
  bodies.team,
);

// 12. The join flow's audiences and requests
stub({});
r = await handler(POST(WAITLIST));
check(
  "waiting list with no name -> 200, contact added",
  r.statusCode === 200 && calls.includes("audience"),
  `${r.statusCode} ${calls.join(",")}`,
);

stub({});
r = await handler(POST({ ...WAITLIST, consent: false }));
check(
  "waiting list without consent -> 422, nothing sent",
  r.statusCode === 422 && calls.length === 0,
  `${r.statusCode} ${calls.join(",")}`,
);

stub({});
r = await handler(
  POST({
    ...LEAD,
    request: "demo",
    demoWhen: "stand",
    demoSlot: "15:30",
    consent: false,
  }),
);
check(
  "demo without consent -> 200, no contact, both emails",
  r.statusCode === 200 &&
    !calls.includes("audience") &&
    calls.includes("team-email") &&
    calls.includes("applicant-email"),
  `${r.statusCode} ${calls.join(",")}`,
);

stub({});
r = await handler(POST({ ...LEAD, request: "demo", demoWhen: "stand" }));
check(
  "demo at the stand with no time -> 422",
  r.statusCode === 422,
  r.statusCode,
);

stub({});
r = await handler(POST({ ...LEAD, request: "waitlist" }));
check(
  "therapist on the waiting list -> 422",
  r.statusCode === 422,
  r.statusCode,
);

stub({});
r = await handler(POST({ ...WAITLIST, request: "pilot" }));
check("patient asking for a pilot -> 422", r.statusCode === 422, r.statusCode);

stub({});
bodies = captureBodies();
await handler(
  POST({
    ...WAITLIST,
    profile: "referrer",
    shareCode: "k7q2ab",
    referredBy: "<script>",
  }),
);
check(
  "share code kept, junk referral dropped",
  bodies.sheet?.shareCode === "k7q2ab" && bodies.sheet?.referredBy === "",
  JSON.stringify(bodies.sheet),
);
check(
  "sheet gets English labels for profile and request",
  bodies.sheet?.role === "Friend or supporter" &&
    bodies.sheet?.request === "Waiting list" &&
    bodies.sheet?.updates === "Yes",
  JSON.stringify(bodies.sheet),
);

// 13. Details from the confirmation page: one sheet row, nothing sent
stub({});
bodies = captureBodies();
r = await handler(
  POST({
    kind: "details",
    email: "maria@example.com",
    country: "Portugal",
    interests: ["Stuttering", "Not sure yet"],
  }),
);
check(
  "details -> 200, sheet only",
  r.statusCode === 200 && calls.join(",") === "sheet",
  `${r.statusCode} ${calls.join(",")}`,
);
check(
  "details row carries country and interests",
  bodies.sheet?.request === "Details" &&
    bodies.sheet?.country === "Portugal" &&
    bodies.sheet?.interests === "Stuttering, Not sure yet",
  JSON.stringify(bodies.sheet),
);

stub({});
r = await handler(POST({ kind: "details", email: "nope" }));
check("details with a bad email -> 422", r.statusCode === 422, r.statusCode);

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
