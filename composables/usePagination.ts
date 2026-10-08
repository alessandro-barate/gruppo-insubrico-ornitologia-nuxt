import { computed, ref, unref, type MaybeRef } from "vue";

// ─────────────────────────────────────────────────────────
// Paginazione condivisa da tutte le sezioni del sito
// (Progetti, Divulgazione, Pubblicazioni e future: News…).
//
// Incapsula lo stato (`currentPage`), il calcolo delle pagine
// (`totalPages`), l'intervallo della pagina corrente (`pageRange`),
// un helper per affettare una lista (`paginate`) e la navigazione
// (`goToPage`) con lo scroll CONDIZIONALE: al cambio pagina la
// finestra si riallinea all'inizio della lista SOLO se questo è
// finito sopra il viewport; altrimenti resta dov'è.
//
// USO TIPICO
//   const itemCount = computed(() => source.value.length)
//   const { currentPage, totalPages, pageRange, paginate, goToPage, listTop }
//     = usePagination(itemCount, { perPage: 4 })
//
//   // se affetti UNA lista:
//   const pageItems = computed(() => paginate(source.value))
//   // se ne affetti PIÙ D'UNA, usa pageRange.start / pageRange.end
//
// e nel template aggancia il ref al contenitore della lista:
//   <div ref="listTop"> …item… </div>
//
// PAGINAZIONE PER GRUPPI (es. volumi per anno, news per mese)
// Quando un gruppo non deve essere spezzato tra due pagine, le
// pagine non hanno tutte `perPage` item. In quel caso:
//   const pages = computed(() =>
//     groupPages(groups.value, 4, (g) => g.items.length))
//   const { currentPage, … } = usePagination(itemCount, {
//     perPage: 4,
//     pageCount: computed(() => pages.value.length),
//   })
//   const pageGroups = computed(() => pages.value[currentPage.value - 1] ?? [])
// `pageCount` sostituisce il calcolo count/perPage; `pageRange` e
// `paginate` non vanno usati per quella lista.
// ─────────────────────────────────────────────────────────

interface UsePaginationOptions {
  perPage?: number;
  // Numero di pagine già calcolato (es. da groupPages). Se è un
  // numero, ha la precedenza su count/perPage; se è null/undefined
  // si torna al calcolo standard. Reattivo: ref, computed o valore.
  pageCount?: MaybeRef<number | null | undefined>;
}

export function usePagination(
  // conteggio totale degli item (reattivo: ref, computed o getter)
  count: MaybeRef<number>,
  options: UsePaginationOptions = {},
) {
  const perPage = options.perPage ?? 4;

  const currentPage = ref(1);

  // Scroll condizionale condiviso: espone listTop (da agganciare al
  // contenitore della lista) e scrollIfNeeded().
  const { listTop, scrollIfNeeded } = useConditionalScroll();

  const itemCount = computed(() => unref(count));

  const totalPages = computed(() => {
    const fixed = unref(options.pageCount);
    if (typeof fixed === "number") return Math.max(1, fixed);
    return Math.max(1, Math.ceil(itemCount.value / perPage));
  });

  // Intervallo [start, end) della pagina corrente.
  const pageRange = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return { start, end: start + perPage };
  });

  // Affetta una lista qualsiasi sulla pagina corrente.
  function paginate<T>(list: readonly T[]): T[] {
    return list.slice(pageRange.value.start, pageRange.value.end);
  }

  function goToPage(page: number) {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    scrollIfNeeded();
  }

  return {
    currentPage,
    totalPages,
    pageRange,
    paginate,
    goToPage,
    listTop,
  };
}

// Distribuisce una lista di gruppi in pagine SENZA spezzare i gruppi.
// Riempie la pagina con gruppi interi finché il successivo ci sta nel
// limite di `perPage` item; altrimenti passa alla pagina dopo. Un
// gruppo più grande di `perPage` occupa da solo una pagina intera.
// `size` dice quanti item contiene un gruppo.
export function groupPages<G>(
  groups: readonly G[],
  perPage: number,
  size: (group: G) => number,
): G[][] {
  const pages: G[][] = [];
  let page: G[] = [];
  let count = 0;
  for (const group of groups) {
    const n = size(group);
    if (count > 0 && count + n > perPage) {
      pages.push(page);
      page = [];
      count = 0;
    }
    page.push(group);
    count += n;
  }
  if (page.length) pages.push(page);
  return pages;
}
