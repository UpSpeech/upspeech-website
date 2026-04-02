import opentype from "opentype.js";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "fs";
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

// -- Icon geometry (original coordinates) --

// Full icon bounding box including purple accent circle:
// Top of circle: cy - r = 122.6 - 33 = 89.6
// Bottom of lower shape: 282.8
// Left of shapes: 106.667
// Right of circle: cx + r = 238.066 + 33 = 271.066
const ICON = {
  topPath:
    "M106.667 158C106.667 132.816 127.082 112.4 152.266 112.4H153.466C177.988 112.4 197.867 132.279 197.867 156.8C197.867 181.322 177.988 201.2 153.466 201.2H106.667V158Z",
  bottomPath:
    "M106.667 210.8H185.866C199.121 210.8 209.867 221.545 209.867 234.8V258.8C209.867 272.055 199.121 282.8 185.867 282.8H130.667C117.412 282.8 106.667 272.055 106.667 258.8V210.8Z",
  circle: { cx: 238.066, cy: 122.6, r: 33 },
  // Bounding box (including circle)
  minX: 106.667,
  maxX: 271.066,
  minY: 89.6,
  maxY: 282.8,
};
ICON.width = ICON.maxX - ICON.minX; // 164.4
ICON.height = ICON.maxY - ICON.minY; // 193.2
ICON.centerX = (ICON.minX + ICON.maxX) / 2; // 188.87
ICON.centerY = (ICON.minY + ICON.maxY) / 2; // 186.2

// -- SVG generation --

function buildSVG({
  wordmarkPath,
  textFill,
  iconScale,
  iconX,
  iconY,
  viewBoxWidth,
  viewBoxHeight,
}) {
  // Icon transform: scale around center, then translate to target position
  // transform = translate(tx, ty) scale(s) where:
  //   new_x = original_x * s + tx
  //   new_y = original_y * s + ty
  // We want icon center to end up at (iconX + scaledWidth/2, iconY + scaledHeight/2)
  const s = iconScale;
  const scaledCenterX = iconX + (ICON.width * s) / 2;
  const scaledCenterY = iconY + (ICON.height * s) / 2;
  const tx = scaledCenterX - ICON.centerX * s;
  const ty = scaledCenterY - ICON.centerY * s;

  const iconTransform = `translate(${tx.toFixed(3)}, ${ty.toFixed(3)}) scale(${s})`;

  const iconFill = textFill;
  const circleFill = "#958AF0";

  return `<svg width="${viewBoxWidth}" height="${viewBoxHeight}" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="${viewBoxWidth}" height="${viewBoxHeight}" fill="none"/>
<path d="${wordmarkPath}" fill="${textFill}"/>
<path transform="${iconTransform}" d="${ICON.topPath}" fill="${iconFill}"/>
<path transform="${iconTransform}" d="${ICON.bottomPath}" fill="${iconFill}"/>
<circle transform="${iconTransform}" cx="${ICON.circle.cx}" cy="${ICON.circle.cy}" r="${ICON.circle.r}" fill="${circleFill}"/>
</svg>
`;
}

// -- File definitions --

const LOGO_VARIANTS = [
  {
    label: "app-frontend/logo.svg",
    path: join(__dirname, "../../app-frontend/public/images/logo.svg"),
    textFill: "#212540",
  },
  {
    label: "app-frontend/logo-invert.svg",
    path: join(__dirname, "../../app-frontend/public/images/logo-invert.svg"),
    textFill: "#FDFDFD",
  },
  {
    label: "upspeech-website/logo.svg",
    path: join(__dirname, "../public/images/logo.svg"),
    textFill: "#212540",
  },
  {
    label: "upspeech-website/logo-invert.svg",
    path: join(__dirname, "../public/images/logo-invert.svg"),
    textFill: "#FDFDFD",
  },
  {
    label: "demo-videos/logo.svg",
    path: join(__dirname, "../../demo-videos/remotion/public/assets/logo.svg"),
    textFill: "#212540",
  },
  {
    label: "demo-videos/logo-invert.svg",
    path: join(
      __dirname,
      "../../demo-videos/remotion/public/assets/logo-invert.svg",
    ),
    textFill: "#FDFDFD",
  },
];

const PNG_OUTPUTS = [
  {
    label: "app-frontend/logo.png",
    svgVariant: "app-frontend/logo.svg",
    pngPath: join(__dirname, "../../app-frontend/public/images/logo.png"),
  },
  {
    label: "app-frontend/logo-invert.png",
    svgVariant: "app-frontend/logo-invert.svg",
    pngPath: join(
      __dirname,
      "../../app-frontend/public/images/logo-invert.png",
    ),
  },
  {
    label: "upspeech-website/logo.png",
    svgVariant: "upspeech-website/logo.svg",
    pngPath: join(__dirname, "../public/images/logo.png"),
  },
  {
    label: "upspeech-website/logo-invert.png",
    svgVariant: "upspeech-website/logo-invert.svg",
    pngPath: join(__dirname, "../public/images/logo-invert.png"),
  },
];

async function main() {
  console.log("Downloading Outfit Bold font...");
  const font = await downloadFont();

  const text = "UpSpeech";
  const viewBoxWidth = 1024;
  const viewBoxHeight = 374;
  const margin = 50;

  // Scale icon so its full height (including circle) is 1.5x the text cap height
  // This matches the OG image proportions (34px icon / 22.6px cap height ≈ 1.5)
  const iconToTextRatio = 1.5;

  // Cap height ratio for this font
  const capHeightRatio =
    (font.tables.os2.sCapHeight || font.ascender * 0.7) / font.unitsPerEm;

  // Solve: iconWidth * scale + gap + textAdvanceWidth = availableWidth
  // Where: scale = iconToTextRatio * fontSize * capHeightRatio / ICON.height
  const advPerPx = font.getAdvanceWidth(text, 1);
  const gap = 50;
  const availableWidth = viewBoxWidth - 2 * margin;

  const fontSize =
    (availableWidth - gap) /
    ((ICON.width * iconToTextRatio * capHeightRatio) / ICON.height + advPerPx);

  const capHeight = fontSize * capHeightRatio;
  const iconScale = (iconToTextRatio * capHeight) / ICON.height;
  const scaledIconWidth = ICON.width * iconScale;
  const textWidth = font.getAdvanceWidth(text, fontSize);

  console.log(`Font size: ${fontSize.toFixed(1)}px`);
  console.log(`Cap height: ${capHeight.toFixed(1)}px`);
  console.log(
    `Icon scale: ${iconScale.toFixed(3)} (${(ICON.height * iconScale).toFixed(1)}px tall)`,
  );
  console.log(`Text width: ${textWidth.toFixed(1)}px`);
  console.log(
    `Total width: ${(scaledIconWidth + gap + textWidth).toFixed(1)}px / ${availableWidth}px available`,
  );

  // Position: center icon (taller element) vertically, align text to icon center
  const scaledIconHeight = ICON.height * iconScale;
  const centerY = viewBoxHeight / 2;
  const iconX = margin;
  const iconY = centerY - scaledIconHeight / 2;
  const textX = margin + scaledIconWidth + gap;
  const textBaseline = centerY + capHeight / 2;

  const wordmarkPath = font
    .getPath(text, textX, textBaseline, fontSize)
    .toPathData(3);
  console.log(`Generated wordmark path (${wordmarkPath.length} chars)`);

  // Generate all SVGs
  console.log("\nWriting SVG files...");
  const svgMap = {};
  for (const variant of LOGO_VARIANTS) {
    const svg = buildSVG({
      wordmarkPath,
      textFill: variant.textFill,
      iconScale,
      iconX,
      iconY,
      viewBoxWidth,
      viewBoxHeight,
    });
    writeFileSync(variant.path, svg);
    svgMap[variant.label] = svg;
    console.log(`  ${variant.label}`);
  }

  // Generate PNGs
  console.log("\nGenerating PNG files...");
  for (const output of PNG_OUTPUTS) {
    const svg = svgMap[output.svgVariant];
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 2048 },
    });
    const png = resvg.render().asPng();
    writeFileSync(output.pngPath, png);
    console.log(`  ${output.label}`);
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Logo regeneration failed:", err);
  process.exit(1);
});
