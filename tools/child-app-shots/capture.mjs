/**
 * Capture the two child-app screens out of the archived design canvas, in the
 * three locales the site ships.
 *
 * Source: docs/html/prototype-2026-08-20/V2_CaregiverFlow.dc.html, artboards
 * 4.2 (Today, the caregiver's screen) and 4.4 (Child mode, the child's screen).
 * Served over http because each artboard fetches its siblings:
 *
 *   cd docs/html/prototype-2026-08-20 && python3 -m http.server 8901
 *
 * The canvas draws its own phone chrome. We strip it and render the screen
 * alone at 390x844, which is the aspect the site's iphone-frame.webp expects,
 * so the two composite without stretching.
 *
 * The archive is English only. The two assets these replace on /for-patients
 * both have pt and es copies under public/screenshots/<locale>/, so shipping
 * English into all three would leave the Portuguese and Spanish pages showing
 * an English product. The translations live here rather than in the archive,
 * which stays as it arrived.
 *
 * Register: the app addresses its user informally in both languages. i18n's pt
 * locale runs 138 "o teu / a tua" against 11 "o seu / a sua", and es is "tu
 * progreso" throughout with no "usted" anywhere. The website's own copy is
 * formal in Portuguese, but these are pictures of the app, so they follow the
 * app.
 */
import puppeteer from "puppeteer";

const SRC = "http://localhost:8901/V2_CaregiverFlow.dc.html";
/**
 * Written straight into the public tree as webp. Puppeteer encodes webp itself,
 * which matters here because macOS sips reads the format but cannot write it and
 * this machine has no ImageMagick or cwebp.
 *
 * Locale layout is the one scripts/generate-asset-manifest.mjs scans: the
 * English base at /screenshots/mobile/x.webp, its translations at
 * /screenshots/<locale>/mobile/x.webp.
 */
const PUBLIC = new URL("../../public/screenshots/", import.meta.url).pathname;

const SHOTS = [
  { tab: "4.2", name: "caregiver-today" },
  { tab: "4.4", name: "child-practice" },
];

/** English source text to its translation. Matched against whole text nodes. */
const COPY = {
  pt: {
    "Hello, Sofía": "Olá, Sofía",
    "Leo's practice · Friday": "Prática do Leo · Sexta-feira",
    "Today with Leo": "Hoje com o Leo",
    "Silly snakes · /s/ in words": "Cobras tontas · /s/ em palavras",
    minutes: "minutos",
    "Ten words, one round. Stop earlier if he is done.":
      "Dez palavras, uma ronda. Para mais cedo se ele já tiver acabado.",
    "See how it's done": "Ver como se faz",
    "Start with Leo": "Começar com o Leo",
    "Two of three done this week": "Duas de três feitas esta semana",
    "Elena replied to Tuesday's recording.":
      "A Elena respondeu à gravação de terça.",
    "She has a note about your cueing.": "Tem uma nota sobre as tuas pistas.",
    "Read Elena's note": "Ler a nota da Elena",
    Game: "Jogo",
    Picture: "Imagem",
    "Tap the circle and say it": "Toca no círculo e diz",
  },
  es: {
    "Hello, Sofía": "Hola, Sofía",
    "Leo's practice · Friday": "Práctica de Leo · Viernes",
    "Today with Leo": "Hoy con Leo",
    "Silly snakes · /s/ in words": "Serpientes bobas · /s/ en palabras",
    minutes: "minutos",
    "Ten words, one round. Stop earlier if he is done.":
      "Diez palabras, una ronda. Para antes si ya ha acabado.",
    "See how it's done": "Ver cómo se hace",
    "Start with Leo": "Empezar con Leo",
    "Two of three done this week": "Dos de tres hechas esta semana",
    "Elena replied to Tuesday's recording.":
      "Elena respondió a la grabación del martes.",
    "She has a note about your cueing.": "Tiene una nota sobre tus pistas.",
    "Read Elena's note": "Leer la nota de Elena",
    Game: "Juego",
    Picture: "Imagen",
    "Tap the circle and say it": "Toca el círculo y dilo",
  },
};

/**
 * The week strip is seven single letters, so they cannot be matched by text:
 * "S" is Monday in Portuguese and Saturday in English. Replaced by position,
 * Monday first, which is the order the strip renders in.
 */
const WEEKDAYS = {
  pt: ["S", "T", "Q", "Q", "S", "S", "D"],
  es: ["L", "M", "X", "J", "V", "S", "D"],
};

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--font-render-hinting=none"],
});

for (const shot of SHOTS) {
  for (const locale of ["en", "pt", "es"]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(SRC, { waitUntil: "networkidle0", timeout: 60000 });

    await page.evaluate((tab) => {
      const b = [...document.querySelectorAll("button.cb")].find((e) =>
        new RegExp("^" + tab.replace(".", "\\.")).test(e.textContent.trim()),
      );
      if (!b) throw new Error("tab not found: " + tab);
      b.click();
    }, shot.tab);

    await new Promise((r) => setTimeout(r, 900));

    await page.addStyleTag({
      content: [
        // Some copy in the artboard carries no font-family and inherits the
        // browser default, which is a serif. On the canvas that goes unnoticed;
        // in a still it is two typefaces in one screen.
        "body{font-family:var(--fb)}",
        // decisions/2026-08-20-design-language-palette-and-type-roles.md
        // rejected the canvas lavender #7B5FD6 by name, for adding a third
        // lavender to a system that already has two with colliding names. It is
        // the dominant surface of the child screen, so shipping the capture as
        // drawn would put that rejected value on the public site beside the
        // other two. Repaint it with lavender-ink, which we own and which
        // carries white text at 4.90:1.
        ":root{--lavanda:#6866C4}",
      ].join("\n"),
    });

    await page.evaluate(
      ({ copy, weekdays }) => {
        // The child screen paints its gradient and its pill from hard-coded
        // hexes rather than the variable, so the :root override misses them.
        // The browser normalises inline hex to rgb() on parse, so both
        // spellings have to be matched or the replacement finds nothing.
        const SWAP = {
          "#7B5FD6": "#6866C4",
          "#5B3FB8": "#454295",
          "rgb(123, 95, 214)": "rgb(104, 102, 196)",
          "rgb(91, 63, 184)": "rgb(69, 66, 149)",
        };
        document.querySelectorAll("[style]").forEach((el) => {
          let v = el.getAttribute("style");
          const before = v;
          for (const [from, to] of Object.entries(SWAP))
            v = v.split(from).join(to);
          if (v !== before) el.setAttribute("style", v);
        });

        // Canvas bug: the record button is display:flex, so the text-align on
        // its parent does nothing and it sits left of centre. Marketing imagery
        // should not ship a primary control that looks misaligned.
        document.querySelectorAll("button").forEach((el) => {
          const cs = getComputedStyle(el);
          if (
            cs.display === "flex" &&
            cs.borderRadius === "50%" &&
            getComputedStyle(el.parentElement).textAlign === "center"
          )
            el.style.margin = "0 auto";
        });

        window.__missed = [];
        if (!copy) return;

        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
        );
        const missed = new Set(Object.keys(copy));
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const key = n.nodeValue.trim();
          if (copy[key]) {
            n.nodeValue = n.nodeValue.replace(key, copy[key]);
            missed.delete(key);
          }
        }

        if (weekdays) {
          const letters = [...document.querySelectorAll("span")].filter(
            (e) =>
              e.children.length === 0 &&
              /^[MTWFS]$/.test(e.textContent.trim()) &&
              parseFloat(getComputedStyle(e).fontSize) < 12,
          );
          if (letters.length === 7)
            letters.forEach((e, i) => (e.textContent = weekdays[i]));
        }

        window.__missed = [...missed];
      },
      { copy: COPY[locale] || null, weekdays: WEEKDAYS[locale] || null },
    );

    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 600));

    const missed = await page.evaluate(() => window.__missed || []);

    const ok = await page.evaluate(() => {
      const screen = [...document.querySelectorAll("div")].find((e) => {
        const r = e.getBoundingClientRect();
        return (
          Math.round(r.width) === 390 &&
          r.height > 700 &&
          /border-radius/.test(e.getAttribute("style") || "")
        );
      });
      if (!screen) return false;

      const anc = new Set();
      for (let n = screen; n; n = n.parentElement) anc.add(n);
      document.querySelectorAll("body *").forEach((e) => {
        if (!anc.has(e) && !screen.contains(e)) e.style.display = "none";
      });
      anc.forEach((e) => {
        if (e !== screen)
          e.style.cssText =
            "margin:0;padding:0;border:0;background:transparent;display:block;position:static;width:auto;height:auto;box-shadow:none;";
      });

      Object.assign(screen.style, {
        border: "0",
        borderRadius: "0",
        boxShadow: "none",
        width: "390px",
        height: "844px",
        overflow: "hidden",
        position: "absolute",
        left: "0",
        top: "0",
      });

      // The child screen is full bleed and puts its first row 14px down, so
      // behind the site's real device frame the island lands on the Game /
      // Picture toggle. The island clears at about 5.7% of screen height, 48px
      // here, so the content starts below it. Padding rather than a margin on
      // the gradient itself, because the toggle and the close button are
      // absolutely positioned against that gradient and a margin would leave
      // them where they are. The strip this opens above the gradient is painted
      // in the colour the gradient starts at, so there is no seam.
      // The caregiver screen draws its own status bar and already clears.
      const bleed = [...screen.querySelectorAll("div")].find((e) =>
        /linear-gradient\(170deg/.test(e.getAttribute("style") || ""),
      );
      if (bleed) {
        screen.style.boxSizing = "border-box";
        screen.style.paddingTop = "44px";
        screen.style.background = "#6866C4";
      }
      document.body.style.cssText =
        "margin:0;padding:0;background:#fff;width:390px;height:844px;overflow:hidden;position:relative;";
      document.documentElement.style.cssText =
        "margin:0;padding:0;width:390px;height:844px;overflow:hidden;";
      return true;
    });
    if (!ok) throw new Error("screen element not found for " + shot.tab);

    await new Promise((r) => setTimeout(r, 400));
    const file =
      (locale === "en" ? "mobile/" : locale + "/mobile/") + shot.name + ".webp";
    await page.screenshot({
      path: PUBLIC + file,
      type: "webp",
      quality: 86,
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });
    // The two screens share one dictionary, so a string belonging to the other
    // screen is expected to miss. Printed so a real miss is visible.
    console.log(
      "wrote",
      file,
      missed.length ? "| unmatched: " + missed.join(" / ") : "",
    );
    await page.close();
  }
}

await browser.close();
