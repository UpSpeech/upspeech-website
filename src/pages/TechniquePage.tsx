import React from "react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface TechniquePageProps {
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  practicalDescription?: React.ReactNode;
  objective?: React.ReactNode;
  instructions?: React.ReactNode;
}

export function TechniquePage({
  title,
  slug,
  category,
  subcategory,
  practicalDescription,
  objective,
  instructions,
}: TechniquePageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600">
              {category
                .replace(/_/g, " ")
                .replace(/\b\w/g, l => l.toUpperCase())}
              {subcategory &&
                ` > ${subcategory
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, l => l.toUpperCase())}`}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Practical Description Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Practical Description
              </h2>
              <div className="text-gray-700 prose prose-lg max-w-none">
                {practicalDescription || (
                  <p className="text-gray-500 italic">
                    Content coming soon... We'll add detailed information about
                    this technique shortly.
                  </p>
                )}
              </div>
            </Card>

            {/* Objective Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Objective
              </h2>
              <div className="text-gray-700 prose prose-lg max-w-none">
                {objective || (
                  <p className="text-gray-500 italic">
                    Content coming soon... We'll add the objectives for this
                    technique shortly.
                  </p>
                )}
              </div>
            </Card>

            {/* Instructions Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How to Practice
              </h2>
              <div className="text-gray-700 prose prose-lg max-w-none">
                {instructions || (
                  <p className="text-gray-500 italic">
                    Content coming soon... We'll add step-by-step instructions
                    for this technique shortly.
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Ready to practice this technique?
            </p>
            <a
              href="https://app.upspeech.com"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Practicing
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
