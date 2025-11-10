import React, { useState } from "react";
import {
  Users,
  Stethoscope,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const BrandIntroduction = () => {
  const [activeTab, setActiveTab] = useState(0);

  const audiences = [
    {
      title: "Patients",
      icon: Users,
      color: "calm-lavender",
      gradient: "from-calm-lavender/20 to-calm-lavender/5",
      accentColor: "bg-calm-lavender",
      borderColor: "border-calm-lavender/30",
      highlights: [
        { icon: Sparkles, text: "AI-Powered Feedback" },
        { icon: CheckCircle2, text: "Daily Practice Habits" },
        { icon: CheckCircle2, text: "Real-Time Progress" },
      ],
      points: [
        "Interactive scenario simulations and challenging exercises",
        "Audio and video recording with automated analysis",
        "Structured guidance from your therapist",
      ],
    },
    {
      title: "Therapists",
      icon: Stethoscope,
      color: "calm-navy",
      gradient: "from-calm-navy/20 to-calm-navy/5",
      accentColor: "bg-calm-navy",
      borderColor: "border-calm-navy/30",
      highlights: [
        { icon: Sparkles, text: "Treatment Plans in Minutes" },
        { icon: CheckCircle2, text: "Clinical Dashboard" },
        { icon: CheckCircle2, text: "Automated Reports" },
      ],
      points: [
        "Multidimensional tracking and data-driven insights",
        "Monitor patient practice activity between sessions",
        "Save hours on documentation and paperwork",
      ],
    },
    {
      title: "Clinics",
      icon: Building2,
      color: "calm-charcoal",
      gradient: "from-calm-charcoal/20 to-calm-charcoal/5",
      accentColor: "bg-calm-charcoal",
      borderColor: "border-calm-charcoal/30",
      highlights: [
        { icon: Sparkles, text: "Scale Without Extra Staff" },
        { icon: CheckCircle2, text: "Better Clinical Outcomes" },
        { icon: CheckCircle2, text: "Reduce Paperwork" },
      ],
      points: [
        "Differentiate your practice with cutting-edge AI tools",
        "Enhance patient engagement and retention rates",
        "Increase capacity while maintaining quality care",
      ],
    },
  ];

  const activeAudience = audiences[activeTab];
  const Icon = activeAudience.icon;

  return (
    <div className="space-y-6">
      <h3 className="font-nunito font-bold text-2xl text-calm-charcoal mb-6 text-center lg:text-left">
        Introducing <span className="text-calm-lavender">UpSpeech</span>
      </h3>

      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-calm-light/30 p-1.5 rounded-xl">
        {audiences.map((audience, index) => {
          const TabIcon = audience.icon;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-nunito font-semibold text-sm transition-all duration-300 ${
                activeTab === index
                  ? `bg-white shadow-md text-${audience.color}`
                  : "text-calm-charcoal/60 hover:text-calm-charcoal/80"
              }`}
            >
              <TabIcon className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">{audience.title}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div
        className={`bg-gradient-to-br ${activeAudience.gradient} rounded-xl border ${activeAudience.borderColor} p-6 min-h-[400px] transition-all duration-300`}
      >
        {/* Header with Icon */}
        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-calm-charcoal/10">
          <div
            className={`w-14 h-14 ${activeAudience.accentColor} rounded-xl flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-nunito font-bold text-xl text-calm-charcoal">
              For {activeAudience.title}
            </h4>
            <p className="font-nunito text-sm text-calm-charcoal/60">
              Empowering your journey
            </p>
          </div>
        </div>

        {/* Key Highlights with Icons */}
        <div className="space-y-3 mb-6">
          {activeAudience.highlights.map((highlight, idx) => {
            const HighlightIcon = highlight.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/80"
              >
                <div className={`${activeAudience.accentColor} rounded-lg p-2`}>
                  <HighlightIcon
                    className="w-4 h-4 text-white"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="font-nunito font-semibold text-sm text-calm-charcoal">
                  {highlight.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Additional Points */}
        <div className="space-y-2.5">
          <p className="font-nunito font-semibold text-xs uppercase tracking-wide text-calm-charcoal/50 mb-3">
            Plus more
          </p>
          {activeAudience.points.map((point, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div
                className={`w-1.5 h-1.5 ${activeAudience.accentColor} rounded-full mt-2 shrink-0`}
              ></div>
              <span className="font-nunito text-sm text-calm-charcoal/80 leading-relaxed">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="font-nunito text-sm text-calm-charcoal/70 text-center lg:text-left pt-2">
        Guiding voices with{" "}
        <span className="text-calm-lavender font-semibold">care</span> and{" "}
        <span className="text-calm-navy font-semibold">tech</span>
      </p>
    </div>
  );
};

export default BrandIntroduction;
