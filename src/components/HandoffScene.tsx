import { EASE } from "./motion";

export type Actor = "ai" | "clinician";

type Doc = {
  kind: string;
  lines: readonly { text: string; mark: string }[];
};

// Which of the six step snapshots in the dictionary belong to the same section
// of the file. Each section shows its latest snapshot, so the file only grows.
const SECTIONS: readonly (readonly number[])[] = [[0, 1], [2, 3], [4], [5]];

const TINTS: Record<string, string> = {
  ai: "[&>span:first-child]:rounded [&>span:first-child]:bg-calm-lavender/25 [&>span:first-child]:px-1 [&>span:first-child]:[box-decoration-break:clone] text-calm-charcoal",
  plain: "text-calm-charcoal",
  struck: "text-calm-charcoal/50 line-through decoration-calm-navy/60",
  clin: "border-l-2 border-calm-navy pl-2 font-semibold text-calm-navy",
};

const Presence = ({ actor, label }: { actor: Actor; label: string }) => (
  <span
    aria-hidden="true"
    className="ml-2 inline-flex translate-y-[3px] items-center gap-1.5 align-baseline"
  >
    {actor === "ai" ? (
      <span
        className="h-4 w-0.5 bg-calm-lavender-ink"
        style={{ animation: "handoff-caret 1s steps(2) infinite" }}
      />
    ) : (
      <svg width="12" height="14" viewBox="0 0 12 14" className="shrink-0">
        <path d="M1 1l10 6.5-4.3 1.1L5 13z" fill="#293587" />
      </svg>
    )}
    <span
      className={`rounded-full px-2 py-0.5 font-body text-[10px] font-bold ${
        actor === "ai"
          ? "bg-calm-lavender text-calm-navy"
          : "bg-calm-navy text-white"
      }`}
    >
      {label}
    </span>
  </span>
);

export default function HandoffScene({
  activeIndex,
  labels,
  states,
  docs,
  title,
}: {
  activeIndex: number;
  labels: Record<Actor, string>;
  states: readonly string[];
  docs: readonly Doc[];
  title: string;
}) {
  const actor: Actor = activeIndex % 2 === 0 ? "ai" : "clinician";

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full overflow-hidden rounded-3xl bg-white p-5 ring-1 ring-calm-navy/10 shadow-[0_30px_60px_-30px_rgba(41,53,135,0.45)] sm:p-7"
      style={{
        maxWidth: "min(620px, 62vh * 1.4)",
        minHeight: "min(32rem, 64vh)",
      }}
    >
      <p className="mb-4 border-b border-calm-charcoal/10 pb-3 font-heading text-base font-bold text-calm-navy">
        {title}
      </p>

      <div className="space-y-4">
        {SECTIONS.map((steps, s) => {
          const shown = steps.filter((n) => n <= activeIndex);
          if (!shown.length) return null;
          const latest = shown[shown.length - 1];
          const doc = docs[latest];
          // A line the clinician left alone keeps the AI tint it was drafted with.
          const earlierAi = new Set(
            shown
              .slice(0, -1)
              .flatMap((n) =>
                docs[n].lines.filter((l) => l.mark === "ai").map((l) => l.text),
              ),
          );
          const isActive = steps.includes(activeIndex);
          // The marker follows the last line the active actor wrote in this section.
          const lastIdx = doc.lines.reduce(
            (acc, l, i) =>
              actor === "clinician" ? (l.mark === "clin" ? i : acc) : i,
            doc.lines.length - 1,
          );
          return (
            <section
              key={s}
              style={{ animation: `handoff-in 500ms ${EASE} both` }}
            >
              <p className="mb-1.5 flex items-center justify-between font-body text-[11px] font-bold uppercase tracking-[0.16em] text-calm-charcoal/70">
                {doc.kind}
                <span
                  className={`rounded-full px-2.5 py-0.5 tracking-normal ${
                    isActive
                      ? actor === "ai"
                        ? "bg-calm-lavender text-calm-navy"
                        : "bg-calm-navy text-white"
                      : "bg-calm-light text-calm-charcoal/70"
                  }`}
                >
                  {states[latest]}
                </span>
              </p>
              <ul className="space-y-1.5 font-body text-[13px] leading-snug">
                {doc.lines.map((line, i) => {
                  const mark =
                    line.mark === "plain" && earlierAi.has(line.text)
                      ? "ai"
                      : line.mark;
                  return (
                    <li
                      key={line.text}
                      className={TINTS[mark]}
                      style={{ animation: `handoff-in 500ms ${EASE} both` }}
                    >
                      <span>{line.text}</span>
                      {isActive && i === lastIdx && (
                        <Presence actor={actor} label={labels[actor]} />
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-5 font-body text-[11px] font-semibold text-calm-charcoal/70">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-5 rounded bg-calm-lavender/25" />
          {labels.ai}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-0.5 bg-calm-navy" />
          {labels.clinician}
        </span>
      </div>

      <style>{`
        @keyframes handoff-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes handoff-caret { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          [style*="handoff-"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
