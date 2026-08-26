import { useReveal } from "./useReveal";
import { useT } from "@/i18n";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Partner = {
  name: string;
  contextKey: keyof ReturnType<
    typeof useT
  >["home"]["foundations"]["partnerContext"];
};

// The two relationships that carry a logo and a substantive tie to the
// product. They sit here rather than in a band under the hero because this
// section's headline is about exactly them: SpeechCare is the clinical half of
// "clinical practice and AI engineering", ElevenLabs is the AI half.
//
// `width` is the one number that has to be tuned per mark. Both files are
// cropped tight to their ink, but their letterforms take very different shares
// of that box: SpeechCare's caps are 39% of its height (the ECG squiggle takes
// the rest), ElevenLabs' are 96%. Sizing both marks to one shared box, as the
// old band did, left both with a 7px cap height, smaller than the caption
// underneath. These widths put both on a ~19px cap height inside the shared
// ROW_HEIGHT row, and `object-left-top` lands both cap lines on the same y.
//
// Everything scales through --mark so the two stay matched: change the scale,
// not the widths.
const ROW_HEIGHT = 48;

const logoPartners = [
  {
    name: "SpeechCare",
    logo: "/images/speechcare-logo.webp",
    contextKey: "speechcare",
    width: 192,
  },
  {
    name: "ElevenLabs Grants",
    logo: "/images/elevenlabs-grants.webp",
    contextKey: "elevenlabs",
    width: 218,
  },
] as const;

// Partner names are proper nouns and stay in code; the context line is
// localized via home.foundations.partnerContext[contextKey].
//
// Programs, backers and awards. The two above carry logos and are labelled
// separately, so no partner is named in both places.
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
    <section className="relative bg-calm-light py-[clamp(3.25rem,10vw,10rem)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1400px 800px at 50% 0%, rgba(152,165,254,0.10), transparent 65%)",
        }}
      />

      <div ref={ref} className="gutter relative">
        <p
          className="font-body t-eyebrow text-calm-lavender-ink"
          style={style(0)}
        >
          {t.eyebrow}
        </p>
        <h2
          className="t-display mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-4xl"
          style={{ ...style(80) }}
        >
          {t.headlineLine1} <br />
          <span className="text-calm-lavender-ink">{t.headlineLine2}</span>
        </h2>
        <p
          className="mt-6 max-w-2xl t-lead font-body text-calm-charcoal/80 leading-relaxed"
          style={style(160)}
        >
          {t.body}
        </p>

        {/* The two we build with, as marks */}
        <div className="mt-[clamp(3rem,6vw,4.5rem)]">
          <span
            className="font-body t-eyebrow text-calm-charcoal/80"
            style={style(240)}
          >
            {t.logoPartnersLabel}
          </span>
          <div className="mt-6 flex flex-wrap items-start gap-x-12 gap-y-8 sm:gap-x-24 [--mark:0.82] sm:[--mark:1]">
            {logoPartners.map((item, i) => (
              <div key={item.name} style={style(300 + i * 80)}>
                <img
                  src={item.logo}
                  alt={item.name}
                  className="object-contain object-left-top"
                  style={{
                    width: `calc(${item.width}px * var(--mark))`,
                    height: `calc(${ROW_HEIGHT}px * var(--mark))`,
                  }}
                  loading="lazy"
                />
                <p className="mt-3 font-body text-sm text-calm-charcoal/80">
                  {t.logoPartnerContext[item.contextKey]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Programs, backers and awards */}
        <div className="mt-[clamp(3rem,6vw,4.5rem)]">
          <div
            className="mb-8 sm:mb-10 flex items-baseline justify-between flex-wrap gap-4"
            style={style(320)}
          >
            <span className="font-body t-eyebrow text-calm-charcoal/80">
              {t.partnersLabel}
            </span>
            <span className="font-body text-sm text-calm-charcoal/80">
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
                  <div className="flex min-h-[2.4em] items-start font-body t-eyebrow text-calm-lavender-ink">
                    {p.name}
                  </div>
                  <div className="mt-1.5 font-body text-sm text-calm-charcoal/80 leading-snug">
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
