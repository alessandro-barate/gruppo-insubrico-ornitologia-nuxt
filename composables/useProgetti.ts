// ─── PROGETTI ────────────────────────────────────────────
// Tutti i contenuti della sezione Progetti:
//   /progetti                        → testo descrittivo, card delle 4
//                                      sezioni di ricerca, galleria
//   /progetti/<sezione>              → sezione
//   /progetti/<sezione>/<progetto>   → progetto (se la sezione è navigabile)
//
// ─── TIPI (contratto con l'API Laravel) ─────────────────
// Sezioni e progetti: modello PIATTO, SECTIONS + PROJECTS separati, ogni
// progetto con section_slug (consente lo spostamento admin tra sezioni).
// Alcune sezioni sono "navigabili" (3 livelli): le loro card progetto
// sono bottoni verso una pagina dedicata. Altre restano a 2 livelli
// (i progetti si mostrano inline nella lista).

/** Percorso base delle pagine di sezioni e progetti */
// Deve coincidere con la cartella pages/progetti/[section]/[[project]].vue
export const PROGETTI_BASE_PATH = "/progetti";

// ─── Sezioni che in Progetti mostrano solo la descrizione ─
// I risultati (PDF, articoli) delle ricerche in corso e terminate si
// consultano in Pubblicazioni → Altre Pubblicazioni, nella bibliografia
// (ogni voce apre il suo PDF, vedi usePubblicazioni.ts).
// Per questo, in queste sezioni, la pagina Progetti mostra solo i testi:
// intro + blocchi senza link. Le altre sezioni (es. atlanti) mostrano
// tutto, testi e link.
export const DESCRIPTION_ONLY_SECTIONS = [
  "ricerca-in-corso",
  "ricerca-terminati",
];

// Quale parte di un progetto mostrare:
//   "all"         → intro + tutti i blocchi (testo e link)
//   "description" → intro + i blocchi SENZA link
export type ProjectPart = "all" | "description";

export function projectPartFor(sectionSlug: string): ProjectPart {
  return DESCRIPTION_ONLY_SECTIONS.includes(sectionSlug)
    ? "description"
    : "all";
}

export function blocksFor(project: Project, part: ProjectPart): ContentBlock[] {
  // Link senza indirizzo (segnaposto o lasciati a metà dal pannello) = nessun link
  const blocks = (project.blocks ?? []).map((b) => ({
    ...b,
    links: b.links?.filter((l) => l.url?.trim()),
  }));

  if (part === "all") return blocks;
  return blocks.filter((b) => !b.links?.length);
}

// Pagina /progetti: testo introduttivo + galleria
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProgettiPage {
  intro_text: string;
  gallery: GalleryImage[];
}

export type LinkKind = "pdf" | "external" | "excel" | "powerpoint" | "word";

// Ciò che getNode può restituire: sezione, progetto, o null
export type ProgettiNode =
  | {
      kind: "section";
      section: ProjectSection;
      projects: Project[];
      projectCards: NavCardData[];
    }
  | {
      kind: "project";
      section: ProjectSection;
      project: Project;
    };

export interface TypedLink {
  kind: LinkKind;
  label: string;
  url: string;
}

// Blocco del corpo di un progetto: testo + eventuali link propri.
export interface ContentBlock {
  text?: string;
  links?: TypedLink[];
}

export interface Project {
  id: number;
  section_slug: string;
  slug: string; // usato per l'URL quando la sezione è navigabile
  title: string;
  image_path?: string;
  intro?: string;
  blocks?: ContentBlock[];
  order?: number;
}

export interface ProjectSection {
  slug: string;
  title: string;
  intro_text?: string;
  intro_excerpt?: string;
  image_path?: string;
  has_projects: boolean;
  // true = le card progetto sono bottoni verso una sotto-pagina (3 livelli).
  // false/assente = i progetti si mostrano inline nella lista (2 livelli).
  projects_are_navigable?: boolean;
}

// Card di navigazione generica (per SharedNavCard)
export interface NavCardData {
  slug: string;
  title: string;
  intro_excerpt?: string;
  image_path?: string;
}

// ─── DATI ────────────────────────────────────────────────
// Dal backend Laravel (pannello → Progetti).
export function useProgetti() {
  // Testo introduttivo e galleria della pagina /progetti
  const getPage = () => useApiData<ProgettiPage>("progetti-page", "/progetti");

  // Le card delle sezioni. Senza argomenti: tutte (pagina /progetti).
  // Con `only`: solo quelle indicate (non usato al momento).
  const getSections = (only?: string[]) =>
    useApiData<NavCardData[]>(
      `progetti-sections-${only?.join("-") ?? "all"}`,
      "/progetti/sections",
      { query: only ? { "only[]": only } : undefined },
    );

  // Risolve un path (array di segmenti) in ciò che va mostrato.
  // 1 segmento → una sezione. 2 segmenti → un progetto (se navigabile).
  // null se la pagina non esiste.
  const getNode = (segments: string[]) =>
    useApiData<ProgettiNode>(
      `progetti-node-${segments.join("-") || "root"}`,
      `/progetti/${segments.map(encodeURIComponent).join("/")}`,
    );

  return { getPage, getSections, getNode };
}
