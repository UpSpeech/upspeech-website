import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { SEO } from "@/components/SEO";

// Configure marked for GFM (GitHub Flavored Markdown) support
marked.setOptions({
  gfm: true,
  breaks: true,
});

export default function DeleteAccount() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/legal/delete-account.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load page");
        }
        return response.text();
      })
      .then((text) => {
        const html = marked.parse(text) as string;
        setContent(DOMPurify.sanitize(html));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading delete account page:", err);
        setError("Failed to load this page. Please try again later.");
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-lg text-gray-600 text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-md mx-auto">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Delete Your Account or Data"
        description="How to delete your UpSpeech account or specific data, and what happens to your information when you do."
        path="/delete-account"
        locale="en"
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

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-indigo-600 hover:underline">
            &larr; Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
