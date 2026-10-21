import { SEO } from "@/components/SEO";
import SiteIntro from "@/components/SiteIntro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WeekInPhotos from "@/components/WeekInPhotos";
import ClinicianDay from "@/components/ClinicianDay";
import QuietBeat from "@/components/QuietBeat";
import InterstitialCTA from "@/components/InterstitialCTA";
import MobileAppBand from "@/components/MobileAppBand";
import CycleScene from "@/components/CycleScene";
import EngineSection from "@/components/EngineSection";
import FoundationsScene from "@/components/FoundationsScene";
import SecuritySection from "@/components/SecuritySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localizedHref, useLocale, useT } from "@/i18n";

const Index = () => {
  const locale = useLocale();
  const t = useT();
  const navigate = useNavigate();

  // #cta used to be the sign-up form. Old links, shared URLs and any button
  // still pointing there open the join flow instead.
  useEffect(() => {
    const toJoin = () => {
      if (window.location.hash === "#cta")
        navigate(localizedHref("/join", locale), { replace: true });
    };
    toJoin();
    window.addEventListener("hashchange", toJoin);
    return () => window.removeEventListener("hashchange", toJoin);
  }, [navigate, locale]);

  // The handoff section describes an actual sequence, so it is published as
  // one. Google retired HowTo rich results in 2023, so this buys nothing in
  // the search listing; it is here so an answer engine reading the page has
  // the steps as data rather than having to infer them from the prose.
  const day = t.home.day;
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: day.howToName,
    description: day.body,
    step: [day.before, day.assessment, day.session, day.plan, day.close].map(
      (s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.headline,
        text: s.body,
      }),
    ),
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
        <Hero />
        <WeekInPhotos />
        <QuietBeat />
        <div id="features">
          <ClinicianDay />
        </div>
        <MobileAppBand />
        <CycleScene />
        <InterstitialCTA />
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
