import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { ROUTES, LOCALES, DEFAULT_LOCALE, localePath } from "./routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "..", "dist");
const PORT = 4173;

// --- Tuning knobs (keep these together) -------------------------------------
// Number of puppeteer pages rendering concurrently. Kept modest so the Netlify
// build box does not OOM; 4-6 is the safe range. Lower it (or drop to serial)
// if pooling makes the static server or browser flaky on the build image.
const POOL_SIZE = 4;
// Per-route attempts before the build fails for that route. Retries absorb
// transient Chrome warmup / cold-font-fetch timeouts.
const MAX_ATTEMPTS = 3;
// Backoff between attempts (linear: attempt N waits N * this).
const RETRY_BACKOFF_MS = 1000;
// Per-navigation timeout. Bumped from 15s now that retry handles true flakes,
// so a single slow cold fetch no longer trips a false failure. A genuinely
// slow future route is better served by raising this than shrinking the pool.
const NAV_TIMEOUT_MS = 25000;
// How long to wait for React Helmet to inject the SEO tags after navigation.
//
// The wait is bimodal, not gradual. Timing all 66 routes: 63 resolve in 2-9ms
// (median 3ms), and the first POOL_SIZE routes take ~41,500ms while Chrome warms
// up and the bundle and fonts are fetched cold for the first time. The old 15s
// landed in that gap, so every build burned attempts 1 and 2 on those first
// routes and passed only on attempt 3 of MAX_ATTEMPTS, leaving no margin at all
// on a build machine slower than a laptop.
//
// 90s clears the observed cold start with room to spare. It costs nothing on the
// 63 fast routes, because waitForFunction returns the moment the tags appear, and
// it is only paid when a route is genuinely stuck.
const SELECTOR_TIMEOUT_MS = 90000;
// -----------------------------------------------------------------------------

// Routes whose visible content is fetched from the backend at render time and
// therefore MUST prove it rendered (not its loading/error fallback) before we
// write static HTML. Matched as a prefix against the in-app path. See plan 145.
const DATA_DRIVEN_PREFIXES = ["/techniques"];

/** True if `route` (locale-prefixed in-app path) is a data-driven content route. */
function isDataDrivenRoute(route) {
  // Strip a leading /pt or /es locale prefix before matching.
  const withoutLocale = route.replace(/^\/(pt|es)(?=\/|$)/, "") || "/";
  return DATA_DRIVEN_PREFIXES.some(
    (p) => withoutLocale === p || withoutLocale.startsWith(`${p}/`),
  );
}

// The full prerender matrix: every route in every locale, as the in-app path
// the SPA serves (en at the root, pt/es under a prefix).
const RENDER_PATHS = LOCALES.flatMap((locale) =>
  ROUTES.map((route) => localePath(route.path, locale)),
);

const MIME_TYPES = {
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
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  // Prerender waits on networkidle0, so anything the page requests has to be
  // served with a type the browser will accept. Missing entries fall through to
  // application/octet-stream, which the hero <video> will not start on.
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

/** Serve dist/ as a static file server with SPA fallback */
function startServer() {
  const indexHtml = readFileSync(join(DIST_DIR, "index.html"), "utf-8");

  const server = createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = join(DIST_DIR, url.pathname);

    // Try the exact path, then path/index.html, then SPA fallback
    let content;
    let ext;

    for (const candidate of [filePath, join(filePath, "index.html")]) {
      try {
        if (
          existsSync(candidate) &&
          !candidate.endsWith("/") &&
          readFileSync(candidate)
        ) {
          content = readFileSync(candidate);
          ext = extname(candidate);
          break;
        }
      } catch {
        // not a file, continue
      }
    }

    if (!content) {
      // SPA fallback
      content = indexHtml;
      ext = ".html";
    }

    const mime = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": mime });
    res.end(content);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** The locale prefix a route's path carries, or "" for the default (en) locale. */
function localeOf(route) {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (route === `/${locale}` || route.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return "";
}

/** Create a fresh page with its own analytics-blocking request interception. */
async function createWorkerPage(browser) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    // Block analytics, but allow fonts and images so the page renders fully
    if (
      req.url().includes("googletagmanager.com") ||
      req.url().includes("clarity.ms") ||
      req.url().includes("google-analytics.com") ||
      req.url().includes("bing.com")
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
  return page;
}

/** Render a single route on the given page: navigate, wait for SEO tags, scrape, write. */
async function renderRoute(page, route) {
  const url = `http://localhost:${PORT}${route}`;

  await page.goto(url, { waitUntil: "networkidle0", timeout: NAV_TIMEOUT_MS });

  // Wait for React Helmet to inject the localized SEO tags. Confirm both the
  // canonical link and the OG title rendered, so a half-rendered page is not
  // scraped as if it were complete. A miss throws so the retry loop gives the
  // page another attempt (under concurrency, Helmet can finish just after
  // networkidle0) rather than silently writing degraded HTML.
  await page.waitForFunction(
    () =>
      document.querySelector('link[rel="canonical"]') &&
      document.querySelector('meta[property="og:title"]'),
    { timeout: SELECTOR_TIMEOUT_MS },
  );

  // Content-integrity gate: for backend-driven routes, the Helmet SEO tags
  // render even on the loading/error fallback, so they prove nothing. Wait for
  // the page to settle into its `ready` state and fail if it settled into
  // `loading`/`error` instead. This throws into renderRouteWithRetry, so a
  // transient backend blip is retried; a persistent one fails the build LOUDLY
  // instead of silently shipping "Error Loading Technique" HTML. See plan 145.
  if (isDataDrivenRoute(route)) {
    try {
      await page.waitForFunction(
        () => {
          const m = document.querySelector("[data-prerender-state]");
          return m && m.getAttribute("data-prerender-state") === "ready";
        },
        { timeout: SELECTOR_TIMEOUT_MS },
      );
    } catch {
      const state = await page.evaluate(() => {
        const m = document.querySelector("[data-prerender-state]");
        return m ? m.getAttribute("data-prerender-state") : "missing";
      });
      throw new Error(
        `Content gate failed for ${route}: data-prerender-state="${state}" (expected "ready"). ` +
          `The backend API was likely unreachable at build time (check VITE_API_URL). See plan 145.`,
      );
    }
  }

  // For pt/es routes, the canonical href should carry the locale prefix. Warn
  // (do not fail) if it does not, to surface a class of i18n regressions here.
  const locale = localeOf(route);
  if (locale) {
    const canonical = await page.evaluate(() => {
      const el = document.querySelector('link[rel="canonical"]');
      return el ? el.getAttribute("href") : null;
    });
    if (canonical && !canonical.includes(`/${locale}`)) {
      console.warn(
        "  Warning: canonical %s for %s does not carry the /%s locale prefix",
        canonical,
        route,
        locale,
      );
    }
  }

  // Extract the fully-rendered HTML, keeping #root content intact so
  // crawlers that don't execute JS (Bing, DuckDuckGo) see real page content.
  // main.tsx hydrates this markup rather than rebuilding it, so what is written
  // here has to be what the app's first client render produces. That is why the
  // backend payloads are baked in below: without them the data-driven pages
  // start on their loading state, mismatch, and lose the paint.
  const html = await page.evaluate(() => {
    // Remove transient UI elements that shouldn't be in static HTML.
    //
    // The consent banner mounts a second after the page does, so whether it
    // landed in a build was a race with how long the route took to settle: it
    // was baked into the homepage and not into the other 65 pages. Consent lives
    // in localStorage, so the banner is browser-only by definition and never
    // belongs in a static file.
    //
    // The sonner container used to be stripped here too. It is rendered inside
    // #root, so removing it left the HTML missing an <ol> that the app renders
    // on its first pass, and hydration bailed out to a full client render on
    // every page. It is an empty list; leaving it costs a few bytes.
    document
      .querySelectorAll("[data-consent-banner]")
      .forEach((el) => el.remove());

    // Analytics loaders inject their own <script> at runtime, and serializing
    // the DOM captures those tags as if we had authored them. Both of the ones
    // that showed up caused real damage:
    //
    //   Clarity inserts its tag before the first <script>, which lands it in
    //   <head>, ~120KB ahead of the inline snippet at the end of <body> that
    //   defines window.clarity. On a real load the baked tag ran first and threw
    //   "a[c] is not a function" calling a stub that did not exist yet, then the
    //   snippet fetched the same tag again.
    //
    //   PostHog's config.js came through with neither async nor defer, so it
    //   blocked rendering for ~460ms.
    //
    // Strip any script whose src points somewhere we never author a src for.
    // The loaders re-inject at runtime, so nothing is lost. Our own third-party
    // tag in index.html (gtag, deferred) is authored with a src and stays.
    const INJECTED_SRC = /clarity\.ms|\/relay-[^/]+\/|i\.posthog\.com/;
    document.querySelectorAll("script[src]").forEach((el) => {
      if (INJECTED_SRC.test(el.getAttribute("src") || "")) el.remove();
    });

    // Bake in whatever the page fetched while rendering (see
    // src/lib/prerender-data.ts). Without this the visitor's browser refetches
    // it, and the article on screen is replaced by a spinner until the response
    // lands: measured at 4.2s LCP against a 1.7s first paint.
    const seeds = window.__PRERENDER_DATA__;
    if (seeds && Object.keys(seeds).length > 0) {
      const el = document.createElement("script");
      el.type = "application/json";
      el.id = "__PRERENDER_DATA__";
      // Escaping "<" keeps a "</script>" inside the content from closing the tag.
      el.textContent = JSON.stringify(seeds).replace(/</g, "\\u003c");
      document.head.appendChild(el);
    }

    return document.documentElement.outerHTML;
  });
  const fullHtml = `<!DOCTYPE html>\n${html}`;

  // Determine output path
  let outputPath;
  if (route === "/") {
    outputPath = join(DIST_DIR, "index.html");
  } else {
    outputPath = join(DIST_DIR, route.slice(1), "index.html");
  }

  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, fullHtml, "utf-8");
  console.log("  %s -> %s", route, outputPath.replace(DIST_DIR, "dist"));
}

/** True if an error means the page is gone (closed/detached) and unusable. */
function isPageGone(err) {
  const msg = err?.message ?? "";
  return msg.includes("Target closed") || msg.includes("detached");
}

/**
 * Render one route with up to MAX_ATTEMPTS tries and linear backoff. Reuses the
 * given page across attempts, but recreates it if a crash detaches it so the
 * remaining attempts aren't doomed. Returns the live page (possibly a new one)
 * for the caller to keep using.
 */
async function renderRouteWithRetry(browser, page, route) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await renderRoute(page, route);
      return page;
    } catch (err) {
      lastErr = err;
      console.warn(
        "  Attempt %d/%d failed for %s: %s",
        attempt,
        MAX_ATTEMPTS,
        route,
        err.message,
      );
      if (attempt < MAX_ATTEMPTS) {
        if (isPageGone(err)) {
          try {
            await page.close();
          } catch {
            // page already gone; nothing to clean up
          }
          page = await createWorkerPage(browser);
        }
        await sleep(RETRY_BACKOFF_MS * attempt);
      }
    }
  }
  const failure = new Error(
    `Route ${route} failed after ${MAX_ATTEMPTS} attempts: ${lastErr?.message}`,
  );
  failure.page = page;
  throw failure;
}

async function prerender() {
  console.log(
    "Prerendering %d routes (pool of %d)...",
    RENDER_PATHS.length,
    POOL_SIZE,
  );

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    // --disable-web-security: the prerender renders the SPA on http://localhost:4173,
    // but the SPA fetches the backend cross-origin. The prod backend only allows CORS
    // from *.upspeech.app, so without this the build-time fetch is blocked and the
    // techniques pages render empty. Safe here: this is a throwaway build-only browser
    // rendering our own trusted dist/, never user input. See plan 145.
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
    ],
  });

  // Shared work queue; each worker pulls the next route until it drains.
  const queue = [...RENDER_PATHS];
  const failures = [];

  const worker = async () => {
    let page = await createWorkerPage(browser);
    try {
      while (true) {
        const route = queue.shift();
        if (route === undefined) break;
        try {
          page = await renderRouteWithRetry(browser, page, route);
        } catch (err) {
          console.error("  FAILED: %s", err.message);
          failures.push(route);
          // renderRouteWithRetry hands back the live page even on failure, so
          // the worker keeps a usable page for the next route.
          if (err.page) page = err.page;
        }
      }
    } finally {
      await page.close();
    }
  };

  try {
    await Promise.all(
      Array.from({ length: Math.min(POOL_SIZE, RENDER_PATHS.length) }, () =>
        worker(),
      ),
    );
  } finally {
    await browser.close();
    server.close();
  }

  if (failures.length > 0) {
    console.error(
      "Prerender failed: %d route(s) could not render after %d attempts each:",
      failures.length,
      MAX_ATTEMPTS,
    );
    for (const route of failures) {
      console.error("  - %s", route);
    }
    throw new Error(`${failures.length} route(s) failed to prerender`);
  }

  console.log("Done! Prerendered %d pages.", RENDER_PATHS.length);
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
