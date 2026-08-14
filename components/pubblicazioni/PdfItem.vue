<script setup lang="ts">
import type { PdfItem } from "~/composables/usePubblicazioni";

defineProps<{
  item: PdfItem;
}>();
</script>

<template>
  <li class="pdf-item">
    <a
      :href="item.pdf_url"
      target="_blank"
      rel="noopener noreferrer"
      class="pdf-item__link"
    >
      <span class="pdf-item__icon" aria-hidden="true">PDF</span>
      <span class="pdf-item__title">{{ item.title }}</span>
      <span class="pdf-item__arrow" aria-hidden="true">&darr;</span>
    </a>
  </li>
</template>

<style scoped>
.pdf-item__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border, #ddd);
  border-radius: 8px;
  background: var(--color-surface, #fff);
  text-decoration: none;
  color: var(--color-text, #333);
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.pdf-item__link:hover {
  border-color: var(--color-accent, #2c6e49);
  background: var(--color-surface-alt, #f7f7f7);
}

.pdf-item__icon {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  background: var(--color-accent, #2c6e49);
  color: #fff;
}

.pdf-item__title {
  flex: 1;
  font-weight: 500;
}

.pdf-item__arrow {
  color: var(--color-text-muted, #888);
}
</style>
