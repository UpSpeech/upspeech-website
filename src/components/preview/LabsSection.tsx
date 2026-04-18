import {
  BeakerIcon,
  VideoCameraIcon,
  CpuChipIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const pillars = [
  {
    icon: VideoCameraIcon,
    title: "Frame-accurate clinical annotation",
    description:
      "Speech-language pathologists tag disfluencies, tensions, blocks and secondary behaviors directly on video — with sub-second precision.",
  },
  {
    icon: CpuChipIcon,
    title: "Multimodal training signal",
    description:
      "Every annotation feeds a proprietary dataset combining sound, context and facial cues — the foundation of our AI voice analysis engine.",
  },
  {
    icon: UserGroupIcon,
    title: "Built alongside clinicians",
    description:
      "Co-designed with practicing SLPs and stuttering researchers. Every label scheme maps to clinical protocols, not ML convenience.",
  },
];

const LabsSection = () => {
  return (
    <section
      id="labs"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-navy via-calm-navy/95 to-calm-charcoal relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(152,165,254,0.2)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(152,165,254,0.12)_0%,transparent_55%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-16 items-center mb-14">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-calm-lavender/40 bg-calm-lavender/10 px-3 py-1 mb-5">
              <BeakerIcon className="h-4 w-4 text-calm-lavender" />
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-calm-lavender">
                UpSpeech Labs
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5">
              A research-grade engine, built with the clinicians who use it.
            </h2>
            <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              Most speech AI is trained on generic datasets. Ours is trained on
              a proprietary clinical corpus — annotated frame-by-frame by
              practicing SLPs using a custom tool we built in-house.
            </p>
          </div>

          {/* Annotation tool mock */}
          <div className="relative animate-fade-in-up">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-2xl">
              {/* Faux video frame */}
              <div className="relative aspect-video rounded-xl bg-gradient-to-br from-calm-charcoal/80 to-calm-navy/80 overflow-hidden ring-1 ring-white/10">
                {/* Annotation overlays */}
                <div className="absolute top-[22%] left-[28%] w-[45%] h-[55%] border-2 border-calm-lavender rounded-md">
                  <span className="absolute -top-6 left-0 font-body text-[10px] font-bold uppercase tracking-wider text-calm-lavender bg-calm-navy px-2 py-0.5 rounded">
                    tension
                  </span>
                </div>
                <div className="absolute top-[62%] left-[38%] w-[25%] h-[12%] border-2 border-calm-lavender/80 rounded-sm">
                  <span className="absolute -bottom-5 left-0 font-body text-[10px] font-bold uppercase tracking-wider text-white/90 bg-calm-lavender/90 px-2 py-0.5 rounded">
                    block · 340ms
                  </span>
                </div>
                {/* Waveform */}
                <div className="absolute bottom-0 left-0 right-0 h-10 flex items-end gap-[2px] px-3 pb-2">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-calm-lavender/60 rounded-sm"
                      style={{
                        height: `${20 + Math.sin(i * 0.4) * 15 + Math.random() * 20}%`,
                      }}
                    />
                  ))}
                </div>
                {/* Timestamp */}
                <div className="absolute top-3 right-3 font-body text-[10px] font-mono text-white/60 bg-black/40 px-2 py-0.5 rounded">
                  00:14.320
                </div>
              </div>
              {/* Tag chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Block",
                  "Prolongation",
                  "Repetition",
                  "Side glance",
                  "Holding",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[11px] font-medium text-white/80 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Caption */}
            <p className="mt-3 text-center font-body text-xs text-white/50">
              UpSpeech Labs · Clinical Annotation Tool
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-colors duration-300 hover:border-calm-lavender/40"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-calm-lavender/15">
                <pillar.icon className="h-5 w-5 text-calm-lavender" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                {pillar.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-white/65">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <p className="text-center font-body text-sm text-white/50 mt-12 max-w-2xl mx-auto">
          The annotation tool isn't a product — it's how we earn our data moat.
          Every hour a clinician spends with it compounds into a better model
          for every clinic we serve.
        </p>
      </div>
    </section>
  );
};

export default LabsSection;
