const fs = require('node:fs');
const path = require('node:path');

const REGEX_ANUNCIOS =
  /Library ID:\s*(\d+)\n\nStarted running on\s*(.*?)\s*·[\s\S]*?\*\s\*\s\*[\s\S]*?\[(.*?)\]\([^)]+\)\n\n\*\*Sponsored\*\*\n\n([\s\S]*?)(?=\n\n(?:Low impression count|Impressions:|\[chat\.whatsapp|0:00 \/|\*\s\*\s\*|<\/div>|Active|Library ID:))/g;

function parsearMarkdownMeta(markdown) {
  if (typeof markdown !== 'string' || markdown.trim() === '') {
    return [];
  }

  REGEX_ANUNCIOS.lastIndex = 0;
  let match;
  const anuncios = [];
  while ((match = REGEX_ANUNCIOS.exec(markdown)) !== null) {
    anuncios.push({
      id: String(match[1] ?? '').trim(),
      dataInicio: String(match[2] ?? '').trim(),
      anunciante: String(match[3] ?? '').trim(),
      copy: String(match[4] ?? '').trim(),
    });
  }

  return anuncios;
}

function parsearMarkdownMetaDeArquivo(caminhoArquivo) {
  const markdown = fs.readFileSync(caminhoArquivo, 'utf8');
  return parsearMarkdownMeta(markdown);
}

if (require.main === module) {
  const arquivoMarkdownTeste = path.join(__dirname, '00_teste_markdown_meta.md');
  try {
    const anuncios = parsearMarkdownMetaDeArquivo(arquivoMarkdownTeste);
    console.log(JSON.stringify(anuncios, null, 2));
  } catch (error) {
    console.error(`Erro ao parsear markdown: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  parsearMarkdownMeta,
  parsearMarkdownMetaDeArquivo,
};
