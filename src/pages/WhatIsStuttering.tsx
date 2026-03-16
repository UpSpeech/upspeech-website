import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { getWhatIsStutteringStructuredData } from "@/lib/seo-data";

marked.setOptions({
  gfm: true,
  breaks: true,
});

const SEO_DATA: Record<string, { title: string; description: string }> = {
  en: {
    title: "What Is Stuttering? Types, Causes & Treatment",
    description:
      "A comprehensive guide to understanding stuttering — its types, causes, prevalence, and evidence-based treatment approaches used in speech therapy.",
  },
  pt: {
    title: "O Que É a Gaguez? Tipos, Causas e Tratamento",
    description:
      "Um guia completo para entender a gaguez — os seus tipos, causas, prevalência e abordagens de tratamento baseadas em evidências na terapia da fala.",
  },
  es: {
    title: "¿Qué Es la Tartamudez? Tipos, Causas y Tratamiento",
    description:
      "Una guía completa para entender la tartamudez — sus tipos, causas, prevalencia y enfoques de tratamiento basados en evidencia en logopedia.",
  },
};

const BACK_LINKS: Record<string, string> = {
  en: "Browse Speech Therapy Techniques",
  pt: "Ver Técnicas de Terapia da Fala",
  es: "Ver Técnicas de Logopedia",
};

export default function WhatIsStuttering() {
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocale = (): string => {
    const urlLocale = searchParams.get("lang");
    if (urlLocale && ["en", "pt", "es"].includes(urlLocale)) {
      return urlLocale;
    }
    const browserLang = navigator.language.split("-")[0];
    if (["en", "pt", "es"].includes(browserLang)) {
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
    const suffix = locale === "en" ? "" : `-${locale}`;
    fetch(`/content/what-is-stuttering${suffix}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load content");
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
        console.error("Error loading content:", err);
        setError("Failed to load content. Please try again later.");
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, [locale]);

  const seo = SEO_DATA[locale] || SEO_DATA.en;
  const structuredData = getWhatIsStutteringStructuredData();

  const languageSwitcher = (
    <div className="flex justify-end mb-6 gap-2">
      {(["en", "pt", "es"] as const).map((lang) => (
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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <SEO
          title={seo.title}
          description={seo.description}
          path="/what-is-stuttering"
          type="article"
          structuredData={structuredData}
        />
        <Header />
        <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {languageSwitcher}
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                Error Loading Content
              </h2>
              <p className="text-red-600">{error}</p>
              <a
                href="/"
                className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                &larr; Back to Home
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/what-is-stuttering"
        type="article"
        structuredData={structuredData}
      />
      <Header />

      <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {languageSwitcher}

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8 sm:px-10 sm:py-12">
              <div
                className="legal-document max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href={`/techniques${locale !== "en" ? `?lang=${locale}` : ""}`}
              className="text-blue-600 hover:underline font-medium"
            >
              &larr; {BACK_LINKS[locale] || BACK_LINKS.en}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
