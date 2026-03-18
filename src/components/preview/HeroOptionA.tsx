import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const HeroOptionA = () => {
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (waveRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth) * 100;
        const yPercent = (clientY / innerHeight) * 100;

        waveRef.current.style.transform = `translate(${xPercent * 0.1}px, ${
          yPercent * 0.1
        }px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToCTA = () => {
    const element = document.getElementById("cta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100svh] px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-light via-white via-calm-lavender/10 to-calm-navy/5 overflow-hidden flex items-center py-32">
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-calm-lavender/20 via-transparent to-calm-navy/15"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-calm-charcoal/5 via-transparent to-calm-lavender/10"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-3 h-3 sm:w-4 sm:h-4 bg-calm-lavender/40 rounded-full animate-float blur-sm"></div>
        <div
          className="absolute top-[20%] right-[10%] w-4 h-4 sm:w-6 sm:h-6 bg-calm-navy/30 rounded-full animate-float-delayed blur-sm"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-[15%] left-[10%] w-4 h-4 sm:w-5 sm:h-5 bg-calm-navy/20 rounded-full animate-float-slow blur-sm"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-[15%] left-1/3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-calm-navy/20 to-calm-lavender/30 rounded-full animate-float blur-lg"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-[20%] right-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-tl from-calm-charcoal/10 to-calm-lavender/20 rounded-full animate-float-delayed blur-xl"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      {/* Interactive Wave Background */}
      <div
        ref={waveRef}
        className="absolute inset-0 transition-transform duration-300 ease-out"
      >
        <svg
          className="absolute top-20 left-0 w-full h-full opacity-15"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="enhanced-wave-gradient-a"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#293587" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#98A5FE" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#4B4E4E" stopOpacity="0.2" />
              <stop offset="75%" stopColor="#293587" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#98A5FE" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="animate-fade-in text-center lg:text-left">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-calm-charcoal leading-tight mb-4 sm:mb-6">
              Speech Therapy happens once a week.{" "}
              <span className="text-gradient-primary">
                Practice happens every day{" "}
              </span>
              — with UpSpeech.
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-calm-charcoal/70 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              With UpSpeech, clinics empower people who stutter to practice
              smarter, stay engaged, and accelerate real-life improvements.
            </p>

            <div className="space-y-4">
              <Button
                onClick={scrollToCTA}
                size="lg"
                className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-white font-body font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 shadow-button"
              >
                Join the Waitlist for Early Access
              </Button>
            </div>
          </div>

          {/* Right side: Real app screenshot in browser frame */}
          <div className="relative animate-fade-in-up mt-8 lg:mt-0">
            <div
              className="relative mx-auto max-w-lg lg:max-w-none"
              style={{
                transform: "perspective(1200px) rotateY(-4deg) rotateX(2deg)",
              }}
            >
              {/* Browser frame */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden border border-calm-light/80">
                {/* Browser chrome */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-b from-calm-light to-calm-light/60 border-b border-calm-charcoal/10">
                  {/* Traffic light dots */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                  </div>
                  {/* URL bar */}
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white/80 rounded-lg px-4 py-1 text-xs font-body text-calm-charcoal/50 border border-calm-charcoal/10 max-w-[240px] w-full text-center truncate">
                      app.upspeech.io/dashboard
                    </div>
                  </div>
                  {/* Spacer to balance the dots */}
                  <div className="w-[52px]"></div>
                </div>

                {/* Screenshot */}
                <div className="relative">
                  <img
                    src="/screenshots/app/client-dashboard.png"
                    alt="UpSpeech client dashboard showing practice exercises and progress tracking"
                    className="w-full h-auto block"
                    loading="eager"
                  />
                  {/* Subtle gradient overlay at bottom for polish */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Drop shadow underneath for depth */}
              <div className="absolute -bottom-3 left-4 right-4 h-6 bg-calm-navy/10 rounded-full blur-xl -z-10"></div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 sm:-bottom-6 left-4 sm:left-6 z-20 animate-float">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-card border border-calm-lavender/30 px-4 py-2.5 flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-body text-xs sm:text-sm font-semibold text-calm-charcoal">
                  Real Product. Real Results.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vocal Cord Wave Animation at Bottom */}
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
        <svg
          className="w-full h-24"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50 V100 H0 Z"
            fill="url(#vocal-wave-gradient-a1)"
            className="animate-pulse"
          >
            <animate
              attributeName="d"
              values="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50 V100 H0 Z;
                      M0,50 Q150,80 300,50 T600,50 T900,50 T1200,50 V100 H0 Z;
                      M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50 V100 H0 Z"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M0,60 Q200,30 400,60 T800,60 T1200,60 V100 H0 Z"
            fill="url(#vocal-wave-gradient-a2)"
            opacity="0.7"
          >
            <animate
              attributeName="d"
              values="M0,60 Q200,30 400,60 T800,60 T1200,60 V100 H0 Z;
                      M0,60 Q200,90 400,60 T800,60 T1200,60 V100 H0 Z;
                      M0,60 Q200,30 400,60 T800,60 T1200,60 V100 H0 Z"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient
              id="vocal-wave-gradient-a1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#293587" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#98A5FE" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#293587" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient
              id="vocal-wave-gradient-a2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#98A5FE" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#4B4E4E" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#98A5FE" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default HeroOptionA;
