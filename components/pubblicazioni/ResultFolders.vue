<script setup lang="ts">
// Risultati delle ricerche (pagina Altre Pubblicazioni): una "cartella"
// per ricerca, mostrata come accordion. Cliccando sul titolo si aprono i
// suoi file (PDF, link, Excel…). Si apre una cartella alla volta.
// Ha una paginazione propria (default 15 cartelle per pagina),
// indipendente da quella della bibliografia sottostante.
import type { ResultFolder } from "~/composables/usePubblicazioni";

const props = withDefaults(
  defineProps<{
    folders: ResultFolder[];
    title?: string;
    perPage?: number;
  }>(),
  { title: "Risultati delle ricerche", perPage: 15 },
);

// Cartelle da mostrare:
// - file senza indirizzo scartati (segnaposto o lasciati a metà dal pannello)
// - cartelle rimaste senza file nascoste
// - ordine: anno più recente → più vecchio; senza anno in fondo.
//   sort() è stabile: a parità di anno resta l'ordine inserito.
const visibleFolders = computed(() =>
  props.folders
    .map((f) => ({ ...f, files: f.files.filter((l) => l.url?.trim()) }))
    .filter((f) => f.files.length > 0)
    .sort((a, b) => {
      const ya = a.year ?? null;
      const yb = b.year ?? null;
      if (ya === yb) return 0;
      if (ya === null) return 1;
      if (yb === null) return -1;
      return yb - ya;
    }),
);

// ─── Paginazione ────────────────────────────────────────
const itemCount = computed(() => visibleFolders.value.length);
const { currentPage, totalPages, paginate, goToPage, listTop } = usePagination(
  itemCount,
  { perPage: props.perPage },
);
const pageFolders = computed(() => paginate(visibleFolders.value));

// ─── Accordion ──────────────────────────────────────────
// id della cartella aperta (una alla volta), null = tutte chiuse
const openId = ref<number | null>(null);

function toggle(id: number) {
  openId.value = openId.value === id ? null : id;
}

// Cambiando pagina si chiude la cartella aperta
watch(currentPage, () => {
  openId.value = null;
});
</script>

<template>
  <section v-if="visibleFolders.length" class="results">
    <h3 class="results__title">{{ title }}</h3>

    <ul ref="listTop" class="results__list">
      <li
        v-for="folder in pageFolders"
        :key="folder.id"
        class="results__folder"
        :class="{ 'is-open': openId === folder.id }"
      >
        <h4 class="results__heading">
          <button
            :id="`result-btn-${folder.id}`"
            type="button"
            class="results__toggle"
            :aria-expanded="openId === folder.id"
            :aria-controls="`result-panel-${folder.id}`"
            @click="toggle(folder.id)"
          >
            <span v-if="folder.year" class="results__year">{{
              folder.year
            }}</span>
            <span class="results__name">{{ folder.title }}</span>
            <span class="results__count">
              {{ folder.files.length }}
              file
            </span>
            <span class="results__chevron" aria-hidden="true" />
          </button>
        </h4>

        <div
          v-show="openId === folder.id"
          :id="`result-panel-${folder.id}`"
          class="results__panel"
          role="region"
          :aria-labelledby="`result-btn-${folder.id}`"
        >
          <div class="results__files">
            <ProgettiTypedLink
              v-for="file in folder.files"
              :key="file.url"
              :link="file"
            />
          </div>
        </div>
      </li>
    </ul>

    <!-- Paginazione delle cartelle (indipendente dalla bibliografia) -->
    <nav
      v-if="totalPages > 1"
      class="pagination"
      aria-label="Paginazione dei risultati"
    >
      <button
        class="pagination__arrow"
        :disabled="currentPage === 1"
        aria-label="Pagina precedente"
        @click="goToPage(currentPage - 1)"
      >
        <img
          src="~/assets/images/scientific-dissemination/chevron-left.svg"
          alt="Freccia sinistra per navigare alla pagina precedente dei risultati"
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
          alt="Freccia destra per navigare alla pagina successiva dei risultati"
        />
      </button>
    </nav>
  </section>
</template>

<style scoped lang="scss">
// Stili della paginazione condivisi con le altre pagine
@use "~/assets/scss/_partials/subsection" as *;

.results {
  width: 95%;
  max-width: 1000px;
  margin: 0 auto 5rem;

  &__title {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid rgba(35, 49, 98, 0.2);
  }

  &__folder {
    border-bottom: 1px solid rgba(35, 49, 98, 0.2);
  }

  &__heading {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  // Riga cliccabile: anno | titolo | n. file | freccia
  &__toggle {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
    padding: 1rem 0.75rem;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(35, 49, 98, 0.05);
    }

    &:focus-visible {
      outline: 3px solid #233162;
      outline-offset: -3px;
    }

    // annulla il margine automatico che lo stile globale dà agli span
    > span {
      margin: 0;
    }
  }

  &__year {
    flex-shrink: 0;
    min-width: 3.5rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    background: #233162;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
  }

  &__name {
    flex: 1;
    font-weight: 500;
    line-height: 1.4;
  }

  &__count {
    flex-shrink: 0;
    font-size: 0.85rem;
    color: var(--color-text-muted, #666);
    white-space: nowrap;
  }

  // Freccia che ruota quando la cartella è aperta
  &__chevron {
    flex-shrink: 0;
    width: 0.6rem;
    height: 0.6rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg);
    transition: transform 0.2s ease;
  }

  &__folder.is-open &__chevron {
    transform: rotate(-135deg);
  }

  &__folder.is-open &__toggle {
    background: rgba(35, 49, 98, 0.05);
  }

  &__panel {
    padding: 0.5rem 0.75rem 1.25rem;
  }

  &__files {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    // tutti i file larghi uguale, testo allineato a sinistra
    :deep(.typed-link) {
      width: 100%;
      margin: 0;
      justify-content: flex-start;
      text-align: left;

      // icona e testo senza i margini automatici degli stili globali
      > * {
        margin: 0;
      }
    }
  }

  .pagination {
    margin-top: 2rem;
  }

  // Mobile: l'anno sopra il titolo, il contatore resta a destra
  @media (max-width: 576px) {
    &__toggle {
      flex-wrap: wrap;
      gap: 0.5rem 0.75rem;
    }

    &__name {
      flex-basis: 100%;
      order: 3;
    }

    // contatore e freccia sempre a destra, anche senza anno
    &__toggle > &__count {
      margin-left: auto;
    }
  }
}
</style>
