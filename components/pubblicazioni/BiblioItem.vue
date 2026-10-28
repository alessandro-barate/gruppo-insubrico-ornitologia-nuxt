<script setup lang="ts">
import type { BibliographyItem } from "~/composables/usePubblicazioni";

defineProps<{
  item: BibliographyItem;
}>();
</script>

<template>
  <!-- text arriva come HTML sanitizzato dal backend (può contenere <em>).
       Con un PDF il testo è un link che lo apre in una nuova scheda. -->
  <li class="biblio-item">
    <a
      v-if="item.pdf_url"
      :href="item.pdf_url"
      class="biblio-item__link"
      target="_blank"
      rel="noopener"
    >
      <span v-html="item.text" />
      <span class="sr-only"> (PDF, si apre in una nuova scheda)</span>
    </a>
    <span v-else v-html="item.text" />
  </li>
</template>

<style scoped lang="scss">
.biblio-item {
  padding-left: 0.5rem;
  // niente margini automatici degli stili globali: le voci corte
  // restano allineate a sinistra come le altre
  margin-left: 0;
  margin-right: 0;

  // annulla i margini automatici che gli stili globali danno agli span
  span {
    margin: 0;
  }

  :deep(em) {
    font-style: italic;
  }

  &__link {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: rgba(35, 49, 98, 0.35);
    text-underline-offset: 0.2em;
    transition:
      color 0.2s ease,
      text-decoration-color 0.2s ease;

    &:hover {
      color: #233162;
      text-decoration-color: #233162;
    }

    &:focus-visible {
      outline: 2px solid #233162;
      outline-offset: 2px;
      border-radius: 2px;
    }
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
