const DISCLAIMER_TEXT =
  "UpSpeech is a practice and clinical-productivity tool for use by and with qualified speech-language pathologists. It is not a medical device and does not diagnose, treat, or cure any condition. Educational content on this site is not a substitute for professional clinical advice.";

type Props = {
  /** "section" renders a bordered block for use mid-page (default).
   *  "compact" renders smaller muted text for dense placements. */
  variant?: "section" | "compact";
  className?: string;
};

const MedicalDisclaimer = ({ variant = "section", className = "" }: Props) => {
  if (variant === "compact") {
    return (
      <p
        className={`font-body text-xs leading-relaxed text-calm-charcoal/55 ${className}`}
      >
        {DISCLAIMER_TEXT}
      </p>
    );
  }
  return (
    <aside
      role="note"
      className={`mx-auto max-w-3xl rounded-xl border border-calm-charcoal/10 bg-calm-light/60 px-5 py-4 font-body text-sm leading-relaxed text-calm-charcoal/65 ${className}`}
    >
      {DISCLAIMER_TEXT}
    </aside>
  );
};

export default MedicalDisclaimer;
