// ─── TIPI (contratto con la futura API Laravel) ──────────
// Il modello è un ALBERO: ogni nodo è una sottosezione che O ha
// item propri (foglia) O ha figli (contenitore "group").
// Usiamo una DISCRIMINATED UNION sul campo `type`: così quando
// controlli `node.type === 'cards'`, TypeScript sa già che
// `node.items` è CardItem[]. Nessun cast necessario.

import type { TypedLink } from "~/composables/useProgetti";

// Tipi di item, uno per natura di sottosezione ───────────
export interface CardItem {
  id: number;
  title: string;
  body: string;
  image_path?: string;
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
}

// Cartella dei risultati di una ricerca (Altre Pubblicazioni): titolo,
// anno facoltativo e i suoi file. È indipendente dai progetti di
// useProgetti.ts: gli admin la gestiscono a parte (vedi ResultFolders.vue).
export interface ResultFolder {
  id: number;
  year?: number; // per l'ordinamento: più recente → più vecchio
  title: string;
  files: TypedLink[]; // PDF, link esterni, Excel… (stesso tipo dei progetti)
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
  image_path?: string;
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
  // Facoltativo: cartelle dei risultati delle ricerche, mostrate come
  // accordion sopra la bibliografia (Altre Pubblicazioni)
  result_folders?: ResultFolder[];
  results_title?: string; // titolo del blocco (default "Risultati delle ricerche")
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

// File di Home Swift Home (gli stessi PDF del progetto in useProgetti.ts)
const HOME_SWIFT_HOME_FILES: TypedLink[] = [
  {
    kind: "pdf",
    label:
      "2026. Demographic changes in three Common Swift colonies in the Lombardy region, Italy",
    url: "/documents/progetti/swift/2026-demographic-change.pdf",
  },
  {
    kind: "pdf",
    label: "2026. A new book about Swifts that breed in Italy",
    url: "/documents/progetti/swift/2026-new-book.pdf",
  },
  {
    kind: "pdf",
    label:
      "2025. Phenology and nest site fidelity in three Swift towers in the Lombardy region",
    url: "/documents/progetti/swift/2025-phenology.pdf",
  },
  {
    kind: "pdf",
    label:
      "2025. Passeraie, colombaie e rondonaie nelle province di Novara e Varese: mappa e monitoraggi per conservare storia e biodiversità",
    url: "/documents/progetti/swift/2025-passeraie-colombaie-rondonaie.pdf",
  },
  {
    kind: "pdf",
    label:
      "2024. First deployment of IoT tracking devices on Common swift Apus apus: a pilot study",
    url: "/documents/progetti/swift/2024-apus.pdf",
  },
  {
    kind: "pdf",
    label:
      "2024. Swift towers as open research lab: the experience of a network of nesting sites in NW Italy",
    url: "/documents/progetti/swift/2024-swift-towers.pdf",
  },
  {
    kind: "pdf",
    label:
      "2024. Microfibers in the Diet of a Highly Aerial Bird, the Common Swift Apus apus",
    url: "/documents/progetti/swift/2024-microfibers.pdf",
  },
  {
    kind: "pdf",
    label:
      "2024. Swift and sparrow towers in the provinces of Novara and Varese: census and evaluation for swift's conservation",
    url: "/documents/progetti/swift/2024-towers.pdf",
  },
  {
    kind: "pdf",
    label:
      "2023. Swifts and the selection of urban habitats: a citizen science project to increase the ecological knowledge of the species in the Bergamo and Varese provinces",
    url: "/documents/progetti/swift/2023-urban-habits.pdf",
  },
  {
    kind: "pdf",
    label:
      "2023. Swift and Sparrow towers in the Province of Varese: census, evaluation and use in the conservation and study of synanthropic species",
    url: "/documents/progetti/swift/2023-towers-varese.pdf",
  },
  {
    kind: "pdf",
    label: "2023. Site and nest fidelity in the Common Swift (Apus apus)",
    url: "/documents/progetti/swift/2023-site-nest.pdf",
  },
  {
    kind: "pdf",
    label:
      "2022. Which urban habitats are selected by Swifts? A citizen science program to answer the question in provinces of Varese and Bergamo, Italy",
    url: "/documents/progetti/swift/2022-urban-habits.pdf",
  },
  {
    kind: "pdf",
    label:
      "2022. Birds towers and walls: three successful examples of rehabilitation in province of Varese, Italy",
    url: "/documents/progetti/swift/2022-birds-towers.pdf",
  },
  {
    kind: "pdf",
    label:
      "2022. Breeding phenology, reproductive success and survival of Common Swift (Apus apus) from a Northern Italian colony",
    url: "/documents/progetti/swift/2022-breeding-phenology.pdf",
  },
  {
    kind: "pdf",
    label:
      "2022. Passeraie e rondonaie in provincia di Varese: censimento, rivalutazione ed utilizzo per conservazione e studio delle specie sinantropiche",
    url: "/documents/progetti/swift/2022-passeraie-rondonaie.pdf",
  },
  {
    kind: "pdf",
    label:
      "2022. Onset of primary moult in immature and breeding adult Common Swifts Apus apus",
    url: "/documents/progetti/swift/2022-onset-moult.pdf",
  },
  {
    kind: "pdf",
    label:
      "2019. Studio preliminare della fenologia e del successo riproduttivo in una colonia di rondone comune (Apus apus) a Jerago con Orago (VA)",
    url: "/documents/progetti/swift/2019-fenologia.pdf",
  },
];

// Cartelle dei risultati delle ricerche (Altre Pubblicazioni)
const RESULT_FOLDERS: ResultFolder[] = [
  // IWC
  {
    id: 1,
    title: "IWC",
    files: [
      {
        kind: "pdf",
        label:
          "2025. Trends of waterbirds wintering on the lakes of Lombardy: twenty years of International Waterbirds Census",
        url: "/documents/progetti/iwc/20-anni-di-iwc.pdf",
      },
      {
        kind: "pdf",
        label:
          "2017. Due laghi, Verbano e Lario, a confronto. 15 anni di International Waterbird Census",
        url: "/documents/progetti/iwc/15-anni-di-iwc.pdf",
      },
    ],
  },
  // Home Swift Home
  {
    id: 2,
    title: "Home Swift Home",
    files: HOME_SWIFT_HOME_FILES,
  },
  // Campi di Brebbia
  {
    id: 3,
    title: "Campi di Brebbia",
    files: [
      {
        kind: "pdf",
        label:
          "2025. Campi di Brebbia (Varese, Italy): a crucial stopover and wintering site for birds",
        url: "/documents/progetti/campi-di-brebbia/2025-campi-brebbia.pdf",
      },
    ],
  },
  // 2026 foce Tresa
  {
    id: 4,
    year: 2026,
    title: "La foce Tresa: un punto caldo della migrazione del lago Maggiore",
    files: [
      {
        kind: "pdf",
        label:
          "2026. La foce Tresa: un punto caldo della migrazione del lago Maggiore",
        url: "/documents/progetti/2026-foce-tresa.pdf",
      },
    ],
  },
  // 2024 avifauna lago di Varese
  {
    id: 5,
    year: 2024,
    title:
      "L'avifauna acquatica della Zona di Protezione Speciale “Lago di Varese” (Lombardia)",
    files: [
      {
        kind: "pdf",
        label:
          "2024. L'avifauna acquatica della Zona di Protezione Speciale “Lago di Varese” (Lombardia)",
        url: "/documents/progetti/2024-lago-di-varese.pdf",
      },
    ],
  },
  // 2024 Mosaici agricoli
  {
    id: 6,
    year: 2024,
    title: "Mosaici agricoli",
    files: [
      {
        kind: "pdf",
        label:
          "2024. Il monitoraggio dell'avifauna degli agro-ecosistemi nella Lombardia nord-occidentale",
        url: "/documents/progetti/2024-monitoraggio-avifauna.pdf",
      },
      {
        kind: "pdf",
        label:
          "2023. What is the future for farmland birds in North-Western Lombardy?",
        url: "/documents/progetti/2023-future-farmland.pdf",
      },
    ],
  },
  // 2023 Nidificazione Nibbio reale
  {
    id: 7,
    year: 2023,
    title:
      "Primo tentativo di nidificazione di Nibbio reale (Milvus milvus) in provincia di Varese",
    files: [
      {
        kind: "pdf",
        label:
          "2023. Primo tentativo di nidificazione di Nibbio reale (Milvus milvus) in provincia di Varese",
        url: "/documents/progetti/2023-nibbio-reale.pdf",
      },
    ],
  },
  // 2023 from wintering to breeding
  {
    id: 8,
    year: 2023,
    title:
      "From wintering to breeding: the bird diversity of the SPA IT2010501 “Lago di Varese”",
    files: [
      {
        kind: "pdf",
        label:
          "2023. From wintering to breeding: the bird diversity of the SPA IT2010501 “Lago di Varese”",
        url: "/documents/progetti/2023-wintering-breeding.pdf",
      },
    ],
  },
  // 2023 UI-VA
  {
    id: 9,
    year: 2023,
    title: "UI-VA: Birds in winter Varese 2018-2023",
    files: [
      {
        kind: "pdf",
        label: "2023. UI-VA: Birds in winter Varese 2018-2023",
        url: "/documents/progetti/2023-uiva.pdf",
      },
    ],
  },
  // 2022 year round
  {
    id: 10,
    year: 2022,
    title:
      "Year-round multi-scale habitat selection by Crested Tit (Lophophanes cristatus) in lowland mixed forests (northern Italy)",
    files: [
      {
        kind: "pdf",
        label:
          "2022. Year-round multi-scale habitat selection by Crested Tit (Lophophanes cristatus) in lowland mixed forests (northern Italy)",
        url: "/documents/progetti/2022-year-round.pdf",
      },
    ],
  },
  // 2022 migrazione primaverile
  {
    id: 11,
    year: 2022,
    title:
      "La migrazione primaverile del Nibbio bruno (Milvus migrans) in Lombardia in riferimento alla data di primo arrivo",
    files: [
      {
        kind: "pdf",
        label:
          "2022. La migrazione primaverile del Nibbio bruno (Milvus migrans) in Lombardia in riferimento alla data di primo arrivo",
        url: "/documents/progetti/2022-migrazione-primaverile.pdf",
      },
    ],
  },
  // 2022 steady turnover
  {
    id: 12,
    year: 2022,
    title:
      "Steady turnover in a bird community in a periurban landscape in northern Italy: a look at the change in species richness over time",
    files: [
      {
        kind: "pdf",
        label:
          "2022. Steady turnover in a bird community in a periurban landscape in northern Italy: a look at the change in species richness over time",
        url: "/documents/progetti/2022-steady-turnover.pdf",
      },
    ],
  },
  // 2022 prima nidificazione Volpoca
  {
    id: 13,
    year: 2022,
    title:
      "Prima nidificazione di Volpoca (Tadorna tadorna) in Lombardia: un caso accertato in provincia di Varese",
    files: [
      {
        kind: "pdf",
        label:
          "2022. Prima nidificazione di Volpoca (Tadorna tadorna) in Lombardia: un caso accertato in provincia di Varese",
        url: "/documents/progetti/2022-nidificazione-volpoca.pdf",
      },
    ],
  },
  // 2022 check-list uccelli Lombardia
  {
    id: 14,
    year: 2022,
    title:
      "Check-list degli uccelli della Lombardia aggiornata al dicembre 2021",
    files: [
      {
        kind: "pdf",
        label:
          "2022. Check-list degli uccelli della Lombardia aggiornata al dicembre 2021",
        url: "/documents/progetti/2022-check-list-uccelli.pdf",
      },
    ],
  },
  // 2022 analisi avifauna Varese
  {
    id: 15,
    year: 2022,
    title:
      "Analisi dell'avifauna nidificante in provincia di Varese al 31/12/2021",
    files: [
      {
        kind: "pdf",
        label:
          "2022. Analisi dell'avifauna nidificante in provincia di Varese al 31/12/2021",
        url: "/documents/progetti/2022-analisi-varese.pdf",
      },
    ],
  },
  // 2021 avifauna urbana
  {
    id: 16,
    year: 2021,
    title:
      "Avifauna urbana: un'esperienza positiva in un contesto negativo. Visti da casa nel 2020",
    files: [
      {
        kind: "pdf",
        label:
          "2021. Avifauna urbana: un'esperienza positiva in un contesto negativo. Visti da casa nel 2020",
        url: "/documents/progetti/2021-avifauna-urbana.pdf",
      },
    ],
  },
  // 2021 Gufo Reale
  {
    id: 17,
    year: 2021,
    title:
      "Il Gufo reale Bubo bubo in provincia di Varese: dati storici e ricerche recenti",
    files: [
      {
        kind: "pdf",
        label:
          "2021. Il Gufo reale Bubo bubo in provincia di Varese: dati storici e ricerche recenti",
        url: "/documents/progetti/2021-gufo-reale.pdf",
      },
    ],
  },
  // 2020 nidificazione Colombella
  {
    id: 18,
    year: 2020,
    title:
      "Nidificazione della Colombella (Columba oenas) in provincia di Varese",
    files: [
      {
        kind: "pdf",
        label:
          "2020. Nidificazione della Colombella (Columba oenas) in provincia di Varese",
        url: "/documents/progetti/2020-nidificazione-colombella.pdf",
      },
    ],
  },
  // 2020 Nibbio bruno
  {
    id: 19,
    year: 2020,
    title:
      "Roost di Nibbio bruno (Milvus migrans) in provincia di Varese: osservazioni preliminari (2019-2020), considerazioni e possibili sviluppi di indagine",
    files: [
      {
        kind: "pdf",
        label:
          "2020. Roost di Nibbio bruno (Milvus migrans) in provincia di Varese: osservazioni preliminari (2019-2020), considerazioni e possibili sviluppi di indagine",
        url: "/documents/progetti/2020-nibbio-bruno.pdf",
      },
    ],
  },
  // 2020 Succiacapre
  {
    id: 20,
    year: 2020,
    title: "Il Succiacapre nella regione insubrica",
    files: [
      {
        kind: "pdf",
        label: "2020. Il Succiacapre nella regione insubrica",
        url: "/documents/progetti/2020-succiacapre-insubria.pdf",
      },
    ],
  },
  // 2020 recensione Birds of Italy
  {
    id: 21,
    year: 2020,
    title: "Recensione The Birds of Italy",
    files: [
      {
        kind: "pdf",
        label: "2020. Recensione The Birds of Italy",
        url: "/documents/progetti/2020-recensione-birds-of-italy.pdf",
      },
    ],
  },
  // 2020 i Limicoli
  {
    id: 22,
    year: 2020,
    title: "I limicoli (ordine Charadriiformes) della provincia di Varese",
    files: [
      {
        kind: "pdf",
        label:
          "2020. I limicoli (ordine Charadriiformes) della provincia di Varese",
        url: "/documents/progetti/2020-limicoli.pdf",
      },
    ],
  },
  // 2019 Limicoli fiume Tresa
  {
    id: 23,
    year: 2019,
    title: "I Limicoli della foce del fiume Tresa",
    files: [
      {
        kind: "pdf",
        label: "2019. I Limicoli della foce del fiume Tresa",
        url: "/documents/progetti/2019-limicoli-fiume-tresa.pdf",
      },
    ],
  },
  // ZPS Canneti Lago Maggiore
  {
    id: 24,
    year: 2018,
    title: "ZPS Canneti Lago Maggiore",
    files: [
      {
        kind: "pdf",
        label:
          "2018. L'avifauna acquatica della ZPS IT2010502 “Canneti del Lago Maggiore”. Risultati del monitoraggio 2015-2017",
        url: "/documents/progetti/2018-avifauna-acquatica.pdf",
      },
      {
        kind: "pdf",
        label:
          " 2017. Le specie allegato I (Direttiva Uccelli 2009/147/CEE) dell'avifauna acquatica ZPS IT2010502 “Canneti del Lago Maggiore“",
        url: "/documents/progetti/2017-specie.pdf",
      },
      {
        kind: "pdf",
        label:
          "2017. L'avifauna acquatica della ZPS IT2010502 “Canneti del Lago Maggiore”. Risultati del monitoraggio 2016",
        url: "/documents/progetti/2017-monitoraggio-2016.pdf",
      },
      {
        kind: "pdf",
        label:
          "2015. Avifauna acquatica ZPS IT2010502 “Canneti del Lago Maggiore”. Sintesi intermedia dei rilevamenti al 31-08-2015",
        url: "/documents/progetti/2015-rilevamenti.pdf",
      },
      {
        kind: "pdf",
        label:
          "2015. Risultati al 31-12-2014 del monitoraggio dell'avifauna nella ZPS IT2010502 “Canneti del Lago Maggiore”",
        url: "/documents/progetti/2015-rilevamenti-2014.pdf",
      },
      {
        kind: "pdf",
        label:
          "2014. Monitoraggio dell'avifauna nella ZPS IT2010502 “Canneti del Lago Maggiore”. Sintesi dei risultati al 31-12-2013",
        url: "/documents/progetti/2014-risultati-2013.pdf",
      },
    ],
  },
  // 2018 Goosander
  {
    id: 25,
    year: 2018,
    title:
      "The Goosander Mergus merganser breeding population expansion and trend in North-Western Italy",
    files: [
      {
        kind: "pdf",
        label:
          "2018. Spread of the Goosander population in north-western Italy (2000-2014)",
        url: "/documents/progetti/2018-goosander.pdf",
      },
    ],
  },
  // 2017 Goosander
  {
    id: 26,
    year: 2017,
    title:
      "Il ruolo delle zone umide della Regione Lombardia durante la migrazione dei limicoli: un’analisi per il genere Tringa ricavata dal portale www.ornitho.it",
    files: [
      {
        kind: "pdf",
        label:
          "2017. Il ruolo delle zone umide della Regione Lombardia durante la migrazione dei limicoli: un’analisi per il genere Tringa ricavata dal portale www.ornitho.it",
        url: "/documents/progetti/2017-zone-umide-limicoli.pdf",
      },
    ],
  },
  // 2016 Nest-side
  {
    id: 27,
    year: 2016,
    title:
      "Nest-site characteristics and breeding biology of the Black Woodpecker in north-western Lombardy, Italy",
    files: [
      {
        kind: "pdf",
        label:
          "2016. Nest-site characteristics and breeding biology of the Black Woodpecker in north-western Lombardy, Italy",
        url: "/documents/progetti/2016-picchio-nero.pdf",
      },
    ],
  },
  // 2014 Prima nidificazione assiolo
  {
    id: 28,
    year: 2014,
    title:
      "Prima nidificazione accertata di assiolo Otus scops in provincia di Varese",
    files: [
      {
        kind: "pdf",
        label:
          "2016. Nest-site characteristics and breeding biology of the Black Woodpecker in north-western Lombardy, Italy",
        url: "/documents/progetti/2014-nidificazione-assiolo.pdf",
      },
    ],
  },
  // 2013 Boschi non gestiti
  {
    id: 29,
    year: 2013,
    title:
      "Boschi non gestiti e comunità ornitica: un caso di studio in provincia di Varese",
    files: [
      {
        kind: "pdf",
        label:
          "2013. Boschi non gestiti e comunità ornitica: un caso di studio in provincia di Varese",
        url: "/documents/progetti/2013-boschi-non-gestiti.pdf",
      },
    ],
  },
  // 2012 Censimento al playback
  {
    id: 30,
    year: 2012,
    title:
      "Censimento al playback di una popolazione di Civetta, Athene noctua, in provincia di Varese",
    files: [
      {
        kind: "pdf",
        label:
          "2012. Censimento al playback di una popolazione di Civetta, Athene noctua, in provincia di Varese",
        url: "/documents/progetti/2012-censimento-al-playback.pdf",
      },
    ],
  },
  // 2012 i Passeriformi
  {
    id: 31,
    year: 2012,
    title:
      "I Passeriformi (Passeriformes) degli ambienti aperti come indicatori della successione ecologica nel SIC Val Veddasca (Lombardia, Italia)",
    files: [
      {
        kind: "pdf",
        label:
          "2012. I Passeriformi (Passeriformes) degli ambienti aperti come indicatori della successione ecologica nel SIC Val Veddasca (Lombardia, Italia)",
        url: "/documents/progetti/2012-passeriformi.pdf",
      },
    ],
  },
  // 2010 Falco pecchiaiolo
  {
    id: 32,
    year: 2010,
    title:
      "Il monitoraggio del Falco pecchiaiolo, Pernis apivorus, e del Succiacapre, Caprimulgus europaeus, nel SIC IT2020007 “Pineta Pedemontana di Appiano Gentile VA - CO",
    files: [
      {
        kind: "pdf",
        label:
          "2010. Il monitoraggio del Falco pecchiaiolo, Pernis apivorus, e del Succiacapre, Caprimulgus europaeus, nel SIC IT2020007 “Pineta Pedemontana di Appiano Gentile VA - CO",
        url: "/documents/progetti/2010-falco-pecchiaiolo.pdf",
      },
    ],
  },
  // 2004 Comunità ornitica
  {
    id: 33,
    year: 2004,
    title:
      "La comunità ornitica delle formazioni forestali ad Alno-Ulmion e Salicion Albae: analisi di alcune aree-campione in provincia di Varese (Lombardia)",
    files: [
      {
        kind: "pdf",
        label:
          "2004. La comunità ornitica delle formazioni forestali ad Alno-Ulmion e Salicion Albae: analisi di alcune aree-campione in provincia di Varese (Lombardia)",
        url: "/documents/progetti/2004-comunita-ornitica.pdf",
      },
    ],
  },
  // 2003 Avifauna nidificante nelle brughiere
  {
    id: 34,
    year: 2003,
    title:
      "L'avifauna nidificante nelle brughiere della Lombardia occidentale.",
    files: [
      {
        kind: "pdf",
        label:
          "2003. L'avifauna nidificante nelle brughiere della Lombardia occidentale.",
        url: "/documents/progetti/2003-avifauna-brughiere-lombardia-occidentale.pdf",
      },
    ],
  },
  // 2001 Avifauna nidificante nelle zone umide
  {
    id: 35,
    year: 2001,
    title:
      "L'avifauna nidificante nelle zone umide della provincia di Varese: status delle specie e grado di conservazione dei biotipi",
    files: [
      {
        kind: "pdf",
        label:
          "2001. L'avifauna nidificante nelle zone umide della provincia di Varese: status delle specie e grado di conservazione dei biotipi",
        url: "/documents/progetti/2001-avifauna-zone-umide.pdf",
      },
    ],
  },
];

const MOCK_TREE: PubNode[] = [
  // Quaderni
  {
    slug: "quaderni",
    title: "Quaderni",
    type: "group",
    intro_text:
      "<p>I Quaderni del G.I.O. sono pubblicazioni scientifiche curate dai soci del Gruppo, nate con l'obiettivo di raccogliere e divulgare i risultati delle ricerche ornitologiche condotte sul territorio.<br>Si tratta di volumi cartacei che si possono ricevere tramite una donazione minima al G.I.O. OdV (gli importi sono comprensivi di eventuali spese di spedizione): le copie possono anche ritirate personalmente.<br><br>Per tutte le informazioni, le richieste per ricevere delle copie e le modalità di pagamento contattateci tramite il nostro <a href='/form' class='specific-link' target='_blank'>form di contatto</a>.</p><br><ul class='specific-list'><li><strong>Quaderno 4/2022</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 18</strong> cadauno</li></ul><p>Sempre disponibili anche gli altri Quaderni del G.I.O.:</p><ul class='specific-list'><li><strong>Quaderno 3/2018</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 15</strong> cadauno</li><li><strong>Quaderno 2/2015</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 8</strong> cadauno</li><li><strong>Quaderno 1/2012</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 5</strong> cadauno</li></ul><p><strong>Donazione minima per serie:</strong></p><ul class='specific-list'><li>Intera collana - Quaderni 1/2/3/4: <strong>&euro; 35</strong></li><li>Quaderni 1/2/4, oppure 1/3/4, oppure 2/3/4: <strong>&euro; 30</strong></li><li>Quaderni 1/2/3: <strong>&euro; 25</strong></li></ul><p><strong>Dati per bonifici:</strong><br>Gruppo Insubrico di Ornitologia<br>IBAN: IT13A0569650240000020568X10<br>Causale: NOME e COGNOME, donazione/Quaderno (specificare quale/quali) n° X copie</p></p>",
    intro_excerpt: "Studi monografici e approfondimenti tematici.",
    image_path: "/images/pubblicazioni/quaderni/martin-pescatore.webp",
    children: [
      {
        slug: "quaderno-5-2026",
        title: "Quaderno 5/2026 - Rondoni",
        type: "detail",
        intro_excerpt: "I Rondoni.",
        image_path: "/images/pubblicazioni/quaderni/quaderno-5.webp",
        inner_pages: [
          {
            id: 551,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-5/pagina-1.webp",
          },
          {
            id: 552,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-5/pagina-2.webp",
          },
          {
            id: 553,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-5/pagina-3.webp",
          },
          {
            id: 554,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-5/pagina-4.webp",
          },
        ],
        price: "",
        pdf_url: "",
        body: "<p>Ricerche, monitoraggio e conservazione delle colonie in otto province prealpine di Lombardia e Piemonte.<br><br>Il <strong>Quaderno 5 &quot;Rondoni&quot;</strong>, il quinto volume della collana &quot;Quaderni del G.I.O.&quot;, che il Gruppo Insubrico di Ornitologia sta realizzando insieme a <strong>LIPU OdV, CROS Varenna</strong> e <strong>Novara BW</strong>, è dedicato alla ricerca sulle <strong>tre specie di rondoni nidificanti</strong> nell'Italia settentrionale e alla loro ecologia urbana, Rondone comune, Rondone maggiore e Rondone pallido. Il volume raccoglierà i risultati di studi scientifici, proporrà linee guida per la conservazione delle specie e sarà arricchito da illustrazioni originali.<br><br>Scritto in italiano con riassunti in inglese, riccamente illustrato, sarà <strong>disponibile a breve</strong> per l'acquisto.<br>È possibile segnalare il proprio interesse all'acquisto tramite <a href='https://docs.google.com/forms/d/e/1FAIpQLSeJJ0iu3IVJoexE7LN3Z9vgVoCaBaQ152Otal_DTP7OGj2XBQ/viewform' class='specific-link' target='_blank'>questo link</a>:.</p>",
      },
      {
        slug: "quaderno-4-2022",
        title: "Quaderno 4/2022 - Uccelli del Lago Maggiore",
        type: "detail",
        intro_excerpt: "Gli uccelli del Lago Maggiore.",
        image_path: "/images/pubblicazioni/quaderni/quaderno-4.webp",
        inner_pages: [
          {
            id: 541,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-4/pagina-1.webp",
          },
          {
            id: 542,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-4/pagina-2.webp",
          },
          {
            id: 543,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-4/pagina-3.webp",
          },
          {
            id: 544,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-4/pagina-4.webp",
          },
        ],
        price: "€ 18",
        pdf_url: "",
        body: "<p>Da Sud a Nord: le zone umide, le specie acquatiche, le ricerche (256 pagine).<br><br>Il <strong>quarto volume del Gruppo Insubrico di Ornitologia</strong>, intitolato &quot;UCCELLI del Lago Maggiore&quot;, rappresenta un'opera corale dedicata all'avifauna dell'intero bacino del Verbano. Superando i confini amministrativi, il progetto ha visto la collaborazione tra il G.I.O., partner svizzeri come <strong>Ficedula</strong>, la <strong>Fondazione Bolle di Magadino</strong> e la <strong>Riserva della Foce della Maggia</strong> e per la sponda piemontese è stato coinvolto l'<strong>Ente di gestione delle aree protette del Ticino e del Lago Maggiore</strong>.<br><br>Il risultato è un prestigioso trattato di divulgazione scientifica di 256 pagine, arricchito dai dati condivisi dai birdwatcher sul <strong>portale Ornitho</strong> e impreziosito da 260 fotografie, mappe e grafici dettagliati.<br><br>Il libro esplora la <strong>storia naturale del lago</strong>, analizzando le <strong>rotte migratorie</strong> tra Mediterraneo ed Europa e monitorando le specie acquatiche attraverso trentasette anni di <strong>censimenti IWC</strong>. Oltre a fornire indicazioni pratiche per il birdwatching nelle zone umide lombarde, piemontesi e ticinesi, il testo approfondisce ricerche recenti su specie iconiche come lo Smergo maggiore e la Rondine. Un tributo fondamentale alla biodiversità del Lago Maggiore, reso possibile dal lavoro appassionato di venti autori.</p>",
      },
      {
        slug: "quaderno-3-2018",
        title: "Quaderno 3/2018 - Storia naturale dei picchi",
        type: "detail",
        intro_excerpt: "La storia naturale dei picchi.",
        image_path: "/images/pubblicazioni/quaderni/quaderno-3.webp",
        inner_pages: [
          {
            id: 531,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-3/pagina-1.webp",
          },
          {
            id: 532,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-3/pagina-2.webp",
          },
          {
            id: 533,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-3/pagina-3.webp",
          },
          {
            id: 534,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-3/pagina-4.webp",
          },
        ],
        price: "€ 15",
        pdf_url: "",
        body: "<p>in provincia di Varese (232 pagine)<br><br>Pubblicato nel dicembre 2018, il <strong>terzo Quaderno del G.I.O.</strong> conta 232 pagine dedicate all'affascinante <strong>mondo dei picidi</strong>. Il progetto, nato inizialmente per documentare una ricerca quinquennale sul Picchio nero in provincia di Varese, si è evoluto fino a includere tutte le cinque specie presenti sul territorio provinciale. L'opera offre una <strong>prospettiva multidisciplinare</strong>: dai capitoli sulla sistematica, anatomia e fisiologia, fino all'analisi delle vocalizzazioni supportata da innovativi sonogrammi consultabili online.<br><br>Un contributo fondamentale riguarda il ruolo dei picchi come preziosi indicatori biologici, fornendo linee guida per una <strong>gestione forestale</strong> attenta alla biodiversità. Ogni specie gode di un approfondimento su <strong>biologia, ecologia e conservazione</strong>, arricchito da oltre 150 fotografie, mappe e sintesi in inglese.<br><br>Realizzato grazie alla collaborazione gratuita di numerosi soci e amici, il volume ha beneficiato del sostegno economico della <strong>Fondazione Comunitaria del Varesotto</strong>, della <strong>Comunità Montana del Piambello</strong>, della <strong>Libera Associazione La Campagna di Germignaga</strong> e della sezione del <strong>Club Alpino Italiano di Luino</strong>.</p>",
      },
      {
        slug: "quaderno-2-2015",
        title:
          "Quaderno 2/2015 - Check-list degli uccelli della provincia di Varese",
        type: "detail",
        intro_excerpt: "La check-list degli uccelli della provincia di Varese.",
        image_path: "/images/pubblicazioni/quaderni/quaderno-2.webp",
        inner_pages: [
          {
            id: 521,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-2/pagina-24.webp",
          },
          {
            id: 522,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-2/pagina-25.webp",
          },
          {
            id: 523,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-2/pagina-58.webp",
          },
          {
            id: 524,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-2/pagina-59.webp",
          },
        ],
        price: "€ 8",
        pdf_url: "",
        body: "<p>della PROVINCIA di VARESE (208 pagine).<br><br>Il <strong>Quaderno del G.I.O. n° 2/2015</strong>, intitolato &quot;Check-List degli UCCELLI della PROVINCIA di VARESE - Lista completa commentata e illustrata&quot; è stato curato da Roberto Aletti e Monica Carabella e si propone come un compendio corposo ma estremamente maneggevole, indispensabile per chiunque desideri approfondire la conoscenza del patrimonio naturale locale. Il manuale analizza dettagliatamente la distribuzione, la stagionalità e il grado di rarità delle <strong>327 specie documentate</strong> sul territorio varesino.<br><br>L'opera raccoglie informazioni originali che spaziano dai dati storici fino ai giorni nostri, con un aggiornamento scientifico al 31 dicembre 2013. In 208 pagine arricchite da oltre 100 fotografie di uccelli e habitat, il cuore del libro è rappresentato dalle <strong>schede informative</strong> per ogni singola specie.<br><br>Oltre alla lista sistematica, il ricco sommario offre <strong>approfondimenti</strong> su molteplici aspetti dell'ornitologia moderna, rendendo il volume un riferimento essenziale per la ricerca e la conservazione.</p>",
      },
      {
        slug: "quaderno-1-2012",
        title: "Quaderno 1/2012 - Uccelli acquatici svernanti",
        type: "detail",
        intro_excerpt: "Le specie acquatiche svernanti.",
        image_path: "/images/pubblicazioni/quaderni/quaderno-1.webp",
        inner_pages: [
          {
            id: 511,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-1/pagina-12.webp",
          },
          {
            id: 512,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-1/pagina-13.webp",
          },
          {
            id: 513,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-1/pagina-62.webp",
          },
          {
            id: 514,
            image_path:
              "/images/pubblicazioni/quaderni/quaderno-1/pagina-63.webp",
          },
        ],
        price: "€ 5",
        pdf_url: "",
        body: "<p>25 anni di dati in provincia di Varese (128 pagine).<br><br>Il primo <strong>Quaderno del G.I.O.</strong> è un manuale scientifico-divulgativo di 128 pagine dedicato all'avifauna acquatica della provincia di Varese, basato sui censimenti internazionali IWC effettuati tra il 1986 e il 2010.<br><br>Il volume ripercorre la storia dei rilevamenti in Europa e Italia, offrendo una panoramica degli specchi d'acqua locali. Il cuore dell'opera è l'analisi di <strong>48 specie</strong> (appartenenti a 10 famiglie, tra cui Anatidi, Ardeidi e Laridi), descritte attraverso schede dettagliate su distribuzione, conservazione e dati numerici invernali.<br><br>Grazie a grafici e fotografie, il testo documenta l'evoluzione delle popolazioni svernanti in <strong>venticinque anni</strong>, evidenziando gli effetti dei cambiamenti climatici, come l'aumento dello Smergo maggiore e dell'Airone cenerino.<br><br>Realizzato su carta riciclata, il progetto è stato sostenuto dalla <strong>Provincia di Varese</strong> e dalla <strong>LIPU</strong>, avvalendosi del contributo di numerosi fotografi naturalisti.</p>",
      },
    ],
  },
  // BOL
  {
    slug: "bol",
    title: "BOL",
    type: "pdf-list",
    group_by_year: true,
    intro_text:
      "<p>Questa pubblicazione, esclusivamente online, nasce dall'incontro avvenuto nel settembre 2018 tra un numeroso gruppo di ornitologi e naturalisti lombardi, attivi da molti anni sul campo sia come volontari sia come professionisti.<br><br>Durante la riunione di settembre, organizzata presso il Museo Caffi di Bergamo grazie alla disponibilità del Direttore, dott. Marco Valle, sono state gettate le basi di questo progetto. L'idea è nata da una semplice considerazione: la necessità di disporre di un “bollettino” di facile consultazione, accessibile online a tutti gli interessati, capace di raccogliere contributi di carattere faunistico riferiti principalmente alla Lombardia, ma con uno sguardo esteso anche all'Italia settentrionale.<br>Il Bollettino si è proposto di accogliere quei lavori che difficilmente trovano spazio nelle riviste nazionali, generalmente orientate verso progetti di più ampio respiro.<br><br>Considerata l'enorme quantità di dati condivisi su piattaforme come Ornitho.it, è emersa con evidenza l'esigenza di elaborare e diffondere sintesi riguardanti aspetti quali la fenologia, la distribuzione geografica e la selezione dell'habitat delle specie, oltre alla necessità di aggiornare costantemente le conoscenze sull'avifauna legata alle aree protette: riserve naturali, parchi regionali, PLIS e, in particolare, la Rete Natura 2000.<br><br>Un elemento fondamentale di questa iniziativa è stato il tentativo di riunire, attorno a un progetto comune, i numerosi gruppi - per lo più amatoriali - attivi nelle diverse province lombarde, finora privi di un coordinamento diretto e di una rappresentanza condivisa. Su proposta di Pierandrea Brichetti, già durante l'incontro del settembre 2018 è stato costituito un primo coordinamento tra gruppi, composto da sei realtà provinciali. Tale struttura è stata aperta a tutti coloro che desideravano aderire, contribuendo attivamente al progetto. Ogni gruppo è stato rappresentato all'interno del Bollettino da un referente, incaricato di raccogliere materiale da pubblicare e di proporre eventuali attività di censimento o monitoraggio su scala regionale o pluriprovinciale.<br><br>Il Bollettino Ornitologico Lombardo è stato pubblicato sulla piattaforma Ornitho.it grazie al supporto di Roberto Lardelli e del Gruppo di Conduzione. Questa collaborazione ha consentito di ampliare la diffusione dei contenuti anche oltre il contesto regionale.<br>L'obiettivo principale della pubblicazione è stato contribuire all'ampliamento delle conoscenze in un periodo caratterizzato da profondi cambiamenti e crescenti minacce agli ecosistemi.<br><br>I contributi sono stati inviati esclusivamente in formato elettronico via e-mail alla redazione, che ne ha valutato la pubblicazione secondo l'ordine cronologico di ricezione. Sono stati presi in considerazione diversi tipi di lavori, tra cui: articoli scientifici, brevi note, report di monitoraggi e censimenti, presentazioni di tesi, reportage fotografici, notizie, revisioni, recensioni librarie, resoconti di campagne di inanellamento, checklist locali, proposte di studio e altri contributi, purché redatti in lingua italiana.</p>",
    intro_excerpt: "Il bollettino periodico delle osservazioni.",
    header_image: "/images/pubblicazioni/bol/bol.webp",
    image_path: "/images/pubblicazioni/bol/frosone.webp",
    items: [
      {
        id: 10,
        year: 2019,
        title: "Volume 1 Numero 1",
        pdf_url: "/documents/pubblicazioni/bol/2019/bol-v1-n1.pdf",
      },
      {
        id: 11,
        year: 2019,
        title: "Volume 1 Numero 2",
        pdf_url: "/documents/pubblicazioni/bol/2019/bol-v1-n2.pdf",
      },
      {
        id: 12,
        year: 2020,
        title: "Volume 2 Numero 1",
        pdf_url: "/documents/pubblicazioni/bol/2020/bol-v2-n1.pdf",
      },
      {
        id: 13,
        year: 2020,
        title: "Volume 2 Numero 2",
        pdf_url: "/documents/pubblicazioni/bol/2020/bol-v2-n2.pdf",
      },
      {
        id: 14,
        year: 2021,
        title: "Volume 3 Numero 1",
        pdf_url: "/documents/pubblicazioni/bol/2021/bol-v3-n1.pdf",
      },
      {
        id: 15,
        year: 2021,
        title: "Volume 3 Numero 2",
        pdf_url: "/documents/pubblicazioni/bol/2021/bol-v3-n2.pdf",
      },
      {
        id: 16,
        year: 2022,
        title: "Volume 4 Numero 1",
        pdf_url: "/documents/pubblicazioni/bol/2022/bol-v4-n1.pdf",
      },
      {
        id: 17,
        year: 2022,
        title: "Volume 4 Numero 2",
        pdf_url: "/documents/pubblicazioni/bol/2022/bol-v4-n2.pdf",
      },
      {
        id: 18,
        year: 2023,
        title: "Volume 5 Numero 1",
        pdf_url: "/documents/pubblicazioni/bol/2023/bol-v5-n1.pdf",
      },
      {
        id: 19,
        year: 2023,
        title: "Volume 5 Numero 2",
        pdf_url: "/documents/pubblicazioni/bol/2023/bol-v5-n2.pdf",
      },
      {
        id: 111,
        year: 2024,
        title: "Volume 6 Numero 1",
        pdf_url: "/documents/pubblicazioni/bol/2024/bol-v6-n1.pdf",
      },
      {
        id: 121,
        year: 2024,
        title: "Volume 6 Numero 2",
        pdf_url: "/documents/pubblicazioni/bol/2024/bol-v6-n2.pdf",
      },
      {
        id: 131,
        year: 2025,
        title: "Volume 7 Numero 1",
        pdf_url: "/documents/pubblicazioni/bol/2025/bol-v7-n1.pdf",
      },
    ],
  },
  // Altre Pubblicazioni
  {
    slug: "altre-pubblicazioni",
    title: "Altre Pubblicazioni",
    type: "bibliography",
    items_per_page: 10, // ← bibliografia lunga: 10 voci per pagina
    results_title: "Risultati delle ricerche",
    // Cartelle dei risultati (accordion sopra la bibliografia, 15 per
    // pagina). Le cartelle senza file con un url NON vengono mostrate.
    // TODO: completare i titoli (sono quelli troncati dello screenshot)
    // e aggiungere i PDF di ogni cartella.
    result_folders: RESULT_FOLDERS,
    intro_text:
      "<p>Qui è possibile consultare tutti i risultati delle nostre ricerche, sia quelle in corso sia quelle terminate.</p>",
    second_intro_text: "Bibliografia del G.I.O.",
    intro_excerpt: "Articoli scientifici e riferimenti bibliografici.",
    image_path: "/images/pubblicazioni/paper/porciglione.webp",
    items: [
      {
        id: 20,
        text: "Alberti P., Carabella M., Colaone S., Danini G., Saporetti F., Scandolara C., 2003. L'avifauna nidificante nelle brughiere della Lombardia occidentale. RIO, 72 (2): 269-271.",
      },
      {
        id: 21,
        text: "Aletti R., 2018. Avifauna insubrica. Osservazioni ornitologiche di particolare interesse effettuate in provincia di Varese nell’anno 2017. Relazione tecnica.",
      },
      {
        id: 22,
        text: "Aletti R., 2019. Resoconto ornitologico provincia di Varese anno 2018. Osservazioni ornitologiche di particolare interesse effettuate in provincia di Varese nell'anno 2018. Relazione tecnica.",
      },
      {
        id: 23,
        text: "Aletti R., Saporetti F., 2020. I limicoli (ordine Charadriiformes) della provincia di Varese. B.O.L. Vol. 2 - n. 2 - 2020 (71-118).",
      },
      {
        id: 24,
        text: "Aletti R., 2020. Resoconto ornitologico provincia di Varese anno III. Osservazioni ornitologiche di particolare interesse effettuate in provincia di Varese nell'anno 2019. Relazione tecnica.",
      },
      {
        id: 25,
        text: "Aletti R., 2021. Resoconto ornitologico provincia di Varese anno IV. Osservazioni ornitologiche di particolare interesse effettuate in provincia di Varese nell'anno 2020. Relazione tecnica.",
      },
      {
        id: 26,
        text: "Aletti R., 2021. Lista degli uccelli della provincia di Varese aggiornata al 2020. Relazione tecnica.",
      },
      {
        id: 27,
        text: "Aletti R., 2022. Analisi dell'avifauna nidificante in provincia di Varese al 31/12/2021. B.O.L. Vol. 4 - n. 2 - 2022 (94-107).",
      },
      {
        id: 28,
        text: "Aletti R., Brichetti P., Gargioni A., Grattini N., 2022. Check-list degli uccelli della Lombardia aggiornata al dicembre 2021. B.O.L. Vol. 4 - n. 1 - 2022 (3-32).",
      },
      {
        id: 29,
        text: "Aletti R., Saporetti F., Taverna G., 2022. Prima nidificazione di Volpoca (Tadorna tadorna) in Lombardia: un caso accertato in provincia di Varese. B.O.L. Vol. 4 - n. 2 - 2022 (121-124).",
      },
      {
        id: 211,
        text: "Aletti R., 2022. Resoconto ornitologico provincia di Varese anno V. Osservazioni ornitologiche di particolare interesse effettuate in provincia di Varese nell'anno 2021. Relazione tecnica.",
      },
      {
        id: 212,
        text: "Aletti R., Carabella M., Saporetti F., Guenzani W., 2023. UI-VA: Birds in winter Varese 2018-2023. Poster XXI Convegno Italiano di Ornitologia. Varese 05-09 settembre 2023.",
      },
      {
        id: 213,
        text: "Aletti R., 2023. Resoconto ornitologico provincia di Varese anno VI. Osservazioni ornitologiche di particolare interesse effettuate in provincia di Varese nell'anno 2022. Relazione tecnica.",
      },
      {
        id: 214,
        text: "Aletti R., 2024. Resoconto ornitologico provincia di Varese anno VII. Osservazioni ornitologiche di particolare interesse effettuate in provincia di Varese nell'anno 2023. Relazione tecnica.",
      },
      {
        id: 215,
        text: "Aletti R., Giussani L., Saporetti F., 2025. Resoconto ornitologico provincia di Varese anno VIII. Osservazioni ornitologiche di particolare interesse effettuate in provincia di Varese nell'anno 2024. Relazione tecnica.",
      },
      {
        id: 216,
        text: "Aletti R., Giussani L., Saporetti F., 2026. Resoconto ornitologico provincia di Varese anno IX. Osservazioni ornitologiche di particolare interesse effettuate in provincia di Varese nell'anno 2025. Relazione tecnica.",
      },
      {
        id: 217,
        text: "Barattieri M., Saporetti F., Gianatti G., Viganò E., 2023. What is the future for farmland birds in North-Western Lombardy? Poster XXI Convegno Italiano di Ornitologia. Varese 05-09 settembre 2023.",
      },
      {
        id: 218,
        text: "Berlusconi A., Martinoli A., Wauters L. A., Tesoro G., Martini S., Clerici E., Guenzani G., Pozzi G., Rubolini D., Morganti M., Martinoli A., 2022. Year-round multi-scale habitat selection by Crested Tit (Lophophanes cristatus) in lowland mixed forests (northern Italy). Avian Research Vol. 13 pp. 7.",
      },
      {
        id: 219,
        text: "Boano G., Casola D., Cucco M., Ferri M., Micheloni P., Manica M., Pellegrino I., 2022. Onset of primary moult in immature and breeding adult Common Swifts Apus apus. Ringing & Migration pp. 7.",
      },
      {
        id: 220,
        text: "Bordignon L., Carabella M., Guenzani W., Guerrini M., Grattini N., Lardelli R., Pedrini P., Piotti G., Pistono C., Saporetti F., Sighele M., Tosi A., Viganò E., Volcan G., 2018. The Goosander Mergus merganser breeding population expansion and trend in north-western Italy. Avocetta - Volume 42 pp. 8.",
      },
      {
        id: 221,
        text: "Carabella M., 2020. Recensione The Birds of Italy, Pierandrea Brichetti & Giancarlo Fracasso. B.O.L. Vol. 2 - n. 2 - 2020 (173-178).",
      },
      {
        id: 222,
        text: "Carabella M., Pianezza F., D'Orazio L., Saporetti F., Vaghi M., 2023. Primo tentativo di nidificazione di Nibbio reale (Milvus milvus) in provincia di Varese. B.O.L. Vol. 5 - n. 1 - 2023 (32-38).",
      },
      {
        id: 223,
        text: "Casola D., Manica M., Morganti M., 2023. Site and nest fidelity in the Common Swift (Apus apus). Poster XXI Convegno Italiano di Ornitologia. Varese 05-09 settembre 2023.",
      },
      {
        id: 224,
        text: "Casola D., Colombo L., Stocchetti A., Manica M., 2022. Passeraie e rondonaie in provincia di Varese: censimento, rivalutazione ed utilizzo per conservazione e studio delle specie sinantropiche. B.O.L. vol. 4 - n. 2 - 2022 (125-152).",
      },
      {
        id: 225,
        text: "Casola D., Colombo L., Stocchetti A., Papale G., Manica M., 2023. Swift and Sparrow towers in the Province of Varese: census, evaluation and use in the conservation and study of synanthropic species. Poster XXI Convegno Italiano di Ornitologia. Varese 05-09 settembre 2023.",
      },
      {
        id: 226,
        text: "Colaone S., Fanchin B., Giusto A., Guenzani W., Saporetti F., Zarbo T., 2012. Censimento al playback di una popolazione di Civetta, Athene noctua, in provincia di Varese. RIO, 80 (2): 79-85.",
      },
      {
        id: 227,
        text: "Colombo L., Manica M., Giussani L., 2020. Roost di Nibbio bruno (Milvus migrans) in provincia di Varese: osservazioni preliminari (2019-2020), considerazioni e possibili sviluppi di indagine. B.O.L. Vol. 2 - n. 2 - 2020 (139-154).",
      },
      {
        id: 228,
        text: "Colombo L., Bressan P., Manica M., Aletti R., Guenzani W., Giussani L., 2021. Il Gufo reale Bubo bubo in provincia di Varese: dati storici e ricerche recenti. B.O.L. Vol. 3 - n. 2 - 2021 (86-100).",
      },
      {
        id: 229,
        text: "Colombo L., Casola D., Stocchetti A., Ricci M., Rigamonti E., Manica M., 2024. Swift and sparrow towers in the provinces of Novara and Varese: census and evaluation for swift's conservation. Poster 7th International Swift Conference. Trieste 29-31 maggio 2024.",
      },
      {
        id: 230,
        text: "Costanzo A., Ambrosini R., Manica M., Casola D., Polidori C., Gianotti V., Conterosito E., Roncoli M., Parolini M., De Felice B., 2024. Microfibers in the Diet of a Highly Aerial Bird, the Common Swift Apus apus. Toxics 12, 408 pp. 11.",
      },
      {
        id: 231,
        text: "Gagliardi A., Preatoni D., Saporetti F., Tosi G., 2013. Boschi non gestiti e comunità ornitica: un caso di studio in provincia di Varese. RIO, 82 (1-2): 125-127.",
      },
      {
        id: 232,
        text: "Grattini N., Aletti R., Carabella M., Guenzani W., Longoni V., Saporetti F., 2025. Trends of waterbirds wintering on the lakes of Lombardy: twenty years of International Waterbirds Census. Poster XXII Convegno Italiano di Ornitologia. Lecce 08-12 settembre 2025.",
      },
      {
        id: 233,
        text: "Guenzani W., Aletti R., Giussani L., 2020. Nidificazione della Colombella (Columba oenas) in provincia di Varese. B.O.L. Vol. 2 - n. 2 - 2020 (135-138).",
      },
      {
        id: 234,
        text: "Manica M., Morganti M., Casola D., Bazzarelli M., Bogliani G., 2019. Studio preliminare della fenologia e del successo riproduttivo in una colonia di rondone comune (Apus apus) a Jerago con Orago (VA). Poster XX Convegno Italiano di Ornitologia. Napoli 26-29 settembre 2019.",
      },
      {
        id: 235,
        text: "Manica M., Casola D., Stocchetti A., Bazzarelli M., Biganzoli D., Morganti M., 2022. Breeding phenology, reproductive success and survival of Common Swift (Apus apus) from a Northern Italian colony. Poster XXIII EOU Conference. Gießen Germany 14-18 marzo 2022.",
      },
      {
        id: 236,
        text: "Manica M., Casola D., Colombo L., Stocchetti A., Cavallaro C., Villa S., Morganti M., Parnell A., 2022. Birds towers and walls: three successful examples of rehabilitation in province of Varese, Italy. Poster 6th International Swift Conference. Segovia Spain 25-27 maggio 2022.",
      },
      {
        id: 237,
        text: "Manica M., Nembrini S., Casola D., Stocchetti A., Colombo L., Parnell A., Bazzarelli M., Zulian G., Iadanza C., Milani R., Ambrosini R., Cavallaro C., Guenzani W., Villa S., 2022. Which urban habitats are selected by Swifts? A citizen science program to answer the question in provinces of Varese and Bergamo, Italy. Presentation 6th International Swift Conference. Segovia Spain 25-27 maggio 2022.",
      },
      {
        id: 238,
        text: "Manica M., Nembrini S., Casola D., Stocchetti A., Colombo L., Parnell A., Bazzarelli M., Zulian G., Iadanza C., Milani R., Ambrosini R., 2023. Swifts and the selection of urban habitats: a citizen science project to increase the ecological knowledge of the species in the Bergamo and Varese provinces. Poster XXI Convegno Italiano di Ornitologia. Varese 05-09 settembre 2023.",
      },
      {
        id: 239,
        text: "Manica M., Casola D., Colombo L., Stocchetti Al., Wild T., Witte K., Fiedler W., Wikelski M., Papale G., Iadanza C., Cervellin I., Figus E., Morganti M., 2024. Swift towers as open research lab: the experience of a network of nesting sites in NW Italy. Poster 7th International Swift Conference. Trieste 29-31 maggio 2024.",
      },
      {
        id: 240,
        text: "Manica M., Casola D., Nembrini S., Pirotta G., Ricci M., Morganti M., 2026. A new book about Swifts that breed in Italy. Poster 8th International Swift Conference. Co. Mayo Ireland 27-29 maggio 2026.",
      },
      {
        id: 241,
        text: "Morganti M., Manica M., Casola D., Colombo L., Stocchetti A., Fiedler W., Wikelski M., Witte K., Wild T., 2024. First deployment of IoT tracking devices on Common swift Apus apus: a pilot study. Avocetta, Vol. 48 pp. 13.",
      },
      {
        id: 229,
        text: "Ravasi A., Guenzani W., 2014. Prima nidificazione accertata di assiolo Otus scops in provincia di Varese. RIO, 84 (1): 53-55.",
      },
      {
        id: 242,
        text: "Ricci M., Rigamonti E., Casola D., Colombo L., Stocchetti A., Papale G., Morganti M., Manica M., 2025. Passeraie, colombaie e rondonaie nelle province di Novara e Varese: mappa e monitoraggi per conservare storia e biodiversità. Picus 51 (99-100): 3-12.",
      },
      {
        id: 243,
        text: "Sacchet J., Giussani L., Berlusconi A., 2025. Campi di Brebbia (Varese, Italy): a crucial stopover and wintering site for birds. Poster XXII Convegno Italiano di Ornitologia. Lecce 08-12 settembre 2025.",
      },
      {
        id: 244,
        text: "Saporetti F., 2001. L'avifauna nidificante nelle zone umide della provincia di Varese: status delle specie e grado di conservazione dei biotipi. Bollettino della Società ticinese di scienze naturali 89, 2001 (1-2), pp. 41-50.",
      },
      {
        id: 245,
        text: "Saporetti F., Guenzani W., 2004. La comunità ornitica delle formazioni forestali ad Alno-Ulmion e Salicion Albae: analisi di alcune aree-campione in provincia di Varese (Lombardia). Bollettino della Società ticinese di scienze naturali 92, 2004 (1-2), pp. 109-118.",
      },
      {
        id: 246,
        text: "Saporetti F., 2010. Il monitoraggio del Falco pecchiaiolo, Pernis apivorus, e del Succiacapre, Caprimulgus europaeus, nel SIC IT2020007 “Pineta Pedemontana di Appiano Gentile VA - CO. Relazione tecnica.",
      },
      {
        id: 247,
        text: "Saporetti F., 2012. I Passeriformi (Passeriformes) degli ambienti aperti come indicatori della successione ecologica nel SIC Val Veddasca (Lombardia, Italia). Bollettino della Società ticinese di scienze naturali 100, pp. 79-88.",
      },
      {
        id: 248,
        text: "Saporetti F. , 2014. Monitoraggio dell'avifauna nella ZPS IT2010502 “Canneti del Lago Maggiore”. Sintesi dei risultati al 31-12-2013. Relazione tecnica.",
      },
      {
        id: 249,
        text: "Saporetti F., 2015. Risultati al 31-12-2014 del monitoraggio dell'avifauna nella ZPS IT2010502 “Canneti del Lago Maggiore”. Relazione tecnica.",
      },
      {
        id: 250,
        text: "Saporetti F., 2015. Avifauna acquatica ZPS IT2010502 “Canneti del Lago Maggiore”. Sintesi intermedia dei rilevamenti al 31-08-2015. Relazione tecnica.",
      },
      {
        id: 251,
        text: "Saporetti F., Colaone S., Guenzani W., Zarbo T., 2016. Nest-site characteristics and breeding biology of the Black Woodpecker in north-western Lombardy, Italy. RIO, 86 (1): 39-48.",
      },
      {
        id: 252,
        text: "Saporetti F., 2017. L'avifauna acquatica della ZPS IT2010502 “Canneti del Lago Maggiore”. Risultati del monitoraggio 2016. Relazione tecnica.",
      },
      {
        id: 253,
        text: "Saporetti F., Aletti R., Carabella M., Guenzani W., 2017. Le specie allegato I (Direttiva Uccelli 2009/147/CEE) dell'avifauna acquatica ZPS IT2010502 “Canneti del Lago Maggiore“. Poster XIX Convegno Italiano di Ornitologia. Torino 27 settembre - 01 ottobre 2017.",
      },
      {
        id: 254,
        text: "Saporetti F., Guenzani W., 2017. Due laghi, Verbano e Lario, a confronto. 15 anni di International Waterbird Census. Poster XIX Convegno Italiano di Ornitologia. Torino 27 settembre - 01 ottobre 2017.",
      },
      {
        id: 255,
        text: "Saporetti F., 2017. Il ruolo delle zone umide della Regione Lombardia durante la migrazione dei limicoli: un'analisi per il genere Tringa ricavata dal portale www.ornitho.it. RIO, 87, (2): 15-28.",
      },
      {
        id: 256,
        text: "Saporetti F., 2018. L'avifauna acquatica della ZPS IT2010502 “Canneti del Lago Maggiore”. Risultati del monitoraggio 2015-2017. Relazione tecnica.",
      },
      {
        id: 257,
        text: "Saporetti F., 2019. I Limicoli della foce del fiume Tresa. Relazione tecnica.",
      },
      {
        id: 258,
        text: "Saporetti F., Casale F., 2020. Il Succiacapre nella regione insubrica. Ficedula 53: 16-20.",
      },
      {
        id: 259,
        text: "Saporetti F., Carabella M., Castiglioni A., Colombo L., Dall’Osto D., Guenzani W., Larroux N., Zarbo T., Berlusconi A., 2021. Avifauna urbana: un'esperienza positiva in un contesto negativo. Visti da casa nel 2020. B.O.L. Vol. 3 - n. 1 - 2021 (41-55).",
      },
      {
        id: 260,
        text: "Saporetti F., 2022. Steady turnover in a bird community in a periurban landscape in northern Italy: a look at the change in species richness over time. RIO, 92, (2): 39-48.",
      },
      {
        id: 261,
        text: "Saporetti F., Gargioni A., Grattini N., 2022. La migrazione primaverile del Nibbio bruno (Milvus migrans) in Lombardia in riferimento alla data di primo arrivo. B.O.L. Vol. 4 - n. 1 - 2022 (68-76).",
      },
      {
        id: 262,
        text: "Saporetti F., Aletti R., 2023. From wintering to breeding: the bird diversity of the SPA IT2010501 “Lago di Varese”. Presentazione XXI Convegno Italiano di Ornitologia. Varese 05-09 settembre 2023.",
      },
      {
        id: 263,
        text: "Saporetti F., Aletti R., 2024. L'avifauna acquatica della Zona di Protezione Speciale “Lago di Varese” (Lombardia). B.O.L. Vol. 6 - n. 2 - 2024 (4-76).",
      },
      {
        id: 264,
        text: "Saporetti F., Barattieri M., Gianatti G., Viganò E., 2024. Il monitoraggio dell'avifauna degli agro-ecosistemi nella Lombardia nord-occidentale. B.O.L. Vol. 6 - n. 1 - 2024 (22-59).",
      },
      {
        id: 265,
        text: "Saporetti F., 2026. La foce Tresa: un punto caldo della migrazione del lago Maggiore. Relazione tecnica.",
      },
      {
        id: 266,
        text: "Zanchin E., Belloni G., Sacchet J., Bonvissuto N., Berlusconi A., Manica M., Casola D., 2025. Phenology and nest site fidelity in three Swift towers in the Lombardy region. Poster XXII Convegno Italiano di Ornitologia. Lecce 08-12 settembre 2025.",
      },
      {
        id: 267,
        text: "Zanchin E., 2026. Demographic changes in three Common Swift colonies in the Lombardy region, Italy. Presentation 8th International Swift Conference. Co. Mayo Ireland 27-29 maggio 2026.",
      },
    ],
  },
  // Liste
  {
    slug: "uccelli-varese",
    title: "Gli Uccelli della Provincia di Varese",
    type: "group",
    intro_text:
      "<p>Liste sistematiche e racconti ornitologici che documentano le osservazioni sul territorio nel corso degli anni.</p>",
    intro_excerpt: "Liste sistematiche e racconti ornitologici.",
    image_path: "/images/pubblicazioni/liste/voltapietre.webp",
    children: [
      // Lista uccelli
      {
        slug: "check-list-provinciale",
        title: "Check-list Provinciale",
        type: "pdf-list",
        intro_text:
          "<p>Questa pubblicazione rende disponibile un elenco documentato relativo a tutte le specie di uccelli osservati e segnalati in provincia di Varese, con <strong>aggiornamenti alla data del 31/12/2020</strong>.<br><br>Questa ricerca è stata effettuata attraverso la consultazione di numerose fonti bibliografiche, siti e piattaforme di associazioni ornitologiche e di birdwatching, con lo scopo di individuare tutte le osservazioni relative a presenza, nidificazione e svernamento, e conseguentemente assegnare i caratteri fenologici ad ogni singola specie, oltre ad alcuni altri campi o annotazioni di particolare rilevanza ornitologica.</p>",
        intro_excerpt: "Liste sistematiche delle specie osservate.",
        image_path:
          "/images/pubblicazioni/liste/lista-uccelli/picchio-muraiolo.webp",
        items: [
          {
            id: 30,
            year: 2020,
            title: "Lista uccelli Provincia di Varese 2020",
            pdf_url: "/docs/liste/lista-varese-2020.pdf",
          },
        ],
      },
      // Resoconti ornitologici
      {
        slug: "resoconti-ornitologici",
        title: "Resoconti ornitologici",
        type: "pdf-list",
        intro_text:
          "<p>In questi Resoconti sono presenti le osservazioni ornitologiche provinciali di ogni anno, dal 2017 ad oggi, con le segnalazioni delle specie che hanno particolare rilevanza per rarità, presenza non usuale in riferimento al periodo o alla località dove è stata effettuata l'osservazione, interessante numero di individui osservati, particolarità relative alla nidificazione e allo svernamento.<br><br>Le segnalazioni sono raccolte con il contributo di numerosi osservatori e anche attraverso alcune ricerche effettuate dal Gruppo Insubrico di Ornitologia, e per la quasi totalità fanno riferimento ai dati inseriti nel portale <a href='https://www.ornitho.it/' class='specific-link'>Ornitho</a>. I dati presenti nei vari Resoconti sono poi utilizzati per mantenere aggiornata la &ldquo;Lista degli uccelli della provincia di Varese&rdquo;.</p>",
        intro_excerpt: "Resoconti annuali di osservazione, dal 2017 ad oggi.",
        image_path:
          "/images/pubblicazioni/liste/resoconti/smergo-maggiore.webp",
        items: [
          {
            id: 40,
            year: 2017,
            title: "Resoconto Ornitologico 2017",
            pdf_url: "/documents/pubblicazioni/resoconti/resoconto-2017.pdf",
          },
          {
            id: 41,
            year: 2018,
            title: "Resoconto Ornitologico 2018",
            pdf_url: "/documents/pubblicazioni/resoconti/resoconto-2018.pdf",
          },
          {
            id: 42,
            year: 2019,
            title: "Resoconto Ornitologico 2019",
            pdf_url: "/documents/pubblicazioni/resoconti/resoconto-2019.pdf",
          },
          {
            id: 43,
            year: 2020,
            title: "Resoconto Ornitologico 2020",
            pdf_url: "/documents/pubblicazioni/resoconti/resoconto-2020.pdf",
          },
          {
            id: 44,
            year: 2021,
            title: "Resoconto Ornitologico 2021",
            pdf_url: "/documents/pubblicazioni/resoconti/resoconto-2021.pdf",
          },
          {
            id: 45,
            year: 2022,
            title: "Resoconto Ornitologico 2022",
            pdf_url: "/documents/pubblicazioni/resoconti/resoconto-2022.pdf",
          },
          {
            id: 46,
            year: 2023,
            title: "Resoconto Ornitologico 2023",
            pdf_url: "/documents/pubblicazioni/resoconti/resoconto-2023.pdf",
          },
          {
            id: 47,
            year: 2024,
            title: "Resoconto Ornitologico 2024",
            pdf_url: "/documents/pubblicazioni/resoconti/resoconto-2024.pdf",
          },
          {
            id: 48,
            year: 2025,
            title: "Resoconto Ornitologico 2025",
            pdf_url: "/documents/pubblicazioni/resoconti/resoconto-2025.pdf",
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

// Dati mock esposti per la ricerca nel sito (server/api/search.get.ts).
// TODO: rimuovere insieme ai mock quando il backend è pronto.
export { MOCK_TREE as PUBBLICAZIONI_TREE };
