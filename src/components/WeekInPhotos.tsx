import { revealFrom } from "./motion";
import { useReveal } from "./useReveal";
import SpeechTrace from "./SpeechTrace";
import CutOut from "./CutOut";
import { useT } from "@/i18n";

const IMAGES = [
  "week-session",
  "week-alone",
  "week-phone",
  "week-next",
];

/**
 * The four stand on one baseline rather than sitting in four boxes, so they are
 * sized by height and the width follows each subject. week-phone is the odd one
 * out at 900x1766, a standing figure where the other three are seated, so it
 * gets its own smaller height or it towers over the week.
 */
const HEIGHT = [
  "h-[150px] sm:h-[190px] lg:h-[240px]",
  "h-[150px] sm:h-[190px] lg:h-[240px]",
  "h-[168px] sm:h-[212px] lg:h-[268px]",
  "h-[150px] sm:h-[190px] lg:h-[240px]",
] as const;

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
      <div className="gutter">
        <p
          className="font-body t-eyebrow text-calm-lavender-ink"
          style={revealFrom(revealed, "up", 0)}
        >
          {t.eyebrow}
        </p>

        <h2
          className="t-h2 mt-5 max-w-[20ch] font-accent font-bold text-calm-charcoal tracking-tight"
          style={{ ...revealFrom(revealed, "up", 80) }}
        >
          {t.headline}
        </h2>

        <p
          className="mt-5 max-w-xl t-lead font-body text-calm-charcoal/80 leading-relaxed"
          style={revealFrom(revealed, "up", 160)}
        >
          {t.body}
        </p>

        {/* The week as four people on one line rather than four photographs
            in four boxes. The baseline is what makes it read as one week: the
            rule under them is continuous, so the eye travels along it instead
            of stopping at each frame. */}
        <div className="relative mt-[clamp(2rem,4vw,3.5rem)]">
          {/* One rule across the whole row, not four. It is what turns four
              figures into one week: the eye travels the line instead of
              stopping at each frame. Only at lg, where the four are on a single
              row; below that they wrap to two and each carries its own. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[268px] hidden h-px bg-calm-charcoal/10 lg:block"
          />
          {/* items-start, not items-end: the captions are one or two lines and
              bottom-aligning the items drops the short one out of the row. */}
          <div className="grid grid-cols-2 items-start gap-x-2 gap-y-8 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-0">
            {t.frames.map((frame, i) => (
              <figure
                key={frame.day}
                className="m-0 flex flex-col"
                style={revealFrom(revealed, "up", 240 + i * 90)}
              >
                <div className="flex min-h-[168px] items-end justify-center sm:min-h-[212px] lg:min-h-[268px]">
                  <CutOut
                    name={IMAGES[i]}
                    alt={frame.alt}
                    renderHeight={i === 2 ? 268 : 240}
                    className={HEIGHT[i]}
                  />
                </div>
                <figcaption className="border-t border-calm-charcoal/10 pt-4 lg:border-t-0">
                  <span className="font-body t-label text-calm-lavender-ink">
                    {frame.day}
                  </span>
                  <p className="mt-1.5 font-accent text-[15px] sm:text-base font-medium leading-snug text-calm-charcoal">
                    {frame.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
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
