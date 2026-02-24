import React from "react";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import InterstitialCTA from "@/components/InterstitialCTA";
import SolutionSection from "@/components/SolutionSection";
import GuidingVoicesBanner from "@/components/GuidingVoicesBanner";
import DifferentiationSection from "@/components/DifferentiationSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen font-body">
      <SEO path="/" />
      <Header />
      <HeroSection />
      <ProblemSection />
      <InterstitialCTA />
      <SolutionSection />
      <GuidingVoicesBanner />
      <DifferentiationSection />
      <PartnersSection />
      <CTASection />
      {/* <FAQSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
