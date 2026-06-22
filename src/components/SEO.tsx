import { Helmet } from "react-helmet-async";
import { SUPPORTED_LOCALES } from "@/i18n";

const BASE_URL = "https://upspeech.app";
const DEFAULT_TITLE = "UpSpeech - Software for Stuttering Therapy Practices";
const DEFAULT_DESCRIPTION =
  "Continuous support for stuttering therapy. Structured between-session practice, AI-drafted session reports. Therapists always in the loop.";

// Locale-aware fallback title for pages that don't pass their own (the home
// page). English is unchanged; pt/es get an in-language title tag.
const DEFAULT_TITLE_BY_LOCALE: Record<string, string> = {
  en: DEFAULT_TITLE,
  pt: "UpSpeech - Software para clínicas de terapia da gaguez",
  es: "UpSpeech - Software para clínicas de terapia de la tartamudez",
};

const LOCALE_TO_OG: Record<string, string> = {
  en: "en_US",
  pt: "pt_PT",
  es: "es_ES",
};

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  type?: string;
  locale?: string;
  structuredData?: object | object[];
}

function ogImageForPath(path: string, locale: string): string {
  const slug =
    path === "/" || path === "" ? "home" : path.replace(/^\/|\/$/g, "");
  // English keeps the historical flat path; pt/es read from a locale folder.
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${BASE_URL}/og${prefix}/${slug}.png`;
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image,
  imageAlt,
  noindex = false,
  type = "website",
  locale = "en",
  structuredData,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | UpSpeech`
    : (DEFAULT_TITLE_BY_LOCALE[locale] ?? DEFAULT_TITLE);
  // Netlify serves every non-root URL with a trailing slash; match it in
  // canonical/og:url/hreflang so sitemap, canonical, and served URL all agree.
  const slashedPath =
    !path || path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  // Build the absolute URL for any locale: en at the root, pt/es prefixed.
  const localeUrl = (l: string) =>
    `${BASE_URL}${l === "en" ? "" : `/${l}`}${slashedPath}`;
  const canonicalUrl = localeUrl(locale);
  const resolvedImage = image ?? ogImageForPath(path, locale);
  const resolvedImageAlt = imageAlt ?? fullTitle;
  const ogLocale = LOCALE_TO_OG[locale] ?? "en_US";

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      {/* hreflang alternates */}
      {SUPPORTED_LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={localeUrl(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={localeUrl("en")} />

      {/* OpenGraph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="UpSpeech" />
      <meta property="og:locale" content={ogLocale} />
      {SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => (
        <meta
          key={l}
          property="og:locale:alternate"
          content={LOCALE_TO_OG[l]}
        />
      ))}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:secure_url" content={resolvedImage} />
      <meta
        property="og:image:type"
        content={
          resolvedImage.endsWith(".jpg") || resolvedImage.endsWith(".jpeg")
            ? "image/jpeg"
            : "image/png"
        }
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedImageAlt} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={resolvedImageAlt} />

      {/* Structured Data */}
      {structuredData &&
        (Array.isArray(structuredData) ? (
          structuredData.map((data, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        ))}
    </Helmet>
  );
}
