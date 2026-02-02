<script setup>
/**
 * ContentSection.vue
 * Componente riutilizzabile per visualizzare contenuti filtrabili per tema e anno.
 * Usato in: Progetti, Pubblicazioni, Divulgazione
 *
 * NOTA: La hero section è nella pagina, questo componente gestisce solo filtri + contenuti
 */

const props = defineProps({
  // Tipo di contenuto per le chiamate API
  contentType: {
    type: String,
    required: true,
    validator: (value) =>
      ["progetti", "pubblicazioni", "divulgazione"].includes(value),
  },
  // Testo introduttivo (opzionale)
  introText: {
    type: String,
    default: "",
  },
});

// ============================================
// STATE
// ============================================

// Categorie/Temi disponibili
const categories = ref([]);
const selectedCategory = ref(null);
const isLoadingCategories = ref(true);

// Anni disponibili (caricati dopo selezione categoria)
const availableYears = ref([]);
const selectedYear = ref(null);
const isLoadingYears = ref(false);

// Contenuti
const contentList = ref([]);
const isLoadingContent = ref(false);

// ============================================
// MOCK DATA (da rimuovere quando c'è il backend)
// ============================================

const mockCategories = {
  progetti: [
    { id: 1, name: "IWC", slug: "iwc" },
    { id: 2, name: "Rondoni", slug: "rondoni" },
    { id: 3, name: "ZPS Canneti del Lago Maggiore", slug: "zps" },
  ],
  pubblicazioni: [
    { id: 1, name: "Quaderni", slug: "quaderni" },
    { id: 2, name: "Resoconto Ornitologico", slug: "resoconto-ornitologico" },
    { id: 3, name: "BOL", slug: "bol" },
  ],
  divulgazione: [
    { id: 1, name: "Convegni", slug: "convegni" },
    { id: 2, name: "Corsi", slug: "corsi" },
    { id: 3, name: "Eventi", slug: "eventi" },
    { id: 4, name: "Rassegna Stampa", slug: "rassegna-stampa" },
  ],
};

const mockYears = {
  iwc: [2026, 2025, 2024, 2023, 2022],
  rondoni: [2025, 2024, 2023],
  zps: [2024, 2023, 2022, 2021],
  quaderni: [2025, 2024, 2023, 2022, 2021],
  "resoconto-ornitologico": [2024, 2023, 2022],
  bol: [2025, 2024, 2023],
  convegni: [2025, 2024, 2023],
  corsi: [2024, 2023],
  eventi: [2025, 2024, 2023, 2022],
  "rassegna-stampa": [2025, 2024],
};

const mockContent = [
  {
    id: 1,
    title: "Censimento invernale degli uccelli acquatici 2025",
    slug: "censimento-iwc-2025",
    excerpt:
      "I risultati del censimento IWC 2025 mostrano un incremento delle popolazioni svernanti...",
    image: "/assets/images/placeholder.webp",
    published_at: "2025-01-15",
  },
  {
    id: 2,
    title: "Monitoraggio colonie di rondoni",
    slug: "monitoraggio-rondoni-2024",
    excerpt:
      "Il progetto di monitoraggio delle colonie urbane prosegue con risultati incoraggianti...",
    image: "/assets/images/placeholder.webp",
    published_at: "2024-06-20",
  },
  {
    id: 3,
    title: "Nuova pubblicazione sui canneti",
    slug: "pubblicazione-canneti-2024",
    excerpt:
      "È stata pubblicata la nuova ricerca sulla conservazione dei canneti del Lago Maggiore...",
    image: "/assets/images/placeholder.webp",
    published_at: "2024-09-10",
  },
];

// ============================================
// FUNZIONI
// ============================================

/**
 * Carica le categorie/temi disponibili per questo tipo di contenuto
 */
const loadCategories = async () => {
  isLoadingCategories.value = true;

  // MOCK - Sostituire con chiamata API
  // const { data } = await useFetch(`/api/categories?type=${props.contentType}`)
  await new Promise((resolve) => setTimeout(resolve, 300));
  categories.value = mockCategories[props.contentType] || [];

  isLoadingCategories.value = false;
};

/**
 * Seleziona una categoria/tema
 */
const selectCategory = async (category) => {
  // Toggle se clicco sulla stessa categoria
  if (selectedCategory.value?.slug === category.slug) {
    selectedCategory.value = null;
    availableYears.value = [];
    selectedYear.value = null;
    contentList.value = [];
    return;
  }

  selectedCategory.value = category;
  selectedYear.value = null;
  contentList.value = [];

  // Carica gli anni disponibili per questa categoria
  await loadYearsForCategory(category.slug);
};

/**
 * Carica gli anni disponibili per una categoria
 */
const loadYearsForCategory = async (categorySlug) => {
  isLoadingYears.value = true;

  // MOCK - Sostituire con chiamata API
  // const { data } = await useFetch(`/api/years?type=${props.contentType}&category=${categorySlug}`)
  await new Promise((resolve) => setTimeout(resolve, 200));
  availableYears.value = mockYears[categorySlug] || [];

  isLoadingYears.value = false;
};

/**
 * Seleziona un anno e carica i contenuti
 */
const selectYear = async (year) => {
  // Toggle se clicco sullo stesso anno
  if (selectedYear.value === year) {
    selectedYear.value = null;
    contentList.value = [];
    return;
  }

  selectedYear.value = year;
  await loadContent();
};

/**
 * Carica i contenuti filtrati per categoria e anno
 */
const loadContent = async () => {
  if (!selectedCategory.value || !selectedYear.value) return;

  isLoadingContent.value = true;

  // MOCK - Sostituire con chiamata API
  // const { data } = await useFetch(`/api/contents?type=${props.contentType}&category=${selectedCategory.value.slug}&year=${selectedYear.value}`)
  await new Promise((resolve) => setTimeout(resolve, 400));
  contentList.value = mockContent;

  isLoadingContent.value = false;
};

/**
 * Reset completo dei filtri
 */
const resetFilters = () => {
  selectedCategory.value = null;
  availableYears.value = [];
  selectedYear.value = null;
  contentList.value = [];
};

// Carica le categorie al mount
onMounted(() => {
  loadCategories();
});
</script>

<template>
  <section class="content-section">
    <!-- Intro text -->
    <p v-if="introText" class="content-section__intro">{{ introText }}</p>

    <!-- FILTRO 1: Categorie/Temi -->
    <div class="filter-group">
      <!-- Loading categorie -->
      <div
        v-if="isLoadingCategories"
        class="filter-selector filter-selector--loading"
      >
        <span class="filter-selector__label">Caricamento temi...</span>
        <div class="filter-selector__buttons">
          <span class="filter-btn filter-btn--skeleton"></span>
          <span class="filter-btn filter-btn--skeleton"></span>
          <span class="filter-btn filter-btn--skeleton"></span>
        </div>
      </div>

      <!-- Bottoni categorie -->
      <div v-else-if="categories.length > 0" class="filter-selector">
        <span class="filter-selector__label">Seleziona il tema:</span>
        <div class="filter-selector__buttons">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="[
              'filter-btn',
              'filter-btn--category',
              {
                'filter-btn--active': selectedCategory?.slug === category.slug,
              },
            ]"
            @click="selectCategory(category)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Nessuna categoria -->
      <div v-else class="filter-selector">
        <span class="filter-selector__label">Nessun tema disponibile.</span>
      </div>
    </div>

    <!-- FILTRO 2: Anni (visibile solo dopo selezione categoria) -->
    <Transition name="fade-slide">
      <div v-if="selectedCategory" class="filter-group">
        <!-- Loading anni -->
        <div
          v-if="isLoadingYears"
          class="filter-selector filter-selector--loading"
        >
          <span class="filter-selector__label">Caricamento anni...</span>
          <div class="filter-selector__buttons">
            <span
              class="filter-btn filter-btn--skeleton filter-btn--small"
            ></span>
            <span
              class="filter-btn filter-btn--skeleton filter-btn--small"
            ></span>
            <span
              class="filter-btn filter-btn--skeleton filter-btn--small"
            ></span>
          </div>
        </div>

        <!-- Bottoni anni -->
        <div v-else-if="availableYears.length > 0" class="filter-selector">
          <span class="filter-selector__label">Seleziona l'anno:</span>
          <div class="filter-selector__buttons">
            <button
              v-for="year in availableYears"
              :key="year"
              :class="[
                'filter-btn',
                'filter-btn--year',
                { 'filter-btn--active': selectedYear === year },
              ]"
              @click="selectYear(year)"
            >
              {{ year }}
            </button>
          </div>
        </div>

        <!-- Nessun anno -->
        <div v-else class="filter-selector">
          <span class="filter-selector__label"
            >Nessun contenuto disponibile per questo tema.</span
          >
        </div>
      </div>
    </Transition>

    <!-- Pulsante reset (visibile se c'è almeno un filtro attivo) -->
    <Transition name="fade">
      <button v-if="selectedCategory" class="reset-btn" @click="resetFilters">
        <span class="reset-btn__icon">✕</span>
        Resetta filtri
      </button>
    </Transition>

    <!-- CONTENUTI -->
    <div class="content-area">
      <!-- Loading contenuti -->
      <div v-if="isLoadingContent" class="content-loading">
        <span class="content-loading__spinner"></span>
        <p>Caricamento contenuti...</p>
      </div>

      <!-- Messaggio iniziale -->
      <div v-else-if="!selectedCategory" class="content-empty">
        <p>Seleziona un tema per visualizzare i contenuti.</p>
      </div>

      <!-- Messaggio dopo selezione categoria -->
      <div v-else-if="selectedCategory && !selectedYear" class="content-empty">
        <p>
          Seleziona un anno per visualizzare i contenuti di "{{
            selectedCategory.name
          }}".
        </p>
      </div>

      <!-- Griglia contenuti -->
      <div v-else-if="contentList.length > 0" class="content-grid">
        <NuxtLink
          v-for="item in contentList"
          :key="item.id"
          :to="`/${contentType}/${item.slug}`"
          class="content-card"
        >
          <div class="content-card__image">
            <img
              :src="item.image || '/assets/images/placeholder.webp'"
              :alt="item.title"
              loading="lazy"
            />
          </div>
          <div class="content-card__body">
            <h3 class="content-card__title">{{ item.title }}</h3>
            <p class="content-card__excerpt">{{ item.excerpt }}</p>
            <span class="content-card__date">
              {{
                new Date(item.published_at).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Nessun contenuto trovato -->
      <div v-else class="content-empty">
        <p>Nessun contenuto trovato per i filtri selezionati.</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// ============================================
// VARIABILI
// ============================================
$primary-color: #f68b24;
$primary-dark: #e07a1a;
$secondary-color: #d2420d;
$text-dark: #333;
$text-medium: #555;
$text-light: #666;
$bg-light: #f5f5f5;
$bg-lighter: #fafafa;
$border-color: rgb(141, 141, 141);

// ============================================
// MAIN SECTION
// ============================================
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 4rem;

  &__intro {
    font-size: clamp(1rem, 2vw, 1.3rem);
    margin-bottom: 4rem;
    color: $text-medium;
  }
}

// ============================================
// FILTER GROUPS
// ============================================
.filter-group {
  margin-bottom: 2rem;
}

.filter-selector {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid $border-color;

  &__label {
    font-size: 1.1rem;
    font-weight: 500;
    color: $text-dark;
    min-width: 150px;
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  &--loading {
    .filter-selector__label {
      color: $text-light;
    }
  }
}

// ============================================
// FILTER BUTTONS
// ============================================
.filter-btn {
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: $text-dark;
  background-color: $bg-light;
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
    background-color: $primary-color;
    border-color: $primary-color;

    &:hover {
      background-color: $primary-dark;
      border-color: $primary-dark;
    }
  }

  // Variante per categorie (più grande)
  &--category {
    padding: 0.75rem 1.75rem;
    font-size: 1.05rem;
  }

  // Variante per anni (più compatto)
  &--year {
    padding: 0.5rem 1.25rem;
    font-size: 0.95rem;
    min-width: 80px;
  }

  // Skeleton loading
  &--skeleton {
    width: 100px;
    height: 42px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border: none;
    border-radius: 8px;

    &.filter-btn--small {
      width: 70px;
      height: 38px;
    }
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

// ============================================
// RESET BUTTON
// ============================================
.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: $text-light;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: $secondary-color;
    border-color: $secondary-color;
    background-color: rgba($secondary-color, 0.05);
  }

  &__icon {
    font-size: 0.8rem;
  }
}

// ============================================
// CONTENT AREA
// ============================================
.content-area {
  min-height: 300px;
}

.content-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: $text-light;

  &__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f0f0f0;
    border-top-color: $primary-color;
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

.content-empty {
  text-align: center;
  padding: 4rem 2rem;
  background-color: $bg-lighter;
  border-radius: 12px;
  border: 1px dashed $border-color;

  p {
    font-size: 1.1rem;
    color: $text-light;
  }
}

// ============================================
// CONTENT GRID
// ============================================
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.content-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);

    .content-card__image img {
      transform: scale(1.05);
    }
  }

  &__image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
  }

  &__body {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 1.2rem;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }

  &__excerpt {
    font-size: 0.95rem;
    color: $text-medium;
    line-height: 1.6;
    flex: 1;
    margin-bottom: 1rem;

    // Limita a 3 righe
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__date {
    font-size: 0.85rem;
    color: $text-light;
    padding-top: 0.75rem;
    border-top: 1px solid $border-color;
  }
}

// ============================================
// TRANSITIONS
// ============================================
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// ============================================
// RESPONSIVE
// ============================================
@media (max-width: 768px) {
  .filter-selector {
    flex-direction: column;
    align-items: flex-start;

    &__label {
      min-width: auto;
      margin-bottom: 0.5rem;
    }
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;

    &--category {
      padding: 0.6rem 1.25rem;
      font-size: 0.95rem;
    }
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-section {
    padding-bottom: 3rem;
  }

  .filter-selector__buttons {
    width: 100%;
  }

  .filter-btn {
    flex: 1;
    text-align: center;
    min-width: calc(50% - 0.375rem);
  }
}
</style>
