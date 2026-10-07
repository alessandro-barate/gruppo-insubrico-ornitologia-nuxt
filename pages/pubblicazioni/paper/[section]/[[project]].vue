<script setup lang="ts">
// Ricerche dentro Pubblicazioni → Paper (ex pagine /progetti/...).
//   /pubblicazioni/paper/<sezione>             → sezione
//   /pubblicazioni/paper/<sezione>/<progetto>  → progetto (sezioni navigabili)
// La pagina /pubblicazioni/paper resta gestita da pubblicazioni/[...slug].vue.
import { RICERCHE_BASE_PATH } from "~/composables/useRicerche";

const route = useRoute();

// [section] obbligatorio, [[project]] facoltativo
const segments = computed(() =>
  [route.params.section, route.params.project]
    .flat()
    .filter((s): s is string => typeof s === "string" && s.length > 0),
);

const { getNode } = useRicerche();
const { data } = await getNode(segments.value);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Pagina non trovata",
    fatal: true,
  });
}

// Titolo della pagina Paper per il breadcrumb (dall'albero Pubblicazioni)
const { buildCrumbs } = usePubblicazioni();
const paperTitle = computed(() => buildCrumbs(["paper"])[0]?.title ?? "Paper");

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

// Path base per i link delle card-progetto (livello navigabile)
const basePath = computed(
  () => `${RICERCHE_BASE_PATH}/${segments.value.join("/")}`,
);

// ─── Paginazione (3/pagina) ─────────────────────────────
// - sezione navigabile → le card-progetto
// - sezione inline → i progetti mostrati come schede
// - progetto → i blocchi del progetto
const paginatedSource = computed(() => {
  if (isProject.value) return project.value?.blocks ?? [];
  if (isNavigable.value) return projectCards.value;
  return projects.value;
});

const itemCount = computed(() => paginatedSource.value.length);
const { currentPage, totalPages, pageRange, goToPage, listTop } = usePagination(
  itemCount,
  { perPage: 3 },
);

const paginatedProjectCards = computed(() =>
  projectCards.value.slice(pageRange.value.start, pageRange.value.end),
);
const paginatedProjects = computed(() =>
  projects.value.slice(pageRange.value.start, pageRange.value.end),
);
const paginatedBlocks = computed(() =>
  (project.value?.blocks ?? []).slice(
    pageRange.value.start,
    pageRange.value.end,
  ),
);
// ────────────────────────────────────────────────────────

useSeoMeta({
  title: () => currentTitle.value,
  description: () =>
    isProject.value ? undefined : section.value?.intro_excerpt,
});
</script>

<template>
  <section v-if="section" class="subsection">
    <div class="subsection__intro">
      <!-- Breadcrumb: Pubblicazioni / Paper / sezione [ / progetto ] -->
      <nav class="breadcrumb" aria-label="Percorso di navigazione">
        <NuxtLink to="/pubblicazioni" class="breadcrumb__link">
          <img
            src="~/assets/images/scientific-dissemination/chevron-left.svg"
            alt="Freccia sinistra per navigare al menù precedente"
          />
          Pubblicazioni
        </NuxtLink>

        <span class="breadcrumb__sep" aria-hidden="true">/</span>
        <NuxtLink :to="RICERCHE_BASE_PATH" class="breadcrumb__link">
          {{ paperTitle }}
        </NuxtLink>

        <span class="breadcrumb__sep" aria-hidden="true">/</span>
        <!-- se siamo su un progetto, la sezione è un link intermedio -->
        <NuxtLink
          v-if="isProject"
          :to="`${RICERCHE_BASE_PATH}/${section.slug}`"
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

      <!-- intro: della sezione o del progetto -->
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

    <div ref="listTop">
      <!-- ═══ Pagina di un progetto ═══ -->
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

      <!-- ═══ Sezione navigabile: card-bottone verso i progetti ═══ -->
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

      <!-- ═══ Sezione inline: schede progetto espanse ═══ -->
      <template v-else-if="section.has_projects">
        <div class="subsection__items">
          <ProgettiProjectCard
            v-for="p in paginatedProjects"
            :key="p.id"
            :project="p"
          />
        </div>
      </template>
    </div>

    <!-- Paginazione condivisa da tutti i casi con più di una pagina -->
    <nav v-if="totalPages > 1" class="pagination" aria-label="Paginazione">
      <button
        class="pagination__arrow"
        :disabled="currentPage === 1"
        aria-label="Pagina precedente"
        @click="goToPage(currentPage - 1)"
      >
        <img
          src="~/assets/images/scientific-dissemination/chevron-left.svg"
          alt="Freccia sinistra per navigare al menù precedente"
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
