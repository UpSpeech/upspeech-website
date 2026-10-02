import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { fetchTechnique, type Technique } from "@/lib/api";
import { readSeed, writeSeed, techniqueKey } from "@/lib/prerender-data";
import {
  TECHNIQUE_SEO,
  getTechniqueStructuredData,
  getTechniqueFAQStructuredData,
} from "@/lib/seo-data";
import { Faq } from "@/components/Faq";
import { getTechniqueFAQs } from "@/lib/technique-faqs";
import { useLocale, useT, localizedHref } from "@/i18n";

interface TechniquePageProps {
  slug: string;
}

// Shared with the redesigned pages so this reads as the same site.
const eyebrowClass = "font-body t-eyebrow text-calm-lavender-ink";
// The one block on the page that earns its own ground: a procedure the reader follows.
const procedureClass =
  "rounded-2xl border border-calm-charcoal/10 bg-calm-light/60 p-6 sm:p-8";
const FAQ_TITLES: Record<string, string> = {
  en: "Frequently Asked Questions",
  pt: "Perguntas Frequentes",
  es: "Preguntas Frecuentes",
};
const headingClass = "font-heading t-h3 font-bold text-calm-navy";
const proseClass = "mt-4 font-body t-lead text-calm-charcoal/80";

export function TechniquePage({ slug }: TechniquePageProps) {
  const locale = useLocale();
  const tt = useT().techniquePage;
  // The prerenderer bakes this article into the HTML it generates, so on a cold
  // load the content is already on screen. Starting from the seed means the first
  // client render matches that markup and hydration adopts the paint instead of
  // replacing it with a spinner and refetching. A client-side navigation to a
  // different article finds no seed and fetches, as before.
  const seed = readSeed<Technique>(techniqueKey(slug, locale));
  const [technique, setTechnique] = useState<Technique | null>(seed);
  const [loading, setLoading] = useState(!seed);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const seeded = readSeed<Technique>(techniqueKey(slug, locale));
    // Showing the seed straight away also covers navigating back to the seeded
    // article after reading another one, where the state still holds the article
    // we moved away from.
    if (seeded) {
      setTechnique(seeded);
      setLoading(false);
    } else {
      setLoading(true);
    }
    setError(null);

    let cancelled = false;

    const loadTechnique = async () => {
      try {
        const data = await fetchTechnique(slug, locale);
        if (cancelled) return;
        setTechnique(data);
        writeSeed(techniqueKey(slug, locale), data);
      } catch (err) {
        if (cancelled) return;
        // A seeded page already has its article on screen. A failed refresh is
        // not a reason to replace it with an error.
        if (!seeded) {
          setError(
            err instanceof Error ? err.message : "Failed to load technique",
          );
        }
        console.error("Error loading technique:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Always refetch, seeded or not, so an article edited in the backend still
    // reaches readers without a redeploy. With a seed this runs behind the
    // painted article and changes nothing unless the content actually changed.
    loadTechnique();

    return () => {
      cancelled = true;
    };
  }, [slug, locale]);

  // The #hash is tried before the article has loaded on a cold client
  // navigation, so scroll to it once the sections exist.
  useEffect(() => {
    if (loading || error) return;
    const raw = window.location.hash.slice(1);
    let id = raw;
    try {
      id = decodeURIComponent(raw);
    } catch {
      // A pasted link with a broken escape still has to render.
    }
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [loading, error, slug]);

  const staticSeo = TECHNIQUE_SEO[slug];
  const faqs = getTechniqueFAQs(slug, locale);
  const railLinks = [
    technique?.practical_description && {
      id: "practical-description",
      label: tt.practicalDescription,
    },
    technique?.objective && { id: "objective", label: tt.objective },
    technique?.instructions && {
      id: "how-to-practise",
      label: tt.howToPractice,
    },
    faqs?.length && {
      id: "faq",
      label: FAQ_TITLES[locale] || FAQ_TITLES.en,
    },
  ].filter((link): link is { id: string; label: string } => Boolean(link));

  // Format instructions: detect numbered lines and render as ordered list
  const formatInstructions = (text: string) => {
    const lines = text.split(/\\n|\n/).filter((line) => line.trim());
    const isNumberedList = lines.every((line) => /^\d+[.)]\s/.test(line));

    if (isNumberedList) {
      return (
        <ol className="mt-4 space-y-3 font-body t-lead text-calm-charcoal/80">
          {lines.map((line, index) => (
            <li key={index} className="flex gap-3 leading-relaxed">
              {/* Instructions are a real sequence, so the number carries
                  information here and is worth showing. */}
              <span
                aria-hidden="true"
                className="mt-0.5 font-heading t-small font-bold text-calm-lavender-ink"
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
              <h2 className={headingClass}>{tt.error}</h2>
              <p className="mt-3 font-body text-calm-charcoal/80 leading-relaxed">
                {error || tt.notFound}
              </p>
              <a
                href={localizedHref("/techniques", locale)}
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
          <section className="relative overflow-hidden pt-28 pb-[clamp(2rem,5vw,3.5rem)] sm:pt-36">
            <div className="gutter relative">
              {/* The parent link is real navigation, not decoration: it is how
                  you get back up the taxonomy. It points at the category's card
                  on the index rather than /techniques/<parent slug>, which is
                  not a route: the parent categories (fluency-shaping,
                  fluency-modification) exist only as headings on the index, so
                  that URL 404s in all three locales. */}
              {technique.parent_technique ? (
                <p className={eyebrowClass}>
                  <a
                    href={`${localizedHref("/techniques", locale)}#${technique.parent_technique.slug}`}
                    className="inline-flex min-h-[44px] items-center hover:underline"
                  >
                    {technique.parent_technique.name}
                  </a>
                </p>
              ) : (
                <p className={eyebrowClass}>
                  <a
                    href={localizedHref("/techniques", locale)}
                    className="inline-flex min-h-[44px] items-center hover:underline"
                  >
                    {tt.backToAll}
                  </a>
                </p>
              )}
              <h1 className="t-display mt-5 max-w-4xl font-accent font-bold text-calm-navy tracking-tight">
                {technique.name}
              </h1>
              {technique.description && (
                <p className="mt-6 max-w-2xl t-lead font-body text-calm-charcoal/80 leading-relaxed">
                  {technique.description}
                </p>
              )}
            </div>
          </section>

          <div className="pb-[clamp(3rem,6vw,5rem)]">
            <div className="gutter lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
              <div className="space-y-[clamp(2.5rem,5vw,4rem)]">
                {technique.practical_description && (
                  <section
                    id="practical-description"
                    className="max-w-3xl scroll-mt-28"
                  >
                    <h2 className={headingClass}>{tt.practicalDescription}</h2>
                    <p className={proseClass}>
                      {technique.practical_description}
                    </p>
                  </section>
                )}

                {technique.objective && (
                  <section
                    id="objective"
                    className="max-w-3xl scroll-mt-28 border-l-2 border-calm-lavender pl-6"
                  >
                    <h2 className={eyebrowClass}>{tt.objective}</h2>
                    <p className="mt-3 font-heading t-statement font-semibold text-calm-navy">
                      {technique.objective}
                    </p>
                  </section>
                )}

                {technique.instructions && (
                  <section
                    id="how-to-practise"
                    className={`max-w-3xl scroll-mt-28 ${procedureClass}`}
                  >
                    <h2 className={headingClass}>{tt.howToPractice}</h2>
                    {formatInstructions(technique.instructions)}
                  </section>
                )}

                {technique.sub_techniques &&
                  technique.sub_techniques.length > 0 && (
                    <section className="border-t border-calm-charcoal/10 pt-8 lg:hidden">
                      <h2 className={headingClass}>{tt.relatedTechniques}</h2>
                      <ul className="mt-5 grid grid-cols-1 gap-x-12 md:grid-cols-2">
                        {technique.sub_techniques.map((subTech) => (
                          <li
                            key={subTech.slug}
                            className="border-b border-calm-charcoal/10"
                          >
                            <a
                              href={localizedHref(
                                `/techniques/${subTech.slug}`,
                                locale,
                              )}
                              className="group flex h-full items-start gap-3 py-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40"
                            >
                              <span className="flex-1">
                                <span className="block font-body font-semibold text-calm-charcoal group-hover:underline">
                                  {subTech.name}
                                </span>
                                <span className="mt-1 block font-body t-small text-calm-charcoal/80">
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

                {faqs?.length ? (
                  <section
                    id="faq"
                    className="max-w-3xl scroll-mt-28 border-t border-calm-charcoal/10 pt-8"
                  >
                    <h2 className={`${headingClass} mb-5`}>
                      {FAQ_TITLES[locale] || FAQ_TITLES.en}
                    </h2>
                    <Faq
                      items={faqs.map((faq) => ({
                        question: faq.question,
                        answer: faq.answer,
                      }))}
                    />
                  </section>
                ) : null}
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28 border-l border-calm-charcoal/10 pl-6">
                  <nav aria-label={tt.onThisPage}>
                    <p className={eyebrowClass}>{tt.onThisPage}</p>
                    <ul className="mt-3 space-y-1">
                      {railLinks.map((link) => (
                        <li key={link.id}>
                          <a
                            href={`#${link.id}`}
                            className="inline-flex min-h-[44px] items-center font-body t-small font-semibold text-calm-charcoal hover:text-calm-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  {technique.sub_techniques &&
                    technique.sub_techniques.length > 0 && (
                      <nav
                        aria-label={tt.relatedTechniques}
                        className="mt-8 border-t border-calm-charcoal/10 pt-6"
                      >
                        <p className={eyebrowClass}>{tt.relatedTechniques}</p>
                        <ul className="mt-3 space-y-1">
                          {technique.sub_techniques.map((subTech) => (
                            <li key={subTech.slug}>
                              <a
                                href={localizedHref(
                                  `/techniques/${subTech.slug}`,
                                  locale,
                                )}
                                className="inline-flex min-h-[44px] items-center font-body t-small font-semibold text-calm-charcoal hover:text-calm-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40"
                              >
                                {subTech.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    )}
                </div>
              </aside>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
