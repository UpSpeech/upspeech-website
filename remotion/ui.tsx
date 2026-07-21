import type { CSSProperties, ReactNode } from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useStrings } from "./strings";

export const COLORS = {
  navy: "#293587",
  lavender: "#958AF0",
  charcoal: "#4B4E4E",
  light: "#F6F6F6",
} as const;

/** Spring-driven rise-in, the Remotion analogue of the site's reveal().
 * Plain function so it can be used inside loops; see useRise for the hook form. */
export const rise = (
  frame: number,
  fps: number,
  delay: number,
  offset = 24,
): CSSProperties => {
  const p = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
    durationInFrames: 28,
  });
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * offset}px)`,
  };
};

export const useRise = (delay: number, offset = 24): CSSProperties => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return rise(frame, fps, delay, offset);
};

/** Deterministic pseudo-random in [0, 1] so renders are reproducible. */
export const noise = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Animated audio waveform made of vertical bars. */
export const Waveform = ({
  bars = 48,
  height = 56,
  color = COLORS.lavender,
  active = true,
  seed = 1,
}: {
  bars?: number;
  height?: number;
  color?: string;
  active?: boolean;
  seed?: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <div className="flex items-center gap-[3px]" style={{ height }}>
      {Array.from({ length: bars }).map((_, i) => {
        const base = 0.25 + noise(seed + i) * 0.5;
        const wobble = active
          ? Math.sin(frame / 3.2 + i * 0.9) * 0.28 * (0.4 + noise(seed * 3 + i))
          : 0;
        const h = Math.max(0.08, Math.min(1, base + wobble));
        return (
          <div
            key={i}
            className="flex-1 rounded-full"
            style={{ height: `${h * 100}%`, backgroundColor: color }}
          />
        );
      })}
    </div>
  );
};

const NAV_KEYS = [
  "dashboard",
  "myPatients",
  "learningPaths",
  "reports",
  "recordingReviews",
  "exercises",
] as const;

type NavKey = (typeof NAV_KEYS)[number];

/** Therapist app shell: sidebar + topbar, mirrors the real product chrome. */
export const AppShell = ({
  activeKey,
  title,
  subtitle,
  topRight,
  children,
}: {
  activeKey: NavKey;
  title: string;
  subtitle?: string;
  topRight?: ReactNode;
  children: ReactNode;
}) => {
  const s = useStrings();
  return (
    <div className="absolute inset-0 flex bg-white">
      <aside className="w-[230px] shrink-0 border-r border-calm-charcoal/10 bg-calm-light/60 px-5 py-6 flex flex-col gap-7">
        <div className="flex items-center gap-2.5">
          <Img
            src={staticFile("images/logo.svg")}
            className="h-7 w-auto"
            alt=""
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-calm-navy flex items-center justify-center font-body text-xs font-bold text-white">
            SJ
          </div>
          <div>
            <div className="font-body text-[13px] font-semibold text-calm-charcoal leading-tight">
              Sarah Johnson
            </div>
            <div className="font-body text-[11px] text-calm-charcoal/55">
              {s.role}
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5">
          {NAV_KEYS.map((key) => (
            <div
              key={key}
              className={`rounded-lg px-3 py-2 font-body text-[13px] ${
                key === activeKey
                  ? "bg-calm-navy/10 font-semibold text-calm-navy"
                  : "text-calm-charcoal/65"
              }`}
            >
              {s.nav[key]}
            </div>
          ))}
        </nav>
      </aside>
      <main className="relative flex-1 px-10 py-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading text-[26px] font-bold tracking-tight text-calm-charcoal">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-1 font-body text-[13px] text-calm-charcoal/55">
                {subtitle}
              </p>
            ) : null}
          </div>
          {topRight}
        </div>
        {children}
      </main>
    </div>
  );
};

type CursorStop = { x: number; y: number; frame: number };

/** Pointer that glides between stops; pulses at `clickFrame`. */
export const Cursor = ({
  path,
  clickFrame,
}: {
  path: CursorStop[];
  clickFrame?: number;
}) => {
  const frame = useCurrentFrame();
  const xs = path.map((p) => p.x);
  const ys = path.map((p) => p.y);
  const frames = path.map((p) => p.frame);
  const x = interpolate(frame, frames, xs, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const y = interpolate(frame, frames, ys, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const clickScale =
    clickFrame === undefined
      ? 1
      : interpolate(
          frame,
          [clickFrame - 4, clickFrame, clickFrame + 6],
          [1, 0.82, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );
  const ringOpacity =
    clickFrame === undefined
      ? 0
      : interpolate(frame, [clickFrame, clickFrame + 14], [0.5, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const ringScale =
    clickFrame === undefined
      ? 0
      : interpolate(frame, [clickFrame, clickFrame + 14], [0.4, 2.2], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  return (
    <div
      className="pointer-events-none absolute z-50"
      style={{ left: x, top: y }}
    >
      <div
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full"
        style={{
          backgroundColor: COLORS.navy,
          opacity: ringOpacity,
          transform: `scale(${ringScale})`,
        }}
      />
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        style={{
          transform: `scale(${clickScale})`,
          filter: "drop-shadow(0 2px 4px rgba(41,53,135,0.35))",
        }}
      >
        <path
          d="M5 3l14 7.5-6.2 1.6L9.5 18 5 3z"
          fill="#293587"
          stroke="#fff"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
};

/** Counts from 0 to `to` as the scene plays. */
export const CountUp = ({
  to,
  delay = 0,
  duration = 40,
  suffix = "",
}: {
  to: number;
  delay?: number;
  duration?: number;
  suffix?: string;
}) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [delay, delay + duration], [0, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 2),
  });
  return (
    <>
      {Math.round(v)}
      {suffix}
    </>
  );
};
