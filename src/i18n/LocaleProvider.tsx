import React, { useMemo } from "react";
import { type Locale } from "./locale";
import { LocaleContext, type LocaleContextValue } from "./context";
import { DICTIONARIES } from "./dictionaries";

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
