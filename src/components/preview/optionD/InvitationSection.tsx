import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const InvitationSection = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.3 });

  const style = (delay: number): React.CSSProperties => ({
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section className="relative bg-white py-[clamp(6rem,14vw,14rem)] px-[max(1.5rem,5vw)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 50% 100%, rgba(152,165,254,0.2), transparent 60%)",
        }}
      />

      <div ref={ref} className="relative max-w-5xl mx-auto text-center">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender"
          style={style(0)}
        >
          Act VIII · Partner with us
        </p>
        <h2
          className="mt-6 font-heading font-bold text-calm-charcoal tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 9vw, 7.5rem)",
            lineHeight: 0.98,
            ...style(120),
          }}
        >
          Therapy doesn't end
          <br />
          at the <span className="text-calm-lavender">clinic door.</span>
        </h2>

        <p
          className="mt-10 max-w-xl mx-auto font-body text-lg sm:text-xl text-calm-charcoal/65 leading-relaxed"
          style={style(300)}
        >
          Currently partnering with a small cohort of speech therapy clinics in
          Portugal, Spain, and Brazil — building the infrastructure with the
          clinicians who will use it.
        </p>

        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          style={style(440)}
        >
          <a
            href="#cta"
            className="group inline-flex items-center gap-3 rounded-full bg-calm-navy px-8 py-4 font-body font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-calm-charcoal hover:shadow-[0_24px_50px_-16px_rgba(41,53,135,0.55)] hover:-translate-y-0.5"
          >
            Partner with UpSpeech
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#platform"
            className="font-body font-medium text-calm-charcoal/70 hover:text-calm-charcoal transition-colors"
          >
            Read the thesis
          </a>
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
