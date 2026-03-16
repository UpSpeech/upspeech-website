/**
 * Static SEO metadata for all routes.
 * Used as initial/fallback data before dynamic content loads.
 */

import { getTechniqueFAQs } from "./technique-faqs";

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
    inLanguage: "en",
    datePublished: "2026-02-01",
    dateModified: "2026-03-03",
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
    image: `https://upspeech.app/og/techniques/${slug}.png`,
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

export function getTechniquesIndexStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Speech Therapy Techniques for Stuttering",
    description:
      "Browse evidence-based speech therapy techniques for stuttering — including fluency shaping, stuttering modification, and cognitive approaches.",
    url: "https://upspeech.app/techniques",
    inLanguage: "en",
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

export function getWhatIsStutteringStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What Is Stuttering? Types, Causes & Treatment",
      description:
        "A comprehensive guide to understanding stuttering — its types, causes, prevalence, and evidence-based treatment approaches used in speech therapy.",
      url: "https://upspeech.app/what-is-stuttering",
      inLanguage: "en",
      datePublished: "2026-03-16",
      dateModified: "2026-03-16",
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
      image: "https://upspeech.app/og/what-is-stuttering.png",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://upspeech.app/what-is-stuttering",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalCondition",
      name: "Stuttering",
      alternateName: ["Stammering", "Childhood-Onset Fluency Disorder"],
      description:
        "Stuttering is a speech disorder that affects the flow and timing of speech, characterized by repetitions, prolongations, and blocks.",
      signOrSymptom: [
        { "@type": "MedicalSignOrSymptom", name: "Sound repetitions" },
        { "@type": "MedicalSignOrSymptom", name: "Syllable repetitions" },
        { "@type": "MedicalSignOrSymptom", name: "Sound prolongations" },
        { "@type": "MedicalSignOrSymptom", name: "Speech blocks" },
        {
          "@type": "MedicalSignOrSymptom",
          name: "Secondary behaviors (eye blinks, facial tension)",
        },
      ],
      possibleTreatment: [
        {
          "@type": "MedicalTherapy",
          name: "Speech Therapy",
          description:
            "Evidence-based speech therapy including stuttering modification, fluency shaping, and cognitive approaches.",
        },
      ],
      epidemiology:
        "Affects approximately 1% of the adult population worldwide (70+ million people). About 5% of children experience stuttering.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What causes stuttering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stuttering is multifactorial. Research points to a combination of genetic factors (about two-thirds of people who stutter report a family history), neurological differences in brain regions involved in speech production, and environmental factors that can influence severity. Stuttering is not caused by nervousness, bad parenting, or low intelligence.",
          },
        },
        {
          "@type": "Question",
          name: "How common is stuttering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stuttering affects approximately 1% of the world's adult population — more than 70 million people globally. About 5% of all children experience stuttering during development. It occurs in all languages, cultures, and socioeconomic groups, with a 4:1 male-to-female ratio in adults.",
          },
        },
        {
          "@type": "Question",
          name: "Can stuttering be cured?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no single cure for stuttering, but speech therapy can significantly improve fluency, communication confidence, and quality of life. Most children who begin stuttering recover naturally, though the rate varies across studies (65–80%). For those who continue into adulthood, evidence-based techniques such as stuttering modification, fluency shaping, and cognitive approaches can make a meaningful difference.",
          },
        },
        {
          "@type": "Question",
          name: "When should I seek help for stuttering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For children, consult a speech-language pathologist if stuttering has persisted for more than 6 months, started after age 3.5, there is a family history of persistent stuttering, or the child shows signs of frustration or avoidance. For adults, it is never too late to seek help — speech therapy can improve fluency and communication confidence at any age.",
          },
        },
        {
          "@type": "Question",
          name: "What are the main types of stuttering treatment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Treatment generally falls into three categories: stuttering modification (changing how you stutter to make it easier), fluency shaping (changing overall speech patterns to promote smoother speech), and cognitive approaches (addressing thoughts and feelings that can worsen stuttering). Most modern programs combine all three, tailored to the individual.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
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
          name: "What Is Stuttering?",
          item: "https://upspeech.app/what-is-stuttering",
        },
      ],
    },
  ];
}
