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
    getTheApp: "Obter a app",
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
    reducingDocumentationTime: "Menos papelada",
  },
  localeSwitcher: {
    label: "Idioma",
    en: "English",
    pt: "Português",
    es: "Español",
  },
  medicalDisclaimer:
    "A UpSpeech é uma ferramenta de prática e de produtividade clínica, pensada para terapeutas da fala qualificados e para o trabalho que fazem com os pacientes. Não é um dispositivo médico e não diagnostica, trata nem cura qualquer condição. O conteúdo educativo deste site não substitui o aconselhamento clínico profissional.",
  techniquesIndex: {
    title: "Técnicas de terapia da fala",
    subtitle: "Para que serve cada uma, e como praticá-la",
    seoDescription:
      "Técnicas de terapia da fala para a gaguez, cada uma com o que é, para que serve e como praticá-la. Inclui modelação da fluência, modificação da gaguez e abordagens cognitivas.",
    featured: "Destaque",
    mainCategories: "Famílias de técnicas",
    standalone: "Técnicas que não pertencem a uma família",
    viewDetails: "Ler a técnica",
    techniques: "técnicas",
    loading: "A carregar técnicas...",
    error: "Erro ao carregar técnicas",
    tryAgain: "Erro ao carregar técnicas. Tenta novamente mais tarde.",
  },
  techniquePage: {
    loading: "A carregar técnica...",
    error: "Erro ao carregar a técnica",
    notFound: "Técnica não encontrada",
    backToAll: "Voltar a todas as técnicas",
    practicalDescription: "O que é",
    objective: "Para que serve",
    howToPractice: "Como praticá-la",
    onThisPage: "Nesta página",
    closingTitle: "Pratica isto entre sessões",
    closingBody:
      "O teu terapeuta da fala pode atribuir esta técnica na UpSpeech e ver como correu cada prática antes da próxima consulta.",
    closingLink: "Como a UpSpeech ajuda os pacientes",
    relatedTechniques: "Praticadas com esta",
  },
  home: {
    seoDescription:
      "Apoio contínuo à terapia da fala. Os pacientes praticam entre sessões segundo o plano do terapeuta, e cada tentativa volta para revisão.",
    hero: {
      photoAlt:
        "Uma mulher à mesa da cozinha, com o telemóvel à frente, a dizer um exercício em voz alta ao fim da tarde",
      eyebrow: "Para clínicas de terapia da fala",
      headlineLine1: "A tua terapia",
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
        headline: "Já tens o contexto.",
        body: "O paciente completou o acolhimento na app. Lê onde ele está antes de se sentar, em vez de gastar os primeiros dez minutos a perguntar.",
        photoAlt:
          "Uma terapeuta da fala à secretária entre consultas, com o portátil fechado à frente, a olhar pela janela",
      },
      assessment: {
        time: "09:15 · A avaliação",
        headline: "Sais com o relatório escrito.",
        body: "Gravas a avaliação e o relatório fica em rascunho no momento em que te levantas. Revês e corriges. Não começas de uma página em branco.",
        detailAlt:
          "Um relatório de sessão gerado, com o nome do paciente, a data e o estado Pronto",
      },
      session: {
        time: "11:30 · Na sessão",
        headline: "As notas custam‑te a criança.",
        body: "Cada minuto que passa a escrever é um minuto que ela passa noutro sítio. Grava a sessão e as notas ficam à tua espera quando ela terminar.",
        cost: {
          label: "A tirar notas",
          caption:
            "A tua atenção está no papel. A dele foi para a janela há já algum tempo.",
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
        body: "Atribuis os exercícios uma vez. Praticam entre consultas e cada tentativa volta para ti rever antes da consulta seguinte.",
        detailAlt:
          "Um percurso de aprendizagem atribuído, com o passo atual identificado",
      },
      close: {
        time: "17:30 · O fim do dia",
        headline: "Lembras-te de todos.",
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
      patient: "Paciente",
      clinicianStepPrefix: "Clínico · passo ",
      aiStepPrefix: "IA · passo ",
      stepPrefix: "Passo ",
      stepSuffix: " / 06",
      fileTitle: "Ficha do paciente, semana 14",
      backToStart: "E volta ao passo 01",
      docs: [
        {
          kind: "Relatório da sessão",
          lines: [
            {
              text: "O paciente praticou 3 vezes esta semana.",
              mark: "ai",
            },
            { text: "O evitamento de telefonemas mantém-se.", mark: "ai" },
          ],
        },
        {
          kind: "Relatório da sessão",
          lines: [
            {
              text: "O paciente praticou 3 vezes esta semana.",
              mark: "plain",
            },
            { text: "O evitamento de telefonemas mantém-se.", mark: "struck" },
            {
              text: "O evitamento de telefonemas diminuiu: fez dois telefonemas esta semana.",
              mark: "clin",
            },
          ],
        },
        {
          kind: "Plano de prática",
          lines: [
            { text: "Inícios suaves, 5 min por dia", mark: "ai" },
            { text: "Saídas controladas, 5 min por dia", mark: "ai" },
            { text: "Dificuldade: média", mark: "ai" },
          ],
        },
        {
          kind: "Plano de prática",
          lines: [
            { text: "Inícios suaves, 5 min por dia", mark: "plain" },
            { text: "Saídas controladas, 5 min por dia", mark: "struck" },
            { text: "Gaguez voluntária, 5 min por dia", mark: "clin" },
            { text: "Dificuldade: fácil", mark: "clin" },
          ],
        },
        {
          kind: "Tentativas",
          lines: [
            { text: "Seg, inícios suaves, esforço 3 de 5", mark: "ai" },
            { text: "Qua, gaguez voluntária, esforço 3 de 5", mark: "ai" },
            { text: "Sex, inícios suaves, esforço 2 de 5", mark: "ai" },
          ],
        },
        {
          kind: "Passo seguinte",
          lines: [
            {
              text: "O esforço desceu de 3 para 2 ao longo da semana.",
              mark: "plain",
            },
            { text: "Praticar telefonemas.", mark: "clin" },
          ],
        },
      ],
      states: [
        "Rascunho",
        "Pronto",
        "Proposto",
        "Ativo",
        "Registada",
        "Atribuído",
      ],
      nodes: [
        {
          verb: "redige",
          title: "A IA redige o relatório da sessão.",
          body: "A gravação e as notas da sessão tornam-se um rascunho estruturado.",
        },
        {
          verb: "aprova",
          title: "O clínico edita e aprova.",
          body: "Cada correção melhora o rascunho seguinte. Qualquer conteúdo usado para treinar os nossos modelos exige o consentimento prévio do paciente.",
        },
        {
          verb: "estrutura",
          title: "A IA estrutura o plano de prática.",
          body: "Com base nos dados da sessão e na fase do paciente, a UpSpeech propõe exercícios diários para o clínico aprovar.",
        },
        {
          verb: "calibra",
          title: "O clínico calibra-o.",
          body: "O clínico ajusta a dificuldade e troca técnicas onde é preciso. Nada chega ao paciente sem que o clínico reveja.",
        },
        {
          verb: "ouve",
          title: "A UpSpeech regista cada tentativa.",
          body: "A UpSpeech guarda cada tentativa com a técnica, a data e a avaliação que o paciente fez do esforço.",
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
      headlineLine2: "a começar pela tua clínica.",
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
      text: "dos pacientes que usam o UpSpeech disseram que praticam mais do que antes.",
    },
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
            body: "Escolha o próximo exercício para o Percurso de Aprendizagem. O paciente passa a ter acesso e faz o exercício as vezes que definir.",
          },
          {
            when: "Entre sessões",
            title: "A prática, à vista",
            body: "Hoje, a prática em casa só se conhece na sessão seguinte, e mesmo assim sem certezas. Com o UpSpeech, cada gravação fica disponível para ouvir.",
          },
          {
            when: "Antes da sessão seguinte",
            title: "O relatório começa como rascunho",
            body: "O UpSpeech prepara o relatório a partir da sessão e da prática da semana. Pode sempre editar qualquer parte. Nada é guardado sem a sua aprovação.",
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
        sub: "O seu terapeuta define exercícios curtos na aplicação. Pratica alguns minutos em casa com um companheiro, e o terapeuta ouve como correu antes da sessão seguinte. Começamos pela gaguez e pelas perturbações do desenvolvimento da linguagem.",
        stepsTitle: "Uma noite entre sessões",
        stepsLead: "Como é uma noite de prática, e a manhã seguinte.",
        steps: [
          {
            when: "18:30",
            title: "Um lembrete suave",
            body: "À hora que escolheu. 1 exercício de cada vez.",
          },
          {
            when: "18:32",
            title: "O exercício que a Ana definiu",
            body: "A técnica que trabalhou na sessão, ao seu ritmo.",
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
            body: "Prática curta em casa com uma atividade partilhada em vários dias, e dias de descanso.",
          },
          {
            when: "Sexta-feira",
            title: "Uma nota da Ana",
            body: "A Ana ouve as gravações da semana antes da sessão seguinte.",
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
        line: "Partilhe o UpSpeech com quem precisa de nós.",
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
            body: "Uma sessão, e depois seis dias sem apoio até à seguinte, sem orientação real sobre como praticar o que aprendeu.",
          },
          {
            when: "Em casa",
            title:
              "Com o UpSpeech, a prática acontece alguns minutos na maioria dos dias.",
            body: "Exercícios curtos definidos pelo terapeuta. O terapeuta ouve cada um, revê-o e decide o passo seguinte para a evolução do paciente.",
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
      exerciseTitle: "Por exemplo",
      exerciseMeta: "5 min · da Ana",
      exerciseSteps: [
        "Uma leitura breve sobre o tema",
        "Um vídeo da técnica a ser usada na prática",
        "Faça você mesmo",
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
        "Que boa semana! Vamos experimentar a história de dormir outra vez no domingo.",
      stripDays: ["S", "T", "Q", "Q", "S", "S", "S"],
      legendAlone: "Sem apoio",
      legendHome: "Prática em casa",
      sentMessages: {
        // One line per utm_source; fallback covers everything else.
        websummit:
          "Vi isto na Web Summit e lembrei-me de ti. Pode ajudar entre sessões.",
        linkedin:
          "Vi isto no LinkedIn e lembrei-me de ti. Pode ajudar entre sessões.",
        instagram:
          "Vi isto no Instagram e lembrei-me de ti. Pode ajudar entre sessões.",
        facebook:
          "Vi isto no Facebook e lembrei-me de ti. Pode ajudar entre sessões.",
        x: "Vi isto no X e lembrei-me de ti. Pode ajudar entre sessões.",
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
        demo: "15 minutos com a equipa. Entramos em contacto para combinar uma hora.",
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
        demo: "Pedir uma demonstração",
        pilot: "Enviar pedido de piloto",
        waitlist: "Entrar na lista de espera",
        friend: "Quero receber novidades",
      },
      saving: "A guardar o seu lugar...",
      sending: "A enviar",
      slowTitle: "Ainda a guardar o seu lugar...",
      slowBody:
        "A ligação parece lenta. Mantenha esta página aberta e o envio termina sozinho.",
      errorsOne: "Falta corrigir uma coisa. Está assinalada abaixo.",
      errorsMany: "Faltam corrigir {count} coisas. Estão assinaladas abaixo.",
      errorEmailEmpty: "Indique o seu email.",
      errorEmailInvalid:
        "Esse email parece incompleto. Verifique a parte depois do @.",
      errorConsent:
        "Marque esta opção para se inscrever. Pode sair quando quiser.",
      errorSend:
        "Não conseguimos guardar agora. Verifique a ligação e tente outra vez.",
    },
    done: {
      signedUp: "Inscrito",
      requestReceived: "Pedido recebido",
      onTheList: "Na lista",
      titles: {
        waitlist: "Já está na lista",
        demo: "Pedido de demonstração enviado",
        pilot: "Pedido de piloto enviado",
      },
      lineWaitlist: "O email de boas-vindas está a caminho de {email}.",
      lineRequest: "Também fica na lista de acesso antecipado.",
      lineFriend:
        "Vai receber as nossas novidades por email. O seu link continua a funcionar.",
      upsellTitle: "Veja-o com os seus próprios pacientes",
      upsellBody: "15 minutos com a equipa.",
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
      nextPilot: "Entramos em contacto sobre o piloto",
      nextDemo: "Entramos em contacto para combinar uma hora",
      nextContactSub:
        "Alguém da equipa envia-lhe um email dentro de alguns dias úteis.",
      nextWelcome: "Um email de boas-vindas, de imediato",
      nextWelcomeSub: "Enviado para {email}.",
      nextUpdates: "Novidades e leituras úteis, de vez em quando",
      nextUpdatesSub:
        "Pode cancelar quando quiser, com um clique em qualquer email.",
      restart: "Voltar ao início",
    },
  },
  forPatients: {
    seoTitle: "Para pacientes",
    seoDescription:
      "Como os pacientes praticam terapia da fala entre sessões com a UpSpeech, orientados pelo seu terapeuta da fala.",
    intro: {
      eyebrow: "Para pacientes",
      headlineLine1: "A tua prática,",
      headlineLine2: "entre sessões.",
      body: "O teu terapeuta escolhe os exercícios. Tu fazes-os em casa, no telemóvel, e o terapeuta vê como correu cada um.",
      exchange: {
        todayLabel: "Exercício de hoje, do Sam Rivera",
        todayAlt:
          "A prática de hoje no painel do paciente: Inícios suaves, definida pelo terapeuta, cerca de 5 minutos",
        replyLabel: "O teu terapeuta responde",
        replyAlt:
          "Uma gravação da prática do Leo com barra de reprodução, e o feedback do terapeuta por baixo",
        recordLabel: "Gravas tu",
        recordAlt:
          "O ecrã de prática do paciente num telemóvel, pronto para gravar a resposta ao exercício de hoje",
      },
      inviteNote: "O teu terapeuta envia-te um convite para começares.",
      photoAlt:
        "Um rapaz a falar para um telemóvel apoiado na mesa da cozinha, com a mãe sentada ao lado a olhar para ele e não para o ecrã",
    },
    withAParent: {
      eyebrow: "Praticar com um dos pais",
      line: "Os pacientes mais novos praticam com um dos pais ao lado, seguindo o mesmo plano definido pelo terapeuta.",
      photoAlt:
        "Um pai e a filha sentados juntos no sofá, a ouvir uma gravação no telemóvel dele",
    },
    app: {
      eyebrow: "A app",
      headline: "O teu plano, no teu bolso.",
      body: "Abre a app e o exercício do dia está lá à tua espera.",
      screenshots: [
        "Ecrã inicial da app móvel UpSpeech a mostrar o exercício do dia do paciente",
        "App móvel UpSpeech a mostrar o percurso de aprendizagem com os passos definidos pelo terapeuta",
        "Ecrã de prática da app móvel UpSpeech com exercícios guiados de prática",
      ],
      walkthrough: [
        {
          title: "Hoje",
          line: "O teu terapeuta escolhe o exercício. Tu carregas em começar.",
        },
        {
          title: "A tua jornada",
          line: "Vê que passos já deste e quais vêm a seguir.",
        },
        {
          title: "Prática",
          line: "Escolhe um exercício e pratica ao teu ritmo.",
        },
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
          a: "Sim. A UpSpeech é usada em conjunto com o teu terapeuta da fala, que define o teu plano e revê o teu progresso. Não substitui a terapia.",
        },
        {
          q: "O que vou praticar?",
          a: "O teu terapeuta escolhe exercícios para ti com base nos teus objetivos e na tua fase de terapia.",
        },
        {
          q: "Com que frequência devo praticar?",
          a: "O teu terapeuta orienta a frequência da prática. A app facilita manter uma rotina constante entre sessões.",
        },
        {
          q: "A minha informação é privada?",
          a: "Sim. Os teus dados são encriptados e só ficam acessíveis a quem te acompanha. Consulta a Política de Privacidade para mais detalhes.",
        },
        {
          q: "Como obtenho a UpSpeech?",
          a: "Pergunta ao teu terapeuta da fala se usa a UpSpeech.",
        },
      ],
    },
    closing: {
      headline: "Pronta quando o teu terapeuta estiver.",
      body: "Instala a app já. Quando o teu terapeuta enviar o convite, fica ligada ao teu plano.",
      bodyPrefix:
        "A UpSpeech funciona através da tua clínica. Se geres um consultório e queres usá-la com os teus pacientes, podes ",
      bodyLink: "pedir acesso aqui",
      bodySuffix: ".",
    },
  },
  personCentered: {
    seoTitle: "O que é a terapia centrada na pessoa?",
    seoDescription:
      "Um guia em linguagem simples sobre a terapia da fala centrada na pessoa: o que é, porque é que a fluência não é o único objetivo e como a UpSpeech se encaixa nesta abordagem.",
    intro: {
      eyebrow: "Filosofia",
      headlineLine1: "O que é a terapia",
      headlineLine2: "centrada na pessoa?",
      body: "Se gaguejas, ou se tens um filho que gagueja, esta é a ideia por trás da terapia centrada na pessoa: a confiança e a comunicação vêm primeiro, e és tu quem ajuda a definir os objetivos. Na gaguez, esta abordagem chama-se por vezes gaguez positiva.",
    },
    sections: [
      {
        heading: "A fluência não é o único objetivo",
        body: "A terapia da fala tradicional costuma medir o sucesso pela fluência. A abordagem centrada na pessoa vai mais longe. Se queres uma fala mais fluida, o terapeuta recorre a técnicas de modelação da fluência, como a fala prolongada. Se o mais importante é reduzir o evitamento, recorre à gaguez voluntária e à dessensibilização. O que a torna centrada na pessoa é teres voz na escolha dos objetivos que te dizem respeito. Se for uma criança, a família faz parte dessa conversa.",
      },
      {
        heading: "Ser ouvido à tua maneira",
        body: "Quem gagueja lida muitas vezes com mais do que a disfluência. Há o telefonema que se adia e o pedido no café em que trocas de palavra porque a outra custa mais a sair. Quem vive com quem gagueja também sente o peso. A terapia centrada na pessoa trabalha estas situações a par do treino de técnicas.",
      },
      {
        heading: "O papel da UpSpeech",
        body: "A UpSpeech apoia a abordagem que o teu terapeuta da fala escolher. É o terapeuta que define o percurso de aprendizagem e os exercícios, e a app acompanha a prática entre sessões. Se o objetivo for reduzir o evitamento, o terapeuta inclui isso no plano. Se o plano tiver gaguez voluntária, a app acompanha também esse treino. Quem decide se a fluência entra no plano és tu, com o terapeuta.",
      },
      {
        heading: "Uma nota sobre linguagem",
        body: "Esta página fala em «pessoas que gaguejam». Pomos a pessoa primeiro e só depois a condição. Cada um escolhe as palavras para si, e nós usamos essas.",
      },
    ],
    faq: {
      eyebrow: "Perguntas",
      headline: "Perguntas frequentes.",
      items: [
        {
          q: "Centrar a terapia na pessoa quer dizer desistir de melhorar?",
          a: "Não. A terapia centrada na pessoa continua a ensinar técnicas e a trabalhar o evitamento. Muda quem define a meta: combinas com o terapeuta o que conta como progresso, e a fluência não é dada como certa.",
        },
        {
          q: "A UpSpeech só serve para abordagens centradas na pessoa?",
          a: "Não. A UpSpeech segue o plano que o terapeuta da fala cria. A app mostra a quem pratica o que o terapeuta atribui, seja modelação da fluência, técnicas de modificação da gaguez ou trabalho centrado na confiança.",
        },
        {
          q: "Que técnicas se usam na terapia da gaguez centrada na pessoa?",
          a: "A gaguez voluntária, a identificação e dessensibilização e as técnicas de saída controlada (pull-out, sair de um momento de gaguez com controlo) são comuns. Muitos terapeutas combinam-nas com trabalho de modelação da fluência, consoante os objetivos de cada pessoa.",
        },
        {
          q: "Onde posso aprender mais?",
          a: "Em Portugal, a Associação Portuguesa da Gaguez (APG) representa as pessoas que gaguejam e promove encontros entre elas. Lá fora, a STAMMA (British Stammering Association), a Stuttering Foundation e o American Institute for Stuttering publicam guias acessíveis sobre abordagens centradas na pessoa e de gaguez positiva.",
        },
      ],
    },
    closing: {
      headline: "Procura um terapeuta que perceba os teus objetivos.",
      bodyPrefix:
        "A UpSpeech chega aos pacientes através do terapeuta da fala. Se tens uma clínica e queres usar a UpSpeech com os teus pacientes, podes ",
      bodyLink: "pedir acesso aqui",
      bodySuffix: ".",
    },
  },
  reducingDocumentationTime: {
    seoTitle:
      "Como os terapeutas da fala gastam menos tempo em relatórios de sessão",
    seoDescription:
      "Um guia prático para terapeutas da fala sobre como gastar menos tempo em documentação, com rascunhos estruturados que respeitam o juízo clínico.",
    intro: {
      eyebrow: "Para terapeutas da fala",
      headlineLine1: "O relatório começa",
      headlineLine2: "já escrito.",
      body: "A documentação faz parte de uma boa prática clínica, mas não deve roubar tempo aos pacientes. Esta página mostra formas práticas de gastar menos tempo nos relatórios de sessão, e o papel dos rascunhos estruturados.",
    },
    sections: [
      {
        heading: "O problema da página em branco",
        body: "Depois de uma sessão, sabes o que aconteceu. Escrever é que demora, porque começas numa página em branco com o raciocínio clínico já feito. Com a agenda cheia, o tempo acumula-se e acaba por comer a preparação ou o fim do dia.",
      },
      {
        heading: "Rascunhos estruturados que revês e editas",
        body: "Ajuda partir de um rascunho feito com os dados da própria sessão, com o que o paciente praticou e a forma como evoluiu. Corriges o que for preciso. O juízo clínico continua a ser teu, do princípio ao fim.",
      },
      {
        heading: "O que deve ter um bom relatório de terapia da fala",
        body: "Um bom relatório de sessão diz que técnica se praticou, como o paciente se saiu face aos objetivos, o que se notou sobre evitamento ou confiança e o que vem a seguir. Com um modelo para cada ponto, escreve-se mais depressa, com ou sem ajuda de IA.",
      },
      {
        heading: "O que a UpSpeech faz",
        body: "A UpSpeech guarda dados estruturados da prática entre sessões, incluindo os exercícios que o paciente fez e onde sentiu dificuldade. Esses dados alimentam o rascunho do relatório de sessão. Nada chega ao paciente sem tu o reveres. Só gravas com o consentimento do paciente.",
      },
    ],
    faq: {
      eyebrow: "Perguntas",
      headline: "Perguntas frequentes dos terapeutas.",
      items: [
        {
          q: "Quanto tempo se poupa, de facto, a documentar?",
          a: "Depende da tua forma de trabalhar e do tempo que gastas em relatórios. O rascunho tira-te a página em branco, que costuma ser a parte mais lenta. Quanto poupas varia com a complexidade da sessão e com as edições de que o rascunho precisa.",
        },
        {
          q: "Redigir relatórios com ajuda de IA substitui a observação clínica?",
          a: "Não. O rascunho parte dos dados da sessão. O que observas na sala és tu que acrescentas.",
        },
        {
          q: "É clinicamente adequado usar relatórios redigidos por IA?",
          a: "É, desde que revejas cada relatório antes de ele entrar no processo clínico do paciente. Consulta as orientações da tua associação profissional sobre IA na documentação clínica.",
        },
        {
          q: "Como é que a UpSpeech recolhe os dados que alimentam o rascunho?",
          a: "Duas coisas alimentam-no. A prática entre sessões mostra o que o paciente concluiu na app e como correu. A gravação da sessão é transcrita, e o rascunho do relatório sai dessa transcrição. Quando finalizas o relatório, o ficheiro de áudio é eliminado. A transcrição e o relatório ficam guardados no processo. Vês tudo antes de finalizares o relatório.",
        },
      ],
    },
    closing: {
      headline:
        "Deixa a UpSpeech fazer o rascunho dos relatórios e concentra-te na sessão.",
      bodyPrefix:
        "A UpSpeech trabalha com terapeutas da fala que querem prática estruturada entre sessões e relatórios redigidos por IA. ",
      bodyLink: "Pede acesso aqui",
      bodySuffix: " para ver se faz sentido na tua clínica.",
    },
  },
  forSlps: {
    seoTitle: "Para terapeutas da fala",
    seoDescription:
      "A UpSpeech dá aos pacientes prática estruturada entre sessões. Define o que trabalham e vê como correu antes da consulta seguinte.",
    intro: {
      eyebrow: "Para terapeutas da fala",
      headlineLine1: "Mais terapia entre sessões.",
      headlineLine2: "Tudo orientado por ti.",
      body: "A UpSpeech dá aos teus pacientes prática guiada que fazem de facto entre consultas, nas técnicas que escolheres. Saberás como correu a semana antes de o paciente se sentar.",
      photoAlt:
        "Uma terapeuta da fala de pé numa sala de consulta, a segurar um tablet e a olhar para o lado",
    },
    documentation: {
      eyebrow: "Documentação",
      headline: "Notas de sessão, redigidas e prontas para rever.",
      body: "Após uma sessão, a UpSpeech redige o relatório. Revê-o e edita-o, sem partir de uma página em branco.",
      screenshotAlt:
        "Vista do terapeuta na UpSpeech a mostrar um relatório de sessão redigido por IA, pronto para revisão.",
    },
    betweenSessions: {
      eyebrow: "Entre sessões",
      headline: "Atribui prática. Vê o que aconteceu.",
      steps: [
        {
          title: "Define o plano",
          copy: "Escolhe as técnicas e exercícios de cada paciente, a partir dos seus objetivos terapêuticos.",
        },
        {
          title: "O paciente pratica na app",
          copy: "Alguns minutos calmos por dia de prática guiada, na técnica que definiste.",
        },
        {
          title: "Acompanha o progresso",
          copy: "Os dias seguidos de prática, a regularidade e as tendências chegam até ti entre consultas.",
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
          a: "Não sozinha. Redige o rascunho a partir da gravação da sessão e dos dados de prática, e és tu quem decide o que o relatório diz.",
        },
        {
          q: "O que fazem os meus pacientes?",
          a: "Praticam as técnicas que atribuis, em sessões diárias curtas, e o progresso deles chega até ti entre consultas.",
        },
        {
          q: "Substitui a terapia?",
          a: "Não. A UpSpeech funciona através da tua clínica e é usada em conjunto com as tuas sessões, não em vez delas.",
        },
      ],
    },
    closing: {
      headline: "Traz a UpSpeech para a tua clínica.",
      body: "A UpSpeech funciona através da tua clínica. Conta-nos como é o teu consultório e entramos em contacto.",
      cta: "Pedir acesso antecipado",
    },
  },
  consent: {
    title: "Cookies neste site",
    description:
      "Usamos cookies para melhorar a tua experiência e analisar a utilização do site. Ao aceitares, concordas com a utilização de cookies de análise. Podes recusar se preferires.",
    descriptionShort: "Cookies de análise, só se aceitares.",
    learnMore: "Saber mais sobre cookies",
    decline: "Recusar",
    accept: "Aceitar",
  },
  notFound: {
    seoTitle: "Página não encontrada",
    eyebrow: "Erro 404",
    title: "Esta página fez uma pausa.",
    body: "A página que procuras foi movida ou nunca existiu. Vamos ajudar a voltar ao caminho certo.",
    backHome: "Voltar ao início",
  },
};
