/**
 * Legge i testi/immagini modificabili di una pagina dal backend.
 *
 * Uso:
 *   const { c } = await usePageContent('news')
 *   c('title', 'News')            // testo dal pannello, oppure il default
 *   c('hero_image', defaultImg)   // URL immagine dal pannello, oppure l'asset locale
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

  return { c, data }
}
