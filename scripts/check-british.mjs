/**
 * Fails on American spellings in English copy. British English is the house
 * spelling (decisions/2026-09-18-the-products-english-is-british-and-sentence-case.md).
 * Only string literals that contain a space are read, so identifiers, CSS
 * classes and URLs such as /person-centered-therapy are never flagged.
 *
 *   npm run check:british
 */

import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const SUFFIX = "(?:e|es|ed|ing|er|ers|ation|ations)";
const STEMS = [
  "organiz",
  "personaliz",
  "recogniz",
  "customiz",
  "prioritiz",
  "summariz",
  "categoriz",
  "optimiz",
  "finaliz",
  "authoriz",
  "visualiz",
  "minimiz",
  "maximiz",
  "realiz",
  "apologiz",
  "standardiz",
  "emphasiz",
  "normaliz",
  "analyz",
  "stabiliz",
  "generaliz",
].map((s) => `${s}${SUFFIX}`);
const WORDS = [
  "behaviors?",
  "behavioral",
  "favorit\\w*",
  "honor(?:s|ed|ing)?",
  "neighbor\\w*",
  "centers?",
  "centered",
  "programs?",
  "modeling",
  "modeled",
  "labeled",
  "labeling",
  "canceled",
  "canceling",
  "traveled",
  "enrollment",
  "catalogs?",
  "practicing",
  "practiced",
  "pediatric\\w*",
  "(?:to|you|they|we|can|will|should|and|or|who|that|help|helps|if|when|patients|how to) practice",
];
const AMERICAN = new RegExp(
  `(?<![-\\w/])(${[...STEMS, ...WORDS].join("|")})\\b`,
  "i",
);

// Clinical names and field names that stay as they are.
const EXEMPT =
  /anonymiz|pseudonymiz|desensitiz|Innocatalyst Health Program|\$\{/i;
const STRING = /(["'`])((?:\\.|(?!\1).)+?)\1/g;
const JSX_TEXT = />([^<>{}]*\s[^<>{}]*)</g;
// Tailwind class lists and CSS values are code, not copy.
const CODE =
  /\b(?:flex|grid|absolute|relative|inline|block|hidden|prose|divide|text|bg|items|justify|right|left)\b[ -]/;
const NON_ENGLISH = /(^|[\\/.-])(pt|es)(\.ts|\/)/;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.tsx?$/.test(e.name)) out.push(p);
  }
  return out;
}

const hits = [];
for (const file of await walk(join(root, "src"))) {
  const rel = relative(root, file);
  if (NON_ENGLISH.test(rel) || /generated|\.d\.ts$/.test(rel)) continue;
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
    const texts = [...line.matchAll(STRING)].map((m) => m[2]);
    texts.push(...[...line.matchAll(JSX_TEXT)].map((m) => m[1]));
    for (const t of texts) {
      if (!t.includes(" ") || EXEMPT.test(t) || CODE.test(t)) continue;
      const m = t.match(AMERICAN);
      if (m) hits.push(`${rel}:${i + 1}: "${m[1]}" in ${t.slice(0, 80)}`);
    }
  });
}

if (hits.length) {
  console.error(
    `American spelling in English copy (${hits.length}):\n${hits.join("\n")}`,
  );
  process.exit(1);
}
console.log("check-british: ok");
