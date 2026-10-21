/*
 * What the join flow posts and the early-access function accepts. Both sides
 * import this file, so a new option cannot reach one and be blanked by the
 * other. No imports: the function bundle pulls it in on its own.
 */

export const PROFILES = [
  "therapist",
  "patient",
  "caregiver",
  "referrer",
] as const;
export type Profile = (typeof PROFILES)[number];

export const REQUESTS = ["waitlist", "early", "demo", "pilot"] as const;
export type Request = (typeof REQUESTS)[number];

export const CLINIC_SIZES = ["solo", "small", "medium", "large"] as const;
export type ClinicSize = (typeof CLINIC_SIZES)[number];

export const COMPANIONS = ["lumo", "nima", "tumbo", "pip"] as const;

/** A friend's share code, as handed out in /join?ref=<code>. */
export const SHARE_CODE = /^[a-z0-9]{4,12}$/;

/*
 * Rejects "a@b" and trailing junk. Also refuses <, >, ", comma and ?, which
 * would let an address carry a display name or extra mailto: headers.
 */
export const EMAIL_PATTERN = /^[^\s@<>",?]+@[^\s@<>",?]+\.[^\s@<>",?]{2,}$/;
