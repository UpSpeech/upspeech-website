import { useEffect, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { PlayIcon } from "@heroicons/react/24/outline";
import { trackButtonClick } from "@/lib/analytics";
import { useT, useLocale, localizedAsset } from "@/i18n";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const PHOTO_WIDE_SRCSET =
  "/images/people/practice-hero-960.webp 960w, " +
  "/images/people/practice-hero-1440.webp 1440w, " +
  "/images/people/practice-hero-1920.webp 1920w";
const PHOTO_WIDE_FALLBACK = "/images/people/practice-hero-1440.webp";
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
  const locale = useLocale();
  const heroVideo = localizedAsset("/videos/hero-demo.mp4", locale);
  const heroPoster = localizedAsset("/videos/hero-demo-poster.webp", locale);
  const [loaded, setLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", apply);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-calm-charcoal">
      {/* The photograph is the LCP element now, so it gets the preload that
          used to belong to the demo poster. Both breakpoints are preloaded
          under a `media` guard, otherwise a phone pays for the 1920px file it
          will never display. */}
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
        <source media={NARROW} srcSet={PHOTO_PORTRAIT} width={810} height={1080} />
        <source
          media={WIDE}
          srcSet={PHOTO_WIDE_SRCSET}
          sizes="100vw"
          width={1920}
          height={1072}
        />
        <img
          src={PHOTO_WIDE_FALLBACK}
          alt={t.photoAlt}
          width={1440}
          height={804}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-[center_28%]"
        />
      </picture>

      {/* Two scrims, because the copy sits beside the subject on a wide screen
          and on top of her on a phone. */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(27,31,59,0.72) 0%, rgba(27,31,59,0.58) 46%, rgba(27,31,59,0.90) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(96deg, rgba(27,31,59,0.90) 0%, rgba(27,31,59,0.72) 34%, rgba(27,31,59,0.28) 62%, rgba(27,31,59,0.05) 84%)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-end gap-10 px-[max(1.5rem,5vw)] pb-14 pt-32 lg:grid-cols-[1.2fr,0.8fr] lg:gap-16 lg:pb-16 lg:pt-40">
        {/* Left column: value proposition */}
        <div>
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

        {/* Right column: the product demo, no longer the hero. It still plays;
            it just stops being the first thing on the page. */}
        <div
          className="w-full max-w-[24rem] justify-self-start self-end lg:max-w-[21rem] lg:justify-self-end"
          style={{
            transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
            transitionDelay: "800ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <div className="relative overflow-hidden rounded-[1.25rem] border border-white/15 bg-white/95 shadow-[0_40px_80px_-28px_rgba(0,0,0,0.65)]">
            <div className="flex items-center gap-2 border-b border-calm-charcoal/5 bg-calm-light/80 px-4 py-3">
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <div className="ml-3 flex h-5 max-w-[260px] flex-1 items-center justify-center rounded-md border border-calm-charcoal/5 bg-white/90">
                <span className="font-body text-[10px] text-calm-charcoal/80 tabular-nums">
                  app.upspeech.app/dashboard
                </span>
              </div>
            </div>
            {playing ? (
              <video
                className="block w-full h-auto"
                src={heroVideo}
                poster={heroPoster}
                controls
                autoPlay={!reducedMotion}
                muted
                playsInline
                aria-label={t.videoAriaLabel}
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPlaying(true);
                  trackButtonClick("hero_play_demo", "hero");
                }}
                className="group relative block w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-calm-navy/40"
                aria-label={t.playAriaLabel}
              >
                <img
                  src={heroPoster}
                  alt={t.posterAlt}
                  className="block w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-calm-navy/90 text-white shadow-[0_12px_30px_-8px_rgba(41,53,135,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                    <PlayIcon className="w-7 h-7 translate-x-0.5" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOptionD;
