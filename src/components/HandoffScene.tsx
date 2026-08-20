import { revealFrom } from "./motion";
import { useReveal } from "./useReveal";
import SpeechTrace from "./SpeechTrace";
import { useT } from "@/i18n";

/**
 * The handoff, as one recording seen twice.
 *
 * Both panels draw the identical waveform, from the same seed at the same
 * width, so the reader gets that it is the same two minutes. The only thing
 * that changed between Saturday and Monday is the pair of marks on the right,
 * which is the whole of what the product did.
 *
 * Two earlier versions failed for the same reason and are worth recording.
 * The first put the people large with a placeholder card of grey bars between
 * them. The second put the real annotation screen in browser chrome as the
 * subject, which duplicated the screenshot that FeatureGallerySection already
 * carries and made three browser-chrome cards in a row with TherapistScene and
 * PatientScene below. There is no interface in here now: the product appears as
 * its own output, which is a timestamp on a waveform.
 *
 * The dark ground is the only one in this stretch of the page, and it is what
 * lets the trace read as lit. The people fade into it at the hairline instead
 * of sitting on it, so they are staged rather than pasted.
 */

/** Where the clinician marked, as fractions of the recording. */
const MARKS = [
  { from: 0.42, to: 0.46 },
  { from: 0.66, to: 0.7 },
];

const SPEECH = "#BEB8F6";
const SILENCE = "rgba(255,255,255,0.2)";

const HandoffScene = () => {
  const t = useT().home.handoff;
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.1 });

  // Four stops rather than two. A straight ramp still leaves a light shirt
  // visible at 10% alpha, which lands as a cut where the image box ends.
  // Written out in full because Tailwind reads these class names from source:
  // build the string from a variable and the utility is never generated.
  const photoMask =
    "[mask-image:linear-gradient(180deg,#000_46%,rgba(0,0,0,0.6)_72%,rgba(0,0,0,0.14)_88%,transparent_100%)] " +
    "[-webkit-mask-image:linear-gradient(180deg,#000_46%,rgba(0,0,0,0.6)_72%,rgba(0,0,0,0.14)_88%,transparent_100%)]";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-primary-900 py-[clamp(4rem,9vw,7rem)]"
    >
      {/* Light from above the frame, so the two of them are lit by something
          rather than floating on a flat fill. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 460px at 50% -8%, rgba(149,138,240,0.28), transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-[max(1.5rem,5vw)]">
        <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr] lg:items-end lg:gap-14">
          <div>
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-calm-lavender-bright"
              style={revealFrom(revealed, "up", 0)}
            >
              {t.eyebrow}
            </p>
            <h2
              className="mt-5 max-w-[24ch] font-accent font-bold tracking-tight text-white"
              style={{
                fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
                lineHeight: 1.12,
                ...revealFrom(revealed, "up", 80),
              }}
            >
              {t.headline}{" "}
              {/* Own line: two sentences, two people, two days. Letting them
                  reflow together reads as one run-on. The space above stays so
                  textContent still separates the words. */}
              <span className="block text-calm-lavender-bright">
                {t.headlineEmphasis}
              </span>
            </h2>
          </div>

          <p
            className="max-w-xl font-body text-base leading-relaxed text-white/75 sm:text-lg lg:pb-2"
            style={revealFrom(revealed, "up", 160)}
          >
            {t.body}
          </p>
        </div>

        <div className="mx-auto mt-[clamp(2.25rem,5vw,3.5rem)] grid max-w-4xl gap-12 sm:grid-cols-2 sm:gap-8 lg:gap-12">
          {/* Saturday. The recording as he made it. */}
          <figure className="m-0" style={revealFrom(revealed, "up", 240, 24)}>
            <img
              src="/images/people/handoff-patient.webp"
              alt={t.patientAlt}
              width={900}
              height={1132}
              loading="lazy"
              decoding="async"
              className={`mx-auto block w-full max-w-[300px] lg:max-w-[344px] ${photoMask}`}
            />
            <div className="h-px w-full bg-white/15" />
            <figcaption className="pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] tabular-nums text-white">
                  {t.recordedStamp}
                </span>
                <span className="font-body text-[11px] uppercase tracking-[0.16em] text-white/55">
                  {t.recordedPlace}
                </span>
              </div>
              <div className="mt-5">
                <SpeechTrace
                  variant="utterance"
                  height={68}
                  activeColor={SPEECH}
                  silentColor={SILENCE}
                  label={t.recordedTraceLabel}
                />
                {/* Keeps both panels on the same baseline: the right one
                    reserves this much room for its mark labels. */}
                <div className="mt-2.5 h-4" aria-hidden="true" />
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/60">
                {t.recordedCaption}
              </p>
            </figcaption>
          </figure>

          {/* Monday. The same two minutes, with her marks on it. */}
          <figure className="m-0" style={revealFrom(revealed, "up", 340, 24)}>
            <img
              src="/images/people/handoff-clinician.webp"
              alt={t.clinicianAlt}
              width={900}
              height={1132}
              loading="lazy"
              decoding="async"
              className={`mx-auto block w-full max-w-[300px] lg:max-w-[344px] ${photoMask}`}
            />
            <div className="h-px w-full bg-white/15" />
            <figcaption className="pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] tabular-nums text-white">
                  {t.reviewedStamp}
                </span>
                <span className="font-body text-[11px] uppercase tracking-[0.16em] text-white/55">
                  {t.reviewedPlace}
                </span>
              </div>
              <div className="mt-5">
                <div className="relative">
                  {MARKS.map((mark, i) => (
                    <span
                      key={mark.from}
                      aria-hidden="true"
                      className="absolute -inset-y-2 rounded-[3px] bg-white/[0.16] ring-1 ring-white/40"
                      style={{
                        left: `${mark.from * 100}%`,
                        width: `${(mark.to - mark.from) * 100}%`,
                        transition:
                          "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                        transitionDelay: `${620 + i * 140}ms`,
                        opacity: revealed ? 1 : 0,
                      }}
                    />
                  ))}
                  <SpeechTrace
                    className="relative"
                    variant="utterance"
                    height={68}
                    activeColor={SPEECH}
                    silentColor={SILENCE}
                    label={t.reviewedTraceLabel}
                  />
                </div>
                <div className="relative mt-2.5 h-4">
                  {MARKS.map((mark, i) => (
                    <span
                      key={mark.from}
                      className="absolute -translate-x-1/2 whitespace-nowrap font-body text-[10px] font-semibold uppercase tracking-[0.12em] tabular-nums text-white/80"
                      style={{
                        left: `${((mark.from + mark.to) / 2) * 100}%`,
                        transition: "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                        transitionDelay: `${700 + i * 140}ms`,
                        opacity: revealed ? 1 : 0,
                      }}
                    >
                      {t.marks[i]}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/60">
                {t.reviewedCaption}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default HandoffScene;
