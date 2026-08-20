import { useMemo } from "react";

/**
 * A speech envelope bent into a circle.
 *
 * The page already draws speech as a horizontal trace with the silences left
 * in (see SpeechTrace). This is the same data wrapped around a centre: bars
 * radiate outward, long where someone was speaking and flat where they were
 * not, so the quiet stretches read as gaps in the ring rather than as
 * decoration.
 *
 * Built from the same seeded generator as the linear trace, so the two are the
 * same recording seen two ways, and so it never redraws differently.
 */

const BARS = 132;
const CENTER = 150;
const INNER_R = 92;
const MAX_LEN = 48;
const SEED = 20826;

/** Arcs of the ring where speech is present, as fractions of the circle. */
const SPOKEN: [number, number][] = [
  [0.015, 0.145],
  [0.19, 0.3],
  [0.35, 0.44],
  [0.53, 0.66],
  [0.71, 0.8],
  [0.85, 0.985],
];

type Bar = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  spoken: boolean;
  delay: number;
};

function buildBars(): Bar[] {
  let state = SEED >>> 0;
  const next = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };

  const bars: Bar[] = [];
  for (let i = 0; i < BARS; i++) {
    const fraction = i / BARS;
    const arc = SPOKEN.find(([from, to]) => fraction >= from && fraction <= to);
    const value = next();

    // Taper toward each end of an utterance so bursts start and stop rather
    // than switching on.
    let length = 2.5;
    if (arc) {
      const within = (fraction - arc[0]) / (arc[1] - arc[0]);
      const envelope = Math.sin(within * Math.PI) ** 0.5;
      length = 5 + (0.25 + value * 0.75) * envelope * MAX_LEN;
    }

    // Start at 12 o'clock and go clockwise.
    const angle = fraction * Math.PI * 2 - Math.PI / 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    bars.push({
      x1: CENTER + cos * INNER_R,
      y1: CENTER + sin * INNER_R,
      x2: CENTER + cos * (INNER_R + length),
      y2: CENTER + sin * (INNER_R + length),
      spoken: Boolean(arc),
      delay: Math.round(fraction * 900),
    });
  }
  return bars;
}

type Props = {
  size?: number;
  className?: string;
  /** Play the one-off draw-in. Ambient rotation runs either way. */
  intro?: boolean;
  label?: string;
  children?: React.ReactNode;
};

const SpeechRing = ({
  size = 300,
  className = "",
  intro = false,
  label,
  children,
}: Props) => {
  const bars = useMemo(buildBars, []);

  return (
    <div
      className={`speech-ring relative ${intro ? "speech-ring--intro" : ""} ${className}`}
      style={{ width: size, height: size }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg
        viewBox="0 0 300 300"
        className="speech-ring__svg block h-full w-full"
      >
        <g>
          {bars.map((bar, i) => (
            <line
              key={i}
              className={
                bar.spoken
                  ? "speech-ring__bar"
                  : "speech-ring__bar speech-ring__bar--quiet"
              }
              x1={bar.x1}
              y1={bar.y1}
              x2={bar.x2}
              y2={bar.y2}
              style={{ "--bar-delay": `${bar.delay}ms` } as React.CSSProperties}
            />
          ))}
        </g>
      </svg>
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default SpeechRing;
