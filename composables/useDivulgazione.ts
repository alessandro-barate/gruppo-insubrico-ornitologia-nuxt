// ─── TIPI (futura API Laravel) ──────────
// Definiti una volta sola e riusati in pagine e componenti.
// Le API Resources dovranno restituire esattamente questa forma.
export interface ItemLink {
  label: string;
  url: string;
}

export interface SubsectionItem {
  id: number;
  title: string;
  body: string;
  image_path?: string;
  links: ItemLink[];
}

export interface Subsection {
  slug: string;
  title: string;
  intro_text: string;
  intro_excerpt?: string;
  image_path?: string;
  items: SubsectionItem[];
}

// Forma ridotta usata per le card in index.vue
export type SubsectionCardData = Pick<
  Subsection,
  "slug" | "title" | "intro_excerpt" | "image_path"
>;

// ─── MOCK DATA ───────────────────────────────────────────
// TODO: rimuovere quando il backend è pronto.
const MOCK_SUBSECTIONS: Record<string, Subsection> = {
  "corsi-ornitologia": {
    slug: "corsi-ornitologia",
    title: "Corsi di Ornitologia",
    intro_text:
      "<p>I nostri corsi di ornitologia sono pensati per appassionati di ogni livello, dai principianti che si avvicinano per la prima volta al birdwatching fino agli esperti che desiderano approfondire tecniche di riconoscimento e monitoraggio delle specie del territorio insubrico.</p>",
    intro_excerpt: "Percorsi formativi per appassionati di ogni livello.",
    image_path: "/images/mock/corsi-cover.jpg",
    items: [
      {
        id: 1,
        title: "Corso base di riconoscimento",
        body: "<p>Un percorso introduttivo di 6 lezioni per imparare a riconoscere le specie più comuni del territorio insubrico, con materiale teorico e uscite pratiche sul campo.</p>",
        image_path: "/images/mock/corso-base.jpg",
        links: [
          { label: "Programma completo", url: "https://example.com/programma" },
          { label: "Iscriviti", url: "https://example.com/iscrizione" },
        ],
      },
      {
        id: 2,
        title: "Corso avanzato di birdwatching",
        body: "<p>Approfondimento sul campo con uscite guidate ed esperti del settore, dedicato a chi ha già frequentato il corso base o possiede esperienza equivalente.</p>",
        image_path: "/images/mock/corso-avanzato.jpg",
        links: [
          { label: "Scopri di più", url: "https://example.com/avanzato" },
        ],
      },
    ],
  },
  "eventi-convegni": {
    slug: "eventi-convegni",
    title: "Eventi e Convegni",
    intro_text:
      "<p>Organizziamo e partecipiamo a eventi e convegni dedicati all'ornitologia, occasioni di incontro e confronto tra appassionati, ricercatori e studiosi del settore.</p>",
    intro_excerpt: "Incontri, giornate di studio e convegni.",
    image_path: "/images/mock/eventi-cover.jpg",
    items: [
      {
        id: 3,
        title: "Convegno annuale GIO 2026",
        body: "<p>La giornata di studio annuale del Gruppo Insubrico di Ornitologia, con relatori nazionali e internazionali e sessioni dedicate alle ultime ricerche sul campo.</p>",
        image_path: "/images/mock/convegno-2026.jpg",
        links: [
          { label: "Programma", url: "https://example.com/convegno-2026" },
        ],
      },
      {
        id: 4,
        title: "Giornata mondiale degli uccelli migratori",
        body: "<p>Un'uscita divulgativa aperta a tutti per celebrare la migrazione e osservare da vicino le specie di passaggio sul nostro territorio.</p>",
        image_path: "/images/mock/migratori.jpg",
        links: [],
      },
    ],
  },
};
// ─────────────────────────────────────────────────────────

export function useDivulgazione() {
  // Lista sottosezioni → per le card in index.vue
  const getSubsections = () => {
    // FUTURO: return useAsyncData('divulgazione-subsections',
    //   () => $fetch('/api/subsections/divulgazione'))
    return useAsyncData<SubsectionCardData[]>("divulgazione-subsections", () =>
      Promise.resolve(
        Object.values(MOCK_SUBSECTIONS).map((s) => ({
          slug: s.slug,
          title: s.title,
          intro_excerpt: s.intro_excerpt,
          image_path: s.image_path,
        })),
      ),
    );
  };

  // Singola sottosezione con items → per [subsection].vue
  const getSubsection = (slug: string) => {
    // FUTURO: return useAsyncData(`subsection-${slug}`,
    //   () => $fetch(`/api/subsections/divulgazione/${slug}`))
    return useAsyncData<Subsection | null>(`subsection-${slug}`, () =>
      Promise.resolve(MOCK_SUBSECTIONS[slug] ?? null),
    );
  };

  return { getSubsections, getSubsection };
}
