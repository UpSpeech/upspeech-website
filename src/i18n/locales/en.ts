// English is the source dictionary. Its shape defines the `Dictionary` type, so
// pt.ts and es.ts fail typechecking if they miss a key. British spelling in copy
// (practise, organised, behaviour).
export const en = {
  nav: {
    howItWorks: "How it works",
    features: "Features",
    whyUs: "Why Us",
    techniques: "Techniques",
    forPatients: "For patients",
    forSlps: "For SLPs",
    requestAccess: "Request early access",
    skipToContent: "Skip to content",
    logoScrollTop: "UpSpeech, scroll to top",
    logoGoHome: "UpSpeech, go to homepage",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileMenuLabel: "Navigation",
  },
  footer: {
    tagline: "Guiding voices with care and tech",
    product: "Product",
    legal: "Legal",
    company: "Company",
    forPatients: "For patients",
    forSlps: "For SLPs",
    techniques: "Techniques",
    support: "Support",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy",
    linkedin: "LinkedIn",
    contact: "Contact us",
    rights: "All rights reserved.",
    appStoreAlt: "Download on the App Store",
    appStoreAriaLabel: "Download UpSpeech on the App Store",
    playStoreAlt: "Get it on Google Play",
    playStoreAriaLabel: "Get UpSpeech on Google Play",
  },
  localeSwitcher: {
    label: "Language",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  techniquesIndex: {
    title: "Speech Therapy Techniques",
    subtitle: "Explore established techniques for stuttering therapy",
    seoDescription:
      "Browse established speech therapy techniques for stuttering, including fluency shaping, stuttering modification, and cognitive approaches.",
    featured: "Featured",
    mainCategories: "Technique Categories",
    standalone: "Standalone Techniques",
    viewDetails: "View Details",
    techniques: "techniques",
    loading: "Loading techniques...",
    error: "Error Loading Techniques",
    tryAgain: "Failed to load techniques. Please try again later.",
  },
  techniquePage: {
    loading: "Loading technique...",
    error: "Error Loading Technique",
    notFound: "Technique not found",
    backToAll: "Back to all techniques",
    practicalDescription: "Practical Description",
    objective: "Objective",
    howToPractice: "How to Practice",
    relatedTechniques: "Related Techniques",
  },
  home: {
    seoDescription:
      "Continuous support for stuttering therapy. Structured between-session practice, AI-drafted session reports. Therapists always in the loop.",
    hero: {
      eyebrow: "For clinics with stuttering services",
      headlineLine1: "The clinic",
      headlineLine2: "that's open",
      headlineLine3: "when you're not.",
      body: "Structured practice between sessions. Session reports drafted automatically. Therapists keep the final say.",
      requestAccess: "Request early access",
      seeHowItWorks: "See how it works",
      videoAriaLabel:
        "UpSpeech product demo: a therapist assigns a personalised plan, the patient practises at home, the therapist follows progress on a dashboard, records a session, the report is drafted, and clinicians annotate the recording",
      posterAlt:
        "UpSpeech product demo: a therapist's personalised practice plan",
      playAriaLabel: "Play the UpSpeech product demo",
    },
    credibility: {
      eyebrow: "Partners & recognition",
    },
    gap: {
      eyebrow: "The patient's week",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      headlineToday: "A patient's week, as it is today.",
      headlineWithPrefix: "A patient's week,",
      headlineWithBrand: "with UpSpeech.",
      traditional: "Traditional",
      traditionalCadence: "1 session · 6 days without support",
      withUpspeech: "With UpSpeech",
      fullCadence: "1 session · Every day, continuous care",
      partialPrefix: "1 session · ",
      partialSuffix: " / 7 days of continuous care",
      session: "Session",
      practice: "Practice",
      plusPractice: "+ Practice",
      footerPrefix: "Continuous support for the patient,",
      footerEmphasis: "without more work for the clinician.",
    },
    therapist: {
      eyebrow: "In the room",
      headlineLine1: "The session belongs to the clinician.",
      headlineLine2: "The platform handles the rest.",
      body: "Reports drafted automatically from each session. Patient activity visible outside the appointment. Therapists arrive prepared, with the context they need.",
      imageAlt:
        "UpSpeech therapist view of a patient's progress: activity stats, learning path milestone, and current step",
      points: [
        {
          label: "Session prep",
          copy: "Walk into the appointment knowing what the patient practised since the last visit.",
        },
        {
          label: "Reports, drafted",
          copy: "Session data becomes a structured draft report for the therapist to review and approve.",
        },
        {
          label: "Therapist sign-off",
          copy: "Every report and treatment plan is a draft until the therapist reviews and signs it.",
        },
      ],
    },
    patient: {
      eyebrow: "Outside the room",
      headlineLine1: "Structured practice between visits,",
      headlineLine2: "guided by the therapist throughout.",
      body: "Each patient receives a plan from their clinician, with exercises matched to their stage of treatment. Guided exercises support practice between visits.",
      imageAlt:
        "UpSpeech patient dashboard with daily practice exercises and progress",
      points: [
        {
          label: "A plan, set by the therapist",
          copy: "Each step is selected by the clinician. Patients see only what they should practise.",
        },
        {
          label: "Every attempt, captured",
          copy: "Each practice attempt is recorded and organised for the therapist to review and adjust.",
        },
        {
          label: "Progress, recorded",
          copy: "Streaks and progress over time keep patients engaged. The therapist sees the activity behind them.",
        },
      ],
    },
    mobile: {
      eyebrow: "In the patient's pocket",
      headline: "The practice happens in the app, between sessions.",
      body: "Patients follow the plan their therapist set, practise with guided exercises, and check in from their phone. Their therapist follows along.",
      screenshots: [
        "UpSpeech mobile app learning path showing the steps the therapist set",
        "UpSpeech mobile app practice screen with guided stuttering exercises",
        "UpSpeech mobile app home screen showing the patient's exercise for the day",
      ],
    },
    cycle: {
      eyebrow: "The loop",
      headlinePrefix: "Every step",
      headlineEmphasis: "reviewed by a clinician.",
      clinician: "Clinician",
      ai: "AI",
      clinicianStepPrefix: "Clinician · step ",
      aiStepPrefix: "AI · step ",
      stepPrefix: "Step ",
      stepSuffix: " / 06",
      nodes: [
        {
          verb: "drafts",
          title: "AI drafts the session report.",
          body: "Session recording and notes turn into a structured draft.",
        },
        {
          verb: "approves",
          title: "The clinician reads, edits, approves.",
          body: "Nothing leaves the platform without therapist review. Corrections feed back into the model and improve the next draft.",
        },
        {
          verb: "structures",
          title: "AI structures the practice plan.",
          body: "Based on session data and the patient's stage, UpSpeech proposes daily exercises for the therapist to approve.",
        },
        {
          verb: "calibrates",
          title: "The clinician calibrates it.",
          body: "The therapist approves, adjusts difficulty, and swaps techniques. No plan is assigned without therapist review.",
        },
        {
          verb: "listens",
          title: "AI helps between sessions.",
          body: "Each practice attempt is captured and organised, building a record of activity between sessions.",
        },
        {
          verb: "decides",
          title: "The clinician decides what's next.",
          body: "Aggregated signal appears on the therapist's dashboard. They select the next protocol with the data at hand.",
        },
      ],
    },
    interstitial: {
      headlineLine1: "Continuous support,",
      headlineLine2: "starting with your clinic.",
      requestAccess: "Request early access",
    },
    gallery: {
      eyebrow: "Inside the platform",
      headlineLine1: "Specific tools.",
      headlineLine2: "For clinicians and researchers.",
      intro:
        "The platform is built around a structured learning path, from identifying stuttering moments through to real-world generalisation.",
      forClinicians: "For clinicians",
      forResearchers: "For researchers",
      annotationEyebrow: "Annotation tool",
      annotationTitle:
        "The tool clinicians and researchers use to label stuttering moments.",
      annotationCopy:
        "Frame-by-frame tagging of stuttering moments: core behaviour, secondary behaviours, tension level. Standard taxonomy. The same tool builds our dataset and supports research partnerships.",
      annotationImageAlt:
        "UpSpeech annotation tool with audio waveform, video review, and frame-by-frame tagging by speech-language pathologists",
      features: [
        {
          label: "Structured learning path",
          title: "A plan built from milestones and steps.",
          copy: "The clinician assembles each patient's path from established techniques, then unlocks each step as the patient is ready.",
          imageAlt:
            "UpSpeech learning path showing a patient's therapy milestones and steps with completion status",
        },
        {
          label: "Practice scenarios",
          title: "Rehearsal with a virtual conversation partner.",
          copy: "Patients rehearse difficult conversations with a virtual counterpart. The clinician sets the scenario and difficulty.",
          imageAlt:
            "UpSpeech practice scenario interface showing a job interview rehearsal with objectives and video call",
        },
        {
          label: "Self-report check-ins",
          title: "Self-reports the therapist reviews.",
          copy: "A short stuttering self-report is captured at intervals, so the therapist can review how the patient describes their experience across therapy.",
          imageAlt:
            "UpSpeech chart of a patient's self-reported stuttering responses over several weeks",
        },
      ],
    },
    engine: {
      eyebrow: "UpSpeech Labs",
      headlineLine1: "Trained on",
      headlineLine2: "clinician-annotated data.",
      body: "We built an annotation tool in-house, used by practising speech-language pathologists to tag disfluencies, tensions, and blocks frame by frame. The dataset is expert-labelled from the start.",
      videoAriaLabel:
        "UpSpeech annotation tool used by clinicians to tag disfluencies frame by frame",
      tags: [
        "Block",
        "Prolongation",
        "Repetition",
        "Tension",
        "Side glance",
        "Holding",
      ],
    },
    foundations: {
      eyebrow: "Foundations",
      headlineLine1: "Clinical practice and AI engineering,",
      headlineLine2: "in the same team.",
      body: "Clinicians and engineers work side by side. Product decisions are reviewed by the practising speech-language pathologists who use the platform with patients.",
      partnersLabel: "Partners · Backers · Recognition",
      partnersTagline: "Building alongside the people who know the work.",
      partnerContext: {
        speechcare: "Co-development partner",
        elevenlabs: "AI infrastructure grant",
        lispolis: "Acceleration program",
        unicorn: "Most Promising Startup · Lisboa",
        innocatalyst: "Health innovation programme",
        healthqup: "Health acceleration programme",
      },
    },
    security: {
      eyebrow: "Security and data",
      headline: "Patient data, handled with care.",
      body: "Clinics trust us with sensitive recordings. We treat that data the way a clinic would, and a therapist always has the final say on what the AI produces.",
      points: [
        {
          title: "Per-organisation isolation",
          copy: "Every clinic's data is kept separate by organisation. One organisation can never see another's patients or recordings.",
        },
        {
          title: "Encrypted in transit and at rest",
          copy: "Data travels over TLS, and recordings and databases are encrypted while stored.",
        },
        {
          title: "Hosted in the EU",
          copy: "Our servers and file storage are in the European Union, and we handle personal data under the GDPR.",
        },
        {
          title: "Private recordings",
          copy: "Recordings are reached through short-lived, signed links, never from a public location.",
        },
      ],
      readPrivacy: "Read our Privacy Policy",
    },
    cta: {
      headline: "Request early access.",
      body: "We're working with a cohort of clinics and would like to hear from others working in stuttering. Tell us about your practice and we'll be in touch.",
      nameLabel: "Full Name *",
      namePlaceholder: "Enter your name",
      nameError: "Please enter your name.",
      emailLabel: "Email Address *",
      emailPlaceholder: "your@email.com",
      emailError: "Please enter your email address.",
      roleLabel: "Role *",
      rolePlaceholder: "Choose your role",
      roleError: "Please choose your role.",
      roleSpeechTherapist: "Speech Therapist",
      roleClinicDirector: "Clinic Director",
      rolePracticeOwner: "Practice Owner",
      roleOther: "Other",
      clinicSizeLabel: "Clinic Size (Optional)",
      clinicSizePlaceholder: "Choose clinic size",
      clinicSizeSolo: "Solo Practice",
      clinicSizeSmall: "2-5 Therapists",
      clinicSizeMedium: "6-15 Therapists",
      clinicSizeLarge: "15+ Therapists",
      submit: "Request early access",
      submitting: "Submitting...",
      requiredFieldsTitle: "Please fill in all required fields",
      successTitle: "You're on the list.",
      successDescription:
        "Thanks, we'll be in touch. Check your email for a confirmation.",
      errorTitle: "Something went wrong",
      errorDefault: "Please try again later.",
      errorNetwork:
        "Network error. Please check your connection and try again.",
      errorSubmission:
        "There was an issue with the form submission. Please try again.",
    },
  },
  forPatients: {
    seoTitle: "For Patients",
    seoDescription:
      "How patients practise speech therapy between sessions with UpSpeech, guided by their speech-language pathologist.",
    intro: {
      eyebrow: "For patients",
      headlineLine1: "Your practice,",
      headlineLine2: "between sessions.",
      body: "UpSpeech is how you keep practising the work you do with your speech therapist, every day, not just in the appointment. Your therapist sets the plan; you practise in the app; they follow your progress.",
    },
    howItWorks: {
      eyebrow: "How it works for you",
      headline: "Guided by your therapist, every step.",
      steps: [
        {
          title: "Your therapist sets your plan",
          copy: "Your speech-language pathologist chooses the exercises and goals that match your therapy and your stage of treatment.",
        },
        {
          title: "You practise in the app",
          copy: "Work through the guided exercises between sessions, at your own pace, from your phone. You see only what your therapist has assigned.",
        },
        {
          title: "Your therapist sees your progress",
          copy: "They follow what you have practised and adjust the plan as you go, so each session builds on the last.",
        },
      ],
    },
    app: {
      eyebrow: "The app",
      headline: "Your plan, in your pocket.",
      body: "Open the app to see today's exercise, work through it, and keep a steady routine between sessions.",
      screenshots: [
        "UpSpeech mobile app home screen showing the patient's exercise for the day",
        "UpSpeech mobile app learning path showing the steps the therapist set",
        "UpSpeech mobile app practice screen with guided stuttering exercises",
      ],
    },
    faq: {
      eyebrow: "Questions",
      headline: "Common questions from patients.",
      items: [
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
      ],
    },
    closing: {
      headline: "Ask your speech therapist about UpSpeech.",
      bodyPrefix:
        "UpSpeech works through your clinic. If you run a practice and want to use it with your patients, you can ",
      bodyLink: "request access here",
      bodySuffix: ".",
    },
    storeAppStoreAlt: "Download on the App Store",
    storeAppStoreAriaLabel: "Download UpSpeech on the App Store",
    storePlayAlt: "Get it on Google Play",
    storePlayAriaLabel: "Get UpSpeech on Google Play",
  },
  forSlps: {
    seoTitle: "For speech-language pathologists",
    seoDescription:
      "UpSpeech helps SLPs spend less time writing stuttering-therapy session notes and gives patients structured practice between sessions, with progress you can see.",
    intro: {
      eyebrow: "For speech-language pathologists",
      headlineLine1: "Less time on notes.",
      headlineLine2: "More therapy between sessions.",
      body: "UpSpeech drafts your session notes for you to review, and gives your patients guided practice they actually do between appointments, so you walk into the next session already knowing how the week went.",
    },
    documentation: {
      eyebrow: "Documentation",
      headline: "Session notes, drafted for you to review.",
      body: "After a session, UpSpeech turns it into a structured draft report. You review, edit, and sign off. You keep clinical judgement; you just stop starting from a blank page.",
    },
    betweenSessions: {
      eyebrow: "Between sessions",
      headline: "Assign practice. See what happened.",
      steps: [
        {
          title: "You set the plan",
          copy: "Choose the techniques and exercises each patient works on, built around your therapy goals.",
        },
        {
          title: "They practise in the app",
          copy: "A few calm minutes a day of guided practice, on the technique you set.",
        },
        {
          title: "You see the progress",
          copy: "Streaks, technique scores, and trends come back to you, so the next session starts further ahead.",
        },
      ],
    },
    stutterPositive: {
      eyebrow: "Our approach",
      headline: "Stutter-positive by design.",
      body: "The goal in the app is confidence and being heard, not sounding a certain way. Practice is encouraging, never corrective in a way that shames.",
    },
    faq: {
      eyebrow: "Questions from clinicians",
      headline: "Common questions from SLPs.",
      items: [
        {
          q: "Does UpSpeech write my reports for me?",
          a: "It drafts a structured report from the session for you to review and edit. You stay the clinician of record; it removes the blank-page work.",
        },
        {
          q: "What do my patients actually do?",
          a: "They practise the techniques you assign, in short daily sessions, and their progress comes back to you between appointments.",
        },
        {
          q: "Is it a replacement for therapy?",
          a: "No. UpSpeech works through your clinic and is used alongside your sessions, not instead of them.",
        },
      ],
    },
    closing: {
      headline: "Bring UpSpeech into your practice.",
      bodyPrefix: "UpSpeech works through your clinic. ",
      bodyLink: "Request access here",
      bodySuffix: ".",
    },
  },
};

export type Dictionary = typeof en;
