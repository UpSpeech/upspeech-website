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
    tagline: "Apoyo a la logopedia, entre sesiones",
    product: "Producto",
    legal: "Legal",
    company: "Empresa",
    forPatients: "Para pacientes",
    forSlps: "Para logopedas",
    support: "Soporte",
    privacy: "Política de Privacidad",
    terms: "Condiciones del servicio",
    cookies: "Política de Cookies",
    linkedin: "LinkedIn",
    contact: "Contáctanos",
    rights: "Todos los derechos reservados.",
    appStoreAlt: "Descárgalo en la App Store",
    appStoreAriaLabel: "Descarga UpSpeech en la App Store",
    playStoreAlt: "Disponible en Google Play",
    playStoreAriaLabel: "Consigue UpSpeech en Google Play",
    personCentered: "Centrada en la persona",
    reducingDocumentationTime: "Tiempo de documentación",
  },
  localeSwitcher: {
    label: "Idioma",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  medicalDisclaimer:
    "UpSpeech es una herramienta de práctica y de productividad clínica para su uso por y con logopedas cualificados. No es un dispositivo médico y no diagnostica, trata ni cura ninguna condición. El contenido educativo de este sitio no sustituye el asesoramiento clínico profesional.",
  techniquesIndex: {
    title: "Técnicas de logopedia",
    subtitle: "Técnicas establecidas usadas en logopedia",
    seoDescription:
      "Descubre técnicas establecidas de logopedia para la tartamudez, incluyendo moldeamiento de la fluidez, modificación de la tartamudez y enfoques cognitivos.",
    featured: "Destacado",
    mainCategories: "Categorías de técnicas",
    standalone: "Técnicas independientes",
    viewDetails: "Ver detalles",
    techniques: "técnicas",
    loading: "Cargando técnicas...",
    error: "Error al cargar técnicas",
    tryAgain: "Error al cargar técnicas. Inténtalo de nuevo más tarde.",
  },
  techniquePage: {
    loading: "Cargando técnica...",
    error: "Error al cargar la técnica",
    notFound: "Técnica no encontrada",
    backToAll: "Volver a todas las técnicas",
    practicalDescription: "Descripción práctica",
    objective: "Objetivo",
    howToPractice: "Cómo practicar",
    relatedTechniques: "Técnicas relacionadas",
  },
  home: {
    seoDescription:
      "Apoyo continuo a la logopedia. Los pacientes practican entre sesiones según el plan de su terapeuta, y cada intento vuelve para revisión.",
    hero: {
      photoAlt:
        "Una mujer en la mesa de su cocina sosteniendo el teléfono frente a ella, diciendo un ejercicio en voz alta a última hora de la tarde",
      eyebrow: "Para clínicas de logopedia",
      headlineLine1: "Tu terapia",
      headlineLine2: "sigue",
      headlineLine3: "entre sesiones.",
      body: "Los pacientes practican entre sesiones, siguiendo el plan que les ha pautado su logopeda. Cada intento vuelve al terapeuta, que decide el siguiente paso.",
      requestAccess: "Solicitar acceso anticipado",
      seeHowItWorks: "Ver cómo funciona",
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
      fullCadence: "1 sesión · Todos los días, apoyo continuo",
      partialPrefix: "1 sesión · ",
      partialSuffix: " / 7 días de apoyo continuo",
      session: "Sesión",
      practice: "Práctica",
      plusPractice: "+ Práctica",
      footerPrefix: "El paciente cuenta con apoyo todos los días,",
      footerEmphasis: "sin añadir sesiones a la agenda del logopeda.",
    },
    week: {
      eyebrow: "Entre las sesiones",
      headline: "La mayor parte de la terapia ocurre cuando nadie mira.",
      body: "Una hora en la clínica y luego seis días por tu cuenta. La parte que decide si la terapia funciona es la que el clínico nunca ve.",
      frames: [
        {
          day: "Jueves",
          caption: "La sesión. En la sala todo sale bien.",
          alt: "Una logopeda explicando algo a un paciente que escucha, sentados uno frente al otro en una sala sencilla",
        },
        {
          day: "Sábado",
          caption: "Solo con la hoja. Sin saber si lo está haciendo bien.",
          alt: "Un joven sentado solo a la mesa en casa, con una hoja de ejercicios en la mano y expresión de duda",
        },
        {
          day: "Lunes",
          caption: "Suena el teléfono. Lo deja sonar.",
          alt: "Un joven de pie en el pasillo mirando un teléfono que suena sobre una mesa auxiliar, sin cogerlo",
        },
        {
          day: "Jueves siguiente",
          caption: "Y bien, ¿qué tal la semana? Nadie lo sabe del todo.",
          alt: "Una logopeda haciendo una pregunta inicial mientras el paciente responde con un gesto de duda",
        },
      ],
      traceLabel: "Seis días sin nada registrado",
    },
    handoff: {
      eyebrow: "Grabado en casa, revisado en la clínica",
      headline: "Él lo grabó el sábado.",
      headlineEmphasis: "Ella lo vio el lunes.",
      body: "El paciente practica en casa y el intento llega directamente a su logopeda, que lo revisa, marca lo que ha cambiado y decide el siguiente paso. El software está entre dos personas. No sustituye a ninguna.",
      recordedStamp: "Sábado, 21:07",
      recordedPlace: "En casa",
      recordedCaption:
        "Un intento, dos minutos, enviado en cuanto él terminó.",
      recordedTraceLabel:
        "Forma de onda de una grabación de práctica de dos minutos: seis frases con pausas entre ellas",
      reviewedStamp: "Lunes, 09:22",
      reviewedPlace: "En la consulta",
      reviewedTraceLabel:
        "La misma forma de onda, con dos momentos marcados por la logopeda en 00:53 y 01:22",
      marks: ["00:53 · SR", "01:22 · MUR"],
      howTo: {
        name: "Cómo la práctica entre sesiones llega al logopeda",
        steps: [
          {
            name: "Grabar el intento en casa",
            text: "El paciente graba un intento con el móvil, siguiendo el plan que fijó su logopeda.",
          },
          {
            name: "La grabación llega al logopeda",
            text: "El intento va directamente a su logopeda, sin necesidad de una cita intermedia.",
          },
          {
            name: "El logopeda la revisa y marca lo que ha cambiado",
            text: "El logopeda ve la grabación y marca los momentos que han cambiado, con marca de tiempo.",
          },
          {
            name: "El logopeda decide el siguiente paso",
            text: "El siguiente paso del plan se elige a partir de lo que mostró la grabación.",
          },
        ],
      },
      reviewedCaption:
        "Dos momentos marcados. Revisado por el clínico, no por un modelo.",
      patientAlt: "Un joven mirando el teléfono que sostiene, practicando en casa",
      clinicianAlt:
        "Una logopeda mirando una grabación en su tablet, revisando el intento de un paciente",
    },
    therapist: {
      eyebrow: "En la consulta",
      headlineLine1: "El logopeda dirige la sesión.",
      headlineLine2: "UpSpeech se encarga del resto.",
      body: "Puedes ver qué han practicado tus pacientes entre citas, y cómo ha ido cada intento.",
      imageAlt:
        "Vista del terapeuta en UpSpeech del progreso de un paciente: estadísticas de actividad, hito de la ruta de aprendizaje y paso actual",
      points: [
        {
          label: "Preparación de la sesión",
          copy: "Entra en la consulta sabiendo qué ha practicado el paciente desde la última visita.",
        },
        {
          label: "El siguiente plan, listo",
          copy: "Ajusta la práctica de la semana siguiente sin volver a construirla desde cero.",
        },
        {
          label: "Validación del terapeuta",
          copy: "Cada informe y cada plan de terapia es un borrador hasta que el terapeuta lo revisa y lo firma.",
        },
      ],
    },
    patient: {
      eyebrow: "Fuera de la consulta",
      headlineLine1: "Práctica estructurada entre visitas,",
      headlineLine2: "guiada por el terapeuta en todo momento.",
      body: "Cada paciente recibe un plan de su logopeda, con ejercicios adaptados a su fase de terapia, y lo va completando entre visitas con orientación en cada paso.",
      imageAlt:
        "Panel del paciente en UpSpeech con ejercicios de práctica diarios y progreso",
      points: [
        {
          label: "Un plan, definido por el terapeuta",
          copy: "Cada paso lo elige el terapeuta. Los pacientes ven solo lo que deben practicar.",
        },
        {
          label: "Cada intento, registrado",
          copy: "Cada intento se graba y se organiza para que el terapeuta lo revise y lo ajuste.",
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
      body: "Los pacientes siguen desde el móvil, entre sesiones, el plan que les ha pautado su logopeda, y el terapeuta puede ver cómo va.",
      screenshots: [
        "App móvil de UpSpeech mostrando la ruta de aprendizaje con los pasos que ha pautado el terapeuta",
        "Pantalla de práctica de la app móvil de UpSpeech con ejercicios guiados de práctica",
        "Pantalla de inicio de la app móvil de UpSpeech mostrando el ejercicio del día del paciente",
      ],
    },
    cycle: {
      eyebrow: "El ciclo",
      headlinePrefix: "Cada paso",
      headlineEmphasis: "revisado por un logopeda.",
      clinician: "Logopeda",
      ai: "IA",
      clinicianStepPrefix: "Logopeda · paso ",
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
          title: "El logopeda lo edita y lo aprueba.",
          body: "Esas correcciones mejoran el siguiente borrador. Todo lo que se use para entrenar nuestros modelos necesita antes el consentimiento del paciente.",
        },
        {
          verb: "estructura",
          title: "La IA estructura el plan de práctica.",
          body: "A partir de los datos de la sesión y la fase del paciente, UpSpeech propone ejercicios diarios para que el terapeuta los apruebe.",
        },
        {
          verb: "calibra",
          title: "El logopeda lo calibra.",
          body: "El terapeuta ajusta la dificultad y cambia de técnica cuando hace falta. Nada llega al paciente sin que el terapeuta lo revise y lo firme.",
        },
        {
          verb: "escucha",
          title: "La IA ayuda entre sesiones.",
          body: "Los intentos se guardan con la técnica, la fecha y la valoración que hizo el paciente del esfuerzo.",
        },
        {
          verb: "decide",
          title: "El logopeda decide qué sigue.",
          body: "El panel reúne la actividad de la semana. El logopeda elige desde ahí el siguiente paso.",
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
      headlineLine2: "Para logopedas e investigadores.",
      intro:
        "La plataforma gira en torno a una ruta de aprendizaje estructurada, desde identificar momentos de disfluencia hasta llevar el trabajo a conversaciones reales.",
      forClinicians: "Para logopedas",
      forResearchers: "Para investigadores",
      annotationEyebrow: "Herramienta de anotación",
      annotationTitle:
        "La herramienta que logopedas e investigadores usan para anotar momentos de disfluencia.",
      annotationCopy:
        "Los logopedas anotan momentos de disfluencia con una taxonomía estándar, desde las conductas principales hasta las secundarias y el nivel de tensión. La misma herramienta construye nuestro conjunto de datos y apoya nuestras colaboraciones de investigación.",
      annotationImageAlt:
        "Herramienta de anotación de UpSpeech con forma de onda de audio, revisión de vídeo y anotación por logopedas",
      features: [
        {
          label: "Ruta de aprendizaje estructurada",
          title: "Un plan construido a partir de hitos y pasos.",
          copy: "El logopeda monta la ruta de cada paciente a partir de técnicas establecidas y va desbloqueando cada paso cuando el paciente está preparado.",
          imageAlt:
            "Ruta de aprendizaje de UpSpeech mostrando los hitos y pasos de terapia de un paciente con su estado de finalización",
        },
        {
          label: "Escenarios de práctica",
          title: "Ensayo con un interlocutor de conversación virtual.",
          copy: "Los pacientes ensayan conversaciones difíciles con un interlocutor virtual. El logopeda define el escenario y la dificultad.",
          imageAlt:
            "Interfaz de escenario de práctica de UpSpeech mostrando el ensayo de una entrevista de trabajo con objetivos y videollamada",
        },
        {
          label: "Cuestionarios de seguimiento",
          title: "Cuestionarios que el terapeuta revisa.",
          copy: "Cada cierto tiempo, el paciente rellena un breve cuestionario sobre su experiencia. Así el logopeda ve cómo describe el paciente su propia experiencia con el paso del tiempo.",
          imageAlt:
            "Gráfico de UpSpeech con las respuestas de un paciente al cuestionario a lo largo de varias semanas",
        },
      ],
    },
    engine: {
      eyebrow: "UpSpeech Labs",
      headlineLine1: "Entrenada con",
      headlineLine2: "datos anotados por logopedas.",
      body: "Construimos nuestra propia herramienta de anotación, usada por logopedas en activo para anotar disfluencias.",
      videoAriaLabel:
        "Herramienta de anotación de UpSpeech usada por logopedas para anotar disfluencias",
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
      body: "Logopedas e ingenieros trabajan codo con codo. Las decisiones de producto las revisan los logopedas que usan la plataforma con pacientes.",
      logoPartnersLabel: "Socios",
      logoPartnerContext: {
        speechcare: "Socio de codesarrollo",
        elevenlabs: "Subvención de infraestructura de IA",
      },
      partnersLabel: "Programas · Apoyos · Reconocimiento",
      partnersTagline: "Con quién trabajamos",
      partnerContext: {
        lispolis: "Programa de aceleración",
        unicorn: "Startup Más Prometedora · Lisboa",
        innocatalyst: "Programa de innovación en salud",
        healthqup: "Programa de aceleración en salud",
      },
    },
    security: {
      eyebrow: "Seguridad y datos",
      headline: "Cómo se tratan los datos de los pacientes.",
      body: "Las clínicas nos confían grabaciones sensibles. Tratamos esos datos como lo haría una clínica, y un terapeuta siempre tiene la última palabra sobre lo que produce la IA.",
      points: [
        {
          title: "Aislamiento por organización",
          copy: "Los datos de cada clínica se mantienen separados por organización. Una organización nunca puede ver los pacientes ni las grabaciones de otra.",
        },
        {
          title: "Cifrado en tránsito y en reposo",
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
        {
          title: "Mejorar la IA, con consentimiento",
          copy: "Las grabaciones se usan para mejorar nuestros modelos solo cuando el paciente lo ha autorizado expresamente. Antes se eliminan los datos identificativos, las grabaciones no salen de UpSpeech y el paciente puede retirar su consentimiento en cualquier momento.",
        },
      ],
      readPrivacy: "Lee nuestra Política de Privacidad",
    },
    cta: {
      headline: "Solicitar acceso anticipado.",
      body: "Estamos trabajando con un grupo de clínicas y nos gustaría que nos escribieran otras que trabajan en el ámbito de la logopedia. Háblanos de tu consulta y nos pondremos en contacto.",
      nameLabel: "Nombre completo *",
      namePlaceholder: "Introduce tu nombre",
      nameError: "Introduce tu nombre.",
      emailLabel: "Correo electrónico *",
      emailPlaceholder: "tu@email.com",
      emailError: "Introduce tu correo electrónico.",
      roleLabel: "Cargo *",
      rolePlaceholder: "Elige tu cargo",
      roleError: "Elige tu cargo.",
      roleSpeechTherapist: "Logopeda",
      roleClinicDirector: "Director de clínica",
      rolePracticeOwner: "Propietario de consulta",
      roleOther: "Otro",
      clinicSizeLabel: "Tamaño de la clínica (opcional)",
      clinicSizePlaceholder: "Elige el tamaño de la clínica",
      clinicSizeSolo: "Consulta individual",
      clinicSizeSmall: "2-5 terapeutas",
      clinicSizeMedium: "6-15 terapeutas",
      clinicSizeLarge: "15+ terapeutas",
      submit: "Solicitar acceso anticipado",
      submitting: "Enviando...",
      requiredFieldsTitle: "Rellena todos los campos obligatorios",
      successTitle: "Estás en la lista.",
      successDescription:
        "Gracias, nos pondremos en contacto. Te hemos enviado una confirmación por correo.",
      errorTitle: "Algo ha salido mal",
      errorDefault: "Inténtalo de nuevo más tarde.",
      errorNetwork: "Error de red. Comprueba tu conexión e inténtalo de nuevo.",
      errorSubmission:
        "Ha habido un problema con el envío del formulario. Inténtalo de nuevo.",
    },
  },
  forPatients: {
    seoTitle: "Para pacientes",
    seoDescription:
      "Cómo los pacientes practican la terapia del habla entre sesiones con UpSpeech, guiados por su logopeda.",
    intro: {
      eyebrow: "Para pacientes",
      headlineLine1: "Tu práctica,",
      headlineLine2: "entre sesiones.",
      body: "UpSpeech es la forma de seguir practicando entre citas el trabajo que haces con tu logopeda. Tu terapeuta define el plan y ve cómo va todo mientras tú practicas en la app.",
      photoAlt:
        "Un niño hablando hacia un teléfono apoyado en la mesa de la cocina, con su madre sentada a su lado mirándolo a él y no a la pantalla",
    },
    withAParent: {
      eyebrow: "Practicar con un padre o una madre",
      line: "Los pacientes más jóvenes practican con un padre o una madre a su lado, siguiendo el mismo plan que ha definido su logopeda.",
      photoAlt:
        "Un padre y su hija sentados juntos en el sofá, escuchando una grabación en el teléfono de él",
    },
    howItWorks: {
      eyebrow: "Cómo funciona para ti",
      headline: "Guiado por tu terapeuta, en cada paso.",
      steps: [
        {
          title: "Tu terapeuta define tu plan",
          copy: "Tu logopeda elige los ejercicios y objetivos que se ajustan a la fase de terapia en la que estás.",
        },
        {
          title: "Practicas en la app",
          copy: "Realiza los ejercicios guiados desde el móvil, al ritmo que te vaya bien entre sesiones.",
        },
        {
          title: "Tu terapeuta ve tu progreso",
          copy: "Tu logopeda sigue lo que has practicado y ajusta el plan a medida que avanzas, para que cada sesión parta de la anterior.",
        },
      ],
    },
    app: {
      eyebrow: "La app",
      headline: "Tu plan, en tu bolsillo.",
      body: "Abres la app y ahí está el ejercicio del día.",
      screenshots: [
        "Pantalla de inicio de la app móvil de UpSpeech mostrando el ejercicio del día del paciente",
        "App móvil de UpSpeech mostrando la ruta de aprendizaje con los pasos que ha pautado el terapeuta",
        "Pantalla de práctica de la app móvil de UpSpeech con ejercicios guiados de práctica",
      ],
    },
    faq: {
      eyebrow: "Preguntas",
      headline: "Preguntas frecuentes de los pacientes.",
      items: [
        {
          q: "¿Necesito un logopeda para usar UpSpeech?",
          a: "Sí. UpSpeech se usa junto con tu logopeda, que define tu plan y revisa tu progreso. No sustituye a la terapia.",
        },
        {
          q: "¿Qué voy a practicar?",
          a: "Tu terapeuta elige ejercicios para ti según tus objetivos y tu fase de terapia.",
        },
        {
          q: "¿Con qué frecuencia debo practicar?",
          a: "Tu terapeuta orienta la frecuencia de la práctica. La app facilita mantener una rutina constante entre sesiones.",
        },
        {
          q: "¿Mi información es privada?",
          a: "Sí. Tus datos están cifrados y solo los ve quien te atiende. Consulta la Política de Privacidad para más detalles.",
        },
        {
          q: "¿Cómo consigo UpSpeech?",
          a: "Pregunta a tu logopeda si usa UpSpeech.",
        },
      ],
    },
    closing: {
      headline: "Pregunta a tu logopeda sobre UpSpeech.",
      bodyPrefix:
        "UpSpeech funciona a través de tu clínica. Si gestionas una consulta y quieres usarlo con tus pacientes, puedes ",
      bodyLink: "solicitar acceso aquí",
      bodySuffix: ".",
    },
    storeAppStoreAlt: "Descárgalo en la App Store",
    storeAppStoreAriaLabel: "Descarga UpSpeech en la App Store",
    storePlayAlt: "Disponible en Google Play",
    storePlayAriaLabel: "Consigue UpSpeech en Google Play",
  },
  personCentered: {
    seoTitle: "¿Qué es la logopedia centrada en la persona?",
    seoDescription:
      "Una guía en lenguaje sencillo sobre la logopedia centrada en la persona: qué significa, por qué la fluidez no es el único objetivo, y cómo UpSpeech refleja este enfoque.",
    intro: {
      eyebrow: "Filosofía",
      headlineLine1: "¿Qué es la terapia",
      headlineLine2: "centrada en la persona?",
      body: "La terapia centrada en la persona prioriza la confianza y la comunicación, y es la propia persona quien ayuda a definir los objetivos. En la terapia de la tartamudez, este enfoque se llama a veces tartamudez positiva.",
    },
    sections: [
      {
        heading: "La fluidez no es el único objetivo",
        body: "La logopedia tradicional a veces trata la fluidez como la definición del éxito. El enfoque centrado en la persona amplía esa perspectiva. Cuando alguien sí quiere un habla más fluida, los logopedas recurren a técnicas de moldeamiento de la fluidez, como el habla prolongada. Cuando lo que más importa es reducir la evitación, optan por la tartamudez voluntaria y la desensibilización. Lo que lo hace centrado en la persona es que es ella quien tiene mucho que decir sobre cuáles de esos objetivos se aplican.",
      },
      {
        heading: "Ser escuchado en tus propios términos",
        body: "Las personas que tartamudean a menudo se enfrentan a algo más que la disfluencia. Está la llamada que vas dejando para más adelante, o el café que acabas pidiendo de otra forma porque es más fácil que la palabra que ibas a decir. La terapia centrada en la persona aborda eso junto con la práctica de técnicas.",
      },
      {
        heading: "Cómo UpSpeech refleja este enfoque",
        body: "UpSpeech apoya el enfoque que elija el logopeda. La ruta de aprendizaje y los ejercicios los establece el terapeuta, y la app apoya la práctica entre sesiones. Si el objetivo es reducir la evitación, el terapeuta lo incluye en el plan. Si el objetivo es practicar la tartamudez voluntaria, la app también lo apoya. Que la fluidez entre o no en el plan lo deciden el logopeda y la persona.",
      },
      {
        heading: "Una nota sobre el lenguaje",
        body: "Esta página utiliza 'personas que tartamudean' y 'persona que tartamudea' en todo el texto. El lenguaje que pone a la persona antes de la condición es el estándar aquí, a menos que la propia persona prefiera otro. El objetivo es describir a las personas con respeto, con las palabras que ellas eligen para sí mismas.",
      },
    ],
    faq: {
      eyebrow: "Preguntas",
      headline: "Preguntas frecuentes.",
      items: [
        {
          q: "¿La terapia centrada en la persona es lo mismo que no ayudar a alguien a mejorar?",
          a: "No. La terapia centrada en la persona sigue enseñando técnicas y trabajando la evitación. Lo que cambia es quién fija el objetivo: la persona y el logopeda acuerdan qué significa progresar, y la fluidez no es la respuesta automática.",
        },
        {
          q: "¿UpSpeech solo funciona para enfoques centrados en la persona?",
          a: "No. UpSpeech apoya el plan que crea el logopeda. La app ofrece lo que el terapeuta asigna, que puede incluir técnicas de moldeamiento de la fluidez, técnicas de modificación o trabajo centrado en la confianza.",
        },
        {
          q: "¿Qué técnicas se usan en la terapia de la tartamudez centrada en la persona?",
          a: "La tartamudez voluntaria, la identificación y desensibilización, y las técnicas de pull-out (salir de forma controlada de un momento de tartamudez) son comunes. Muchos logopedas combinan estas con trabajo de moldeamiento de la fluidez según los objetivos de cada persona.",
        },
        {
          q: "¿Dónde puedo aprender más?",
          a: "STAMMA (the British Stammering Association), la Stuttering Foundation y el American Institute for Stuttering publican guías accesibles sobre enfoques centrados en la persona y de tartamudez positiva.",
        },
      ],
    },
    closing: {
      headline: "Trabaja con un logopeda que entienda tus objetivos.",
      bodyPrefix:
        "UpSpeech se utiliza a través de logopedas. Si diriges una consulta y quieres usarlo con tus pacientes, puedes ",
      bodyLink: "solicitar acceso aquí",
      bodySuffix: ".",
    },
  },
  reducingDocumentationTime: {
    seoTitle: "Cómo los logopedas reducen el tiempo en notas de sesión",
    seoDescription:
      "Una guía práctica para logopedas sobre cómo reducir el tiempo de documentación en logopedia, con borradores estructurados que apoyan el juicio clínico.",
    intro: {
      eyebrow: "Para logopedas",
      headlineLine1: "Las notas empiezan",
      headlineLine2: "ya escritas.",
      body: "La documentación es parte de una buena práctica clínica, pero no debería comprimir el tiempo dedicado al trabajo en sí. Esta página cubre formas prácticas en que los logopedas reducen el tiempo dedicado a las notas de sesión en logopedia, incluyendo dónde encajan los borradores estructurados.",
    },
    sections: [
      {
        heading: "El problema de la página en blanco",
        body: "Después de una sesión, sabes lo que ocurrió. Escribirlo es la parte que lleva tiempo, porque empiezas desde una página vacía con el razonamiento clínico ya hecho. Con una agenda llena eso se acumula, y suele salir del tiempo de preparación o del final de la jornada.",
      },
      {
        heading: "Borradores estructurados que revisas y editas",
        body: "Una forma de abordarlo es un borrador generado a partir de los propios datos de la sesión, que recoge qué practicó el paciente y cómo avanzó. Editas lo que haga falta y lo firmas. El juicio clínico sigue siendo tuyo en todo momento.",
      },
      {
        heading: "Qué debe incluir una buena nota de logopedia",
        body: "Una nota de sesión útil cubre típicamente la técnica practicada, el rendimiento del paciente en relación con sus objetivos, observaciones sobre la evitación o la confianza, y los próximos pasos. Las plantillas para estos elementos hacen la redacción más rápida, con o sin asistencia de IA.",
      },
      {
        heading: "Lo que hace UpSpeech",
        body: "UpSpeech recoge datos estructurados de la práctica entre sesiones, incluyendo qué ejercicios completó el paciente y dónde tuvo dificultades. Esos datos alimentan un borrador de nota de sesión. Nada llega al paciente sin que el terapeuta lo revise y lo firme.",
      },
    ],
    faq: {
      eyebrow: "Preguntas",
      headline: "Preguntas frecuentes de logopedas.",
      items: [
        {
          q: "¿Cuánto tiempo pueden ahorrar de forma realista los logopedas en documentación?",
          a: "Depende de tu flujo de trabajo actual y del tiempo que dedicas a las notas. Un borrador te quita la página en blanco, que suele ser la parte más lenta de escribir una nota. Cuánto ahorra varía según la complejidad de la sesión y de cuánto haya que retocar el borrador.",
        },
        {
          q: "¿La redacción de notas con asistencia de IA reemplaza la observación clínica?",
          a: "No. El borrador de la nota se genera a partir de los datos de la sesión. Los juicios que el terapeuta hace en la consulta son lo que el terapeuta añade.",
        },
        {
          q: "¿Es clínicamente apropiado usar notas redactadas por IA?",
          a: "Los borradores de notas son apropiados cuando el terapeuta revisa y firma cada nota antes de que entre en la historia clínica del paciente. Consulta las orientaciones de tu colegio profesional sobre IA en la documentación clínica.",
        },
        {
          q: "¿Cómo recopila UpSpeech los datos con los que se construye el borrador?",
          a: "Se alimenta de dos fuentes. La práctica entre sesiones aporta datos de finalización y rendimiento desde la app. La grabación de la sesión se transcribe, y el borrador del informe se genera a partir de esa transcripción. Cuando finalizas el informe, el archivo de audio se elimina. La transcripción y el informe se conservan como parte de la historia clínica. El terapeuta lo ve todo antes de que se firme ninguna nota.",
        },
      ],
    },
    closing: {
      headline:
        "Deja que UpSpeech redacte las notas para que te centres en la sesión.",
      bodyPrefix:
        "UpSpeech trabaja con logopedas que quieren práctica estructurada entre sesiones y notas redactadas por IA. ",
      bodyLink: "Solicita acceso aquí",
      bodySuffix: " para ver si se adapta a tu consulta.",
    },
  },
  forSlps: {
    seoTitle: "Para logopedas",
    seoDescription:
      "UpSpeech da a los pacientes práctica estructurada entre sesiones. Tú defines en qué trabajan y ves cómo ha ido antes de la siguiente cita.",
    intro: {
      eyebrow: "Para logopedas",
      headlineLine1: "Más terapia entre sesiones.",
      headlineLine2: "Y todo lo diriges tú.",
      body: "UpSpeech da a tus pacientes práctica guiada que realmente hacen entre consultas, con las técnicas que tú elijas. Sabrás cómo ha ido la semana del paciente antes de que entre por la puerta.",
      photoAlt:
        "Una logopeda en su escritorio, revisando la grabación de un paciente en el portátil",
    },
    documentation: {
      eyebrow: "Documentación",
      headline: "Notas de sesión, redactadas para que las revises.",
      body: "Tras una sesión, UpSpeech redacta el informe. Lo editas y lo firmas, sin empezar desde una página vacía.",
      screenshotAlt:
        "Vista del terapeuta en UpSpeech mostrando un informe de sesión redactado por IA, listo para revisar.",
    },
    betweenSessions: {
      eyebrow: "Entre sesiones",
      headline: "Asigna práctica. Ve lo que pasó.",
      steps: [
        {
          title: "Defines el plan",
          copy: "Eliges las técnicas y ejercicios de cada paciente, construidos en torno a tus objetivos terapéuticos.",
        },
        {
          title: "El paciente practica en la app",
          copy: "Unos minutos tranquilos al día de práctica guiada, con la técnica que definiste.",
        },
        {
          title: "Ves el progreso",
          copy: "Rachas, regularidad de la práctica y tendencias llegan hasta ti entre consultas.",
        },
      ],
    },
    personCentered: {
      eyebrow: "Nuestro enfoque",
      headline: "Diseñado para animar.",
      body: "La app está pensada en torno a la confianza y a ser escuchado. La práctica está diseñada para animar en lugar de corregir.",
      photoAlt:
        "Una logopeda hablando con un niño en una sala de consulta, con su madre sentada justo detrás de él",
    },
    faq: {
      eyebrow: "Preguntas de profesionales",
      headline: "Preguntas frecuentes de logopedas.",
      items: [
        {
          q: "¿UpSpeech escribe mis informes por mí?",
          a: "Redacta un borrador de informe estructurado a partir de la sesión para que lo revises y edites, y te ahorra el trabajo de la página en blanco.",
        },
        {
          q: "¿Qué hacen mis pacientes?",
          a: "Practican las técnicas que asignas, en sesiones diarias cortas, y su progreso llega hasta ti entre consultas.",
        },
        {
          q: "¿Sustituye a la terapia?",
          a: "No. UpSpeech funciona a través de tu clínica y se usa junto con tus sesiones, no en lugar de ellas.",
        },
      ],
    },
    closing: {
      headline: "Incorpora UpSpeech a tu consulta.",
      bodyPrefix: "UpSpeech funciona a través de tu clínica. ",
      bodyLink: "Solicita acceso aquí",
      bodySuffix: ".",
    },
  },
  consent: {
    title: "Cookies en este sitio",
    description:
      "Usamos cookies para mejorar tu experiencia y analizar el uso del sitio. Al aceptar, consientes el uso de cookies de análisis. Puedes rechazarlas si lo prefieres.",
    learnMore: "Más información sobre las cookies",
    decline: "Rechazar",
    accept: "Aceptar",
  },
  notFound: {
    seoTitle: "Página no encontrada",
    eyebrow: "Error 404",
    title: "Esta página se tomó una pausa.",
    body: "La página que buscas se movió o nunca existió. Vamos a ayudarte a retomar el camino.",
    backHome: "Volver al inicio",
  },
};
