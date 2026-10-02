import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import { Faq } from "@/components/Faq";
import Footer from "@/components/Footer";
import CutOut from "@/components/CutOut";
import Companion from "@/components/Companion";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";
import { useLocale, useT, localizedHref, localizedAsset } from "@/i18n";

// Screenshot sources stay in code; alt text comes from forPatients.app.screenshots.
// These three are crops of the shipped app on demo data, cut to the part each
// caption is about and shown at 320px wide. The corners are baked into the image; there is no device frame.
const SCREENSHOTS = [
  "/screenshots/mobile/patient-home-crop.webp",
  "/screenshots/mobile/patient-journey-crop.webp",
  "/screenshots/mobile/patient-practice-crop.webp",
];
// Pixel size of each crop above, in the same order: 2x of the 460px column.
const SCREENSHOT_SIZES = [
  { width: 920, height: 825 },
  { width: 920, height: 1280 },
  { width: 920, height: 767 },
];

// The child-facing screen, cropped to the character and the cue like the three
// above. The photograph's phone below uses the full screen through PhoneShot.
// Alt text is forPatients.app.childScreenshots[1].
//
// The caregiver screen is deliberately not here. It is a sparse screen whose
// content stops two thirds down, which is invisible at the size it runs beside
// the photograph and looks like a failed render at the size this row runs.

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

function StoreButtons({ className = "" }: { className?: string }) {
  const t = useT().forPatients;
  if (!APP_STORE_URL && !PLAY_STORE_URL) return null;
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
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
  );
}

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
        <section className="relative overflow-hidden pt-28 pb-[clamp(3rem,7vw,6rem)] sm:pt-36">
          <div className="gutter relative">
            {/* Two columns from lg up. The right half of this fold used to be
                empty, which is what made the page read as a document rather
                than the front of a product. */}
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
              <div>
                <p className={eyebrowClass}>{t.intro.eyebrow}</p>
                <h1 className="t-display mt-5 font-accent font-bold text-calm-navy tracking-tight">
                  {t.intro.headlineLine1} <br />
                  {t.intro.headlineLine2}
                </h1>
                <p className="mt-6 max-w-2xl font-body text-lg text-calm-charcoal/80 leading-relaxed">
                  {t.intro.body}
                </p>
                <StoreButtons className="mt-8" />
                <p className="mt-3 font-body text-sm text-calm-charcoal/70">
                  {t.intro.inviteNote}
                </p>
              </div>
              {/* Cut out rather than cropped square. The 1:1 crop was
                  discarding a fifth of a 0.80 portrait to make it fit a box
                  the box did not need. */}
              <div className="relative flex justify-center lg:justify-end">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[-14%] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full lg:left-auto lg:right-[-2%] lg:translate-x-0"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(224,216,250,0.75), rgba(238,234,253,0.34) 52%, rgba(241,238,253,0) 78%)",
                  }}
                />
                <CutOut
                  name="patients-hero"
                  alt={t.intro.photoAlt}
                  priority
                  renderHeight={{ base: 300, sm: 360, lg: 400 }}
                  className="relative h-[300px] sm:h-[360px] lg:h-[400px]"
                />
              </div>
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
              <p className="mt-5 max-w-xl t-lead font-body text-calm-charcoal/80 leading-relaxed">
                {t.app.body}
              </p>
            </div>

            <StoreButtons className="mt-8" />
            <ol className="mt-14 space-y-12 sm:space-y-14">
              {SCREENSHOTS.map((base, i) => (
                <li
                  key={base}
                  className={`grid items-center gap-6 sm:grid-cols-2 sm:gap-14 ${
                    i % 2 ? "sm:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="flex justify-center">
                    <img
                      src={localizedAsset(base, locale)}
                      alt={t.app.screenshots[i]}
                      loading="lazy"
                      width={SCREENSHOT_SIZES[i].width}
                      height={SCREENSHOT_SIZES[i].height}
                      className="h-auto w-[min(460px,100%)] rounded-[28px] ring-1 ring-calm-navy/10 drop-shadow-[0_30px_60px_-25px_rgba(41,53,135,0.4)]"
                    />
                  </div>
                  <div className="max-w-sm">
                    <p className={`${eyebrowClass} !tracking-normal`}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 t-h3 font-heading font-bold text-calm-navy tracking-tight">
                      {t.app.walkthrough[i].title}
                    </h3>
                    <p className="mt-3 font-body t-lead text-calm-charcoal/80 leading-relaxed">
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
          <div className="gutter max-w-3xl">
            <h2 className="t-h2 font-heading font-bold text-calm-navy tracking-tight">
              {t.faq.headline}
            </h2>

            <Faq
              items={t.faq.items.map((item) => ({
                question: item.q,
                answer: item.a,
              }))}
              className="mt-8"
            />
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
