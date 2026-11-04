import { computed, onMounted, ref, unref, watch, type MaybeRef } from "vue";

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
//
// PAGINA NELL'URL
// La pagina corrente sta nell'indirizzo come ?pagina=2 (la prima pagina
// non lo aggiunge). Così, aprendo un elemento della pagina 2 e tornando
// indietro (tasto del browser o link del breadcrumb, vedi useBackLink),
// si ritrova la pagina 2 e non la prima. Il cambio pagina sostituisce
// l'indirizzo senza aggiungere voci alla cronologia e senza scroll.
// Per disattivarlo: usePagination(count, { query: false }).
// ─────────────────────────────────────────────────────────

interface UsePaginationOptions {
  perPage?: number;
  // Numero di pagine già calcolato (es. da groupPages). Se è un
  // numero, ha la precedenza su count/perPage; se è null/undefined
  // si torna al calcolo standard. Reattivo: ref, computed o valore.
  pageCount?: MaybeRef<number | null | undefined>;
  // Nome del parametro dell'URL con la pagina corrente ("pagina" se
  // omesso); false = la pagina non va nell'URL.
  query?: string | false;
}

// Numero di pagina valido da un parametro dell'URL (o null)
function pageFromQuery(value: unknown): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  const n = Number.parseInt(String(raw ?? ""), 10);
  return Number.isFinite(n) && n >= 1 ? n : null;
}

export function usePagination(
  // conteggio totale degli item (reattivo: ref, computed o getter)
  count: MaybeRef<number>,
  options: UsePaginationOptions = {},
) {
  const perPage = options.perPage ?? 4;
  const queryKey = options.query === undefined ? "pagina" : options.query;

  const route = useRoute();
  const router = useRouter();

  // Si parte dalla pagina scritta nell'URL, se c'è
  const currentPage = ref(
    (queryKey && pageFromQuery(route.query[queryKey])) || 1,
  );

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

  // Una pagina oltre l'ultima (URL vecchio, elementi eliminati dal
  // pannello…) diventa l'ultima
  watch(
    totalPages,
    (total) => {
      if (currentPage.value > total) currentPage.value = total;
    },
    { immediate: true },
  );

  if (queryKey) {
    // Solo finché si resta su questa pagina: uscendo, la route cambia
    // prima che il componente venga smontato e non va toccata
    const path = route.path;

    // pagina → URL (anche quando una pagina rimette currentPage a 1)
    watch(currentPage, (page) => {
      if (route.path !== path) return;
      if (pageFromQuery(route.query[queryKey]) === (page > 1 ? page : null))
        return;
      router.replace({
        query: { ...route.query, [queryKey]: page > 1 ? String(page) : undefined },
      });
    });
    // Nel browser, se l'URL indicava una pagina che non esiste
    // (es. ?pagina=99), lo si corregge con quella mostrata davvero
    onMounted(() => {
      const shown = currentPage.value > 1 ? currentPage.value : null;
      if (route.path === path && pageFromQuery(route.query[queryKey]) !== shown) {
        router.replace({
          query: { ...route.query, [queryKey]: shown ? String(shown) : undefined },
        });
      }
    });

    // URL → pagina (avanti/indietro del browser sulla stessa lista)
    watch(
      () => route.query[queryKey],
      (value) => {
        if (route.path !== path) return;
        const page = Math.min(pageFromQuery(value) ?? 1, totalPages.value);
        if (page !== currentPage.value) currentPage.value = page;
      },
    );
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
