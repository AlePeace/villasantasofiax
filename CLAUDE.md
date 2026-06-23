# CLAUDE.md — Villa Santa Sofia

Sito vetrina **headless**: frontend Next.js (App Router) che consuma contenuti da un
backend **WordPress + WPGraphQL + Polylang + Yoast SEO**, hostato su SiteGround
(`biagioc21.sg-host.com`) e deployato su Vercel.

## Stack

- **Next.js ^16.1.6** (App Router, React 19) — file `.jsx`
- **next-intl ^4.8** — i18n con due lingue: `it` (default, senza prefisso) e `en` (prefisso `/en`)
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **GSAP + @gsap/react** — animazioni; **Lenis** — smooth scroll
- **Swiper** — caroselli
- **html-react-parser** — render dei blocchi Gutenberg
- **Formspree / Nodemailer** — form
- **vanilla-cookieconsent** — banner cookie
- **@next/third-parties** — Google Tag Manager (`GTM-W77DV3V7`)
- **@vercel/analytics**

## Struttura

```
app/
  layout.jsx                  # RootLayout minimale (passa solo children)
  sitemap.js                  # sitemap dinamica da WPGraphQL
  api/revalidate/route.js     # webhook ISR revalidate
  [locale]/
    layout.jsx                # <html>, font, GTM, menu, providers i18n, cookie banner
    page.jsx                  # homepage + generateMetadata
    template.jsx
    not-found.jsx
    [...slug]/page.jsx        # catch-all pagine/post + generateMetadata
components/                   # ~70 componenti, ognuno in cartella con index.jsx + Componente.jsx
utils/                        # data fetching verso WordPress (vedi sotto)
i18n/                         # routing.js, request.js, navigation.js (next-intl)
messages/                     # en.json, it.json (stringhe UI statiche)
styles/globals.css
public/fonts/                 # font Montecatini (local) + Nunito Sans (google)
```

## Data fetching (utils/)

Tutte le funzioni fanno **fetch diretto** verso l'endpoint GraphQL — **non c'è un client centrale**.
Pattern ricorrente: `fetch(process.env.WP_GRAPHQL_URL, { method: "POST", ... next: { revalidate: 86400 } })`.

| File | Scopo |
|------|-------|
| `getPage.js` | pagina/post per URI; include fallback Polylang per traduzioni (`getPageByTranslationUri`, `enrichTranslationUris`) |
| `getSeo.js` | dati SEO Yoast (title, description, robots, canonical, openGraph, featuredImage) |
| `getPosts.js` / `getPost.js` | lista / singolo post |
| `getMenu.js` / `getMenuBgImage.js` | menu di navigazione |
| `getFooter.js` | blocchi footer |
| `getHeaderLogo.js` / `getHeroVideo.js` / `getMediaItem.js` | media |
| `getWpContent.js` | **REST API** (non GraphQL) — fallback `content.rendered` per pagine con blocchi custom |
| `cleanAndTransformBlocks.js` / `relativeToAbsoluteUrls.js` | trasformazione blocchi Gutenberg |

**Call sites del fetch GraphQL** (14): `getSeo`, `getPosts`, `getPost`, `getMediaItem`,
`getMenu`, `getMenuBgImage`, `getFooter`, `getHeaderLogo`, `getPage` (×3), `app/sitemap.js` (×2).

## Variabili d'ambiente (`.env.local` + Vercel)

- `WP_GRAPHQL_URL` — endpoint GraphQL WordPress (**nota: non si chiama `WORDPRESS_API_URL`**)
- `WP_IMAGES_URL`
- `NEXT_PUBLIC_WP_URL` — URL base WordPress (usato per riscrivere URL relativi→assoluti e SEO)
- `NEXT_PUBLIC_SITE_URL` — URL pubblico del sito Next.js

## i18n

- Locales: `["it", "en"]`, default `it`. Routing in `i18n/routing.js`.
- URI IT senza prefisso (`/camere/`), EN con prefisso (`/en/camere/`).
- `getPage`/`getSeo` gestiscono i mismatch Polylang con vari livelli di fallback
  (traduzioni dirette → URI italiano → contenuto italiano → lookup su tutte le pagine).
- `TranslationsSync` / `TranslationsProvider` / `LanguageSwitcher` mantengono lo slug corretto
  cambiando lingua.

## Convenzioni

- Componenti: cartella `ComponentName/` con `index.jsx` (re-export) + `ComponentName.jsx`.
- Blocchi Gutenberg renderizzati via `BlockRenderer` / `ArticleBlockRenderer`.
- Path import assoluti via `jsconfig.json` (`components/...`, `utils/...`).
- Commenti in italiano nelle utility.

## Comandi

- `npm run dev` — sviluppo
- `npm run build` — build produzione
- `npm run start` — server produzione
- `npm run lint` — eslint (next)

## Note operative

- ISR: la maggior parte delle query usa `next: { revalidate: 86400 }` (24h); revalidate on-demand
  via `app/api/revalidate/route.js`.
- Il backend SiteGround è **instabile** a tratti: può restituire HTML al posto di JSON,
  andare in timeout o dare dati parziali. Vedi `FIXES.md` per gli interventi di robustezza.
- Documenti correlati: `FIXES.md` (robustezza fetch/SEO), `CLS_AND_ANIMATION_FIXES.md` (perf/animazioni).
