// ─── TIPI (futura API Laravel) ──────────
// Definiti una volta sola e riusati in pagine e componenti.
// Le API Resources dovranno restituire esattamente questa forma.
//
// Struttura a 3 livelli di raggruppamento, tutti con titolo:
//   Categoria → Sottosezione → Gruppo → Link
// (le Categorie sono le chiavi di LinksByCategory qui sotto).

// LIVELLO 4 — il link vero e proprio (foglia: non contiene altro).
export interface LinkItem {
  title: string; // testo del link
  subtitle?: string; // descrizione opzionale sotto il titolo
  href: string; // URL di destinazione
}

// LIVELLO 3 — un gruppo di link con un proprio titolo.
export interface LinkGroup {
  title?: string;
  links: LinkItem[];
}

// LIVELLO 2 — una sottosezione: un titolo e i suoi gruppi.
// È resa come UNA colonna nel pannello della categoria.
export interface LinkSubsection {
  title: string;
  groups: LinkGroup[];
}

// LIVELLO 1 — le categorie. Ogni categoria è un array di sottosezioni.
// Le chiavi corrispondono a quelle usate in links.vue.
export interface LinksByCategory {
  portali: LinkSubsection[];
  organizzazioni: LinkSubsection[];
  reti: LinkSubsection[];
  turismo: LinkSubsection[];
}

// ─── MOCK DATA ───────────────────────────────────────────
// TODO: rimuovere quando il backend è pronto.
// La forma replica l'output atteso dalle API Resources Laravel.
const MOCK_LINKS: LinksByCategory = {
  portali: [
    {
      title: "Portali di osservazioni e citizen science",
      groups: [
        {
          links: [
            {
              title: "Ornitho Italia",
              subtitle:
                " - Principale piattaforma italiana per inserimento osservazioni, atlanti, monitoraggi e validazione dati",
              href: "https://www.ornitho.it/",
            },
            {
              title: "Ornitho Svizzera",
              subtitle: " - Equivalente svizzero di Ornitho Italia",
              href: "https://www.ornitho.ch/",
            },
            {
              title: "Euring",
              subtitle:
                " - Rete europea che coordina l'inanellamento scientifico degli uccelli",
              href: "https://euring.org/",
            },
            {
              title: "Xeno Canto",
              subtitle: " - Archivio mondiale di canti e richiami di uccelli",
              href: "https://xeno-canto.org/",
            },
            {
              title: "Avibase",
              subtitle: " - Database tassonomico e distributivo globale",
              href: "https://avibase.bsc-eoc.org/avibase.jsp?lang=IT",
            },
          ],
        },
      ],
    },
  ],
  organizzazioni: [
    {
      title: "Organizzazioni internazionali e scientifiche",
      groups: [
        {
          links: [
            {
              title: "BirdLife",
              subtitle:
                " - Conservazione globale degli uccelli e Important Bird Areas",
              href: "https://www.birdlife.org/",
            },
            {
              title: "BTO",
              subtitle: " - Monitoraggi scientifici, atlanti e guide specie",
              href: "https://www.bto.org/",
            },
            {
              title: "EBCC",
              subtitle: " - Coordinamento dei monitoraggi europei",
              href: "https://www.ebcc.info/",
            },
            {
              title: "RSPB",
              subtitle:
                " - La più grande organizzazione britannica per la protezione degli uccelli",
              href: "https://www.rspb.org.uk/",
            },
            {
              title: "Vogelwarte",
              subtitle: " - La stazione ornitologica svizzera",
              href: "https://www.vogelwarte.ch/de/",
            },
            {
              title: "Ficedula",
              subtitle:
                " - Associazione ornitologica svizzera molto attiva nel monitoraggio",
              href: "https://ficedula.ch/",
            },
            {
              title: "NABU",
              subtitle:
                " - Importante organizzazione tedesca per natura e avifauna",
              href: "https://www.nabu.de/",
            },
            {
              title: "Ornitologia",
              subtitle:
                " - Una delle più importanti organizzazioni ornitologiche della Spagna e dell'Europa mediterranea",
              href: "https://ornitologia.org/ca/",
            },
            {
              title: "LPO",
              subtitle:
                " - Riferimento francese per bird conservation e monitoraggi",
              href: "https://www.lpo.fr/",
            },
          ],
        },
      ],
    },
  ],
  reti: [
    {
      title: "Italia - reti, associazioni e gruppi regionali",
      groups: [
        {
          title: "Coordinamento e conservazione",
          links: [
            {
              title: "CISO",
              subtitle: " - Centro Italiano Studi Ornitologici",
              href: "https://ciso-coi.it/",
            },
            {
              title: "LIPU",
              subtitle:
                " - Principale associazione italiana per tutela avifauna",
              href: "https://www.lipu.it/",
            },
            {
              title: "EBN Italia",
              subtitle: " - Rete birdwatching nazionale",
              href: "https://www.ebnitalia.it/",
            },
            {
              title: "Birdin' Lombardia",
              subtitle: " - Birdwatching Nord Italia",
              href: "https://www.birdinlombardia.it/",
            },
            {
              title: "WWF",
              subtitle: " - Organizzazione ambientalista",
              href: "https://www.wwf.it/",
            },
            {
              title: "Lega Abolizione Caccia",
              subtitle: " - Protezione della fauna",
              href: "https://www.abolizionecaccia.it/",
            },
          ],
        },
        {
          title: "Lombardia e Nord Italia",
          links: [
            {
              title: "Gruppo Piemontese Studi Ornitologici",
              subtitle: "",
              href: "https://www.gpso.it/",
            },
            {
              title: "C.R.O.S. Varenna",
              subtitle: "",
              href: "https://www.crosvarenna.it/",
            },
            {
              title: "GOL - Gruppo Ornitologico Lombardo",
              subtitle: "",
              href: "https://gol-milano.it/",
            },
            {
              title: "Scienze Naturali Verbano-Cusio-Ossola",
              subtitle: "",
              href: "https://www.scienzenaturalivco.org/",
            },
            {
              title: "Cuneo Birding",
              subtitle: "",
              href: "http://www.cuneobirding.it/",
            },
            {
              title: "Liguria Birding",
              subtitle: "",
              href: "https://www.liguriabirding.net/",
            },
            {
              title: "AsOER ",
              subtitle: " - Associazione di ornitologi dell'Emilia Romagna",
              href: "https://www.asoer.org/",
            },
            {
              title: "As.Fa.Ve.",
              subtitle: " - Associazione di faunisti veneti",
              href: "https://www.faunistiveneti.it/",
            },
            {
              title: "ASTORE FVG",
              subtitle:
                " - Associazione Studi Ornitologici e Ricerche Ecologiche del Friuli Venezia Giulia",
              href: "https://astorefvg.org/",
            },
            {
              title: "GRA - Gruppo Ricerche Avifauna",
              subtitle: "",
              href: "https://www.grupporicercheavifauna.it/",
            },
          ],
        },
      ],
    },
  ],
  turismo: [
    {
      title: "Turismo naturalistico",
      groups: [
        {
          title: "",
          links: [
            {
              title: "Animal Trip",
              subtitle: " - Viaggi naturalistici e birdwatching",
              href: "https://animal-trip.com/",
            },
          ],
        },
      ],
    },
  ],
};

export function useLinks() {
  // FUTURO: return useAsyncData('links',
  //   () => $fetch('/api/links'))
  return useAsyncData<LinksByCategory>("links", () =>
    Promise.resolve(MOCK_LINKS),
  );
}
