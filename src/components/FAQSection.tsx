import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is it hard to set up?",
      answer:
        "Not at all. Our setup process is quick and straightforward, with dedicated support to help you get started in no time.",
    },
    {
      question: "Will UpSpeech replace my role as a therapist?",
      answer:
        "Never. UpSpeech enhances your impact by reinforcing your work—not replacing it. You remain in complete control of treatment plans and goals while UpSpeech provides structured practice between sessions.",
    },
    {
      question: "How do I know if patients are actually using it?",
      answer:
        "You'll get weekly reports on engagement, completion rates, and improvement markers. Real-time dashboards show exactly when and how your patients are practicing.",
    },
    {
      question: "Can I customize the exercises for my patients?",
      answer:
        "Absolutely. You can create custom exercise plans, adjust difficulty levels, and set specific goals for each patient. UpSpeech works with your existing therapy methods and protocols.",
    },
    {
      question: "How much does it cost?",
      answer:
        "We offer flexible pricing based on your clinic's size and needs. Reach out to get a personalized quote.",
    },
    {
      question: "Is it easy for my patients to use?",
      answer:
        "Absolutely. UpSpeech is designed with simplicity in mind. Patients can access it easily on any device, with a user-friendly interface suitable for all tech levels. We also provide clear guidance and support to help patients get started quickly.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-light/50 via-white to-calm-lavender/10 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-calm-navy/10 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-calm-charcoal/10 rounded-full blur-xl animate-float-delayed"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/3 w-16 h-16 bg-calm-lavender/15 rounded-full blur-lg animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2
            className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Have Questions? We've Got Answers.
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-calm-light shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-calm-lavender/5">
                <span className="font-body font-semibold text-lg text-calm-charcoal">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="font-body text-calm-charcoal/80 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
