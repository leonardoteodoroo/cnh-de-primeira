const path = require('node:path');

const ARTEFATOS = Object.freeze({
  HTML_BRUTO_NOVO: '01_raw_fb_ads.html',
  HTML_BRUTO_LEGADO: 'raw_fb_ads.html',
  HTML_BRUTO_PARCIAL: '01_raw_fb_ads.partial.html',
  COLETA_PROGRESSO_NDJSON: '01_coleta_progress.ndjson',
  ADS_EXTRAIDOS_NOVO: '02_ads_extraidos.json',
  ADS_EXTRAIDOS_LEGADO: '38_anuncios_extraidos.json',
  ADS_EXTRAIDOS_NDJSON: '02_ads_extraidos.ndjson',
  ADS_EXTRAIDOS_STATE: '02_ads_extraidos.state.json',
  ADS_EMBEDDINGS_NOVO: '03_ads_embeddings.json',
  ADS_EMBEDDINGS_LEGADO: '39_banco_vetorial_ads.json',
  ADS_EMBEDDINGS_NDJSON: '03_ads_embeddings.ndjson',
  ADS_EMBEDDINGS_STATE: '03_ads_embeddings.state.json',
  RELATORIO_NOVO: '04_relatorio_ads.md',
  RELATORIO_LLM_COMPACTO: '04_relatorio_ads_llm.md',
  RELATORIO_LEGADO: '40_relatorio_final.md',
  RELATORIO_EVENTOS_NDJSON: '04_relatorio_events.ndjson',
  RELATORIO_STATE: '04_relatorio.state.json',
});

function caminhoArtefato(baseDir, nomeArquivo) {
  return path.join(baseDir, nomeArquivo);
}

function resolverEntradaComFallback({ fsModule, baseDir, nomeNovo, nomeLegado }) {
  const caminhoNovo = caminhoArtefato(baseDir, nomeNovo);
  if (fsModule.existsSync(caminhoNovo)) {
    return { caminho: caminhoNovo, usouLegado: false, nomeArquivo: nomeNovo };
  }

  const caminhoLegado = caminhoArtefato(baseDir, nomeLegado);
  if (fsModule.existsSync(caminhoLegado)) {
    return { caminho: caminhoLegado, usouLegado: true, nomeArquivo: nomeLegado };
  }

  return null;
}

function obterArtefatos(caminhosCustom = {}) {
  return { ...ARTEFATOS, ...caminhosCustom };
}

module.exports = {
  ARTEFATOS,
  caminhoArtefato,
  resolverEntradaComFallback,
  obterArtefatos,
};
