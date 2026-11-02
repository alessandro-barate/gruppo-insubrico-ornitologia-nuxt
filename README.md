# GIO - Gruppo Insubrico di Ornitologia (Nuxt 3)

Sito del Gruppo Insubrico di Ornitologia. Tutti i contenuti (news, pubblicazioni,
progetti, divulgazione, link, testi e immagini delle pagine) arrivano dal backend
Laravel (`gruppo-insubrico-ornitologia-laravel`) e si gestiscono dal pannello
Filament (`/admin` del backend).

## Requisiti

- Node.js 18+
- Il backend Laravel avviato (in locale: `php artisan serve`, porta 8000)

## Configurazione

Il frontend legge le API all'indirizzo `NUXT_PUBLIC_API_BASE`:

```bash
# .env (sviluppo)
NUXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
```

Nel `.env` del backend, `CORS_ALLOWED_ORIGINS` deve contenere l'indirizzo del
frontend (in locale `http://localhost:3000`).

## Sviluppo

```bash
npm install
npm run dev
```

Il sito è su `http://localhost:3000`. Senza il backend acceso le pagine danno errore:
non ci sono più dati di prova nel frontend.

## Produzione (Vercel)

Il sito gira in **SSR**: ogni pagina è generata a ogni richiesta con i dati aggiornati
del backend, così le modifiche fatte nel pannello compaiono subito, senza nuovo deploy.

- Vercel → Settings → Environment Variables:
  `NUXT_PUBLIC_API_BASE=https://<dominio del backend>/api`
- Build: `npm run build` (impostazione predefinita di Vercel per Nuxt).
- Non usare `npm run generate`: un sito statico mostrerebbe i contenuti fermi
  all'ultimo deploy.

## Dove arrivano i dati

| Composable / pagina | API Laravel |
|---|---|
| `useApi.ts` → `useApiData()` | helper comune (404 → `null`) |
| `usePageContent.ts` | `GET /pages/{pagina}` (testi e immagini delle pagine) |
| `pages/news/*`, `NewsCarousel.vue` | `GET /news`, `GET /news/{slug}` |
| `usePubblicazioni.ts` | `GET /pubblicazioni`, `GET /pubblicazioni/{path}` |
| `useProgetti.ts` | `GET /progetti`, `/progetti/sections`, `/progetti/{sezione}/{progetto?}` |
| `useDivulgazione.ts` | `GET /divulgazione`, `/divulgazione/subsections`, `/divulgazione/{slug}` |
| `useLinks.ts` | `GET /links` |
| `useSearch.ts`, `pages/cerca.vue` | `GET /search?q=` |
| `pages/form.vue` | `POST /contact` |
| `useNewsletter.ts` | `POST /newsletter/subscribe` (Mailchimp) |
