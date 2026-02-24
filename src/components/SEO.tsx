import { Helmet } from "react-helmet-async";

const BASE_URL = "https://upspeech.app";
const DEFAULT_TITLE = "UpSpeech - AI-Powered Speech Therapy Support";
const DEFAULT_DESCRIPTION =
  "Transform your speech therapy practice with AI-powered training between sessions. Help patients practice effectively and see better results.";
const DEFAULT_IMAGE = `${BASE_URL}/screenshots/desktop.jpg`;

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: string;
  structuredData?: object;
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
  noindex = false,
  type = "website",
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | UpSpeech` : DEFAULT_TITLE;
  const canonicalUrl = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* OpenGraph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
