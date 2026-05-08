import { useReveal } from "./useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Feature = {
  label: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
};

const FEATURES: Feature[] = [
  {
    label: "AI-drafted reports",
    title: "Reports, drafted from data, signed by clinicians.",
    copy: "Session recording and notes turn into a structured clinical report. The therapist reviews, edits, signs.",
    image: "/screenshots/app/therapist-report.png",
    imageAlt:
      "UpSpeech report editor with patient assignment and structured speech therapy report",
  },
  {
    label: "AI scenarios",
    title: "Rehearsal, with a partner who never gets tired.",
    copy: "Patients practice difficult conversations with an AI counterpart, calibrated by the clinician to the patient's stage.",
    image: "/screenshots/app/patient-ai-scenario.png",
    imageAlt:
      "UpSpeech AI scenario interface showing a job interview rehearsal with objectives and video call",
  },
  {
    label: "Daily check-ins",
    title: "A 30-second self-report. A continuous trend.",
    copy: "Patients log severity in a few taps. Trends surface in the clinician's dashboard, ready for the next session.",
    image: "/screenshots/app/patient-daily-checkin.png",
    imageAlt: "UpSpeech daily severity check-in scale from 0 to 10",
  },
  {
    label: "Proactive nudges",
    title: "Patients who go quiet show up at the top of your day.",
    copy: "The dashboard surfaces inactive patients before they slip through. One tap to check in.",
    image: "/screenshots/app/therapist-inactive-patients.png",
    imageAlt:
      "UpSpeech inactive patients alert showing a patient with no practice for 62 days",
  },
];

const FeatureGallerySection = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.15 });

  const headerStyle = (delay: number): React.CSSProperties => ({
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section className="relative bg-white px-[max(1.5rem,5vw)] py-[clamp(5rem,10vw,10rem)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(800px 600px at 8% 20%, rgba(152,165,254,0.12), transparent 60%)",
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender"
          style={headerStyle(0)}
        >
          Inside the platform
        </p>
        <h2
          className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.75rem)",
            lineHeight: 1.08,
            ...headerStyle(80),
          }}
        >
          Specific tools.
          <br />
          <span className="text-calm-lavender">
            For specific clinical work.
          </span>
        </h2>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-8 sm:gap-10 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <article
              key={f.label}
              className="flex flex-col"
              style={{
                transition: `opacity 1000ms ${EASE}, transform 1000ms ${EASE}`,
                transitionDelay: `${200 + i * 120}ms`,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(32px)",
              }}
            >
              <div className="rounded-2xl overflow-hidden border border-calm-navy/10 bg-white shadow-[0_24px_60px_-30px_rgba(41,53,135,0.3)]">
                <img
                  src={f.image}
                  alt={f.imageAlt}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <div className="mt-5">
                <div className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-calm-lavender">
                  {f.label}
                </div>
                <h3 className="mt-2 font-heading font-bold text-calm-charcoal tracking-tight text-xl sm:text-2xl">
                  {f.title}
                </h3>
                <p className="mt-3 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
                  {f.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGallerySection;
