import { useEffect, useState, type ReactNode } from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { trackButtonClick } from "@/lib/analytics";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const Line = ({
  children,
  delay,
  loaded,
}: {
  children: ReactNode;
  delay: number;
  loaded: boolean;
}) => (
  <span className="block overflow-hidden">
    <span
      className="block will-change-transform"
      style={{
        transition: `transform 700ms ${EASE}, opacity 700ms ${EASE}`,
        transitionDelay: `${delay}ms`,
        transform: loaded ? "translateY(0)" : "translateY(110%)",
        opacity: loaded ? 1 : 0,
      }}
    >
      {children}
    </span>
  </span>
);

const HeroOptionD = () => {
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
    <section className="relative min-h-[100svh] bg-calm-light overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 82% 8%, rgba(152,165,254,0.22), transparent 58%), radial-gradient(900px 700px at 6% 96%, rgba(41,53,135,0.10), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-10 px-[max(1.5rem,5vw)] pt-32 pb-16 lg:grid-cols-[1.1fr,1fr] lg:gap-16 lg:pt-40 lg:pb-0">
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
            <span className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender">
              For clinics with stuttering services
            </span>
          </div>

          <h1
            className="font-heading font-bold text-calm-charcoal tracking-tight max-w-[16ch]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.0 }}
          >
            <Line delay={80} loaded={loaded}>
              The clinic
            </Line>
            <Line delay={200} loaded={loaded}>
              that's open
            </Line>
            <Line delay={320} loaded={loaded}>
              <span className="text-calm-lavender">when you're not.</span>
            </Line>
          </h1>

          <p
            className="mt-6 sm:mt-8 max-w-xl font-body text-lg sm:text-xl text-calm-charcoal/65 leading-relaxed"
            style={{
              transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
              transitionDelay: "500ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
            }}
          >
            Structured practice between sessions. Session reports drafted
            automatically. Therapists keep the final say.
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
              className="group inline-flex items-center gap-3 rounded-full bg-calm-navy px-7 py-3.5 font-body font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-calm-charcoal hover:shadow-[0_24px_50px_-16px_rgba(41,53,135,0.55)] hover:-translate-y-0.5"
            >
              Request early access
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#how-it-works"
              onClick={() => trackButtonClick("see_how_it_works", "hero")}
              className="inline-flex items-center gap-2 rounded-full border border-calm-navy/20 px-7 py-3.5 font-body font-semibold text-calm-navy transition-colors duration-500 hover:border-calm-navy/45 hover:bg-white"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Right column: product demo, poster + click-to-play (no autoplay on load) */}
        <div
          style={{
            transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
            transitionDelay: "800ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <div className="relative rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden border border-calm-navy/10 shadow-[0_40px_80px_-32px_rgba(41,53,135,0.35)] bg-white">
            <div className="flex items-center gap-2 px-4 py-3 bg-calm-light/80 border-b border-calm-charcoal/5">
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <div className="ml-3 flex-1 h-5 rounded-md bg-white/90 max-w-[260px] border border-calm-charcoal/5 flex items-center justify-center">
                <span className="font-body text-[10px] text-calm-charcoal/40 tabular-nums">
                  app.upspeech.app/dashboard
                </span>
              </div>
            </div>
            {playing ? (
              <video
                className="block w-full h-auto"
                src="/videos/hero-demo.mp4"
                poster="/videos/hero-demo-poster.jpg"
                controls
                autoPlay={!reducedMotion}
                muted
                playsInline
                aria-label="UpSpeech product demo: a therapist assigns a personalised plan, the patient practises at home, the therapist follows progress on a dashboard, records a session, the report is drafted, and clinicians annotate the recording"
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPlaying(true);
                  trackButtonClick("hero_play_demo", "hero");
                }}
                className="group relative block w-full"
                aria-label="Play the UpSpeech product demo"
              >
                <img
                  src="/videos/hero-demo-poster.jpg"
                  alt="UpSpeech product demo: a therapist's personalised practice plan"
                  className="block w-full h-auto"
                  loading="eager"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-calm-navy/90 text-white shadow-[0_12px_30px_-8px_rgba(41,53,135,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                    <PlayIcon className="w-8 h-8 translate-x-0.5" />
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
