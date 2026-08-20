import { useReveal } from "./useReveal";
import { EASE } from "./motion";
import { useT } from "@/i18n";

// Only the two relationships that carry a logo and a substantive tie to the
// product. The accelerators and awards live in FoundationsScene, so no partner
// is named in both places.
//
// `width` is the one number that has to be tuned per mark. Both files are
// cropped tight to their ink, but their letterforms take very different shares
// of that box: SpeechCare's caps are 39% of its height (the ECG squiggle takes
// the rest), ElevenLabs' are 96%. Sizing both marks to one shared box, as this
// strip used to, left both with a 7px cap height, smaller than the caption
// underneath. These widths put both on a ~19px cap height inside the shared
// ROW_HEIGHT row, and `object-left-top` lands both cap lines on the same y.
//
// Everything scales through --mark so the two stay matched: change the scale,
// not the widths.
const ROW_HEIGHT = 48;

const items = [
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

const CredibilityStrip = () => {
  const t = useT().home.credibility;
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="relative bg-white border-b border-calm-charcoal/5 py-10 sm:py-14">
      {/* Max-width and padding on one element, the way the hero builds its own
          container, so this block starts on the same spine as the hero copy
          above it. Split across two elements, as it used to be, they sat 8px
          apart at 1440 and 32px apart at 1920. */}
      <div ref={ref} className="mx-auto max-w-7xl px-[max(1.5rem,5vw)]">
        {/* Eyebrow over content, like every other section on the page, rather
            than inline beside the marks where it lined up with neither the
            logos nor their captions. */}
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-calm-charcoal/80">
          {t.eyebrow}
        </span>
        <div className="mt-6 flex flex-wrap items-start gap-x-12 gap-y-8 sm:gap-x-24 [--mark:0.82] sm:[--mark:1]">
          {items.map((item, i) => (
            <div
              key={item.name}
              style={{
                transition: `opacity 800ms ${EASE}, transform 800ms ${EASE}`,
                transitionDelay: `${i * 80}ms`,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(10px)",
              }}
            >
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
              <p className="mt-3 font-body text-xs text-calm-charcoal/80">
                {t.partnerContext[item.contextKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilityStrip;
