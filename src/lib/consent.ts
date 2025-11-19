/**
 * Google Consent Mode v2 utilities
 * Manages user consent for analytics and advertising
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

const CONSENT_KEY = "upspeech_cookie_consent";

export type ConsentState = {
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
};

/**
 * Check if user has already made a consent choice
 */
export const hasConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) !== null;
};

/**
 * Get the current consent state from localStorage
 */
export const getConsentState = (): ConsentState | null => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

/**
 * Grant all consent (analytics + advertising)
 * Updates Google Consent Mode and stores preference
 */
export const grantConsent = (): void => {
  if (typeof window === "undefined") return;

  // Update Google Consent Mode
  if (window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  }

  // Store consent preference
  const consentState: ConsentState = {
    analytics: true,
    advertising: true,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentState));
};

/**
 * Deny all consent
 * Updates Google Consent Mode and stores preference
 */
export const denyConsent = (): void => {
  if (typeof window === "undefined") return;

  // Update Google Consent Mode (keep denied)
  if (window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  }

  // Store consent preference
  const consentState: ConsentState = {
    analytics: false,
    advertising: false,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentState));
};

/**
 * Grant only analytics consent (no advertising)
 * Useful for users who want basic analytics but no ads tracking
 */
export const grantAnalyticsOnly = (): void => {
  if (typeof window === "undefined") return;

  // Update Google Consent Mode
  if (window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
  }

  // Store consent preference
  const consentState: ConsentState = {
    analytics: true,
    advertising: false,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentState));
};

/**
 * Clear consent state (for testing or reset)
 */
export const clearConsent = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONSENT_KEY);
};
