import { createContext, useContext } from "react";
import type { Dictionary } from "./locales/en";
import { en } from "./locales/en";
import { DEFAULT_LOCALE, type Locale } from "./locale";

export interface LocaleContextValue {
  locale: Locale;
  t: Dictionary;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  t: en,
});

/** The active locale (derived from the URL path by the router). */
export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

/** The resolved dictionary for the active locale. */
export function useT(): Dictionary {
  return useContext(LocaleContext).t;
}
