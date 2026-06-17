const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { gerarMemoriaVetorial } = require('../3_gerar_embeddings');

function criarDirTemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'espionagem-ads-fase3-'));
}

function apagarDirTemp(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function respostaEmbeddings(payload) {
  return {
    ok: true,
    status: 200,
    json: async () => payload,
    text: async () => JSON.stringify(payload),
  };
}

test('fase 3: falha sem JINA_API_KEY', async () => {
  const dir = criarDirTemp();
  try {
    await assert.rejects(
      () => gerarMemoriaVetorial({ baseDir: dir, env: {} }),
      /JINA_API_KEY/i
    );
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 3: falha sem arquivo novo e legado', async () => {
  const dir = criarDirTemp();
  try {
    await assert.rejects(
      () =>
        gerarMemoriaVetorial({
          baseDir: dir,
          env: { JINA_API_KEY: 'token' },
          fetchImpl: async () => respostaEmbeddings({}),
        }),
      /02_ads_extraidos\.json|38_anuncios_extraidos\.json/i
    );
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 3: falha com json invalido', async () => {
  const dir = criarDirTemp();
  try {
    fs.writeFileSync(path.join(dir, '02_ads_extraidos.json'), '{invalido');
    await assert.rejects(
      () =>
        gerarMemoriaVetorial({
          baseDir: dir,
          env: { JINA_API_KEY: 'token' },
          fetchImpl: async () => respostaEmbeddings({}),
        }),
      /JSON/i
    );
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 3: usa fallback legado, ignora copy vazia e grava no nome novo', async () => {
  const dir = criarDirTemp();
  try {
    fs.writeFileSync(
      path.join(dir, '38_anuncios_extraidos.json'),
      JSON.stringify([
        { id: '1', copy: 'copy valida', anunciante: 'A' },
        { id: '2', copy: '   ', anunciante: 'B' },
      ])
    );

    const resultado = await gerarMemoriaVetorial({
      baseDir: dir,
      env: { JINA_API_KEY: 'token' },
      fetchImpl: async () =>
        respostaEmbeddings({
          data: [{ embedding: [0.1, 0.2, 0.3] }],
        }),
    });

    assert.equal(resultado.usouLegado, true);
    assert.equal(resultado.totalAnunciosValidos, 1);

    const caminhoNovo = path.join(dir, '03_ads_embeddings.json');
    const caminhoNdjson = path.join(dir, '03_ads_embeddings.ndjson');
    const caminhoState = path.join(dir, '03_ads_embeddings.state.json');
    assert.equal(fs.existsSync(caminhoNovo), true);
    assert.equal(fs.existsSync(caminhoNdjson), true);
    assert.equal(fs.existsSync(caminhoState), true);

    const saida = JSON.parse(fs.readFileSync(caminhoNovo, 'utf8'));
    assert.equal(saida.length, 1);
    assert.deepEqual(saida[0].vetor, [0.1, 0.2, 0.3]);
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 3: retoma de checkpoint sem reprocessar lotes concluidos', async () => {
  const dir = criarDirTemp();
  let chamadas = 0;
  try {
    fs.writeFileSync(
      path.join(dir, '02_ads_extraidos.ndjson'),
      [
        JSON.stringify({ id: '1', copy: 'copy 1', anunciante: 'A' }),
        JSON.stringify({ id: '2', copy: 'copy 2', anunciante: 'B' }),
        JSON.stringify({ id: '3', copy: 'copy 3', anunciante: 'C' }),
      ].join('\n') + '\n'
    );

    const fetchFalhaNoSegundoLote = async () => {
      chamadas += 1;
      if (chamadas === 2) {
        throw new Error('falha simulada');
      }
      return respostaEmbeddings({ data: [{ embedding: [0.1, 0.2] }] });
    };

    await assert.rejects(
      () =>
        gerarMemoriaVetorial({
          baseDir: dir,
          env: { JINA_API_KEY: 'token' },
          fetchImpl: fetchFalhaNoSegundoLote,
          batchSize: 1,
        }),
      /falha simulada/i
    );

    const stateAposFalha = JSON.parse(
      fs.readFileSync(path.join(dir, '03_ads_embeddings.state.json'), 'utf8')
    );
    assert.equal(stateAposFalha.lastIndex, 1);

    const fetchSucesso = async () => respostaEmbeddings({ data: [{ embedding: [0.3, 0.4] }] });
    const resultado = await gerarMemoriaVetorial({
      baseDir: dir,
      env: { JINA_API_KEY: 'token' },
      fetchImpl: fetchSucesso,
      batchSize: 1,
    });

    assert.equal(resultado.totalAnunciosValidos, 3);
    const saida = JSON.parse(fs.readFileSync(path.join(dir, '03_ads_embeddings.json'), 'utf8'));
    assert.equal(saida.length, 3);
  } finally {
    apagarDirTemp(dir);
  }
});
