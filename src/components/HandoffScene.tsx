import { revealFrom } from "./motion";
import { useReveal } from "./useReveal";
import { useT } from "@/i18n";

/**
 * The review loop, staged as a handoff between two people.
 *
 * The two portraits are transparent cut-outs rather than framed photos, and
 * their eyelines both fall on the card between them: the clinician on the left
 * looks down and to her right, the patient on the right looks down and to his
 * left. Swapping the sides breaks the composition, because then both of them
 * look away from the card.
 */
const HandoffScene = () => {
  const t = useT().home.handoff;
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.12 });

  return (
    <section ref={ref} className="relative bg-white py-[clamp(4rem,9vw,7rem)]">
      <div className="mx-auto max-w-6xl px-[max(1.5rem,5vw)]">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender-ink"
          style={revealFrom(revealed, "up", 0)}
        >
          {t.eyebrow}
        </p>

        <h2
          className="mt-5 max-w-[22ch] font-accent font-bold text-calm-charcoal tracking-tight"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            lineHeight: 1.1,
            ...revealFrom(revealed, "up", 80),
          }}
        >
          {t.headline}{" "}
          {/* Own line: the two sentences are two people and two days, and
              letting them reflow together reads as one run-on. The space above
              stays so textContent still separates the words. */}
          <span className="block text-calm-lavender-ink">
            {t.headlineEmphasis}
          </span>
        </h2>

        {/* The stage. The two figures lean toward the middle and the card
            overlaps both, so the three elements read as one scene rather than a
            row of three things. Each portrait fades out along its bottom edge:
            without the mask the cut-outs end on a hard horizontal line and stop
            looking like people standing in the page. */}
        <div
          className="relative mx-auto mt-[clamp(2rem,4vw,3.5rem)] max-w-4xl overflow-hidden rounded-[2rem] bg-gradient-to-b from-calm-light via-calm-light to-white pt-8 sm:pt-10"
          style={revealFrom(revealed, "scale", 200, 24)}
        >
          <div className="grid grid-cols-2 items-end">
            <img
              src="/images/people/handoff-clinician.webp"
              alt={t.clinicianAlt}
              width={900}
              height={1132}
              loading="lazy"
              decoding="async"
              className="block w-full max-w-[330px] justify-self-end [mask-image:linear-gradient(180deg,#000_62%,transparent_98%)] [-webkit-mask-image:linear-gradient(180deg,#000_62%,transparent_98%)]"
            />
            <img
              src="/images/people/handoff-patient.webp"
              alt={t.patientAlt}
              width={900}
              height={1132}
              loading="lazy"
              decoding="async"
              className="block w-full max-w-[330px] justify-self-start [mask-image:linear-gradient(180deg,#000_62%,transparent_98%)] [-webkit-mask-image:linear-gradient(180deg,#000_62%,transparent_98%)]"
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-[10%] flex justify-center sm:bottom-[16%]">
            <div className="w-[min(80%,24rem)] rounded-2xl border border-calm-navy/10 bg-white p-4 shadow-[0_30px_70px_-24px_rgba(41,53,135,0.45)] sm:p-5">
              <p className="font-heading text-sm font-bold text-calm-navy">
                {t.cardTitle}
              </p>
              <div className="mt-3 space-y-2">
                <span className="block h-2 w-[88%] rounded-full bg-calm-navy/10" />
                <span className="block h-2 w-[64%] rounded-full bg-calm-lavender/45" />
                <span className="block h-2 w-[46%] rounded-full bg-calm-navy/10" />
              </div>
              <p className="mt-4 font-body text-[11px] uppercase tracking-[0.14em] text-calm-charcoal/60">
                {t.cardMeta}
              </p>
            </div>
          </div>
        </div>

        <p
          className="mx-auto mt-[clamp(1.5rem,3vw,2.5rem)] max-w-2xl text-center font-body text-base sm:text-lg text-calm-charcoal/80 leading-relaxed"
          style={revealFrom(revealed, "up", 320)}
        >
          {t.body}
        </p>
      </div>
    </section>
  );
};

export default HandoffScene;
