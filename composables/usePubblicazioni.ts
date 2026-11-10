// ─── TIPI (contratto con l'API Laravel) ─────────────────
// Il modello è un ALBERO: ogni nodo è una sottosezione che O ha
// item propri (foglia) O ha figli (contenitore "group").
// Usiamo una DISCRIMINATED UNION sul campo `type`: così quando
// controlli `node.type === 'cards'`, TypeScript sa già che
// `node.items` è CardItem[]. Nessun cast necessario.

// Tipi di item, uno per natura di sottosezione ───────────
export interface CardItem {
  id: number;
  title: string;
  body: string;
  image_path?: string;
  image_path_mobile?: string;
}

export interface PdfItem {
  id: number;
  year?: number;
  title: string;
  pdf_url: string;
}

export interface BibliographyItem {
  id: number;
  text: string;
  // Facoltativo: PDF della pubblicazione. Se c'è, il testo diventa un
  // link che apre il PDF in una nuova scheda.
  pdf_url?: string;
}

export type SubsectionType =
  | "cards"
  | "pdf-list"
  | "bibliography"
  | "group"
  | "detail";

// Campi comuni a tutti i nodi
interface BaseNode {
  slug: string;
  title: string;
  intro_text?: string;
  second_intro_text?: string;
  intro_excerpt?: string;
  header_image?: string;
  header_image_mobile?: string;
  image_path?: string;
  image_path_mobile?: string;
  // Voci per pagina della lista del nodo (default 4). Es. 10 per la
  // bibliografia di Altre Pubblicazioni.
  items_per_page?: number;
}

// Varianti: ogni `type` è legato al suo tipo di item (o a children)
export interface CardsNode extends BaseNode {
  type: "cards";
  items: CardItem[];
}

export interface PdfListNode extends BaseNode {
  type: "pdf-list";
  items: PdfItem[];
  // true → voci raggruppate con l'anno come intestazione (es. BOL).
  // Assente/false → voci comunque ordinate per anno decrescente, ma
  // mostrate in un'unica lista senza intestazioni (es. Resoconti).
  group_by_year?: boolean;
}

export interface BibliographyNode extends BaseNode {
  type: "bibliography";
  items: BibliographyItem[];
}

export interface GroupNode extends BaseNode {
  type: "group";
  children: PubNode[];
}

// Pagina di dettaglio (foglia navigabile): un singolo contenuto —
// es. un Quaderno — con testo descrittivo e, opzionali, immagine di
// copertina, PDF scaricabile e prezzo (donazione minima).
// Pagina interna di un Quaderno (immagine caricata dal pannello).
// L'ordine della lista è l'ordine di lettura: la pagina mostra le
// immagini a coppie, "a libro aperto" (1-2, 3-4, …).
export interface QuadernoPage {
  id: number;
  image_path: string;
  image_path_mobile?: string;
  alt?: string;
}

export interface DetailNode extends BaseNode {
  type: "detail";
  body: string; // HTML descrittivo
  pdf_url?: string;
  price?: string; // testo libero, es. "€ 18"
  // Pagine interne mostrate sotto la copertina (facoltative)
  inner_pages?: QuadernoPage[];
}

// L'unione discriminata: un nodo è UNA di queste cinque forme.
export type PubNode =
  | CardsNode
  | PdfListNode
  | BibliographyNode
  | GroupNode
  | DetailNode;

// Forma ridotta per le card di navigazione (home e nodi group)
export interface PubCardData {
  slug: string;
  title: string;
  intro_excerpt?: string;
  image_path?: string;
  image_path_mobile?: string;
  type: SubsectionType;
}

// Voce di breadcrumb: titolo leggibile + URL cumulativo
export interface Crumb {
  title: string;
  to: string;
}

// Risposta di GET /pubblicazioni/{path}: il nodo, le card dei figli
// (se è un contenitore) e le voci della breadcrumb dopo "Pubblicazioni"
export interface PubNodeResponse {
  node: PubNode;
  childCards: PubCardData[];
  crumbs: Crumb[];
}

// ─── DATI ────────────────────────────────────────────────
// Dal backend Laravel (pannello → Contenuti → Pubblicazioni).
export function usePubblicazioni() {
  // Home: intro + le card di primo livello
  const getHome = () =>
    useApiData<{ intro_text: string; cards: PubCardData[] }>(
      "pubblicazioni-home",
      "/pubblicazioni",
    );

  // Nodo a un dato path (array di segmenti dall'URL catch-all).
  // null se il path non esiste.
  const getNode = (segments: string[]) =>
    useApiData<PubNodeResponse>(
      `pubblicazioni-${segments.join("-") || "root"}`,
      `/pubblicazioni/${segments.map(encodeURIComponent).join("/")}`,
    );

  return { getHome, getNode };
}
