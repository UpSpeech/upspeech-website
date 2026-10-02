import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import { Faq } from "@/components/Faq";
import Footer from "@/components/Footer";
import CutOut from "@/components/CutOut";
import Companion from "@/components/Companion";
import StoreBadges from "@/components/StoreBadges";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";
import { useLocale, useT, localizedHref, localizedAsset } from "@/i18n";

// Real app screens on demo data, one patient and one story: 43 percent, 3 of 7 steps. Alt
// text comes from forPatients.app.screenshots.
const GALLERY = [
  "/screenshots/mobile/patient-home-screen.webp",
  "/screenshots/mobile/patient-journey-screen.webp",
  "/screenshots/mobile/patient-practice-screen.webp",
];

// The child-facing screen, cropped to the character and the cue like the three
// above. The photograph's phone below uses the full screen through PhoneShot.
// Alt text is forPatients.app.childScreenshots[1].
//
// The caregiver screen is deliberately not here. It is a sparse screen whose
// content stops two thirds down, which is invisible at the size it runs beside
// the photograph and looks like a failed render at the size this row runs.

const EXCHANGE = [
  {
    src: "/screenshots/detail/exchange-today.webp",
    width: 1080,
    height: 400,
  },
  {
    src: "/screenshots/detail/exchange-reply.webp",
    width: 1008,
    height: 292,
  },
] as const;
const RECORD_SHOT = "/screenshots/mobile/patient-record.webp";
const cardClass =
  "pointer-events-none relative h-auto w-full select-none rounded-2xl bg-white ring-1 ring-calm-navy/10 shadow-[0_24px_44px_-24px_rgba(41,53,135,0.4)]";
const eyebrowClass = "font-body t-eyebrow text-calm-lavender-ink";

// The device frame the app band already uses, and the screen rectangle inside
// it, straight from frameit's offsets.json for this frame (offset +75+66,
// screen width 1320 in a 1470x3000 frame) as a percentage of the phone box.
// Measured once, in MobileAppBand; repeated here rather than exported, because
// a two-line constant shared across two files is not an abstraction.
const PHONE_FRAME = "/screenshots/mobile/iphone-frame.webp";
const SCREEN = { top: "2.2%", left: "5.1%", width: "89.8%", height: "95.6%" };

/**
 * A screen behind the real device frame. The frame's own transparent screen
 * cutout masks the shot, so the corners and the island are always right and no
 * radius has to be guessed.
 *
 * The caller sizes and places the box; aspectRatio derives the other dimension
 * from whichever one is given, so a width works in the photograph composition
 * and a height works in the row of app screenshots.
 *
 * The caller also owns the position utility and has to pass one, because the
 * two images inside are absolute. A default here does not work: a caller's
 * `absolute` cannot override a base `relative`, since Tailwind emits the
 * position utilities in a fixed order and class order in the attribute counts
 * for nothing. Carrying one broke the composition into a flex row.
 *
 * With no alt it stays decorative, which is right beside the photograph where
 * the sentence already says what the screens are. In the screenshot row it
 * takes one, because there the images are the content.
 */
const PhoneShot = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) => (
  <div
    aria-hidden={alt ? undefined : true}
    role={alt ? "img" : undefined}
    aria-label={alt}
    className={`pointer-events-none ${className}`}
    style={{ aspectRatio: "1470 / 3000" }}
  >
    <img
      src={src}
      alt=""
      width={780}
      height={1688}
      loading="lazy"
      decoding="async"
      className="absolute object-cover"
      style={{
        top: SCREEN.top,
        left: SCREEN.left,
        width: SCREEN.width,
        height: SCREEN.height,
        // The screen rectangle is square-cornered and the bezel around it is
        // not, so on a dark screen the four corners poke out past the frame as
        // coloured nicks. Relative units so one radius serves both phone sizes.
        borderRadius: "12% / 5.4%",
      }}
    />
    <img
      src={PHONE_FRAME}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full drop-shadow-[0_24px_44px_-24px_rgba(41,53,135,0.45)]"
    />
  </div>
);

const hasStores = Boolean(APP_STORE_URL || PLAY_STORE_URL);

const BeatLabel = ({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) => (
  <p className="mb-2.5 flex items-center gap-2.5 font-body text-sm font-semibold text-calm-navy">
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-calm-lavender font-heading text-xs font-extrabold tabular-nums text-calm-navy"
    >
      {n}
    </span>
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
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:gap-8">
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

              <ol className="mx-auto grid w-full max-w-[520px] gap-6 sm:max-w-[640px] sm:grid-cols-[1fr,auto] sm:grid-rows-[auto,auto,1fr] sm:items-center sm:gap-x-0 lg:ml-auto">
                <li className="relative z-20 sm:col-start-1 sm:row-start-1 sm:mr-4 sm:self-start">
                  <BeatLabel n={1}>{t.intro.exchange.todayLabel}</BeatLabel>
                  <img
                    src={localizedAsset(EXCHANGE[0].src, locale)}
                    alt={t.intro.exchange.todayAlt}
                    width={EXCHANGE[0].width}
                    height={EXCHANGE[0].height}
                    fetchPriority="high"
                    className={cardClass}
                  />
                </li>
                <li className="relative z-10 flex flex-col items-center sm:col-start-2 sm:row-span-3 sm:row-start-1">
                  <BeatLabel n={2}>{t.intro.exchange.recordLabel}</BeatLabel>
                  <PhoneShot
                    src={localizedAsset(RECORD_SHOT, locale)}
                    alt={t.intro.exchange.recordAlt}
                    className="relative w-[190px] sm:w-[225px]"
                  />
                </li>
                <li className="relative z-20 sm:col-start-1 sm:row-start-2 sm:mr-4 sm:self-start">
                  <BeatLabel n={3}>{t.intro.exchange.replyLabel}</BeatLabel>
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
        </section>

        {/* Practicing with a parent.
            One sentence, deliberately. The product has no guardian seat: a
            patient is one login assigned to one therapist. What is true today
            is that a parent sits with a younger patient and works the plan the
            therapist set, so that is the whole of what this says. */}
        <section className="pb-[clamp(3rem,6vw,5rem)]">
          <div className="gutter grid items-center gap-8 sm:grid-cols-[minmax(0,420px),1fr] sm:gap-14">
            {/* Two phones and the two people holding them. The parent's screen
                is behind on the left, the child's in front on the right, which
                is the same sandwich this section already had.

                What changed is what is in the sandwich. It used to be the plan
                and the finished report, and both of those belong to the
                therapist: the section is about a parent and a child at the
                kitchen table, and neither of them ever opens a report. These
                are the two surfaces they actually touch. */}
            {/* Taller than the photograph so the child's phone can sit below
                its baseline. Measured against the cut-out: both faces live in
                the top third, y 0.02 to 0.33, and they span almost the full
                width, so the only place a phone can overlap without landing on
                someone is below y 0.5, where the laps and the bench are. */}
            <div className="relative flex h-[330px] items-end justify-center sm:h-[420px]">
              <img
                src={localizedAsset(
                  "/screenshots/mobile/caregiver-today-crop.webp",
                  locale,
                )}
                alt=""
                aria-hidden="true"
                width={600}
                height={560}
                loading="lazy"
                className="pointer-events-none absolute bottom-14 left-0 hidden w-[214px] -rotate-6 rounded-[20px] ring-1 ring-calm-navy/10 drop-shadow-[0_24px_44px_-24px_rgba(41,53,135,0.45)] sm:block"
              />
              <CutOut
                name="patients-listen"
                alt={t.withAParent.photoAlt}
                renderHeight={{ base: 300, sm: 340 }}
                className="relative z-10 h-[300px] sm:h-[340px]"
              />
              <PhoneShot
                src={localizedAsset(
                  "/screenshots/mobile/child-practice.webp",
                  locale,
                )}
                className="absolute -bottom-7 right-4 z-20 w-[104px] rotate-3 sm:-bottom-10 sm:-right-2 sm:w-[122px]"
              />
            </div>
            <div>
              {/* A face of its own, not the default one three other
                  companions on this site already wear. */}
              <Companion
                species="lumo"
                size={104}
                className="mb-4"
                eyes="dot"
                bellyShape="round"
              />

              <p className="t-statement mt-4 max-w-xl font-heading font-medium text-calm-navy">
                {t.withAParent.line}
              </p>
            </div>
          </div>
        </section>

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
              {GALLERY.map((base, i) => (
                <li
                  key={base}
                  className="w-[68%] shrink-0 snap-start sm:w-auto"
                >
                  <PhoneShot
                    src={localizedAsset(base, locale)}
                    alt={t.app.screenshots[i]}
                    className="relative mx-auto w-full max-w-[260px]"
                  />
                  <div className="mx-auto mt-5 max-w-[260px]">
                    <p className="font-heading text-lg font-bold text-calm-navy">
                      <span className="mr-2 font-body text-sm tabular-nums text-calm-lavender-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {t.app.walkthrough[i].title}
                    </p>
                    <p className="mt-1.5 font-body text-base text-calm-charcoal/90 leading-relaxed">
                      {t.app.walkthrough[i].line}
                    </p>
                  </div>
                </li>
              ))}
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
                href={`${localizedHref("/", locale)}#cta`}
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
