const fs = require('node:fs');
const crypto = require('node:crypto');

function appendNdjson(caminhoArquivo, objeto, fsModule = fs) {
  const linha = `${JSON.stringify(objeto)}\n`;
  fsModule.appendFileSync(caminhoArquivo, linha, 'utf8');
}

function lerNdjson(caminhoArquivo, fsModule = fs) {
  if (!fsModule.existsSync(caminhoArquivo)) {
    return [];
  }

  const conteudo = fsModule.readFileSync(caminhoArquivo, 'utf8');
  if (!conteudo.trim()) {
    return [];
  }

  return conteudo
    .split('\n')
    .map((linha) => linha.trim())
    .filter(Boolean)
    .map((linha, indice) => {
      try {
        return JSON.parse(linha);
      } catch (error) {
        throw new Error(
          `Linha NDJSON invalida em '${caminhoArquivo}' (linha ${indice + 1}): ${error.message}`
        );
      }
    });
}

function salvarCheckpoint(caminhoArquivo, state, fsModule = fs) {
  const tmp = `${caminhoArquivo}.tmp`;
  fsModule.writeFileSync(tmp, JSON.stringify(state, null, 2), 'utf8');
  fsModule.renameSync(tmp, caminhoArquivo);
}

function carregarCheckpoint(caminhoArquivo, valorPadrao = {}, fsModule = fs) {
  if (!fsModule.existsSync(caminhoArquivo)) {
    return { ...valorPadrao };
  }

  try {
    const parsed = JSON.parse(fsModule.readFileSync(caminhoArquivo, 'utf8'));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { ...valorPadrao };
    }
    return { ...valorPadrao, ...parsed };
  } catch (error) {
    return { ...valorPadrao };
  }
}

function consolidarNdjsonParaJson(caminhoNdjson, caminhoJson, fsModule = fs) {
  const itens = lerNdjson(caminhoNdjson, fsModule);
  fsModule.writeFileSync(caminhoJson, JSON.stringify(itens, null, 2), 'utf8');
  return itens;
}

function hashTexto(valor) {
  return crypto.createHash('sha1').update(String(valor)).digest('hex');
}

function gerarChaveDedupeAnuncio(anuncio, fallbackIndice = -1) {
  const id = String(anuncio?.id ?? '').trim();
  const copy = String(anuncio?.copy ?? '').trim();
  if (id) {
    return `id:${id}`;
  }
  if (copy) {
    return `copy:${hashTexto(copy)}`;
  }
  return `idx:${fallbackIndice}:${hashTexto(JSON.stringify(anuncio ?? {}))}`;
}

module.exports = {
  appendNdjson,
  lerNdjson,
  salvarCheckpoint,
  carregarCheckpoint,
  consolidarNdjsonParaJson,
  hashTexto,
  gerarChaveDedupeAnuncio,
};
