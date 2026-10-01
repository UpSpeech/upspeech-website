import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <section className="max-w-3xl border-t border-calm-charcoal/10 pt-8">
      <h2 className="font-heading t-h3 font-bold text-calm-charcoal mb-5">
        {TITLES[locale] || TITLES.en}
      </h2>
      <Accordion
        type="single"
        collapsible
        className="divide-y divide-calm-charcoal/10 border-b border-calm-charcoal/10"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border-b-0"
          >
            <AccordionTrigger className="min-h-[44px] py-4 text-left hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40">
              <span className="font-body font-semibold text-calm-charcoal">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <p className="font-body t-lead text-calm-charcoal/80">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
