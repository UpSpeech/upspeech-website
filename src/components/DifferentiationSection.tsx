import React from "react";

const DifferentiationSection = () => {
  const features = [
    {
      feature: "Session Monitoring",
      traditional: true,
      upspeech: true,
      traditionalExtra: "No visibility into what happens between sessions",
      upspeechExtra: "Real-time insights into practice consistency and quality",
    },
    {
      feature: "Patient Communication",
      traditional: true,
      upspeech: true,
      traditionalExtra:
        "Follow-ups through scattered WhatsApp messages or emails",
      upspeechExtra: "Centralized feedback loop with tracked patient progress",
    },
    {
      feature: "Progress Tracking",
      traditional: true,
      upspeech: true,
      traditionalExtra:
        "Hours spent writing reports and tracking progress manually",
      upspeechExtra:
        "Auto-generated reports, trend tracking, and data dashboards",
    },
    {
      feature: "Personalized Guidance",
      traditional: false,
      upspeech: true,
      traditionalExtra:
        "Limited capacity to personalize outside-session guidance",
      upspeechExtra:
        "Adaptive practice plans based on patient performance and variability",
    },
    {
      feature: "Patient Engagement",
      traditional: false,
      upspeech: true,
      traditionalExtra:
        "Low engagement and high patient frustration between sessions",
      upspeechExtra:
        "Higher motivation through gamification and emotional nudges",
    },
    {
      feature: "Accessibility",
      traditional: false,
      upspeech: true,
      traditionalExtra:
        "Therapy only accessible in large cities or expensive private clinics",
      upspeechExtra: "Extend care beyond geographic and economic limits",
    },
  ];

  return (
    <section
      id="differentiation"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-light/50 via-white to-calm-lavender/10 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-calm-navy/10 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-calm-charcoal/10 rounded-full blur-xl animate-float-delayed"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-16 h-16 bg-calm-lavender/15 rounded-full blur-lg animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-nunito font-bold text-3xl sm:text-4xl text-calm-charcoal mb-6 animate-fade-in">
              We're not replacing therapy.
              <br />
              <span className="text-calm-lavender text-4xl sm:text-5xl line-height-tight">
                We're supercharging it.
              </span>
            </h2>
            <p className="font-nunito text-xl text-calm-charcoal/80 mb-8">
              By making speech therapy more continuous, engaging, and scalable
              for the professionals who deliver it.
            </p>
          </div>
          <div className="relative">
            <img
              src="/images/hero-bg-2.1.webp"
              alt="Two happy people after a therapy session"
              className="rounded-2xl shadow-xl w-full object-cover h-[350px] object-center md:object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-calm-lavender/10 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:block bg-white/90 backdrop-blur-sm rounded-2xl border border-calm-light shadow-lg overflow-hidden">
          <div className="grid grid-cols-[2fr,1fr,1fr] border-b border-calm-light">
            <div className="p-6 font-nunito font-bold text-lg text-calm-charcoal">
              Features
            </div>
            <div className="p-6 font-nunito font-bold text-lg text-calm-charcoal border-l border-calm-light">
              Traditional Approach
            </div>
            <div className="p-6 font-nunito font-bold text-lg text-white border-l border-calm-light bg-calm-lavender">
              UpSpeech Platform
            </div>
          </div>

          <div className="divide-y divide-calm-light">
            {features.map((item, index) => (
              <div
                key={`desktop-${index}`}
                className="grid grid-cols-[2fr,1fr,1fr] items-center group hover:bg-calm-navy/5 transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="font-nunito font-bold text-calm-charcoal mb-2">
                    {item.feature}
                  </h3>
                </div>

                {/* Traditional Check */}
                <div className="p-6 border-l border-calm-light">
                  <div className="flex items-center mb-2">
                    {item.traditional ? (
                      <div className="w-8 h-8 overflow-hidden shrink-0 rounded-full bg-calm-lavender flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 overflow-hidden shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    )}
                    <span className="ml-3 text-sm text-calm-charcoal/70">
                      {item.traditionalExtra}
                    </span>
                  </div>
                </div>

                {/* UpSpeech Check + Extra Feature */}
                <div className="p-6 border-l border-calm-light bg-calm-lavender/10">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 overflow-hidden shrink-0 rounded-full bg-calm-lavender flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-sm text-calm-navy font-medium">
                      {item.upspeechExtra}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Hidden on desktop */}
        <div className="md:hidden space-y-4">
          {features.map((item, index) => (
            <div
              key={`mobile-${index}`}
              className="bg-white/90 backdrop-blur-sm rounded-xl border border-calm-light p-5 hover:border-calm-navy/30 transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="font-nunito font-bold text-lg text-calm-charcoal mb-2">
                  {item.feature}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-calm-light/30">
                {/* Traditional */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-calm-charcoal/70">
                    Traditional Approach
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      {item.traditional ? (
                        <div className="w-6 h-6 rounded-full bg-calm-lavender flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-xs leading-tight text-calm-charcoal/70">
                      {item.traditionalExtra}
                    </span>
                  </div>
                </div>

                {/* UpSpeech */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-calm-navy">
                    UpSpeech Platform
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 shrink-0 rounded-full bg-calm-lavender flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="text-xs leading-tight text-calm-navy">
                      {item.upspeechExtra}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
