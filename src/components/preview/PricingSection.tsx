import { CheckIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface Tier {
  name: string;
  audience: string;
  price: React.ReactNode;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

const tiers: Tier[] = [
  {
    name: "Starter",
    audience: "1 Therapist",
    price: (
      <>
        <span className="font-heading text-4xl font-bold text-calm-charcoal">
          Free
        </span>
        <span className="font-body text-base text-calm-charcoal/60 ml-1">
          during pilot
        </span>
        <span className="font-body text-sm text-calm-charcoal/40 line-through ml-2">
          then €49/mo
        </span>
      </>
    ),
    features: [
      "Up to 10 active patients",
      "AI-generated session reports",
      "Patient learning paths",
      "Exercise library",
      "Basic analytics",
    ],
    cta: "Start Free Pilot",
  },
  {
    name: "Clinic",
    audience: "3-20 Therapists",
    highlighted: true,
    badge: "Most Popular",
    price: (
      <>
        <span className="font-heading text-4xl font-bold text-white">Free</span>
        <span className="font-body text-base text-white/70 ml-1">
          during pilot
        </span>
        <span className="font-body text-sm text-white/50 line-through ml-2">
          then €39/therapist/mo
        </span>
      </>
    ),
    features: [
      "Everything in Starter",
      "Unlimited active patients",
      "Advanced analytics & dashboards",
      "Custom exercise creation",
      "Priority support",
      "Multi-therapist management",
    ],
    cta: "Start Free Pilot",
  },
  {
    name: "Enterprise",
    audience: "20+ Therapists",
    price: (
      <span className="font-heading text-4xl font-bold text-calm-charcoal">
        Custom
      </span>
    ),
    features: [
      "Everything in Clinic",
      "Dedicated account manager",
      "Custom integrations (EMR/EHR)",
      "Clinical advisory access",
      "SLA & compliance support",
      "White-label options",
    ],
    cta: "Contact Us",
  },
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-calm-light/30 to-calm-lavender/10 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-calm-navy/10 rounded-full blur-2xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-calm-charcoal/10 rounded-full blur-xl animate-float-delayed"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-16 h-16 bg-calm-lavender/15 rounded-full blur-lg animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-6 animate-fade-in">
            Simple, Transparent Pricing
          </h2>
          <p className="font-body text-xl text-calm-charcoal/80 max-w-2xl mx-auto animate-fade-in">
            Start with a free pilot. Scale when you're ready.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                tier.highlighted
                  ? "bg-gradient-to-br from-calm-navy to-calm-lavender text-white shadow-xl scale-[1.03]"
                  : "bg-white/90 backdrop-blur-sm border border-calm-light shadow-card hover:shadow-card-hover"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="font-body text-xs font-bold uppercase tracking-wider bg-white text-calm-navy px-4 py-1.5 rounded-full shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier Name & Audience */}
              <div className="mb-6">
                <h3
                  className={`font-heading font-bold text-2xl mb-1 ${
                    tier.highlighted ? "text-white" : "text-calm-charcoal"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`font-body text-sm ${
                    tier.highlighted ? "text-white/70" : "text-calm-charcoal/60"
                  }`}
                >
                  {tier.audience}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 flex flex-wrap items-baseline">
                {tier.price}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        tier.highlighted ? "text-white/90" : "text-calm-lavender"
                      }`}
                    />
                    <span
                      className={`font-body text-sm ${
                        tier.highlighted
                          ? "text-white/90"
                          : "text-calm-charcoal/80"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full rounded-full font-body font-bold py-3 text-base transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${
                  tier.highlighted
                    ? "bg-white text-calm-navy hover:bg-white/90 shadow-md"
                    : "bg-transparent border-2 border-calm-navy text-calm-navy hover:bg-calm-navy hover:text-white"
                }`}
                size="lg"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center font-body text-sm text-calm-charcoal/60 mt-12 animate-fade-in">
          All plans include a 3-month free pilot period. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
