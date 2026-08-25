/**
 * HTML for the two early-access emails.
 *
 * Built as tables with inline styles because mail clients are not browsers:
 * Outlook renders through Word, and Gmail drops most of what a <style> block
 * declares. The <style> block here carries only progressive enhancement, the
 * mobile media query, the dark-mode overrides and the logo swap, so the email
 * is complete without it.
 *
 * It follows the site rather than inventing a second look: pale chrome with
 * the logo, charcoal headings with a lavender accent, pill buttons on the
 * brand gradient, and one tinted card. Values come from tailwind.config.ts and
 * src/index.css, named below.
 *
 * Dark mode works by class. Inline styles beat a stylesheet, so every element
 * that carries a colour also carries the class that overrides it with
 * !important under prefers-color-scheme: dark. Adding a coloured element
 * without its class leaves it at its light value, which on a dark background
 * means charcoal text on a charcoal card.
 */

import { clinicSizeLabel, greetingText, roleLabel } from "./copy";
import { escapeHtml, firstName } from "./text";
import type { ApplicantCopy, EmailLocale } from "./copy";

/* Palette, from src/index.css by way of tailwind.config.ts. */
const NAVY = "#293587"; // primary-500
const NAVY_LIGHT = "#4B5DC9"; // the far stop of --gradient-primary
const LAVENDER = "#958AF0"; // brand accent, a surface and never text on white
const LAVENDER_INK = "#6866C4"; // 4.90:1 on white; plain lavender is 2.93:1
const CHARCOAL = "#4B4E4E"; // calm-charcoal, the site's heading colour
const CHARCOAL_SOFT = "#6F7272"; // calm-charcoal/80, the site's body colour
const MIST = "#F5F6FC"; // primary-25
const TINT = "#ECEEFB"; // primary-50
const LINE = "#E4E7F6";
const PAGE = "#EEF0F9";

/* Status colours for the team email, chosen to pass on the tinted card. */
const STATUS = {
  ok: { colour: "#0B7A54", cls: "st-ok" },
  failed: { colour: "#C22B2B", cls: "st-bad" },
  "not configured": { colour: "#6F7285", cls: "st-none" },
} as const;

/*
 * PNG, not the SVG, and not the 2048px marketing asset either.
 *
 * Outlook, Apple Mail and Yahoo all render an SVG in an <img>, but Gmail's
 * desktop and mobile webmail do not, and Gmail's apps only manage it for non
 * Google accounts (caniemail.com/features/image-svg). A logo that disappears
 * in Gmail is not worth the sharpness.
 *
 * scripts/generate-email-logos.mjs rasterizes the SVG at exactly twice the
 * display width instead, which is 4KB rather than 37KB. Re-run it when the
 * logo changes.
 */
const LOGO_W = 148;
const LOGO_H = 54; // the source viewBox is 1024x374, so 148 wide lands here
export const LOGO_HOST = "https://upspeech.app/images/";
const LOGO_LIGHT = `${LOGO_HOST}logo-email.png`;
const LOGO_DARK = `${LOGO_HOST}logo-email-invert.png`;

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
  const pad = first ? "0" : "13px";
  return `
                      <tr>
                        <td class="rule ink-soft" width="44%" style="${rule}padding:${pad} 0 0 0;font-family:${BODY};font-size:13.5px;line-height:1.45;color:${CHARCOAL_SOFT};">${escapeHtml(label)}</td>
                        <td class="rule ink" align="right" style="${rule}padding:${pad} 0 0 0;font-family:${DISPLAY};font-size:15px;line-height:1.45;font-weight:600;color:${CHARCOAL};">${escapeHtml(value)}</td>
                      </tr>`;
};

/** A numbered step. The sequence is real: read, then contact, then set up. */
const step = (index: number, title: string, detail: string): string => `
                <tr>
                  <td style="padding:0 0 24px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                      <tr>
                        <td width="28" valign="top" style="width:28px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                            <tr>
                              <td class="chip" width="28" height="28" align="center" valign="middle" bgcolor="${TINT}" style="width:28px;height:28px;background-color:${TINT};border-radius:14px;font-family:${DISPLAY};font-size:13px;font-weight:700;color:${NAVY};line-height:28px;">${index}</td>
                            </tr>
                          </table>
                        </td>
                        <td width="16" style="width:16px;font-size:0;line-height:0;">&nbsp;</td>
                        <td valign="top">
                          <div class="ink" style="font-family:${DISPLAY};font-size:15.5px;font-weight:600;color:${CHARCOAL};line-height:1.45;padding-top:4px;">${escapeHtml(title)}</div>
                          <div class="ink-soft" style="font-family:${BODY};font-size:14px;color:${CHARCOAL_SOFT};line-height:1.65;padding-top:5px;">${escapeHtml(detail)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`;

/**
 * The site's submit button: a full pill on the primary gradient. Outlook drops
 * the gradient and keeps the bgcolor, which is the gradient's first stop.
 */
const button = (href: string, label: string): string => `
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td class="btn" align="center" bgcolor="${NAVY}" style="background-color:${NAVY};background-image:linear-gradient(135deg,${NAVY} 0%,${NAVY_LIGHT} 100%);border-radius:999px;">
                      <a href="${escapeHtml(href)}" style="display:inline-block;padding:16px 34px;font-family:${DISPLAY};font-size:15px;font-weight:600;letter-spacing:-0.01em;color:#ffffff;text-decoration:none;border-radius:999px;">${escapeHtml(label)}</a>
                    </td>
                  </tr>
                </table>`;

/** The one tinted surface in each email. */
const card = (contents: string): string => `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="card" style="width:100%;border-collapse:separate;background-color:${MIST};border:1px solid ${LINE};border-radius:18px;">
                <tr>
                  <td style="padding:22px 24px;">
${contents}
                  </td>
                </tr>
              </table>`;

const eyebrow = (text: string): string =>
  `<div class="ink-brand" style="font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${LAVENDER_INK};">${escapeHtml(text)}</div>`;

/**
 * Charcoal heading with one phrase in lavender, the way the site sets its
 * headlines. `accent` is already escaped by the caller.
 */
const heading = (plain: string, accent = ""): string =>
  `<h1 class="h1 ink" style="margin:12px 0 0 0;font-family:${DISPLAY};font-size:32px;line-height:1.15;font-weight:700;letter-spacing:-0.025em;color:${CHARCOAL};">${escapeHtml(plain)}${accent}</h1>`;

const accentSpan = (text: string): string =>
  ` <span class="ink-brand" style="color:${LAVENDER_INK};">${escapeHtml(text)}</span>`;

const cardLabel = (text: string): string =>
  `<div class="ink-soft" style="font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${CHARCOAL_SOFT};padding-bottom:16px;">${escapeHtml(text)}</div>`;

/**
 * Pale chrome carrying the logo, then a gradient hairline, then the caller's
 * rows and the footer. Two logo files: the dark wordmark by default and the
 * inverted one in clients that honour prefers-color-scheme. `alt` is styled so
 * a blocked image still reads as the wordmark rather than a broken box.
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
    .pad { padding-left:24px !important; padding-right:24px !important; }
    .h1 { font-size:27px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .page { background-color:#0f1124 !important; }
    .surface { background-color:#191c34 !important; }
    .chrome { background-color:#20243f !important; }
    .card { background-color:#222641 !important; border-color:#373c62 !important; }
    .rule { border-color:#373c62 !important; }
    .ink { color:#edeef8 !important; }
    .ink-soft { color:#b4b8d0 !important; }
    .ink-brand { color:#bcc3f5 !important; }
    .foot { color:#8c90a8 !important; }
    .chip { background-color:${LAVENDER_INK} !important; color:#ffffff !important; }
    .btn { background-color:${LAVENDER_INK} !important; background-image:linear-gradient(135deg,${LAVENDER_INK} 0%,#8f8ade 100%) !important; }
    .alert { background-color:#3b2f13 !important; border-color:#6d5b28 !important; color:#f2dfa6 !important; }
    .st-ok { color:#4ade9b !important; }
    .st-bad { color:#ff9090 !important; }
    .st-none { color:#a0a4ba !important; }
    .logo-light { display:none !important; }
    .logo-dark { display:block !important; max-height:none !important; overflow:visible !important; }
  }
</style>
</head>
<body class="page" style="margin:0;padding:0;background-color:${PAGE};">
  <div style="display:none;font-size:1px;color:${PAGE};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="page" style="border-collapse:collapse;background-color:${PAGE};">
    <tr>
      <td align="center" style="padding:36px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container surface" style="width:600px;max-width:600px;border-collapse:collapse;background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 12px 40px rgba(41,53,135,0.10);">
          <tr>
            <td class="pad chrome" bgcolor="${MIST}" style="background-color:${MIST};padding:26px 40px;">
              <img class="logo-light" src="${LOGO_LIGHT}" width="${LOGO_W}" height="${LOGO_H}" alt="UpSpeech" style="display:block;border:0;outline:none;text-decoration:none;width:${LOGO_W}px;max-width:${LOGO_W}px;height:auto;font-family:${DISPLAY};font-size:21px;font-weight:700;color:${CHARCOAL};">
              <img class="logo-dark" src="${LOGO_DARK}" width="${LOGO_W}" height="${LOGO_H}" alt="UpSpeech" style="display:none;max-height:0;overflow:hidden;border:0;outline:none;text-decoration:none;width:${LOGO_W}px;max-width:${LOGO_W}px;height:auto;font-family:${DISPLAY};font-size:21px;font-weight:700;color:#ffffff;">
            </td>
          </tr>
          <tr>
            <td height="3" bgcolor="${LAVENDER}" style="height:3px;background-color:${LAVENDER};background-image:linear-gradient(90deg,${LAVENDER} 0%,${NAVY} 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
${opts.inner}
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="width:600px;max-width:600px;border-collapse:collapse;">
          <tr>
            <td class="pad foot" align="center" style="padding:24px 40px 8px 40px;font-family:${BODY};font-size:12.5px;line-height:1.7;color:#767a90;">
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
  const given = firstName(lead.name);

  const survey = surveyUrl
    ? `
          <tr>
            <td class="pad" style="padding:8px 40px 36px 40px;">
              <div class="ink" style="font-family:${DISPLAY};font-size:18px;font-weight:700;letter-spacing:-0.015em;color:${CHARCOAL};line-height:1.4;">${escapeHtml(copy.surveyTitle)}</div>
              <div class="ink-soft" style="font-family:${BODY};font-size:14.5px;color:${CHARCOAL_SOFT};line-height:1.7;padding:10px 0 22px 0;">${escapeHtml(copy.surveyBody)}</div>
${button(surveyUrl, copy.surveyCta)}
            </td>
          </tr>`
    : "";

  const inner = `
          <tr>
            <td class="pad" style="padding:44px 40px 0 40px;">
${eyebrow(copy.eyebrow)}
${heading(copy.greetingPrefix, `${accentSpan(given)}<span class="ink" style="color:${CHARCOAL};">,</span>`)}
              <p class="ink-soft" style="margin:18px 0 0 0;font-family:${BODY};font-size:16px;line-height:1.7;color:${CHARCOAL_SOFT};">${escapeHtml(copy.intro)}</p>
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:30px 40px 0 40px;">
${card(`${cardLabel(copy.cardTitle)}
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${row(copy.labelName, lead.name, true)}${row(copy.labelRole, role)}${row(copy.labelClinicSize, clinicSize)}
                    </table>`)}
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:38px 40px 14px 40px;">
              <div class="ink" style="font-family:${DISPLAY};font-size:19px;font-weight:700;letter-spacing:-0.015em;color:${CHARCOAL};line-height:1.35;padding-bottom:22px;">${escapeHtml(copy.stepsTitle)}</div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${copy.steps.map((s, i) => step(i + 1, s.title, s.detail)).join("")}
              </table>
            </td>
          </tr>${survey}
          <tr>
            <td class="pad" style="padding:4px 40px 44px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td class="rule" style="border-top:1px solid ${LINE};padding-top:24px;">
                    <div class="ink-soft" style="font-family:${BODY};font-size:14.5px;color:${CHARCOAL_SOFT};line-height:1.7;">${escapeHtml(copy.replyNote)}</div>
                    <div class="ink" style="font-family:${DISPLAY};font-size:15px;font-weight:600;color:${CHARCOAL};padding-top:16px;">${escapeHtml(copy.signoff)}</div>
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
    greetingText(copy, given),
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
            <td class="pad" style="padding:22px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="alert" style="width:100%;border-collapse:separate;background-color:#FEF3C7;border:1px solid #EFCE7C;border-radius:14px;color:#6B4E12;">
                <tr>
                  <td style="padding:16px 20px;font-family:${BODY};font-size:14px;line-height:1.65;color:inherit;">
                    The spreadsheet row was not written (${escapeHtml(persistence.sheet)}). Keep this email: it may be the only record of this request.
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  const statusLine = (label: string, status: WriteStatus): string => `
                      <tr>
                        <td class="ink-soft" width="44%" style="padding:5px 0;font-family:${BODY};font-size:13.5px;color:${CHARCOAL_SOFT};">${escapeHtml(label)}</td>
                        <td class="${STATUS[status].cls}" align="right" style="padding:5px 0;font-family:${DISPLAY};font-size:13.5px;font-weight:600;color:${STATUS[status].colour};">${escapeHtml(status)}</td>
                      </tr>`;

  const inner = `
          <tr>
            <td class="pad" style="padding:42px 40px 0 40px;">
${eyebrow("New early-access request")}
${heading(lead.name)}
              <p style="margin:12px 0 0 0;font-family:${BODY};font-size:15px;line-height:1.5;">
                <a href="mailto:${escapeHtml(lead.email)}" class="ink-brand" style="color:${LAVENDER_INK};text-decoration:underline;">${escapeHtml(lead.email)}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td class="pad" style="padding:26px 40px 0 40px;">
${card(`                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${row("Role", role, true)}${row("Clinic size", clinicSize)}${row("Language", lead.locale)}
                    </table>`)}
            </td>
          </tr>${alert}
          <tr>
            <td class="pad" style="padding:24px 40px 42px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td class="rule" style="border-top:1px solid ${LINE};padding-top:20px;">
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
