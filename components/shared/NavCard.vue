<script setup lang="ts">
// Card di navigazione condivisa da Divulgazione, Pubblicazioni e Progetti.
// Riceve il link GIÀ COSTRUITO (`to`) più i campi da mostrare.
defineProps<{
  to: string;
  title: string;
  excerpt?: string;
  image?: string;
}>();
</script>

<template>
  <NuxtLink :to="to" class="nav-card">
    <div class="nav-card__media">
      <img v-if="image" :src="image" :alt="title" loading="lazy" />
    </div>
    <div class="nav-card__body">
      <h2>{{ title }}</h2>
      <p v-if="excerpt">{{ excerpt }}</p>
      <span class="nav-card__cta">Vai &rarr;</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.nav-card {
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

.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.nav-card__media {
  aspect-ratio: 16 / 9;
  background: var(--color-surface-alt, #eee);
}

.nav-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.nav-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-card__body h2 {
  font-size: 1.25rem;
  margin: 0;
}

.nav-card__body p {
  margin: 0;
  color: var(--color-text-muted, #555);
  line-height: 1.5;
  font-size: 0.95rem;
}

.nav-card__cta {
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--color-accent, #2c6e49);
}
</style>
