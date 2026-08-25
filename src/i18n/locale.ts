// Locale constants and path helpers. No React here so this module is safe to
// import from scripts and non-component code.

export const SUPPORTED_LOCALES = ["en", "pt", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return (
    value != null && (SUPPORTED_LOCALES as readonly string[]).includes(value)
  );
}

/**
 * Prefix a locale-agnostic in-app path with the active locale.
 * English lives at the root (no prefix); pt/es live under /pt and /es.
 *   localizedPath("/techniques", "pt") -> "/pt/techniques"
 *   localizedPath("/", "es")           -> "/es"
 *   localizedPath("/privacy", "en")    -> "/privacy"
 */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * The URL to link to for a locale-agnostic path, with the trailing slash
 * Netlify actually serves.
 *   localizedHref("/techniques", "pt") -> "/pt/techniques/"
 *   localizedHref("/", "es")           -> "/es/"
 *   localizedHref("/privacy", "en")    -> "/privacy/"
 *
 * Use this for anything that becomes an href or a location assignment, and
 * localizedPath for in-app route matching. Netlify 301s the slashless form to
 * this one, so linking to localizedPath costs every internal link a redirect
 * hop and points crawlers at a URL that is not the page's own canonical.
 *
 * A react-router <Link to> is both at once, and it takes this one: it renders a
 * real <a href> that crawlers follow, and v6 route matching ignores a trailing
 * slash. Only programmatic navigation that never reaches the DOM, meaning
 * navigate() and pathname comparisons, stays on localizedPath.
 */
export function localizedHref(path: string, locale: Locale): string {
  const inApp = localizedPath(path, locale);
  return inApp.endsWith("/") ? inApp : `${inApp}/`;
}

/**
 * Split a full pathname into its locale and the locale-agnostic remainder.
 *   "/pt/techniques" -> { locale: "pt", path: "/techniques" }
 *   "/pt"            -> { locale: "pt", path: "/" }
 *   "/techniques"    -> { locale: "en", path: "/techniques" }
 */
export function splitLocaleFromPath(pathname: string): {
  locale: Locale;
  path: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    const rest = "/" + segments.slice(1).join("/");
    return { locale: first, path: rest === "/" ? "/" : rest };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}
