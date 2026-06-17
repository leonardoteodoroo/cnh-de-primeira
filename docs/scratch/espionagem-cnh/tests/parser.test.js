const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  parsearMarkdownMeta,
  parsearMarkdownMetaDeArquivo,
} = require('../00_parse_markdown_meta');

function criarDirTemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'espionagem-ads-parser-'));
}

function apagarDirTemp(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

test('parser: extrai anuncios validos do markdown padrao', () => {
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
    'Copy de exemplo validada para parsing.',
    '',
    'Low impression count',
    '',
  ].join('\n');

  const anuncios = parsearMarkdownMeta(markdown);
  assert.equal(anuncios.length, 1);
  assert.equal(anuncios[0].id, '123456789012345');
});

test('parser: retorna vazio para bloco incompleto', () => {
  const markdown = [
    'Library ID: 123456789012345',
    '',
    'Started running on Apr 10, 2026 · Active',
    '',
    'Bloco incompleto sem estrutura esperada.',
  ].join('\n');

  const anuncios = parsearMarkdownMeta(markdown);
  assert.deepEqual(anuncios, []);
});

test('parser: le markdown de arquivo', () => {
  const dir = criarDirTemp();
  try {
    const arquivo = path.join(dir, 'fixture.md');
    fs.writeFileSync(
      arquivo,
      [
        'Library ID: 987654321098765',
        '',
        'Started running on Apr 05, 2026 · Active',
        '',
        '* * *',
        '[Nail Elite Academy](https://facebook.com/example2)',
        '',
        '**Sponsored**',
        '',
        'Copy de teste no arquivo.',
        '',
        'Low impression count',
        '',
      ].join('\n')
    );

    const anuncios = parsearMarkdownMetaDeArquivo(arquivo);
    assert.equal(anuncios.length, 1);
    assert.equal(anuncios[0].anunciante, 'Nail Elite Academy');
  } finally {
    apagarDirTemp(dir);
  }
});
