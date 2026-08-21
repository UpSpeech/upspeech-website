import { revealFrom } from "./motion";
import { useReveal } from "./useReveal";
import PagePortrait from "./PagePortrait";
import GuardianMark from "./GuardianMark";
import { useT, useLocale, localizedAsset } from "@/i18n";

/**
 * One clinician, one working day.
 *
 * This replaces HandoffScene, TherapistScene, PatientScene and the feature
 * gallery, which between them told the same story four times and leaned on
 * twelve full-screen product shots to do it.
 *
 * The structure is clock times rather than 01/02/03, because the thing three
 * interviewed clinicians all described was where their day goes: hours on
 * preparation, hours on write-ups, and time inside the session lost to taking
 * notes. Numbering would be decoration here. The times are the argument, and
 * they carry on the language the site already uses for the practice timestamps.
 *
 * The 11:30 beat deliberately breaks the layout. Four beats alternate quietly,
 * then the session lands full width on a dark ground with the same room shown
 * twice, hands full and hands empty. It is the only beat with two photographs
 * and the only dark ground in this stretch, because it is the one clinicians
 * recognise instantly.
 *
 * Product appears as cropped detail, not as a screen to be read: a report
 * header, an assigned plan. The single full screenshot is the last beat, where
 * the claim is breadth and a crop would undersell it.
 *
 * All three product images go through localizedAsset. The two crops are cut
 * from the same pt/es sources as the dashboard, at the same coordinates, so a
 * Portuguese visitor does not get two translated screens with an English one
 * wedged between them.
 */

/** Photograph beats. Filenames stay in code; the dictionary carries only text. */
const PHOTO = "day-desk";
const SESSION_PHOTOS = { cost: "day-notes", instead: "day-present" } as const;

const ClinicianDay = () => {
  const t = useT().home.day;
  const locale = useLocale();
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.05 });
  const { ref: sessionRef, revealed: sessionRevealed } =
    useReveal<HTMLElement>({ threshold: 0.15 });
  const { ref: endRef, revealed: endRevealed } = useReveal<HTMLElement>({
    threshold: 0.05,
  });

  const stamp =
    "font-body text-[11px] font-semibold uppercase tracking-[0.22em] tabular-nums";

  return (
    <>
      {/* Opening, and the two beats before the session. */}
      <section ref={ref} className="bg-white py-[clamp(4rem,9vw,7rem)]">
        <div className="mx-auto max-w-6xl px-[max(1.5rem,5vw)]">
          <p
            className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-calm-lavender-ink"
            style={revealFrom(revealed, "up", 0)}
          >
            {t.eyebrow}
          </p>
          <h2
            className="mt-5 max-w-[22ch] font-accent font-bold tracking-tight text-calm-charcoal"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              lineHeight: 1.1,
              ...revealFrom(revealed, "up", 80),
            }}
          >
            {t.headline}
          </h2>
          <p
            className="mt-5 max-w-xl font-body text-base leading-relaxed text-calm-charcoal/80 sm:text-lg"
            style={revealFrom(revealed, "up", 160)}
          >
            {t.body}
          </p>

          {/* 08:40, with the photograph. */}
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid items-center gap-8 lg:grid-cols-[1fr,minmax(0,420px)] lg:gap-14">
            <div style={revealFrom(revealed, "up", 240)}>
              <span className={`${stamp} text-calm-lavender-ink`}>
                {t.before.time}
              </span>
              <h3 className="mt-3 max-w-[18ch] font-accent text-2xl font-bold leading-snug tracking-tight text-calm-charcoal sm:text-[1.75rem]">
                {t.before.headline}
              </h3>
              <p className="mt-3 max-w-md font-body text-base leading-relaxed text-calm-charcoal/80">
                {t.before.body}
              </p>
            </div>
            <PagePortrait
              name={PHOTO}
              aspect="4/3"
              height={675}
              sizes="(min-width: 1024px) 420px, min(420px, 90vw)"
              alt={t.before.photoAlt}
              className="w-full max-w-[420px] lg:ml-auto"
            />
          </div>

          {/* 09:15, with the report header rather than the whole report. */}
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid items-center gap-8 lg:grid-cols-[minmax(0,460px),1fr] lg:gap-14">
            <div
              className="order-2 overflow-hidden rounded-xl border border-calm-charcoal/10 bg-white shadow-[0_24px_50px_-30px_rgba(41,53,135,0.45)] lg:order-1"
              style={revealFrom(revealed, "left", 340)}
            >
              <img
                src={localizedAsset(
                  "/screenshots/detail/report-ready.webp",
                  locale,
                )}
                alt={t.assessment.detailAlt}
                width={800}
                height={200}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
            <div
              className="order-1 lg:order-2"
              style={revealFrom(revealed, "up", 300)}
            >
              <span className={`${stamp} text-calm-lavender-ink`}>
                {t.assessment.time}
              </span>
              <h3 className="mt-3 max-w-[18ch] font-accent text-2xl font-bold leading-snug tracking-tight text-calm-charcoal sm:text-[1.75rem]">
                {t.assessment.headline}
              </h3>
              <p className="mt-3 max-w-md font-body text-base leading-relaxed text-calm-charcoal/80">
                {t.assessment.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11:30. The one clinicians recognise, so it gets the dark ground and
          the only side-by-side pair on the page. */}
      <section
        ref={sessionRef}
        className="relative overflow-hidden bg-primary-900 py-[clamp(4rem,9vw,7rem)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1000px 460px at 50% -8%, rgba(149,138,240,0.28), transparent 68%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-[max(1.5rem,5vw)]">
          <span
            className={`${stamp} flex items-center gap-2 text-calm-lavender-bright`}
            style={revealFrom(sessionRevealed, "up", 0)}
          >
            <GuardianMark className="text-white/75" />
            {t.session.time}
          </span>
          <h3
            className="mt-4 max-w-[20ch] font-accent font-bold tracking-tight text-white"
            style={{
              fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
              lineHeight: 1.12,
              ...revealFrom(sessionRevealed, "up", 80),
            }}
          >
            {t.session.headline}
          </h3>
          <p
            className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/75 sm:text-lg"
            style={revealFrom(sessionRevealed, "up", 160)}
          >
            {t.session.body}
          </p>

          <div className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-8 sm:grid-cols-2 sm:gap-6 lg:gap-10">
            {(["cost", "instead"] as const).map((k, i) => (
              <figure
                key={k}
                className="m-0"
                style={revealFrom(sessionRevealed, "up", 240 + i * 100, 24)}
              >
                <div className="overflow-hidden rounded-xl bg-white/5">
                  <img
                    src={`/images/people/${SESSION_PHOTOS[k]}.webp`}
                    srcSet={
                      `/images/people/${SESSION_PHOTOS[k]}-480.webp 480w, ` +
                      `/images/people/${SESSION_PHOTOS[k]}-688.webp 688w, ` +
                      `/images/people/${SESSION_PHOTOS[k]}.webp 900w`
                    }
                    sizes="(min-width: 640px) 420px, 90vw"
                    alt={t.session[k].photoAlt}
                    width={900}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[4/3] w-full object-cover"
                  />
                </div>
                <figcaption className="pt-5">
                  <span
                    className={`${stamp} ${
                      i === 0 ? "text-white/55" : "text-calm-lavender-bright"
                    }`}
                  >
                    {t.session[k].label}
                  </span>
                  <p className="mt-2.5 font-body text-sm leading-relaxed text-white/70">
                    {t.session[k].caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 14:00 and 17:30. */}
      <section ref={endRef} className="bg-white py-[clamp(4rem,9vw,7rem)]">
        <div className="mx-auto max-w-6xl px-[max(1.5rem,5vw)]">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr,minmax(0,420px)] lg:gap-14">
            <div style={revealFrom(endRevealed, "up", 0)}>
              <span className={`${stamp} text-calm-lavender-ink`}>
                {t.plan.time}
              </span>
              <h3 className="mt-3 max-w-[18ch] font-accent text-2xl font-bold leading-snug tracking-tight text-calm-charcoal sm:text-[1.75rem]">
                {t.plan.headline}
              </h3>
              <p className="mt-3 max-w-md font-body text-base leading-relaxed text-calm-charcoal/80">
                {t.plan.body}
              </p>
            </div>
            <div
              className="overflow-hidden rounded-xl border border-calm-charcoal/10 bg-white shadow-[0_24px_50px_-30px_rgba(41,53,135,0.45)] lg:ml-auto"
              style={revealFrom(endRevealed, "right", 80)}
            >
              <img
                src={localizedAsset(
                  "/screenshots/detail/plan-assigned.webp",
                  locale,
                )}
                alt={t.plan.detailAlt}
                width={800}
                height={315}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </div>

          {/* The one full screen on the page. The claim here is breadth, and a
              crop of a dashboard would undersell exactly the thing being
              claimed. */}
          <div className="mt-[clamp(3rem,6vw,5rem)]">
            <div className="max-w-xl" style={revealFrom(endRevealed, "up", 160)}>
              <span className={`${stamp} text-calm-lavender-ink`}>
                {t.close.time}
              </span>
              <h3 className="mt-3 max-w-[20ch] font-accent text-2xl font-bold leading-snug tracking-tight text-calm-charcoal sm:text-[1.75rem]">
                {t.close.headline}
              </h3>
              <p className="mt-3 font-body text-base leading-relaxed text-calm-charcoal/80">
                {t.close.body}
              </p>
            </div>
            <div
              className="mt-9 overflow-hidden rounded-2xl border border-calm-navy/10 bg-white shadow-[0_30px_70px_-30px_rgba(41,53,135,0.45)]"
              style={revealFrom(endRevealed, "up", 240, 24)}
            >
              <img
                src={localizedAsset(
                  "/screenshots/app/therapist-dashboard.png",
                  locale,
                )}
                alt={t.close.screenshotAlt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClinicianDay;
