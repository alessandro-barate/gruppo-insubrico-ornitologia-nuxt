<script setup>
// ============================================
// MOCK DATA - Rimuovere quando il backend è pronto
// ============================================
import newsData from "~/data/carousel.js";
const MOCK_MODE = true; // Cambia a false quando hai il backend
const MOCK_YEARS = [2025, 2024, 2023, 2022];
// ============================================

useSeoMeta({
  title: "News | Gruppo Insubrico di Ornitologia",
  description:
    "Ultime notizie e aggiornamenti dal Gruppo Insubrico Ornitologico.",
});
useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/news" }],
});

// Anni disponibili (caricati dal backend)
const availableYears = ref([]);

// Anno selezionato (null = nessuna selezione)
const selectedYear = ref(null);

// Loading states
const isLoadingYears = ref(true);
const isLoadingNews = ref(false);

// Lista news
const newsList = ref([]);

// ============================================
// Carica gli anni disponibili al mount
// ============================================
const loadAvailableYears = async () => {
  isLoadingYears.value = true;

  if (MOCK_MODE) {
    // MOCK: Simula delay e usa dati fittizi
    await new Promise((resolve) => setTimeout(resolve, 200));
    availableYears.value = MOCK_YEARS;
  } else {
    // BACKEND: Chiama l'API Laravel
    try {
      const { data } = await useFetch("/api/news/years");
      availableYears.value = data.value || [];
    } catch (error) {
      console.error("Errore caricamento anni:", error);
      availableYears.value = [];
    }
  }

  isLoadingYears.value = false;
};

// ============================================
// Carica le news per l'anno selezionato
// ============================================
const selectYear = async (year) => {
  // Se clicco sullo stesso anno, lo deseleziono
  if (selectedYear.value === year) {
    selectedYear.value = null;
    newsList.value = [];
    return;
  }

  selectedYear.value = year;
  isLoadingNews.value = true;

  if (MOCK_MODE) {
    // MOCK: Simula delay e usa dati fittizi
    await new Promise((resolve) => setTimeout(resolve, 300));
    newsList.value = newsData;
  } else {
    // BACKEND: Chiama l'API Laravel
    try {
      const { data } = await useFetch(`/api/news/year/${year}`);
      newsList.value = data.value || [];
    } catch (error) {
      console.error("Errore caricamento news:", error);
      newsList.value = [];
    }
  }

  isLoadingNews.value = false;
};

// Carica gli anni al mount del componente
onMounted(() => {
  loadAvailableYears();
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <section class="title-section jumbo-bg">
          <div class="overlay">
            <div class="title uppercase">
              <h1 id="news">news</h1>
            </div>
          </div>
        </section>

        <section class="news-list">
          <p class="news-list__intro">
            Vuoi tenerti informato su quello che facciamo al G I O e quello che
            succede intorno a noi?<br />
            Ti basta scegliere l'anno e potrai trovare tutte le news che
            pubblichiamo.
          </p>

          <!-- Loading anni -->
          <div
            v-if="isLoadingYears"
            class="year-selector year-selector--loading"
          >
            <span class="year-selector__label">Caricamento anni...</span>
            <div class="year-selector__buttons">
              <span class="year-btn year-btn--skeleton"></span>
              <span class="year-btn year-btn--skeleton"></span>
              <span class="year-btn year-btn--skeleton"></span>
            </div>
          </div>

          <!-- Bottoni selezione anno -->
          <div v-else-if="availableYears.length > 0" class="year-selector">
            <div class="year-selector__buttons">
              <button
                v-for="year in availableYears"
                :key="year"
                :class="[
                  'year-btn',
                  { 'year-btn--active': selectedYear === year },
                ]"
                @click="selectYear(year)"
              >
                {{ year }}
              </button>
            </div>
          </div>

          <!-- Nessun anno disponibile -->
          <div v-else class="year-selector">
            <span class="year-selector__label"
              >Nessuna news disponibile al momento.</span
            >
          </div>

          <!-- Loading news -->
          <div v-if="isLoadingNews" class="news-loading">
            <span class="news-loading__spinner"></span>
            <p>Caricamento news...</p>
          </div>

          <!-- Messaggio se nessun anno selezionato -->
          <div
            v-else-if="!selectedYear && availableYears.length > 0"
            class="news-empty"
          >
            <p>Seleziona un anno per visualizzare le news.</p>
          </div>

          <!-- Griglia news -->
          <div v-else-if="newsList.length > 0" class="news-grid">
            <div
              v-for="news in newsList"
              :key="news.id"
              class="news-grid__item"
            >
              <NewsCard :news="news" />
            </div>
          </div>

          <!-- Nessuna news per l'anno selezionato -->
          <div v-else-if="selectedYear" class="news-empty">
            <p>Nessuna news disponibile per il {{ selectedYear }}.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.col {
  .title-section {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    margin-bottom: 3rem;

    .overlay {
      height: 100%;
    }
  }

  .jumbo-bg {
    background: url(/assets/images/news/beccaccini.webp) center/cover no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }

  .news-list {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    padding-bottom: 4rem;

    &__intro {
      font-size: clamp(1rem, 2vw, 1.3rem);
      margin-bottom: 4rem;
      color: #555;
    }
  }

  // Selettore anno
  .year-selector {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e0e0e0;

    &--loading {
      opacity: 0.7;
    }

    &__label {
      font-size: 1.1rem;
      font-weight: 500;
      color: #333;
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
  }

  .year-btn {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    background-color: #f5f5f5;
    border: 2px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background-color: #e8e8e8;
      border-color: #ccc;
      transform: translateY(-2px);
    }

    &--active {
      color: #fff;
      background-color: #f68b24; // Arancione GIO
      border-color: #f68b24;

      &:hover {
        background-color: #e07a1a;
        border-color: #e07a1a;
      }
    }

    // Skeleton loading
    &--skeleton {
      width: 80px;
      height: 42px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border: none;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
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
      border-top-color: #f68b24;
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

  // Messaggio vuoto
  .news-empty {
    text-align: center;
    padding: 4rem 2rem;
    background-color: #fafafa;
    border-radius: 12px;

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
}

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
  .col {
    .year-selector {
      flex-direction: column;
      align-items: flex-start;

      &__buttons {
        width: 100%;
      }
    }

    .year-btn {
      flex: 1;
      min-width: calc(50% - 0.375rem);
      text-align: center;
    }

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
    .title-section {
      height: 350px;
    }

    .news-list {
      width: 95%;
    }

    .year-selector {
      gap: 0.75rem;
      margin-bottom: 2rem;

      &__label {
        font-size: 1rem;
      }

      &__buttons {
        gap: 0.5rem;
      }
    }

    .year-btn {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      min-width: calc(50% - 0.25rem);
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
