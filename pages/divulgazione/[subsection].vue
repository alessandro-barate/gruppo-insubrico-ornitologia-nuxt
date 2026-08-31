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
          Divulgazione</NuxtLink
        >
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
@use "~/assets/scss/_partials/subsection" as *;

h1 {
  text-align: center;
}
</style>
