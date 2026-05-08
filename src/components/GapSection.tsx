import { useEffect, useRef, useState } from "react";
import { EASE, reveal } from "./motion";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

// Once-a-week clinic cadence: session on Thursday
const SESSION_DAY = 3;

const GapSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setProgress(1);
      setRevealed(true);
      return;
    }

    // Entry reveal — fires once when the section starts intersecting.
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -15% 0px" },
    );
    obs.observe(el);

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const scrolled = Math.max(0, Math.min(scrollable, -rect.top));
      setProgress(scrollable > 0 ? scrolled / scrollable : 0);
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
      obs.disconnect();
    };
  }, []);

  // Choreography:
  //  0.00           both rows visible — gap is the default state
  //  0.20 → 0.75    fill the continuous row day by day
  //  0.50 → 0.85    headline swaps from 'today' to 'by design'
  //  0.80 → 0.95    footer insight fades in
  const fillContinuous = clamp01((progress - 0.2) / 0.55);
  const swap = clamp01((progress - 0.5) / 0.35);
  const footer = clamp01((progress - 0.8) / 0.15);

  const daysLit = fillContinuous * DAYS.length;
  const isFull = daysLit >= 6.95;

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 18% 20%, rgba(41,53,135,0.06), transparent 60%)",
          }}
        />

        <div className="relative h-full flex flex-col justify-center px-[max(1.5rem,5vw)]">
          <p
            className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender mb-6 sm:mb-8"
            style={reveal(revealed, 0)}
          >
            Act I · Continuous care, by design
          </p>

          {/* Swapping headlines */}
          <div
            className="relative max-w-5xl"
            style={{
              minHeight: "clamp(6rem, 12vw, 11rem)",
              ...reveal(revealed, 80),
            }}
          >
            <h2
              className="absolute top-0 left-0 right-0 font-heading font-bold text-calm-charcoal tracking-tight"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                lineHeight: 1.05,
                transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
                opacity: 1 - swap,
                transform: `translateY(${swap * -28}px)`,
              }}
            >
              A week of care, as it is today.
            </h2>
            <h2
              className="absolute top-0 left-0 right-0 font-heading font-bold text-calm-charcoal tracking-tight"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                lineHeight: 1.05,
                transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
                opacity: swap,
                transform: `translateY(${(1 - swap) * 28}px)`,
              }}
            >
              A week of care,{" "}
              <span className="text-calm-lavender">by design.</span>
            </h2>
          </div>

          {/* Two week-rows */}
          <div
            className="mt-[clamp(2.5rem,6vw,5rem)] max-w-[min(72rem,94vw)]"
            style={reveal(revealed, 160)}
          >
            {/* Traditional row */}
            <div className="mb-10 sm:mb-14">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-body text-xs font-semibold tracking-[0.22em] uppercase text-calm-charcoal/55">
                  Traditional
                </span>
                <span className="font-body text-xs sm:text-sm text-calm-charcoal/55 tabular-nums">
                  1 session · 6 days of silence
                </span>
              </div>
              <WeekRow variant="traditional" progress={1} />
            </div>

            {/* Continuous row */}
            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-body text-xs font-semibold tracking-[0.22em] uppercase text-calm-lavender">
                  With UpSpeech
                </span>
                <span
                  className={`font-body text-xs sm:text-sm tabular-nums transition-colors duration-500 ${
                    isFull
                      ? "text-calm-navy font-semibold"
                      : "text-calm-navy/90"
                  }`}
                >
                  {isFull
                    ? "1 session · Every day, continuous care"
                    : `1 session · ${Math.round(daysLit)} / 7 days of continuous care`}
                </span>
              </div>
              <WeekRow variant="continuous" progress={fillContinuous} />
            </div>
          </div>

          {/* Footer insight */}
          <div
            className="mt-[clamp(2rem,5vw,4rem)] max-w-2xl font-body text-base sm:text-xl text-calm-charcoal/70 leading-relaxed"
            style={{
              transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
              opacity: footer,
              transform: `translateY(${(1 - footer) * 20}px)`,
            }}
          >
            Not more work for the clinician.{" "}
            <span className="text-calm-navy font-semibold">
              More structure, every day.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const WeekRow = ({
  variant,
  progress,
}: {
  variant: "traditional" | "continuous";
  progress: number;
}) => {
  return (
    <div className="grid grid-cols-7 gap-2 sm:gap-3">
      {DAYS.map((day, i) => {
        const isSession = i === SESSION_DAY;
        const lit =
          variant === "traditional"
            ? isSession
              ? 1
              : 0
            : clamp01(progress * DAYS.length - i);

        return (
          <div key={day} className="flex flex-col items-center gap-2 sm:gap-3">
            <span className="font-body text-[10px] sm:text-xs font-medium tracking-wider uppercase text-calm-charcoal/40">
              {day}
            </span>
            <div
              className="relative w-full rounded-xl"
              style={{ aspectRatio: "4 / 5" }}
            >
              <div className="absolute inset-0 rounded-xl bg-calm-light border border-calm-charcoal/5" />

              {variant === "traditional" && isSession && (
                <div className="absolute inset-0 rounded-xl bg-calm-navy flex items-center justify-center">
                  <span className="font-body text-[10px] sm:text-xs font-semibold text-white">
                    Session
                  </span>
                </div>
              )}

              {variant === "continuous" && (
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    background: `linear-gradient(180deg, rgba(152,165,254,${0.85 * lit}) 0%, rgba(152,165,254,${0.55 * lit}) 100%)`,
                    transition: `background 600ms ${EASE}`,
                  }}
                >
                  {/* Mini activity bars */}
                  <div className="absolute inset-x-3 bottom-3 flex items-end gap-[2px] h-[30%]">
                    {Array.from({ length: 6 }).map((_, b) => (
                      <div
                        key={b}
                        className="flex-1 rounded-sm bg-white/80"
                        style={{
                          height: `${lit === 0 ? 0 : 35 + Math.abs(Math.sin((i + 1) * (b + 1) * 0.7)) * 60}%`,
                          opacity: lit,
                          transition: `height 500ms ${EASE}, opacity 500ms ${EASE}`,
                          transitionDelay: `${b * 40}ms`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Session + Practice stack on Thursday */}
                  {isSession && lit > 0.3 ? (
                    <div
                      className="relative z-10 flex flex-col items-center gap-1"
                      style={{
                        opacity: clamp01((lit - 0.3) / 0.4),
                      }}
                    >
                      <span className="rounded-md bg-calm-navy px-2 py-0.5 font-body text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_2px_6px_-2px_rgba(41,53,135,0.4)] ring-1 ring-white/20">
                        Session
                      </span>
                      <span className="font-body text-[10px] sm:text-xs font-semibold text-white/95">
                        + Practice
                      </span>
                    </div>
                  ) : (
                    lit > 0.4 && (
                      <span
                        className="relative z-10 font-body text-[10px] sm:text-xs font-semibold text-white"
                        style={{
                          opacity: clamp01((lit - 0.4) / 0.4),
                        }}
                      >
                        Practice
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GapSection;
