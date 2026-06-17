const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { processarHtmlMeta } = require('../2_limpar_com_reader');

function criarDirTemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'espionagem-ads-fase2-'));
}

function apagarDirTemp(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function criarRespostaJsonOk(payload) {
  return {
    ok: true,
    status: 200,
    json: async () => payload,
    text: async () => JSON.stringify(payload),
  };
}

function markdownValidoExemplo() {
  return [
    'Library ID: 123456789012345',
    '',
    'Started running on Apr 10, 2026 · Active',
    '',
    '* * *',
    '[Escola de Nail Designer Pro](https://facebook.com/example)',
    '',
    '**Sponsored**',
    '',
    'Copy de exemplo validada para parsing.',
    '',
    'Low impression count',
    '',
  ].join('\n');
}

test('fase 2: falha quando JINA_API_KEY nao existe', async () => {
  const dir = criarDirTemp();
  try {
    await assert.rejects(
      () => processarHtmlMeta({ baseDir: dir, env: {} }),
      /JINA_API_KEY/i
    );
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 2: falha quando nao encontra arquivo novo nem legado', async () => {
  const dir = criarDirTemp();
  try {
    await assert.rejects(
      () =>
        processarHtmlMeta({
          baseDir: dir,
          env: { JINA_API_KEY: 'token' },
          fetchImpl: async () => criarRespostaJsonOk({}),
        }),
      /01_raw_fb_ads\.html|raw_fb_ads\.html/i
    );
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 2: falha quando resposta da API nao possui data.content', async () => {
  const dir = criarDirTemp();
  try {
    fs.writeFileSync(path.join(dir, '01_raw_fb_ads.html'), '<html></html>');

    await assert.rejects(
      () =>
        processarHtmlMeta({
          baseDir: dir,
          env: { JINA_API_KEY: 'token' },
          fetchImpl: async () => criarRespostaJsonOk({ data: {} }),
        }),
      /data\.content/i
    );
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 2: usa fallback legado e escreve no nome novo', async () => {
  const dir = criarDirTemp();
  try {
    fs.writeFileSync(path.join(dir, 'raw_fb_ads.html'), '<html></html>');

    const resultado = await processarHtmlMeta({
      baseDir: dir,
      env: { JINA_API_KEY: 'token' },
      fetchImpl: async () =>
        criarRespostaJsonOk({
          data: { content: markdownValidoExemplo() },
        }),
    });

    const caminhoNovo = path.join(dir, '02_ads_extraidos.json');
    const caminhoNdjson = path.join(dir, '02_ads_extraidos.ndjson');
    const caminhoState = path.join(dir, '02_ads_extraidos.state.json');
    assert.equal(fs.existsSync(caminhoNovo), true);
    assert.equal(fs.existsSync(caminhoNdjson), true);
    assert.equal(fs.existsSync(caminhoState), true);
    assert.equal(resultado.usouLegado, true);

    const anuncios = JSON.parse(fs.readFileSync(caminhoNovo, 'utf8'));
    assert.equal(Array.isArray(anuncios), true);
    assert.equal(anuncios.length, 1);
    assert.equal(anuncios[0].anunciante, 'Escola de Nail Designer Pro');
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 2: reexecucao incremental nao duplica anuncios', async () => {
  const dir = criarDirTemp();
  try {
    fs.writeFileSync(path.join(dir, '01_raw_fb_ads.html'), '<html></html>');
    const fetchMock = async () =>
      criarRespostaJsonOk({
        data: { content: markdownValidoExemplo() },
      });

    await processarHtmlMeta({
      baseDir: dir,
      env: { JINA_API_KEY: 'token' },
      fetchImpl: fetchMock,
    });
    const resultado2 = await processarHtmlMeta({
      baseDir: dir,
      env: { JINA_API_KEY: 'token' },
      fetchImpl: fetchMock,
    });

    const caminhoNdjson = path.join(dir, '02_ads_extraidos.ndjson');
    const linhas = fs
      .readFileSync(caminhoNdjson, 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    assert.equal(linhas.length, 1);
    assert.equal(resultado2.duplicadosNaExecucao, 1);
  } finally {
    apagarDirTemp(dir);
  }
});
