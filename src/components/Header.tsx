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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-calm-light shadow-sm animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center animate-fade-in cursor-pointer"
            style={{ animationDelay: "0.2s" }}
            onClick={() => {
              trackButtonClick("logo", "header");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/images/logo.png"
              alt="UpSpeech"
              className="h-14 w-auto transition-transform duration-300 hover:scale-105"
            />
          </div>

          <nav
            className="hidden md:flex items-center space-x-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={() => scrollToSection("about")}
              className="font-nunito text-calm-charcoal transition-all duration-200 hover:text-calm-lavender transform px-3 py-2 rounded-md hover:bg-calm-light/30"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="font-nunito text-calm-charcoal transition-all duration-200 hover:text-calm-lavender transform px-3 py-2 rounded-md hover:bg-calm-light/30"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("differentiation")}
              className="font-nunito text-calm-charcoal transition-all duration-200 hover:text-calm-lavender transform px-3 py-2 rounded-md hover:bg-calm-light/30"
            >
              Why Us
            </button>
          </nav>

          <Button
            onClick={() => {
              trackButtonClick("join_waitlist", "header");
              scrollToSection("cta");
            }}
            className="bg-calm-lavender hover:bg-calm-navy text-white font-nunito font-bold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in group"
            style={{ animationDelay: "0.6s" }}
          >
            Join the Waitlist
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
