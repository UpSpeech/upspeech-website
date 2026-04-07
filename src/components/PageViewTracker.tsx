import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Component to track page views on route changes
 * Must be rendered inside BrowserRouter
 */
export const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on location change
    const pagePath = location.pathname + location.search;
    trackPageView(document.title, pagePath);

    // Signal route change to Microsoft Clarity for accurate heatmaps/recordings
    if (window.clarity) {
      window.clarity("set", "page", pagePath);
    }
  }, [location]);

  return null;
};
