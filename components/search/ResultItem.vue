<script setup lang="ts">
// Un risultato della ricerca: usato dall'overlay e dalla pagina /cerca.
// Pagine del sito → NuxtLink; PDF e siti esterni → nuova scheda.
import type { SearchResult } from "~/composables/useSearch";

const props = withDefaults(
  defineProps<{
    result: SearchResult;
    active?: boolean; // evidenziato con le frecce della tastiera
    showExcerpt?: boolean;
  }>(),
  { active: false, showExcerpt: true },
);

const emit = defineEmits<{ select: [] }>();

const titleHtml = computed(() =>
  highlightTerms(props.result.title, props.result.terms),
);
const excerptHtml = computed(() =>
  props.result.excerpt
    ? highlightTerms(props.result.excerpt, props.result.terms)
    : "",
);

const isPage = computed(() => props.result.target === "page");
const NuxtLink = resolveComponent("NuxtLink");

// Etichetta del tipo di file, dall'estensione (PDF, XLS…)
const badge = computed(() => {
  if (props.result.target === "external") return "Sito esterno";
  if (props.result.target === "file") {
    const ext = props.result.url.split("?")[0].split(".").pop() ?? "";
    return ext && ext.length <= 4 ? ext.toUpperCase() : "File";
  }
  return "";
});

const meta = computed(() =>
  [props.result.context, props.result.year].filter(Boolean).join(" · "),
);
</script>

<template>
  <component
    :is="isPage ? NuxtLink : 'a'"
    :to="isPage ? result.url : undefined"
    :href="isPage ? undefined : result.url"
    :target="isPage ? undefined : '_blank'"
    :rel="isPage ? undefined : 'noopener noreferrer'"
    class="search-result"
    :class="{ 'is-active': active }"
    @click="emit('select')"
  >
    <span class="search-result__head">
      <!-- titolo già "escapato" da highlightTerms: v-html sicuro -->
      <span class="search-result__title" v-html="titleHtml" />
      <span v-if="badge" class="search-result__badge">
        {{ badge }}
        <span v-if="!isPage" aria-hidden="true">↗</span>
        <span v-if="!isPage" class="sr-only">(si apre in una nuova scheda)</span>
      </span>
    </span>
    <span v-if="meta" class="search-result__meta">{{ meta }}</span>
    <span
      v-if="showExcerpt && excerptHtml"
      class="search-result__excerpt"
      v-html="excerptHtml"
    />
  </component>
</template>

<style scoped lang="scss">
.search-result {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  text-align: left;
  transition: background 0.15s ease;

  // annulla i margini automatici che gli stili globali danno agli span
  span {
    margin: 0;
  }

  &:hover,
  &.is-active {
    background: rgba(35, 49, 98, 0.08);
  }

  &.is-active {
    box-shadow: inset 3px 0 0 #233162;
  }

  &:focus-visible {
    outline: 3px solid #233162;
    outline-offset: -3px;
  }

  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  &__title {
    font-weight: 600;
    line-height: 1.4;
    color: #233162;
  }

  &__badge {
    flex-shrink: 0;
    padding: 0.1rem 0.45rem;
    border: 1px solid rgba(35, 49, 98, 0.35);
    border-radius: 4px;
    font-size: 0.72rem;
    font-weight: 600;
    color: #233162;
    white-space: nowrap;
  }

  &__meta {
    font-size: 0.8rem;
    color: #666;
  }

  &__excerpt {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #444;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  // parole trovate
  :deep(mark) {
    padding: 0 0.1em;
    border-radius: 2px;
    background: rgba(255, 196, 0, 0.45);
    color: inherit;
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
