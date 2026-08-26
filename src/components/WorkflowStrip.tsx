import { useReveal } from "./useReveal";
import { reveal } from "./motion";

type Step = {
  phase: string;
  role: string;
  copy: string;
};

const STEPS: Step[] = [
  {
    phase: "Before the session",
    role: "Patient + platform",
    copy: "The patient practices the plan you set. You walk in knowing what they did since the last visit.",
  },
  {
    phase: "During the session",
    role: "Clinician",
    copy: "You run the session. UpSpeech records it if you want, so nothing is lost to note-taking.",
  },
  {
    phase: "After the session",
    role: "Platform + therapist",
    copy: "A draft report is ready for you to review and sign off. You adjust the plan; the patient keeps practicing.",
  },
];

const WorkflowStrip = () => {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="relative bg-calm-light px-[max(1.5rem,5vw)] py-[clamp(3.5rem,7vw,6rem)]">
      <div ref={ref} className="relative max-w-6xl mx-auto">
        <p
          className="font-body t-eyebrow text-calm-lavender-ink"
          style={reveal(revealed, 0)}
        >
          How it fits your week
        </p>
        <h2
          className="t-h2 mt-4 font-heading font-bold text-calm-charcoal tracking-tight max-w-2xl"
          style={{ ...reveal(revealed, 80) }}
        >
          Before, during, and after each session.
        </h2>

        <ol className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-8 sm:gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.phase}
              className="relative"
              style={reveal(revealed, 160 + i * 80)}
            >
              <div className="flex items-center gap-4">
                <div className="t-h2 font-heading font-bold text-calm-navy/25 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-calm-navy/10 md:block"
                  />
                )}
              </div>
              <div className="mt-3 font-body t-label text-calm-lavender-ink">
                {step.role}
              </div>
              <h3 className="mt-1.5 font-heading font-bold text-calm-charcoal tracking-tight text-lg sm:text-xl">
                {step.phase}
              </h3>
              <p className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/80 leading-relaxed">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default WorkflowStrip;
