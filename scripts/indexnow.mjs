#!/usr/bin/env node
// Push the sitemap's URLs to IndexNow, which Bing, Yandex, Seznam and Naver
// consume. Google does not: its Indexing API only accepts JobPosting and
// BroadcastEvent pages, and the old sitemap ping endpoint now returns 404
// ("Sitemaps ping is deprecated"). Google discovery stays passive, via the
// Sitemap: line in robots.txt plus a one-time submit in Search Console.
//
//   node scripts/indexnow.mjs --dry-run     show what would be sent
//   node scripts/indexnow.mjs               submit
//   node scripts/indexnow.mjs --url=/a/ --url=/b/    submit specific paths
//
// The key is deliberately public: hosting it at the host root is what proves
// domain ownership to the API. It is not a secret and does not belong in env.

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "upspeech.app";
const ORIGIN = `https://${HOST}`;
const KEY = "04621dca3423400b94aed231d8f7d838";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10000; // IndexNow caps a single POST at 10k

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const explicit = args
  .filter((a) => a.startsWith("--url="))
  .map((a) => a.slice(6));

const fail = (msg) => {
  console.error(`indexnow: ${msg}`);
  process.exit(1);
};

// The key file must be reachable and contain exactly the key, or the API
// answers 403. Check before submitting so a failure is legible.
const verifyKey = async () => {
  const res = await fetch(KEY_LOCATION);
  if (!res.ok) fail(`key file ${KEY_LOCATION} returned ${res.status}`);
  const body = (await res.text()).trim();
  if (body.includes("<!DOCTYPE"))
    fail(
      `key file ${KEY_LOCATION} served the SPA fallback, so it is not a real file`,
    );
  if (body !== KEY)
    fail(`key file contains ${JSON.stringify(body)}, expected ${KEY}`);
  console.log(`key file ok: ${KEY_LOCATION}`);
};

// Prefer the deployed sitemap so we submit what is actually live, and fall
// back to the built copy in the repo when offline.
const collectUrls = async () => {
  if (explicit.length)
    return explicit.map((u) =>
      u.startsWith("http") ? u : ORIGIN + (u.startsWith("/") ? u : "/" + u),
    );

  let xml;
  try {
    const res = await fetch(`${ORIGIN}/sitemap.xml`);
    if (!res.ok) throw new Error(`sitemap returned ${res.status}`);
    xml = await res.text();
    console.log("sitemap source: live site");
  } catch (err) {
    const local = join(ROOT, "public", "sitemap.xml");
    if (!existsSync(local))
      fail(
        `could not fetch the live sitemap (${err.message}) and ${local} is missing`,
      );
    xml = readFileSync(local, "utf-8");
    console.log("sitemap source: public/sitemap.xml");
  }

  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim(),
  );
  if (!urls.length) fail("sitemap contained no <loc> entries");
  return urls;
};

const main = async () => {
  await verifyKey();
  const urls = await collectUrls();

  // The API answers 422 if any URL is off-host, so drop those loudly rather
  // than letting one stray entry reject the whole batch.
  const offHost = urls.filter((u) => new URL(u).host !== HOST);
  const urlList = urls
    .filter((u) => new URL(u).host === HOST)
    .slice(0, MAX_URLS);
  if (offHost.length)
    console.warn(
      `skipped ${offHost.length} off-host url(s): ${offHost.slice(0, 3).join(", ")}`,
    );
  if (urls.length > MAX_URLS)
    console.warn(
      `capped at ${MAX_URLS} urls; ${urls.length - MAX_URLS} not submitted`,
    );

  const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  console.log(`${urlList.length} url(s) to submit, e.g.`);
  urlList.slice(0, 5).forEach((u) => console.log(`   ${u}`));

  if (dryRun) {
    console.log("\n--dry-run: nothing submitted");
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const body = await res.text();

  // Documented codes: 200 received, 400 bad format, 403 key invalid,
  // 422 urls not on this host, 429 too many requests.
  const meaning = {
    200: "received",
    202: "accepted, key validation pending",
    400: "bad request, invalid format",
    403: "key invalid: not found, or the file does not contain the key",
    422: "urls do not belong to this host, or the key does not match the schema",
    429: "too many requests",
  }[res.status];

  console.log(
    `\n${res.status} ${meaning ?? ""} ${body ? JSON.stringify(body.slice(0, 200)) : ""}`,
  );
  if (res.status !== 200 && res.status !== 202) process.exit(1);
  console.log("A 200 confirms receipt only. It is not a promise to index.");
};

main().catch((e) => fail(e.stack || e.message));
