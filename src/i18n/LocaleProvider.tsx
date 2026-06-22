import React, { useMemo } from "react";
import type { Dictionary } from "./locales/en";
import { en } from "./locales/en";
import { pt } from "./locales/pt";
import { es } from "./locales/es";
import { type Locale } from "./locale";
import { LocaleContext, type LocaleContextValue } from "./context";

const DICTIONARIES: Record<Locale, Dictionary> = { en, pt, es };

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
