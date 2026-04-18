import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const stats = [
  { value: "11+", label: "Therapeutic techniques" },
  { value: "36+", label: "Structured steps" },
  { value: "8", label: "Clinical milestones" },
] as const;

const JourneyScene = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  const style = (delay: number): React.CSSProperties => ({
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section className="relative bg-white py-[clamp(5rem,10vw,10rem)] px-[max(1.5rem,5vw)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(900px 600px at 50% 10%, rgba(152,165,254,0.12), transparent 55%)",
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender"
          style={style(0)}
        >
          Act V · The long arc
        </p>
        <h2
          className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            ...style(80),
          }}
        >
          Therapy is months of small wins.
          <br />
          <span className="text-calm-lavender">We make every one visible.</span>
        </h2>
        <p
          className="mt-6 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
          style={style(160)}
        >
          A structured learning path maps every patient's journey — from
          identification and desensitisation, through fluency-shaping, to
          generalisation in real-world contexts. Clinicians always know what's
          next. Patients always know how far they've come.
        </p>

        {/* Stats row */}
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-3 gap-6 sm:gap-10 max-w-2xl">
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
                transitionDelay: `${220 + i * 90}ms`,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div
                className="font-heading font-bold text-calm-navy tabular-nums leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {s.value}
              </div>
              <div className="mt-2 font-body text-xs sm:text-sm text-calm-charcoal/65">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Product shot */}
        <div
          className="mt-[clamp(3rem,6vw,5rem)]"
          style={{
            transition: `opacity 1200ms ${EASE}, transform 1200ms ${EASE}`,
            transitionDelay: "340ms",
            opacity: revealed ? 1 : 0,
            transform: revealed
              ? "translateY(0) scale(1)"
              : "translateY(40px) scale(0.98)",
          }}
        >
          <div className="relative rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden border border-calm-navy/10 bg-white shadow-[0_30px_80px_-30px_rgba(41,53,135,0.35)]">
            <div className="flex items-center gap-2 px-4 py-3 bg-calm-light/80 border-b border-calm-charcoal/5">
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/15" />
              <div className="ml-3 flex-1 h-5 rounded-md bg-white/90 max-w-[260px] border border-calm-charcoal/5 flex items-center justify-center">
                <span className="font-body text-[10px] text-calm-charcoal/40 tabular-nums">
                  app.upspeech.io/journey
                </span>
              </div>
            </div>
            <img
              src="/screenshots/app/client-journey.png"
              alt="UpSpeech therapy journey with milestones and structured learning path"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyScene;
