import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Option heroes
import HeroOptionA from "@/components/preview/HeroOptionA";
import HeroOptionB from "@/components/preview/HeroOptionB";
import HeroOptionC from "@/components/preview/HeroOptionC";

// Existing sections (shared)
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import GuidingVoicesBanner from "@/components/GuidingVoicesBanner";
import DifferentiationSection from "@/components/DifferentiationSection";
import TechniquesOverviewSection from "@/components/TechniquesOverviewSection";
import CTASection from "@/components/CTASection";

// New sections
import ProductShowcaseSection from "@/components/preview/ProductShowcaseSection";
import PricingSection from "@/components/preview/PricingSection";
import ROICalculatorSection from "@/components/preview/ROICalculatorSection";
import SocialProofSection from "@/components/preview/SocialProofSection";
import PartnersSection from "@/components/PartnersSection";

type Option = "A" | "B" | "C";

const optionMeta: Record<
  Option,
  { label: string; subtitle: string; description: string }
> = {
  A: {
    label: "Option A: Quick Wins",
    subtitle: "Conservative upgrade",
    description:
      "Current site with real screenshots, pricing, and product showcase. Minimal copy changes. Fastest to ship.",
  },
  B: {
    label: "Option B: Clinic-Focused",
    subtitle: "ICP = Private clinics (PT/ES)",
    description:
      "New hero targeting clinic owners. ROI calculator, per-therapist pricing, social proof with pilot metrics. Focused economic narrative.",
  },
  C: {
    label: "Option C: Clinical OS",
    subtitle: "Bold repositioning",
    description:
      'Full rebrand as "Clinical Operating System for Speech Therapy". Enterprise feel, platform showcase, regulatory roadmap placeholder. Highest impact, biggest change.',
  },
};

const PreviewPage = () => {
  const [option, setOption] = useState<Option>("A");

  return (
    <div className="min-h-screen font-body">
      {/* Sticky option switcher */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-calm-navy text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm">
                Website Preview
              </span>
              <span className="text-white/50 text-xs hidden sm:inline">
                — comparing 3 options from the audit
              </span>
            </div>
            <div className="flex gap-2">
              {(["A", "B", "C"] as Option[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setOption(opt);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-body font-semibold transition-all duration-200 ${
                    option === opt
                      ? "bg-white text-calm-navy shadow-sm"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Option description banner */}
      <div className="mt-[52px] bg-gradient-to-r from-calm-lavender/20 to-calm-navy/10 border-b border-calm-light">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-calm-navy text-white flex items-center justify-center font-heading font-bold">
              {option}
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-calm-charcoal">
                {optionMeta[option].label}{" "}
                <span className="text-calm-lavender font-normal text-base">
                  — {optionMeta[option].subtitle}
                </span>
              </h2>
              <p className="font-body text-sm text-calm-charcoal/70 mt-1">
                {optionMeta[option].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ OPTION A: Quick Wins ============ */}
      {option === "A" && (
        <>
          <Header />
          <div className="mt-20">
            <HeroOptionA />
          </div>
          <ProblemSection />
          <ProductShowcaseSection />
          <SolutionSection />
          <GuidingVoicesBanner />
          <DifferentiationSection />
          <TechniquesOverviewSection />
          <PricingSection />
          <PartnersSection />
          <CTASection />
          <Footer />
        </>
      )}

      {/* ============ OPTION B: Clinic-Focused ============ */}
      {option === "B" && (
        <>
          <Header />
          <div className="mt-20">
            <HeroOptionB />
          </div>
          <ProblemSection />
          <ProductShowcaseSection />
          <SolutionSection />
          <GuidingVoicesBanner />
          <DifferentiationSection />
          <ROICalculatorSection />
          <SocialProofSection />
          <PricingSection />
          <TechniquesOverviewSection />
          <CTASection />
          <Footer />
        </>
      )}

      {/* ============ OPTION C: Clinical OS ============ */}
      {option === "C" && (
        <>
          <HeroOptionC />
          <ProblemSection />
          <ProductShowcaseSection />
          <SolutionSection />
          <ROICalculatorSection />
          <GuidingVoicesBanner />
          <DifferentiationSection />
          <SocialProofSection />
          <PricingSection />
          <TechniquesOverviewSection />
          <CTASection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default PreviewPage;
