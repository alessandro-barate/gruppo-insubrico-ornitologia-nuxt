// ─── PAGINA PROGETTI ─────────────────────────────────────
// Da ottobre 2026 la pagina /progetti mostra solo un testo descrittivo
// e una galleria di immagini. Le schede delle ricerche (sezioni,
// progetti, PDF e link) sono in Pubblicazioni → Paper: vedi useRicerche.ts.

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProgettiPage {
  intro_text: string;
  gallery: GalleryImage[];
}

// ─── MOCK DATA ───────────────────────────────────────────
// TODO: sostituire con l'API Laravel (immagini gestite dal pannello).
// Le immagini qui sotto sono segnaposto prese da quelle già presenti.
const PROGETTI_INTRO =
  "Il G.I.O. ha intrapreso <strong>progetti di ricerca</strong> nel campo dell'ornitologia fin dai suoi esordi. Il nostro atto costitutivo recita che: “la nostra associazione persegue come scopo prioritario <strong>lo studio e la conservazione dell'avifauna</strong>. Infatti è sempre stato nello spirito dei nostri soci <strong>fare ricerca sul territorio della provincia di Varese</strong> per individuare l'avifauna presente, lo <strong>stato di conservazione</strong> e i <strong>cambiamenti e le trasformazioni</strong> avvenuti nel tempo. I risultati delle ricerche riportate qui sotto sono consultabili alla pagina <a href='/pubblicazioni/paper' class='specific-link' target='_blank'>Paper</a>.";

const GALLERY: GalleryImage[] = [
  { src: "/images/progetti/rondoni.webp", alt: "Rondoni in volo" },
  { src: "/images/progetti/brebbia.webp", alt: "Campi di Brebbia" },
  { src: "/images/progetti/brabbia.webp", alt: "Palude Brabbia" },
  { src: "/images/progetti/garzaie.webp", alt: "Garzaia" },
  { src: "/images/progetti/succiacapre.webp", alt: "Succiacapre" },
  {
    src: "/images/progetti/progetti-in-corso.webp",
    alt: "Attività di ricerca sul campo",
  },
];
// ─────────────────────────────────────────────────────────

export function useProgetti() {
  const getPage = () => {
    // FUTURO: return useAsyncData('progetti-page', () => $fetch('/api/progetti'))
    return useAsyncData<ProgettiPage>("progetti-page", () =>
      Promise.resolve({ intro_text: PROGETTI_INTRO, gallery: GALLERY }),
    );
  };

  return { getPage };
}
