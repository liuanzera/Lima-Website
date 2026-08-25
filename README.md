# Lima — landing de lançamento do app

Implementação dos frames da section **Responsivos** do Figma "Projeto Lima":
`Desktop - Lima Website` (1440), `Desktop - Lima Website 1920x1080`,
`Tablet - Design Website`, `Mobile - Design Website` e `Menu - Navbar Mobile OPEN`.

## Stack

Vite + React + Tailwind v4 · **Motion** (revelações, molas, scroll) · **Lenis** (scroll suave) · lucide-react.

```bash
npm install
npm run dev      # http://localhost:3600
npm run build
```

## Layout

Sem truque de `zoom`: a página é fluida de verdade. Tipografia em `clamp()`,
coluna de conteúdo de **1276px** centralizada com 82px de goteira — igual ao
frame de 1440, e centralizada como no de 1920. Breakpoints: `tablet` 768px e
`desk` 1024px (onde a navegação completa aparece, como no frame de iPad).

## Animações

- **Hero** — os três aparelhos entram em mola na ordem centro → esquerda → direita e
  depois afundam junto com o scroll, só para baixo; voltar ao topo devolve a mola.
- **Assistente** — no desktop o aparelho desce por trás da seção anterior e trava ao
  chegar no meio; no mobile as blocos revelam em ordem de leitura, sem deslocamento.
- **Menu mobile** — abre com `translateY` + `clip-path`; abre em 400ms e fecha em 350ms.
- Tudo respeita `prefers-reduced-motion`.

## Assets

`public/assets/` exportado do Figma (`exportAsync` / `getImageByHash`), imagens em
**WebP**. Fontes **Cooper Hewitt** (OFL) em `public/fonts/`, em woff2 e só nos 4 pesos usados (400/600/700/900), Inter pelo Google Fonts.
Os cards (timeline, gastos, agenda, heatmap de 84 dias) são HTML — não imagens.

## Onde mexer

| Arquivo | O quê |
|---|---|
| `src/components/Nav.jsx` | barra do topo (logo, links desktop, CTA, hamburguer) |
| `src/components/MenuSheet.jsx` | menu fullscreen do mobile + a coreografia dele |
| `src/hooks.js` | scroll suave, direção do scroll, detecção de mobile |
| `src/links.js` | rótulos e destinos do menu |
| `src/motion-tokens.js` | durações, distâncias e a curva padrão |
| `src/scale.js` | `px()` / `pxMin()` — números crus do Figma × `--s` |
