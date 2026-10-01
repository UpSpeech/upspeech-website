import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { useLocale, useT, localizedHref } from "@/i18n";
import { getDocumentationArticleStructuredData } from "@/lib/seo-data";

const eyebrowClass = "font-body t-eyebrow text-calm-lavender-ink";

export default function ReducingDocumentationTime() {
  const locale = useLocale();
  const t = useT().reducingDocumentationTime;

  const articleSchema = getDocumentationArticleStructuredData(locale);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen font-body bg-white">
      <SEO
        title={t.seoTitle}
        description={t.seoDescription}
        path="/reducing-documentation-time"
        locale={locale}
        structuredData={[articleSchema, faqSchema]}
      />
      <Header />

      <main id="main">
        {/* Intro */}
        <section className="relative overflow-hidden pt-28 pb-[clamp(0.5rem,2vw,1.5rem)] sm:pt-36">
          <div className="gutter relative">
            <div className="max-w-3xl">
              <p className={eyebrowClass}>{t.intro.eyebrow}</p>
              <h1 className="t-display mt-5 font-accent font-bold text-calm-navy tracking-tight">
                {t.intro.headlineLine1} <br />
                {t.intro.headlineLine2}
              </h1>
              <p className="mt-6 max-w-2xl font-body t-lead text-calm-charcoal/80">
                {t.intro.body}
              </p>
            </div>
          </div>
        </section>

        {/* The four ideas read as one running list on the page's own ground.
            Number and heading sit in the left column, the paragraph in the
            right, so the eye has one edge to follow down the page. */}
        <section className="py-[clamp(3rem,6vw,5rem)]">
          <div className="gutter">
            <div className="divide-y divide-calm-charcoal/10 border-y border-calm-charcoal/10">
              {t.sections.map((section, i) => (
                <article
                  key={section.heading}
                  className="grid gap-3 py-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-12 sm:py-10"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="font-heading t-h3 font-bold text-calm-lavender-ink tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-heading t-h3 font-bold text-calm-navy">
                      {section.heading}
                    </h2>
                  </div>
                  <p className="max-w-2xl font-body t-lead text-calm-charcoal/80">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-calm-light py-[clamp(3.5rem,7vw,6rem)]">
          <div className="gutter">
            <div className="max-w-3xl">
              <h2 className="t-h2 font-heading font-bold text-calm-navy tracking-tight">
                {t.faq.headline}
              </h2>

              <dl className="mt-8 divide-y divide-calm-charcoal/10">
                {t.faq.items.map((item) => (
                  <div key={item.q} className="py-5">
                    <dt className="font-heading font-bold text-calm-charcoal t-lead">
                      {item.q}
                    </dt>
                    <dd className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/80 leading-relaxed">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>

              <MedicalDisclaimer className="mx-0 mt-8" />
            </div>
          </div>
        </section>

        {/* Closing CTA: a heading and a sentence, left on the page's edge. */}
        <section className="pb-[clamp(4rem,8vw,7rem)] pt-[clamp(3.5rem,7vw,6rem)]">
          <div className="gutter">
            <div className="max-w-2xl">
              <h2 className="t-h2-sm font-heading font-bold text-calm-navy">
                {t.closing.headline}
              </h2>
              <p className="mt-4 font-body t-lead text-calm-charcoal/80">
                {t.closing.bodyPrefix}
                <a
                  href={`${localizedHref("/", locale)}#cta`}
                  className="font-semibold text-calm-navy hover:underline"
                >
                  {t.closing.bodyLink}
                </a>
                {t.closing.bodySuffix}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
