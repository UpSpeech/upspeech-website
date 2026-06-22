import React, { useEffect, useRef, useState } from "react";
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
// The "inline" variant lays the three locales out as a row (no popover) for use
// inside the already-expanded mobile menu, where a nested dropdown would be
// clipped by the menu's own scroll container.
export function LocaleSwitcher({
  className,
  variant = "dropdown",
}: {
  className?: string;
  variant?: "dropdown" | "inline";
}) {
  const locale = useLocale();
  const t = useT();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const { path } = splitLocaleFromPath(pathname);

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    // Document-level Escape so the menu still closes once focus has Shift+Tabbed
    // out of it (the per-element handlers no longer fire there).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // On open, move focus to the active (or first) menu item.
  useEffect(() => {
    if (!open) return;
    const activeIndex = SUPPORTED_LOCALES.indexOf(locale);
    const target = activeIndex >= 0 ? activeIndex : 0;
    itemRefs.current[target]?.focus();
  }, [open, locale]);

  const closeAndRestore = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const focusItem = (index: number) => {
    const count = SUPPORTED_LOCALES.length;
    const next = ((index % count) + count) % count;
    itemRefs.current[next]?.focus();
  };

  const onMenuKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusItem(index + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusItem(index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusItem(0);
        break;
      case "End":
        e.preventDefault();
        focusItem(SUPPORTED_LOCALES.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        closeAndRestore();
        break;
      default:
        break;
    }
  };

  const choose = (l: Locale) => {
    setOpen(false);
    if (l !== locale) navigate({ pathname: localizedPath(path, l), hash });
  };

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <span className="flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wider text-calm-charcoal/50">
          <GlobeAltIcon className="h-4 w-4" aria-hidden="true" />
          {t.localeSwitcher.label}
        </span>
        <div
          role="group"
          aria-label={t.localeSwitcher.label}
          className="flex flex-wrap gap-2"
        >
          {SUPPORTED_LOCALES.map((l) => {
            const active = l === locale;
            return (
              <button
                key={l}
                type="button"
                aria-current={active ? "true" : undefined}
                onClick={() => choose(l)}
                className={cn(
                  "rounded-full px-4 py-2 font-body text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy focus-visible:ring-offset-2",
                  active
                    ? "bg-calm-navy text-white"
                    : "border border-calm-charcoal/15 bg-white text-calm-charcoal hover:bg-calm-light",
                )}
              >
                {LABELS[l]}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t.localeSwitcher.label}: ${LABELS[locale]}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          } else if (e.key === "Escape" && open) {
            e.preventDefault();
            setOpen(false);
          }
        }}
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
          {SUPPORTED_LOCALES.map((l, index) => {
            const active = l === locale;
            return (
              <li key={l} role="none">
                <button
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  type="button"
                  role="menuitem"
                  aria-current={active ? "true" : undefined}
                  onClick={() => choose(l)}
                  onKeyDown={(e) => onMenuKeyDown(e, index)}
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
