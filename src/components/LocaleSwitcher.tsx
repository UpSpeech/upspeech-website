import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GlobeAltIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import {
  SUPPORTED_LOCALES,
  useLocale,
  useT,
  localizedPath,
  splitLocaleFromPath,
  type Locale,
} from "@/i18n";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
};

// Compact language menu: a globe trigger showing the active language, opening a
// small popover of the three locales. Keeps the calm header uncluttered and
// reads as a standard control. Navigating keeps the visitor on the same page.
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useT();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const { path } = splitLocaleFromPath(pathname);

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (l: Locale) => {
    setOpen(false);
    if (l !== locale) navigate({ pathname: localizedPath(path, l), hash });
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t.localeSwitcher.label}: ${LABELS[locale]}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-calm-charcoal/15 bg-white px-3 py-2 font-body text-sm font-medium text-calm-charcoal transition-colors hover:bg-calm-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy focus-visible:ring-offset-2"
      >
        <GlobeAltIcon className="h-4 w-4 text-calm-navy" aria-hidden="true" />
        <span>{LABELS[locale]}</span>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 text-calm-charcoal/50 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={t.localeSwitcher.label}
          className="absolute right-0 z-50 mt-2 min-w-[10rem] origin-top-right overflow-hidden rounded-xl border border-calm-navy/10 bg-white p-1 shadow-[0_20px_50px_-20px_rgba(41,53,135,0.25)] animate-in fade-in zoom-in-95 slide-in-from-top-1 duration-150"
        >
          {SUPPORTED_LOCALES.map((l) => {
            const active = l === locale;
            return (
              <li key={l} role="none">
                <button
                  type="button"
                  role="menuitem"
                  aria-current={active ? "true" : undefined}
                  onClick={() => choose(l)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy",
                    active
                      ? "font-medium text-calm-navy"
                      : "text-calm-charcoal hover:bg-calm-light",
                  )}
                >
                  <span>{LABELS[l]}</span>
                  {active && (
                    <CheckIcon
                      className="h-4 w-4 text-calm-navy"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
