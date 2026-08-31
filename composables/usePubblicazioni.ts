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
  header_image?: string;
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
  // Quaderni
  {
    slug: "quaderni",
    title: "Quaderni",
    type: "group",
    intro_text:
      "<p>I Quaderni del G.I.O. sono pubblicazioni scientifiche curate dai soci del Gruppo, nate con l'obiettivo di raccogliere e divulgare i risultati delle ricerche ornitologiche condotte sul territorio.<br>Si tratta di volumi cartacei che si possono ricevere tramite una donazione minima al G.I.O. OdV (gli importi sono comprensivi di eventuali spese di spedizione): le copie possono anche ritirate personalmente.<br><br>Per tutte le informazioni, le richieste per ricevere delle copie e le modalità di pagamento contattateci tramite il nostro <a href='/form' class='specific-link' target='_blank'>form di contatto</a>.</p><br><ul class='specific-list'><li><strong>Quaderno 4/2022</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 18</strong> cadauno</li></ul><p>Sempre disponibili anche gli altri Quaderni del G.I.O.:</p><ul class='specific-list'><li><strong>Quaderno 3/2018</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 15</strong> cadauno</li><li><strong>Quaderno 2/2015</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 8</strong> cadauno</li><li><strong>Quaderno 1/2012</strong> <em>Gli Uccelli del Lago Maggiore</em>: <strong>&euro; 5</strong> cadauno</li></ul><p><strong>Donazione minima per serie:</strong></p><ul class='specific-list'><li>Intera collana - Quaderni 1/2/3/4: <strong>&euro; 35</strong></li><li>Quaderni 1/2/4, oppure 1/3/4, oppure 2/3/4: <strong>&euro; 30</strong></li><li>Quaderni 1/2/3: <strong>&euro; 25</strong></li></ul><p><strong>Dati per bonifici:</strong><br>Gruppo Insubrico di Ornitologia<br>IBAN: IT13A0569650240000020568X10<br>Causale: NOME e COGNOME, donazione/Quaderno (specificare quale/quali) n° X copie</p></p>",
    intro_excerpt: "Studi monografici e approfondimenti tematici.",
    image_path: "/images/pubblicazioni/cards/quaderni.jpg",
    children: [
      {
        slug: "quaderno-5-2026",
        title: "Quaderno 5/2026 - Rondoni",
        type: "detail",
        intro_excerpt: "I Rondoni.",
        image_path: "/images/pubblicazioni/quaderni/quaderno-5.webp",
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
    intro_text:
      "<p>Questa pubblicazione, esclusivamente online, nasce dall'incontro avvenuto nel settembre 2018 tra un numeroso gruppo di ornitologi e naturalisti lombardi, attivi da molti anni sul campo sia come volontari sia come professionisti.<br><br>Durante la riunione di settembre, organizzata presso il Museo Caffi di Bergamo grazie alla disponibilità del Direttore, dott. Marco Valle, sono state gettate le basi di questo progetto. L'idea è nata da una semplice considerazione: la necessità di disporre di un “bollettino” di facile consultazione, accessibile online a tutti gli interessati, capace di raccogliere contributi di carattere faunistico riferiti principalmente alla Lombardia, ma con uno sguardo esteso anche all'Italia settentrionale.<br>Il Bollettino si è proposto di accogliere quei lavori che difficilmente trovano spazio nelle riviste nazionali, generalmente orientate verso progetti di più ampio respiro.<br><br>Considerata l'enorme quantità di dati condivisi su piattaforme come Ornitho.it, è emersa con evidenza l'esigenza di elaborare e diffondere sintesi riguardanti aspetti quali la fenologia, la distribuzione geografica e la selezione dell'habitat delle specie, oltre alla necessità di aggiornare costantemente le conoscenze sull'avifauna legata alle aree protette: riserve naturali, parchi regionali, PLIS e, in particolare, la Rete Natura 2000.<br><br>Un elemento fondamentale di questa iniziativa è stato il tentativo di riunire, attorno a un progetto comune, i numerosi gruppi - per lo più amatoriali - attivi nelle diverse province lombarde, finora privi di un coordinamento diretto e di una rappresentanza condivisa. Su proposta di Pierandrea Brichetti, già durante l'incontro del settembre 2018 è stato costituito un primo coordinamento tra gruppi, composto da sei realtà provinciali. Tale struttura è stata aperta a tutti coloro che desideravano aderire, contribuendo attivamente al progetto. Ogni gruppo è stato rappresentato all'interno del Bollettino da un referente, incaricato di raccogliere materiale da pubblicare e di proporre eventuali attività di censimento o monitoraggio su scala regionale o pluriprovinciale.<br><br>Il Bollettino Ornitologico Lombardo è stato pubblicato sulla piattaforma Ornitho.it grazie al supporto di Roberto Lardelli e del Gruppo di Conduzione. Questa collaborazione ha consentito di ampliare la diffusione dei contenuti anche oltre il contesto regionale.<br>L'obiettivo principale della pubblicazione è stato contribuire all'ampliamento delle conoscenze in un periodo caratterizzato da profondi cambiamenti e crescenti minacce agli ecosistemi.<br><br>I contributi sono stati inviati esclusivamente in formato elettronico via e-mail alla redazione, che ne ha valutato la pubblicazione secondo l'ordine cronologico di ricezione. Sono stati presi in considerazione diversi tipi di lavori, tra cui: articoli scientifici, brevi note, report di monitoraggi e censimenti, presentazioni di tesi, reportage fotografici, notizie, revisioni, recensioni librarie, resoconti di campagne di inanellamento, checklist locali, proposte di studio e altri contributi, purché redatti in lingua italiana.</p>",
    intro_excerpt: "Il bollettino periodico delle osservazioni.",
    header_image: "/images/pubblicazioni/bol/bol.webp",
    image_path: "/images/pubblicazioni/cards/bol.webp",
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
  // Paper
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
  // Liste
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
