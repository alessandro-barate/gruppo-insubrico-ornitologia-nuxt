// /data/carousel.js
// Dati mock - in futuro sostituiti da chiamata API al backend Laravel.
// Campi:
//   slug         -> URL della pagina di dettaglio (/news/[slug]). DEVE essere UNICO.
//   category     -> categoria mostrata come etichetta
//   body         -> testo completo mostrato nel dettaglio
//   image        -> immagine di copertina
//   date         -> data in formato ISO 'AAAA-MM-GG'
//   attachments  -> array di allegati e link (può essere vuoto). Ogni voce:
//                     type  -> "pdf" | "word" | "excel" | "powerpoint" | "external"
//                     label -> etichetta descrittiva mostrata sul bottone
//                     url   -> percorso del file oppure URL del sito esterno

export default [
  {
    id: 1,
    slug: "censimento-avifauna-2025",
    category: "Monitoraggio",
    title: "Censimento Avifauna 2025. I risultati del progetto.",
    excerpt:
      "Scopri i risultati del censimento annuale delle specie nidificanti nella regione insubrica.",
    body: "Il censimento annuale dell'avifauna nidificante nella regione insubrica si è concluso con risultati significativi. Nel corso della stagione i nostri volontari hanno monitorato decine di siti, registrando la presenza di specie di particolare interesse conservazionistico. I dati raccolti confermano alcune tendenze positive per le popolazioni acquatiche, a fronte di una lieve flessione per le specie legate agli ambienti agricoli. Il rapporto completo è disponibile su richiesta presso la nostra sede.",
    image: "/images/carousel/bird-1.webp",
    date: "2025-01-20",
    attachments: [
      {
        type: "pdf",
        label: "Rapporto completo del censimento",
        url: "/documenti/censimento-avifauna-2025.pdf",
      },
      {
        type: "excel",
        label: "Dati grezzi per sito",
        url: "/documenti/censimento-avifauna-2025-dati.xlsx",
      },
    ],
  },
  {
    id: 2,
    slug: "corso-birdwatching-2025",
    category: "Eventi",
    title: "Corso di Birdwatching. Aperte le iscrizioni.",
    excerpt:
      "Aperte le iscrizioni al corso base di birdwatching per principianti. Posti limitati!",
    body: "Sono aperte le iscrizioni al corso base di birdwatching pensato per chi si avvicina per la prima volta all'osservazione degli uccelli. Il corso si articola in incontri teorici serali e uscite sul campo nei fine settimana, durante le quali imparerai a riconoscere le specie più comuni, a usare correttamente binocolo e cannocchiale e a comportarti nel rispetto della fauna. I posti sono limitati: ti consigliamo di iscriverti quanto prima.",
    image: "/images/carousel/bird-2.jpg",
    date: "2025-01-15",
    attachments: [
      {
        type: "word",
        label: "Modulo di iscrizione",
        url: "/documenti/modulo-iscrizione-corso.docx",
      },
      {
        type: "external",
        label: "Vai alla pagina di iscrizione",
        url: "https://www.gruppoinsubrico.com/iscrizioni",
      },
    ],
  },
  {
    id: 3,
    slug: "rivista-gio-nuovo-numero",
    category: "Pubblicazioni",
    title: "La rivista del GIO. Nuovo numero disponibile.",
    excerpt:
      "È disponibile il nuovo numero della rivista con focus sulle migrazioni autunnali.",
    body: "È uscito il nuovo numero della rivista del Gruppo Insubrico di Ornitologia, dedicato in gran parte alle migrazioni autunnali. All'interno trovi articoli sui principali flussi migratori osservati nella nostra area, approfondimenti sulle tecniche di inanellamento e i consueti resoconti delle attività sociali. La rivista è distribuita ai soci ed è consultabile presso la sede.",
    image: "/images/carousel/bird-3.jpg",
    date: "2025-01-10",
    attachments: [
      {
        type: "pdf",
        label: "Rivista GIO - Autunno 2025",
        url: "/documenti/rivista-gio-autunno-2025.pdf",
      },
    ],
  },
  {
    id: 4,
    slug: "escursione-ticino-febbraio-2025",
    category: "Escursioni",
    title: "Parco del Ticino. Uccelli acquatici svernanti.",
    excerpt:
      "Domenica 2 febbraio escursione guidata alla scoperta degli uccelli acquatici svernanti.",
    body: "Domenica 2 febbraio ti aspettiamo per un'escursione guidata lungo il Parco del Ticino, alla scoperta degli uccelli acquatici svernanti. Accompagnati dalle nostre guide, percorreremo i sentieri che costeggiano le zone umide più ricche di avifauna, con soste dedicate all'osservazione di anatidi, aironi e limicoli. L'uscita è adatta anche alle famiglie. Si raccomanda abbigliamento caldo e, se disponibile, un binocolo personale.",
    image: "/images/carousel/bird-1.webp",
    date: "2025-01-05",
    attachments: [
      {
        type: "powerpoint",
        label: "Presentazione delle specie svernanti",
        url: "/documenti/specie-svernanti-ticino.pptx",
      },
    ],
  },
  {
    id: 5,
    slug: "escursione-campo-fiori-marzo-2025",
    category: "Escursioni",
    title: "Parco Campo dei Fiori. Migrazione primaverile.",
    excerpt:
      "A marzo un'uscita dedicata all'osservazione dei migratori di ritorno sul Campo dei Fiori.",
    body: "In marzo torniamo sul Parco Campo dei Fiori per osservare i primi migratori di ritorno. Un'occasione per seguire il risveglio primaverile dell'avifauna di collina e di montagna, tra rapaci in migrazione e passeriformi nei boschi. L'escursione prevede un dislivello moderato ed è adatta a chi ha già una minima esperienza di camminata.",
    image: "/images/carousel/bird-1.webp",
    date: "2025-01-04",
    attachments: [],
  },
  {
    id: 6,
    slug: "giornata-uccelli-migratori-2025",
    category: "Eventi",
    title: "Giornata mondiale degli uccelli migratori.",
    excerpt:
      "Celebriamo insieme la giornata mondiale degli uccelli migratori con un evento aperto a tutti.",
    body: "Anche quest'anno celebriamo la Giornata mondiale degli uccelli migratori con un evento aperto a tutti. Una mattinata di osservazione sul campo seguita da un incontro divulgativo sulle rotte migratorie e sulle minacce che gli uccelli affrontano lungo il loro viaggio. Partecipazione libera e gratuita.",
    image: "/images/carousel/bird-1.webp",
    date: "2025-01-03",
    attachments: [],
  },
  {
    id: 7,
    slug: "inanellamento-autunnale-2024",
    category: "Monitoraggio",
    title: "Campagna di inanellamento autunnale.",
    excerpt:
      "I risultati della campagna di inanellamento condotta nella stazione ornitologica.",
    body: "Si è conclusa la campagna di inanellamento autunnale condotta presso la nostra stazione ornitologica. Nel corso delle settimane di attività sono stati inanellati numerosi individui appartenenti a diverse specie, fornendo dati preziosi su fenologia e consistenza dei flussi migratori. Ringraziamo tutti i volontari che hanno reso possibile il lavoro.",
    image: "/images/carousel/bird-1.webp",
    date: "2025-01-02",
    attachments: [
      {
        type: "excel",
        label: "Tabella degli inanellamenti",
        url: "/documenti/inanellamento-autunno-2024.xlsx",
      },
      {
        type: "pdf",
        label: "Relazione di sintesi",
        url: "/documenti/inanellamento-autunno-2024.pdf",
      },
    ],
  },
  {
    id: 8,
    slug: "convegno-annuale-2026",
    category: "Eventi",
    title: "Convegno annuale G.I.O. 2026.",
    excerpt:
      "La giornata di studio annuale del Gruppo, con relatori nazionali e internazionali.",
    body: "Torna il convegno annuale del Gruppo Insubrico di Ornitologia, giornata di studio con relatori nazionali e internazionali e sessioni dedicate alle ultime ricerche sul campo. Un momento di incontro e confronto per soci, ricercatori e appassionati. Il programma dettagliato e le modalità di partecipazione sono disponibili negli allegati.",
    image: "/images/carousel/bird-1.webp",
    date: "2025-01-01",
    attachments: [
      {
        type: "pdf",
        label: "Programma del convegno",
        url: "/documenti/convegno-2026-programma.pdf",
      },
      {
        type: "word",
        label: "Scheda di adesione",
        url: "/documenti/convegno-2026-adesione.docx",
      },
    ],
  },
];
