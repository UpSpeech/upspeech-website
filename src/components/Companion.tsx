/**
 * The UpSpeech companion, as the product draws it.
 *
 * The geometry is lifted unchanged from CompanionAvatar in app-frontend: the
 * logo's two navy shapes read as a head and a torso, and the lavender shape is
 * the speech bubble. Same viewBox, same paths, same accent, so this is the
 * character the app already ships rather than a marketing lookalike.
 *
 * What is not lifted is the animation layer. The app drives nine states with
 * motion/react and AnimatePresence. Adding an animation library to a marketing
 * page for one component would be the wrong trade, and it is not how this site
 * animates anything else: the reveals, the hero trace and the intro are all CSS
 * and canvas. So the two states that earn their place here are done with two
 * stacked shapes and one keyframe pair, and the loop needs no JavaScript at all.
 *
 * The loop is the product's own subject. The bubble rests as a circle, becomes
 * a speech bubble, three dots rise, and it settles back. Six seconds, because
 * the brand is calm before all else and a character that fidgets is neither
 * calm nor professional.
 *
 * This replaces GuardianMark, which rendered at 9x15 and was too small to
 * register while still committing the page to the idea.
 */

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Rendered size in px. Below about 96 the bubble stops reading as a bubble. */
  size?: number;
  /**
   * Accessible name. Omitted, it stays decorative, which is right when the
   * copy beside it already says what the section is.
   */
  label?: string;
  className?: string;
};

// Geometry, unchanged from app-frontend/src/components/ui/CompanionAvatar.tsx.
const HEAD_D =
  "M135 214.318C135 177.382 164.942 147.439 201.878 147.439H203.638C239.602 147.439 268.756 176.594 268.756 212.558C268.756 248.522 239.602 277.676 203.638 277.676H135V214.318Z";
const TORSO_D =
  "M135 291.756H251.157C270.597 291.756 286.356 307.515 286.356 326.955V362.154C286.356 381.594 270.597 397.353 251.157 397.353H170.199C150.759 397.353 135 381.594 135 362.154V291.756Z";

// The bubble at rest: an 8-segment cubic approximation of a circle at
// (327.715, 162.399), radius ~48.4.
const BUBBLE_CIRCLE =
  "M 327.715 113.999 C 340.545 113.999 352.87 119.11 361.94 128.18 " +
  "C 371.01 137.25 376.115 149.569 376.115 162.399 C 376.115 175.229 371.01 187.55 361.94 196.62 " +
  "C 352.87 205.69 340.545 210.799 327.715 210.799 C 314.885 210.799 302.56 205.69 293.49 196.62 " +
  "C 284.42 187.55 279.316 175.229 279.316 162.399 C 279.316 149.569 284.42 137.25 293.49 128.18 " +
  "C 302.56 119.11 314.885 113.999 327.715 113.999 Z";

// Heroicons 24/solid chat-bubble-oval-left, in its native 24x24 coords and
// placed by the same transform the app uses.
const BUBBLE_SPEECH =
  "M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 " +
  "3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543" +
  "C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9" +
  "s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9" +
  "-.833 0-1.643-.097-2.417-.279" +
  "a6.721 6.721 0 0 1-4.246.997Z";
const SPEECH_TRANSFORM = "translate(243.715, 78.399) scale(7)";

/** Rising dots, sized and placed so they read as speech leaving the bubble. */
const DOTS = [
  { cx: 390, cy: 124, r: 10 },
  { cx: 415, cy: 100, r: 13 },
  { cx: 442, cy: 74, r: 17 },
];

const Companion = ({ size = 160, label, className = "" }: Props) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [onScreen, setOnScreen] = useState(false);

  // The loop only runs while it is on screen. An infinite animation is cheap to
  // composite but it never lets the tab go idle, and this sits partway down a
  // long marketing page where it is off screen most of the time. Two-way on
  // purpose, unlike the page's reveal hook, which latches once and stays true.
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
      height={size}
      // Tight to the content rather than the app's 0 0 512 512. In the app the
      // companion sits in a fixed square slot and the padding is wanted; here it
      // is a standalone mark, and the figure only spans x 135-459 and y 40-397,
      // so a quarter of the width was empty and it rendered a size smaller than
      // asked for. Square, so width and height can both take `size`.
      viewBox="112 36 370 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`companion ${onScreen ? "companion-live" : ""} ${className}`}
      {...a11y}
    >
      {/* The figure breathes. One shared group so head and torso stay joined. */}
      <g className="companion-figure">
        <path d={HEAD_D} fill="var(--companion-figure, #212540)" />
        <path d={TORSO_D} fill="var(--companion-figure, #212540)" />
      </g>

      {/* Two stacked bubbles cross-fading on one timeline: no state machine,
          no library, and nothing to keep in sync. */}
      <path
        className="companion-bubble-rest"
        d={BUBBLE_CIRCLE}
        fill="var(--companion-accent, #958af0)"
      />
      {/* Two groups, not one. A CSS transform replaces the SVG transform
          attribute rather than composing with it, so animating scale on the
          same element that carries the placement transform throws the
          placement away: the bubble rendered at a seventh of its size in the
          corner and looked like it was simply missing. Outer group places,
          inner group animates. */}
      <g transform={SPEECH_TRANSFORM}>
        <g className="companion-bubble-speak">
          <path d={BUBBLE_SPEECH} fill="var(--companion-accent, #958af0)" />
        </g>
      </g>

      {DOTS.map((d, i) => (
        <circle
          key={d.cx}
          className={`companion-dot companion-dot-${i + 1}`}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="var(--companion-accent, #958af0)"
        />
      ))}
    </svg>
  );
};

export default Companion;
