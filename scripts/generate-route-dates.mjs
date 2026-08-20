// Derives a real `dateModified` per route from git, and writes it to
// src/lib/route-dates.generated.ts for the app and the sitemap to share.
//
// Freshness used to be typed by hand in two places and disagreed in three:
// scripts/routes.mjs carried a `lastmod`, src/lib/seo-data.ts carried
// datePublished/dateModified on the Article nodes, and the backend row carried
// its own timestamps. /techniques/cancelation claimed 2026-04-23 in the sitemap,
// 2026-03-03 in its JSON-LD and 2026-03-06 in the database. A stale date is
// worse than no date, so nothing here is typed: each route names the component
// that owns it, this script walks that component's local imports, and git says
// when any of those files last changed.
//
// Shared chrome is excluded on purpose. A tweak to Header, Footer or a ui/
// primitive is not a change to what a page says, and counting it would push
// every route to the same date on every deploy, which is exactly the kind of
// meaningless freshness signal this is meant to avoid. The i18n dictionaries are
// excluded for the same reason: one file holds the copy for all 22 routes, so
// including it would make every page share a single date.
//
// Netlify clones shallowly, so `git log` can come back empty on the build box.
// When that happens the previously generated value is kept rather than dropped,
// which is why the generated file is committed instead of being build-only.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROUTES } from "./routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT = join(ROOT, "src", "lib", "route-dates.generated.ts");

// Imports that every page pulls in and that say nothing about page content.
const SHARED = [
  /^@\/components\/Header$/,
  /^@\/components\/Footer$/,
  /^@\/components\/SEO$/,
  /^@\/components\/ui\//,
  /^@\/i18n/,
  /^@\/hooks\//,
  /^@\/lib\/analytics$/,
  /^@\/lib\/utils$/,
];

const EXTENSIONS = [".tsx", ".ts", ""];

/** Resolve an import specifier to a repo-relative file, or null if it is external/shared. */
function resolveImport(spec, fromFile) {
  if (SHARED.some((re) => re.test(spec))) return null;
  let base;
  if (spec.startsWith("@/")) base = join(ROOT, "src", spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(join(ROOT, fromFile)), spec);
  else return null; // node_modules

  // Vite query suffixes (?raw on the legal markdown) are not part of the path.
  base = base.split("?")[0];
  for (const ext of EXTENSIONS) {
    const candidate = base + ext;
    if (existsSync(candidate) && !candidate.endsWith("/")) return relative(ROOT, candidate);
  }
  for (const ext of [".tsx", ".ts"]) {
    const candidate = join(base, `index${ext}`);
    if (existsSync(candidate)) return relative(ROOT, candidate);
  }
  return null;
}

const IMPORT_RE = /(?:^|\n)\s*import\s+(?:[\s\S]*?from\s+)?["']([^"']+)["']/g;

/** Every local file a route's component reaches, the component included. */
function sourceClosure(entry) {
  const seen = new Set();
  const queue = [entry];
  while (queue.length) {
    const file = queue.shift();
    if (seen.has(file)) continue;
    seen.add(file);
    const abs = join(ROOT, file);
    if (!existsSync(abs) || !/\.(tsx?|mjs)$/.test(file)) continue;
    const src = readFileSync(abs, "utf-8");
    for (const m of src.matchAll(IMPORT_RE)) {
      const next = resolveImport(m[1], file);
      if (next && !seen.has(next)) queue.push(next);
    }
  }
  return [...seen];
}

/** Most recent commit date (YYYY-MM-DD) touching any of `files`, or null. */
function lastCommitDate(files) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", ...files],
      { cwd: ROOT, encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

/**
 * Dates out of the committed generated file. Used as the fallback when git
 * cannot answer, and by the sitemap generator so the sitemap and the JSON-LD
 * are reading the same numbers rather than computing them twice.
 */
export function readGeneratedDates() {
  if (!existsSync(OUTPUT)) return {};
  const src = readFileSync(OUTPUT, "utf-8");
  const out = {};
  for (const m of src.matchAll(/"([^"]+)":\s*"(\d{4}-\d{2}-\d{2})"/g)) out[m[1]] = m[2];
  return out;
}

function generate() {
  const previous = readGeneratedDates();
  const dates = {};
  let fromGit = 0;
  let fromPrevious = 0;

  for (const route of ROUTES) {
    if (!existsSync(join(ROOT, route.component))) {
      throw new Error(
        `routes.mjs: ${route.path} names component "${route.component}", which does not exist.`,
      );
    }
    const date = lastCommitDate(sourceClosure(route.component));
    if (date) {
      dates[route.path] = date;
      fromGit++;
    } else if (previous[route.path]) {
      dates[route.path] = previous[route.path];
      fromPrevious++;
    }
}

const body = ROUTES.filter((r) => dates[r.path])
  .map((r) => `  "${r.path}": "${dates[r.path]}",`)
  .join("\n");

writeFileSync(
  OUTPUT,
  `// AUTO-GENERATED by scripts/generate-route-dates.mjs. Do not edit by hand.
// Run \`npm run dates:routes\` (or a build) to regenerate.
// Each entry is a locale-agnostic route path and the date of the most recent
// commit touching that page's component or anything it imports.

export const ROUTE_DATES: Readonly<Record<string, string>> = {
${body}
};

/** dateModified for a route, or undefined when git history was unavailable. */
export function routeDate(path: string): string | undefined {
  const key = path === "" ? "/" : path.replace(/\\/$/, "") || "/";
  return ROUTE_DATES[key];
}
`,
  "utf-8",
);

console.log(
  "route dates: %d from git, %d carried over, %d total -> %s",
  fromGit,
  fromPrevious,
  Object.keys(dates).length,
  relative(ROOT, OUTPUT),
);
}

// Only regenerate when run as a script; importing this module just reads.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generate();
}
