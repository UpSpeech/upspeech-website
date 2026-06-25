import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { useLocale, useT, localizedPath } from "@/i18n";
import {
  getDocumentationArticleStructuredData,
} from "@/lib/seo-data";

const eyebrowClass =
  "font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender";

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
        <section className="relative overflow-hidden px-[max(1.5rem,5vw)] pt-28 pb-[clamp(3rem,7vw,6rem)] sm:pt-36">
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
              <p className={eyebrowClass}>{t.intro.eyebrow}</p>
              <h1
                className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight"
                style={{
                  fontSize: "clamp(2.25rem, 6vw, 4rem)",
                  lineHeight: 1.05,
                }}
              >
                {t.intro.headlineLine1}
                <br />
                <span className="text-calm-lavender">
                  {t.intro.headlineLine2}
                </span>
              </h1>
              <p className="mt-6 max-w-2xl font-body text-lg text-calm-charcoal/70 leading-relaxed">
                {t.intro.body}
              </p>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <section className="px-[max(1.5rem,5vw)] py-[clamp(3rem,6vw,5rem)]">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10">
              {t.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-heading font-bold text-calm-charcoal tracking-tight text-xl sm:text-2xl">
                    {section.heading}
                  </h2>
                  <p className="mt-3 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-calm-light px-[max(1.5rem,5vw)] py-[clamp(3.5rem,7vw,6rem)]">
          <div className="max-w-3xl mx-auto">
            <p className={eyebrowClass}>{t.faq.eyebrow}</p>
            <h2
              className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              {t.faq.headline}
            </h2>

            <dl className="mt-8 divide-y divide-calm-charcoal/10">
              {t.faq.items.map((item) => (
                <div key={item.q} className="py-5">
                  <dt className="font-heading font-bold text-calm-charcoal text-base sm:text-lg">
                    {item.q}
                  </dt>
                  <dd className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>

            <MedicalDisclaimer className="mt-8" />
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-[max(1.5rem,5vw)] pb-[clamp(4rem,8vw,7rem)] pt-[clamp(3.5rem,7vw,6rem)]">
          <div className="max-w-3xl mx-auto rounded-2xl border border-calm-navy/10 bg-calm-light/60 px-7 py-10 sm:px-10 sm:py-12 text-center">
            <h2
              className="font-heading font-bold text-calm-charcoal tracking-tight"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                lineHeight: 1.1,
              }}
            >
              {t.closing.headline}
            </h2>
            <p className="mt-4 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
              {t.closing.bodyPrefix}
              <a
                href={`${localizedPath("/", locale)}#cta`}
                className="font-semibold text-calm-navy hover:underline"
              >
                {t.closing.bodyLink}
              </a>
              {t.closing.bodySuffix}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
