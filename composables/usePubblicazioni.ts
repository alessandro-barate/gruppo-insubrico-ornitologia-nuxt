// ─── TIPI (contratto con la futura API Laravel) ──────────
// Il modello è un ALBERO: ogni nodo è una sottosezione che O ha
// item propri (foglia) O ha figli (contenitore "group").
// Il campo `type` dice al frontend come renderizzare gli item.

// Tipi di item, uno per natura di sottosezione ───────────
export interface CardItem {
  id: number;
  title: string;
  body: string;
  image_path?: string;
}

export interface PdfItem {
  id: number;
  title: string;
  pdf_url: string;
}

export interface BibliographyItem {
  id: number;
  text: string;
}

export type SubsectionType = "cards" | "pdf-list" | "bibliography" | "group";

// Un nodo dell'albero. `items` e `children` sono mutuamente
// esclusivi: un "group" ha children, tutti gli altri hanno items.
export interface PubNode {
  slug: string;
  title: string;
  type: SubsectionType;
  intro_text?: string;
  intro_excerpt?: string;
  image_path?: string;
  items?: CardItem[] | PdfItem[] | BibliographyItem[];
  children?: PubNode[];
}

// Forma ridotta per le card di navigazione (home e nodi group)
export interface PubCardData {
  slug: string;
  title: string;
  intro_excerpt?: string;
  image_path?: string;
  type: SubsectionType;
}

// ─── MOCK DATA ───────────────────────────────────────────
// TODO: rimuovere quando il backend è pronto.
// La forma replica l'output atteso dalle API Resources Laravel.
const PUBBLICAZIONI_INTRO =
  "Le pubblicazioni scientifiche del Gruppo Insubrico di Ornitologia raccolgono oltre vent'anni di attivit&agrave; scientifica e divulgativa, documentando ricerche, monitoraggi e studi dedicatiall'avifauna. In questa sezione sono disponibili i <strong><em>Quaderni del G.I.O.</em></strong>, il <strong><em>Bollettino Ornitologico Lombardo</em></strong>, gli <strong><em>Uccelli della Provincia di Varese</em></strong> che comprende la <strong><em>Lista degli uccelli</em></strong> e il <strong><em>Resoconto ornitologico della provincia di Varese</em></strong>, oltre alla bibliografia dei lavori scientifici realizzati dai soci. Un patrimonio di conoscenze messo a disposizione di ricercatori, appassionati e di tutti gli interessati all'ornitologia.";

const MOCK_TREE: PubNode[] = [
  {
    slug: "quaderni",
    title: "Quaderni",
    type: "cards",
    intro_text:
      "<p>I Quaderni del G.I.O. raccolgono studi monografici e approfondimenti tematici sull'avifauna insubrica.</p>",
    intro_excerpt: "Studi monografici e approfondimenti tematici.",
    image_path: "/images/pubblicazioni/cards/quaderni.jpg",
    items: [
      {
        id: 1,
        title: "Quaderno n.1 — Gli uccelli delle zone umide",
        body: "<p>Una panoramica sulle specie acquatiche del territorio insubrico e sul loro stato di conservazione.</p>",
        image_path: "/images/pubblicazioni/quaderni/q1.jpg",
      },
      {
        id: 2,
        title: "Quaderno n.2 — Rapaci diurni",
        body: "<p>Studio sulla distribuzione e nidificazione dei rapaci diurni nelle province di Varese e Como.</p>",
        image_path: "/images/pubblicazioni/quaderni/q2.jpg",
      },
      {
        id: 3,
        title: "Quaderno n.3 — Migrazione",
        body: "<p>I flussi migratori osservati sul territorio e le tecniche di monitoraggio adottate.</p>",
        image_path: "/images/pubblicazioni/quaderni/q3.jpg",
      },
      {
        id: 4,
        title: "Quaderno n.4 — Uccelli urbani",
        body: "<p>L'adattamento dell'avifauna agli ambienti antropizzati e urbani.</p>",
        image_path: "/images/pubblicazioni/quaderni/q4.jpg",
      },
    ] as CardItem[],
  },
  {
    slug: "bol",
    title: "BOL — Bollettino Ornitologico Lombardo",
    type: "pdf-list",
    intro_text:
      "<p>Il Bollettino Ornitologico Lombardo raccoglie le osservazioni e i contributi dei soci, pubblicato periodicamente.</p>",
    intro_excerpt: "Il bollettino periodico delle osservazioni.",
    image_path: "/images/pubblicazioni/cards/bol.jpg",
    items: [
      {
        id: 10,
        title: "Bollettino N.1 2020",
        pdf_url: "/docs/bol/bol-1-2020.pdf",
      },
      {
        id: 11,
        title: "Bollettino N.2 2020",
        pdf_url: "/docs/bol/bol-2-2020.pdf",
      },
      {
        id: 12,
        title: "Bollettino N.1 2022",
        pdf_url: "/docs/bol/bol-1-2022.pdf",
      },
      {
        id: 13,
        title: "Bollettino N.2 2022",
        pdf_url: "/docs/bol/bol-2-2022.pdf",
      },
      {
        id: 14,
        title: "Bollettino N.3 2022",
        pdf_url: "/docs/bol/bol-3-2022.pdf",
      },
      {
        id: 15,
        title: "Bollettino N.1 2025",
        pdf_url: "/docs/bol/bol-1-2025.pdf",
      },
      {
        id: 16,
        title: "Bollettino N.1 2026",
        pdf_url: "/docs/bol/bol-1-2026.pdf",
      },
    ] as PdfItem[],
  },
  {
    slug: "paper",
    title: "Paper",
    type: "bibliography",
    intro_text:
      "<p>Pubblicazioni scientifiche e articoli su riviste specializzate a cura dei soci del G.I.O.</p>",
    intro_excerpt: "Articoli scientifici e riferimenti bibliografici.",
    image_path: "/images/pubblicazioni/cards/paper.jpg",
    items: [
      {
        id: 20,
        text: "Rossi M., Bianchi L. (2021). <em>Distribuzione del Martin pescatore lungo il fiume Ticino</em>. Rivista Italiana di Ornitologia, 91(2), 45-58.",
      },
      {
        id: 21,
        text: "Verdi A. et al. (2022). <em>Monitoraggio dell'Averla piccola nelle aree agricole insubriche</em>. Avocetta, 46, 112-120.",
      },
      {
        id: 22,
        text: "Gialli P. (2023). <em>Svernamento degli acquatici nei laghi prealpini</em>. Alula, 30(1), 3-15.",
      },
    ] as BibliographyItem[],
  },
  {
    slug: "liste",
    title: "Liste",
    type: "group",
    intro_text:
      "<p>Liste sistematiche e racconti ornitologici che documentano le osservazioni sul territorio nel corso degli anni.</p>",
    intro_excerpt: "Liste sistematiche e racconti ornitologici.",
    image_path: "/images/pubblicazioni/cards/liste.jpg",
    children: [
      {
        slug: "lista-uccelli",
        title: "Lista uccelli",
        type: "pdf-list",
        intro_text:
          "<p>Le liste sistematiche delle specie osservate sul territorio provinciale, aggiornate periodicamente.</p>",
        intro_excerpt: "Liste sistematiche delle specie osservate.",
        items: [
          {
            id: 30,
            title: "Lista uccelli Provincia di Varese 2020",
            pdf_url: "/docs/liste/lista-varese-2020.pdf",
          },
        ] as PdfItem[],
      },
      {
        slug: "racconti-ornitologici",
        title: "Racconti ornitologici",
        type: "pdf-list",
        intro_text:
          "<p>Cronache e resoconti annuali delle attività di osservazione e degli avvistamenti più significativi.</p>",
        intro_excerpt: "Cronache e resoconti annuali di osservazione.",
        items: [
          {
            id: 40,
            title: "Racconto Ornitologico 2017",
            pdf_url: "/docs/racconti/2017.pdf",
          },
          {
            id: 41,
            title: "Racconto Ornitologico 2018",
            pdf_url: "/docs/racconti/2018.pdf",
          },
          {
            id: 42,
            title: "Racconto Ornitologico 2019",
            pdf_url: "/docs/racconti/2019.pdf",
          },
          {
            id: 43,
            title: "Racconto Ornitologico 2020",
            pdf_url: "/docs/racconti/2020.pdf",
          },
          {
            id: 44,
            title: "Racconto Ornitologico 2021",
            pdf_url: "/docs/racconti/2021.pdf",
          },
          {
            id: 45,
            title: "Racconto Ornitologico 2022",
            pdf_url: "/docs/racconti/2022.pdf",
          },
          {
            id: 46,
            title: "Racconto Ornitologico 2023",
            pdf_url: "/docs/racconti/2023.pdf",
          },
          {
            id: 47,
            title: "Racconto Ornitologico 2024",
            pdf_url: "/docs/racconti/2024.pdf",
          },
        ] as PdfItem[],
      },
    ],
  },
];
// ─────────────────────────────────────────────────────────

// Cammina l'albero seguendo i segmenti dell'URL e restituisce
// il nodo trovato, oppure null se il path non esiste.
function resolveNode(segments: string[]): PubNode | null {
  let currentLevel: PubNode[] = MOCK_TREE;
  let found: PubNode | null = null;

  for (const segment of segments) {
    const match = currentLevel.find((n) => n.slug === segment);
    if (!match) return null;
    found = match;
    currentLevel = match.children ?? [];
  }

  return found;
}

// Riduce un nodo alla forma-card per la navigazione
function toCard(node: PubNode): PubCardData {
  return {
    slug: node.slug,
    title: node.title,
    intro_excerpt: node.intro_excerpt,
    image_path: node.image_path,
    type: node.type,
  };
}

export function usePubblicazioni() {
  // Home: intro + le card di primo livello
  const getHome = () => {
    // FUTURO: return useAsyncData('pubblicazioni-home',
    //   () => $fetch('/api/pubblicazioni'))
    return useAsyncData("pubblicazioni-home", () =>
      Promise.resolve({
        intro_text: PUBBLICAZIONI_INTRO,
        cards: MOCK_TREE.map(toCard),
      }),
    );
  };

  // Nodo a un dato path (array di segmenti dall'URL catch-all).
  // Restituisce il nodo + le eventuali card figlie già pronte,
  // così la pagina non deve conoscere la struttura dell'albero.
  const getNode = (segments: string[]) => {
    const key = `pubblicazioni-${segments.join("-") || "root"}`;
    // FUTURO: return useAsyncData(key,
    //   () => $fetch(`/api/pubblicazioni/${segments.join('/')}`))
    return useAsyncData(key, () => {
      const node = resolveNode(segments);
      if (!node) return Promise.resolve(null);

      return Promise.resolve({
        node,
        // se è un contenitore, pre-calcolo le card dei figli
        childCards:
          node.type === "group" ? (node.children ?? []).map(toCard) : [],
      });
    });
  };

  return { getHome, getNode };
}
