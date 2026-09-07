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
 * changed rectangle rather than a new drawing. Body, crown, accent and chest
 * lobe are four separate axes, each a variable, and wiring only some of the
 * coloured surfaces to one was the bug that made the original canvas
 * untestable.
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
 * The crowns the file can draw. Named once so the species record, the prop and
 * the Crown component cannot drift apart.
 */
export type CrownKind = "ears" | "antenna" | "sideEars" | "none";

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
    crown: CrownKind;
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
  /**
   * Crown, independent of the body. Omitted, or set to the stored sentinel
   * "default", the species keeps the crown it was drawn with, so every existing
   * caller is unaffected.
   */
  crown?: CrownKind | "default";
  /** Rendered size in px. Below about 80 the face stops reading. */
  size?: number;
  /**
   * Accent for the cheek dots, the antenna tip and the speech dots. Defaults to
   * the brand lavender.
   */
  accent?: string;
  /**
   * Chest lobe colour, as its own axis. Defaults to `accent`, which is how it
   * behaved when the lobe and the cheeks were one variable.
   */
  belly?: string;
  /**
   * Accessible name. Omitted, it stays decorative, which is right when the copy
   * beside it already says what the section is.
   */
  label?: string;
  className?: string;
};

/**
 * Crowns anchor to the body rect rather than to absolute canvas coordinates.
 * Each one was authored against a single body, so an antenna drawn for pip
 * (body top y 40) floats clear of tumbo's head (y 62), and side ears drawn for
 * nima disappear inside a body 150 units wide. Every offset below reproduces
 * its home species exactly, so no shipped drawing moves, and carries the crown
 * correctly onto the other three bodies.
 */
const Crown = ({ kind, body: b }: { kind: CrownKind; body: Body }) => {
  if (kind === "ears") {
    const cy = b.y + 8; // lumo: 50
    return (
      <>
        <circle cx={b.x + 20} cy={cy} r="17" fill={INK} />
        <circle cx={b.x + b.w - 20} cy={cy} r="17" fill={INK} />
      </>
    );
  }
  if (kind === "sideEars") {
    const cy = b.y + 44; // nima: 92
    return (
      <>
        <circle cx={b.x + 8} cy={cy} r="21" fill={INK} />
        <circle cx={b.x + b.w - 8} cy={cy} r="21" fill={INK} />
      </>
    );
  }
  if (kind === "antenna") {
    // Buried 6px inside the body so the join hides behind it. On pip the base
    // is 46, the stem tops at 26 and the ball centres at 18. The stem also
    // takes its x from the body centre rather than the canvas centre: all four
    // bodies happen to centre on 100, but a body that did not would grow a
    // detached antenna, which is the class of bug this whole change removes.
    const base = b.y + 6;
    const cx = b.x + b.w / 2;
    return (
      <>
        <path
          d={`M${cx} ${base} V${base - 20}`}
          stroke={INK}
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
        />
        <circle cx={cx} cy={base - 28} r="11" fill="var(--companion-accent)" />
      </>
    );
  }
  return null;
};

const Companion = ({
  species = "lumo",
  crown: crownProp,
  size = 160,
  accent = "#958af0",
  belly: bellyProp,
  label,
  className = "",
}: Props) => {
  const s = SPECIES[species];
  const { body: b, arms: a, feet: f } = s;
  // `default` is the stored sentinel for "the crown this body was drawn with",
  // and so is prop absence. Both resolve here so no caller has to translate.
  const crown = !crownProp || crownProp === "default" ? s.crown : crownProp;
  // Defaulted through the cascade rather than through the resolved string, so
  // an override of --companion-accent carries the lobe with it.
  const belly = bellyProp ?? "var(--companion-accent)";
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
      style={{
        ["--companion-accent" as string]: accent,
        ["--companion-belly" as string]: belly,
      }}
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
        <Crown kind={crown} body={b} />
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={b.r} fill={INK} />

        {/* Two colour axes, and every coloured surface belongs to exactly one.
            The chest lobe reads --companion-belly; the cheeks, the antenna tip
            and the speech dots read --companion-accent. Wiring a surface to
            neither is the defect that made the original canvas untestable, so
            a new coloured surface must join one of the two. */}
        <path
          d="M82 126 H108 A18 18 0 1 1 108 162 H82 A8 8 0 0 1 74 154 V134 A8 8 0 0 1 82 126 Z"
          fill="var(--companion-belly)"
          opacity="0.94"
        />
        {/* Both cheeks on one line. The right one was authored at cy 128, level
            with the chest lobe rather than with its own pair, which read as a
            slipped dot on every body since the cheeks are shared geometry. */}
        <circle cx="131" cy="110" r="5.5" fill="var(--companion-accent)" />
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
        <circle
          className="companion-dot companion-dot-1"
          cx="169"
          cy="94"
          r="4.5"
          fill="var(--companion-accent)"
        />
        <circle
          className="companion-dot companion-dot-2"
          cx="184"
          cy="76"
          r="6"
          fill="var(--companion-accent)"
        />
        <circle
          className="companion-dot companion-dot-3"
          cx="198"
          cy="56"
          r="7.5"
          fill="var(--companion-accent)"
        />
      </g>
    </svg>
  );
};

export default Companion;
