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

// ─── MOCK DATA ───────────────────────────────────────────
// TODO: rimuovere quando il backend è pronto.
const MOCK_SUBSECTIONS: Record<string, Subsection> = {
  "corsi-ornitologia": {
    slug: "corsi-ornitologia",
    title: "Corsi di Birdwatching e Ornitologia",
    title_parts: ["Corsi di", "Birdwatching", "e Ornitologia"],
    aria_label:
      "Bottone che porta alla pagina dove vengono elencati tutti i corsi di birdwatching e ornitologia del G.I.O.",
    intro_text:
      "<p>Per il <strong>Gruppo Insubrico di Ornitologia (G.I.O.)</strong> l'osservazione degli uccelli &egrave; solo il primo passo. Da oltre un decennio, i nostri corsi si pongono l'obiettivo di fornire le basi tecniche per il riconoscimento delle specie, trasformando semplici appassionati in <strong>cittadini-scienziati</strong> capaci di contribuire attivamente al monitoraggio dell'avifauna.</p><p>I nostri corsi sono <strong>aperti a tutti</strong> coloro che desiderano imparare a distinguere e riconoscere le specie di uccelli nel loro habitat naturale. Che si tratti di principianti o di appassionati che vogliono approfondire le proprie conoscenze tecniche, i nostri corsi mirano a fornire le basi per l'identificazione, l'ecologia e il monitoraggio dell'avifauna attraverso lezioni teoriche ed esercitazioni sul campo.</p><br><br><p><h2 class='subtitle'>Scienza e Pratica sul Campo</h2></p><p>I nostri corsi sono strutturati per offrire un percorso completo che unisce il rigore della teoria all'emozione dell'osservazione diretta.</p><p><ul class='specific-list'><li><strong>Lezioni Teoriche: </strong>incontri serali tenuti da soci esperti del G.I.O. o di altre associazioni/istituzioni,&nbsp; supportati da registrazioni di canti e filmati per apprendere le caratteristiche di varie specie.</li><li><strong>Esercitazioni sul Campo: </strong>Uscite guidate dagli esperti ornitologi del G.I.O. nei principali hotspot del territorio, come le zone umide, i boschi e le aree urbane, per mettere in pratica quanto appreso con binocoli e cannocchiali.</li></ul></p><br><br><p><h2 class='subtitle'>Cosa si impara</h2></p><p>I nostri programmi spaziano dai corsi base per principianti ai moduli avanzati di approfondimento:</p><p><ul class='specific-list'><li><strong>Identificazione e Sistematica: </strong>Come distinguere le specie simili a confronto e imparare a 'leggere' i diversi piumaggi.</li><li><strong>Bioacustica: </strong>L'ascolto e il riconoscimento dei canti, chiave indispensabile per l'identificazione in natura.</li><li><strong>Biologia ed Ecologia: </strong>Focus specifici su rapaci diurni e notturni, limicoli, uccelli acquatici e del bosco.</li><li><strong>Metodi di Ricerca: </strong>Tecniche di censimento, inanellamento e l'uso di piattaforme digitali come <a href='https://www.ornitho.it/' target='_blank' class='specific-link'>Ornitho.it</a></li></ul class='specific-list'></p><br><br><p><h2 class='subtitle'>Collaborazioni</h2></p><p>I nostri corsi si avvalgono di preziose collaborazioni consolidate nel tempo con:</p><ul class='specific-list'><li><strong>Universit&agrave; degli Studi dell'Insubria</strong>.</li><li><strong>Comunit&agrave; Montana Valli del Verbano</strong> e <strong>Comunit&agrave; Montana del Piambello</strong>.</li><li><strong>Parchi Regionali: </strong>Parco Pineta di Appiano Gentile e Tradate, Parco del Ticino e Parco Campo dei Fiori.</li></ul>",
    intro_excerpt: "Percorsi formativi per appassionati di ogni livello.",
    image_path: "",
    items: [
      {
        id: 1,
        title: "Corso di ornitologia CMVV",
        body: "<p></p>",
        image_path: "/images/divulgazione/cards/corsi/2025-03-14.jpg",
        links: [
          {
            label: "Guarda il video",
            url: "https://www.facebook.com/share/p/18D6sDzjoM/",
          },
        ],
      },
      {
        id: 2,
        title: "Corso avanzato di birdwatching",
        body: "<p>Approfondimento sul campo con uscite guidate ed esperti del settore, dedicato a chi ha già frequentato il corso base o possiede esperienza equivalente.</p>",
        image_path: "",
        links: [
          { label: "Scopri di più", url: "https://example.com/avanzato" },
        ],
      },
      {
        id: 3,
        title: "Corso avanzato di birdwatching",
        body: "<p>Approfondimento sul campo con uscite guidate ed esperti del settore, dedicato a chi ha già frequentato il corso base o possiede esperienza equivalente.</p>",
        image_path: "",
        links: [
          { label: "Scopri di più", url: "https://example.com/avanzato" },
        ],
      },
      {
        id: 4,
        title: "Corso avanzato di birdwatching",
        body: "<p>Approfondimento sul campo con uscite guidate ed esperti del settore, dedicato a chi ha già frequentato il corso base o possiede esperienza equivalente.</p>",
        image_path: "",
        links: [
          { label: "Scopri di più", url: "https://example.com/avanzato" },
        ],
      },
      {
        id: 5,
        title: "Corso avanzato di birdwatching",
        body: "<p>Approfondimento sul campo con uscite guidate ed esperti del settore, dedicato a chi ha già frequentato il corso base o possiede esperienza equivalente.</p>",
        image_path: "",
        links: [
          { label: "Scopri di più", url: "https://example.com/avanzato" },
        ],
      },
    ],
  },
  eventi: {
    slug: "eventi",
    title: "Eventi",
    title_parts: ["Eventi"],
    aria_label:
      "Bottone che porta alla pagina dove vengono elencati tutti gli eventi tenuti dal G.I.O.",
    intro_text:
      "<p>Organizziamo e partecipiamo a eventi e convegni dedicati all'ornitologia, occasioni di incontro e confronto tra appassionati, ricercatori e studiosi del settore.</p>",
    intro_excerpt: "Incontri, giornate di studio e convegni.",
    image_path: "",
    items: [
      {
        id: 3,
        title: "Convegno annuale G.I.O. 2026",
        body: "<p>La giornata di studio annuale del Gruppo Insubrico di Ornitologia, con relatori nazionali e internazionali e sessioni dedicate alle ultime ricerche sul campo.</p>",
        image_path: "",
        links: [
          { label: "Programma", url: "https://example.com/convegno-2026" },
        ],
      },
      {
        id: 4,
        title: "Giornata mondiale degli uccelli migratori",
        body: "<p>Un'uscita divulgativa aperta a tutti per celebrare la migrazione e osservare da vicino le specie di passaggio sul nostro territorio.</p>",
        image_path: "",
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
          title_parts: s.title_parts,
          aria_label: s.aria_label,
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
