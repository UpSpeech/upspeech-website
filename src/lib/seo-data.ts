/**
 * Static SEO metadata for all routes.
 * Used as initial/fallback data before dynamic content loads.
 */

export const TECHNIQUE_SEO: Record<
  string,
  { title: string; description: string }
> = {
  "voluntary-stuttering": {
    title: "Voluntary Stuttering Technique",
    description:
      "Learn voluntary stuttering — a speech therapy technique where you intentionally stutter to reduce fear and tension. Understand how it works, its objectives, and how to practice.",
  },
  cancelation: {
    title: "Cancellation Technique for Stuttering",
    description:
      "Master the cancellation technique — pause after a stuttered word and repeat it with controlled, easier speech. A core stuttering modification strategy for speech therapy.",
  },
  "pull-out": {
    title: "Pull-Out Technique for Stuttering",
    description:
      "Learn the pull-out technique — modify a stutter mid-word by easing into smoother speech. A real-time stuttering modification method used in speech therapy.",
  },
  "preparatory-set": {
    title: "Preparatory Set Technique",
    description:
      "Understand the preparatory set — plan your articulatory movements before speaking to reduce stuttering. A proactive fluency shaping technique for speech therapy.",
  },
  holding: {
    title: "Holding Technique for Stuttering",
    description:
      "Learn the holding technique — maintain your articulatory position during a block to release tension gradually. A key stuttering modification strategy.",
  },
  "soft-starts": {
    title: "Soft Starts Speech Technique",
    description:
      "Practice soft starts — begin voicing gently with relaxed vocal folds to reduce hard glottal attacks. A foundational fluency shaping technique in speech therapy.",
  },
  "soft-articulation-contact": {
    title: "Soft Articulation Contact Technique",
    description:
      "Learn soft articulation contact — use light, relaxed contact between articulators to reduce tension and improve speech flow. A fluency shaping method for stuttering therapy.",
  },
  "prolonged-speech": {
    title: "Prolonged Speech Technique",
    description:
      "Master prolonged speech — extend vowels and continuant consonants to slow your rate and increase fluency. A widely-used fluency shaping technique in stuttering therapy.",
  },
  "speech-speed-management": {
    title: "Speech Speed Management Technique",
    description:
      "Learn speech speed management — control your speaking rate to maintain fluency under different communication demands. A practical technique for stuttering therapy.",
  },
  pauses: {
    title: "Pauses Technique in Speech Therapy",
    description:
      "Master the use of pauses — incorporate natural breaks in speech to reduce time pressure and improve fluency. An essential technique for stuttering management.",
  },
  "identification-desensitization": {
    title: "Identification & Desensitization for Stuttering",
    description:
      "Learn identification and desensitization — recognize stuttering patterns and reduce emotional reactions to disfluency. A cognitive approach to stuttering therapy.",
  },
};

export function getTechniqueStructuredData(
  slug: string,
  name: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: name,
    description: description,
    url: `https://upspeech.app/techniques/${slug}`,
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
      "@id": `https://upspeech.app/techniques/${slug}`,
    },
    about: {
      "@type": "MedicalTherapy",
      name: name,
      description: description,
      medicineSystem: "https://schema.org/WesternConventional",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://upspeech.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Techniques",
          item: "https://upspeech.app/techniques",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: name,
          item: `https://upspeech.app/techniques/${slug}`,
        },
      ],
    },
  };
}

export function getTechniquesIndexStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Speech Therapy Techniques",
    description:
      "Browse evidence-based speech therapy techniques for stuttering — including fluency shaping, stuttering modification, and cognitive approaches.",
    url: "https://upspeech.app/techniques",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: Object.entries(TECHNIQUE_SEO).map(
        ([slug, { title }], index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: title,
          url: `https://upspeech.app/techniques/${slug}`,
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
          item: "https://upspeech.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Techniques",
          item: "https://upspeech.app/techniques",
        },
      ],
    },
  };
}
