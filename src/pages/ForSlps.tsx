import {
  ClipboardDocumentListIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocale, useT, localizedPath } from "@/i18n";

// Step icons stay in code; titles/copy come from the dictionary by index
// (forSlps.betweenSessions.steps).
const STEP_ICONS = [
  ClipboardDocumentListIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
];

const eyebrowClass =
  "font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender";

export default function ForSlps() {
  const locale = useLocale();
  const t = useT().forSlps;

  // Build the FAQPage schema from the current-locale FAQ so prerendered pt/es
  // pages emit in-language structured data.
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
        path="/for-slps"
        locale={locale}
        structuredData={faqSchema}
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

        {/* Documentation */}
        <section className="relative overflow-hidden bg-calm-light px-[max(1.5rem,5vw)] py-[clamp(3.5rem,7vw,6rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 600px at 85% 10%, rgba(152,165,254,0.12), transparent 60%)",
            }}
          />
          <div className="relative max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <p className={eyebrowClass}>{t.documentation.eyebrow}</p>
              <h2
                className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                }}
              >
                {t.documentation.headline}
              </h2>
              <p className="mt-5 max-w-xl font-body text-base sm:text-lg text-calm-charcoal/70 leading-relaxed">
                {t.documentation.body}
              </p>
            </div>
          </div>
        </section>

        {/* Between sessions */}
        <section className="px-[max(1.5rem,5vw)] py-[clamp(3rem,6vw,5rem)]">
          <div className="max-w-6xl mx-auto">
            <p className={eyebrowClass}>{t.betweenSessions.eyebrow}</p>
            <h2
              className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight max-w-2xl"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              {t.betweenSessions.headline}
            </h2>

            <div className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-8 sm:gap-10 md:grid-cols-3">
              {t.betweenSessions.steps.map((step, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <div key={step.title}>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-calm-lavender/15 text-calm-navy">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      {i < t.betweenSessions.steps.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="hidden h-px flex-1 bg-calm-navy/10 md:block"
                        />
                      )}
                    </div>
                    <h3 className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight text-lg sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
                      {step.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stutter-positive */}
        <section className="px-[max(1.5rem,5vw)] py-[clamp(3rem,6vw,5rem)]">
          <div className="max-w-6xl mx-auto rounded-2xl border border-calm-lavender/20 bg-calm-lavender/5 px-7 py-10 sm:px-10 sm:py-12">
            <p className={eyebrowClass}>{t.stutterPositive.eyebrow}</p>
            <h2
              className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight max-w-2xl"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.1 }}
            >
              {t.stutterPositive.headline}
            </h2>
            <p className="mt-4 max-w-2xl font-body text-base sm:text-lg text-calm-charcoal/70 leading-relaxed">
              {t.stutterPositive.body}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-[max(1.5rem,5vw)] py-[clamp(3.5rem,7vw,6rem)]">
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
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-[max(1.5rem,5vw)] pb-[clamp(4rem,8vw,7rem)]">
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
