import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

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
    name: "Lispolis Ignite",
    wordmark: "Lispolis · Ignite",
    wordmarkFont: "body",
    context: "Acceleration program",
  },
  {
    name: "Unicorn Factory",
    wordmark: "Unicorn Factory",
    wordmarkFont: "heading",
    context: "Most Promising Startup · Lisboa",
  },
  {
    name: "Innocatalyst Health Program",
    wordmark: "Innocatalyst Health",
    wordmarkFont: "heading",
    context: "Health innovation programme",
  },
  {
    name: "HealthQUP",
    wordmark: "HealthQUP",
    wordmarkFont: "heading",
    context: "Health acceleration programme",
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
          Foundations
        </p>
        <h2
          className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            ...style(80),
          }}
        >
          Clinical practice and AI engineering,
          <br />
          <span className="text-calm-lavender">in the same team.</span>
        </h2>
        <p
          className="mt-6 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
          style={style(160)}
        >
          Clinicians and engineers work side by side. Product decisions are
          reviewed by the practising speech-language pathologists who use the
          platform with patients.
        </p>

        {/* Partners grid */}
        <div className="mt-[clamp(4rem,8vw,7rem)]">
          <div
            className="mb-8 sm:mb-10 flex items-baseline justify-between flex-wrap gap-4"
            style={style(320)}
          >
            <span className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-charcoal/60">
              Partners · Backers · Recognition
            </span>
            <span className="font-body text-sm text-calm-charcoal/45">
              Building alongside the people who know the work.
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-calm-charcoal/10 border border-calm-charcoal/10 rounded-2xl overflow-hidden"
            style={style(380)}
          >
            {partners.map((p, i) => (
              <div
                key={p.name}
                className="bg-calm-light p-6 sm:p-8 flex flex-col items-start justify-between gap-6 min-h-[10rem] group transition-colors duration-500 hover:bg-white"
                style={{
                  transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
                  transitionDelay: `${440 + i * 60}ms`,
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
