import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchTechniques, type Technique } from "@/lib/api";

export function TechniquesIndexPage() {
  const [searchParams] = useSearchParams();
  const [techniques, setTechniques] = useState<Technique[]>([]);
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
    const loadTechniques = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTechniques(locale);
        setTechniques(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load techniques"
        );
        console.error("Error loading techniques:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTechniques();
  }, [locale]);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    // Update URL without page reload
    const newParams = new URLSearchParams(searchParams);
    newParams.set("lang", newLocale);
    window.history.replaceState({}, "", `?${newParams.toString()}`);
  };

  // Group techniques by type
  const mainCategories = techniques.filter(
    t => t.category_type === "main_category"
  );
  const standalone = techniques.filter(t => t.category_type === "standalone");

  // Get translations
  const translations = {
    en: {
      title: "Speech Therapy Techniques",
      subtitle: "Explore evidence-based techniques for stuttering therapy",
      featured: "Featured",
      mainCategories: "Technique Categories",
      standalone: "Standalone Techniques",
      viewDetails: "View Details",
      techniques: "techniques",
      loading: "Loading techniques...",
      error: "Error Loading Techniques",
      tryAgain: "Failed to load techniques. Please try again later.",
    },
    pt: {
      title: "Técnicas de Terapia da Fala",
      subtitle:
        "Explore técnicas baseadas em evidências para terapia de gagueira",
      featured: "Destaque",
      mainCategories: "Categorias de Técnicas",
      standalone: "Técnicas Independentes",
      viewDetails: "Ver Detalhes",
      techniques: "técnicas",
      loading: "Carregando técnicas...",
      error: "Erro ao Carregar Técnicas",
      tryAgain:
        "Falha ao carregar técnicas. Por favor, tente novamente mais tarde.",
    },
    es: {
      title: "Técnicas de Terapia del Habla",
      subtitle:
        "Explora técnicas basadas en evidencia para la terapia de tartamudeo",
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
  };

  const t = translations[locale as keyof typeof translations];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">{t.loading}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                {t.error}
              </h2>
              <p className="text-red-600">{t.tryAgain}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Main Categories */}
          {mainCategories.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.mainCategories}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mainCategories.map(category => (
                  <Card key={category.slug} className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>

                    {/* Subcategories */}
                    {category.sub_techniques &&
                      category.sub_techniques.length > 0 && (
                        <div className="space-y-3">
                          {category.sub_techniques.map(subTech => (
                            <Link
                              key={subTech.slug}
                              to={`/techniques/${subTech.slug}?lang=${locale}`}
                              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    {subTech.name}
                                    {subTech.featured && (
                                      <span className="ml-2 text-yellow-600 text-sm">
                                        ⭐ {t.featured}
                                      </span>
                                    )}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {subTech.description}
                                  </p>
                                </div>
                                <svg
                                  className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                    {/* Show count if no subcategories displayed */}
                    {(!category.sub_techniques ||
                      category.sub_techniques.length === 0) && (
                      <p className="text-sm text-gray-500">
                        {category.mini_games_count || 0} {t.techniques}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Standalone Techniques */}
          {standalone.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.standalone}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {standalone.map(technique => (
                  <Card key={technique.slug} className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {technique.name}
                      {technique.featured && (
                        <span className="ml-2 text-yellow-600 text-sm">
                          ⭐ {t.featured}
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {technique.description}
                    </p>
                    <Link
                      to={`/techniques/${technique.slug}?lang=${locale}`}
                      className="inline-block text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {t.viewDetails} →
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {locale === "pt"
                ? "Pronto para começar a praticar?"
                : locale === "es"
                ? "¿Listo para empezar a practicar?"
                : "Ready to start practicing?"}
            </p>
            <a
              href="https://upspeech.app/join"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {locale === "pt"
                ? "Começar Agora"
                : locale === "es"
                ? "Comenzar Ahora"
                : "Get Started"}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
