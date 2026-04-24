import { useEffect, useRef, useState } from "react";
import { EASE, reveal } from "./motion";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

type Actor = "ai" | "clinician";

type Node = {
  actor: Actor;
  verb: string; // single punchy label on the ring
  title: string;
  body: string;
};

const NODES: Node[] = [
  {
    actor: "ai",
    verb: "drafts",
    title: "AI drafts the clinical report.",
    body: "Session recording and notes turn into a structured draft — SOAP format, disfluency counts, technique use, next-step suggestions.",
  },
  {
    actor: "clinician",
    verb: "signs",
    title: "The clinician reads, edits, signs.",
    body: "Nothing leaves the platform without therapist review. Corrections feed back into the model, quietly making the next draft better.",
  },
  {
    actor: "ai",
    verb: "structures",
    title: "AI structures the practice plan.",
    body: "Based on session data and the patient's stage, UpSpeech proposes daily exercises — holding, pauses, soft starts, identification.",
  },
  {
    actor: "clinician",
    verb: "calibrates",
    title: "The clinician calibrates it.",
    body: "The therapist approves, adjusts difficulty, swaps techniques. The plan is never assigned without a clinician's judgement behind it.",
  },
  {
    actor: "ai",
    verb: "listens",
    title: "AI listens between sessions.",
    body: "Real-time fluency analysis on every practice attempt — sound, context, facial cues — building a continuous picture of progress.",
  },
  {
    actor: "clinician",
    verb: "decides",
    title: "The clinician decides what's next.",
    body: "Aggregated signal lands on the therapist's dashboard. They choose the next protocol — informed, not replaced.",
  },
];

// SVG viewBox is 100×100; geometry expressed in those units and overlaid with HTML.
const CENTER = 50;
const RADIUS = 27;
const LABEL_RADIUS = 38;

// compassDeg: 0 at top, rotates clockwise
const nodePoint = (i: number, r = RADIUS) => {
  const compassDeg = (i * 360) / NODES.length;
  const rad = (compassDeg * Math.PI) / 180;
  return {
    x: CENTER + r * Math.sin(rad),
    y: CENTER - r * Math.cos(rad),
    compassDeg,
  };
};

// Per-quadrant transform keeps label anchored OUTSIDE the ring
// so long words never cross the circumference.
const labelTransform = (compassDeg: number): string => {
  if (compassDeg < 30 || compassDeg >= 330) return "translate(-50%, -115%)";
  if (compassDeg >= 30 && compassDeg <= 150) return "translate(12%, -50%)";
  if (compassDeg > 150 && compassDeg < 210) return "translate(-50%, 15%)";
  return "translate(-112%, -50%)";
};

const labelAlignClass = (compassDeg: number): string => {
  if (compassDeg < 30 || compassDeg >= 330) return "text-center";
  if (compassDeg > 150 && compassDeg < 210) return "text-center";
  if (compassDeg >= 30 && compassDeg <= 150) return "text-left";
  return "text-right";
};

const CycleScene = () => {
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

  // Structural chrome (eyebrow, headline, labels, center, description, footer)
  // is visible from the start — the cycle reads as 'ready to go' at scroll 0
  // defaulting to step 01 (AI drafts). Scroll drives only the progression.
  const nodePhase = clamp01(progress / 0.9);
  const finalGlow = clamp01((progress - 0.9) / 0.1);

  const nodeFloat = nodePhase * NODES.length;
  const activeIndex = Math.min(
    NODES.length - 1,
    Math.max(0, Math.floor(nodeFloat)),
  );
  const active = NODES[activeIndex];
  const activeIsAI = active.actor === "ai";

  // Orbital satellite — rides the ring at the current nodeFloat position
  const orbitDeg = (nodeFloat / NODES.length) * 360;
  const orbitRad = (orbitDeg * Math.PI) / 180;
  const orbitX = CENTER + RADIUS * Math.sin(orbitRad);
  const orbitY = CENTER - RADIUS * Math.cos(orbitRad);

  // Progress arc — continuous loop drawn from top clockwise
  const circumference = 2 * Math.PI * RADIUS;
  const arcDrawn = nodePhase * circumference;

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: "380vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(900px 700px at 75% 25%, rgba(152,165,254,0.16), transparent 58%), radial-gradient(700px 600px at 12% 85%, rgba(41,53,135,0.09), transparent 60%)",
          }}
        />

        <div className="relative h-full flex flex-col justify-center px-[max(1.5rem,5vw)] py-[clamp(2rem,6vh,4rem)]">
          <p
            className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender mb-5 sm:mb-6"
            style={reveal(revealed, 0)}
          >
            Act IV · The loop
          </p>

          <h2
            className="font-heading font-bold text-calm-charcoal tracking-tight max-w-5xl mb-[clamp(1.5rem,4vh,3rem)]"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
              lineHeight: 1.05,
              ...reveal(revealed, 80),
            }}
          >
            Humans,{" "}
            <span className="text-calm-lavender">always in the loop.</span>
          </h2>

          <div
            className="grid grid-cols-1 lg:grid-cols-[1.15fr,1fr] gap-6 lg:gap-16 items-center"
            style={reveal(revealed, 160)}
          >
            {/* Cycle */}
            <div
              className="relative mx-auto aspect-square"
              style={{ width: "min(520px, 52vh, 88vw)" }}
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
                overflow="visible"
              >
                {/* Track ring */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(41,53,135,0.12)"
                  strokeWidth="0.6"
                />

                {/* Progress arc — continuous loop, from top clockwise */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill="none"
                  stroke="#98A5FE"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeDasharray={`${arcDrawn} ${circumference}`}
                  transform={`rotate(-90 ${CENTER} ${CENTER})`}
                  style={{ transition: `stroke-dasharray 450ms ${EASE}` }}
                />

                {/* Orbital satellite — subtle position indicator */}
                {nodePhase > 0 && (
                  <g style={{ transition: `transform 450ms ${EASE}` }}>
                    <circle
                      cx={orbitX}
                      cy={orbitY}
                      r={2.4}
                      fill={activeIsAI ? "#98A5FE" : "#293587"}
                      opacity={0.12}
                    />
                    <circle
                      cx={orbitX}
                      cy={orbitY}
                      r={1.1}
                      fill={activeIsAI ? "#98A5FE" : "#293587"}
                    />
                  </g>
                )}

                {/* Nodes */}
                {NODES.map((node, i) => {
                  const pos = nodePoint(i);
                  const isActive = i === activeIndex && nodePhase > 0;
                  const isPast = i < activeIndex && nodePhase > 0;
                  const lit = isActive || isPast || finalGlow > 0;
                  const isClinician = node.actor === "clinician";
                  const fill = lit
                    ? isClinician
                      ? "#293587"
                      : "#98A5FE"
                    : "#FFFFFF";
                  const stroke = isClinician ? "#293587" : "#98A5FE";
                  const r = isActive ? 5.4 : 4.3;

                  return (
                    <g key={i}>
                      {isActive && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={8.5}
                          fill={stroke}
                          opacity={0.16}
                          style={{ transition: `opacity 500ms ${EASE}` }}
                        />
                      )}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={r}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={isActive ? 1.1 : 0.85}
                        style={{
                          transition: `r 500ms ${EASE}, fill 500ms ${EASE}, stroke-width 500ms ${EASE}`,
                        }}
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 1.1}
                        textAnchor="middle"
                        style={{
                          fontSize: "3.2px",
                          fontWeight: 800,
                          fontFamily:
                            "Outfit, ui-sans-serif, system-ui, sans-serif",
                          letterSpacing: "-0.02em",
                        }}
                        fill={
                          lit
                            ? isClinician
                              ? "#FFFFFF"
                              : "#293587"
                            : "#293587"
                        }
                      >
                        {String(i + 1).padStart(2, "0")}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* HTML labels outside the ring — positioned per quadrant */}
              {NODES.map((node, i) => {
                const pos = nodePoint(i, LABEL_RADIUS);
                const isActive = i === activeIndex && nodePhase > 0;
                const isPast = i < activeIndex && nodePhase > 0;
                const lit = isActive || isPast || finalGlow > 0;
                const isClinician = node.actor === "clinician";

                return (
                  <div
                    key={`lbl-${i}`}
                    className="pointer-events-none absolute"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: labelTransform(pos.compassDeg),
                    }}
                  >
                    <div
                      className={labelAlignClass(pos.compassDeg)}
                      style={{ maxWidth: "10rem" }}
                    >
                      <div
                        className={`font-body font-bold tracking-[0.22em] uppercase ${
                          isClinician ? "text-calm-navy" : "text-calm-lavender"
                        }`}
                        style={{
                          fontSize: "clamp(9px, 0.82vw, 11px)",
                          opacity: lit ? 1 : 0.55,
                          transition: `opacity 500ms ${EASE}`,
                        }}
                      >
                        {isClinician ? "Clinician" : "AI"}
                      </div>
                      <div
                        className="font-heading font-bold tracking-tight text-calm-charcoal"
                        style={{
                          fontSize: "clamp(13px, 1.15vw, 15.5px)",
                          lineHeight: 1.1,
                          marginTop: "3px",
                          opacity: lit ? 1 : 0.4,
                          transform: isActive ? "scale(1.04)" : "scale(1)",
                          transformOrigin:
                            pos.compassDeg >= 210 && pos.compassDeg < 330
                              ? "right center"
                              : pos.compassDeg >= 30 && pos.compassDeg <= 150
                                ? "left center"
                                : "center",
                          transition: `opacity 500ms ${EASE}, transform 500ms ${EASE}`,
                        }}
                      >
                        {node.verb}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Center scoreboard — live actor readout */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div
                  className="font-body font-bold tracking-[0.35em] uppercase text-calm-charcoal/45"
                  style={{ fontSize: "clamp(10px, 0.85vw, 12px)" }}
                >
                  The loop
                </div>

                {/* Actor readout — swaps and recolors with each step */}
                <div
                  key={`actor-${activeIndex}`}
                  className="font-heading font-bold tracking-tight mt-2 mb-2.5"
                  style={{
                    fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)",
                    lineHeight: 1,
                    color: activeIsAI ? "#98A5FE" : "#293587",
                    animation: `optD-actor-swap 600ms ${EASE} both`,
                  }}
                >
                  {activeIsAI ? "AI" : "Clinician"}
                </div>

                <div
                  className="inline-flex items-center gap-2 font-body font-bold tracking-[0.3em] uppercase tabular-nums text-calm-charcoal/60"
                  style={{ fontSize: "clamp(10px, 0.85vw, 12px)" }}
                >
                  <span className="block h-px w-5 bg-calm-charcoal/30" />
                  Step {String(activeIndex + 1).padStart(2, "0")} / 06
                  <span className="block h-px w-5 bg-calm-charcoal/30" />
                </div>
              </div>
            </div>

            {/* Description panel — shows step 01 by default, swaps with scroll */}
            <div className="relative min-h-[14rem] lg:min-h-[18rem]">
              <div
                key={activeIndex}
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  animation: `optD-reveal 600ms ${EASE} both`,
                }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      active.actor === "clinician"
                        ? "bg-calm-navy"
                        : "bg-calm-lavender"
                    }`}
                  />
                  <span
                    className={`font-body text-[11px] font-bold tracking-[0.28em] uppercase ${
                      active.actor === "clinician"
                        ? "text-calm-navy"
                        : "text-calm-lavender"
                    }`}
                  >
                    {active.actor === "clinician"
                      ? "Clinician · step " +
                        (activeIndex + 1).toString().padStart(2, "0")
                      : "AI · step " +
                        (activeIndex + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="font-heading font-extrabold text-calm-charcoal tracking-tight mb-5"
                  style={{
                    fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)",
                    lineHeight: 1.1,
                  }}
                >
                  {active.title}
                </h3>
                <p className="font-body text-base sm:text-lg text-calm-charcoal/70 leading-relaxed max-w-md">
                  {active.body}
                </p>

                {/* Progress pips */}
                <div className="mt-9 flex items-center gap-1.5">
                  {NODES.map((_, i) => (
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
                            ? "#293587"
                            : i < activeIndex
                              ? "#98A5FE"
                              : "rgba(41,53,135,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Motif footer */}
          <div
            className="mt-[clamp(1.5rem,4vh,3rem)] font-body text-sm sm:text-base text-calm-charcoal/65"
            style={reveal(revealed, 320)}
          >
            <span className="font-heading font-semibold text-calm-charcoal">
              AI in the stack.
            </span>{" "}
            <span className="font-heading font-semibold text-calm-lavender">
              Clinician in the loop.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes optD-reveal {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes optD-actor-swap {
          from { opacity: 0; letter-spacing: 0.02em; transform: translateY(8px); }
          to { opacity: 1; letter-spacing: -0.02em; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default CycleScene;
