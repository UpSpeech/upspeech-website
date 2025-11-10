import React, { useState } from "react";
import {
  Users,
  Stethoscope,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const BrandIntroduction = () => {
  const [expandedAudience, setExpandedAudience] = useState<number | null>(0);

  const audiences = [
    {
      title: "For Patients",
      icon: Users,
      color: "calm-lavender",
      points: [
        "Daily practice with AI-powered feedback and habit reminders",
        "Real-time progress tracking and performance insights",
        "Interactive scenario simulations and challenging exercises",
        "Audio and video recording with automated analysis",
        "Structured guidance from your therapist",
      ],
    },
    {
      title: "For Therapists",
      icon: Stethoscope,
      color: "calm-navy",
      points: [
        "Create and assign weekly treatment plans in minutes",
        "Clinical dashboard with comprehensive patient oversight",
        "Multidimensional tracking and data-driven insights",
        "Automated report generation saves hours of documentation",
        "Monitor patient practice activity between sessions",
      ],
    },
    {
      title: "For Clinics",
      icon: Building2,
      color: "calm-charcoal",
      points: [
        "Scale patient capacity without increasing staff",
        "Improve clinical outcomes through consistent practice",
        "Significantly reduce administrative paperwork",
        "Differentiate your practice with cutting-edge AI tools",
        "Enhance patient engagement and retention",
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-nunito font-bold text-2xl text-calm-charcoal mb-6 text-center lg:text-left">
        Introducing <span className="text-calm-lavender">UpSpeech</span>
      </h3>

      {audiences.map((audience, index) => {
        const Icon = audience.icon;
        const isExpanded = expandedAudience === index;

        return (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-calm-light transition-all duration-300 hover:shadow-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedAudience(isExpanded ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 bg-${audience.color} rounded-xl flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <h4 className="font-nunito font-bold text-lg text-calm-charcoal">
                  {audience.title}
                </h4>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-calm-charcoal/60" />
              ) : (
                <ChevronDown className="w-5 h-5 text-calm-charcoal/60" />
              )}
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 space-y-3">
                {audience.points.map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-calm-lavender rounded-full mt-2 shrink-0"></div>
                    <span className="font-nunito text-sm text-calm-charcoal/80">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <p className="font-nunito text-sm text-calm-charcoal/70 text-center lg:text-left pt-4">
        Guiding voices with{" "}
        <span className="text-calm-lavender font-semibold">care</span> and{" "}
        <span className="text-calm-navy font-semibold">tech</span>
      </p>
    </div>
  );
};

export default BrandIntroduction;
