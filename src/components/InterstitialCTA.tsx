import { useReveal } from "./useReveal";
import { reveal } from "./motion";
import { trackButtonClick } from "@/lib/analytics";
import { useT } from "@/i18n";

const InterstitialCTA = () => {
  const t = useT().home.interstitial;
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="relative bg-calm-light py-[clamp(2.75rem,8vw,7rem)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 500px at 50% 120%, rgba(152,165,254,0.18), transparent 60%)",
        }}
      />
      <div
        ref={ref}
        className="gutter relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div style={reveal(revealed, 0)}>
          <h2
            className="t-h2 font-heading font-bold text-calm-charcoal tracking-tight"
          >
            {t.headlineLine1} <br />
            <span className="text-calm-lavender-ink">{t.headlineLine2}</span>
          </h2>
        </div>
        <div className="shrink-0" style={reveal(revealed, 120)}>
          <a
            href="#cta"
            onClick={() =>
              trackButtonClick(
                "request_early_access_interstitial",
                "interstitial",
              )
            }
            className="group inline-flex items-center gap-3 rounded-full bg-calm-navy px-7 py-3.5 font-body font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-calm-charcoal hover:shadow-[0_24px_50px_-16px_rgba(41,53,135,0.55)] hover:-translate-y-0.5"
          >
            {t.requestAccess}
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InterstitialCTA;
