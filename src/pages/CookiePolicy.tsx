import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

marked.setOptions({
  gfm: true,
  breaks: true,
});

export default function CookiePolicy() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/legal/cookie-policy.md")
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
        setError("Failed to load cookie policy. Please try again later.");
        setLoading(false);
      });

    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading Cookie Policy...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <div
              className="legal-document prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-indigo-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
