import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { fetchTechniques, type Technique } from "@/lib/api";
import { readSeed, writeSeed, techniquesKey } from "@/lib/prerender-data";
import { getTechniquesIndexStructuredData } from "@/lib/seo-data";
import { useLocale, useT, localizedHref } from "@/i18n";

const sectionClass = "py-[clamp(2.5rem,5vw,4rem)]";

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
  // Seeded by the prerenderer so the first client render matches the listing
  // already painted into the HTML. See lib/prerender-data.
  const seed = readSeed<Technique[]>(techniquesKey(locale));
  const [techniques, setTechniques] = useState<Technique[]>(seed ?? []);
  const [loading, setLoading] = useState(!seed);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const seeded = readSeed<Technique[]>(techniquesKey(locale));
    if (seeded) {
      setTechniques(seeded);
      setLoading(false);
    } else {
      setLoading(true);
    }
    setError(null);

    let cancelled = false;

    const loadTechniques = async () => {
      try {
        const data = await fetchTechniques(locale);
        if (cancelled) return;
        setTechniques(data);
        writeSeed(techniquesKey(locale), data);
      } catch (err) {
        if (cancelled) return;
        // The seeded listing is already on screen; a failed refresh should not
        // replace it with an error.
        if (!seeded) {
          setError(
            err instanceof Error ? err.message : "Failed to load techniques",
          );
        }
        console.error("Error loading techniques:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Always refetch so a technique added or renamed in the backend shows up
    // without a redeploy. Behind a seed this is silent. See TechniquePage.
    loadTechniques();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  // The browser tries the #hash before the listing has loaded, so the
  // category anchor from a technique page does not exist yet and the page
  // stays at the top. Scroll once the cards are in.
  useEffect(() => {
    if (loading || error) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [loading, error]);

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
          <p className="mt-4 font-body text-calm-charcoal/80">{t.loading}</p>
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
            <h2 className="font-heading font-bold text-calm-navy text-xl sm:text-2xl tracking-tight">
              {t.error}
            </h2>
            <p className="mt-3 font-body text-calm-charcoal/80 leading-relaxed">
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
        <section className="relative overflow-hidden pt-28 pb-[clamp(2rem,5vw,3.5rem)] sm:pt-36">
          <div className="gutter relative">
            <div className="max-w-3xl">
              <h1 className="t-display font-accent font-bold text-calm-navy tracking-tight">
                {t.title}
              </h1>
              <p className="mt-6 max-w-2xl t-lead font-body text-calm-charcoal/80 leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Main categories. These have children, so the hierarchy is the
            information, and the layout still encodes it: a rule and a heading
            carry the parent, its sub-techniques are rows beneath it. No box
            inside a box. */}
        {mainCategories.length > 0 && (
          <section className={sectionClass}>
            <div className="gutter">
              <h2 className="font-heading t-h2-sm font-bold text-calm-navy">
                {t.mainCategories}
              </h2>
              <div className="mt-8 grid grid-cols-1 items-start gap-x-14 gap-y-12 md:grid-cols-2">
                {/* The id on each category is the landing spot for the parent link
                    on a sub-technique page. scroll-mt clears the fixed h-20
                    header, which would otherwise cover the heading. */}
                {mainCategories.map((category) => (
                  <div
                    key={category.slug}
                    id={category.slug}
                    className="scroll-mt-24 border-t-2 border-calm-navy/80 pt-6"
                  >
                    <h3 className="font-heading t-h3 font-bold text-calm-navy">
                      {category.name}
                    </h3>
                    <p className="mt-2 max-w-xl font-body t-small text-calm-charcoal/80">
                      {category.description}
                    </p>

                    {category.sub_techniques &&
                      category.sub_techniques.length > 0 && (
                        <ul className="mt-5 divide-y divide-calm-charcoal/10 border-y border-calm-charcoal/10">
                          {category.sub_techniques.map((subTech) => (
                            <li key={subTech.slug}>
                              {/* Whole row is the target, comfortably over
                                  44px on a phone. */}
                              <Link
                                to={localizedHref(
                                  `/techniques/${subTech.slug}`,
                                  locale,
                                )}
                                className="group flex items-start gap-3 py-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40"
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
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                    {(!category.sub_techniques ||
                      category.sub_techniques.length === 0) && (
                      <p className="mt-4 font-body t-small text-calm-charcoal/80">
                        {category.mini_games_count || 0} {t.techniques}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Standalone techniques have no children, so each whole row is one
            link rather than a small "View Details" target. */}
        {standalone.length > 0 && (
          <section className={sectionClass}>
            <div className="gutter">
              <h2 className="font-heading t-h2-sm font-bold text-calm-navy">
                {t.standalone}
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-x-14 md:grid-cols-2">
                {standalone.map((technique) => (
                  <Link
                    key={technique.slug}
                    to={localizedHref(`/techniques/${technique.slug}`, locale)}
                    className="group flex flex-col border-t border-calm-charcoal/10 py-6 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40"
                  >
                    <h3 className="font-heading t-h3 font-bold text-calm-navy group-hover:underline">
                      {technique.name}
                    </h3>
                    <p className="mt-2 max-w-xl font-body t-small text-calm-charcoal/80">
                      {technique.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-body t-small font-semibold text-calm-navy">
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

        <div className="pb-[clamp(3rem,6vw,5rem)]">
          <div className="gutter"></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
