import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AppShell, Cursor, COLORS } from "../ui";

const CLICK_FRAME = 82;

const EXERCISES = [
  {
    label: "Warm-up",
    title: "Diaphragmatic breathing",
    meta: "5 min · every day",
    tone: COLORS.lavender,
  },
  {
    label: "Technique",
    title: "Easy onset drills",
    meta: "Level 2 · 10 min",
    tone: COLORS.navy,
  },
  {
    label: "Scenario",
    title: "Ordering at a cafe",
    meta: "Conversation rehearsal",
    tone: COLORS.lavender,
  },
];

const ScenePlan = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const assigned = frame >= CLICK_FRAME + 4;

  return (
    <AppShell
      active="Learning Paths"
      title="Practice plan"
      subtitle="Proposed from session data · adjusted by the therapist"
      topRight={
        <div
          className={`rounded-full px-5 py-2.5 font-body text-[13px] font-semibold text-white ${
            assigned ? "bg-celebrate-500" : "bg-calm-navy"
          }`}
        >
          {assigned ? "✓ Assigned to Miguel" : "Assign plan"}
        </div>
      }
    >
      <div className="mt-8 flex flex-col gap-5">
        {EXERCISES.map((exercise, i) => {
          const p = spring({
            frame,
            fps,
            delay: 10 + i * 12,
            config: { damping: 200 },
            durationInFrames: 28,
          });
          return (
            <div
              key={exercise.title}
              className="flex items-center justify-between rounded-2xl border border-calm-navy/10 bg-white px-7 py-8 shadow-[0_18px_40px_-28px_rgba(41,53,135,0.35)]"
              style={{
                opacity: p,
                transform: `translateX(${(1 - p) * 48}px)`,
              }}
            >
              <div className="flex items-center gap-5">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl font-heading text-base font-bold text-white"
                  style={{ backgroundColor: exercise.tone }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-calm-lavender">
                    {exercise.label}
                  </div>
                  <div className="mt-0.5 font-heading text-lg font-bold text-calm-charcoal">
                    {exercise.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body text-[13px] text-calm-charcoal/55">
                  {exercise.meta}
                </span>
                <span
                  className={`rounded-full px-3 py-1 font-body text-[11px] font-semibold ${
                    assigned
                      ? "bg-celebrate-100 text-celebrate-600"
                      : "bg-calm-light text-calm-charcoal/55"
                  }`}
                >
                  {assigned ? "Scheduled" : "Pending"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-6 font-body text-[12px] text-calm-charcoal/50"
        style={{ opacity: frame > 56 ? 1 : 0 }}
      >
        No plan is assigned without clinical review.
      </div>

      <Cursor
        path={[
          { x: 520, y: 420, frame: 50 },
          { x: 945, y: 52, frame: 76 },
        ]}
        clickFrame={CLICK_FRAME}
      />
    </AppShell>
  );
};

export default ScenePlan;
