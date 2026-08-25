/**
 * Early-access form handler.
 *
 * Order matters here. The lead is written to its stores first, then the team
 * notification goes out carrying the result of those writes, and only then the
 * applicant confirmation. That way a Resend outage cannot lose a lead, and a
 * bounced applicant address cannot fail a submission we already recorded.
 *
 * The Resend key lives only in the Netlify env, never in the bundle.
 */

import type { Handler } from "@netlify/functions";
import { oneLine, isSafeHttpsUrl } from "../lib/text";
import {
  applicantCopy,
  isEmailLocale,
  DEFAULT_EMAIL_LOCALE,
} from "../lib/copy";
import {
  applicantEmail,
  teamEmail,
  type Lead,
  type RenderedEmail,
} from "../lib/email-template";
import { appendLeadToSheet, addResendContact } from "../lib/leads";

const FROM = "UpSpeech <hello@upspeech.app>"; // must be a Resend-verified sender
const TEAM_TO = "hello@upspeech.app";
const SEND_TIMEOUT_MS = 6000;

/* Rejects "a@b" and trailing junk, which the old includes("@") check let past. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

async function sendEmail(
  email: RenderedEmail,
  to: string,
  replyTo: string,
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    body: JSON.stringify({
      from: FROM,
      to: [to],
      reply_to: replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });
  if (!res.ok) {
    // Cap the upstream body so a verbose Resend error cannot flood the logs.
    const detail = (await res.text()).slice(0, 200);
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST")
    return { statusCode: 405, body: "Method Not Allowed" };

  // Fail cleanly until the key is wired up in the Netlify dashboard, rather
  // than sending "Bearer undefined" to Resend on every request.
  if (!process.env.RESEND_API_KEY)
    return { statusCode: 503, body: "Service unavailable" };

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  try {
    const { name, email, role, clinicSize, company, locale } = body;

    // Honeypot: a real user never fills the hidden "company" field. Pretend
    // success so bots get no signal, but record and send nothing.
    if (oneLine(company)) return json(200, { ok: true });

    const lead: Lead = {
      name: oneLine(name),
      email: oneLine(email, 320),
      role: oneLine(role),
      clinicSize: oneLine(clinicSize),
      locale: isEmailLocale(locale) ? locale : DEFAULT_EMAIL_LOCALE,
    };

    if (!lead.name || !lead.role || !EMAIL_PATTERN.test(lead.email))
      return json(422, { error: "Missing or invalid required fields" });

    // Write the lead down before anything is sent. Neither call rejects; each
    // reports its own status, which the team email then repeats.
    const [sheet, audience] = await Promise.all([
      appendLeadToSheet(lead),
      addResendContact(lead),
    ]);
    const persistence = { sheet, audience };

    let teamNotified = false;
    try {
      await sendEmail(teamEmail(lead, persistence), TEAM_TO, lead.email);
      teamNotified = true;
    } catch (err) {
      console.error("team notification failed:", err);
    }

    // Only a total loss is an error the visitor should see. If any one of the
    // three landed, the request is safely recorded somewhere we will look.
    if (!teamNotified && sheet !== "ok" && audience !== "ok") {
      console.error("early-access request was not recorded anywhere");
      return json(500, { error: "Send failed" });
    }

    // The confirmation is the one part we can follow up by hand, so a failure
    // here is logged and swallowed rather than shown as a failed submission.
    try {
      const copy = applicantCopy(lead.locale);
      const surveyUrl = oneLine(process.env.EARLY_ACCESS_SURVEY_URL, 500);
      await sendEmail(
        applicantEmail(
          lead,
          copy,
          isSafeHttpsUrl(surveyUrl) ? surveyUrl : undefined,
        ),
        lead.email,
        TEAM_TO,
      );
    } catch (err) {
      console.error("applicant confirmation failed:", err);
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("early-access function error:", err);
    return json(500, { error: "Send failed" });
  }
};
