const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { processarHtmlMeta } = require('../2_limpar_com_reader');
const { gerarMemoriaVetorial } = require('../3_gerar_embeddings');
const { gerarRelatorio } = require('../4_reranker_relatorio');

function criarDirTemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'espionagem-ads-smoke-'));
}

function apagarDirTemp(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

test('smoke offline: fase 2 -> 3 -> 4 com artefatos incrementais e finais', async () => {
  const dir = criarDirTemp();
  let chamadaRag = 0;
  try {
    fs.writeFileSync(path.join(dir, '01_raw_fb_ads.html'), '<html></html>');

    const markdown = [
      'Library ID: 123456789012345',
      '',
      'Started running on Apr 10, 2026 · Active',
      '',
      '* * *',
      '[Escola de Nail Designer Pro](https://facebook.com/example)',
      '',
      '**Sponsored**',
      '',
      'Copy A de exemplo.',
      '',
      'Low impression count',
      '',
      'Library ID: 987654321098765',
      '',
      'Started running on Apr 05, 2026 · Active',
      '',
      '* * *',
      '[Nail Elite Academy](https://facebook.com/example2)',
      '',
      '**Sponsored**',
      '',
      'Copy B de exemplo.',
      '',
      'Low impression count',
      '',
    ].join('\n');

    await processarHtmlMeta({
      baseDir: dir,
      env: { JINA_API_KEY: 'token' },
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ data: { content: markdown } }),
        text: async () => '',
      }),
      logger: { log() {}, warn() {}, error() {} },
    });

    await gerarMemoriaVetorial({
      baseDir: dir,
      env: { JINA_API_KEY: 'token' },
      batchSize: 1,
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ data: [{ embedding: [0.1, 0.2, 0.3] }] }),
        text: async () => '',
      }),
      logger: { log() {}, warn() {}, error() {} },
    });

    await gerarRelatorio({
      baseDir: dir,
      env: { JINA_API_KEY: 'token' },
      fetchImpl: async () => {
        chamadaRag += 1;
        if (chamadaRag === 1) {
          return {
            ok: true,
            status: 200,
            json: async () => ({ data: [{ embedding: [0.1, 0.2, 0.3] }] }),
            text: async () => '',
          };
        }
        return {
          ok: true,
          status: 200,
          json: async () => ({
            results: [
              { index: 0, relevance_score: 0.95 },
              { index: 1, relevance_score: 0.88 },
            ],
          }),
          text: async () => '',
        };
      },
      logger: { log() {}, warn() {}, error() {} },
    });

    const esperados = [
      '02_ads_extraidos.ndjson',
      '02_ads_extraidos.json',
      '03_ads_embeddings.ndjson',
      '03_ads_embeddings.json',
      '04_relatorio_events.ndjson',
      '04_relatorio_ads.md',
      '04_relatorio_ads_llm.md',
    ];

    esperados.forEach((arquivo) => {
      assert.equal(fs.existsSync(path.join(dir, arquivo)), true, `faltou ${arquivo}`);
    });
  } finally {
    apagarDirTemp(dir);
  }
});
