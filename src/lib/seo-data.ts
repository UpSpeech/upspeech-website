/**
 * Static SEO metadata for all routes.
 * Used as initial/fallback data before dynamic content loads.
 */

import { getTechniqueFAQs } from "./technique-faqs";
import { routeDate } from "@/lib/route-dates.generated";

/** dateModified for an Article, from the generated route dates. Omitted if git had nothing to say. */
function articleDates(path: string): { dateModified?: string } {
  const dateModified = routeDate(path);
  return dateModified ? { dateModified } : {};
}

const BASE_URL = "https://upspeech.app";

/** Absolute URL for a locale-agnostic path, matching SEO.tsx canonical/hreflang exactly. */
function localeAbsUrl(path: string, locale: string): string {
  const pathWithSlash =
    path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${pathWithSlash}`;
}

export const TECHNIQUE_SEO: Record<
  string,
  { title: string; description: string }
> = {
  "voluntary-stuttering": {
    title: "Voluntary Stuttering Technique",
    description:
      "Stuttering on purpose, under your own control, so the fear of it has less to work with. What voluntary stuttering is for and how to practice it.",
  },
  cancelation: {
    title: "Cancellation Technique for Stuttering",
    description:
      "Stop after the stuttered word, then say it again with easier speech. Cancellation is a stuttering modification technique, and this is how to practice it.",
  },
  "pull-out": {
    title: "Pull-Out Technique for Stuttering",
    description:
      "Changing a stutter while it is still happening, by easing out of it mid-word. What the pull-out is for and how to practice it.",
  },
  "preparatory-set": {
    title: "Preparatory Set Technique",
    description:
      "Setting up the movement before the word starts, instead of repairing it afterwards. What the preparatory set is for and how to practice it.",
  },
  holding: {
    title: "Holding Technique for Stuttering",
    description:
      "Staying in the articulatory position through a block until the tension drains out of it. What the holding technique is for and how to practice it.",
  },
  "soft-starts": {
    title: "Soft Starts Speech Technique",
    description:
      "Beginning a word with the vocal folds relaxed, so there is no hard glottal attack to push through. What soft starts is for and how to practice it.",
  },
  "soft-articulation-contact": {
    title: "Soft Articulation Contact Technique",
    description:
      "Light contact between the articulators, so less tension reaches the sound. What soft articulation contact is for and how to practice it.",
  },
  "prolonged-speech": {
    title: "Prolonged Speech Technique",
    description:
      "Vowels and continuant consonants held longer, which brings the rate down with them. What prolonged speech is for and how to practice it.",
  },
  "speech-speed-management": {
    title: "Speech Speed Management Technique",
    description:
      "Picking a speaking rate and keeping it when the room asks you to hurry. What speech speed management is for and how to practice it.",
  },
  pauses: {
    title: "Pauses Technique in Speech Therapy",
    description:
      "Breaks put in on purpose, so the time pressure comes off the word after them. What the pauses technique is for and how to practice it.",
  },
  "identification-desensitization": {
    title: "Identification & Desensitization for Stuttering",
    description:
      "Naming what your stutter actually does, until the reaction to it settles. A cognitive approach, with what it is for and how to practice it.",
  },
};

export function getTechniqueStructuredData(
  slug: string,
  name: string,
  description: string,
  locale: string = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: name,
    description: description,
    url: localeAbsUrl(`/techniques/${slug}`, locale),
    inLanguage: locale,
    datePublished: "2026-02-01",
    // datePublished is an editorial fact git cannot know, so it stays written
    // down. dateModified is generated, because the hand-typed one drifted:
    // this page claimed 2026-03-03 here, 2026-04-23 in the sitemap and
    // 2026-03-06 in the database.
    ...articleDates(`/techniques/${slug}`),
    author: {
      "@type": "Organization",
      name: "UpSpeech",
      url: "https://upspeech.app",
    },
    publisher: {
      "@type": "Organization",
      name: "UpSpeech",
      url: "https://upspeech.app",
      logo: {
        "@type": "ImageObject",
        url: "https://upspeech.app/icons/apple-touch-icon.png",
      },
    },
    image: `${BASE_URL}/og${locale === "en" ? "" : `/${locale}`}/techniques/${slug}.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": localeAbsUrl(`/techniques/${slug}`, locale),
    },
    about: {
      "@type": "Thing",
      name: name,
      description: description,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: localeAbsUrl("/", locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Techniques",
          item: localeAbsUrl("/techniques", locale),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: name,
          item: localeAbsUrl(`/techniques/${slug}`, locale),
        },
      ],
    },
  };
}

export function getTechniqueFAQStructuredData(
  slug: string,
  locale: string = "en",
) {
  const faqs = getTechniqueFAQs(slug, locale);
  if (!faqs?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getPersonCenteredStructuredData(locale: string = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What does person-centered mean?",
    description:
      "A plain-language guide to person-centered speech therapy: what it means, why fluency is not the only goal, and how UpSpeech reflects this approach.",
    url: localeAbsUrl("/person-centered-therapy", locale),
    inLanguage: locale,
    datePublished: "2026-06-25",
    ...articleDates("/person-centered-therapy"),
    author: {
      "@type": "Organization",
      name: "UpSpeech",
      url: "https://upspeech.app",
    },
    publisher: {
      "@type": "Organization",
      name: "UpSpeech",
      url: "https://upspeech.app",
      logo: {
        "@type": "ImageObject",
        url: "https://upspeech.app/icons/apple-touch-icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": localeAbsUrl("/person-centered-therapy", locale),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: localeAbsUrl("/", locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Person-centered",
          item: localeAbsUrl("/person-centered-therapy", locale),
        },
      ],
    },
  };
}

export function getDocumentationArticleStructuredData(locale: string = "en") {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How speech-language pathologists spend less time on session notes",
    description:
      "A practical guide for speech-language pathologists on reducing documentation time in speech therapy, with structured drafts that support clinical judgement.",
    url: localeAbsUrl("/reducing-documentation-time", locale),
    inLanguage: locale,
    datePublished: "2026-06-25",
    ...articleDates("/reducing-documentation-time"),
    author: {
      "@type": "Organization",
      name: "UpSpeech",
      url: "https://upspeech.app",
    },
    publisher: {
      "@type": "Organization",
      name: "UpSpeech",
      url: "https://upspeech.app",
      logo: {
        "@type": "ImageObject",
        url: "https://upspeech.app/icons/apple-touch-icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": localeAbsUrl("/reducing-documentation-time", locale),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: localeAbsUrl("/", locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Reducing documentation time",
          item: localeAbsUrl("/reducing-documentation-time", locale),
        },
      ],
    },
  };
  return articleSchema;
}

export function getTechniquesIndexStructuredData(locale: string = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Speech Therapy Techniques for Stuttering",
    description:
      "Browse established speech therapy techniques for stuttering, including fluency shaping, stuttering modification, and cognitive approaches.",
    url: localeAbsUrl("/techniques", locale),
    inLanguage: locale,
    isPartOf: {
      "@id": "https://upspeech.app/#website",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: Object.entries(TECHNIQUE_SEO).map(
        ([slug, { title }], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: title,
          url: localeAbsUrl(`/techniques/${slug}`, locale),
        }),
      ),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: localeAbsUrl("/", locale),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Techniques",
          item: localeAbsUrl("/techniques", locale),
        },
      ],
    },
  };
}
