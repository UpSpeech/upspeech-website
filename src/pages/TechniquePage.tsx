import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { fetchTechnique, type Technique } from "@/lib/api";
import { TECHNIQUE_SEO, getTechniqueStructuredData } from "@/lib/seo-data";

interface TechniquePageProps {
  slug: string;
}

export function TechniquePage({ slug }: TechniquePageProps) {
  const [searchParams] = useSearchParams();
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get locale from URL param or browser language (fallback to 'en')
  const getLocale = (): string => {
    const urlLocale = searchParams.get("lang");
    if (urlLocale && ["en", "pt", "es"].includes(urlLocale)) {
      return urlLocale;
    }

    // Try to detect browser language
    const browserLang = navigator.language.split("-")[0];
    if (["en", "pt", "es"].includes(browserLang)) {
      return browserLang;
    }

    return "en";
  };

  const [locale, setLocale] = useState(getLocale());

  useEffect(() => {
    const loadTechnique = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTechnique(slug, locale);
        setTechnique(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load technique",
        );
        console.error("Error loading technique:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTechnique();
  }, [slug, locale]);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    // Update URL without page reload
    const newParams = new URLSearchParams(searchParams);
    newParams.set("lang", newLocale);
    window.history.replaceState({}, "", `?${newParams.toString()}`);
  };

  const staticSeo = TECHNIQUE_SEO[slug];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        {staticSeo && (
          <SEO
            title={staticSeo.title}
            description={staticSeo.description}
            path={`/techniques/${slug}`}
          />
        )}
        <Header />
        <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading technique...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !technique) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                Error Loading Technique
              </h2>
              <p className="text-red-600">{error || "Technique not found"}</p>
              <a
                href="/techniques"
                className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to all techniques
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format instructions: convert \n to line breaks and create numbered list
  const formatInstructions = (text: string) => {
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ));
  };

  const seoTitle = technique.name;
  const seoDescription =
    technique.description ||
    staticSeo?.description ||
    `Learn about ${technique.name} — a speech therapy technique for stuttering.`;
  const structuredData = getTechniqueStructuredData(
    slug,
    technique.name,
    seoDescription,
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/techniques/${slug}`}
        structuredData={structuredData}
      />
      <Header />

      <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Language Switcher */}
          <div className="flex justify-end mb-6 gap-2">
            <button
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                locale === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage("pt")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                locale === "pt"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Português
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                locale === "es"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Español
            </button>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {technique.name}
            </h1>
            {technique.parent_technique && (
              <p className="text-lg text-gray-600">
                {technique.parent_technique.name} › {technique.name}
              </p>
            )}
            {technique.description && (
              <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
                {technique.description}
              </p>
            )}
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Practical Description Section */}
            {technique.practical_description && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {locale === "pt"
                    ? "Descrição Prática"
                    : locale === "es"
                      ? "Descripción Práctica"
                      : "Practical Description"}
                </h2>
                <div className="text-gray-700 prose prose-lg max-w-none">
                  <p>{technique.practical_description}</p>
                </div>
              </Card>
            )}

            {/* Objective Section */}
            {technique.objective && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {locale === "pt"
                    ? "Objetivo"
                    : locale === "es"
                      ? "Objetivo"
                      : "Objective"}
                </h2>
                <div className="text-gray-700 prose prose-lg max-w-none">
                  <p>{technique.objective}</p>
                </div>
              </Card>
            )}

            {/* Instructions Section */}
            {technique.instructions && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {locale === "pt"
                    ? "Como Praticar"
                    : locale === "es"
                      ? "Cómo Practicar"
                      : "How to Practice"}
                </h2>
                <div className="text-gray-700 prose prose-lg max-w-none">
                  {formatInstructions(technique.instructions)}
                </div>
              </Card>
            )}

            {/* Sub-techniques (if this is a main category) */}
            {technique.sub_techniques &&
              technique.sub_techniques.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {locale === "pt"
                      ? "Técnicas Relacionadas"
                      : locale === "es"
                        ? "Técnicas Relacionadas"
                        : "Related Techniques"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {technique.sub_techniques.map((subTech) => (
                      <a
                        key={subTech.slug}
                        href={`/techniques/${subTech.slug}?lang=${locale}`}
                        className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {subTech.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {subTech.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </Card>
              )}
          </div>

          {/* Call to Action */}
          {/* <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {locale === "pt"
                ? "Pronto para praticar esta técnica?"
                : locale === "es"
                  ? "¿Listo para practicar esta técnica?"
                  : "Ready to practice this technique?"}
            </p>
            <a
              href="https://app.upspeech.com"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {locale === "pt"
                ? "Começar a Praticar"
                : locale === "es"
                  ? "Empezar a Practicar"
                  : "Start Practicing"}
            </a>
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
