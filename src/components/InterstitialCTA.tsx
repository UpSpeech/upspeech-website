import { useReveal } from "./useReveal";
import { reveal } from "./motion";
import { trackButtonClick } from "@/lib/analytics";
import { localizedHref, useLocale, useT } from "@/i18n";

const InterstitialCTA = () => {
  const t = useT().home.interstitial;
  const locale = useLocale();
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
          <h2 className="t-h2 font-heading font-bold text-calm-navy tracking-tight">
            {t.headlineLine1} <br />
            {t.headlineLine2}
          </h2>
        </div>
        <div className="shrink-0" style={reveal(revealed, 120)}>
          <a
            href={localizedHref("/join", locale)}
            onClick={() =>
              trackButtonClick(
                "request_early_access_interstitial",
                "interstitial",
              )
            }
            className="inline-flex items-center rounded-sm bg-calm-navy px-7 py-3.5 font-body font-semibold text-white transition-colors duration-300 hover:bg-calm-charcoal"
          >
            {t.requestAccess}
          </a>
        </div>
      </div>
    </section>
  );
};

export default InterstitialCTA;
