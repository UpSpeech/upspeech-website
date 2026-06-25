import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";
import { useLocale, useT, localizedPath } from "@/i18n";

const linkClass =
  "inline-flex items-center min-h-[44px] font-body text-sm text-white/90 hover:text-white hover:underline transition-all duration-200";

const Footer = () => {
  const locale = useLocale();
  const t = useT().footer;
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
            <p className="font-body text-sm text-white/80">{t.tagline}</p>
            {(APP_STORE_URL || PLAY_STORE_URL) && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {APP_STORE_URL && (
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.appStoreAriaLabel}
                  >
                    <img
                      src="/images/app-store.png"
                      alt={t.appStoreAlt}
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
                    aria-label={t.playStoreAriaLabel}
                  >
                    <img
                      src="/images/google-play.png"
                      alt={t.playStoreAlt}
                      className="h-10 w-auto"
                      loading="lazy"
                    />
                  </a>
                )}
              </div>
            )}
          </div>

          <nav
            aria-label={t.product}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <h2 className="font-body text-xs font-semibold uppercase tracking-wider text-white/60">
              {t.product}
            </h2>
            <a
              href={localizedPath("/for-patients", locale)}
              className={linkClass}
            >
              {t.forPatients}
            </a>
            <a
              href={localizedPath("/stutter-positive", locale)}
              className={linkClass}
            >
              {t.stutterPositive}
            </a>
            <a
              href={localizedPath("/reducing-documentation-time", locale)}
              className={linkClass}
            >
              {t.reducingDocumentationTime}
            </a>
            <a href={localizedPath("/for-slps", locale)} className={linkClass}>
              {t.forSlps}
            </a>
            <a
              href={localizedPath("/techniques", locale)}
              className={linkClass}
            >
              {t.techniques}
            </a>
            <a href={localizedPath("/support", locale)} className={linkClass}>
              {t.support}
            </a>
          </nav>

          <nav
            aria-label={t.legal}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <h2 className="font-body text-xs font-semibold uppercase tracking-wider text-white/60">
              {t.legal}
            </h2>
            <a href={localizedPath("/privacy", locale)} className={linkClass}>
              {t.privacy}
            </a>
            <a href={localizedPath("/terms", locale)} className={linkClass}>
              {t.terms}
            </a>
            <a href={localizedPath("/cookies", locale)} className={linkClass}>
              {t.cookies}
            </a>
          </nav>

          <nav
            aria-label={t.company}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <h2 className="font-body text-xs font-semibold uppercase tracking-wider text-white/60">
              {t.company}
            </h2>
            <a
              href="https://www.linkedin.com/company/upspeech/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {t.linkedin}
            </a>
            <a href="mailto:hello@upspeech.app" className={linkClass}>
              {t.contact}
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
            © {new Date().getFullYear()} UpSpeech. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
