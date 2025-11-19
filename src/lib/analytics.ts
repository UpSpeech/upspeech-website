/**
 * Google Analytics 4 utilities for tracking events
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track a custom event in Google Analytics
 * @param eventName - The name of the event (e.g., 'button_click', 'form_submit')
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>,
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

/**
 * Track a page view in Google Analytics
 * @param pageTitle - The title of the page
 * @param pagePath - The path of the page
 */
export const trackPageView = (pageTitle: string, pagePath: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: pageTitle,
      page_path: pagePath,
    });
  }
};

/**
 * Track a button click event
 * @param buttonName - The name/label of the button clicked
 * @param location - Where the button is located (e.g., 'hero', 'footer', 'navbar')
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent("button_click", {
    button_name: buttonName,
    location: location,
  });
};

/**
 * Track a form submission
 * @param formName - The name of the form submitted
 * @param success - Whether the submission was successful
 */
export const trackFormSubmit = (formName: string, success: boolean = true) => {
  trackEvent("form_submit", {
    form_name: formName,
    success: success,
  });
};

/**
 * Track when a user scrolls to a certain depth
 * @param depth - The scroll depth percentage (e.g., 25, 50, 75, 100)
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent("scroll", {
    depth: depth,
  });
};

/**
 * Track external link clicks
 * @param url - The URL of the external link
 * @param linkText - The text of the link
 */
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent("external_link_click", {
    link_url: url,
    link_text: linkText,
  });
};
