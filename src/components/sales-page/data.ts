import {
  AlertTriangle,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Gauge,
  Gavel,
  HeartPulse,
  Leaf,
  Map,
  ShieldCheck,
  ShieldAlert,
  Target,
  Trophy,
  Wallet,
  Wrench,
} from "lucide-react";

export const salesCopy = {
  heroEyebrow: "CURSO PREPARATÓRIO PARA A PROVA DA CNH + SIMULADOS",
  heroTitle: "A CNH mudou. O jeito de estudar também.",
  heroBody:
    "O gratuito te entrega conteúdo. O curso preparatório para a prova da CNH te entrega direção. Você já viu no QUIZ onde a prova pode te derrubar. Agora, pare de tentar decorar tudo e siga um treino focado para não desperdiçar seu tempo e dinheiro com reprovação.",
  primaryCta: "Quero estudar com direção",
  secondaryCta: "Ver o que recebo",
  diagnosticTitle: "Não é estudar mais. É estudar CERTO!",
  diagnosticBody:
    "Você pode assistir aula, fazer vários simulados, e ainda assim chegar na prova com aquela sensação de dúvida se está realmente pronto. Isso acontece não por falta de esforço, mas por falta de aplicar esse esforço em um estudo de forma estruturada.",
  methodName: "PARE DE SE AFOGAR EM QUESTÕES",
  methodBody:
    "Um plano de preparação que começa pelo diagnóstico, mostra os pontos fracos e transformou erro em treino guiado antes do Detran.",
  instructorName: "Anderson Mageski",
  instructorRole: "Professor com especialização em Gestão, Mobilidade e Segurança no Trânsito · 10+ anos na área",
  instructorBody:
    "Professor por formação, com mais de uma década dedicada à educação e conscientização de motoristas. Anderson não criou mais um curso genérico — ele limpou o excesso, organizou o que os Detrans realmente cobram e montou simulados comentados para você entender a malícia de cada alternativa.",
  officialNote:
    "Este treinamento é preparação complementar. Ele não substitui etapas oficiais, exames, taxas estaduais ou regras do Detran.",
};

export const painCards = [
  {
    icon: Brain,
    title: "Você estuda, mas não sabe se está pronto",
    text: "A ansiedade aparece porque conteúdo solto não mostra onde você ainda erra.",
  },
  {
    icon: Wallet,
    title: "Errar pode custar tempo, taxa e espera",
    text: "Dependendo do estado e da etapa, reprovar vira remarcação, deslocamento e mais pressão.",
  },
  {
    icon: AlertTriangle,
    title: "A internet mistura ajuda com promessa suspeita",
    text: "App aleatório, vídeo fora de ordem, promessa milagrosa e golpe disputam sua atenção.",
  },
];

export const offerItems = [
  {
    icon: ClipboardCheck,
    title: "Diagnóstico de prontidão",
    text: "Você começa vendo onde a prova pode te pegar antes de marcar a tentativa.",
  },
  {
    icon: Target,
    title: "Questões certas, não volume infinito",
    text: "Treino focado em temas cobrados: legislação, sinalização, direção defensiva, primeiros socorros e infrações.",
  },
  {
    icon: BookOpenCheck,
    title: "Comentários que explicam o erro",
    text: "Não basta saber a alternativa correta. Você entende por que a alternativa tentadora estava errada.",
  },
  {
    icon: Map,
    title: "Plano simples pelo celular",
    text: "Sequência de estudo para parar de pular de vídeo em vídeo sem saber o próximo passo.",
  },
  {
    icon: ShieldCheck,
    title: "Treino sem promessa enganosa",
    text: "Não prometemos questão vazada, banco oficial ou aprovação garantida. Prometemos direção e clareza.",
  },
  {
    icon: Clock3,
    title: "Preparação para chegar mais calmo",
    text: "Você treina antes, erra antes e entende antes. O dia da prova fica menos improvisado.",
  },
];

export const methodSteps = [
  {
    number: "1",
    title: "Descubra",
    text: "Faça o diagnóstico e veja onde seu estudo ainda está fraco.",
  },
  {
    number: "2",
    title: "Treine",
    text: "Revise os temas certos com questões comentadas e explicação direta.",
  },
  {
    number: "3",
    title: "Chegue pronto",
    text: "Entre na prova sabendo o que revisou, onde melhorou e onde precisa atenção.",
  },
];

export const resultMetrics = [
  { value: "13h+", label: "de conteúdo direto" },
  { value: "4.7/5", label: "avaliação do instrutor" },
  { value: "16", label: "aulas comentadas" },
  { value: "60+", label: "questões no formato da prova" },
];

export const studentCards = [
  { name: "Mariana", location: "SP", result: "28/30 após duas reprovações" },
  { name: "Thiago", location: "RJ", result: "gabaritou estudando no ônibus" },
  { name: "Fernanda", location: "MG", result: "27 acertos entendendo rotatória" },
  { name: "Roberto", location: "RS", result: "voltou a estudar aos 42" },
  { name: "Camila", location: "PR", result: "parou de estudar no escuro" },
  { name: "Rafael", location: "SP", result: "foi para a prova com plano" },
  { name: "Beatriz", location: "RJ", result: "chegou com menos ansiedade" },
  { name: "Lucas", location: "RS", result: "treinou pelo celular" },
];

export const reviewRows = [
  [
    {
      name: "Mariana Souza",
      age: 19,
      location: "São Paulo, SP",
      text: "Eu já tinha reprovado duas vezes porque ficava nervosa e caía nas pegadinhas. O Raio-X me mostrou como ler as questões com calma.",
      highlight: "28/30 na terceira tentativa",
    },
    {
      name: "Thiago Ramos",
      age: 24,
      location: "Niterói, RJ",
      text: "A autoescola mandava decorar o livro inteiro. Fiz as aulas pelo celular no ônibus e parei de travar em mecânica e primeiros socorros.",
      highlight: "gabaritou de primeira",
    },
    {
      name: "Fernanda Costa",
      age: 31,
      location: "Belo Horizonte, MG",
      text: "Eu sempre escolhia a primeira resposta lógica. O treino me fez perceber que era exatamente ali que eu caía.",
      highlight: "mudou a forma de responder",
    },
    {
      name: "Roberto de Oliveira",
      age: 42,
      location: "Porto Alegre, RS",
      text: "Voltar a estudar legislação depois dos 40 parecia pesado. As aulas foram diretas, sem enrolação.",
      highlight: "sem tempo perdido",
    },
  ],
  [
    {
      name: "Camila",
      age: 28,
      location: "Curitiba, PR",
      text: "Eu tinha medo de pagar reteste. O diagnóstico mostrou onde eu precisava revisar antes de arriscar.",
      highlight: "estudou com foco",
    },
    {
      name: "Rafael",
      age: 22,
      location: "São Paulo, SP",
      text: "Achava que precisava decorar tudo. O método me fez entender o que revisar e por que eu errava.",
      highlight: "menos decoreba",
    },
    {
      name: "Beatriz",
      age: 34,
      location: "Rio de Janeiro, RJ",
      text: "As perguntas de infração me deixavam insegura. Depois dos comentários, comecei a enxergar as palavras que mudavam tudo.",
      highlight: "menos ansiedade",
    },
    {
      name: "Lucas",
      age: 25,
      location: "Porto Alegre, RS",
      text: "Eu trabalhava o dia todo e só conseguia estudar pelo celular. O plano deixou simples saber o próximo passo.",
      highlight: "plano pelo celular",
    },
  ],
];

export const faqItems = [
  {
    question: "Se existe curso gratuito no app, por que eu pagaria?",
    answer:
      "Porque conteúdo gratuito não é a mesma coisa que diagnóstico. O CNH de Primeira organiza o estudo, mostra onde você erra e entrega treino guiado para revisar com direção.",
  },
  {
    question: "As questões são iguais às do Detran?",
    answer:
      "Nós não prometemos questão vazada, banco oficial ou cópia da prova. O treinamento usa temas, formato e raciocínio compatíveis com o que costuma ser cobrado na prova teórica.",
  },
  {
    question: "Isso substitui a autoescola, app oficial ou etapa do Detran?",
    answer:
      "Não. É uma preparação complementar para estudar melhor. Você continua responsável por cumprir as regras, agendamentos, exames e exigências do seu estado.",
  },
  {
    question: "E se eu tiver pouco tempo?",
    answer:
      "A página foi pensada para celular e estudo em blocos. O foco é revisar os pontos certos, não criar uma rotina impossível.",
  },
  {
    question: "O produto garante aprovação?",
    answer:
      "Não existe aprovação garantida. A promessa correta é clareza: saber o que revisar, treinar melhor e chegar mais preparado para a primeira tentativa.",
  },
];

export const finalBullets = [
  { icon: CheckCircle2, text: "Diagnóstico antes da venda" },
  { icon: Gauge, text: "Treino no formato da prova" },
  { icon: Trophy, text: "Plano simples para primeira tentativa" },
];

export const closingCta = {
  eyebrow: "Última chamada",
  headline: "Clareza custa menos que uma reprovação.",
  price: "R$ 44,90",
  priceNote: "Pagamento único · Sem mensalidade · Sem pegadinha",
  cta: "Quero estudar com direção",
  disclaimer:
    "Este treinamento é preparação complementar. Ele não substitui etapas oficiais, exames, taxas estaduais ou regras do Detran.",
};

export const courseModules = [
  {
    icon: Gavel,
    title: "Legislação de Trânsito",
    hours: "5h26",
    lessons: 7,
    topics: [
      "Sistema Nacional de Trânsito e CTB",
      "Categorias de habilitação (A, B, C e D)",
      "Sinalização vertical, horizontal e auxiliar",
      "Infrações, crimes e penalidades",
      "Normas de circulação e conduta",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Direção Defensiva",
    hours: "2h57",
    lessons: 4,
    topics: [
      "Direção preventiva vs. corretiva",
      "Os 5 elementos: conhecimento, atenção, previsão, decisão e habilidade",
      "Condições adversas (luz, tempo, via, veículo)",
      "Tipos de colisão e como evitá-las",
    ],
  },
  {
    icon: HeartPulse,
    title: "Primeiros Socorros",
    hours: "1h58",
    lessons: 2,
    topics: [
      "Sinalização de sinistro e acionamento do socorro",
      "Protocolo ABCDE de avaliação primária",
      "Controle de hemorragias e fraturas",
    ],
  },
  {
    icon: Wrench,
    title: "Mecânica Básica",
    hours: "1h45",
    lessons: 1,
    topics: [
      "Motor, arrefecimento e lubrificação",
      "Transmissão, freios e direção",
      "Manutenção preventiva essencial",
    ],
  },
  {
    icon: Leaf,
    title: "Meio Ambiente",
    hours: "0h44",
    lessons: 1,
    topics: [
      "Poluentes, gases e chuva ácida",
      "Impactos da condução no meio ambiente urbano",
    ],
  },
  {
    icon: Brain,
    title: "Cidadania e Convivência",
    hours: "0h25",
    lessons: 1,
    topics: [
      "Direitos e deveres no trânsito",
      "Comunicação e convivência segura",
    ],
  },
];
