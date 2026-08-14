<script setup lang="ts">
const route = useRoute();
const slug = route.params.subsection as string;

const { getSubsection } = useDivulgazione();
const { data: subsection } = await getSubsection(slug);

// Sottosezioni dinamiche → uno slug inesistente deve dare 404
if (!subsection.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Sottosezione non trovata",
    fatal: true,
  });
}

// Paginazione
const PER_PAGE = 4;
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil((subsection.value?.items.length ?? 0) / PER_PAGE),
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return subsection.value?.items.slice(start, start + PER_PAGE) ?? [];
});

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

useSeoMeta({
  title: () => subsection.value?.title,
  description: () => subsection.value?.intro_excerpt,
});
</script>

<template>
  <section v-if="subsection" class="subsection">
    <div class="subsection__intro">
      <div class="subsection__back">
        <NuxtLink to="/divulgazione" class="subsection__link">
          <img
            src="../../assets/images/scientific-dissemination/chevron-left.svg"
            alt=""
          />
        </NuxtLink>
        <span>Divulgazione</span>
      </div>
      <h1>{{ subsection.title }}</h1>
      <!-- intro_text arriva come HTML sanitizzato dal backend -->
      <div class="subsection__intro-text" v-html="subsection.intro_text" />
    </div>

    <div class="subsection__items">
      <DivulgazioneItemCard
        v-for="item in paginatedItems"
        :key="item.id"
        :item="item"
      />
    </div>

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
  </section>
</template>

<style scoped lang="scss">
.subsection {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
  color: var(--color-text-muted, #333);

  &__back {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 1rem;
    text-decoration: none;

    img {
      width: 100%;
      margin-left: 0;
      transition: all 0.5s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &__link {
    width: 1%;
    margin-left: 0;
    margin-right: 1.5rem;
  }

  span {
    margin-left: 0;
    margin-right: 0;
  }

  &__intro {
    margin-bottom: 3rem;
  }
}

.subsection__intro h1 {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  margin-bottom: 1rem;
}

.subsection__intro-text {
  color: var(--color-text-muted, #444);
  line-height: 1.7;
}

.subsection__items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pagination {
  width: 50%;
  margin-top: 2rem;
  text-align: center;

  button {
    border: none;
    background-color: transparent;
  }

  &__page {
    color: #333;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  &__arrow {
    width: 10%;
    color: aqua;

    img {
      width: 20%;
    }
  }

  &__arrow,
  &__page {
    cursor: pointer;
  }
}
</style>
