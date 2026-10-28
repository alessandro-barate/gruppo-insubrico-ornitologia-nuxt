// ─── RICERCA NEL SITO ────────────────────────────────────
// Il frontend chiede i risultati a GET {apiBase}/search?q=…&limit=…
// In dev risponde il mock Nitro (server/api/search.get.ts), che indicizza
// i dati mock dei composable. Quando ci sarà Laravel basterà che la sua
// rotta /api/search restituisca la stessa forma (SearchResponse):
// overlay e pagina /cerca non cambiano.
//
// Si cerca in titoli, descrizioni e testi, NON dentro i PDF (dei PDF si
// trova il titolo).

// ─── TIPI (contratto con la futura API Laravel) ──────────
export type SearchResultType =
  | "pagina"
  | "news"
  | "progetto"
  | "pubblicazione"
  | "bibliografia"
  | "divulgazione"
  | "link";

// Come si apre il risultato:
//   "page"     → pagina del sito (NuxtLink)
//   "file"     → PDF/Excel del sito, in una nuova scheda
//   "external" → sito esterno, in una nuova scheda
export type SearchTarget = "page" | "file" | "external";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  type_label: string; // es. "Pubblicazioni": intestazione del gruppo
  title: string; // testo semplice, senza HTML
  excerpt?: string; // pezzo di testo attorno alla parola trovata
  context?: string; // dove si trova, es. "Pubblicazioni › BOL"
  year?: number;
  url: string;
  target: SearchTarget;
  // Parole del contenuto che hanno fatto match (servono per evidenziarle;
  // con la tolleranza agli errori possono differire da quelle digitate)
  terms: string[];
}

export interface SearchResponse {
  q: string;
  total: number; // risultati totali (anche oltre `limit`)
  data: SearchResult[];
}

// Lunghezza minima della ricerca (sotto: nessuna chiamata)
export const SEARCH_MIN_LENGTH = 2;

// Ordine fisso dei gruppi nell'overlay e nei filtri della pagina /cerca
export const SEARCH_TYPE_ORDER: SearchResultType[] = [
  "pagina",
  "news",
  "progetto",
  "pubblicazione",
  "bibliografia",
  "divulgazione",
  "link",
];

// ─── Chiamata all'API ────────────────────────────────────
export function useSearch() {
  const config = useRuntimeConfig();

  const search = (q: string, limit = 8) =>
    $fetch<SearchResponse>("/search", {
      baseURL: config.public.apiBase,
      query: { q, limit },
    });

  return { search };
}

// ─── Evidenziazione ──────────────────────────────────────
// Restituisce HTML SICURO (testo già "escapato") con le parole trovate
// dentro <mark>. Ignora maiuscole e accenti: "perche" evidenzia "perché".
// Evidenzia solo dall'inizio di una parola ("ron" → "Rondone", non "Ceron").

const escapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (ch) => escapeMap[ch] ?? ch);
}

// minuscolo e senza accenti, un carattere alla volta: così le posizioni
// della stringa normalizzata coincidono con quelle dell'originale
function foldChar(ch: string): string {
  const f = ch
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
  return f.length === 1 ? f : ch.toLowerCase().charAt(0) || ch;
}

export function highlightTerms(text: string, terms: string[]): string {
  if (!text) return "";
  const needles = [...new Set(terms.map((t) => t.trim()).filter(Boolean))]
    .map((t) => [...t].map(foldChar).join(""))
    .sort((a, b) => b.length - a.length); // prima le più lunghe
  if (!needles.length) return escapeHtml(text);

  const chars = [...text];
  const folded = chars.map(foldChar);
  const isWordChar = (c: string | undefined) => !!c && /[\p{L}\p{N}]/u.test(c);

  let out = "";
  let i = 0;
  while (i < chars.length) {
    let matchLen = 0;
    if (!isWordChar(folded[i - 1])) {
      for (const n of needles) {
        if (folded.slice(i, i + n.length).join("") === n) {
          matchLen = n.length;
          break;
        }
      }
    }
    if (matchLen) {
      out += `<mark>${escapeHtml(chars.slice(i, i + matchLen).join(""))}</mark>`;
      i += matchLen;
    } else {
      out += escapeHtml(chars[i]);
      i++;
    }
  }
  return out;
}
