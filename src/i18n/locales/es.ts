import type { Dictionary } from "./en";

// REVIEW NEEDED: nav/footer/localeSwitcher strings are new translations drafted
// for this localization work. The techniquesIndex/techniquePage strings are
// lifted from the existing per-page es literals already shipped on the site.
export const es: Dictionary = {
  nav: {
    howItWorks: "Cómo funciona",
    features: "Funcionalidades",
    whyUs: "Por qué UpSpeech",
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
    subtitle: "Para qué sirve cada una, y cómo practicarla",
    seoDescription:
      "Técnicas de logopedia para la tartamudez, cada una con qué es, para qué sirve y cómo practicarla. Incluye moldeamiento de la fluidez, modificación de la tartamudez y enfoques cognitivos.",
    featured: "Destacado",
    mainCategories: "Familias de técnicas",
    standalone: "Técnicas que no pertenecen a una familia",
    viewDetails: "Leer la técnica",
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
    practicalDescription: "Qué es",
    objective: "Para qué sirve",
    howToPractice: "Cómo practicarla",
    relatedTechniques: "Se practican con esta",
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
      traceLabel: "Una grabación de alguien hablando, con las pausas incluidas",
      requestAccess: "Solicitar acceso anticipado",
      seeHowItWorks: "Ver la semana de un paciente",
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
    pause: {
      ariaLabel: "El paso de la semana del paciente al día del clínico",
      line: "Ahora, al otro lado de la mesa.",
      traceLabel: "Una grabación de alguien hablando, con las pausas incluidas",
    },
    day: {
      howToName:
        "Cómo una sesión de logopedia se convierte en un registro escrito",
      eyebrow: "Un martes",
      headline: "La mayor parte del trabajo no es la sesión.",
      body: "Decenas de terapeutas nos dijeron lo mismo: horas preparando, horas redactando informes y, dentro de la sesión, tiempo perdido tomando notas. Este es ese día con UpSpeech.",
      before: {
        time: "08:40 · Antes de la primera cita",
        headline: "Ya tienes el contexto.",
        body: "El paciente ha completado su incorporación en la app. Lees dónde está antes de que se siente, en vez de gastar los primeros diez minutos preguntando.",
        photoAlt:
          "Una logopeda en su escritorio entre citas, con el portátil cerrado delante, mirando por la ventana",
      },
      assessment: {
        time: "09:15 · La evaluación",
        headline: "Sales con el informe escrito.",
        body: "Graba la evaluación y el informe queda redactado en cuanto te levantas. Lo corriges y lo firmas. No empiezas desde una página en blanco.",
        detailAlt:
          "Un informe de sesión generado, encabezado con el nombre del paciente, la fecha y el estado Listo",
      },
      session: {
        time: "11:30 · En sesión",
        headline: "Las notas te cuestan el niño.",
        body: "Cada minuto que pasas escribiendo es un minuto que él pasa en otra parte. Graba la sesión y las notas te esperan cuando termine.",
        cost: {
          label: "Tomando notas",
          caption:
            "Tu atención está en el papel. La suya se fue a la ventana hace rato.",
          photoAlt:
            "Una logopeda escribiendo en un portapapeles sobre el regazo mientras el niño a su lado se ha girado hacia la ventana, con la barbilla apoyada en la mano",
        },
        instead: {
          label: "Manos libres",
          caption: "Nada que apuntar. Os estáis mirando y es él quien habla.",
          photoAlt:
            "La misma logopeda inclinada hacia el niño, con las dos manos abiertas y vacías, sin ningún portapapeles, mirándose mientras él habla",
        },
      },
      plan: {
        time: "14:00 · Después de la sesión",
        headline: "El plan se va a casa con ellos.",
        body: "Asignas los ejercicios una vez. Practican entre citas y cada intento vuelve para que lo revises antes de la siguiente.",
        detailAlt:
          "Un itinerario de aprendizaje asignado, mostrando el progreso por sus pasos, con el paso actual marcado",
      },
      close: {
        time: "17:30 · El final del día",
        headline: "Te acuerdas de todos.",
        body: "Seis pacientes, uno detrás de otro. Por la tarde el detalle ya se ha ido. El registro no, y es de ahí que arranca la siguiente sesión.",
        screenshotAlt:
          "El panel del terapeuta, con los pacientes asignados, la actividad reciente y lo que necesita atención",
      },
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
      familyEyebrow: "Pacientes más jóvenes",
      familyAlt:
        "Un padre y su hija en la mesa del comedor, la niña hablando hacia un teléfono apoyado en un soporte mientras él está sentado a su lado, mirándola a ella y no a la pantalla",
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
        unicorn: "Startup Más Prometedora · Portugal",
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
      body: "Para logopedas, personas en terapia, familias y amigos. Sé de los primeros en probar UpSpeech.",
    },
  },
  join: {
    seoTitle: "Solicitar acceso anticipado",
    seoDescription:
      "Mira cómo ayuda UpSpeech entre sesiones de logopedia, tanto si eres logopeda como si estás en terapia, eres madre, padre o amigo. Apúntate a la lista de espera o pide una demo.",
    titleLead: "Más apoyo entre sesiones de",
    titleAccent: "logopedia.",
    lead: "Empezando por la tartamudez y los trastornos del desarrollo del lenguaje, UpSpeech ayuda a practicar en casa y a que los logopedas sigan el progreso.",
    listTitle: "Estoy aquí como",
    back: "Volver",
    example: "Ejemplo",
    joiningAs: "Te apuntas como",
    change: "Cambiar",
    found: "¡Has encontrado a {name}!",
    stat: {
      value: "86%",
      text: "de los pacientes de nuestro piloto dijeron que practican más que antes.",
    },
    devTitle: "Juegos de lenguaje para casa",
    devBody:
      "Práctica a través del juego para trastornos del desarrollo del lenguaje. La estamos construyendo con logopedas.",
    inDevelopment: "En desarrollo",
    audiences: {
      therapist: {
        label: "Logopeda o clínica",
        short: "Logopeda o clínica",
        line: "Menos papeleo. Más tiempo para tus pacientes.",
        title: "Menos papeleo. Más tiempo para tus pacientes.",
        sub: "UpSpeech te conecta con tus pacientes entre sesiones. Tú pones la práctica, ves lo que pasó en casa, y la IA prepara un borrador de los informes de sesión para que lo revises.",
        stepsTitle: "Tu semana con UpSpeech",
        stepsLead:
          "Tres momentos de una semana de ejemplo, con un paciente de ejemplo.",
        steps: [
          {
            when: "Después de la sesión",
            title: "Pones el siguiente paso",
            body: "Elige el próximo ejercicio del Itinerario de Aprendizaje. Espera a tu paciente en la app, con cada cuánto practicar.",
          },
          {
            when: "Entre sesiones",
            title: "Ves la práctica",
            body: "Hoy, la práctica en casa no se ve hasta la siguiente sesión. Con UpSpeech, cada grabación está ahí para revisarla, y el trabajo administrativo ocupa menos de la semana.",
          },
          {
            when: "Antes de la siguiente sesión",
            title: "El informe empieza como borrador",
            body: "UpSpeech prepara el informe a partir de la sesión y de la práctica de la semana. Corriges lo que esté mal y lo firmas. El criterio clínico sigue siendo tuyo.",
          },
        ],
        perks: [
          "Sé de los primeros logopedas en usarlo",
          "Ayúdanos a darle forma",
        ],
      },
      patient: {
        label: "Persona en logopedia",
        short: "Persona en logopedia",
        line: "Práctica y apoyo entre sesiones.",
        title: "Una práctica que sigue entre sesiones.",
        sub: "Tu logopeda pone ejercicios cortos en la app. Practicas unos minutos en casa con un compañero, y tu logopeda escucha cómo fue antes de la siguiente sesión. Empezamos por la tartamudez.",
        stepsTitle: "Una tarde entre sesiones",
        stepsLead: "Cómo es una tarde de práctica, y la mañana siguiente.",
        steps: [
          {
            when: "18:30",
            title: "Un recordatorio suave",
            body: "A la hora que elegiste. Sin rachas que mantener, solo el paso de hoy.",
          },
          {
            when: "18:32",
            title: "Cinco minutos tranquilos",
            body: "La técnica que trabajaste en sesión, a tu ritmo. Nada puntúa lo fluido que sonaste. Prueba a marcarlo como hecho.",
          },
          {
            when: "A la mañana siguiente",
            title: "Ana lo ve",
            body: "Tu logopeda escucha la grabación y deja una nota antes de la siguiente sesión.",
          },
        ],
        perks: [
          "Sigue cómo crece UpSpeech",
          "Recursos útiles para practicar en casa",
        ],
      },
      family: {
        label: "Madre, padre o cuidador",
        short: "Madre, padre o cuidador",
        line: "Sigue la práctica de tu hijo en casa.",
        title: "Ayuda en casa, al ritmo de la logopeda.",
        sub: "Mira lo que la logopeda de tu hijo puso para la semana, practica unos minutos con él y la logopeda también lo verá. Ayudas sin tener que ser su logopeda.",
        stepsTitle: "La semana de Leo",
        stepsLead: "Una semana de ejemplo de una familia, de lunes a domingo.",
        steps: [
          {
            when: "Lunes",
            title: "El paso de la semana, en palabras sencillas",
            body: "El plan de la logopeda aparece en tu móvil, con qué hacer y cuánto tiempo.",
          },
          {
            when: "Durante la semana",
            title: "Unos minutos juntos",
            body: "Práctica corta en casa, una actividad compartida algunos días, y un día de descanso que también forma parte del plan.",
          },
          {
            when: "Viernes",
            title: "Una nota de Ana",
            body: "La logopeda ha escuchado las grabaciones de la semana antes de la siguiente sesión.",
          },
        ],
        perks: ["Sigue cómo crece UpSpeech", "Recursos para familias"],
      },
      friend: {
        label: "Amigo o simpatizante",
        short: "Amigo o simpatizante",
        line: "Pásale UpSpeech a quien le pueda servir.",
        title: "¿Conoces a alguien que necesita más apoyo?",
        sub: "La logopedia suele ser una hora a la semana. UpSpeech ayuda con el resto de la semana. Consigue un enlace para compartir, sin registrarte. Nunca te pedimos su contacto.",
        stepsTitle: "Por qué importa",
        stepsLead:
          "Una semana de logopedia, sin UpSpeech y con UpSpeech, y cómo puedes ayudar.",
        steps: [
          {
            when: "El hueco",
            title:
              "Una semana entre sesiones es mucho tiempo para practicar solo.",
            body: "Una sesión, y luego seis días por su cuenta hasta la siguiente.",
          },
          {
            when: "En casa",
            title:
              "Con UpSpeech, la práctica ocurre unos minutos casi todos los días.",
            body: "Ejercicios cortos que pone su logopeda, con un compañero al lado. La logopeda escucha cada uno.",
          },
          {
            when: "Tu parte",
            title: "Le mandas un enlace.",
            body: "Toca abajo para conseguir un enlace y pasarlo por cualquier chat. Sin registrarte. Esa persona decide si lo abre, y nunca te pedimos su contacto.",
          },
        ],
        perks: ["Un enlace personal para compartir", "Novedades de UpSpeech"],
      },
    },
    mocks: {
      notifApp: "UpSpeech · ahora",
      notifTitle: "Hora de la práctica de hoy",
      notifBody: "5 minutos con lumo. Te la puso Ana.",
      exerciseTitle: "Inicio suave",
      exerciseMeta: "5 min · de Ana",
      exerciseSteps: [
        "Lee los tres pasos",
        "Practica a tu ritmo",
        "Márcalo como hecho",
      ],
      markDone: "Marcar como hecho",
      doneToday: "Hecho por hoy",
      anaYours: "Ana, tu logopeda",
      anaSaw: "Vio la práctica de anoche",
      anaNote:
        "Muy bien, tres tardes esta semana. Seguimos desde aquí el jueves.",
      days: ["L", "M", "X", "J", "V", "S", "D"],
      assignTitle: "Inicio suave",
      assignMeta: "Itinerario de Aprendizaje · Paso 3 de 8",
      assigned: "Asignado",
      assignFreq: "5 minutos, casi todos los días",
      assignUntil: "Hasta la sesión del jueves",
      weekToday: "Tu semana hoy",
      weekWith: "Con UpSpeech",
      weekdays: ["L", "M", "X", "J", "V"],
      legendSessions: "Sesiones",
      legendAdmin: "Administración e informes",
      legendPractice: "Práctica en casa que puedes ver",
      reportTitle: "Informe de sesión",
      draft: "Borrador",
      reportBody:
        "Practicó el inicio suave 3 tardes. Grabaciones adjuntas para revisar.",
      edit: "Editar",
      sign: "Firmar",
      planTitle: "Cuentos para dormir, despacio",
      planMeta: "De Ana · esta semana",
      planNote:
        "Lee un cuento corto con Leo. Deja que marque el ritmo y haz una pausa en cada punto.",
      leoDays: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      legendPracticed: "Practicó",
      legendTogether: "Juntos",
      legendSession: "Sesión",
      legendRest: "Descanso",
      anaLeo: "Ana, logopeda de Leo",
      anaFriday: "Viernes, después de revisar la semana",
      anaLeoNote:
        "Qué buena semana. Prueba otra vez el cuento de dormir el domingo.",
      stripDays: ["L", "M", "X", "J", "V", "S", "L"],
      legendAlone: "Por su cuenta",
      legendHome: "Práctica en casa",
      sentMessage:
        "Vi esto en Web Summit y me acordé de ti. Puede ayudar entre sesiones.",
      previewTitle: "Más apoyo entre sesiones de logopedia",
      sent: "Enviado",
    },
    actions: {
      requestDemo: "Pedir una demo",
      earlyAccess: "Pedir acceso anticipado",
      join: "Apuntarme a la lista de espera",
      getLink: "Conseguir mi enlace",
    },
    form: {
      titles: {
        early: "Acceso anticipado para logopedas",
        demo: "Pedir una demo",
        pilot: "Explorar un piloto clínico",
        waitlist: "Apúntate a la lista de espera",
        friend: "Pásalo",
      },
      leads: {
        early: "Empieza a usar UpSpeech antes de que abra para todos.",
        demoStand:
          "15 minutos en el stand hoy, o una videollamada después de la cumbre.",
        demoCall: "Una videollamada de 15 minutos, cuando te venga bien.",
        pilot: "Prueba UpSpeech con tu equipo y algunos pacientes.",
        waitlist:
          "Entérate de los primeros cuando abra UpSpeech, y recibe recursos útiles mientras tanto.",
        friend:
          "Copia el enlace o compártelo directamente en un chat. Es todo lo que tienes que hacer.",
      },
      requestLabel: "¿Qué te gustaría?",
      requests: {
        early: "Acceso anticipado",
        demo: "Una demo",
        pilot: "Un piloto",
      },
      whenLabel: "¿Cuándo te va bien?",
      whenStand: "En el stand",
      whenStandSub: "Hoy, 15 minutos",
      whenCall: "Una videollamada",
      whenCallSub: "Después de la cumbre",
      slotsLabel: "Hora de hoy",
      slotsHint:
        "Elige una hora que te venga bien y te la confirmamos por correo.",
      teamLabel: "¿Cuántos logopedas participarían?",
      teams: {
        solo: "Solo yo",
        small: "2 a 5",
        medium: "6 a 15",
        large: "Más de 15",
      },
      email: "Correo",
      workEmail: "Correo del trabajo",
      emailPlaceholder: "tu@correo.com",
      workEmailPlaceholder: "tu@clinica.es",
      name: "Nombre",
      clinic: "Clínica",
      optional: "(opcional)",
      consent: "Quiero recibir novedades por correo",
      consentOptional: "Quiero recibir también novedades por correo",
      consentHint:
        "Novedades de UpSpeech y lecturas útiles sobre logopedia. Puedes darte de baja cuando quieras.",
      requestHint:
        "Solo usamos estos datos para organizar tu {request}. También quedas en la lista de acceso anticipado.",
      requestNouns: { demo: "demo", pilot: "participación en el piloto" },
      linkTitle: "Tu enlace",
      linkBody:
        "Abre UpSpeech para la persona a la que se lo mandes. Nunca te pedimos su contacto.",
      copy: "Copiar",
      copied: "Copiado",
      share: "Compartir enlace",
      shareText: "Más apoyo entre sesiones de logopedia.",
      updatesTitle: "¿Quieres novedades tú también?",
      updatesHint: "Tu enlace funciona igual.",
      optionalTag: "Opcional",
      submit: {
        early: "Pedir acceso anticipado",
        demoStand: "Pedir las {time} en el stand",
        demoStandNoTime: "Pedir una hora en el stand",
        demoCall: "Pedir una llamada",
        pilot: "Enviar solicitud de piloto",
        waitlist: "Apuntarme a la lista de espera",
        friend: "Quiero novedades",
      },
      saving: "Guardando tu sitio",
      sending: "Enviando",
      slowTitle: "Todavía guardando tu sitio.",
      slowBody:
        "La conexión parece lenta. Deja esta página abierta y terminará sola.",
      errorsOne: "Falta corregir una cosa. Está marcada abajo.",
      errorsMany: "Faltan corregir {count} cosas. Están marcadas abajo.",
      errorEmailEmpty: "Añade tu correo.",
      errorEmailInvalid:
        "Ese correo parece incompleto. Revisa la parte después de la @.",
      errorConsent:
        "Marca esta opción para apuntarte. Puedes darte de baja cuando quieras.",
      errorSlot: "Elige una hora para la demo.",
      errorSend:
        "No hemos podido guardarlo ahora. Revisa la conexión y vuelve a intentarlo.",
    },
    done: {
      signedUp: "Apuntado",
      requestReceived: "Solicitud recibida",
      onTheList: "En la lista",
      titles: {
        waitlist: "Ya estás en la lista",
        demoStand: "Tu solicitud de demo ha llegado",
        demoCall: "Solicitud de demo enviada",
        pilot: "Solicitud de piloto enviada",
      },
      lineWaitlist: "El correo de bienvenida va de camino a {email}.",
      lineRequest: "También quedas en la lista de acceso anticipado.",
      lineFriend:
        "Recibirás nuestras novedades por correo. Tu enlace sigue funcionando.",
      upsellTitle: "Míralo con tus propios pacientes",
      upsellBody: "Reserva 15 minutos en el stand. Tu correo ya está puesto.",
      upsellBodyCall:
        "Una videollamada de 15 minutos. Tu correo ya está puesto.",
      upsellCta: "Pedir una demo",
      tailorTitle: "Ayúdanos a enviarte lo que te interesa",
      country: "¿Dónde estás?",
      countryOther: "Otro país",
      interests: {
        stutter: "Tartamudez",
        dld: "Trastornos del desarrollo del lenguaje",
        unsure: "Aún no lo sé",
      },
      interestsHint: "Elige las que quieras.",
      save: "Guardar",
      saved: "Guardado, gracias.",
      nextTitle: "Lo que pasa ahora",
      nextStand: "Te confirmamos la hora en el stand",
      nextStandSub:
        "Pediste las {time} de hoy. Te escribimos para confirmarlo.",
      nextCall: "Te escribimos para fijar la llamada",
      nextPilot: "Te escribimos sobre el piloto",
      nextContactSub:
        "Alguien del equipo te escribirá en unos pocos días laborables.",
      nextWelcome: "Un correo de bienvenida, ahora mismo",
      nextWelcomeSub: "Enviado a {email}.",
      nextWeek: "Otro correo una semana después",
      nextWeekSub: {
        therapist: "Con lo que incluye el acceso anticipado.",
        patient: "Con recursos útiles para practicar en casa.",
        family: "Con recursos para familias.",
        friend: "Con más sobre lo que hace UpSpeech.",
      },
      nextMonthly: "Luego, una novedad al mes",
      nextMonthlySub:
        "Date de baja cuando quieras, con un clic en cualquier correo.",
      restart: "Volver al inicio",
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
      childScreenshots: [
        "Pantalla de la app móvil de UpSpeech que un padre o una madre usa para hacer la práctica del día con su hijo",
        "Pantalla de práctica de la app móvil de UpSpeech que ve un niño más pequeño, con una palabra que decir y un botón de grabación",
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
        "Una logopeda de pie en una sala de consulta, sosteniendo una tableta y mirando hacia un lado",
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
      headline: "Cada intento recibe tu respuesta.",
      body: "El paciente graba en casa y tú escuchas la grabación. El comentario que lee lo escribiste tú.",
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
