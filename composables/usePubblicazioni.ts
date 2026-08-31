// ─── TIPI (contratto con la futura API Laravel) ──────────
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
  intro_excerpt?: string;
  image_path?: string;
}

// Varianti: ogni `type` è legato al suo tipo di item (o a children)
export interface CardsNode extends BaseNode {
  type: "cards";
  items: CardItem[];
}

export interface PdfListNode extends BaseNode {
  type: "pdf-list";
  items: PdfItem[];
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
export interface DetailNode extends BaseNode {
  type: "detail";
  body: string; // HTML descrittivo
  pdf_url?: string;
  price?: string; // testo libero, es. "€ 18"
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
  type: SubsectionType;
}

// Voce di breadcrumb: titolo leggibile + URL cumulativo
export interface Crumb {
  title: string;
  to: string;
}

// ─── MOCK DATA ───────────────────────────────────────────
// TODO: rimuovere quando il backend è pronto.
// La forma replica l'output atteso dalle API Resources Laravel.
const PUBBLICAZIONI_INTRO =
  "Le pubblicazioni scientifiche del Gruppo Insubrico di Ornitologia raccolgono oltre vent'anni di attivit&agrave; scientifica e divulgativa, documentando ricerche, monitoraggi e studi dedicati all'avifauna. In questa sezione sono disponibili i <strong><em>Quaderni del G.I.O.</em></strong>, il <strong><em>BOL - Bollettino Ornitologico Lombardo</em></strong>, gli <strong><em>Uccelli della Provincia di Varese</em></strong> che comprende la <strong><em>Lista degli uccelli</em></strong> e il <strong><em>Resoconto ornitologico della provincia di Varese</em></strong>, oltre alla bibliografia dei lavori scientifici realizzati dai soci. Un patrimonio di conoscenze messo a disposizione di ricercatori, appassionati e di tutti gli interessati all'ornitologia.";

const MOCK_TREE: PubNode[] = [
  {
    slug: "quaderni",
    title: "Quaderni",
    type: "group",
    intro_text:
      "<p>I Quaderni del G.I.O. sono pubblicazioni scientifiche curate dai soci del Gruppo, nate con l'obiettivo di raccogliere e divulgare i risultati delle ricerche ornitologiche condotte sul territorio.<br>Si tratta di volumi cartacei che si possono ricevere tramite una donazione minima al G.I.O. OdV (gli importi sono comprensivi di eventuali spese di spedizione): le copie possono anche ritirate personalmente.<br><br>Per tutte le informazioni, le richieste per ricevere delle copie e le modalità di pagamento contattateci tramite il nostro <a href='/form' class='specific-link' target='_blank'>form di contatto</a>.<br><ul class='specific-list'><li><strong>Quaderno 4/2022</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 18</strong> cadauno</li></ul><p>Sempre disponibili anche gli altri Quaderni del G.I.O.:</p><ul class='specific-list'><li><strong>Quaderno 3/2018</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 15</strong> cadauno</li><li><strong>Quaderno 2/2015</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 8</strong> cadauno</li><li><strong>Quaderno 1/2012</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 5</strong> cadauno</li></ul><p><strong>Donazione minima per serie:</strong></p><ul class='specific-list'><li>Intera collana - Quaderni 1/2/3/4: <strong>&euro; 35</strong></li><li>Quaderni 1/2/4, oppure 1/3/4, oppure 2/3/4: <strong>&euro; 30</strong></li><li>Quaderni 1/2/3: <strong>&euro; 25</strong></li></ul><p><strong>Dati per bonifici:</strong><br>Gruppo Insubrico di Ornitologia<br>IBAN: IT13A0569650240000020568X10<br>Causale: NOME e COGNOME, donazione/Quaderno (specificare quale/quali) n° X copie</p></p>",
    intro_excerpt: "Studi monografici e approfondimenti tematici.",
    image_path: "/images/pubblicazioni/cards/quaderni.jpg",
    children: [
      {
        slug: "quaderno-4-2022",
        title: "Quaderno 4/2022 - Uccelli del Lago Maggiore",
        type: "detail",
        intro_excerpt: "L'adattamento dell'avifauna agli ambienti urbani.",
        image_path: "/images/pubblicazioni/quaderni/q4.jpg",
        price: "€ 18",
        pdf_url: "/docs/quaderni/quaderno-4-2022.pdf",
        body: "<p>L'adattamento dell'avifauna agli ambienti antropizzati e urbani.</p>",
      },
      {
        slug: "quaderno-3-2018",
        title: "Quaderno 3/2018 - Storia naturale dei picchi",
        type: "detail",
        intro_excerpt: "I flussi migratori osservati sul territorio.",
        image_path: "/images/pubblicazioni/quaderni/q3.jpg",
        price: "€ 15",
        pdf_url: "/docs/quaderni/quaderno-3-2018.pdf",
        body: "<p>I flussi migratori osservati sul territorio e le tecniche di monitoraggio adottate.</p>",
      },
      {
        slug: "quaderno-2-2015",
        title:
          "Quaderno 2/2015 - Check-list degli uccelli della provincia di Varese",
        type: "detail",
        intro_excerpt: "Rapaci diurni: distribuzione e nidificazione.",
        image_path: "/images/pubblicazioni/quaderni/q2.jpg",
        price: "€ 8",
        pdf_url: "/docs/quaderni/quaderno-2-2015.pdf",
        body: "<p>Studio sulla distribuzione e nidificazione dei rapaci diurni nelle province di Varese e Como.</p>",
      },
      {
        slug: "quaderno-1-2012",
        title: "Quaderno 1/2012 - Uccelli acquatici svernanti",
        type: "detail",
        intro_excerpt: "Le specie acquatiche del territorio insubrico.",
        image_path: "/images/pubblicazioni/quaderni/q1.jpg",
        price: "€ 5",
        pdf_url: "/docs/quaderni/quaderno-1-2012.pdf",
        body: "<p>Una panoramica sulle specie acquatiche del territorio insubrico e sul loro stato di conservazione.</p>",
      },
    ],
  },
  {
    slug: "bol",
    title: "BOL",
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
    ],
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
    ],
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
        ],
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
        ],
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
    // solo i nodi "group" hanno figli su cui proseguire
    currentLevel = match.type === "group" ? match.children : [];
  }

  return found;
}

// Come resolveNode, ma raccoglie TUTTI i nodi attraversati (la "scia").
// Es. ['liste','racconti-ornitologici'] → [nodoListe, nodoRacconti].
// Si ferma appena un segmento non si risolve.
function resolveTrail(segments: string[]): PubNode[] {
  const trail: PubNode[] = [];
  let currentLevel: PubNode[] = MOCK_TREE;

  for (const segment of segments) {
    const match = currentLevel.find((n) => n.slug === segment);
    if (!match) break;
    trail.push(match);
    currentLevel = match.type === "group" ? match.children : [];
  }

  return trail;
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
        childCards: node.type === "group" ? node.children.map(toCard) : [],
      });
    });
  };

  // Voci breadcrumb DOPO la home. Ogni voce ha l'URL cumulativo
  // fino a quel livello; l'ultima corrisponde alla pagina corrente.
  const buildCrumbs = (segments: string[]): Crumb[] => {
    const trail = resolveTrail(segments);
    return trail.map((node, i) => ({
      title: node.title,
      to: `/pubblicazioni/${segments.slice(0, i + 1).join("/")}`,
    }));
  };

  return { getHome, getNode, buildCrumbs };
}
