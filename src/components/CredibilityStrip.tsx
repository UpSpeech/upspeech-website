import { useReveal } from "./useReveal";
import { EASE } from "./motion";
import { useT } from "@/i18n";

// Only the two relationships that carry a logo and a substantive tie to the
// product. The accelerators and awards live in FoundationsScene, so no partner
// is named in both places.
const items = [
  {
    name: "SpeechCare",
    logo: "/images/speechcare-logo.png",
    contextKey: "speechcare",
  },
  {
    name: "ElevenLabs Grants",
    logo: "/images/elevenlabs-grants.webp",
    contextKey: "elevenlabs",
  },
] as const;

const CredibilityStrip = () => {
  const t = useT().home.credibility;
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="relative bg-white border-b border-calm-charcoal/5 px-[max(1.5rem,5vw)] py-8 sm:py-10">
      <div
        ref={ref}
        className="max-w-6xl mx-auto flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-12"
      >
        <span className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-charcoal/80">
          {t.eyebrow}
        </span>
        <div className="flex flex-wrap items-start gap-x-10 gap-y-5">
          {items.map((item, i) => (
            <span
              key={item.name}
              className="flex flex-col items-start gap-2"
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
                // Fixed box rather than a fixed height: the two marks have very
                // different aspect ratios (SpeechCare ~2.8:1, ElevenLabs ~11:1),
                // so matching their heights made the wordmark four times wider
                // and it read as the only partner on the page.
                className="h-6 w-[124px] sm:h-7 sm:w-[150px] object-contain object-left opacity-75 grayscale transition duration-300 hover:grayscale-0 hover:opacity-100"
                loading="lazy"
              />
              <span className="font-body text-xs text-calm-charcoal/80">
                {t.partnerContext[item.contextKey]}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilityStrip;
