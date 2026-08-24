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

| Quero mudar | Arquivo |
| --- | --- |
| Texto de uma seção | `src/sections/<Seção>.jsx` — cada arquivo abre com o nome do frame do Figma que ele reproduz |
| Preços, planos | `src/sections/Pricing.jsx` (e a resposta correspondente em `Faq.jsx`) |
| Perguntas do FAQ | array `ITEMS` em `src/sections/Faq.jsx` |
| Links do rodapé | arrays `COLUMNS` / `SOCIAL` em `src/sections/Footer.jsx` — os `href: TODO` ainda são placeholders |
| Idiomas do seletor | `LANGUAGES` em `src/components/LanguageMenu.jsx` (a seleção mora no `Nav`, então os dois seletores ficam em sincronia) |
| Cores, fontes, breakpoints | bloco `@theme` em `src/index.css` |
| Duração/curva de qualquer animação | `src/motion-tokens.js` — o CSS espelha a curva em `--ease-expo` (utilitário `ease-expo`) |
| Estilo dos cards brancos | classe `.card` em `src/index.css` |
| Revelação padrão ao rolar | `src/components/Reveal.jsx` — use ele em vez de escrever um `whileInView` novo |

Animações fora desse padrão (hero, celular da assistência, heatmap) estão comentadas
no próprio arquivo explicando por que fogem da regra.
