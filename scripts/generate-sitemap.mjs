import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ROUTES, LOCALES, localeUrl } from "./routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "..", "public", "sitemap.xml");

// One <url> per (route, locale). Each carries the full reciprocal set of
// xhtml:link hreflang alternates (en/pt/es + x-default) so search engines see
// the language variants as alternates of one another, not duplicates.
function urlEntry(route, locale) {
  const alternates = [
    ...LOCALES.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${localeUrl(route.path, l)}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(route.path, "en")}" />`,
  ].join("\n");

  const lastmod = route.lastmod
    ? `\n    <lastmod>${route.lastmod}</lastmod>`
    : "";
  const changefreq = route.changefreq
    ? `\n    <changefreq>${route.changefreq}</changefreq>`
    : "";
  const priority = route.priority
    ? `\n    <priority>${route.priority}</priority>`
    : "";

  return `  <url>
    <loc>${localeUrl(route.path, locale)}</loc>${lastmod}${changefreq}${priority}
${alternates}
  </url>`;
}

const body = ROUTES.flatMap((route) =>
  LOCALES.map((locale) => urlEntry(route, locale)),
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${body}
</urlset>
`;

writeFileSync(OUTPUT, xml, "utf-8");
console.log(
  "Wrote %s (%d urls across %d locales)",
  OUTPUT.replace(join(__dirname, ".."), "."),
  ROUTES.length * LOCALES.length,
  LOCALES.length,
);
