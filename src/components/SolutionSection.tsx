import React, { useState, useEffect, useRef } from "react";
import BrandIntroduction from "./BrandIntroduction";
import ValueCycle from "./ValueCycle";
import PhoneMockup from "./PhoneMockup";

const SolutionSection = () => {
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const [showNotificationDot, setShowNotificationDot] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowNotificationDot(true), 1000);
        } else {
          setShowNotificationDot(false);
        }
      },
      { threshold: 0.5 },
    );

    if (phoneRef.current) {
      observer.observe(phoneRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-calm-light/30 to-calm-lavender/10 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-calm-navy/10 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-calm-charcoal/10 rounded-full blur-xl animate-float-delayed"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-16 h-16 bg-calm-lavender/15 rounded-full blur-lg animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-6 animate-fade-in">
            The first multidimensional platform that unites
            <br />
            <span className="text-calm-lavender text-4xl sm:text-5xl">
              speech
            </span>
            ,
            <span className="text-calm-lavender text-4xl sm:text-5xl">
              {" "}
              emotional
            </span>
            , and
            <span className="text-calm-lavender text-4xl sm:text-5xl">
              {" "}
              social
            </span>{" "}
            behavior
          </h2>
        </div>

        {/* Two Column Layout: Brand Introduction + Value Cycle */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <BrandIntroduction />
          <ValueCycle />
        </div>

        {/* Main Content with Mockups */}
        <div className="animate-fade-in-up bg-gradient-to-r from-calm-lavender/20 to-calm-navy/10 rounded-2xl p-8 border border-calm-light backdrop-blur-sm shadow-lg relative overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side content */}
            <div className="animate-fade-in" style={{ animationDelay: "1s" }}>
              <h3 className="font-heading font-bold text-2xl text-calm-charcoal mb-6">
                Designed with Therapists,
                <br />
                Built for Clinics, Loved by Patients.
              </h3>
              <p className="font-body text-lg text-calm-charcoal/80 mb-8">
                We work alongside therapists to provide structured plans,
                real-time feedback, and motivational support — tailored to each
                user's progress.
              </p>
              <div className="space-y-4">
                {[
                  "Assign custom plans in minutes",
                  "Track practice consistency and difficulty",
                  "HIPAA-compliant reports after every session",
                  "Motivate patients with daily micro-successes",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-calm-navy rounded-full" />
                    <span className="font-body text-base text-calm-charcoal">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Mockups */}
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
