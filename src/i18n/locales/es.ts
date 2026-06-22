import type { Dictionary } from "./en";

// REVIEW NEEDED: nav/footer/localeSwitcher strings are new translations drafted
// for this localization work. The techniquesIndex/techniquePage strings are
// lifted from the existing per-page es literals already shipped on the site.
export const es: Dictionary = {
  nav: {
    howItWorks: "Cómo funciona",
    features: "Funcionalidades",
    whyUs: "Por qué UpSpeech",
    techniques: "Técnicas",
    forPatients: "Para pacientes",
    requestAccess: "Solicitar acceso anticipado",
    skipToContent: "Saltar al contenido",
    logoScrollTop: "UpSpeech, subir al inicio",
    logoGoHome: "UpSpeech, ir a la página de inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    mobileMenuLabel: "Navegación",
  },
  footer: {
    tagline: "Guiando voces con cuidado y tecnología",
    product: "Producto",
    legal: "Legal",
    company: "Empresa",
    forPatients: "Para pacientes",
    techniques: "Técnicas",
    support: "Soporte",
    privacy: "Política de Privacidad",
    terms: "Términos del Servicio",
    cookies: "Política de Cookies",
    linkedin: "LinkedIn",
    contact: "Contáctanos",
    rights: "Todos los derechos reservados.",
    appStoreAlt: "Descárgalo en la App Store",
    appStoreAriaLabel: "Descarga UpSpeech en la App Store",
    playStoreAlt: "Disponible en Google Play",
    playStoreAriaLabel: "Consigue UpSpeech en Google Play",
  },
  localeSwitcher: {
    label: "Idioma",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  techniquesIndex: {
    title: "Técnicas de Logopedia",
    subtitle: "Explora técnicas establecidas para la terapia de la tartamudez",
    seoDescription:
      "Descubre técnicas establecidas de logopedia para la tartamudez, incluyendo modelado de la fluidez, modificación de la tartamudez y enfoques cognitivos.",
    featured: "Destacado",
    mainCategories: "Categorías de Técnicas",
    standalone: "Técnicas Independientes",
    viewDetails: "Ver Detalles",
    techniques: "técnicas",
    loading: "Cargando técnicas...",
    error: "Error al Cargar Técnicas",
    tryAgain:
      "Error al cargar técnicas. Por favor, inténtalo de nuevo más tarde.",
  },
  techniquePage: {
    loading: "Cargando técnica...",
    error: "Error al Cargar Técnica",
    notFound: "Técnica no encontrada",
    backToAll: "Volver a todas las técnicas",
    practicalDescription: "Descripción Práctica",
    objective: "Objetivo",
    howToPractice: "Cómo Practicar",
    relatedTechniques: "Técnicas Relacionadas",
  },
  home: {
    seoDescription:
      "Apoyo continuo para la terapia de la tartamudez. Práctica estructurada entre sesiones, informes de sesión redactados por IA. Los terapeutas siempre tienen el control.",
    hero: {
      eyebrow: "Para clínicas con servicios de tartamudez",
      headlineLine1: "La clínica",
      headlineLine2: "que sigue abierta",
      headlineLine3: "cuando tú no estás.",
      body: "Práctica estructurada entre sesiones. Informes de sesión redactados automáticamente. Los terapeutas mantienen la última palabra.",
      requestAccess: "Solicitar acceso anticipado",
      seeHowItWorks: "Ver cómo funciona",
      videoAriaLabel:
        "Demostración del producto UpSpeech: un terapeuta asigna un plan personalizado, el paciente practica en casa, el terapeuta sigue el progreso en un panel, graba una sesión, se redacta el informe y los clínicos anotan la grabación",
      posterAlt:
        "Demostración del producto UpSpeech: el plan de práctica personalizado de un terapeuta",
      playAriaLabel: "Reproducir la demostración del producto UpSpeech",
    },
    credibility: {
      eyebrow: "Socios y reconocimiento",
    },
    gap: {
      eyebrow: "La semana del paciente",
      days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      headlineToday: "La semana de un paciente, tal como es hoy.",
      headlineWithPrefix: "La semana de un paciente,",
      headlineWithBrand: "con UpSpeech.",
      traditional: "Tradicional",
      traditionalCadence: "1 sesión · 6 días sin apoyo",
      withUpspeech: "Con UpSpeech",
      fullCadence: "1 sesión · Todos los días, cuidado continuo",
      partialPrefix: "1 sesión · ",
      partialSuffix: " / 7 días de cuidado continuo",
      session: "Sesión",
      practice: "Práctica",
      plusPractice: "+ Práctica",
      footerPrefix: "Apoyo continuo para el paciente,",
      footerEmphasis: "sin más trabajo para el clínico.",
    },
    therapist: {
      eyebrow: "En la consulta",
      headlineLine1: "La sesión pertenece al clínico.",
      headlineLine2: "La plataforma se encarga del resto.",
      body: "Informes redactados automáticamente a partir de cada sesión. Actividad del paciente visible fuera de la consulta. Los terapeutas llegan preparados, con el contexto que necesitan.",
      imageAlt:
        "Vista del terapeuta en UpSpeech del progreso de un paciente: estadísticas de actividad, hito de la ruta de aprendizaje y paso actual",
      points: [
        {
          label: "Preparación de la sesión",
          copy: "Entra en la consulta sabiendo qué ha practicado el paciente desde la última visita.",
        },
        {
          label: "Informes redactados",
          copy: "Los datos de la sesión se convierten en un borrador de informe estructurado para que el terapeuta lo revise y apruebe.",
        },
        {
          label: "Validación del terapeuta",
          copy: "Cada informe y plan de tratamiento es un borrador hasta que el terapeuta lo revisa y lo firma.",
        },
      ],
    },
    patient: {
      eyebrow: "Fuera de la consulta",
      headlineLine1: "Práctica estructurada entre visitas,",
      headlineLine2: "guiada por el terapeuta en todo momento.",
      body: "Cada paciente recibe un plan de su clínico, con ejercicios adaptados a su fase de tratamiento. Los ejercicios guiados apoyan la práctica entre visitas.",
      imageAlt:
        "Panel del paciente en UpSpeech con ejercicios de práctica diarios y progreso",
      points: [
        {
          label: "Un plan, definido por el terapeuta",
          copy: "Cada paso lo selecciona el clínico. Los pacientes ven solo lo que deben practicar.",
        },
        {
          label: "Cada intento, registrado",
          copy: "Cada intento de práctica se graba y se organiza para que el terapeuta lo revise y lo ajuste.",
        },
        {
          label: "Progreso, registrado",
          copy: "Las rachas y el progreso a lo largo del tiempo mantienen a los pacientes implicados. El terapeuta ve la actividad que hay detrás.",
        },
      ],
    },
    mobile: {
      eyebrow: "En el bolsillo del paciente",
      headline: "La práctica ocurre en la app, entre sesiones.",
      body: "Los pacientes siguen el plan que definió su terapeuta, practican con ejercicios guiados y se registran desde el móvil. Su terapeuta los acompaña.",
      screenshots: [
        "App móvil de UpSpeech mostrando la ruta de aprendizaje con los pasos que fijó el terapeuta",
        "Pantalla de práctica de la app móvil de UpSpeech con ejercicios guiados de tartamudez",
        "Pantalla de inicio de la app móvil de UpSpeech mostrando el ejercicio del día del paciente",
      ],
    },
    cycle: {
      eyebrow: "El ciclo",
      headlinePrefix: "Cada paso",
      headlineEmphasis: "revisado por un clínico.",
      clinician: "Clínico",
      ai: "IA",
      clinicianStepPrefix: "Clínico · paso ",
      aiStepPrefix: "IA · paso ",
      stepPrefix: "Paso ",
      stepSuffix: " / 06",
      nodes: [
        {
          verb: "redacta",
          title: "La IA redacta el informe de la sesión.",
          body: "La grabación y las notas de la sesión se convierten en un borrador estructurado.",
        },
        {
          verb: "aprueba",
          title: "El clínico lee, edita, aprueba.",
          body: "Nada sale de la plataforma sin revisión del terapeuta. Las correcciones retroalimentan el modelo y mejoran el siguiente borrador.",
        },
        {
          verb: "estructura",
          title: "La IA estructura el plan de práctica.",
          body: "A partir de los datos de la sesión y la fase del paciente, UpSpeech propone ejercicios diarios para que el terapeuta los apruebe.",
        },
        {
          verb: "calibra",
          title: "El clínico lo calibra.",
          body: "El terapeuta aprueba, ajusta la dificultad e intercambia técnicas. Ningún plan se asigna sin revisión del terapeuta.",
        },
        {
          verb: "escucha",
          title: "La IA ayuda entre sesiones.",
          body: "Cada intento de práctica se captura y se organiza, construyendo un registro de actividad entre sesiones.",
        },
        {
          verb: "decide",
          title: "El clínico decide qué sigue.",
          body: "La señal agregada aparece en el panel del terapeuta. Este selecciona el siguiente protocolo con los datos a mano.",
        },
      ],
    },
    interstitial: {
      headlineLine1: "Apoyo continuo,",
      headlineLine2: "empezando por tu clínica.",
      requestAccess: "Solicitar acceso anticipado",
    },
    gallery: {
      eyebrow: "Dentro de la plataforma",
      headlineLine1: "Herramientas específicas.",
      headlineLine2: "Para clínicos e investigadores.",
      intro:
        "La plataforma se construye en torno a una ruta de aprendizaje estructurada, desde la identificación de momentos de tartamudez hasta la generalización en el mundo real.",
      forClinicians: "Para clínicos",
      forResearchers: "Para investigadores",
      annotationEyebrow: "Herramienta de anotación",
      annotationTitle:
        "La herramienta que clínicos e investigadores usan para etiquetar momentos de tartamudez.",
      annotationCopy:
        "Etiquetado fotograma a fotograma de momentos de tartamudez: conducta principal, conductas secundarias, nivel de tensión. Taxonomía estándar. La misma herramienta construye nuestro conjunto de datos y respalda colaboraciones de investigación.",
      annotationImageAlt:
        "Herramienta de anotación de UpSpeech con forma de onda de audio, revisión de vídeo y etiquetado fotograma a fotograma por logopedas",
      features: [
        {
          label: "Ruta de aprendizaje estructurada",
          title: "Un plan construido a partir de hitos y pasos.",
          copy: "El clínico arma la ruta de cada paciente a partir de técnicas establecidas y desbloquea cada paso a medida que el paciente está listo.",
          imageAlt:
            "Ruta de aprendizaje de UpSpeech mostrando los hitos y pasos de terapia de un paciente con su estado de finalización",
        },
        {
          label: "Escenarios de práctica",
          title: "Ensayo con un interlocutor de conversación virtual.",
          copy: "Los pacientes ensayan conversaciones difíciles con un interlocutor virtual. El clínico define el escenario y la dificultad.",
          imageAlt:
            "Interfaz de escenario de práctica de UpSpeech mostrando el ensayo de una entrevista de trabajo con objetivos y videollamada",
        },
        {
          label: "Autoinformes periódicos",
          title: "Autoinformes que el terapeuta revisa.",
          copy: "Un breve autoinforme de tartamudez se captura a intervalos, para que el terapeuta pueda revisar cómo describe el paciente su experiencia a lo largo de la terapia.",
          imageAlt:
            "Gráfico de UpSpeech de las respuestas de tartamudez autoinformadas de un paciente a lo largo de varias semanas",
        },
      ],
    },
    engine: {
      eyebrow: "UpSpeech Labs",
      headlineLine1: "Entrenada con",
      headlineLine2: "datos anotados por clínicos.",
      body: "Construimos una herramienta de anotación internamente, usada por logopedas en ejercicio para etiquetar disfluencias, tensiones y bloqueos fotograma a fotograma. El conjunto de datos está etiquetado por expertos desde el principio.",
      videoAriaLabel:
        "Herramienta de anotación de UpSpeech usada por clínicos para etiquetar disfluencias fotograma a fotograma",
      tags: [
        "Bloqueo",
        "Prolongación",
        "Repetición",
        "Tensión",
        "Mirada de reojo",
        "Retención",
      ],
    },
    foundations: {
      eyebrow: "Fundamentos",
      headlineLine1: "Práctica clínica e ingeniería de IA,",
      headlineLine2: "en el mismo equipo.",
      body: "Clínicos e ingenieros trabajan codo con codo. Las decisiones de producto las revisan los logopedas en ejercicio que usan la plataforma con pacientes.",
      partnersLabel: "Socios · Inversores · Reconocimiento",
      partnersTagline: "Construyendo junto a quienes conocen el trabajo.",
      partnerContext: {
        speechcare: "Socio de codesarrollo",
        elevenlabs: "Beca de infraestructura de IA",
        lispolis: "Programa de aceleración",
        unicorn: "Startup Más Prometedora · Lisboa",
        innocatalyst: "Programa de innovación en salud",
        healthqup: "Programa de aceleración en salud",
      },
    },
    security: {
      eyebrow: "Seguridad y datos",
      headline: "Datos de los pacientes, tratados con cuidado.",
      body: "Las clínicas nos confían grabaciones sensibles. Tratamos esos datos como lo haría una clínica, y un terapeuta siempre tiene la última palabra sobre lo que produce la IA.",
      points: [
        {
          title: "Aislamiento por organización",
          copy: "Los datos de cada clínica se mantienen separados por organización. Una organización nunca puede ver los pacientes ni las grabaciones de otra.",
        },
        {
          title: "Cifrados en tránsito y en reposo",
          copy: "Los datos viajan por TLS, y las grabaciones y bases de datos se cifran mientras están almacenadas.",
        },
        {
          title: "Alojados en la UE",
          copy: "Nuestros servidores y almacenamiento de archivos están en la Unión Europea, y tratamos los datos personales conforme al RGPD.",
        },
        {
          title: "Grabaciones privadas",
          copy: "Se accede a las grabaciones mediante enlaces firmados y de corta duración, nunca desde una ubicación pública.",
        },
      ],
      readPrivacy: "Lee nuestra Política de Privacidad",
    },
    cta: {
      headline: "Solicitar acceso anticipado.",
      body: "Estamos trabajando con un grupo de clínicas y nos gustaría saber de otras que trabajan en el ámbito de la tartamudez. Cuéntanos sobre tu consulta y nos pondremos en contacto.",
      nameLabel: "Nombre Completo *",
      namePlaceholder: "Introduce tu nombre",
      nameError: "Por favor, introduce tu nombre.",
      emailLabel: "Correo Electrónico *",
      emailPlaceholder: "tu@email.com",
      emailError: "Por favor, introduce tu correo electrónico.",
      roleLabel: "Función *",
      rolePlaceholder: "Elige tu función",
      roleError: "Por favor, elige tu función.",
      roleSpeechTherapist: "Logopeda",
      roleClinicDirector: "Director de Clínica",
      rolePracticeOwner: "Propietario de Consulta",
      roleOther: "Otro",
      clinicSizeLabel: "Tamaño de la Clínica (Opcional)",
      clinicSizePlaceholder: "Elige el tamaño de la clínica",
      clinicSizeSolo: "Consulta Individual",
      clinicSizeSmall: "2-5 Terapeutas",
      clinicSizeMedium: "6-15 Terapeutas",
      clinicSizeLarge: "15+ Terapeutas",
      submit: "Solicitar acceso anticipado",
      submitting: "Enviando...",
      requiredFieldsTitle: "Por favor, rellena todos los campos obligatorios",
      successTitle: "Estás en la lista.",
      successDescription:
        "Gracias, nos pondremos en contacto. Revisa tu correo para una confirmación.",
      errorTitle: "Algo salió mal",
      errorDefault: "Por favor, inténtalo de nuevo más tarde.",
      errorNetwork:
        "Error de red. Por favor, comprueba tu conexión e inténtalo de nuevo.",
      errorSubmission:
        "Hubo un problema con el envío del formulario. Por favor, inténtalo de nuevo.",
    },
  },
  forPatients: {
    seoTitle: "Para Pacientes",
    seoDescription:
      "Cómo los pacientes practican logopedia entre sesiones con UpSpeech, guiados por su logopeda.",
    intro: {
      eyebrow: "Para pacientes",
      headlineLine1: "Tu práctica,",
      headlineLine2: "entre sesiones.",
      body: "UpSpeech es la forma de seguir practicando el trabajo que haces con tu logopeda, cada día, no solo en la consulta. Tu terapeuta define el plan; tú practicas en la app; tu terapeuta sigue tu progreso.",
    },
    howItWorks: {
      eyebrow: "Cómo funciona para ti",
      headline: "Guiado por tu terapeuta, en cada paso.",
      steps: [
        {
          title: "Tu terapeuta define tu plan",
          copy: "Tu logopeda elige los ejercicios y objetivos que se ajustan a tu terapia y a tu fase de tratamiento.",
        },
        {
          title: "Practicas en la app",
          copy: "Realiza los ejercicios guiados entre sesiones, a tu ritmo, desde el móvil. Ves solo lo que tu terapeuta ha asignado.",
        },
        {
          title: "Tu terapeuta ve tu progreso",
          copy: "Sigue lo que has practicado y ajusta el plan a medida que avanzas, para que cada sesión parta de la anterior.",
        },
      ],
    },
    app: {
      eyebrow: "La app",
      headline: "Tu plan, en tu bolsillo.",
      body: "Abre la app para ver el ejercicio de hoy, realizarlo y mantener una rutina constante entre sesiones.",
      screenshots: [
        "Pantalla de inicio de la app móvil de UpSpeech mostrando el ejercicio del día del paciente",
        "App móvil de UpSpeech mostrando la ruta de aprendizaje con los pasos que fijó el terapeuta",
        "Pantalla de práctica de la app móvil de UpSpeech con ejercicios guiados de tartamudez",
      ],
    },
    faq: {
      eyebrow: "Preguntas",
      headline: "Preguntas frecuentes de los pacientes.",
      items: [
        {
          q: "¿Necesito un logopeda para usar UpSpeech?",
          a: "Sí. UpSpeech se usa junto con un logopeda que define tu plan y revisa tu progreso. No sustituye a la terapia.",
        },
        {
          q: "¿Qué voy a practicar?",
          a: "Tu terapeuta elige ejercicios para ti según tus objetivos y tu fase de terapia. Verás solo lo que tu terapeuta haya asignado.",
        },
        {
          q: "¿Con qué frecuencia debo practicar?",
          a: "Tu terapeuta orienta la frecuencia de la práctica. La app facilita mantener una rutina constante entre sesiones.",
        },
        {
          q: "¿Mi información es privada?",
          a: "Sí. Tus datos están cifrados y se mantienen privados en el marco de tu atención. Consulta la Política de Privacidad para más detalles.",
        },
        {
          q: "¿Cómo consigo UpSpeech?",
          a: "Pregunta a tu logopeda si usa UpSpeech. Las clínicas solicitan acceso a través de este sitio.",
        },
      ],
    },
    closing: {
      headline: "Pregunta a tu logopeda sobre UpSpeech.",
      bodyPrefix:
        "UpSpeech funciona a través de tu clínica. Si gestionas una consulta y quieres usarla con tus pacientes, puedes ",
      bodyLink: "solicitar acceso aquí",
      bodySuffix: ".",
    },
    storeAppStoreAlt: "Descárgalo en la App Store",
    storeAppStoreAriaLabel: "Descarga UpSpeech en la App Store",
    storePlayAlt: "Disponible en Google Play",
    storePlayAriaLabel: "Consigue UpSpeech en Google Play",
  },
};
