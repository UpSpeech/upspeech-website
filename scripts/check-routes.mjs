// Build-time guard: the route list in src/App.tsx and the route SSOT in
// scripts/routes.mjs must agree. routes.mjs feeds the sitemap generator and the
// prerenderer; App.tsx feeds the SPA router. If they drift you get either a
// route that renders but is missing from the sitemap/prerender (no SEO) or a
// sitemap/prerender entry that 404s in the app. This check turns that silent
// drift into a build failure.
//
// App.tsx declares routes with locale-agnostic RELATIVE paths (no leading
// slash) plus an `index` route and a `*` catch-all. routes.mjs declares the
// same paths with a leading slash. We normalise both sides to leading-slash
// form and ignore the catch-all before comparing.
//
// The ideal would be a single shared route module imported by both sides.
// Deferred because routes.mjs is .mjs and App.tsx is .ts (different module and
// type worlds), so this check enforces agreement between the two lists instead.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ROUTES } from "./routes.mjs";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const appTsxPath = join(scriptsDir, "..", "src", "App.tsx");

/** Normalise an App.tsx route literal to the leading-slash form used by routes.mjs. */
function normalizeAppPath(raw) {
  // `index` route maps to "/"; everything else is a relative path.
  if (raw === "index") return "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

function appRoutePaths() {
  let appTsxContent = readFileSync(appTsxPath, "utf8");
  const paths = new Set();

  // Strip JSX block comments first, so a commented-out <Route> is not counted
  // as present. Without this a commented route reads as a false OK, the wrong
  // direction for a drift guard.
  appTsxContent = appTsxContent.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

  // <Route index .../>  -> the "/" route
  if (/<Route\s+index\b/.test(appTsxContent)) {
    paths.add("/");
  }

  // <Route path="..." .../>  -> capture every path literal.
  // Only literal string paths are matched. Non-literal path={EXPR} routes are
  // intentionally unsupported and would need a manual routes.mjs entry.
  const pathRe = /<Route\s+[^>]*?path=["']([^"']+)["']/g;
  let match;
  while ((match = pathRe.exec(appTsxContent)) !== null) {
    const literal = match[1];
    // Skip wildcard mounts so we only compare real page paths: the "*"
    // catch-all (NotFound) and the locale-prefix mount points ("/pt/*",
    // "/es/*", "/*") that mount the AppRoutes tree are routing scaffolding,
    // not pages, and have no routes.mjs counterpart.
    if (literal.endsWith("*")) continue;
    paths.add(normalizeAppPath(literal));
  }

  return paths;
}

function routesMjsPaths() {
  return new Set(ROUTES.map((r) => r.path));
}

/** Format a set of paths under a heading that names which side they come from. */
function formatPaths(heading, paths) {
  return `  ${heading}:\n${[...paths]
    .sort()
    .map((p) => `    ${p}`)
    .join("\n")}`;
}

const app = appRoutePaths();
const routes = routesMjsPaths();

const missingFromRoutes = [...app].filter((p) => !routes.has(p));
const missingFromApp = [...routes].filter((p) => !app.has(p));

if (missingFromRoutes.length === 0 && missingFromApp.length === 0) {
  console.log(`check:routes OK: ${app.size} routes in sync.`);
  process.exit(0);
}

console.error(
  "check:routes FAILED: App.tsx and scripts/routes.mjs disagree.",
);
console.error(
  "Every page route must appear in BOTH src/App.tsx (the SPA router) and",
);
console.error(
  "scripts/routes.mjs (the sitemap/prerender SSOT). Reconcile the two lists.",
);
console.error("");
if (missingFromRoutes.length > 0) {
  console.error(
    formatPaths(
      "in App.tsx but missing from scripts/routes.mjs",
      missingFromRoutes,
    ),
  );
  console.error("");
}
if (missingFromApp.length > 0) {
  console.error(
    formatPaths(
      "in scripts/routes.mjs but missing from App.tsx",
      missingFromApp,
    ),
  );
  console.error("");
}
process.exit(1);
