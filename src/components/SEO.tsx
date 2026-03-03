import { Helmet } from "react-helmet-async";

const BASE_URL = "https://upspeech.app";
const DEFAULT_TITLE = "UpSpeech - AI-Powered Speech Therapy Support";
const DEFAULT_DESCRIPTION =
  "Transform your speech therapy practice with AI-powered training between sessions. Help patients practice effectively and see better results.";
const DEFAULT_IMAGE = `${BASE_URL}/screenshots/desktop.jpg`;
const DEFAULT_IMAGE_ALT =
  "UpSpeech dashboard showing AI-powered speech therapy tools for stuttering treatment";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  type?: string;
  structuredData?: object;
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
  imageAlt = DEFAULT_IMAGE_ALT,
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
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      {/* OpenGraph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="UpSpeech" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
