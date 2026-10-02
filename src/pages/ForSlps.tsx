import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocale, useT, localizedHref, localizedAsset } from "@/i18n";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import CutOut from "@/components/CutOut";
import { trackButtonClick } from "@/lib/analytics";

const eyebrowClass = "font-body t-eyebrow text-calm-lavender-ink";

export default function ForSlps() {
  const locale = useLocale();
  const dict = useT();
  const t = dict.forSlps;
  const requestAccess = dict.nav.requestAccess;

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
          <div className="gutter relative">
            {/* Two columns from lg up, matching /for-patients. Both pages had a
                text block against an empty right half. */}
            <div className="grid items-center gap-10 lg:grid-cols-[1.3fr,0.7fr] lg:gap-12">
              <div>
                <p className={eyebrowClass}>{t.intro.eyebrow}</p>
                <h1 className="t-display mt-5 font-accent font-bold text-calm-navy tracking-tight">
                  {t.intro.headlineLine1} {t.intro.headlineLine2}
                </h1>
                <p className="mt-6 max-w-2xl font-body text-lg text-calm-charcoal/80 leading-relaxed">
                  {t.intro.body}
                </p>
                <a
                  href={`${localizedHref("/", locale)}#cta`}
                  onClick={() =>
                    trackButtonClick("request_early_access_hero", "for_slps")
                  }
                  className="group mt-9 inline-flex items-center gap-3 rounded-full bg-calm-navy px-7 py-3.5 font-body font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-calm-lavender-ink hover:shadow-[0_24px_50px_-20px_rgba(41,53,135,0.6)]"
                >
                  {requestAccess}
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
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
                {/* Taller than the frame it replaced, because it is a
                    narrower figure. The old shot had both arms out and cut at
                    0.73 wide for its height; this one stands with the arms in
                    and cuts at 0.59, so at the old 460 she came out 65px
                    narrower and read small beside a display headline. 570
                    puts her back at the same apparent width, and the fold had
                    the room: the text column runs to about 470. */}
                <CutOut
                  name="slps-hero"
                  alt={t.intro.photoAlt}
                  priority
                  renderHeight={{ base: 400, sm: 500, lg: 570 }}
                  className="relative h-[400px] sm:h-[500px] lg:h-[570px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Between sessions */}
        <section className="relative overflow-hidden bg-calm-light py-[clamp(3.5rem,7vw,6rem)]">
          <div className="gutter relative">
            <h2 className="t-h2 font-heading font-bold text-calm-navy tracking-tight max-w-2xl">
              {t.betweenSessions.headline}
            </h2>

            <ol
              role="list"
              className="mt-[clamp(2.5rem,5vw,3.5rem)] divide-y divide-calm-navy/10 border-y border-calm-navy/10"
            >
              {t.betweenSessions.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid gap-2 py-6 md:grid-cols-[3rem_minmax(0,18rem)_minmax(0,1fr)] md:items-baseline md:gap-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading t-h3 font-bold text-calm-lavender-ink tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading t-h3 font-bold text-calm-navy">
                    {step.title}
                  </h3>
                  <p className="max-w-xl font-body t-lead text-calm-charcoal/80">
                    {step.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Documentation */}
        <section className="py-[clamp(3rem,6vw,5rem)]">
          <div className="gutter">
            <div className="max-w-2xl">
              <h2 className="t-h2 font-heading font-bold text-calm-navy tracking-tight">
                {t.documentation.headline}
              </h2>
              <p className="mt-5 max-w-xl t-lead font-body text-calm-charcoal/80 leading-relaxed">
                {t.documentation.body}
              </p>
            </div>

            <div className="relative mt-12 max-w-3xl overflow-x-auto rounded-2xl border border-calm-navy/10 bg-white shadow-[0_30px_70px_-30px_rgba(41,53,135,0.45)]">
              <img
                src={localizedAsset(
                  "/screenshots/app/therapist-report.png",
                  locale,
                )}
                alt={t.documentation.screenshotAlt}
                width={1800}
                height={2065}
                loading="lazy"
                className="block h-auto w-full min-w-[680px] sm:min-w-0"
              />
            </div>
          </div>
        </section>

        {/* Person-centered */}
        <section className="px-[max(1.5rem,5vw)] py-[clamp(3rem,6vw,5rem)]">
          <div className="mx-auto max-w-6xl rounded-2xl border border-calm-lavender/20 bg-calm-lavender/5 px-7 py-10 sm:px-10 sm:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr,minmax(0,320px)] lg:gap-12">
              <div>
                <h2 className="t-h2-sm font-heading font-bold text-calm-navy tracking-tight max-w-2xl">
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
                  renderHeight={{ base: 260, sm: 300 }}
                  className="h-[260px] sm:h-[300px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[clamp(3.5rem,7vw,6rem)]">
          <div className="gutter max-w-3xl">
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
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-[max(1.5rem,5vw)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="mx-auto max-w-3xl rounded-2xl border border-calm-navy/10 bg-calm-light/60 px-7 py-10 sm:px-10 sm:py-12 text-center">
            <h2 className="t-h2-sm font-heading font-bold text-calm-navy tracking-tight">
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
