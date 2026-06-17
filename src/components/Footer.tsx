import React from "react";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";

// Operator: fill with the live store listing URL once each app is public,
// or leave "" to keep the badge hidden.
const APP_STORE_URL = "";
const PLAY_STORE_URL = "";

const linkClass =
  "font-body text-sm text-white/90 hover:text-white hover:underline transition-all duration-200";

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-calm-lavender/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-calm-light/10 rounded-full blur-lg" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)] animate-fade-in-up">
          <div className="flex flex-col items-center md:items-start space-y-3">
            <img
              src="/images/logo-invert.svg"
              alt="UpSpeech"
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
              width="164"
              height="48"
              loading="lazy"
            />
            <p className="font-body text-sm text-white/80">
              Guiding voices with care and tech
            </p>
            {(APP_STORE_URL || PLAY_STORE_URL) && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {APP_STORE_URL && (
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download UpSpeech on the App Store"
                  >
                    <img
                      src="/images/app-store.png"
                      alt="Download on the App Store"
                      className="h-10 w-auto"
                      loading="lazy"
                    />
                  </a>
                )}
                {PLAY_STORE_URL && (
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get UpSpeech on Google Play"
                  >
                    <img
                      src="/images/google-play.png"
                      alt="Get it on Google Play"
                      className="h-10 w-auto"
                      loading="lazy"
                    />
                  </a>
                )}
              </div>
            )}
          </div>

          <nav
            aria-label="Product"
            className="flex flex-col items-center md:items-start gap-3"
          >
            <h2 className="font-body text-xs font-semibold uppercase tracking-wider text-white/60">
              Product
            </h2>
            <a href="/techniques" className={linkClass}>
              Techniques
            </a>
            <a href="/support" className={linkClass}>
              Support
            </a>
          </nav>

          <nav
            aria-label="Legal"
            className="flex flex-col items-center md:items-start gap-3"
          >
            <h2 className="font-body text-xs font-semibold uppercase tracking-wider text-white/60">
              Legal
            </h2>
            <a href="/privacy" className={linkClass}>
              Privacy Policy
            </a>
            <a href="/terms" className={linkClass}>
              Terms of Service
            </a>
            <a href="/cookies" className={linkClass}>
              Cookie Policy
            </a>
          </nav>

          <nav
            aria-label="Company"
            className="flex flex-col items-center md:items-start gap-3"
          >
            <h2 className="font-body text-xs font-semibold uppercase tracking-wider text-white/60">
              Company
            </h2>
            <a
              href="https://www.linkedin.com/company/upspeech/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
            <a href="mailto:hello@upspeech.app" className={linkClass}>
              Contact us
            </a>
          </nav>
        </div>

        <MedicalDisclaimer
          variant="compact"
          className="mt-10 max-w-3xl text-white/70"
        />

        {/* Supported By Section */}
        {/* <div
          className="border-t border-white/20 mt-8 pt-8 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex flex-col items-center space-y-3">
            <p className="font-body text-xs text-white/50 uppercase tracking-wider">
              Supported by
            </p>
            <a
              href="https://elevenlabs.io/startup-grants"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity duration-200"
            >
              <img
                src="/images/elevenlabs-grants-white.webp"
                alt="ElevenLabs Grants"
                className="h-4 w-auto"
                width="120"
                height="16"
                loading="lazy"
              />
            </a>
          </div>
        </div> */}

        {/* Copyright */}
        <div
          className="mt-6 text-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="font-body text-sm text-white/60">
            © {new Date().getFullYear()} UpSpeech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
