import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Framed iPhone store screenshots (the device bezel is baked in, so they render
// plain, no extra phone frame). Downscaled WebP copies of the app-mobile store
// art; the width/height below are their intrinsic pixels (for layout stability).
const SCREENSHOTS = [
  {
    src: "/screenshots/mobile/patient-home.webp",
    alt: "UpSpeech mobile app home screen showing the patient's exercise for the day",
  },
  {
    src: "/screenshots/mobile/patient-journey.webp",
    alt: "UpSpeech mobile app learning path showing the steps the therapist set",
  },
  {
    src: "/screenshots/mobile/patient-practice.webp",
    alt: "UpSpeech mobile app practice screen with guided stuttering exercises",
  },
];

const MobileAppBand = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div
        ref={ref}
        className="mx-auto max-w-6xl px-[max(1.5rem,5vw)]"
        style={{
          transition: `opacity 800ms ${EASE}, transform 800ms ${EASE}`,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <div className="max-w-2xl">
          <span className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender">
            In the patient's pocket
          </span>
          <h2
            className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.05 }}
          >
            The practice happens in the app, between sessions.
          </h2>
          <p className="mt-5 max-w-xl font-body text-lg text-calm-charcoal/80 leading-relaxed">
            Patients follow the plan their therapist set, practice with guided
            exercises, and check in from their phone. The therapist sees the
            activity behind it.
          </p>
        </div>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 sm:gap-8 lg:overflow-visible">
          {SCREENSHOTS.map((screenshot) => (
            <img
              key={screenshot.src}
              src={screenshot.src}
              alt={screenshot.alt}
              loading="lazy"
              width={660}
              height={1434}
              className="h-auto w-auto max-h-[520px] shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileAppBand;
