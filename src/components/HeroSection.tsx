import React from "react";
import { Button } from "@/components/ui/button";
import { trackButtonClick } from "@/lib/analytics";

const HeroSection = () => {
  const scrollToCTA = () => {
    trackButtonClick("join_waitlist_hero", "hero");
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

      {/* Floating Elements — GPU-composited (transform/opacity only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-3 h-3 sm:w-4 sm:h-4 bg-calm-lavender/30 rounded-full will-change-transform animate-float"></div>
        <div
          className="absolute top-[20%] right-[10%] w-4 h-4 sm:w-6 sm:h-6 bg-calm-navy/20 rounded-full will-change-transform animate-float-delayed"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-[15%] left-[10%] w-4 h-4 sm:w-5 sm:h-5 bg-calm-navy/15 rounded-full will-change-transform animate-float-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-[15%] left-1/3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-calm-navy/15 to-calm-lavender/20 rounded-full will-change-transform animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-[20%] right-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-tl from-calm-charcoal/10 to-calm-lavender/15 rounded-full will-change-transform animate-float-delayed"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-center lg:text-left">
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

          <div className="relative animate-fade-in mt-8 lg:mt-0">
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-calm-light mx-auto max-w-md lg:max-w-none">
              {/* Online Status Card */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 z-20 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-calm-light p-2 sm:p-3 flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-body text-xs sm:text-sm font-semibold text-calm-charcoal">
                  Online
                </span>
              </div>
              {/* Gradient overlay on card */}
              <div className="absolute inset-0 bg-gradient-to-br from-calm-lavender/5 via-transparent to-calm-navy/5 rounded-3xl"></div>

              <div className="relative z-10">
                <div className="bg-gradient-to-br from-calm-lavender/20 to-calm-navy/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-3 h-3 bg-calm-navy rounded-full animate-glow"
                      aria-hidden="true"
                    ></div>
                    <div
                      aria-hidden="true"
                      className="w-3 h-3 bg-calm-lavender rounded-full animate-glow"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      aria-hidden="true"
                      className="w-3 h-3 bg-calm-charcoal rounded-full animate-glow"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-calm-charcoal mb-2">
                    Patient Dashboard
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-body text-sm text-calm-charcoal/70">
                        Today's Practice
                      </span>
                      <span className="font-body text-sm font-semibold text-calm-navy">
                        3/5 Complete
                      </span>
                    </div>
                    <div className="w-full bg-calm-light rounded-full h-2">
                      <div
                        className="bg-calm-lavender h-2 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-calm-lavender/20 to-calm-lavender/10 rounded-2xl border border-calm-lavender/30">
                    <span className="font-body text-sm font-medium text-calm-charcoal">
                      Stuttering Modification
                    </span>
                    <div className="w-6 h-6 bg-calm-lavender rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-calm-navy/10 to-calm-navy/5 rounded-2xl border border-calm-navy/20">
                    <span className="font-body text-sm font-medium text-calm-charcoal">
                      Fluency Shaping
                    </span>
                    <div className="w-6 h-6 bg-calm-lavender rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-calm-light/80 to-calm-charcoal/5 rounded-2xl border border-calm-charcoal/10">
                    <span className="font-body text-sm font-medium text-calm-charcoal/70">
                      Stabilization
                    </span>
                    <div className="w-6 h-6 bg-calm-charcoal/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider — CSS transform animation (GPU-composited) */}
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
        <svg
          aria-hidden="true"
          className="w-full h-24 will-change-transform animate-float-slow"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50 V100 H0 Z"
            fill="#293587"
            opacity="0.15"
          />
          <path
            d="M0,60 Q200,30 400,60 T800,60 T1200,60 V100 H0 Z"
            fill="#98A5FE"
            opacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
