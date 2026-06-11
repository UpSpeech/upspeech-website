import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AppShell, Waveform, useRise, COLORS } from "../ui";

const SAVE_FRAME = 34;

const STEPS = [
  { label: "Recording uploaded", done: 44 },
  { label: "Transcribed", done: 66 },
  { label: "Speech events analysed", done: 88 },
];

const TAGS = ["Block", "Easy onset", "Prolongation", "Calm finish"];

const SceneRecording = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const saved = frame >= SAVE_FRAME;
  const seconds = 31 * 60 + 42 + Math.floor(Math.min(frame, SAVE_FRAME) / 30);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const recPulse = 0.5 + 0.5 * Math.sin(frame / 6);

  return (
    <AppShell
      active="Recording Reviews"
      title="Session recording"
      subtitle="Miguel A. · Weekly session"
      topRight={
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 ${
            saved ? "bg-celebrate-500" : "bg-calm-navy"
          }`}
          style={useRise(4, 12)}
        >
          {!saved && (
            <span
              className="h-2 w-2 rounded-full bg-red-400"
              style={{ opacity: 0.5 + recPulse * 0.5 }}
            />
          )}
          <span className="font-body text-[13px] font-semibold tabular-nums text-white">
            {saved ? "✓ Saved · 32 min" : `${mm}:${ss}`}
          </span>
        </div>
      }
    >
      <div className="mt-7 grid h-[520px] grid-cols-[1.5fr,1fr] gap-6">
        <div className="h-full" style={useRise(8)}>
          <div className="relative h-full overflow-hidden rounded-2xl bg-calm-charcoal">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(420px 320px at 50% 42%, rgba(152,165,254,0.28), transparent 70%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/10 font-heading text-4xl font-bold text-white">
                MA
              </div>
              <div className="font-body text-base text-white/75">Miguel A.</div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
              <Waveform
                bars={56}
                height={36}
                color="#ffffff"
                seed={7}
                active={!saved}
              />
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col gap-4">
          <div
            className="flex-1 rounded-2xl border border-calm-navy/10 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(41,53,135,0.3)]"
            style={useRise(18)}
          >
            <div className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-calm-lavender">
              After the session
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {STEPS.map((step, i) => {
                const done = frame >= step.done;
                const pop = spring({
                  frame,
                  fps,
                  delay: step.done,
                  config: { damping: 13, stiffness: 180 },
                  durationInFrames: 20,
                });
                return (
                  <div
                    key={step.label}
                    className="flex items-center gap-3"
                    style={{ opacity: frame > SAVE_FRAME + i * 6 ? 1 : 0.25 }}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full font-body text-[12px] font-bold ${
                        done
                          ? "bg-celebrate-500 text-white"
                          : "border-2 border-calm-navy/20 bg-white"
                      }`}
                      style={
                        done
                          ? { transform: `scale(${0.7 + pop * 0.3})` }
                          : undefined
                      }
                    >
                      {done ? "✓" : ""}
                    </span>
                    <span
                      className={`font-body text-[15px] ${
                        done
                          ? "font-semibold text-calm-charcoal"
                          : "text-calm-charcoal/55"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="rounded-2xl border border-calm-navy/10 bg-calm-light/70 p-6"
            style={useRise(30)}
          >
            <div className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-calm-charcoal/50">
              Detected in this recording
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full border border-calm-navy/15 bg-white px-2.5 py-1 font-body text-[11px] font-medium text-calm-charcoal/75"
                  style={{
                    opacity: frame > 90 + i * 6 ? 1 : 0,
                    color: i === 0 ? COLORS.navy : undefined,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default SceneRecording;
