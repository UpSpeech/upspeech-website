export {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  isLocale,
  localizedPath,
  splitLocaleFromPath,
  type Locale,
} from "./locale";
export { localizedAsset } from "./assets";
export { LocaleProvider, getDictionary } from "./LocaleProvider";
export { useLocale, useT } from "./context";
export type { Dictionary } from "./locales/en";
