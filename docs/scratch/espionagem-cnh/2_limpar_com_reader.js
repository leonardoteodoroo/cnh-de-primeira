try {
  require('dotenv').config();
} catch (error) {
  // Sem dotenv instalado, o script usa process.env normalmente.
}

const fs = require('node:fs');
const {
  ARTEFATOS,
  caminhoArtefato,
  obterArtefatos,
  resolverEntradaComFallback,
} = require('./artefatos');
const {
  appendNdjson,
  carregarCheckpoint,
  consolidarNdjsonParaJson,
  gerarChaveDedupeAnuncio,
  lerNdjson,
  salvarCheckpoint,
} = require('./incremental');

const REGEX_ANUNCIOS =
  /Library ID:\s*(\d+)\n\nStarted running on\s*(.*?)\s*·[\s\S]*?\*\s\*\s\*[\s\S]*?\[(.*?)\]\([^)]+\)\n\n\*\*Sponsored\*\*\n\n([\s\S]*?)(?=\n\n(?:Low impression count|Impressions:|\[chat\.whatsapp|0:00 \/|\*\s\*\s\*|<\/div>|Active|Library ID:))/g;

function sanitizarHtml(htmlBruto) {
  return htmlBruto
    .replace(/<svg\b[^>]*>(.*?)<\/svg>/gi, '')
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/<style\b[^>]*>(.*?)<\/style>/gi, '')
    .replace(/<script\b[^>]*>(.*?)<\/script>/gi, '')
    .replace(/<video\b[^>]*>(.*?)<\/video>/gi, '');
}

function extrairMarkdownDaRespostaReader(payload) {
  const markdown = payload?.data?.content;
  if (typeof markdown !== 'string' || markdown.trim() === '') {
    throw new Error("Resposta invalida da Jina Reader: campo 'data.content' ausente ou vazio.");
  }
  return markdown;
}

function extrairAnunciosDoMarkdown(markdown, opcoes = {}) {
  const dataAtual = opcoes.dataAtual ?? new Date();
  const diasMinimos = opcoes.diasMinimos ?? 0;

  REGEX_ANUNCIOS.lastIndex = 0;
  let match;
  const anunciosValidados = [];
  while ((match = REGEX_ANUNCIOS.exec(markdown)) !== null) {
    const dataInicioStr = String(match[2] ?? '').trim();
    const dataInicio = new Date(dataInicioStr);
    const idadeEmDias = Math.floor((dataAtual - dataInicio) / (1000 * 60 * 60 * 24));
    const copy = String(match[4] ?? '').trim();

    if (!copy) {
      continue;
    }

    const anuncioObj = {
      id: String(match[1] ?? ''),
      data_inicio: dataInicioStr,
      idade_dias: Number.isFinite(idadeEmDias) ? idadeEmDias : 0,
      anunciante: String(match[3] ?? '').trim(),
      copy,
    };

    if (anuncioObj.idade_dias >= diasMinimos) {
      anunciosValidados.push(anuncioObj);
    }
  }

  return anunciosValidados;
}

async function processarHtmlMeta(opcoes = {}) {
  const fsModule = opcoes.fsModule ?? fs;
  const fetchImpl = opcoes.fetchImpl ?? global.fetch;
  const env = opcoes.env ?? process.env;
  const baseDir = opcoes.baseDir ?? process.cwd();
  const logger = opcoes.logger ?? console;
  const diasMinimos = opcoes.diasMinimos ?? 0;
  const incremental = opcoes.incremental ?? true;
  const checkpointAtivo = opcoes.checkpoint ?? true;
  const artefatos = obterArtefatos(opcoes.caminhosCustom);

  if (typeof fetchImpl !== 'function') {
    throw new Error('Funcao fetch indisponivel no ambiente atual.');
  }

  if (!env.JINA_API_KEY) {
    throw new Error("JINA_API_KEY ausente. Defina a chave no ambiente antes de rodar a fase 2.");
  }

  const entrada = resolverEntradaComFallback({
    fsModule,
    baseDir,
    nomeNovo: artefatos.HTML_BRUTO_NOVO,
    nomeLegado: artefatos.HTML_BRUTO_LEGADO,
  });

  if (!entrada) {
    throw new Error(
      `Arquivo de entrada ausente. Esperado '${artefatos.HTML_BRUTO_NOVO}' ou '${artefatos.HTML_BRUTO_LEGADO}'.`
    );
  }

  if (entrada.usouLegado) {
    logger.warn(
      `Entrada legada detectada ('${entrada.nomeArquivo}'). A saida continuara no padrao novo.`
    );
  }

  const htmlBruto = fsModule.readFileSync(entrada.caminho, 'utf8');
  const htmlSanitizado = sanitizarHtml(htmlBruto);

  const bodyPayload = {
    url: 'https://www.facebook.com/ads/library/?q=curso%20nail%20designer',
    html: htmlSanitizado,
  };

  const resposta = await fetchImpl('https://r.jina.ai/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${env.JINA_API_KEY}`,
    },
    body: JSON.stringify(bodyPayload),
  });

  if (!resposta.ok) {
    const bodyErro = typeof resposta.text === 'function' ? await resposta.text() : '';
    throw new Error(`Falha na Jina Reader (HTTP ${resposta.status}): ${bodyErro}`);
  }

  const payload = await resposta.json();
  const markdown = extrairMarkdownDaRespostaReader(payload);
  const anunciosValidados = extrairAnunciosDoMarkdown(markdown, { diasMinimos });

  const caminhoSaida = caminhoArtefato(baseDir, artefatos.ADS_EXTRAIDOS_NOVO);
  const caminhoNdjson = caminhoArtefato(baseDir, artefatos.ADS_EXTRAIDOS_NDJSON);
  const caminhoState = caminhoArtefato(baseDir, artefatos.ADS_EXTRAIDOS_STATE);

  let totalDuplicados = 0;
  let totalNovos = anunciosValidados.length;

  if (incremental) {
    const existentes = lerNdjson(caminhoNdjson, fsModule);
    const chavesExistentes = new Set(
      existentes.map((item, idx) => gerarChaveDedupeAnuncio(item, idx))
    );

    totalNovos = 0;
    anunciosValidados.forEach((anuncio, idx) => {
      const chave = gerarChaveDedupeAnuncio(anuncio, idx);
      if (chavesExistentes.has(chave)) {
        totalDuplicados += 1;
        return;
      }
      appendNdjson(caminhoNdjson, anuncio, fsModule);
      chavesExistentes.add(chave);
      totalNovos += 1;
    });

    const consolidados = consolidarNdjsonParaJson(caminhoNdjson, caminhoSaida, fsModule);
    if (checkpointAtivo) {
      const checkpointAnterior = carregarCheckpoint(caminhoState, {}, fsModule);
      salvarCheckpoint(
        caminhoState,
        {
          ...checkpointAnterior,
          fase: 2,
          atualizadoEm: new Date().toISOString(),
          totalRecebidoExecucao: anunciosValidados.length,
          novosNaExecucao: totalNovos,
          duplicadosNaExecucao: totalDuplicados,
          totalConsolidado: consolidados.length,
          usouLegado: entrada.usouLegado,
        },
        fsModule
      );
    }
  } else {
    fsModule.writeFileSync(caminhoSaida, JSON.stringify(anunciosValidados, null, 2));
  }

  return {
    caminhoSaida,
    caminhoNdjson: incremental ? caminhoNdjson : null,
    caminhoState: incremental && checkpointAtivo ? caminhoState : null,
    totalAnuncios: anunciosValidados.length,
    novosNaExecucao: totalNovos,
    duplicadosNaExecucao: totalDuplicados,
    usouLegado: entrada.usouLegado,
  };
}

if (require.main === module) {
  processarHtmlMeta()
    .then((resultado) => {
      console.log(
        `Fase 2 concluida. ${resultado.totalAnuncios} anuncios processados e saida em '${ARTEFATOS.ADS_EXTRAIDOS_NOVO}'.`
      );
    })
    .catch((error) => {
      console.error(`Erro na fase 2: ${error.message}`);
      process.exitCode = 1;
    });
}

module.exports = {
  processarHtmlMeta,
  sanitizarHtml,
  extrairAnunciosDoMarkdown,
  extrairMarkdownDaRespostaReader,
};
