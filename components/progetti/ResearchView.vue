<script setup lang="ts">
// Sezione o progetto di ricerca, mostrato in una delle due viste:
//   view="progetti"      → /progetti/<sezione>[/<progetto>]
//   view="pubblicazioni" → /pubblicazioni/altre-pubblicazioni/<sezione>[/<progetto>]
// Stessi dati (useProgetti.ts), parti diverse di ogni progetto
// (vedi ProjectPart in useProgetti.ts):
//   - progetti: intro + blocchi di solo testo (la descrizione). Nelle
//     sezioni che NON sono anche in Altre Pubblicazioni (es. atlanti)
//     si vede tutto, link compresi.
//   - pubblicazioni: solo i blocchi con link (PDF, articoli).
import {
  blocksFor,
  projectPartFor,
  type ResearchView,
} from "~/composables/useProgetti";

interface Crumb {
  title: string;
  to: string;
}

const props = defineProps<{
  // [sezione] oppure [sezione, progetto]
  segments: string[];
  view: ResearchView;
  // percorso a cui si aggiungono gli slug (es. "/progetti")
  basePath: string;
  // voci del breadcrumb prima della sezione (la prima ha la freccia)
  rootCrumbs: Crumb[];
  // se presente, sezioni consentite in questa vista (le altre → 404)
  allowedSections?: string[];
}>();

const { getNode } = useProgetti();
const { data } = await getNode(props.segments);

const notAllowed =
  !!data.value &&
  !!props.allowedSections &&
  !props.allowedSections.includes(data.value.section.slug);

if (!data.value || notAllowed) {
  throw createError({
    statusCode: 404,
    statusMessage: "Pagina non trovata",
    fatal: true,
  });
}

// Discrimino i due casi restituiti dal composable
const isProject = computed(() => data.value?.kind === "project");
const section = computed(() => data.value?.section ?? null);

// Parte dei progetti da mostrare in questa vista (vedi commento in cima)
const part = computed(() =>
  projectPartFor(props.view, section.value?.slug ?? ""),
);

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

// Intro del progetto: la descrizione (intro) in Progetti,
// il testo dei risultati (results_intro) in Altre Pubblicazioni
const projectIntro = computed(() =>
  part.value === "results"
    ? project.value?.results_intro
    : project.value?.intro,
);

// Blocchi del progetto da mostrare in questa vista
const visibleBlocks = computed(() =>
  project.value ? blocksFor(project.value, part.value) : [],
);

// Titolo corrente (sezione o progetto) per breadcrumb + h1
const currentTitle = computed(() =>
  isProject.value ? project.value?.title : section.value?.title,
);

// Path base per i link delle card-progetto (livello navigabile)
const sectionPath = computed(
  () => `${props.basePath}/${section.value?.slug ?? ""}`,
);

// ─── Paginazione (3/pagina) ─────────────────────────────
// - sezione navigabile → le card-progetto
// - sezione inline → i progetti mostrati come schede
// - progetto → i blocchi visibili del progetto
const paginatedSource = computed(() => {
  if (isProject.value) return visibleBlocks.value;
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
  visibleBlocks.value.slice(pageRange.value.start, pageRange.value.end),
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
      <!-- Breadcrumb: radice (es. Progetti, oppure Pubblicazioni /
           Altre Pubblicazioni) / sezione [ / progetto ] -->
      <nav class="breadcrumb" aria-label="Percorso di navigazione">
        <template v-for="(crumb, i) in rootCrumbs" :key="crumb.to">
          <span v-if="i > 0" class="breadcrumb__sep" aria-hidden="true">/</span>
          <NuxtLink :to="crumb.to" class="breadcrumb__link">
            <img
              v-if="i === 0"
              src="~/assets/images/scientific-dissemination/chevron-left.svg"
              alt="Freccia sinistra per navigare al menù precedente"
            />
            {{ crumb.title }}
          </NuxtLink>
        </template>

        <span class="breadcrumb__sep" aria-hidden="true">/</span>
        <!-- se siamo su un progetto, la sezione è un link intermedio -->
        <NuxtLink v-if="isProject" :to="sectionPath" class="breadcrumb__link">
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

      <!-- intro: della sezione (sempre) o del progetto (non nei risultati) -->
      <div
        v-if="!isProject && section.intro_text"
        class="subsection__intro-text"
        v-html="section.intro_text"
      />
      <div
        v-else-if="isProject && projectIntro"
        class="subsection__intro-text"
        v-html="projectIntro"
      />
    </div>

    <div ref="listTop">
      <!-- ═══ Pagina di un progetto ═══ -->
      <template v-if="isProject">
        <div v-if="visibleBlocks.length" class="subsection__items">
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
        <p v-else-if="view === 'pubblicazioni'" class="research-empty">
          Al momento non ci sono pubblicazioni per questo progetto.
        </p>
      </template>

      <!-- ═══ Sezione navigabile: card-bottone verso i progetti ═══ -->
      <template v-else-if="isNavigable">
        <div class="subsection__grid">
          <SharedNavCard
            v-for="card in paginatedProjectCards"
            :key="card.slug"
            :to="`${sectionPath}/${card.slug}`"
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
            :part="part"
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
    justify-content: center;
    gap: 0.6rem;
    margin-top: 0.6rem;
  }
}

// Messaggio quando la vista non ha nulla da mostrare per un progetto
.research-empty {
  text-align: center;
  color: var(--color-text-muted, #555);
  margin: 2rem 0 4rem;
}
</style>
