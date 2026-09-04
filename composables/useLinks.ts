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
              title: "Ornitho",
              subtitle:
                "Piattaforma italiana principale per inserimento osservazioni, atlanti, monitoraggi e validazione dati",
              href: "https://www.ornitho.it/",
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
                "Conservazione globale degli uccelli e Important Bird Areas",
              href: "https://www.birdlife.org/",
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
              title: "Centro Italiano Studi Ornitologici",
              subtitle: "",
              href: "https://ciso-coi.it/",
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
              subtitle: "Viaggi naturalistici e birdwatching",
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
