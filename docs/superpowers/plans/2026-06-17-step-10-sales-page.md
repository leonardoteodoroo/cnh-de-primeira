# Step 10 Sales Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a nova rota `/step-10-sales-page/` como sales page completa do CNH de Primeira, usando a capa `ad-3.png`, trazendo a foto do instrutor para `public/images/vendas-temp/`, mantendo a rota antiga `/step-10-vendas/` como ponte e adaptando o padrão de depoimentos/stepper do projeto Nail Designer.

**Architecture:** A página será composta por seções pequenas em `src/components/sales-page/`, com dados centralizados em `data.ts` para manter copy e prova social fáceis de revisar. A rota nova em `src/app/step-10-sales-page/page.tsx` apenas orquestra as seções; a rota antiga vira redirecionamento visual para preservar links existentes no funil estático. O teste de fumaça usa Node nativo para validar assets, slug, links e copy crítica sem adicionar dependências.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, `next/image`, `next/link`, `framer-motion`, `lucide-react`, Node `fs`/`assert` para teste de fumaça.

---

## Contexto Travado

- Rota atual: `src/app/step-10-vendas/page.tsx` existe, mas hoje só renderiza uma galeria com imagens de draft.
- Nova rota exigida: `src/app/step-10-sales-page/page.tsx`.
- Link anterior no funil: `src/app/step-09-estudar-certo/page.tsx` aponta para `/step-10-vendas`.
- Capa já disponível: `public/images/vendas-temp/ad-3.png` com dimensão `1672 x 941`.
- Foto do instrutor fora do projeto: `/home/leonardotl/Downloads/_Fotografia_editorial_hiper-realista._[SUJEITO]__Homem_202606170041.jpeg` com dimensão `1792 x 2400`.
- Destino da foto no projeto: `public/images/vendas-temp/instrutor-anderson.jpeg`.
- Referência de depoimentos: `/home/leonardotl/.agents/Memoria/Base de Projetos/Sites/Landing Pages/Curso Nail Designer/components/sections/Step13_WallOfLove.tsx`.
- Referência de stepper: `/home/leonardotl/.agents/Memoria/Base de Projetos/Sites/Landing Pages/Curso Nail Designer/components/sections/Step08_CertificatesStepper2.tsx`.
- Copy de base: `docs/copy_web.md`, `docs/briefing.md`, `docs/relatorio_dores_cnh-serve-para-ads.md`, `docs/depoimentos a ver.md`.
- Fonte oficial verificada em 2026-06-17: Ministério dos Transportes informa que o candidato pode estudar gratuitamente pela plataforma digital/app CNH do Brasil, mas os exames seguem no processo. Use isso como contraste honesto: o gratuito entrega conteúdo; a sales page vende diagnóstico, treino guiado e clareza.
- Não tocar em `_arquivo/`; ele está fechado.

## Estrutura de Arquivos

- Criar: `scripts/check-sales-page.mjs`  
  Teste de fumaça sem dependências para validar rota, assets, links e copy crítica.
- Modificar: `package.json`  
  Adicionar script `test:sales-page`.
- Copiar asset: de `/home/leonardotl/Downloads/_Fotografia_editorial_hiper-realista._[SUJEITO]__Homem_202606170041.jpeg` para `public/images/vendas-temp/instrutor-anderson.jpeg`.
- Criar: `src/components/sales-page/data.ts`  
  Fonte única dos textos estruturados da página.
- Criar: `src/components/sales-page/SalesHero.tsx`  
  Hero principal com capa `ad-3.png`, CTA e promessa de diagnóstico.
- Criar: `src/components/sales-page/DiagnosticShift.tsx`  
  Seção que vira a chave do quiz para a venda: estudo no escuro vs. plano.
- Criar: `src/components/sales-page/OfferStack.tsx`  
  Oferta empilhada com benefícios e mecanismo do produto.
- Criar: `src/components/sales-page/InstructorSection.tsx`  
  Autoridade do Anderson Mageski usando a foto copiada.
- Criar: `src/components/sales-page/StudentResultsStepper.tsx`  
  Adaptação do stepper/loop do Nail Designer para resultados de alunos CNH.
- Criar: `src/components/sales-page/WallOfLove.tsx`  
  Adaptação do mural/ticker do Nail Designer para depoimentos CNH.
- Criar: `src/components/sales-page/FAQAndClose.tsx`  
  Objeções, garantia de clareza e CTA final.
- Criar: `src/app/step-10-sales-page/page.tsx`  
  Composição da sales page.
- Modificar: `src/app/step-10-vendas/page.tsx`  
  Transformar em ponte para `/step-10-sales-page`.
- Modificar: `src/app/step-09-estudar-certo/page.tsx`  
  Atualizar CTA para `/step-10-sales-page`.

---

### Task 1: Teste de Fumaça e Asset do Instrutor

**Files:**
- Create: `scripts/check-sales-page.mjs`
- Modify: `package.json`
- Copy: `/home/leonardotl/Downloads/_Fotografia_editorial_hiper-realista._[SUJEITO]__Homem_202606170041.jpeg` -> `public/images/vendas-temp/instrutor-anderson.jpeg`

- [ ] **Step 1: Criar teste que falha antes da implementação**

Crie `scripts/check-sales-page.mjs` com este conteúdo completo:

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const file = (...parts) => join(root, ...parts);
const read = (...parts) => readFileSync(file(...parts), "utf8");

const requiredFiles = [
  ["capa da página", "public/images/vendas-temp/ad-3.png"],
  ["foto do instrutor", "public/images/vendas-temp/instrutor-anderson.jpeg"],
  ["rota nova", "src/app/step-10-sales-page/page.tsx"],
  ["ponte da rota antiga", "src/app/step-10-vendas/page.tsx"],
  ["link do step 09", "src/app/step-09-estudar-certo/page.tsx"],
  ["dados da sales page", "src/components/sales-page/data.ts"],
  ["hero da sales page", "src/components/sales-page/SalesHero.tsx"],
  ["mural do amor", "src/components/sales-page/WallOfLove.tsx"],
  ["stepper de resultados", "src/components/sales-page/StudentResultsStepper.tsx"],
];

for (const [label, relativePath] of requiredFiles) {
  assert.ok(existsSync(file(relativePath)), `Arquivo ausente: ${label} (${relativePath})`);
}

const step09 = read("src/app/step-09-estudar-certo/page.tsx");
assert.match(step09, /href="\/step-10-sales-page"/, "Step 09 deve apontar para /step-10-sales-page");
assert.doesNotMatch(step09, /href="\/step-10-vendas"/, "Step 09 não deve apontar para /step-10-vendas");

const legacy = read("src/app/step-10-vendas/page.tsx");
assert.match(legacy, /\/step-10-sales-page/, "Rota antiga deve encaminhar para /step-10-sales-page");

const salesPage = read("src/app/step-10-sales-page/page.tsx");
assert.match(salesPage, /SalesHero/, "Página deve renderizar SalesHero");
assert.match(salesPage, /WallOfLove/, "Página deve renderizar WallOfLove");
assert.match(salesPage, /StudentResultsStepper/, "Página deve renderizar StudentResultsStepper");
assert.match(salesPage, /FAQAndClose/, "Página deve renderizar FAQAndClose");

const data = read("src/components/sales-page/data.ts");
const requiredCopy = [
  "A CNH mudou. O jeito de estudar também.",
  "O gratuito te entrega conteúdo. O CNH de Primeira te entrega direção.",
  "Não é estudar mais. É estudar com direção.",
  "Método Raio-X CNH",
  "Anderson Mageski",
  "não prometemos questão vazada",
];

for (const phrase of requiredCopy) {
  assert.ok(data.includes(phrase), `Copy crítica ausente em data.ts: ${phrase}`);
}

console.log("Sales page smoke check passed.");
```

- [ ] **Step 2: Adicionar script de teste**

No `package.json`, mantenha os scripts existentes e adicione `test:sales-page`. O bloco `scripts` deve ficar assim:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test:sales-page": "node scripts/check-sales-page.mjs"
}
```

- [ ] **Step 3: Rodar o teste e confirmar falha útil**

Run:

```bash
npm run test:sales-page
```

Expected: FAIL com pelo menos uma destas mensagens:

```text
Arquivo ausente: foto do instrutor
Arquivo ausente: rota nova
Arquivo ausente: dados da sales page
```

- [ ] **Step 4: Copiar a foto do instrutor para o projeto**

Run:

```bash
cp "/home/leonardotl/Downloads/_Fotografia_editorial_hiper-realista._[SUJEITO]__Homem_202606170041.jpeg" "public/images/vendas-temp/instrutor-anderson.jpeg"
```

- [ ] **Step 5: Confirmar assets**

Run:

```bash
file public/images/vendas-temp/ad-3.png public/images/vendas-temp/instrutor-anderson.jpeg
```

Expected:

```text
public/images/vendas-temp/ad-3.png: PNG image data
public/images/vendas-temp/instrutor-anderson.jpeg: JPEG image data
```

- [ ] **Step 6: Commit**

```bash
git add scripts/check-sales-page.mjs package.json public/images/vendas-temp/instrutor-anderson.jpeg
git commit -m "test: add sales page smoke check"
```

---

### Task 2: Dados Estruturados da Sales Page

**Files:**
- Create: `src/components/sales-page/data.ts`
- Test: `scripts/check-sales-page.mjs`

- [ ] **Step 1: Criar `data.ts`**

Crie `src/components/sales-page/data.ts` com este conteúdo completo:

```ts
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
    "O gratuito te entrega conteúdo. O CNH de Primeira te entrega direção. Faça um diagnóstico, veja onde você ainda erra e siga um plano simples antes de encarar a prova teórica.",
  primaryCta: "Quero estudar com direção",
  secondaryCta: "Ver o que recebo",
  diagnosticTitle: "Não é estudar mais. É estudar com direção.",
  diagnosticBody:
    "Você pode assistir aula, fazer simulado, salvar vídeo e ainda assim chegar na prova sem saber se está pronto. Não por falta de esforço. Por falta de sequência.",
  methodName: "Método Raio-X CNH",
  methodBody:
    "Um plano de preparação que começa pelo diagnóstico, mostra os pontos fracos e transforma erro em treino guiado antes do Detran.",
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
      "Não prometemos questão vazada, banco oficial ou cópia da prova. O treinamento usa temas, formato e raciocínio compatíveis com o que costuma ser cobrado na prova teórica.",
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
```

- [ ] **Step 2: Rodar teste de fumaça**

Run:

```bash
npm run test:sales-page
```

Expected: ainda FAIL por ausência da rota nova e dos componentes principais.

- [ ] **Step 3: Rodar lint do arquivo de dados**

Run:

```bash
npm run lint -- src/components/sales-page/data.ts
```

Expected: PASS sem erro de TypeScript/ESLint.

- [ ] **Step 4: Commit**

```bash
git add src/components/sales-page/data.ts
git commit -m "feat: add sales page copy data"
```

---

### Task 3: Hero e Rota Nova

**Files:**
- Create: `src/components/sales-page/SalesHero.tsx`
- Create: `src/app/step-10-sales-page/page.tsx`
- Test: `scripts/check-sales-page.mjs`

- [ ] **Step 1: Criar `SalesHero.tsx`**

Crie `src/components/sales-page/SalesHero.tsx` com este conteúdo completo:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { salesCopy } from "./data";

export function SalesHero() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.13_0.015_85)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/vendas-temp/ad-3.png"
          alt="Capa do CNH de Primeira com mesa de estudos, notebook com aula teórica e materiais de revisão"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-[oklch(0.13_0.015_85)]" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-5 py-6 md:px-8">
        <nav className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
          <Link href="/step-09-estudar-certo" className="hover:text-white">
            Voltar
          </Link>
          <span>CNH de Primeira</span>
        </nav>

        <div className="flex flex-1 items-center py-14 md:py-20">
          <div className="grid w-full items-center gap-10 md:grid-cols-[1.04fr_0.78fr]">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-yellow-200 backdrop-blur">
                <BadgeCheck size={16} />
                {salesCopy.heroEyebrow}
              </div>

              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-yellow-300">
                {salesCopy.heroSubtitle}
              </p>

              <h1 className="max-w-[860px] text-[44px] font-black leading-[0.95] tracking-tight md:text-[78px]">
                {salesCopy.heroTitle}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 md:text-xl">
                {salesCopy.heroBody}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#oferta"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-6 text-sm font-black uppercase tracking-wide text-black shadow-[0_18px_50px_rgba(250,204,21,0.24)] transition hover:bg-yellow-200"
                >
                  {salesCopy.primaryCta}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="#mural-do-amor"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/16"
                >
                  {salesCopy.secondaryCta}
                  <ArrowDown size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[28px] border border-white/16 bg-white/10 p-3 shadow-2xl backdrop-blur-md"
            >
              <div className="overflow-hidden rounded-[20px] bg-black">
                <Image
                  src="/images/vendas-temp/ad-3.png"
                  alt="Visual da capa oficial usada na página de vendas do CNH de Primeira"
                  width={1672}
                  height={941}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 text-center text-[11px] font-bold uppercase tracking-tight text-white/78">
                <span className="rounded-xl bg-white/10 px-2 py-3">Diagnóstico</span>
                <span className="rounded-xl bg-white/10 px-2 py-3">Questões</span>
                <span className="rounded-xl bg-white/10 px-2 py-3">Plano</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Criar rota nova com hero inicial**

Crie `src/app/step-10-sales-page/page.tsx` com este conteúdo completo:

```tsx
import { SalesHero } from "@/components/sales-page/SalesHero";

export default function Step10SalesPage() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[oklch(0.985_0.003_85)] text-[oklch(0.15_0.01_250)]">
      <SalesHero />
    </main>
  );
}
```

- [ ] **Step 3: Rodar teste de fumaça**

Run:

```bash
npm run test:sales-page
```

Expected: FAIL porque ainda faltam `WallOfLove`, `StudentResultsStepper`, `FAQAndClose` e atualização dos links.

- [ ] **Step 4: Rodar build parcial via lint**

Run:

```bash
npm run lint -- src/app/step-10-sales-page/page.tsx src/components/sales-page/SalesHero.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/step-10-sales-page/page.tsx src/components/sales-page/SalesHero.tsx
git commit -m "feat: add sales page hero route"
```

---

### Task 4: Virada Diagnóstica, Oferta e Instrutor

**Files:**
- Create: `src/components/sales-page/DiagnosticShift.tsx`
- Create: `src/components/sales-page/OfferStack.tsx`
- Create: `src/components/sales-page/InstructorSection.tsx`
- Modify: `src/app/step-10-sales-page/page.tsx`

- [ ] **Step 1: Criar `DiagnosticShift.tsx`**

Crie `src/components/sales-page/DiagnosticShift.tsx` com este conteúdo completo:

```tsx
import { painCards, salesCopy } from "./data";

export function DiagnosticShift() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
              O ponto que muda a venda
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-zinc-950 md:text-5xl">
              {salesCopy.diagnosticTitle}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-zinc-600 md:text-xl">
            {salesCopy.diagnosticBody}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {painCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-200 text-zinc-950">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-black leading-tight text-zinc-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{card.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Criar `OfferStack.tsx`**

Crie `src/components/sales-page/OfferStack.tsx` com este conteúdo completo:

```tsx
import { methodSteps, offerItems, salesCopy } from "./data";

export function OfferStack() {
  return (
    <section id="oferta" className="bg-[oklch(0.97_0.006_85)] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
            {salesCopy.methodName}
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-zinc-950 md:text-5xl">
            Um plano para transformar erro em revisão.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-600 md:text-xl">
            {salesCopy.methodBody}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-3">
          {methodSteps.map((step) => (
            <div key={step.number} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">
                {step.number}
              </div>
              <h3 className="font-black text-zinc-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offerItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                <Icon className="mb-5 text-yellow-600" size={26} />
                <h3 className="text-lg font-black leading-tight text-zinc-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Criar `InstructorSection.tsx`**

Crie `src/components/sales-page/InstructorSection.tsx` com este conteúdo completo:

```tsx
import Image from "next/image";
import { Award, GraduationCap, ShieldCheck } from "lucide-react";
import { salesCopy } from "./data";

export function InstructorSection() {
  return (
    <section className="bg-zinc-950 px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.82fr_1fr] md:items-center">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
          <Image
            src="/images/vendas-temp/instrutor-anderson.jpeg"
            alt="Anderson Mageski, instrutor do CNH de Primeira, em foto editorial durante apresentação"
            width={1792}
            height={2400}
            sizes="(min-width: 768px) 42vw, 100vw"
            className="aspect-[4/5] w-full object-cover object-[50%_20%]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Instrutor
            </p>
            <h2 className="mt-1 text-2xl font-black">{salesCopy.instructorName}</h2>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
            Quem guia o plano
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Um professor para organizar o que a internet deixa solto.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/72">{salesCopy.instructorBody}</p>

          <div className="mt-8 grid gap-3">
            {[
              { icon: GraduationCap, text: salesCopy.instructorRole },
              { icon: Award, text: "Aulas diretas para revisão e treino de prova teórica" },
              { icon: ShieldCheck, text: "Preparação complementar, sem promessa absoluta" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <Icon className="mt-0.5 shrink-0 text-yellow-300" size={20} />
                  <span className="text-sm leading-relaxed text-white/78">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Atualizar a composição da rota**

Substitua `src/app/step-10-sales-page/page.tsx` por:

```tsx
import { DiagnosticShift } from "@/components/sales-page/DiagnosticShift";
import { InstructorSection } from "@/components/sales-page/InstructorSection";
import { OfferStack } from "@/components/sales-page/OfferStack";
import { SalesHero } from "@/components/sales-page/SalesHero";

export default function Step10SalesPage() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[oklch(0.985_0.003_85)] text-[oklch(0.15_0.01_250)]">
      <SalesHero />
      <DiagnosticShift />
      <OfferStack />
      <InstructorSection />
    </main>
  );
}
```

- [ ] **Step 5: Rodar verificações**

Run:

```bash
npm run lint -- src/app/step-10-sales-page/page.tsx src/components/sales-page/DiagnosticShift.tsx src/components/sales-page/OfferStack.tsx src/components/sales-page/InstructorSection.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/step-10-sales-page/page.tsx src/components/sales-page/DiagnosticShift.tsx src/components/sales-page/OfferStack.tsx src/components/sales-page/InstructorSection.tsx
git commit -m "feat: add sales page offer sections"
```

---

### Task 5: Stepper de Resultados e Mural do Amor

**Files:**
- Create: `src/components/sales-page/StudentResultsStepper.tsx`
- Create: `src/components/sales-page/WallOfLove.tsx`
- Modify: `src/app/step-10-sales-page/page.tsx`
- Reference: `Step08_CertificatesStepper2.tsx`, `Step13_WallOfLove.tsx`

- [ ] **Step 1: Criar `StudentResultsStepper.tsx`**

Crie `src/components/sales-page/StudentResultsStepper.tsx` com este conteúdo completo:

```tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { methodSteps, resultMetrics, studentCards } from "./data";

const tickerCards = [...studentCards, ...studentCards];

export function StudentResultsStepper() {
  return (
    <section className="relative overflow-hidden bg-zinc-50 px-5 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_36%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[0.88fr_1.12fr] md:items-center">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
              Como a preparação anda
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-zinc-950 md:text-5xl">
              Do susto no quiz até um plano claro de revisão.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 md:text-lg">
              A estrutura replica o que funciona no funil: primeiro a pessoa percebe onde erra, depois recebe direção, depois treina até chegar mais calma.
            </p>

            <div className="mt-8">
              <div className="relative mx-auto max-w-[390px] md:mx-0">
                <div className="absolute left-0 right-0 top-4 h-[2px] rounded-full bg-yellow-100" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="absolute left-0 right-0 top-4 h-[2px] origin-left rounded-full bg-yellow-400"
                />
                <div className="relative z-10 grid grid-cols-3 gap-2">
                  {methodSteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.18, type: "spring", stiffness: 220, damping: 22 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow-400 bg-white text-sm font-black text-zinc-950 ring-4 ring-yellow-50">
                        {step.number}
                      </div>
                      <strong className="mt-3 text-xs uppercase tracking-tight text-zinc-950">{step.title}</strong>
                      <span className="mt-1 text-[11px] leading-snug text-zinc-500">{step.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-xl ring-1 ring-zinc-200">
            <div className="grid grid-cols-2 gap-3">
              {resultMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-zinc-50 p-5 text-center">
                  <div className="text-3xl font-black text-zinc-950">{metric.value}</div>
                  <p className="mt-1 text-xs font-bold uppercase tracking-tight text-zinc-500">{metric.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-zinc-950">
                <CheckCircle2 className="text-yellow-600" size={20} />
                O que o aluno compra de verdade
              </div>
              <p className="text-sm leading-relaxed text-zinc-700">
                Não é uma pilha de aulas. É a tranquilidade de saber o que revisar antes de apostar a primeira tentativa.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <h3 className="mb-6 text-center text-sm font-black uppercase tracking-[0.18em] text-zinc-400">
            Milhares de alunos com mais clareza
          </h3>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
            className="flex w-max gap-4 px-2"
          >
            {tickerCards.map((card, index) => (
              <div
                key={`${card.name}-${index}`}
                className="w-56 shrink-0 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-black uppercase tracking-tight text-yellow-700">
                  {card.location}
                </p>
                <h4 className="mt-2 text-lg font-black text-zinc-950">{card.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{card.result}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Criar `WallOfLove.tsx`**

Crie `src/components/sales-page/WallOfLove.tsx` com este conteúdo completo:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { reviewRows } from "./data";

interface Review {
  name: string;
  age: number;
  location: string;
  text: string;
  highlight: string;
}

const tickerRows = reviewRows.map((row) => [...row, ...row, ...row]);

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="h-fit w-[290px] shrink-0 select-none rounded-2xl border border-white/70 bg-white/82 px-5 py-4 shadow-sm backdrop-blur md:w-[340px]">
      <p className="mb-3 text-[13px] leading-relaxed text-zinc-700">"{review.text}"</p>
      <div className="flex items-center justify-between gap-3">
        <div>
          <strong className="block text-xs font-black uppercase tracking-tight text-zinc-950">
            {review.name}
          </strong>
          <span className="text-[11px] text-zinc-500">
            {review.age} anos · {review.location}
          </span>
        </div>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black uppercase tracking-tight text-yellow-800">
          {review.highlight}
        </span>
      </div>
    </article>
  );
}

function TickerRow({
  reviews,
  direction,
  speed,
}: {
  reviews: Review[];
  direction: "left" | "right";
  speed: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const baseVelocity = direction === "left" ? -speed : speed;

  useEffect(() => {
    if (!containerRef.current) return;
    const totalWidth = containerRef.current.scrollWidth;
    setContentWidth(totalWidth / 3);
    if (direction === "right") {
      x.set(-totalWidth / 3);
    }
  }, [direction, x]);

  useAnimationFrame((_time, delta) => {
    if (shouldReduceMotion || isPaused || !contentWidth) return;

    const moveBy = baseVelocity * (delta / 16);
    const current = x.get();
    let next = current + moveBy;

    if (direction === "left") {
      if (next <= -contentWidth) next += contentWidth;
      if (next > 0) next -= contentWidth;
    } else {
      if (next >= 0) next -= contentWidth;
      if (next < -contentWidth) next += contentWidth;
    }

    x.set(next);
  });

  return (
    <div
      className="relative w-full cursor-grab touch-pan-y active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex w-max items-center gap-4 pl-4 will-change-transform"
        style={{ x }}
        drag="x"
        dragElastic={0.08}
        dragMomentum={false}
        dragConstraints={{ left: -10000, right: 10000 }}
      >
        {reviews.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}

export function WallOfLove() {
  return (
    <section id="mural-do-amor" className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <span className="inline-flex rounded-full bg-rose-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-rose-600">
          Mural do amor
        </span>
        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-zinc-950 md:text-5xl">
          Pessoas que estavam inseguras antes de chegar na prova.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
          Use os depoimentos como prova emocional: nervosismo, estudo no ônibus, rotatória, pouco tempo e volta aos estudos depois dos 40.
        </p>
      </div>

      <div className="relative mt-12 py-16">
        <div className="absolute inset-0">
          <img
            src="/images/vendas-temp/ad-3.png"
            alt="Fundo editorial do CNH de Primeira atrás dos depoimentos"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-20 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-white/58 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 flex scale-[1.02] flex-col gap-4">
          <TickerRow reviews={tickerRows[0] as Review[]} direction="left" speed={1.5} />
          <TickerRow reviews={tickerRows[1] as Review[]} direction="right" speed={1.5} />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-white to-transparent md:w-32" />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Atualizar composição da rota**

Substitua `src/app/step-10-sales-page/page.tsx` por:

```tsx
import { DiagnosticShift } from "@/components/sales-page/DiagnosticShift";
import { InstructorSection } from "@/components/sales-page/InstructorSection";
import { OfferStack } from "@/components/sales-page/OfferStack";
import { SalesHero } from "@/components/sales-page/SalesHero";
import { StudentResultsStepper } from "@/components/sales-page/StudentResultsStepper";
import { WallOfLove } from "@/components/sales-page/WallOfLove";

export default function Step10SalesPage() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[oklch(0.985_0.003_85)] text-[oklch(0.15_0.01_250)]">
      <SalesHero />
      <DiagnosticShift />
      <OfferStack />
      <InstructorSection />
      <StudentResultsStepper />
      <WallOfLove />
    </main>
  );
}
```

- [ ] **Step 4: Rodar verificações**

Run:

```bash
npm run lint -- src/app/step-10-sales-page/page.tsx src/components/sales-page/StudentResultsStepper.tsx src/components/sales-page/WallOfLove.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/step-10-sales-page/page.tsx src/components/sales-page/StudentResultsStepper.tsx src/components/sales-page/WallOfLove.tsx
git commit -m "feat: add sales page social proof sections"
```

---

### Task 6: FAQ, Fechamento e Slug

**Files:**
- Create: `src/components/sales-page/FAQAndClose.tsx`
- Modify: `src/app/step-10-sales-page/page.tsx`
- Modify: `src/app/step-10-vendas/page.tsx`
- Modify: `src/app/step-09-estudar-certo/page.tsx`
- Test: `scripts/check-sales-page.mjs`

- [ ] **Step 1: Criar `FAQAndClose.tsx`**

Crie `src/components/sales-page/FAQAndClose.tsx` com este conteúdo completo:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqItems, finalBullets, salesCopy } from "./data";

export function FAQAndClose() {
  return (
    <section className="bg-zinc-950 px-5 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
              Antes de decidir
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
              Respostas francas para não vender no grito.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/68">
              A página precisa soar adulta: sem aprovação garantida, sem questão vazada, sem fingir que substitui etapa oficial.
            </p>
          </div>

          <div className="grid gap-3">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <h3 className="text-base font-black text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/68">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[28px] border border-yellow-300/30 bg-yellow-300 p-6 text-zinc-950 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-700">
                Próximo passo
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Você pode continuar juntando dica solta. Ou pode seguir um plano.
              </h2>
              <div className="mt-6 grid gap-2 md:grid-cols-3">
                {finalBullets.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-2 text-sm font-black">
                      <Icon size={18} />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-800">{salesCopy.officialNote}</p>
            </div>
            <Link
              href="#oferta"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-black uppercase tracking-wide text-white transition hover:bg-zinc-800"
            >
              {salesCopy.primaryCta}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Atualizar a página final**

Substitua `src/app/step-10-sales-page/page.tsx` por:

```tsx
import { DiagnosticShift } from "@/components/sales-page/DiagnosticShift";
import { FAQAndClose } from "@/components/sales-page/FAQAndClose";
import { InstructorSection } from "@/components/sales-page/InstructorSection";
import { OfferStack } from "@/components/sales-page/OfferStack";
import { SalesHero } from "@/components/sales-page/SalesHero";
import { StudentResultsStepper } from "@/components/sales-page/StudentResultsStepper";
import { WallOfLove } from "@/components/sales-page/WallOfLove";

export default function Step10SalesPage() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[oklch(0.985_0.003_85)] text-[oklch(0.15_0.01_250)]">
      <SalesHero />
      <DiagnosticShift />
      <OfferStack />
      <InstructorSection />
      <StudentResultsStepper />
      <WallOfLove />
      <FAQAndClose />
    </main>
  );
}
```

- [ ] **Step 3: Atualizar CTA do Step 09**

Em `src/app/step-09-estudar-certo/page.tsx`, troque:

```tsx
href="/step-10-vendas"
```

por:

```tsx
href="/step-10-sales-page"
```

- [ ] **Step 4: Transformar rota antiga em ponte**

Substitua `src/app/step-10-vendas/page.tsx` por:

```tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function LegacyVendasPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/step-10-sales-page");
  }, [router]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[oklch(0.985_0.003_85)] px-5 text-center text-[oklch(0.15_0.01_250)]">
      <section className="max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
          Página atualizada
        </p>
        <h1 className="mt-3 text-2xl font-black">A página de vendas mudou de endereço.</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Você será encaminhado para a nova sales page do CNH de Primeira.
        </p>
        <Link
          href="/step-10-sales-page"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white"
        >
          Ir para a nova página
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
```

- [ ] **Step 5: Rodar teste de fumaça**

Run:

```bash
npm run test:sales-page
```

Expected:

```text
Sales page smoke check passed.
```

- [ ] **Step 6: Rodar lint dos arquivos finais**

Run:

```bash
npm run lint -- src/app/step-10-sales-page/page.tsx src/app/step-10-vendas/page.tsx src/app/step-09-estudar-certo/page.tsx src/components/sales-page/FAQAndClose.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app/step-10-sales-page/page.tsx src/app/step-10-vendas/page.tsx src/app/step-09-estudar-certo/page.tsx src/components/sales-page/FAQAndClose.tsx
git commit -m "feat: finalize sales page slug"
```

---

### Task 7: Verificação Visual, Build e Ajustes Finais

**Files:**
- Verify: `src/app/step-10-sales-page/page.tsx`
- Verify: `src/components/sales-page/*.tsx`
- Verify: `public/images/vendas-temp/ad-3.png`
- Verify: `public/images/vendas-temp/instrutor-anderson.jpeg`

- [ ] **Step 1: Rodar verificação completa**

Run:

```bash
npm run test:sales-page
npm run lint
npm run build
```

Expected:

```text
Sales page smoke check passed.
```

`npm run lint` deve finalizar sem erros.  
`npm run build` deve gerar export estático sem erro de rota ou imagem.

- [ ] **Step 2: Subir servidor local**

Run:

```bash
npm run dev
```

Expected: servidor Next disponível em `http://localhost:3000` ou a próxima porta livre.

- [ ] **Step 3: Conferir manualmente no navegador**

Abrir:

```text
http://localhost:3000/step-10-sales-page/
```

Checklist visual:

- A capa `ad-3.png` aparece no hero sem cortar o texto principal de forma incoerente.
- O CTA principal aponta para `#oferta`.
- A foto do instrutor aparece nítida, com rosto e mãos visíveis.
- O stepper mostra três etapas: `Descubra`, `Treine`, `Chegue pronto`.
- O ticker do mural se move em desktop e permite arrastar no mobile.
- Nenhum texto fica cortado em 360px de largura.
- A página não usa a tese `O Detran quer te reprovar`.
- A FAQ contém a frase `não prometemos questão vazada`.

- [ ] **Step 4: Conferir rota antiga**

Abrir:

```text
http://localhost:3000/step-10-vendas/
```

Expected: a página encaminha para `/step-10-sales-page/` ou mostra o card com botão para a nova página durante o carregamento.

- [ ] **Step 5: Conferir link do Step 09**

Abrir:

```text
http://localhost:3000/step-09-estudar-certo/
```

Clicar em `Vamos construir um plano com calma?`.

Expected: navegação para `/step-10-sales-page/`.

- [ ] **Step 6: Parar servidor**

No terminal do `npm run dev`, pressione:

```text
Ctrl+C
```

- [ ] **Step 7: Commit final de ajustes**

Se houve ajuste visual ou de copy durante a conferência:

```bash
git add src/app/step-10-sales-page/page.tsx src/app/step-10-vendas/page.tsx src/app/step-09-estudar-certo/page.tsx src/components/sales-page public/images/vendas-temp/instrutor-anderson.jpeg scripts/check-sales-page.mjs package.json
git commit -m "polish: verify step 10 sales page"
```

Se não houve ajuste após o commit da Task 6, não criar commit vazio.

---

## Auto-Revisão

**Cobertura da especificação**

- Capa `ad-3.png`: Task 3 usa no hero; Task 7 verifica visualmente.
- Foto do instrutor trazida para o ambiente: Task 1 copia para `public/images/vendas-temp/instrutor-anderson.jpeg`; Task 4 usa na seção do instrutor.
- Slug alterado para `step-10-sales-page`: Task 3 cria rota nova; Task 6 atualiza link do Step 09 e transforma rota antiga em ponte.
- Estrutura da sales page baseada no que já existe: Tasks 2 a 6 usam Big Idea, diagnóstico, plano, depoimentos, instrutor, objeções e fechamento.
- Mural do Amor igual ao projeto Nail Designer: Task 5 adapta ticker duplo, pausa no hover/toque, drag e fades laterais.
- Seção tipo `Milhares de alunas certificadas`: Task 5 adapta stepper com linha animada, métricas e ticker de resultados.
- Verificação: Task 1 cria teste; Task 7 roda `test:sales-page`, `lint`, `build` e conferência manual.

**Scan de lacunas**

- O plano evita promessa de aprovação garantida.
- O plano evita acusação direta contra Detran.
- O plano preserva o conteúdo oficial como nota de preparação complementar.
- O plano não usa `_arquivo/`.
- O plano não exige dependência nova.

**Consistência de nomes**

- Rota nova: `step-10-sales-page`.
- Componente de mural: `WallOfLove`.
- Componente de stepper: `StudentResultsStepper`.
- Asset do instrutor: `instrutor-anderson.jpeg`.
- Teste de fumaça: `test:sales-page`.
