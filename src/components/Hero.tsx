import { useEffect, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { trackButtonClick } from "@/lib/analytics";
import SpeechTrace from "./SpeechTrace";
import CutOut from "./CutOut";
import { cutOutWidthAt, sizesFor } from "@/lib/cutout-sizes";
import { useT } from "@/i18n";

/**
 * The line, and someone standing on it.
 *
 * This replaces the full-bleed photograph under two scrims. That hero was the
 * most templated thing on the site: darken a stock frame, put white type on it,
 * add two buttons. It also stopped matching the page once the rest of the
 * imagery moved to cut-outs on light ground, so the site opened in one language
 * and continued in another.
 *
 * What it opens with instead is the product's own subject matter. The bar at
 * the foot of the hero is a real speech envelope with its silences left in,
 * the same SpeechTrace the week comparison uses. Everything in the composition
 * stands on it, and she dissolves into it, so the first thing a visitor sees is
 * a person speaking and the shape her speech makes.
 *
 * That line is the site's signature and it recurs: as the envelope here, as the
 * continuous baseline the four days of the week stand on, as the shared floor
 * under the two halves of the 11:30 session.
 *
 * One thing is deliberately not done. Type that mimics a stutter, repeated
 * glyphs or broken words, is an obvious idea for a fluency product and it is a
 * bad one. The brand is calm before all else and progress not pressure; making
 * the typography perform a disfluency would be mocking the person reading it.
 * The rhythm goes into the trace and the spacing instead.
 *
 * The ambient loop from the old hero is dropped rather than kept. It was five
 * seconds of a woman breathing behind a scrim, which only worked as full-bleed
 * footage. The motion moves to the trace, which draws itself in on load: the
 * envelope arrives left to right at the speed of someone speaking.
 */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const HERO_CUTOUT = "practice-hero";
/** Matches the height ladder on the CutOut below, and the preload above it. */
const HERO_HEIGHTS = { base: 300, sm: 380, lg: 500 } as const;
const HERO_SIZES = sizesFor(HERO_HEIGHTS, cutOutWidthAt(HERO_CUTOUT));

const Line = ({
  children,
  delay,
  loaded,
}: {
  children: ReactNode;
  delay: number;
  loaded: boolean;
}) => (
  // Bottom padding gives the clip box room for descenders; the matching
  // negative margin keeps the tight line rhythm.
  <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
    <span
      className="block will-change-transform"
      style={{
        transition: `transform 760ms ${EASE}, opacity 760ms ${EASE}`,
        transitionDelay: `${delay}ms`,
        transform: loaded ? "translateY(0)" : "translateY(115%)",
        opacity: loaded ? 1 : 0,
      }}
    >
      {children}
    </span>
  </span>
);

const Hero = () => {
  const t = useT().home.hero;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden bg-white lg:h-[100svh]">
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={`/images/people/cut/${HERO_CUTOUT}.webp`}
          imageSrcSet={
            `/images/people/cut/${HERO_CUTOUT}-560.webp 560w, ` +
            `/images/people/cut/${HERO_CUTOUT}.webp 900w`
          }
          imageSizes={HERO_SIZES}
          fetchPriority="high"
        />
      </Helmet>

      {/* Two blooms. The scrim the old hero used was doing something real
          besides making the type legible: it carried the warm late-afternoon
          light of the kitchen the photograph was taken in. On a white ground
          that atmosphere is gone and the page turns clinical, which is the
          wrong register for this product. The lavender bloom is the brand; the
          warm one low behind her is the light. Both sit well under any text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-18%] h-[820px] w-[820px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(149,138,240,0.22), rgba(149,138,240,0.06) 58%, rgba(149,138,240,0) 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4%] right-[2%] h-[620px] w-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(233,190,138,0.26), rgba(233,190,138,0.09) 52%, rgba(233,190,138,0) 74%)",
        }}
      />

      <div className="gutter relative grid w-full grid-cols-1 items-end gap-8 pb-0 pt-28 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:gap-10 lg:pt-24">
        <div className="pb-10 lg:self-center lg:pb-0">
          <div
            className="mb-7"
            style={{
              transition: `opacity 600ms ${EASE}, transform 600ms ${EASE}`,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <span className="font-body t-eyebrow text-calm-lavender-ink">
              {t.eyebrow}
            </span>
          </div>

          {/* Bigger and tighter than the old hero by a wide margin. A display
              size that only reaches 5rem next to 1.125rem body is a two-step
              scale, which is what makes a page look like a template. */}
          {/* t-display is capped so the longest line still sets on one line.
              The Line reveal clips its overflow, so a wrap is not a soft
              failure here: it slices the glyphs of the line below. */}
          <h1 className="t-display max-w-[16ch] font-heading font-bold text-calm-charcoal">
            {/* The trailing spaces are load-bearing, not sloppy. Each line is
                a block-level span, so with JavaScript off a crawler extracts
                textContent and gets "Your therapykeeps goingbetween sessions."
                with no word breaks. check:output catches exactly this, and the
                rest of the site already uses the same {" "} pattern. */}
            <Line delay={80} loaded={loaded}>
              {t.headlineLine1}{" "}
            </Line>
            <Line delay={190} loaded={loaded}>
              {t.headlineLine2}{" "}
            </Line>
            <Line delay={300} loaded={loaded}>
              <span className="text-calm-lavender-ink">{t.headlineLine3}</span>
            </Line>
          </h1>

          <p
            className="mt-8 max-w-[44ch] font-body text-lg leading-relaxed text-calm-charcoal/75"
            style={{
              transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
              transitionDelay: "470ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {t.body}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-4"
            style={{
              transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
              transitionDelay: "610ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <a
              href="#cta"
              onClick={() =>
                trackButtonClick("request_early_access_hero", "hero")
              }
              className="group inline-flex items-center gap-3 rounded-full bg-calm-navy px-7 py-3.5 font-body font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-calm-lavender-ink hover:shadow-[0_24px_50px_-20px_rgba(41,53,135,0.6)]"
            >
              {t.requestAccess}
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#how-it-works"
              onClick={() => trackButtonClick("see_how_it_works", "hero")}
              className="inline-flex items-center gap-2 rounded-full border border-calm-navy/25 px-7 py-3.5 font-body font-semibold text-calm-navy transition-colors duration-500 hover:border-calm-navy/60 hover:bg-calm-navy/5"
            >
              {t.seeHowItWorks}
            </a>
          </div>
        </div>

        {/* She stands on the trace, not in a frame. */}
        {/* Pulled down so the dissolved base overlaps the top of the trace.
            Without this she stops about a hundred pixels short of it and the
            whole idea, a person standing on her own speech, does not land. */}
        <div className="relative z-10 flex min-h-0 justify-center lg:-mb-24 lg:h-full lg:items-end lg:justify-end">
          <CutOut
            name={HERO_CUTOUT}
            alt={t.photoAlt}
            priority
            renderHeight={HERO_HEIGHTS}
            className="h-[300px] sm:h-[380px] lg:h-full lg:max-h-[calc(100svh-9rem)] lg:w-auto lg:object-contain"
          />
        </div>
      </div>

      {/* The floor. Full bleed, and it draws itself in left to right on load at
          about the speed of the sentence above it. */}
      {/* Not aria-hidden. SpeechTrace already exposes itself as role="img"
          with a description, and what it describes is the product's subject
          matter rather than ornament: a recording with its silences left in.
          Hiding it would throw away the one part of the hero that explains
          what this company measures. The blooms above are the decoration and
          they are the things that stay hidden. */}
      <div
        className="relative w-full shrink-0 overflow-hidden"
        style={{
          clipPath: loaded ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 1600ms ${EASE}`,
          transitionDelay: "260ms",
        }}
      >
        <SpeechTrace
          variant="utterance"
          height={84}
          label={t.traceLabel}
          activeColor="#958AF0"
          silentColor="rgba(41,53,135,0.16)"
        />
      </div>
    </section>
  );
};

export default Hero;
