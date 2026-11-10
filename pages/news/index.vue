<script setup>
import defaultHero from "/images/news/beccaccini.webp";
import defaultEmptyImage from "~/assets/images/links-socials/nature.webp";

useSeoMeta({
  title: "News | Gruppo Insubrico di Ornitologia",
  description:
    "Ultime notizie e aggiornamenti dal Gruppo Insubrico Ornitologico.",
});
useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/news" }],
});

const config = useRuntimeConfig();

// Testi e immagine modificabili dal pannello (con default se vuoti)
const { c, m } = await usePageContent("news");

const heroStyle = computed(() =>
  bgStyle(c("hero_image", defaultHero), m("hero_image")),
);

// Nessuna news pubblicata: al posto della griglia un'immagine con una
// scritta (entrambe modificabili dal pannello). Alla prima news pubblicata
// sparisce da sola e torna la griglia con la paginazione.
const emptyStyle = computed(() =>
  bgStyle(c("empty_image", defaultEmptyImage), m("empty_image")),
);

// Pagina corrente, letta dall'URL (?pagina=2): tornando indietro da una
// news si ritrova la stessa pagina. Al cambio, useFetch rifà la chiamata.
const route = useRoute();
const router = useRouter();
const page = computed(() => {
  const n = Number.parseInt(String(route.query.pagina ?? ""), 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
});
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

// Scroll condizionale condiviso (stessa regola di usePagination):
// dopo il cambio pagina risale all'inizio della lista solo se serve.
const { listTop, scrollIfNeeded } = useConditionalScroll();

const goToPage = (p) => {
  if (p < 1 || p > totalPages.value) return;
  router.replace({
    query: { ...route.query, pagina: p > 1 ? String(p) : undefined },
  });
  scrollIfNeeded();
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <section class="title-section jumbo-bg" :style="heroStyle">
          <div class="title uppercase">
            <h1 id="news">{{ c("title", "news") }}</h1>
          </div>
        </section>

        <section ref="listTop" class="news-list">
          <div
            class="news-list__intro"
            v-html="
              c(
                'intro',
                '<p>In questa sezione sono raccolte, in ordine cronologico, le <strong>notizie e gli aggiornamenti</strong> sulle attività del G.I.O., Gruppo Insubrico di Ornitologia: eventi, progetti, monitoraggi, iniziative, pubblicazioni e tutte le novità che riguardano l\'associazione e le sue attività sul territorio.</p>',
              )
            "
          ></div>

          <!-- Loading -->
          <div v-if="pending" class="news-loading">
            <span class="news-loading__spinner"></span>
            <p>Caricamento news...</p>
          </div>

          <!-- Errore -->
          <div v-else-if="error" class="news-empty">
            <p>Si è verificato un errore nel caricamento delle news.</p>
          </div>

          <!-- Nessuna news pubblicata: immagine con scritta -->
          <div
            v-else-if="total === 0"
            class="news-placeholder"
            :style="emptyStyle"
            role="status"
          >
            <p class="news-placeholder__text">
              {{ c("empty_text", "Stiamo aggiornando le nostre news") }}
            </p>
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
                class="pagination__arrow"
                :disabled="page === 1"
                @click="goToPage(page - 1)"
              >
                <img
                  src="~/assets/images/scientific-dissemination/chevron-left.svg"
                  alt="Freccia sinistra per navigare alla lista precedente delle news"
                />
              </button>

              <button
                v-for="p in totalPages"
                :key="p"
                :class="[
                  'pagination__page',
                  { 'pagination__btn--active': p === page },
                ]"
                @click="goToPage(p)"
              >
                {{ p }}
              </button>

              <button
                class="pagination__arrow"
                :disabled="page === totalPages"
                @click="goToPage(page + 1)"
              >
                <img
                  src="~/assets/images/scientific-dissemination/chevron-right.svg"
                  alt="Freccia destra per navigare alla lista successiva delle news"
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
@use "~/assets/scss/_partials/subsection" as *;

.col {
  .title-section {
    position: relative;
    width: 100%;
    height: 700px;
    overflow: hidden;
    margin-bottom: 5rem;

    .overlay {
      height: 100%;
    }
  }

  .jumbo-bg {
    // L'immagine arriva da :style (pannello o default): qui solo posizionamento
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;

    .title {
      text-align: center;
      padding-top: 4rem;
    }
  }

  .news-list {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    padding-bottom: 11rem;

    &__intro {
      font-size: 1.1rem;
      margin-bottom: 4rem;
      color: #333;
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

  // Nessuna news pubblicata: immagine di sfondo con la scritta al centro
  .news-placeholder {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    padding: 2rem;
    border-radius: 12px;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    // Velo scuro: la scritta resta leggibile su qualsiasi foto
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.35);
    }

    &__text {
      position: relative; // sopra il velo
      margin: 0;
      max-width: 800px;
      text-align: center;
      color: #fff;
      font-size: clamp(1.5rem, 3.5vw, 2.6rem);
      font-weight: 600;
      line-height: 1.25;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
    }
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5rem;

    &__item {
      aspect-ratio: 5 / 3;
      min-height: 350px;
    }
  }

  .pagination {
    margin-top: 5rem;

    &__arrow img {
      width: 12%;
    }
  }
}

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
  .col {
    .news-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.25rem;

      &__item {
        // Annulla aspect-ratio e min-height della regola base:
        // altrimenti l'altezza (≥350px) imporrebbe una larghezza
        // derivata che sfora il container su schermi stretti.
        aspect-ratio: auto;
        min-height: 0;
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
      width: 90%;
    }

    .news-placeholder {
      min-height: 320px;
    }

    .news-grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 1rem;

      &__item {
        width: 100%;
        min-height: 0;
        height: 250px;
        aspect-ratio: 4/4;
      }
    }
  }
}
</style>
