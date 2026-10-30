/**
 * Legge i testi/immagini modificabili di una pagina dal backend
 * (pannello → Pagine → Testi delle pagine).
 *
 * Uso:
 *   const { c, inline, bg } = await usePageContent('news')
 *   c('title', 'News')              // testo dal pannello, oppure il default
 *   c('hero_image', defaultImg)     // URL immagine dal pannello, oppure l'asset locale
 *   inline('intro', '<strong>…')    // testo formattato da mettere DENTRO un <p>
 *   bg('hero_image')                // :style con l'immagine di sfondo, solo se
 *                                   // caricata dal pannello (altrimenti resta il CSS)
 *
 * Se il backend non risponde o un campo è vuoto, si usa il default:
 * la pagina non resta mai senza testo.
 */
export async function usePageContent(page: string) {
  const config = useRuntimeConfig()

  const { data } = await useFetch<Record<string, string | null>>(
    `/pages/${page}`,
    {
      baseURL: config.public.apiBase,
      key: `page-content-${page}`,
      default: () => ({}),
    },
  )

  const c = (key: string, fallback = ''): string =>
    data.value?.[key] || fallback

  /**
   * Per i campi formattati mostrati dentro un elemento <p> già stilizzato.
   * L'editor del pannello avvolge il testo in <p>…</p> (un <p> per ogni
   * Invio): qui si tolgono i <p> esterni e i paragrafi diventano a capo,
   * così non si annidano <p> dentro <p> e lo stile della pagina resta quello.
   */
  const inline = (key: string, fallback = ''): string => {
    const value = data.value?.[key]
    if (!value) return fallback
    return value
      .trim()
      .replace(/^<p[^>]*>/i, '')
      .replace(/<\/p>$/i, '')
      .replace(/<\/p>\s*<p[^>]*>/gi, '<br />')
  }

  /**
   * Immagine di sfondo da :style. Restituisce undefined se il campo è vuoto:
   * in quel caso vale l'immagine scritta nel CSS della pagina.
   * `layers` permette di mettere sopra un gradiente, es.
   *   bg('social_image', 'linear-gradient(90deg, #233162, #233162b6)')
   */
  const bg = (key: string, layers = '') => {
    const url = data.value?.[key]
    if (!url) return undefined
    return { backgroundImage: [layers, `url("${url}")`].filter(Boolean).join(', ') }
  }

  return { c, inline, bg, data }
}
