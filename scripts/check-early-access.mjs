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

// 13. Details from the confirmation page: one sheet row, nothing sent, and
// only with the token the sign-up returned.
stub({});
r = await handler(POST(WAITLIST));
const token = JSON.parse(r.body).token;
check(
  "a sign-up returns a details token",
  typeof token === "string" && token.length === 32,
  r.body,
);

const DETAILS = {
  kind: "details",
  email: "maria@example.com",
  token,
  country: "PT",
  interests: ["Stuttering", "Not sure yet"],
};

stub({});
bodies = captureBodies();
r = await handler(POST(DETAILS));
check(
  "details -> 200, sheet only",
  r.statusCode === 200 && calls.join(",") === "sheet",
  `${r.statusCode} ${calls.join(",")}`,
);
check(
  "details row carries country and interests",
  bodies.sheet?.request === "Details" &&
    bodies.sheet?.country === "PT" &&
    bodies.sheet?.interests === "Stuttering, Not sure yet",
  JSON.stringify(bodies.sheet),
);

stub({});
r = await handler(POST({ ...DETAILS, token: undefined }));
check(
  "details without a token -> 403, nothing written",
  r.statusCode === 403 && calls.length === 0,
  `${r.statusCode} ${calls.join(",")}`,
);

stub({});
r = await handler(POST({ ...DETAILS, email: "someone@else.com" }));
check(
  "details token for another address -> 403",
  r.statusCode === 403 && calls.length === 0,
  `${r.statusCode} ${calls.join(",")}`,
);

stub({});
r = await handler(POST({ kind: "details", email: "nope", token }));
check("details with a bad email -> 422", r.statusCode === 422, r.statusCode);

stub({ sheet: { ok: false } });
r = await handler(POST(DETAILS));
check("details with the sheet down -> 500", r.statusCode === 500, r.statusCode);

stub({});
bodies = captureBodies();
await handler(
  POST({
    ...DETAILS,
    country: "=1+1",
    interests: ["a", "b", "c", "d", "e", "f", "g"],
  }),
);
check(
  "details escapes formulas and keeps five interests",
  bodies.sheet?.country === "'=1+1" &&
    bodies.sheet?.interests === "a, b, c, d, e",
  JSON.stringify(bodies.sheet),
);

stub({});
r = await handler(POST({ ...DETAILS, company: "spam corp" }));
check(
  "details honeypot -> 200 and zero calls",
  r.statusCode === 200 && calls.length === 0,
  `${r.statusCode} ${calls.join(",")}`,
);

// 14. Every validation rule, one row each: [label, lead, expected status]
const CASES = [
  ["early access without consent", { ...LEAD, consent: false }, 422],
  ["no profile", { ...LEAD, profile: undefined }, 422],
  ["unknown request", { ...LEAD, request: "vip" }, 422],
  ["demo with only an email", { ...LEAD, request: "demo" }, 200],
  ["pilot without consent", { ...LEAD, request: "pilot", consent: false }, 200],
  [
    "parent asking for early access",
    { ...WAITLIST, profile: "caregiver", request: "early" },
    422,
  ],
  ["email with a display name", { ...LEAD, email: "Evil<victim@x.com>" }, 422],
  ["email with a query", { ...LEAD, email: "a@b.com?cc=c@d.com" }, 422],
];
for (const [label, lead, expected] of CASES) {
  stub({});
  r = await handler(POST(lead));
  check(`${label} -> ${expected}`, r.statusCode === expected, r.statusCode);
}

stub({});
r = await handler(POST({ ...LEAD, request: "pilot", consent: false }));
check(
  "pilot without consent adds no contact",
  !calls.includes("audience"),
  calls.join(","),
);

stub({ sheet: { ok: false }, "team-email": { ok: false } });
r = await handler(POST({ ...LEAD, request: "demo", consent: false }));
check(
  "no consent, sheet and team email down -> 500",
  r.statusCode === 500,
  r.statusCode,
);

// 15. What the team email and the applicant email say
const captureEmails = () => {
  const mail = {};
  const stubbed = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (String(url).includes("/emails")) {
      const b = JSON.parse(init.body);
      if (b.to[0].includes("hello@")) mail.team = b;
      else mail.applicant = b;
    }
    return stubbed(url, init);
  };
  return mail;
};

stub({});
let mail = captureEmails();
await handler(
  POST({
    ...LEAD,
    request: "demo",
    consent: false,
    clinic: "Clinica da Fala",
  }),
);
check(
  "team email names the demo request",
  mail.team?.subject === "Demo: Vasco Figueiredo" &&
    mail.team?.text.includes("Request: Demo") &&
    mail.team?.text.includes("Clinic: Clinica da Fala"),
  mail.team?.subject + " | " + mail.team?.text,
);
check(
  "team email says the person skipped email updates",
  mail.team?.text.includes("Email updates: No") &&
    mail.team?.text.includes("Resend audience: no email updates"),
  mail.team?.text,
);
check(
  "team email has no share or referral lines when there are none",
  !mail.team?.text.includes("Share code:") &&
    !mail.team?.text.includes("Referred by:"),
  mail.team?.text,
);
check(
  "demo applicant gets the demo intro and the request row",
  mail.applicant?.text.includes("Pedido: Demonstração") &&
    mail.applicant?.text.includes("combinar uma hora"),
  mail.applicant?.text,
);

stub({});
mail = captureEmails();
await handler(POST({ ...LEAD, request: "pilot", clinicSize: "small" }));
check(
  "pilot emails carry the team size",
  mail.team?.text.includes("Team: 2-5 Therapists") &&
    mail.applicant?.text.includes("Terapeutas envolvidos: 2-5 Terapeutas"),
  mail.team?.text + " | " + mail.applicant?.text,
);

process.env.EARLY_ACCESS_SURVEY_URL = "https://upspeech.app/survey";
stub({});
mail = captureEmails();
await handler(POST(WAITLIST));
check(
  "waiting-list applicant with no name gets the fallback greeting",
  mail.applicant?.text.startsWith("Hi there,") &&
    !mail.applicant?.text.includes("undefined"),
  mail.applicant?.text,
);
check(
  "waiting-list applicant gets the waiting-list copy and no survey",
  mail.applicant?.subject === "You're on the UpSpeech waiting list" &&
    !mail.applicant?.text.includes("survey"),
  mail.applicant?.subject + " | " + mail.applicant?.text,
);
check(
  "the waiting-list email promises no fixed schedule",
  !/week|month/i.test(mail.applicant?.text ?? "week"),
  mail.applicant?.text,
);
delete process.env.EARLY_ACCESS_SURVEY_URL;

stub({});
mail = captureEmails();
bodies = captureBodies();
await handler(
  POST({
    ...WAITLIST,
    profile: "referrer",
    shareCode: "abcd",
    referredBy: "zz99zz",
  }),
);
check(
  "valid share and referral codes are kept and shown to the team",
  bodies.sheet?.shareCode === "abcd" &&
    bodies.sheet?.referredBy === "zz99zz" &&
    mail.team?.text.includes("Referred by: zz99zz"),
  JSON.stringify(bodies.sheet),
);

stub({});
bodies = captureBodies();
await handler(POST({ ...WAITLIST, shareCode: "abc", referredBy: "ABCDEF" }));
check(
  "a code too short or in capitals is dropped",
  bodies.sheet?.shareCode === "" && bodies.sheet?.referredBy === "",
  JSON.stringify(bodies.sheet),
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
