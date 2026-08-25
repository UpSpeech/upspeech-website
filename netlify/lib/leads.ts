/**
 * Where a lead gets written down.
 *
 * Two independent stores, and neither is allowed to take the request down with
 * it. Each returns its own status instead of throwing, so one outage cannot
 * stop the other write or the emails. The caller reports these statuses in the
 * team notification.
 *
 * Every call is bounded by a timeout. Netlify cuts a function off at 10s, and
 * an external service hanging for that long would surface to the visitor as a
 * failed submission even though nothing was actually wrong with their request.
 */

import { clinicSizeLabel, roleLabel } from "./copy";
import type { Lead } from "./email-template";
import type { WriteStatus } from "./email-template";

const WRITE_TIMEOUT_MS = 4000;
const RESEND_API = "https://api.resend.com";

/** Split a submitted full name into the two fields Resend contacts hold. */
const splitName = (name: string): { first: string; last: string } => {
  const parts = name.split(/\s+/).filter(Boolean);
  return { first: parts[0] ?? "", last: parts.slice(1).join(" ") };
};

/**
 * Append a row to the Google Sheet through the Apps Script web app deployed
 * from that sheet (see sheet-webhook.gs). The deployment URL is world-postable
 * by design, so the shared secret travels in the body and the script drops
 * anything that does not match.
 */
export const appendLeadToSheet = async (lead: Lead): Promise<WriteStatus> => {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) return "not configured";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(WRITE_TIMEOUT_MS),
      body: JSON.stringify({
        secret,
        submittedAt: new Date().toISOString(),
        name: lead.name,
        email: lead.email,
        // English labels, not the posted slugs and not the visitor's language,
        // so the Role column stays filterable across all three locales.
        role: roleLabel("en", lead.role),
        clinicSize: clinicSizeLabel("en", lead.clinicSize),
        locale: lead.locale,
      }),
    });

    if (!res.ok) {
      console.error(`sheet append failed: HTTP ${res.status}`);
      return "failed";
    }

    /*
     * Apps Script answers 200 even when doPost throws, so the body decides.
     * The script replies {"ok":true} on a successful append.
     */
    const payload = (await res.text()).slice(0, 200);
    if (!payload.includes('"ok":true')) {
      console.error(`sheet append rejected: ${payload}`);
      return "failed";
    }
    return "ok";
  } catch (err) {
    console.error("sheet append error:", err);
    return "failed";
  }
};

/**
 * Add the applicant to a Resend audience so the waitlist can be emailed later
 * without exporting and pasting addresses. Resend holds name and email only,
 * which is why the sheet carries role and clinic size.
 */
export const addResendContact = async (lead: Lead): Promise<WriteStatus> => {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const apiKey = process.env.RESEND_API_KEY;
  if (!audienceId || !apiKey) return "not configured";

  const { first, last } = splitName(lead.name);

  try {
    const res = await fetch(
      `${RESEND_API}/audiences/${encodeURIComponent(audienceId)}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(WRITE_TIMEOUT_MS),
        body: JSON.stringify({
          email: lead.email,
          first_name: first,
          last_name: last,
          unsubscribed: false,
        }),
      },
    );

    if (res.ok) return "ok";

    /*
     * Someone asking twice is not a failure, and the contact is already on the
     * list either way. Matched on the message rather than the status code so a
     * change to which 4xx Resend picks does not turn this into a false alarm.
     */
    const detail = (await res.text()).slice(0, 200);
    if (detail.toLowerCase().includes("already exists")) return "ok";

    console.error(`resend contact failed: HTTP ${res.status}: ${detail}`);
    return "failed";
  } catch (err) {
    console.error("resend contact error:", err);
    return "failed";
  }
};
