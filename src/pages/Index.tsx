import { SEO } from "@/components/SEO";
import SiteIntro from "@/components/SiteIntro";
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

  // The handoff section describes an actual sequence, so it is published as
  // one. Google retired HowTo rich results in 2023, so this buys nothing in
  // the search listing; it is here so an answer engine reading the page has
  // the steps as data rather than having to infer them from the prose.
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t.home.handoff.howTo.name,
    description: t.home.handoff.body,
    step: t.home.handoff.howTo.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <div className="min-h-screen font-body">
      <SEO
        path="/"
        locale={locale}
        description={t.home.seoDescription}
        structuredData={howTo}
      />
      <SiteIntro />
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
