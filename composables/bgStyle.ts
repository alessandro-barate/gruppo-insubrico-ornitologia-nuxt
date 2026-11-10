/**
 * :style per un'immagine di sfondo con la sua versione per telefono.
 *
 *   bgStyle(desktop, mobile)                       // sfondo semplice
 *   bgStyle(desktop, mobile, 'linear-gradient(…)') // con un velo sopra
 *
 * Fino a 768px il CSS globale (assets/scss/main.scss, regola su
 * --bg-mobile) sostituisce l'immagine con quella per telefono. Senza
 * versione per telefono resta l'immagine del computer.
 */
export function bgStyle(desktop?: string | null, mobile?: string | null, layers = '') {
  if (!desktop) return undefined
  const layer = (url: string) => [layers, `url("${url}")`].filter(Boolean).join(', ')
  return {
    backgroundImage: layer(desktop),
    ...(mobile && mobile !== desktop ? { '--bg-mobile': layer(mobile) } : {}),
  }
}
