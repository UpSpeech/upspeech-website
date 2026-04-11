import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "..", "dist");
const PORT = 4173;

const ROUTES = [
  "/",
  "/privacy",
  "/terms",
  "/cookies",
  "/techniques",
  "/techniques/voluntary-stuttering",
  "/techniques/cancelation",
  "/techniques/pull-out",
  "/techniques/preparatory-set",
  "/techniques/holding",
  "/techniques/soft-starts",
  "/techniques/soft-articulation-contact",
  "/techniques/prolonged-speech",
  "/techniques/speech-speed-management",
  "/techniques/pauses",
  "/techniques/identification-desensitization",
];

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
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

async function prerender() {
  console.log("Prerendering %d routes...", ROUTES.length);

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Block unnecessary requests to speed up rendering
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const type = req.resourceType();
    // Block analytics — but allow fonts and images so the page renders fully
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

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;

    await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });

    // Wait for React Helmet to inject OG title (confirms SEO tags are rendered)
    try {
      await page.waitForSelector('meta[property="og:title"]', {
        timeout: 5000,
      });
    } catch {
      console.warn(
        "  Warning: og:title not found for %s (using current HTML)",
        route,
      );
    }

    // Extract the fully-rendered HTML, keeping #root content intact so
    // crawlers that don't execute JS (Bing, DuckDuckGo) see real page content.
    // main.tsx uses createRoot (not hydrateRoot) so there are no hydration mismatches.
    const html = await page.evaluate(() => {
      // Remove transient UI elements that shouldn't be in static HTML
      document
        .querySelectorAll(
          "[data-sonner-toaster], [aria-label*='Notifications']",
        )
        .forEach((el) => el.remove());
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

  await browser.close();
  server.close();
  console.log("Done! Prerendered %d pages.", ROUTES.length);
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
