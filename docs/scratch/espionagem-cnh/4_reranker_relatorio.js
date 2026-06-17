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
  lerNdjson,
  salvarCheckpoint,
} = require('./incremental');

function medirSimilaridade(vetorA, vetorB) {
  if (!Array.isArray(vetorA) || !Array.isArray(vetorB)) {
    return 0;
  }

  const tamanho = Math.min(vetorA.length, vetorB.length);
  if (tamanho === 0) {
    return 0;
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  for (let i = 0; i < tamanho; i++) {
    const valorA = Number(vetorA[i]) || 0;
    const valorB = Number(vetorB[i]) || 0;
    dotProduct += valorA * valorB;
    magnitudeA += valorA * valorA;
    magnitudeB += valorB * valorB;
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

function lerJsonSeguro(fsModule, caminhoArquivo) {
  try {
    return JSON.parse(fsModule.readFileSync(caminhoArquivo, 'utf8'));
  } catch (error) {
    throw new Error(`Falha ao ler JSON de '${caminhoArquivo}': ${error.message}`);
  }
}

function validarRespostaEmbeddingsConsulta(payload) {
  const embedding = payload?.data?.[0]?.embedding;
  if (!Array.isArray(embedding) || embedding.length === 0) {
    throw new Error("Resposta invalida de embeddings da pergunta: 'data[0].embedding' ausente.");
  }
  return embedding;
}

function validarRespostaReranker(payload) {
  const results = payload?.results;
  if (!Array.isArray(results)) {
    throw new Error("Resposta invalida do reranker: campo 'results' ausente ou nao-array.");
  }
  return results;
}

function gerarMarkdownRelatorio({ pergunta, resultados, totalTop, dataInvestigacao }) {
  const tituloTop = `Top ${resultados.length} Anúncios Vencedores (Filtrados pelo Jina Reranker v2)`;
  let relatorioMarkdown = '# Relatorio de Inteligencia RAG (Ad Library)\n\n';
  relatorioMarkdown += `**Data:** ${dataInvestigacao}\n`;
  relatorioMarkdown += `**Pergunta Investigada:**\n> "${pergunta}"\n\n`;
  relatorioMarkdown += `## ${tituloTop}\n\n`;
  relatorioMarkdown += `Top matematico considerado antes do reranker: ${totalTop}\n\n`;

  for (let i = 0; i < resultados.length; i++) {
    const item = resultados[i];
    relatorioMarkdown += `### Ouro ${i + 1}: Anunciante [${item.anuncio.anunciante}]\n`;
    relatorioMarkdown += `- **Relevancia:** ${(item.relevanceScore * 100).toFixed(1)}%\n`;
    relatorioMarkdown += `- **Data Inicial:** ${item.anuncio.data_inicio} (${item.anuncio.idade_dias} dias ativo)\n`;
    relatorioMarkdown += '- **Copy do Anuncio (Texto Completo):**\n\n';
    relatorioMarkdown += `> ${item.anuncio.copy.replace(/\n/g, '\n> ')}\n\n`;
    relatorioMarkdown += '---\n\n';
  }

  return relatorioMarkdown;
}

function gerarMarkdownRelatorioCompacto({ pergunta, resultados, totalTop, dataInvestigacao }) {
  let relatorio = '# Relatorio Compacto para LLM\n\n';
  relatorio += `Pergunta: "${pergunta}"\n`;
  relatorio += `Data: ${dataInvestigacao}\n`;
  relatorio += `Top matematico considerado: ${totalTop}\n\n`;
  relatorio += '## Principais achados\n\n';

  resultados.forEach((item, idx) => {
    const preview = item.anuncio.copy.replace(/\s+/g, ' ').trim();
    relatorio += `${idx + 1}. Anunciante: ${item.anuncio.anunciante}\n`;
    relatorio += `   Relevancia: ${(item.relevanceScore * 100).toFixed(1)}%\n`;
    relatorio += `   Inicio: ${item.anuncio.data_inicio}\n`;
    relatorio += `   Copy: ${preview.slice(0, 320)}\n\n`;
  });

  relatorio += 'Use este resumo para contexto inicial da LLM. Consulte o relatorio completo para detalhes.\n';
  return relatorio;
}

async function gerarRelatorio(opcoes = {}) {
  const fsModule = opcoes.fsModule ?? fs;
  const fetchImpl = opcoes.fetchImpl ?? global.fetch;
  const env = opcoes.env ?? process.env;
  const baseDir = opcoes.baseDir ?? process.cwd();
  const logger = opcoes.logger ?? console;
  const incremental = opcoes.incremental ?? true;
  const checkpointAtivo = opcoes.checkpoint ?? true;
  const artefatos = obterArtefatos(opcoes.caminhosCustom);

  const caminhoEventos = caminhoArtefato(baseDir, artefatos.RELATORIO_EVENTOS_NDJSON);
  const caminhoState = caminhoArtefato(baseDir, artefatos.RELATORIO_STATE);
  const caminhoRelatorio = caminhoArtefato(baseDir, artefatos.RELATORIO_NOVO);
  const caminhoRelatorioCompacto = caminhoArtefato(baseDir, artefatos.RELATORIO_LLM_COMPACTO);

  if (typeof fetchImpl !== 'function') {
    throw new Error('Funcao fetch indisponivel no ambiente atual.');
  }

  if (!env.JINA_API_KEY) {
    throw new Error("JINA_API_KEY ausente. Defina a chave no ambiente antes de rodar a fase 4.");
  }

  let bancoBruto = [];
  let usouEntradaIncremental = false;
  let usouLegado = false;

  const caminhoEmbeddingsNdjson = caminhoArtefato(baseDir, artefatos.ADS_EMBEDDINGS_NDJSON);
  if (incremental && fsModule.existsSync(caminhoEmbeddingsNdjson)) {
    bancoBruto = lerNdjson(caminhoEmbeddingsNdjson, fsModule);
    usouEntradaIncremental = true;
  } else {
    const entrada = resolverEntradaComFallback({
      fsModule,
      baseDir,
      nomeNovo: artefatos.ADS_EMBEDDINGS_NOVO,
      nomeLegado: artefatos.ADS_EMBEDDINGS_LEGADO,
    });

    if (!entrada) {
      throw new Error(
        `Arquivo de entrada ausente. Esperado '${artefatos.ADS_EMBEDDINGS_NDJSON}', '${artefatos.ADS_EMBEDDINGS_NOVO}' ou '${artefatos.ADS_EMBEDDINGS_LEGADO}'.`
      );
    }

    usouLegado = entrada.usouLegado;
    if (entrada.usouLegado) {
      logger.warn(
        `Entrada legada detectada ('${entrada.nomeArquivo}'). A saida continuara no padrao novo.`
      );
    }
    bancoBruto = lerJsonSeguro(fsModule, entrada.caminho);
  }

  if (incremental) {
    appendNdjson(
      caminhoEventos,
      { evento: 'inicio', timestamp: new Date().toISOString(), totalBruto: bancoBruto.length },
      fsModule
    );
  }

  if (!Array.isArray(bancoBruto)) {
    throw new Error('Entrada invalida: o banco vetorial precisa ser um array.');
  }

  const banco = bancoBruto.filter(
    (anuncio) =>
      typeof anuncio?.copy === 'string' &&
      anuncio.copy.trim().length > 0 &&
      Array.isArray(anuncio?.vetor) &&
      anuncio.vetor.length > 0
  );

  if (banco.length === 0) {
    throw new Error('Nenhum anuncio valido com vetor encontrado para rerank.');
  }

  if (checkpointAtivo) {
    salvarCheckpoint(
      caminhoState,
      {
        ...(carregarCheckpoint(caminhoState, {}, fsModule) ?? {}),
        fase: 4,
        stage: 'banco_validado',
        updatedAt: new Date().toISOString(),
        totalBancoValido: banco.length,
      },
      fsModule
    );
  }

  const pergunta =
    opcoes.pergunta ??
    'Qual o gancho mais forte e promessa principal para quem reprovou na prova do Detran e tem medo de tentar de novo?';

  const respPergunta = await fetchImpl('https://api.jina.ai/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.JINA_API_KEY}`,
    },
    body: JSON.stringify({ model: 'jina-embeddings-v3', input: [pergunta] }),
  });

  if (!respPergunta.ok) {
    const bodyErro = typeof respPergunta.text === 'function' ? await respPergunta.text() : '';
    throw new Error(`Falha ao vetorizar pergunta (HTTP ${respPergunta.status}): ${bodyErro}`);
  }

  const payloadPergunta = await respPergunta.json();
  const vetorPergunta = validarRespostaEmbeddingsConsulta(payloadPergunta);

  const resultados = banco
    .map((anuncio) => ({ anuncio, score: medirSimilaridade(vetorPergunta, anuncio.vetor) }))
    .sort((a, b) => b.score - a.score);

  const topMatematico = resultados.slice(0, Math.min(10, resultados.length));
  if (topMatematico.length === 0) {
    throw new Error('Nao foi possivel gerar candidatos para reranker.');
  }

  if (incremental) {
    appendNdjson(
      caminhoEventos,
      {
        evento: 'top_matematico',
        timestamp: new Date().toISOString(),
        totalTop: topMatematico.length,
      },
      fsModule
    );
  }

  const docsProReranker = topMatematico.map((item) => item.anuncio.copy);
  const topN = Math.min(5, docsProReranker.length);

  const respReranker = await fetchImpl('https://api.jina.ai/v1/rerank', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.JINA_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'jina-reranker-v2-base-multilingual',
      query: pergunta,
      documents: docsProReranker,
      top_n: topN,
    }),
  });

  if (!respReranker.ok) {
    const bodyErro = typeof respReranker.text === 'function' ? await respReranker.text() : '';
    throw new Error(`Falha no reranker (HTTP ${respReranker.status}): ${bodyErro}`);
  }

  const payloadReranker = await respReranker.json();
  const reranked = validarRespostaReranker(payloadReranker);

  const resultadosRanqueados = reranked
    .map((item) => {
      const indice = Number(item?.index);
      const relevanceScore = Number(item?.relevance_score);
      if (!Number.isInteger(indice) || indice < 0 || indice >= topMatematico.length) {
        return null;
      }
      if (!Number.isFinite(relevanceScore)) {
        return null;
      }
      return {
        anuncio: topMatematico[indice].anuncio,
        relevanceScore,
      };
    })
    .filter(Boolean);

  if (resultadosRanqueados.length === 0) {
    throw new Error('Reranker retornou resultados invalidos para os candidatos enviados.');
  }

  const topRelatorio = resultadosRanqueados.slice(0, Math.min(3, resultadosRanqueados.length));
  const dataInvestigacao = new Date().toISOString();
  const relatorioMarkdown = gerarMarkdownRelatorio({
    pergunta,
    resultados: topRelatorio,
    totalTop: topMatematico.length,
    dataInvestigacao,
  });
  const relatorioCompacto = gerarMarkdownRelatorioCompacto({
    pergunta,
    resultados: topRelatorio,
    totalTop: topMatematico.length,
    dataInvestigacao,
  });

  fsModule.writeFileSync(caminhoRelatorio, relatorioMarkdown);
  fsModule.writeFileSync(caminhoRelatorioCompacto, relatorioCompacto);

  if (incremental) {
    appendNdjson(
      caminhoEventos,
      {
        evento: 'relatorios_gerados',
        timestamp: new Date().toISOString(),
        totalNoRelatorio: topRelatorio.length,
      },
      fsModule
    );
  }

  if (checkpointAtivo) {
    salvarCheckpoint(
      caminhoState,
      {
        ...(carregarCheckpoint(caminhoState, {}, fsModule) ?? {}),
        fase: 4,
        stage: 'finalizado',
        updatedAt: new Date().toISOString(),
        totalNoRelatorio: topRelatorio.length,
      },
      fsModule
    );
  }

  return {
    caminhoSaida: caminhoRelatorio,
    caminhoSaidaCompacta: caminhoRelatorioCompacto,
    caminhoEventos: incremental ? caminhoEventos : null,
    caminhoState: checkpointAtivo ? caminhoState : null,
    totalNoRelatorio: topRelatorio.length,
    usouEntradaIncremental,
    usouLegado,
  };
}

if (require.main === module) {
  gerarRelatorio()
    .then((resultado) => {
      console.log(
        `Fase 4 concluida. Relatorio com ${resultado.totalNoRelatorio} anuncio(s) salvo em '${ARTEFATOS.RELATORIO_NOVO}'.`
      );
    })
    .catch((error) => {
      console.error(`Erro na fase 4: ${error.message}`);
      process.exitCode = 1;
    });
}

module.exports = {
  gerarRelatorio,
  medirSimilaridade,
  validarRespostaEmbeddingsConsulta,
  validarRespostaReranker,
  gerarMarkdownRelatorio,
  gerarMarkdownRelatorioCompacto,
};
