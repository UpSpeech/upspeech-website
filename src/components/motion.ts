import type { CSSProperties } from "react";

export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Shared entry-reveal style for Option D scenes.
 * Drop onto any element inside a section that has `revealed` state
 * (from useReveal on non-sticky sections, or from an IO-triggered
 * boolean on sticky sections).
 *
 * Standard delay ladder per scene:
 *   0, eyebrow
 *   80, headline
 *   160, body / subhead
 *   240+, secondary content (stagger 80ms)
 */
export const reveal = (
  revealed: boolean,
  delay = 0,
  offset = 20,
): CSSProperties => ({
  transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
  transitionDelay: `${delay}ms`,
  opacity: revealed ? 1 : 0,
  transform: revealed ? "translateY(0)" : `translateY(${offset}px)`,
});

/**
 * Same reveal, but along a chosen axis. The homepage runs ~140 revealed
 * elements and all but a handful used one fade-and-rise, which is what makes
 * a long mobile scroll feel like the same beat over and over. Sections that
 * sit next to each other can alternate axis so arrival is not identical.
 */
export const revealFrom = (
  revealed: boolean,
  axis: "up" | "left" | "right" | "scale" = "up",
  delay = 0,
  offset = 20,
): CSSProperties => {
  const from = {
    up: `translateY(${offset}px)`,
    left: `translateX(-${offset}px)`,
    right: `translateX(${offset}px)`,
    scale: `scale(${1 - offset / 500})`,
  }[axis];
  return {
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "none" : from,
  };
};
