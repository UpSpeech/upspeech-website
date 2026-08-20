// English is the source dictionary. Its shape defines the `Dictionary` type, so
// pt.ts and es.ts fail typechecking if they miss a key. American spelling in copy
// (practice, organized, behavior, analyze).
export const en = {
  nav: {
    howItWorks: "How it works",
    features: "Features",
    whyUs: "Why Us",
    techniques: "Techniques",
    forPatients: "For patients",
    requestAccess: "Request early access",
    skipToContent: "Skip to content",
    logoScrollTop: "UpSpeech, scroll to top",
    logoGoHome: "UpSpeech, go to homepage",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileMenuLabel: "Navigation",
  },
  footer: {
    tagline: "Support for speech and language therapy, between sessions",
    product: "Product",
    legal: "Legal",
    company: "Company",
    forPatients: "For patients",
    forSlps: "For SLPs",
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
    personCentered: "Person-centered",
    reducingDocumentationTime: "Documentation time",
  },
  localeSwitcher: {
    label: "Language",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  medicalDisclaimer:
    "UpSpeech is a practice and clinical-productivity tool for use by and with qualified speech-language pathologists. It is not a medical device and does not diagnose, treat, or cure any condition. Educational content on this site is not a substitute for professional clinical advice.",
  techniquesIndex: {
    title: "Speech Therapy Techniques",
    subtitle: "Established techniques used in speech and language therapy",
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
      "Continuous support for speech and language therapy. Patients practice between sessions on a plan their therapist set, and every attempt comes back for review.",
    hero: {
      photoAlt:
        "A woman at her kitchen table holding a phone up in front of her, speaking a practice exercise aloud in late afternoon light",
      eyebrow: "For speech and language therapy clinics",
      headlineLine1: "Your therapy",
      headlineLine2: "keeps going",
      headlineLine3: "between sessions.",
      body: "Patients practice between sessions, following a plan their therapist set. Every attempt goes back to the therapist, who decides what happens next.",
      requestAccess: "Request early access",
      seeHowItWorks: "See how it works",
      videoAriaLabel:
        "UpSpeech product demo: a therapist assigns a personalized plan, the patient practices at home, the therapist follows progress on a dashboard, records a session, and clinicians annotate the recording",
      posterAlt:
        "UpSpeech product demo: a therapist's personalized practice plan",
      playAriaLabel: "Play the UpSpeech product demo",
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
      fullCadence: "1 session · Every day, continuous support",
      partialPrefix: "1 session · ",
      partialSuffix: " / 7 days of continuous support",
      session: "Session",
      practice: "Practice",
      plusPractice: "+ Practice",
      footerPrefix: "The patient keeps their support every day,",
      footerEmphasis: "without adding sessions to the clinician's week.",
    },
    week: {
      eyebrow: "Between the sessions",
      headline: "Most of therapy happens when nobody is watching.",
      body: "One hour in the clinic, then six days on their own. The part that decides whether therapy works is the part the clinician never sees.",
      frames: [
        {
          day: "Thursday",
          caption: "The session. Everything works in the room.",
          alt: "A speech and language therapist mid-explanation with a patient listening, seated facing each other in a plain therapy room",
        },
        {
          day: "Saturday",
          caption: "Alone with the handout. No idea if it is going right.",
          alt: "A young man sitting alone at a table at home, holding a printed exercise sheet and looking uncertain",
        },
        {
          day: "Monday",
          caption: "The phone rings. He lets it ring out.",
          alt: "A young man standing in a hallway looking down at a ringing phone on a side table without picking it up",
        },
        {
          day: "Next Thursday",
          caption: "So, how did the week go? Nobody really knows.",
          alt: "A therapist asking an opening question while the patient answers with an uncertain shrug",
        },
      ],
      traceLabel: "Six days with nothing recorded",
    },
    handoff: {
      eyebrow: "Recorded at home, reviewed in the clinic",
      headline: "He recorded it on Saturday.",
      headlineEmphasis: "She watched it on Monday.",
      body: "The patient practices at home and the attempt goes straight to their therapist, who reviews it, marks what changed, and decides what comes next. The software sits between two people. It does not replace either of them.",
      screenAlt:
        "The UpSpeech recording review screen: the patient's video, a waveform with two marked moments, and the clinician's timestamped annotations",
      screenCaption: "Reviewed by the clinician, not by a model",
      patientAlt: "A young man looking down at a phone he is holding, practicing at home",
      clinicianAlt: "A speech and language therapist looking down at a recording on her phone, reviewing a patient's attempt",
    },
    therapist: {
      eyebrow: "In the room",
      headlineLine1: "The clinician runs the session.",
      headlineLine2: "UpSpeech takes it from there.",
      body: "You can see what patients practiced between appointments, and how each attempt went.",
      imageAlt:
        "UpSpeech therapist view of a patient's progress: activity stats, learning path milestone, and current step",
      points: [
        {
          label: "Session prep",
          copy: "Walk into the appointment knowing what the patient practiced since the last visit.",
        },
        {
          label: "The next plan, ready",
          copy: "Adjust the coming week's practice without building it from scratch.",
        },
        {
          label: "Therapist sign-off",
          copy: "Every report and therapy plan is a draft until the therapist reviews and signs it.",
        },
      ],
    },
    patient: {
      eyebrow: "Outside the room",
      headlineLine1: "Structured practice between visits,",
      headlineLine2: "guided by the therapist throughout.",
      body: "Each patient gets a plan from their clinician, with exercises matched to where they are in therapy, and works through it between visits with guidance at each step.",
      imageAlt:
        "UpSpeech patient dashboard with daily practice exercises and progress",
      points: [
        {
          label: "A plan, set by the therapist",
          copy: "The therapist chooses each step. Patients see only what they should practice.",
        },
        {
          label: "Every attempt, captured",
          copy: "Every attempt is recorded and organized for the therapist to review and adjust.",
        },
        {
          label: "Progress, recorded",
          copy: "Streaks and progress over time keep patients going, and the therapist sees the activity behind them.",
        },
      ],
    },
    mobile: {
      eyebrow: "In the patient's pocket",
      headline: "The practice happens in the app, between sessions.",
      body: "Patients work through the plan their therapist set from their phone, between sessions, and the therapist can see how it is going.",
      screenshots: [
        "UpSpeech mobile app learning path showing the steps the therapist set",
        "UpSpeech mobile app practice screen with guided practice exercises",
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
          body: "The session recording and notes turn into a structured draft.",
        },
        {
          verb: "approves",
          title: "The clinician edits and approves it.",
          body: "Those corrections improve the next draft. Anything used to train our models needs the patient's opt-in first.",
        },
        {
          verb: "structures",
          title: "AI structures the practice plan.",
          body: "Based on session data and the patient's stage, UpSpeech proposes daily exercises for the therapist to approve.",
        },
        {
          verb: "calibrates",
          title: "The clinician calibrates it.",
          body: "The therapist adjusts the difficulty and swaps techniques where needed. Nothing reaches a patient until the therapist reviews and signs it.",
        },
        {
          verb: "listens",
          title: "AI helps between sessions.",
          body: "Attempts are stored with the technique, the date, and how the patient rated the effort.",
        },
        {
          verb: "decides",
          title: "The clinician decides what's next.",
          body: "The dashboard pulls the week's activity together. The clinician chooses the next step from there.",
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
        "The platform is built around a structured learning path, from identifying moments of disfluency through to carrying the work into real conversations.",
      forClinicians: "For clinicians",
      forResearchers: "For researchers",
      annotationEyebrow: "Annotation tool",
      annotationTitle:
        "The tool clinicians and researchers use to label moments of disfluency.",
      annotationCopy:
        "Clinicians tag moments of disfluency frame by frame with a standard taxonomy, from core behaviors to secondary behaviors and tension level. The same tool builds our dataset and supports our research partnerships.",
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
          copy: "A short self-report is captured at intervals. The clinician can see how the patient describes their own experience over time.",
          imageAlt:
            "UpSpeech chart of a patient's self-reported responses over several weeks",
        },
      ],
    },
    engine: {
      eyebrow: "UpSpeech Labs",
      headlineLine1: "Trained on",
      headlineLine2: "clinician-annotated data.",
      body: "We built our own annotation tool, and practicing speech-language pathologists use it to tag disfluencies frame by frame.",
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
      body: "Clinicians and engineers work side by side. The speech-language pathologists who use the platform with patients review the product decisions we make.",
      logoPartnersLabel: "Partners",
      logoPartnerContext: {
        speechcare: "Co-development partner",
        elevenlabs: "AI infrastructure grant",
      },
      partnersLabel: "Programs · Backers · Recognition",
      partnersTagline: "Who we work with",
      partnerContext: {
        lispolis: "Acceleration program",
        unicorn: "Most Promising Startup · Lisboa",
        innocatalyst: "Health innovation program",
        healthqup: "Health acceleration program",
      },
    },
    security: {
      eyebrow: "Security and data",
      headline: "How patient data is handled.",
      body: "Clinics trust us with sensitive recordings. We treat that data the way a clinic would, and a therapist always has the final say on what the AI produces.",
      points: [
        {
          title: "Per-organization isolation",
          copy: "Every clinic's data is kept separate by organization. One organization can never see another's patients or recordings.",
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
          copy: "Recordings are served through short-lived, signed links, never from a public location.",
        },
        {
          title: "Improving the AI, with consent",
          copy: "Recordings are used to improve our models only where the patient has opted in. Identifying details are removed first, the recordings stay inside UpSpeech, and a patient can withdraw at any time.",
        },
      ],
      readPrivacy: "Read our Privacy Policy",
    },
    cta: {
      headline: "Request early access.",
      body: "We're working with a cohort of clinics and would like to hear from others working in speech therapy. Tell us about your practice and we'll be in touch.",
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
      "How patients practice speech therapy between sessions with UpSpeech, guided by their speech-language pathologist.",
    intro: {
      eyebrow: "For patients",
      headlineLine1: "Your practice,",
      headlineLine2: "between sessions.",
      body: "UpSpeech is how you keep practicing the work you do with your speech therapist between appointments. Your therapist sets the plan and follows how it's going while you practice in the app.",
    },
    howItWorks: {
      eyebrow: "How it works for you",
      headline: "Guided by your therapist, every step.",
      steps: [
        {
          title: "Your therapist sets your plan",
          copy: "Your speech-language pathologist chooses the exercises and goals that match where you are in your therapy.",
        },
        {
          title: "You practice in the app",
          copy: "Work through the guided exercises on your phone, at whatever pace suits you between sessions.",
        },
        {
          title: "Your therapist sees your progress",
          copy: "They follow what you have practiced and adjust the plan as you go, so each session builds on the last.",
        },
      ],
    },
    app: {
      eyebrow: "The app",
      headline: "Your plan, in your pocket.",
      body: "Open the app and the day's exercise is there waiting.",
      screenshots: [
        "UpSpeech mobile app home screen showing the patient's exercise for the day",
        "UpSpeech mobile app learning path showing the steps the therapist set",
        "UpSpeech mobile app practice screen with guided practice exercises",
      ],
    },
    faq: {
      eyebrow: "Questions",
      headline: "Common questions from patients.",
      items: [
        {
          q: "Do I need a speech therapist to use UpSpeech?",
          a: "Yes. UpSpeech is used together with your speech therapist, who sets your plan and reviews your progress. It is not a replacement for therapy.",
        },
        {
          q: "What will I practice?",
          a: "Your therapist chooses exercises for you based on your goals and your stage of therapy.",
        },
        {
          q: "How often should I practice?",
          a: "Your therapist guides how often to practice. The app makes it easy to keep a steady routine between sessions.",
        },
        {
          q: "Is my information private?",
          a: "Yes. Your data is encrypted and only visible to the people involved in your care. See the Privacy Policy for details.",
        },
        {
          q: "How do I get UpSpeech?",
          a: "Ask your speech therapist whether they use UpSpeech.",
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
  personCentered: {
    seoTitle: "What Is Person-Centered Speech Therapy?",
    seoDescription:
      "A plain-language guide to person-centered speech therapy: what it means, why fluency is not the only goal, and how UpSpeech reflects this approach.",
    intro: {
      eyebrow: "Philosophy",
      headlineLine1: "What does",
      headlineLine2: "person-centered mean?",
      body: "Person-centered therapy puts confidence and communication first, and the person helps set the goals. In stuttering therapy this is sometimes called a stutter-positive approach.",
    },
    sections: [
      {
        heading: "Fluency is not the only goal",
        body: "Traditional speech therapy sometimes treats fluency as the definition of success. Person-centered therapy broadens that picture. Where someone does want smoother speech, clinicians use fluency-shaping techniques such as prolonged speech. Where reducing avoidance matters more, they turn to voluntary stuttering and desensitization. What makes it person-centered is that the person has a real say in which of those goals apply.",
      },
      {
        heading: "Being heard on your own terms",
        body: "People who stutter often deal with more than disfluency. There is the phone call you put off and the coffee order you change because it is easier than the word you meant to say. Person-centered therapy takes that on alongside any technique practice.",
      },
      {
        heading: "How UpSpeech reflects this",
        body: "UpSpeech supports whatever approach a speech-language pathologist chooses. The clinician sets the learning path and exercises, and the app supports practice between sessions. If the goal is reduced avoidance, the therapist builds that into the plan. If the goal is voluntary stuttering practice, the app supports that too. Whether fluency belongs in the plan is for the clinician and the person to decide.",
      },
      {
        heading: "A note on language",
        body: "This page uses 'people who stutter' and 'person who stutters' throughout. Person-first language is the default here unless an individual prefers otherwise. The aim is to describe people respectfully, in the words they choose for themselves.",
      },
    ],
    faq: {
      eyebrow: "Questions",
      headline: "Common questions.",
      items: [
        {
          q: "Is person-centered therapy the same as not helping someone improve?",
          a: "No. Person-centered therapy still teaches techniques and works on avoidance. What changes is who sets the target: the person and the clinician agree what progress looks like, and fluency is not the automatic answer.",
        },
        {
          q: "Does UpSpeech only work for person-centered approaches?",
          a: "No. UpSpeech supports the plan a speech-language pathologist creates. The app delivers what the clinician assigns, which can include traditional fluency-shaping, modification techniques, or confidence-focused work.",
        },
        {
          q: "What techniques are used in person-centered stuttering therapy?",
          a: "Voluntary stuttering, identification and desensitization, and pull-out techniques (easing out of a moment of stuttering) are common. Many clinicians blend these with fluency-shaping work depending on the individual's goals.",
        },
        {
          q: "Where can I learn more?",
          a: "STAMMA (the British Stammering Association), the Stuttering Foundation, and the American Institute for Stuttering publish accessible guides on person-centered and stutter-positive approaches to stuttering therapy.",
        },
      ],
    },
    closing: {
      headline: "Work with a clinician who understands your goals.",
      bodyPrefix:
        "UpSpeech is used through speech-language pathologists. If you run a practice and want to use it with your patients, you can ",
      bodyLink: "request access here",
      bodySuffix: ".",
    },
  },
  reducingDocumentationTime: {
    seoTitle: "How SLPs Spend Less Time on Session Notes",
    seoDescription:
      "A practical guide for speech-language pathologists on reducing documentation time in speech therapy, with structured drafts that support clinical judgement.",
    intro: {
      eyebrow: "For speech-language pathologists",
      headlineLine1: "The notes start",
      headlineLine2: "already written.",
      body: "Documentation is part of good clinical practice, but it should not crowd out the time spent on the work itself. This page covers practical ways speech-language pathologists reduce the time spent on session notes in speech therapy, including where structured drafts fit in.",
    },
    sections: [
      {
        heading: "The blank-page problem",
        body: "After a session, you know what happened. Writing it down is the part that takes time, because you are starting from an empty page with the clinical thinking already done. For a full caseload that adds up, and it usually comes out of preparation time or the end of the day.",
      },
      {
        heading: "Structured drafts you review and edit",
        body: "One fix is a draft built from the session's own data, covering what the patient practiced and how they progressed. You edit what needs editing and sign it off. The clinical judgement stays yours throughout.",
      },
      {
        heading: "What belongs in a good speech therapy note",
        body: "A useful session note typically covers the technique practiced, the patient's performance against their goals, any observations about avoidance or confidence, and the next steps. Templates for these elements make drafting faster whether or not you use AI assistance.",
      },
      {
        heading: "What UpSpeech does",
        body: "UpSpeech captures structured data from practice between sessions, including which exercises the patient completed and where they had difficulty. That data feeds a draft session note. Nothing reaches a patient until the therapist reviews and signs it.",
      },
    ],
    faq: {
      eyebrow: "Questions",
      headline: "Common questions from clinicians.",
      items: [
        {
          q: "How much time can SLPs realistically save on documentation?",
          a: "It depends on your current workflow and how much time you spend on notes. A draft takes away the blank page, which is usually the slowest part of writing one up. How much it saves varies with the complexity of the session and how much editing the draft needs.",
        },
        {
          q: "Does AI-assisted note drafting replace clinical observation?",
          a: "No. A draft note is built from the session data. The judgements a therapist makes in the room are what the therapist adds.",
        },
        {
          q: "Is it clinically appropriate to use AI-drafted notes?",
          a: "Drafted notes are appropriate when the therapist reviews and signs off on every note before it enters the patient's record. Check your local professional body's guidance on AI in clinical documentation.",
        },
        {
          q: "How does UpSpeech collect the data that goes into the draft?",
          a: "Two things feed it. Practice between sessions gives completion and performance data from the app. The session recording itself is transcribed, and the draft report is generated from that transcript. Once you finalize the report, the audio file is deleted. The transcript and the report are kept as part of the record. The therapist sees all of it before any note is signed.",
        },
      ],
    },
    closing: {
      headline: "Let UpSpeech draft the notes so you focus on the session.",
      bodyPrefix:
        "UpSpeech works with speech-language pathologists who want structured between-session practice and AI-drafted notes. ",
      bodyLink: "Request access here",
      bodySuffix: " to see if it fits your practice.",
    },
  },
  forSlps: {
    seoTitle: "For speech-language pathologists",
    seoDescription:
      "UpSpeech gives patients structured practice between sessions. You set what they work on, and you see how it went before the next appointment.",
    intro: {
      eyebrow: "For speech-language pathologists",
      headlineLine1: "More therapy between sessions.",
      headlineLine2: "All of it directed by you.",
      body: "UpSpeech gives your patients guided practice they actually do between appointments, on the techniques you choose. You will know how their week went before they sit down.",
    },
    documentation: {
      eyebrow: "Documentation",
      headline: "Session notes, drafted for you to review.",
      body: "After a session, UpSpeech drafts the report. You edit it and sign it off, without starting from an empty page.",
      screenshotAlt:
        "UpSpeech therapist view showing an AI-drafted session report ready for review.",
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
          title: "They practice in the app",
          copy: "A few calm minutes a day of guided practice, on the technique you set.",
        },
        {
          title: "You see the progress",
          copy: "Streaks, practice consistency and trends come back to you between appointments.",
        },
      ],
    },
    personCentered: {
      eyebrow: "Our approach",
      headline: "Encouraging by design.",
      body: "The app is built around confidence and being heard. The practice is designed to encourage rather than correct.",
    },
    faq: {
      eyebrow: "Questions from clinicians",
      headline: "Common questions from SLPs.",
      items: [
        {
          q: "Does UpSpeech write my reports for me?",
          a: "It drafts a structured report from the session for you to review and edit, and takes the blank-page work off your plate.",
        },
        {
          q: "What do my patients actually do?",
          a: "They practice the techniques you assign, in short daily sessions, and their progress comes back to you between appointments.",
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
  consent: {
    title: "Cookies on this site",
    description:
      "We use cookies to improve your experience and analyze site usage. By accepting, you agree to our use of analytics cookies. You can decline if you prefer.",
    learnMore: "Learn more about cookies",
    decline: "Decline",
    accept: "Accept",
  },
  notFound: {
    seoTitle: "Page Not Found",
    eyebrow: "Error 404",
    title: "This page took a pause.",
    body: "The page you are looking for moved or never existed. Let's get you back on track.",
    backHome: "Back to home",
  },
};

export type Dictionary = typeof en;
