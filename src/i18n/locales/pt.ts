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
    mobileMenuLabel: "Navegação",
  },
  footer: {
    tagline: "Guiar vozes com cuidado e tecnologia",
    product: "Produto",
    legal: "Legal",
    company: "Empresa",
    forPatients: "Para pacientes",
    forSlps: "Para terapeutas da fala",
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
    stutterPositive: "Gaguez positiva",
    reducingDocumentationTime: "Tempo de documentação",
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
      "Apoio contínuo para a terapia da fala. Prática estruturada entre sessões, relatórios de sessão redigidos por IA. Os terapeutas estão sempre no controlo.",
    hero: {
      eyebrow: "Para clínicas de terapia da fala",
      headlineLine1: "A clínica",
      headlineLine2: "que continua aberta",
      headlineLine3: "mesmo quando fecha.",
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
          copy: "Sequências e progresso ao longo do tempo mantêm os pacientes envolvidos. O terapeuta vê a atividade por trás desses números.",
        },
      ],
    },
    mobile: {
      eyebrow: "No bolso do paciente",
      headline: "A prática acontece na app, entre sessões.",
      body: "Os pacientes seguem o plano definido pelo terapeuta, praticam com exercícios guiados e fazem o seu registo a partir do telemóvel. O terapeuta acompanha.",
      screenshots: [
        "App móvel UpSpeech a mostrar o percurso de aprendizagem com os passos definidos pelo terapeuta",
        "Ecrã de prática da app móvel UpSpeech com exercícios guiados de prática",
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
          body: "Nada sai da plataforma sem revisão do terapeuta. Essas correções treinam o modelo e melhoram o rascunho seguinte.",
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
        "Etiquetagem fotograma a fotograma de momentos de gaguez: comportamento principal, comportamentos secundários, nível de tensão. Taxonomia padrão. A mesma ferramenta constrói o nosso conjunto de dados e apoia parcerias de investigação.",
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
      body: "Estamos a trabalhar com um conjunto de clínicas e gostaríamos de ouvir outras que trabalham na área da terapia da fala. Conte-nos sobre a sua prática e entraremos em contacto.",
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
      body: "A UpSpeech é como continua a praticar o trabalho que faz com o seu terapeuta da fala, todos os dias, não apenas na consulta. O seu terapeuta define o plano; pratica na app; o seu terapeuta acompanha o seu progresso.",
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
          title: "Pratica na app",
          copy: "Faça os exercícios guiados entre sessões, ao seu ritmo, a partir do telemóvel. Vê apenas o que o seu terapeuta atribuiu.",
        },
        {
          title: "O seu terapeuta vê o seu progresso",
          copy: "Acompanha o que praticou e ajusta o plano à medida que avança, para que cada sessão dê continuidade à anterior.",
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
        "Ecrã de prática da app móvel UpSpeech com exercícios guiados de prática",
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
          a: "O seu terapeuta escolhe exercícios para si com base nos seus objetivos e na sua fase de terapia. Verá apenas o que o seu terapeuta atribuiu.",
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
  stutterPositive: {
    seoTitle: "O Que Significa Gaguez Positiva?",
    seoDescription:
      "Um guia em linguagem simples sobre terapia de gaguez positiva: o que significa, porque a fluência não é o único objetivo, e como a UpSpeech reflete esta abordagem.",
    intro: {
      eyebrow: "Filosofia",
      headlineLine1: "O que significa",
      headlineLine2: "gaguez positiva?",
      body: "Gaguez positiva é uma forma de pensar sobre a gaguez que coloca a confiança e a comunicação em primeiro lugar, não a eliminação da disfluência. Significa apoiar as pessoas que gaguejam para se fazerem ouvir nos seus próprios termos, sem perseguir um padrão de fala que pode nunca parecer natural.",
    },
    sections: [
      {
        heading: "A fluência não é o único objetivo",
        body: "A terapia da fala tradicional trata por vezes a fluência como definição de sucesso. A abordagem de gaguez positiva alarga esse horizonte. Algumas pessoas que gaguejam querem uma fala mais fluente, e técnicas como a gaguez voluntária ou a fala prolongada podem ajudar. Para outras, reduzir a evitação e ganhar confiança é o que mais importa. Gaguez positiva significa que os objetivos vêm da pessoa, não de uma norma externa.",
      },
      {
        heading: "Ser ouvido, não soar de uma certa forma",
        body: "As pessoas que gaguejam lidam frequentemente com mais do que disfluência: evitação, antecipação e o esforço exaustivo de gerir as reações dos outros. A terapia de gaguez positiva aborda estas questões a par de qualquer prática de técnicas. A medida de uma boa sessão não é quantas vezes a pessoa gaguejou. É se comunicou o que pretendia e se sentiu confiante ao fazê-lo.",
      },
      {
        heading: "Como a UpSpeech reflete esta abordagem",
        body: "A UpSpeech apoia qualquer abordagem que o terapeuta da fala escolha. O percurso de aprendizagem e os exercícios são definidos pelo clínico; a app apoia a prática entre sessões. Se o objetivo é reduzir a evitação, o terapeuta inclui isso no plano. Se o objetivo é a prática de gaguez voluntária, a app apoia isso também. A plataforma não assume que a fluência é o destino.",
      },
      {
        heading: "Uma nota sobre linguagem",
        body: "Esta página usa 'pessoas que gaguejam' e 'pessoa que gagueja' ao longo do texto. A linguagem centrada na pessoa é o padrão aqui, a menos que um indivíduo prefira diferente. O que mais importa é que a pessoa se sinta reconhecida, não rotulada.",
      },
    ],
    faq: {
      eyebrow: "Perguntas",
      headline: "Perguntas frequentes.",
      items: [
        {
          q: "Gaguez positiva é o mesmo que não ajudar alguém a melhorar?",
          a: "Não. A terapia de gaguez positiva ainda ensina técnicas, aborda a evitação e apoia o progresso. Significa que esses objetivos são moldados pela pessoa, não pela suposição de que a fluência é sempre o alvo certo.",
        },
        {
          q: "A UpSpeech funciona apenas para abordagens de gaguez positiva?",
          a: "Não. A UpSpeech apoia o plano que o terapeuta da fala cria. A app disponibiliza o que o clínico define, o que pode incluir técnicas de modelagem de fluência, técnicas de modificação ou trabalho focado na confiança.",
        },
        {
          q: "Que técnicas são usadas na terapia de gaguez positiva?",
          a: "A gaguez voluntária, a identificação e desensibilização, e as técnicas de pull-out são comuns nas abordagens de gaguez positiva. Muitos clínicos combinam estas com trabalho de modelagem de fluência, dependendo dos objetivos do indivíduo.",
        },
        {
          q: "Onde posso aprender mais?",
          a: "A Stuttering Foundation, a British Stammering Association e o American Institute for Stuttering publicam guias acessíveis sobre abordagens de gaguez positiva e centradas na pessoa.",
        },
      ],
    },
    closing: {
      headline: "Trabalhe com um clínico que entende os seus objetivos.",
      bodyPrefix:
        "A UpSpeech é utilizada por terapeutas da fala. Se gere um consultório e quer usá-la com os seus pacientes, pode ",
      bodyLink: "pedir acesso aqui",
      bodySuffix: ".",
    },
  },
  reducingDocumentationTime: {
    seoTitle: "Como os Terapeutas da Fala Reduzem o Tempo em Notas de Sessão",
    seoDescription:
      "Um guia prático para terapeutas da fala sobre como reduzir o tempo de documentação na terapia da fala, com rascunhos estruturados que apoiam o julgamento clínico.",
    intro: {
      eyebrow: "Para terapeutas da fala",
      headlineLine1: "Menos tempo em notas,",
      headlineLine2: "mais tempo na terapia.",
      body: "A documentação faz parte de uma boa prática clínica, mas não deve comprimir o tempo dedicado ao trabalho em si. Esta página aborda formas práticas de os terapeutas da fala reduzirem o tempo gasto em notas de sessão na terapia da fala, incluindo onde os rascunhos estruturados se encaixam.",
    },
    sections: [
      {
        heading: "O problema da página em branco",
        body: "Após uma sessão, sabe o que aconteceu. Escrever demora mais do que deveria. A página em branco é o obstáculo, não o seu conhecimento. Muitos terapeutas referem que a documentação é o encargo administrativo que mais provavelmente comprime o tempo de preparação, prolonga o horário de trabalho ou atrasa as notas de cuidados. É um problema estrutural, não uma lacuna de competências.",
      },
      {
        heading: "Rascunhos estruturados que revê e edita",
        body: "Uma forma de resolver a página em branco é um rascunho estruturado gerado a partir dos dados da sessão: o que o paciente praticou, como progrediu e o que o terapeuta observou. Um rascunho dá-lhe algo a que reagir em vez de criar de raiz. Lê-o, ajusta o que precisa de ajuste e assina. O julgamento clínico é sempre seu; o rascunho trata do esqueleto.",
      },
      {
        heading: "O que deve constar numa boa nota de terapia da fala",
        body: "Uma nota de sessão útil cobre tipicamente a técnica praticada, o desempenho do paciente em relação aos seus objetivos, observações sobre evitação ou confiança, e os próximos passos. Modelos estruturados para estes elementos tornam a redação mais rápida, com ou sem assistência de IA. Quanto mais consistentemente capturar os mesmos dados, mais fácil se torna a nota.",
      },
      {
        heading: "O que a UpSpeech faz",
        body: "A UpSpeech captura dados estruturados da prática do paciente entre sessões: quais os exercícios que completou, como se saiu e onde teve dificuldades. Esses dados alimentam um rascunho de nota de sessão que o terapeuta revê antes de assinar. O rascunho é um ponto de partida, não um documento final. A revisão e assinatura do terapeuta são obrigatórias para cada nota.",
      },
    ],
    faq: {
      eyebrow: "Perguntas",
      headline: "Perguntas frequentes de clínicos.",
      items: [
        {
          q: "Quanto tempo podem os terapeutas poupar realisticamente na documentação?",
          a: "Depende do seu fluxo de trabalho atual e do tempo que gasta em notas. Um rascunho estruturado remove tipicamente a parte mais difícil, a página em branco, e reduz o tempo total das notas. Os resultados individuais variam conforme a complexidade da sessão e a quantidade de edições que o rascunho necessita.",
        },
        {
          q: "A redação de notas com assistência de IA substitui a observação clínica?",
          a: "Não. Uma nota de rascunho baseia-se em dados estruturados da sessão. A observação clínica, os julgamentos que o terapeuta faz durante a sessão, é o que o terapeuta acrescenta. O rascunho trata do esqueleto; o clínico fornece a especialização.",
        },
        {
          q: "É clinicamente adequado usar notas redigidas por IA?",
          a: "As notas redigidas são adequadas quando o terapeuta revê e assina cada nota antes de ser utilizada. Nenhum rascunho deve constar do processo do paciente sem revisão do clínico. Consulte as orientações do seu organismo profissional local sobre IA na documentação clínica.",
        },
        {
          q: "Como é que a UpSpeech recolhe os dados que alimentam o rascunho?",
          a: "Os pacientes praticam exercícios atribuídos na app entre sessões. A app captura dados de conclusão e desempenho. Esses dados estruturados, não a transcrição de áudio, informam o rascunho da nota. O terapeuta vê tudo antes de qualquer nota ser assinada.",
        },
      ],
    },
    closing: {
      headline:
        "Deixe a UpSpeech redigir as notas para se concentrar na sessão.",
      bodyPrefix:
        "A UpSpeech trabalha com terapeutas da fala que pretendem prática estruturada entre sessões e notas redigidas por IA. ",
      bodyLink: "Peça acesso aqui",
      bodySuffix: " para ver se se adequa à sua prática.",
    },
  },
  forSlps: {
    seoTitle: "Para terapeutas da fala",
    seoDescription:
      "A UpSpeech dá aos pacientes prática estruturada entre sessões e redige as notas de sessão para si rever, com progresso que pode acompanhar.",
    intro: {
      eyebrow: "Para terapeutas da fala",
      headlineLine1: "Mais terapia entre sessões.",
      headlineLine2: "Menos tempo em documentação.",
      body: "A UpSpeech dá aos seus pacientes prática guiada que fazem de facto entre consultas, e redige as notas de sessão para si rever, para entrar na próxima sessão já a saber como foi a semana.",
    },
    documentation: {
      eyebrow: "Documentação",
      headline: "Notas de sessão, redigidas para si rever.",
      body: "Após uma sessão, a UpSpeech transforma-a num rascunho de relatório estruturado. O clínico revê, edita e valida. Mantém a palavra clínica final; deixa de começar de uma página em branco.",
      screenshotAlt:
        "Vista do terapeuta na UpSpeech a mostrar um relatório de sessão redigido por IA, pronto para revisão.",
    },
    betweenSessions: {
      eyebrow: "Entre sessões",
      headline: "Atribua prática. Veja o que aconteceu.",
      steps: [
        {
          title: "Define o plano",
          copy: "Escolhe as técnicas e exercícios de cada paciente, construídos em torno dos seus objetivos terapêuticos.",
        },
        {
          title: "O paciente pratica na app",
          copy: "Alguns minutos calmos por dia de prática guiada, na técnica que definiu.",
        },
        {
          title: "Acompanha o progresso",
          copy: "Sequências, pontuações de técnica e tendências chegam até si, para que a próxima sessão comece mais avançada.",
        },
      ],
    },
    stutterPositive: {
      eyebrow: "A nossa abordagem",
      headline: "Positivo face à gaguez, por princípio.",
      body: "O objetivo na app é a confiança e ser ouvido, não soar de determinada forma. A prática é encorajadora, nunca corretiva de forma que envergonhe.",
    },
    faq: {
      eyebrow: "Perguntas de clínicos",
      headline: "Perguntas frequentes de terapeutas da fala.",
      items: [
        {
          q: "A UpSpeech escreve os meus relatórios por mim?",
          a: "Redige um rascunho de relatório estruturado a partir da sessão para si rever e editar. Mantém a responsabilidade clínica; elimina o trabalho da página em branco.",
        },
        {
          q: "O que fazem os meus pacientes?",
          a: "Praticam as técnicas que atribui, em sessões diárias curtas, e o seu progresso chega até si entre consultas.",
        },
        {
          q: "Substitui a terapia?",
          a: "Não. A UpSpeech funciona através da sua clínica e é usada em conjunto com as suas sessões, não em vez delas.",
        },
      ],
    },
    closing: {
      headline: "Traga a UpSpeech para a sua prática.",
      bodyPrefix: "A UpSpeech funciona através da sua clínica. ",
      bodyLink: "Peça acesso aqui",
      bodySuffix: ".",
    },
  },
  consent: {
    title: "A tua privacidade é importante",
    description:
      "Usamos cookies para melhorar a tua experiência e analisar a utilização do site. Ao aceitares, concordas com a utilização de cookies de análise. Podes recusar se preferires.",
    learnMore: "Saber mais sobre cookies",
    decline: "Recusar",
    accept: "Aceitar",
  },
};
