import React, { useMemo } from "react";
import type { Dictionary } from "./locales/en";
import { en } from "./locales/en";
import { pt } from "./locales/pt";
import { es } from "./locales/es";
import { type Locale } from "./locale";
import { LocaleContext, type LocaleContextValue } from "./context";

const DICTIONARIES: Record<Locale, Dictionary> = { en, pt, es };

/** The dictionary for a locale. For use outside the LocaleProvider tree
 * (e.g. the global consent banner, which derives locale from the URL). */
export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(
    () => ({ locale, t: DICTIONARIES[locale] }),
    [locale],
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
