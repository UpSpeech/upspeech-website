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

const ORGANIZATION = { "@id": `${BASE_URL}/#organization` };

// schema.org defines `breadcrumb` on WebPage only, so this is its own node.
export function breadcrumbList(
  items: { name: string; path: string }[],
  locale: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localeAbsUrl(item.path, locale),
    })),
  };
}

export const TECHNIQUE_SEO: Record<
  string,
  { title: string; description: string }
> = {
  "voluntary-stuttering": {
    title: "Voluntary Stuttering Technique",
    description:
      "Stuttering on purpose, under your own control, so the fear of it has less to work with. What voluntary stuttering is for and how to practise it.",
  },
  cancelation: {
    title: "Cancellation Technique for Stuttering",
    description:
      "Stop after the stuttered word, then say it again with easier speech. Cancellation is a stuttering modification technique, and this is how to practise it.",
  },
  "pull-out": {
    title: "Pull-Out Technique for Stuttering",
    description:
      "Changing a stutter while it is still happening, by easing out of it mid-word. What the pull-out is for and how to practise it.",
  },
  "preparatory-set": {
    title: "Preparatory Set Technique",
    description:
      "Setting up the movement before the word starts, instead of repairing it afterwards. What the preparatory set is for and how to practise it.",
  },
  holding: {
    title: "Holding Technique for Stuttering",
    description:
      "Staying in the articulatory position through a block until the tension drains out of it. What the holding technique is for and how to practise it.",
  },
  "soft-starts": {
    title: "Soft Starts Speech Technique",
    description:
      "Beginning a word with the vocal folds relaxed, so there is no hard glottal attack to push through. What soft starts is for and how to practise it.",
  },
  "soft-articulation-contact": {
    title: "Soft Articulation Contact Technique",
    description:
      "Light contact between the articulators, so less tension reaches the sound. What soft articulation contact is for and how to practise it.",
  },
  "prolonged-speech": {
    title: "Prolonged Speech Technique",
    description:
      "Vowels and continuant consonants held longer, which brings the rate down with them. What prolonged speech is for and how to practise it.",
  },
  "speech-speed-management": {
    title: "Speech Speed Management Technique",
    description:
      "Picking a speaking rate and keeping it when the room asks you to hurry. What speech speed management is for and how to practise it.",
  },
  pauses: {
    title: "Pauses Technique in Speech Therapy",
    description:
      "Breaks put in on purpose, so the time pressure comes off the word after them. What the pauses technique is for and how to practise it.",
  },
  "identification-desensitization": {
    title: "Identification & Desensitization for Stuttering",
    description:
      "Naming what your stutter actually does, until the reaction to it settles. A cognitive approach, with what it is for and how to practise it.",
  },
};

// pt and es have no curated table, so the title is the record's own name plus
// what kind of thing it is.
export const TECHNIQUE_TITLE_SUFFIX: Record<string, string> = {
  pt: "técnica para a gaguez",
  es: "técnica para la tartamudez",
};

const BRAND_SUFFIX = " | UpSpeech";
const MAX_TITLE_LENGTH = 60;

/** The <title> and meta description for a technique page. */
export function techniqueSeo(
  slug: string,
  locale: string,
  technique: { name: string; description: string } | null,
): { title?: string; description?: string } {
  const curated = locale === "en" ? TECHNIQUE_SEO[slug] : undefined;
  const suffix = TECHNIQUE_TITLE_SUFFIX[locale];
  const suffixed =
    technique && suffix ? `${technique.name}: ${suffix}` : undefined;
  const fits =
    suffixed !== undefined &&
    suffixed.length + BRAND_SUFFIX.length <= MAX_TITLE_LENGTH;
  return {
    title: curated?.title ?? (fits ? suffixed : technique?.name),
    description:
      curated?.description ||
      technique?.description ||
      (technique
        ? `Learn about ${technique.name}, a speech therapy technique for stuttering.`
        : undefined),
  };
}

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
    author: ORGANIZATION,
    publisher: ORGANIZATION,
    image: `${BASE_URL}/og${locale === "en" ? "" : `/${locale}`}/techniques/${slug}.png`,
    mainEntityOfPage: {
      "@id": `${localeAbsUrl(`/techniques/${slug}`, locale)}#webpage`,
    },
    about: {
      "@type": "Thing",
      name: name,
      description: description,
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

export function getPersonCenteredStructuredData(
  locale: string,
  headline: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: localeAbsUrl("/person-centered-therapy", locale),
    inLanguage: locale,
    datePublished: "2026-06-25",
    ...articleDates("/person-centered-therapy"),
    author: ORGANIZATION,
    publisher: ORGANIZATION,
    mainEntityOfPage: {
      "@id": `${localeAbsUrl("/person-centered-therapy", locale)}#webpage`,
    },
  };
}

export function getDocumentationArticleStructuredData(
  locale: string,
  headline: string,
  description: string,
) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: localeAbsUrl("/reducing-documentation-time", locale),
    inLanguage: locale,
    datePublished: "2026-06-25",
    ...articleDates("/reducing-documentation-time"),
    author: ORGANIZATION,
    publisher: ORGANIZATION,
    mainEntityOfPage: {
      "@id": `${localeAbsUrl("/reducing-documentation-time", locale)}#webpage`,
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
  };
}
