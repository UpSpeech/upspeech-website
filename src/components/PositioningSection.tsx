import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const PILLARS = [
  {
    label: "Session prep",
    copy: "Walk into every appointment already knowing how the week went.",
  },
  {
    label: "Reports, drafted",
    copy: "Session data becomes a structured clinical draft. Therapist edits, signs.",
  },
  {
    label: "Between sessions",
    copy: "Patients follow a clinician-set plan, with practice that holds.",
  },
] as const;

const PositioningSection = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.3 });

  const style = (delay: number): React.CSSProperties => ({
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(20px)",
  });

  return (
    <section className="relative bg-calm-light px-[max(1.5rem,5vw)] py-[clamp(5rem,12vw,11rem)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(800px 500px at 50% 50%, rgba(152,165,254,0.18), transparent 60%)",
        }}
      />

      <div ref={ref} className="relative max-w-5xl mx-auto text-center">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender mb-6"
          style={style(0)}
        >
          What we are
        </p>
        <h2
          className="font-heading font-bold text-calm-charcoal tracking-tight"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.75rem)",
            lineHeight: 1.08,
            ...style(120),
          }}
        >
          Not another AI tool.
          <br />
          <span className="text-calm-lavender">
            A stuttering therapy platform, with AI built around the clinical
            workflow.
          </span>
        </h2>
        <p
          className="mt-8 max-w-2xl mx-auto font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
          style={style(280)}
        >
          Built with clinicians, for clinicians. The AI works in the background,
          so therapists spend their time where it matters: with patients.
        </p>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-4xl mx-auto">
          {PILLARS.map((p, i) => (
            <div
              key={p.label}
              style={{
                transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
                transitionDelay: `${440 + i * 90}ms`,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="font-body text-[11px] font-semibold tracking-[0.22em] uppercase text-calm-lavender">
                {p.label}
              </div>
              <p className="mt-2.5 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PositioningSection;
