import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useStrings } from "../strings";

/** Timeline positions 0..1 where a clinician places each tag. */
const TAG_X = [0.16, 0.34, 0.52, 0.7, 0.86];

const PLAY_START = 14;
const PLAY_END = 104;

/** UpSpeech Labs: speech-language pathologists tag recordings frame by frame. */
const SceneAnnotation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = useStrings();
  const TAGS = TAG_X.map((x, i) => ({ label: s.annotation.tags[i], x }));

  const progress = interpolate(frame, [PLAY_START, PLAY_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const intro = (delay: number) =>
    spring({
      frame,
      fps,
      delay,
      config: { damping: 200 },
      durationInFrames: 26,
    });

  return (
    <div className="absolute inset-0 overflow-hidden bg-calm-charcoal">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(900px 600px at 88% 8%, rgba(152,165,254,0.22), transparent 58%), radial-gradient(1200px 900px at 3% 100%, rgba(41,53,135,0.55), transparent 65%)",
        }}
      />

      <div className="relative flex h-full flex-col justify-center px-24">
        <div
          className="font-body text-[12px] font-semibold uppercase tracking-[0.3em] text-calm-lavender"
          style={{ opacity: intro(2) }}
        >
          {s.annotation.labs}
        </div>
        <h2
          className="mt-3 font-heading text-[34px] font-bold tracking-tight text-white"
          style={{
            opacity: intro(8),
            transform: `translateY(${(1 - intro(8)) * 18}px)`,
          }}
        >
          {s.annotation.headline}
        </h2>

        <div
          className="mt-7 rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
          style={{
            opacity: intro(16),
            transform: `translateY(${(1 - intro(16)) * 28}px)`,
          }}
        >
          <div className="grid grid-cols-[1.4fr,1fr] gap-5">
            {/* Recording under review */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-white/5 bg-calm-charcoal">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(360px 280px at 50% 40%, rgba(152,165,254,0.26), transparent 70%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 font-heading text-3xl font-bold text-white">
                  MA
                </div>
                <div className="font-body text-sm text-white/70">Miguel A.</div>
              </div>

              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-calm-lavender" />
                <span className="font-body text-[11px] font-semibold text-white/80">
                  {s.annotation.annotating}
                </span>
              </div>

              {/* Timeline + clinician-placed markers */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="relative h-2 rounded-full bg-white/15">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-calm-lavender/70"
                    style={{ width: `${progress * 100}%` }}
                  />
                  {TAGS.map((tag) => {
                    const placed = progress >= tag.x;
                    const pop = spring({
                      frame,
                      fps,
                      delay: PLAY_START + tag.x * (PLAY_END - PLAY_START),
                      config: { damping: 13, stiffness: 180 },
                      durationInFrames: 18,
                    });
                    return (
                      <div
                        key={tag.label}
                        className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-calm-charcoal bg-white"
                        style={{
                          left: `${tag.x * 100}%`,
                          opacity: placed ? 1 : 0.15,
                          transform: `translate(-50%, -50%) scale(${
                            placed ? 0.7 + pop * 0.3 : 0.7
                          })`,
                        }}
                      />
                    );
                  })}
                  {/* Playhead */}
                  <div
                    className="absolute top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-white"
                    style={{ left: `${progress * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tag list the clinician applies */}
            <div className="flex flex-col">
              <div className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                {s.annotation.tagged}
              </div>
              <div className="mt-3 flex flex-col gap-2.5">
                {TAGS.map((tag) => {
                  const placed = progress >= tag.x;
                  return (
                    <div
                      key={tag.label}
                      className="flex items-center gap-2.5"
                      style={{ opacity: placed ? 1 : 0.3 }}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full font-body text-[11px] font-bold ${
                          placed
                            ? "bg-calm-lavender text-calm-charcoal"
                            : "border border-white/20"
                        }`}
                      >
                        {placed ? "✓" : ""}
                      </span>
                      <span
                        className={`font-body text-[14px] ${
                          placed ? "font-semibold text-white" : "text-white/50"
                        }`}
                      >
                        {tag.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto flex items-center gap-2.5 pt-5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-calm-navy font-body text-[11px] font-bold text-white">
                  SJ
                </div>
                <span className="font-body text-[12px] text-white/55">
                  {s.annotation.clinician}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-5 max-w-2xl font-body text-[13px] text-white/55"
          style={{ opacity: intro(22) }}
        >
          {s.annotation.body}
        </div>
      </div>
    </div>
  );
};

export default SceneAnnotation;
