import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const {
    threshold = 0.2,
    rootMargin = "0px 0px -10% 0px",
    once = true,
  } = options ?? {};
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(el);

    // Focus counts as arrival, the same way scrolling does. A keyboard user
    // tabbing ahead of the scroll position would otherwise land on content
    // still at opacity 0, which is a focus indicator on something invisible.
    const onFocusIn = () => {
      setRevealed(true);
      if (once) obs.disconnect();
    };
    el.addEventListener("focusin", onFocusIn);

    return () => {
      obs.disconnect();
      el.removeEventListener("focusin", onFocusIn);
    };
  }, [threshold, rootMargin, once]);

  return { ref, revealed };
}
