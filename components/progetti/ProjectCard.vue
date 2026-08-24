<script setup lang="ts">
import type { Project } from "~/composables/useProgetti";

defineProps<{
  project: Project;
}>();
</script>

<template>
  <article class="project-card">
    <div v-if="project.image_path" class="project-card__media">
      <img :src="project.image_path" :alt="project.title" loading="lazy" />
    </div>

    <div class="project-card__content">
      <h3>{{ project.title }}</h3>

      <!-- intro opzionale (HTML sanitizzato dal backend) -->
      <div
        v-if="project.intro"
        class="project-card__intro"
        v-html="project.intro"
      />

      <!-- blocchi: ogni blocco è testo + i suoi link -->
      <div
        v-for="(block, i) in project.blocks"
        :key="i"
        class="project-card__block"
      >
        <div v-if="block.text" v-html="block.text" />
        <div
          v-if="block.links && block.links.length"
          class="project-card__links"
        >
          <ProgettiTypedLink
            v-for="link in block.links"
            :key="link.url"
            :link="link"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--color-surface, #fff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

/* Se il progetto non ha immagine, il contenuto occupa tutta la larghezza */
.project-card:not(:has(.project-card__media)) {
  grid-template-columns: 1fr;
}

.project-card__media {
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-surface-alt, #eee);
}

.project-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-card__content h3 {
  margin: 0 0 0.75rem;
  font-size: 1.4rem;
}

.project-card__intro {
  color: var(--color-text-muted, #444);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.project-card__block {
  margin-bottom: 1.25rem;
  color: var(--color-text-muted, #444);
  line-height: 1.7;
}

.project-card__block:last-child {
  margin-bottom: 0;
}

.project-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.6rem;
}

@media (max-width: 640px) {
  .project-card {
    grid-template-columns: 1fr;
  }
}
</style>
