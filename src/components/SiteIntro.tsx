import { useEffect, useState } from "react";
import BrandLockup from "./BrandLockup";
import SpeechRing from "./SpeechRing";

const SESSION_KEY = "upspeech_intro_seen";
const TOTAL_MS = 2600;

/**
 * The one-off opening: a speech envelope writing itself into a ring, clockwise,
 * the way a recording runs start to finish, resolving into the logo.
 *
 * The ring collapses onto the figure and her speech bubble arrives as it goes,
 * so the recording becomes the mark rather than being replaced by it. The
 * wordmark writes in last. See index.css for the timings.
 *
 * Deliberately constrained, because an intro is a tax on the first view:
 *  - once per browsing session, not once per page
 *  - never for a reader who has asked for less motion
 *  - never on a page opened from a shared deep link, only the home page
 *  - removed from the DOM the moment it finishes
 *
 * It renders nothing during prerender and mounts on the client, so the
 * prerendered HTML a crawler reads is the page itself rather than a splash.
 */
const SiteIntro = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode or storage disabled. Treat it as seen and skip: showing
      // the intro on every single navigation is worse than never showing it.
      return;
    }
    if (seen) return;

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return;
    }

    setVisible(true);
    const id = window.setTimeout(() => setVisible(false), TOTAL_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-intro" aria-hidden="true">
      <div className="site-intro__stage">
        <SpeechRing size="var(--intro-ring)" intro className="site-intro__ring" />
        <div className="site-intro__lockup">
          <BrandLockup width="var(--intro-lockup)" />
        </div>
      </div>
    </div>
  );
};

export default SiteIntro;
