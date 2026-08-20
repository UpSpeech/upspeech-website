import { useEffect, useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { SEO } from "@/components/SEO";
import { useLocale } from "@/i18n";
import enMd from "../../public/legal/cookie-policy.md?raw";
import ptMd from "../../public/legal/cookie-policy-pt.md?raw";
import esMd from "../../public/legal/cookie-policy-es.md?raw";

marked.setOptions({
  gfm: true,
  breaks: true,
});

// Bundled at build time rather than fetched at runtime. main.tsx mounts with
// createRoot, which discards the prerendered DOM and re-renders from scratch,
// so a page that starts in a loading state paints its full prerendered content,
// collapses to a spinner, then refills. Measured on /privacy, which is built
// the same way, that moved the footer up 220px and scored 0.73 CLS. Reading
// the markdown from the module graph means the first render already has it
// and nothing moves.
//
// The files stay in public/ and are still served at /legal/*.md, so anything
// linking to them directly is unaffected. These pages are React.lazy, so the
// markdown lands in their own chunks and never reaches the homepage bundle.
const MARKDOWN: Record<string, string> = {
  en: enMd,
  pt: ptMd,
  es: esMd,
};

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

export default function CookiePolicy() {
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
        path="/cookies"
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
