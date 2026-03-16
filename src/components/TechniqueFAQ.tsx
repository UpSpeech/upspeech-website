import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { getTechniqueFAQs } from "@/lib/technique-faqs";

const TITLES: Record<string, string> = {
  en: "Frequently Asked Questions",
  pt: "Perguntas Frequentes",
  es: "Preguntas Frecuentes",
};

interface TechniqueFAQProps {
  slug: string;
  locale?: string;
}

export function TechniqueFAQ({ slug, locale = "en" }: TechniqueFAQProps) {
  const faqs = getTechniqueFAQs(slug, locale);
  if (!faqs?.length) return null;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {TITLES[locale] || TITLES.en}
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-gray-100">
              <span className="font-medium text-gray-900">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}
