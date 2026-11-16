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

// Storage can throw: Safari with site data blocked, some embedded webviews.
// A throw here would take the whole page down, so treat it as "no choice yet".
const readStored = (): string | null => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

const store = (analytics: boolean, advertising: boolean): void => {
  const state: ConsentState = { analytics, advertising, timestamp: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    // The choice still applies for this page view.
  }
};

/**
 * Check if user has already made a consent choice
 */
export const hasConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  return readStored() !== null;
};

/**
 * Get the current consent state from localStorage
 */
export const getConsentState = (): ConsentState | null => {
  if (typeof window === "undefined") return null;

  const stored = readStored();
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

/** Push one state to all trackers (GA4 Consent Mode, Clarity, PostHog). */
const pushSignals = (analytics: boolean, advertising: boolean): void => {
  const ga = (on: boolean) => (on ? "granted" : "denied");
  if (window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: ga(advertising),
      ad_user_data: ga(advertising),
      ad_personalization: ga(advertising),
      analytics_storage: ga(analytics),
    });
  }

  if (window.clarity) {
    window.clarity("consentv2", {
      ad_Storage: ga(advertising),
      analytics_Storage: ga(analytics),
    });
  }

  if (analytics) posthog.opt_in_capturing();
  else posthog.opt_out_capturing();
};

/**
 * Re-apply a stored choice on load. It neither widens the choice (an
 * analytics-only visitor stays analytics-only) nor rewrites its timestamp.
 */
export const applyConsent = (state: ConsentState): void => {
  if (typeof window === "undefined") return;
  pushSignals(state.analytics === true, state.advertising === true);
};

/**
 * Grant all consent (analytics + advertising)
 * Updates Google Consent Mode, Microsoft Clarity, and stores preference
 */
export const grantConsent = (): void => {
  if (typeof window === "undefined") return;
  pushSignals(true, true);
  store(true, true);
};

/**
 * Deny all consent
 * Updates Google Consent Mode, Microsoft Clarity, and stores preference
 */
export const denyConsent = (): void => {
  if (typeof window === "undefined") return;
  pushSignals(false, false);
  store(false, false);
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
  pushSignals(false, false);
};

/**
 * Grant only analytics consent (no advertising)
 * Useful for users who want basic analytics but no ads tracking
 */
export const grantAnalyticsOnly = (): void => {
  if (typeof window === "undefined") return;
  pushSignals(true, false);
  store(true, false);
};

/**
 * Clear consent state (for testing or reset)
 */
export const clearConsent = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Nothing stored that could be read back either.
  }
};
