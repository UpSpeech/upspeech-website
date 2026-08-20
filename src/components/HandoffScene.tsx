import { revealFrom } from "./motion";
import { useReveal } from "./useReveal";
import { useT, useLocale, localizedAsset } from "@/i18n";

/**
 * The review loop, staged as a handoff between two people.
 *
 * The recording is the subject, so the real review screen is the dominant
 * object and the two people flank it from behind. An earlier version had this
 * the other way round: the people large, and a placeholder card of grey bars
 * between them. It read as unfinished, and in a section arguing that a
 * clinician does the reviewing, a fake interface quietly undercut the claim.
 *
 * The cut-outs are transparent, with no frame. Their eyelines both fall on the
 * screen: the clinician on the left looks down and to her right, the patient on
 * the right looks down and to his left. Swapping the sides breaks the
 * composition, because then they both look away from it.
 */
const HandoffScene = () => {
  const t = useT().home.handoff;
  const locale = useLocale();
  const reviewScreen = localizedAsset(
    "/screenshots/app/researcher-annotation-tool.jpg",
    locale,
  );
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.1 });

  const cutoutMask =
    "[mask-image:linear-gradient(180deg,#000_58%,transparent_97%)] " +
    "[-webkit-mask-image:linear-gradient(180deg,#000_58%,transparent_97%)]";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-calm-light py-[clamp(4rem,9vw,7rem)]"
    >
      <div className="mx-auto max-w-6xl px-[max(1.5rem,5vw)]">
        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr] lg:items-end lg:gap-14">
          <div>
            <p
              className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-calm-lavender-ink"
              style={revealFrom(revealed, "up", 0)}
            >
              {t.eyebrow}
            </p>
            <h2
              className="mt-5 max-w-[26ch] font-accent font-bold tracking-tight text-calm-charcoal"
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
              <span className="block text-calm-lavender-ink">
                {t.headlineEmphasis}
              </span>
            </h2>
          </div>

          <p
            className="max-w-xl font-body text-base leading-relaxed text-calm-charcoal/80 sm:text-lg lg:pb-2"
            style={revealFrom(revealed, "up", 160)}
          >
            {t.body}
          </p>
        </div>

        <div
          className="relative mt-[clamp(2.5rem,5vw,4rem)]"
          style={revealFrom(revealed, "up", 240, 24)}
        >
          {/* Wide: the figures sit behind the screen's outer edges. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-end justify-between sm:flex">
            <img
              src="/images/people/handoff-clinician.webp"
              alt={t.clinicianAlt}
              width={900}
              height={1132}
              loading="lazy"
              decoding="async"
              className={`block w-[30%] max-w-[290px] translate-y-[7%] ${cutoutMask}`}
            />
            <img
              src="/images/people/handoff-patient.webp"
              alt={t.patientAlt}
              width={900}
              height={1132}
              loading="lazy"
              decoding="async"
              className={`block w-[30%] max-w-[290px] translate-y-[7%] ${cutoutMask}`}
            />
          </div>

          {/* Narrow: nothing can flank a full-width screen, so the two of them
              sit above it at a size where their faces still read. */}
          <div className="mb-7 flex items-end justify-center gap-3 sm:hidden">
            <img
              src="/images/people/handoff-clinician.webp"
              alt={t.clinicianAlt}
              width={900}
              height={1132}
              loading="lazy"
              decoding="async"
              className={`block w-[44%] max-w-[160px] ${cutoutMask}`}
            />
            <img
              src="/images/people/handoff-patient.webp"
              alt={t.patientAlt}
              width={900}
              height={1132}
              loading="lazy"
              decoding="async"
              className={`block w-[44%] max-w-[160px] ${cutoutMask}`}
            />
          </div>

          <figure className="relative z-10 m-0 sm:mx-auto sm:w-[74%] lg:w-[68%]">
            <div className="overflow-hidden rounded-xl border border-calm-charcoal/10 bg-white shadow-[0_40px_90px_-40px_rgba(41,53,135,0.55)] sm:rounded-2xl">
              <div className="flex items-center gap-2 border-b border-calm-charcoal/5 bg-calm-light/80 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-calm-charcoal/15" />
                <span className="h-2 w-2 rounded-full bg-calm-charcoal/15" />
                <span className="h-2 w-2 rounded-full bg-calm-charcoal/15" />
                <div className="ml-3 flex h-4 max-w-[220px] flex-1 items-center justify-center rounded border border-calm-charcoal/5 bg-white/90">
                  <span className="font-body text-[9px] tabular-nums text-calm-charcoal/70">
                    app.upspeech.app/reviews
                  </span>
                </div>
              </div>
              <img
                src={reviewScreen}
                alt={t.screenAlt}
                width={1579}
                height={931}
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </div>
            <figcaption className="mt-4 text-center font-body text-[11px] uppercase tracking-[0.16em] text-calm-charcoal/60">
              {t.screenCaption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default HandoffScene;
