import React, { useState } from "react";

const tabs = [
  {
    label: "Patient Dashboard",
    image: "/screenshots/app/client-dashboard.png",
    bullets: [
      "Today's assigned exercises with progress tracking",
      "Practice streaks and motivation",
      "Clinical self-assessment",
    ],
  },
  {
    label: "Therapy Journey",
    image: "/screenshots/app/client-journey.png",
    bullets: [
      "Structured learning path with milestones",
      "36+ therapeutic steps across 6+ phases",
      "Self-paced progression",
    ],
  },
  {
    label: "Exercise Library",
    image: "/screenshots/app/therapist-exercises.png",
    bullets: [
      "Evidence-based exercises by technique",
      "Difficulty levels and assignments",
      "Custom exercise creation",
    ],
  },
  {
    label: "Analytics",
    image: "/screenshots/app/analytics.png",
    bullets: [
      "Real-time platform usage metrics",
      "User distribution and growth",
      "Report generation tracking",
    ],
  },
] as const;

const ProductShowcaseSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-light/50 via-white to-calm-lavender/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-4">
            See UpSpeech in Action
          </h2>
          <p className="font-body text-lg text-calm-charcoal/70">
            Real product. Real interface. Built for clinical workflows.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1 rounded-2xl bg-calm-light p-1.5">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(index)}
                className={`
                  px-4 py-2.5 rounded-xl font-body text-sm font-medium
                  transition-all duration-300 cursor-pointer whitespace-nowrap
                  ${
                    activeTab === index
                      ? "bg-calm-navy text-white shadow-card"
                      : "text-calm-charcoal/70 hover:text-calm-charcoal hover:bg-white/60"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Screenshot + Bullets */}
        <div className="animate-fade-in">
          {/* Browser Frame */}
          <div className="rounded-2xl shadow-xl bg-white overflow-hidden border border-calm-light/60">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-calm-light/80 border-b border-calm-light">
              <span className="w-3 h-3 rounded-full bg-red-400/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <span className="w-3 h-3 rounded-full bg-green-400/60" />
              <div className="ml-3 flex-1 h-6 rounded-md bg-white/70 max-w-xs" />
            </div>

            {/* Screenshot */}
            <div className="relative overflow-hidden bg-calm-light/30">
              {tabs.map((tab, index) => (
                <img
                  key={tab.label}
                  src={tab.image}
                  alt={tab.label}
                  className={`
                    w-full block transition-all duration-500 ease-out-soft
                    ${
                      activeTab === index
                        ? "opacity-100 scale-100 relative"
                        : "opacity-0 scale-[0.98] absolute inset-0"
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Bullets */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {tabs[activeTab].bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-center gap-2 font-body text-sm text-calm-charcoal/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-calm-lavender shrink-0" />
                {bullet}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
