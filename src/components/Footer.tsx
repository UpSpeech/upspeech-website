import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-calm-lavender/10 rounded-full blur-xl animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-calm-light/10 rounded-full blur-lg animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center animate-fade-in-up">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start space-y-2">
            <img
              src="/images/logo-invert.svg"
              alt="UpSpeech"
              className="h-12 w-auto mb-2 transition-transform duration-300 hover:scale-105"
            />
            <p className="font-body text-sm text-white/80">
              Guiding voices with care and tech
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
            <a
              href="/privacy"
              className="hover:underline font-body text-sm text-white/80 hover:text-white transition-all duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:underline font-body text-sm text-white/80 hover:text-white transition-all duration-200"
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="hover:underline font-body text-sm text-white/80 hover:text-white transition-all duration-200"
            >
              Cookie Policy
            </a>
            <a
              href="https://www.linkedin.com/company/upspeech/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-body text-sm text-white/80 hover:text-white transition-all duration-200"
            >
              LinkedIn
            </a>
            <a
              href="mailto:upspeechapp@gmail.com"
              className="hover:underline font-body text-sm text-white/80 hover:text-white transition-all duration-200"
            >
              Contact us
            </a>
          </div>
        </div>

        <div
          className="border-t border-white/20 mt-8 pt-8 text-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="font-body text-sm text-white/60">
            © 2025 UpSpeech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
