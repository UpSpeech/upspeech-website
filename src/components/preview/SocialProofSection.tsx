import React from "react";
import {
  AcademicCapIcon,
  BeakerIcon,
  UserGroupIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const metrics = [
  { value: "11+", label: "Therapeutic Techniques" },
  { value: "36+", label: "Structured Steps" },
  { value: "3", label: "Clinical Partners" },
  { value: "SpeechCare", label: "Lead Clinical Advisor" },
] as const;

const trustCards = [
  {
    icon: UserGroupIcon,
    title: "Clinical Partnership",
    description:
      "Co-developed with SpeechCare, a leading Portuguese speech therapy clinic. Every feature validated by practicing SLPs.",
  },
  {
    icon: AcademicCapIcon,
    title: "ElevenLabs Grants Program",
    description:
      "Selected for the ElevenLabs AI Grants program, providing cutting-edge speech synthesis technology.",
  },
  {
    icon: BeakerIcon,
    title: "Evidence-Based Approach",
    description:
      "Built on stuttering modification, fluency shaping, and cognitive approaches backed by decades of clinical research.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Pilot Program Launching",
    description:
      "Starting March 2026 with select clinics. Join the pilot to shape the future of speech therapy technology.",
  },
] as const;

const SocialProofSection = () => {
  return (
    <section aria-labelledby="social-proof-heading" className="w-full">
      {/* Part 1: By the Numbers banner */}
      <div className="w-full py-14 sm:py-16 bg-gradient-to-br from-calm-charcoal to-calm-navy border-y border-calm-light">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="social-proof-heading"
            className="font-heading font-extrabold tracking-tight text-center text-2xl sm:text-3xl text-white mb-10"
          >
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-1">
                  {metric.value}
                </p>
                <p className="font-body text-sm sm:text-base text-white/70">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Part 2: Trust signals grid */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-calm-light bg-white p-6 sm:p-8 shadow-card animate-fade-in-up"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-calm-navy/10">
                  <card.icon className="h-6 w-6 text-calm-navy" />
                </div>
                <h3 className="font-heading font-bold text-lg text-calm-charcoal mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-calm-charcoal/70">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
