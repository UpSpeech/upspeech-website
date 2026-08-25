/**
 * Sanitizers for values that arrive from the public early-access form and end
 * up in email headers, HTML bodies, and a spreadsheet row.
 */

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Collapse a submitted value to a single trimmed line, then length-cap it.
 * Stripping CR/LF keeps user input out of email headers (subject, reply-to)
 * where it could otherwise add headers of its own.
 */
export const oneLine = (value: unknown, max = 200): string =>
  String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

/** Escape HTML so submitted values cannot inject markup into an email body. */
export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] ?? char);

/**
 * Accept a URL only if it is a well-formed https:// address. The survey link
 * comes from the Netlify env rather than from a visitor, so this guards
 * against a typo'd variable rendering a broken or javascript: button.
 */
export const isSafeHttpsUrl = (value: string): boolean => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * The first word of a submitted name, for the greeting. "Hi Vasco," reads like
 * a person wrote it; "Hi Vasco Figueiredo," reads like a mail merge. The card
 * below the greeting still shows the full name as submitted.
 */
export const firstName = (name: string): string =>
  name.split(/\s+/).filter(Boolean)[0] ?? name;
