<script setup lang="ts">
import type {
  CardItem,
  PdfItem,
  BibliographyItem,
} from "~/composables/usePubblicazioni";

const route = useRoute();

// slug catch-all → array di segmenti. Es: /pubblicazioni/liste/racconti
// dà ['liste', 'racconti']. Nuxt lo passa come stringa o array.
const segments = computed(() => {
  const raw = route.params.slug;
  return Array.isArray(raw) ? raw : [raw].filter(Boolean);
});

const { getNode } = usePubblicazioni();
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

// ─── Paginazione ────────────────────────────────────────
const PER_PAGE = 4;
const currentPage = ref(1);

// Numero totale di item del nodo corrente (qualunque tipo)
const itemCount = computed(() => {
  const n = node.value;
  if (!n || n.type === "group") return 0;
  return n.items.length;
});

const totalPages = computed(() => Math.ceil(itemCount.value / PER_PAGE));

// Intervallo [start, end) della pagina corrente, riusato dalle liste tipizzate
const pageRange = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return { start, end: start + PER_PAGE };
});

// Liste tipizzate: ognuna è valorizzata SOLO se il nodo è di quel tipo.
// Il controllo su `node.type` fa sì che TypeScript sappia il tipo esatto
// di `node.items` dentro ogni ramo — niente cast.
const cardItems = computed<CardItem[]>(() => {
  const n = node.value;
  if (!n || n.type !== "cards") return [];
  return n.items.slice(pageRange.value.start, pageRange.value.end);
});

const pdfItems = computed<PdfItem[]>(() => {
  const n = node.value;
  if (!n || n.type !== "pdf-list") return [];
  return n.items.slice(pageRange.value.start, pageRange.value.end);
});

const biblioItems = computed<BibliographyItem[]>(() => {
  const n = node.value;
  if (!n || n.type !== "bibliography") return [];
  return n.items.slice(pageRange.value.start, pageRange.value.end);
});

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
// ────────────────────────────────────────────────────────

useSeoMeta({
  title: () => node.value?.title,
  description: () => node.value?.intro_excerpt,
});
</script>

<template>
  <section v-if="node" class="subsection">
    <div class="subsection__intro">
      <div class="subsection__back">
        <NuxtLink to="/pubblicazioni" class="subsection__link">
          <img
            src="../../assets/images/scientific-dissemination/chevron-left.svg"
            alt=""
          />
          Pubblicazioni</NuxtLink
        >
        <NuxtLink
          v-if="node.liste"
          to="/pubblicazioni"
          class="subsection__link"
        >
          <img
            src="../../assets/images/scientific-dissemination/chevron-left.svg"
            alt=""
          />
          Pubblicazioni</NuxtLink
        >
      </div>
      <h1>{{ node.title }}</h1>
      <div
        v-if="node.intro_text"
        class="subsection__intro-text"
        v-html="node.intro_text"
      />
    </div>

    <!-- CONTENITORE (group): mostra le card dei figli -->
    <div v-if="node.type === 'group'" class="subsection__grid">
      <PubblicazioniNavCard
        v-for="card in childCards"
        :key="card.slug"
        :card="card"
        :base-path="basePath"
      />
    </div>

    <!-- FOGLIA: mostra gli item secondo il tipo -->
    <template v-else>
      <!-- Cards: titolo + immagine + testo (es. Quaderni) -->
      <div v-if="node.type === 'cards'" class="subsection__items">
        <PubblicazioniCardItem
          v-for="item in cardItems"
          :key="item.id"
          :item="item"
        />
      </div>

      <!-- Lista PDF (es. BOL, Racconti) -->
      <ul v-else-if="node.type === 'pdf-list'" class="subsection__pdf-list">
        <PubblicazioniPdfItem
          v-for="item in pdfItems"
          :key="item.id"
          :item="item"
        />
      </ul>

      <!-- Bibliografia: solo testo (es. Paper) -->
      <ol v-else-if="node.type === 'bibliography'" class="subsection__biblio">
        <PubblicazioniBiblioItem
          v-for="item in biblioItems"
          :key="item.id"
          :item="item"
        />
      </ol>

      <!-- Paginazione condivisa da tutte le foglie -->
      <nav v-if="totalPages > 1" class="pagination" aria-label="Paginazione">
        <button
          class="pagination__arrow"
          :disabled="currentPage === 1"
          aria-label="Pagina precedente"
          @click="goToPage(currentPage - 1)"
        >
          <img
            src="../../assets/images/scientific-dissemination/chevron-left.svg"
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
            src="../../assets/images/scientific-dissemination/chevron-right.svg"
            alt="Freccia destra per navigare alla lista successiva dei contenuti"
          />
        </button>
      </nav>
    </template>
  </section>
</template>

<style scoped lang="scss">
@use "~/assets/scss/_partials/subsection" as *;
</style>
