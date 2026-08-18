import { useReveal } from "./useReveal";
import ZoomableImage from "./ui/ZoomableImage";
import { useT, useLocale, localizedAsset } from "@/i18n";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Image sources stay in code; label/title/copy/imageAlt come from the dictionary
// by index (home.gallery.features).
const FEATURE_IMAGES = [
  "/screenshots/app/therapist-learning-path.png",
  "/screenshots/app/patient-ai-scenario.png",
  "/screenshots/app/cbsa-severity-trend.png",
];

const FeatureGallerySection = () => {
  const t = useT().home.gallery;
  const locale = useLocale();
  const featureImages = FEATURE_IMAGES.map((src) =>
    localizedAsset(src, locale),
  );
  const annotationImage = localizedAsset(
    "/screenshots/app/researcher-annotation-tool.jpg",
    locale,
  );
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
          {t.eyebrow}
        </p>
        <h2
          className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.75rem)",
            lineHeight: 1.08,
            ...headerStyle(80),
          }}
        >
          {t.headlineLine1}
          <br />
          <span className="text-calm-lavender">{t.headlineLine2}</span>
        </h2>
        <p
          className="mt-6 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/65 leading-relaxed"
          style={headerStyle(140)}
        >
          {t.intro}
        </p>

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
              src={annotationImage}
              alt={t.annotationImageAlt}
              className="w-full h-auto block rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="p-7 sm:p-9 lg:p-11 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-calm-navy/10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full bg-calm-lavender/15 px-2.5 py-1 font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-calm-navy">
                {t.forClinicians}
              </span>
              <span className="rounded-full bg-calm-lavender/15 px-2.5 py-1 font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-calm-navy">
                {t.forResearchers}
              </span>
            </div>
            <div className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-calm-lavender">
              {t.annotationEyebrow}
            </div>
            <h3 className="mt-2 font-heading font-bold text-calm-charcoal tracking-tight text-2xl sm:text-3xl leading-tight">
              {t.annotationTitle}
            </h3>
            <p className="mt-4 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
              {t.annotationCopy}
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
          {t.features.map((f, i) => (
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
                  src={featureImages[i]}
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
