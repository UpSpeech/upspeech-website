import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Pillar = {
  num: string;
  eyebrow: string;
  title: string;
  body: string;
};

const pillars: Pillar[] = [
  {
    num: "01",
    eyebrow: "Structured",
    title: "Protocols, not guesses.",
    body: "A personalized practice roadmap calibrated to each patient's therapeutic stage — so between-session time becomes deliberate work, not decision fatigue.",
  },
  {
    num: "02",
    eyebrow: "Continuous",
    title: "Feedback, every day.",
    body: "Real-time fluency analysis using sound, context, and facial cues. The motor-learning loop keeps closing, long after the session ends.",
  },
  {
    num: "03",
    eyebrow: "Measurable",
    title: "Progress, made visible.",
    body: "Longitudinal data that sustains motivation through the plateaus where subjective progress stalls — and earns the clinic a new line of billable continuous care.",
  },
];

const PillarRow = ({ pillar, index }: { pillar: Pillar; index: number }) => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.35 });

  const style = (delay: number): React.CSSProperties => ({
    transition: `transform 900ms ${EASE}, opacity 900ms ${EASE}`,
    transitionDelay: `${index * 90 + delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(20px)",
  });

  return (
    <div
      ref={ref}
      className="grid grid-cols-[auto,1fr] items-start gap-x-[clamp(1rem,3vw,3rem)] border-t border-calm-charcoal/15 pt-[clamp(1.75rem,3.5vw,3rem)]"
    >
      <div
        className="font-heading font-bold text-calm-navy tabular-nums leading-none"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)", ...style(0) }}
      >
        {pillar.num}
      </div>
      <div>
        <div
          className="font-body text-[11px] font-semibold tracking-[0.25em] uppercase text-calm-lavender"
          style={style(80)}
        >
          {pillar.eyebrow}
        </div>
        <h3
          className="mt-2 font-heading font-bold text-calm-charcoal tracking-tight"
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
            lineHeight: 1.1,
            ...style(160),
          }}
        >
          {pillar.title}
        </h3>
        <p
          className="mt-4 max-w-xl font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
          style={style(240)}
        >
          {pillar.body}
        </p>
      </div>
    </div>
  );
};

const PlatformSection = () => {
  return (
    <section className="bg-calm-light py-[clamp(5rem,10vw,10rem)] px-[max(1.5rem,5vw)]">
      <div className="max-w-6xl">
        <p className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender mb-6 sm:mb-8">
          Act II · The Engine
        </p>
        <h2
          className="font-heading font-bold text-calm-charcoal tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)",
            lineHeight: 1.02,
          }}
        >
          Three pillars.
          <br />
          <span className="text-calm-lavender">One continuous loop.</span>
        </h2>
      </div>

      <div className="mt-[clamp(3rem,7vw,6rem)] max-w-6xl grid gap-[clamp(2rem,4vw,3.5rem)]">
        {pillars.map((p, i) => (
          <PillarRow key={p.num} pillar={p} index={i} />
        ))}
      </div>
    </section>
  );
};

export default PlatformSection;
