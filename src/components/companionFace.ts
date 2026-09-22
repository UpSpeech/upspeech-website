/**
 * The four face axes: eyes, brows, belly shape and belly size.
 *
 * The same numbers and the same formulas as
 * `app-frontend/src/components/ui/companionFace.ts` and the block in
 * `app-mobile/lib/companionCharacter.ts`. Three repos hold three copies of one
 * drawing and there is no shared build between them, so a record and a formula
 * diff where JSX does not.
 *
 * The site has no picker and no user preferences, so it renders the defaults
 * forever: `default` eyes, `none` brows, `lobe` at `m`, which is exactly the
 * drawing it shipped before the axes existed. It carries the axes anyway so
 * the three copies stay one drawing.
 *
 * The lid derivation is absent here on purpose. The site has no expression
 * system, so there are no shut or happy eyes to derive.
 */

export type CompanionEyes = "default" | "wide" | "narrow" | "dot";
export type CompanionBrows = "none" | "flat" | "raised" | "soft";
export type CompanionBellyShape = "lobe" | "none" | "round" | "shield";
export type CompanionBellySize = "s" | "m" | "l";

export const COMPANION_EYES: CompanionEyes[] = [
  "default",
  "wide",
  "narrow",
  "dot",
];
export const COMPANION_BROWS: CompanionBrows[] = [
  "none",
  "flat",
  "raised",
  "soft",
];
export const COMPANION_BELLY_SHAPES: CompanionBellyShape[] = [
  "lobe",
  "none",
  "round",
  "shield",
];
export const COMPANION_BELLY_SIZES: CompanionBellySize[] = ["s", "m", "l"];

/** Both eyes, on the canvas rather than on the body: the face never moves. */
export const EYE_CX = { left: 79, right: 121 } as const;
export const EYE_CY = 92;

export type CompanionEyeSpec = {
  /** Half-width and half-height of the white. `dot` is a circle, so rx = ry. */
  rx: number;
  ry: number;
  /** The iris, offset from the eye centre. `dot` has none: it is all white. */
  iris: { r: number; dy: number } | null;
  /** The highlight, offset from the eye centre. Absent wherever the iris is. */
  glint: { r: number; dx: number; dy: number } | null;
};

export const COMPANION_EYE_SPEC: Record<CompanionEyes, CompanionEyeSpec> = {
  // What ships today, to the unit.
  default: {
    rx: 11,
    ry: 12,
    iris: { r: 5, dy: 3 },
    glint: { r: 1.8, dx: -1.5, dy: -1 },
  },
  // Bigger white, iris grown with it. Reads younger and more alert; the two
  // extra units each way are what keep the iris separating at 44px.
  wide: {
    rx: 13,
    ry: 14,
    iris: { r: 5.5, dy: 4 },
    glint: { r: 2, dx: -2.5, dy: -2 },
  },
  // Shorter white, same width. Calmer. The iris has to drop to 4.5 or it
  // fills the lid.
  narrow: {
    rx: 11,
    ry: 8.5,
    iris: { r: 4.5, dy: 1 },
    glint: { r: 1.6, dx: -1.5, dy: -2 },
  },
  // One cream dot each, no iris and no highlight. The only eye that keeps its
  // shape in a 44px dock button, because there is nothing inside it to lose.
  dot: { rx: 6.5, ry: 6.5, iris: null, glint: null },
};

/**
 * One brow, for the eye centred on `cx`. `none` draws nothing, which is what
 * the whole cast ships with.
 *
 * Brows sit above every eye white at every option and clear of the crown join,
 * so they are canvas coordinates like the eyes rather than offsets from a
 * body. `raised` angles up and outward, so it needs to know which side it is
 * on; two units of rise, never six, because interested is allowed and
 * surprised is not.
 */
export const browPath = (
  brows: CompanionBrows,
  cx: number,
  side: "left" | "right",
): string | null => {
  const outer = side === "left" ? cx - 9 : cx + 9;
  const inner = side === "left" ? cx + 9 : cx - 9;
  switch (brows) {
    case "none":
      return null;
    case "flat":
      return `M${cx - 9} 74 H${cx + 9}`;
    case "raised":
      return `M${outer} 76 L${inner} 72`;
    case "soft":
      return `M${cx - 9} 76 Q${cx} 71 ${cx + 9} 76`;
  }
};

export const BROW_STROKE_WIDTH = 3.5;

/** Width as a fraction of the body, never a constant. */
const BELLY_WIDTH_FRACTION: Record<CompanionBellySize, number> = {
  s: 0.34,
  m: 0.435,
  l: 0.53,
};
/** Height in canvas units. The top is fixed, so this is the whole extent. */
const BELLY_HEIGHT: Record<CompanionBellySize, number> = {
  s: 28,
  m: 36,
  l: 42,
};

/** The top edge, 13 units clear of the rest mouth at y 113. */
export const BELLY_TOP = 126;

export type CompanionBody = {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
};

/**
 * The belly's box, anchored to the body rect the way crowns already are.
 *
 * Pinned to the canvas instead, a lobe sized for Lumo's 120-wide body runs past
 * Pip's edge at 106 and floats loose inside Tumbo's at 150. Taking the width
 * from `body.w` is what makes `l` legal on all four.
 */
export const bellyBox = (body: CompanionBody, size: CompanionBellySize) => {
  const w = Math.round(body.w * BELLY_WIDTH_FRACTION[size]);
  return {
    x: body.x + body.w / 2 - w / 2,
    y: BELLY_TOP,
    w,
    h: BELLY_HEIGHT[size],
  };
};

export type CompanionBellyDrawing =
  | { kind: "path"; d: string }
  | { kind: "ellipse"; cx: number; cy: number; rx: number; ry: number }
  | null;

/**
 * The belly, as the shape the chosen option asks for.
 *
 * `lobe` at `m` on Lumo is the path the file carried inline before the axes
 * existed, character for character. `shield` is the only option with a
 * vertical axis, which is what stops the four reading as one shape at four
 * widths.
 */
export const bellyDrawing = (
  body: CompanionBody,
  shape: CompanionBellyShape,
  size: CompanionBellySize,
): CompanionBellyDrawing => {
  if (shape === "none") return null;
  const k = bellyBox(body, size);
  if (shape === "round") {
    return {
      kind: "ellipse",
      cx: k.x + k.w / 2,
      cy: k.y + k.h / 2,
      rx: k.w / 2,
      ry: k.h / 2,
    };
  }
  if (shape === "shield") {
    return {
      kind: "path",
      d:
        `M${k.x + 8} ${k.y} H${k.x + k.w - 8} A8 8 0 0 1 ${k.x + k.w} ${k.y + 8} ` +
        `V${k.y + k.h * 0.45} Q${k.x + k.w} ${k.y + k.h} ${k.x + k.w / 2} ${k.y + k.h} ` +
        `Q${k.x} ${k.y + k.h} ${k.x} ${k.y + k.h * 0.45} V${k.y + 8} ` +
        `A8 8 0 0 1 ${k.x + 8} ${k.y} Z`,
    };
  }
  const r = k.h / 2;
  return {
    kind: "path",
    d:
      `M${k.x + 8} ${k.y} H${k.x + k.w - r} A${r} ${r} 0 1 1 ${k.x + k.w - r} ${k.y + k.h} ` +
      `H${k.x + 8} A8 8 0 0 1 ${k.x} ${k.y + k.h - 8} V${k.y + 8} ` +
      `A8 8 0 0 1 ${k.x + 8} ${k.y} Z`,
  };
};
