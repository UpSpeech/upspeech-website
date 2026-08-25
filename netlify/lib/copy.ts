/**
 * Copy for the early-access applicant email, in the three languages the site
 * ships. Register follows the site's own locale files: Portuguese is formal
 * ("o seu"), Spanish is informal ("tu"), matching src/i18n/locales/*.
 *
 * The locale union is declared here rather than imported from src/i18n so the
 * function bundle stays independent of the app bundle. isEmailLocale is the
 * guard for the value the browser posts, which is untrusted either way.
 */

export const EMAIL_LOCALES = ["en", "pt", "es"] as const;
export type EmailLocale = (typeof EMAIL_LOCALES)[number];
export const DEFAULT_EMAIL_LOCALE: EmailLocale = "en";

export const isEmailLocale = (value: unknown): value is EmailLocale =>
  typeof value === "string" &&
  (EMAIL_LOCALES as readonly string[]).includes(value);

export interface Step {
  title: string;
  detail: string;
}

export interface ApplicantCopy {
  /** BCP 47 tag for the <html lang> attribute. */
  lang: string;
  subject: string;
  /** The preview line mail clients show next to the subject. */
  preheader: string;
  eyebrow: string;
  /** Just the salutation. The template sets the name in the accent colour. */
  greetingPrefix: string;
  intro: string;
  cardTitle: string;
  labelName: string;
  labelRole: string;
  labelClinicSize: string;
  notSpecified: string;
  roles: Record<string, string>;
  clinicSizes: Record<string, string>;
  stepsTitle: string;
  steps: [Step, Step, Step];
  surveyTitle: string;
  surveyBody: string;
  surveyCta: string;
  replyNote: string;
  signoff: string;
  tagline: string;
  footerNote: string;
}

const en: ApplicantCopy = {
  lang: "en",
  subject: "We received your early-access request",
  preheader: "Here is what we have on file, and what happens next.",
  eyebrow: "Early access",
  greetingPrefix: "Hi",
  intro:
    "Thanks for asking about early access to UpSpeech. We work with a small cohort of clinics at a time, and a person reads every request that comes in.",
  cardTitle: "Your request",
  labelName: "Name",
  labelRole: "Role",
  labelClinicSize: "Clinic size",
  notSpecified: "Not specified",
  roles: {
    "speech-therapist": "Speech Therapist",
    "clinic-director": "Clinic Director",
    "practice-owner": "Practice Owner",
    other: "Other",
  },
  clinicSizes: {
    solo: "Solo Practice",
    small: "2-5 Therapists",
    medium: "6-15 Therapists",
    large: "15+ Therapists",
  },
  stepsTitle: "What happens next",
  steps: [
    {
      title: "We read your request",
      detail:
        "Someone on the team goes through it, usually within a few working days.",
    },
    {
      title: "We get in touch",
      detail:
        "A short conversation about how your practice runs and where between-session practice would help.",
    },
    {
      title: "You get set up",
      detail:
        "If it's a fit, your clinic joins the next cohort and we walk you through it.",
    },
  ],
  surveyTitle: "One thing before then",
  surveyBody:
    "A few questions about what you and the people you support would value most. Your answers shape what we build first.",
  surveyCta: "Take the 2-minute survey",
  replyNote: "Reply to this email and it reaches us directly.",
  signoff: "The UpSpeech team",
  tagline: "Speech therapy practice, between sessions.",
  footerNote:
    "You are receiving this because you requested early access at upspeech.app.",
};

const pt: ApplicantCopy = {
  lang: "pt-PT",
  subject: "Recebemos o seu pedido de acesso antecipado",
  preheader: "Os dados que registámos e os próximos passos.",
  eyebrow: "Acesso antecipado",
  greetingPrefix: "Olá",
  intro:
    "Obrigado por pedir acesso antecipado ao UpSpeech. Trabalhamos com um pequeno conjunto de clínicas de cada vez e há sempre alguém da equipa a ler cada pedido.",
  cardTitle: "O seu pedido",
  labelName: "Nome",
  labelRole: "Função",
  labelClinicSize: "Dimensão da clínica",
  notSpecified: "Não indicado",
  roles: {
    "speech-therapist": "Terapeuta da fala",
    "clinic-director": "Diretor de clínica",
    "practice-owner": "Proprietário de consultório",
    other: "Outro",
  },
  clinicSizes: {
    solo: "Consultório individual",
    small: "2-5 Terapeutas",
    medium: "6-15 Terapeutas",
    large: "15+ Terapeutas",
  },
  stepsTitle: "Próximos passos",
  steps: [
    {
      title: "Lemos o seu pedido",
      detail:
        "Alguém da equipa analisa-o, normalmente dentro de alguns dias úteis.",
    },
    {
      title: "Entramos em contacto",
      detail:
        "Uma conversa curta sobre como funciona a sua clínica e onde a prática entre sessões faria diferença.",
    },
    {
      title: "Fica com acesso",
      detail:
        "Se fizer sentido, a sua clínica entra no próximo grupo e acompanhamos a configuração.",
    },
  ],
  surveyTitle: "Antes disso, uma coisa",
  surveyBody:
    "Algumas perguntas sobre o que teria mais valor para si e para as pessoas que acompanha. As respostas orientam o que construímos primeiro.",
  surveyCta: "Responder ao inquérito de 2 minutos",
  replyNote: "Responda a este email e chega diretamente até nós.",
  signoff: "A equipa UpSpeech",
  tagline: "Prática de terapia da fala, entre sessões.",
  footerNote:
    "Recebe este email porque pediu acesso antecipado em upspeech.app.",
};

const es: ApplicantCopy = {
  lang: "es",
  subject: "Hemos recibido tu solicitud de acceso anticipado",
  preheader: "Los datos que hemos registrado y los siguientes pasos.",
  eyebrow: "Acceso anticipado",
  greetingPrefix: "Hola",
  intro:
    "Gracias por solicitar acceso anticipado a UpSpeech. Trabajamos con un grupo reducido de clínicas cada vez, y alguien del equipo lee todas las solicitudes.",
  cardTitle: "Tu solicitud",
  labelName: "Nombre",
  labelRole: "Función",
  labelClinicSize: "Tamaño de la clínica",
  notSpecified: "Sin especificar",
  roles: {
    "speech-therapist": "Logopeda",
    "clinic-director": "Director de clínica",
    "practice-owner": "Propietario de consulta",
    other: "Otro",
  },
  clinicSizes: {
    solo: "Consulta individual",
    small: "2-5 terapeutas",
    medium: "6-15 terapeutas",
    large: "15+ terapeutas",
  },
  stepsTitle: "Siguientes pasos",
  steps: [
    {
      title: "Leemos tu solicitud",
      detail:
        "Alguien del equipo la revisa, normalmente en unos pocos días laborables.",
    },
    {
      title: "Nos ponemos en contacto",
      detail:
        "Una conversación breve sobre cómo funciona tu clínica y dónde encajaría la práctica entre sesiones.",
    },
    {
      title: "Empiezas a usarlo",
      detail:
        "Si encaja, tu clínica entra en el siguiente grupo y te acompañamos en la puesta en marcha.",
    },
  ],
  surveyTitle: "Antes de eso, una cosa",
  surveyBody:
    "Unas preguntas sobre lo que más valoraríais tú y las personas a las que atiendes. Tus respuestas guían lo que construimos primero.",
  surveyCta: "Responder a la encuesta de 2 minutos",
  replyNote: "Responde a este correo y nos llega directamente.",
  signoff: "El equipo de UpSpeech",
  tagline: "Práctica de terapia del habla, entre sesiones.",
  footerNote:
    "Recibes este correo porque solicitaste acceso anticipado en upspeech.app.",
};

const COPY: Record<EmailLocale, ApplicantCopy> = { en, pt, es };

export const applicantCopy = (locale: EmailLocale): ApplicantCopy =>
  COPY[locale];

/*
 * The form posts stable slugs ("speech-therapist", "small"), not the labels the
 * visitor saw, so both emails and the spreadsheet would otherwise show raw
 * slugs. An unrecognised value falls through to the submitted string rather
 * than being dropped, which keeps a hand-crafted post or a newly added option
 * visible instead of silently blank.
 */
export const roleLabel = (locale: EmailLocale, key: string): string =>
  COPY[locale].roles[key] ?? key;

export const clinicSizeLabel = (locale: EmailLocale, key: string): string =>
  key ? (COPY[locale].clinicSizes[key] ?? key) : "";

/** "Hi Vasco," as one string, for the plain-text part and the <title>. */
export const greetingText = (copy: ApplicantCopy, name: string): string =>
  `${copy.greetingPrefix} ${name},`;
