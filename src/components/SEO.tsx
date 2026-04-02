import { Helmet } from "react-helmet-async";

const BASE_URL = "https://upspeech.app";
const DEFAULT_TITLE = "UpSpeech - AI-Powered Speech Therapy Support";
const DEFAULT_DESCRIPTION =
  "Transform your speech therapy practice with AI-powered training between sessions. Help patients practice effectively and see better results.";

const SUPPORTED_LOCALES = ["en", "pt", "es"] as const;

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

function ogImageForPath(path: string): string {
  const slug = path === "/" || path === "" ? "home" : path.replace(/^\//, "");
  return `${BASE_URL}/og/${slug}.png`;
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
  const fullTitle = title ? `${title} | UpSpeech` : DEFAULT_TITLE;
  const canonicalUrl = `${BASE_URL}${path}`;
  const resolvedImage = image ?? ogImageForPath(path);
  const resolvedImageAlt = imageAlt ?? fullTitle;
  const ogLocale = LOCALE_TO_OG[locale] ?? "en_US";

  return (
    <Helmet>
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
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={l === "en" ? canonicalUrl : `${canonicalUrl}?lang=${l}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

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
