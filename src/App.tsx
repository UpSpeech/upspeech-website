import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConsentBanner } from "@/components/ConsentBanner";
import { PageViewTracker } from "@/components/PageViewTracker";
import { SEO } from "@/components/SEO";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

// Technique Pages
import { TechniquesIndexPage } from "./pages/TechniquesIndexPage";
import VoluntaryStuttering from "./pages/techniques/VoluntaryStuttering";
import Cancelation from "./pages/techniques/Cancelation";
import PullOut from "./pages/techniques/PullOut";
import PreparatorySet from "./pages/techniques/PreparatorySet";
import Holding from "./pages/techniques/Holding";
import SoftStarts from "./pages/techniques/SoftStarts";
import SoftArticulationContact from "./pages/techniques/SoftArticulationContact";
import ProlongedSpeech from "./pages/techniques/ProlongedSpeech";
import SpeechSpeedManagement from "./pages/techniques/SpeechSpeedManagement";
import Pauses from "./pages/techniques/Pauses";
import IdentificationDesensitization from "./pages/techniques/IdentificationDesensitization";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ConsentBanner />
        <BrowserRouter>
          <PageViewTracker />
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

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
