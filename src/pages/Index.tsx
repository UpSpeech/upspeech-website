import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import HeroOptionD from "@/components/HeroOptionD";
import WeekInPhotos from "@/components/WeekInPhotos";
import InterstitialCTA from "@/components/InterstitialCTA";
import HandoffScene from "@/components/HandoffScene";
import TherapistScene from "@/components/TherapistScene";
import PatientScene from "@/components/PatientScene";
import MobileAppBand from "@/components/MobileAppBand";
import FeatureGallerySection from "@/components/FeatureGallerySection";
import CycleScene from "@/components/CycleScene";
import EngineSection from "@/components/EngineSection";
import FoundationsScene from "@/components/FoundationsScene";
import SecuritySection from "@/components/SecuritySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useLocale, useT } from "@/i18n";

const Index = () => {
  const locale = useLocale();
  const t = useT();
  return (
    <div className="min-h-screen font-body">
      <SEO path="/" locale={locale} description={t.home.seoDescription} />
      <Header />
      <main id="main">
        <HeroOptionD />
        <WeekInPhotos />
        <div id="features">
          <HandoffScene />
          <TherapistScene />
          <PatientScene />
        </div>
        <MobileAppBand />
        <CycleScene />
        <InterstitialCTA />
        <FeatureGallerySection />
        <div id="differentiation">
          <EngineSection />
        </div>
        <div id="about">
          <FoundationsScene />
        </div>
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
