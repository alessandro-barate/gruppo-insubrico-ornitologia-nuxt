// /data/carousel.js
// Dati mock - in futuro sostituiti da chiamata API al backend Laravel.
// Campi:
//   slug         -> URL della pagina di dettaglio (/news/[slug])
//   body         -> testo completo mostrato nel dettaglio
//   pdf          -> allegato PDF opzionale (bottone nel dettaglio) o null
//   externalLink -> link a sito esterno opzionale (bottone nel dettaglio) o null

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
    pdf: null,
    externalLink: null,
    date: "2025-01-20",
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
    pdf: null,
    externalLink: "https://www.gruppoinsubrico.com/iscrizioni",
    date: "2025-01-15",
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
    pdf: "/documenti/rivista-gio-autunno-2025.pdf",
    externalLink: null,
    date: "2025-01-10",
  },
  {
    id: 4,
    slug: "escursione-ticino-uccelli-acquatici",
    category: "Escursioni",
    title: "Parco del Ticino. Uccelli acquatici svernanti.",
    excerpt:
      "Domenica 2 febbraio escursione guidata alla scoperta degli uccelli acquatici svernanti.",
    body: "Domenica 2 febbraio ti aspettiamo per un'escursione guidata lungo il Parco del Ticino, alla scoperta degli uccelli acquatici svernanti. Accompagnati dalle nostre guide, percorreremo i sentieri che costeggiano le zone umide più ricche di avifauna, con soste dedicate all'osservazione di anatidi, aironi e limicoli. L'uscita è adatta anche alle famiglie. Si raccomanda abbigliamento caldo e, se disponibile, un binocolo personale.",
    image: "/images/carousel/bird-1.webp",
    pdf: null,
    externalLink: null,
    date: "2025-01-05",
  },
];
