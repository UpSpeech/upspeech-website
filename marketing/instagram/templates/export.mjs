import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "index.html");
const cssPath = path.join(__dirname, "styles.css");
const outputDir = path.resolve(__dirname, "../exports");

const chromeCandidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

async function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Try the next known path.
    }
  }

  throw new Error(
    "Could not find Chrome. Install Google Chrome or set CHROME_PATH to a Chromium executable.",
  );
}

function exportSize(name) {
  if (name === "profile-grid") return { width: 3240, height: 3240 };
  if (name.startsWith("story-")) return { width: 1080, height: 1920 };
  return { width: 1080, height: 1080 };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isLocalAssetRef(ref) {
  return (
    ref &&
    !ref.startsWith("#") &&
    !ref.startsWith("data:") &&
    !ref.startsWith("http://") &&
    !ref.startsWith("https://") &&
    !ref.startsWith("//")
  );
}

async function reportMissingAssetRefs(sourceText) {
  const refs = [
    ...[...sourceText.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((match) => match[1]),
    ...[...sourceText.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((match) => match[1]),
  ]
    .filter(isLocalAssetRef)
    .map((ref) => ref.split("#")[0].split("?")[0]);

  const missing = [];
  for (const ref of new Set(refs)) {
    const assetPath = path.resolve(__dirname, ref);
    try {
      await fs.access(assetPath);
    } catch {
      missing.push({ ref, assetPath });
    }
  }

  if (missing.length === 0) return;

  const message = [
    "Missing local template assets:",
    ...missing.map(({ ref, assetPath }) => `- ${ref} (${assetPath})`),
    "Exports will use CSS fallbacks where available. Set STRICT_SOURCE_IMAGES=1 to fail instead.",
  ].join("\n");

  if (process.env.STRICT_SOURCE_IMAGES === "1") {
    throw new Error(message);
  }

  console.warn(message);
}

async function waitForScreenshot(outputPath, timeoutMs) {
  const startedAt = Date.now();
  let lastSize = 0;
  let stableChecks = 0;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const stat = await fs.stat(outputPath);
      if (stat.size > 0 && stat.size === lastSize) {
        stableChecks += 1;
      } else {
        stableChecks = 0;
        lastSize = stat.size;
      }

      if (stableChecks >= 2) return;
    } catch {
      // The screenshot has not been written yet.
    }

    await sleep(150);
  }

  throw new Error(`Timed out waiting for ${outputPath}`);
}

async function stopChrome(child, closePromise) {
  if (child.exitCode !== null || child.signalCode !== null) return;

  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    // Chrome may have already exited.
  }

  const exited = await Promise.race([closePromise.then(() => true), sleep(1000).then(() => false)]);
  if (exited) return;

  try {
    process.kill(-child.pid, "SIGKILL");
  } catch {
    // Chrome may have already exited.
  }

  await Promise.race([closePromise, sleep(1000)]);
}

async function exportWithChrome({ chromePath, htmlUrl, name, outputPath, width, height }) {
  await fs.rm(outputPath, { force: true });
  const capturePath = path.join(path.dirname(outputPath), `.${name}.capture.png`);
  await fs.rm(capturePath, { force: true });

  const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), "upspeech-instagram-export-"));
  // A generous delay lets the Google Fonts (Outfit / Plus Jakarta Sans /
  // Bricolage Grotesque) finish loading before the screenshot is taken.
  const captureDelay = name === "profile-grid" ? 6000 : 4000;
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--disable-extensions",
    "--disable-sync",
    "--disable-component-update",
    "--disable-default-apps",
    "--no-first-run",
    "--no-default-browser-check",
    "--metrics-recording-only",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--run-all-compositor-stages-before-draw",
    "--force-device-scale-factor=1",
    `--user-data-dir=${userDataDir}`,
    `--window-size=${width},${height + 160}`,
    `--screenshot=${capturePath}`,
    `--timeout=${captureDelay}`,
    `${htmlUrl}?export=${encodeURIComponent(name)}`,
  ];

  const child = spawn(chromePath, args, {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => {
    stdout += chunk;
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
  });

  const closePromise = new Promise((resolve) => {
    child.on("close", (code, signal) => resolve({ code, signal }));
  });

  try {
    const waitMs = name === "profile-grid" ? 16000 : 11000;
    await Promise.race([
      waitForScreenshot(capturePath, waitMs),
      closePromise.then(async () => {
        const stat = await fs.stat(capturePath).catch(() => null);
        if (!stat?.size) {
          throw new Error(
            [`Chrome exited before exporting ${name}.`, stdout.trim(), stderr.trim()]
              .filter(Boolean)
              .join("\n"),
          );
        }
      }),
    ]);
  } finally {
    await stopChrome(child, closePromise);
    await fs.rm(userDataDir, { recursive: true, force: true });
  }

  await sharp(capturePath).extract({ left: 0, top: 0, width, height }).toFile(outputPath);
  await fs.rm(capturePath, { force: true });
}

const html = await fs.readFile(htmlPath, "utf8");
const css = await fs.readFile(cssPath, "utf8");
await reportMissingAssetRefs(`${html}\n${css}`);

const names = [
  ...new Set(
    [...html.matchAll(/\sdata-export="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((name) => /^[a-z0-9-]+$/.test(name)),
  ),
];

await fs.mkdir(outputDir, { recursive: true });

const chromePath = await findChrome();
const htmlUrl = pathToFileURL(htmlPath).href;

for (const name of names) {
  const { width, height } = exportSize(name);
  const outputPath = path.join(outputDir, `${name}.png`);

  await exportWithChrome({ chromePath, htmlUrl, name, outputPath, width, height });
  console.log(`Exported ${path.relative(process.cwd(), outputPath)}`);
}
