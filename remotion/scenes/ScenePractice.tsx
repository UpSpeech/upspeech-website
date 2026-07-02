import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Waveform, useRise } from "../ui";
import { useStrings } from "../strings";

/** Patient view: practising at home between sessions. */
const ScenePractice = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = useStrings();
  const DAYS = s.practice.days;

  const SENT_FRAME = 84;
  const sent = frame >= SENT_FRAME;
  const recPulse = 0.5 + 0.5 * Math.sin(frame / 5);
  const chipPop = spring({
    frame,
    fps,
    delay: SENT_FRAME,
    config: { damping: 13, stiffness: 170 },
    durationInFrames: 24,
  });

  return (
    <div className="absolute inset-0 bg-calm-light">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 500px at 80% 0%, rgba(152,165,254,0.22), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-24">
        <div className="w-full max-w-[760px]">
          <div style={useRise(4, 14)}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-calm-lavender">
                  {s.practice.eyebrow}
                </div>
                <h2 className="mt-2 font-heading text-[30px] font-bold tracking-tight text-calm-charcoal">
                  {s.practice.technique}
                </h2>
              </div>
              <div className="flex gap-1.5">
                {DAYS.map((d, i) => {
                  const lit = frame > 96 + i * 4 && i < 5;
                  return (
                    <div
                      key={i}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg font-body text-[11px] font-semibold ${
                        lit
                          ? "bg-calm-lavender text-white"
                          : "bg-white text-calm-charcoal/40 border border-calm-charcoal/10"
                      }`}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="mt-6 rounded-2xl border border-calm-navy/10 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(41,53,135,0.4)]"
            style={useRise(14)}
          >
            <div className="font-body text-[15px] leading-relaxed text-calm-charcoal/80">
              "{s.practice.quotePre}
              <span className="font-semibold text-calm-navy">
                {s.practice.quoteBold}
              </span>
              "
            </div>
            <div className="mt-5 rounded-xl bg-calm-light px-5 py-4">
              <Waveform bars={64} height={40} seed={11} active={!sent} />
            </div>
            <div className="mt-5 flex h-9 items-center justify-between">
              {!sent ? (
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-red-400"
                    style={{ opacity: 0.4 + recPulse * 0.6 }}
                  />
                  <span className="font-body text-[13px] font-semibold text-calm-charcoal/60">
                    {s.practice.recording}
                  </span>
                </div>
              ) : (
                <div
                  className="rounded-full bg-celebrate-100 px-4 py-2 font-body text-[13px] font-semibold text-celebrate-600"
                  style={{
                    opacity: chipPop,
                    transform: `scale(${0.7 + chipPop * 0.3})`,
                  }}
                >
                  {s.practice.sent}
                </div>
              )}
              <span className="font-body text-[12px] text-calm-charcoal/45">
                {s.practice.attempt}
              </span>
            </div>
          </div>

          <div
            className="mt-5 text-center font-body text-[12px] text-calm-charcoal/50"
            style={useRise(30, 10)}
          >
            {s.practice.footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenePractice;
