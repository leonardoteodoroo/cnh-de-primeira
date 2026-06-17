const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { gerarRelatorio } = require('../4_reranker_relatorio');

function criarDirTemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'espionagem-ads-fase4-'));
}

function apagarDirTemp(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function criarResposta(payload, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => payload,
    text: async () => JSON.stringify(payload),
  };
}

test('fase 4: falha sem JINA_API_KEY', async () => {
  const dir = criarDirTemp();
  try {
    await assert.rejects(
      () => gerarRelatorio({ baseDir: dir, env: {} }),
      /JINA_API_KEY/i
    );
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 4: falha sem arquivo novo e legado', async () => {
  const dir = criarDirTemp();
  try {
    await assert.rejects(
      () =>
        gerarRelatorio({
          baseDir: dir,
          env: { JINA_API_KEY: 'token' },
          fetchImpl: async () => criarResposta({}),
        }),
      /03_ads_embeddings\.json|39_banco_vetorial_ads\.json/i
    );
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 4: usa fallback legado e nao quebra com somente 1 resultado', async () => {
  const dir = criarDirTemp();
  let chamada = 0;
  try {
    fs.writeFileSync(
      path.join(dir, '39_banco_vetorial_ads.json'),
      JSON.stringify([
        {
          id: '1',
          anunciante: 'Nail Pro',
          data_inicio: 'Apr 10, 2026',
          idade_dias: 7,
          copy: 'copy valida',
          vetor: [0.1, 0.2, 0.3],
        },
      ])
    );

    const resultado = await gerarRelatorio({
      baseDir: dir,
      env: { JINA_API_KEY: 'token' },
      fetchImpl: async () => {
        chamada += 1;
        if (chamada === 1) {
          return criarResposta({ data: [{ embedding: [0.1, 0.2, 0.3] }] });
        }
        return criarResposta({
          results: [{ index: 0, relevance_score: 0.92 }],
        });
      },
    });

    assert.equal(resultado.usouLegado, true);
    assert.equal(resultado.totalNoRelatorio, 1);

    const caminhoRelatorio = path.join(dir, '04_relatorio_ads.md');
    const caminhoCompacto = path.join(dir, '04_relatorio_ads_llm.md');
    const caminhoEventos = path.join(dir, '04_relatorio_events.ndjson');
    const caminhoState = path.join(dir, '04_relatorio.state.json');
    assert.equal(fs.existsSync(caminhoRelatorio), true);
    assert.equal(fs.existsSync(caminhoCompacto), true);
    assert.equal(fs.existsSync(caminhoEventos), true);
    assert.equal(fs.existsSync(caminhoState), true);
    const relatorio = fs.readFileSync(caminhoRelatorio, 'utf8');
    assert.match(relatorio, /Top 1 Anúncios/i);
  } finally {
    apagarDirTemp(dir);
  }
});

test('fase 4: falha com resposta de reranker invalida', async () => {
  const dir = criarDirTemp();
  let chamada = 0;
  try {
    fs.writeFileSync(
      path.join(dir, '03_ads_embeddings.json'),
      JSON.stringify([
        {
          id: '1',
          anunciante: 'Nail Pro',
          data_inicio: 'Apr 10, 2026',
          idade_dias: 7,
          copy: 'copy valida',
          vetor: [0.1, 0.2, 0.3],
        },
      ])
    );

    await assert.rejects(
      () =>
        gerarRelatorio({
          baseDir: dir,
          env: { JINA_API_KEY: 'token' },
          fetchImpl: async () => {
            chamada += 1;
            if (chamada === 1) {
              return criarResposta({ data: [{ embedding: [0.1, 0.2, 0.3] }] });
            }
            return criarResposta({ semResults: true });
          },
        }),
      /results/i
    );
  } finally {
    apagarDirTemp(dir);
  }
});
