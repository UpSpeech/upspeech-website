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
        // A hairline rule and small print rather than a card. The rule matches
        // the FAQ dividers (divide-calm-charcoal/10) so it reads as part of the
        // page. Text at /85 measures 5.57:1 on white, up from 4.74:1 for /80 on
        // the old translucent card. Deliberately not darker than that: page body
        // copy runs at /70, and the disclaimer should not outshout the content.
        "mx-auto max-w-3xl border-t border-calm-charcoal/10 pt-6 font-body text-sm leading-relaxed text-calm-charcoal/85",
        className,
      )}
    >
      {text}
    </aside>
  );
};

export default MedicalDisclaimer;
