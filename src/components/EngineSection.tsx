import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const TAGS = [
  "Block",
  "Prolongation",
  "Repetition",
  "Tension",
  "Side glance",
  "Holding",
];

const EngineSection = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.25 });

  const textStyle = (delay: number): React.CSSProperties => ({
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section className="relative bg-calm-charcoal overflow-hidden py-[clamp(5rem,10vw,10rem)] px-[max(1.5rem,5vw)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(900px 600px at 88% 8%, rgba(152,165,254,0.22), transparent 58%), radial-gradient(1200px 900px at 3% 100%, rgba(41,53,135,0.55), transparent 65%)",
        }}
      />

      <div ref={ref} className="relative max-w-6xl">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender mb-6 sm:mb-8"
          style={textStyle(0)}
        >
          UpSpeech Labs
        </p>
        <h2
          className="font-heading font-bold text-white tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            ...textStyle(80),
          }}
        >
          Trained on
          <br />
          <span className="text-calm-lavender">
            clinician-annotated data.
          </span>
        </h2>

        <p
          className="mt-8 max-w-2xl font-body text-base sm:text-lg text-white/65 leading-relaxed"
          style={textStyle(160)}
        >
          We built an annotation tool in-house, used by practising
          speech-language pathologists to tag disfluencies, tensions, and
          blocks frame by frame. The dataset is clinical from the start.
        </p>

        <div
          className="mt-[clamp(3rem,6vw,5rem)] max-w-5xl"
          style={{
            transition: `opacity 1200ms ${EASE}, transform 1200ms ${EASE}`,
            transitionDelay: "280ms",
            opacity: revealed ? 1 : 0,
            transform: revealed
              ? "translateY(0) scale(1)"
              : "translateY(40px) scale(0.98)",
          }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-white/5 bg-calm-charcoal">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                poster="/videos/annotation-tool.jpg"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="UpSpeech annotation tool used by clinicians to tag disfluencies frame by frame"
              >
                <source src="/videos/annotation-tool.webm" type="video/webm" />
                <source src="/videos/annotation-tool.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-body text-[11px] font-medium text-white/75"
                  style={{
                    transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
                    transitionDelay: `${1000 + i * 80}ms`,
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EngineSection;
