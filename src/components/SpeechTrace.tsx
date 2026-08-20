import { useEffect, useRef } from "react";

/**
 * A speech envelope with the silences left in.
 *
 * The app records people speaking and marks where they got stuck, so this is
 * the product's own raw material rather than a decorative waveform: the bursts
 * are days something was recorded, the flat runs are the days nothing was.
 *
 * Drawn on canvas because the bar count depends on the rendered width, and
 * hand-authored SVG for ~250 bars would have to be regenerated on every
 * breakpoint. Deterministic (seeded), so it never redraws differently.
 */

const ACTIVE_BY_VARIANT: Record<string, [number, number][]> = {
  // One session, then nothing until the next one.
  gap: [
    [0.02, 0.12],
    [0.88, 0.98],
  ],
  // A session plus practice on every day between.
  continuous: [
    [0.02, 0.12],
    [0.18, 0.27],
    [0.32, 0.41],
    [0.46, 0.55],
    [0.6, 0.69],
    [0.74, 0.83],
    [0.88, 0.98],
  ],
  // One recording rather than a week of them: phrases of uneven length with
  // breaths between. The spacing is deliberately irregular, because evenly
  // spaced bursts read as a chart and this one has to read as someone talking.
  utterance: [
    [0.03, 0.14],
    [0.19, 0.36],
    [0.41, 0.47],
    [0.52, 0.71],
    [0.77, 0.84],
    [0.88, 0.99],
  ],
};

const SEED_BY_VARIANT: Record<string, number> = {
  gap: 20826,
  continuous: 719,
  utterance: 4711,
};

type Props = {
  variant?: "gap" | "continuous" | "utterance";
  /** Rendered height in CSS pixels. */
  height?: number;
  className?: string;
  /** Colour of the bars where speech is present. */
  activeColor?: string;
  /** Colour of the flat line across the silences. */
  silentColor?: string;
  label: string;
};

const SpeechTrace = ({
  variant = "gap",
  height = 64,
  className = "",
  activeColor = "#6866C4",
  silentColor = "rgba(75,78,78,0.22)",
  label,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const active = ACTIVE_BY_VARIANT[variant];
    const seed = SEED_BY_VARIANT[variant];

    const draw = () => {
      const width = canvas.clientWidth;
      if (!width) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const mid = height / 2;
      const step = 4;
      const barWidth = 2;
      const bars = Math.floor(width / step);

      // Linear congruential generator. Math.random would give a different
      // trace on every resize, which reads as noise rather than a recording.
      let state = seed >>> 0;
      const next = () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 4294967296;
      };

      for (let i = 0; i < bars; i++) {
        const fraction = i / bars;
        const burst = active.find(
          ([from, to]) => fraction >= from && fraction <= to,
        );
        const value = next();
        const x = i * step;

        if (burst) {
          // Taper toward each end of a burst so it reads as an utterance
          // starting and stopping, not a block of noise.
          const within = (fraction - burst[0]) / (burst[1] - burst[0]);
          const envelope = Math.sin(within * Math.PI) ** 0.45;
          const amplitude = (0.28 + value * 0.72) * envelope * (mid - 3);
          ctx.fillStyle = activeColor;
          ctx.fillRect(x, mid - amplitude, barWidth, amplitude * 2);
        } else {
          ctx.fillStyle = silentColor;
          ctx.fillRect(x, mid - 0.75, barWidth, 1.5);
        }
      }
    };

    draw();

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    // Web fonts do not affect the trace, but a late layout shift changes the
    // canvas width, and ResizeObserver is what catches that.
    return () => observer.disconnect();
  }, [variant, height, activeColor, silentColor]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={`block w-full ${className}`}
      style={{ height }}
    />
  );
};

export default SpeechTrace;
