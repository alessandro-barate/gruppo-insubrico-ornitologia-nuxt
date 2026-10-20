// ─── TIPI (futura API Laravel) ──────────
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

// ─── MOCK DATA ───────────────────────────────────────────
// TODO: rimuovere quando il backend è pronto.
const DIVULGAZIONE_INTRO =
  "La <strong>divulgazione</strong> &egrave; una delle attivit&agrave; fondamentali del <strong>Gruppo Insubrico di Ornitologia</strong> e rappresenta il principale strumento per <strong>condividere conoscenze, promuovere la cultura scientifica</strong> e <strong>sensibilizzare alla tutela dell'avifauna</strong>. Attraverso <strong>corsi di ornitologia, serate divulgative, incontri e convegni</strong>, il <strong>G.I.O.</strong> favorisce il <strong>dialogo tra ricercatori, appassionati e cittadini</strong>. In questa sezione sono raccolte le <strong>iniziative</strong> organizzate nel corso degli anni, testimonianza dell'impegno della nostra associazione nella <strong>formazione</strong>, nella <strong>ricerca</strong> e nella <strong>diffusione della conoscenza ornitologica</strong>.";

// const GALLERY: GalleryImage[] = [
//   { src: "/images/divulgazione/.webp", alt: "" },
//   { src: "/images/divulgazione/.webp", alt: "" },
//   { src: "/images/divulgazione/.webp", alt: "" },
//   { src: "/images/divulgazione/.webp", alt: "" },
//   { src: "/images/divulgazione/.webp", alt: "" },
//   {
//     src: "/images/divulgazione/.webp",
//     alt: "",
//   },
// ];

const MOCK_SUBSECTIONS: Record<string, Subsection> = {
  // Corsi di ornitologia
  "corsi-ornitologia": {
    slug: "corsi-ornitologia",
    title: "Corsi di Birdwatching e Ornitologia",
    title_parts: ["Corsi di", "Birdwatching", "e Ornitologia"],
    aria_label:
      "Bottone che porta alla pagina dove vengono elencati tutti i corsi di birdwatching e ornitologia del G.I.O.",
    intro_text:
      "<p>Per il <strong>Gruppo Insubrico di Ornitologia (G.I.O.)</strong> l'osservazione degli uccelli &egrave; solo il primo passo. Da oltre un decennio, i nostri corsi si pongono l'obiettivo di fornire le basi tecniche per il riconoscimento delle specie, trasformando semplici appassionati in <strong>cittadini-scienziati</strong> capaci di contribuire attivamente al monitoraggio dell'avifauna.</p><p>I nostri corsi sono <strong>aperti a tutti</strong> coloro che desiderano imparare a distinguere e riconoscere le specie di uccelli nel loro habitat naturale. Che si tratti di principianti o di appassionati che vogliono approfondire le proprie conoscenze tecniche, i nostri corsi mirano a fornire le basi per l'identificazione, l'ecologia e il monitoraggio dell'avifauna attraverso lezioni teoriche ed esercitazioni sul campo.</p><br><br><h2 class='subtitle'>Scienza e Pratica sul Campo</h2><p>I nostri corsi sono strutturati per offrire un percorso completo che unisce il rigore della teoria all'emozione dell'osservazione diretta.</p><ul class='specific-list'><li><strong>Lezioni Teoriche: </strong>incontri serali tenuti da soci esperti del G.I.O. o di altre associazioni/istituzioni,&nbsp; supportati da registrazioni di canti e filmati per apprendere le caratteristiche di varie specie.</li><li><strong>Esercitazioni sul Campo: </strong>Uscite guidate dagli esperti ornitologi del G.I.O. nei principali hotspot del territorio, come le zone umide, i boschi e le aree urbane, per mettere in pratica quanto appreso con binocoli e cannocchiali.</li></ul><br><br><h2 class='subtitle'>Cosa si impara</h2><p>I nostri programmi spaziano dai corsi base per principianti ai moduli avanzati di approfondimento:</p><ul class='specific-list'><li><strong>Identificazione e Sistematica: </strong>Come distinguere le specie simili a confronto e imparare a 'leggere' i diversi piumaggi.</li><li><strong>Bioacustica: </strong>L'ascolto e il riconoscimento dei canti, chiave indispensabile per l'identificazione in natura.</li><li><strong>Biologia ed Ecologia: </strong>Focus specifici su rapaci diurni e notturni, limicoli, uccelli acquatici e del bosco.</li><li><strong>Metodi di Ricerca: </strong>Tecniche di censimento, inanellamento e l'uso di piattaforme digitali come <a href='https://www.ornitho.it/' target='_blank' class='specific-link'>Ornitho.it</a></li></ul class='specific-list'><br><br><h2 class='subtitle'>Collaborazioni</h2><p>I nostri corsi si avvalgono di preziose collaborazioni consolidate nel tempo con:</p><ul class='specific-list'><li><strong>Universit&agrave; degli Studi dell'Insubria</strong>.</li><li><strong>Comunit&agrave; Montana Valli del Verbano</strong> e <strong>Comunit&agrave; Montana del Piambello</strong>.</li><li><strong>Parchi Regionali: </strong>Parco Pineta di Appiano Gentile e Tradate, Parco del Ticino e Parco Campo dei Fiori.</li></ul><hr class='space-line'><p><strong>Al momento non ci sono nuovi corsi in programmazione.</strong><br>Vi invitiamo  a monitorare le nostre pagine social (<a class='specific-link' href='https://www.facebook.com/GruppoInsubricoDiOrnitologia' target='_blank'>Facebook</a> e <a class='specific-link' href='https://www.instagram.com/gruppoinsubricoornitologia/' target='_blank'>Instagram</a>) e a iscrivervi alla nostra newsletter per ricevere aggiornamenti sulle prossime date e iniziative.<br><br><p>Qui sotto potete consultare la galleria delle <strong>locandine dei nostri corsi passati</strong>, dal 2013 fino ai progetti più recenti del 2025, per avere un'idea della varietà di temi trattati: dai rapaci diurni e notturni ai canti degli uccelli, fino alle tecniche di censimento e alla citizen science.</p>",
    intro_excerpt: "Percorsi formativi per appassionati di ogni livello.",
    image_path: "/images/divulgazione/birdwatching.webp",
    items: [
      {
        id: 1,
        title: "Corso base di Birdwatching Parco Pineta",
        year: "2013",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2013/2013.webp",
      },
      {
        id: 2,
        title: "Corso base di Birdwatching CMVV",
        year: "2014",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2014/21-03-2014.webp",
      },
      {
        id: 3,
        title: "Corso avanzato di birdwatching Parco Pineta",
        year: "2014",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2014/15-09-2014.webp",
      },
      {
        id: 4,
        title: "Secondo corso di birdwatching CMVV",
        year: "2015",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2015/10-04-2015.webp",
      },
      {
        id: 5,
        title: "Corso di birdwatching Parco Ticino",
        year: "2016",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2016/18-03-2016.webp",
      },
      {
        id: 6,
        title: "Corso di birdwatching Parco Ticino",
        year: "2017",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2017/28-04-2017.webp",
      },
      {
        id: 7,
        title: "Corso base di birdwatching Museo Clivio",
        year: "2018",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2018/04-05-2018.webp",
      },
      {
        id: 8,
        title: "Secondo corso di birdwatching Museo Clivio",
        year: "2019",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2019/12-04-2019.webp",
      },
      {
        id: 9,
        title: "Corso di birdwatching Campo dei Fiori",
        year: "2019",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2019/08-11-2019.webp",
      },
      {
        id: 10,
        title: "Corso base di ornitologia Varese",
        year: "2024",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2024/12-04-2024.webp",
      },
      {
        id: 11,
        title: "Corso di ornitologia CMVV",
        year: "2025",
        body: "<p></p>",
        image_path: "/images/divulgazione/corsi/2025/14-03-2025.webp",
        links: [
          {
            label: "Guarda il corso su YouTube",
            url: "https://www.youtube.com/watch?v=lUy_kPZuwA8",
          },
        ],
      },
    ],
  },
  // Eventi
  eventi: {
    slug: "eventi",
    title: "Eventi e Convegni",
    title_parts: ["Eventi e", "Convegni"],
    aria_label:
      "Bottone che porta alla pagina dove vengono elencati tutti gli eventi e i convegni che hanno visto partecipare il G.I.O.",
    intro_text:
      "<h4>La Storia della Nostra Ricerca</h4><br><p>Gli appuntamenti e i momenti di confronto hanno da sempre segnato il percorso del <strong>Gruppo Insubrico di Ornitologia</strong>. Per la nostra associazione, la tutela dell'avifauna non si limita all'osservazione sul campo, ma si nutre costantemente di dibattito scientifico, riflessioni sulla conservazione e condivisione dei dati con esperti e appassionati.<br>In questa pagina è possibile ripercorrere le tappe fondamentali della nostra attività attraverso le <strong>locandine e le immagini degli eventi passati</strong>. Troverete testimonianze di momenti di grande rilievo scientifico, come la <strong>XXI edizione del Convegno Italiano di Ornitologia (CIO)</strong> tenutasi a Varese nel 2023, e la <strong>Giornata di Studio sull'Avifauna in Lombardia</strong>, organizzata per celebrare lo storico traguardo dei <strong>40 anni di censimenti IWC</strong>.<br>L'archivio include inoltre appuntamenti storici come gli <strong>Incontri Insubrici di Ornitologia</strong>, gli <strong>Incontri Lombardi</strong> e giornate tematiche come il <strong>CISO DAY</strong> dedicato al futuro delle zone umide. Ogni locandina rappresenta un tassello della cultura ornitologica che il G.I.O. promuove da decenni nel territorio insubrico e oltre, spesso in prestigiosa collaborazione con università ed enti di ricerca.<br>Vi invitiamo a sfogliare questa galleria per scoprire l'evoluzione di una realtà che, da oltre quarant'anni, lavora per trasformare la passione per gli uccelli in una solida base di conoscenza scientifica.</p>",
    intro_excerpt: "Incontri, giornate di studio e convegni.",
    image_path: "/images/divulgazione/eventi.webp",
    items: [
      {
        id: 1,
        title: "Giornata di Studio sull'Avifauna in Lombardia",
        year: "2025",
        body: "<p>La giornata di studio annuale del Gruppo Insubrico di Ornitologia, con relatori nazionali e internazionali e sessioni dedicate alle ultime ricerche sul campo.</p>",
        image_path: "",
        links: [
          { label: "Programma", url: "https://example.com/convegno-2026" },
        ],
      },
      {
        id: 2,
        title: "Giornata mondiale degli uccelli migratori",
        body: "<p>Un'uscita divulgativa aperta a tutti per celebrare la migrazione e osservare da vicino le specie di passaggio sul nostro territorio.</p>",
        image_path: "",
        links: [],
      },
      {
        id: 3,
        title: "Giornata mondiale degli uccelli migratori",
        body: "<p>Un'uscita divulgativa aperta a tutti per celebrare la migrazione e osservare da vicino le specie di passaggio sul nostro territorio.</p>",
        image_path: "",
        links: [],
      },
      {
        id: 4,
        title: "Giornata mondiale degli uccelli migratori",
        body: "<p>Un'uscita divulgativa aperta a tutti per celebrare la migrazione e osservare da vicino le specie di passaggio sul nostro territorio.</p>",
        image_path: "",
        links: [],
      },
      {
        id: 5,
        title: "Giornata mondiale degli uccelli migratori",
        body: "<p>Un'uscita divulgativa aperta a tutti per celebrare la migrazione e osservare da vicino le specie di passaggio sul nostro territorio.</p>",
        image_path: "",
        links: [],
      },
      {
        id: 6,
        title: "Giornata mondiale degli uccelli migratori",
        body: "<p>Un'uscita divulgativa aperta a tutti per celebrare la migrazione e osservare da vicino le specie di passaggio sul nostro territorio.</p>",
        image_path: "",
        links: [],
      },
      {
        id: 7,
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

  // Testo introduttivo e galleria della pagina Divulgazione
  const getPage = () => {
    // FUTURO: return useAsyncData('divulgazione-page', () => $fetch('/api/divulgazione'))
    return useAsyncData<DivulgazionePage>(
      "divulgazione-page",
      () => Promise.resolve({ intro_text: DIVULGAZIONE_INTRO }), // gallery: GALLERY
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

  return { getPage, getSubsections, getSubsection };
}
