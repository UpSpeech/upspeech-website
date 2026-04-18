import type { CSSProperties } from "react";

export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Shared entry-reveal style for Option D scenes.
 * Drop onto any element inside a section that has `revealed` state
 * (from useReveal on non-sticky sections, or from an IO-triggered
 * boolean on sticky sections).
 *
 * Standard delay ladder per scene:
 *   0    — eyebrow
 *   80   — headline
 *   160  — body / subhead
 *   240+ — secondary content (stagger 80ms)
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
