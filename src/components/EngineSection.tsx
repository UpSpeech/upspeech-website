import { useEffect, useRef, useState } from "react";
import { useReveal } from "./useReveal";
import { useT, useLocale, localizedAsset } from "@/i18n";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const EngineSection = () => {
  const t = useT().home.engine;
  const locale = useLocale();
  const poster = localizedAsset("/videos/annotation-tool.jpg", locale);
  const videoWebm = localizedAsset("/videos/annotation-tool.webm", locale);
  const videoMp4 = localizedAsset("/videos/annotation-tool.mp4", locale);
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.25 });
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  // The tags are the labels clinicians place on a recording, so scroll drives a
  // playhead across them rather than fading all six in on a timer.
  //
  // Measured from the track, not the section. The track sits about 1100px below
  // the section top on a phone, so driving this off the section ran the whole
  // playhead before the track was ever on screen.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the track enters at the bottom, 1 by the time it is 45% up
      setProgress(clamp01((vh - rect.top) / (vh * 0.55)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const playhead = clamp01((progress - 0.15) / 0.7);
  const tagCount = t.tags.length;

  const textStyle = (delay: number): React.CSSProperties => ({
    transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
    transitionDelay: `${delay}ms`,
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section className="relative bg-calm-charcoal overflow-hidden py-[clamp(3.25rem,10vw,10rem)] px-[max(1.5rem,5vw)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(900px 600px at 88% 8%, rgba(152,165,254,0.22), transparent 58%), radial-gradient(1200px 900px at 3% 100%, rgba(41,53,135,0.55), transparent 65%)",
        }}
      />

      <div ref={ref} className="relative max-w-6xl">
        <p
          className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender-bright mb-6 sm:mb-8"
          style={textStyle(0)}
        >
          {t.eyebrow}
        </p>
        <h2
          className="font-heading font-bold text-white tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            ...textStyle(80),
          }}
        >
          {t.headlineLine1} <br />
          <span className="text-calm-lavender-bright">{t.headlineLine2}</span>
        </h2>

        <p
          className="mt-8 max-w-2xl font-body text-base sm:text-lg text-white/70 leading-relaxed"
          style={textStyle(160)}
        >
          {t.body}
        </p>

        <div
          className="mt-[clamp(3rem,6vw,5rem)] max-w-5xl"
          style={{
            transition: `opacity 1200ms ${EASE}, transform 1200ms ${EASE}`,
            transitionDelay: "280ms",
            opacity: revealed ? 1 : 0,
            transform: revealed
              ? "translateY(0) scale(1)"
              : "translateY(40px) scale(0.98)",
          }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-white/5 bg-calm-charcoal">
              {revealed ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  poster={poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  aria-label={t.videoAriaLabel}
                >
                  <source src={videoWebm} type="video/webm" />
                  <source src={videoMp4} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={poster}
                  alt={t.videoAriaLabel}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
            {/* Playhead across the recording. Each mark is where a label gets
                placed, and the label lands as the head reaches it. */}
            <div
              ref={trackRef}
              className="relative mt-5 h-1 rounded-full bg-white/10"
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-calm-lavender/80"
                style={{ width: `${playhead * 100}%` }}
              />
              {t.tags.map((tag, i) => {
                const passed = playhead * tagCount > i + 0.5;
                return (
                  <span
                    key={tag}
                    className="absolute top-1/2 h-2 w-2 rounded-full"
                    style={{
                      left: `${((i + 0.5) / tagCount) * 100}%`,
                      background: passed ? "#ede9fe" : "rgba(255,255,255,0.22)",
                      transform: `translate(-50%,-50%) scale(${passed ? 1.3 : 1})`,
                      transition: `background 350ms ${EASE}, transform 350ms ${EASE}`,
                    }}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.tags.map((tag, i) => {
                const lit = clamp01(playhead * tagCount - i);
                return (
                  <span
                    key={tag}
                    className="rounded-full border bg-white/5 px-2.5 py-1 font-body text-[11px] font-medium text-white/75"
                    style={{
                      transition: `opacity 450ms ${EASE}, transform 450ms ${EASE}, border-color 450ms ${EASE}`,
                      opacity: lit,
                      transform: `translateY(${(1 - lit) * 8}px)`,
                      borderColor:
                        lit > 0.9
                          ? "rgba(237,233,254,0.35)"
                          : "rgba(255,255,255,0.1)",
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineSection;
