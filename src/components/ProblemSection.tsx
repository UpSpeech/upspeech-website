import React from "react";
import {
  LightBulbIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const ProblemSection = () => {
  const problems = [
    {
      Icon: LightBulbIcon,
      title: "Real-life practice is hard",
      description:
        "Without support, structure, or feedback between sessions, patients lose confidence, get emotionally drained and isolated",
      gradient: "from-calm-navy/20 via-calm-lavender/15 to-calm-navy/5",
      accentColor:
        "border-calm-navy/20 bg-gradient-to-br from-calm-navy/10 to-calm-lavender/10",
    },
    {
      Icon: MagnifyingGlassIcon,
      title: "Limited visibility into what patients do between sessions",
      description:
        "Therapists often don't know if or how patients practice, making it hard to adjust treatment",
      gradient: "from-calm-lavender/20 via-calm-navy/10 to-calm-lavender/5",
      accentColor:
        "border-calm-lavender/20 bg-gradient-to-br from-calm-lavender/10 to-calm-navy/10",
    },
    {
      Icon: ChartBarIcon,
      title: "Progress tracking is manual and time-consuming",
      description:
        "Therapists spend hours creating reports instead of focusing on personalized care",
      gradient: "from-calm-navy/15 via-calm-charcoal/10 to-calm-navy/5",
      accentColor:
        "border-calm-navy/20 bg-gradient-to-br from-calm-navy/10 to-calm-charcoal/10",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-light via-white to-calm-lavender/10 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-calm-navy/10 to-calm-lavender/10 rounded-full blur-2xl animate-float" />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-calm-charcoal/10 to-calm-navy/10 rounded-full blur-2xl animate-float-delayed"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-calm-lavender/15 to-calm-light rounded-full blur-xl animate-float-slow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <img
              src="/images/therapy.jpg"
              alt="People in a therapy session"
              className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-calm-charcoal mb-6 leading-tight">
              The <span className="text-calm-lavender">Hardest</span> Part of
              Speech Therapy
              <br />
              Happens Between Sessions
            </h2>
            <p className="font-body text-xl text-calm-charcoal/70 max-w-3xl leading-relaxed animate-fade-in">
              Your sessions are structured, engaging, and tailored to each
              patient. But maintaining that quality of practice between visits
              has always been a challenge.
            </p>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.2}s` }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 h-full relative overflow-hidden">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 opacity-50 mix-blend-multiply bg-gradient-to-br ${problem.gradient}`}
                />

                {/* Icon Container */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-xl ${problem.accentColor} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                >
                  <problem.Icon className="w-8 h-8 text-calm-navy" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-xl text-calm-charcoal mb-4 transition-colors duration-300 group-hover:text-calm-navy">
                    {problem.title}
                  </h3>
                  <p
                    className="font-body text-base text-calm-charcoal/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: problem.description }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
