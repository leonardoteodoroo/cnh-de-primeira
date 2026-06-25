# Copy Completa do Projeto — CNH de Primeira

> **Documento unificado e atualizado** com toda a copy implementada no projeto.
> Extraído diretamente do código-fonte em produção (Junho/2026).
> Substitui os antigos `copy_web.md` e `sales_page_copy.md`.

---

## Estrutura Geral do Funil

O funil é dividido em **duas grandes fases**:

1. **Quiz Diagnóstico Gratuito** (Steps 01–09): Engaja o visitante com um quiz interativo de 4 perguntas, revela o custo real da reprovação e conduz à página de vendas.
2. **Sales Page** (Step 10): Página de vendas completa com 12 seções, do Hero ao rodapé legal.

A navegação é sequencial: cada step leva ao próximo via botão CTA.

---

# PARTE 1 — QUIZ DIAGNÓSTICO GRATUITO

---

## Step 01 — Hero (Página Inicial do Funil)

> **Componente:** `Hero.tsx` · **Rota:** `/step-01-hero` (https://cnh-de-primeira.semprenamoda.com.br/step-01-hero)

- **Pre-Headline (Badge):** Você está pronto(a) para a prova teórica?
- **Título (H1):** A CNH mudou. *(blur reveal)* O jeito de estudar também. *(slide up, verde)*
- **Parágrafo (Typewriter):** O novo processo ficou mais livre. Agora você precisa de um plano para não se perder. Antes de marcar a prova, descubra se você está pronto e elimine o medo de reprovar.
- **Botão (CTA):** É GRÁTIS! É RÁPIDO! 🚦➡️
- **Imagem:** Jovem comemorando aprovação na prova teórica com alívio (`hero.png`)
- **Destino:** `/step-02-pergunta-01` (https://cnh-de-primeira.semprenamoda.com.br/step-02-pergunta-01)

---

## Step 02 — Pergunta 01 (Primeiros Socorros · Taxa de Erro: 34%)

> **Rota:** `/step-02-pergunta-01` · **Numeração do simulado:** Pergunta 1 de 30 (https://cnh-de-primeira.semprenamoda.com.br/step-02-pergunta-01)

- **Categoria:** Primeiros Socorros
- **Ícone:** AlertTriangle
- **Questão:** Um motociclista sofreu uma queda grave e está caído inconsciente no meio da avenida, ainda usando o capacete fechado. Qual é o procedimento correto?
- **Alternativas:**
  - A) Retirar o capacete imediatamente para garantir que ele consiga respirar melhor e avaliar a pulsação.
  - **B) Sinalizar a via, ligar para o socorro especializado (193/192) e NÃO remover o capacete. ✓ (Correta)**
  - C) Colocar o motociclista sentado no acostamento e oferecer água com açúcar para reanimá-lo.
  - D) Girar a cabeça dele para o lado com cuidado, para evitar engasgo caso ele comece a tossir.
- **Feedback de Acerto:** ✓ Resposta correta! Sinalizar, chamar o socorro e não remover o capacete é o procedimento correto. Mover a vítima pode causar lesão cervical fatal.
- **Feedback de Erro:** ✗ hmm, Você errou essa. O correto é sinalizar a via, ligar para o socorro (193/192) e NÃO remover o capacete. Qualquer movimentação pode agravar lesões na coluna cervical.
- **Botão CTA (após feedback):** Vamos mais uma? ➡️
- **Botão (antes do feedback):** Confirmar resposta ➡️
- **Destino:** `/step-03-pergunta-02` (https://cnh-de-primeira.semprenamoda.com.br/step-03-pergunta-02)

---

## Step 03 — Pergunta 02 (Direção Defensiva · Taxa de Erro: 61%)

> **Rota:** `/step-03-pergunta-02` · **Numeração do simulado:** Pergunta 7 de 30 (https://cnh-de-primeira.semprenamoda.com.br/step-03-pergunta-02)

- **Categoria:** Direção Defensiva
- **Ícone:** CloudRain
- **Questão:** Durante uma forte chuva, você percebe que o seu veículo começou a oscilar e flutuar sobre uma camada de água na pista, perdendo o contato dos pneus com o solo (aquaplanagem). Qual deve ser seu procedimento imediato?
- **Alternativas:**
  - A) Pisar firmemente no pedal do freio para reduzir a velocidade o mais rápido possível.
  - B) Girar o volante em movimentos rápidos de um lado para o outro para forçar a aderência dos pneus ao asfalto.
  - **C) Tirar o pé do acelerador suavemente, segurar o volante com firmeza in linha reta e não frear até recuperar a tração. ✓ (Correta)**
  - D) Colocar o câmbio em ponto morto e pisar levemente no acelerador para deslizar com segurança até o carro parar.
- **Feedback de Acerto:** ✓ Acertou, mas a maioria erra. Soltar o acelerador e segurar o volante firme é o procedimento correto. Mas na prova real, a maioria marca "frear" por instinto. É exatamente esse tipo de questão que reprova.
- **Feedback de Erro:** ✗ Seu instinto te traiu. Frear durante a aquaplanagem trava as rodas e causa perda total de controle. O correto é soltar o acelerador suavemente, segurar o volante firme e esperar a tração voltar. O instinto natural aqui é o inimigo.
- **Botão CTA (após feedback):** Vamos mais uma? ➡️
- **Destino:** `/step-04-pergunta-03` (https://cnh-de-primeira.semprenamoda.com.br/step-04-pergunta-03)

---

## Step 04 — Pergunta 03 (Legislação de Trânsito · Taxa de Erro: 73%)

> **Rota:** `/step-04-pergunta-03` · **Numeração do simulado:** Pergunta 21 de 30 (https://cnh-de-primeira.semprenamoda.com.br/step-04-pergunta-03)

- **Categoria:** Legislação de Trânsito
- **Ícone:** RotateCcw
- **Questão:** Você se aproxima de uma rotatória movimentada em uma via urbana. Não existe nenhum tipo de sinalização no local — nem placa de pare, nem de dê a preferência, nem faixa pintada no chão. De quem é a preferência de passagem, segundo o CTB?
- **Alternativas:**
  - A) Do veículo que vier pela sua direita, pois a regra geral de preferência é sempre do condutor à direita.
  - **B) Do veículo que já estiver circulando pela rotatória. ✓ (Correta)**
  - C) Do veículo que estiver trafegando pela via mais larga ou pela avenida principal.
  - D) Do primeiro veículo que chegar à entrada da rotatória, independente da direção de onde vem.
- **Feedback de Acerto:** ✓ Acertou. Poucos acertam essa. Em rotatória sem sinalização, a preferência é de quem já circula por ela (Art. 29, III, CTB). A famosa "regra da direita" só vale em cruzamentos comuns. Essa diferença reprova.
- **Feedback de Erro:** ✗ A regra que você conhece não vale aqui. A "regra da direita" existe, sim. Mas ela não se aplica a rotatórias. O Art. 29, III do CTB é claro: em rotatória sem sinalização, preferência de quem já circula. Esse é o tipo de pegadinha que parece óbvia depois, mas reprova na hora.
- **Botão CTA (após feedback):** Última pergunta ➡️
- **Destino:** `/step-05-pergunta-04` (https://cnh-de-primeira.semprenamoda.com.br/step-05-pergunta-04)

---

## Step 05 — Pergunta 04 (Infrações e Penalidades · Taxa de Erro: 82%)

> **Rota:** `/step-05-pergunta-04` · **Numeração do simulado:** Pergunta 29 de 30 (https://cnh-de-primeira.semprenamoda.com.br/step-05-pergunta-04)

- **Categoria:** Infrações e Penalidades
- **Ícone:** ShieldAlert
- **Questão:** Durante uma blitz, o condutor se recusa a realizar o teste do bafômetro (etilômetro). Qual é a consequência prevista na legislação de trânsito?
- **Alternativas:**
  - A) Nenhuma penalidade, pois a Constituição garante que ninguém é obrigado a produzir prova contra si mesmo.
  - **B) Infração gravíssima, multa multiplicada por 10 e suspensão do direito de dirigir por 12 meses. ✓ (Correta)**
  - C) Infração grave, multa simples e apreensão da CNH por 6 meses até apresentação de recurso.
  - D) Detenção imediata e encaminhamento à delegacia para realização de exame de sangue compulsório.
- **Feedback de Acerto:** ✓ Impressionante. Essa era a mais difícil. Recusar o bafômetro tem exatamente a mesma punição que dirigir bêbado: gravíssima, multa x10, 12 meses de suspensão (Art. 165-A, CTB). Poucos candidatos sabem disso.
- **Feedback de Erro:** ✗ Caiu na armadilha constitucional. O princípio de não produzir prova contra si existe na Constituição. Mas o Art. 165-A do CTB é específico: recusar o teste é infração gravíssima, com multa multiplicada por 10 e suspensão por 12 meses. A mesma punição de quem dirige alcoolizado.
- **Botão CTA (após feedback):** Será que eu passaria hoje? ➡️
- **Destino:** `/step-06-detran` (https://cnh-de-primeira.semprenamoda.com.br/step-06-detran)

---

## Step 06 — Detran (O Lucro Sombrio)

> **Rota:** `/step-06-detran` (https://cnh-de-primeira.semprenamoda.com.br/step-06-detran)

- **Imagem:** Ilustração sobre o lucro sombrio das taxas de reteste do Detran (`detran-profit.png`)
- **Título (H1):** O Lucro Sombrio com as Taxas de Reteste
- **Texto (Typewriter animado):** Em estados como SP, MG e RJ, milhares de alunos fazem a prova teórica por dia. Se **60% reprovam** e gastam **R$ 300 reais** adicionais para remarcar, quanto dinheiro a máquina pública arrecada a cada 24 horas? Faça a conta.
- **Botão (CTA):** Continuar ➡️
- **Destino:** `/step-07-conta` (https://cnh-de-primeira.semprenamoda.com.br/step-07-conta)

---

## Step 07 — Conta (O Custo da Reprovação)

> **Rota:** `/step-07-conta` (https://cnh-de-primeira.semprenamoda.com.br/step-07-conta)

- **Imagem:** Ilustração de uma calculadora somando taxas de reteste (`step-07-conta.jpeg`)
- **Título (H1):** Quanto custa reprovar?
- **Lista de Custos (Tabela animada com blur reveal):**
  1. Taxa Estadual de Reexame do Detran → **R$ 90,00 a R$ 180,00** *(vermelho)*
  2. Taxa de Remarcação da Autoescola → **R$ 150,00 a R$ 250,00** *(vermelho)* — *(Custo administrativo opcional cobrado abusivamente)*
  3. Transporte até o Local de Exame (2 viagens) → R$ 40,00 a R$ 80,00
  4. Hora-Trabalho perdida ou dia de folga no emprego → R$ 100,00 a R$ 200,00
- **Total (Badge vermelho):** PREJUÍZO FINANCEIRO ESTIMADO: **R$ 380,00 a R$ 710,00**
- **Aviso (Box laranja abaixo do CTA):** 👉 **O sistema confuso e caro que transforma erro em retrabalho:** A burocracia do trânsito foi estruturada para prolongar seu processo. Cada erro simples em uma alternativa dúbia te obriga a reiniciar prazos, pagar taxas adicionais e alimentar os custos administrativos do ecossistema.
- **Botão (CTA):** Ver quem passa de primeira ➡️
- **Destino:** `/step-08-depoimentos` (https://cnh-de-primeira.semprenamoda.com.br/step-08-depoimentos)

---

## Step 08 — Depoimentos (Prova Social Visual)

> **Rota:** `/step-08-depoimentos` · **Componente:** `CarouselDepoimentos.tsx` (https://cnh-de-primeira.semprenamoda.com.br/step-08-depoimentos)

- **Título (H1):** Pessoas reais passaram **EXATAMENTE** *(sublinhado SVG)* pelo mesmo aperto.
- **Apoio Visual:** Avatares sobrepostos de 3 alunos aprovados + label "**Alunos aprovados** pelo método"
- **Carrossel:** Componente `CarouselDepoimentos` com cards 3D de depoimentos
- **Botão (CTA):** Descobrir como eles passaram ➡️
- **Destino:** `/step-09-estudar-certo` (https://cnh-de-primeira.semprenamoda.com.br/step-09-estudar-certo)

---

## Step 09 — Estudar Certo (O Caos da Internet vs O Plano)

> **Rota:** `/step-09-estudar-certo` (https://cnh-de-primeira.semprenamoda.com.br/step-09-estudar-certo)

- **Título (H1):** +2.000 QUESTÕES *(blur reveal)* COMENTADAS *(slide up, verde)*
- **Texto Animado 1 (Typewriter):** **NOSSA... SÓ DE LER JÁ ATÉ CANSA, NÃO ACHA?** Você tenta aprender sozinho(a)... pesquisa na internet... O resultado?
- **Imagem:** Mural caótico do YouTube (`caos-youtube.jpeg`)
- **Parágrafo 1:** Te empurram 2 mil coisas para decorar. Questões que mais caem. Ah, e o melhor: **BAIXE O APP**. Daí você baixa e, no dia seguinte, tem bandido usando sua foto e mandando mensagens para seus contatos pedindo para pagar boleto. Ou seu celular enche de anúncios pornô.
- **Ponte de Transição (Typewriter):** *Olha... EU entendo.*
- **Parágrafo 2:** O segredo da aprovação não é sair consumindo tudo loucamente! Você precisa de um plano, não de sorte.
- **Botão (CTA):** Vamos construir um plano com calma? ➡️
- **Destino:** `/step-10-sales-page` (https://cnh-de-primeira.semprenamoda.com.br/step-10-sales-page)

---

# PARTE 2 — SALES PAGE (Step 10)

> **Rota:** `/step-10-sales-page` (https://cnh-de-primeira.semprenamoda.com.br/step-10-sales-page)

A Sales Page é composta por **12 seções** carregadas em sequência. Os dados centrais vivem em `data.ts`.

---

## Seção 1 — SalesHero (Reconexão com o Quiz)

> **Componente:** `SalesHero.tsx`

- **Eyebrow (H1 de SEO):** CURSO PREPARATÓRIO PARA A PROVA DA CNH + SIMULADOS
- **Título Principal (H2):** Trânsito Sem Segredos
- **Body:** O gratuito te entrega conteúdo. O curso preparatório para a prova da CNH te entrega direção. Você já viu no QUIZ onde a prova pode te derrubar. Agora, pare de tentar decorar tudo e siga um treino focado para não desperdiçar seu tempo e dinheiro com reprovação.
- **CTA Principal:** Quero estudar com direção ➡️
- **Rótulos na Imagem (Badges):** Mapeamento | Treino | Sua CNH
- **Imagens:** `hero-mobile.jpeg`, `hero-desktop.jpeg`, `hero-custom.jpeg`
- **Âncora do CTA:** `#oferta`

---

## Seção 2 — DiagnosticShift (Quebra de Crenças)

> **Componente:** `DiagnosticShift.tsx`

- **H2:** Não é estudar mais. É estudar CERTO!
- **Body:** Você pode assistir aula, fazer vários simulados, e ainda assim chegar na prova com aquela sensação de dúvida se está realmente pronto. Isso acontece não por falta de esforço, mas por falta de aplicar esse esforço em um estudo de forma estruturada.
- **Dores (Cards — 2 no topo + 1 centralizado):**
  - 🧠 **Você estuda, mas não sabe se está pronto** — A ansiedade aparece porque conteúdo solto não mostra onde você ainda erra.
  - 💰 **Errar pode custar tempo, taxa e espera** — Dependendo do estado e da etapa, reprovar vira remarcação, deslocamento e mais pressão.
  - ⚠️ **A internet mistura ajuda com promessa suspeita** — App aleatório, vídeo fora de ordem, promessa milagrosa e golpe disputam sua atenção.

---

## Seção 3 — OfferStack (O Método)

> **Componente:** `OfferStack.tsx`

- **Eyebrow:** PARE DE SE AFOGAR EM QUESTÕES
- **H2:** Um plano para transformar erro em revisão.
- **Body:** Um plano de preparação que começa pelo diagnóstico, mostra os pontos fracos e transformou erro em treino guiado antes do Detran.
- **Mecanismo (3 Passos):**
  1. **Descubra** — Faça o diagnóstico e veja onde seu estudo ainda está fraco.
  2. **Treine** — Revise os temas certos com questões comentadas e explicação direta.
  3. **Chegue pronto** — Entre na prova sabendo o que revisou, onde melhorou e onde precisa atenção.
- **Benefícios (6 Cards):**
  - 📋 **Diagnóstico de prontidão** — Você começa vendo onde a prova pode te pegar antes de marcar a tentativa.
  - 🎯 **Questões certas, não volume infinito** — Treino focado em temas cobrados: legislação, sinalização, direção defensiva, primeiros socorros e infrações.
  - 📖 **Comentários que explicam o erro** — Não basta saber a alternativa correta. Você entende por que a alternativa tentadora estava errada.
  - 🗺️ **Plano simples pelo celular** — Sequência de estudo para parar de pular de vídeo em vídeo sem saber o próximo passo.
  - 🛡️ **Treino sem promessa enganosa** — Não prometemos questão vazada, banco oficial ou aprovação garantida. Prometemos direção e clareza.
  - 🕐 **Preparação para chegar mais calmo** — Você treina antes, erra antes e entende antes. O dia da prova fica menos improvisado.

---

## Seção 4 — CourseModules (O Que Tem Dentro)

> **Componente:** `CourseModules.tsx`

- **Eyebrow:** O que tem dentro
- **H2:** Apenas o que te / APROVA! (com rabisco) / Sem enrolação teórica.
- **Body:** 6 módulos diretos, 16 aulas comentadas e simulados no formato oficial. Sem enrolação, sem conteúdo de enchimento.
- **Stats:** 13h15 de conteúdo · 16 aulas · 60+ questões
- **Módulos:**
  1. ⚖️ **Legislação de Trânsito** — 5h26, 7 aulas — Sistema Nacional de Trânsito e CTB · Categorias de habilitação (A, B, C e D) · Sinalização vertical, horizontal e auxiliar · Infrações, crimes e penalidades · Normas de circulação e conduta
  2. 🛡️ **Direção Defensiva** — 2h57, 4 aulas — Direção preventiva vs. corretiva · Os 5 elementos: conhecimento, atenção, previsão, decisão e habilidade · Condições adversas (luz, tempo, via, veículo) · Tipos de colisão e como evitá-las
  3. 💗 **Primeiros Socorros** — 1h58, 2 aulas — Sinalização de sinistro e acionamento do socorro · Protocolo ABCDE de avaliação primária · Controle de hemorragias e fraturas
  4. 🔧 **Mecânica Básica** — 1h45, 1 aula — Motor, arrefecimento e lubrificação · Transmissão, freios e direção · Manutenção preventiva essencial
  5. 🌿 **Meio Ambiente** — 0h44, 1 aula — Poluentes, gases e chuva ácida · Impactos da condução no meio ambiente urbano
  6. 🧠 **Cidadania e Convivência** — 0h25, 1 aula — Direitos e deveres no trânsito · Comunicação e convivência segura

---

## Seção 5 — ApprovedStudentsStepper (Prova Social Visual)

> **Componente:** `ApprovedStudentsStepper.tsx`

- **H2:** Sua CNH de Primeira
- **Body:** O método validado que já colocou a habilitação na mão de milhares de alunos. Chega de depender da sorte ou pagar taxas abusivas de reteste.
- **Stepper Visual (3 Passos):**
  1. Prepare-se
  2. Faça a Prova
  3. Comemore
- **Frase Emocional:** "A sensação de ver o APTO no sistema do Detran"
- **Checklist:**
  - ✅ Cronograma focado no que o Detran mais cobra
  - ✅ Chega de estudar milhares de questões soltas
  - ✅ Descubra e corrija os seus pontos cegos
  - ✅ Simulados focados e muito mais assertivos
- **Ticker Title:** Junte-se a milhares de alunos aprovados
- **Ticker:** Carrossel infinito com 16 fotos de alunos aprovados

---

## Seção 6 — OfferBuildUp (Ancoragem de Valor)

> **Componente:** `OfferBuildUp.tsx`

- **H3:** O que você está levando:
- **Stack de Valor (itens com preço riscado ou "Incluso"):**
  - ✅ Treinamento Preparatório para a Prova da CNH de Primeira (13h+ de aulas) → ~~R$ 197~~
  - ✅ Simulados Comentados (As pegadinhas reveladas) → ~~R$ 97~~
  - ✅ Plano de Estudo Módulo a Módulo → ~~R$ 47~~
  - ✅ Suporte para Dúvidas → *Incluso*
  - ✅ Acesso Imediato pelo Celular ou PC → *Incluso*
- **Transição Emocional:**
  - **Então, por que o preço abaixo está bloqueado?**
  - Porque eu não quero curiosos julgando o material pelo valor. Eu quero apenas alunos que entenderam o método e decidiram passar de primeira.
  - Quando você liberar o cadeado abaixo, vai perceber que a clareza e a segurança para a sua prova custam muito menos do que a taxa de uma reprovação.

---

## Seção 7 — PriceSpoilerCard (O Preço com Urgência)

> **Componente:** `PriceSpoilerCard.tsx`

### Estado 1: Spoiler (Preço Bloqueado)
- **Botão Spoiler:** 👁 Toque para revelar *(efeito de ruído animado)*
- **H2:** Acesso liberado a uma condição única.
- **Body:** O seu acesso completo para entender, treinar e passar de primeira.
- **Disclaimer:** *Ao ativar, você concorda que esta oferta exclusiva ficará disponível apenas para esta seção e o cronômetro será iniciado.

### Estado 2: Revealed (Preço Revelado)
- **Eyebrow (Badge):** ⏱ Oferta por tempo limitado
- **Preço Inicial (Riscado):** De: R$ 197,00
- **Preço Promocional (Destaque):** R$ 29,90
- **Timer:** Reserva acaba em: 07:00 *(7 minutos, contagem regressiva)*
- **CTA Principal:** Garantir minha vaga agora
- **Trust Badges:** 🔒 Pagamento Seguro · 🛡️ 15 Dias de Garantia · ⚡ Acesso Imediato
- **Âncoras (O investimento é menor que):**
  - 🚌 **4 passagens daquele ônibus lotado** (que você pega todo dia e não aguenta mais)
  - 🛍️ Uma blusinha barata na Shopee (que você usa duas vezes e guarda no fundo do armário)
  - 🚗 1 Uber ida+volta pro shopping

### Estado 3: Expired (Reserva Expirada)
- **H3:** Reserva expirada
- **Body:** O tempo para garantir essa condição especial se esgotou.
- **Botão:** 🔄 Tentar Novamente

---

## Seção 8 — InstructorSection (Autoridade)

> **Componente:** `InstructorSection.tsx`

- **Eyebrow:** SEU INSTRUTOR E GUIA
- **H2:** A internet está cheia de dicas. E esse pode ser exatamente o seu problema.
- **Body (4 parágrafos):**
  1. Você encontra centenas de vídeos, resumos e macetes, mas as informações estão espalhadas e, muitas vezes, sem qualquer critério. No fim, acaba estudando conteúdos que quase nunca aparecem na prova e deixando de lado as pegadinhas que eliminam milhares de candidatos.
  2. Foi por isso que eu fiz esse trabalho por você.
  3. Analisei, filtrei e organizei os simulados com base no que os Detrans realmente cobram atualmente. Sem excesso de conteúdo e sem decoreba interminável.
  4. Aqui, você aprende a identificar a lógica da prova, entende as armadilhas mais comuns, treina com questões alinhadas ao padrão oficial e chega ao exame com mais confiança, clareza e preparo para conquistar sua aprovação.
- **Nome do Instrutor:** Anderson Mageski
- **Cargo:** Professor com especialização em Gestão, Mobilidade e Segurança no Trânsito · 10+ anos na área
- **Imagem:** `instrutor-anderson-v2.jpeg`
- **Bullets da Autoridade (Cards):**
  - 🎓 Explicações detalhadas e dicas práticas que te salvam na hora H
  - 🏆 Simulados para você se familiarizar com o estilo de perguntas oficial
  - 🛡️ Aulas de revisão direto ao ponto, no seu ritmo, quantas vezes quiser

---

## Seção 9 — GuaranteeSection (Risco Zero)

> **Componente:** `GuaranteeSection.tsx`

- **Eyebrow:** O Risco é todo meu
- **H2:** Estude por 15 dias sem risco financeiro.
- **Body (3 parágrafos):**
  1. Você não precisa decidir agora se o método é bom ou não. **Você pode entrar, testar tudo por 15 dias inteiros.**
  2. Faça o diagnóstico inicial. Assista às aulas de revisão mais diretas que você já viu e entenda como as pegadinhas funcionam.
  3. Se por qualquer motivo – qualquer um mesmo – você achar que isso não te ajudou, basta me mandar uma mensagem e eu aperto um botão para devolver 100% do seu dinheiro. Simples e sem enrolação.
- **Trust Badges (Grid 2x2):**
  - 🛡️ Risco ZERO para você
  - 🔒 Plataforma segura
  - 🖱️ Reembolso com 1 clique
  - ⚡ Acesso imediato após a compra
- **Imagem de Fundo:** `garantia-mobile-bg.jpg` (mobile) / `garantia-bg.jpg` (desktop)

---

## Seção 10 — FAQAndClose (FAQ)

> **Componente:** `FAQAndClose.tsx`

- **Eyebrow:** Antes de decidir
- **H2:** As perguntas mais interessantes que me fazem
- **Body:** Transparência total. Sem promessas milagrosas, sem falsos atalhos e sem fingir que podemos substituir a etapa oficial do seu estado.
- **FAQ (5 perguntas):**
  1. **Se existe curso gratuito no app, por que eu pagaria?** — Porque conteúdo gratuito não é a mesma coisa que diagnóstico. O CNH de Primeira organiza o estudo, mostra onde você erra e entrega treino guiado para revisar com direção.
  2. **As questões são iguais às do Detran?** — Nós não prometemos questão vazada, banco oficial ou cópia da prova. O treinamento usa temas, formato e raciocínio compatíveis com o que costuma ser cobrado na prova teórica.
  3. **Isso substitui a autoescola, app oficial ou etapa do Detran?** — Não. É uma preparação complementar para estudar melhor. Você continua responsável por cumprir as regras, agendamentos, exames e exigências do seu estado.
  4. **E se eu tiver pouco tempo?** — A página foi pensada para celular e estudo em blocos. O foco é revisar os pontos certos, não criar uma rotina impossível.
  5. **O produto garante aprovação?** — Não existe aprovação garantida. A promessa correta é clareza: saber o que revisar, treinar melhor e chegar mais preparado para a primeira tentativa.

---

## Seção 11 — ClosingCTA (Último Empurrão)

> **Componente:** `ClosingCTA.tsx`

- **Eyebrow:** Última chamada
- **H2:** Clareza custa menos que uma reprovação.
- **Preço (Destaque amarelo):** R$ 29,90
- **Nota de Preço:** Pagamento único · Sem mensalidade · Sem pegadinha
- **CTA Final:** Quero estudar com direção ➡️
- **Trust Badges:** 🔒 Pagamento Seguro · 🛡️ 15 Dias de Garantia · ⚡ Acesso Imediato
- **Disclaimer:** Este treinamento é preparação complementar. Ele não substitui etapas oficiais, exames, taxas estaduais ou regras do Detran.

---

## Seção 12 — LegalFooter (Rodapé Legal)

> **Componente:** `LegalFooter.tsx`

- **Aviso Legal (aberto):** O "Treinamento Preparatório para a Prova da CNH de Primeira" é um curso livre e preparatório de caráter educacional. Este site não possui nenhum vínculo com o Governo Federal, Ministério da Infraestrutura, SENATRAN, DETRAN ou qualquer órgão governamental. A compra e o estudo deste material não isentam o aluno da obrigatoriedade de cumprir a carga horária oficial nas autoescolas (CFCs), realizar os exames médicos e psicológicos, e pagar as taxas estaduais exigidas para a obtenção da Carteira Nacional de Habilitação. Os resultados e o desempenho na prova oficial dependem do esforço individual de cada candidato.
- **Links (Modais):** Políticas de Privacidade · Termos de Serviço
- **Copyright:** © 2026 Treinamento Preparatório para a Prova da CNH de Primeira. Todos os direitos reservados.
- **CNPJ:** 57.204.649/0001-41

---

## Seção Desativada — WallOfLove (Mural do Amor)

> **Componente:** `WallOfLove.tsx` · **Status:** Comentada no page.tsx

- **Eyebrow:** Mural do amor
- **H2:** Pessoas que estavam inseguras antes de chegar na prova.
- **Body:** Veja como pessoas reais, com pouco tempo e muito nervosismo, conseguiram transformar a insegurança em clareza no dia da prova.
- **Ticker:** 2 linhas com 8 cards de review em loop infinito (pausável)
- **Reviews (8 depoimentos completos em data.ts):**
  - Mariana Souza, 19, SP — "Eu já tinha reprovado duas vezes..." · *28/30 na terceira tentativa*
  - Thiago Ramos, 24, RJ — "A autoescola mandava decorar o livro inteiro..." · *gabaritou de primeira*
  - Fernanda Costa, 31, MG — "Eu sempre escolhia a primeira resposta lógica..." · *mudou a forma de responder*
  - Roberto de Oliveira, 42, RS — "Voltar a estudar legislação depois dos 40..." · *sem tempo perdido*
  - Camila, 28, PR — "Eu tinha medo de pagar reteste..." · *estudou com foco*
  - Rafael, 22, SP — "Achava que precisava decorar tudo..." · *menos decoreba*
  - Beatriz, 34, RJ — "As perguntas de infração me deixavam insegura..." · *menos ansiedade*
  - Lucas, 25, RS — "Eu trabalhava o dia todo..." · *plano pelo celular*

---

## Seção Legada — Bloco "Próximo Passo" (Comentado no FAQAndClose)

> **Status:** Comentado dentro de `FAQAndClose.tsx`

- **Eyebrow:** Próximo passo
- **H2:** Você pode continuar juntando dica solta. Ou pode seguir um plano.
- **Checklist:**
  - ✅ Diagnóstico antes da venda
  - ✅ Treino no formato da prova
  - ✅ Plano simples para primeira tentativa
- **Disclaimer Oficial:** Este treinamento é preparação complementar. Ele não substitui etapas oficiais, exames, taxas estaduais ou regras do Detran.
- **CTA:** Quero estudar com direção ➡️

---

# APÊNDICE — Métricas e Dados Recorrentes

| Dado | Valor Atual |
|---|---|
| Total de aulas | 16 |
| Total de horas | 13h15 |
| Questões no formato | 60+ |
| Avaliação do instrutor | 4.7/5 |
| Preço de (âncora) | R$ 197,00 |
| Preço promocional | R$ 44,90 |
| Garantia | 15 dias |
| Timer do spoiler | 7 minutos (420s) |
| CNPJ | 57.204.649/0001-41 |
| Instrutor | Anderson Mageski |
| Sequência do quiz | Perguntas 1, 7, 21, 29 (de 30) |

---

## Step 11 — Obrigado (Página de Agradecimento)

> **Rota:** `/obrigado` (https://cnh-de-primeira.semprenamoda.com.br/obrigado) · **Componente:** `Obrigado.tsx`

- **Título (H1):** Quase tudo pronto para liberar seu acesso!
- **Apoio Visual:** Dark Premium com efeito Glassmorphic, recibo de pedido simulado e FAQ de entrega.
- **Botão (CTA):** Liberar Acesso no WhatsApp 📲
- **Destino:** WhatsApp de Suporte (`62999918702`) com mensagem pré-definida "Quero liberar meu acesso ao CNH de Primeira"

---

*Atualizado em: 24/Junho/2026*
*Fonte: código-fonte em `/src/app/` e `/src/components/`*
