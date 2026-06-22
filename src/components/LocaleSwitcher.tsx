import { useLocation, useNavigate } from "react-router-dom";
import {
  SUPPORTED_LOCALES,
  useLocale,
  useT,
  localizedPath,
  splitLocaleFromPath,
} from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Language pills that navigate to the same route under a different locale
 * prefix. Reads the active locale and the locale-agnostic path, so switching
 * keeps the visitor on the page they are viewing.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useT();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const { path } = splitLocaleFromPath(pathname);

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="group"
      aria-label={t.localeSwitcher.label}
    >
      {SUPPORTED_LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            aria-current={active ? "true" : undefined}
            onClick={() => navigate({ pathname: localizedPath(path, l), hash })}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy focus-visible:ring-offset-2",
              active
                ? "bg-calm-navy text-white"
                : "bg-white text-calm-charcoal border border-calm-charcoal/15 hover:bg-calm-light",
            )}
          >
            {t.localeSwitcher[l]}
          </button>
        );
      })}
    </div>
  );
}
