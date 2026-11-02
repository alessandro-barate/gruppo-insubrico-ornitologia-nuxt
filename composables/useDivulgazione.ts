// ─── TIPI (API Laravel) ─────────────────
// Definiti una volta sola e riusati in pagine e componenti.
// Le API Resources dovranno restituire esattamente questa forma.
// Pagina /divulgazione: testo introduttivo + galleria
// export interface GalleryImage {
//   src: string;
//   alt: string;
//   caption?: string;
// }

export interface DivulgazionePage {
  intro_text: string;
  // gallery?: GalleryImage[];
}

// Un link ha senso solo se ha un indirizzo: label e url sono obbligatori.
// È la lista `links` dell'item a essere facoltativa (vedi sotto).
export interface ItemLink {
  label: string;
  url: string;
}

export interface SubsectionItem {
  id: number;
  title: string;
  year?: string;
  body?: string;
  image_path?: string;
  // Facoltativo: nessun link, uno o più (aggiunti dagli admin dal pannello)
  links?: ItemLink[];
}

export interface Subsection {
  slug: string;
  title: string;
  title_parts: string[];
  aria_label: string;
  intro_text: string;
  intro_excerpt?: string;
  image_path?: string;
  items: SubsectionItem[];
}

// Forma ridotta usata per le card in index.vue
export type SubsectionCardData = Pick<
  Subsection,
  | "slug"
  | "title"
  | "title_parts"
  | "aria_label"
  | "intro_excerpt"
  | "image_path"
>;

// ─── DATI ────────────────────────────────────────────────
// Dal backend Laravel (pannello → Contenuti → Divulgazione).
export function useDivulgazione() {
  // Card delle sottosezioni (pagina /divulgazione)
  const getSubsections = () =>
    useApiData<SubsectionCardData[]>(
      "divulgazione-subsections",
      "/divulgazione/subsections",
    );

  // Testo introduttivo della pagina /divulgazione
  const getPage = () =>
    useApiData<DivulgazionePage>("divulgazione-page", "/divulgazione");

  // Una sottosezione con le sue voci (null se non esiste)
  const getSubsection = (slug: string) =>
    useApiData<Subsection>(`subsection-${slug}`, `/divulgazione/${slug}`);

  return { getSubsections, getPage, getSubsection };
}
