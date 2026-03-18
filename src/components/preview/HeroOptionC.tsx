import { Button } from "@/components/ui/button";

const PILLS = [
  { label: "Practice Engine" },
  { label: "AI Reports" },
  { label: "Patient Analytics" },
  { label: "Learning Paths" },
] as const;

const SCREENSHOTS = [
  { src: "/screenshots/app/client-dashboard.png", label: "Patient Dashboard" },
  {
    src: "/screenshots/app/therapist-exercises.png",
    label: "Exercise Library",
  },
  { src: "/screenshots/app/client-journey.png", label: "Therapy Journey" },
  { src: "/screenshots/app/analytics.png", label: "Platform Analytics" },
] as const;

const HeroOptionC = () => {
  const scrollToCTA = () => {
    const element = document.getElementById("cta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Dark gradient header */}
      <div className="relative bg-gradient-to-b from-calm-navy via-calm-navy/95 to-calm-light px-4 sm:px-6 lg:px-8 pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(152,165,254,0.15)_0%,transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Small label */}
          <p className="animate-fade-in mb-4 font-body text-xs font-semibold uppercase tracking-widest text-calm-lavender sm:text-sm">
            The Clinical Operating System for Speech Therapy
          </p>

          {/* Headline */}
          <h1 className="animate-fade-in-up font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Stop Losing Patients Between Sessions.
          </h1>

          {/* Subheadline */}
          <p
            className="mx-auto mt-6 max-w-3xl animate-fade-in-up font-body text-base leading-relaxed text-white/70 sm:mt-8 sm:text-lg md:text-xl"
            style={{ animationDelay: "0.15s" }}
          >
            UpSpeech gives speech therapy clinics the complete platform:
            structured daily practice for patients, AI-powered report automation
            for therapists, and real-time analytics for clinic owners. One
            system. Every workflow.
          </p>

          {/* Icon pills */}
          <div
            className="mx-auto mt-8 flex animate-fade-in-up flex-wrap justify-center gap-3 sm:mt-10"
            style={{ animationDelay: "0.3s" }}
          >
            {PILLS.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-body text-sm text-white/80 backdrop-blur-sm"
              >
                <span className="h-2 w-2 rounded-full bg-calm-lavender" />
                {pill.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="mt-10 flex animate-fade-in-up flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-6"
            style={{ animationDelay: "0.45s" }}
          >
            <Button
              onClick={scrollToCTA}
              size="lg"
              className="bg-gradient-primary font-body text-base font-bold text-white shadow-button transition-all duration-300 hover:scale-105 hover:opacity-90 hover:shadow-button-hover sm:px-8 sm:py-4 sm:text-lg"
            >
              Request Pilot Access
            </Button>
            <a
              href="#platform"
              className="group inline-flex items-center gap-1.5 font-body text-base font-medium text-white/70 transition-colors hover:text-white"
            >
              See the Platform
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Screenshot gallery — sits on the light background */}
      <div className="relative -mt-16 px-4 pb-16 sm:-mt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-4 overflow-x-auto pb-4 sm:gap-6 sm:pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SCREENSHOTS.map((shot) => (
              <div key={shot.label} className="w-64 flex-shrink-0 sm:w-72">
                <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-calm-navy/5 sm:rounded-3xl">
                  <img
                    src={shot.src}
                    alt={shot.label}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center font-body text-sm font-medium text-calm-charcoal/70">
                  {shot.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOptionC;
