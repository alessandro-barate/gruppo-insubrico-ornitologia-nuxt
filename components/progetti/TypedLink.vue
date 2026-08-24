<script setup lang="ts">
import type { TypedLink } from "~/composables/useProgetti";

defineProps<{
  link: TypedLink;
}>();

// Etichetta breve del tipo, usata come "badge" testuale dell'icona.
// (Se in futuro userai SVG dedicati, qui mappi kind → componente icona.)
const KIND_LABEL: Record<TypedLink["kind"], string> = {
  pdf: "PDF",
  external: "WEB",
  excel: "XLS",
  powerpoint: "PPT",
};
</script>

<template>
  <a
    :href="link.url"
    target="_blank"
    rel="noopener noreferrer"
    class="typed-link"
    :class="`typed-link--${link.kind}`"
  >
    <span class="typed-link__badge" aria-hidden="true">
      {{ KIND_LABEL[link.kind] }}
    </span>
    <span class="typed-link__label">{{ link.label }}</span>
  </a>
</template>

<style scoped>
.typed-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--color-border, #ddd);
  border-radius: 6px;
  text-decoration: none;
  color: var(--color-text, #333);
  font-size: 0.9rem;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.typed-link:hover {
  border-color: var(--color-accent, #2c6e49);
  background: var(--color-surface-alt, #f7f7f7);
}

.typed-link__badge {
  flex-shrink: 0;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
  color: #fff;
}

/* Un colore per tipo, così l'icona-badge distingue a colpo d'occhio */
.typed-link--pdf .typed-link__badge {
  background: #c0392b;
}
.typed-link--external .typed-link__badge {
  background: #2c6e49;
}
.typed-link--excel .typed-link__badge {
  background: #1d6f42;
}
.typed-link--powerpoint .typed-link__badge {
  background: #c43e1c;
}
</style>
