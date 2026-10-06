import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  hasConsent,
  grantConsent,
  denyConsent,
  getConsentState,
  isGpcEnabled,
  applyGpcDenial,
} from "@/lib/consent";
import { getDictionary, splitLocaleFromPath } from "@/i18n";

/**
 * Cookie Consent Banner with Google Consent Mode v2 integration
 * Displays a banner at the bottom of the page for users who haven't made a consent choice
 */
export const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    // If the user already made a choice, respect it and apply their saved
    // preference rather than showing the banner again.
    if (hasConsent()) {
      const consentState = getConsentState();
      if (consentState?.analytics) {
        grantConsent();
      }
      return;
    }

    // Honor Global Privacy Control as a deny signal without prompting.
    if (isGpcEnabled()) {
      applyGpcDenial();
      return;
    }

    // Show banner after a short delay for better UX
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Other fixed layers read --consent-bar-h to keep clear of the bar. The
  // header's mobile drawer is the first one; the var(..., 0px) fallback on the
  // reading side is what makes it safe to only publish it while mounted.
  useEffect(() => {
    if (!showBanner) return;

    const bar = barRef.current;
    if (!bar) return;

    // A ResizeObserver rather than a resize listener: switching locale
    // re-renders longer copy into a banner that never unmounts, and the window
    // has not changed size.
    const root = document.documentElement;
    const observer = new ResizeObserver(() => {
      const height = Math.round(bar.getBoundingClientRect().height);
      root.style.setProperty("--consent-bar-h", `${height}px`);
    });
    observer.observe(bar);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-bar-h");
    };
  }, [showBanner]);

  const handleAccept = () => {
    grantConsent();
    setShowBanner(false);
  };

  const handleDecline = () => {
    denyConsent();
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  // Rendered outside the LocaleProvider tree, so derive the locale from the URL.
  // useLocation keeps this in sync across client-side language switches.
  const { locale } = splitLocaleFromPath(pathname);
  const t = getDictionary(locale).consent;

  // data-consent-banner marks this for removal from the prerendered HTML. The
  // banner appears a second after mount, so whether a build captured it came
  // down to how long that route took to settle, and a visitor who already
  // answered got it painted and then removed. Consent state only exists in the
  // browser, so the banner does not belong in a static file.
  return (
    <div
      ref={barRef}
      data-consent-banner="true"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-calm-light bg-white shadow-lg animate-in slide-in-from-bottom duration-300"
      role="dialog"
      aria-labelledby="consent-banner-title"
      aria-describedby="consent-banner-description"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-[max(1rem,5vw)] py-2 sm:justify-between sm:gap-6 sm:px-[max(1.5rem,5vw)] sm:py-4">
        <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-2">
          <h2
            id="consent-banner-title"
            className="text-[13px] font-semibold leading-tight text-gray-900 sm:shrink-0 sm:text-sm"
          >
            {t.title}
          </h2>
          <p
            id="consent-banner-description"
            className="text-xs leading-snug text-gray-600 sm:text-sm"
          >
            <span className="sm:hidden">{t.descriptionShort}</span>
            <span className="hidden sm:inline">{t.description}</span>{" "}
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-900"
            >
              {t.learnMore}
            </a>
          </p>
        </div>
        <div className="flex shrink-0 gap-2 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="h-11 min-w-[5.5rem] border-primary px-3 text-primary sm:order-1 sm:h-9 sm:min-w-0"
          >
            {t.decline}
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleAccept}
            className="h-11 min-w-[5.5rem] px-3 sm:order-2 sm:h-9 sm:min-w-0"
          >
            {t.accept}
          </Button>
        </div>
      </div>
    </div>
  );
};
