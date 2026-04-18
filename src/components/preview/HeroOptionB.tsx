import { Button } from "@/components/ui/button";

const stats = [
  "99% of the week without clinical support",
  "< 20% of patients practice consistently",
  "6–12 months average treatment duration",
];

const HeroOptionB = () => {
  return (
    <section className="relative min-h-[100svh] px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-light via-white via-calm-lavender/10 to-calm-navy/5 overflow-hidden flex items-center py-32">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-calm-lavender/20 via-transparent to-calm-navy/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-calm-charcoal/5 via-transparent to-calm-lavender/10" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="animate-fade-in text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-calm-lavender/40 bg-white/60 backdrop-blur-sm px-3 py-1 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-calm-lavender" />
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-calm-navy">
                Hybrid Care for Speech Clinics
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-calm-charcoal leading-tight mb-4 sm:mb-6">
              Turn the 167-hour gap{" "}
              <span className="text-gradient-primary">
                into your clinic's next growth lever.
              </span>
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-calm-charcoal/70 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Speech therapy stops when the session ends. UpSpeech keeps it
              going — with structured daily practice for patients, AI-drafted
              reports for therapists, and progress analytics for clinic owners.
              One platform, continuous care.
            </p>

            {/* Stat badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 sm:mb-10">
              {stats.map((stat) => (
                <span
                  key={stat}
                  className="animate-fade-in-up inline-flex items-center font-body text-xs sm:text-sm font-medium text-calm-navy bg-white/80 backdrop-blur-sm border border-calm-lavender/30 rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-card"
                >
                  {stat}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-white font-body font-bold px-8 py-4 text-base sm:text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 shadow-button"
              >
                Apply for the Pilot Program
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-body font-bold px-8 py-4 text-base sm:text-lg rounded-full border-2 border-calm-navy text-calm-navy hover:bg-calm-navy hover:text-white transition-all duration-300"
              >
                Book a Clinic Demo
              </Button>
            </div>
          </div>

          {/* Right: Screenshot showcase */}
          <div className="relative animate-fade-in-up mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Back screenshot — Patient View (offset behind) */}
              <div className="absolute top-8 -right-2 sm:top-10 sm:-right-4 w-[85%] transform rotate-2 translate-x-4">
                <div className="rounded-2xl sm:rounded-3xl shadow-card overflow-hidden border border-calm-light bg-white">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-calm-light/80 border-b border-calm-light">
                    <div className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-calm-charcoal/20" />
                    <div className="ml-2 flex-1 h-4 bg-white/60 rounded-md" />
                  </div>
                  <img
                    src="/screenshots/app/client-dashboard.png"
                    alt="Patient dashboard showing daily practice exercises and progress"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
                {/* Label */}
                <div className="mt-2 text-center">
                  <span className="font-body text-xs font-semibold text-calm-charcoal/60 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-card">
                    Patient View
                  </span>
                </div>
              </div>

              {/* Front screenshot — Therapist View */}
              <div className="relative z-10 w-[90%] transform -rotate-1">
                <div className="rounded-2xl sm:rounded-3xl shadow-card-hover overflow-hidden border border-calm-lavender/30 bg-white">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-calm-light/80 border-b border-calm-light">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    <div className="ml-2 flex-1 h-4 bg-white/60 rounded-md" />
                  </div>
                  <img
                    src="/screenshots/app/therapist-dashboard.png"
                    alt="Therapist dashboard with patient analytics and report tools"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
                {/* Label */}
                <div className="mt-2 text-center">
                  <span className="font-body text-xs font-semibold text-calm-navy bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-card">
                    Therapist View
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOptionB;
