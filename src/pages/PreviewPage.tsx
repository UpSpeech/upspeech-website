import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Option heroes
import HeroOptionA from "@/components/preview/HeroOptionA";
import HeroOptionB from "@/components/preview/HeroOptionB";
import HeroOptionC from "@/components/preview/HeroOptionC";

// Shared live-site sections reused in preview
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import GuidingVoicesBanner from "@/components/GuidingVoicesBanner";
import TechniquesOverviewSection from "@/components/TechniquesOverviewSection";
import CTASection from "@/components/CTASection";
import PartnersSection from "@/components/PartnersSection";

// Preview-only sections
import ProductShowcaseSection from "@/components/preview/ProductShowcaseSection";
import LabsSection from "@/components/preview/LabsSection";
import DifferentiationSectionPreview from "@/components/preview/DifferentiationSectionPreview";

// Option D — cinematic narrative
import HeroOptionD from "@/components/preview/optionD/HeroOptionD";
import GapSection from "@/components/preview/optionD/GapSection";
import TherapistScene from "@/components/preview/optionD/TherapistScene";
import PatientScene from "@/components/preview/optionD/PatientScene";
import CycleScene from "@/components/preview/optionD/CycleScene";
import JourneyScene from "@/components/preview/optionD/JourneyScene";
import EngineSection from "@/components/preview/optionD/EngineSection";
import FoundationsScene from "@/components/preview/optionD/FoundationsScene";
import InvitationSection from "@/components/preview/optionD/InvitationSection";

type Option = "A" | "B" | "C" | "D";

const optionMeta: Record<
  Option,
  { label: string; subtitle: string; description: string }
> = {
  A: {
    label: "Option A: Quick Wins",
    subtitle: "B2B-tilted conservative upgrade",
    description:
      "Current site refreshed with B2B hero copy, real screenshots, and the UpSpeech Labs research story. Minimum disruption, maximum signal for clinic decision-makers.",
  },
  B: {
    label: "Option B: Clinic-Focused",
    subtitle: "ICP = Private clinics (PT / ES / BR)",
    description:
      "Hero anchored in the 167-hour practice gap. Continuous-care narrative, annotation tool in the product showcase, research credibility up front. No public pricing.",
  },
  C: {
    label: "Option C: Infrastructure Layer",
    subtitle: "Aligned to investor / enterprise deck positioning",
    description:
      "Deck-aligned repositioning: 'The Infrastructure Layer for Speech Therapy'. Hybrid care framing, dedicated UpSpeech Labs section as the data moat, partnership CTA.",
  },
  D: {
    label: "Option D: Cinematic Narrative",
    subtitle: "Apple-style four-act story",
    description:
      "Self-contained editorial flow — scroll-linked 167-hour reveal, staggered pillar choreography, dark Labs act, quiet closing invitation. No shared site chrome; the story carries it.",
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
                — comparing 3 B2B narratives
              </span>
            </div>
            <div className="flex gap-2">
              {(["A", "B", "C", "D"] as Option[]).map((opt) => (
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
          <DifferentiationSectionPreview />
          <LabsSection />
          <TechniquesOverviewSection />
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
          <DifferentiationSectionPreview />
          <LabsSection />
          <TechniquesOverviewSection />
          <CTASection />
          <Footer />
        </>
      )}

      {/* ============ OPTION C: Infrastructure Layer ============ */}
      {option === "C" && (
        <>
          <HeroOptionC />
          <ProblemSection />
          <ProductShowcaseSection />
          <SolutionSection />
          <LabsSection />
          <GuidingVoicesBanner />
          <DifferentiationSectionPreview />
          <TechniquesOverviewSection />
          <CTASection />
          <Footer />
        </>
      )}

      {/* ============ OPTION D: Cinematic Narrative ============ */}
      {option === "D" && (
        <>
          <HeroOptionD />
          <GapSection />
          <TherapistScene />
          <PatientScene />
          <CycleScene />
          <JourneyScene />
          <EngineSection />
          <FoundationsScene />
          <InvitationSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default PreviewPage;
