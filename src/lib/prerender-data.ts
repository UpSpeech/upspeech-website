/**
 * Build-time payload bridge between the prerenderer and the client.
 *
 * scripts/prerender.mjs renders every route in a real browser and serializes the
 * DOM, so a page that fetched from the backend ships HTML containing the result.
 * That data is gone by the time a visitor loads the page, so the page refetches
 * it and the prerendered paint is thrown away waiting for the response.
 *
 * Pages record what they fetched with writeSeed(). The prerenderer serializes
 * the collected record into a JSON script tag, and the same pages read it back
 * with readSeed() on their first client render, so the markup React produces
 * matches the markup already on screen and hydration keeps the paint.
 *
 * A client-side navigation to a different route finds no seed for its key and
 * fetches normally, which is correct: the baked payload only describes the route
 * the HTML was generated for.
 */

export const PRERENDER_DATA_ID = "__PRERENDER_DATA__";

type Seeds = Record<string, unknown>;

declare global {
  interface Window {
    __PRERENDER_DATA__?: Seeds;
  }
}

let parsed: Seeds | null = null;

function seeds(): Seeds {
  if (parsed) return parsed;
  if (typeof document === "undefined") return (parsed = {});
  const el = document.getElementById(PRERENDER_DATA_ID);
  try {
    parsed = el?.textContent ? (JSON.parse(el.textContent) as Seeds) : {};
  } catch {
    // A truncated or malformed payload is not worth failing a page render over;
    // the page falls back to fetching, which is what it did before seeding.
    parsed = {};
  }
  return parsed;
}

/** The payload the prerenderer baked in for `key`, or null on a normal navigation. */
export function readSeed<T>(key: string): T | null {
  return (seeds()[key] as T | undefined) ?? null;
}

/** Record a payload for the prerenderer to bake in. Harmless in a visitor's browser. */
export function writeSeed(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  window.__PRERENDER_DATA__ = { ...window.__PRERENDER_DATA__, [key]: value };
}

/** Seed key for a single technique article. */
export const techniqueKey = (slug: string, locale: string) =>
  `technique:${locale}:${slug}`;

/** Seed key for the technique index listing. */
export const techniquesKey = (locale: string) => `techniques:${locale}`;
