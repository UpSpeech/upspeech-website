# UpSpeech marketing website

> Platform and monorepo setup lives in the umbrella repo. This README is website-specific.

The public marketing site at https://upspeech.app. React 18 + TypeScript + Vite, prerendered to static HTML and served by Netlify. This README is mainly about how localization works, because that is where most of the maintenance traps are.

## Running it

```bash
npm run dev          # local dev server on http://localhost:3052
npm run typecheck    # tsc, no emit
npm run lint         # eslint
npm run build        # full static build (see "Build pipeline" below)
```

There is no unit test framework. Verification is `typecheck` + `lint` + a successful `build`.

## Localization model

The site ships in three locales: English, Portuguese, Spanish.

- **English is at the root.** `/`, `/techniques`, `/privacy`, and so on. Every English URL that ever existed is unchanged.
- **Portuguese and Spanish live under a prefix.** `/pt/...` and `/es/...`. So the Portuguese privacy page is `/pt/privacy`, the Spanish techniques index is `/es/techniques`.
- Locale is derived from the URL path by the router, not from a cookie or a header. `src/App.tsx` mounts the same route tree three times, once per locale, wrapping each in a `LocaleProvider` that sets the active locale.
- A legacy `?lang=pt|es` query param is still honoured: `LegacyLangRedirect` in `App.tsx` rewrites it to the equivalent `/pt` or `/es` path URL.

### The i18n API (`src/i18n/`)

Everything you need is re-exported from `src/i18n`:

- `useT()` returns the resolved dictionary for the active locale. Use it inside components: `const t = useT(); ... {t.nav.techniques}`.
- `useLocale()` returns the active `Locale` (`"en" | "pt" | "es"`).
- `localizedPath(path, locale)` prefixes a locale-agnostic path with the locale. `localizedPath("/techniques", "pt")` is `/pt/techniques`; for English it is a no-op. Always build internal links with this so they stay inside the active locale.
- `SUPPORTED_LOCALES`, `DEFAULT_LOCALE`, `isLocale`, `splitLocaleFromPath` for the lower-level path handling.

`src/i18n/locale.ts` has no React imports, so scripts (sitemap, prerender) can import it too.

### EN is the source dictionary

`src/i18n/locales/en.ts` is the source of truth for UI copy. Its shape defines the `Dictionary` type:

```ts
export type Dictionary = typeof en;
```

`pt.ts` and `es.ts` are typed as `Dictionary`, so if either is missing a key that `en.ts` has, or has the wrong shape, it **fails `npm run typecheck`**. That is the safety net: you cannot ship a half-translated dictionary. Add a key to `en.ts` first, then the typechecker tells you exactly what pt/es are missing.

**American spelling in EN copy** (practice, organized, behavior, center, analyze). Keep it consistent.

## Where copy lives

Marketing copy is not all in one place. When you edit a string, work out which home it belongs to:

1. **UI chrome and page copy: `src/i18n/locales/{en,pt,es}.ts`.** Nav, footer, hero, page meta, the techniques index and technique-page shells. This is the central typed dictionary. Most edits go here.
2. **Technique FAQ content: `src/lib/technique-faqs.ts` (EN) + `technique-faqs-pt.ts` + `technique-faqs-es.ts`.** `getTechniqueFAQs(slug, locale)` picks the locale set. This copy is NOT in the central dictionary. It is a large, structured content set kept separate on purpose. (Folding it into the central dictionary is possible future work, not done yet.)
3. **Open Graph card copy: `scripts/generate-og-images.mjs`.** The titles and descriptions baked into the social-share preview images are a third, separate copy home inside the build script. If you rename a page or change its pitch, update the OG entry too.

If you add a fourth copy home (say a per-locale email template), add it to this list.

## The byte-identical-EN rule

Refactors to the i18n plumbing must not change the rendered English output by a single byte. EN is the live production site and its HTML is what search engines have indexed. When you move a string into the dictionary, copy the English value across verbatim. When in doubt, diff the prerendered HTML before and after.

### `public/googlef0504871445df5e1.html`

This is the Google Search Console verification file. It must stay byte-exact. `npm run format` (Prettier) will rewrite it and break verification. After running `full_check` (which runs Prettier), restore it:

```bash
git checkout -- public/googlef0504871445df5e1.html
```

Never edit this file.

## Routes are a single source of truth

`scripts/routes.mjs` exports `ROUTES`, the canonical list of static page paths plus the component that owns each one and its sitemap metadata (changefreq, priority). The sitemap generator, the prerenderer, the route-date generator and the output check all read it, so they never drift from each other.

There is no hand-written `lastmod`. It used to be there and it rotted: `/techniques/cancelation` ended up claiming 2026-04-23 in the sitemap, 2026-03-03 in its JSON-LD and 2026-03-06 in the database. `component` replaced it, and `generate-route-dates.mjs` derives the date from git instead.

But the SPA router in `src/App.tsx` keeps its own hand-written list of `<Route>` elements (deliberately, so each page is a lazy import and code-splits). That second list can drift from `routes.mjs`: add a page to one and forget the other, and you get either a route that renders but is missing from the sitemap and prerender (no SEO), or a sitemap/prerender entry that 404s in the app.

`scripts/check-routes.mjs` guards against this. It imports `ROUTES`, parses the `path="..."` literals out of `App.tsx` (normalising the relative paths and the `index` route, ignoring the `*` catch-all), and fails the build if the two path sets disagree, printing exactly which paths are missing from which side.

```bash
npm run check:routes
```

It runs first in `npm run build`, so a route mismatch fails the build loudly instead of silently shipping. When you add a page, add it to **both** `App.tsx` and `routes.mjs`; the guard will remind you if you miss one.

## Build pipeline

`npm run build` runs, in order:

1. `check-routes.mjs`: fail fast if App.tsx and routes.mjs disagree.
2. `generate-asset-manifest.mjs`: record which localized assets exist under `public/`.
3. `generate-og-images.mjs`: render the Open Graph share images.
4. `generate-route-dates.mjs`: derive each route's `dateModified` from git.
5. `generate-sitemap.mjs`: emit `sitemap.xml` from `ROUTES` x locales.
6. `vite build`: the app bundle.
7. `prerender.mjs`: render each route x locale to static HTML (drives SEO and first paint).
8. `check-output.mjs`: read the prerendered HTML back and fail on what a crawler would see.

`routes.mjs` is the route source of truth; every one of those steps reads it.

## Freshness dates are generated, never typed

`generate-route-dates.mjs` takes the `component` each route names, walks that file's local imports, and asks git when any of them last changed. The answer goes to `src/lib/route-dates.generated.ts`, which the sitemap and `SEO.tsx` both read, so `lastmod` and `dateModified` cannot disagree.

Shared chrome is excluded on purpose (Header, Footer, `ui/` primitives, hooks, the i18n dictionaries). A tweak there is not a change to what a page says, and the dictionaries are one file covering all 22 routes, so counting them would collapse every page onto a single date.

The generated file is **committed**, not build-only, because Netlify clones shallowly and `git log` can come back empty on the build box. When that happens the previous value is carried over rather than dropped.

`datePublished` stays hand-written in `src/lib/seo-data.ts`. It is an editorial fact about when a piece first went up, and git has no way to know it.

## The output check

`scripts/check-output.mjs` runs last, against `dist/`, with JavaScript disabled, reading each page the way a crawler that does not execute JS reads it. It exists because two bugs shipped to production and stayed there, and neither was visible to anything else in the pipeline. Lighthouse scored the site 100/100 on SEO throughout both.

The first: multi-line headings extracted as one word. JSX drops the newline between an expression and a following `<br />` or sibling `<span>`, so the home page `h1` rendered correctly and read `Your therapykeeps goingbetween sessions.` to anything pulling text out rather than laying it out. The second: every page claimed to be the home page, because the `WebPage` node was baked into the static `@graph` in `index.html` with the home page's `@id`, `url` and `name`.

Per page it asserts: headings keep their word boundaries in `textContent`, exactly one `<h1>`, canonical and `<html lang>` match the route and locale, the JSON-LD parses, there is exactly one `WebPage` node with the right `@id`/`url`/`inLanguage`, it carries a `dateModified`, and that date matches the sitemap's `lastmod` (as does any `Article` node's).

```bash
npm run check:output
```

It needs `dist/` to exist, so run a build first. About two seconds for all 66 pages.

## The early-access form

`src/components/CTASection.tsx` is the only form on the site. It posts same-origin to `netlify/functions/early-access.ts`, which works in a fixed order.

It writes the lead down first: a row appended to a Google Sheet through an Apps Script web app, and a contact added to a Resend audience. Then it sends the team notification, which repeats the result of those two writes. The applicant confirmation goes last.

That order is a fix, not a preference. The function used to send the team email first and store nothing at all, so a Resend error meant the request was gone with no record that anyone had asked for it. Now the visitor sees a failure only if all three landed nowhere, and a bounced applicant address cannot fail a submission that is already recorded.

Both stores are optional. An unset variable skips that write, and the team email reports `not configured` instead of `failed`.

| Variable                                      | Effect when unset                                                                                  |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`                              | The function answers 503 and sends nothing.                                                        |
| `RESEND_AUDIENCE_ID`                          | No contact is added; the sheet and the emails still work.                                          |
| `SHEETS_WEBHOOK_URL`, `SHEETS_WEBHOOK_SECRET` | No spreadsheet row; the audience and the emails still work.                                        |
| `EARLY_ACCESS_SURVEY_URL`                     | The applicant email leaves out its survey block. A value that is not an `https://` URL is ignored. |

None of these carry a `VITE_` prefix, because they are read on the server and must never reach the browser bundle. Set them in Netlify under Site configuration. `netlify dev` reads them from a local `.env`, which is the only way to exercise the function without deploying.

### The spreadsheet

`netlify/lib/sheet-webhook.gs` is the Apps Script to paste into the leads spreadsheet; its header carries the deployment steps. Editing it later needs a new deployment version, since saving alone does not change what the `/exec` URL runs.

The function checks the response body for `"ok":true` rather than the HTTP status, because an Apps Script web app answers 200 even when `doPost` throws. It also sends a shared secret in the body, because a web app deployed for "Anyone" is world-postable by design.

The Role and Clinic size columns hold English labels rather than the slugs the form posts or the labels the visitor saw, so one filter catches every submission of the same role across all three locales. Status and Notes are left for you to fill in.

### The emails

The applicant confirmation is sent in the visitor's language, from `netlify/lib/copy.ts`. The team notification is always English. Both follow the site rather than inventing a second look: pale chrome carrying the logo, charcoal headings with the name in lavender, pill buttons on `--gradient-primary`, and one tinted card. Every value is named at the top of `netlify/lib/email-template.ts` with the token it came from.

The logo is loaded from `https://upspeech.app/images/`, in two files. The dark wordmark shows by default and the inverted one replaces it in clients that honour `prefers-color-scheme`. Its `alt` is styled, so a recipient with images blocked reads "UpSpeech" rather than seeing a broken box. No webfont is fetched: `src/fonts.css` self-hosts the brand faces to keep requests away from `fonts.googleapis.com`, and an email pulling them from Google would hand over the recipient's IP on open.

Dark mode works by class, because inline styles beat a stylesheet. A coloured element added without its override class stays at its light value, which on a dark background means charcoal text on a charcoal card.

```bash
npm run preview:emails        # every locale and state rendered to .pr-assets/emails/
npm run check:early-access    # 13 checks against a stubbed network, no credentials needed
node scripts/generate-email-logos.mjs   # after the logo changes
```

`preview:emails` rewrites the logo host to `public/images/` as it writes, so previews show the logo on a branch that has not deployed yet.

## Adding a fourth locale

1. Add the code to `SUPPORTED_LOCALES` in `src/i18n/locale.ts` (and `LOCALES` in `scripts/routes.mjs`).
2. Add `src/i18n/locales/<code>.ts`, typed as `Dictionary`, translating every key from `en.ts`. The typechecker will not pass until it is complete.
3. Mount the locale in `src/App.tsx` (another `<Route path="/<code>/*">` wrapping `AppRoutes` in a `LocaleProvider`).
4. Add the locale's strings to the technique FAQ files (`technique-faqs-<code>.ts`) and to the OG translations in `generate-og-images.mjs`.
5. The sitemap generator and prerenderer pick up the new locale automatically from `LOCALES`/`SUPPORTED_LOCALES`.
