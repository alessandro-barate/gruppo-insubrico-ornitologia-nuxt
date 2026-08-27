<script setup lang="ts">
const route = useRoute();

// Slug catch-all: array di segmenti
const segments = computed(() =>
  Array.isArray(route.params.slug)
    ? route.params.slug
    : [route.params.slug].filter(Boolean),
);

// Classe univoca per l'intero percorso, così ogni pagina e sottopagina
// può posizionare la banda (::after) col proprio bottom.
// "ricerca-in-corso/iwc" → "subsection--ricerca-in-corso--iwc"
const pathClass = computed(() =>
  segments.value.length
    ? `subsection--${segments.value.join("--")}`
    : "subsection--root",
);

const { getNode } = useProgetti();
const { data } = await getNode(segments.value);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Pagina non trovata",
    fatal: true,
  });
}

// Discrimino i due casi restituiti dal composable
const isProject = computed(() => data.value?.kind === "project");
const section = computed(() => data.value?.section ?? null);

// Caso "section"
const projects = computed(() =>
  data.value?.kind === "section" ? data.value.projects : [],
);
const projectCards = computed(() =>
  data.value?.kind === "section" ? data.value.projectCards : [],
);
const isNavigable = computed(
  () => section.value?.projects_are_navigable === true,
);

// Caso "project"
const project = computed(() =>
  data.value?.kind === "project" ? data.value.project : null,
);

// Titolo corrente (sezione o progetto) per breadcrumb + h1
const currentTitle = computed(() =>
  isProject.value ? project.value?.title : section.value?.title,
);

// Path base per i link delle card-progetto (livello 2 navigabile)
const basePath = computed(() => `/progetti/${segments.value.join("/")}`);

// ─── Paginazione (3/pagina, sia liv.2 che liv.3) ────────
const PER_PAGE = 3;
const currentPage = ref(1);

// La lista da paginare dipende dal caso:
// - progetto navigabile (liv.2) → le card-progetto
// - sezione inline (liv.2) → i progetti mostrati come schede
// - progetto (liv.3) → i blocchi del progetto
const paginatedSource = computed(() => {
  if (isProject.value) return project.value?.blocks ?? [];
  if (isNavigable.value) return projectCards.value;
  return projects.value;
});

const totalPages = computed(() =>
  Math.ceil(paginatedSource.value.length / PER_PAGE),
);

const pageSlice = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return { start, end: start + PER_PAGE };
});

const paginatedProjectCards = computed(() =>
  projectCards.value.slice(pageSlice.value.start, pageSlice.value.end),
);
const paginatedProjects = computed(() =>
  projects.value.slice(pageSlice.value.start, pageSlice.value.end),
);
const paginatedBlocks = computed(() =>
  (project.value?.blocks ?? []).slice(
    pageSlice.value.start,
    pageSlice.value.end,
  ),
);

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
// ────────────────────────────────────────────────────────

useSeoMeta({
  title: () => currentTitle.value,
  description: () =>
    isProject.value ? undefined : section.value?.intro_excerpt,
});
</script>

<template>
  <section v-if="section" class="subsection" :class="pathClass">
    <div class="subsection__intro">
      <!-- Breadcrumb: Progetti / sezione [ / progetto ] -->
      <nav class="breadcrumb" aria-label="Percorso di navigazione">
        <NuxtLink to="/progetti" class="breadcrumb__link">
          <img
            src="../../assets/images/scientific-dissemination/chevron-left.svg"
            alt=""
          />
          Progetti
        </NuxtLink>

        <span class="breadcrumb__sep" aria-hidden="true">/</span>
        <!-- se siamo su un progetto, la sezione è un link intermedio -->
        <NuxtLink
          v-if="isProject"
          :to="`/progetti/${section.slug}`"
          class="breadcrumb__link"
        >
          {{ section.title }}
        </NuxtLink>
        <span v-else class="breadcrumb__current" aria-current="page">
          {{ section.title }}
        </span>

        <template v-if="isProject">
          <span class="breadcrumb__sep" aria-hidden="true">/</span>
          <span class="breadcrumb__current" aria-current="page">
            {{ project?.title }}
          </span>
        </template>
      </nav>

      <h1>{{ currentTitle }}</h1>

      <!-- intro: della sezione (liv.2) o del progetto (liv.3) -->
      <div
        v-if="!isProject && section.intro_text"
        class="subsection__intro-text"
        v-html="section.intro_text"
      />
      <div
        v-else-if="isProject && project?.intro"
        class="subsection__intro-text"
        v-html="project.intro"
      />
    </div>

    <!-- ═══ LIVELLO 3: pagina di un progetto ═══ -->
    <template v-if="isProject">
      <div class="subsection__items">
        <div
          v-for="(block, i) in paginatedBlocks"
          :key="i"
          class="project-block"
        >
          <div v-if="block.text" v-html="block.text" />
          <div v-if="block.links?.length" class="project-block__links">
            <ProgettiTypedLink
              v-for="link in block.links"
              :key="link.url"
              :link="link"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- ═══ LIVELLO 2 (navigabile): card-bottone verso i progetti ═══ -->
    <template v-else-if="isNavigable">
      <div class="subsection__grid">
        <SharedNavCard
          v-for="card in paginatedProjectCards"
          :key="card.slug"
          :to="`${basePath}/${card.slug}`"
          :title="card.title"
          :excerpt="card.intro_excerpt"
          :image="card.image_path"
        />
      </div>
    </template>

    <!-- ═══ LIVELLO 2 (inline): schede progetto espanse ═══ -->
    <template v-else-if="section.has_projects">
      <div class="subsection__items">
        <ProgettiProjectCard
          v-for="p in paginatedProjects"
          :key="p.id"
          :project="p"
        />
      </div>
    </template>

    <!-- Paginazione condivisa da tutti i casi con più di una pagina -->
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

// ─── Posizionamento banda (::after) per percorso ─────────

// Livello 2 — sezioni
.subsection--ricerca-in-corso::after {
  bottom: 71px;
}

.subsection--ricerca-terminati::after {
  bottom: -1385px;
}

.subsection--atlanti::after {
  bottom: 129px;
}

.subsection--altri-lavori::after {
  bottom: -278px;
}

// Livello 3 — pagine progetto (sezione--progetto)
.subsection--ricerca-in-corso--iwc::after {
  bottom: 60px;
}
// ─────────────────────────────────────────────────────────

.project-block {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--color-text-muted, #333);
  line-height: 1.7;

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.6rem;
  }
}
</style>
