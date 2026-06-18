import {
  ClipboardDocumentCheckIcon,
  DevicePhoneMobileIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";

// Operator: fill with the live store listing URL once each app is public,
// or leave "" to keep the badge hidden.
const APP_STORE_URL = "";
const PLAY_STORE_URL = "";

const STEPS = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: "Your therapist sets your plan",
    copy: "Your speech-language pathologist chooses the exercises and goals that match your therapy and your stage of treatment.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "You practise in the app",
    copy: "Work through the guided exercises between sessions, at your own pace, from your phone. You see only what your therapist has assigned.",
  },
  {
    icon: ArrowTrendingUpIcon,
    title: "Your therapist sees your progress",
    copy: "They follow what you have practised and adjust the plan as you go, so each session builds on the last.",
  },
];

const SCREENSHOTS = [
  {
    src: "/screenshots/mobile/patient-home.webp",
    alt: "UpSpeech mobile app home screen showing the patient's exercise for the day",
  },
  {
    src: "/screenshots/mobile/patient-journey.webp",
    alt: "UpSpeech mobile app learning path showing the steps the therapist set",
  },
  {
    src: "/screenshots/mobile/patient-practice.webp",
    alt: "UpSpeech mobile app practice screen with guided stuttering exercises",
  },
];

// Plain-text FAQ, reused for both the rendered list and the FAQPage schema.
const FAQ = [
  {
    q: "Do I need a speech therapist to use UpSpeech?",
    a: "Yes. UpSpeech is used together with a speech-language pathologist who sets your plan and reviews your progress. It is not a replacement for therapy.",
  },
  {
    q: "What will I practise?",
    a: "Your therapist chooses exercises for you based on your goals and your stage of therapy. You will see only what they have assigned.",
  },
  {
    q: "How often should I practise?",
    a: "Your therapist guides how often to practise. The app makes it easy to keep a steady routine between sessions.",
  },
  {
    q: "Is my information private?",
    a: "Yes. Your data is encrypted and kept private to your care. See the Privacy Policy for details.",
  },
  {
    q: "How do I get UpSpeech?",
    a: "Ask your speech therapist whether they use UpSpeech. Clinics request access through this site.",
  },
];

const FORCLIENTS_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const eyebrowClass =
  "font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender";

export default function ForClients() {
  return (
    <div className="min-h-screen font-body bg-white">
      <SEO
        title="For Clients"
        description="How clients practice speech therapy between sessions with UpSpeech, guided by their speech-language pathologist."
        path="/for-clients"
        structuredData={FORCLIENTS_FAQ_SCHEMA}
      />
      <Header />

      <main id="main">
        {/* Intro */}
        <section className="px-[max(1.5rem,5vw)] pt-28 pb-[clamp(3rem,7vw,6rem)] sm:pt-36">
          <div className="max-w-3xl mx-auto">
            <p className={eyebrowClass}>For clients</p>
            <h1
              className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 4rem)",
                lineHeight: 1.05,
              }}
            >
              Your practice,
              <br />
              <span className="text-calm-lavender">between sessions.</span>
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg text-calm-charcoal/70 leading-relaxed">
              UpSpeech is how you keep practising the work you do with your
              speech therapist, every day, not just in the appointment. Your
              therapist sets the plan; you practise in the app; they follow your
              progress.
            </p>
          </div>
        </section>

        {/* How it works for you */}
        <section className="px-[max(1.5rem,5vw)] py-[clamp(3rem,6vw,5rem)]">
          <div className="max-w-6xl mx-auto">
            <p className={eyebrowClass}>How it works for you</p>
            <h2
              className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight max-w-2xl"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              Guided by your therapist, every step.
            </h2>

            <div className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-8 sm:gap-10 md:grid-cols-3">
              {STEPS.map((step) => (
                <div key={step.title}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-calm-lavender/15 text-calm-navy">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight text-lg sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The app */}
        <section className="bg-calm-light px-[max(1.5rem,5vw)] py-[clamp(3.5rem,7vw,6rem)]">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <p className={eyebrowClass}>The app</p>
              <h2
                className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                }}
              >
                Your plan, in your pocket.
              </h2>
              <p className="mt-5 max-w-xl font-body text-base sm:text-lg text-calm-charcoal/70 leading-relaxed">
                Open the app to see today's exercise, work through it, and keep
                a steady routine between sessions.
              </p>
            </div>

            <div className="mt-10 flex gap-6 overflow-x-auto pb-4 sm:gap-8 lg:overflow-visible">
              {SCREENSHOTS.map((screenshot) => (
                <img
                  key={screenshot.src}
                  src={screenshot.src}
                  alt={screenshot.alt}
                  loading="lazy"
                  width={660}
                  height={1434}
                  className="h-auto w-auto max-h-[480px] shrink-0"
                />
              ))}
            </div>

            {(APP_STORE_URL || PLAY_STORE_URL) && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
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
                      className="h-11 w-auto"
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
                      className="h-11 w-auto"
                      loading="lazy"
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-[max(1.5rem,5vw)] py-[clamp(3.5rem,7vw,6rem)]">
          <div className="max-w-3xl mx-auto">
            <p className={eyebrowClass}>Questions</p>
            <h2
              className="mt-4 font-heading font-bold text-calm-charcoal tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              Common questions from clients.
            </h2>

            <dl className="mt-8 divide-y divide-calm-charcoal/10">
              {FAQ.map((item) => (
                <div key={item.q} className="py-5">
                  <dt className="font-heading font-bold text-calm-charcoal text-base sm:text-lg">
                    {item.q}
                  </dt>
                  <dd className="mt-2 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>

            <MedicalDisclaimer className="mt-8" />
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-[max(1.5rem,5vw)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="max-w-3xl mx-auto rounded-2xl border border-calm-navy/10 bg-calm-light/60 px-7 py-10 sm:px-10 sm:py-12 text-center">
            <h2
              className="font-heading font-bold text-calm-charcoal tracking-tight"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                lineHeight: 1.1,
              }}
            >
              Ask your speech therapist about UpSpeech.
            </h2>
            <p className="mt-4 font-body text-sm sm:text-base text-calm-charcoal/70 leading-relaxed">
              UpSpeech works through your clinic. If you run a practice and want
              to use it with your patients, you can{" "}
              <a
                href="/#cta"
                className="font-semibold text-calm-navy hover:underline"
              >
                request access here
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
