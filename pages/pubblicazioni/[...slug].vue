<script setup lang="ts">
import type {
  CardItem,
  PdfItem,
  BibliographyItem,
} from "~/composables/usePubblicazioni";

const route = useRoute();
const router = useRouter();

// slug catch-all → array di segmenti. Es: /pubblicazioni/liste/racconti
// dà ['liste', 'racconti']. Nuxt lo passa come stringa o array.
const segments = computed(() => {
  const raw = route.params.slug;
  return Array.isArray(raw) ? raw : [raw].filter(Boolean);
});

const { getNode, buildCrumbs } = usePubblicazioni();
const { data } = await getNode(segments.value);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Pagina non trovata",
    fatal: true,
  });
}

const node = computed(() => data.value?.node ?? null);
const childCards = computed(() => data.value?.childCards ?? []);

const basePath = computed(() => `/pubblicazioni/${segments.value.join("/")}`);

// Classe e id specifici del nodo corrente, per stili/ancore mirati
// (es. la pagina "racconti-ornitologici"). Derivati dallo slug del nodo:
// classe → subsection--<slug>, id → <slug>.
const nodeClass = computed(() =>
  node.value ? `subsection--${node.value.slug}` : "",
);
const nodeId = computed(() => node.value?.slug ?? undefined);

// Breadcrumb: le voci dopo la home. L'ultima è la pagina corrente.
const crumbs = computed(() => buildCrumbs(segments.value));

// ─── Paginazione ────────────────────────────────────────
const PER_PAGE = 4;

type PdfYearGroup = { year: number | null; items: PdfItem[] };

// Anno di una voce PDF: il campo `year` se presente, altrimenti il primo
// anno a 4 cifre (19xx/20xx) trovato nel titolo, es. "Resoconto
// Ornitologico 2023". Se non c'è nessuno dei due → null.
function yearOf(item: PdfItem): number | null {
  if (item.year != null) return Number(item.year);
  const match = item.title?.match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
}

// Lista PDF completa ordinata per anno decrescente, PRIMA della
// paginazione: l'anno più recente apre la prima pagina e il più vecchio
// chiude l'ultima. Le voci senza anno vanno in fondo. sort() è stabile:
// a parità di anno resta l'ordine originale.
const sortedPdfItems = computed<PdfItem[]>(() => {
  const n = node.value;
  if (!n || n.type !== "pdf-list") return [];
  return [...n.items].sort((a, b) => {
    const ya = yearOf(a);
    const yb = yearOf(b);
    if (ya === yb) return 0;
    if (ya === null) return 1; // senza anno in fondo
    if (yb === null) return -1;
    return yb - ya; // anni decrescenti
  });
});

// Intestazione con l'anno solo se il nodo ha `group_by_year` (es. BOL).
// Negli altri casi (Resoconti, Lista uccelli) le voci restano ordinate
// per anno ma vengono mostrate in un'unica lista senza intestazioni.
const groupByYear = computed(() => {
  const n = node.value;
  return n?.type === "pdf-list" && n.group_by_year === true;
});

// Raggruppa la lista ordinata per anno. Le voci senza anno (o senza
// raggruppamento) sono ognuna un gruppo a sé, così vengono paginate
// normalmente invece di formare un unico blocco indivisibile.
const pdfYearGroups = computed<PdfYearGroup[]>(() => {
  const groups: PdfYearGroup[] = [];
  for (const item of sortedPdfItems.value) {
    const year = groupByYear.value ? yearOf(item) : null;
    const last = groups[groups.length - 1];
    if (year !== null && last && last.year === year) last.items.push(item);
    else groups.push({ year, items: [item] });
  }
  return groups;
});

// Pagine costruite con anni interi: un anno non viene mai spezzato tra
// due pagine (vedi groupPages in usePagination). Dentro ogni pagina le
// voci senza anno consecutive vengono riunite in un solo gruppo, così
// nel template restano un'unica lista senza intestazione.
const pdfPages = computed<PdfYearGroup[][]>(() =>
  groupPages(pdfYearGroups.value, PER_PAGE, (g) => g.items.length).map((page) =>
    page.reduce<PdfYearGroup[]>((acc, group) => {
      const last = acc[acc.length - 1];
      if (group.year === null && last && last.year === null) {
        last.items.push(...group.items);
      } else {
        acc.push({ year: group.year, items: [...group.items] });
      }
      return acc;
    }, []),
  ),
);

// Numero totale di item del nodo corrente (qualunque tipo)
const itemCount = computed(() => {
  const n = node.value;
  // group e detail non hanno `items` da paginare
  if (!n || n.type === "group" || n.type === "detail") return 0;
  return n.items.length;
});

// Logica condivisa in usePagination (stato, totalPages, pageRange,
// goToPage con scroll condizionale, listTop). Per le liste PDF il
// numero di pagine arriva da pdfPages tramite `pageCount`; per gli
// altri tipi resta il calcolo standard item/perPage.
const { currentPage, totalPages, pageRange, goToPage, listTop } = usePagination(
  itemCount,
  {
    perPage: PER_PAGE,
    pageCount: computed(() =>
      node.value?.type === "pdf-list" ? pdfPages.value.length : null,
    ),
  },
);

// Liste tipizzate: ognuna è valorizzata SOLO se il nodo è di quel tipo.
// Il controllo su `node.type` fa sì che TypeScript sappia il tipo esatto
// di `node.items` dentro ogni ramo — niente cast.
const cardItems = computed<CardItem[]>(() => {
  const n = node.value;
  if (!n || n.type !== "cards") return [];
  return n.items.slice(pageRange.value.start, pageRange.value.end);
});

// Gruppi della pagina corrente (currentPage parte da 1).
const pdfItemsByYear = computed<PdfYearGroup[]>(
  () => pdfPages.value[currentPage.value - 1] ?? [],
);

const biblioItems = computed<BibliographyItem[]>(() => {
  const n = node.value;
  if (!n || n.type !== "bibliography") return [];
  return n.items.slice(pageRange.value.start, pageRange.value.end);
});

function handleContentClick(e: MouseEvent) {
  const a = (e.target as HTMLElement).closest("a");
  if (!a) return;

  // Rispetta i link che devono aprirsi in una nuova tab
  if (a.target === "_blank") return;

  // Rispetta ctrl/cmd/shift/alt-click e il click centrale (nuova tab)
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
    return;

  const href = a.getAttribute("href");
  // solo link interni relativi, senza target esplicito
  if (href && href.startsWith("/")) {
    e.preventDefault();
    router.push(href);
  }
}
// ────────────────────────────────────────────────────────

useSeoMeta({
  title: () => node.value?.title,
  description: () => node.value?.intro_excerpt,
});
</script>

<template>
  <section v-if="node" :id="nodeId" class="subsection" :class="nodeClass">
    <div class="subsection__intro">
      <!-- Breadcrumb: Pubblicazioni / …livelli intermedi… / pagina corrente -->
      <nav class="breadcrumb" aria-label="Percorso di navigazione">
        <NuxtLink to="/pubblicazioni" class="breadcrumb__link">
          <img
            src="~/assets/images/scientific-dissemination/chevron-left.svg"
            alt="Freccia sinistra per navigare al menù precedente"
          />
          Pubblicazioni
        </NuxtLink>

        <template v-for="(crumb, i) in crumbs" :key="crumb.to">
          <span class="breadcrumb__sep" aria-hidden="true">/</span>
          <!-- l'ultima voce è la pagina corrente: testo, non link -->
          <NuxtLink
            v-if="i < crumbs.length - 1"
            :to="crumb.to"
            class="breadcrumb__link"
          >
            {{ crumb.title }}
          </NuxtLink>
          <span v-else class="breadcrumb__current" aria-current="page">
            {{ crumb.title }}
          </span>
        </template>
      </nav>

      <h1>{{ node.title }}</h1>
      <div v-if="node.header_image" class="main-image">
        <img :src="node.header_image" :alt="node.title" loading="lazy" />
      </div>

      <!-- CONTENITORE (group): mostra le card dei figli -->
      <div v-if="node.type === 'group'" class="subsection__grid">
        <SharedNavCard
          v-for="card in childCards"
          :key="card.slug"
          :to="`${basePath}/${card.slug}`"
          :title="card.title"
          :excerpt="card.intro_excerpt"
          :image="card.image_path"
        />
      </div>

      <!-- FOGLIA: mostra gli item secondo il tipo -->
      <template v-else>
        <div ref="listTop">
          <!-- Dettaglio (es. singolo Quaderno): immagine + testo + prezzo + PDF -->
          <article v-if="node.type === 'detail'" class="detail">
            <img
              v-if="node.image_path"
              :src="node.image_path"
              :alt="node.title"
              class="detail__cover"
            />
            <div
              v-if="node.body"
              class="detail__body"
              v-html="node.body"
              @click="handleContentClick"
            />
            <p v-if="node.price" class="detail__price">
              Donazione minima: <strong>{{ node.price }}</strong>
            </p>
            <a
              v-if="node.pdf_url"
              :href="node.pdf_url"
              class="detail__pdf specific-link"
              target="_blank"
              rel="noopener"
            >
              <img src="/images/pdf-icon.png" alt="" class="detail__pdf-icon" />
              Scarica il PDF
            </a>
          </article>

          <!-- Cards: titolo + immagine + testo (es. Quaderni) -->
          <div v-else-if="node.type === 'cards'" class="subsection__items">
            <PubblicazioniCardItem
              v-for="item in cardItems"
              :key="item.id"
              :item="item"
            />
          </div>

          <!-- Lista PDF raggruppata per anno (es. BOL, Racconti) -->
          <div
            v-else-if="node.type === 'pdf-list'"
            class="subsection__pdf-groups"
          >
            <div
              v-for="group in pdfItemsByYear"
              :key="group.year ?? 'no-year'"
              class="pdf-year-group"
            >
              <p v-if="group.year" class="year-field">{{ group.year }}</p>
              <ul class="subsection__pdf-list">
                <PubblicazioniPdfItem
                  v-for="item in group.items"
                  :key="item.id"
                  :item="item"
                />
              </ul>
            </div>
          </div>

          <!-- Bibliografia: solo testo (es. Paper) -->
          <ol
            v-else-if="node.type === 'bibliography'"
            class="subsection__biblio"
          >
            <PubblicazioniBiblioItem
              v-for="item in biblioItems"
              :key="item.id"
              :item="item"
            />
          </ol>
        </div>

        <!-- Paginazione condivisa da tutte le foglie -->
        <nav v-if="totalPages > 1" class="pagination" aria-label="Paginazione">
          <button
            class="pagination__arrow"
            :disabled="currentPage === 1"
            aria-label="Pagina precedente"
            @click="goToPage(currentPage - 1)"
          >
            <img
              src="~/assets/images/scientific-dissemination/chevron-left.svg"
              alt="Freccia sinistra per navigare alla lista precedente dei contenuti"
            />
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="pagination__page"
            :class="{ 'is-active': page === currentPage }"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button
            class="pagination__arrow"
            :disabled="currentPage === totalPages"
            aria-label="Pagina successiva"
            @click="goToPage(currentPage + 1)"
          >
            <img
              src="~/assets/images/scientific-dissemination/chevron-right.svg"
              alt="Freccia destra per navigare alla lista successiva dei contenuti"
            />
          </button>
        </nav>
      </template>

      <div
        v-if="node.intro_text"
        class="subsection__intro-text"
        v-html="node.intro_text"
        @click="handleContentClick"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/scss/_partials/subsection" as *;

h1 {
  text-align: center;
}

.subsection__grid {
  margin-bottom: 3rem;
}

.nav-card {
  min-height: 395px;
}

.main-image {
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;

  img {
    width: 50%;
  }
}

.pdf-year-group {
  width: 100%;
  text-align: center;

  .year-field {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}

.detail {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__cover {
    width: 100%;
    max-width: 360px;
    height: auto;
    border-radius: 0.5rem;
    align-self: center;
  }

  &__body {
    line-height: 1.7;
    color: var(--color-text-muted, #333);
  }

  &__price {
    font-size: 1.1rem;
  }

  &__pdf {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    border: 1px solid currentColor;
    border-radius: 0.4rem;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  &__pdf-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
}
</style>
