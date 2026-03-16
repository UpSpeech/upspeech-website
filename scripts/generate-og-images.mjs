import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "og");

// Load screenshot as base64 data URI
const screenshotPath = join(
  __dirname,
  "..",
  "public",
  "screenshots",
  "desktop.jpg",
);
const screenshotBase64 = readFileSync(screenshotPath).toString("base64");
const screenshotDataUri = `data:image/jpeg;base64,${screenshotBase64}`;

// -- Page definitions --

const TECHNIQUES = {
  "voluntary-stuttering": {
    title: "Voluntary Stuttering",
    description:
      "Intentionally stutter to reduce fear and increase control over stuttering moments.",
    category: "Stuttering Modification",
  },
  cancelation: {
    title: "Cancellation",
    description:
      "Pause after a stuttered word and repeat it with controlled, easier speech.",
    category: "Stuttering Modification",
  },
  "pull-out": {
    title: "Pull-Out",
    description:
      "Modify a stutter mid-word by easing into smoother speech in real time.",
    category: "Stuttering Modification",
  },
  "preparatory-set": {
    title: "Preparatory Set",
    description:
      "Plan articulatory movements before speaking to reduce stuttering proactively.",
    category: "Stuttering Modification",
  },
  holding: {
    title: "Holding",
    description:
      "Maintain articulatory position during a block to release tension gradually.",
    category: "Stuttering Modification",
  },
  "soft-starts": {
    title: "Soft Starts",
    description:
      "Begin voicing gently with relaxed vocal folds to reduce hard glottal attacks.",
    category: "Fluency Shaping",
  },
  "soft-articulation-contact": {
    title: "Soft Articulation Contact",
    description:
      "Use light, relaxed contact between articulators to reduce tension and improve flow.",
    category: "Fluency Shaping",
  },
  "prolonged-speech": {
    title: "Prolonged Speech",
    description:
      "Extend vowels and continuant consonants to slow rate and increase fluency.",
    category: "Fluency Shaping",
  },
  "speech-speed-management": {
    title: "Speech Speed Management",
    description:
      "Control speaking rate to maintain fluency under different communication demands.",
    category: "Fluency Shaping",
  },
  pauses: {
    title: "Pauses",
    description:
      "Incorporate natural breaks in speech to reduce time pressure and improve fluency.",
    category: "Standalone",
  },
  "identification-desensitization": {
    title: "Identification & Desensitization",
    description:
      "Recognize stuttering patterns and reduce emotional reactions to disfluency.",
    category: "Cognitive",
  },
};

const PAGES = [
  {
    slug: "home",
    title: "AI-Powered Speech Therapy Support",
    subtitle: null,
    description:
      "Transform your speech therapy practice with AI-powered training between sessions.",
    category: null,
    showScreenshot: true,
  },
  {
    slug: "techniques",
    title: "Speech Therapy Techniques",
    subtitle: null,
    description:
      "Evidence-based techniques for stuttering — fluency shaping, modification, and cognitive approaches.",
    category: null,
    showScreenshot: true,
  },
  ...Object.entries(TECHNIQUES).map(([slug, data]) => ({
    slug: `techniques/${slug}`,
    title: data.title,
    subtitle: null,
    description: data.description,
    category: data.category,
    showScreenshot: true,
  })),
  {
    slug: "what-is-stuttering",
    title: "What Is Stuttering?",
    subtitle: "Types, Causes & Treatment",
    description:
      "A comprehensive guide to understanding stuttering and evidence-based treatment approaches.",
    category: "Guide",
    showScreenshot: false,
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    subtitle: null,
    description: "How we protect your data and respect your privacy.",
    category: "Legal",
    showScreenshot: false,
  },
  {
    slug: "terms",
    title: "Terms of Service",
    subtitle: null,
    description: "Terms and conditions for using the UpSpeech platform.",
    category: "Legal",
    showScreenshot: false,
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    subtitle: null,
    description: "How we use cookies to improve your experience.",
    category: "Legal",
    showScreenshot: false,
  },
];

// -- Font loading --

async function loadFont(family, weight) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&display=swap`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((r) => r.text());

  const match = css.match(/src: url\((.+?)\)/);
  if (!match) throw new Error(`Font not found: ${family} ${weight}`);

  const data = await fetch(match[1]).then((r) => r.arrayBuffer());
  return { name: family, data, weight, style: "normal" };
}

// -- Logo as SVG paths (white version, icon only) --

function LogoIcon() {
  return {
    type: "svg",
    props: {
      width: 30,
      height: 34,
      viewBox: "100 84 178 206",
      children: [
        {
          type: "path",
          props: {
            d: "M106.667 158C106.667 132.816 127.082 112.4 152.266 112.4H153.466C177.988 112.4 197.867 132.279 197.867 156.8C197.867 181.321 177.988 201.2 153.466 201.2H106.667V158Z",
            fill: "#FDFDFD",
          },
        },
        {
          type: "path",
          props: {
            d: "M106.667 210.8H185.866C199.121 210.8 209.867 221.545 209.867 234.8V258.8C209.867 272.055 199.121 282.8 185.867 282.8H130.667C117.412 282.8 106.667 272.055 106.667 258.8V210.8Z",
            fill: "#FDFDFD",
          },
        },
        {
          type: "circle",
          props: { cx: 238.066, cy: 122.6, r: 33, fill: "#958AF0" },
        },
      ],
    },
  };
}

// -- Screenshot card component --

function ScreenshotCard() {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        position: "absolute",
        right: -20,
        top: 100,
        width: 480,
        height: 480,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(149,138,240,0.15)",
      },
      children: [
        {
          type: "img",
          props: {
            src: screenshotDataUri,
            width: 480,
            height: 480,
            style: {
              objectFit: "cover",
              objectPosition: "left top",
            },
          },
        },
      ],
    },
  };
}

// -- OG Image template --

function OGImage({ title, subtitle, description, category, showScreenshot }) {
  const textMaxWidth = showScreenshot ? 600 : 800;
  const children = [];

  // Background gradient overlay — subtle purple glow
  children.push({
    type: "div",
    props: {
      style: {
        position: "absolute",
        bottom: -80,
        right: showScreenshot ? 200 : -80,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(149,138,240,0.15) 0%, transparent 70%)",
      },
    },
  });

  // Screenshot card (positioned absolutely on the right)
  if (showScreenshot) {
    children.push(ScreenshotCard());
  }

  // Top bar: logo icon + wordmark
  children.push({
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
      },
      children: [
        LogoIcon(),
        {
          type: "span",
          props: {
            style: {
              fontSize: 32,
              fontFamily: "Outfit",
              fontWeight: 700,
              color: "#FDFDFD",
              letterSpacing: "-0.01em",
            },
            children: "UpSpeech",
          },
        },
      ],
    },
  });

  // Category badge
  if (category) {
    children.push({
      type: "div",
      props: {
        style: {
          display: "flex",
          marginTop: 24,
        },
        children: [
          {
            type: "span",
            props: {
              style: {
                fontSize: 18,
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600,
                color: "#958AF0",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              },
              children: category,
            },
          },
        ],
      },
    });
  }

  // Title
  const fontSize = title.length > 24 ? 48 : showScreenshot ? 56 : 64;
  children.push({
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        marginTop: category ? 12 : 24,
        maxWidth: textMaxWidth,
        gap: 8,
      },
      children: [
        {
          type: "span",
          props: {
            style: {
              fontSize,
              fontFamily: "Outfit",
              fontWeight: 700,
              color: "#FDFDFD",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            },
            children: title,
          },
        },
        ...(subtitle
          ? [
              {
                type: "span",
                props: {
                  style: {
                    fontSize: 32,
                    fontFamily: "Outfit",
                    fontWeight: 400,
                    color: "rgba(253,253,253,0.7)",
                    lineHeight: 1.2,
                    marginTop: 4,
                  },
                  children: subtitle,
                },
              },
            ]
          : []),
      ],
    },
  });

  // Divider
  children.push({
    type: "div",
    props: {
      style: {
        width: 64,
        height: 3,
        background: "#958AF0",
        borderRadius: 2,
        marginTop: 20,
      },
    },
  });

  // Description
  children.push({
    type: "span",
    props: {
      style: {
        fontSize: 22,
        fontFamily: "Plus Jakarta Sans",
        fontWeight: 400,
        color: "rgba(253,253,253,0.6)",
        lineHeight: 1.5,
        marginTop: 16,
        maxWidth: textMaxWidth,
      },
      children: description,
    },
  });

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "56px 64px",
        backgroundColor: "#1a1f3d",
        position: "relative",
        overflow: "hidden",
      },
      children,
    },
  };
}

// -- Generation --

async function main() {
  console.log("Loading fonts...");
  const fonts = await Promise.all([
    loadFont("Outfit", 700),
    loadFont("Outfit", 400),
    loadFont("Plus Jakarta Sans", 400),
    loadFont("Plus Jakarta Sans", 500),
    loadFont("Plus Jakarta Sans", 600),
  ]);

  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log(`Generating ${PAGES.length} OG images...`);

  for (const page of PAGES) {
    const svg = await satori(
      OGImage({
        title: page.title,
        subtitle: page.subtitle,
        description: page.description,
        category: page.category,
        showScreenshot: page.showScreenshot,
      }),
      { width: 1200, height: 630, fonts },
    );

    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 2400 },
    });
    const png = resvg.render().asPng();

    // Create subdirectories if needed (e.g. techniques/)
    const outPath = join(OUT_DIR, `${page.slug}.png`);
    const outDir = dirname(outPath);
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }

    writeFileSync(outPath, png);
    console.log(`  ${page.slug}.png`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("OG image generation failed:", err);
  process.exit(1);
});
