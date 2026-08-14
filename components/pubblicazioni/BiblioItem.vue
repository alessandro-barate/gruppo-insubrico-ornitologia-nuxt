<script setup lang="ts">
import type { BibliographyItem } from "~/composables/usePubblicazioni";

defineProps<{
  item: BibliographyItem;
}>();
</script>

<template>
  <!-- text arriva come HTML sanitizzato dal backend (può contenere <em>) -->
  <li class="biblio-item" v-html="item.text" />
</template>

<style scoped>
.biblio-item {
  padding-left: 0.5rem;
}

.biblio-item :deep(em) {
  font-style: italic;
}
</style>
