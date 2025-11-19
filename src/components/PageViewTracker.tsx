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
    trackPageView(document.title, location.pathname + location.search);
  }, [location]);

  return null;
};
