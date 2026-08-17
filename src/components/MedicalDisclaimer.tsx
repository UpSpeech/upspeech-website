import { cn } from "@/lib/utils";
import { useT } from "@/i18n";

type Props = {
  // "section" renders a bordered block for mid-page use (default).
  // "compact" renders smaller muted text for dense placements (e.g. the footer).
  variant?: "section" | "compact";
  className?: string;
};

const MedicalDisclaimer = ({ variant = "section", className }: Props) => {
  const text = useT().medicalDisclaimer;

  if (variant === "compact") {
    return (
      <p
        className={cn(
          "font-body text-xs leading-relaxed text-calm-charcoal/70",
          className,
        )}
      >
        {text}
      </p>
    );
  }
  return (
    <aside
      className={cn(
        "mx-auto max-w-3xl rounded-xl border border-calm-charcoal/10 bg-calm-light/60 px-5 py-4 font-body text-sm leading-relaxed text-calm-charcoal/80",
        className,
      )}
    >
      {text}
    </aside>
  );
};

export default MedicalDisclaimer;
