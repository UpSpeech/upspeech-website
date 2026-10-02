import { EASE } from "./motion";

export type Actor = "ai" | "clinician";

const MARKS: Record<string, string> = {
  plain: "text-calm-charcoal",
  ai: "-mx-1 rounded bg-calm-lavender/25 px-1 text-calm-charcoal",
  struck: "text-calm-charcoal/50 line-through decoration-calm-navy/60",
  clin: "border-l-2 border-calm-navy pl-2 font-semibold text-calm-navy",
};

const TONES = {
  ai: { sleeve: "#6866C4", cuff: "#BEB8F6", hand: "#958AF0" },
  clinician: { sleeve: "#293587", cuff: "#5662BF", hand: "#3D4BA8" },
} as const;

/** A forearm and a hand pointing right, fingers over the sheet's edge. */
const Hand = ({ actor }: { actor: Actor }) => {
  const c = TONES[actor];
  return (
    <svg viewBox="0 0 150 110" className="h-full w-full" aria-hidden="true">
      <rect x="0" y="30" width="50" height="52" rx="14" fill={c.sleeve} />
      <rect x="44" y="26" width="12" height="60" rx="6" fill={c.cuff} />
      <rect x="54" y="34" width="44" height="44" rx="18" fill={c.hand} />
      <rect
        x="62"
        y="24"
        width="36"
        height="13"
        rx="6.5"
        fill={c.hand}
        transform="rotate(-18 64 31)"
      />
      {[
        [32, 46],
        [45, 54],
        [58, 52],
        [71, 42],
      ].map(([y, w]) => (
        <rect
          key={y}
          x="86"
          y={y}
          width={w}
          height="11"
          rx="5.5"
          fill={c.hand}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
};

const slide = `700ms ${EASE}`;
const HELD = "translateX(0)";
// Offsets are tuned to the hand's 22% width and the sheet's 52%.
const SIDES: Record<Actor, { hand: string; sheet: string; tilt: number }> = {
  ai: { hand: "translateX(-30%)", sheet: "20%", tilt: -3 },
  clinician: { hand: "translateX(30%)", sheet: "29%", tilt: 3 },
};

export default function HandoffScene({
  activeIndex,
  labels,
  states,
  docs,
}: {
  activeIndex: number;
  labels: Record<Actor, string>;
  states: readonly string[];
  docs: readonly {
    kind: string;
    lines: readonly { text: string; mark: string }[];
  }[];
}) {
  const holder: Actor = activeIndex % 2 === 0 ? "ai" : "clinician";
  const doc = docs[activeIndex];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full overflow-hidden rounded-3xl bg-white ring-1 ring-calm-navy/10"
      style={{ aspectRatio: "560 / 360", maxWidth: "min(680px, 62vh * 1.55)" }}
    >
      {(["ai", "clinician"] as const).map((actor) => (
        <div
          key={actor}
          className={`absolute top-[34%] z-20 h-[32%] w-[22%] ${
            actor === "ai" ? "left-0" : "right-0"
          }`}
          style={{
            transform: holder === actor ? HELD : SIDES[actor].hand,
            transition: `transform ${slide}`,
          }}
        >
          <div
            className={`h-full w-full ${actor === "ai" ? "" : "-scale-x-100"}`}
          >
            <Hand actor={actor} />
          </div>
        </div>
      ))}

      <div
        className="absolute top-1/2 z-10 w-[52%] rounded-xl border-l-4 bg-white p-4 shadow-[0_20px_40px_-20px_rgba(41,53,135,0.45)] ring-1 ring-calm-navy/10"
        style={{
          borderLeftColor: holder === "ai" ? "#958AF0" : "#293587",
          left: SIDES[holder].sheet,
          transform: `translateY(-50%) rotate(${SIDES[holder].tilt}deg)`,
          transition: `left ${slide}, transform ${slide}`,
        }}
      >
        <div
          key={activeIndex}
          style={{ animation: `optD-reveal 600ms ${EASE} both` }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-calm-charcoal/70">
              {doc.kind}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 font-body text-[11px] font-bold ${
                holder === "ai"
                  ? "bg-calm-lavender text-calm-navy"
                  : "bg-calm-navy text-white"
              }`}
            >
              {states[activeIndex]}
            </span>
          </div>
          <ul className="space-y-2 font-body text-[13px] leading-snug">
            {doc.lines.map((line) => (
              <li key={line.text} className={MARKS[line.mark]}>
                {line.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(["ai", "clinician"] as const).map((actor) => (
        <span
          key={actor}
          className={`absolute bottom-4 font-body text-[11px] font-bold uppercase tracking-[0.22em] transition-opacity duration-500 ${
            actor === "ai"
              ? "left-5 text-calm-lavender-ink"
              : "right-5 text-calm-navy"
          } ${holder === actor ? "opacity-100" : "opacity-65"}`}
        >
          {labels[actor]}
        </span>
      ))}
    </div>
  );
}
