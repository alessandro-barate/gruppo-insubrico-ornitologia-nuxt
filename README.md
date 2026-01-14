# GIO - Gruppo Insubrico di Ornitologia (Nuxt 3)

Migrazione del sito GIO da Vue 3 + Vite a Nuxt 3 per SSG (Static Site Generation) e SEO ottimizzata.

## Requisiti

- Node.js 18+
- npm o pnpm

## Installazione

```bash
npm install
```

## Sviluppo

```bash
npm run dev
```

Il sito sarà disponibile su `http://localhost:3000`

## Build per produzione (SSG)

```bash
npm run generate
```

I file statici verranno generati in `.output/public/`

## Preview della build

```bash
npm run preview
```

## Struttura del progetto

```
gio-nuxt/
├── pages/                    # Pagine (routing automatico)
│   ├── index.vue             # Homepage (/)
│   ├── chi-siamo.vue         # Chi Siamo (/chi-siamo)
│   ├── news.vue              # News (/news)
│   ├── links.vue             # Links (/links)
│   ├── socials.vue           # Social (/socials)
│   ├── progetti/             # Sezione Progetti
│   │   ├── index.vue         # /progetti
│   │   ├── iwc.vue           # /progetti/iwc
│   │   ├── rondoni.vue       # /progetti/rondoni
│   │   └── zps.vue           # /progetti/zps
│   ├── pubblicazioni/        # Sezione Pubblicazioni
│   │   ├── index.vue         # /pubblicazioni
│   │   ├── bol.vue           # /pubblicazioni/bol
│   │   ├── quaderni.vue      # /pubblicazioni/quaderni
│   │   └── resoconto-ornitologico.vue
│   └── divulgazione/         # Sezione Divulgazione
│       ├── index.vue         # /divulgazione
│       ├── convegni.vue      # /divulgazione/convegni
│       ├── corsi.vue         # /divulgazione/corsi
│       ├── eventi.vue        # /divulgazione/eventi
│       └── rassegna-stampa.vue
├── layouts/
│   └── default.vue           # Layout principale
├── components/               # Componenti (auto-importati)
│   ├── HeaderComponent.vue
│   ├── FooterComponent.vue
│   └── CookieBanner.vue
├── composables/              # Composables (auto-importati)
│   └── useSiteStore.ts       # Store e configurazioni
├── assets/
│   └── scss/
│       ├── main.scss         # Entry point SCSS
│       └── _partials/        # Partials SCSS
├── public/                   # File statici
│   ├── gio-logo.png          # Favicon
│   └── documents/            # PDF e documenti
└── nuxt.config.ts            # Configurazione Nuxt
```

## Migrazione da Vue Router

| Vue Router | Nuxt 3 |
|------------|--------|
| `<router-link :to="{ name: 'X' }">` | `<NuxtLink to="/path">` |
| `<router-view>` | `<slot />` (in layout) |
| `src/router/index.js` | Rimosso (routing automatico) |
| `beforeEach` guard | `middleware/` o `useSeoMeta()` |

## SEO

Ogni pagina gestisce i propri meta tag con:

```vue
<script setup>
useSeoMeta({
  title: 'Titolo Pagina | GIO',
  description: 'Descrizione...',
  ogTitle: 'Titolo per Open Graph',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://gruppoinsubrico.com/path' }
  ]
})
</script>
```

## Prossimi passi

1. **Copiare gli stili completi** dalle pagine Vue originali
2. **Copiare le immagini** in `assets/images/`
3. **Collegare il backend Laravel** per contenuti dinamici
4. **Testare la generazione statica** con `npm run generate`

## Deploy

Per il deploy su hosting statico (Netlify, Vercel, ecc.):

```bash
npm run generate
# Upload della cartella .output/public/
```
