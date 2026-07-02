// Resolve a public asset path to its localized variant when a translated file
// exists, else fall back to the English (base) asset. No React here so this is
// safe to import from anywhere.

import { DEFAULT_LOCALE, type Locale } from "./locale";
import { LOCALIZED_ASSETS } from "./localized-assets.generated";

/**
 * Given an English base asset path, return the localized variant for `locale`
 * when one exists under public/, otherwise the base path unchanged.
 *
 * Localized files live under a locale folder inserted after the first path
 * segment, matching scripts/generate-asset-manifest.mjs:
 *   localizedAsset("/screenshots/app/x.png", "pt") -> "/screenshots/pt/app/x.png"
 *   localizedAsset("/videos/hero-demo.mp4", "es")  -> "/videos/es/hero-demo.mp4"
 *   localizedAsset("/screenshots/app/x.png", "en") -> "/screenshots/app/x.png"
 */
export function localizedAsset(basePath: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return basePath;
  if (!LOCALIZED_ASSETS.has(`${locale}|${basePath}`)) return basePath;
  return basePath.replace(/^\/([^/]+)\//, `/$1/${locale}/`);
}
