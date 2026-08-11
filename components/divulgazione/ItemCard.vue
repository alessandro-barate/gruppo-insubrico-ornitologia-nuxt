<script setup lang="ts">
import type { SubsectionItem } from "~/composables/useDivulgazione";

defineProps<{
  item: SubsectionItem;
}>();
</script>

<template>
  <article class="item-card">
    <div v-if="item.image_path" class="item-card__media">
      <img :src="item.image_path" :alt="item.title" loading="lazy" />
    </div>

    <div class="item-card__content">
      <h3>{{ item.title }}</h3>
      <!-- body arriva come HTML sanitizzato dal backend -->
      <div class="item-card__body" v-html="item.body" />

      <ul v-if="item.links.length" class="item-card__links">
        <li v-for="link in item.links" :key="link.url">
          <a :href="link.url" target="_blank" rel="noopener noreferrer">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.item-card {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--color-surface, #fff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.item-card__media {
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-surface-alt, #eee);
}

.item-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.item-card__content h3 {
  margin: 0 0 0.75rem;
  font-size: 1.4rem;
}

.item-card__body {
  color: var(--color-text-muted, #444);
  line-height: 1.7;
}

.item-card__links {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.item-card__links a {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: var(--color-accent, #2c6e49);
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
}

.item-card__links a:hover {
  opacity: 0.9;
}

/* Stack su mobile */
@media (max-width: 640px) {
  .item-card {
    grid-template-columns: 1fr;
  }
}
</style>
