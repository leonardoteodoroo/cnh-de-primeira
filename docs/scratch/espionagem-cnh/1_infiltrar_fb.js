const fs = require('node:fs');
const { ARTEFATOS, caminhoArtefato, obterArtefatos } = require('./artefatos');
const { appendNdjson } = require('./incremental');

function criarBrowserFactoryPadrao(headless) {
  return async () => {
    const { chromium } = require('playwright-extra');
    const stealth = require('puppeteer-extra-plugin-stealth')();
    chromium.use(stealth);
    return chromium.launch({ headless });
  };
}

async function infiltrarMetaAds(opcoes = {}) {
  const fsModule = opcoes.fsModule ?? fs;
  const baseDir = opcoes.baseDir ?? process.cwd();
  const termoBusca = opcoes.termoBusca ?? 'prova detran';
  const headless = opcoes.headless ?? true;
  const vezesRolar = opcoes.vezesRolar ?? 2;
  const incremental = opcoes.incremental ?? true;
  const logger = opcoes.logger ?? console;
  const artefatos = obterArtefatos(opcoes.caminhosCustom);
  const browserFactory = opcoes.browserFactory ?? criarBrowserFactoryPadrao(headless);

  logger.log('[Fase 1] Iniciando infiltracao furtiva...');

  const browser = await browserFactory();
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  try {
    const page = await context.newPage();
    const termo = encodeURIComponent(termoBusca);
    const urlBusca = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=BR&q=${termo}&sort_data[direction]=desc&sort_data[mode]=relevancy_monthly_grouped&media_type=all`;

    logger.log(`Navegando para: ${urlBusca}`);
    await page.goto(urlBusca, { waitUntil: 'networkidle' });

    try {
      const btnCookies = page.locator('div[aria-label="Permitir todos os cookies"]');
      if ((await btnCookies.count()) > 0) {
        await btnCookies.click();
        await page.waitForTimeout(2000);
      }
    } catch (error) {
      // Popup de cookies pode nao existir dependendo da sessao.
    }

    const caminhoParcial = caminhoArtefato(baseDir, artefatos.HTML_BRUTO_PARCIAL);
    const caminhoProgresso = caminhoArtefato(baseDir, artefatos.COLETA_PROGRESSO_NDJSON);

    await page.waitForTimeout(5000);
    for (let i = 0; i < vezesRolar; i++) {
      await page.evaluate(() => window.scrollBy(0, 1500));
      const delayHumano = Math.floor(Math.random() * 2000) + 1000;
      await page.waitForTimeout(delayHumano);

      if (incremental) {
        const htmlParcial = await page.content();
        fsModule.writeFileSync(caminhoParcial, htmlParcial, 'utf8');
        appendNdjson(
          caminhoProgresso,
          {
            evento: 'scroll',
            scroll: i + 1,
            timestamp: new Date().toISOString(),
            estimativa_tamanho_html: htmlParcial.length,
            termoBusca,
          },
          fsModule
        );
      }
    }

    await page.waitForTimeout(3000);
    const htmlBruto = await page.content();

    const caminhoSaida = caminhoArtefato(baseDir, artefatos.HTML_BRUTO_NOVO);
    fsModule.writeFileSync(caminhoSaida, htmlBruto);

    if (incremental) {
      fsModule.writeFileSync(caminhoParcial, htmlBruto, 'utf8');
      appendNdjson(
        caminhoProgresso,
        {
          evento: 'final',
          timestamp: new Date().toISOString(),
          estimativa_tamanho_html: htmlBruto.length,
          termoBusca,
        },
        fsModule
      );
    }

    return {
      caminhoSaida,
      caminhoParcial: incremental ? caminhoParcial : null,
      caminhoProgresso: incremental ? caminhoProgresso : null,
      tamanhoMb: Number((htmlBruto.length / 1024 / 1024).toFixed(2)),
      urlBusca,
    };
  } finally {
    await context.close();
    await browser.close();
  }
}

if (require.main === module) {
  infiltrarMetaAds()
    .then((resultado) => {
      console.log(
        `Fase 1 concluida. HTML salvo em '${ARTEFATOS.HTML_BRUTO_NOVO}' (${resultado.tamanhoMb} MB).`
      );
    })
    .catch((error) => {
      console.error(`Erro na fase 1: ${error.message}`);
      process.exitCode = 1;
    });
}

module.exports = {
  infiltrarMetaAds,
};
