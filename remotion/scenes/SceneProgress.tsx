import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AppShell, CountUp, noise, rise, useRise } from "../ui";
import { useStrings } from "../strings";

const STATS = [
  { value: 6, suffix: "/7" },
  { value: 18, suffix: "" },
  { value: 54, suffix: " min" },
  { value: 7, suffix: "" },
];

const SceneProgress = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = useStrings();

  return (
    <AppShell
      activeKey="myPatients"
      title={s.progress.title}
      subtitle={s.progress.subtitle}
      topRight={
        <div
          className="rounded-full bg-calm-lavender/15 px-4 py-2 font-body text-[12px] font-semibold text-calm-navy"
          style={useRise(8, 10)}
        >
          {s.progress.nextSession}
        </div>
      }
    >
      <div className="mt-7 grid grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div
            key={s.progress.stats[i]}
            className="rounded-2xl border border-calm-navy/10 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(41,53,135,0.35)]"
            style={rise(frame, fps, 8 + i * 8)}
          >
            <div className="font-heading text-[30px] font-bold leading-none tabular-nums text-calm-navy">
              <CountUp
                to={stat.value}
                delay={14 + i * 8}
                suffix={stat.suffix}
              />
            </div>
            <div className="mt-2 font-body text-[12px] text-calm-charcoal/60">
              {s.progress.stats[i]}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-5 rounded-2xl border border-calm-navy/10 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(41,53,135,0.35)]"
        style={useRise(36)}
      >
        <div className="flex items-center justify-between">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-calm-charcoal/50">
            {s.progress.dailyPractice}
          </span>
          <span className="font-body text-[12px] text-calm-charcoal/50">
            {s.progress.monToSun}
          </span>
        </div>
        <div className="mt-4 flex h-[240px] items-end gap-3">
          {Array.from({ length: 14 }).map((_, i) => {
            const target = 0.3 + noise(i * 3 + 2) * 0.65;
            const grow = interpolate(frame, [44 + i * 3, 70 + i * 3], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: (t) => 1 - Math.pow(1 - t, 3),
            });
            const isSession = i === 10;
            return (
              <div
                key={i}
                className={`flex-1 rounded-t-lg ${
                  isSession ? "bg-calm-navy" : "bg-calm-lavender/70"
                }`}
                style={{ height: `${target * grow * 100}%` }}
              />
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};

export default SceneProgress;
