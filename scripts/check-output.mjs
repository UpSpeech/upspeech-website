// Build-time guard on the HTML that actually ships.
//
// Runs after scripts/prerender.mjs, against the written files rather than the
// running app, with JavaScript disabled, so it reads each page the way a
// crawler that does not execute JS reads it.
//
// It exists because two real bugs shipped to production and stayed there
// unnoticed, and neither was visible to anything already in the pipeline.
// Lighthouse scored the site 100/100 on SEO throughout both:
//
//   1. Multi-line headings extracted as one word. JSX drops the newline between
//      an expression and a following <br /> or sibling <span>, so the home page
//      h1 rendered correctly and read "Your therapykeeps goingbetween sessions."
//      to anything pulling text out instead of laying it out. 15 h1s and 18 h2s
//      across the 66 pages.
//   2. Every page claimed to be the home page. The WebPage node was baked into
//      the static @graph in index.html with the home page's @id, url and name,
//      so all 66 URLs asserted it, each one next to its own Article node saying
//      something different.
//
// Both are invisible in a browser and obvious to a machine, which is exactly the
// class of defect worth spending build seconds on.

import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import {
  ROUTES,
  LOCALES,
  localeUrl,
  localePath,
  NOT_FOUND_OUTPUT_FILE,
} from "./routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const PORT = 4178;
const POOL_SIZE = 4;

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

/**
 * Serve dist/ the way Netlify does. No SPA fallback on purpose: a missing
 * prerendered file should surface as a 404 here, not be papered over with the
 * home page, which is how a page can look fine while being served the wrong HTML.
 */
function startServer() {
  const server = createServer((req, res) => {
    const path = new URL(req.url, `http://localhost:${PORT}`).pathname;
    let file = null;
    for (const candidate of [
      join(DIST, path),
      join(DIST, path, "index.html"),
    ]) {
      if (existsSync(candidate) && statSync(candidate).isFile()) {
        file = candidate;
        break;
      }
    }
    if (!file) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("not found");
    }
    res.writeHead(200, {
      "Content-Type": MIME[extname(file)] || "application/octet-stream",
    });
    res.end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

/** lastmod per absolute URL, straight out of the generated sitemap. */
function sitemapDates() {
  const xml = readFileSync(join(ROOT, "public", "sitemap.xml"), "utf8");
  const out = new Map();
  for (const m of xml.matchAll(
    /<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g,
  )) {
    out.set(m[1], m[2]);
  }
  return out;
}

/** What the page reports about itself, gathered in one pass inside the browser. */
function collect() {
  const squash = (s) => s.replace(/\s+/g, "").toLowerCase();
  const norm = (s) => s.replace(/\s+/g, " ").trim().toLowerCase();

  const headings = [];
  for (const el of document.querySelectorAll("h1, h2, h3")) {
    const textContent = (el.textContent || "").trim();
    const innerText = (el.innerText || "").trim();
    if (!textContent || !innerText) continue;
    // Only the whitespace case is a bug. If the two differ once whitespace is
    // removed entirely, something is hidden from layout (sr-only, display:none)
    // and extraction still gets the full string, which is fine. If they match
    // with whitespace removed but differ once it is normalised, the rendered
    // word boundaries are missing from the text stream, which is the bug.
    if (
      squash(textContent) === squash(innerText) &&
      norm(textContent) !== norm(innerText)
    ) {
      headings.push({ tag: el.tagName, textContent, innerText });
    }
  }

  const jsonLd = [];
  let parseError = null;
  for (const el of document.querySelectorAll(
    'script[type="application/ld+json"]',
  )) {
    try {
      const parsed = JSON.parse(el.textContent || "");
      for (const node of parsed["@graph"] || [parsed]) jsonLd.push(node);
    } catch (e) {
      parseError = e.message;
    }
  }

  const internalLinks = [];
  for (const el of document.querySelectorAll("a[href]")) {
    const href = el.getAttribute("href") || "";
    // Same-origin paths only. Protocol-relative "//host/x" is external.
    if (href.startsWith("/") && !href.startsWith("//"))
      internalLinks.push(href);
  }

  return {
    headings,
    jsonLd,
    parseError,
    internalLinks,
    h1Count: document.querySelectorAll("h1").length,
    canonical:
      document.querySelector('link[rel="canonical"]')?.getAttribute("href") ??
      null,
    htmlLang: document.documentElement.getAttribute("lang"),
  };
}

/** Every rule, applied to one page. Returns a list of human-readable failures. */
function check(page, report) {
  const problems = [];
  const { url, locale } = page;

  if (report.parseError)
    problems.push(`JSON-LD does not parse: ${report.parseError}`);

  for (const h of report.headings) {
    problems.push(
      `<${h.tag.toLowerCase()}> loses its spaces when text is extracted\n` +
        `        rendered:  "${h.innerText.replace(/\s+/g, " ")}"\n` +
        `        extracted: "${h.textContent.replace(/\s+/g, " ")}"`,
    );
  }

  if (report.h1Count !== 1)
    problems.push(`${report.h1Count} <h1> elements, expected exactly 1`);
  if (report.canonical !== url)
    problems.push(`canonical is ${report.canonical}, expected ${url}`);

  // Netlify serves every real page at a trailing slash and 301s the slashless
  // form to it, so linking without one spends a redirect on every internal link
  // and points crawlers at a URL that is not the target's own canonical. Link
  // helpers live in src/i18n/locale.ts: localizedHref for hrefs, localizedPath
  // for in-app route matching.
  for (const href of new Set(report.internalLinks)) {
    const linkPath = href.split(/[?#]/)[0];
    if (!linkPath || linkPath === "/" || linkPath.endsWith("/")) continue;
    // A path with an extension is a file (/images/logo.svg), not a page.
    if (/\.[a-z0-9]+$/i.test(linkPath)) continue;
    problems.push(
      `internal link "${href}" has no trailing slash, so it costs a 301 to "${linkPath}/"`,
    );
  }
  if (report.htmlLang !== locale)
    problems.push(`<html lang> is ${report.htmlLang}, expected ${locale}`);

  const webPages = report.jsonLd.filter((n) => n["@type"] === "WebPage");
  if (webPages.length !== 1) {
    problems.push(
      `${webPages.length} WebPage nodes in JSON-LD, expected exactly 1`,
    );
  } else {
    const wp = webPages[0];
    if (wp["@id"] !== `${url}#webpage`) {
      problems.push(`WebPage @id is ${wp["@id"]}, expected ${url}#webpage`);
    }
    if (wp.url !== url)
      problems.push(`WebPage url is ${wp.url}, expected ${url}`);
    if (wp.inLanguage !== locale) {
      problems.push(
        `WebPage inLanguage is ${wp.inLanguage}, expected ${locale}`,
      );
    }
    if (!wp.dateModified) {
      problems.push("WebPage has no dateModified");
    } else if (page.lastmod && wp.dateModified !== page.lastmod) {
      problems.push(
        `WebPage dateModified is ${wp.dateModified} but sitemap lastmod is ${page.lastmod}`,
      );
    }
  }

  for (const article of report.jsonLd.filter((n) => n["@type"] === "Article")) {
    if (page.lastmod && article.dateModified !== page.lastmod) {
      problems.push(
        `Article dateModified is ${article.dateModified} but sitemap lastmod is ${page.lastmod}`,
      );
    }
  }

  return problems;
}

/**
 * dist/404.html is what makes a missing URL answer 404 instead of 200. Netlify
 * picks it up by filename, so nothing in the config references it and a silent
 * disappearance would restore the old "every URL is the home page" behaviour
 * with no other symptom. Check it before spending a browser on the rest.
 */
function notFoundProblems() {
  const file = join(DIST, NOT_FOUND_OUTPUT_FILE);
  if (!existsSync(file)) {
    return [
      `${NOT_FOUND_OUTPUT_FILE} is missing, so Netlify has no 404 to serve and ` +
        `every unmatched URL falls back to a 200. scripts/prerender.mjs writes it.`,
    ];
  }

  const problems = [];
  const html = readFileSync(file, "utf8");

  if (!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) {
    problems.push("has no noindex robots meta");
  }
  if (/rel="canonical"/i.test(html)) {
    problems.push(
      "declares a canonical URL. It renders at whatever URL was mistyped, so " +
        "its canonical resolves to the site root and tells crawlers every " +
        "missing URL is the home page.",
    );
  }
  if (html === readFileSync(join(DIST, "index.html"), "utf8")) {
    problems.push(
      "is byte-identical to index.html, so it is the home page under another " +
        "name rather than a rendered NotFound",
    );
  }
  return problems;
}

const notFound = notFoundProblems();
if (notFound.length) {
  console.error("");
  console.error("check:output FAILED on dist/%s.", NOT_FOUND_OUTPUT_FILE);
  for (const problem of notFound) console.error("      %s", problem);
  console.error("");
  process.exit(1);
}

const lastmods = sitemapDates();
const pages = LOCALES.flatMap((locale) =>
  ROUTES.map((route) => ({
    locale,
    path: localePath(route.path, locale),
    url: localeUrl(route.path, locale),
    lastmod: lastmods.get(localeUrl(route.path, locale)) ?? null,
  })),
);

const server = await startServer();
const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const failures = [];
const queue = [...pages];

async function worker() {
  const tab = await browser.newPage();
  await tab.setJavaScriptEnabled(false);
  await tab.setViewport({ width: 1280, height: 900 });
  while (queue.length) {
    const page = queue.shift();
    const response = await tab.goto(`http://localhost:${PORT}${page.path}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    if (!response || response.status() !== 200) {
      failures.push({
        page,
        problems: [`served HTTP ${response?.status() ?? "no response"}`],
      });
      continue;
    }
    const report = await tab.evaluate(collect);
    const problems = check(page, report);
    if (problems.length) failures.push({ page, problems });
  }
  await tab.close();
}

await Promise.all(Array.from({ length: POOL_SIZE }, worker));
await browser.close();
server.close();

if (failures.length === 0) {
  console.log(
    "check:output OK: %d pages, headings extract and JSON-LD agrees.",
    pages.length,
  );
  process.exit(0);
}

console.error("");
console.error(
  "check:output FAILED on %d of %d prerendered pages.",
  failures.length,
  pages.length,
);
console.error(
  "This reads dist/ with JavaScript off, the way a crawler does. Everything below",
);
console.error("looks correct in a browser and is wrong in the HTML.");
console.error("");
for (const { page, problems } of failures) {
  console.error("  %s", page.path);
  for (const problem of problems) console.error("      %s", problem);
  console.error("");
}
process.exit(1);
