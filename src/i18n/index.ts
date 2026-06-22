export {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  isLocale,
  localizedPath,
  splitLocaleFromPath,
  type Locale,
} from "./locale";
export { LocaleProvider } from "./LocaleProvider";
export { useLocale, useT } from "./context";
export type { Dictionary } from "./locales/en";
