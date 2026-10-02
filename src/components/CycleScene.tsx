import { useEffect, useRef, useState } from "react";
import { ArrowUturnUpIcon } from "@heroicons/react/24/outline";
import { EASE, reveal } from "./motion";
import HandoffScene, { type Actor } from "./HandoffScene";
import { useT } from "@/i18n";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/**
 * The sticky panel's height, and the scroll runway below it. The section is
 * the sum of the two.
 *
 * The panel fills the viewport under the header. It was briefly capped at 40rem
 * with a 24rem runway to buy back scroll depth, and at that size the section is
 * the shortest thing on a long homepage: the diagram it holds is the argument
 * the whole page is making, and it went past faster than the sections either
 * side of it. The panel is worth a screen.
 *
 * Both values feed the progress math below, so they have to stay here rather
 * than becoming Tailwind classes: the height the panel actually renders at is
 * the divisor. svh rather than vh because the panel is pinned, so a mobile
 * toolbar collapsing mid-scroll would otherwise resize it under the reader.
 */
const PANEL_H = "calc(100svh - 5rem)";
const RUNWAY = "100svh";
/** Matches `sticky top-20`, which clears the fixed header. */
const STICKY_TOP = 80;

// Actor sequence stays in code (drives colors/geometry); verb/title/body copy
// comes from the dictionary by index (home.cycle.nodes).
const NODE_ACTORS: Actor[] = [
  "ai",
  "clinician",
  "ai",
  "clinician",
  "ai",
  "clinician",
];

// The phone list's ring: viewBox 100×100, nodes clockwise from the top.
const CENTER = 50;
const RADIUS = 27;

const nodePoint = (i: number, r = RADIUS) => {
  const compassDeg = (i * 360) / NODE_ACTORS.length;
  const rad = (compassDeg * Math.PI) / 180;
  return {
    x: CENTER + r * Math.sin(rad),
    y: CENTER - r * Math.cos(rad),
  };
};

const PinnedCycle = () => {
  const t = useT().home.cycle;
  const nodes = t.nodes;
  const containerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
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
      if (!el.offsetParent) return;
      const rect = el.getBoundingClientRect();
      // Measure the panel rather than assuming it fills the viewport. The
      // pinned range runs from rect.top === STICKY_TOP down to the point where
      // the section bottom meets the panel bottom, so the runway is exactly
      // the section height minus the panel height.
      const panelH = panelRef.current?.offsetHeight ?? window.innerHeight;
      const scrollable = rect.height - panelH;
      const scrolled = Math.max(0, Math.min(scrollable, STICKY_TOP - rect.top));
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

  // Step 01 shows from scroll 0; scrolling only advances the step.
  const nodePhase = clamp01(progress / 0.9);

  const nodeFloat = nodePhase * NODE_ACTORS.length;
  const activeIndex = Math.min(
    NODE_ACTORS.length - 1,
    Math.max(0, Math.floor(nodeFloat)),
  );
  const activeActor = NODE_ACTORS[activeIndex];
  const active = nodes[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative hidden bg-white lg:block"
      style={{ height: `calc(${PANEL_H} + ${RUNWAY})` }}
    >
      {/* min-height, not height: a fixed height with overflow hidden would
          cut the scene or the copy where the six steps run taller than the
          viewport. */}
      <div
        ref={panelRef}
        className="sticky top-20 overflow-hidden"
        style={{ minHeight: PANEL_H }}
      >
        <div
          className="gutter relative flex w-full flex-col justify-center py-[clamp(2rem,6vh,4rem)]"
          style={{ minHeight: PANEL_H }}
        >
          <h2
            className="t-h2 font-heading font-bold text-calm-navy tracking-tight max-w-5xl mb-[clamp(1.25rem,3vh,2rem)]"
            style={{ ...reveal(revealed, 80) }}
          >
            {t.headlinePrefix} {t.headlineEmphasis}
          </h2>

          <div
            className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-6 lg:gap-16 items-center"
            style={reveal(revealed, 160)}
          >
            <HandoffScene
              activeIndex={activeIndex}
              labels={{ ai: t.ai, clinician: t.clinician }}
              states={t.states}
              docs={t.docs}
            />

            {/* Description panel, shows step 01 by default, swaps with scroll */}
            {/* The copy is absolutely positioned so steps cross-fade in place, so
                this box must fit the tallest step in the longest language:
                321px at 1440 (en), plus headroom. */}
            <div className="relative min-h-[15rem] lg:min-h-[22rem]">
              <div
                key={activeIndex}
                className="absolute inset-0 flex flex-col justify-start"
                style={{
                  animation: `optD-reveal 600ms ${EASE} both`,
                }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      activeActor === "clinician"
                        ? "bg-calm-navy"
                        : "bg-calm-lavender"
                    }`}
                  />
                  <span
                    className={`font-body t-eyebrow ${
                      activeActor === "clinician"
                        ? "text-calm-navy"
                        : "text-calm-lavender-ink"
                    }`}
                  >
                    {activeActor === "clinician"
                      ? t.clinicianStepPrefix +
                        (activeIndex + 1).toString().padStart(2, "0")
                      : t.aiStepPrefix +
                        (activeIndex + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <h3 className="t-h2-sm font-heading font-extrabold text-calm-navy tracking-tight mb-5">
                  {active.title}
                </h3>
                <p className="t-lead font-body text-calm-charcoal/80 leading-relaxed max-w-md">
                  {active.body}
                </p>

                {/* Progress pips */}
                <div className="mt-9 flex items-center gap-1.5">
                  {NODE_ACTORS.map((_, i) => (
                    <span
                      key={i}
                      className="block h-1 rounded-full transition-all duration-500"
                      style={{
                        width:
                          i === activeIndex
                            ? "2.5rem"
                            : i < activeIndex
                              ? "1.25rem"
                              : "0.5rem",
                        backgroundColor:
                          i === activeIndex
                            ? NODE_ACTORS[i] === "ai"
                              ? "#6866C4"
                              : "#293587"
                            : i < activeIndex
                              ? "rgba(41,53,135,0.35)"
                              : "rgba(41,53,135,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes optD-reveal {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

// Below lg the section is a plain list. A pinned panel with a runway needs a
// viewport taller than the scene plus the copy, which a phone does not have.
const StepList = () => {
  const t = useT().home.cycle;
  return (
    <section className="relative bg-white py-[clamp(3rem,8vw,5rem)] lg:hidden">
      <div className="gutter">
        <h2 className="t-h2 font-heading font-bold text-calm-navy tracking-tight">
          {t.headlinePrefix} {t.headlineEmphasis}
        </h2>

        <svg
          viewBox="0 0 100 100"
          className="mx-auto mt-6 w-[min(12rem,56vw)]"
          aria-hidden="true"
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#958AF0"
            strokeWidth="1.1"
          />
          {NODE_ACTORS.map((actor, i) => {
            const pos = nodePoint(i);
            const isClinician = actor === "clinician";
            return (
              <g key={i}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={7}
                  fill={isClinician ? "#293587" : "#958AF0"}
                />
                <text
                  x={pos.x}
                  y={pos.y + 1.8}
                  textAnchor="middle"
                  fill={isClinician ? "#FFFFFF" : "#293587"}
                  style={{
                    fontSize: "5px",
                    fontWeight: 800,
                    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </svg>

        <ol className="mt-8">
          {t.nodes.map((node, i) => {
            const isClinician = NODE_ACTORS[i] === "clinician";
            const n = String(i + 1).padStart(2, "0");
            return (
              <li
                key={i}
                className={`relative flex gap-4 ${i === 0 ? "" : "mt-9"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-[17px] top-9 -bottom-9 w-0.5 ${
                    isClinician ? "bg-calm-navy/25" : "bg-calm-lavender/60"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-heading text-sm font-extrabold tabular-nums ${
                    isClinician
                      ? "bg-calm-navy text-white"
                      : "bg-calm-lavender text-calm-navy"
                  }`}
                >
                  {n}
                </span>
                <div>
                  <p
                    className={`font-body t-eyebrow ${
                      isClinician ? "text-calm-navy" : "text-calm-lavender-ink"
                    }`}
                  >
                    {(isClinician ? t.clinicianStepPrefix : t.aiStepPrefix) + n}
                  </p>
                  <h3 className="mt-2 t-h2-sm font-heading font-extrabold text-calm-navy tracking-tight">
                    {node.title}
                  </h3>
                  <p className="mt-2 max-w-[60ch] font-body t-lead text-calm-charcoal/80 leading-relaxed">
                    {node.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="relative mt-9 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center text-calm-navy"
          >
            <ArrowUturnUpIcon className="h-4 w-4" />
          </span>
          <p className="font-body t-small font-semibold text-calm-charcoal/80">
            {t.backToStart}
          </p>
        </div>
      </div>
    </section>
  );
};

const CycleScene = () => (
  <>
    <StepList />
    <PinnedCycle />
  </>
);

export default CycleScene;
