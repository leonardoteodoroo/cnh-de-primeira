const { execSync } = require('child_process');
const fs = require('fs');

const URLS = [
  '/step-01-hero-lab1/',
  '/step-01-hero-lab2/',
  '/step-02-pergunta-01/',
  '/step-03-pergunta-02/',
  '/step-04-pergunta-03/',
  '/step-05-pergunta-04/',
  '/step-06-detran/',
  '/step-07-conta/',
  '/step-08-depoimentos/',
  '/step-09-estudar-certo/',
  '/step-10-sales-page/',
  '/obrigado/'
];

const BASE_URL = 'http://localhost:8080';

async function runLighthouse() {
  const results = {};
  for (const path of URLS) {
    const url = BASE_URL + path;
    const reportPath = `/tmp/lh-${path.replaceAll('/', '')}.json`;
    console.log(`\n🔍 Auditando ${url}...`);
    try {
      // Executa o lighthouse headless
      execSync(`npx --yes lighthouse ${url} --output=json --output-path=${reportPath} --quiet --chrome-flags="--headless"`);
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      
      const scores = {
        Performance: Math.round(report.categories.performance.score * 100),
        Accessibility: Math.round(report.categories.accessibility.score * 100),
        'Best Practices': Math.round(report.categories['best-practices'].score * 100),
        SEO: Math.round(report.categories.seo.score * 100)
      };
      
      console.log(`✅ ${path} -> Perf: ${scores.Performance} | A11y: ${scores.Accessibility} | BP: ${scores['Best Practices']} | SEO: ${scores.SEO}`);
      results[path] = scores;
    } catch (e) {
      console.error(`❌ Erro ao auditar ${path}`);
    }
  }
  
  fs.writeFileSync('tools/lighthouse-summary.json', JSON.stringify(results, null, 2));
  console.log('✅ Relatório consolidado em tools/lighthouse-summary.json');
}

runLighthouse();
