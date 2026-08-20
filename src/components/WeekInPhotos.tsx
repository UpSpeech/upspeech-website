import { revealFrom } from "./motion";
import { useReveal } from "./useReveal";
import SpeechTrace from "./SpeechTrace";
import { useT } from "@/i18n";

const IMAGES = [
  "/images/people/week-session.webp",
  "/images/people/week-alone.webp",
  "/images/people/week-phone.webp",
  "/images/people/week-next.webp",
];

/**
 * The four days the clinic never sees, as photographs.
 *
 * Sits before GapSection on purpose: this is the week as a person experiences
 * it, and GapSection is then the same week as a cadence chart. Human first,
 * abstraction second.
 */
const WeekInPhotos = () => {
  const t = useT().home.week;
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.12 });

  return (
    <section
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
                  src={IMAGES[i]}
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

        <div
          className="mt-[clamp(2rem,4vw,3rem)]"
          style={revealFrom(revealed, "up", 620)}
        >
          <SpeechTrace variant="gap" height={56} label={t.traceLabel} />
          <p className="mt-3 font-body text-xs uppercase tracking-[0.18em] text-calm-charcoal/60">
            {t.traceLabel}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeekInPhotos;
