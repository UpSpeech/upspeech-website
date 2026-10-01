const STORAGE_KEY = "upspeech_campaign";
const MAX_LENGTH = 100;

const PARAMS = {
  utm_source: "source",
  utm_medium: "medium",
  utm_campaign: "campaign",
  utm_content: "content",
} as const;

export type Campaign = Partial<
  Record<(typeof PARAMS)[keyof typeof PARAMS], string>
>;

/**
 * Remember the landing URL's UTM tags for the rest of the session, so a form
 * submitted three pages later still knows which link brought the visitor. A
 * landing with no tags leaves an earlier capture alone.
 */
export const captureCampaign = (search: string): void => {
  const query = new URLSearchParams(search);
  const campaign: Campaign = {};
  for (const [param, key] of Object.entries(PARAMS)) {
    const value = query.get(param)?.trim().slice(0, MAX_LENGTH);
    if (value) campaign[key] = value;
  }
  if (Object.keys(campaign).length === 0) return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(campaign));
  } catch {
    // Storage blocked (private mode, site data off): the lead is still sent.
  }
};

export const getCampaign = (): Campaign => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object") return {};
    const campaign: Campaign = {};
    for (const key of Object.values(PARAMS)) {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === "string" && value) campaign[key] = value;
    }
    return campaign;
  } catch {
    return {};
  }
};
