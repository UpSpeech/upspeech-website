import type { Dictionary } from "./en";

// REVIEW NEEDED: nav/footer/localeSwitcher strings are new translations drafted
// for this localization work. The techniquesIndex/techniquePage strings are
// lifted from the existing per-page pt literals already shipped on the site.
export const pt: Dictionary = {
  nav: {
    howItWorks: "Como funciona",
    features: "Funcionalidades",
    whyUs: "Porquê a UpSpeech",
    techniques: "Técnicas",
    forPatients: "Para pacientes",
    requestAccess: "Pedir acesso antecipado",
  },
  footer: {
    tagline: "Guiar vozes com cuidado e tecnologia",
    product: "Produto",
    legal: "Legal",
    company: "Empresa",
    forPatients: "Para pacientes",
    techniques: "Técnicas",
    support: "Apoio",
    privacy: "Política de Privacidade",
    terms: "Termos de Serviço",
    cookies: "Política de Cookies",
    linkedin: "LinkedIn",
    contact: "Contactar-nos",
    rights: "Todos os direitos reservados.",
  },
  localeSwitcher: {
    label: "Idioma",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  techniquesIndex: {
    title: "Técnicas de Terapia da Fala",
    subtitle: "Explore técnicas estabelecidas para a terapia da gaguez",
    seoDescription:
      "Conheça técnicas estabelecidas de terapia da fala para a gaguez, incluindo modelagem da fluência, modificação da gaguez e abordagens cognitivas.",
    featured: "Destaque",
    mainCategories: "Categorias de Técnicas",
    standalone: "Técnicas Independentes",
    viewDetails: "Ver Detalhes",
    techniques: "técnicas",
    loading: "A carregar técnicas...",
    error: "Erro ao Carregar Técnicas",
    tryAgain:
      "Erro ao carregar técnicas. Por favor, tente novamente mais tarde.",
  },
  techniquePage: {
    loading: "A carregar técnica...",
    error: "Erro ao Carregar Técnica",
    notFound: "Técnica não encontrada",
    backToAll: "Voltar a todas as técnicas",
    practicalDescription: "Descrição Prática",
    objective: "Objetivo",
    howToPractice: "Como Praticar",
    relatedTechniques: "Técnicas Relacionadas",
  },
};
