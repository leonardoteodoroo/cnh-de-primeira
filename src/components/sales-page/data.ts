import {
  AlertTriangle,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Gauge,
  Map,
  ShieldCheck,
  Target,
  Trophy,
  Wallet,
} from "lucide-react";

export const salesCopy = {
  heroEyebrow: "CNH de Primeira · Método Anderson Mageski",
  heroTitle: "A CNH mudou. O jeito de estudar também.",
  heroSubtitle: "Sua CNH na primeira tentativa!",
  heroBody:
    "O gratuito te entrega conteúdo. O curso preparatório para a prova da CNH te entrega direção. Faça um diagnóstico, veja onde você ainda erra e siga um plano simples antes de encarar a prova teórica.",
  primaryCta: "Quero estudar com direção",
  secondaryCta: "Ver o que recebo",
  diagnosticTitle: "Não é estudar mais. É estudar com direção.",
  diagnosticBody:
    "Você pode assistir aula, fazer simulado, salvar vídeo e ainda assim chegar na prova sem saber se está pronto. Não por falta de esforço. Por falta de sequência.",
  methodName: "Método Raio-X CNH",
  methodBody:
    "Um plano de preparação que começa pelo diagnóstico, mostra os pontos fracos e transformou erro em treino guiado antes do Detran.",
  instructorName: "Anderson Mageski",
  instructorRole: "Professor, especialista em gestão, mobilidade e segurança no trânsito",
  instructorBody:
    "Anderson organizou o treinamento para quem não quer decorar conteúdo solto. A ideia é simples: entender o que a prova cobra, treinar no formato certo e chegar com mais calma.",
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
  { value: "32.000+", label: "alunos preparados" },
  { value: "4.7/5", label: "avaliação do instrutor" },
  { value: "2", label: "cursos base do Anderson" },
  { value: "30", label: "questões no formato da prova" },
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
