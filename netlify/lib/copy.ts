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
  /** Opens the greeting when nobody gave a name. */
  greetingFallback: string;
  labelName: string;
  labelRole: string;
  labelRequest: string;
  labelClinicSize: string;
  notSpecified: string;
  profiles: Record<string, string>;
  clinicSizes: Record<string, string>;
  requests: Record<"waitlist" | "early" | "demo" | "pilot", string>;
  introDemo: string;
  introPilot: string;
  stepsTitle: string;
  steps: [Step, Step, Step];
  surveyTitle: string;
  surveyBody: string;
  surveyCta: string;
  replyNote: string;
  signoff: string;
  tagline: string;
  footerNote: string;
  /** The receipt for the waiting list: people in therapy, families, friends. */
  waitlist: {
    subject: string;
    preheader: string;
    eyebrow: string;
    intro: string;
    cardTitle: string;
    steps: [Step, Step, Step];
    footerNote: string;
  };
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
  greetingFallback: "Hi there",
  labelName: "Name",
  labelRole: "Joining as",
  labelRequest: "Request",
  labelClinicSize: "Therapists taking part",
  notSpecified: "Not specified",
  profiles: {
    therapist: "Speech therapist or clinic",
    patient: "In speech therapy",
    caregiver: "Parent or caregiver",
    referrer: "Friend or supporter",
  },
  clinicSizes: {
    solo: "Solo Practice",
    small: "2-5 Therapists",
    medium: "6-15 Therapists",
    large: "15+ Therapists",
  },
  requests: {
    waitlist: "Waiting list",
    early: "Early access",
    demo: "Demo",
    pilot: "Clinical pilot",
  },
  introDemo:
    "Thanks for asking for a demo. A person on the team reads every request and gets in touch to find a time.",
  introPilot:
    "Thanks for asking about a pilot. A person on the team reads every request and gets in touch within a few working days.",
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
  waitlist: {
    subject: "You're on the UpSpeech waiting list",
    preheader: "What happens next, and when you'll hear from us.",
    eyebrow: "Waiting list",
    intro:
      "Thanks for joining. UpSpeech helps people practice between speech therapy sessions, with their therapist following along. We'll write when it opens, and send useful resources before then.",
    cardTitle: "You joined",
    steps: [
      {
        title: "News as we build",
        detail: "What we're working on, and when there's something new to try.",
      },
      {
        title: "Useful reading",
        detail: "Practical pieces about speech therapy, now and then.",
      },
      {
        title: "When it opens",
        detail: "You hear first, with how to get started.",
      },
    ],
    footerNote:
      "You are receiving this because you joined the waiting list at upspeech.app.",
  },
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
  greetingFallback: "Olá",
  labelName: "Nome",
  labelRole: "Inscrição como",
  labelRequest: "Pedido",
  labelClinicSize: "Terapeutas envolvidos",
  notSpecified: "Não indicado",
  profiles: {
    therapist: "Terapeuta da fala ou clínica",
    patient: "Em terapia da fala",
    caregiver: "Pai, mãe ou cuidador",
    referrer: "Amigo ou apoiante",
  },
  clinicSizes: {
    solo: "Consultório individual",
    small: "2-5 Terapeutas",
    medium: "6-15 Terapeutas",
    large: "15+ Terapeutas",
  },
  requests: {
    waitlist: "Lista de espera",
    early: "Acesso antecipado",
    demo: "Demonstração",
    pilot: "Piloto clínico",
  },
  introDemo:
    "Obrigado por pedir uma demonstração. Há sempre alguém da equipa a ler cada pedido, e entramos em contacto para combinar uma hora.",
  introPilot:
    "Obrigado pelo interesse num piloto. Há sempre alguém da equipa a ler cada pedido, e entramos em contacto dentro de alguns dias úteis.",
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
  waitlist: {
    subject: "Já está na lista de espera do UpSpeech",
    preheader: "O que acontece a seguir e quando terá notícias nossas.",
    eyebrow: "Lista de espera",
    intro:
      "Obrigado por se inscrever. O UpSpeech ajuda as pessoas a praticar entre sessões de terapia da fala, com o terapeuta a acompanhar. Vamos escrever-lhe quando abrir e, até lá, enviar recursos úteis.",
    cardTitle: "A sua inscrição",
    steps: [
      {
        title: "Novidades enquanto construímos",
        detail:
          "No que estamos a trabalhar, e quando houver algo novo para experimentar.",
      },
      {
        title: "Leituras úteis",
        detail: "Conteúdos práticos sobre terapia da fala, de vez em quando.",
      },
      {
        title: "Quando abrir",
        detail: "É dos primeiros a saber, com indicações para começar.",
      },
    ],
    footerNote:
      "Recebe este email porque se inscreveu na lista de espera em upspeech.app.",
  },
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
  greetingFallback: "Hola",
  labelName: "Nombre",
  labelRole: "Te apuntaste como",
  labelRequest: "Solicitud",
  labelClinicSize: "Terapeutas participantes",
  notSpecified: "Sin especificar",
  profiles: {
    therapist: "Logopeda o clínica",
    patient: "En logopedia",
    caregiver: "Madre, padre o cuidador",
    referrer: "Amigo o simpatizante",
  },
  clinicSizes: {
    solo: "Consulta individual",
    small: "2-5 terapeutas",
    medium: "6-15 terapeutas",
    large: "15+ terapeutas",
  },
  requests: {
    waitlist: "Lista de espera",
    early: "Acceso anticipado",
    demo: "Demo",
    pilot: "Piloto clínico",
  },
  introDemo:
    "Gracias por pedir una demo. Alguien del equipo lee todas las solicitudes y te escribirá para buscar una hora.",
  introPilot:
    "Gracias por tu interés en un piloto. Alguien del equipo lee todas las solicitudes y te escribirá en unos pocos días laborables.",
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
  waitlist: {
    subject: "Ya estás en la lista de espera de UpSpeech",
    preheader: "Lo que pasa ahora y cuándo sabrás de nosotros.",
    eyebrow: "Lista de espera",
    intro:
      "Gracias por apuntarte. UpSpeech ayuda a practicar entre sesiones de logopedia, con tu logopeda al tanto. Te escribiremos cuando abra y, mientras tanto, te enviaremos recursos útiles.",
    cardTitle: "Tu inscripción",
    steps: [
      {
        title: "Novedades mientras construimos",
        detail:
          "En qué estamos trabajando, y cuando haya algo nuevo que probar.",
      },
      {
        title: "Lecturas útiles",
        detail: "Contenidos prácticos sobre logopedia, de vez en cuando.",
      },
      {
        title: "Cuando abra",
        detail: "Serás de los primeros en saberlo, con cómo empezar.",
      },
    ],
    footerNote:
      "Recibes este correo porque te apuntaste a la lista de espera en upspeech.app.",
  },
};

const COPY: Record<EmailLocale, ApplicantCopy> = { en, pt, es };

export const applicantCopy = (locale: EmailLocale): ApplicantCopy =>
  COPY[locale];

/*
 * The form posts stable slugs ("therapist", "small"), not the labels the
 * visitor saw, so both emails and the spreadsheet would otherwise show raw
 * slugs. An unrecognised value falls through to the submitted string rather
 * than being dropped, which keeps a hand-crafted post or a newly added option
 * visible instead of silently blank.
 */
export const profileLabel = (locale: EmailLocale, key: string): string =>
  COPY[locale].profiles[key] ?? key;

export const requestLabel = (locale: EmailLocale, request: string): string => {
  const r = COPY[locale].requests;
  return request in r ? r[request as keyof typeof r] : request;
};

export const clinicSizeLabel = (locale: EmailLocale, key: string): string =>
  key ? (COPY[locale].clinicSizes[key] ?? key) : "";

/** "Hi Vasco," as one string, for the plain-text part and the <title>. */
export const greetingText = (copy: ApplicantCopy, name: string): string =>
  name ? `${copy.greetingPrefix} ${name},` : `${copy.greetingFallback},`;
