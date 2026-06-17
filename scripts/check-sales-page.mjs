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
  "O gratuito te entrega conteúdo. O curso preparatório para a prova da CNH te entrega direção.",
  "Não é estudar mais. É estudar CERTO!",
  "Método Raio-X CNH",
  "Anderson Mageski",
  "não prometemos questão vazada",
];

for (const phrase of requiredCopy) {
  assert.ok(data.includes(phrase), `Copy crítica ausente em data.ts: ${phrase}`);
}

console.log("Sales page smoke check passed.");
