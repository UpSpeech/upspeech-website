import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { trackButtonClick } from "@/lib/analytics";
import { useLocale, useT, localizedPath } from "@/i18n";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const locale = useLocale();
  const t = useT().nav;
  const isHome = pathname === localizedPath("/", locale);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus within the open mobile drawer (WCAG 2.4.3): a modal dialog must
  // not leak keyboard focus to the page behind it.
  useEffect(() => {
    if (!menuOpen) return;

    const drawer = drawerRef.current;
    const toggle = toggleRef.current;

    const getFocusable = () =>
      drawer
        ? Array.from(
            drawer.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((el) => el.offsetParent !== null)
        : [];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !drawer?.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !drawer?.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    // Move focus into the drawer once it has mounted.
    getFocusable()[0]?.focus();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    trackButtonClick(`nav_${sectionId}`, "header");
    setMenuOpen(false);
    // Off the homepage the section ids don't exist, so route home to the anchor.
    if (!isHome) {
      window.location.href = `${localizedPath("/", locale)}#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (!element) return;
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-calm-light shadow-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-body focus:text-calm-charcoal focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
      >
        {t.skipToContent}
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            type="button"
            aria-label={isHome ? t.logoScrollTop : t.logoGoHome}
            className="flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender rounded-lg"
            onClick={() => {
              trackButtonClick("logo", "header");
              setMenuOpen(false);
              if (!isHome) {
                window.location.href = localizedPath("/", locale);
                return;
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/images/logo.svg"
              alt="UpSpeech"
              className="h-12 sm:h-14 w-auto"
              width="192"
              height="56"
            />
          </button>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="font-body text-calm-charcoal transition-all duration-200 hover:text-calm-lavender px-3 py-2 rounded-md hover:bg-calm-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              {t.howItWorks}
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="font-body text-calm-charcoal transition-all duration-200 hover:text-calm-lavender px-3 py-2 rounded-md hover:bg-calm-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              {t.features}
            </button>
            <button
              onClick={() => scrollToSection("differentiation")}
              className="font-body text-calm-charcoal transition-all duration-200 hover:text-calm-lavender px-3 py-2 rounded-md hover:bg-calm-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              {t.whyUs}
            </button>
            <a
              href={localizedPath("/techniques", locale)}
              className="font-body text-calm-charcoal transition-all duration-200 hover:text-calm-lavender px-3 py-2 rounded-md hover:bg-calm-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
              onClick={() => trackButtonClick("nav_techniques", "header")}
            >
              {t.techniques}
            </a>
            <LocaleSwitcher />
          </nav>

          <Button
            onClick={() => {
              trackButtonClick("join_waitlist", "header");
              scrollToSection("cta");
            }}
            className="hidden md:inline-flex bg-gradient-primary hover:bg-calm-navy text-white font-body font-bold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 group shadow-button"
          >
            {t.requestAccess}
          </Button>

          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-calm-charcoal hover:bg-calm-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={drawerRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={t.mobileMenuLabel}
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-calm-light shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto"
        >
          <nav className="flex flex-col p-4 gap-1">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="font-body text-left text-calm-charcoal px-4 py-3 rounded-md hover:bg-calm-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              {t.howItWorks}
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="font-body text-left text-calm-charcoal px-4 py-3 rounded-md hover:bg-calm-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              {t.features}
            </button>
            <button
              onClick={() => scrollToSection("differentiation")}
              className="font-body text-left text-calm-charcoal px-4 py-3 rounded-md hover:bg-calm-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              {t.whyUs}
            </button>
            <a
              href={localizedPath("/techniques", locale)}
              className="font-body text-left text-calm-charcoal px-4 py-3 rounded-md hover:bg-calm-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
              onClick={() => {
                trackButtonClick("nav_techniques", "header");
                setMenuOpen(false);
              }}
            >
              {t.techniques}
            </a>
            <Button
              onClick={() => {
                trackButtonClick("join_waitlist", "header");
                scrollToSection("cta");
              }}
              className="mt-2 bg-gradient-primary hover:bg-calm-navy text-white font-body font-bold px-6 py-3 rounded-full shadow-button"
            >
              {t.requestAccess}
            </Button>
            <div className="mt-4 border-t border-calm-light pt-4">
              <LocaleSwitcher variant="inline" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
