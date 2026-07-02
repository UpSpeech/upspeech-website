// Locale dictionaries and a plain lookup. No React here, so this module is safe
// to import from outside the LocaleProvider tree (e.g. the global consent
// banner, which derives its locale from the URL).

import type { Dictionary } from "./locales/en";
import { en } from "./locales/en";
import { pt } from "./locales/pt";
import { es } from "./locales/es";
import { type Locale } from "./locale";

export const DICTIONARIES: Record<Locale, Dictionary> = { en, pt, es };

/** The dictionary for a locale. */
export const getDictionary = (locale: Locale): Dictionary =>
  DICTIONARIES[locale];
