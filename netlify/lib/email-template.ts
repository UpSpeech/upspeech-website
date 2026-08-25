/**
 * HTML for the two early-access emails.
 *
 * Built as tables with inline styles because mail clients are not browsers:
 * Outlook renders through Word, and Gmail drops most of what a <style> block
 * declares. The <style> block here carries only progressive enhancement, the
 * mobile media query and the dark-mode overrides, so the email is complete
 * without it.
 *
 * Dark mode works by class. Inline styles beat a stylesheet, so every element
 * that carries a colour also carries the class that overrides it with
 * !important under prefers-color-scheme: dark. Adding a coloured element
 * without its class leaves it at its light value, which on a dark background
 * means navy text on a navy card.
 *
 * There are no images. Gmail and Outlook block remote images by default for
 * unknown senders, and the old EmailJS template led with a hosted logo, so the
 * first thing most recipients saw was a broken placeholder. The wordmark is
 * set as text, which renders the same whether images load or not.
 */

import { escapeHtml, firstName } from "./text";
import { clinicSizeLabel, roleLabel } from "./copy";
import type { ApplicantCopy, EmailLocale } from "./copy";

/* Palette, from app-frontend/src/index.css by way of tailwind.config.ts. */
const NAVY = "#293587";
const LAVENDER = "#958AF0";
const LAVENDER_INK = "#6866C4"; // 4.90:1 on white; plain lavender is 2.93:1
const CHARCOAL = "#4B4E4E";
const MIST = "#F5F6FC";
const LINE = "#D9DDF7";

/* Status colours for the team email, chosen to pass on the light card. */
const STATUS = {
  ok: { colour: "#0B7A54", cls: "st-ok" },
  failed: { colour: "#C22B2B", cls: "st-bad" },
  "not configured": { colour: "#6F7285", cls: "st-none" },
} as const;

/*
 * No webfont is fetched. src/fonts.css self-hosts the brand faces specifically
 * to avoid runtime requests to fonts.googleapis.com, and an email that pulled
 * them from Google would hand the recipient's IP over on open, undoing that.
 * So the stack names the brand faces first, for recipients who have them
 * installed, and falls to geometric humanist faces rather than dropping
 * straight to Arial.
 */
const DISPLAY = `'Outfit','Avenir Next',Avenir,'Segoe UI',Roboto,Helvetica,Arial,sans-serif`;
const BODY = `'Plus Jakarta Sans','Avenir Next',Avenir,'Segoe UI',Roboto,Helvetica,Arial,sans-serif`;

export interface Lead {
  name: string;
  email: string;
  role: string;
  clinicSize: string;
  locale: EmailLocale;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export type WriteStatus = keyof typeof STATUS;

export interface Persistence {
  sheet: WriteStatus;
  audience: WriteStatus;
}

/** One label/value row inside a card. `first` drops the top rule. */
const row = (label: string, value: string, first = false): string => {
  const rule = first ? "" : `border-top:1px solid ${LINE};`;
  const pad = first ? "0" : "12px";
  return `
                      <tr>
                        <td class="rule ink-soft" width="42%" style="${rule}padding:${pad} 0 0 0;font-family:${BODY};font-size:13px;line-height:1.45;color:${CHARCOAL};">${escapeHtml(label)}</td>
                        <td class="rule ink" align="right" style="${rule}padding:${pad} 0 0 0;font-family:${BODY};font-size:15px;line-height:1.45;font-weight:600;color:${NAVY};">${escapeHtml(value)}</td>
                      </tr>`;
};

/** A numbered step. The sequence is real: read, then contact, then set up. */
const step = (index: number, title: string, detail: string): string => `
                <tr>
                  <td style="padding:0 0 22px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                      <tr>
                        <td width="26" valign="top" style="width:26px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                            <tr>
                              <td class="chip" width="26" height="26" align="center" valign="middle" bgcolor="${NAVY}" style="width:26px;height:26px;background-color:${NAVY};border-radius:13px;font-family:${DISPLAY};font-size:13px;font-weight:700;color:#ffffff;line-height:26px;">${index}</td>
                            </tr>
                          </table>
                        </td>
                        <td width="14" style="width:14px;font-size:0;line-height:0;">&nbsp;</td>
                        <td valign="top">
                          <div class="ink" style="font-family:${DISPLAY};font-size:15px;font-weight:600;color:${NAVY};line-height:1.45;padding-top:3px;">${escapeHtml(title)}</div>
                          <div class="ink-soft" style="font-family:${BODY};font-size:14px;color:${CHARCOAL};line-height:1.6;padding-top:4px;">${escapeHtml(detail)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`;

/** Padded anchor inside a coloured cell: the button pattern clients agree on. */
const button = (href: string, label: string): string => `
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td class="btn" align="center" bgcolor="${NAVY}" style="background-color:${NAVY};border-radius:10px;">
                      <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 30px;font-family:${DISPLAY};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">${escapeHtml(label)}</a>
                    </td>
                  </tr>
                </table>`;

/** The bordered card that both emails use as their one filled surface. */
const card = (contents: string): string => `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="card" style="width:100%;border-collapse:separate;background-color:${MIST};border:1px solid ${LINE};border-radius:12px;">
                <tr>
                  <td style="padding:20px 22px;">
${contents}
                  </td>
                </tr>
              </table>`;

const eyebrow = (text: string): string =>
  `<div class="ink-brand" style="font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:${LAVENDER_INK};">${escapeHtml(text)}</div>`;

const heading = (text: string): string =>
  `<h1 class="h1 ink" style="margin:10px 0 0 0;font-family:${DISPLAY};font-size:29px;line-height:1.2;font-weight:700;letter-spacing:-0.02em;color:${NAVY};">${escapeHtml(text)}</h1>`;

const cardLabel = (text: string): string =>
  `<div class="ink-soft" style="font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.11em;text-transform:uppercase;color:${CHARCOAL};padding-bottom:14px;">${escapeHtml(text)}</div>`;

/**
 * Shared page chrome: navy band with the wordmark, the caller's rows, then the
 * footer. `inner` is a run of <tr> belonging to the 600px content table.
 */
const shell = (opts: {
  lang: string;
  title: string;
  preheader: string;
  inner: string;
  footer: string[];
}): string => `<!doctype html>
<html lang="${opts.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${escapeHtml(opts.title)}</title>
<style>
  @media only screen and (max-width:620px) {
    .container { width:100% !important; }
    .pad { padding-left:22px !important; padding-right:22px !important; }
    .h1 { font-size:25px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .page { background-color:#0f1124 !important; }
    .surface { background-color:#181b36 !important; }
    .card { background-color:#212545 !important; border-color:#363c6e !important; }
    .rule { border-color:#363c6e !important; }
    .ink { color:#eef0fb !important; }
    .ink-soft { color:#b6bad6 !important; }
    .ink-brand { color:#bcc3f5 !important; }
    .foot { color:#8b8fa8 !important; }
    .chip { background-color:${LAVENDER_INK} !important; }
    .btn { background-color:${LAVENDER_INK} !important; }
    .alert { background-color:#3b2f13 !important; border-color:#6d5b28 !important; color:#f2dfa6 !important; }
    .st-ok { color:#4ade9b !important; }
    .st-bad { color:#ff9090 !important; }
    .st-none { color:#a0a4ba !important; }
  }
</style>
</head>
<body class="page" style="margin:0;padding:0;background-color:#eef0f8;">
  <div style="display:none;font-size:1px;color:#eef0f8;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="page" style="border-collapse:collapse;background-color:#eef0f8;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container surface" style="width:600px;max-width:600px;border-collapse:collapse;background-color:#ffffff;border-radius:16px;overflow:hidden;">
          <tr>
            <td bgcolor="${NAVY}" class="pad" style="background-color:${NAVY};padding:26px 36px;">
              <span style="font-family:${DISPLAY};font-size:21px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">UpSpeech</span>
            </td>
          </tr>
          <tr>
            <td height="3" bgcolor="${LAVENDER}" style="height:3px;background-color:${LAVENDER};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
${opts.inner}
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="width:600px;max-width:600px;border-collapse:collapse;">
          <tr>
            <td class="pad foot" align="center" style="padding:22px 36px 8px 36px;font-family:${BODY};font-size:12.5px;line-height:1.7;color:#767a90;">
${opts.footer.map((line) => `              <div>${line}</div>`).join("\n")}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

/**
 * The confirmation sent to whoever filled in the form. Its job is to prove we
 * received the specifics, so a typo is visible, and say what happens next.
 * The survey block renders only when a URL is configured.
 */
export const applicantEmail = (
  lead: Lead,
  copy: ApplicantCopy,
  surveyUrl?: string,
): RenderedEmail => {
  const role = roleLabel(lead.locale, lead.role);
  const clinicSize =
    clinicSizeLabel(lead.locale, lead.clinicSize) || copy.notSpecified;

  const survey = surveyUrl
    ? `
          <tr>
            <td class="pad" style="padding:6px 36px 30px 36px;">
              <div class="ink" style="font-family:${DISPLAY};font-size:17px;font-weight:700;color:${NAVY};line-height:1.4;">${escapeHtml(copy.surveyTitle)}</div>
              <div class="ink-soft" style="font-family:${BODY};font-size:14.5px;color:${CHARCOAL};line-height:1.65;padding:8px 0 20px 0;">${escapeHtml(copy.surveyBody)}</div>
${button(surveyUrl, copy.surveyCta)}
            </td>
          </tr>`
    : "";

  const inner = `
          <tr>
            <td class="pad" style="padding:40px 36px 0 36px;">
${eyebrow(copy.eyebrow)}
${heading(copy.greeting(firstName(lead.name)))}
              <p class="ink-soft" style="margin:16px 0 0 0;font-family:${BODY};font-size:16px;line-height:1.65;color:${CHARCOAL};">${escapeHtml(copy.intro)}</p>
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:28px 36px 0 36px;">
${card(`${cardLabel(copy.cardTitle)}
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${row(copy.labelName, lead.name, true)}${row(copy.labelRole, role)}${row(copy.labelClinicSize, clinicSize)}
                    </table>`)}
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:34px 36px 14px 36px;">
              <div class="ink" style="font-family:${DISPLAY};font-size:18px;font-weight:700;color:${NAVY};line-height:1.35;padding-bottom:20px;">${escapeHtml(copy.stepsTitle)}</div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${copy.steps.map((s, i) => step(i + 1, s.title, s.detail)).join("")}
              </table>
            </td>
          </tr>${survey}
          <tr>
            <td class="pad" style="padding:4px 36px 40px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td class="rule" style="border-top:1px solid ${LINE};padding-top:22px;">
                    <div class="ink-soft" style="font-family:${BODY};font-size:14.5px;color:${CHARCOAL};line-height:1.65;">${escapeHtml(copy.replyNote)}</div>
                    <div class="ink" style="font-family:${DISPLAY};font-size:14.5px;font-weight:600;color:${NAVY};padding-top:14px;">${escapeHtml(copy.signoff)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  const html = shell({
    lang: copy.lang,
    title: copy.subject,
    preheader: copy.preheader,
    inner,
    footer: [
      escapeHtml(copy.tagline),
      `<a href="https://upspeech.app" class="foot" style="color:#767a90;text-decoration:underline;">upspeech.app</a>`,
      escapeHtml(copy.footerNote),
    ],
  });

  const text = [
    copy.greeting(firstName(lead.name)),
    "",
    copy.intro,
    "",
    `${copy.cardTitle}:`,
    `  ${copy.labelName}: ${lead.name}`,
    `  ${copy.labelRole}: ${role}`,
    `  ${copy.labelClinicSize}: ${clinicSize}`,
    "",
    `${copy.stepsTitle}:`,
    ...copy.steps.map((s, i) => `  ${i + 1}. ${s.title} - ${s.detail}`),
    ...(surveyUrl
      ? [
          "",
          copy.surveyTitle,
          copy.surveyBody,
          `${copy.surveyCta}: ${surveyUrl}`,
        ]
      : []),
    "",
    copy.replyNote,
    copy.signoff,
    "",
    "upspeech.app",
  ].join("\n");

  return { subject: copy.subject, html, text };
};

/**
 * The notification we get. It repeats the persistence result so a failed
 * spreadsheet write is visible in the inbox: when both stores are down this
 * email is the only copy of the lead, and it has to say so.
 */
export const teamEmail = (
  lead: Lead,
  persistence: Persistence,
): RenderedEmail => {
  /* English labels here and in the spreadsheet, so a Portuguese and an
     English submission of the same role read as the same value. */
  const role = roleLabel("en", lead.role);
  const clinicSize = clinicSizeLabel("en", lead.clinicSize) || "Not specified";
  const alert =
    persistence.sheet === "ok"
      ? ""
      : `
          <tr>
            <td class="pad" style="padding:20px 36px 0 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="alert" style="width:100%;border-collapse:separate;background-color:#FEF3C7;border:1px solid #EFCE7C;border-radius:10px;color:#6B4E12;">
                <tr>
                  <td style="padding:14px 18px;font-family:${BODY};font-size:14px;line-height:1.6;color:inherit;">
                    The spreadsheet row was not written (${escapeHtml(persistence.sheet)}). Keep this email: it may be the only record of this request.
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  const statusLine = (label: string, status: WriteStatus): string => `
                      <tr>
                        <td class="ink-soft" width="42%" style="padding:4px 0;font-family:${BODY};font-size:13px;color:${CHARCOAL};">${escapeHtml(label)}</td>
                        <td class="${STATUS[status].cls}" align="right" style="padding:4px 0;font-family:${BODY};font-size:13px;font-weight:600;color:${STATUS[status].colour};">${escapeHtml(status)}</td>
                      </tr>`;

  const inner = `
          <tr>
            <td class="pad" style="padding:38px 36px 0 36px;">
${eyebrow("New early-access request")}
${heading(lead.name)}
              <p style="margin:10px 0 0 0;font-family:${BODY};font-size:15px;line-height:1.5;">
                <a href="mailto:${escapeHtml(lead.email)}" class="ink-brand" style="color:${LAVENDER_INK};text-decoration:underline;">${escapeHtml(lead.email)}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:24px 36px 0 36px;">
${card(`                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${row("Role", role, true)}${row("Clinic size", clinicSize)}${row("Language", lead.locale)}
                    </table>`)}
            </td>
          </tr>${alert}
          <tr>
            <td class="pad" style="padding:22px 36px 38px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td class="rule" style="border-top:1px solid ${LINE};padding-top:18px;">
${cardLabel("Where it was saved")}
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${statusLine("Google Sheet", persistence.sheet)}${statusLine("Resend audience", persistence.audience)}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  const subject = `Early-access request: ${lead.name}`;

  const html = shell({
    lang: "en",
    title: subject,
    preheader: `${role}${clinicSize ? `, ${clinicSize}` : ""} - ${lead.email}`,
    inner,
    footer: [
      `Reply to this email to answer ${escapeHtml(firstName(lead.name))} directly.`,
    ],
  });

  const text = [
    `New early-access request: ${lead.name}`,
    "",
    `Email:       ${lead.email}`,
    `Role:        ${role}`,
    `Clinic size: ${clinicSize}`,
    `Language:    ${lead.locale}`,
    "",
    `Google Sheet:    ${persistence.sheet}`,
    `Resend audience: ${persistence.audience}`,
    ...(persistence.sheet === "ok"
      ? []
      : [
          "",
          "The spreadsheet row was not written. This email may be the only record.",
        ]),
  ].join("\n");

  return { subject, html, text };
};
