# Prompts de Geração de Imagens: O Especialista / Mentor do "CNH de Primeira"

## 1. O Arquétipo e a Abordagem Visual
Baseado no briefing do produto "CNH de Primeira", o especialista não é um vendedor de cursinhos milagrosos, nem um burocrata engessado. 

**Arquétipo do Mentor / O Guia Franco:**
- **Tom:** Confiança sem arrogância, conversa franca, leve mas não bobo.
- **Expressão:** Sereno, sorriso leve (não exagerado), olhar fixo e acolhedor (transmitindo "eu tenho a rota para você não se perder").
- **Estética:** Limpa, iluminação cinematográfica sutil (estúdio), cores que passem autoridade e modernidade.

---

## 2. Características Físicas do Especialista (Baseadas na Foto Real)
Para que a inteligência artificial gere imagens fiéis ao instrutor original, devemos injetar estas características como o `[Sujeito principal]` da imagem:
- **Rosto:** Formato oval/alongado.
- **Pele:** Caucasiana / levemente parda (light olive skin).
- **Cabelos:** Castanhos escuros/pretos, lisos. Corte moderno com as laterais mais curtas e o topo longo, com uma franja lisa e pronunciada caída sobre o lado direito da testa.
- **Barba e Bigode:** Curtos e bem aparados, no estilo cavanhaque estendido (mustache and goatee), um pouco mais ralo nas bochechas e com volume no queixo.
- **Olhos:** Castanhos escuros, amendoados.
- **Sobrancelhas:** Escuras, retas e moderadamente grossas.
- **Expressão:** Serena, com um leve sorriso confiante e acessível.

Sempre usaremos o bloco: *"Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros curtos nas laterais e com franja longa caída para o lado direito da testa, olhos castanhos, barba curta e bigode bem aparados (foco no queixo e boca), sobrancelhas escuras."*

## 2. Direção de Arte Otimizada para Mobile (UI/UX)
Para a Landing Page mobile (Hero Section), a imagem deve ter as seguintes características técnicas no gerador:
- **Aspect Ratio:** Vertical (ex: `9:16` ou `4:5`).
- **Composição / Enquadramento (Negative Space):** A imagem precisa ter espaço vazio (fundo limpo ou infinito) na parte superior ou nas bordas, garantindo que o texto da H1 ("A CNH mudou. O jeito de estudar também.") fique legível.
- **Fundo:** Preferencialmente liso, escuro ou em tom pastel/neutro suave, ideal para aplicar o degradê (gradient) via CSS sem conflitar com detalhes da imagem.

---

## 3. Estrutura Ideal do Prompt (Baseado na skill "image-studio")
Ao rodar no Google IA Studio (ou em sua skill local `ai-studio-image`), a estrutura otimizada que o sistema prefere para "fotos realistas humanizadas" é:
`[Sujeito principal] + [Acao/pose] + [Ambiente] + [Iluminacao] + [Detalhe humano]`

Os prompts abaixo já foram construídos respeitando rigorosamente essa fórmula, garantindo o máximo de fotorrealismo sem parecer arte digital artificial.

---

## 4. Prompts: Character Sheet (Várias posições na mesma imagem)
*Esse prompt é ideal para o ChatGPT (DALL-E 3) ou Google IA Studio gerarem uma folha de referência do rosto e corpo dele para manter a consistência.*

**Prompt (Folha de Referência):**
> "Crie um 'Character Design Sheet' detalhado, com fundo branco limpo, de um professor moderno, inteligente, empático e de comunicação franca. **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros com as laterais curtas e topo com franja longa caída para o lado direito da testa, olhos castanhos amendoados, barba curta e bigode bem aparados (estilo cavanhaque estendido, mais ralo nas laterais), sobrancelhas escuras retas.** Ele transmite confiança e autoridade. A imagem deve conter três poses diferentes do mesmo personagem na mesma folha: 
> 1. Rosto de frente sorrindo levemente e transmitindo confiança.
> 2. Corpo inteiro ou meio corpo (plano americano) em pose relaxada, com os braços cruzados de forma amigável.
> 3. Meio corpo em ângulo de 3/4 (levemente de lado) gesticulando com as mãos como se estivesse explicando um plano ou uma rota de forma calma.
> O estilo deve ser de fotografia de estúdio hiper-realista, iluminação suave (softbox), cores vivas e profissionais."

---

## 5. Prompts Individuais para a Landing Page (Variações de Vestimenta)

Aqui estão os prompts isolados focados na foto perfeita para o topo da Landing Page mobile, já pedindo o espaço para o texto.

### Opção A: O "Professor de Campo" (Acessível, que arregaça as mangas)
**Prompt:**
> "Fotografia de retrato hiper-realista vertical (9:16) de um professor moderno e carismático. **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros com laterais curtas e topo com franja longa caída sobre o lado direito da testa, olhos castanhos, barba curta e bigode bem aparados (estilo cavanhaque estendido).** Ele está vestindo uma camisa de botão lisa, cor azul claro, com as mangas dobradas até o antebraço, passando a sensação de estar pronto para o trabalho e de ser acessível. Ele tem um sorriso leve, seguro, olhando diretamente para a câmera. O enquadramento foca no meio corpo (da cintura para cima). **IMPORTANTE:** O sujeito deve estar posicionado na parte inferior da imagem, deixando a metade superior (topo da imagem) quase vazia, com um fundo contínuo cinza chumbo fosco, criando muito 'negative space' perfeito para adicionar texto branco em cima depois. Iluminação de estúdio suave, foco nítido, textura realista da pele, 8k."

### Opção B: O "Guia Estratégico" (Casual Alinhado - Polo ou Henley)
**Prompt:**
> "Fotografia premium estilo revista vertical (9:16) de um especialista em trânsito e exames da CNH, postura franca e aparência acolhedora. **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros com laterais curtas e topo com franja longa caída sobre o lado direito da testa, olhos castanhos, barba e bigode curtos bem aparados com mais volume no queixo.** Vestindo uma camiseta Henley preta lisa e elegante, de bom caimento, sem estampas. Ele está com os braços levemente cruzados de maneira muito receptiva, não defensiva. Ele transmite que 'tem o plano certo'. **COMPOSIÇÃO:** Fundo liso em um tom cinza escuro ou azul marinho muito escuro, sem distrações. Deixe a parte de cima da foto com muito espaço vazio (negative space) para inserção de título. A iluminação deve ter uma leve luz de recorte nos ombros (rim light) separando-o do fundo, qualidade fotográfica cinematográfica, alta resolução."

### Opção C: O "Especialista Moderno" (Blazer + Camiseta)
**Prompt:**
> "Fotografia realista de estúdio vertical (9:16) de um professor ou mentor confiável. **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros, laterais mais curtas e topo com franja lisa caída sobre a direita da testa, olhos castanhos escuros, barba e bigode estilo cavanhaque estendido aparados.** Ele veste uma camiseta branca básica e limpa sob um blazer azul marinho ou cinza escuro de corte moderno. Esta vestimenta passa autoridade, mas o rosto dele é gentil, com um sorriso franco e olhar que transmite tranquilidade. **COMPOSIÇÃO DA IMAGEM:** O personagem deve estar posicionado no canto inferior direito ou na base inferior da imagem. O fundo deve ser um degradê de estúdio escuro, limpo e sem texturas. É essencial deixar 50% do topo da imagem totalmente livre (negative space) para uma diagramação de texto em uma interface mobile. Fotografia em 85mm, desfoque muito sutil no fundo, altamente realista."

---

## 6. Dicas de Refinamento (Uso no CSS)

Ao utilizar a imagem gerada na página de vendas (mobile):
1. **Gradient Overlay:** Mesmo que o fundo já venha limpo, adicione o degradê por cima via CSS para garantir a transição perfeita com a próxima seção e para escurecer o fundo onde o texto `H1` vai ficar.
   ```css
   .hero-section {
       background-image: 
         linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.9) 100%),
         url('/caminho/para/imagem.jpg');
       background-size: cover;
       background-position: center bottom; /* Mantém o rosto do especialista em foco na base */
   }
   ```
2. **"Vestido de Noiva" Off:** Como você mesmo brincou, ele não vai casar. Todas as opções acima focam em cores sólidas, peças coringas (camisa dobrada, polo, blazer + t-shirt) que não desviam a atenção do produto e focam na mensagem: a *rota* para a CNH.

---

## 7. Prompts Especiais: Vitória com a CNH (Aspect Ratio 3:4)

Para momentos de celebração na página de vendas (ex: seção de garantia ou botão final de conversão). O formato 3:4 é ideal para blocos de conteúdo um pouco mais largos no mobile.

### Opção 1: Vitória no Carro (Lifestyle)
**Prompt:**
> "Fotografia hiper-realista vertical (3:4). **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros com laterais curtas e topo com franja longa caída sobre o lado direito da testa, olhos castanhos, barba e bigode curtos bem aparados.** Ele está sentado no banco do motorista de um carro moderno. Ação: segurando uma carteira de motorista verde (CNH brasileira) firmemente com a mão em punho fechado erguido, fazendo uma expressão facial de vitória intensa e vibrante (boca aberta comemorando, olhos apertados de alegria). Luz natural do sol entrando pelo para-brisa (golden hour), destacando a textura real da pele e um fio de cabelo bagunçado pela emoção. Câmera DSLR, 8k."

### Opção 2: Vitória no Estúdio (Clean / UI Friendly)
**Prompt:**
> "Fotografia de estúdio dramática e vibrante vertical (3:4). **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros com laterais curtas e topo com franja longa caída sobre o lado direito da testa, olhos castanhos, barba e bigode estilo cavanhaque estendido aparados.** Ação: ele está segurando uma CNH verde (carteira de motorista) apontada para frente enquanto o punho está fortemente cerrado em sinal de conquista, fazendo uma careta de vitória extrema (sorriso largo de triunfo). Fundo liso cinza chumbo contínuo e vazio. Iluminação com luz de recorte brilhante (rim light) nas costas e ombros destacando a energia da pose. Detalhe hiper-realista nas veias do braço tensionado e brilho nos olhos."

### Opção 3: Vitória Pós-Prova (Fundo Externo Desfocado)
**Prompt:**
> "Fotografia lifestyle luminosa e alegre vertical (3:4). **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros com laterais curtas e topo com franja longa caída sobre o lado direito da testa, olhos castanhos, barba e bigode curtos bem aparados.** Ação: comemorando explosivamente com o punho cerrado levantado no ar enquanto amassa levemente uma CNH verde (carteira de motorista) de tanta força e emoção. Expressão facial contagiante de alívio e vitória absoluta. Ambiente: ao ar livre em um dia ensolarado, com o fundo levemente desfocado (bokeh) mostrando um pátio de testes do Detran ou carros de autoescola. Cores vivas, alto contraste fotográfico."

---

## 8. Prompts: Estilo Palestrante / Masterclass (Editorial)

Para imagens que transmitem alta autoridade, inspiradas em palestras (estilo TED Talk) e fotografia editorial corporativa. O rosto fica bem visível, mas a composição é mais aberta (plano médio ou plano americano), mostrando gesticulação, mãos e uma postura de "professor ensinando para muitos". A roupa e os acessórios mantêm o arquétipo moderno e acessível (sem ternos engessados).

### Opção 1: A Masterclass 
**Prompt:**
> "Fotografia editorial hiper-realista. **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros com laterais curtas e topo com franja longa caída sobre o lado direito da testa, olhos castanhos, barba e bigode curtos bem aparados.** Ação: ele está palestrando em um palco escuro, capturado em plano médio (da cintura para cima, rosto visível mas não ocupando toda a tela). Postura muito confiante, sereno com um leve sorriso de autoridade. Ele gesticula de forma didática com as mãos, como se explicasse um conceito chave. Veste uma camisa polo escura e elegante. Ambiente: fundo escuro levemente desfocado (bokeh) sugerindo um auditório moderno com luzes quentes de palco ao fundo. Iluminação cinematográfica dramática, foco cravado no rosto, qualidade de revista de negócios, 8k."

### Opção 2: O Guia em Ação (Com Clicker)
**Prompt:**
> "Fotografia de retrato corporativo dinâmico, estilo TED Talk. **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros com laterais curtas e topo com franja longa caída sobre o lado direito da testa, olhos castanhos, barba e bigode estilo cavanhaque estendido aparados.** Ação: capturado em um momento exato de fala, expressão de sabedoria empática. O enquadramento dá respiro para a postura (meio corpo). Ele segura um discreto passador de slides (clicker) em uma mão enquanto a outra está levemente erguida em um gesto calmo de explicação. Roupa: camisa de botão lisa cinza claro sem gravata, mangas dobradas no antebraço. Fundo: estúdio escuro com um holofote suave (spotlight) criando profundidade no fundo vazio. Alta resolução, textura de pele fotorrealista."

### Opção 3: Autoridade Absoluta (Low Angle e Espaço Negativo)
**Prompt:**
> "Fotografia cinematográfica editorial, leve contra-plongée (câmera sutilmente de baixo para cima, transmitindo poder e respeito). **[SUJEITO]: Homem de 35 anos, pele clara levemente bronzeada, rosto oval, cabelos lisos castanhos escuros com laterais curtas e topo com franja longa caída sobre o lado direito da testa, olhos castanhos, barba curta.** Ação: posicionado no terço inferior da imagem (deixando muito espaço negativo na parte superior para textos). Ele olha levemente para o lado, como se observasse uma grande plateia, com um sorriso de canto que transmite confiança absoluta no seu método. Gesticula com uma mão de forma assertiva. Vestindo camiseta preta básica premium por baixo de um blazer escuro moderno desestruturado. Iluminação de palco lateral destacando o contorno do perfil. Fundo totalmente desfocado em tons escuros e elegantes, fotorrealismo, 8k."

## 9. Prompts: Capas do Produto (Thumbnail 16:9) com Texto Embutido (ChatGPT / DALL-E 3)

Estes prompts são focados em gerar a imagem final **sem** o instrutor, mas pedindo para a IA (como o ChatGPT/DALL-E 3) gerar a tipografia do título e os elementos gráficos 3D na própria imagem.

### Opção 1: Design Premium (Foco em Aprovação)
**Prompt:**
> "Crie uma arte gráfica horizontal (16:9) em estilo premium e moderno, ideal para a capa de um curso online. O fundo deve ser um degradê elegante de azul marinho quase preto. No centro ou lado esquerdo, em tipografia gigante, imponente, branca e moderna, escreva exatamente o texto em caixa alta: 'CNH DE PRIMEIRA'. Logo abaixo, em letras menores, escreva: 'Curso Preparatório + Simulados'. Do lado direito da imagem, renderize um volante de carro minimalista, um cinto de segurança e um botão brilhante de 'APROVADO' em acrílico 3D flutuando suavemente. A iluminação deve ter tons de verde esmeralda. Qualidade fotográfica, Unreal Engine."

### Opção 2: O Padrão "App / Praticidade" (Foco no Simulador Mobile)
**Prompt:**
> "Crie um banner publicitário horizontal (16:9) ultra-realista. No lado esquerdo, escreva o título exato em tipografia muito grossa, branca e visível: 'CNH DE PRIMEIRA'. Abaixo dele, escreva em uma fonte menor: 'Revisão Teórica e Simulados'. No lado direito, renderize um smartphone moderno em perspectiva 3D flutuando elegantemente sobre um fundo cinza chumbo com reflexos de luz de estúdio. Na tela brilhante do celular, mostre botões minimalistas verdes e ícones de marcação de gabarito. Design clean, tecnológico e educativo, 8k."

### Opção 3: A Promessa Rápida (Foco na Rota e Checkmark)
**Prompt:**
> "Crie uma capa de curso de alto padrão em formato horizontal (16:9). Estilo gráfico minimalista e motivacional. Fundo: textura sutil de asfalto escuro molhado com faixas amarelas refletindo a luz dourada do sol. No centro, texto enorme e super legível: 'CNH DE PRIMEIRA'. Acima do título, desenhe um grande símbolo de aprovação (checkmark) em verde neon super brilhante. Abaixo do título, escreva em fonte clara e legível: 'Treine O Que Realmente Cai Na Prova'. Visual limpo, sem poluição visual, alto contraste."

### Opção 4: O Arsenal Completo (Vídeo + Simulado)
*Reflete a entrega real do produto: aulas em vídeo para aprender + simulados para treinar.*
**Prompt:**
> "Crie um banner publicitário horizontal (16:9) ultra-realista. No lado esquerdo, em tipografia grossa, branca e moderna, escreva o título: 'CNH DE PRIMEIRA'. Abaixo dele, escreva em verde neon: 'Curso Teórico + Simulados'. No lado direito, renderize um tablet e um smartphone modernos em perspectiva 3D flutuando suavemente. A tela do tablet deve estar mostrando claramente uma videoaula com um botão brilhante de 'Play' no centro. A tela do smartphone ao lado deve mostrar a interface de um simulado de trânsito. Fundo escuro azul marinho elegante com iluminação de estúdio."

### Opção 5: Os Pilares da Prova (Foco em Conteúdo e Play)
*Destaca os temas que eles vão assistir (Legislação, Direção Defensiva, etc).*
**Prompt:**
> "Crie uma arte gráfica horizontal (16:9) em estilo premium. Fundo cinza chumbo muito escuro com reflexos cinematográficos. No lado esquerdo, escreva em caixa alta e fonte imponente: 'CNH DE PRIMEIRA'. Abaixo, escreva em fonte menor: 'Vídeo Aulas de Legislação e Direção Defensiva'. No lado direito, renderize um smartphone de tela cheia inclinado, exibindo de forma clara um player de vídeo tocando uma aula de trânsito. Ao redor do celular, faça flutuar ícones holográficos 3D brilhantes de uma placa de trânsito e de uma cruz médica (primeiros socorros). Qualidade Unreal Engine 5."

### Opção 6: O Estudo Perfeito (Cenário Realista)
*Uma abordagem mais "Lifestyle" de estudo, mas mantendo o texto como destaque.*
**Prompt:**
> "Crie uma capa de curso premium horizontal (16:9). No centro-esquerdo, escreva em letras garrafais brancas e grossas: 'CNH DE PRIMEIRA'. Abaixo, em texto legível e destacado: 'Assista, Pratique e Seja Aprovado'. O cenário de fundo (no lado direito e atrás do texto) deve ser uma mesa de estudos moderna levemente desfocada, mostrando um laptop tela limpa reproduzindo uma videoaula de autoescola, junto de um celular e cadernos de anotação. A iluminação deve ter um tom de 'golden hour' (luz de sol de fim de tarde) entrando pela janela, transmitindo foco, tranquilidade e preparação. Altíssimo nível de detalhe."
