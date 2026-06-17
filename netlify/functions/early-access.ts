import type { Handler } from "@netlify/functions";

// Early-access form handler. Receives the form POST same-origin, sends two
// emails through Resend (team notification + applicant auto-reply). The Resend
// key lives only in the Netlify env (RESEND_API_KEY), never in the bundle.

const FROM = "UpSpeech <hello@upspeech.app>"; // must be a Resend-verified sender
const TEAM_TO = "hello@upspeech.app";

// Trim and length-cap a field (raw value, e.g. for an email address).
const trimCap = (value: unknown, max = 200): string =>
  String(value ?? "")
    .trim()
    .slice(0, max);

// Escape HTML so submitted values cannot inject markup into the email body.
const esc = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] ?? char,
  );

async function sendEmail(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST")
    return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const { name, email, role, clinicSize } = JSON.parse(event.body || "{}");

    // Raw, length-capped values. The email address must stay unescaped so it is
    // a valid recipient; only the HTML-body copies below are escaped.
    const rawEmail = trimCap(email, 320);
    if (!name || !rawEmail || !role || !rawEmail.includes("@"))
      return {
        statusCode: 422,
        body: JSON.stringify({ error: "Missing or invalid required fields" }),
      };

    const htmlName = esc(trimCap(name));
    const htmlEmail = esc(rawEmail);
    const htmlRole = esc(trimCap(role));
    const htmlClinicSize = clinicSize
      ? esc(trimCap(clinicSize))
      : "Not specified";

    await sendEmail({
      from: FROM,
      to: [TEAM_TO],
      reply_to: rawEmail,
      subject: `Early-access request: ${htmlName}`,
      html: `<p>New early-access request.</p><ul><li>Name: ${htmlName}</li><li>Email: ${htmlEmail}</li><li>Role: ${htmlRole}</li><li>Clinic size: ${htmlClinicSize}</li></ul>`,
    });

    await sendEmail({
      from: FROM,
      to: [rawEmail],
      reply_to: TEAM_TO,
      subject: "Thanks for your interest in UpSpeech",
      html: `<p>Hi ${htmlName},</p><p>Thanks for requesting early access to UpSpeech. We will be in touch shortly.</p><p>The UpSpeech team</p>`,
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("early-access function error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Send failed" }) };
  }
};
