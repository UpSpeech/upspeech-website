import { useReveal } from "./useReveal";
import { EASE } from "./motion";

const items = [
  { name: "SpeechCare", logo: "/images/speechcare-logo.png" },
  { name: "ElevenLabs Grants", logo: "/images/elevenlabs-grants.webp" },
  { name: "Unicorn Factory", wordmark: "Unicorn Factory" },
  { name: "Lispolis Ignite", wordmark: "Lispolis · Ignite" },
] as const;

const CredibilityStrip = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="relative bg-white border-b border-calm-charcoal/5 px-[max(1.5rem,5vw)] py-8 sm:py-10">
      <div
        ref={ref}
        className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:justify-between"
      >
        <span className="w-full sm:w-auto text-center sm:text-left font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-charcoal/40">
          Partners &amp; recognition
        </span>
        {items.map((item, i) => (
          <span
            key={item.name}
            className="flex items-center"
            style={{
              transition: `opacity 800ms ${EASE}, transform 800ms ${EASE}`,
              transitionDelay: `${i * 80}ms`,
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(10px)",
            }}
          >
            {"logo" in item ? (
              <img
                src={item.logo}
                alt={item.name}
                className="h-6 sm:h-7 w-auto object-contain opacity-75 grayscale transition duration-300 hover:grayscale-0 hover:opacity-100"
                loading="lazy"
              />
            ) : (
              <span className="font-heading font-bold tracking-tight text-base sm:text-lg text-calm-charcoal/70">
                {item.wordmark}
              </span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
};

export default CredibilityStrip;
