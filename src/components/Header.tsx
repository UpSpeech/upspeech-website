import React from "react";
import { Button } from "@/components/ui/button";
import { trackButtonClick } from "@/lib/analytics";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    trackButtonClick(`nav_${sectionId}`, "header");
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // height of header (h-20 = 5rem = 80px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-calm-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            type="button"
            aria-label="UpSpeech — scroll to top"
            className="flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-lavender rounded-lg"
            onClick={() => {
              trackButtonClick("logo", "header");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/images/logo.svg"
              alt="UpSpeech"
              className="h-14 w-auto"
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
            className="bg-gradient-primary hover:bg-calm-navy text-white font-body font-bold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 group shadow-button"
          >
            Join the Waitlist
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
