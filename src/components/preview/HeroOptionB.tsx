import { Button } from "@/components/ui/button";

const stats = [
  "4h/week saved on reports per therapist",
  "3x more practice between sessions",
  "40% better patient retention",
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
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-calm-charcoal leading-tight mb-4 sm:mb-6">
              Give Your Therapists Superpowers.
              <br />
              <span className="text-gradient-primary">
                Give Your Patients Daily Practice.
              </span>
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-calm-charcoal/70 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              UpSpeech helps speech therapy clinics extend care beyond sessions
              — with structured practice, AI-generated clinical reports, and
              real-time patient analytics. All from one platform.
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
                Start Your Free Pilot
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-body font-bold px-8 py-4 text-base sm:text-lg rounded-full border-2 border-calm-navy text-calm-navy hover:bg-calm-navy hover:text-white transition-all duration-300"
              >
                Book a Demo
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
