import type { Dictionary } from "./en";

// REVIEW NEEDED: nav/footer/localeSwitcher strings are new translations drafted
// for this localization work. The techniquesIndex/techniquePage strings are
// lifted from the existing per-page pt literals already shipped on the site.
export const pt: Dictionary = {
  nav: {
    howItWorks: "Como funciona",
    features: "Funcionalidades",
    whyUs: "Porquê a UpSpeech",
    techniques: "Técnicas",
    forPatients: "Para pacientes",
    requestAccess: "Pedir acesso antecipado",
    skipToContent: "Saltar para o conteúdo",
    logoScrollTop: "UpSpeech, subir ao topo",
    logoGoHome: "UpSpeech, ir para a página inicial",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  footer: {
    tagline: "Guiar vozes com cuidado e tecnologia",
    product: "Produto",
    legal: "Legal",
    company: "Empresa",
    forPatients: "Para pacientes",
    techniques: "Técnicas",
    support: "Apoio",
    privacy: "Política de Privacidade",
    terms: "Termos de Serviço",
    cookies: "Política de Cookies",
    linkedin: "LinkedIn",
    contact: "Contactar-nos",
    rights: "Todos os direitos reservados.",
    appStoreAlt: "Descarregar na App Store",
    appStoreAriaLabel: "Descarregar a UpSpeech na App Store",
    playStoreAlt: "Disponível no Google Play",
    playStoreAriaLabel: "Obter a UpSpeech no Google Play",
  },
  localeSwitcher: {
    label: "Idioma",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  techniquesIndex: {
    title: "Técnicas de Terapia da Fala",
    subtitle: "Explore técnicas estabelecidas para a terapia da gaguez",
    seoDescription:
      "Conheça técnicas estabelecidas de terapia da fala para a gaguez, incluindo modelagem da fluência, modificação da gaguez e abordagens cognitivas.",
    featured: "Destaque",
    mainCategories: "Categorias de Técnicas",
    standalone: "Técnicas Independentes",
    viewDetails: "Ver Detalhes",
    techniques: "técnicas",
    loading: "A carregar técnicas...",
    error: "Erro ao Carregar Técnicas",
    tryAgain:
      "Erro ao carregar técnicas. Por favor, tente novamente mais tarde.",
  },
  techniquePage: {
    loading: "A carregar técnica...",
    error: "Erro ao Carregar Técnica",
    notFound: "Técnica não encontrada",
    backToAll: "Voltar a todas as técnicas",
    practicalDescription: "Descrição Prática",
    objective: "Objetivo",
    howToPractice: "Como Praticar",
    relatedTechniques: "Técnicas Relacionadas",
  },
  home: {
    seoDescription:
      "Apoio contínuo para a terapia da gaguez. Prática estruturada entre sessões, relatórios de sessão redigidos por IA. Os terapeutas estão sempre no controlo.",
    hero: {
      eyebrow: "Para clínicas com serviços de gaguez",
      headlineLine1: "A clínica",
      headlineLine2: "que está aberta",
      headlineLine3: "quando você não está.",
      body: "Prática estruturada entre sessões. Relatórios de sessão redigidos automaticamente. Os terapeutas mantêm a palavra final.",
      requestAccess: "Pedir acesso antecipado",
      seeHowItWorks: "Ver como funciona",
      videoAriaLabel:
        "Demonstração do produto UpSpeech: um terapeuta atribui um plano personalizado, o paciente pratica em casa, o terapeuta acompanha o progresso num painel, grava uma sessão, o relatório é redigido e os clínicos anotam a gravação",
      posterAlt:
        "Demonstração do produto UpSpeech: o plano de prática personalizado de um terapeuta",
      playAriaLabel: "Reproduzir a demonstração do produto UpSpeech",
    },
    credibility: {
      eyebrow: "Parceiros e reconhecimento",
    },
    gap: {
      eyebrow: "A semana do paciente",
      days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      headlineToday: "A semana de um paciente, tal como é hoje.",
      headlineWithPrefix: "A semana de um paciente,",
      headlineWithBrand: "com a UpSpeech.",
      traditional: "Tradicional",
      traditionalCadence: "1 sessão · 6 dias sem apoio",
      withUpspeech: "Com a UpSpeech",
      fullCadence: "1 sessão · Todos os dias, cuidado contínuo",
      partialPrefix: "1 sessão · ",
      partialSuffix: " / 7 dias de cuidado contínuo",
      session: "Sessão",
      practice: "Prática",
      plusPractice: "+ Prática",
      footerPrefix: "Apoio contínuo para o paciente,",
      footerEmphasis: "sem mais trabalho para o clínico.",
    },
    therapist: {
      eyebrow: "Na consulta",
      headlineLine1: "A sessão pertence ao clínico.",
      headlineLine2: "A plataforma trata do resto.",
      body: "Relatórios redigidos automaticamente a partir de cada sessão. Atividade do paciente visível fora da consulta. Os terapeutas chegam preparados, com o contexto de que precisam.",
      imageAlt:
        "Vista do terapeuta na UpSpeech do progresso de um paciente: estatísticas de atividade, marco do percurso de aprendizagem e passo atual",
      points: [
        {
          label: "Preparação da sessão",
          copy: "Entre na consulta sabendo o que o paciente praticou desde a última visita.",
        },
        {
          label: "Relatórios redigidos",
          copy: "Os dados da sessão tornam-se um rascunho de relatório estruturado para o terapeuta rever e aprovar.",
        },
        {
          label: "Validação do terapeuta",
          copy: "Cada relatório e plano de tratamento é um rascunho até o terapeuta o rever e assinar.",
        },
      ],
    },
    patient: {
      eyebrow: "Fora da consulta",
      headlineLine1: "Prática estruturada entre visitas,",
      headlineLine2: "orientada pelo terapeuta do início ao fim.",
      body: "Cada paciente recebe um plano do seu clínico, com exercícios adequados à sua fase de tratamento. Exercícios guiados apoiam a prática entre visitas.",
      imageAlt:
        "Painel do paciente na UpSpeech com exercícios de prática diários e progresso",
      points: [
        {
          label: "Um plano, definido pelo terapeuta",
          copy: "Cada passo é selecionado pelo clínico. Os pacientes veem apenas o que devem praticar.",
        },
        {
          label: "Cada tentativa, registada",
          copy: "Cada tentativa de prática é gravada e organizada para o terapeuta rever e ajustar.",
        },
        {
          label: "Progresso, registado",
          copy: "Sequências e progresso ao longo do tempo mantêm os pacientes envolvidos. O terapeuta vê a atividade por detrás deles.",
        },
      ],
    },
    mobile: {
      eyebrow: "No bolso do paciente",
      headline: "A prática acontece na app, entre sessões.",
      body: "Os pacientes seguem o plano definido pelo terapeuta, praticam com exercícios guiados e fazem o seu registo a partir do telemóvel. O terapeuta acompanha.",
      screenshots: [
        "App móvel UpSpeech a mostrar o percurso de aprendizagem com os passos definidos pelo terapeuta",
        "Ecrã de prática da app móvel UpSpeech com exercícios guiados de gaguez",
        "Ecrã inicial da app móvel UpSpeech a mostrar o exercício do dia do paciente",
      ],
    },
    cycle: {
      eyebrow: "O ciclo",
      headlinePrefix: "Cada passo",
      headlineEmphasis: "revisto por um clínico.",
      clinician: "Clínico",
      ai: "IA",
      clinicianStepPrefix: "Clínico · passo ",
      aiStepPrefix: "IA · passo ",
      stepPrefix: "Passo ",
      stepSuffix: " / 06",
      nodes: [
        {
          verb: "redige",
          title: "A IA redige o relatório da sessão.",
          body: "A gravação e as notas da sessão tornam-se um rascunho estruturado.",
        },
        {
          verb: "aprova",
          title: "O clínico lê, edita, aprova.",
          body: "Nada sai da plataforma sem revisão do terapeuta. As correções alimentam o modelo e melhoram o rascunho seguinte.",
        },
        {
          verb: "estrutura",
          title: "A IA estrutura o plano de prática.",
          body: "Com base nos dados da sessão e na fase do paciente, a UpSpeech propõe exercícios diários para o terapeuta aprovar.",
        },
        {
          verb: "calibra",
          title: "O clínico calibra-o.",
          body: "O terapeuta aprova, ajusta a dificuldade e troca técnicas. Nenhum plano é atribuído sem revisão do terapeuta.",
        },
        {
          verb: "ouve",
          title: "A IA ajuda entre sessões.",
          body: "Cada tentativa de prática é captada e organizada, construindo um registo de atividade entre sessões.",
        },
        {
          verb: "decide",
          title: "O clínico decide o que vem a seguir.",
          body: "O sinal agregado aparece no painel do terapeuta. Este seleciona o próximo protocolo com os dados em mãos.",
        },
      ],
    },
    interstitial: {
      headlineLine1: "Apoio contínuo,",
      headlineLine2: "a começar pela sua clínica.",
      requestAccess: "Pedir acesso antecipado",
    },
    gallery: {
      eyebrow: "Dentro da plataforma",
      headlineLine1: "Ferramentas específicas.",
      headlineLine2: "Para clínicos e investigadores.",
      intro:
        "A plataforma é construída em torno de um percurso de aprendizagem estruturado, desde a identificação de momentos de gaguez até à generalização no mundo real.",
      forClinicians: "Para clínicos",
      forResearchers: "Para investigadores",
      annotationEyebrow: "Ferramenta de anotação",
      annotationTitle:
        "A ferramenta que clínicos e investigadores usam para etiquetar momentos de gaguez.",
      annotationCopy:
        "Etiquetagem fotograma a fotograma de momentos de gaguez: comportamento nuclear, comportamentos secundários, nível de tensão. Taxonomia padrão. A mesma ferramenta constrói o nosso conjunto de dados e apoia parcerias de investigação.",
      annotationImageAlt:
        "Ferramenta de anotação UpSpeech com forma de onda de áudio, revisão de vídeo e etiquetagem fotograma a fotograma por terapeutas da fala",
      features: [
        {
          label: "Percurso de aprendizagem estruturado",
          title: "Um plano construído a partir de marcos e passos.",
          copy: "O clínico monta o percurso de cada paciente a partir de técnicas estabelecidas e desbloqueia cada passo à medida que o paciente está pronto.",
          imageAlt:
            "Percurso de aprendizagem UpSpeech a mostrar os marcos e passos de terapia de um paciente com o estado de conclusão",
        },
        {
          label: "Cenários de prática",
          title: "Ensaio com um parceiro de conversa virtual.",
          copy: "Os pacientes ensaiam conversas difíceis com um interlocutor virtual. O clínico define o cenário e a dificuldade.",
          imageAlt:
            "Interface de cenário de prática UpSpeech a mostrar o ensaio de uma entrevista de emprego com objetivos e videochamada",
        },
        {
          label: "Autorrelatos periódicos",
          title: "Autorrelatos que o terapeuta revê.",
          copy: "Um breve autorrelato de gaguez é captado a intervalos, para que o terapeuta possa rever como o paciente descreve a sua experiência ao longo da terapia.",
          imageAlt:
            "Gráfico UpSpeech das respostas de gaguez autorrelatadas de um paciente ao longo de várias semanas",
        },
      ],
    },
    engine: {
      eyebrow: "UpSpeech Labs",
      headlineLine1: "Treinada com",
      headlineLine2: "dados anotados por clínicos.",
      body: "Construímos uma ferramenta de anotação internamente, usada por terapeutas da fala em exercício para etiquetar disfluências, tensões e bloqueios fotograma a fotograma. O conjunto de dados é etiquetado por especialistas desde o início.",
      videoAriaLabel:
        "Ferramenta de anotação UpSpeech usada por clínicos para etiquetar disfluências fotograma a fotograma",
      tags: [
        "Bloqueio",
        "Prolongamento",
        "Repetição",
        "Tensão",
        "Olhar de lado",
        "Retenção",
      ],
    },
    foundations: {
      eyebrow: "Fundamentos",
      headlineLine1: "Prática clínica e engenharia de IA,",
      headlineLine2: "na mesma equipa.",
      body: "Clínicos e engenheiros trabalham lado a lado. As decisões de produto são revistas pelos terapeutas da fala em exercício que usam a plataforma com pacientes.",
      partnersLabel: "Parceiros · Apoiantes · Reconhecimento",
      partnersTagline: "A construir ao lado de quem conhece o trabalho.",
      partnerContext: {
        speechcare: "Parceiro de codesenvolvimento",
        elevenlabs: "Bolsa de infraestrutura de IA",
        lispolis: "Programa de aceleração",
        unicorn: "Startup Mais Promissora · Lisboa",
        innocatalyst: "Programa de inovação em saúde",
        healthqup: "Programa de aceleração em saúde",
      },
    },
    security: {
      eyebrow: "Segurança e dados",
      headline: "Dados dos pacientes, tratados com cuidado.",
      body: "As clínicas confiam-nos gravações sensíveis. Tratamos esses dados como uma clínica o faria, e o terapeuta tem sempre a palavra final sobre o que a IA produz.",
      points: [
        {
          title: "Isolamento por organização",
          copy: "Os dados de cada clínica são mantidos separados por organização. Uma organização nunca pode ver os pacientes ou gravações de outra.",
        },
        {
          title: "Encriptados em trânsito e em repouso",
          copy: "Os dados circulam por TLS, e as gravações e bases de dados são encriptadas enquanto armazenadas.",
        },
        {
          title: "Alojados na UE",
          copy: "Os nossos servidores e armazenamento de ficheiros estão na União Europeia, e tratamos os dados pessoais ao abrigo do RGPD.",
        },
        {
          title: "Gravações privadas",
          copy: "As gravações são acedidas através de ligações assinadas e de curta duração, nunca a partir de um local público.",
        },
      ],
      readPrivacy: "Ler a nossa Política de Privacidade",
    },
    cta: {
      headline: "Pedir acesso antecipado.",
      body: "Estamos a trabalhar com um conjunto de clínicas e gostaríamos de ouvir outras que trabalham na área da gaguez. Conte-nos sobre a sua prática e entraremos em contacto.",
      nameLabel: "Nome Completo *",
      namePlaceholder: "Introduza o seu nome",
      nameError: "Por favor, introduza o seu nome.",
      emailLabel: "Endereço de Email *",
      emailPlaceholder: "o-seu@email.com",
      emailError: "Por favor, introduza o seu endereço de email.",
      roleLabel: "Função *",
      rolePlaceholder: "Escolha a sua função",
      roleError: "Por favor, escolha a sua função.",
      roleSpeechTherapist: "Terapeuta da Fala",
      roleClinicDirector: "Diretor de Clínica",
      rolePracticeOwner: "Proprietário de Consultório",
      roleOther: "Outro",
      clinicSizeLabel: "Dimensão da Clínica (Opcional)",
      clinicSizePlaceholder: "Escolha a dimensão da clínica",
      clinicSizeSolo: "Consultório Individual",
      clinicSizeSmall: "2-5 Terapeutas",
      clinicSizeMedium: "6-15 Terapeutas",
      clinicSizeLarge: "15+ Terapeutas",
      submit: "Pedir acesso antecipado",
      submitting: "A enviar...",
      requiredFieldsTitle: "Por favor, preencha todos os campos obrigatórios",
      successTitle: "Está na lista.",
      successDescription:
        "Obrigado, entraremos em contacto. Verifique o seu email para uma confirmação.",
      errorTitle: "Algo correu mal",
      errorDefault: "Por favor, tente novamente mais tarde.",
      errorNetwork:
        "Erro de rede. Por favor, verifique a sua ligação e tente novamente.",
      errorSubmission:
        "Ocorreu um problema com o envio do formulário. Por favor, tente novamente.",
    },
  },
  forPatients: {
    seoTitle: "Para Pacientes",
    seoDescription:
      "Como os pacientes praticam terapia da fala entre sessões com a UpSpeech, orientados pelo seu terapeuta da fala.",
    intro: {
      eyebrow: "Para pacientes",
      headlineLine1: "A sua prática,",
      headlineLine2: "entre sessões.",
      body: "A UpSpeech é como continua a praticar o trabalho que faz com o seu terapeuta da fala, todos os dias, não apenas na consulta. O seu terapeuta define o plano; você pratica na app; ele acompanha o seu progresso.",
    },
    howItWorks: {
      eyebrow: "Como funciona para si",
      headline: "Orientado pelo seu terapeuta, a cada passo.",
      steps: [
        {
          title: "O seu terapeuta define o seu plano",
          copy: "O seu terapeuta da fala escolhe os exercícios e objetivos que correspondem à sua terapia e à sua fase de tratamento.",
        },
        {
          title: "Você pratica na app",
          copy: "Faça os exercícios guiados entre sessões, ao seu ritmo, a partir do telemóvel. Vê apenas o que o seu terapeuta atribuiu.",
        },
        {
          title: "O seu terapeuta vê o seu progresso",
          copy: "Ele acompanha o que praticou e ajusta o plano à medida que avança, para que cada sessão construa sobre a anterior.",
        },
      ],
    },
    app: {
      eyebrow: "A app",
      headline: "O seu plano, no seu bolso.",
      body: "Abra a app para ver o exercício de hoje, fazê-lo e manter uma rotina constante entre sessões.",
      screenshots: [
        "Ecrã inicial da app móvel UpSpeech a mostrar o exercício do dia do paciente",
        "App móvel UpSpeech a mostrar o percurso de aprendizagem com os passos definidos pelo terapeuta",
        "Ecrã de prática da app móvel UpSpeech com exercícios guiados de gaguez",
      ],
    },
    faq: {
      eyebrow: "Perguntas",
      headline: "Perguntas frequentes dos pacientes.",
      items: [
        {
          q: "Preciso de um terapeuta da fala para usar a UpSpeech?",
          a: "Sim. A UpSpeech é usada em conjunto com um terapeuta da fala que define o seu plano e revê o seu progresso. Não substitui a terapia.",
        },
        {
          q: "O que vou praticar?",
          a: "O seu terapeuta escolhe exercícios para si com base nos seus objetivos e na sua fase de terapia. Verá apenas o que ele atribuiu.",
        },
        {
          q: "Com que frequência devo praticar?",
          a: "O seu terapeuta orienta a frequência da prática. A app facilita manter uma rotina constante entre sessões.",
        },
        {
          q: "A minha informação é privada?",
          a: "Sim. Os seus dados são encriptados e mantidos privados no âmbito do seu cuidado. Consulte a Política de Privacidade para mais detalhes.",
        },
        {
          q: "Como obtenho a UpSpeech?",
          a: "Pergunte ao seu terapeuta da fala se usa a UpSpeech. As clínicas pedem acesso através deste site.",
        },
      ],
    },
    closing: {
      headline: "Pergunte ao seu terapeuta da fala sobre a UpSpeech.",
      bodyPrefix:
        "A UpSpeech funciona através da sua clínica. Se gere um consultório e quer usá-la com os seus pacientes, pode ",
      bodyLink: "pedir acesso aqui",
      bodySuffix: ".",
    },
    storeAppStoreAlt: "Descarregar na App Store",
    storeAppStoreAriaLabel: "Descarregar a UpSpeech na App Store",
    storePlayAlt: "Disponível no Google Play",
    storePlayAriaLabel: "Obter a UpSpeech no Google Play",
  },
};
