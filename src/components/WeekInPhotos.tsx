import { revealFrom } from "./motion";
import { useReveal } from "./useReveal";
import SpeechTrace from "./SpeechTrace";
import { useT } from "@/i18n";

const IMAGES = [
  "week-session",
  "week-alone",
  "week-phone",
  "week-next",
];

/**
 * These render at about 163px on a phone and 266px on a wide screen, so the
 * 720w file is two to four times more image than a phone can use. Measured:
 * the strip cost 122KB at one width and 43KB across the three.
 */
const srcSet = (name: string) =>
  `/images/people/${name}-400.webp 400w, ` +
  `/images/people/${name}-560.webp 560w, ` +
  `/images/people/${name}.webp 720w`;
const SIZES = "(min-width: 1024px) 266px, 42vw";

/**
 * The four days the clinic never sees, as photographs, and then the same week
 * as a pair of speech traces.
 *
 * This replaced GapSection, which spent 1,620px and a sticky scroll on exactly
 * this comparison rendered as abstract tiles with no people in it. The photos
 * carry the week and the two traces carry the argument, so the page makes the
 * point once instead of twice.
 */
const WeekInPhotos = () => {
  const t = useT().home.week;
  // The cadence labels come from the old GapSection block, which is already
  // translated in all three locales and carries the sharpest line on the site.
  const cadence = useT().home.gap;
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.12 });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative bg-calm-light py-[clamp(4rem,9vw,7rem)]"
    >
      <div className="mx-auto max-w-7xl px-[max(1.5rem,5vw)]">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender-ink"
          style={revealFrom(revealed, "up", 0)}
        >
          {t.eyebrow}
        </p>

        <h2
          className="mt-5 max-w-[20ch] font-accent font-bold text-calm-charcoal tracking-tight"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            lineHeight: 1.1,
            ...revealFrom(revealed, "up", 80),
          }}
        >
          {t.headline}
        </h2>

        <p
          className="mt-5 max-w-xl font-body text-base sm:text-lg text-calm-charcoal/80 leading-relaxed"
          style={revealFrom(revealed, "up", 160)}
        >
          {t.body}
        </p>

        <div className="mt-[clamp(2rem,4vw,3.5rem)] grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {t.frames.map((frame, i) => (
            <figure
              key={frame.day}
              className="m-0"
              style={revealFrom(revealed, "up", 240 + i * 90)}
            >
              <div className="overflow-hidden rounded-xl bg-calm-charcoal/5">
                <img
                  src={`/images/people/${IMAGES[i]}.webp`}
                  srcSet={srcSet(IMAGES[i])}
                  sizes={SIZES}
                  alt={frame.alt}
                  width={720}
                  height={964}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[3/4] w-full object-cover"
                />
              </div>
              <figcaption className="pt-4">
                <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-calm-lavender-ink">
                  {frame.day}
                </span>
                <p className="mt-1.5 font-accent text-[15px] sm:text-base font-medium leading-snug text-calm-charcoal">
                  {frame.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* The same week twice, as the recordings actually land. This replaces
            the 1,620px scroll-driven chart that used to sit in its own section
            below: it made exactly this comparison, in abstract tiles, with no
            people in it. The labels are that section's own strings. */}
        <div
          className="mt-[clamp(2.5rem,5vw,4rem)] overflow-hidden rounded-xl border border-calm-charcoal/10 bg-white"
          style={revealFrom(revealed, "up", 620)}
        >
          <div className="p-5 sm:p-7">
            <div className="mb-3 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-calm-charcoal/80">
                {cadence.traditional}
              </span>
              <span className="font-body text-xs tabular-nums text-calm-charcoal/80 sm:text-sm">
                {cadence.traditionalCadence}
              </span>
            </div>
            <SpeechTrace
              variant="gap"
              height={52}
              label={cadence.traditionalCadence}
            />
          </div>

          <div className="border-t border-calm-charcoal/10 bg-calm-lavender/20 p-5 sm:p-7">
            <div className="mb-3 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-calm-lavender-ink">
                {cadence.withUpspeech}
              </span>
              <span className="font-body text-xs font-semibold tabular-nums text-calm-navy sm:text-sm">
                {cadence.fullCadence}
              </span>
            </div>
            <SpeechTrace
              variant="continuous"
              height={52}
              label={cadence.fullCadence}
              silentColor="rgba(75,78,78,0.16)"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeekInPhotos;
