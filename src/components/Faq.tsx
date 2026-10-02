import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: ReactNode;
}

export function Faq({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        "divide-y divide-calm-charcoal/10 border-b border-calm-charcoal/10",
        className,
      )}
    >
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`faq-${index}`}
          className="border-b-0"
        >
          <AccordionTrigger className="min-h-[44px] py-4 text-left hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-navy/40">
            <span className="font-body font-semibold text-calm-charcoal">
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <p className="font-body t-lead text-calm-charcoal/80">
              {item.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
