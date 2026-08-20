import { useEffect, useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { SEO } from "@/components/SEO";
import { useLocale } from "@/i18n";
import deleteAccountMd from "../../public/legal/delete-account.md?raw";

// The markdown is bundled at build time rather than fetched. main.tsx mounts
// with createRoot, which discards the prerendered DOM and re-renders from
// scratch, so a page starting in a loading state paints its prerendered content,
// collapses to a spinner, then refills. Measured on /privacy, which is built the
// same way, that moved the footer up 220px and scored 0.73 CLS. This page is
// English only, so there is one file rather than a per-locale map.

// Configure marked for GFM (GitHub Flavored Markdown) support
marked.setOptions({
  gfm: true,
  breaks: true,
});

export default function DeleteAccount() {
  const locale = useLocale();
  const content = useMemo(
    () => DOMPurify.sanitize(marked.parse(deleteAccountMd) as string),
    [],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <SEO
        title="Delete Your Account or Data"
        description="How to delete your UpSpeech account or specific data, and what happens to your information when you do."
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
