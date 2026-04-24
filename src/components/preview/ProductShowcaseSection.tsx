import { useState } from "react";

type Tab = {
  label: string;
  image?: string;
  mock?: "annotation";
  bullets: readonly string[];
  caption?: string;
};

const tabs: readonly Tab[] = [
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
    label: "Annotation Tool",
    mock: "annotation",
    caption: "UpSpeech Labs · Internal research tool",
    bullets: [
      "Frame-accurate tagging of blocks, tensions, and repetitions",
      "Built with practicing SLPs and stuttering researchers",
      "Feeds the proprietary multimodal dataset behind our AI",
    ],
  },
] as const;

const AnnotationMock = () => (
  <div className="relative aspect-video bg-gradient-to-br from-calm-charcoal to-calm-navy overflow-hidden">
    {/* Annotation overlays */}
    <div className="absolute top-[20%] left-[30%] w-[40%] h-[55%] border-2 border-calm-lavender rounded-md">
      <span className="absolute -top-6 left-0 font-body text-[10px] font-bold uppercase tracking-wider text-white bg-calm-lavender px-2 py-0.5 rounded">
        tension
      </span>
    </div>
    <div className="absolute top-[60%] left-[40%] w-[22%] h-[10%] border-2 border-calm-lavender/90 rounded-sm">
      <span className="absolute -bottom-5 left-0 font-body text-[10px] font-bold uppercase tracking-wider text-white bg-calm-lavender/90 px-2 py-0.5 rounded">
        block · 340ms
      </span>
    </div>
    {/* Waveform */}
    <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end gap-[2px] px-4 pb-3 bg-gradient-to-t from-black/50 to-transparent">
      {Array.from({ length: 72 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-calm-lavender/70 rounded-sm"
          style={{
            height: `${25 + Math.sin(i * 0.3) * 18 + Math.random() * 22}%`,
          }}
        />
      ))}
    </div>
    {/* Timestamp */}
    <div className="absolute top-4 right-4 font-body text-xs font-mono text-white/70 bg-black/40 px-2.5 py-1 rounded">
      00:14.320 / 02:48.600
    </div>
    {/* Tag tray */}
    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 max-w-[50%]">
      {["Block", "Prolongation", "Repetition", "Side glance", "Holding"].map(
        (tag) => (
          <span
            key={tag}
            className="font-body text-[10px] font-medium text-white/85 bg-white/10 border border-white/15 rounded-full px-2 py-0.5 backdrop-blur-sm"
          >
            {tag}
          </span>
        ),
      )}
    </div>
  </div>
);

const ProductShowcaseSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

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
          <div className="inline-flex gap-1 rounded-2xl bg-calm-light p-1.5 overflow-x-auto max-w-full">
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

            {/* Content */}
            <div className="relative overflow-hidden bg-calm-light/30">
              {current.mock === "annotation" ? (
                <AnnotationMock />
              ) : (
                <img
                  key={current.label}
                  src={current.image}
                  alt={current.label}
                  className="w-full block"
                />
              )}
            </div>
          </div>

          {current.caption && (
            <p className="mt-3 text-center font-body text-xs text-calm-charcoal/50">
              {current.caption}
            </p>
          )}

          {/* Bullets */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {current.bullets.map((bullet) => (
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
