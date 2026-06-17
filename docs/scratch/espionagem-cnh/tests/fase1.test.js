const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { infiltrarMetaAds } = require('../1_infiltrar_fb');
const { lerNdjson } = require('../incremental');

function criarDirTemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'espionagem-ads-fase1-'));
}

function apagarDirTemp(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function criarBrowserFake() {
  let scrollCount = 0;
  const page = {
    goto: async () => {},
    locator: () => ({
      count: async () => 0,
      click: async () => {},
    }),
    waitForTimeout: async () => {},
    evaluate: async () => {
      scrollCount += 1;
    },
    content: async () => `<html><body>scroll-${scrollCount}</body></html>`,
  };

  const context = {
    newPage: async () => page,
    close: async () => {},
  };

  return {
    newContext: async () => context,
    close: async () => {},
  };
}

test('fase 1: grava progressivo e consolida html final', async () => {
  const dir = criarDirTemp();
  try {
    await infiltrarMetaAds({
      baseDir: dir,
      incremental: true,
      vezesRolar: 2,
      browserFactory: async () => criarBrowserFake(),
      logger: { log() {}, warn() {}, error() {} },
    });

    const caminhoFinal = path.join(dir, '01_raw_fb_ads.html');
    const caminhoParcial = path.join(dir, '01_raw_fb_ads.partial.html');
    const caminhoProgress = path.join(dir, '01_coleta_progress.ndjson');

    assert.equal(fs.existsSync(caminhoFinal), true);
    assert.equal(fs.existsSync(caminhoParcial), true);
    assert.equal(fs.existsSync(caminhoProgress), true);

    const eventos = lerNdjson(caminhoProgress);
    assert.equal(eventos.length >= 2, true);
    assert.equal(eventos.some((e) => e.evento === 'final'), true);
  } finally {
    apagarDirTemp(dir);
  }
});
