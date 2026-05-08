import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackButtonClick } from "@/lib/analytics";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close drawer on Escape, and lock background scroll while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    trackButtonClick(`nav_${sectionId}`, "header");
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (!element) return;
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-calm-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            type="button"
            aria-label="UpSpeech, scroll to top"
            className="flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender rounded-lg"
            onClick={() => {
              trackButtonClick("logo", "header");
              setMenuOpen(false);
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
              onClick={() => scrollToSection("about")}
              className="font-body text-calm-charcoal transition-all duration-200 hover:text-calm-lavender px-3 py-2 rounded-md hover:bg-calm-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="font-body text-calm-charcoal transition-all duration-200 hover:text-calm-lavender px-3 py-2 rounded-md hover:bg-calm-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("differentiation")}
              className="font-body text-calm-charcoal transition-all duration-200 hover:text-calm-lavender px-3 py-2 rounded-md hover:bg-calm-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              Why Us
            </button>
            <a
              href="/techniques"
              className="font-body text-calm-charcoal transition-all duration-200 hover:text-calm-lavender px-3 py-2 rounded-md hover:bg-calm-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
              onClick={() => trackButtonClick("nav_techniques", "header")}
            >
              Techniques
            </a>
          </nav>

          <Button
            onClick={() => {
              trackButtonClick("join_waitlist", "header");
              scrollToSection("cta");
            }}
            className="hidden md:inline-flex bg-gradient-primary hover:bg-calm-navy text-white font-body font-bold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 group shadow-button"
          >
            Request early access
          </Button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
          id="mobile-nav"
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-calm-light shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto"
        >
          <nav className="flex flex-col p-4 gap-1">
            <button
              onClick={() => scrollToSection("about")}
              className="font-body text-left text-calm-charcoal px-4 py-3 rounded-md hover:bg-calm-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="font-body text-left text-calm-charcoal px-4 py-3 rounded-md hover:bg-calm-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("differentiation")}
              className="font-body text-left text-calm-charcoal px-4 py-3 rounded-md hover:bg-calm-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
            >
              Why Us
            </button>
            <a
              href="/techniques"
              className="font-body text-left text-calm-charcoal px-4 py-3 rounded-md hover:bg-calm-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender"
              onClick={() => {
                trackButtonClick("nav_techniques", "header");
                setMenuOpen(false);
              }}
            >
              Techniques
            </a>
            <Button
              onClick={() => {
                trackButtonClick("join_waitlist", "header");
                scrollToSection("cta");
              }}
              className="mt-2 bg-gradient-primary hover:bg-calm-navy text-white font-body font-bold px-6 py-3 rounded-full shadow-button"
            >
              Request early access
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
