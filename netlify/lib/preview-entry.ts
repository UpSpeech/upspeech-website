/**
 * Re-export surface for scripts/preview-emails.mjs, which bundles this file to
 * render the templates outside the Netlify runtime. Not used at request time.
 */
export { applicantEmail, teamEmail } from "./email-template";
export { applicantCopy, EMAIL_LOCALES } from "./copy";
