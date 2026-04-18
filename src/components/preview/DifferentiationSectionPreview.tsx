const DifferentiationSectionPreview = () => {
  return (
    <section
      id="differentiation"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-calm-light/50 via-white to-calm-lavender/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-calm-navy/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-calm-charcoal/10 rounded-full blur-xl" />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-calm-lavender/15 rounded-full blur-lg" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-calm-charcoal mb-6 animate-fade-in">
              We're not replacing therapists.
              <br />
              <span className="text-calm-lavender text-4xl sm:text-5xl">
                We're giving them the infrastructure.
              </span>
            </h2>
            <p className="font-body text-xl text-calm-charcoal/80">
              The old model stops at the clinic door. UpSpeech continues the
              care every day of the week — powered by a clinical engine built
              with the people who deliver it.
            </p>
          </div>
          <div className="relative">
            <img
              src="/images/hero-bg-2.1.webp"
              alt="Two happy people after a therapy session"
              className="rounded-2xl shadow-xl w-full object-cover h-[350px] object-center md:object-right"
              width="640"
              height="350"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-calm-lavender/10 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSectionPreview;
