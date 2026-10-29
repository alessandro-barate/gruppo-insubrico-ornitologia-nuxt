<script setup lang="ts">
// Pagina dei risultati della ricerca: /cerca?q=rondone
// Ci si arriva da "Vedi tutti i risultati" dell'overlay (o premendo Invio).
// Mostra tutti i risultati, filtrabili per sezione, 10 per pagina.
import type { SearchResponse, SearchResultType } from "~/composables/useSearch";

const PER_PAGE = 10;
const MAX_RESULTS = 200;

useSeoMeta({
  title: "Cerca nel sito | Gruppo Insubrico di Ornitologia",
  description:
    "Cerca tra pubblicazioni, progetti, news, corsi ed eventi del G.I.O.",
});
// I risultati di ricerca non vanno indicizzati dai motori di ricerca
useHead({ meta: [{ name: "robots", content: "noindex, follow" }] });

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

// La ricerca vive nell'URL (?q=…): link condivisibili e tasto "indietro"
const q = computed(() =>
  String(route.query.q ?? "")
    .trim()
    .slice(0, 100),
);

// Campo di ricerca della pagina (aggiorna l'URL con un piccolo ritardo)
const term = ref(q.value);
watch(q, (value) => {
  if (value !== term.value.trim()) term.value = value;
});

let timer: ReturnType<typeof setTimeout> | undefined;
watch(term, (value) => {
  clearTimeout(timer);
  timer = setTimeout(() => updateQuery(value), 400);
});
onBeforeUnmount(() => clearTimeout(timer));

function updateQuery(value: string) {
  const next = value.trim();
  if (next === q.value) return;
  router.replace({ query: next ? { q: next } : {} });
}

const { data, pending, error } = await useFetch<SearchResponse>("/search", {
  baseURL: config.public.apiBase,
  query: computed(() => ({ q: q.value, limit: MAX_RESULTS })),
  key: "search-page",
});

const tooShort = computed(() => q.value.length < SEARCH_MIN_LENGTH);
const results = computed(() =>
  tooShort.value ? [] : (data.value?.data ?? []),
);

// ─── Filtro per sezione ─────────────────────────────────
const activeType = ref<SearchResultType | "all">("all");

const filters = computed(() =>
  SEARCH_TYPE_ORDER.map((type) => {
    const items = results.value.filter((r) => r.type === type);
    return { type, label: items[0]?.type_label ?? "", count: items.length };
  }).filter((f) => f.count > 0),
);

const filtered = computed(() =>
  activeType.value === "all"
    ? results.value
    : results.value.filter((r) => r.type === activeType.value),
);

// ─── Paginazione ────────────────────────────────────────
const itemCount = computed(() => filtered.value.length);
const { currentPage, totalPages, paginate, goToPage, listTop } = usePagination(
  itemCount,
  { perPage: PER_PAGE },
);
const pageResults = computed(() => paginate(filtered.value));

// Nuova ricerca o nuovo filtro → si riparte dalla prima pagina
watch(q, () => {
  activeType.value = "all";
  currentPage.value = 1;
});
watch(activeType, () => {
  currentPage.value = 1;
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <section class="search-page">
          <div class="search-page__title">
            <h1>Cerca nel sito</h1>
          </div>

          <form
            class="search-page__form"
            role="search"
            @submit.prevent="updateQuery(term)"
          >
            <input
              v-model="term"
              type="search"
              placeholder="Cerca nel sito…"
              aria-label="Cerca nel sito"
              autocomplete="off"
            />
            <button type="submit">Cerca</button>
          </form>

          <!-- Messaggi -->
          <p v-if="tooShort" class="search-page__message">
            Scrivi almeno {{ SEARCH_MIN_LENGTH }} caratteri per cercare tra
            pubblicazioni, progetti, news, corsi ed eventi.
          </p>

          <p v-else-if="error" class="search-page__message">
            Si è verificato un errore durante la ricerca. Riprova tra poco.
          </p>

          <p
            v-else-if="!pending && results.length === 0"
            class="search-page__message"
          >
            Nessun risultato per <strong>“{{ q }}”</strong>. Prova con un'altra
            parola o controlla come è scritta.
          </p>

          <template v-else>
            <p class="search-page__count" aria-live="polite">
              <template v-if="pending">Ricerca in corso…</template>
              <template v-else>
                {{ data?.total ?? results.length }}
                {{
                  (data?.total ?? results.length) === 1
                    ? "risultato"
                    : "risultati"
                }}
                per <strong>“{{ q }}”</strong>
                <template v-if="(data?.total ?? 0) > results.length">
                  (mostrati i primi {{ results.length }})
                </template>
              </template>
            </p>

            <!-- Filtri per sezione -->
            <div
              v-if="filters.length > 1"
              class="search-page__filters"
              role="group"
              aria-label="Filtra per sezione"
            >
              <button
                type="button"
                :class="{ 'is-active': activeType === 'all' }"
                :aria-pressed="activeType === 'all'"
                @click="activeType = 'all'"
              >
                Tutti <span>{{ results.length }}</span>
              </button>
              <button
                v-for="f in filters"
                :key="f.type"
                type="button"
                :class="{ 'is-active': activeType === f.type }"
                :aria-pressed="activeType === f.type"
                @click="activeType = f.type"
              >
                {{ f.label }} <span>{{ f.count }}</span>
              </button>
            </div>

            <ul
              ref="listTop"
              class="search-page__list"
              :class="{ 'is-loading': pending }"
            >
              <li v-for="result in pageResults" :key="result.id">
                <SearchResultItem :result="result" />
              </li>
            </ul>

            <nav
              v-if="totalPages > 1"
              class="pagination"
              aria-label="Paginazione dei risultati di ricerca"
            >
              <button
                class="pagination__arrow"
                :disabled="currentPage === 1"
                aria-label="Pagina precedente"
                @click="goToPage(currentPage - 1)"
              >
                <img
                  src="~/assets/images/scientific-dissemination/chevron-left.svg"
                  alt="Freccia sinistra per navigare alla pagina precedente dei risultati"
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
                  alt="Freccia destra per navigare alla pagina successiva dei risultati"
                />
              </button>
            </nav>
          </template>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Stili della paginazione condivisi con le altre pagine
@use "~/assets/scss/_partials/subsection" as *;

$blue: #233162;

.search-page {
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 0 13rem;

  &__title {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__form {
    width: 100%;
    margin: 0 0 2rem;
    display: flex;
    gap: 0.5rem;

    input {
      flex: 1;
      min-width: 0;
      padding: 0.8rem 1rem;
      border: 2px solid rgba(35, 49, 98, 0.3);
      border-radius: 8px;
      font: inherit;
      font-size: 1.05rem;
      outline: none;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: $blue;
      }
    }

    button {
      padding: 0.8rem 1.4rem;
      border: none;
      border-radius: 8px;
      background: $blue;
      color: #fff;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.9;
      }

      &:focus-visible {
        outline: 3px solid $blue;
        outline-offset: 2px;
      }
    }
  }

  &__message {
    padding: 3rem 1.5rem;
    border: 1px dashed rgb(141, 141, 141);
    border-radius: 12px;
    background: #fafafa;
    color: #555;
    text-align: center;
    line-height: 1.6;
  }

  &__count {
    margin-bottom: 1rem;
    color: #555;
  }

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    button {
      margin: 0;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.85rem;
      border: 1px solid rgba(35, 49, 98, 0.35);
      border-radius: 999px;
      background: #fff;
      color: $blue;
      font: inherit;
      font-size: 0.9rem;
      cursor: pointer;
      transition:
        background 0.15s ease,
        color 0.15s ease;

      span {
        margin: 0;
        font-size: 0.78rem;
        opacity: 0.75;
      }

      &:hover {
        background: rgba(35, 49, 98, 0.06);
      }

      &.is-active {
        background: $blue;
        color: #fff;
      }

      &:focus-visible {
        outline: 3px solid $blue;
        outline-offset: 2px;
      }
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid rgba(35, 49, 98, 0.15);
    transition: opacity 0.15s ease;

    &.is-loading {
      opacity: 0.5;
    }

    li {
      border-bottom: 1px solid rgba(35, 49, 98, 0.15);
      padding: 0.25rem 0;
    }
  }

  .pagination {
    margin: 2rem auto 0;
  }

  @media (max-width: 576px) {
    padding-top: 2.5rem;

    &__form button {
      padding: 0.8rem 1rem;
    }
  }
}
</style>
