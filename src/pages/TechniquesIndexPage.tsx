import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { fetchTechniques, type Technique } from "@/lib/api";
import { getTechniquesIndexStructuredData } from "@/lib/seo-data";
import { useLocale, useT, localizedPath } from "@/i18n";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";

// Shared with the redesigned pages (ForSlps, ForPatients, PersonCentered) so
// the techniques section reads as the same site.
const eyebrowClass =
  "font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender";
const sectionClass = "px-[max(1.5rem,5vw)] py-[clamp(2.5rem,5vw,4rem)]";

// Page chrome for the loading and error states, so they are not a different
// site from the loaded page.
const Shell = ({
  state,
  children,
}: {
  state: "loading" | "error";
  children: React.ReactNode;
}) => (
  <main
    id="main"
    data-prerender-state={state}
    className="flex-1 px-[max(1.5rem,5vw)] pt-28 pb-16 sm:pt-36"
  >
    <div className="max-w-6xl mx-auto">{children}</div>
  </main>
);

export function TechniquesIndexPage() {
  const locale = useLocale();
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTechniques = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTechniques(locale);
        setTechniques(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load techniques",
        );
        console.error("Error loading techniques:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTechniques();
  }, [locale]);

  // Group techniques by type
  const mainCategories = techniques.filter(
    (t) => t.category_type === "main_category",
  );
  const standalone = techniques.filter((t) => t.category_type === "standalone");

  const t = useT().techniquesIndex;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white font-body">
        <Header />
        <Shell state="loading">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-calm-navy border-r-transparent"
            role="status"
            aria-label={t.loading}
          />
          <p className="mt-4 font-body text-calm-charcoal/70">{t.loading}</p>
        </Shell>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white font-body">
        <Header />
        <Shell state="error">
          <div className="max-w-2xl rounded-2xl border border-calm-charcoal/10 bg-calm-light/60 px-6 py-8">
            <h2 className="font-heading font-bold text-calm-charcoal text-xl sm:text-2xl tracking-tight">
              {t.error}
            </h2>
            <p className="mt-3 font-body text-calm-charcoal/70 leading-relaxed">
              {t.tryAgain}
            </p>
          </div>
        </Shell>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      <SEO
        title={t.title}
        description={t.seoDescription}
        path="/techniques"
        locale={locale}
        structuredData={getTechniquesIndexStructuredData(locale)}
      />
      <Header />

      <main id="main" data-prerender-state="ready" className="flex-1">
        {/* Intro, matching the other pages: left aligned, eyebrow + headline */}
        <section className="relative overflow-hidden px-[max(1.5rem,5vw)] pt-28 pb-[clamp(2rem,5vw,3.5rem)] sm:pt-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(800px 600px at 12% 15%, rgba(152,165,254,0.12), transparent 60%)",
            }}
          />
          <div className="relative max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <p className={eyebrowClass}>{t.techniques}</p>
              <h1
                className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight"
                style={{
                  fontSize: "clamp(2.25rem, 6vw, 4rem)",
                  lineHeight: 1.05,
                }}
              >
                {t.title}
              </h1>
              <p className="mt-6 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/70 leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Main categories. These have children, so the card holds the parent
            and its sub-techniques nest inside it: the hierarchy is the
            information, so the layout encodes it rather than flattening. */}
        {mainCategories.length > 0 && (
          <section className={sectionClass}>
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading font-bold text-calm-charcoal tracking-tight text-xl sm:text-2xl">
                {t.mainCategories}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {mainCategories.map((category) => (
                  <div
                    key={category.slug}
                    className="rounded-2xl border border-calm-charcoal/10 bg-calm-light/60 p-6 sm:p-7"
                  >
                    <h3 className="font-heading font-bold text-calm-charcoal tracking-tight text-lg sm:text-xl">
                      {category.name}
                    </h3>
                    <p className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
                      {category.description}
                    </p>

                    {category.sub_techniques &&
                      category.sub_techniques.length > 0 && (
                        <ul className="mt-5 space-y-2">
                          {category.sub_techniques.map((subTech) => (
                            <li key={subTech.slug}>
                              {/* Whole row is the target, comfortably over
                                  44px on a phone. */}
                              <Link
                                to={localizedPath(
                                  `/techniques/${subTech.slug}`,
                                  locale,
                                )}
                                className="group flex items-start gap-3 rounded-xl bg-white/70 p-4 transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40"
                              >
                                <span className="flex-1">
                                  <span className="block font-body font-semibold text-calm-charcoal">
                                    {subTech.name}
                                  </span>
                                  <span className="mt-1 block font-body text-sm text-calm-charcoal/70 leading-relaxed">
                                    {subTech.description}
                                  </span>
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="mt-0.5 shrink-0 font-body text-calm-navy transition-transform duration-200 group-hover:translate-x-0.5"
                                >
                                  →
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                    {(!category.sub_techniques ||
                      category.sub_techniques.length === 0) && (
                      <p className="mt-4 font-body text-sm text-calm-charcoal/60">
                        {category.mini_games_count || 0} {t.techniques}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Standalone techniques have no children, so the whole card is one
            link rather than a small "View Details" target. */}
        {standalone.length > 0 && (
          <section className={sectionClass}>
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading font-bold text-calm-charcoal tracking-tight text-xl sm:text-2xl">
                {t.standalone}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {standalone.map((technique) => (
                  <Link
                    key={technique.slug}
                    to={localizedPath(`/techniques/${technique.slug}`, locale)}
                    className="group flex flex-col rounded-2xl border border-calm-charcoal/10 bg-calm-light/60 p-6 sm:p-7 transition-colors duration-200 hover:bg-calm-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40"
                  >
                    <h3 className="font-heading font-bold text-calm-charcoal tracking-tight text-lg sm:text-xl">
                      {technique.name}
                    </h3>
                    <p className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
                      {technique.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-calm-navy">
                      {t.viewDetails}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="px-[max(1.5rem,5vw)] pb-[clamp(3rem,6vw,5rem)]">
          <div className="max-w-6xl mx-auto">
            <MedicalDisclaimer />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
