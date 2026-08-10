<script setup>
useSeoMeta({
  title: "News | Gruppo Insubrico di Ornitologia",
  description:
    "Ultime notizie e aggiornamenti dal Gruppo Insubrico Ornitologico.",
});
useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/news" }],
});

const config = useRuntimeConfig();

// Pagina corrente (reattiva: al cambio, useFetch rifà la chiamata).
const page = ref(1);
const perPage = 6;

// La server route restituisce già le news ordinate per data decrescente
// (più recente prima) e paginate a 6. In dev colpisce il mock Nitro (/api/news);
// in prod basterà cambiare API_BASE per puntare a Laravel.
const { data, pending, error } = await useFetch("/news", {
  baseURL: config.public.apiBase,
  query: { page, perPage },
});

const newsList = computed(() => data.value?.data ?? []);
const total = computed(() => data.value?.total ?? 0);
const totalPages = computed(() => Math.ceil(total.value / perPage));

const goToPage = (p) => {
  if (p < 1 || p > totalPages.value) return;
  page.value = p;
  if (import.meta.client) {
    document
      .getElementById("news-container")
      ?.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div id="news-container" class="col">
        <section class="title-section jumbo-bg">
          <div class="title uppercase">
            <h1 id="news">news</h1>
          </div>
        </section>

        <section class="news-list">
          <p class="news-list__intro">
            Vuoi tenerti informato su quello che facciamo al G I O e cosa
            succede intorno a noi?<br />
            Qui trovi tutte le ultime notizie che pubblichiamo.
          </p>

          <!-- Loading -->
          <div v-if="pending" class="news-loading">
            <span class="news-loading__spinner"></span>
            <p>Caricamento news...</p>
          </div>

          <!-- Errore -->
          <div v-else-if="error" class="news-empty">
            <p>Si è verificato un errore nel caricamento delle news.</p>
          </div>

          <!-- Nessuna news -->
          <div v-else-if="newsList.length === 0" class="news-empty">
            <p>Al momento non ci sono news pubblicate.</p>
          </div>

          <!-- Griglia news + paginazione -->
          <template v-else>
            <div class="news-grid">
              <div
                v-for="news in newsList"
                :key="news.id"
                class="news-grid__item"
              >
                <NewsCard :news="news" />
              </div>
            </div>

            <nav
              v-if="totalPages > 1"
              class="pagination"
              aria-label="Paginazione news"
            >
              <button
                class="pagination__btn"
                :disabled="page === 1"
                @click="goToPage(page - 1)"
              >
                ‹ Prec
              </button>

              <button
                v-for="p in totalPages"
                :key="p"
                :class="[
                  'pagination__btn',
                  { 'pagination__btn--active': p === page },
                ]"
                @click="goToPage(p)"
              >
                {{ p }}
              </button>

              <button
                class="pagination__btn"
                :disabled="page === totalPages"
                @click="goToPage(page + 1)"
              >
                Succ ›
              </button>
            </nav>
          </template>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.col {
  &::after {
    content: "";
    position: absolute;
    bottom: -1114px;
    left: 0;
    width: 100%;
    height: 150px;
    background: #8c8882;
    clip-path: polygon(0 100%, 100% 0, 100% 100%);
  }

  .title-section {
    position: relative;
    width: 100%;
    height: 700px;
    overflow: hidden;
    margin-bottom: 3rem;

    .overlay {
      height: 100%;
    }
  }

  .jumbo-bg {
    background: url(/assets/images/news/beccaccini.webp) bottom/cover no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }

  .news-list {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    padding-bottom: 17rem;

    &__intro {
      font-size: clamp(1rem, 2vw, 1.3rem);
      margin-bottom: 4rem;
      color: #555;
    }
  }

  // Loading state
  .news-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    color: #666;

    &__spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f0f0f0;
      border-top-color: #002affd5;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  // Messaggio vuoto / errore
  .news-empty {
    text-align: center;
    padding: 4rem 2rem;
    background-color: #fafafa;
    border-radius: 12px;
    border: 1px dashed rgb(141, 141, 141);

    p {
      font-size: 1.15rem;
      color: #666;
    }
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    &__item {
      aspect-ratio: 5 / 3;
      min-height: 400px;
    }
  }

  // Paginazione
  .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    margin-top: 3rem;

    &__btn {
      padding: 0.75rem 1.25rem;
      font-size: 1rem;
      font-weight: 500;
      color: #333;
      background-color: #f5f5f5;
      border: 1px solid #000000;
      border-radius: 8px;
      cursor: pointer;
      transition:
        color 0.3s ease,
        background-color 0.3s ease,
        transform 0.25s ease;

      &:hover:not(:disabled):not(.pagination__btn--active) {
        transform: translateY(-2px);
      }

      &--active {
        color: #ffffff;
        background: linear-gradient(90deg, #002fff, #00e1ff);
        border-color: transparent;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }
}

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
  .col {
    .news-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;

      &__item {
        height: 300px;
      }
    }
  }
}

// ==========================================
// MEDIA QUERIES - MOBILE
// ==========================================
@media (max-width: 576px) {
  .col {
    &::after {
      bottom: -522px;
      height: 90px;
      clip-path: polygon(0 100%, 100% 0, 100% 100%);
    }

    .title-section {
      height: 350px;
    }

    .news-list {
      width: 95%;
    }

    .news-grid {
      grid-template-columns: 1fr;
      gap: 1rem;

      &__item {
        height: 250px;
      }
    }
  }
}
</style>
