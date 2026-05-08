import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

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
          We're not an AI company.
          <br />
          <span className="text-calm-lavender">
            We're a speech therapy platform that uses AI to keep clinical work
            continuous.
          </span>
        </h2>
        <p
          className="mt-8 max-w-2xl mx-auto font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
          style={style(280)}
        >
          Built by clinicians, for clinicians. AI works in the background so
          therapists can spend their time where it matters: with patients.
        </p>
      </div>
    </section>
  );
};

export default PositioningSection;
