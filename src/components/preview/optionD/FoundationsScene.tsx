import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const metrics = [
  { value: "12", label: "SLPs onboarded" },
  { value: "30", label: "Patients in pilot" },
  { value: "1", label: "Clinical partner" },
] as const;

type Partner = {
  name: string;
  context: string;
  logo?: string;
  wordmarkFont?: "heading" | "body";
  wordmark?: string;
};

const partners: Partner[] = [
  {
    name: "SpeechCare",
    logo: "/images/speechcare-logo.png",
    context: "Clinical co-development partner",
  },
  {
    name: "ElevenLabs Grants",
    logo: "/images/elevenlabs-grants.webp",
    context: "AI infrastructure grant",
  },
  {
    name: "STARS",
    wordmark: "STARS",
    wordmarkFont: "heading",
    context: "Stuttering Treatment & Research Society",
  },
  {
    name: "Lispolis Ignite",
    wordmark: "Lispolis · Ignite",
    wordmarkFont: "body",
    context: "Acceleration program · 2026",
  },
  {
    name: "Unicorn Factory",
    wordmark: "Unicorn Factory",
    wordmarkFont: "heading",
    context: "Most Promising Startup · Lisboa",
  },
];

const FoundationsScene = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.18 });

  const style = (delay: number): React.CSSProperties => ({
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section className="relative bg-calm-light py-[clamp(5rem,10vw,10rem)] px-[max(1.5rem,5vw)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(900px 600px at 10% 20%, rgba(41,53,135,0.08), transparent 60%)",
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender"
          style={style(0)}
        >
          Act VII · Foundations
        </p>
        <h2
          className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            ...style(80),
          }}
        >
          Clinical and AI,
          <br />
          <span className="text-calm-lavender">together from day one.</span>
        </h2>
        <p
          className="mt-6 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
          style={style(160)}
        >
          UpSpeech is built by a team that refuses the false choice between AI
          and clinical judgement. Every line of code is accountable to the
          people who will use it in front of a patient.
        </p>

        {/* Traction metrics */}
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
                transitionDelay: `${220 + i * 90}ms`,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div
                className="font-heading font-bold text-calm-navy tabular-nums leading-none"
                style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
              >
                {m.value}
              </div>
              <div className="mt-2 font-body text-xs sm:text-sm text-calm-charcoal/65">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* UpSpeech Labs pillar (kept) */}
        <div
          className="mt-[clamp(3rem,6vw,5rem)] max-w-3xl border-t border-calm-charcoal/15 pt-8"
          style={style(500)}
        >
          <div className="font-body text-[11px] font-semibold tracking-[0.22em] uppercase text-calm-lavender">
            Research arm
          </div>
          <h3
            className="mt-3 font-heading font-bold text-calm-charcoal tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.15 }}
          >
            UpSpeech Labs.
          </h3>
          <p className="mt-3 font-body text-base sm:text-lg text-calm-charcoal/70 leading-relaxed">
            A dedicated research team of published clinicians and AI
            specialists, building the proprietary multimodal dataset that powers
            our voice analysis engine — one clinician-annotated frame at a time.
          </p>
        </div>

        {/* Partners grid */}
        <div className="mt-[clamp(4rem,8vw,7rem)]">
          <div
            className="mb-8 sm:mb-10 flex items-baseline justify-between flex-wrap gap-4"
            style={style(640)}
          >
            <span className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-charcoal/60">
              Partners · Backers · Recognition
            </span>
            <span className="font-body text-sm text-calm-charcoal/45">
              Building alongside the people who know the work.
            </span>
          </div>

          <div
            className="grid gap-px bg-calm-charcoal/10 border border-calm-charcoal/10 rounded-2xl overflow-hidden"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
              ...style(720),
            }}
          >
            {partners.map((p, i) => (
              <div
                key={p.name}
                className="bg-calm-light p-6 sm:p-8 flex flex-col items-start justify-between gap-6 min-h-[10rem] group transition-colors duration-500 hover:bg-white"
                style={{
                  transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
                  transitionDelay: `${800 + i * 90}ms`,
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(22px)",
                }}
              >
                <div className="flex-1 flex items-center w-full min-h-[3rem]">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className={`${
                        p.wordmarkFont === "heading"
                          ? "font-heading"
                          : "font-body"
                      } font-bold tracking-tight text-calm-charcoal/80 group-hover:text-calm-charcoal transition-colors duration-500`}
                      style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}
                    >
                      {p.wordmark}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-calm-lavender">
                    {p.name}
                  </div>
                  <div className="mt-1.5 font-body text-sm text-calm-charcoal/65 leading-snug">
                    {p.context}
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
