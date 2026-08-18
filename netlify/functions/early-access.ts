import type { Handler } from "@netlify/functions";

// Early-access form handler. Receives the form POST same-origin, sends two
// emails through Resend (team notification + applicant auto-reply). The Resend
// key lives only in the Netlify env (RESEND_API_KEY), never in the bundle.

const FROM = "UpSpeech <hello@upspeech.app>"; // must be a Resend-verified sender
const TEAM_TO = "hello@upspeech.app";

// Normalize a field to a single line, then length-cap it. Stripping CR/LF
// keeps user input out of email headers (subject/reply-to) where it could
// otherwise inject extra headers.
const oneLine = (value: unknown, max = 200): string =>
  String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

// Escape HTML so submitted values cannot inject markup into the email body.
const escapeHtml = (value: string): string =>
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
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  try {
    const { name, email, role, clinicSize, company } = body;

    // Honeypot: a real user never fills the hidden "company" field. Pretend
    // success so bots get no signal, but send nothing.
    if (oneLine(company))
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };

    // Raw single-line values. The email address stays unescaped so it remains
    // a valid recipient; the *Html copies below are escaped for the body.
    const safeName = oneLine(name);
    const rawEmail = oneLine(email, 320);
    const safeRole = oneLine(role);
    const safeClinicSize = oneLine(clinicSize) || "Not specified";

    if (!safeName || !rawEmail || !safeRole || !rawEmail.includes("@"))
      return {
        statusCode: 422,
        body: JSON.stringify({ error: "Missing or invalid required fields" }),
      };

    const htmlName = escapeHtml(safeName);
    const htmlEmail = escapeHtml(rawEmail);
    const htmlRole = escapeHtml(safeRole);
    const htmlClinicSize = escapeHtml(safeClinicSize);

    await sendEmail({
      from: FROM,
      to: [TEAM_TO],
      reply_to: rawEmail,
      subject: `Early-access request: ${safeName}`,
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
