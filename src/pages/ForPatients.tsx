import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import { Faq } from "@/components/Faq";
import Footer from "@/components/Footer";
import CutOut from "@/components/CutOut";
import CaregiverWalkthrough from "@/components/CaregiverWalkthrough";
import PhoneShot from "@/components/PhoneShot";
import StoreBadges from "@/components/StoreBadges";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";
import { useLocale, useT, localizedHref, localizedAsset } from "@/i18n";

const GALLERY = [
  "/screenshots/mobile/patient-home-screen.webp",
  "/screenshots/mobile/patient-journey-screen.webp",
  "/screenshots/mobile/patient-practice-screen.webp",
];

const EXCHANGE = [
  {
    src: "/screenshots/detail/exchange-today.webp",
    width: 780,
    height: 460,
  },
  {
    src: "/screenshots/detail/exchange-reply.webp",
    width: 780,
    height: 520,
  },
] as const;
const RECORD_SHOT = GALLERY[2];
const cardClass =
  "pointer-events-none relative h-auto w-full select-none rounded-2xl bg-white ring-1 ring-calm-navy/10 shadow-[0_24px_44px_-24px_rgba(41,53,135,0.4)]";
const eyebrowClass = "font-body t-eyebrow text-calm-lavender-ink";

const hasStores = Boolean(APP_STORE_URL || PLAY_STORE_URL);

const BeatLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="absolute -top-7 left-3 z-10 whitespace-nowrap rounded-full bg-white px-3 py-1 font-body text-xs font-semibold text-calm-navy shadow-sm ring-1 ring-calm-navy/10">
    {children}
  </p>
);

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
        {/* Intro: the page leads with getting the app, and the right half is
            the exchange only UpSpeech has: the therapist assigns, the patient
            records on the phone, the therapist replies. */}
        <section className="relative overflow-hidden pt-28 pb-[clamp(2rem,5vw,4rem)] sm:pt-36">
          <div className="gutter relative">
            <div className="grid items-center gap-10 lg:grid-cols-[1.02fr,0.98fr] lg:gap-12">
              <div>
                <p className={eyebrowClass}>{t.intro.eyebrow}</p>
                <h1 className="t-display mt-5 font-accent font-bold text-calm-navy tracking-tight">
                  {t.intro.headlineLine1} <br />
                  {t.intro.headlineLine2}
                </h1>
                <p className="mt-6 max-w-xl font-body text-lg text-calm-charcoal/90 leading-relaxed">
                  {t.intro.body}
                </p>
                <div id="get-app" className="mt-8 scroll-mt-32">
                  <StoreBadges size="lg" className="-ml-2.5" />
                  {hasStores && (
                    <p className="mt-3 font-body text-base font-semibold text-calm-charcoal/80">
                      {t.intro.inviteNote}
                    </p>
                  )}
                </div>
              </div>

              {/* The person is the anchor and the exchange lands on her lap.
                  Everything starts below y 0.6 of the cut-out, under the
                  chins; the phone takes the right edge, where her arm is. */}
              <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto lg:max-w-[540px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[-12%] top-[2%] h-[90%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(224,216,250,0.75), rgba(238,234,253,0.34) 52%, rgba(241,238,253,0) 78%)",
                  }}
                />
                <div className="relative z-10">
                  <CutOut
                    name="patients-hero"
                    alt={t.intro.photoAlt}
                    priority
                    sizing="width"
                    renderHeight={{ base: 306, sm: 455, lg: 473 }}
                    className="relative"
                  />
                </div>
                <ol className="relative z-20 -mt-[12%] grid grid-cols-[1fr,auto] gap-x-3 gap-y-12">
                  <li className="relative col-start-1 row-start-1">
                    <BeatLabel>{t.intro.exchange.todayLabel}</BeatLabel>
                    <img
                      src={localizedAsset(EXCHANGE[0].src, locale)}
                      alt={t.intro.exchange.todayAlt}
                      width={EXCHANGE[0].width}
                      height={EXCHANGE[0].height}
                      fetchPriority="high"
                      className={cardClass}
                    />
                  </li>
                  <li className="relative col-start-2 row-span-2 row-start-1 -mt-[14%] self-start">
                    <BeatLabel>{t.intro.exchange.recordLabel}</BeatLabel>
                    <PhoneShot
                      src={localizedAsset(RECORD_SHOT, locale)}
                      alt={t.intro.exchange.recordAlt}
                      className="relative w-[128px] sm:w-[170px]"
                    />
                  </li>
                  <li className="relative col-start-1 row-start-2">
                    <BeatLabel>{t.intro.exchange.replyLabel}</BeatLabel>
                    <img
                      src={localizedAsset(EXCHANGE[1].src, locale)}
                      alt={t.intro.exchange.replyAlt}
                      width={EXCHANGE[1].width}
                      height={EXCHANGE[1].height}
                      className={cardClass}
                    />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <CaregiverWalkthrough />

        {/* The app */}
        <section className="relative overflow-hidden bg-calm-light py-[clamp(3.5rem,7vw,6rem)]">
          <div className="gutter relative">
            <div className="max-w-2xl">
              <h2 className="t-h2 font-heading font-bold text-calm-navy tracking-tight">
                {t.app.headline}
              </h2>
              <p className="mt-5 max-w-xl t-lead font-body text-calm-charcoal/90 leading-relaxed">
                {t.app.body}
              </p>
            </div>

            <ol className="-mx-[max(1.5rem,5vw)] mt-12 flex snap-x snap-mandatory scroll-px-[max(1.5rem,5vw)] gap-6 overflow-x-auto px-[max(1.5rem,5vw)] pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-10 sm:overflow-visible sm:px-0">
              {GALLERY.map((base, i) => {
                const maxW = i === 0 ? "max-w-[300px]" : "max-w-[260px]";
                return (
                  <li
                    key={base}
                    className="w-[68%] shrink-0 snap-start sm:w-auto"
                  >
                    <PhoneShot
                      src={localizedAsset(base, locale)}
                      alt={t.app.screenshots[i]}
                      className={`relative mx-auto w-full ${maxW}`}
                    />
                    <div className={`mx-auto mt-5 ${maxW}`}>
                      <p className="font-heading text-lg font-bold text-calm-navy">
                        <span className="mr-2 font-body text-sm tabular-nums text-calm-lavender-ink">
                          {String(i + 1).padStart(2, "0")}
                        </span>{" "}
                        {t.app.walkthrough[i].title}
                      </p>
                      <p className="mt-1.5 font-body text-base text-calm-charcoal/90 leading-relaxed">
                        {t.app.walkthrough[i].line}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[clamp(3.5rem,7vw,6rem)]">
          <div className="gutter grid gap-8 lg:grid-cols-[minmax(0,1fr),minmax(0,1.8fr)] lg:gap-16">
            <h2 className="t-h2 font-heading font-bold text-calm-navy tracking-tight">
              {t.faq.headline}
            </h2>

            <Faq
              items={t.faq.items.map((item) => ({
                question: item.q,
                answer: item.a,
              }))}
              className="lg:-mt-4"
            />
          </div>
        </section>

        {/* Closing: the app first, the clinic route as one quiet line. */}
        <section className="bg-calm-light px-[max(1.5rem,5vw)] py-[clamp(3.5rem,7vw,6rem)]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="t-h2-sm font-heading font-bold text-calm-navy tracking-tight">
              {t.closing.headline}
            </h2>
            {hasStores && (
              <>
                <p className="mx-auto mt-4 max-w-xl text-balance font-body text-base text-calm-charcoal/90 leading-relaxed">
                  {t.closing.body}
                </p>
                <StoreBadges size="lg" className="mt-5 justify-center" />
              </>
            )}
            <p className="mx-auto mt-6 max-w-xl text-balance font-body t-small text-calm-charcoal/80">
              {t.closing.bodyPrefix}
              <a
                href={localizedHref("/join", locale)}
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
