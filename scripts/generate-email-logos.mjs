/**
 * Rasterize the logo for the transactional emails.
 *
 * The emails cannot use the SVG directly. Outlook, Apple Mail and Yahoo all
 * render SVG in an <img>, but Gmail's desktop and mobile webmail do not, and
 * Gmail's apps only manage it for non-Google accounts (caniemail.com/features/
 * image-svg). A logo that vanishes in Gmail is not a logo.
 *
 * So the SVG is the source and this writes the PNG the email actually loads,
 * sized to exactly twice its display width rather than shipping the 2048px
 * marketing asset for a 148px slot.
 *
 *   node scripts/generate-email-logos.mjs
 */

import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const images = join(root, "public", "images");

/* 148px is the width the email renders it at; 2x keeps it sharp on retina. */
const DISPLAY_WIDTH = 148;
const SOURCES = [
  { from: "logo.svg", to: "logo-email.png" },
  { from: "logo-invert.svg", to: "logo-email-invert.png" },
];

for (const { from, to } of SOURCES) {
  const svg = readFileSync(join(images, from), "utf8");
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: DISPLAY_WIDTH * 2 },
  })
    .render()
    .asPng();

  const target = join(images, to);
  writeFileSync(target, png);
  const kb = (statSync(target).size / 1024).toFixed(1);
  console.log(`${from} -> public/images/${to}  (${kb}KB)`);
}
