import React from "react";

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-secondary mb-6">
            Built With—and For—Speech Therapists
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-body font-bold text-lg">
                  SM
                </span>
              </div>
              <div>
                <blockquote className="font-body text-lg text-secondary mb-4 italic">
                  "UpSpeech keeps my adult patients engaged between sessions.
                  It's like having a co-therapist."
                </blockquote>
                <div>
                  <div className="font-body font-semibold text-secondary">
                    Sara Mendes
                  </div>
                  <div className="font-body text-sm text-secondary/70">
                    Speech Therapist, Clínica Voz+
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-body font-bold text-lg">
                  CB
                </span>
              </div>
              <div>
                <blockquote className="font-body text-lg text-secondary mb-4 italic">
                  "We saw higher carry-over and less regression within 2 weeks
                  of trying UpSpeech."
                </blockquote>
                <div>
                  <div className="font-body font-semibold text-secondary">
                    Carlos Brandão
                  </div>
                  <div className="font-body text-sm text-secondary/70">
                    Clinic Director
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="text-center animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <h3 className="font-heading font-semibold text-xl text-secondary mb-6">
            Trusted by Healthcare Professionals
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-100">
              <span className="font-body font-semibold text-sm text-secondary">
                HIPAA Compliant
              </span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-100">
              <span className="font-body font-semibold text-sm text-secondary">
                GDPR Compliant
              </span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-100">
              <span className="font-body font-semibold text-sm text-secondary">
                ISO 27001 Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
