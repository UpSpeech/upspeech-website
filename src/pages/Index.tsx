import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandIntroductionSection from "@/components/BrandIntroductionSection";
import ProblemSection from "@/components/ProblemSection";
import InterstitialCTA from "@/components/InterstitialCTA";
import SolutionSection from "@/components/SolutionSection";
import GuidingVoicesBanner from "@/components/GuidingVoicesBanner";
import DifferentiationSection from "@/components/DifferentiationSection";
import ValueCycleSection from "@/components/ValueCycleSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen font-nunito">
      <Header />
      <HeroSection />
      <ProblemSection />
      <InterstitialCTA />
      <BrandIntroductionSection />
      <SolutionSection />
      <ValueCycleSection />
      <GuidingVoicesBanner />
      <DifferentiationSection />
      <CTASection />
      {/* <FAQSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
