import { useReveal } from "./useReveal";
import ZoomableImage from "./ui/ZoomableImage";

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
    label: "Practice scenarios",
    title: "Rehearsal with a virtual conversation partner.",
    copy: "Patients rehearse difficult conversations with a virtual counterpart. The clinician sets the scenario and difficulty.",
    image: "/screenshots/app/patient-ai-scenario.png",
    imageAlt:
      "UpSpeech practice scenario interface showing a job interview rehearsal with objectives and video call",
  },
  {
    label: "Daily check-ins",
    title: "A 30-second self-report from the patient.",
    copy: "Patients log severity in a few taps. Trends are visible in the clinician's dashboard before the next session.",
    image: "/screenshots/app/patient-daily-checkin.png",
    imageAlt: "UpSpeech daily severity check-in scale from 0 to 10",
  },
  {
    label: "Inactive-patient alerts",
    title: "Patients without recent activity at the top of the dashboard.",
    copy: "Patients without recent practice appear at the top of the clinician's dashboard, so they can be checked on.",
    image: "/screenshots/app/therapist-inactive-patients.png",
    imageAlt:
      "UpSpeech dashboard alert listing a patient with no recent practice, with a prompt to check in",
  },
];

const STATS = [
  { value: "11+", label: "Therapeutic techniques" },
  { value: "36+", label: "Structured steps" },
  { value: "8", label: "Therapy milestones" },
] as const;

const FeatureGallerySection = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "0px 0px 0px 0px",
  });

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
            For clinicians and researchers.
          </span>
        </h2>
        <p
          className="mt-6 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
          style={headerStyle(140)}
        >
          The platform is built around a structured learning path, from
          identifying stuttering moments through to real-world generalisation.
        </p>

        <div className="mt-[clamp(2rem,4vw,3rem)] grid max-w-2xl grid-cols-3 divide-x divide-calm-navy/10">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="px-5 first:pl-0 last:pr-0"
              style={headerStyle(220 + i * 90)}
            >
              <div
                className="font-heading font-bold text-calm-navy tabular-nums leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {stat.value.endsWith("+") ? (
                  <>
                    {stat.value.slice(0, -1)}
                    <span className="text-calm-lavender">+</span>
                  </>
                ) : (
                  stat.value
                )}
              </div>
              <div className="mt-2 font-body text-xs sm:text-sm text-calm-charcoal/65">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured: Annotation tool (cross-audience) */}
        <article
          className="mt-[clamp(3rem,6vw,5rem)] rounded-2xl overflow-hidden border border-calm-navy/10 bg-white shadow-[0_30px_80px_-30px_rgba(41,53,135,0.35)] grid grid-cols-1 lg:grid-cols-[1.4fr,1fr]"
          style={{
            transition: `opacity 1000ms ${EASE}, transform 1000ms ${EASE}`,
            transitionDelay: "180ms",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <div className="relative bg-calm-charcoal/[0.03] flex items-center justify-center p-3 sm:p-5 lg:p-6">
            <ZoomableImage
              src="/screenshots/app/researcher-annotation-tool.jpg"
              alt="UpSpeech annotation tool with audio waveform, video review, and frame-by-frame tagging by speech-language pathologists"
              className="w-full h-auto block rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="p-7 sm:p-9 lg:p-11 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-calm-navy/10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full bg-calm-lavender/15 px-2.5 py-1 font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-calm-navy">
                For clinicians
              </span>
              <span className="rounded-full bg-calm-lavender/15 px-2.5 py-1 font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-calm-navy">
                For researchers
              </span>
            </div>
            <div className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-calm-lavender">
              Annotation tool
            </div>
            <h3 className="mt-2 font-heading font-bold text-calm-charcoal tracking-tight text-2xl sm:text-3xl leading-tight">
              The tool clinicians and researchers use to label stuttering
              moments.
            </h3>
            <p className="mt-4 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
              Frame-by-frame tagging of stuttering moments: core behavior,
              secondary behaviors, tension level. Standard taxonomy. The same
              tool builds our dataset and supports research partnerships.
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["SR", "ISR", "MUR", "Prolongation", "Block", "Tension 0-3"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-calm-navy/15 bg-calm-light px-2.5 py-1 font-body text-[11px] font-medium text-calm-charcoal/70"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </article>

        <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <article
              key={f.label}
              className="flex flex-col"
              style={{
                transition: `opacity 1000ms ${EASE}, transform 1000ms ${EASE}`,
                transitionDelay: `${320 + i * 120}ms`,
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(32px)",
              }}
            >
              <div className="rounded-2xl overflow-hidden border border-calm-navy/10 bg-white shadow-[0_24px_60px_-30px_rgba(41,53,135,0.3)]">
                <ZoomableImage
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
