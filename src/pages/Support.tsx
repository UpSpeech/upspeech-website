import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SEO } from "@/components/SEO";

const SUPPORTED_LOCALES = ["en", "pt", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const SUPPORT_EMAIL = "support@upspeech.app";

const SEO_DATA: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Support",
    description:
      "Get help with UpSpeech. Contact our team, find answers to common questions, and learn how to manage your account and data.",
  },
  pt: {
    title: "Suporte",
    description:
      "Obtenha ajuda com a UpSpeech. Contacte a nossa equipa, encontre respostas a perguntas frequentes e saiba como gerir a sua conta e os seus dados.",
  },
  es: {
    title: "Soporte",
    description:
      "Obtén ayuda con UpSpeech. Contacta con nuestro equipo, encuentra respuestas a preguntas frecuentes y aprende a gestionar tu cuenta y tus datos.",
  },
};

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

interface SupportContent {
  heading: string;
  intro: string;
  contactHeading: string;
  contactBody: string;
  emailLabel: string;
  responseTime: string;
  faqHeading: string;
  faq: FaqItem[];
  moreHeading: string;
  privacy: string;
  terms: string;
  deleteAccount: string;
  back: string;
  langLabel: Record<Locale, string>;
}

const CONTENT: Record<Locale, SupportContent> = {
  en: {
    heading: "Support",
    intro:
      "Need help with UpSpeech? We're here for you. Most questions are answered below, and you can always reach us directly by email.",
    contactHeading: "Contact us",
    contactBody:
      "Email our support team and we'll get back to you. Please include your device, operating system, and a short description of what you need help with.",
    emailLabel: "Email support",
    responseTime: "We usually reply within 1 to 2 business days.",
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "How do I get help with my account?",
        a: (
          <>
            Email us at{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-indigo-600 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            and our team will assist you.
          </>
        ),
      },
      {
        q: "I forgot my password. What do I do?",
        a: 'On the sign-in screen, choose "Forgot password" and we’ll email you a link to set a new one.',
      },
      {
        q: "Who is UpSpeech for?",
        a: "UpSpeech supports speech-language pathologists and their patients. Patients practice between sessions with structured exercises and feedback, while therapists get AI-assisted reports and progress tracking.",
      },
      {
        q: "Is my data private?",
        a: (
          <>
            Yes. Clinical data is encrypted and isolated per organization. See
            our{" "}
            <a href="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </a>{" "}
            for details.
          </>
        ),
      },
      {
        q: "How do I delete my account or data?",
        a: (
          <>
            You can request deletion at any time on our{" "}
            <a
              href="/delete-account"
              className="text-indigo-600 hover:underline"
            >
              account deletion page
            </a>
            .
          </>
        ),
      },
      {
        q: "The app isn't working as expected.",
        a: (
          <>
            Sorry about that. Email{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-indigo-600 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            with your device, operating system, and what happened, and we'll
            help you sort it out.
          </>
        ),
      },
    ],
    moreHeading: "More information",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    deleteAccount: "Delete your account or data",
    back: "Back to Home",
    langLabel: { en: "English", pt: "Português", es: "Español" },
  },
  pt: {
    heading: "Suporte",
    intro:
      "Precisa de ajuda com a UpSpeech? Estamos aqui para si. A maioria das perguntas tem resposta abaixo e pode sempre contactar-nos diretamente por email.",
    contactHeading: "Contacte-nos",
    contactBody:
      "Envie um email à nossa equipa de suporte e responderemos. Indique o seu dispositivo, o sistema operativo e uma breve descrição do que precisa.",
    emailLabel: "Contactar o suporte",
    responseTime: "Normalmente respondemos no prazo de 1 a 2 dias úteis.",
    faqHeading: "Perguntas frequentes",
    faq: [
      {
        q: "Como obtenho ajuda com a minha conta?",
        a: (
          <>
            Envie-nos um email para{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-indigo-600 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            e a nossa equipa irá ajudá-lo.
          </>
        ),
      },
      {
        q: "Esqueci-me da palavra-passe. O que faço?",
        a: 'No ecrã de início de sessão, escolha "Esqueci-me da palavra-passe" e enviaremos um email com um link para definir uma nova.',
      },
      {
        q: "Para quem é a UpSpeech?",
        a: "A UpSpeech apoia terapeutas da fala e os seus pacientes. Os pacientes praticam entre sessões com exercícios estruturados e feedback, enquanto os terapeutas obtêm relatórios assistidos por IA e acompanhamento do progresso.",
      },
      {
        q: "Os meus dados são privados?",
        a: (
          <>
            Sim. Os dados clínicos são encriptados e isolados por organização.
            Consulte a nossa{" "}
            <a href="/privacy" className="text-indigo-600 hover:underline">
              Política de Privacidade
            </a>{" "}
            para mais detalhes.
          </>
        ),
      },
      {
        q: "Como elimino a minha conta ou os meus dados?",
        a: (
          <>
            Pode solicitar a eliminação a qualquer momento na nossa{" "}
            <a
              href="/delete-account"
              className="text-indigo-600 hover:underline"
            >
              página de eliminação de conta
            </a>
            .
          </>
        ),
      },
      {
        q: "A aplicação não está a funcionar como esperado.",
        a: (
          <>
            Lamentamos. Envie um email para{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-indigo-600 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            com o seu dispositivo, o sistema operativo e o que aconteceu, e
            ajudamos a resolver.
          </>
        ),
      },
    ],
    moreHeading: "Mais informação",
    privacy: "Política de Privacidade",
    terms: "Termos de Serviço",
    deleteAccount: "Eliminar a sua conta ou dados",
    back: "Voltar à Página Inicial",
    langLabel: { en: "English", pt: "Português", es: "Español" },
  },
  es: {
    heading: "Soporte",
    intro:
      "¿Necesitas ayuda con UpSpeech? Estamos aquí para ayudarte. La mayoría de las preguntas se responden a continuación y siempre puedes contactarnos directamente por correo electrónico.",
    contactHeading: "Contáctanos",
    contactBody:
      "Escribe a nuestro equipo de soporte y te responderemos. Incluye tu dispositivo, el sistema operativo y una breve descripción de lo que necesitas.",
    emailLabel: "Contactar con soporte",
    responseTime:
      "Normalmente respondemos en un plazo de 1 a 2 días laborables.",
    faqHeading: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo obtengo ayuda con mi cuenta?",
        a: (
          <>
            Escríbenos a{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-indigo-600 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            y nuestro equipo te ayudará.
          </>
        ),
      },
      {
        q: "Olvidé mi contraseña. ¿Qué hago?",
        a: 'En la pantalla de inicio de sesión, elige "Olvidé mi contraseña" y te enviaremos un correo con un enlace para establecer una nueva.',
      },
      {
        q: "¿Para quién es UpSpeech?",
        a: "UpSpeech apoya a logopedas y a sus pacientes. Los pacientes practican entre sesiones con ejercicios estructurados y feedback, mientras que los terapeutas obtienen informes asistidos por IA y seguimiento del progreso.",
      },
      {
        q: "¿Mis datos son privados?",
        a: (
          <>
            Sí. Los datos clínicos están cifrados y aislados por organización.
            Consulta nuestra{" "}
            <a href="/privacy" className="text-indigo-600 hover:underline">
              Política de Privacidad
            </a>{" "}
            para más detalles.
          </>
        ),
      },
      {
        q: "¿Cómo elimino mi cuenta o mis datos?",
        a: (
          <>
            Puedes solicitar la eliminación en cualquier momento en nuestra{" "}
            <a
              href="/delete-account"
              className="text-indigo-600 hover:underline"
            >
              página de eliminación de cuenta
            </a>
            .
          </>
        ),
      },
      {
        q: "La aplicación no funciona como se espera.",
        a: (
          <>
            Lo sentimos. Escribe a{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-indigo-600 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            con tu dispositivo, el sistema operativo y lo que ocurrió, y te
            ayudaremos a resolverlo.
          </>
        ),
      },
    ],
    moreHeading: "Más información",
    privacy: "Política de Privacidad",
    terms: "Términos del Servicio",
    deleteAccount: "Eliminar tu cuenta o datos",
    back: "Volver a la Página Principal",
    langLabel: { en: "English", pt: "Português", es: "Español" },
  },
};

export default function Support() {
  const [searchParams] = useSearchParams();

  const getLocale = (): Locale => {
    const urlLocale = searchParams.get("lang");
    if (urlLocale && SUPPORTED_LOCALES.includes(urlLocale as Locale)) {
      return urlLocale as Locale;
    }
    const browserLang = navigator.language.split("-")[0];
    if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
      return browserLang as Locale;
    }
    return "en";
  };

  const [locale, setLocale] = useState<Locale>(getLocale());

  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("lang", newLocale);
    window.history.replaceState({}, "", `?${newParams.toString()}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locale]);

  const seo = SEO_DATA[locale];
  const c = CONTENT[locale];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/support"
        locale={locale}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end mb-6 gap-2">
          {SUPPORTED_LOCALES.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                locale === lang
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {c.langLabel[lang]}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <h1 className="text-3xl font-bold text-gray-900 font-heading">
              {c.heading}
            </h1>
            <p className="mt-4 text-gray-600 font-body">{c.intro}</p>

            {/* Contact */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-gray-900 font-heading">
                {c.contactHeading}
              </h2>
              <p className="mt-2 text-gray-600 font-body">{c.contactBody}</p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                {c.emailLabel}: {SUPPORT_EMAIL}
              </a>
              <p className="mt-3 text-sm text-gray-500 font-body">
                {c.responseTime}
              </p>
            </section>

            {/* FAQ */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-gray-900 font-heading">
                {c.faqHeading}
              </h2>
              <dl className="mt-4 divide-y divide-gray-100">
                {c.faq.map((item, i) => (
                  <div key={i} className="py-4">
                    <dt className="font-medium text-gray-900 font-body">
                      {item.q}
                    </dt>
                    <dd className="mt-1 text-gray-600 font-body">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* More info */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-gray-900 font-heading">
                {c.moreHeading}
              </h2>
              <ul className="mt-3 space-y-2 font-body">
                <li>
                  <a
                    href="/privacy"
                    className="text-indigo-600 hover:underline"
                  >
                    {c.privacy}
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-indigo-600 hover:underline">
                    {c.terms}
                  </a>
                </li>
                <li>
                  <a
                    href="/delete-account"
                    className="text-indigo-600 hover:underline"
                  >
                    {c.deleteAccount}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-indigo-600 hover:underline">
            &larr; {c.back}
          </a>
        </div>
      </div>
    </div>
  );
}
