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
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, EmailTemplateParams } from "@/lib/emailjs";
import { trackFormSubmit } from "@/lib/analytics";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    clinicSize: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  React.useEffect(() => {
    // Initialize EmailJS with public key
    if (
      EMAILJS_CONFIG.PUBLIC_KEY &&
      EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
    ) {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    } else {
      console.warn(
        "EmailJS public key not configured or using default placeholder",
      );
    }
  }, []);

  const sendAutoReplyEmail = async (userData: typeof formData) => {
    try {
      // Validate EmailJS configuration
      if (
        !EMAILJS_CONFIG.SERVICE_ID ||
        EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID"
      ) {
        throw new Error("EmailJS Service ID not configured");
      }
      if (
        !EMAILJS_CONFIG.TEMPLATE_ID ||
        EMAILJS_CONFIG.TEMPLATE_ID === "YOUR_TEMPLATE_ID"
      ) {
        throw new Error("EmailJS Template ID not configured");
      }
      if (
        !EMAILJS_CONFIG.PUBLIC_KEY ||
        EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY"
      ) {
        throw new Error("EmailJS Public Key not configured");
      }

      const templateParams: EmailTemplateParams = {
        to_name: userData.name,
        to_email: userData.email,
        user_role: userData.role,
        clinic_size: userData.clinicSize || "Not specified",
        linkedin_url: "https://www.linkedin.com/company/upspeech/",
        logo_url: "https://upspeech.app/images/logo.svg",
        referral_link: "https://upspeech.app",
        reply_to: "upspeechapp@gmail.com",
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY,
      );
    } catch (error) {
      console.error("Failed to send auto-reply email:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to Formspree for your records
      const formspreeResponse = await fetch("https://formspree.io/f/mpwrpely", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (formspreeResponse.ok) {
        trackFormSubmit("waitlist_form", true);
        // Reset form first (so user knows submission was successful)
        setFormData({
          name: "",
          email: "",
          role: "",
          clinicSize: "",
        });

        // Try to send auto-reply email via EmailJS
        // This is non-blocking, so if it fails, the user still gets registered
        await sendAutoReplyEmail(formData);

        toast({
          title: "Welcome to the UpSpeech waitlist!",
          description:
            "You've been successfully registered. Check your email for a confirmation message.",
        });
      } else {
        trackFormSubmit("waitlist_form", false);
        const errorText = await formspreeResponse.text();
        console.error("Formspree error:", errorText);
        throw new Error(`Form submission failed: ${formspreeResponse.status}`);
      }
    } catch (error) {
      trackFormSubmit("waitlist_form", false);
      console.error("Submission error:", error);

      let errorMessage = "Please try again later.";
      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else if (error.message.includes("Form submission failed")) {
          errorMessage =
            "There was an issue with the form submission. Please try again.";
        }
      }

      toast({
        title: "Something went wrong",
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-mesh-calm relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-calm-charcoal/10 rounded-full blur-2xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-calm-navy/10 rounded-full blur-3xl animate-float-delayed"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-calm-lavender/15 rounded-full blur-xl animate-float-slow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
        <h2
          className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-6 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Join us before we launch!
        </h2>
        <p
          className="font-body text-xl text-calm-charcoal/80 mb-12 max-w-3xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Join forward-thinking speech therapy clinics already revolutionizing
          their practice with AI-powered continuous care solutions.
        </p>

        <div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-card-hover border border-calm-light p-8 max-w-md mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <h3 className="font-heading font-bold text-xl text-calm-charcoal mb-6">
            Request Early Access to UpSpeech
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <Label
                htmlFor="name"
                className="font-body text-sm font-semibold text-calm-charcoal"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 font-body rounded-xl border-2 border-calm-charcoal/10 hover:border-calm-charcoal/20 focus:border-calm-lavender focus:ring-4 focus:ring-primary-100 placeholder:text-calm-charcoal/30 transition-colors duration-200"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="text-left">
              <Label
                htmlFor="email"
                className="font-body text-sm font-semibold text-calm-charcoal"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 font-body rounded-xl border-2 border-calm-charcoal/10 hover:border-calm-charcoal/20 focus:border-calm-lavender focus:ring-4 focus:ring-primary-100 placeholder:text-calm-charcoal/30 transition-colors duration-200"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="text-left">
              <Label
                htmlFor="role"
                className="font-body text-sm font-semibold text-calm-charcoal"
              >
                Role *
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger className="mt-1 font-body rounded-xl border-2 border-calm-charcoal/10 hover:border-calm-charcoal/20 focus:border-calm-lavender focus:ring-4 focus:ring-primary-100 data-[placeholder]:text-calm-charcoal/30 transition-colors duration-200">
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent className="border-calm-charcoal/10 bg-white/90 backdrop-blur-sm rounded-xl">
                  <SelectItem
                    value="speech-therapist"
                    className="focus:bg-calm-navy/5"
                  >
                    Speech Therapist
                  </SelectItem>
                  <SelectItem
                    value="clinic-director"
                    className="focus:bg-calm-navy/5"
                  >
                    Clinic Director
                  </SelectItem>
                  <SelectItem
                    value="practice-owner"
                    className="focus:bg-calm-navy/5"
                  >
                    Practice Owner
                  </SelectItem>
                  <SelectItem value="other" className="focus:bg-calm-navy/5">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-left">
              <Label
                htmlFor="clinic-size"
                className="font-body text-sm font-semibold text-calm-charcoal"
              >
                Clinic Size (Optional)
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, clinicSize: value })
                }
              >
                <SelectTrigger className="mt-1 font-body rounded-xl border-2 border-calm-charcoal/10 hover:border-calm-charcoal/20 focus:border-calm-lavender focus:ring-4 focus:ring-primary-100 data-[placeholder]:text-calm-charcoal/30 transition-colors duration-200">
                  <SelectValue placeholder="Choose clinic size" />
                </SelectTrigger>
                <SelectContent className="border-calm-charcoal/10 bg-white/90 backdrop-blur-sm rounded-xl">
                  <SelectItem value="solo" className="focus:bg-calm-navy/5">
                    Solo Practice
                  </SelectItem>
                  <SelectItem value="small" className="focus:bg-calm-navy/5">
                    2-5 Therapists
                  </SelectItem>
                  <SelectItem value="medium" className="focus:bg-calm-navy/5">
                    6-15 Therapists
                  </SelectItem>
                  <SelectItem value="large" className="focus:bg-calm-navy/5">
                    15+ Therapists
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-body font-bold py-3 text-lg rounded-full transition-all duration-300 hover:shadow-button-hover hover:scale-105 hover:-translate-y-0.5 mt-6 shadow-button disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Joining Waitlist..." : "Join the Waitlist"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
