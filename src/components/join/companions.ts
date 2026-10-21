import type { Species } from "@/components/Companion";

/** Each companion's own accent, the colour of its belly, cheeks and antenna. */
export const COMPANION_ACCENTS: Record<Species, string> = {
  lumo: "#958af0",
  nima: "#69b2e1",
  tumbo: "#cca163",
  pip: "#6ebaa7",
};

/** The pale card each companion sits on. */
export const COMPANION_TINTS: Record<Species, string> = {
  lumo: "#eeebfd",
  nima: "#e4f1fa",
  tumbo: "#f7eedf",
  pip: "#e3f2ee",
};

export const AUDIENCES = ["therapist", "patient", "family", "friend"] as const;
export type Audience = (typeof AUDIENCES)[number];

/**
 * Who each companion stands for. This matches the printed Web Summit table
 * cards, whose QR codes land on /c/<companion>.
 */
export const AUDIENCE: Record<
  Audience,
  {
    companion: Species;
    profile: "therapist" | "patient" | "caregiver" | "referrer";
  }
> = {
  therapist: { companion: "nima", profile: "therapist" },
  patient: { companion: "lumo", profile: "patient" },
  family: { companion: "tumbo", profile: "caregiver" },
  friend: { companion: "pip", profile: "referrer" },
};

export const isAudience = (value: unknown): value is Audience =>
  typeof value === "string" && (AUDIENCES as readonly string[]).includes(value);
