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
