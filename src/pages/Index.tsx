import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import HeroOptionD from "@/components/HeroOptionD";
import CredibilityStrip from "@/components/CredibilityStrip";
import GapSection from "@/components/GapSection";
import InterstitialCTA from "@/components/InterstitialCTA";
import TherapistScene from "@/components/TherapistScene";
import PatientScene from "@/components/PatientScene";
import MobileAppBand from "@/components/MobileAppBand";
import FeatureGallerySection from "@/components/FeatureGallerySection";
import CycleScene from "@/components/CycleScene";
import JourneyScene from "@/components/JourneyScene";
import EngineSection from "@/components/EngineSection";
import FoundationsScene from "@/components/FoundationsScene";
import InvitationSection from "@/components/InvitationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-body">
      <SEO path="/" />
      <Header />
      <main id="main">
        <HeroOptionD />
        <CredibilityStrip />
        <GapSection />
        <div id="features">
          <TherapistScene />
          <PatientScene />
        </div>
        <MobileAppBand />
        <CycleScene />
        <InterstitialCTA />
        <FeatureGallerySection />
        <JourneyScene />
        <div id="differentiation">
          <EngineSection />
        </div>
        <div id="about">
          <FoundationsScene />
        </div>
        <InvitationSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
