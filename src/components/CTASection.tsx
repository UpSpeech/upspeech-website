import Companion, { type Species } from "@/components/Companion";
import { trackButtonClick } from "@/lib/analytics";
import { localizedHref, useLocale, useT } from "@/i18n";
import { COMPANION_ACCENTS } from "@/components/join/companions";

const CAST: Species[] = ["nima", "lumo", "tumbo", "pip"];

/**
 * The home page's closing section. It keeps id="cta" because links across the
 * site, including the redesign branch's hero buttons, still point at #cta.
 */
const CTASection = () => {
  const t = useT().home.cta;
  const locale = useLocale();

  return (
    <section
      id="cta"
      className="px-[max(1.5rem,5vw)] py-[clamp(3.25rem,10vw,10rem)] bg-mesh-calm relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-6">
          {t.headline}
        </h2>
        <p className="font-body text-lg sm:text-xl text-calm-charcoal/80 mb-10 max-w-2xl mx-auto">
          {t.body}
        </p>
        <div
          aria-hidden="true"
          className="mb-10 flex items-end justify-center gap-2 sm:gap-6"
        >
          {CAST.map((species) => (
            <Companion
              key={species}
              species={species}
              accent={COMPANION_ACCENTS[species]}
              size={88}
            />
          ))}
        </div>
        <a
          href={localizedHref("/join", locale)}
          onClick={() => trackButtonClick("join_flow_home", "cta")}
          className="inline-flex items-center gap-3 rounded-full bg-calm-navy px-8 py-4 font-body text-lg font-semibold text-white transition-colors hover:bg-calm-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender-ink focus-visible:ring-offset-2"
        >
          {t.button}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};

export default CTASection;
