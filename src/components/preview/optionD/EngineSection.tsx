import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const BAR_COUNT = 64;

const AnnotationMock = ({ revealed }: { revealed: boolean }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-calm-charcoal/90 to-calm-navy/60 ring-1 ring-white/5">
      {/* Tension box */}
      <div
        className="absolute top-[18%] left-[30%] w-[38%] h-[56%] rounded-md border-2 border-calm-lavender"
        style={{
          transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
          transitionDelay: "700ms",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1)" : "scale(1.04)",
        }}
      >
        <span className="absolute -top-7 left-0 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-calm-lavender">
          tension
        </span>
      </div>
      {/* Block box */}
      <div
        className="absolute top-[62%] left-[40%] w-[22%] h-[10%] rounded-sm border-2 border-calm-lavender/90"
        style={{
          transition: `opacity 900ms ${EASE}`,
          transitionDelay: "900ms",
          opacity: revealed ? 1 : 0,
        }}
      >
        <span className="absolute -bottom-6 left-0 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-calm-lavender">
          block · 340ms
        </span>
      </div>
      {/* Waveform */}
      <div className="absolute bottom-0 left-0 right-0 flex h-14 items-end gap-[2px] px-5 pb-3">
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const h = 18 + Math.abs(Math.sin(i * 0.35)) * 32 + ((i * 7) % 11);
          return (
            <div
              key={i}
              className="flex-1 rounded-sm bg-calm-lavender/70"
              style={{
                transition: `height 700ms ${EASE}, opacity 700ms ${EASE}`,
                transitionDelay: `${600 + i * 8}ms`,
                height: revealed ? `${h}%` : "6%",
                opacity: revealed ? 1 : 0.15,
              }}
            />
          );
        })}
      </div>
      {/* Timecode */}
      <div className="absolute top-4 right-4 rounded-md bg-black/40 px-2.5 py-1 font-mono text-[11px] text-white/70">
        00:14.320
      </div>
    </div>
    {/* Tag chips */}
    <div className="mt-4 flex flex-wrap gap-2">
      {[
        "Block",
        "Prolongation",
        "Repetition",
        "Tension",
        "Side glance",
        "Holding",
      ].map((tag, i) => (
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
);

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
          Act VI · UpSpeech Labs
        </p>
        <h2
          className="font-heading font-bold text-white tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            ...textStyle(80),
          }}
        >
          Every model needs a dataset.
          <br />
          <span className="text-calm-lavender">Ours is clinical.</span>
        </h2>

        <p
          className="mt-8 max-w-2xl font-body text-base sm:text-lg text-white/65 leading-relaxed"
          style={textStyle(160)}
        >
          We built a research-grade annotation tool in-house — used by
          practicing speech-language pathologists to tag disfluencies, tensions,
          and blocks frame by frame. The model doesn't learn from the internet.
          It learns from clinicians.
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
          <AnnotationMock revealed={revealed} />
        </div>

        <div
          className="mt-[clamp(3rem,6vw,5rem)] max-w-4xl"
          style={textStyle(520)}
        >
          <span className="block h-px w-16 bg-calm-lavender/70 mb-6" />
          <blockquote
            className="font-heading font-medium text-white/90 tracking-tight"
            style={{
              fontSize: "clamp(1.25rem, 3vw, 2.25rem)",
              lineHeight: 1.25,
            }}
          >
            "This isn't training a model on what AI can find. It's teaching AI
            what SLPs already know."
          </blockquote>
          <p className="mt-5 font-body text-sm text-white/50">
            Clinical lead · UpSpeech Labs
          </p>
        </div>
      </div>
    </section>
  );
};

export default EngineSection;
