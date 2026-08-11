<script setup lang="ts">
import type { SubsectionCardData } from "~/composables/useDivulgazione";

defineProps<{
  subsection: SubsectionCardData;
}>();
</script>

<template>
  <NuxtLink :to="`/divulgazione/${subsection.slug}`" class="subsection-card">
    <div class="subsection-card__media">
      <img
        v-if="subsection.image_path"
        :src="subsection.image_path"
        :alt="subsection.title"
        loading="lazy"
      />
    </div>

    <div class="subsection-card__body">
      <h2>{{ subsection.title }}</h2>
      <p v-if="subsection.intro_excerpt">{{ subsection.intro_excerpt }}</p>
      <span class="subsection-card__cta">Scopri di più &rarr;</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.subsection-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
  background: var(--color-surface, #fff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.subsection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.subsection-card__media {
  aspect-ratio: 16 / 9;
  background: var(--color-surface-alt, #eee);
}

.subsection-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.subsection-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.subsection-card__body h2 {
  font-size: 1.35rem;
  margin: 0;
}

.subsection-card__body p {
  margin: 0;
  color: var(--color-text-muted, #555);
  line-height: 1.5;
}

.subsection-card__cta {
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--color-accent, #2c6e49);
}
</style>
