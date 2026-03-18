import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConsentBanner } from "@/components/ConsentBanner";
import { PageViewTracker } from "@/components/PageViewTracker";
import Index from "./pages/Index";

// Lazy-loaded routes — split into separate chunks
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = React.lazy(() => import("./pages/CookiePolicy"));
const TechniquesIndexPage = React.lazy(() =>
  import("./pages/TechniquesIndexPage").then((m) => ({
    default: m.TechniquesIndexPage,
  })),
);
const VoluntaryStuttering = React.lazy(
  () => import("./pages/techniques/VoluntaryStuttering"),
);
const Cancelation = React.lazy(() => import("./pages/techniques/Cancelation"));
const PullOut = React.lazy(() => import("./pages/techniques/PullOut"));
const PreparatorySet = React.lazy(
  () => import("./pages/techniques/PreparatorySet"),
);
const Holding = React.lazy(() => import("./pages/techniques/Holding"));
const SoftStarts = React.lazy(() => import("./pages/techniques/SoftStarts"));
const SoftArticulationContact = React.lazy(
  () => import("./pages/techniques/SoftArticulationContact"),
);
const ProlongedSpeech = React.lazy(
  () => import("./pages/techniques/ProlongedSpeech"),
);
const SpeechSpeedManagement = React.lazy(
  () => import("./pages/techniques/SpeechSpeedManagement"),
);
const Pauses = React.lazy(() => import("./pages/techniques/Pauses"));
const IdentificationDesensitization = React.lazy(
  () => import("./pages/techniques/IdentificationDesensitization"),
);

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ConsentBanner />
      <BrowserRouter>
        <PageViewTracker />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />

            {/* Technique Documentation Routes */}
            <Route path="/techniques" element={<TechniquesIndexPage />} />
            <Route
              path="/techniques/voluntary-stuttering"
              element={<VoluntaryStuttering />}
            />
            <Route path="/techniques/cancelation" element={<Cancelation />} />
            <Route path="/techniques/pull-out" element={<PullOut />} />
            <Route
              path="/techniques/preparatory-set"
              element={<PreparatorySet />}
            />
            <Route path="/techniques/holding" element={<Holding />} />
            <Route path="/techniques/soft-starts" element={<SoftStarts />} />
            <Route
              path="/techniques/soft-articulation-contact"
              element={<SoftArticulationContact />}
            />
            <Route
              path="/techniques/prolonged-speech"
              element={<ProlongedSpeech />}
            />
            <Route
              path="/techniques/speech-speed-management"
              element={<SpeechSpeedManagement />}
            />
            <Route path="/techniques/pauses" element={<Pauses />} />
            <Route
              path="/techniques/identification-desensitization"
              element={<IdentificationDesensitization />}
            />

            <Route path="/preview" element={<PreviewPage />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
