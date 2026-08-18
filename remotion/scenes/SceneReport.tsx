import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AppShell, Cursor, useRise } from "../ui";
import { useStrings } from "../strings";

const CLICK_FRAME = 102;

const SECTIONS = [
  {
    lines: [0.95, 0.88, 0.6],
    start: 18,
  },
  {
    lines: [0.9, 0.72],
    start: 44,
  },
  {
    lines: [0.85, 0.78, 0.5],
    start: 66,
  },
];

const SceneReport = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = useStrings();
  const ready = frame >= CLICK_FRAME + 4;
  const badgePop = spring({
    frame,
    fps,
    delay: CLICK_FRAME + 4,
    config: { damping: 14, stiffness: 180 },
    durationInFrames: 24,
  });

  return (
    <AppShell
      activeKey="reports"
      title={s.report.title}
      subtitle={s.report.subtitle}
      topRight={
        <div className="relative" style={useRise(6, 12)}>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-body text-[12px] font-bold uppercase tracking-[0.14em] ${
              ready
                ? "bg-celebrate-100 text-celebrate-600"
                : "bg-warm-100 text-warm-500"
            }`}
            style={
              ready
                ? { transform: `scale(${0.8 + badgePop * 0.2})` }
                : undefined
            }
          >
            {ready ? s.report.ready : s.report.draft}
          </span>
        </div>
      }
    >
      <div
        className="mt-7 rounded-2xl border border-calm-navy/10 bg-white p-10 shadow-[0_18px_40px_-24px_rgba(41,53,135,0.3)]"
        style={useRise(8)}
      >
        <div className="flex flex-col gap-8">
          {SECTIONS.map((section, si) => (
            <div key={s.report.sections[si]}>
              <div
                className="font-heading text-[17px] font-bold text-calm-charcoal"
                style={{ opacity: frame > section.start ? 1 : 0 }}
              >
                {s.report.sections[si]}
              </div>
              <div className="mt-3 flex flex-col gap-3">
                {section.lines.map((width, i) => {
                  const start = section.start + 6 + i * 7;
                  const grow = interpolate(frame, [start, start + 16], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: (t) => 1 - Math.pow(1 - t, 3),
                  });
                  return (
                    <div
                      key={i}
                      className="h-3.5 rounded-full bg-calm-navy/10"
                      style={{ width: `${width * grow * 100}%` }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-calm-charcoal/10 pt-7">
          <span className="font-body text-[12px] text-calm-charcoal/50">
            {s.report.reassurance}
          </span>
          <div
            className={`rounded-full px-5 py-2.5 font-body text-[13px] font-semibold text-white ${
              ready ? "bg-celebrate-500" : "bg-calm-navy"
            }`}
            style={{ opacity: frame > 80 ? 1 : 0.001 }}
          >
            {ready ? s.report.readyToShare : s.report.markReady}
          </div>
        </div>
      </div>

      <Cursor
        path={[
          { x: 420, y: 560, frame: 70 },
          { x: 885, y: 592, frame: 96 },
        ]}
        clickFrame={CLICK_FRAME}
      />
    </AppShell>
  );
};

export default SceneReport;
