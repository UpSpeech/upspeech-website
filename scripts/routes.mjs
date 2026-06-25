// Single source of truth for the site's static routes, shared by the sitemap
// generator and the prerenderer so they never drift. Each entry is the
// locale-agnostic path plus its sitemap metadata. English lives at the root;
// pt/es are served under a locale prefix.

export const BASE_URL = "https://upspeech.app";
export const LOCALES = ["en", "pt", "es"];
export const DEFAULT_LOCALE = "en";

export const ROUTES = [
  { path: "/", lastmod: "2026-05-08", changefreq: "weekly", priority: "1.0" },
  {
    path: "/techniques",
    lastmod: "2026-04-23",
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/techniques/voluntary-stuttering",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/cancelation",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/pull-out",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/preparatory-set",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/holding",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/soft-starts",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/soft-articulation-contact",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/prolonged-speech",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/speech-speed-management",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/pauses",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/techniques/identification-desensitization",
    lastmod: "2026-04-23",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/for-patients",
    lastmod: "2026-06-18",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/for-slps",
    lastmod: "2026-06-25",
    changefreq: "monthly",
    priority: "0.8",
  },
  { path: "/support", changefreq: "monthly", priority: "0.5" },
  {
    path: "/privacy",
    lastmod: "2026-04-23",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/terms",
    lastmod: "2026-04-23",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/cookies",
    lastmod: "2026-04-23",
    changefreq: "yearly",
    priority: "0.3",
  },
  { path: "/delete-account", changefreq: "yearly", priority: "0.3" },
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
