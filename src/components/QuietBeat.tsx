import { revealFrom } from "./motion";
import { useReveal } from "./useReveal";
import SpeechTrace from "./SpeechTrace";
import { useT } from "@/i18n";

/**
 * One sentence, and room around it.
 *
 * The page had five heavy sections in a row before anything let up: the week at
 * 1249px, the clinician's morning at 1126, the session at 877, the afternoon at
 * 1019, the app band at 764. The only quiet beat on the page sat at position
 * seven, long after a reader needs it. Density with no relief is what makes a
 * long page feel like a brochure, and it was the last thing on this site still
 * reading as a template.
 *
 * So this goes between the problem and the day: the week says therapy happens
 * where nobody is watching, this states the size of that gap in one line, and
 * then the clinician's day starts. It is the turn in the argument, which is the
 * one place a pause is not padding.
 *
 * Everything about it is the opposite of its neighbours on purpose. Narrow
 * where they are wide, centred where they are left-aligned, one sentence where
 * they carry a headline, a lead and a row of images. Contrast is the whole job;
 * a quiet section that looks like a small version of a loud one does nothing.
 *
 * The arithmetic is literal rather than a figure of speech. A week is 168
 * hours and a session is one of them.
 */

const QuietBeat = () => {
  const t = useT().home.pause;
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.4 });

  return (
    <section
      ref={ref}
      // Asymmetric: the room above the line is the pause, and the section
      // below brings its own top padding, so an equal bottom stacked to roughly
      // three hundred pixels of nothing between the two.
      className="bg-white pb-[clamp(3rem,7vw,5rem)] pt-[clamp(4.5rem,13vw,9rem)]"
      aria-label={t.ariaLabel}
    >
      <div className="mx-auto max-w-3xl px-[max(1.5rem,5vw)] text-center">
        <p
          className="t-statement font-accent font-medium text-calm-charcoal"
          style={revealFrom(revealed, "up", 0)}
        >
          {/* Two lines, not one wrapping sentence: left to itself the measure
              broke "a hundred and / sixty-seven" and split the number in half.
              The trailing space is the same crawler fix as the hero, since
              block-level spans concatenate with no word break in textContent. */}
          <span className="block">{t.lineOne} </span>
          <span className="block text-calm-lavender-ink">{t.lineTwo}</span>
        </p>

        {/* The same envelope as the hero, at a fifth of the height. It is the
            page's signature reappearing quietly rather than a rule, which is
            what earns a divider its place here. */}
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
