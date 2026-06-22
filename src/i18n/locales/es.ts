import type { Dictionary } from "./en";

// REVIEW NEEDED: nav/footer/localeSwitcher strings are new translations drafted
// for this localization work. The techniquesIndex/techniquePage strings are
// lifted from the existing per-page es literals already shipped on the site.
export const es: Dictionary = {
  nav: {
    howItWorks: "Cómo funciona",
    features: "Funciones",
    whyUs: "Por qué UpSpeech",
    techniques: "Técnicas",
    forPatients: "Para pacientes",
    requestAccess: "Solicitar acceso anticipado",
  },
  footer: {
    tagline: "Guiando voces con cuidado y tecnología",
    product: "Producto",
    legal: "Legal",
    company: "Empresa",
    forPatients: "Para pacientes",
    techniques: "Técnicas",
    support: "Soporte",
    privacy: "Política de Privacidad",
    terms: "Términos del Servicio",
    cookies: "Política de Cookies",
    linkedin: "LinkedIn",
    contact: "Contáctanos",
    rights: "Todos los derechos reservados.",
  },
  localeSwitcher: {
    label: "Idioma",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  techniquesIndex: {
    title: "Técnicas de Terapia del Habla",
    subtitle: "Explora técnicas establecidas para la terapia de tartamudeo",
    seoDescription:
      "Descubre técnicas establecidas de terapia del habla para la tartamudez, incluyendo modelado de la fluidez, modificación de la tartamudez y enfoques cognitivos.",
    featured: "Destacado",
    mainCategories: "Categorías de Técnicas",
    standalone: "Técnicas Independientes",
    viewDetails: "Ver Detalles",
    techniques: "técnicas",
    loading: "Cargando técnicas...",
    error: "Error al Cargar Técnicas",
    tryAgain:
      "Error al cargar técnicas. Por favor, inténtalo de nuevo más tarde.",
  },
  techniquePage: {
    loading: "Cargando técnica...",
    error: "Error al Cargar Técnica",
    notFound: "Técnica no encontrada",
    backToAll: "Volver a todas las técnicas",
    practicalDescription: "Descripción Práctica",
    objective: "Objetivo",
    howToPractice: "Cómo Practicar",
    relatedTechniques: "Técnicas Relacionadas",
  },
};
