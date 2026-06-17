# CNH de Primeira

Funil estático em Next.js para o projeto **CNH de Primeira**. O app principal roda como a opção 3 da vitrine pública e é exportado com `basePath: /opcao-03` para publicação no GitHub Pages.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra:

```text
http://localhost:3000/opcao-03/
```

O caminho `/opcao-03` é intencional. Ele precisa bater com a rota publicada dentro da vitrine do domínio.

## Build estático

```bash
npm run build
```

O Next gera a pasta `out/`. Para atualizar o pacote público da vitrine, copie o conteúdo de `out/` para `deploy_dist/opcao-03/`, preservando `deploy_dist/CNAME` e `deploy_dist/.nojekyll` na raiz.

## Publicação

O domínio usado em produção é:

```text
cnh-de-primeira.semprenamoda.com.br
```

No GitHub Pages, o pacote publicado precisa manter estes arquivos na raiz:

```text
deploy_dist/CNAME
deploy_dist/.nojekyll
deploy_dist/index.html
```

Sem o `CNAME` na raiz do conteúdo publicado, o domínio customizado pode parar de responder corretamente.

## Organização de imagens

- Imagens usadas pelo app: `public/images/`
- Ícones SVG padrão do Next: `public/`
- Imagens de documentação e pesquisa: `docs/assets/images/`
