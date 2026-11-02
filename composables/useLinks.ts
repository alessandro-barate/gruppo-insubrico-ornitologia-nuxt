// ─── TIPI (API Laravel) ─────────────────
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

// ─── DATI ────────────────────────────────────────────────
// Dal backend Laravel (pannello → Contenuti → Link utili).
export function useLinks() {
  return useApiData<LinksByCategory>("links", "/links");
}
