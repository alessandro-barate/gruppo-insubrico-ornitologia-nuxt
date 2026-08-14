<script setup lang="ts">
import type { CardItem } from "~/composables/usePubblicazioni";

defineProps<{
  item: CardItem;
}>();
</script>

<template>
  <article class="card-item">
    <div v-if="item.image_path" class="card-item__media">
      <img :src="item.image_path" :alt="item.title" loading="lazy" />
    </div>
    <div class="card-item__content">
      <h3>{{ item.title }}</h3>
      <!-- body arriva come HTML sanitizzato dal backend -->
      <div class="card-item__body" v-html="item.body" />
    </div>
  </article>
</template>

<style scoped>
.card-item {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--color-surface, #fff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.card-item__media {
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-surface-alt, #eee);
}

.card-item__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-item__content h3 {
  margin: 0 0 0.75rem;
  font-size: 1.4rem;
}

.card-item__body {
  color: var(--color-text-muted, #444);
  line-height: 1.7;
}

@media (max-width: 640px) {
  .card-item {
    grid-template-columns: 1fr;
  }
}
</style>
