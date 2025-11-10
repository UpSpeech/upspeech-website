import React from "react";

const BrandIntroductionSection = () => {
  const audiences = [
    {
      title: "For Patients",
      subtitle: "Practice with Purpose",
      icon: "🗣️",
      benefits: [
        "Daily micro-practice + habit nudges",
        "AI scenario simulations & \"risk\" exercises",
        "Audio/video recording + AI audio review",
        "Structured guidance from your therapist",
      ],
      gradient: "from-calm-lavender to-calm-navy",
      iconBg: "bg-calm-lavender",
      delay: "0.2s",
    },
    {
      title: "For Therapists",
      subtitle: "Focus on Care, Not Paperwork",
      icon: "👨‍⚕️",
      benefits: [
        "Clinical dashboard to assign weekly plans",
        "Multidimensional tracking and insights",
        "Automated report generation",
        "See what patients practice between sessions",
      ],
      gradient: "from-calm-navy to-calm-charcoal",
      iconBg: "bg-calm-navy",
      delay: "0.4s",
    },
    {
      title: "For Clinics",
      subtitle: "Scale Without Compromise",
      icon: "🏥",
      benefits: [
        "See more patients without adding staff",
        "Better outcomes through consistent practice",
        "Reduced administrative paperwork",
        "Differentiate your practice with AI tools",
      ],
      gradient: "from-calm-charcoal to-calm-lavender",
      iconBg: "bg-calm-charcoal",
      delay: "0.6s",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-lavender/10 via-white to-calm-navy/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-calm-lavender/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 left-20 w-40 h-40 bg-calm-navy/15 rounded-full blur-3xl animate-float-delayed"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-calm-charcoal/10 rounded-full blur-2xl animate-float-slow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-nunito font-bold text-4xl sm:text-5xl text-calm-charcoal mb-4">
            Introducing{" "}
            <span className="text-transparent bg-gradient-to-r from-calm-navy via-calm-lavender to-calm-navy bg-clip-text">
              UpSpeech
            </span>
          </h2>
          <p className="font-nunito text-xl sm:text-2xl text-calm-charcoal/70">
            Guiding Voices with{" "}
            <span className="text-calm-lavender font-semibold">Care</span> and{" "}
            <span className="text-calm-navy font-semibold">Tech</span>
          </p>
        </div>

        {/* Three Audience Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: audience.delay }}
            >
              {/* Card Container */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-calm-light p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${audience.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <span className="text-white text-3xl">{audience.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-nunito font-bold text-2xl text-calm-charcoal text-center mb-2">
                    {audience.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="font-nunito text-sm text-calm-charcoal/60 text-center mb-6">
                    {audience.subtitle}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-4">
                    {audience.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-calm-lavender rounded-full mt-2 shrink-0"></div>
                        <span className="font-nunito text-sm text-calm-charcoal/80 leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p className="font-nunito text-lg text-calm-charcoal/70 max-w-3xl mx-auto">
            Human-centered speech therapy powered by intelligent tooling —{" "}
            <span className="text-calm-navy font-semibold">
              extending care and amplifying clinician impact
            </span>{" "}
            between sessions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandIntroductionSection;
