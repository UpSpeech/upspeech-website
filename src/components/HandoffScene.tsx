import { EASE } from "./motion";
import { localizedAsset, useLocale } from "@/i18n";

type Actor = "ai" | "clinician";

// One real screen per step, in step order: the report and the plan each change
// hands twice, then a patient's practice and the step the clinician sets next.
const ARTIFACTS = [
  { src: "/screenshots/detail/report-ready.webp", width: 634, height: 264 },
  { src: "/screenshots/detail/report-ready.webp", width: 634, height: 264 },
  { src: "/screenshots/detail/loop-plan.webp", width: 610, height: 136 },
  { src: "/screenshots/detail/loop-plan.webp", width: 610, height: 136 },
  {
    src: "/screenshots/mobile/patient-practice-crop.webp",
    width: 920,
    height: 767,
  },
  { src: "/screenshots/detail/exchange-today.webp", width: 1056, height: 395 },
] as const;

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
        x="68"
        y="18"
        width="34"
        height="12"
        rx="6"
        fill={c.hand}
        transform="rotate(-26 70 26)"
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

export default function HandoffScene({
  activeIndex,
  labels,
}: {
  activeIndex: number;
  labels: Record<Actor, string>;
}) {
  const locale = useLocale();
  const holder: Actor = activeIndex % 2 === 0 ? "ai" : "clinician";
  const art = ARTIFACTS[activeIndex];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full overflow-hidden rounded-3xl bg-white ring-1 ring-calm-navy/10"
      style={{ aspectRatio: "560 / 340", maxWidth: "min(560px, 56vh * 1.75)" }}
    >
      <div
        className="absolute top-[34%] left-0 z-20 h-[34%] w-[27%] motion-reduce:transition-none"
        style={{
          transform: holder === "ai" ? "translateX(0)" : "translateX(-75%)",
          transition: `transform ${slide}`,
        }}
      >
        <Hand actor="ai" />
      </div>
      <div
        className="absolute top-[34%] right-0 z-20 h-[34%] w-[27%] motion-reduce:transition-none"
        style={{
          transform:
            holder === "clinician" ? "translateX(0)" : "translateX(75%)",
          transition: `transform ${slide}`,
        }}
      >
        <div className="h-full w-full -scale-x-100">
          <Hand actor="clinician" />
        </div>
      </div>

      <div
        className="absolute top-1/2 z-10 w-[46%] rounded-xl bg-white p-3 shadow-[0_20px_40px_-20px_rgba(41,53,135,0.45)] ring-1 ring-calm-navy/10 motion-reduce:transition-none"
        style={{
          left: holder === "ai" ? "23.5%" : "30.5%",
          transform: `translateY(-50%) rotate(${holder === "ai" ? -2 : 2}deg)`,
          transition: `left ${slide}, transform ${slide}`,
        }}
      >
        <img
          key={activeIndex}
          src={localizedAsset(art.src, locale)}
          alt=""
          width={art.width}
          height={art.height}
          className="h-auto w-full"
          style={{ animation: `optD-reveal 600ms ${EASE} both` }}
        />
      </div>

      {(["ai", "clinician"] as const).map((actor) => (
        <span
          key={actor}
          className={`absolute bottom-4 font-body text-[11px] font-bold uppercase tracking-[0.22em] transition-opacity duration-500 ${
            actor === "ai"
              ? "left-5 text-calm-lavender-ink"
              : "right-5 text-calm-navy"
          } ${holder === actor ? "opacity-100" : "opacity-40"}`}
        >
          {labels[actor]}
        </span>
      ))}
    </div>
  );
}
