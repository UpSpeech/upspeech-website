const STORAGE_KEY = "upspeech_campaign";
const MAX_LENGTH = 100;
// Letters in any script, digits and a few separators. Control characters, bidi
// marks and markup never reach the event, the sheet or the team email.
const DISALLOWED = /[^\p{L}\p{N}_.\-~ +%]/gu;

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
    const value = query
      .get(param)
      ?.replace(DISALLOWED, "")
      .trim()
      .slice(0, MAX_LENGTH);
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

/**
 * What the lead event may carry: the two answers picked from a list and the
 * campaign, never the name or email the visitor typed.
 */
export const leadEventProperties = (
  form: { profile: string; request: string },
  campaign: Campaign,
) => ({
  profile: form.profile,
  request: form.request,
  ...campaign,
});

const REFERRAL_KEY = "upspeech_ref";
/** The shape of a share code the join flow hands out. Anything else is dropped. */
export const SHARE_CODE = /^[a-z0-9]{4,12}$/;

/**
 * A friend's share link is /join?ref=<code>. Kept apart from the campaign so an
 * untagged visit with a ref never clears earlier UTM tags, and the other way
 * round.
 */
export const captureReferral = (search: string): void => {
  const ref = new URLSearchParams(search).get("ref")?.trim().toLowerCase();
  if (!ref || !SHARE_CODE.test(ref)) return;
  try {
    sessionStorage.setItem(REFERRAL_KEY, ref);
  } catch {
    // Storage blocked: the visit simply is not attributed.
  }
};

export const getReferral = (): string => {
  try {
    const ref = sessionStorage.getItem(REFERRAL_KEY) ?? "";
    return SHARE_CODE.test(ref) ? ref : "";
  } catch {
    return "";
  }
};
