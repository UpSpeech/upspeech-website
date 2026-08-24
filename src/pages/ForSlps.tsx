import {
  ClipboardDocumentListIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocale, useT, localizedHref, localizedAsset } from "@/i18n";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import CutOut from "@/components/CutOut";

// Step icons stay in code; titles/copy come from the dictionary by index
// (forSlps.betweenSessions.steps).
const STEP_ICONS = [
  ClipboardDocumentListIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
];

const eyebrowClass =
  "font-body t-eyebrow text-calm-lavender-ink";

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
        <section className="relative overflow-hidden pt-28 pb-[clamp(3rem,7vw,6rem)] sm:pt-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(800px 600px at 12% 15%, rgba(152,165,254,0.12), transparent 60%)",
            }}
          />
          <div className="gutter relative">
            {/* Two columns from lg up, matching /for-patients. Both pages had a
                text block against an empty right half. */}
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
              <div>
                <p className={eyebrowClass}>{t.intro.eyebrow}</p>
                <h1
                  className="t-display mt-5 font-heading font-bold text-calm-charcoal tracking-tight"
                >
                  {t.intro.headlineLine1}{" "}
                  <br />
                  <span className="text-calm-lavender-ink">
                    {t.intro.headlineLine2}
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl font-body text-lg text-calm-charcoal/80 leading-relaxed">
                  {t.intro.body}
                </p>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[-14%] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full lg:left-auto lg:right-[-4%] lg:translate-x-0"
                  style={{
                    // closest-side with a long tail, not a hard stop at 71%:
                    // the tighter gradient read as a circular badge behind her
                    // rather than light in the room.
                    background:
                      "radial-gradient(closest-side, rgba(224,216,250,0.75), rgba(238,234,253,0.34) 52%, rgba(241,238,253,0) 78%)",
                  }}
                />
                <CutOut
                  name="slps-hero"
                  alt={t.intro.photoAlt}
                  priority
                  renderHeight={460}
                  className="relative h-[320px] sm:h-[400px] lg:h-[460px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Between sessions */}
        <section className="relative overflow-hidden bg-calm-light py-[clamp(3.5rem,7vw,6rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 600px at 85% 10%, rgba(152,165,254,0.12), transparent 60%)",
            }}
          />
          <div className="gutter relative">
            <p className={eyebrowClass}>{t.betweenSessions.eyebrow}</p>
            <h2
              className="t-h2 mt-4 font-heading font-bold text-calm-charcoal tracking-tight max-w-2xl"
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
                    <p className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/80 leading-relaxed">
                      {step.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Documentation */}
        <section className="py-[clamp(3rem,6vw,5rem)]">
          <div className="gutter">
            <div className="max-w-2xl">
              <p className={eyebrowClass}>{t.documentation.eyebrow}</p>
              <h2
                className="t-h2 mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
              >
                {t.documentation.headline}
              </h2>
              <p className="mt-5 max-w-xl t-lead font-body text-calm-charcoal/80 leading-relaxed">
                {t.documentation.body}
              </p>
            </div>

            <div className="relative mt-12 overflow-hidden rounded-2xl border border-calm-navy/10 bg-white shadow-[0_30px_70px_-30px_rgba(41,53,135,0.45)]">
              <img
                src={localizedAsset(
                  "/screenshots/app/therapist-report.png",
                  locale,
                )}
                alt={t.documentation.screenshotAlt}
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </section>

        {/* Person-centered */}
        <section className="px-[max(1.5rem,5vw)] py-[clamp(3rem,6vw,5rem)]">
          <div className="mx-auto max-w-6xl rounded-2xl border border-calm-lavender/20 bg-calm-lavender/5 px-7 py-10 sm:px-10 sm:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr,minmax(0,320px)] lg:gap-12">
              <div>
                <p className={eyebrowClass}>{t.personCentered.eyebrow}</p>
                <h2
                  className="t-h2-sm mt-4 font-heading font-bold text-calm-charcoal tracking-tight max-w-2xl"
                >
                  {t.personCentered.headline}
                </h2>
                <p className="mt-4 max-w-2xl t-lead font-body text-calm-charcoal/80 leading-relaxed">
                  {t.personCentered.body}
                </p>
              </div>
              {/* A child, a parent and the clinician in one frame. This is the
                  page a clinic owner reads, so the pediatric case is worth
                  showing here rather than describing. */}
              <div className="flex justify-center lg:justify-end">
                <CutOut
                  name="slps-family"
                  alt={t.personCentered.photoAlt}
                  renderHeight={300}
                  className="h-[260px] sm:h-[300px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[clamp(3.5rem,7vw,6rem)]">
          <div className="gutter max-w-3xl">
            <p className={eyebrowClass}>{t.faq.eyebrow}</p>
            <h2
              className="t-h2 mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
            >
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
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-[max(1.5rem,5vw)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="mx-auto max-w-3xl rounded-2xl border border-calm-navy/10 bg-calm-light/60 px-7 py-10 sm:px-10 sm:py-12 text-center">
            <h2
              className="t-h2-sm font-heading font-bold text-calm-charcoal tracking-tight"
            >
              {t.closing.headline}
            </h2>
            <p className="mt-4 font-body text-sm sm:text-base text-calm-charcoal/80 leading-relaxed">
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

          <MedicalDisclaimer className="mt-8" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
