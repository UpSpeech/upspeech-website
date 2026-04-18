import { useEffect, useState, type ReactNode } from "react";

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

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(t);
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

      {/* Minimal top bar */}
      <div
        className="relative z-10 px-[max(1.5rem,5vw)] pt-8 sm:pt-10 flex items-center justify-between"
        style={{
          transition: `opacity 900ms ${EASE}`,
          transitionDelay: "200ms",
          opacity: loaded ? 1 : 0,
        }}
      >
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-calm-navy" />
          <span className="font-body text-[11px] font-semibold tracking-[0.25em] uppercase text-calm-navy/70">
            UpSpeech · Infrastructure for Speech Therapy
          </span>
        </div>
        <span className="hidden md:inline font-body text-[11px] tracking-[0.2em] uppercase text-calm-charcoal/40">
          Preview · Option D
        </span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-[max(1.5rem,5vw)] pt-24 sm:pt-28">
        <div
          className="mb-6 sm:mb-8"
          style={{
            transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <span className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender">
            A proposition
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
          The infrastructure layer that keeps your care continuous — AI working
          quietly in the background, clinicians always in the loop.
        </p>
      </div>

      {/* Product peek at bottom — half-cut browser frame invites scroll */}
      <div
        className="relative z-10 mt-10 px-[max(1.5rem,5vw)]"
        style={{
          transition: `opacity 1200ms ${EASE}, transform 1200ms ${EASE}`,
          transitionDelay: "1500ms",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="relative rounded-t-[1.25rem] sm:rounded-t-[1.5rem] overflow-hidden border border-calm-navy/10 border-b-0 shadow-[0_-20px_60px_-20px_rgba(41,53,135,0.25)] bg-white">
            <div className="flex items-center gap-2 px-4 py-3 bg-calm-light/80 border-b border-calm-charcoal/5">
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <div className="ml-3 flex-1 h-5 rounded-md bg-white/90 max-w-[260px] border border-calm-charcoal/5 flex items-center justify-center">
                <span className="font-body text-[10px] text-calm-charcoal/40 tabular-nums">
                  app.upspeech.io/dashboard
                </span>
              </div>
            </div>
            <div
              className="relative w-full"
              style={{
                aspectRatio: "16 / 9",
                maxHeight: "38vh",
                overflow: "hidden",
              }}
            >
              <img
                src="/screenshots/app/therapist-dashboard.png"
                alt="UpSpeech therapist dashboard preview"
                className="absolute inset-x-0 top-0 w-full h-auto"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-calm-light via-calm-light/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOptionD;
