import { useEffect, useState, type ReactNode } from "react";
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
        transition: `transform 1100ms ${EASE}, opacity 1100ms ${EASE}`,
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
    <section className="relative min-h-[100svh] bg-calm-light overflow-hidden flex flex-col">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 82% 8%, rgba(152,165,254,0.22), transparent 58%), radial-gradient(900px 700px at 6% 96%, rgba(41,53,135,0.10), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-[max(1.5rem,5vw)] pt-32 sm:pt-40">
        <div
          className="mb-6 sm:mb-8"
          style={{
            transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <span className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender">
            For clinics with stuttering services
          </span>
        </div>

        <h1
          className="font-heading font-bold text-calm-charcoal tracking-tight max-w-[18ch]"
          style={{ fontSize: "clamp(2.75rem, 10vw, 8.5rem)", lineHeight: 0.96 }}
        >
          <Line delay={120} loaded={loaded}>
            The clinic
          </Line>
          <Line delay={320} loaded={loaded}>
            that's open
          </Line>
          <Line delay={560} loaded={loaded}>
            <span className="text-calm-lavender">when you're not.</span>
          </Line>
        </h1>

        <p
          className="mt-8 sm:mt-10 max-w-xl font-body text-lg sm:text-xl text-calm-charcoal/65 leading-relaxed"
          style={{
            transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
            transitionDelay: "1300ms",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Structured practice between sessions. Session reports drafted
          automatically. Therapists keep the final say.
        </p>

        <div
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          style={{
            transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
            transitionDelay: "1500ms",
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

      {/* Product demo: frame top peeks above the fold, scroll reveals the full video */}
      <div
        className="relative z-10 mt-10 px-[max(1.5rem,5vw)] pb-16 sm:pb-24"
        style={{
          transition: `opacity 1200ms ${EASE}, transform 1200ms ${EASE}`,
          transitionDelay: "1700ms",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <div className="mx-auto max-w-[1200px]">
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
            {reducedMotion ? (
              <img
                src="/videos/hero-demo-poster.jpg"
                alt="UpSpeech product demo: a therapist's personalised practice plan"
                className="block w-full h-auto"
                loading="eager"
              />
            ) : (
              <video
                className="block w-full h-auto"
                src="/videos/hero-demo.mp4"
                poster="/videos/hero-demo-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="UpSpeech product demo: a therapist assigns a personalised plan, the patient practises at home, the therapist follows progress on a dashboard, records a session, the report is drafted, and clinicians annotate the recording"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOptionD;
