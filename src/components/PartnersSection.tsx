import React from "react";

interface Partner {
  name: string;
  logo: string;
  logoWhite?: string;
  url: string;
  description?: string;
}

const partners: Partner[] = [
  {
    name: "SpeechCare",
    logo: "/images/speechcare-logo.png",
    url: "https://speechcare.pt",
    description: "Clinical Partner",
  },
  {
    name: "ElevenLabs Grants",
    logo: "/images/elevenlabs-grants.webp",
    logoWhite: "/images/elevenlabs-grants-white.webp",
    url: "https://elevenlabs.io/startup-grants",
    description: "Grant Program",
  },
];

// Set to true to enable infinite scroll marquee animation
const ENABLE_MARQUEE = false;

const PartnersSection = () => {
  // Double the partners array for seamless marquee loop
  const marqueePartners = ENABLE_MARQUEE
    ? [...partners, ...partners, ...partners]
    : partners;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 animate-fade-in-up">
          <p className="font-body text-sm text-secondary/50 uppercase tracking-wider mb-2">
            Trusted Partners
          </p>
          <h2 className="font-heading font-semibold text-2xl text-secondary">
            Backed By Industry Leaders
          </h2>
        </div>

        {/* Partners Container */}
        <div
          className={`
            ${ENABLE_MARQUEE ? "overflow-hidden" : ""}
          `}
        >
          <div
            className={`
              flex items-center justify-center gap-12 md:gap-16
              ${ENABLE_MARQUEE ? "animate-marquee" : "flex-wrap"}
            `}
          >
            {marqueePartners.map((partner, index) => (
              <a
                key={`${partner.name}-${index}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-3 transition-all duration-300"
              >
                <div className="relative flex items-center justify-center px-6 py-3 rounded-xl bg-gray-50 border border-gray-100 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-56 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                {partner.description && (
                  <span className="font-body text-xs text-secondary/40 group-hover:text-secondary/60 transition-colors duration-300">
                    {partner.description}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Optional: Add more partners CTA */}
        {/*
        <div className="text-center mt-10">
          <a
            href="/partners"
            className="font-body text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Become a partner →
          </a>
        </div>
        */}
      </div>
    </section>
  );
};

export default PartnersSection;

/*
 * MARQUEE ANIMATION SETUP (for future use)
 *
 * When ready to enable marquee, add this to your global CSS or tailwind config:
 *
 * @keyframes marquee {
 *   0% { transform: translateX(0); }
 *   100% { transform: translateX(-50%); }
 * }
 *
 * .animate-marquee {
 *   animation: marquee 20s linear infinite;
 *   width: max-content;
 * }
 *
 * Then set ENABLE_MARQUEE = true above.
 *
 * For pause-on-hover, add:
 * .animate-marquee:hover {
 *   animation-play-state: paused;
 * }
 */
