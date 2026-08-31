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
      <img src="/images/pdf-icon.png" alt="" class="pdf-item__icon" />
      <span class="pdf-item__title">{{ item.title }}</span>
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
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.pdf-item__title {
  flex: 1;
  font-weight: 500;
}

.pdf-item__arrow {
  color: var(--color-text-muted, #888);
}
</style>
