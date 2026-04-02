import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { trackButtonClick } from "@/lib/analytics";

const APPROACHES = [
  {
    name: "Stuttering Modification",
    description:
      "Change how you stutter — making moments easier and less tense rather than eliminating them.",
    count: 5,
    href: "/techniques",
    techniques: [
      "Voluntary Stuttering",
      "Cancellation",
      "Pull-Out",
      "Preparatory Set",
      "Holding",
    ],
  },
  {
    name: "Fluency Shaping",
    description:
      "Reshape overall speech production patterns to promote smoother, more continuous speech.",
    count: 5,
    href: "/techniques",
    techniques: [
      "Soft Starts",
      "Soft Articulation Contact",
      "Prolonged Speech",
      "Speech Speed Management",
      "Pauses",
    ],
  },
  {
    name: "Cognitive Approaches",
    description:
      "Address the thoughts, feelings, and avoidance behaviors that can amplify stuttering.",
    count: 1,
    href: "/techniques/identification-desensitization",
    techniques: ["Identification & Desensitization"],
  },
];

const TechniquesOverviewSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-12 lg:gap-16 items-start">
          {/* Left column — editorial heading */}
          <div className="lg:sticky lg:top-28">
            <p className="font-body text-sm text-calm-navy font-semibold uppercase tracking-wider mb-3">
              Evidence-Based Practice
            </p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-5 leading-tight">
              Built on proven speech therapy techniques
            </h2>
            <p className="font-body text-lg text-calm-charcoal/80 leading-relaxed mb-8">
              UpSpeech structures practice around the same evidence-based
              approaches used by speech-language pathologists worldwide — from
              stuttering modification to fluency shaping to cognitive
              strategies.
            </p>

            {/* TODO: Re-enable when "What Is Stuttering" page is ready for production */}
            {/* <a
              href="/what-is-stuttering"
              onClick={() =>
                trackButtonClick("what_is_stuttering", "techniques_overview")
              }
              className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-calm-navy hover:text-calm-lavender transition-colors duration-200"
            >
              <span className="border-b border-calm-navy/30 group-hover:border-calm-lavender/50 transition-colors duration-200 pb-0.5">
                New to stuttering? Read our guide
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </a> */}
          </div>

          {/* Right column — approach index */}
          <div className="space-y-0 border-t border-calm-charcoal/10">
            {APPROACHES.map((approach) => (
              <a
                key={approach.name}
                href={approach.href}
                onClick={() =>
                  trackButtonClick(
                    `approach_${approach.name.toLowerCase().replace(/\s/g, "_")}`,
                    "techniques_overview",
                  )
                }
                className="group block border-b border-calm-charcoal/10 py-7 transition-colors duration-200 hover:bg-calm-light/40 -mx-4 px-4 sm:-mx-6 sm:px-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="font-heading font-bold text-xl text-calm-charcoal group-hover:text-calm-navy transition-colors duration-200">
                        {approach.name}
                      </h3>
                      <span className="font-body text-xs text-calm-charcoal/80 tabular-nums">
                        {approach.count}{" "}
                        {approach.count === 1 ? "technique" : "techniques"}
                      </span>
                    </div>
                    <p className="font-body text-sm text-calm-charcoal/80 leading-relaxed mb-3">
                      {approach.description}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {approach.techniques.map((t) => (
                        <span
                          key={t}
                          className="font-body text-xs text-calm-charcoal/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-calm-charcoal/20 group-hover:text-calm-lavender shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechniquesOverviewSection;
