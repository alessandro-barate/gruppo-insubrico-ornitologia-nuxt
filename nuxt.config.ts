// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Abilita SSR per generazione statica
  ssr: true,

  // Configurazione Nitro per SSG
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  // Head globale (sostituisce index.html)
  app: {
    head: {
      htmlAttrs: { lang: 'it' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Gruppo Insubrico di Ornitologia',
      meta: [
        { name: 'description', content: 'Associazione per lo studio e la conservazione degli uccelli' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Gruppo Insubrico di Ornitologia' },
        { property: 'og:locale', content: 'it_IT' },
        { property: 'og:image', content: 'https://www.gruppoinsubrico.com/images/og-default.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/gio-logo.webp' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap' 
        },
      ],
    },

    // Transizioni pagina (replica usePageTransition)
    pageTransition: { 
      name: 'page', 
      mode: 'out-in',
      onBeforeEnter() {
        // Scroll to top prima che la nuova pagina appaia
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }
    }
  },

  // SCSS globale
  css: ['~/assets/scss/main.scss'],

  // Configurazione Vite per SCSS
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Importa variabili globali in tutti i componenti
          additionalData: `@use "~/assets/scss/_partials/_global" as *;`
        }
      }
    }
  },

  // Abilita DevTools in sviluppo
  devtools: { enabled: true },

  // Configurazione compatibilità
  compatibilityDate: '2024-11-01'
})
