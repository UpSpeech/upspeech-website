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
      "Evidence-based techniques for stuttering: fluency shaping, modification, and cognitive approaches.",
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
  {
    slug: "for-patients",
    title: "For Patients",
    subtitle: null,
    description:
      "How patients practise speech therapy between sessions with UpSpeech, guided by their speech-language pathologist.",
    category: null,
    showScreenshot: true,
  },
  {
    slug: "support",
    title: "Support",
    subtitle: null,
    description:
      "Get help with UpSpeech. Contact our team, find answers to common questions, and manage your account and data.",
    category: null,
    showScreenshot: false,
  },
  {
    slug: "delete-account",
    title: "Delete Your Account or Data",
    subtitle: null,
    description:
      "How to delete your UpSpeech account or specific data, and what happens to your information when you do.",
    category: "Legal",
    showScreenshot: false,
  },
];

// -- Per-locale card copy --
//
// The card text is a second home for marketing strings: this script is a plain
// ESM module and cannot import the TypeScript i18n dictionary. PT/ES copy below
// is seeded from the real page copy (src/i18n/locales/{pt,es}.ts, Support.tsx)
// and the established technique terminology in technique-faqs-{pt,es}.ts. Any
// future locale or copy change must be mirrored here (see plan 116).
//
// English is the source set in PAGES above and stays byte-identical, so it is
// not duplicated here. Each entry overrides title/description/category for one
// slug; the `category` value is the translated badge word.

const CATEGORY_PT = {
  "Stuttering Modification": "Modificação da Gaguez",
  "Fluency Shaping": "Modelagem da Fluência",
  Standalone: "Técnica Independente",
  Cognitive: "Abordagem Cognitiva",
  Legal: "Legal", // same in PT/ES
};

const CATEGORY_ES = {
  "Stuttering Modification": "Modificación de la Tartamudez",
  "Fluency Shaping": "Modelado de la Fluidez",
  Standalone: "Técnica Independiente",
  Cognitive: "Enfoque Cognitivo",
  Legal: "Legal", // same in PT/ES
};

const TRANSLATIONS = {
  pt: {
    home: {
      title: "Apoio à terapia da fala com IA",
      description:
        "Apoio contínuo para a terapia da gaguez. Prática estruturada entre sessões, relatórios redigidos por IA. Os terapeutas estão sempre no controlo.",
    },
    techniques: {
      title: "Técnicas de Terapia da Fala",
      description:
        "Técnicas estabelecidas para a gaguez: modelagem da fluência, modificação da gaguez e abordagens cognitivas.",
    },
    "techniques/voluntary-stuttering": {
      title: "Gaguez Voluntária",
      description:
        "Gaguejar intencionalmente para reduzir o medo e ganhar mais controlo sobre os momentos de gaguez.",
      category: CATEGORY_PT["Stuttering Modification"],
    },
    "techniques/cancelation": {
      title: "Cancelamento",
      description:
        "Pausar depois de uma palavra gaguejada e repeti-la com uma fala controlada e mais fácil.",
      category: CATEGORY_PT["Stuttering Modification"],
    },
    "techniques/pull-out": {
      title: "Pull-Out",
      description:
        "Modificar uma gaguez a meio da palavra, suavizando a fala em tempo real.",
      category: CATEGORY_PT["Stuttering Modification"],
    },
    "techniques/preparatory-set": {
      title: "Pré-Ajuste Articulatório",
      description:
        "Planear os movimentos articulatórios antes de falar para reduzir a gaguez de forma proativa.",
      category: CATEGORY_PT["Stuttering Modification"],
    },
    "techniques/holding": {
      title: "Retenção",
      description:
        "Manter a posição articulatória durante um bloqueio para libertar a tensão gradualmente.",
      category: CATEGORY_PT["Stuttering Modification"],
    },
    "techniques/soft-starts": {
      title: "Inícios Suaves",
      description:
        "Iniciar a voz com suavidade e cordas vocais relaxadas para reduzir ataques glóticos duros.",
      category: CATEGORY_PT["Fluency Shaping"],
    },
    "techniques/soft-articulation-contact": {
      title: "Contacto Articulatório Suave",
      description:
        "Usar contacto leve e relaxado entre os articuladores para reduzir a tensão e melhorar o fluxo.",
      category: CATEGORY_PT["Fluency Shaping"],
    },
    "techniques/prolonged-speech": {
      title: "Fala Prolongada",
      description:
        "Prolongar vogais e consoantes contínuas para abrandar o ritmo e aumentar a fluência.",
      category: CATEGORY_PT["Fluency Shaping"],
    },
    "techniques/speech-speed-management": {
      title: "Gestão da Velocidade de Fala",
      description:
        "Controlar o ritmo da fala para manter a fluência perante diferentes exigências de comunicação.",
      category: CATEGORY_PT["Fluency Shaping"],
    },
    "techniques/pauses": {
      title: "Pausas",
      description:
        "Incorporar pausas naturais na fala para reduzir a pressão do tempo e melhorar a fluência.",
      category: CATEGORY_PT["Standalone"],
    },
    "techniques/identification-desensitization": {
      title: "Identificação e Dessensibilização",
      description:
        "Reconhecer padrões de gaguez e reduzir as reações emocionais à disfluência.",
      category: CATEGORY_PT["Cognitive"],
    },
    privacy: {
      title: "Política de Privacidade",
      description: "Como protegemos os seus dados e respeitamos a sua privacidade.",
      category: CATEGORY_PT["Legal"],
    },
    terms: {
      title: "Termos de Serviço",
      description: "Termos e condições de utilização da plataforma UpSpeech.",
      category: CATEGORY_PT["Legal"],
    },
    cookies: {
      title: "Política de Cookies",
      description: "Como usamos cookies para melhorar a sua experiência.",
      category: CATEGORY_PT["Legal"],
    },
    "for-patients": {
      title: "Para Pacientes",
      description:
        "Como os pacientes praticam terapia da fala entre sessões com a UpSpeech, orientados pelo seu terapeuta da fala.",
      // no category badge
    },
    support: {
      title: "Suporte",
      description:
        "Obtenha ajuda com a UpSpeech. Contacte a nossa equipa, encontre respostas e faça a gestão da sua conta e dados.",
      // no category badge
    },
    "delete-account": {
      title: "Eliminar a Conta ou os Dados",
      description:
        "Como eliminar a sua conta UpSpeech ou dados específicos, e o que acontece à sua informação.",
      category: CATEGORY_PT["Legal"],
    },
  },
  es: {
    home: {
      title: "Apoyo a la logopedia con IA",
      description:
        "Apoyo continuo para la terapia de la tartamudez. Práctica estructurada entre sesiones, informes redactados por IA. Los terapeutas siempre tienen el control.",
    },
    techniques: {
      title: "Técnicas de Logopedia",
      description:
        "Técnicas establecidas para la tartamudez: modelado de la fluidez, modificación de la tartamudez y enfoques cognitivos.",
    },
    "techniques/voluntary-stuttering": {
      title: "Tartamudeo Voluntario",
      description:
        "Tartamudear de forma intencionada para reducir el miedo y ganar control sobre los momentos de tartamudeo.",
      category: CATEGORY_ES["Stuttering Modification"],
    },
    "techniques/cancelation": {
      title: "Cancelación",
      description:
        "Pausar tras una palabra tartamudeada y repetirla con un habla controlada y más fácil.",
      category: CATEGORY_ES["Stuttering Modification"],
    },
    "techniques/pull-out": {
      title: "Pull-Out",
      description:
        "Modificar un tartamudeo a mitad de palabra, suavizando el habla en tiempo real.",
      category: CATEGORY_ES["Stuttering Modification"],
    },
    "techniques/preparatory-set": {
      title: "Set Preparatorio",
      description:
        "Planificar los movimientos articulatorios antes de hablar para reducir el tartamudeo de forma proactiva.",
      category: CATEGORY_ES["Stuttering Modification"],
    },
    "techniques/holding": {
      title: "Retención",
      description:
        "Mantener la posición articulatoria durante un bloqueo para liberar la tensión de forma gradual.",
      category: CATEGORY_ES["Stuttering Modification"],
    },
    "techniques/soft-starts": {
      title: "Inicios Suaves",
      description:
        "Iniciar la voz con suavidad y cuerdas vocales relajadas para reducir los ataques glóticos duros.",
      category: CATEGORY_ES["Fluency Shaping"],
    },
    "techniques/soft-articulation-contact": {
      title: "Contacto Articulatorio Suave",
      description:
        "Usar contacto ligero y relajado entre los articuladores para reducir la tensión y mejorar el flujo.",
      category: CATEGORY_ES["Fluency Shaping"],
    },
    "techniques/prolonged-speech": {
      title: "Habla Prolongada",
      description:
        "Alargar vocales y consonantes continuas para reducir la velocidad y aumentar la fluidez.",
      category: CATEGORY_ES["Fluency Shaping"],
    },
    "techniques/speech-speed-management": {
      title: "Gestión de la Velocidad del Habla",
      description:
        "Controlar la velocidad del habla para mantener la fluidez ante distintas exigencias de comunicación.",
      category: CATEGORY_ES["Fluency Shaping"],
    },
    "techniques/pauses": {
      title: "Pausas",
      description:
        "Incorporar pausas naturales en el habla para reducir la presión del tiempo y mejorar la fluidez.",
      category: CATEGORY_ES["Standalone"],
    },
    "techniques/identification-desensitization": {
      title: "Identificación y Desensibilización",
      description:
        "Reconocer patrones de tartamudeo y reducir las reacciones emocionales ante la disfluencia.",
      category: CATEGORY_ES["Cognitive"],
    },
    privacy: {
      title: "Política de Privacidad",
      description: "Cómo protegemos tus datos y respetamos tu privacidad.",
      category: CATEGORY_ES["Legal"],
    },
    terms: {
      title: "Términos del Servicio",
      description: "Términos y condiciones de uso de la plataforma UpSpeech.",
      category: CATEGORY_ES["Legal"],
    },
    cookies: {
      title: "Política de Cookies",
      description: "Cómo usamos cookies para mejorar tu experiencia.",
      category: CATEGORY_ES["Legal"],
    },
    "for-patients": {
      title: "Para Pacientes",
      description:
        "Cómo los pacientes practican logopedia entre sesiones con UpSpeech, guiados por su logopeda.",
      // no category badge
    },
    support: {
      title: "Soporte",
      description:
        "Obtén ayuda con UpSpeech. Contacta con nuestro equipo, encuentra respuestas y gestiona tu cuenta y tus datos.",
      // no category badge
    },
    "delete-account": {
      title: "Eliminar tu Cuenta o Datos",
      description:
        "Cómo eliminar tu cuenta de UpSpeech o datos concretos, y qué ocurre con tu información.",
      category: CATEGORY_ES["Legal"],
    },
  },
};

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
        boxShadow:
          "0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(149,138,240,0.15)",
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

  // Background gradient overlay (subtle purple glow)
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

  const LOCALES = ["en", "pt", "es"];
  console.log(
    `Generating ${PAGES.length * LOCALES.length} OG images (${PAGES.length} pages x ${LOCALES.length} locales)...`,
  );

  for (const locale of LOCALES) {
    // English keeps the historical flat path (public/og/<slug>.png); pt/es get
    // a locale folder (public/og/<locale>/<slug>.png). ogImageForPath() mirrors
    // this in SEO.tsx.
    const localeDir = locale === "en" ? OUT_DIR : join(OUT_DIR, locale);

    for (const page of PAGES) {
      // English uses the source copy in PAGES; pt/es override from TRANSLATIONS,
      // falling back to the English string for any unset field.
      const t = locale === "en" ? undefined : TRANSLATIONS[locale]?.[page.slug];
      const title = t?.title ?? page.title;
      const description = t?.description ?? page.description;
      const category =
        t && "category" in t ? t.category : page.category;

      const svg = await satori(
        OGImage({
          title,
          subtitle: page.subtitle,
          description,
          category,
          showScreenshot: page.showScreenshot,
        }),
        { width: 1200, height: 630, fonts },
      );

      const resvg = new Resvg(svg, {
        fitTo: { mode: "width", value: 2400 },
      });
      const png = resvg.render().asPng();

      // Create subdirectories if needed (e.g. <locale>/ and techniques/)
      const outPath = join(localeDir, `${page.slug}.png`);
      const outDir = dirname(outPath);
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }

      // PNG compression (plan 113 Step 4) was deferred; an optimizer
      // (e.g. sharp/pngquant) could run on `png` here before writing.
      writeFileSync(outPath, png);
      console.log(`  ${locale === "en" ? "" : `${locale}/`}${page.slug}.png`);
    }
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("OG image generation failed:", err);
  process.exit(1);
});
