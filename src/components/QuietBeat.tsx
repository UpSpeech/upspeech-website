import { revealFrom } from "./motion";
import { useReveal } from "./useReveal";
import SpeechTrace from "./SpeechTrace";
import { useT } from "@/i18n";

/**
 * One line, and room around it.
 *
 * The page had five heavy sections in a row before anything let up: the week at
 * 1249px, the clinician's morning at 1074, the session at 901, the afternoon at
 * 1019, the app band at 764. The only quiet beat sat at position seven, long
 * after a reader needs one. Density with no relief is what makes a long page
 * feel like a brochure.
 *
 * It goes here because here is the turn. The week ends on therapy happening
 * where nobody is watching, which is the patient's side; the clinician's day
 * starts immediately after. This is the sentence that moves the camera between
 * them, which is the one place a pause is not padding.
 *
 * The line is deliberately not an observation. An earlier version of this
 * section carried "One hour in the room. A hundred and sixty-seven outside it.",
 * which lifted a figure out of docs/planning/Pilot Results Analysis.md into
 * marketing copy and reversed a call the site had already made: home.week.body
 * says the qualitative version, "One hour in the clinic, then six days on their
 * own." A pull-quote in white space also wants to be an aphorism, and that is
 * the shape to avoid. This line makes no claim at all. It says where you are
 * about to look, and the next section shows it: a clinician at her desk at
 * 08:40.
 *
 * Everything about it is the opposite of its neighbours on purpose. Narrow
 * where they are wide, centred where they are left-aligned, one line where they
 * carry a headline, a lead and a row of images. A quiet section that looks like
 * a small version of a loud one does nothing.
 */

const QuietBeat = () => {
  const t = useT().home.pause;
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.4 });

  return (
    <section
      ref={ref}
      // Asymmetric: the room above the line is the pause, and the section below
      // brings its own top padding, so an equal bottom stacked to roughly three
      // hundred pixels of nothing between the two.
      className="bg-white pb-[clamp(3rem,7vw,5rem)] pt-[clamp(4.5rem,13vw,9rem)]"
      aria-label={t.ariaLabel}
    >
      <div className="mx-auto max-w-3xl px-[max(1.5rem,5vw)] text-center">
        <p
          className="t-statement font-accent font-medium text-calm-charcoal"
          style={revealFrom(revealed, "up", 0)}
        >
          {t.line}
        </p>

        {/* The hero's speech envelope at a fifth of the height. The page's
            signature reappearing quietly, rather than a plain rule dropped in,
            is what earns a divider its place here. */}
        <div
          className="mx-auto mt-9 max-w-sm"
          style={revealFrom(revealed, "up", 160)}
        >
          <SpeechTrace
            variant="utterance"
            height={22}
            label={t.traceLabel}
            activeColor="rgba(149,138,240,0.9)"
            silentColor="rgba(41,53,135,0.14)"
          />
        </div>
      </div>
    </section>
  );
};

export default QuietBeat;
