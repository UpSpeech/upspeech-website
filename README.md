# UpSpeech marketing website

> Platform and monorepo setup lives in the umbrella repo. This README is website-specific.

The public marketing site at https://upspeech.app. React 18 + TypeScript + Vite, prerendered to static HTML and served by Netlify. This README is mainly about how localisation works, because that is where most of the maintenance traps are.

## Running it

```bash
npm run dev          # local dev server on http://localhost:3052
npm run typecheck    # tsc, no emit
npm run lint         # eslint
npm run build        # full static build (see "Build pipeline" below)
```

There is no unit test framework. Verification is `typecheck` + `lint` + a successful `build`.

## Localisation model

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

**British spelling in EN copy** (practise, organised, behaviour, centre). Keep it consistent.

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

`scripts/routes.mjs` exports `ROUTES`, the canonical list of static page paths plus sitemap metadata (lastmod, changefreq, priority). The sitemap generator and the prerenderer both read it, so they never drift from each other.

But the SPA router in `src/App.tsx` keeps its own hand-written list of `<Route>` elements (deliberately, so each page is a lazy import and code-splits). That second list can drift from `routes.mjs`: add a page to one and forget the other, and you get either a route that renders but is missing from the sitemap and prerender (no SEO), or a sitemap/prerender entry that 404s in the app.

`scripts/check-routes.mjs` guards against this. It imports `ROUTES`, parses the `path="..."` literals out of `App.tsx` (normalising the relative paths and the `index` route, ignoring the `*` catch-all), and fails the build if the two path sets disagree, printing exactly which paths are missing from which side.

```bash
npm run check:routes
```

It runs first in `npm run build`, so a route mismatch fails the build loudly instead of silently shipping. When you add a page, add it to **both** `App.tsx` and `routes.mjs`; the guard will remind you if you miss one.

## Build pipeline

`npm run build` runs, in order:

1. `check-routes.mjs`: fail fast if App.tsx and routes.mjs disagree.
2. `generate-og-images.mjs`: render the Open Graph share images.
3. `generate-sitemap.mjs`: emit `sitemap.xml` from `ROUTES` x locales.
4. `vite build`: the app bundle.
5. `prerender.mjs`: render each route x locale to static HTML (drives SEO and first paint).

`routes.mjs` is the route source of truth; `check-routes`, `generate-sitemap`, and `prerender` all read it.

## Adding a fourth locale

1. Add the code to `SUPPORTED_LOCALES` in `src/i18n/locale.ts` (and `LOCALES` in `scripts/routes.mjs`).
2. Add `src/i18n/locales/<code>.ts`, typed as `Dictionary`, translating every key from `en.ts`. The typechecker will not pass until it is complete.
3. Mount the locale in `src/App.tsx` (another `<Route path="/<code>/*">` wrapping `AppRoutes` in a `LocaleProvider`).
4. Add the locale's strings to the technique FAQ files (`technique-faqs-<code>.ts`) and to the OG translations in `generate-og-images.mjs`.
5. The sitemap generator and prerenderer pick up the new locale automatically from `LOCALES`/`SUPPORTED_LOCALES`.
