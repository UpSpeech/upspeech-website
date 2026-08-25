/**
 * Render the early-access emails to .pr-assets/emails/ so they can be opened
 * in a browser (or dragged into a mail client) without sending anything.
 *
 * Every locale and both of the states that change the layout: the applicant
 * email with and without a survey URL, and the team email with the spreadsheet
 * write succeeding and failing.
 *
 *   node scripts/preview-emails.mjs
 */

import { build } from "esbuild";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, ".pr-assets", "emails");
const bundle = join(outDir, ".templates.mjs");

// The slugs the form actually posts, not the labels the visitor saw.
const SAMPLE = {
  name: "Vasco Figueiredo",
  email: "vasco@clinicadafala.pt",
  role: "speech-therapist",
  clinicSize: "small",
};

const SURVEY = "https://upspeech.app/survey";

await mkdir(outDir, { recursive: true });

// The templates are TypeScript, so bundle them to a module Node can import.
await build({
  entryPoints: [join(root, "netlify", "lib", "preview-entry.ts")],
  outfile: bundle,
  bundle: true,
  format: "esm",
  platform: "node",
  logLevel: "warning",
});

const { applicantEmail, teamEmail, applicantCopy, EMAIL_LOCALES } =
  await import(pathToFileURL(bundle).href);

const written = [];
const write = async (name, html) => {
  const file = join(outDir, `${name}.html`);
  await writeFile(file, html, "utf8");
  written.push(name);
};

for (const locale of EMAIL_LOCALES) {
  const lead = { ...SAMPLE, locale };
  const copy = applicantCopy(locale);
  await write(`applicant-${locale}`, applicantEmail(lead, copy).html);
  await write(
    `applicant-${locale}-survey`,
    applicantEmail(lead, copy, SURVEY).html,
  );
}

const teamLead = { ...SAMPLE, locale: "pt" };
await write(
  "team-saved",
  teamEmail(teamLead, { sheet: "ok", audience: "ok" }).html,
);
await write(
  "team-sheet-down",
  teamEmail(teamLead, { sheet: "failed", audience: "ok" }).html,
);

await rm(bundle, { force: true });

console.log(`Wrote ${written.length} previews to .pr-assets/emails/`);
for (const name of written) console.log(`  ${name}.html`);
