import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { fetchTechnique, type Technique } from "@/lib/api";
import {
  TECHNIQUE_SEO,
  getTechniqueStructuredData,
  getTechniqueFAQStructuredData,
} from "@/lib/seo-data";
import { TechniqueFAQ } from "@/components/TechniqueFAQ";
import { useLocale, useT, localizedPath } from "@/i18n";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";

interface TechniquePageProps {
  slug: string;
}

// Shared with the redesigned pages so this reads as the same site.
const eyebrowClass =
  "font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender-ink";
const cardClass =
  "rounded-2xl border border-calm-charcoal/10 bg-calm-light/60 p-6 sm:p-8";
const cardHeadingClass =
  "font-heading font-bold text-calm-charcoal tracking-tight text-xl sm:text-2xl";
const proseClass =
  "mt-4 font-body text-base text-calm-charcoal/80 leading-relaxed";

export function TechniquePage({ slug }: TechniquePageProps) {
  const locale = useLocale();
  const tt = useT().techniquePage;
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTechnique = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTechnique(slug, locale);
        setTechnique(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load technique",
        );
        console.error("Error loading technique:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTechnique();
  }, [slug, locale]);

  const staticSeo = TECHNIQUE_SEO[slug];

  // Format instructions: detect numbered lines and render as ordered list
  const formatInstructions = (text: string) => {
    const lines = text.split(/\\n|\n/).filter((line) => line.trim());
    const isNumberedList = lines.every((line) => /^\d+[.)]\s/.test(line));

    if (isNumberedList) {
      return (
        <ol className="mt-4 space-y-3 font-body text-base text-calm-charcoal/80">
          {lines.map((line, index) => (
            <li key={index} className="flex gap-3 leading-relaxed">
              {/* Instructions are a real sequence, so the number carries
                  information here and is worth showing. */}
              <span
                aria-hidden="true"
                className="mt-0.5 font-heading text-sm font-bold text-calm-lavender-ink"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{line.replace(/^\d+[.)]\s*/, "")}</span>
            </li>
          ))}
        </ol>
      );
    }

    return lines.map((line, index) => (
      <p key={index} className={proseClass}>
        {line}
      </p>
    ));
  };

  const seoTitle = technique?.name ?? staticSeo?.title;
  const seoDescription =
    technique?.description ||
    staticSeo?.description ||
    (technique
      ? `Learn about ${technique.name}, a speech therapy technique for stuttering.`
      : undefined);
  const structuredData = technique
    ? [
        getTechniqueStructuredData(
          slug,
          technique.name,
          seoDescription ?? "",
          locale,
        ),
        getTechniqueFAQStructuredData(slug, locale),
      ].filter(Boolean)
    : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/techniques/${slug}`}
        locale={locale}
        structuredData={structuredData}
      />
      <Header />

      {/* min-h keeps the footer below the fold while the article is in flight.
          main.tsx mounts with createRoot, which discards the prerendered DOM,
          so this page painted its full prerendered article, collapsed to the
          spinner, and the footer rode up ~250px: 0.691 CLS on a throttled
          phone. A layout shift only counts elements inside the viewport, and
          real articles run 1636-2137px tall, so holding the loading state at
          150vh means the footer is off-screen before and after the swap and
          the move costs nothing. Reserving a height in vh rather than a pixel
          guess also survives the articles getting longer or shorter. */}
      {loading && (
        <main
          id="main"
          data-prerender-state="loading"
          className="min-h-[150vh] flex-1 px-[max(1.5rem,5vw)] pt-28 pb-16 sm:pt-36"
        >
          <div className="max-w-4xl mx-auto">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-calm-navy border-r-transparent"
              role="status"
              aria-label={tt.loading}
            />
            <p className="mt-4 font-body text-calm-charcoal/80">{tt.loading}</p>
          </div>
        </main>
      )}

      {!loading && (error || !technique) && (
        <main
          id="main"
          data-prerender-state="error"
          className="min-h-[150vh] flex-1 px-[max(1.5rem,5vw)] pt-28 pb-16 sm:pt-36"
        >
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl rounded-2xl border border-calm-charcoal/10 bg-calm-light/60 px-6 py-8">
              <h2 className={cardHeadingClass}>{tt.error}</h2>
              <p className="mt-3 font-body text-calm-charcoal/80 leading-relaxed">
                {error || tt.notFound}
              </p>
              <a
                href={localizedPath("/techniques", locale)}
                className="mt-5 inline-flex min-h-[44px] items-center font-body text-sm font-semibold text-calm-navy hover:underline"
              >
                ← {tt.backToAll}
              </a>
            </div>
          </div>
        </main>
      )}

      {!loading && !error && technique && (
        <main id="main" data-prerender-state="ready" className="flex-1">
          {/* Intro, left aligned to match the rest of the site */}
          <section className="relative overflow-hidden px-[max(1.5rem,5vw)] pt-28 pb-[clamp(2rem,5vw,3.5rem)] sm:pt-36">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(800px 600px at 12% 15%, rgba(152,165,254,0.12), transparent 60%)",
              }}
            />
            <div className="relative max-w-4xl mx-auto">
              {/* The parent link is real navigation, not decoration: it is how
                  you get back up the taxonomy. */}
              {technique.parent_technique ? (
                <p className={eyebrowClass}>
                  <a
                    href={localizedPath(
                      `/techniques/${technique.parent_technique.slug}`,
                      locale,
                    )}
                    className="inline-flex min-h-[44px] items-center hover:underline"
                  >
                    {technique.parent_technique.name}
                  </a>
                </p>
              ) : (
                <p className={eyebrowClass}>
                  <a
                    href={localizedPath("/techniques", locale)}
                    className="inline-flex min-h-[44px] items-center hover:underline"
                  >
                    {tt.backToAll}
                  </a>
                </p>
              )}
              <h1
                className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight"
                style={{
                  fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
                  lineHeight: 1.05,
                }}
              >
                {technique.name}
              </h1>
              {technique.description && (
                <p className="mt-6 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/80 leading-relaxed">
                  {technique.description}
                </p>
              )}
            </div>
          </section>

          <div className="px-[max(1.5rem,5vw)] pb-[clamp(3rem,6vw,5rem)]">
            <div className="max-w-4xl mx-auto space-y-6">
              {technique.practical_description && (
                <section className={cardClass}>
                  <h2 className={cardHeadingClass}>
                    {tt.practicalDescription}
                  </h2>
                  <p className={proseClass}>
                    {technique.practical_description}
                  </p>
                </section>
              )}

              {technique.objective && (
                <section className={cardClass}>
                  <h2 className={cardHeadingClass}>{tt.objective}</h2>
                  <p className={proseClass}>{technique.objective}</p>
                </section>
              )}

              {technique.instructions && (
                <section className={cardClass}>
                  <h2 className={cardHeadingClass}>{tt.howToPractice}</h2>
                  {formatInstructions(technique.instructions)}
                </section>
              )}

              {technique.sub_techniques &&
                technique.sub_techniques.length > 0 && (
                  <section className={cardClass}>
                    <h2 className={cardHeadingClass}>{tt.relatedTechniques}</h2>
                    <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {technique.sub_techniques.map((subTech) => (
                        <li key={subTech.slug}>
                          <a
                            href={localizedPath(
                              `/techniques/${subTech.slug}`,
                              locale,
                            )}
                            className="group flex h-full items-start gap-3 rounded-xl bg-white/70 p-4 transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40"
                          >
                            <span className="flex-1">
                              <span className="block font-body font-semibold text-calm-charcoal">
                                {subTech.name}
                              </span>
                              <span className="mt-1 block font-body text-sm text-calm-charcoal/80 leading-relaxed">
                                {subTech.description}
                              </span>
                            </span>
                            <span
                              aria-hidden="true"
                              className="mt-0.5 shrink-0 font-body text-calm-navy transition-transform duration-200 group-hover:translate-x-0.5"
                            >
                              →
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

              <TechniqueFAQ slug={slug} locale={locale} />

              <MedicalDisclaimer />
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
