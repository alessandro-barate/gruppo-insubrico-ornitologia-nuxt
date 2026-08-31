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

// Paginazione (logica condivisa in usePagination)
const itemCount = computed(() => subsection.value?.items.length ?? 0);
const { currentPage, totalPages, paginate, goToPage, listTop } = usePagination(
  itemCount,
  { perPage: 4 },
);

const paginatedItems = computed(() => paginate(subsection.value?.items ?? []));

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

    <div ref="listTop" class="subsection__items">
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
