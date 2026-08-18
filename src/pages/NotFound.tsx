import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-body bg-white">
      <SEO title="Page Not Found" noindex />
      <Header />
      <main
        id="main"
        className="relative flex flex-1 items-center justify-center overflow-hidden px-[max(1.5rem,5vw)] pt-28 pb-20 text-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 500px at 50% 30%, rgba(152,165,254,0.12), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-calm-lavender">
            Error 404
          </p>
          <h1
            className="mt-5 font-heading font-bold text-calm-charcoal tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)", lineHeight: 1.05 }}
          >
            This page took a pause.
          </h1>
          <p className="mt-5 max-w-md mx-auto font-body text-base sm:text-lg text-calm-charcoal/70 leading-relaxed">
            The page you are looking for moved or never existed. Let's get you
            back on track.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-primary px-6 py-3 font-body font-bold text-white shadow-button transition-all duration-300 hover:bg-calm-navy hover:shadow-lg hover:-translate-y-0.5"
          >
            Back to home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
