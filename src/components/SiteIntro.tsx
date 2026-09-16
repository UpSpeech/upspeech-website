import { useEffect, useState } from "react";
import BrandLockup from "./BrandLockup";
import SpeechRing from "./SpeechRing";

const TOTAL_MS = 1200;

/**
 * The one-off opening: a speech envelope writing itself into a ring, clockwise,
 * the way a recording runs start to finish, resolving into the logo.
 *
 * The ring then contracts and travels until it is the speech bubble: same
 * position, same diameter, and the bubble comes up underneath to take over.
 * The recording becomes the mark rather than being replaced by it. The
 * wordmark writes in last. See index.css for the timings.
 *
 * It runs only when ?intro is on the URL, so a visitor gets the headline. Even
 * then it never runs for a reader who has asked for less motion, only on the
 * home page, and it leaves the DOM the moment it finishes. Why it is opt-in:
 * decisions/2026-09-16-the-site-intro-is-opt-in.md in the umbrella repo.
 *
 * It renders nothing during prerender and mounts on the client, so the
 * prerendered HTML a crawler reads is the page itself rather than a splash.
 */
const SiteIntro = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Absolute veto, and it outranks ?intro. Someone who has asked for less
    // motion does not get it because a link had a query string on it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!new URLSearchParams(window.location.search).has("intro")) return;

    setVisible(true);
    const id = window.setTimeout(() => setVisible(false), TOTAL_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-intro" aria-hidden="true">
      <div className="site-intro__stage">
        <SpeechRing
          size="var(--intro-ring)"
          intro
          className="site-intro__ring"
        />
        <div className="site-intro__lockup">
          <BrandLockup width="var(--intro-lockup)" />
        </div>
      </div>
    </div>
  );
};

export default SiteIntro;
