import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { SEO } from "@/components/SEO";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { useLocale, localizedPath } from "@/i18n";

marked.setOptions({
  gfm: true,
  breaks: true,
});

const SEO_DATA: Record<string, { title: string; description: string }> = {
  en: {
    title: "Cookie Policy",
    description:
      "UpSpeech cookie policy, how we use cookies and similar technologies on our AI-powered speech therapy platform.",
  },
  pt: {
    title: "Política de Cookies",
    description:
      "Política de cookies da UpSpeech, como utilizamos cookies e tecnologias semelhantes na nossa plataforma de terapia da fala com IA.",
  },
  es: {
    title: "Política de Cookies",
    description:
      "Política de cookies de UpSpeech, cómo utilizamos cookies y tecnologías similares en nuestra plataforma de logopedia con IA.",
  },
};

const BACK_LINKS: Record<string, string> = {
  en: "Back to Home",
  pt: "Voltar à Página Inicial",
  es: "Volver a la Página Principal",
};

const LOADING_TEXT: Record<string, string> = {
  en: "Loading Cookie Policy...",
  pt: "A carregar a Política de Cookies...",
  es: "Cargando la Política de Cookies...",
};

const ERROR_TEXT: Record<string, string> = {
  en: "Failed to load cookie policy. Please try again later.",
  pt: "Não foi possível carregar a política de cookies. Por favor, tente novamente mais tarde.",
  es: "No se ha podido cargar la política de cookies. Por favor, inténtelo de nuevo más tarde.",
};

const RELOAD_TEXT: Record<string, string> = {
  en: "Reload Page",
  pt: "Recarregar Página",
  es: "Recargar Página",
};

export default function CookiePolicy() {
  const locale = useLocale();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const suffix = locale === "en" ? "" : `-${locale}`;
    fetch(`/legal/cookie-policy${suffix}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load cookie policy");
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
        console.error("Error loading cookie policy:", err);
        setError(ERROR_TEXT[locale] || ERROR_TEXT.en);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [locale]);

  const seo = SEO_DATA[locale] || SEO_DATA.en;

  const languageSwitcher = (
    <div className="flex justify-end mb-6">
      <LocaleSwitcher />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-calm-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {languageSwitcher}
          <div className="text-lg text-calm-charcoal/70 text-center font-body">
            {LOADING_TEXT[locale] || LOADING_TEXT.en}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-calm-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {languageSwitcher}
          <div className="text-center max-w-md mx-auto">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-calm-navy text-white rounded-full hover:bg-calm-charcoal transition-colors"
            >
              {RELOAD_TEXT[locale] || RELOAD_TEXT.en}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-calm-light">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/cookies"
        locale={locale}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {languageSwitcher}
        <div className="bg-white rounded-2xl border border-calm-navy/10 shadow-[0_30px_80px_-30px_rgba(41,53,135,0.18)] overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <div
              className="legal-document prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={localizedPath("/", locale)}
            className="text-calm-navy hover:underline font-body font-medium"
          >
            &larr; {BACK_LINKS[locale] || BACK_LINKS.en}
          </a>
        </div>
      </div>
    </div>
  );
}
