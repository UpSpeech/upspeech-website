import React from "react";

/*
  Concise banner highlighting the core tagline.
  Simplified styling: no gradients, animations, or decorative overlays.
  Uses spacing, subtle border, and consistent typography tokens.
*/
const GuidingVoicesBanner: React.FC = () => {
  return (
    <section
      aria-labelledby="guiding-voices-heading"
      className="w-full py-14 sm:py-16 border-y border-calm-light bg-gradient-to-br from-calm-charcoal to-calm-navy text-white"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2
          id="guiding-voices-heading"
          className="font-heading font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl text-white"
        >
          Guiding voices with care and tech
        </h2>
        <p className="mt-5 max-w-2xl mx-auto font-body text-base sm:text-lg text-white leading-relaxed">
          Human-centered speech therapy powered by intelligent tooling —
          extending care and amplifying clinician impact between sessions.
        </p>
      </div>
    </section>
  );
};

export default GuidingVoicesBanner;
