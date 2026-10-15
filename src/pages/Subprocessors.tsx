import { useEffect, useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { SEO } from "@/components/SEO";
import { useLocale } from "@/i18n";
import enMd from "../../public/legal/subprocessors.md?raw";
import ptMd from "../../public/legal/subprocessors-pt.md?raw";
import esMd from "../../public/legal/subprocessors-es.md?raw";

marked.setOptions({
  gfm: true,
  breaks: true,
});

// Bundled at build time for the reason CookiePolicy.tsx gives.
const MARKDOWN: Record<string, string> = {
  en: enMd,
  pt: ptMd,
  es: esMd,
};

const SEO_DATA: Record<string, { title: string; description: string }> = {
  en: {
    title: "Subprocessors",
    description:
      "The companies that process personal data for UpSpeech, what each one receives and where it processes it.",
  },
  pt: {
    title: "Subcontratantes",
    description:
      "As empresas que tratam dados pessoais para a UpSpeech, o que cada uma recebe e onde os trata.",
  },
  es: {
    title: "Subencargados",
    description:
      "Las empresas que tratan datos personales para UpSpeech, qué recibe cada una y dónde los trata.",
  },
};

export default function Subprocessors() {
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
    <div className="bg-calm-light">
      <SEO
        title={seo.title}
        description={seo.description}
        path="/subprocessors"
        locale={locale}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-calm-navy/10 shadow-[0_30px_80px_-30px_rgba(41,53,135,0.18)] overflow-hidden">
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
