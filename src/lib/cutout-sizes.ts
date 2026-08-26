import { CUTOUTS } from "@/lib/cutouts.generated";

/** Rendered height at each Tailwind breakpoint the className ladder names. */
export type Heights = { base: number; sm?: number; lg?: number };

/** Width a cut-out paints at, from its own aspect. */
export const cutOutWidthAt = (name: string) => {
  const dim = CUTOUTS[name as keyof typeof CUTOUTS];
  return (height: number) => (dim ? Math.ceil(height * (dim.w / dim.h)) : height);
};

/**
 * The sizes attribute for a height ladder, in the breakpoints Tailwind's sm and
 * lg name. Lives here rather than in CutOut because a hero also preloads its
 * cut-out, and a preload that declares a different size than the img picks a
 * different candidate and downloads it twice.
 */
export const sizesFor = (
  renderHeight: number | Heights,
  widthAt: (height: number) => number,
) => {
  if (typeof renderHeight === "number") return `${widthAt(renderHeight)}px`;
  const { base, sm, lg } = renderHeight;
  const clauses = [];
  if (sm !== undefined) clauses.push(`(max-width: 639px) ${widthAt(base)}px`);
  if (lg !== undefined)
    clauses.push(`(max-width: 1023px) ${widthAt(sm ?? base)}px`);
  return [...clauses, `${widthAt(lg ?? sm ?? base)}px`].join(", ");
};
