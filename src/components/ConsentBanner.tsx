import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  hasConsent,
  grantConsent,
  denyConsent,
  getConsentState,
} from "@/lib/consent";

/**
 * Cookie Consent Banner with Google Consent Mode v2 integration
 * Displays a banner at the bottom of the page for users who haven't made a consent choice
 */
export const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent choice
    const hasUserConsent = hasConsent();

    if (!hasUserConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // User has already consented, apply their saved preference
      const consentState = getConsentState();
      if (consentState?.analytics) {
        grantConsent();
      }
    }
  }, []);

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

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300"
      role="dialog"
      aria-labelledby="consent-banner-title"
      aria-describedby="consent-banner-description"
    >
      <Card className="mx-auto max-w-4xl border-2 shadow-lg">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 space-y-2">
            <h2
              id="consent-banner-title"
              className="text-lg font-semibold text-gray-900"
            >
              Your Privacy Matters
            </h2>
            <p
              id="consent-banner-description"
              className="text-sm text-gray-600"
            >
              We use cookies to improve your experience and analyze site usage.
              By accepting, you agree to our use of analytics cookies. You can
              decline if you prefer.{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-900"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleDecline}
              className="sm:order-1"
            >
              Decline
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handleAccept}
              className="sm:order-2"
            >
              Accept
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
