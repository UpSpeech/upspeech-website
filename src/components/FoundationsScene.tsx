import { useReveal } from "./useReveal";
import { useT } from "@/i18n";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Partner = {
  name: string;
  contextKey: keyof ReturnType<
    typeof useT
  >["home"]["foundations"]["partnerContext"];
};

// Partner names are proper nouns and stay in code; the context line is
// localized via home.foundations.partnerContext[contextKey].
//
// Programs, backers and awards. The two logo partners (SpeechCare,
// ElevenLabs) live in CredibilityStrip above the fold, so nothing is named
// in both places.
const partners: Partner[] = [
  {
    name: "Lispolis Ignite",
    contextKey: "lispolis",
  },
  {
    name: "Unicorn Factory",
    contextKey: "unicorn",
  },
  {
    name: "Innocatalyst Health Program",
    contextKey: "innocatalyst",
  },
  {
    name: "HealthQUP",
    contextKey: "healthqup",
  },
];

const FoundationsScene = () => {
  const t = useT().home.foundations;
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.18 });

  const style = (delay: number): React.CSSProperties => ({
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section className="relative bg-calm-light py-[clamp(3.25rem,10vw,10rem)] px-[max(1.5rem,5vw)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1400px 800px at 50% 0%, rgba(152,165,254,0.10), transparent 65%)",
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender"
          style={style(0)}
        >
          {t.eyebrow}
        </p>
        <h2
          className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            ...style(80),
          }}
        >
          {t.headlineLine1}
          <br />
          <span className="text-calm-lavender">{t.headlineLine2}</span>
        </h2>
        <p
          className="mt-6 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
          style={style(160)}
        >
          {t.body}
        </p>

        {/* Partners grid */}
        <div className="mt-[clamp(4rem,8vw,7rem)]">
          <div
            className="mb-8 sm:mb-10 flex items-baseline justify-between flex-wrap gap-4"
            style={style(320)}
          >
            <span className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-charcoal/60">
              {t.partnersLabel}
            </span>
            <span className="font-body text-sm text-calm-charcoal/45">
              {t.partnersTagline}
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-calm-charcoal/10 border border-calm-charcoal/10 rounded-2xl overflow-hidden"
            style={style(380)}
          >
            {partners.map((p, i) => (
              <div
                key={p.name}
                className="bg-calm-light p-6 sm:p-8 flex flex-col items-start justify-center group transition-colors duration-500 hover:bg-white"
                style={{
                  transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
                  transitionDelay: `${440 + i * 60}ms`,
                  opacity: revealed ? 1 : 0,
                  // Alternate the axis so the cards do not all arrive as the
                  // same rise.
                  transform: revealed
                    ? "none"
                    : i % 2 === 0
                      ? "translateX(-18px)"
                      : "translateX(18px)",
                }}
              >
                <div>
                  {/* Two lines reserved: one name wraps and the rest do not,
                      which dropped that card's context line below the others. */}
                  <div className="flex min-h-[2.4em] items-start font-body text-[11px] font-semibold tracking-[0.2em] uppercase leading-[1.2] text-calm-lavender">
                    {p.name}
                  </div>
                  <div className="mt-1.5 font-body text-sm text-calm-charcoal/65 leading-snug">
                    {t.partnerContext[p.contextKey]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundationsScene;
