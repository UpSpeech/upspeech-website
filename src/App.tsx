import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConsentBanner } from "@/components/ConsentBanner";
import { PageViewTracker } from "@/components/PageViewTracker";
import {
  LocaleProvider,
  isLocale,
  localizedPath,
  splitLocaleFromPath,
} from "@/i18n";
import Index from "./pages/Index";

// Backward compatibility: the site used to select locale with a ?lang=pt|es
// query param. Redirect any such legacy/shared URL to the equivalent path URL
// (/pt, /es) and strip the param, preserving any other query string.
function LegacyLangRedirect() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const lang = params.get("lang");
    if (!lang) return;
    params.delete("lang");
    const rest = params.toString();
    // Resolve against the locale-agnostic path so a stale ?lang on an already
    // prefixed URL (e.g. /pt/x?lang=es) re-targets cleanly instead of stacking
    // prefixes; ?lang=en sends the visitor back to the English root.
    const { path } = splitLocaleFromPath(pathname);
    const targetPath = isLocale(lang) ? localizedPath(path, lang) : pathname;
    navigate(
      { pathname: targetPath, search: rest ? `?${rest}` : "" },
      { replace: true },
    );
  }, [pathname, search, navigate]);
  return null;
}

// Lazy-loaded routes, split into separate chunks
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = React.lazy(() => import("./pages/CookiePolicy"));
const DeleteAccount = React.lazy(() => import("./pages/DeleteAccount"));
const Support = React.lazy(() => import("./pages/Support"));
const ForPatients = React.lazy(() => import("./pages/ForPatients"));
const ForSlps = React.lazy(() => import("./pages/ForSlps"));
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

// The full route tree, with locale-agnostic relative paths so it can be mounted
// under "/", "/pt", and "/es". Keep the catch-all NotFound inside this tree.
const AppRoutes = () => (
  <Routes>
    <Route index element={<Index />} />
    <Route path="privacy" element={<PrivacyPolicy />} />
    <Route path="terms" element={<TermsOfService />} />
    <Route path="cookies" element={<CookiePolicy />} />
    <Route path="delete-account" element={<DeleteAccount />} />
    <Route path="support" element={<Support />} />
    <Route path="for-patients" element={<ForPatients />} />
    <Route path="for-slps" element={<ForSlps />} />

    {/* Technique Documentation Routes */}
    <Route path="techniques" element={<TechniquesIndexPage />} />
    <Route
      path="techniques/voluntary-stuttering"
      element={<VoluntaryStuttering />}
    />
    <Route path="techniques/cancelation" element={<Cancelation />} />
    <Route path="techniques/pull-out" element={<PullOut />} />
    <Route path="techniques/preparatory-set" element={<PreparatorySet />} />
    <Route path="techniques/holding" element={<Holding />} />
    <Route path="techniques/soft-starts" element={<SoftStarts />} />
    <Route
      path="techniques/soft-articulation-contact"
      element={<SoftArticulationContact />}
    />
    <Route path="techniques/prolonged-speech" element={<ProlongedSpeech />} />
    <Route
      path="techniques/speech-speed-management"
      element={<SpeechSpeedManagement />}
    />
    <Route path="techniques/pauses" element={<Pauses />} />
    <Route
      path="techniques/identification-desensitization"
      element={<IdentificationDesensitization />}
    />

    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ConsentBanner />
      <BrowserRouter>
        <PageViewTracker />
        <LegacyLangRedirect />
        <Suspense fallback={null}>
          <Routes>
            {/* Portuguese and Spanish live under a locale prefix; English stays
                at the root so every existing URL is unchanged. */}
            <Route
              path="/pt/*"
              element={
                <LocaleProvider locale="pt">
                  <AppRoutes />
                </LocaleProvider>
              }
            />
            <Route
              path="/es/*"
              element={
                <LocaleProvider locale="es">
                  <AppRoutes />
                </LocaleProvider>
              }
            />
            <Route
              path="/*"
              element={
                <LocaleProvider locale="en">
                  <AppRoutes />
                </LocaleProvider>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
