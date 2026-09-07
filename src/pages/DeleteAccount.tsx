import { useEffect, useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { SEO } from "@/components/SEO";
import { useLocale } from "@/i18n";
import enMd from "../../public/legal/delete-account.md?raw";
import ptMd from "../../public/legal/delete-account-pt.md?raw";
import esMd from "../../public/legal/delete-account-es.md?raw";

// The markdown is bundled at build time rather than fetched. main.tsx mounts
// with createRoot, which discards the prerendered DOM and re-renders from
// scratch, so a page starting in a loading state paints its prerendered content,
// collapses to a spinner, then refills. Measured on /privacy, which is built the
// same way, that moved the footer up 220px and scored 0.73 CLS.

// Configure marked for GFM (GitHub Flavored Markdown) support
marked.setOptions({
  gfm: true,
  breaks: true,
});

const MARKDOWN: Record<string, string> = {
  en: enMd,
  pt: ptMd,
  es: esMd,
};

const SEO_DATA: Record<string, { title: string; description: string }> = {
  en: {
    title: "Delete Your Account or Data",
    description:
      "How to delete your UpSpeech account or specific data, and what happens to your information when you do.",
  },
  pt: {
    title: "Eliminar a sua conta ou os seus dados",
    description:
      "Como eliminar a sua conta UpSpeech ou dados específicos, e o que acontece às suas informações quando o faz.",
  },
  es: {
    title: "Eliminar su cuenta o sus datos",
    description:
      "Cómo eliminar su cuenta de UpSpeech o datos concretos, y qué ocurre con su información cuando lo hace.",
  },
};

export default function DeleteAccount() {
  const locale = useLocale();
  const content = useMemo(() => {
    const md = MARKDOWN[locale] || MARKDOWN.en;
    return DOMPurify.sanitize(marked.parse(md) as string);
  }, [locale]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locale]);

  const seo = SEO_DATA[locale] || SEO_DATA.en;

  return (
    <div className="bg-white">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/delete-account"
        locale={locale}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <div
              className="legal-document prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
