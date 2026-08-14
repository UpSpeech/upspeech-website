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
    tagline: "Terapia que continúa entre sesiones",
    product: "Producto",
    legal: "Legal",
    company: "Empresa",
    forPatients: "Para pacientes",
    forSlps: "Para logopedas",
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
    stutterPositive: "Tartamudez positiva",
    reducingDocumentationTime: "Tiempo de documentación",
  },
  localeSwitcher: {
    label: "Idioma",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  techniquesIndex: {
    title: "Técnicas de logopedia",
    subtitle: "Explora técnicas establecidas para la terapia de la tartamudez",
    seoDescription:
      "Descubre técnicas establecidas de logopedia para la tartamudez, incluyendo modelado de la fluidez, modificación de la tartamudez y enfoques cognitivos.",
    featured: "Destacado",
    mainCategories: "Categorías de técnicas",
    standalone: "Técnicas independientes",
    viewDetails: "Ver detalles",
    techniques: "técnicas",
    loading: "Cargando técnicas...",
    error: "Error al cargar técnicas",
    tryAgain:
      "Error al cargar técnicas. Por favor, inténtalo de nuevo más tarde.",
  },
  techniquePage: {
    loading: "Cargando técnica...",
    error: "Error al cargar técnica",
    notFound: "Técnica no encontrada",
    backToAll: "Volver a todas las técnicas",
    practicalDescription: "Descripción práctica",
    objective: "Objetivo",
    howToPractice: "Cómo practicar",
    relatedTechniques: "Técnicas relacionadas",
  },
  home: {
    seoDescription:
      "Terapia del habla que continúa entre sesiones. Los pacientes practican siguiendo el plan que fijó su terapeuta, los informes de sesión se redactan para que el terapeuta los revise, y el terapeuta lo aprueba todo.",
    hero: {
      eyebrow: "Para clínicas de logopedia",
      headlineLine1: "La terapia",
      headlineLine2: "que sigue",
      headlineLine3: "entre sesiones.",
      body: "Los pacientes practican entre sesiones siguiendo el plan que fijó su terapeuta. UpSpeech redacta los informes de sesión y el terapeuta los aprueba.",
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
      fullCadence: "1 sesión · Todos los días, atención continua",
      partialPrefix: "1 sesión · ",
      partialSuffix: " / 7 días de atención continua",
      session: "Sesión",
      practice: "Práctica",
      plusPractice: "+ Práctica",
      footerPrefix: "El paciente mantiene su apoyo cada día,",
      footerEmphasis: "y no supone más trabajo para el clínico.",
    },
    therapist: {
      eyebrow: "En la consulta",
      headlineLine1: "El clínico dirige la sesión.",
      headlineLine2: "UpSpeech se encarga del resto.",
      body: "Cada sesión se convierte en un borrador de informe. Puedes ver cómo han practicado tus pacientes entre citas, así que llegas sabiendo ya en qué punto están.",
      imageAlt:
        "Vista del terapeuta en UpSpeech del progreso de un paciente: estadísticas de actividad, hito de la ruta de aprendizaje y paso actual",
      points: [
        {
          label: "Preparación de la sesión",
          copy: "Entra en la consulta sabiendo qué ha practicado el paciente desde la última visita.",
        },
        {
          label: "Informes redactados",
          copy: "Los datos de cada sesión se convierten en un borrador de informe que revisas y apruebas.",
        },
        {
          label: "Validación del terapeuta",
          copy: "Cada informe y plan de tratamiento es un borrador hasta que lo revisas y lo firmas.",
        },
      ],
    },
    patient: {
      eyebrow: "Fuera de la consulta",
      headlineLine1: "Práctica estructurada entre visitas,",
      headlineLine2: "guiada por el terapeuta en todo momento.",
      body: "Cada paciente recibe un plan de su clínico, con ejercicios adaptados a su fase de tratamiento. Practican entre visitas, guiados paso a paso.",
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
      body: "Los pacientes siguen desde el móvil el plan que fijó su terapeuta y lo mantienen entre sesiones. Su terapeuta los acompaña.",
      screenshots: [
        "App móvil de UpSpeech mostrando la ruta de aprendizaje con los pasos que fijó el terapeuta",
        "Pantalla de práctica de la app móvil de UpSpeech con ejercicios guiados de práctica",
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
          title: "El clínico lo edita y lo aprueba.",
          body: "Nada sale de la plataforma sin revisión del terapeuta. Esas correcciones entrenan el modelo y mejoran el siguiente borrador.",
        },
        {
          verb: "estructura",
          title: "La IA estructura el plan de práctica.",
          body: "A partir de los datos de la sesión y la fase del paciente, UpSpeech propone ejercicios diarios para que el terapeuta los apruebe.",
        },
        {
          verb: "calibra",
          title: "El clínico lo calibra.",
          body: "El terapeuta ajusta la dificultad e intercambia técnicas cuando hace falta. Ningún plan se asigna sin su revisión.",
        },
        {
          verb: "escucha",
          title: "La IA ayuda entre sesiones.",
          body: "Cada intento de práctica se captura y se organiza en un registro que el terapeuta puede consultar más tarde.",
        },
        {
          verb: "decide",
          title: "El clínico decide qué sigue.",
          body: "El panel reúne toda la actividad, así que el terapeuta elige el siguiente paso con el cuadro completo delante.",
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
        "La plataforma se construye en torno a una ruta de aprendizaje estructurada, desde identificar momentos de tartamudez hasta llevar el trabajo a conversaciones reales.",
      forClinicians: "Para clínicos",
      forResearchers: "Para investigadores",
      annotationEyebrow: "Herramienta de anotación",
      annotationTitle:
        "La herramienta que clínicos e investigadores usan para etiquetar momentos de tartamudez.",
      annotationCopy:
        "Los clínicos etiquetan momentos de tartamudez fotograma a fotograma con una taxonomía estándar, desde las conductas principales hasta las secundarias y el nivel de tensión. La misma herramienta construye nuestro conjunto de datos y respalda nuestras colaboraciones de investigación.",
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
      body: "Construimos nuestra propia herramienta de anotación, y logopedas en ejercicio la usan para etiquetar disfluencias y bloqueos fotograma a fotograma. Cada etiqueta del conjunto de datos viene de un clínico.",
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
      ],
      readPrivacy: "Lee nuestra Política de Privacidad",
    },
    cta: {
      headline: "Solicitar acceso anticipado.",
      body: "Estamos trabajando con un grupo de clínicas y nos gustaría saber de otras que trabajan en el ámbito de la logopedia. Cuéntanos sobre tu consulta y nos pondremos en contacto.",
      nameLabel: "Nombre completo *",
      namePlaceholder: "Introduce tu nombre",
      nameError: "Por favor, introduce tu nombre.",
      emailLabel: "Correo electrónico *",
      emailPlaceholder: "tu@email.com",
      emailError: "Por favor, introduce tu correo electrónico.",
      roleLabel: "Cargo *",
      rolePlaceholder: "Elige tu cargo",
      roleError: "Por favor, elige tu cargo.",
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
      requiredFieldsTitle: "Por favor, rellena todos los campos obligatorios",
      successTitle: "Estás en la lista.",
      successDescription:
        "Gracias, nos pondremos en contacto. Te hemos enviado una confirmación por correo.",
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
      body: "UpSpeech es la forma de seguir practicando entre citas el trabajo que haces con tu logopeda. Tu terapeuta define el plan, tú practicas en la app y tu terapeuta ve cómo va todo.",
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
      body: "Cada día la app te muestra tu ejercicio, así que mantener la rutina entre sesiones es fácil.",
      screenshots: [
        "Pantalla de inicio de la app móvil de UpSpeech mostrando el ejercicio del día del paciente",
        "App móvil de UpSpeech mostrando la ruta de aprendizaje con los pasos que fijó el terapeuta",
        "Pantalla de práctica de la app móvil de UpSpeech con ejercicios guiados de práctica",
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
  stutterPositive: {
    seoTitle: "¿Qué Significa Tartamudez Positiva?",
    seoDescription:
      "Una guía en lenguaje sencillo sobre la terapia de tartamudez positiva: qué significa, por qué la fluidez no es el único objetivo, y cómo UpSpeech refleja este enfoque.",
    intro: {
      eyebrow: "Filosofía",
      headlineLine1: "¿Qué significa",
      headlineLine2: "tartamudez positiva?",
      body: "La tartamudez positiva es una forma de pensar sobre la tartamudez que prioriza la confianza y la comunicación. Apoya a las personas que tartamudean para que se expresen en sus propios términos, con objetivos definidos por la persona y no por una idea fija de cómo debería sonar el habla.",
    },
    sections: [
      {
        heading: "La fluidez no es el único objetivo",
        body: "La terapia del habla tradicional a veces trata la fluidez como la definición del éxito. La tartamudez positiva amplía esa perspectiva. Algunas personas que tartamudean quieren un habla más fluida, y técnicas como la tartamudez voluntaria o el habla prolongada pueden ayudar. Para otras, reducir la evitación y ganar confianza es lo que más importa. Tartamudez positiva significa que los objetivos vienen de la persona, no de una norma externa.",
      },
      {
        heading: "Ser escuchado en tus propios términos",
        body: "Las personas que tartamudean a menudo se enfrentan a más que la disfluencia: evitación, anticipación y el esfuerzo de gestionar las reacciones de los demás. La terapia de tartamudez positiva aborda estas cuestiones junto con la práctica de técnicas, de modo que una buena sesión se mide por si la persona dijo lo que quería decir y se sintió escuchada al hacerlo.",
      },
      {
        heading: "Cómo UpSpeech refleja este enfoque",
        body: "UpSpeech apoya el enfoque que elija el logopeda. La ruta de aprendizaje y los ejercicios los establece el clínico; la app apoya la práctica entre sesiones. Si el objetivo es reducir la evitación, el terapeuta lo incluye en el plan. Si el objetivo es practicar la tartamudez voluntaria, la app también lo apoya. La fluidez es aquí uno de los objetivos posibles, nunca el que se da por hecho.",
      },
      {
        heading: "Una nota sobre el lenguaje",
        body: "Esta página utiliza 'personas que tartamudean' y 'persona que tartamudea' en todo el texto. El lenguaje centrado en la persona es el estándar aquí, a menos que un individuo prefiera otro. El objetivo es describir a las personas con respeto, con las palabras que ellas eligen para sí mismas.",
      },
    ],
    faq: {
      eyebrow: "Preguntas",
      headline: "Preguntas frecuentes.",
      items: [
        {
          q: "¿La tartamudez positiva es lo mismo que no ayudar a alguien a mejorar?",
          a: "No. La terapia de tartamudez positiva sigue enseñando técnicas, abordando la evitación y apoyando el progreso. Significa que esos objetivos son moldeados por la persona, no por la suposición de que la fluidez es siempre el objetivo correcto.",
        },
        {
          q: "¿UpSpeech solo funciona para enfoques de tartamudez positiva?",
          a: "No. UpSpeech apoya el plan que crea el logopeda. La app ofrece lo que el clínico asigna, que puede incluir técnicas de modelado de la fluidez, técnicas de modificación o trabajo centrado en la confianza.",
        },
        {
          q: "¿Qué técnicas se usan en la terapia de tartamudez positiva?",
          a: "La tartamudez voluntaria, la identificación y desensibilización, y las técnicas de pull-out (salir de forma controlada de un momento de tartamudeo) son comunes en los enfoques de tartamudez positiva. Muchos clínicos combinan estas con trabajo de modelado de la fluidez según los objetivos del individuo.",
        },
        {
          q: "¿Dónde puedo aprender más?",
          a: "La Stuttering Foundation, la British Stammering Association y el American Institute for Stuttering publican guías accesibles sobre enfoques de tartamudez positiva y centrados en la persona.",
        },
      ],
    },
    closing: {
      headline: "Trabaja con un clínico que entienda tus objetivos.",
      bodyPrefix:
        "UpSpeech se utiliza a través de logopedas. Si diriges una consulta y quieres usarlo con tus pacientes, puedes ",
      bodyLink: "solicitar acceso aquí",
      bodySuffix: ".",
    },
  },
  reducingDocumentationTime: {
    seoTitle: "Cómo los Logopedas Reducen el Tiempo en Notas de Sesión",
    seoDescription:
      "Una guía práctica para logopedas sobre cómo reducir el tiempo de documentación en la terapia del habla, con borradores estructurados que apoyan el juicio clínico.",
    intro: {
      eyebrow: "Para logopedas",
      headlineLine1: "Las notas empiezan",
      headlineLine2: "ya escritas.",
      body: "La documentación es parte de una buena práctica clínica, pero no debería comprimir el tiempo dedicado al trabajo en sí. Esta página cubre formas prácticas en que los logopedas reducen el tiempo dedicado a las notas de sesión en la terapia del habla, incluyendo dónde encajan los borradores estructurados.",
    },
    sections: [
      {
        heading: "El problema de la página en blanco",
        body: "Después de una sesión, sabes lo que ocurrió. Escribirlo lleva más tiempo del necesario. El obstáculo es la página en blanco, porque el razonamiento clínico ya está hecho. Muchos logopedas señalan que la documentación es la tarea administrativa que más tiende a consumir el tiempo de preparación y a alargar la jornada. El razonamiento ya está hecho; lo que cuesta es escribirlo.",
      },
      {
        heading: "Borradores estructurados que revisa y edita",
        body: "Una forma de abordarla es un borrador estructurado generado a partir de los datos de la sesión: qué practicó el paciente, cómo fue y qué observaste. Ahora reaccionas a algo en lugar de enfrentarte a una página vacía. Editas lo que haga falta y lo firmas, y el juicio clínico sigue siendo tuyo de principio a fin.",
      },
      {
        heading: "Qué debe incluir una buena nota de terapia del habla",
        body: "Una nota de sesión útil cubre típicamente la técnica practicada, el rendimiento del paciente en relación con sus objetivos, observaciones sobre la evitación o la confianza, y los próximos pasos. Las plantillas estructuradas para estos elementos hacen la redacción más rápida, con o sin asistencia de IA. Capturar los mismos campos cada vez hace que cada nota se escriba más rápido.",
      },
      {
        heading: "Lo que hace UpSpeech",
        body: "UpSpeech captura datos estructurados de la práctica entre sesiones: qué ejercicios completó el paciente, cómo rindió y dónde tuvo dificultades. Esos datos alimentan un borrador de nota de sesión que el terapeuta revisa antes de firmar. Cada nota necesita la revisión y la firma del terapeuta antes de usarse.",
      },
    ],
    faq: {
      eyebrow: "Preguntas",
      headline: "Preguntas frecuentes de clínicos.",
      items: [
        {
          q: "¿Cuánto tiempo pueden ahorrar de forma realista los logopedas en documentación?",
          a: "Depende de tu flujo de trabajo actual y del tiempo que dedicas a las notas. Un borrador estructurado suele eliminar la parte más difícil, la página en blanco, y reduce el tiempo total de las notas. Los resultados individuales varían según la complejidad de la sesión y la cantidad de ediciones que necesite el borrador.",
        },
        {
          q: "¿La redacción de notas con asistencia de IA reemplaza la observación clínica?",
          a: "No. Una nota borrador se basa en datos estructurados de la sesión. Los juicios que el terapeuta hace en la consulta son lo que el terapeuta añade. El borrador se encarga de la redacción; la lectura clínica es tuya.",
        },
        {
          q: "¿Es clínicamente apropiado usar notas redactadas por IA?",
          a: "Los borradores de notas son apropiados cuando el terapeuta revisa y firma cada nota antes de utilizarla. Ningún borrador debe entrar en el expediente del paciente sin revisión del clínico. Consulta las orientaciones de tu organismo profesional local sobre IA en la documentación clínica.",
        },
        {
          q: "¿Cómo recopila UpSpeech los datos que informan el borrador?",
          a: "Los pacientes practican los ejercicios asignados en la app entre sesiones. La app captura datos de finalización y rendimiento. Esos datos estructurados, no la transcripción de audio, son los que informan el borrador de la nota. El terapeuta los ve todos antes de firmar cualquier nota.",
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
      "UpSpeech da a los pacientes práctica estructurada entre sesiones y redacta las notas de sesión para que las revises, con progreso que puedes ver.",
    intro: {
      eyebrow: "Para logopedas",
      headlineLine1: "Más terapia entre sesiones.",
      headlineLine2: "Menos tiempo en documentación.",
      body: "UpSpeech da a tus pacientes práctica guiada que realmente hacen entre consultas, y redacta las notas de sesión para que las revises, para que entres en la siguiente sesión ya sabiendo cómo fue la semana.",
    },
    documentation: {
      eyebrow: "Documentación",
      headline: "Notas de sesión, redactadas para que las revises.",
      body: "Tras una sesión, UpSpeech redacta el informe. Lo editas y lo apruebas, sin empezar desde una página vacía.",
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
          copy: "Rachas, puntuaciones de técnica y tendencias llegan hasta ti, para que la siguiente sesión empiece más avanzada.",
        },
      ],
    },
    stutterPositive: {
      eyebrow: "Nuestro enfoque",
      headline: "Tartamudez positiva, desde el diseño.",
      body: "La app se construye en torno a la confianza y a ser escuchado. La práctica es siempre motivadora y nunca hace que el paciente se sienta juzgado por su forma de hablar.",
    },
    faq: {
      eyebrow: "Preguntas de clínicos",
      headline: "Preguntas frecuentes de logopedas.",
      items: [
        {
          q: "¿UpSpeech escribe mis informes por mí?",
          a: "Redacta un borrador de informe estructurado a partir de la sesión para que lo revises y edites. Mantienes la responsabilidad clínica; eliminas el trabajo de la página en blanco.",
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
};
