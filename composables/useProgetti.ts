// ─── TIPI (contratto con la futura API Laravel) ──────────
// Modello PIATTO: SECTIONS + PROJECTS separati, ogni progetto con
// section_slug (consente lo spostamento admin tra sezioni).
// NOVITÀ: alcune sezioni sono "navigabili" (3 livelli): le loro card
// progetto sono bottoni verso una pagina dedicata /progetti/<sez>/<prog>.
// Altre restano a 2 livelli (i progetti si mostrano inline nella lista).

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
  "Il G.I.O. ha intrapreso <strong>progetti di ricerca</strong> nel campo dell'ornitologia fin dai suoi esordi. Il nostro atto costitutivo recita che: “la nostra associazione persegue come scopo prioritario <strong>lo studio e la conservazione dell'avifauna</strong>. Infatti è sempre stato nello spirito dei nostri soci <strong>fare ricerca sul territorio della provincia di Varese</strong> per individuare l'avifauna presente, lo <strong>stato di conservazione</strong> e i <strong>cambiamenti e le trasformazioni</strong> avvenuti nel tempo. I risultati delle ricerche riportate qui sotto sono consultabili alla pagina <a href='/pubblicazioni' class='specific-link' target='_blank'>Pubblicazioni Scientifiche</a>.";

const SECTIONS: ProjectSection[] = [
  {
    slug: "ricerca-in-corso",
    title: "Progetti di ricerca in corso",
    intro_text:
      "<p>Le ricerche attualmente attive, con monitoraggi e censimenti in corso sul territorio provinciale.</p>",
    intro_excerpt: "Le ricerche e i monitoraggi attualmente attivi.",
    image_path: "/images/progetti/progetti-in-corso.webp",
    has_projects: true,
    projects_are_navigable: true, // ← 3 livelli
  },
  {
    slug: "ricerca-terminati",
    title: "Progetti di ricerca terminati",
    intro_text:
      "<p>Le nostre prime ricerche sono datate alla fine degli anni Novanta, volte all'indagine di varie tipologie di territorio per censire le specie presenti, i fattori di minaccia e le misure di conservazione necessarie per la tutela dei siti da salvaguardare.<br><br>Dal 2013 al 2018 è stato svolto il monitoraggio dell'avifauna delle <strong>Zone di Protezione Speciale dei &ldquo;Canneti del Lago Maggiore&rdquo;</strong>, un sistema di aree umide che fa parte della rete europea Rete Natura 2000, per la raccolta di dati scientifici fondamentali per supportare le istituzioni locali nella pianificazione di strategie di gestione e conservazione ambientale.In concomitanza con questo monitoraggio il G.I.O. ha partecipato al progetto <strong>LIFE NetProNet</strong> presso la ZPS &ldquo;Canneti del Lago Maggiore&rdquo;. Questa importante iniziativa di conservazione si è basata sul coinvolgimento attivo del volontariato, è stata strutturata attraverso 18 Gruppi Locali di Conservazione (GLC) distribuiti su tutto il territorio nazionale sotto la guida della LIPU.<br>Nel 2024/2025 il G.I.O. ha preso parte al Progetto <strong>Canneti in Rete</strong> promosso dalla Provincia di Varese insieme ai comuni di Angera, Besozzo, Brebbia, Ispra, Monvalle, Ranco e Sesto Calende per l'attività di monitoraggio dell'avifauna nei canneti e nelle zone umide del basso Lago Maggiore al fine di monitorare, preservare e valorizzare la biodiversità della ZPS dei &ldquo;Canneti del Lago Maggiore&rdquo;.<br>I risultati della ricerca sono consultabili al sito <a href='https://www.cannetinrete.it/' class='specific-link' target='_blank'>cannetinrete</a>.<br><br>Il periodo di chiusura forzata per la pandemia nel 2020 è stata l'occasione per fare un'attività di monitoraggio dell'avifauna urbana tra Varese e Como, che ha preso il nome di &ldquo;Visti da casa&rdquo;. I risultati sono stati pubblicati sul n. 1 - 2021 del Bollettino Ornitologico Lombardo.<br><br>Tra il 2021 e il 2022 è stato svolto il monitoraggio <strong>&ldquo;Mosaici agricoli&rdquo;</strong>, raccogliendo dati dell'avifauna negli agro-ecosistemi della Lombardia nord-occidentale, in 4 province lombarde (Varese, Como, Monza, Lecco). I risultati sono stati pubblicati sul n. 1 - 2024 del Bollettino Ornitologico Lombardo.<br><br>&Egrave; stato realizzato un monitoraggio del <strong>roost di Nibbio bruno</strong> (Milvus migrans) sul lago di Varese nel periodo 2019-2020. I risultati sono stati pubblicati sul n. 2 - 2020 del Bollettino Ornitologico Lombardo.<br><br>Diverse ricerche scientifiche sono state intraprese per documentare l'insediamento di popolazioni di <strong>specie in espansione</strong> sul territorio e per le <strong>prime riproduzioni</strong>, come nel caso dello Smergo maggiore (Mergus merganser) dal 2010 al 2017, dell'Assiolo (Otus scops) nel 2010/2011, del Gufo reale (Bubo bubo) risultati pubblicati sul n. 2 - 2021 del Bollettino Ornitologico Lombardo, della Colombella (Columba oenas) risultati pubblicati sul n. 2 - 2020 del Bollettino Ornitologico Lombardo, del Nibbio reale (Milvus milvus) risultati pubblicati sul n. 1 - 2023 del Bollettino Ornitologico Lombardo.<br><br>Attraverso monitoraggi negli habitat boschivi della provincia di Varese negli anni 2008/2009 è stato effettuato un <strong>rapporto sui Piciformi</strong> con un approfondimento sul Picchio nero (Dryocopus martius) fino al 2012. Sono stati condotti censimenti mirati a individuare la <strong>popolazione di Civetta</strong> (Athene noctua) nella provincia nel periodo 2006/2008, mentre all'interno del <strong>Parco Pineta di Appiano Gentile e Tradate</strong> una ricerca del 2010 ha censito le popolazioni di Succiacapre (Caprimulgus europaeus), Gufo comune (Asio otus) e Falco pecchiaiolo (Pernis apivorus). Nello stesso parco nel 2019 il G.I.O. ha collaborato allo studio sulle abitudini ecologiche della <strong>Cincia dal ciuffo</strong> (Lophophanes cristatus) per il progetto organizzato dal Parco Pineta di Appiano Gentile e Tradate.<br><br>Nel 2025 la nostra associazione ha preso parte al censimento degli <strong>Habitat forestali delle Valli del Verbano</strong> in collaborazione con la Comunità Montana Valli del Verbano.</p>",
    intro_excerpt: "Gli studi e i progetti ormai conclusi.",
    image_path: "/images/progetti/progetti-terminati.webp",
    has_projects: true,
    projects_are_navigable: false, // ← 2 livelli, inline
  },
  {
    slug: "atlanti",
    title: "Atlanti Ornitologici",
    intro_text:
      "<p>Il G.I.O. nel corso degli anni si è dedicato a completare gli <strong>Atlanti Ornitologici</strong> per la provincia di Varese.</p>",
    intro_excerpt: "Gli atlanti di distribuzione delle specie.",
    image_path: "/images/progetti/atlanti.webp",
    has_projects: true,
    projects_are_navigable: true, // ← 3 livelli
  },
  {
    slug: "altri-lavori",
    title: "Altri Lavori",
    intro_text:
      "<p>Contributi, liste e materiali vari prodotti dai soci al di fuori dei progetti di ricerca principali.</p>",
    intro_excerpt: "Contributi, liste e materiali vari.",
    image_path: "/images/progetti/altri-lavori.webp",
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
    image_path: "/images/progetti/iwc-60.webp",
    intro:
      "<p>Il censimento internazionale degli uccelli acquatici è un progetto organizzato a livello continentale da Wetland International, in Italia è coordinato dall'ISPRA  (Istituto Superiore per la Protezione e la Ricerca Ambientale) mentre in Lombardia è curato dal Dipartimento di Biologia Animale dell'Università di Pavia.<br><br>Il G.I.O. ha compiuto il primo censimento degli uccelli acquatici svernanti in provincia di Varese nel 1986.<br>Questo censimento viene svolto nel mese di gennaio, quando le popolazioni dell'avifauna sono generalmente statiche sul territorio, con lo scopo di anticipare la migrazione pre-riproduttiva degli acquatici che stazionano in grandi stormi a latitudini più basse, al fine di:</p><ul class='specific-list'><li>stabilire annualmente la dimensione delle popolazioni presenti in gennaio</li><li>identificare le variazioni nella dimensione e nella distribuzione delle popolazioni</li><li>determinare l'importanza a livello internazionale e nazionale dei vari siti</li><li>contribuire agli sforzi internazionali per la conservazione degli uccelli acquatici e dei loro habitat</li></ul><p>Il principio cardine è la contemporaneità del censimento nelle varie aree geografiche, necessario per evitare conteggi multipli degli stessi individui.<br>In provincia di Varese Walter Guenzani (Socio G.I.O.) e Nicola Larroux (Consigliere G.I.O.) si occupano del coordinamento dei rilevatori e della trasmissione dei dati all'Università di Pavia che, a partire dal 2002, pubblica un resoconto annuale.<br><br>Le zone umide censite in provincia di Varese sono:<ul class='specific-list'><li>Lago Maggiore</li><li>Lago di Lugano</li><li>Lago di VBarese</li><li>Palude Brabbia con il coordinamento di LIPU</li><li>Lago di Monate</li><li>Lago di Comabbio</li><li>Il fiume Ticino tra Porto della Torre e Sesto Calende</li><li>Le vasche di laminazione di Lonate Pozzolo</li><li>Lago di Ganna</li><li>Lago di Ghirla</li></ul><p>Il Q1, il primo dei Quaderni del GIO è dedicato all'avifauna acquatica della provincia di Varese ed è basato sui censimenti internazionali IWC effettuati tra il 1986 e il 2010.<br><br>Nel 2025 il G.I.O. ha celebrato 40 anni di conteggio degli uccelli acquatici svernanti nelle zone umide della provincia di Varese, raccogliendo dati per un lungo periodo che testimoniano i grandi cambiamenti avvenuti.<br><br>La tabella seguente mostra le specie e il numero di individui censiti negli IWC della provincia di Varese dal 2011 al 2025.</p>",
    blocks: [
      {
        text: "",
        links: [
          {
            kind: "excel",
            label: "IWC totali al 2025",
            url: "/documents/progetti/iwc/iwc-totali-al-2025.xls",
          },
          {
            kind: "pdf",
            label: "15 anni di IWC",
            url: "/documents/progetti/iwc/15-anni-di-iwc.pdf",
          },
          {
            kind: "pdf",
            label: "20 anni di IWC",
            url: "/documents/progetti/iwc/20-anni-di-iwc.pdf",
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
    image_path: "/images/progetti/rondoni.webp",
    intro:
      "<p>Il G.I.O., tramite i propri volontari, studia i Rondoni su alcuni filoni di ricerca che possiamo elencare come segue:</p><ul class='specific-list'><li>Monitoraggio delle colonie riproduttive: per mezzo del progetto <strong>&ldquo;Sulle ali dei rondoni&rdquo;</strong> sono state censite tra il 2021 e il 2025 le colonie urbane delle tre specie presenti. La ricerca è stata estesa ad altre province lombarde grazie alla collaborazione con le sezioni LIPU di Bergamo, Como e Varese e l'associazione CROS Varenna, oltre ai gruppi locali Amici dei Rondoni Cislaghesi e Gruppo Rondoni Como</li><li>Mappatura delle strutture per uccelli (torri e pareti colombaie, passeraie e rondonaie). L'indagine al 2026 è realizzata in provincia di Varese e in collaborazione con NovaraBW e Stefano Costa nelle province di Novara, Biella e Vercelli</li><li>Studio della fenologia e del successo riproduttivo nelle colonie di Rondone comune accessibili al nido. Il monitoraggio continuativo presso i nidi, cui si aggiunge l'inanellamento a scopo scientifico affiancato da altre tipologie di indagine, permette di indagare alcuni ambiti della biologia e dell'ecologia della specie</li></ul>",
    blocks: [
      {
        text: "<p>Di seguito la documentazione PDF relativa al progetto</p>",
        links: [
          {
            kind: "pdf",
            label: "Passeraie, colombaie e rondonaie 2025",
            url: "/documents/progetti/swift/passeraie-colombaie-rondonaie-2025.pdf",
          },
          {
            kind: "pdf",
            label: "Bollettino Ornitologico Lombardo Vol.4, N.2 - 2022",
            url: "/documents/pubblicazioni/bol/2022/bol-v4-n2.pdf",
          },
          {
            kind: "pdf",
            label: "Bollettino Ornitologico Lombardo Vol.5, N.2 - 2023",
            url: "/documents/pubblicazioni/bol/2023/bol-v5-n2.pdf",
          },
        ],
      },
      {
        text: "<p>E qui i link agli articoli</p>",
        links: [
          {
            kind: "external",
            label: "Sulle Ali dei Rondoni",
            url: "https://www.researchgate.net/publication/373841511_Swifts_and_the_selection_of_urban_habitats_a_citizen_science_project_to_increase_the_ecological_knowledge_of_the_species_in_the_Bergamo_and_Varese_provinces",
          },
          {
            kind: "external",
            label:
              "Phenology and nest site fidelity in three Swift towers in the Lombardy region",
            url: "https://www.researchgate.net/publication/395475808_Phenology_and_nest_site_fidelity_in_three_Swift_towers_in_the_Lombardy_region",
          },
          {
            kind: "external",
            label:
              "First deployment of IoT tracking devices on Common swift Apus apus : a pilot study",
            url: "https://www.researchgate.net/publication/385817712_First_deployment_of_IoT_tracking_devices_on_Common_swift_Apus_apus_a_pilot_study",
          },
          {
            kind: "external",
            label:
              "Microfibers in the Diet of a Highly Aerial Bird, the Common Swift Apus apus",
            url: "https://www.researchgate.net/publication/381117363_Microfibers_in_the_Diet_of_a_Highly_Aerial_Bird_the_Common_Swift_Apus_apus",
          },
          {
            kind: "external",
            label:
              "Swift towers as open research lab: the experience of a network of nesting sites in NW Italy",
            url: "https://www.researchgate.net/publication/381116378_Swift_towers_as_open_research_lab_the_experience_of_a_network_of_nesting_sites_in_NW_Italy",
          },
          {
            kind: "external",
            label:
              "Swift and Sparrow towers in the provinces of Novara and Varese: census and evaluation for swifts' conservation",
            url: "https://www.researchgate.net/publication/381116456_SWIFT_AND_SPARROW_TOWERS_IN_THE_PROVINCES_OF_NOVARA_AND_VARESE_CENSUS_AND_EVALUATION_FOR_SWIFTS%27_CONSERVATION",
          },
          {
            kind: "external",
            label:
              "Swifts and the selection of urban habitats: a citizen science project to increase the ecological knowledge of the species in the Bergamo and Varese provinces",
            url: "https://www.researchgate.net/publication/373841511_Swifts_and_the_selection_of_urban_habitats_a_citizen_science_project_to_increase_the_ecological_knowledge_of_the_species_in_the_Bergamo_and_Varese_provinces",
          },
          {
            kind: "external",
            label: "Site and nest fidelity in the Common swift (Apus apus)",
            url: "https://www.researchgate.net/publication/373841356_Site_and_nest_fidelity_in_the_Common_swift_Apus_apus",
          },
          {
            kind: "external",
            label:
              "Swift and Sparrow towers in the Province of Varese: census, evaluation and use in the conservation and study of synanthropic species",
            url: "https://www.researchgate.net/publication/373841491_Swift_and_Sparrow_towers_in_the_Province_of_Varese_census_evaluation_and_use_in_the_conservation_and_study_of_synanthropic_species",
          },
          {
            kind: "external",
            label:
              "Onset of primary moult in immature and breeding adult Common Swifts Apus apus",
            url: "https://www.researchgate.net/publication/362902082_Onset_of_primary_moult_in_immature_and_breeding_adult_Common_Swifts_Apus_apus",
          },
          {
            kind: "external",
            label:
              "Which urban habitats are selected by Swifts? A citizen science program to answer the question in provinces of Varese and Bergamo, Italy",
            url: "https://www.researchgate.net/publication/361224473_Which_urban_habitats_are_selected_by_Swifts_A_citizen_science_program_to_answer_the_question_in_provinces_of_Varese_and_Bergamo_Italy",
          },
          {
            kind: "external",
            label:
              "Birds tower and walls: three successful examples of rehabilitation in province of Varese, Italy",
            url: "https://www.researchgate.net/publication/360933043_Birds_tower_and_walls_three_successful_examples_of_rehabilitation_in_province_of_Varese_Italy",
          },
          {
            kind: "external",
            label:
              "Breeding phenology, reproductive success and survival of Common Swift (Apus apus) from a Northern Italian colony",
            url: "https://www.researchgate.net/publication/359392735_Breeding_phenology_reproductive_success_and_survival_of_Common_Swift_Apus_apus_from_a_Northern_Italian_colony",
          },
          {
            kind: "external",
            label:
              "Studio preliminare della fenologia e del successo riproduttivo in una colonia di rondone comune (Apus apus) a Jerago con Orago (VA)",
            url: "https://www.researchgate.net/publication/336837067_Studio_preliminare_della_fenologia_e_del_successo_riproduttivo_in_una_colonia_di_rondone_comune_Apus_apus_a_Jerago_con_Orago_VA",
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
    image_path: "/images/progetti/brebbia.webp",
    intro:
      "<p>I &ldquo;Campi di Brebbia&rdquo; sono un'area agricolo-forestale di circa 0,88 km2 posta tra i comuni di Brebbia e Travedona-Monate in provincia di Varese. Nonostante la loro ridotta superficie, i Campi rappresentano un importante sito di stop-over per l'avifauna in migrazione nella provincia di Varese, con un totale di 177 specie di uccelli osservate tra il 2017 e il 2024, molte delle quali rare e/o di elevato interesse conservazionistico. Tra queste figurano specie in declino tipiche degli agroecosistemi, come l'Allodola (Alauda arvensis), la Cutrettola (Motacilla flava) e l'Averla Piccola (Lanius collurio).<br><br>Il G.I.O. ha analizzato la comunità ornitica dell'area mediante una ricerca mirata svolta tra 2024 e 2025 mediante metodi standardizzati, che ha permesso di segnalare due specie mai osservate nel sito: Pendolino (Remiz pendulinus) e Folaga (Fulica atra) e di quantificare i flussi migratori e le relazioni che questi hanno con le colture presenti.<br><br>I risultati della ricerca sono stati divulgati sotto forma di poster al XXII Convegno di Italiano di Ornitologia a Lecce a settembre 2025; verranno utilizzati anche come base per futuri interventi di valorizzazione ecologica dell'area in accordo con le aziende agricole che la utilizzano e le amministrazioni dei comuni coinvolti.</p>",
    blocks: [
      {
        text: "<p>Qui il link all'articolo</p>",
        links: [
          {
            kind: "external",
            label:
              "Campi di Brebbia (Varese, Italy): a crucial stopover and wintering site for birds",
            url: "https://www.researchgate.net/publication/395700300_Campi_di_Brebbia_Varese_Italy_a_crucial_stopover_and_wintering_site_for_birds",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    section_slug: "ricerca-in-corso",
    slug: "succiacapre",
    title: "Monitoraggio del Succiacapre",
    image_path: "/images/progetti/succiacapre.webp",
    intro:
      "<p>Sta seguendo il progetto Silvio Cova per la sua tesi di laurea, supportato da Walter Guenzani. In collaborazione con Alessandro Berlusconi (Università di Milano) e il Parco del Campo dei Fiori (collaborazione di Elisa Scancarello e le GEV del Parco).</p>",
    blocks: [
      {
        text: "<p>PDF della ricerca</p>",
        links: [
          {
            kind: "pdf",
            label: "Succiacapre",
            url: "/documents/progetti/succiacapre/presentazione-succiacapre-walter.pdf",
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
    image_path: "/images/progetti/brabbia.webp",
    intro: "<p>Seguito da Luca Giussani.</p>",
    blocks: [
      {
        text: "<p>PDF del progetto</p>",
        links: [
          {
            kind: "pdf",
            label: "",
            url: "",
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
    image_path: "/images/progetti/garzaie.webp",
    intro:
      "<p>Dal 2016 il G.I.O. partecipa con alcuni soci  al monitoraggio di alcune garzaie provinciali, contribuendo alla raccolta dati per Garzaie d'Italia, un progetto scientifico di lungo periodo che consiste nel contare e studiare le colonie di aironi e altri uccelli acquatici in Italia per studiare l'andamento delle popolazioni di uccelli nel tempo, capire lo stato di salute degli ecosistemi umidi e sostenere azioni di conservazione e tutela della biodiversità.</p>",
    blocks: [
      {
        text: "<p>PDF del progetto</p>",
        links: [
          {
            kind: "pdf",
            label: "",
            url: "",
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
    image_path: "/images/progetti/.webp",
    intro:
      "<p>Il nuovo atlante dei nidificanti, progetto pluriennale di mappatura sistematica delle specie che si riproducono in provincia.</p>",
    blocks: [
      {
        text: "<p>Documentazione e materiali del progetto atlante.</p>",
        links: [
          {
            kind: "pdf",
            label: "Presentazione dell'Atlante",
            url: "/documents/progetti/atlante/descrizione-atlante-uccelli-nidificanti-varese-2024-2026.pdf",
          },
          {
            kind: "pdf",
            label: "Rapporto Atlante 2024",
            url: "/documents/progetti/atlante/2024/rapporto-atlante-2024.pdf",
          },
          {
            kind: "pdf",
            label: "Rapporto Atlante 2024-2025",
            url: "/documents/progetti/atlante/2024-2025/atlante-varese-2024-2025.pdf",
          },
          {
            kind: "pdf",
            label: "Rapporto Atlante 2025",
            url: "/documents/progetti/atlante/2025/atlante-varese-2025.pdf",
          },
        ],
      },
    ],
  },

  // ── Ricerca terminati (inline) ────────────────────────
  {
    id: 20,
    section_slug: "ricerca-terminati",
    slug: "avifauna-1999-2000",
    title: "Avifauna zone umide provincia di Varese 1999-2000",
    blocks: [
      {
        text: "",
        links: [
          {
            kind: "pdf",
            label: "PDF del progetto",
            url: "/documents/progetti/avifauna-zone-umide-1999-2000.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 21,
    section_slug: "ricerca-terminati",
    slug: "bosco-igrofilo-1999-2001",
    title: "Comunità Ornitica Bosco Igrofilo Lago di Varese 1999-2001",
    blocks: [
      {
        text: "",
        links: [
          {
            kind: "pdf",
            label: "PDF del progetto",
            url: "/documents/progetti/monitoraggio-comunita-ornitica-bosco-igrofilo-1999-2001.pdf",
          },
          {
            kind: "external",
            label: "Link al sito",
            url: "https://sisn.pagepress.org/rio/article/view/127/121",
          },
        ],
      },
    ],
  },
  {
    id: 22,
    section_slug: "ricerca-terminati",
    slug: "smergo-maggiore-2000-2014",
    title: "Smergo maggiore Lago Maggiore 2000-2014",
    blocks: [
      {
        text: "",
        links: [
          {
            kind: "pdf",
            label: "PDF del progetto",
            url: "/documents/progetti/spread-of-the-goosander-population-in-north-western-italy-2000-2014.pdf",
          },
          {
            kind: "external",
            label: "Link al sito",
            url: "https://www.avocetta.org/articles/vol-nv-the-goosander-imergus-merganseri-breeding-population-expansion-and-trend-in-north-western-italy/",
          },
        ],
      },
    ],
  },
  {
    id: 23,
    section_slug: "ricerca-terminati",
    slug: "avifauna-brughiere-lombardia-2002",
    title: "Avifauna nidificante brughiere Lombardia occidentale 2002",
    blocks: [
      {
        text: "",
        links: [
          {
            kind: "pdf",
            label: "PDF del progetto",
            url: "/documents/progetti/avifauna-brughiere-lombardia-occidentale-2002.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 24,
    section_slug: "ricerca-terminati",
    slug: "piciformes-varese-2009",
    title: "Piciformes provincia di Varese 2008-2009",
    blocks: [
      {
        text: "",
        links: [
          {
            kind: "external",
            label: "Link al sito",
            url: "https://gruppoinsubrico.com/progetti/rapporto-sui-piciformes-della-provincia-di-varese-dal-crollo-della-popolazione-del-torcicollo-all-espansione-territoriale-del-picchio-nero/",
          },
        ],
      },
    ],
  },

  // ── Atlanti ornitologici (inline) ─────────────────────
  {
    id: 30,
    section_slug: "atlanti",
    slug: "atlanti",
    title:
      "Atlante Ornitologico Georeferenziato degli uccelli nidificanti 2003-2005 della provincia di Varese",
    intro:
      "<p>Negli anni 2003-2005 è stato ultimato il primo <strong>Atlante Ornitologico Georeferenziato degli uccelli nidificanti</strong> della provincia di Varese in collaborazione con l'Università dell'Insubria di Varese. Grazie a questo straordinario sforzo di ricerca, le specie censite nell'Atlante sono state complessivamente 125.<br><br>L'Atlante Ornitologico Georeferenziato 2003/2005 è stato il primo Atlante italiano con dati georeferenziati: oltre a indicare la certezza o la probabilità della nidificazione, che sono la base dell'atlante, sono state aggiunte altre informazioni più “raffinate” come altitudine e habitat, suddivisi in più di 30 classi di copertura del suolo, si è calcolato un indice di frequenza delle specie, si è elaborata una distribuzione temporale delle specie, si è riepilogato lo status di conservazione/giuridico di ogni uccello (Liste Rosse, Spec e varie Convenzioni, Leggi ecc.).<br><br>Una particolarità di questo Atlante è stata la presenza di tre “pagine” in carta pergamena allegate al volume che possono essere posizionate sulle cartine della distribuzione delle singole specie, in modo da illustrare in modo molto chiaro le seguenti informazioni:</p><ul class='specific-list'><li>Fasce altimetriche con equidistanza di 200 metri</li><li>Classi habitat in diversi colori che corrispondono ai seguenti 8 maxi habitat: Boschi di latifoglie (L), Boschi di conifere (C), Boscaglie e arbusteti (B), Vegetazione erbacea (E), Agroecosistemi (A), Corpi d'acqua e zone ripariali (Q), Aree sterili (S), Aree urbane (U).</li><li>Diversità degli habitat suddivisa in cinque percentuali, ognuna con un suo colore, ovvero: Diversità scarsa (meno 0,5), Diversità bassa (da 0,5 a 1), Diversità media (da 1 a1,5), Diversità elevata (da 1,5 a 2), Diversità molto elevata (da 2 a 2,5).</li></ul><p>Un altro elemento di rilievo è la presenza nelle pagine finali dell'Atlante di una serie di immagini che rappresentano habitat caratteristici del territorio della provincia di Varese.</p>",
    blocks: [
      {
        text: "",
        links: [],
      },
    ],
  },
  {
    id: 31,
    section_slug: "atlanti",
    slug: "atlante-nidificanti-2024-2026",
    title: "Atlante Uccelli Nidificanti in Provincia di Varese 2024-2026",
    intro:
      "<p>In ordine cronologico l'ultimo a cui il G.I.O. sta lavorando è il nuovo Atlante dell'Avifauna Nidificante, denominato Atlante degli Uccelli Nidificanti in Provincia di Varese, che farà il punto della situazione 20 anni dopo l'inizio della precedente indagine, l'Atlante Ornitologico Georeferenziato della Provincia di Varese. Uccelli Nidificanti 2003-2005 (Gagliardi et al., 2007), iniziata nel 2003.<br><br>Risulta evidente la necessità di disporre di nuove e più dettagliate informazioni sulla distribuzione, consistenza e status delle specie, per meglio definire la caratterizzazione faunistica del territorio con dati realmente aggiornati, che possano tenere conto dei rapidi mutamenti sull'uso del suolo e climatici che impattano in primo luogo sulla biodiversità.Il progetto si appoggerà alla piattaforma <a href='https://www.ornitho.it/' class='specific-link' target='_blank'>Ornitho</a>, anche attraverso l'app NaturaList, permettendo di facilitare la raccolta e la gestione dei dati.<br><br>Obiettivo finale del progetto è quello di rendere disponibili i dati raccolti, in forma cartacea e su supporto elettronico, per un utilizzo sia in termini scientifici sia gestionali da parte degli enti a vario titolo coinvolti nella conservazione e gestione della fauna e dell'ambiente. Il progetto avrà indicativamente durata triennale, dal 2024 al 2026, con un eventuale quarto anno di rilevamento dedicato a un gruppo di specie che rivestono particolare importanza (conservazionistica o distributiva) a livello provinciale, oppure che sono di difficile contattabilità con i metodi di rilevamento standard diurni o, ancora, perché coloniali. Il periodo delle indagini di campo sarà centrato principalmente sulla stagione riproduttiva primaverile/estiva, spaziando per alcune specie al di fuori di questo periodo.<br><br>La distribuzione delle specie sarà restituita su una griglia cartografica di 5x5 km (le Particelle, Figura 1), con griglia chilometrica UTM coincidente con la Carta Tecnica Regionale 1:10.000 della Regione Lombardia. Altre elaborazioni, per le preferenze ambientali delle specie, saranno ricavate dalle caratteristiche topografiche e dagli habitat dei relativi chilometri quadrati indagati (“celle UTM”), compatibilmente con i risultati raccolti.Per motivi pratici e di continuità, che dal 2009 ci permettono di caricare e analizzare i dati delle osservazioni personali e delle ricerche ornitologiche con grande efficienza, per partecipare a questo progetto i rilevatori dovranno essere iscritti alla piattaforma <a href='https://www.ornitho.it/' class='specific-link' target='_blank'>Ornitho</a>.<br><br>Punto importante di un progetto Atlante è quello di esaminare tutti gli ambienti presenti in provincia, dai boschi alle aree urbanizzate, dai coltivi alle zone umide, soprattutto al di fuori delle aree comunemente esplorate.</p>",
    blocks: [
      {
        text: "",
        links: [],
      },
    ],
  },
  {
    id: 32,
    section_slug: "atlanti",
    slug: "uiva",
    title: "UIVA - Uccelli in Inverno Varese 2018-2023",
    intro:
      "<p>Il progetto di monitoraggio su presenza e distribuzione degli uccelli in periodo invernale sul territorio provinciale si è concluso il 31 gennaio 2023.<br>Dal 2018, nei mesi di dicembre e gennaio, i soci GIO e molti altri collaboratori, afferenti alla piattaforma <a href='https://www.ornitho.it/' class='specific-link' target='_blank'>Ornitho</a>, hanno scandagliato gli ambienti provinciali per raccogliere informazioni sulla distribuzione delle specie.<br>Il territorio provinciale è stato suddiviso in 70 unità cartografiche di rilevamento di 5x5 km (particelle): dal confine svizzero a nord, fino alla pianura confinante con la provincia di Milano e Como.<br>Con circa 60.000 dati utili, sono state censite in totale 159 specie: le particelle con la maggiore ricchezza (numero di specie) si trovano nella parte centrale della provincia, tra il lago Maggiore ed il lago di Varese, dove sono più diffusi e numerosi gli uccelli acquatici.<br><br>L'intervallo di variazione della ricchezza è stato compreso tra 26 e 109 specie: il numero maggiore è legato alle particelle con ambiente eterogeneo situate alle quote più basse, mentre le aree montuose con ampia copertura forestale ospitano meno specie. Le aree urbanizzate residenziali, con la presenza di parchi urbani, giardini e orti, permettono a molte specie cosiddette “sinantropiche” la sopravvivenza in periodo invernale.<br><br>Tra le rarità segnaliamo: Strolaga maggiore (Gavia immer), Fenicottero (Phoenicopterusroseus), Voltapietre (Arenaria interpres), Magnanina comune (Sylvia undata), Luì forestiero (Phylloscopus inornatus), Zigolo della Lapponia (Calcarius lapponicus), Zigolo delle nevi (Plectrophenax nivalis), Zigolo golarossa (Emberiza leucocephalos) e Zigolo minore (Emberiza pusilla).</p>",
    blocks: [
      {
        text: "",
        links: [],
      },
    ],
  },

  // ── Altri lavori (inline) ─────────────────────────────
  {
    id: 40,
    section_slug: "altri-lavori",
    slug: "milo-manica-research-gate",
    title: "Milo Manica su Research Gate",
    intro:
      "<p>Il profilo di Milo Manica su Research Gate, con tutte le sue pubblicazioni.</p>",
    blocks: [
      {
        text: "",
        links: [
          {
            kind: "external",
            label: "Milo Manica su Research Gate",
            url: "https://www.researchgate.net/profile/Milo-Manica",
          },
        ],
      },
    ],
  },
  {
    id: 41,
    section_slug: "altri-lavori",
    slug: "articoli-roberto-aletti",
    title: "Roberto Aletti",
    blocks: [
      {
        text: "<p>Tutti gli articoli pubblicati da Roberto Aletti</p>",
        links: [
          {
            kind: "pdf",
            label: "Articoli di Roberto",
            url: "/documents/progetti/vari/articoli-roberto-aletti.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 42,
    section_slug: "altri-lavori",
    slug: "corriere-piccolo",
    title: "Il Corriere Piccolo",
    blocks: [
      {
        text: "<p>Il resoconto sul Corriere piccolo</p>",
        links: [
          {
            kind: "pdf",
            label: "Corriere piccolo",
            url: "/documents/progetti/vari/corriere-piccolo.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 43,
    section_slug: "altri-lavori",
    slug: "averla-piccola",
    title: "L'Averla Piccola",
    blocks: [
      {
        text: "<p>Il resoconto sull'Averla piccola</p>",
        links: [
          {
            kind: "pdf",
            label: "Averla piccola",
            url: "/documents/progetti/vari/averla-piccola.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 44,
    section_slug: "altri-lavori",
    slug: "tringa",
    title: "La Tringa",
    blocks: [
      {
        text: "<p>Il resoconto sulla migrazione della Tringa</p>",
        links: [
          {
            kind: "external",
            label: "Tringa",
            url: "https://sisn.pagepress.org/index.php/rio/article/view/369",
          },
        ],
      },
    ],
  },
  {
    id: 45,
    section_slug: "altri-lavori",
    slug: "schiribilla-voltolino",
    title: "La Schiribilla ed il Voltolino",
    blocks: [
      {
        text: "<p>Il resoconto sulla Schiribilla ed il Voltolino</p>",
        links: [
          {
            kind: "pdf",
            label: "Schiribilla e Voltolino",
            url: "/documents/progetti/vari/schiribilla-voltolino.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 46,
    section_slug: "altri-lavori",
    slug: "limicoli-fiume-tresa",
    title: "I Limicoli della foce del fiume Tresa",
    blocks: [
      {
        text: "<p>Il resoconto sui Limicoli della foce del fiume Tresa</p>",
        links: [
          {
            kind: "pdf",
            label: "Limicoli al fiume Tresa",
            url: "/documents/progetti/vari/limicoli-fiume-tresa.pdf",
          },
        ],
      },
    ],
  },
  {
    id: 47,
    section_slug: "altri-lavori",
    slug: "svernamento-nidificazione-varese",
    title: "Dallo svernamento alla nidificazione sul lago di Varese",
    blocks: [
      {
        text: "<p>Il resoconto sullo svernamento e la nidificazione sul lago di Varese</p>",
        links: [
          {
            kind: "pdf",
            label: "Dallo svernamento alla nidificazione",
            url: "/documents/progetti/vari/svernamento-nidificazione-varese.pdf",
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
