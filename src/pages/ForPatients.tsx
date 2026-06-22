import {
  ClipboardDocumentCheckIcon,
  DevicePhoneMobileIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";
import { useLocale, useT, localizedPath } from "@/i18n";

// Step icons stay in code; titles/copy come from the dictionary by index
// (forPatients.howItWorks.steps).
const STEP_ICONS = [
  ClipboardDocumentCheckIcon,
  DevicePhoneMobileIcon,
  ArrowTrendingUpIcon,
];

// Screenshot sources stay in code; alt text comes from forPatients.app.screenshots.
const SCREENSHOTS = [
  "/screenshots/mobile/patient-home-device.png",
  "/screenshots/mobile/patient-journey-device.png",
  "/screenshots/mobile/patient-practice-device.png",
];

const eyebrowClass =
  "font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender";

export default function ForPatients() {
  const locale = useLocale();
  const t = useT().forPatients;

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
        path="/for-patients"
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

        {/* How it works for you */}
        <section className="px-[max(1.5rem,5vw)] py-[clamp(3rem,6vw,5rem)]">
          <div className="max-w-6xl mx-auto">
            <p className={eyebrowClass}>{t.howItWorks.eyebrow}</p>
            <h2
              className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight max-w-2xl"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              {t.howItWorks.headline}
            </h2>

            <div className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-8 sm:gap-10 md:grid-cols-3">
              {t.howItWorks.steps.map((step, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <div key={step.title}>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-calm-lavender/15 text-calm-navy">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      {i < t.howItWorks.steps.length - 1 && (
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

        {/* The app */}
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
              <p className={eyebrowClass}>{t.app.eyebrow}</p>
              <h2
                className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                }}
              >
                {t.app.headline}
              </h2>
              <p className="mt-5 max-w-xl font-body text-base sm:text-lg text-calm-charcoal/70 leading-relaxed">
                {t.app.body}
              </p>
            </div>

            <div className="mt-12 flex gap-6 overflow-x-auto pb-4 sm:gap-10 lg:justify-center lg:overflow-visible">
              {SCREENSHOTS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={t.app.screenshots[i]}
                  loading="lazy"
                  className={`h-auto w-auto max-h-[500px] shrink-0 drop-shadow-[0_30px_60px_-25px_rgba(41,53,135,0.4)] ${
                    i === 1 ? "sm:-translate-y-4" : "sm:translate-y-4"
                  }`}
                />
              ))}
            </div>

            {(APP_STORE_URL || PLAY_STORE_URL) && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {APP_STORE_URL && (
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.storeAppStoreAriaLabel}
                  >
                    <img
                      src="/images/app-store.png"
                      alt={t.storeAppStoreAlt}
                      className="h-11 w-auto"
                      loading="lazy"
                    />
                  </a>
                )}
                {PLAY_STORE_URL && (
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.storePlayAriaLabel}
                  >
                    <img
                      src="/images/google-play.png"
                      alt={t.storePlayAlt}
                      className="h-11 w-auto"
                      loading="lazy"
                    />
                  </a>
                )}
              </div>
            )}
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

            <MedicalDisclaimer className="mt-8" />
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
