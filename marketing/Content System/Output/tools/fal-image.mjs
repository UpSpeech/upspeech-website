#!/usr/bin/env node
/**
 * fal-image.mjs - run one fal.ai image job and log it.
 *
 * Generates when --image is absent, edits when it is present.
 *
 * Reads FAL_KEY from the environment. Writes the result into ../source/ and
 * appends a record to ../source/log.md, because a batch you cannot reproduce
 * is a batch you will regenerate from scratch in three weeks.
 *
 *   node tools/fal-edit.mjs --model fal-ai/flux-pro/kontext \
 *     --image ../source/original.jpg \
 *     --prompt "..." \
 *     --out stage-clean-v01.jpg
 *
 * Model routing and the prompt rules are in ../../image-prompts.md.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, "../source");

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .join(" ")
    .split(/--(?=[a-z])/)
    .filter(Boolean)
    .map((chunk) => {
      const i = chunk.indexOf(" ");
      return [chunk.slice(0, i).trim(), chunk.slice(i + 1).trim()];
    }),
);

const key = process.env.FAL_KEY;
if (!key) {
  console.error("FAL_KEY is not set.");
  process.exit(1);
}

const model = args.model ?? "fal-ai/flux-pro/kontext";
const out = args.out ?? "edit-v01.jpg";

if (!args.prompt) {
  console.error("Need --prompt.");
  process.exit(1);
}

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

let imagePath = null;
const payload = { prompt: args.prompt };

if (args.image) {
  imagePath = path.resolve(process.cwd(), args.image);
  const bytes = await fs.readFile(imagePath);
  const mime = MIME[path.extname(imagePath).toLowerCase()] ?? "image/jpeg";
  payload.image_url = `data:${mime};base64,${bytes.toString("base64")}`;
  console.log(`input:  ${path.relative(process.cwd(), imagePath)} (${Math.round(bytes.length / 1024)} KB)`);
} else {
  console.log(`input:  none, generating`);
}

console.log(`model:  ${model}`);
console.log(`prompt: ${args.prompt}`);

if (args.size) {
  const [w, h] = args.size.split("x").map(Number);
  payload.image_size = w && h ? { width: w, height: h } : args.size;
}
if (args.n) payload.num_images = Number(args.n);
if (args.negative) payload.negative_prompt = args.negative;
if (args.seed) payload.seed = Number(args.seed);
if (args.aspect) payload.aspect_ratio = args.aspect;
if (args.strength) payload.strength = Number(args.strength);

const headers = { Authorization: `Key ${key}`, "Content-Type": "application/json" };

const submit = await fetch(`https://queue.fal.run/${model}`, {
  method: "POST",
  headers,
  body: JSON.stringify(payload),
});

if (!submit.ok) {
  console.error(`submit failed: ${submit.status}\n${await submit.text()}`);
  process.exit(1);
}

const { status_url, response_url, request_id } = await submit.json();
console.log(`queued: ${request_id}`);

let result;
for (let i = 0; i < 120; i++) {
  await new Promise((r) => setTimeout(r, 2000));
  const s = await fetch(status_url, { headers });
  const body = await s.json();
  if (body.status === "COMPLETED") {
    result = await (await fetch(response_url, { headers })).json();
    break;
  }
  if (body.status === "FAILED" || body.error) {
    console.error("job failed:", JSON.stringify(body, null, 2));
    process.exit(1);
  }
  if (i % 5 === 0) process.stdout.write(".");
}

if (!result) {
  console.error("\ntimed out after 4 minutes");
  process.exit(1);
}

const urls = (result.images ?? [result.image]).filter(Boolean).map((i) => i.url);
const url = urls[0];
if (!url) {
  console.error("no image in response:", JSON.stringify(result).slice(0, 600));
  process.exit(1);
}

await fs.mkdir(sourceDir, { recursive: true });
const outPath = path.join(sourceDir, out);
await fs.writeFile(outPath, Buffer.from(await (await fetch(url)).arrayBuffer()));

for (let i = 1; i < urls.length; i++) {
  const alt = outPath.replace(/(\.[a-z]+)$/, `-v0${i + 1}$1`);
  await fs.writeFile(alt, Buffer.from(await (await fetch(urls[i])).arrayBuffer()));
  console.log(`wrote ${path.relative(process.cwd(), alt)}`);
}

const record = [
  ``,
  `## ${out}`,
  ``,
  `- model: \`${model}\``,
  `- input: ${imagePath ? "`" + path.basename(imagePath) + "`" : "none, generated"}`,
  `- prompt: ${args.prompt}`,
  `- seed: ${args.seed ?? result.seed ?? "not returned"}`,
  args.size ? `- size: ${args.size}` : null,
  `- request: \`${request_id}\``,
  ``,
].filter(Boolean).join("\n");
await fs.appendFile(path.join(sourceDir, "log.md"), record);

console.log(`\nwrote ${path.relative(process.cwd(), outPath)}`);
console.log(`logged to source/log.md`);
