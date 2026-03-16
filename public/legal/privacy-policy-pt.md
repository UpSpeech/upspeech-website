# Política de Privacidade

**Última Atualização:** 11 de março de 2026

## Introdução

Bem-vindo à UpSpeech ("nós" ou "nosso/a"). Estamos empenhados em proteger a sua privacidade e em tratar as suas informações pessoais com cuidado e transparência. Esta Política de Privacidade explica como recolhemos, utilizamos, divulgamos e protegemos as suas informações quando utiliza a nossa plataforma de terapia da fala.

A UpSpeech é uma plataforma multi-tenant de software-como-serviço (SaaS) concebida para terapeutas da fala e os seus pacientes, com foco na terapia da gaguez e na automatização de relatórios clínicos.

Ao utilizar a UpSpeech, concorda com a recolha e utilização de informações de acordo com esta política. Se não concordar com as nossas políticas e práticas, por favor não utilize a nossa plataforma.

## Informações que Recolhemos

### 1. Informações da Conta

Quando cria uma conta, recolhemos:

- **Endereço de email** - Utilizado para autenticação e comunicações da conta
- **Palavra-passe** - Protegida com encriptação Argon2id (nunca armazenamos palavras-passe em texto simples)
- **Nome completo** (primeiro e último nome) - Utilizado para identificação e geração de relatórios
- **Função do utilizador** - Determina o seu nível de acesso (proprietário, administrador, terapeuta, cliente/paciente, membro)
- **Preferência de idioma** - Para apresentação localizada da interface (inglês, português, espanhol)
- **Afiliação organizacional** - A organização/tenant a que pertence

### 2. Gravações de Áudio e Vídeo

A UpSpeech permite aos utilizadores carregar gravações de fala para análise:

- **Ficheiros de áudio/vídeo** - Gravações de sessões de fala, que podem conter dados de voz e outras informações identificáveis
- **Metadados da gravação** - Nome original do ficheiro, tipo de ficheiro, tamanho, duração, data e hora do carregamento
- **Tipo de gravação** - Se a gravação é apenas áudio ou vídeo e áudio
- **Tipo de relatório** - Classificação como avaliação ou gravação de sessão
- **Confirmação de consentimento** - Confirmação de que obteve o consentimento necessário antes de carregar gravações
- **Hash do ficheiro** - Um hash criptográfico utilizado para detetar carregamentos duplicados dentro da sua organização

**Importante:** As gravações de áudio e vídeo podem conter informações de saúde sensíveis. Armazenamos estes ficheiros de forma segura no Google Cloud Storage com encriptação em repouso e em trânsito.

### 3. Transcrições e Conteúdo Gerado por IA

Utilizamos serviços de inteligência artificial de terceiros para processar as suas gravações de áudio:

- **Transcrições** - Transcrições de texto geradas a partir das suas gravações de áudio utilizando reconhecimento de fala por IA (ElevenLabs Scribe v2)
- **Relatórios gerados por IA** - Relatórios clínicos gerados automaticamente utilizando modelos de linguagem de grande escala (Google Gemini)
- **Anotações de disfluências** - Deteção e classificação automatizadas de disfluências de fala (repetições, prolongamentos, bloqueios)
- **Dados de análise de fala** - Análise estatística de padrões de fala e gravidade da gaguez

### 4. Relatórios Clínicos e Notas

Os terapeutas criam e gerem documentação clínica:

- **Conteúdo dos relatórios** - Observações clínicas, avaliações, recomendações de tratamento (formatados em HTML, higienizados por segurança)
- **Metadados dos relatórios** - Título, estado (rascunho/pronto), tipo de relatório (avaliação, sessão, relatório para seguro), data de criação
- **Notas dos relatórios** - Notas e observações clínicas adicionais
- **Seleções de exercícios** - Exercícios de consulta associados aos relatórios

### 5. Relações Terapeuta-Paciente

Registamos relações profissionais dentro da plataforma:

- **Atribuições de terapeutas** - Ligações formais entre terapeutas e os seus pacientes
- **Estado da atribuição** - Se a relação está ativa ou inativa
- **Códigos de convite** - Códigos utilizados pelos terapeutas para convidar pacientes para a plataforma
- **Atribuições de exercícios** - Mini jogos e exercícios de consulta atribuídos pelos terapeutas aos pacientes
- **Estado de conclusão** - Estado de conclusão, classificações de dificuldade, gravações dos pacientes

### 6. Dados de Progresso e Análise

Registamos o progresso dos utilizadores e a utilização da plataforma:

- **Dados de conclusão de exercícios** - Quais exercícios foram concluídos, quando, e gravações associadas
- **Estatísticas de disfluências** - Medições quantitativas de comportamentos de gaguez ao longo do tempo
- **Anotações de técnicas** - Utilização de técnicas terapêuticas (gaguez voluntária, pull-outs, cancelamentos, etc.)
- **Métricas de progresso** - Resumos estatísticos da evolução do paciente
- **Utilização da plataforma** - Horários de início de sessão, utilização de funcionalidades, duração das sessões

### 7. Feedback e Comunicações

Os utilizadores podem fornecer feedback dentro da plataforma:

- **Feedback sobre relatórios** - Comentários e avaliações sobre relatórios gerados
- **Feedback geral** - Relatórios de erros, pedidos de funcionalidades, feedback sobre a experiência de utilização
- **Comunicações de suporte** - Correspondência por email com a nossa equipa de suporte
- **Notificações do sistema** - Atividade relacionada com a sua conta e pacientes atribuídos

### 8. Dados Técnicos e de Utilização

Recolhemos automaticamente determinadas informações técnicas:

- **Tokens de autenticação** - Tokens JWT armazenados no localStorage do seu navegador durante 24 horas
- **Informações do navegador** - Tipo de navegador, versão e tipo de dispositivo (para compatibilidade e resolução de problemas)
- **Endereço IP** - Para monitorização de segurança e análise geográfica
- **Registos de acesso** - Timestamps e ações realizadas dentro da plataforma (para auditoria de segurança)

### 9. Dados da Organização/Tenant

Para contas organizacionais (clínicas de terapia da fala, instalações de saúde):

- **Nome e identificador da organização**
- **Marca personalizada** - Logótipo, esquema de cores, URL do website, informações de contacto
- **Preferências de idioma e fuso horário**
- **Configurações de feature flags** - Quais funcionalidades da plataforma estão ativadas para a sua organização

## Como Utilizamos as Suas Informações

Utilizamos as informações que recolhemos para os seguintes fins:

### 1. Fornecer e Melhorar os Serviços

- **Gestão de contas** - Criar e gerir contas de utilizadores, autenticar utilizadores
- **Análise de fala** - Processar gravações de áudio para gerar transcrições e relatórios clínicos
- **Fluxos de trabalho clínicos** - Permitir que os terapeutas criem relatórios, atribuam exercícios e acompanhem o progresso dos pacientes
- **Envolvimento do paciente** - Permitir que os pacientes concluam exercícios, carreguem gravações e vejam o seu progresso
- **Funcionalidade da plataforma** - Fornecer funcionalidades essenciais incluindo isolamento multi-tenant, controlo de acesso baseado em funções e atualizações em tempo real

### 2. Processamento por IA e Geração de Relatórios

- **Transcrição** - Enviar as suas gravações de áudio para a ElevenLabs para conversão de fala em texto
- **Automatização de relatórios** - Gerar relatórios clínicos utilizando modelos de linguagem Google Gemini com base na transcrição e no seu contexto clínico
- **Deteção de disfluências** - Identificar e classificar automaticamente comportamentos de gaguez nas gravações
- **Informações clínicas** - Fornecer análises estatísticas e tendências para apoiar o planeamento do tratamento

### 3. Comunicação

- **Notificações do serviço** - Enviar atualizações importantes sobre a sua conta, atribuições ou alterações na plataforma
- **Convites de terapeutas** - Enviar códigos de convite por email a potenciais pacientes em nome dos terapeutas
- **Respostas de suporte** - Responder às suas questões, feedback e pedidos de suporte
- **Comunicações administrativas** - Enviar informações relacionadas com a conta, alertas de segurança ou atualizações de políticas

### 4. Segurança e Conformidade

- **Autenticação e autorização** - Verificar a identidade do utilizador e aplicar permissões baseadas em funções
- **Prevenção de fraude** - Detetar e prevenir acessos não autorizados, abusos ou ameaças de segurança
- **Isolamento multi-tenant** - Garantir a separação rigorosa de dados entre organizações
- **Registo de auditoria** - Manter registos de acessos e modificações para conformidade de segurança
- **Integridade dos dados** - Prevenir carregamentos duplicados e garantir a consistência dos dados

### 5. Análise e Melhoria

- **Análise de utilização** - Compreender como os utilizadores interagem com a plataforma para melhorar a experiência de utilização
- **Desenvolvimento de funcionalidades** - Identificar quais funcionalidades são mais valiosas e onde concentrar os esforços de desenvolvimento
- **Otimização de desempenho** - Monitorizar o desempenho do sistema e identificar estrangulamentos
- **Garantia de qualidade** - Testar e melhorar a precisão da transcrição por IA e da geração de relatórios

## Como Partilhamos as Suas Informações

Não vendemos as suas informações pessoais a terceiros. Partilhamos as suas informações apenas nas seguintes circunstâncias limitadas:

### 1. Prestadores de Serviços Terceiros

Utilizamos serviços de terceiros de confiança para operar a nossa plataforma:

- **ElevenLabs** - Fornece transcrição de fala para texto por IA (Scribe v2). As gravações de áudio são enviadas para a ElevenLabs para processamento. Consulte a política de privacidade da ElevenLabs em [https://elevenlabs.io/privacy](https://elevenlabs.io/privacy)
- **Google AI (Gemini)** - Fornece modelos de linguagem de grande escala para geração de relatórios clínicos e funcionalidades assistidas por IA. Consulte a política de privacidade da Google em [https://policies.google.com/privacy](https://policies.google.com/privacy)
- **Google Cloud Platform** - Armazena ficheiros de áudio/vídeo e logótipos no Google Cloud Storage com encriptação. Consulte a política de privacidade da Google em [https://policies.google.com/privacy](https://policies.google.com/privacy)
- **Railway** - Aloja a nossa infraestrutura de aplicações. Consulte a política de privacidade da Railway em [https://railway.app/legal/privacy](https://railway.app/legal/privacy)
- **Prestadores de serviços de email** - Entregam emails transacionais (convites, recuperação de palavras-passe, notificações)

Estes prestadores estão contratualmente obrigados a proteger as suas informações e a utilizá-las apenas para os fins que especificamos.

### 2. Dentro da Sua Organização

No nosso sistema multi-tenant:

- **Terapeutas** na sua organização podem ver todos os relatórios e dados de pacientes dentro da organização (sujeitos às permissões da sua função)
- **Administradores** na sua organização podem gerir utilizadores, ver análises e aceder a dados de toda a organização
- **Pacientes** só podem ver os seus próprios dados e relatórios
- **Proprietários da plataforma** (administradores da UpSpeech) têm acesso entre tenants apenas para fins de administração do sistema e suporte

### 3. Requisitos Legais

Podemos divulgar as suas informações se tal for exigido por lei ou em resposta a:

- **Ordens judiciais ou processos legais** - Intimações, mandados ou outros pedidos legais
- **Pedidos de autoridades policiais** - Pedidos válidos de autoridades governamentais
- **Proteção legal** - Para proteger os nossos direitos, propriedade ou segurança, ou os dos nossos utilizadores ou do público
- **Conformidade regulamentar** - Para cumprir requisitos regulamentares aplicáveis de saúde, proteção de dados ou outros

### 4. Transferências Empresariais

Se a UpSpeech estiver envolvida numa fusão, aquisição ou venda de ativos, as suas informações podem ser transferidas para a entidade adquirente. Notificá-lo-emos por email e/ou aviso destacado na nossa plataforma de qualquer alteração na propriedade ou controlo.

### 5. Com o Seu Consentimento

Podemos partilhar as suas informações para outros fins com o seu consentimento explícito, tal como:

- Partilhar dados de investigação anonimizados com instituições académicas
- Participar em estudos de caso ou testemunhos (com a sua aprovação prévia)
- Integrar com ferramentas de terceiros que autorize

## Armazenamento de Dados e Segurança

### Onde Armazenamos os Seus Dados

- **Base de dados** - Base de dados PostgreSQL alojada na Railway (servidores da União Europeia)
- **Armazenamento de ficheiros** - Google Cloud Storage (região da União Europeia)
- **Servidores de aplicações** - Infraestrutura Railway (servidores da União Europeia)

### Medidas de Segurança

Implementamos práticas de segurança padrão da indústria:

- **Encriptação em trânsito** - Todos os dados transmitidos entre o seu navegador e os nossos servidores utilizam encriptação TLS/SSL (HTTPS)
- **Encriptação em repouso** - Os ficheiros de áudio e as bases de dados são encriptados quando armazenados
- **Segurança de palavras-passe** - As palavras-passe são protegidas com Argon2id, um algoritmo criptográfico seguro
- **Autenticação JWT** - Autenticação stateless baseada em tokens com expiração de 24 horas
- **Controlo de acesso baseado em funções** - Aplicação rigorosa de permissões de utilizador com base nas funções
- **Isolamento multi-tenant** - Isolamento ao nível das linhas da base de dados garante que as organizações não acedem aos dados umas das outras
- **Higienização de entradas** - Todas as entradas dos utilizadores são higienizadas para prevenir XSS, injeção de SQL e outros ataques
- **Limitação de taxa** - Proteção contra ataques de força bruta nos endpoints de autenticação
- **Monitorização de segurança** - Monitorização contínua de atividades suspeitas e acessos não autorizados
- **Atualizações regulares** - Aplicação atempada de correções e atualizações de segurança

### Retenção de Dados

- **Contas ativas** - Retemos os seus dados enquanto a sua conta estiver ativa
- **Contas inativas** - Se a sua conta estiver inativa durante 2 anos, podemos eliminar os seus dados após aviso prévio
- **Retenção legal** - Podemos reter determinados dados por mais tempo se exigido por lei ou para fins comerciais legítimos (ex.: prevenção de fraude, litígios)
- **Pedidos de eliminação** - Pode solicitar a eliminação dos seus dados a qualquer momento (consulte a secção Os Seus Direitos)
- **Cópias de segurança** - Os dados eliminados podem persistir em cópias de segurança até 90 dias antes da remoção permanente

## Os Seus Direitos

Ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD), tem os seguintes direitos relativamente às suas informações pessoais:

### 1. Acesso e Portabilidade

- **Acesso** - Solicitar uma cópia das informações pessoais que detemos sobre si
- **Portabilidade de dados** - Receber os seus dados num formato estruturado e legível por máquina (JSON)
- **Painel da conta** - Ver e transferir os seus relatórios, gravações e histórico de exercícios diretamente na plataforma

### 2. Correção e Atualização

- **Atualizações de perfil** - Atualizar o seu nome, email, palavra-passe e preferência de idioma nas Definições da Conta
- **Correção de dados** - Solicitar a correção de informações inexatas ou incompletas
- **Edição de relatórios** - Os terapeutas podem editar relatórios em rascunho antes de os finalizar

### 3. Eliminação e Restrição

- **Eliminação da conta** - Solicitar a eliminação da sua conta e dados associados
- **Eliminação de gravações** - Eliminar gravações individuais de áudio/vídeo (também as remove do Google Cloud Storage)
- **Eliminação de relatórios** - Eliminar relatórios específicos (apenas terapeutas)
- **Restrição de processamento** - Solicitar que paremos de processar os seus dados (com algumas exceções para requisitos legais)

### 4. Oposição e Retirada

- **Opor-se ao processamento** - Opor-se a determinadas utilizações dos seus dados (ex.: comunicações de marketing, embora atualmente não enviemos emails de marketing)
- **Retirar o consentimento** - Retirar o consentimento para processamento quando o consentimento é a base legal
- **Opt-out** - Cancelar a subscrição de emails não essenciais utilizando a ligação de cancelamento de subscrição

### 5. Reclamação

- **Autoridade de controlo** - Apresentar uma reclamação junto da Comissão Nacional de Proteção de Dados (CNPD) ou da autoridade de proteção de dados do seu país
- **Contacte-nos** - Contacte-nos diretamente com questões de privacidade em help@upspeech.app

**Para exercer estes direitos**, envie-nos um email para **help@upspeech.app** com o seu pedido. Responderemos no prazo de 30 dias.

## Privacidade de Menores

A UpSpeech não se destina a crianças com menos de 13 anos de idade. Não recolhemos intencionalmente informações pessoais de crianças com menos de 13 anos.

Os utilizadores com idades entre 13 e 17 anos podem utilizar a plataforma apenas com o consentimento e supervisão de um progenitor, tutor legal ou terapeuta da fala licenciado. O adulto supervisor é responsável pela utilização da plataforma pelo menor, incluindo a obtenção de qualquer consentimento necessário antes de carregar gravações de fala.

Os utilizadores com 18 anos ou mais são os únicos responsáveis pela sua própria utilização da plataforma e pelo conteúdo que carregam.

Se tomarmos conhecimento de que recolhemos informações pessoais de uma criança com menos de 13 anos sem o devido consentimento parental, tomaremos medidas para eliminar essa informação prontamente.

## Transferências Internacionais de Dados

A UpSpeech está sediada em Portugal, na União Europeia. Os nossos servidores e infraestrutura principal estão localizados na União Europeia. Alguns prestadores de serviços terceiros que utilizamos podem processar dados fora da UE.

Quando os dados são transferidos para fora do Espaço Económico Europeu (EEE), garantimos que existem salvaguardas adequadas, tais como Cláusulas Contratuais-Tipo ou decisões de adequação aprovadas pela Comissão Europeia.

Se estiver a aceder à nossa plataforma fora da UE, tenha em atenção que as suas informações são armazenadas e processadas na União Europeia, que possui normas rigorosas de proteção de dados ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD).

## Base Legal para o Processamento (RGPD)

A UpSpeech está sediada em Portugal e sujeita ao Regulamento Geral sobre a Proteção de Dados (RGPD). Processamos os seus dados pessoais com base nos seguintes fundamentos legais:

- **Contrato** - Processamento necessário para fornecer os nossos serviços ao abrigo dos nossos Termos de Serviço
- **Interesses legítimos** - Para prevenção de fraude, segurança, análise e melhoria do serviço
- **Consentimento** - Para atividades de processamento específicas em que solicitamos o seu consentimento (ex.: carregamento de gravações)
- **Obrigação legal** - Para cumprir leis e regulamentos aplicáveis

Os seus direitos ao abrigo do RGPD estão descritos na secção "Os Seus Direitos" acima.

### Contacto para Proteção de Dados

Para questões relacionadas com o RGPD, contacte-nos em **help@upspeech.app**.

A nossa autoridade de controlo é a Comissão Nacional de Proteção de Dados (CNPD), Portugal.

## Cookies e Tecnologias de Rastreio

A UpSpeech utiliza tecnologias de rastreio mínimas:

### Armazenamento Local

Armazenamos o seguinte no localStorage do seu navegador:

- **Token de autenticação** - Token JWT para manter a sua sessão (expira após 24 horas)
- **Dados do perfil do utilizador** - Cópia em cache das suas informações de utilizador para carregamentos de página mais rápidos
- **Preferência de idioma** - O idioma de interface selecionado

### Sem Cookies de Terceiros

Não utilizamos cookies de terceiros para fins de publicidade ou rastreio. Não participamos em redes de publicidade comportamental.

### Definições do Navegador

Pode limpar o localStorage a qualquer momento através das definições do seu navegador. Tenha em atenção que limpar o localStorage terminará a sua sessão na plataforma.

Para mais detalhes, consulte a nossa [Política de Cookies](/cookies).

## Alterações a Esta Política de Privacidade

Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações nas nossas práticas, tecnologia, requisitos legais ou outros fatores. Notificá-lo-emos de quaisquer alterações materiais através de:

- **Notificação por email** - Enviando um email para o endereço associado à sua conta
- **Aviso na plataforma** - Exibindo um aviso destacado dentro da plataforma
- **Data da Última Atualização** - Atualizando a data de "Última Atualização" no topo desta política

A sua utilização continuada da UpSpeech após a data de entrada em vigor das alterações constitui a sua aceitação da Política de Privacidade atualizada. Se não concordar com as alterações, por favor descontinue a utilização da plataforma.

## Contacte-nos

Se tiver questões, preocupações ou pedidos relativos a esta Política de Privacidade ou às nossas práticas de dados, por favor contacte-nos:

**Email:** hello@upspeech.app
**LinkedIn:** [https://www.linkedin.com/company/upspeech/](https://www.linkedin.com/company/upspeech/)
**Plataforma:** Utilize a ligação "Suporte" no rodapé da plataforma para submeter um pedido de suporte

Responderemos à sua consulta no prazo de 30 dias.

---

**Obrigado por confiar na UpSpeech com os seus dados. Estamos empenhados em proteger a sua privacidade e em fornecer uma plataforma segura e eficaz para a terapia da fala.**
