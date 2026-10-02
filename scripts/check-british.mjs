/**
 * Fails on American spellings in English copy under src/. Reads string
 * literals and JSX text that contain a space. The verb "practise" is caught
 * only after the words listed below, so it is a partial net.
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
  "(?:patient|child|he|she) practices",
  "(?:to|you|they|we|can|will|should|and|or|who|that|help|helps|if|when|patients|how to|I|do|does|must|may) practice",
];
const AMERICAN = new RegExp(
  `(?<![\\w/])(${[...STEMS, ...WORDS].join("|")})\\b`,
  "i",
);

// Clinical names and field names that stay as they are.
const EXEMPT = /anonymiz|pseudonymiz|Innocatalyst Health Program|\$\{/i;
const STRING = /(["'`])((?:\\.|(?!\1).)+?)\1/g;
const JSX_TEXT = />([^<>{}]*\s[^<>{}]*)</g;
// Tailwind class lists and CSS values are code, not copy.
const CODE =
  /\b(?:flex|grid|absolute|relative|inline|block|hidden|prose|divide|text|bg|items|justify|self|place|content|right|left)\b[ -]/;
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
  const source = await readFile(file, "utf8");
  const found = [];
  source.split("\n").forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
    for (const m of line.matchAll(STRING)) found.push([i + 1, m[2]]);
  });
  for (const m of source.matchAll(JSX_TEXT)) {
    const line = source.slice(0, m.index).split("\n").length;
    found.push([line, m[1].replace(/\s+/g, " ")]);
  }
  for (const [line, t] of found) {
    if (!t.includes(" ") || EXEMPT.test(t) || CODE.test(t)) continue;
    const m = t.match(AMERICAN);
    if (m) hits.push(`${rel}:${line}: "${m[1]}" in ${t.slice(0, 80)}`);
  }
}

if (hits.length) {
  console.error(
    `American spelling in English copy (${hits.length}):\n${hits.join("\n")}`,
  );
  process.exit(1);
}
console.log("check-british: ok");
