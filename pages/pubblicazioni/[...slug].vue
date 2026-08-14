<script setup lang="ts">
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

// Comodità: estraggo il nodo per leggibilità nel template
const node = computed(() => data.value?.node ?? null);
const childCards = computed(() => data.value?.childCards ?? []);

// Path base per costruire i link delle card figlie
// (es. dentro /pubblicazioni/liste i figli linkano a /pubblicazioni/liste/<slug>)
const basePath = computed(() => `/pubblicazioni/${segments.value.join("/")}`);

// ─── Paginazione (solo per le foglie con item) ──────────
const PER_PAGE = 4;
const currentPage = ref(1);

const items = computed(() => node.value?.items ?? []);

const totalPages = computed(() => Math.ceil(items.value.length / PER_PAGE));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return items.value.slice(start, start + PER_PAGE);
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
  <div class="pub-node-page">
    <section v-if="node" class="pub-node">
      <header class="pub-node__intro">
        <NuxtLink to="/pubblicazioni" class="pub-node__back">
          &larr; Pubblicazioni
        </NuxtLink>
        <h1>{{ node.title }}</h1>
        <div
          v-if="node.intro_text"
          class="pub-node__intro-text"
          v-html="node.intro_text"
        />
      </header>

      <!-- CONTENITORE (group): mostra le card dei figli -->
      <div v-if="node.type === 'group'" class="pub-node__grid">
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
        <div v-if="node.type === 'cards'" class="pub-node__items">
          <PubblicazioniCardItem
            v-for="item in paginatedItems"
            :key="item.id"
            :item="item"
          />
        </div>

        <!-- Lista PDF (es. BOL, Racconti) -->
        <ul v-else-if="node.type === 'pdf-list'" class="pub-node__pdf-list">
          <PubblicazioniPdfItem
            v-for="item in paginatedItems"
            :key="item.id"
            :item="item"
          />
        </ul>

        <!-- Bibliografia: solo testo (es. Paper) -->
        <ol v-else-if="node.type === 'bibliography'" class="pub-node__biblio">
          <PubblicazioniBiblioItem
            v-for="item in paginatedItems"
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
            &larr;
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
            &rarr;
          </button>
        </nav>
      </template>
    </section>
  </div>
</template>

<style scoped>
.pub-node {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.pub-node__back {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--color-text-muted, #555);
  text-decoration: none;
}

.pub-node__back:hover {
  text-decoration: underline;
}

.pub-node__intro {
  margin-bottom: 3rem;
}

.pub-node__intro h1 {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  margin-bottom: 1rem;
}

.pub-node__intro-text {
  color: var(--color-text-muted, #444);
  line-height: 1.7;
}

.pub-node__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.pub-node__items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pub-node__pdf-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pub-node__biblio {
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-text, #333);
  line-height: 1.6;
}

/* Paginazione */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
}

.pagination__page,
.pagination__arrow {
  min-width: 40px;
  height: 40px;
  border: 1px solid var(--color-border, #ddd);
  border-radius: 6px;
  background: var(--color-surface, #fff);
  cursor: pointer;
  font-size: 0.95rem;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.pagination__page:hover:not(.is-active),
.pagination__arrow:hover:not(:disabled) {
  border-color: var(--color-accent, #2c6e49);
}

.pagination__page.is-active {
  background: var(--color-accent, #2c6e49);
  color: #fff;
  border-color: var(--color-accent, #2c6e49);
  font-weight: 600;
}

.pagination__arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
