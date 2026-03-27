import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { SEO } from "@/components/SEO";

marked.setOptions({
  gfm: true,
  breaks: true,
});

const SUPPORTED_LOCALES = ["en", "pt", "es"];

const SEO_DATA: Record<string, { title: string; description: string }> = {
  en: {
    title: "Terms of Service",
    description:
      "UpSpeech terms of service — the rules and guidelines governing your use of our AI-powered speech therapy platform.",
  },
  pt: {
    title: "Termos de Serviço",
    description:
      "Termos de serviço da UpSpeech — as regras e diretrizes que regem a utilização da nossa plataforma de terapia da fala com IA.",
  },
  es: {
    title: "Términos de Servicio",
    description:
      "Términos de servicio de UpSpeech — las normas y directrices que rigen el uso de nuestra plataforma de logopedia con IA.",
  },
};

const BACK_LINKS: Record<string, string> = {
  en: "Back to Home",
  pt: "Voltar à Página Inicial",
  es: "Volver a la Página Principal",
};

const LOADING_TEXT: Record<string, string> = {
  en: "Loading Terms of Service...",
  pt: "A carregar os Termos de Serviço...",
  es: "Cargando los Términos de Servicio...",
};

const ERROR_TEXT: Record<string, string> = {
  en: "Failed to load terms of service. Please try again later.",
  pt: "Não foi possível carregar os termos de serviço. Por favor, tente novamente mais tarde.",
  es: "No se han podido cargar los términos de servicio. Por favor, inténtelo de nuevo más tarde.",
};

const RELOAD_TEXT: Record<string, string> = {
  en: "Reload Page",
  pt: "Recarregar Página",
  es: "Recargar Página",
};

export default function TermsOfService() {
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocale = (): string => {
    const urlLocale = searchParams.get("lang");
    if (urlLocale && SUPPORTED_LOCALES.includes(urlLocale)) {
      return urlLocale;
    }
    const browserLang = navigator.language.split("-")[0];
    if (SUPPORTED_LOCALES.includes(browserLang)) {
      return browserLang;
    }
    return "en";
  };

  const [locale, setLocale] = useState(getLocale());

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("lang", newLocale);
    window.history.replaceState({}, "", `?${newParams.toString()}`);
  };

  useEffect(() => {
    setLoading(true);
    const suffix = locale === "en" ? "" : `-${locale}`;
    fetch(`/legal/terms-of-service${suffix}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load terms of service");
        }
        return response.text();
      })
      .then((text) => {
        const html = marked.parse(text) as string;
        const sanitized = DOMPurify.sanitize(html);
        setContent(sanitized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading terms of service:", err);
        setError(ERROR_TEXT[locale] || ERROR_TEXT.en);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [locale]);

  const seo = SEO_DATA[locale] || SEO_DATA.en;

  const languageSwitcher = (
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
          {lang === "en" ? "English" : lang === "pt" ? "Português" : "Español"}
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {languageSwitcher}
          <div className="text-lg text-gray-600 text-center">
            {LOADING_TEXT[locale] || LOADING_TEXT.en}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {languageSwitcher}
          <div className="text-center max-w-md mx-auto">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              {RELOAD_TEXT[locale] || RELOAD_TEXT.en}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/terms"
        locale={locale}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {languageSwitcher}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <div
              className="legal-document prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-indigo-600 hover:underline">
            &larr; {BACK_LINKS[locale] || BACK_LINKS.en}
          </a>
        </div>
      </div>
    </div>
  );
}
