import type { Dictionary } from "./en";

// REVIEW NEEDED: nav/footer/localeSwitcher strings are new translations drafted
// for this localization work. The techniquesIndex/techniquePage strings are
// lifted from the existing per-page pt literals already shipped on the site.
export const pt: Dictionary = {
  nav: {
    howItWorks: "Como funciona",
    features: "Funcionalidades",
    whyUs: "Porquê a UpSpeech",
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
    tagline: "Apoio à terapia da fala, entre sessões",
    product: "Produto",
    legal: "Legal",
    company: "Empresa",
    forPatients: "Para pacientes",
    forSlps: "Para terapeutas da fala",
    support: "Suporte",
    privacy: "Política de Privacidade",
    terms: "Termos de Serviço",
    cookies: "Política de Cookies",
    linkedin: "LinkedIn",
    contact: "Contactos",
    rights: "Todos os direitos reservados.",
    appStoreAlt: "Descarregar na App Store",
    appStoreAriaLabel: "Descarregar a UpSpeech na App Store",
    playStoreAlt: "Disponível no Google Play",
    playStoreAriaLabel: "Obter a UpSpeech no Google Play",
    personCentered: "Centrada na pessoa",
    reducingDocumentationTime: "Tempo de documentação",
  },
  localeSwitcher: {
    label: "Idioma",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  medicalDisclaimer:
    "A UpSpeech é uma ferramenta de prática e de produtividade clínica para utilização por e com terapeutas da fala qualificados. Não é um dispositivo médico e não diagnostica, trata nem cura qualquer condição. O conteúdo educativo deste site não substitui o aconselhamento clínico profissional.",
  techniquesIndex: {
    title: "Técnicas de terapia da fala",
    subtitle: "Para que serve cada uma, e como praticá-la",
    seoDescription:
      "Técnicas de terapia da fala para a gaguez, cada uma com o que é, para que serve e como praticá-la. Inclui modelagem da fluência, modificação da gaguez e abordagens cognitivas.",
    featured: "Destaque",
    mainCategories: "Famílias de técnicas",
    standalone: "Técnicas que não pertencem a uma família",
    viewDetails: "Ler a técnica",
    techniques: "técnicas",
    loading: "A carregar técnicas...",
    error: "Erro ao carregar técnicas",
    tryAgain: "Erro ao carregar técnicas. Tente novamente mais tarde.",
  },
  techniquePage: {
    loading: "A carregar técnica...",
    error: "Erro ao carregar a técnica",
    notFound: "Técnica não encontrada",
    backToAll: "Voltar a todas as técnicas",
    practicalDescription: "O que é",
    objective: "Para que serve",
    howToPractice: "Como praticá-la",
    relatedTechniques: "Praticadas com esta",
  },
  home: {
    seoDescription:
      "Apoio contínuo à terapia da fala. Os pacientes praticam entre sessões segundo o plano do terapeuta, e cada tentativa volta para revisão.",
    hero: {
      photoAlt:
        "Uma mulher à mesa da cozinha, com o telemóvel à frente, a dizer um exercício em voz alta ao fim da tarde",
      eyebrow: "Para clínicas de terapia da fala",
      headlineLine1: "A sua terapia",
      headlineLine2: "continua",
      headlineLine3: "entre sessões.",
      body: "Os pacientes praticam entre sessões segundo um plano definido pelo terapeuta. Cada tentativa volta ao terapeuta, que decide o passo seguinte.",
      traceLabel: "Uma gravação de alguém a falar, com as pausas incluídas",
      requestAccess: "Pedir acesso antecipado",
      seeHowItWorks: "Ver a semana de um paciente",
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
      fullCadence: "1 sessão · Todos os dias, apoio contínuo",
      partialPrefix: "1 sessão · ",
      partialSuffix: " / 7 dias de apoio contínuo",
      session: "Sessão",
      practice: "Prática",
      plusPractice: "+ Prática",
      footerPrefix: "O paciente mantém o seu apoio todos os dias,",
      footerEmphasis: "sem acrescentar sessões à semana do clínico.",
    },
    week: {
      eyebrow: "Entre as sessões",
      headline: "A maior parte da terapia acontece quando ninguém está a ver.",
      body: "Uma hora na clínica e depois seis dias sozinho. A parte que decide se a terapia resulta é a parte que o clínico nunca vê.",
      frames: [
        {
          day: "Quinta",
          caption: "A sessão. Na sala corre tudo bem.",
          alt: "Uma terapeuta da fala a explicar algo a um paciente que escuta, sentados frente a frente numa sala simples",
        },
        {
          day: "Sábado",
          caption: "Sozinho com a folha. Sem saber se está a fazer bem.",
          alt: "Um jovem sentado sozinho à mesa em casa, com uma folha de exercícios na mão e um ar incerto",
        },
        {
          day: "Segunda",
          caption: "O telemóvel toca. Ele deixa tocar.",
          alt: "Um jovem parado no corredor a olhar para um telemóvel a tocar numa mesa de apoio, sem o atender",
        },
        {
          day: "Quinta seguinte",
          caption: "Então, como correu a semana? Ninguém sabe bem.",
          alt: "Uma terapeuta a fazer uma pergunta inicial enquanto o paciente responde com um gesto de dúvida",
        },
      ],
      traceLabel: "Seis dias sem nada registado",
    },
    pause: {
      ariaLabel: "A passagem da semana do paciente para o dia do clínico",
      line: "Agora, do outro lado da mesa.",
      traceLabel: "Uma gravação de alguém a falar, com as pausas incluídas",
    },
    day: {
      howToName:
        "Como uma sessão de terapia da fala se torna um registo escrito",
      eyebrow: "Uma terça-feira",
      headline: "A maior parte do trabalho não é a sessão.",
      body: "Dezenas de terapeutas disseram-nos o mesmo: horas a preparar, horas a escrever relatórios e, dentro da sessão, tempo perdido a tirar notas. Este é esse dia com a UpSpeech.",
      before: {
        time: "08:40 · Antes da primeira consulta",
        headline: "Já tem o contexto.",
        body: "O paciente completou o acolhimento na app. Lê onde ele está antes de se sentar, em vez de gastar os primeiros dez minutos a perguntar.",
        photoAlt:
          "Uma terapeuta da fala à secretária entre consultas, com o portátil fechado à frente, a olhar pela janela",
      },
      assessment: {
        time: "09:15 · A avaliação",
        headline: "Sai com o relatório escrito.",
        body: "Grave a avaliação e o relatório fica em rascunho no momento em que se levanta. Corrige e assina. Não começa de uma página em branco.",
        detailAlt:
          "Um relatório de sessão gerado, com o nome do paciente, a data e o estado Pronto",
      },
      session: {
        time: "11:30 · Na sessão",
        headline: "As notas custam-lhe a criança.",
        body: "Cada minuto que passa a escrever é um minuto que ela passa noutro sítio. Grave a sessão e as notas ficam à sua espera quando ela terminar.",
        cost: {
          label: "A tirar notas",
          caption:
            "A sua atenção está no papel. A dele foi para a janela há já algum tempo.",
          photoAlt:
            "Uma terapeuta da fala a escrever numa prancheta ao colo enquanto o rapaz ao lado se virou para a janela, com o queixo apoiado na mão",
        },
        instead: {
          label: "Mãos livres",
          caption:
            "Nada para apontar. Estão a olhar um para o outro e é ele quem fala.",
          photoAlt:
            "A mesma terapeuta inclinada para o rapaz, com as duas mãos abertas e vazias, sem prancheta nenhuma, os dois a olhar um para o outro enquanto ele fala",
        },
      },
      plan: {
        time: "14:00 · Depois da sessão",
        headline: "O plano vai com eles para casa.",
        body: "Atribui os exercícios uma vez. Praticam entre consultas e cada tentativa volta para si rever antes da consulta seguinte.",
        detailAlt:
          "Um percurso de aprendizagem atribuído, a mostrar o progresso pelos passos, com o passo atual assinalado",
      },
      close: {
        time: "17:30 · O fim do dia",
        headline: "Lembra-se de todos.",
        body: "Seis pacientes, um a seguir ao outro. Ao fim da tarde o detalhe desapareceu. O registo não, e é dele que parte a sessão seguinte.",
        screenshotAlt:
          "O painel do terapeuta, com os pacientes atribuídos, a atividade recente e o que precisa de atenção",
      },
    },
    mobile: {
      eyebrow: "No bolso do paciente",
      headline: "A prática acontece na app, entre sessões.",
      body: "Os pacientes seguem no telemóvel o plano definido pelo terapeuta, entre sessões, e o terapeuta consegue ver como está a correr.",
      screenshots: [
        "App móvel UpSpeech a mostrar o percurso de aprendizagem com os passos definidos pelo terapeuta",
        "Ecrã de prática da app móvel UpSpeech com exercícios guiados de prática",
        "Ecrã inicial da app móvel UpSpeech a mostrar o exercício do dia do paciente",
      ],
      familyEyebrow: "Pacientes mais novos",
      familyAlt:
        "Um pai e a filha à mesa da sala, a rapariga a falar para um telemóvel apoiado num suporte enquanto ele está sentado ao lado, a olhar para ela e não para o ecrã",
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
          title: "O clínico edita e aprova.",
          body: "Essas correções melhoram o rascunho seguinte. Qualquer conteúdo usado para treinar os nossos modelos exige o consentimento prévio do paciente.",
        },
        {
          verb: "estrutura",
          title: "A IA estrutura o plano de prática.",
          body: "Com base nos dados da sessão e na fase do paciente, a UpSpeech propõe exercícios diários para o terapeuta aprovar.",
        },
        {
          verb: "calibra",
          title: "O clínico calibra-o.",
          body: "O terapeuta ajusta a dificuldade e troca técnicas onde é preciso. Nada chega ao paciente sem que o terapeuta reveja e assine.",
        },
        {
          verb: "ouve",
          title: "A IA ajuda entre sessões.",
          body: "As tentativas ficam guardadas com a técnica, a data e a avaliação que o paciente fez do esforço.",
        },
        {
          verb: "decide",
          title: "O clínico decide o que vem a seguir.",
          body: "O painel reúne a atividade da semana. A partir daí, o clínico escolhe o passo seguinte.",
        },
      ],
    },
    interstitial: {
      headlineLine1: "Apoio contínuo,",
      headlineLine2: "a começar pela sua clínica.",
      requestAccess: "Pedir acesso antecipado",
    },
    engine: {
      eyebrow: "UpSpeech Labs",
      headlineLine1: "Treinada com",
      headlineLine2: "dados anotados por clínicos.",
      body: "Construímos a nossa própria ferramenta de anotação, usada por terapeutas da fala com prática clínica para anotar disfluências.",
      videoAriaLabel:
        "Ferramenta de anotação UpSpeech usada por clínicos para anotar disfluências",
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
      body: "Clínicos e engenheiros trabalham lado a lado. As decisões de produto são revistas pelos terapeutas da fala que usam a plataforma com pacientes.",
      logoPartnersLabel: "Parceiros",
      logoPartnerContext: {
        speechcare: "Parceiro de desenvolvimento conjunto",
        elevenlabs: "Subvenção de infraestrutura de IA",
      },
      partnersLabel: "Programas · Apoiantes · Reconhecimento",
      partnersTagline: "Com quem trabalhamos",
      partnerContext: {
        lispolis: "Programa de aceleração",
        unicorn: "Startup Mais Promissora · Portugal",
        innocatalyst: "Programa de inovação em saúde",
        healthqup: "Programa de aceleração em saúde",
      },
    },
    security: {
      eyebrow: "Segurança e dados",
      headline: "Como tratamos os dados dos pacientes.",
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
          copy: "As gravações são acedidas através de ligações assinadas e de curta duração, nunca a partir de um endereço público.",
        },
        {
          title: "Melhorar a IA, com consentimento",
          copy: "As gravações só são usadas para melhorar os nossos modelos quando o paciente deu o seu consentimento explícito. Os elementos identificativos são removidos antes disso, as gravações não saem da UpSpeech, e o paciente pode retirar o consentimento a qualquer momento.",
        },
      ],
      readPrivacy: "Ler a nossa Política de Privacidade",
    },
    cta: {
      headline: "Pedir acesso antecipado.",
      body: "Para terapeutas da fala, pessoas em terapia, famílias e amigos. Seja dos primeiros a experimentar o UpSpeech.",
    },
  },
  join: {
    seoTitle: "Pedir acesso antecipado",
    seoDescription:
      "Veja como o UpSpeech ajuda entre sessões de terapia da fala, seja terapeuta, esteja em terapia, seja pai, mãe ou amigo. Inscreva-se na lista de espera ou peça uma demonstração.",
    titleLead: "Mais apoio entre sessões de terapia da",
    titleAccent: "fala.",
    lead: "Começando pela gaguez e pelas perturbações do desenvolvimento da linguagem, o UpSpeech ajuda as pessoas a praticar em casa e os terapeutas a acompanhar o progresso.",
    listTitle: "Estou aqui como",
    back: "Voltar",
    example: "Exemplo",
    joiningAs: "Inscrição como",
    change: "Alterar",
    found: "Encontrou o {name}!",
    stat: {
      value: "86%",
      text: "dos pacientes do nosso piloto disseram que praticam mais do que antes.",
    },
    devTitle: "Jogos de linguagem para casa",
    devBody:
      "Prática através do jogo para perturbações do desenvolvimento da linguagem, definida pelo terapeuta como qualquer outro passo.",
    audiences: {
      therapist: {
        label: "Terapeuta da fala ou clínica",
        short: "Terapeuta da fala ou clínica",
        line: "Menos papelada. Mais tempo para os pacientes.",
        title: "Menos papelada. Mais tempo para os pacientes.",
        sub: "O UpSpeech liga-o aos seus pacientes entre sessões. Define a prática, vê o que aconteceu em casa, e a IA prepara um rascunho dos relatórios de sessão para rever.",
        stepsTitle: "A sua semana com o UpSpeech",
        stepsLead:
          "Três momentos de uma semana de exemplo, com um paciente de exemplo.",
        steps: [
          {
            when: "Depois da sessão",
            title: "O passo seguinte",
            body: "Escolha o próximo exercício no Percurso de Aprendizagem. Fica à espera do paciente na aplicação, com a frequência de prática.",
          },
          {
            when: "Entre sessões",
            title: "A prática, à vista",
            body: "Hoje, a prática em casa só se conhece na sessão seguinte. Com o UpSpeech, cada gravação fica disponível para ouvir, e a parte administrativa ocupa menos da semana.",
          },
          {
            when: "Antes da sessão seguinte",
            title: "O relatório começa como rascunho",
            body: "O UpSpeech prepara o relatório a partir da sessão e da prática da semana. Corrige o que estiver errado e assina. A decisão clínica continua a ser sua.",
          },
        ],
        perks: [
          "Seja dos primeiros terapeutas a usá-lo",
          "Ajude a moldá-lo com a nossa equipa",
        ],
      },
      patient: {
        label: "Pessoa em terapia da fala",
        short: "Pessoa em terapia da fala",
        line: "Prática e apoio entre sessões.",
        title: "Prática que continua entre sessões.",
        sub: "O seu terapeuta define exercícios curtos na aplicação. Pratica alguns minutos em casa com um companheiro, e o terapeuta ouve como correu antes da sessão seguinte. Começamos pela gaguez.",
        stepsTitle: "Uma noite entre sessões",
        stepsLead: "Como é uma noite de prática, e a manhã seguinte.",
        steps: [
          {
            when: "18:30",
            title: "Um lembrete suave",
            body: "À hora que escolheu. Sem sequências a manter, só o passo de hoje.",
          },
          {
            when: "18:32",
            title: "Cinco minutos tranquilos",
            body: "A técnica que trabalhou na sessão, ao seu ritmo. Nada avalia a fluência com que falou. Experimente marcar como feito.",
          },
          {
            when: "Na manhã seguinte",
            title: "A Ana vê",
            body: "A Ana ouve a gravação e deixa uma nota antes da sessão seguinte.",
          },
        ],
        perks: [
          "Acompanhe o crescimento do UpSpeech",
          "Recursos úteis para praticar em casa",
        ],
      },
      family: {
        label: "Pai, mãe ou cuidador",
        short: "Pai, mãe ou cuidador",
        line: "Acompanhe a prática do seu filho em casa.",
        title: "Ajuda em casa, em sintonia com o terapeuta.",
        sub: "Veja o que o terapeuta do seu filho definiu para a semana, pratiquem alguns minutos juntos, e saiba que o terapeuta também vê. Ajuda sem ter de ser o terapeuta.",
        stepsTitle: "A semana do Leo",
        stepsLead:
          "Uma semana de exemplo de uma família, de segunda a domingo.",
        steps: [
          {
            when: "Segunda-feira",
            title: "O passo da semana, em palavras simples",
            body: "O plano do terapeuta aparece no seu telemóvel, com o que fazer e quanto tempo.",
          },
          {
            when: "Ao longo da semana",
            title: "Alguns minutos juntos",
            body: "Prática curta em casa, uma atividade partilhada em alguns dias, e um dia de descanso que também faz parte do plano.",
          },
          {
            when: "Sexta-feira",
            title: "Uma nota da Ana",
            body: "A Ana ouviu as gravações da semana antes da sessão seguinte.",
          },
        ],
        perks: [
          "Acompanhe o crescimento do UpSpeech",
          "Recursos para famílias",
        ],
      },
      friend: {
        label: "Amigo ou apoiante",
        short: "Amigo ou apoiante",
        line: "Partilhe o UpSpeech com quem possa precisar.",
        title: "Conhece alguém que precisa de mais apoio?",
        sub: "A terapia da fala é muitas vezes uma hora por semana. O UpSpeech ajuda no resto da semana. Receba um link para partilhar, sem inscrição. Nunca pedimos o contacto da outra pessoa.",
        stepsTitle: "Porque é importante",
        stepsLead:
          "Uma semana de terapia da fala, sem o UpSpeech e com ele, e como pode ajudar.",
        steps: [
          {
            when: "O intervalo",
            title:
              "Uma semana entre sessões é muito tempo para praticar sozinho.",
            body: "Uma sessão, e depois seis dias sem apoio até à seguinte.",
          },
          {
            when: "Em casa",
            title:
              "Com o UpSpeech, a prática acontece alguns minutos na maioria dos dias.",
            body: "Exercícios curtos definidos pelo terapeuta, com um companheiro ao lado. O terapeuta ouve cada um.",
          },
          {
            when: "A sua parte",
            title: "Envie-lhe um link.",
            body: "Toque abaixo para receber um link para partilhar em qualquer conversa. Sem inscrição. A outra pessoa decide se o abre, e nunca lhe pedimos o contacto dela.",
          },
        ],
        perks: ["Um link pessoal para partilhar", "Novidades do UpSpeech"],
      },
    },
    mocks: {
      notifApp: "UpSpeech · agora",
      notifTitle: "Hora da prática de hoje",
      notifBody: "5 minutos com o lumo. A Ana definiu-a para si.",
      exerciseTitle: "Início suave",
      exerciseMeta: "5 min · da Ana",
      exerciseSteps: [
        "Leia os três passos",
        "Pratique ao seu ritmo",
        "Marque como feito",
      ],
      markDone: "Marcar como feito",
      doneToday: "Feito por hoje",
      anaYours: "Ana, a sua terapeuta",
      anaSaw: "Viu a prática de ontem à noite",
      anaNote:
        "Muito bem, três noites esta semana. Vamos continuar a partir daqui na quinta.",
      days: ["S", "T", "Q", "Q", "S", "S", "D"],
      assignTitle: "Início suave",
      assignMeta: "Percurso de Aprendizagem · Passo 3 de 8",
      assigned: "Atribuído",
      assignFreq: "5 minutos, na maioria dos dias",
      assignUntil: "Até à sessão de quinta",
      weekToday: "A sua semana hoje",
      weekWith: "Com o UpSpeech",
      weekdays: ["S", "T", "Q", "Q", "S"],
      legendSessions: "Sessões",
      legendAdmin: "Administração e relatórios",
      legendPractice: "Prática em casa que consegue ver",
      reportTitle: "Relatório de sessão",
      draft: "Rascunho",
      reportBody:
        "Praticou o início suave em 3 noites. Gravações anexadas para revisão.",
      edit: "Editar",
      sign: "Assinar",
      planTitle: "Histórias para dormir, devagar",
      planMeta: "Da Ana · esta semana",
      planNote:
        "Leiam uma história curta juntos. Deixe o Leo marcar o ritmo, e façam uma pausa nos pontos finais.",
      leoDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      legendPracticed: "Praticou",
      legendTogether: "Juntos",
      legendSession: "Sessão",
      legendRest: "Descanso",
      anaLeo: "Ana, terapeuta do Leo",
      anaFriday: "Sexta-feira, depois de rever a semana",
      anaLeoNote:
        "Que boa semana. Experimentem a história de dormir outra vez no domingo.",
      stripDays: ["S", "T", "Q", "Q", "S", "S", "S"],
      legendAlone: "Sem apoio",
      legendHome: "Prática em casa",
      sentMessages: {
        websummit:
          "Vi isto na Web Summit e lembrei-me de ti. Pode ajudar entre sessões.",
        linkedin:
          "Vi isto no LinkedIn e lembrei-me de ti. Pode ajudar entre sessões.",
        fallback: "Lembrei-me de ti quando vi isto. Pode ajudar entre sessões.",
      },
      previewTitle: "Mais apoio entre sessões de terapia da fala",
      sent: "Enviada",
    },
    actions: {
      requestDemo: "Pedir uma demonstração",
      earlyAccess: "Pedir acesso antecipado",
      join: "Entrar na lista de espera",
      getLink: "Receber o meu link",
    },
    form: {
      titles: {
        early: "Acesso antecipado para terapeutas",
        demo: "Pedir uma demonstração",
        pilot: "Explorar um piloto clínico",
        waitlist: "Entrar na lista de espera",
        friend: "Passe a palavra",
      },
      leads: {
        early: "Comece a usar o UpSpeech antes de abrir a todos.",
        demoStand:
          "15 minutos no stand hoje, ou uma videochamada depois da cimeira.",
        demoCall: "Uma videochamada de 15 minutos, à hora que lhe der jeito.",
        pilot: "Experimente o UpSpeech com a sua equipa e alguns pacientes.",
        waitlist:
          "Seja dos primeiros a saber quando o UpSpeech abrir, e receba recursos úteis até lá.",
        friend:
          "Copie o link ou partilhe-o diretamente numa conversa. É tudo o que precisa de fazer.",
      },
      requestLabel: "O que gostaria?",
      requests: {
        early: "Acesso antecipado",
        demo: "Uma demonstração",
        pilot: "Um piloto",
      },
      whenLabel: "Quando lhe dá jeito?",
      whenStand: "No stand",
      whenStandSub: "Hoje, 15 minutos",
      whenCall: "Uma videochamada",
      whenCallSub: "Depois da cimeira",
      slotsLabel: "Hora hoje",
      slotsHint: "Escolha uma hora que lhe dê jeito, e confirmamos por email.",
      teamLabel: "Quantos terapeutas participariam?",
      teams: {
        solo: "Só eu",
        small: "2 a 5",
        medium: "6 a 15",
        large: "Mais de 15",
      },
      email: "Email",
      workEmail: "Email profissional",
      emailPlaceholder: "o.seu@email.com",
      workEmailPlaceholder: "o.seu@clinica.pt",
      name: "Nome",
      clinic: "Clínica",
      optional: "(opcional)",
      consent: "Quero receber novidades por email",
      consentOptional: "Quero também receber novidades por email",
      consentHint:
        "Novidades do UpSpeech e conteúdos úteis sobre terapia da fala. Pode cancelar quando quiser.",
      requestHint:
        "Só usamos estes dados para organizar a sua {request}. Também fica na lista de acesso antecipado.",
      requestNouns: { demo: "demonstração", pilot: "participação no piloto" },
      linkTitle: "O seu link",
      linkBody:
        "Abre o UpSpeech para quem o receber. Nunca lhe pedimos o contacto dessa pessoa.",
      copy: "Copiar",
      copied: "Copiado",
      share: "Partilhar link",
      updatesTitle: "Quer receber novidades?",
      updatesHint: "O seu link funciona de qualquer forma.",
      optionalTag: "Opcional",
      submit: {
        early: "Pedir acesso antecipado",
        demoStand: "Pedir as {time} no stand",
        demoStandNoTime: "Pedir uma hora no stand",
        demoCall: "Pedir uma chamada",
        pilot: "Enviar pedido de piloto",
        waitlist: "Entrar na lista de espera",
        friend: "Quero receber novidades",
      },
      saving: "A guardar o seu lugar",
      sending: "A enviar",
      slowTitle: "Ainda a guardar o seu lugar.",
      slowBody:
        "A ligação parece lenta. Mantenha esta página aberta e o envio termina sozinho.",
      errorsOne: "Falta corrigir uma coisa. Está assinalada abaixo.",
      errorsMany: "Faltam corrigir {count} coisas. Estão assinaladas abaixo.",
      errorEmailEmpty: "Indique o seu email.",
      errorEmailInvalid:
        "Esse email parece incompleto. Verifique a parte depois do @.",
      errorConsent:
        "Marque esta opção para se inscrever. Pode sair quando quiser.",
      errorSlot: "Escolha uma hora para a demonstração.",
      errorSend:
        "Não conseguimos guardar agora. Verifique a ligação e tente outra vez.",
    },
    done: {
      signedUp: "Inscrito",
      requestReceived: "Pedido recebido",
      onTheList: "Na lista",
      titles: {
        waitlist: "Já está na lista",
        demoStand: "O seu pedido de demonstração chegou",
        demoCall: "Pedido de demonstração enviado",
        pilot: "Pedido de piloto enviado",
      },
      lineWaitlist: "O email de boas-vindas está a caminho de {email}.",
      lineRequest: "Também fica na lista de acesso antecipado.",
      lineFriend:
        "Vai receber as nossas novidades por email. O seu link continua a funcionar.",
      upsellTitle: "Veja-o com os seus próprios pacientes",
      upsellBody:
        "Reserve 15 minutos no stand. O seu email já está preenchido.",
      upsellBodyCall:
        "Uma videochamada de 15 minutos. O seu email já está preenchido.",
      upsellCta: "Pedir uma demonstração",
      tailorTitle: "Ajude-nos a enviar-lhe o que interessa",
      country: "Onde está?",
      countryOther: "Outro país",
      interests: {
        stutter: "Gaguez",
        dld: "Perturbações do desenvolvimento da linguagem",
        unsure: "Ainda não sei",
      },
      interestsHint: "Escolha as que se aplicam.",
      save: "Guardar",
      saved: "Guardado, obrigado.",
      nextTitle: "Próximos passos",
      nextStand: "Confirmamos a sua hora no stand",
      nextStandSub:
        "Pediu as {time} de hoje. Enviamos um email para confirmar.",
      nextCall: "Entramos em contacto para marcar a chamada",
      nextPilot: "Entramos em contacto sobre o piloto",
      nextContactSub:
        "Alguém da equipa envia-lhe um email dentro de alguns dias úteis.",
      nextWelcome: "Um email de boas-vindas, de imediato",
      nextWelcomeSub: "Enviado para {email}.",
      nextWeek: "Outro email uma semana depois",
      nextWeekSub: {
        therapist: "Com o que inclui o acesso antecipado.",
        patient: "Com recursos úteis para praticar em casa.",
        family: "Com recursos para famílias.",
        friend: "Com mais sobre o que o UpSpeech faz.",
      },
      nextMonthly: "Depois, uma novidade por mês",
      nextMonthlySub:
        "Pode sair quando quiser, com um clique em qualquer email.",
      restart: "Voltar ao início",
    },
  },
  forPatients: {
    seoTitle: "Para pacientes",
    seoDescription:
      "Como os pacientes praticam terapia da fala entre sessões com a UpSpeech, orientados pelo seu terapeuta da fala.",
    intro: {
      eyebrow: "Para pacientes",
      headlineLine1: "A sua prática,",
      headlineLine2: "entre sessões.",
      body: "A UpSpeech é como continua a praticar, entre consultas, o trabalho que faz com o seu terapeuta da fala. O seu terapeuta define o plano e acompanha como está a correr enquanto pratica na app.",
      photoAlt:
        "Um rapaz a falar para um telemóvel apoiado na mesa da cozinha, com a mãe sentada ao lado a olhar para ele e não para o ecrã",
    },
    withAParent: {
      eyebrow: "Praticar com um dos pais",
      line: "Os pacientes mais novos praticam com um dos pais ao lado, seguindo o mesmo plano definido pelo terapeuta.",
      photoAlt:
        "Um pai e a filha sentados juntos no sofá, a ouvir uma gravação no telemóvel dele",
    },
    howItWorks: {
      eyebrow: "Como funciona para si",
      headline: "Orientado pelo seu terapeuta, a cada passo.",
      steps: [
        {
          title: "O seu terapeuta define o seu plano",
          copy: "O seu terapeuta da fala escolhe os exercícios e objetivos que correspondem à fase da terapia em que está.",
        },
        {
          title: "Pratica na app",
          copy: "Faça os exercícios guiados no telemóvel, ao ritmo que lhe der jeito entre sessões.",
        },
        {
          title: "O seu terapeuta vê o seu progresso",
          copy: "O seu terapeuta acompanha o que praticou e ajusta o plano à medida que avança, para que cada sessão dê continuidade à anterior.",
        },
      ],
    },
    app: {
      eyebrow: "A app",
      headline: "O seu plano, no seu bolso.",
      body: "Abra a app e o exercício do dia está lá à sua espera.",
      screenshots: [
        "Ecrã inicial da app móvel UpSpeech a mostrar o exercício do dia do paciente",
        "App móvel UpSpeech a mostrar o percurso de aprendizagem com os passos definidos pelo terapeuta",
        "Ecrã de prática da app móvel UpSpeech com exercícios guiados de prática",
      ],
      childScreenshots: [
        "Ecrã da app móvel UpSpeech que um dos pais usa para fazer a prática do dia com o filho",
        "Ecrã de prática da app móvel UpSpeech que uma criança mais nova vê, com uma palavra para dizer e um botão de gravação",
      ],
    },
    faq: {
      eyebrow: "Perguntas",
      headline: "Perguntas frequentes dos pacientes.",
      items: [
        {
          q: "Preciso de um terapeuta da fala para usar a UpSpeech?",
          a: "Sim. A UpSpeech é usada em conjunto com o seu terapeuta da fala, que define o seu plano e revê o seu progresso. Não substitui a terapia.",
        },
        {
          q: "O que vou praticar?",
          a: "O seu terapeuta escolhe exercícios para si com base nos seus objetivos e na sua fase de terapia.",
        },
        {
          q: "Com que frequência devo praticar?",
          a: "O seu terapeuta orienta a frequência da prática. A app facilita manter uma rotina constante entre sessões.",
        },
        {
          q: "A minha informação é privada?",
          a: "Sim. Os seus dados são encriptados e só ficam acessíveis a quem o acompanha. Consulte a Política de Privacidade para mais detalhes.",
        },
        {
          q: "Como obtenho a UpSpeech?",
          a: "Pergunte ao seu terapeuta da fala se usa a UpSpeech.",
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
  personCentered: {
    seoTitle: "O que é a terapia centrada na pessoa?",
    seoDescription:
      "Um guia em linguagem simples sobre terapia da fala centrada na pessoa: o que significa, porque a fluência não é o único objetivo, e como a UpSpeech reflete esta abordagem.",
    intro: {
      eyebrow: "Filosofia",
      headlineLine1: "O que é a terapia",
      headlineLine2: "centrada na pessoa?",
      body: "A terapia centrada na pessoa coloca a confiança e a comunicação em primeiro lugar, e é a própria pessoa que ajuda a definir os objetivos. Na terapia da gaguez, esta abordagem é por vezes chamada gaguez positiva.",
    },
    sections: [
      {
        heading: "A fluência não é o único objetivo",
        body: "A terapia da fala tradicional trata por vezes a fluência como definição de sucesso. A abordagem centrada na pessoa alarga esse horizonte. Quando a pessoa pretende uma fala mais fluente, os clínicos recorrem a técnicas de modelagem da fluência, como a fala prolongada. Quando reduzir o evitamento é o que mais importa, recorrem à gaguez voluntária e à dessensibilização. O que a torna centrada na pessoa é que é ela que tem uma palavra a dizer sobre quais desses objetivos se aplicam.",
      },
      {
        heading: "Ser ouvido à sua maneira",
        body: "As pessoas que gaguejam lidam frequentemente com mais do que disfluência. Há o telefonema que se adia e o café que se pede de outra forma porque é mais fácil do que a palavra que se queria dizer. A terapia centrada na pessoa aborda isso a par de qualquer prática de técnicas.",
      },
      {
        heading: "Como a UpSpeech reflete esta abordagem",
        body: "A UpSpeech apoia qualquer abordagem que o terapeuta da fala escolha. O percurso de aprendizagem e os exercícios são definidos pelo clínico, e a app apoia a prática entre sessões. Se o objetivo é reduzir o evitamento, o terapeuta inclui isso no plano. Se o objetivo é a prática de gaguez voluntária, a app apoia isso também. Se a fluência faz parte do plano é algo que o clínico e a pessoa decidem.",
      },
      {
        heading: "Uma nota sobre linguagem",
        body: "Esta página usa 'pessoas que gaguejam' e 'pessoa que gagueja' ao longo do texto. A linguagem que coloca a pessoa antes da condição é o padrão aqui, a menos que a própria pessoa prefira outra. O objetivo é descrever as pessoas com respeito, usando as palavras que escolhem para si próprias.",
      },
    ],
    faq: {
      eyebrow: "Perguntas",
      headline: "Perguntas frequentes.",
      items: [
        {
          q: "A terapia centrada na pessoa é o mesmo que não ajudar alguém a melhorar?",
          a: "Não. A terapia centrada na pessoa continua a ensinar técnicas e a trabalhar o evitamento. O que muda é quem define a meta: a pessoa e o clínico acordam o que significa progresso, e a fluência não é a resposta automática.",
        },
        {
          q: "A UpSpeech funciona apenas para abordagens centradas na pessoa?",
          a: "Não. A UpSpeech apoia o plano que o terapeuta da fala cria. A app disponibiliza o que o clínico define, o que pode incluir técnicas de modelagem da fluência, técnicas de modificação ou trabalho focado na confiança.",
        },
        {
          q: "Que técnicas são usadas na terapia da gaguez centrada na pessoa?",
          a: "A gaguez voluntária, a identificação e dessensibilização, e as técnicas de pull-out (sair de forma controlada de um momento de gaguez) são comuns. Muitos clínicos combinam estas com trabalho de modelagem da fluência, dependendo dos objetivos do indivíduo.",
        },
        {
          q: "Onde posso aprender mais?",
          a: "A STAMMA (British Stammering Association), a Stuttering Foundation e o American Institute for Stuttering publicam guias acessíveis sobre abordagens centradas na pessoa e de gaguez positiva.",
        },
      ],
    },
    closing: {
      headline: "Trabalhe com um clínico que entenda os seus objetivos.",
      bodyPrefix:
        "A UpSpeech é utilizada através de terapeutas da fala. Se gere um consultório e quer usá-la com os seus pacientes, pode ",
      bodyLink: "pedir acesso aqui",
      bodySuffix: ".",
    },
  },
  reducingDocumentationTime: {
    seoTitle:
      "Como os terapeutas da fala reduzem o tempo gasto em notas de sessão",
    seoDescription:
      "Um guia prático para terapeutas da fala sobre como reduzir o tempo de documentação na terapia da fala, com rascunhos estruturados que apoiam o juízo clínico.",
    intro: {
      eyebrow: "Para terapeutas da fala",
      headlineLine1: "As notas começam",
      headlineLine2: "já escritas.",
      body: "A documentação faz parte de uma boa prática clínica, mas não deve roubar tempo ao trabalho em si. Esta página aborda formas práticas de os terapeutas da fala reduzirem o tempo gasto em notas de sessão na terapia da fala, incluindo onde os rascunhos estruturados se encaixam.",
    },
    sections: [
      {
        heading: "O problema da página em branco",
        body: "Após uma sessão, sabe o que aconteceu. Escrever é a parte que demora, porque parte de uma página em branco com o raciocínio clínico já feito. Numa agenda cheia de pacientes isso acumula-se, e sai normalmente do tempo de preparação ou do fim do dia.",
      },
      {
        heading: "Rascunhos estruturados que revê e edita",
        body: "Uma solução é um rascunho construído a partir dos dados da própria sessão, cobrindo o que o paciente praticou e como evoluiu. Edita o que precisa de edição e assina. O juízo clínico continua a ser seu do início ao fim.",
      },
      {
        heading: "O que deve constar numa boa nota de terapia da fala",
        body: "Uma nota de sessão útil cobre tipicamente a técnica praticada, o desempenho do paciente em relação aos seus objetivos, observações sobre evitamento ou confiança, e os próximos passos. Modelos para estes elementos tornam a redação mais rápida, com ou sem assistência de IA.",
      },
      {
        heading: "O que a UpSpeech faz",
        body: "A UpSpeech captura dados estruturados da prática entre sessões, incluindo os exercícios que o paciente completou e onde teve dificuldades. Esses dados alimentam um rascunho de nota de sessão. Nada chega ao paciente sem que o terapeuta reveja e assine.",
      },
    ],
    faq: {
      eyebrow: "Perguntas",
      headline: "Perguntas frequentes de clínicos.",
      items: [
        {
          q: "Quanto tempo podem os terapeutas da fala poupar realisticamente na documentação?",
          a: "Depende do seu fluxo de trabalho atual e do tempo que gasta em notas. Um rascunho elimina a página em branco, que é normalmente a parte mais lenta de escrever uma nota. Quanto poupa varia conforme a complexidade da sessão e a quantidade de edições que o rascunho necessita.",
        },
        {
          q: "A redação de notas com assistência de IA substitui a observação clínica?",
          a: "Não. Uma nota de rascunho é construída a partir dos dados da sessão. Os juízos clínicos que o terapeuta faz durante a consulta são o que ele acrescenta.",
        },
        {
          q: "É clinicamente adequado usar notas redigidas por IA?",
          a: "As notas redigidas são adequadas quando o terapeuta revê e assina cada nota antes de esta entrar no processo clínico do paciente. Consulte as orientações da sua ordem profissional sobre IA na documentação clínica.",
        },
        {
          q: "Como é que a UpSpeech recolhe os dados que alimentam o rascunho?",
          a: "Há duas fontes. A prática entre sessões dá dados de conclusão e de desempenho a partir da app. A gravação da própria sessão é transcrita, e o rascunho do relatório é gerado a partir dessa transcrição. Assim que finaliza o relatório, o ficheiro de áudio é eliminado. A transcrição e o relatório são conservados como parte do registo. O terapeuta vê tudo antes de qualquer nota ser assinada.",
        },
      ],
    },
    closing: {
      headline:
        "Deixe a UpSpeech redigir as notas para se concentrar na sessão.",
      bodyPrefix:
        "A UpSpeech trabalha com terapeutas da fala que pretendem prática estruturada entre sessões e notas redigidas por IA. ",
      bodyLink: "Peça acesso aqui",
      bodySuffix: " para ver se se adequa à sua clínica.",
    },
  },
  forSlps: {
    seoTitle: "Para terapeutas da fala",
    seoDescription:
      "A UpSpeech dá aos pacientes prática estruturada entre sessões. Define o que trabalham e vê como correu antes da consulta seguinte.",
    intro: {
      eyebrow: "Para terapeutas da fala",
      headlineLine1: "Mais terapia entre sessões.",
      headlineLine2: "Tudo orientado por si.",
      body: "A UpSpeech dá aos seus pacientes prática guiada que fazem de facto entre consultas, nas técnicas que escolher. Saberá como correu a semana antes de o paciente se sentar.",
      photoAlt:
        "Uma terapeuta da fala de pé numa sala de consulta, a segurar um tablet e a olhar para o lado",
    },
    documentation: {
      eyebrow: "Documentação",
      headline: "Notas de sessão, redigidas e prontas para rever.",
      body: "Após uma sessão, a UpSpeech redige o relatório. Edita-o e assina-o, sem partir de uma página em branco.",
      screenshotAlt:
        "Vista do terapeuta na UpSpeech a mostrar um relatório de sessão redigido por IA, pronto para revisão.",
    },
    betweenSessions: {
      eyebrow: "Entre sessões",
      headline: "Atribua prática. Veja o que aconteceu.",
      steps: [
        {
          title: "Define o plano",
          copy: "Escolhe as técnicas e exercícios de cada paciente, a partir dos seus objetivos terapêuticos.",
        },
        {
          title: "O paciente pratica na app",
          copy: "Alguns minutos calmos por dia de prática guiada, na técnica que definiu.",
        },
        {
          title: "Acompanha o progresso",
          copy: "Os dias seguidos de prática, a regularidade e as tendências chegam até si entre consultas.",
        },
      ],
    },
    personCentered: {
      eyebrow: "A nossa abordagem",
      headline: "Cada tentativa recebe a tua resposta.",
      body: "O paciente grava em casa e tu ouves a gravação. O comentário que ele lê foi escrito por ti.",
      photoAlt:
        "Uma terapeuta da fala a conversar com um rapaz numa sala de consulta, com a mãe sentada logo atrás dele",
    },
    faq: {
      eyebrow: "Perguntas de clínicos",
      headline: "Perguntas frequentes de terapeutas da fala.",
      items: [
        {
          q: "A UpSpeech escreve os meus relatórios por mim?",
          a: "Redige um rascunho de relatório estruturado a partir da sessão para rever e editar, e poupa-lhe o trabalho da página em branco.",
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
      headline: "Traga a UpSpeech para a sua clínica.",
      bodyPrefix: "A UpSpeech funciona através da sua clínica. ",
      bodyLink: "Peça acesso aqui",
      bodySuffix: ".",
    },
  },
  consent: {
    title: "Cookies neste site",
    description:
      "Usamos cookies para melhorar a sua experiência e analisar a utilização do site. Ao aceitar, concorda com a utilização de cookies de análise. Pode recusar se preferir.",
    learnMore: "Saber mais sobre cookies",
    decline: "Recusar",
    accept: "Aceitar",
  },
  notFound: {
    seoTitle: "Página não encontrada",
    eyebrow: "Erro 404",
    title: "Esta página fez uma pausa.",
    body: "A página que procura foi movida ou nunca existiu. Vamos ajudar a voltar ao caminho certo.",
    backHome: "Voltar ao início",
  },
};
