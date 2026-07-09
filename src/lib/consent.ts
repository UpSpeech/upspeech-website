/**
 * Consent Mode utilities
 * Manages user consent for analytics and advertising (GA4, Clarity, PostHog)
 */

import posthog from "posthog-js";

// Extend Window interface to include gtag and clarity
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
    clarity?: (command: string, ...args: unknown[]) => void;
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
 * Updates Google Consent Mode, Microsoft Clarity, and stores preference
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

  // Update Microsoft Clarity Consent (v2 API)
  if (window.clarity) {
    window.clarity("consentv2", {
      ad_Storage: "granted",
      analytics_Storage: "granted",
    });
  }

  // Enable PostHog tracking
  posthog.opt_in_capturing();

  // Store consent preference
  const consentState: ConsentState = {
    analytics: true,
    advertising: true,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentState));
};

/**
 * Push a denied state to all trackers (GA4 Consent Mode, Clarity, PostHog).
 * Shared by explicit decline and the GPC deny path.
 */
const pushDeniedSignals = (): void => {
  if (window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  }

  if (window.clarity) {
    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "denied",
    });
  }

  posthog.opt_out_capturing();
};

/**
 * Deny all consent
 * Updates Google Consent Mode, Microsoft Clarity, and stores preference
 */
export const denyConsent = (): void => {
  if (typeof window === "undefined") return;

  pushDeniedSignals();

  // Store consent preference
  const consentState: ConsentState = {
    analytics: false,
    advertising: false,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentState));
};

/**
 * Whether the browser is sending a Global Privacy Control signal. GPC is a
 * recognized opt-out signal (CCPA and others); when present we treat it as a
 * deny for analytics/advertising and never prompt.
 */
export const isGpcEnabled = (): boolean => {
  if (typeof navigator === "undefined") return false;
  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
};

/**
 * Honor a GPC signal by denying all trackers, without persisting a choice.
 * Re-applied on every load so that turning GPC off later restores the banner.
 */
export const applyGpcDenial = (): void => {
  if (typeof window === "undefined") return;
  pushDeniedSignals();
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

  // Update Microsoft Clarity Consent (v2 API)
  if (window.clarity) {
    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "granted",
    });
  }

  // Enable PostHog tracking (analytics only)
  posthog.opt_in_capturing();

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
