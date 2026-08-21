import { useEffect, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { trackButtonClick } from "@/lib/analytics";
import { useT } from "@/i18n";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// GPT Image 2 returns 1536x864 natively and the srcset tops out there rather
// than upscaling: inventing detail in a face is worse than a slightly soft
// background photo sitting behind a scrim.
const PHOTO_WIDE_SRCSET =
  "/images/people/practice-hero-864.webp 864w, " +
  "/images/people/practice-hero-1152.webp 1152w, " +
  "/images/people/practice-hero-1536.webp 1536w";
const PHOTO_WIDE_FALLBACK = "/images/people/practice-hero-1152.webp";
const PHOTO_PORTRAIT = "/images/people/practice-hero-portrait.webp";
const NARROW = "(max-width: 767px)";
const WIDE = "(min-width: 768px)";

const Line = ({
  children,
  delay,
  loaded,
}: {
  children: ReactNode;
  delay: number;
  loaded: boolean;
}) => (
  // Bottom padding gives the clip box room for descenders (e.g. the "g" in
  // "going"); the matching negative margin keeps the tight line rhythm. The
  // pre-reveal offset clears the padded box so no glyph peeks through.
  <span className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
    <span
      className="block will-change-transform"
      style={{
        transition: `transform 700ms ${EASE}, opacity 700ms ${EASE}`,
        transitionDelay: `${delay}ms`,
        transform: loaded ? "translateY(0)" : "translateY(130%)",
        opacity: loaded ? 1 : 0,
      }}
    >
      {/* The three lines of the headline are separate block boxes with nothing
          between them, so textContent ran them together: the homepage h1 read
          "Your therapykeeps goingbetween sessions." to anything extracting text
          rather than laying it out, crawlers and answer engines included. A
          trailing space is dropped at the end of a line, so this costs nothing
          visually. */}
      {children}{" "}
    </span>
  </span>
);

const HeroOptionD = () => {
  const t = useT().home.hero;
  const [loaded, setLoaded] = useState(false);
  const [ambient, setAmbient] = useState(false);
  const [ambientReady, setAmbientReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Mounted only after the page has finished loading, so it never competes
  // for the first paint. Phones do not get it at all: it buys almost nothing
  // at that size and the subject is a different frame there anyway.
  //
  // The prerender bail-out is load-bearing. Prerender waits for networkidle0,
  // which is after window.load, so without it this mounted during the scrape
  // and the <video preload="auto"> was written into the static HTML of all
  // three home pages. Every mobile visitor then downloaded 159KB of video for
  // an element hydration immediately removed.
  useEffect(() => {
    if ((window as { __PRERENDER__?: boolean }).__PRERENDER__) return;
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!wide.matches || reduce.matches) return;

    const start = () => setAmbient(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(start, 300);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-calm-charcoal">
      {/* Chrome does not treat a viewport-covering image as an LCP candidate:
          it reads it as the page background and skips it. So this photograph
          can never be the LCP element however fast it arrives, and with the
          demo card gone there is no contained image left in the first
          viewport. LCP here is the headline, which is text.

          The photograph still gets the high-priority preload, because it is
          what the visitor is waiting to see even though it is not what LCP
          measures. Each preload stays behind a `media` guard so a phone never
          pays for the 1920px file it will not display. */}
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={PHOTO_PORTRAIT}
          media={NARROW}
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={PHOTO_WIDE_FALLBACK}
          imageSrcSet={PHOTO_WIDE_SRCSET}
          imageSizes="100vw"
          media={WIDE}
          fetchPriority="high"
        />
      </Helmet>

      <picture>
        <source
          media={NARROW}
          srcSet={PHOTO_PORTRAIT}
          width={864}
          height={1152}
        />
        <source
          media={WIDE}
          srcSet={PHOTO_WIDE_SRCSET}
          sizes="100vw"
          width={1536}
          height={864}
        />
        <img
          src={PHOTO_WIDE_FALLBACK}
          alt={t.photoAlt}
          width={1536}
          height={864}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-x-0 top-0 h-[100svh] w-full object-cover object-center md:h-full"
        />
      </picture>

      {/* Five seconds of almost nothing: she breathes, blinks once, the light
          moves. Generated from the poster frame, so there is no jump when it
          fades in. 120KB, because a near-static scene compresses to nearly
          nothing. */}
      {ambient && (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000"
          style={{ opacity: ambientReady ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setAmbientReady(true)}
        >
          <source src="/videos/hero-ambient.webm" type="video/webm" />
          <source src="/videos/hero-ambient.mp4" type="video/mp4" />
        </video>
      )}

      {/* Two scrims, because the copy sits beside the subject on a wide screen
          and on top of her on a phone. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(27,31,59,0.52) 0%, rgba(27,31,59,0.46) 50%, rgba(27,31,59,0.80) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(96deg, rgba(27,31,59,0.90) 0%, rgba(27,31,59,0.72) 34%, rgba(27,31,59,0.28) 62%, rgba(27,31,59,0.05) 84%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-[max(1.5rem,5vw)] pb-14 pt-28 lg:pb-16 lg:pt-32">
        {/* The copy is capped so it never runs across the subject's face on a
            wide screen. It used to share the row with the demo card, which is
            what kept it narrow; the cap now does that job explicitly. */}
        <div className="max-w-[46rem]">
          <div
            className="mb-6 sm:mb-8"
            style={{
              transition: `opacity 600ms ${EASE}, transform 600ms ${EASE}`,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <span className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-white/70">
              {t.eyebrow}
            </span>
          </div>

          <h1
            className="font-heading font-bold text-white tracking-tight max-w-[18ch] sm:max-w-[16ch]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}
          >
            <Line delay={80} loaded={loaded}>
              {t.headlineLine1}
            </Line>
            <Line delay={200} loaded={loaded}>
              {t.headlineLine2}
            </Line>
            <Line delay={320} loaded={loaded}>
              <span className="text-calm-lavender-bright">
                {t.headlineLine3}
              </span>
            </Line>
          </h1>

          <p
            className="mt-6 sm:mt-8 max-w-xl font-body text-lg sm:text-xl text-white/85 leading-relaxed"
            style={{
              transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
              transitionDelay: "500ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {t.body}
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-4"
            style={{
              transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
              transitionDelay: "650ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <a
              href="#cta"
              onClick={() =>
                trackButtonClick("request_early_access_hero", "hero")
              }
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-body font-semibold text-calm-navy transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-calm-lavender-bright hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.55)] hover:-translate-y-0.5"
            >
              {t.requestAccess}
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#how-it-works"
              onClick={() => trackButtonClick("see_how_it_works", "hero")}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-body font-semibold text-white transition-colors duration-500 hover:border-white/80 hover:bg-white/10"
            >
              {t.seeHowItWorks}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroOptionD;
