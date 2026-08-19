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
    <section className="rounded-2xl border border-calm-charcoal/10 bg-calm-light/60 p-6 sm:p-8">
      <h2 className="font-heading font-bold text-calm-charcoal tracking-tight text-xl sm:text-2xl mb-5">
        {TITLES[locale] || TITLES.en}
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="rounded-xl border border-calm-charcoal/10 bg-white/70 overflow-hidden"
          >
            <AccordionTrigger className="min-h-[44px] px-4 py-3 text-left hover:no-underline hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40">
              <span className="font-body font-semibold text-calm-charcoal">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <p className="font-body text-calm-charcoal/80 leading-relaxed">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
