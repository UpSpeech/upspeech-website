// Single source of truth for the site's static routes, shared by the sitemap
// generator, the prerenderer and the route-date generator so they never drift.
// Each entry is the locale-agnostic path, the component that owns the route,
// and its sitemap metadata. English lives at the root; pt/es are served under a
// locale prefix.
//
// There is deliberately no `lastmod` here. It used to be typed by hand, and by
// the time anyone looked there were three different answers on the same page:
// the sitemap said one date, the Article JSON-LD in seo-data.ts said another,
// and the backend row said a third. `component` replaces it: the date generator
// walks that file's imports and asks git when any of them last changed. See
// scripts/generate-route-dates.mjs.

export const BASE_URL = "https://upspeech.app";
export const LOCALES = ["en", "pt", "es"];
export const DEFAULT_LOCALE = "en";

// A path no route claims, so the app's "*" catch-all renders NotFound and the
// prerenderer can write that render to dist/404.html. It is never linked, never
// in the sitemap, and never served under this name: Netlify picks 404.html up
// by filename. It only has to be a path App.tsx will not match.
export const NOT_FOUND_RENDER_PATH = "/__not-found__";
export const NOT_FOUND_OUTPUT_FILE = "404.html";

export const ROUTES = [
  {
    path: "/",
    component: "src/pages/Index.tsx",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/techniques",
    component: "src/pages/TechniquesIndexPage.tsx",
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/techniques/voluntary-stuttering",
    component: "src/pages/techniques/VoluntaryStuttering.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/cancelation",
    component: "src/pages/techniques/Cancelation.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/pull-out",
    component: "src/pages/techniques/PullOut.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/preparatory-set",
    component: "src/pages/techniques/PreparatorySet.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/holding",
    component: "src/pages/techniques/Holding.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/soft-starts",
    component: "src/pages/techniques/SoftStarts.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/soft-articulation-contact",
    component: "src/pages/techniques/SoftArticulationContact.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/prolonged-speech",
    component: "src/pages/techniques/ProlongedSpeech.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/speech-speed-management",
    component: "src/pages/techniques/SpeechSpeedManagement.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/pauses",
    component: "src/pages/techniques/Pauses.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/identification-desensitization",
    component: "src/pages/techniques/IdentificationDesensitization.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/for-patients",
    component: "src/pages/ForPatients.tsx",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/person-centered-therapy",
    component: "src/pages/PersonCentered.tsx",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/reducing-documentation-time",
    component: "src/pages/ReducingDocumentationTime.tsx",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/for-slps",
    component: "src/pages/ForSlps.tsx",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/support",
    component: "src/pages/Support.tsx",
    changefreq: "monthly",
    priority: "0.5",
  },
  {
    path: "/privacy",
    component: "src/pages/PrivacyPolicy.tsx",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/terms",
    component: "src/pages/TermsOfService.tsx",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/cookies",
    component: "src/pages/CookiePolicy.tsx",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/delete-account",
    component: "src/pages/DeleteAccount.tsx",
    changefreq: "yearly",
    priority: "0.3",
  },
];

/** Absolute URL for a route path in a given locale (trailing slash, like Netlify serves). */
export function localeUrl(path, locale) {
  const slashed = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${slashed}`;
}

/** In-app path for a route in a given locale (no trailing slash, used by the prerender server). */
export function localePath(path, locale) {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
