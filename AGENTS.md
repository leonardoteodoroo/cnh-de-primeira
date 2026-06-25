_arquivo fechado, voce nao tem acesso.

# REGRAS DE LAYOUT E DEPLOY

- **DEPLOY**: Nunca use Vercel. O deploy é feito exclusivamente no GitHub Pages. Rode `npm run deploy` (que já executa o `npm run build` e joga para a branch gh-pages usando a biblioteca `gh-pages`).
- **FULL-WIDTH (EDGE-TO-EDGE)**: Para fazer um elemento (imagem, ticker, barras) ignorar o padding da section (`px-5`) e encostar 100% nas bordas laterais da tela (edge-to-edge), **NUNCA use `w-screen`** combinado com `left-1/2 -translate-x-1/2` dentro de grids ou containers, pois isso vaza o box model e quebra o layout da página gerando scroll horizontal no body. A nomenclatura padrão para o projeto é usar **margens laterais negativas correspondentes ao padding** (ex: `-mx-5 md:mx-0`) para anular o container com segurança.
- Gostamos de 'whitespace-nowrap' cirurgico em elementos importantes para se manterem em linha e proporcionais.

# TRACKING & RASTREAMENTO

- **FASE ATUAL**: Pixel Meta (client-side) + webhook para Google Sheets com visitor_id por linha.
- **FASE 2 (PENDENTE)**: Implementar **Meta Conversions API (CAPI)** server-side para melhor atribuição de conversões. O webhook para Sheets pode servir como ponte para a CAPI no futuro. A Meta recomenda fortemente usar Pixel + CAPI em paralelo (deduplicação via `eventID`). Priorizar quando o volume de tráfego pago justificar.
- **CHECKOUT**: O `InitiateCheckout` é disparado no **clique do botão de compra** (não na revelação do preço). `Purchase` e `AddPaymentInfo` ficam por conta da **LastLink** (pixel configurado lá).
- criar um exitpopup igual do curso nail desegner, depois apagar essa linha