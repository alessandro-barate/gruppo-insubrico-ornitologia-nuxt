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
// ─────────────────────────────────────────────────────────

interface UsePaginationOptions {
  perPage?: number;
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

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(itemCount.value / perPage)),
  );

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
