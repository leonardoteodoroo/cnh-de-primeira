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

function lerJsonSeguro(fsModule, caminhoArquivo) {
  try {
    return JSON.parse(fsModule.readFileSync(caminhoArquivo, 'utf8'));
  } catch (error) {
    throw new Error(`Falha ao ler JSON de '${caminhoArquivo}': ${error.message}`);
  }
}

function validarRespostaEmbeddings(payload, quantidadeEsperada) {
  const data = payload?.data;
  if (!Array.isArray(data)) {
    throw new Error("Resposta invalida de embeddings: campo 'data' ausente ou nao-array.");
  }

  if (data.length < quantidadeEsperada) {
    throw new Error(
      `Resposta de embeddings incompleta: esperado ${quantidadeEsperada}, recebido ${data.length}.`
    );
  }

  return data;
}

async function gerarMemoriaVetorial(opcoes = {}) {
  const fsModule = opcoes.fsModule ?? fs;
  const fetchImpl = opcoes.fetchImpl ?? global.fetch;
  const env = opcoes.env ?? process.env;
  const baseDir = opcoes.baseDir ?? process.cwd();
  const logger = opcoes.logger ?? console;
  const incremental = opcoes.incremental ?? true;
  const checkpointAtivo = opcoes.checkpoint ?? true;
  const batchSize = Number(opcoes.batchSize ?? 20);
  const artefatos = obterArtefatos(opcoes.caminhosCustom);

  if (typeof fetchImpl !== 'function') {
    throw new Error('Funcao fetch indisponivel no ambiente atual.');
  }

  if (!env.JINA_API_KEY) {
    throw new Error("JINA_API_KEY ausente. Defina a chave no ambiente antes de rodar a fase 3.");
  }

  if (!Number.isInteger(batchSize) || batchSize <= 0) {
    throw new Error(`batchSize invalido: '${opcoes.batchSize}'. Use inteiro > 0.`);
  }

  const caminhoEntradaNdjson = caminhoArtefato(baseDir, artefatos.ADS_EXTRAIDOS_NDJSON);
  let anunciosBrutos = [];
  let usouEntradaIncremental = false;
  let usouLegado = false;

  if (incremental && fsModule.existsSync(caminhoEntradaNdjson)) {
    anunciosBrutos = lerNdjson(caminhoEntradaNdjson, fsModule);
    usouEntradaIncremental = true;
  } else {
    const entrada = resolverEntradaComFallback({
      fsModule,
      baseDir,
      nomeNovo: artefatos.ADS_EXTRAIDOS_NOVO,
      nomeLegado: artefatos.ADS_EXTRAIDOS_LEGADO,
    });

    if (!entrada) {
      throw new Error(
        `Arquivo de entrada ausente. Esperado '${artefatos.ADS_EXTRAIDOS_NDJSON}', '${artefatos.ADS_EXTRAIDOS_NOVO}' ou '${artefatos.ADS_EXTRAIDOS_LEGADO}'.`
      );
    }

    usouLegado = entrada.usouLegado;
    if (entrada.usouLegado) {
      logger.warn(
        `Entrada legada detectada ('${entrada.nomeArquivo}'). A saida continuara no padrao novo.`
      );
    }

    anunciosBrutos = lerJsonSeguro(fsModule, entrada.caminho);
  }

  if (!Array.isArray(anunciosBrutos)) {
    throw new Error('Entrada invalida: o JSON de anuncios precisa ser um array.');
  }

  const anunciosValidos = anunciosBrutos.filter(
    (anuncio) => typeof anuncio?.copy === 'string' && anuncio.copy.trim().length > 0
  );

  if (anunciosValidos.length === 0) {
    throw new Error('Nenhum anuncio com campo copy valido encontrado para gerar embeddings.');
  }

  const caminhoSaida = caminhoArtefato(baseDir, artefatos.ADS_EMBEDDINGS_NOVO);
  const caminhoNdjsonSaida = caminhoArtefato(baseDir, artefatos.ADS_EMBEDDINGS_NDJSON);
  const caminhoState = caminhoArtefato(baseDir, artefatos.ADS_EMBEDDINGS_STATE);

  let anunciosComVetor = [];
  let totalIgnorados = anunciosBrutos.length - anunciosValidos.length;
  let totalNovos = anunciosValidos.length;

  if (incremental) {
    const checkpoint = checkpointAtivo
      ? carregarCheckpoint(caminhoState, { lastIndex: 0 }, fsModule)
      : { lastIndex: 0 };
    const lastIndex = Number.isInteger(checkpoint.lastIndex) ? checkpoint.lastIndex : 0;

    const saidaExistente = lerNdjson(caminhoNdjsonSaida, fsModule);
    const chavesExistentes = new Set(
      saidaExistente.map((item, idx) => gerarChaveDedupeAnuncio(item, idx))
    );

    for (let inicio = lastIndex; inicio < anunciosValidos.length; inicio += batchSize) {
      const fim = Math.min(inicio + batchSize, anunciosValidos.length);
      const lote = anunciosValidos.slice(inicio, fim);
      const lotePendentes = [];
      const metadadosPendentes = [];

      lote.forEach((anuncio, idxLote) => {
        const idxGlobal = inicio + idxLote;
        const chave = gerarChaveDedupeAnuncio(anuncio, idxGlobal);
        if (!chavesExistentes.has(chave)) {
          lotePendentes.push(anuncio.copy.trim());
          metadadosPendentes.push({ anuncio, chave });
        }
      });

      if (lotePendentes.length > 0) {
        const resposta = await fetchImpl('https://api.jina.ai/v1/embeddings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.JINA_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'jina-embeddings-v3',
            input: lotePendentes,
            task: 'retrieval.passage',
            dimensions: 1024,
          }),
        });

        if (!resposta.ok) {
          const bodyErro = typeof resposta.text === 'function' ? await resposta.text() : '';
          throw new Error(`Falha na API de embeddings (HTTP ${resposta.status}): ${bodyErro}`);
        }

        const payload = await resposta.json();
        const resultadosApi = validarRespostaEmbeddings(payload, lotePendentes.length);

        for (let i = 0; i < metadadosPendentes.length; i++) {
          const embedding = resultadosApi[i]?.embedding;
          if (!Array.isArray(embedding) || embedding.length === 0) {
            throw new Error(`Embedding invalido para anuncio no indice ${inicio + i}.`);
          }

          const enriched = {
            ...metadadosPendentes[i].anuncio,
            vetor: embedding,
          };
          appendNdjson(caminhoNdjsonSaida, enriched, fsModule);
          chavesExistentes.add(metadadosPendentes[i].chave);
        }
      }

      if (checkpointAtivo) {
        salvarCheckpoint(
          caminhoState,
          {
            fase: 3,
            updatedAt: new Date().toISOString(),
            lastIndex: fim,
            batchSize,
            totalFonte: anunciosValidos.length,
            totalOutputEstimado: chavesExistentes.size,
          },
          fsModule
        );
      }
    }

    anunciosComVetor = consolidarNdjsonParaJson(caminhoNdjsonSaida, caminhoSaida, fsModule);
    totalNovos = Math.max(0, anunciosComVetor.length - saidaExistente.length);
  } else {
    const copies = anunciosValidos.map((anuncio) => anuncio.copy.trim());
    const resposta = await fetchImpl('https://api.jina.ai/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.JINA_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'jina-embeddings-v3',
        input: copies,
        task: 'retrieval.passage',
        dimensions: 1024,
      }),
    });

    if (!resposta.ok) {
      const bodyErro = typeof resposta.text === 'function' ? await resposta.text() : '';
      throw new Error(`Falha na API de embeddings (HTTP ${resposta.status}): ${bodyErro}`);
    }

    const payload = await resposta.json();
    const resultadosApi = validarRespostaEmbeddings(payload, anunciosValidos.length);
    anunciosComVetor = anunciosValidos.map((anuncio, index) => {
      const embedding = resultadosApi[index]?.embedding;
      if (!Array.isArray(embedding) || embedding.length === 0) {
        throw new Error(`Embedding invalido para anuncio no indice ${index}.`);
      }
      return { ...anuncio, vetor: embedding };
    });
    fsModule.writeFileSync(caminhoSaida, JSON.stringify(anunciosComVetor, null, 2));
  }

  return {
    caminhoSaida,
    caminhoNdjson: incremental ? caminhoNdjsonSaida : null,
    caminhoState: incremental && checkpointAtivo ? caminhoState : null,
    totalAnunciosValidos: anunciosComVetor.length,
    totalIgnorados,
    novosNaExecucao: totalNovos,
    usouEntradaIncremental,
    usouLegado,
  };
}

if (require.main === module) {
  gerarMemoriaVetorial()
    .then((resultado) => {
      console.log(
        `Fase 3 concluida. ${resultado.totalAnunciosValidos} anuncios vetorizados em '${ARTEFATOS.ADS_EMBEDDINGS_NOVO}'.`
      );
    })
    .catch((error) => {
      console.error(`Erro na fase 3: ${error.message}`);
      process.exitCode = 1;
    });
}

module.exports = {
  gerarMemoriaVetorial,
  validarRespostaEmbeddings,
};
