import { useEffect, useRef, useState } from "react";

/**
 * The companions: lumo, pip, nima and tumbo.
 *
 * Geometry comes from the mascot canvas archived at
 * docs/html/mascot-companions-2026-08-21/, with the palette correction the
 * decision record requires applied on the way in: body #212540 and limbs
 * #1d1e27, which are the logo values, never the UI ramp's #293587 and #2a2f6b.
 *
 * Four bodies on one construction system. Everything except the body rectangle
 * and the crown is shared, which is the whole point of the system: the face,
 * the chest lobe, the arms and the feet never move, so a new species is one
 * changed rectangle rather than a new drawing. The accent is a variable because
 * a body and an accent are two separate axes, and wiring only some of the
 * accent surfaces to it was the bug that made the original canvas untestable.
 *
 * The loop is the product's own subject rather than idle fidgeting: the
 * companion breathes, then speaks, and three dots rise as it does. Six seconds,
 * because the brand is calm before all else. It is CSS rather than an animation
 * library, since that is how this site animates everything else and a marketing
 * page should not carry motion/react for one component.
 *
 * Sizes: below about 80px the eyes stop reading and it becomes a blob. These
 * are meant to be seen.
 */

export type Species = "lumo" | "pip" | "nima" | "tumbo";

type Body = { x: number; y: number; w: number; h: number; r: number };

/**
 * Per species: the body rectangle, the crown, and where the arms and feet sit
 * against that body. Only these differ.
 */
const SPECIES: Record<
  Species,
  {
    body: Body;
    arms: { lx: number; rx: number; y: number; w: number; h: number };
    feet: { lx: number; rx: number; w: number };
    crown: "ears" | "antenna" | "sideEars" | "none";
  }
> = {
  lumo: {
    body: { x: 40, y: 42, w: 120, h: 136, r: 54 },
    arms: { lx: 24, rx: 152, y: 106, w: 24, h: 48 },
    feet: { lx: 62, rx: 106, w: 32 },
    crown: "ears",
  },
  pip: {
    body: { x: 47, y: 40, w: 106, h: 138, r: 44 },
    arms: { lx: 24, rx: 152, y: 106, w: 24, h: 48 },
    feet: { lx: 62, rx: 106, w: 32 },
    crown: "antenna",
  },
  nima: {
    body: { x: 36, y: 48, w: 128, h: 130, r: 62 },
    arms: { lx: 24, rx: 152, y: 106, w: 24, h: 48 },
    feet: { lx: 62, rx: 106, w: 32 },
    crown: "sideEars",
  },
  tumbo: {
    body: { x: 25, y: 62, w: 150, h: 116, r: 54 },
    arms: { lx: 9, rx: 167, y: 110, w: 24, h: 44 },
    feet: { lx: 48, rx: 120, w: 32 },
    crown: "none",
  },
};

const INK = "#212540";
const LIMB = "#1d1e27";
const EYE = "#faf9f5";

type Props = {
  species?: Species;
  /** Rendered size in px. Below about 80 the face stops reading. */
  size?: number;
  /** Accent for the chest lobe, cheek dots and speech. Defaults to the brand lavender. */
  accent?: string;
  /**
   * Accessible name. Omitted, it stays decorative, which is right when the copy
   * beside it already says what the section is.
   */
  label?: string;
  className?: string;
};

const Crown = ({ kind, accent }: { kind: string; accent: string }) => {
  if (kind === "ears")
    return (
      <>
        <circle cx="60" cy="50" r="17" fill={INK} />
        <circle cx="140" cy="50" r="17" fill={INK} />
      </>
    );
  if (kind === "sideEars")
    return (
      <>
        <circle cx="44" cy="92" r="21" fill={INK} />
        <circle cx="156" cy="92" r="21" fill={INK} />
      </>
    );
  if (kind === "antenna")
    return (
      <>
        <path
          d="M100 46 V26"
          stroke={INK}
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="100" cy="18" r="11" fill={accent} />
      </>
    );
  return null;
};

const Companion = ({
  species = "lumo",
  size = 160,
  accent = "#958af0",
  label,
  className = "",
}: Props) => {
  const s = SPECIES[species];
  const { body: b, arms: a, feet: f } = s;
  const ref = useRef<SVGSVGElement | null>(null);
  const [onScreen, setOnScreen] = useState(false);

  // The loop only runs while it is on screen. An infinite animation composites
  // cheaply but never lets the tab go idle, and these sit partway down a long
  // page. Two-way on purpose, unlike the page's reveal hook, which latches once.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setOnScreen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const };

  return (
    <svg
      ref={ref}
      width={size}
      height={size * (212 / 200)}
      viewBox="0 0 200 212"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ["--companion-accent" as string]: accent }}
      className={`companion ${onScreen ? "companion-live" : ""} ${className}`}
      {...a11y}
    >
      <ellipse
        cx="100"
        cy="196"
        rx={b.w * 0.42}
        ry="7"
        fill={INK}
        opacity="0.1"
      />

      {/* The whole body breathes as one, so nothing drifts apart. */}
      <g className="companion-body">
        <rect x={f.lx} y="168" width={f.w} height="18" rx="9" fill={LIMB} />
        <rect x={f.rx} y="168" width={f.w} height="18" rx="9" fill={LIMB} />
        <rect
          x={a.lx}
          y={a.y}
          width={a.w}
          height={a.h}
          rx={a.w / 2}
          fill={LIMB}
        />
        <rect
          x={a.rx}
          y={a.y}
          width={a.w}
          height={a.h}
          rx={a.w / 2}
          fill={LIMB}
        />

        {/* Crown behind the body so the body covers where it joins. */}
        <Crown kind={s.crown} accent={accent} />
        <rect
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={b.r}
          fill={INK}
        />

        {/* Accent surfaces. All of them take the variable: wiring only some of
            them was the defect that made the original canvas untestable. */}
        <path
          d="M82 126 H108 A18 18 0 1 1 108 162 H82 A8 8 0 0 1 74 154 V134 A8 8 0 0 1 82 126 Z"
          fill="var(--companion-accent)"
          opacity="0.94"
        />
        <circle cx="131" cy="128" r="5.5" fill="var(--companion-accent)" />
        <circle
          cx="61"
          cy="110"
          r="5.5"
          fill="var(--companion-accent)"
          opacity="0.85"
        />

        <g className="companion-eyes">
          <ellipse cx="79" cy="92" rx="11" ry="12" fill={EYE} />
          <ellipse cx="121" cy="92" rx="11" ry="12" fill={EYE} />
          <circle cx="80" cy="95" r="5" fill={INK} />
          <circle cx="122" cy="95" r="5" fill={INK} />
          <circle cx="77.5" cy="91" r="1.8" fill={EYE} />
          <circle cx="119.5" cy="91" r="1.8" fill={EYE} />
        </g>

        {/* Two mouths on one timeline: closed while listening, open while
            speaking. No state machine, so they cannot fall out of sync. */}
        <path
          className="companion-mouth-rest"
          d="M91 113 Q100 121 109 113"
          fill="none"
          stroke={EYE}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <ellipse
          className="companion-mouth-open"
          cx="100"
          cy="116"
          rx="8"
          ry="10"
          fill={EYE}
        />
      </g>

      {/* Speech leaving the companion while the mouth is open. */}
      <g className="companion-speech">
        {/* Placed clear of the arm, which sits at y 106-154. Lower down they
            read as coming out of the elbow rather than out of the mouth. */}
        <circle className="companion-dot companion-dot-1" cx="169" cy="94" r="4.5" fill="var(--companion-accent)" />
        <circle className="companion-dot companion-dot-2" cx="184" cy="76" r="6" fill="var(--companion-accent)" />
        <circle className="companion-dot companion-dot-3" cx="198" cy="56" r="7.5" fill="var(--companion-accent)" />
      </g>
    </svg>
  );
};

export default Companion;
