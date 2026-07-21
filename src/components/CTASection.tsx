import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { trackFormSubmit } from "@/lib/analytics";
import { useT } from "@/i18n";

const CTASection = () => {
  const t = useT().home.cta;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    clinicSize: "",
    company: "", // honeypot: must stay empty for real users
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    role?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.role) {
      setFieldErrors({
        name: formData.name ? undefined : t.nameError,
        email: formData.email ? undefined : t.emailError,
        role: formData.role ? undefined : t.roleError,
      });
      toast({
        title: t.requiredFieldsTitle,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    setFieldErrors({});

    try {
      // Same-origin POST to the Netlify function, which sends the team
      // notification and the applicant auto-reply through Resend.
      const response = await fetch("/.netlify/functions/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        trackFormSubmit("waitlist_form", true);
        // Reset form first (so user knows submission was successful)
        setFormData({
          name: "",
          email: "",
          role: "",
          clinicSize: "",
          company: "",
        });

        toast({
          title: t.successTitle,
          description: t.successDescription,
        });
      } else {
        const errorText = await response.text();
        console.error("Early-access submission error:", errorText);
        throw new Error(`Form submission failed: ${response.status}`);
      }
    } catch (error) {
      // The catch owns all failure tracking (covers both the thrown non-2xx
      // above and network errors), so it fires exactly once per failure.
      trackFormSubmit("waitlist_form", false);
      console.error("Submission error:", error);

      let errorMessage = t.errorDefault;
      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          errorMessage = t.errorNetwork;
        } else if (error.message.includes("Form submission failed")) {
          errorMessage = t.errorSubmission;
        }
      }

      toast({
        title: t.errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="cta"
      className="px-[max(1.5rem,5vw)] py-[clamp(5rem,10vw,10rem)] bg-mesh-calm relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-calm-charcoal/10 rounded-full blur-2xl" />
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-calm-navy/10 rounded-full blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-calm-lavender/15 rounded-full blur-xl"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
        <h2
          className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-6 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {t.headline}
        </h2>
        <p
          className="font-body text-lg sm:text-xl text-calm-charcoal/70 mb-12 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          {t.body}
        </p>

        <div
          className="bg-white rounded-2xl shadow-card-hover border border-calm-light p-8 max-w-md mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot: hidden from people, tempting to bots. If filled, the
                Netlify function silently drops the submission. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
            <div className="text-left">
              <Label
                htmlFor="name"
                className="font-body text-sm font-semibold text-calm-charcoal"
              >
                {t.nameLabel}
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (fieldErrors.name)
                    setFieldErrors({ ...fieldErrors, name: undefined });
                }}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                className="mt-1 font-body rounded-xl border-2 border-calm-charcoal/10 hover:border-calm-charcoal/20 focus:border-calm-lavender focus:ring-4 focus:ring-primary-100 placeholder:text-calm-charcoal/80 transition-colors duration-200"
                placeholder={t.namePlaceholder}
                required
              />
              {fieldErrors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div className="text-left">
              <Label
                htmlFor="email"
                className="font-body text-sm font-semibold text-calm-charcoal"
              >
                {t.emailLabel}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (fieldErrors.email)
                    setFieldErrors({ ...fieldErrors, email: undefined });
                }}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className="mt-1 font-body rounded-xl border-2 border-calm-charcoal/10 hover:border-calm-charcoal/20 focus:border-calm-lavender focus:ring-4 focus:ring-primary-100 placeholder:text-calm-charcoal/80 transition-colors duration-200"
                placeholder={t.emailPlaceholder}
                required
              />
              {fieldErrors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="text-left">
              <Label
                htmlFor="role"
                className="font-body text-sm font-semibold text-calm-charcoal"
              >
                {t.roleLabel}
              </Label>
              <Select
                onValueChange={(value) => {
                  setFormData({ ...formData, role: value });
                  if (fieldErrors.role)
                    setFieldErrors({ ...fieldErrors, role: undefined });
                }}
              >
                <SelectTrigger
                  aria-label={t.rolePlaceholder}
                  aria-invalid={!!fieldErrors.role}
                  aria-describedby={fieldErrors.role ? "role-error" : undefined}
                  className="mt-1 font-body rounded-xl border-2 border-calm-charcoal/10 hover:border-calm-charcoal/20 focus:border-calm-lavender focus:ring-4 focus:ring-primary-100 data-[placeholder]:text-calm-charcoal/80 transition-colors duration-200"
                >
                  <SelectValue placeholder={t.rolePlaceholder} />
                </SelectTrigger>
                <SelectContent className="border-calm-charcoal/10 bg-white rounded-xl">
                  <SelectItem
                    value="speech-therapist"
                    className="focus:bg-calm-navy/5"
                  >
                    {t.roleSpeechTherapist}
                  </SelectItem>
                  <SelectItem
                    value="clinic-director"
                    className="focus:bg-calm-navy/5"
                  >
                    {t.roleClinicDirector}
                  </SelectItem>
                  <SelectItem
                    value="practice-owner"
                    className="focus:bg-calm-navy/5"
                  >
                    {t.rolePracticeOwner}
                  </SelectItem>
                  <SelectItem value="other" className="focus:bg-calm-navy/5">
                    {t.roleOther}
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldErrors.role && (
                <p
                  id="role-error"
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  {fieldErrors.role}
                </p>
              )}
            </div>

            <div className="text-left">
              <Label
                htmlFor="clinic-size"
                className="font-body text-sm font-semibold text-calm-charcoal"
              >
                {t.clinicSizeLabel}
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, clinicSize: value })
                }
              >
                <SelectTrigger
                  aria-label={t.clinicSizePlaceholder}
                  className="mt-1 font-body rounded-xl border-2 border-calm-charcoal/10 hover:border-calm-charcoal/20 focus:border-calm-lavender focus:ring-4 focus:ring-primary-100 data-[placeholder]:text-calm-charcoal/80 transition-colors duration-200"
                >
                  <SelectValue placeholder={t.clinicSizePlaceholder} />
                </SelectTrigger>
                <SelectContent className="border-calm-charcoal/10 bg-white rounded-xl">
                  <SelectItem value="solo" className="focus:bg-calm-navy/5">
                    {t.clinicSizeSolo}
                  </SelectItem>
                  <SelectItem value="small" className="focus:bg-calm-navy/5">
                    {t.clinicSizeSmall}
                  </SelectItem>
                  <SelectItem value="medium" className="focus:bg-calm-navy/5">
                    {t.clinicSizeMedium}
                  </SelectItem>
                  <SelectItem value="large" className="focus:bg-calm-navy/5">
                    {t.clinicSizeLarge}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-body font-bold py-3 text-lg rounded-full transition-all duration-300 hover:shadow-button-hover hover:scale-105 hover:-translate-y-0.5 mt-6 shadow-button disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? t.submitting : t.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
