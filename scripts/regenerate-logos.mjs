import opentype from "opentype.js";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// -- Download Outfit Bold from Google Fonts --

async function downloadFont() {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    },
  ).then((r) => r.text());

  const match = css.match(/src: url\((.+?)\)/);
  if (!match) throw new Error("Could not find Outfit Bold font URL");

  const buffer = await fetch(match[1]).then((r) => r.arrayBuffer());
  return opentype.parse(buffer);
}

// -- Generate wordmark path data --

function generateWordmarkPath(font, text, fontSize, x, y) {
  const path = font.getPath(text, x, y, fontSize);
  return path.toPathData(3);
}

// -- SVG logo variants --

const LOGO_VARIANTS = [
  {
    label: "app-frontend/logo.svg",
    src: join(__dirname, "../../app-frontend/public/images/logo.svg"),
    textFill: "#212540",
    rectFill: "none",
  },
  {
    label: "app-frontend/logo-invert.svg",
    src: join(__dirname, "../../app-frontend/public/images/logo-invert.svg"),
    textFill: "#FDFDFD",
    rectFill: "none",
  },
  {
    label: "upspeech-website/logo.svg",
    src: join(__dirname, "../public/images/logo.svg"),
    textFill: "#212540",
    rectFill: "none",
  },
  {
    label: "upspeech-website/logo-invert.svg",
    src: join(__dirname, "../public/images/logo-invert.svg"),
    textFill: "#FDFDFD",
    rectFill: "none",
  },
  {
    label: "demo-videos/logo.svg",
    src: join(__dirname, "../../demo-videos/remotion/public/assets/logo.svg"),
    textFill: "#212540",
    rectFill: "none",
  },
  {
    label: "demo-videos/logo-invert.svg",
    src: join(
      __dirname,
      "../../demo-videos/remotion/public/assets/logo-invert.svg",
    ),
    textFill: "#FDFDFD",
    rectFill: "none",
  },
];

// PNG outputs (generated from SVGs using resvg)
const PNG_OUTPUTS = [
  {
    label: "app-frontend/logo.png",
    svgPath: join(__dirname, "../../app-frontend/public/images/logo.svg"),
    pngPath: join(__dirname, "../../app-frontend/public/images/logo.png"),
  },
  {
    label: "app-frontend/logo-invert.png",
    svgPath: join(
      __dirname,
      "../../app-frontend/public/images/logo-invert.svg",
    ),
    pngPath: join(
      __dirname,
      "../../app-frontend/public/images/logo-invert.png",
    ),
  },
  {
    label: "upspeech-website/logo.png",
    svgPath: join(__dirname, "../public/images/logo.svg"),
    pngPath: join(__dirname, "../public/images/logo.png"),
  },
  {
    label: "upspeech-website/logo-invert.png",
    svgPath: join(__dirname, "../public/images/logo-invert.svg"),
    pngPath: join(__dirname, "../public/images/logo-invert.png"),
  },
];

async function main() {
  console.log("Downloading Outfit Bold font...");
  const font = await downloadFont();

  // The existing SVG viewBox is "0 0 1024 374", icon occupies ~x:107-271, y:90-283
  // The wordmark needs to start after the icon+circle area
  // Existing wordmark starts at ~x=313 and the vertical center is ~y=197 (baseline for the text)

  const text = "UpSpeech";

  // X position: start after the icon+circle area with some gap
  const xStart = 313;
  // Target width: fill to near the right edge of the SVG (1024px viewBox)
  const targetWidth = 940 - xStart;

  // Calculate font size to fill the target width
  const testSize = 100;
  const testWidth = font.getAdvanceWidth(text, testSize);
  const finalFontSize = (targetWidth / testWidth) * testSize;
  console.log(`Font size: ${finalFontSize.toFixed(1)}px for width ${targetWidth}`);

  // Center the cap-height vertically with the icon
  // Icon body spans y:112-283, center at ~197
  const iconCenterY = 197;
  const capHeight =
    ((font.tables.os2.sCapHeight || font.ascender * 0.7) / font.unitsPerEm) *
    finalFontSize;
  const finalBaseline = iconCenterY + capHeight / 2;

  const pathData = generateWordmarkPath(
    font,
    text,
    finalFontSize,
    xStart,
    finalBaseline,
  );
  console.log(`Generated path data (${pathData.length} chars)`);

  // Update all SVG files
  console.log("\nUpdating SVG files...");
  for (const variant of LOGO_VARIANTS) {
    const svg = readFileSync(variant.src, "utf-8");

    // Replace the first <path> element (the wordmark) — always the first <path> in the file
    const updatedSvg = svg.replace(
      /<path d="[^"]*"/,
      `<path d="${pathData}"`,
    );

    if (updatedSvg === svg) {
      console.log(`  ${variant.label} (already up to date)`);
      continue;
    }

    writeFileSync(variant.src, updatedSvg);
    console.log(`  Updated ${variant.label}`);
  }

  // Generate PNGs from updated SVGs
  console.log("\nGenerating PNG files...");
  for (const output of PNG_OUTPUTS) {
    const svg = readFileSync(output.svgPath, "utf-8");
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 2048 },
    });
    const png = resvg.render().asPng();
    writeFileSync(output.pngPath, png);
    console.log(`  Generated ${output.label}`);
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Logo regeneration failed:", err);
  process.exit(1);
});
