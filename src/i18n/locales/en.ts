// English is the source dictionary. Its shape defines the `Dictionary` type, so
// pt.ts and es.ts fail typechecking if they miss a key. British spelling in
// copy (practise, organised, behaviour). No em-dash characters anywhere.
export const en = {
  nav: {
    howItWorks: "How it works",
    features: "Features",
    whyUs: "Why Us",
    techniques: "Techniques",
    forPatients: "For patients",
    requestAccess: "Request early access",
  },
  footer: {
    tagline: "Guiding voices with care and tech",
    product: "Product",
    legal: "Legal",
    company: "Company",
    forPatients: "For patients",
    techniques: "Techniques",
    support: "Support",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy",
    linkedin: "LinkedIn",
    contact: "Contact us",
    rights: "All rights reserved.",
  },
  localeSwitcher: {
    label: "Language",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  techniquesIndex: {
    title: "Speech Therapy Techniques",
    subtitle: "Explore established techniques for stuttering therapy",
    featured: "Featured",
    mainCategories: "Technique Categories",
    standalone: "Standalone Techniques",
    viewDetails: "View Details",
    techniques: "techniques",
    loading: "Loading techniques...",
    error: "Error Loading Techniques",
    tryAgain: "Failed to load techniques. Please try again later.",
  },
  techniquePage: {
    loading: "Loading technique...",
    error: "Error Loading Technique",
    notFound: "Technique not found",
    backToAll: "Back to all techniques",
    practicalDescription: "Practical Description",
    objective: "Objective",
    howToPractice: "How to Practice",
    relatedTechniques: "Related Techniques",
  },
};

export type Dictionary = typeof en;
