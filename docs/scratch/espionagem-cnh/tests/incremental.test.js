const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  appendNdjson,
  lerNdjson,
  salvarCheckpoint,
  carregarCheckpoint,
  gerarChaveDedupeAnuncio,
} = require('../incremental');

function criarDirTemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'espionagem-ads-incr-'));
}

function apagarDirTemp(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

test('incremental: append e leitura NDJSON', () => {
  const dir = criarDirTemp();
  try {
    const caminho = path.join(dir, 'dados.ndjson');
    appendNdjson(caminho, { id: 1, nome: 'A' });
    appendNdjson(caminho, { id: 2, nome: 'B' });

    const itens = lerNdjson(caminho);
    assert.equal(itens.length, 2);
    assert.equal(itens[1].nome, 'B');
  } finally {
    apagarDirTemp(dir);
  }
});

test('incremental: checkpoint atomico nao deixa .tmp residual', () => {
  const dir = criarDirTemp();
  try {
    const caminho = path.join(dir, 'state.json');
    salvarCheckpoint(caminho, { fase: 3, lastIndex: 10 });
    const state = carregarCheckpoint(caminho, {});

    assert.equal(state.fase, 3);
    assert.equal(state.lastIndex, 10);
    assert.equal(fs.existsSync(`${caminho}.tmp`), false);
  } finally {
    apagarDirTemp(dir);
  }
});

test('incremental: chave de dedupe estavel', () => {
  const anuncio = { id: '123', copy: 'copy A' };
  const chaveA = gerarChaveDedupeAnuncio(anuncio, 0);
  const chaveB = gerarChaveDedupeAnuncio(anuncio, 10);
  assert.equal(chaveA, chaveB);
});
