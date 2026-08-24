// ─── TIPI (contratto con la futura API Laravel) ──────────
// Modello PIATTO: SECTIONS + PROJECTS separati, ogni progetto con
// section_slug (consente lo spostamento admin tra sezioni).
// NOVITÀ: alcune sezioni sono "navigabili" (3 livelli): le loro card
// progetto sono bottoni verso una pagina dedicata /progetti/<sez>/<prog>.
// Altre restano a 2 livelli (i progetti si mostrano inline nella lista).

export type LinkKind = "pdf" | "external" | "excel" | "powerpoint";

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
  text: string;
  links?: TypedLink[];
}

export interface Project {
  id: number;
  section_slug: string;
  slug: string; // usato per l'URL quando la sezione è navigabile
  title: string;
  image_path?: string;
  intro?: string;
  blocks: ContentBlock[];
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

// ─── MOCK DATA ───────────────────────────────────────────
const PROGETTI_INTRO =
  "<p>Il Gruppo Insubrico di Ornitologia porta avanti progetti di ricerca e monitoraggio dell'avifauna sul territorio della provincia di Varese.</p>";

const SECTIONS: ProjectSection[] = [
  {
    slug: "ricerca-in-corso",
    title: "Progetti di ricerca in corso",
    intro_text:
      "<p>Le ricerche attualmente attive, con monitoraggi e censimenti in corso sul territorio provinciale.</p>",
    intro_excerpt: "Le ricerche e i monitoraggi attualmente attivi.",
    image_path: "/images/progetti/cards/in-corso.jpg",
    has_projects: true,
    projects_are_navigable: true, // ← 3 livelli
  },
  {
    slug: "ricerca-terminati",
    title: "Progetti di ricerca terminati",
    intro_text:
      "<p>Gli studi e i progetti di ricerca ormai conclusi, con i relativi materiali e risultati.</p>",
    intro_excerpt: "Gli studi e i progetti ormai conclusi.",
    image_path: "/images/progetti/cards/terminati.jpg",
    has_projects: true,
    projects_are_navigable: false, // ← 2 livelli, inline
  },
  {
    slug: "atlanti",
    title: "Atlanti Ornitologici",
    intro_text:
      "<p>Gli atlanti ornitologici realizzati dal G.I.O. Maggiori informazioni saranno disponibili a breve.</p>",
    intro_excerpt: "Gli atlanti di distribuzione delle specie.",
    image_path: "/images/progetti/cards/atlanti.jpg",
    has_projects: false,
  },
  {
    slug: "altri-lavori",
    title: "Altri Lavori",
    intro_text:
      "<p>Contributi, liste e materiali vari prodotti dai soci al di fuori dei progetti di ricerca principali.</p>",
    intro_excerpt: "Contributi, liste e materiali vari.",
    image_path: "/images/progetti/cards/altri-lavori.jpg",
    has_projects: true,
    projects_are_navigable: false, // ← 2 livelli, inline
  },
];

const PROJECTS: Project[] = [
  // ── Ricerca in corso (navigabili) ─────────────────────
  {
    id: 1,
    section_slug: "ricerca-in-corso",
    slug: "iwc",
    title: "IWC — International Waterbird Census in provincia di Varese",
    image_path: "/images/progetti/in-corso/iwc.jpg",
    intro:
      "<div><p>Il censimento internazionale degli uccelli acquatici è un progetto organizzato a livello continentale da Wetland International, in Italia è coordinato dall'ISPRA  (Istituto Superiore per la Protezione e la Ricerca Ambientale) mentre in Lombardia è curato dal Dipartimento di Biologia Animale dell'Università di Pavia.<br><br>Il G.I.O. ha compiuto il primo censimento degli uccelli acquatici svernanti in provincia di Varese nel 1986.<br>Questo censimento viene svolto nel mese di gennaio, quando le popolazioni dell'avifauna sono generalmente statiche sul territorio, con lo scopo di anticipare la migrazione pre-riproduttiva degli acquatici che stazionano in grandi stormi a latitudini più basse, al fine di:</p><ul class='specific-list'><li>stabilire annualmente la dimensione delle popolazioni presenti in gennaio</li><li>identificare le variazioni nella dimensione e nella distribuzione delle popolazioni</li><li>determinare l'importanza a livello internazionale e nazionale dei vari siti</li><li>contribuire agli sforzi internazionali per la conservazione degli uccelli acquatici e dei loro habitat</li></ul><p>Il principio cardine è la contemporaneità del censimento nelle varie aree geografiche, necessario per evitare conteggi multipli degli stessi individui.<br>In provincia di Varese Walter Guenzani (Socio G.I.O.) e Nicola Larroux (Consigliere G.I.O.) si occupano del coordinamento dei rilevatori e della trasmissione dei dati all'Università di Pavia che, a partire dal 2002, pubblica un resoconto annuale.<br><br>Le zone umide censite in provincia di Varese sono:<ul class='specific-list'><li>Lago Maggiore</li><li>Lago di Lugano</li><li>Lago di VBarese</li><li>Palude Brabbia con il coordinamento di LIPU</li><li>Lago di Monate</li><li>Lago di Comabbio</li><li>Il fiume Ticino tra Porto della Torre e Sesto Calende</li><li>Le vasche di laminazione di Lonate Pozzolo</li><li>Lago di Ganna</li><li>Lago di Ghirla</li></ul>Il Q1, il primo dei Quaderni del GIO è dedicato all'avifauna acquatica della provincia di Varese ed è basato sui censimenti internazionali IWC effettuati tra il 1986 e il 2010.<br><br>Nel 2025 il G.I.O. ha celebrato 40 anni di conteggio degli uccelli acquatici svernanti nelle zone umide della provincia di Varese, raccogliendo dati per un lungo periodo che testimoniano i grandi cambiamenti avvenuti.<br><br>La tabella seguente mostra le specie e il numero di individui censiti negli IWC della provincia di Varese dal 2011 al 2025.</p></div>",
    blocks: [
      {
        text: "<p>Report e dati raccolti nelle ultime stagioni di censimento.</p>",
        links: [
          {
            kind: "pdf",
            label: "Report IWC 2024",
            url: "/docs/progetti/iwc-2024.pdf",
          },
          {
            kind: "pdf",
            label: "Report IWC 2025",
            url: "/docs/progetti/iwc-2025.pdf",
          },
          {
            kind: "excel",
            label: "Dati grezzi (xlsx)",
            url: "/docs/progetti/iwc-dati.xlsx",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    section_slug: "ricerca-in-corso",
    slug: "home-swift-home",
    title: "Home Swift Home",
    image_path: "/images/progetti/in-corso/swift.jpg",
    intro:
      "<p>Progetto di tutela del rondone comune negli edifici storici, con interventi di conservazione dei siti di nidificazione.</p>",
    blocks: [
      {
        text: "<p>Documentazione generale del progetto e sito ufficiale.</p>",
        links: [
          {
            kind: "pdf",
            label: "Brochure del progetto",
            url: "/docs/progetti/swift-brochure.pdf",
          },
          {
            kind: "external",
            label: "Sito del progetto",
            url: "https://example.com/home-swift-home",
          },
        ],
      },
      {
        text: "<p>Prima fase: mappatura dei siti di nidificazione.</p>",
        links: [
          {
            kind: "pdf",
            label: "Report fase 1",
            url: "/docs/progetti/swift-fase1.pdf",
          },
        ],
      },
      {
        text: "<p>Seconda fase: installazione dei nidi artificiali e monitoraggio.</p>",
        links: [
          {
            kind: "pdf",
            label: "Report fase 2",
            url: "/docs/progetti/swift-fase2.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    section_slug: "ricerca-in-corso",
    slug: "campi-di-brebbia",
    title: "Campi di Brebbia",
    intro:
      "<p>Monitoraggio dell'avifauna nelle aree agricole di Brebbia, con attenzione alle specie legate agli ambienti coltivati.</p>",
    blocks: [
      {
        text: "<p>Approfondimenti e aggiornamenti sul progetto.</p>",
        links: [
          {
            kind: "external",
            label: "Scheda del progetto",
            url: "https://example.com/brebbia",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    section_slug: "ricerca-in-corso",
    slug: "succiacapre",
    title: "Monitoraggio del succiacapre",
    intro:
      "<p>Studio sulla presenza e distribuzione del succiacapre nel territorio provinciale, tramite rilievi al canto e bioacustica.</p>",
    blocks: [
      {
        text: "<p>Presentazione dei metodi e dei primi risultati.</p>",
        links: [
          {
            kind: "powerpoint",
            label: "Presentazione (pptx)",
            url: "/docs/progetti/succiacapre.pptx",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    section_slug: "ricerca-in-corso",
    slug: "song-meter-brabbia",
    title: "Song Meter in Brabbia",
    intro:
      "<p>Monitoraggio acustico passivo tramite registratori automatici (Song Meter) nella palude Brabbia.</p>",
    blocks: [
      {
        text: "<p>Presentazione del progetto di monitoraggio acustico.</p>",
        links: [
          {
            kind: "powerpoint",
            label: "Presentazione (pptx)",
            url: "/docs/progetti/song-meter.pptx",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    section_slug: "ricerca-in-corso",
    slug: "garzaie",
    title: "Monitoraggio delle garzaie della provincia di Varese",
    intro:
      "<p>Censimento delle garzaie e delle colonie di aironi presenti sul territorio provinciale.</p>",
    blocks: [
      {
        text: "<p>Materiali e riferimenti del monitoraggio.</p>",
        links: [
          {
            kind: "pdf",
            label: "Report garzaie",
            url: "/docs/progetti/garzaie.pdf",
          },
          {
            kind: "external",
            label: "Approfondimento",
            url: "https://example.com/garzaie",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    section_slug: "ricerca-in-corso",
    slug: "atlante-nidificanti-2024",
    title: "Atlante Uccelli Nidificanti in Provincia di Varese 2024-2026",
    intro:
      "<p>Il nuovo atlante dei nidificanti, progetto pluriennale di mappatura sistematica delle specie che si riproducono in provincia.</p>",
    blocks: [
      {
        text: "<p>Documentazione e materiali del progetto atlante.</p>",
        links: [
          {
            kind: "pdf",
            label: "Presentazione atlante",
            url: "/docs/progetti/atlante-2024.pdf",
          },
          {
            kind: "pdf",
            label: "Scheda di rilevamento",
            url: "/docs/progetti/atlante-scheda.pdf",
          },
          {
            kind: "pdf",
            label: "Istruzioni per i rilevatori",
            url: "/docs/progetti/atlante-istruzioni.pdf",
          },
        ],
      },
    ],
  },

  // ── Ricerca terminati (inline) ────────────────────────
  {
    id: 20,
    section_slug: "ricerca-terminati",
    slug: "storico-1",
    title: "Progetto storico 1",
    blocks: [
      {
        text: "<p>Descrizione del progetto concluso.</p>",
        links: [
          {
            kind: "pdf",
            label: "Documento finale",
            url: "/docs/progetti/storico-1.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 21,
    section_slug: "ricerca-terminati",
    slug: "storico-2",
    title: "Progetto storico 2",
    blocks: [
      {
        text: "<p>Descrizione del progetto concluso.</p>",
        links: [
          {
            kind: "external",
            label: "Sito di riferimento",
            url: "https://example.com/storico-2",
          },
        ],
      },
    ],
  },

  // ── Altri lavori (inline) ─────────────────────────────
  {
    id: 40,
    section_slug: "altri-lavori",
    slug: "lista-uccelli",
    title: "Lista uccelli",
    intro:
      "<p>La lista sistematica delle specie osservate in provincia, in formato foglio di calcolo aggiornabile.</p>",
    blocks: [
      {
        text: "<p>Scarica la lista completa in formato Excel.</p>",
        links: [
          {
            kind: "excel",
            label: "Lista uccelli (xlsx)",
            url: "/docs/progetti/lista-uccelli.xlsx",
          },
        ],
      },
    ],
  },
  {
    id: 41,
    section_slug: "altri-lavori",
    slug: "contributo-1",
    title: "Contributo su rivista specializzata",
    blocks: [
      {
        text: "",
        links: [
          {
            kind: "external",
            label: "Leggi l'articolo",
            url: "https://example.com/contributo-1",
          },
        ],
      },
    ],
  },
];
// ─────────────────────────────────────────────────────────

function sectionToCard(s: ProjectSection): NavCardData {
  return {
    slug: s.slug,
    title: s.title,
    intro_excerpt: s.intro_excerpt,
    image_path: s.image_path,
  };
}

function projectToCard(p: Project): NavCardData {
  return {
    slug: p.slug,
    title: p.title,
    intro_excerpt: p.intro
      ? p.intro.replace(/<[^>]+>/g, "").slice(0, 120)
      : undefined,
    image_path: p.image_path,
  };
}

export function useProgetti() {
  // Home: intro + le card delle 4 sezioni
  const getHome = () => {
    return useAsyncData("progetti-home", () =>
      Promise.resolve({
        intro_text: PROGETTI_INTRO,
        cards: SECTIONS.map(sectionToCard),
      }),
    );
  };

  // Risolve un path (array di segmenti) in ciò che va mostrato.
  // 1 segmento → una sezione. 2 segmenti → un progetto (se navigabile).
  const getNode = (segments: string[]) => {
    const key = `progetti-${segments.join("-") || "root"}`;

    return useAsyncData<ProgettiNode | null>(key, () => {
      const [sectionSlug, projectSlug] = segments;

      const section = SECTIONS.find((s) => s.slug === sectionSlug) ?? null;
      if (!section) return Promise.resolve(null);

      if (projectSlug) {
        if (!section.projects_are_navigable) return Promise.resolve(null);
        const project =
          PROJECTS.find(
            (p) => p.section_slug === sectionSlug && p.slug === projectSlug,
          ) ?? null;
        if (!project) return Promise.resolve(null);
        return Promise.resolve({ kind: "project", section, project });
      }

      const projects = section.has_projects
        ? PROJECTS.filter((p) => p.section_slug === sectionSlug)
        : [];

      return Promise.resolve({
        kind: "section",
        section,
        projects,
        projectCards: section.projects_are_navigable
          ? projects.map(projectToCard)
          : [],
      });
    });
  };

  return { getHome, getNode };
}
