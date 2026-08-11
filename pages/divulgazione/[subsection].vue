<script setup lang="ts">
const route = useRoute();
const slug = route.params.subsection as string;

const { getSubsection } = useDivulgazione();
const { data: subsection } = await getSubsection(slug);

// Sottosezioni dinamiche → uno slug inesistente deve dare 404
if (!subsection.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Sottosezione non trovata",
    fatal: true,
  });
}

useSeoMeta({
  title: () => subsection.value?.title,
  description: () => subsection.value?.intro_excerpt,
});
</script>

<template>
  <section v-if="subsection" class="subsection">
    <header class="subsection__intro">
      <NuxtLink to="/divulgazione" class="subsection__back">
        &larr; Divulgazione
      </NuxtLink>
      <h1>{{ subsection.title }}</h1>
      <!-- intro_text arriva come HTML sanitizzato dal backend -->
      <div class="subsection__intro-text" v-html="subsection.intro_text" />
    </header>

    <div class="subsection__items">
      <ItemCard v-for="item in subsection.items" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
.subsection {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.subsection__back {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--color-text-muted, #555);
  text-decoration: none;
}

.subsection__back:hover {
  text-decoration: underline;
}

.subsection__intro {
  margin-bottom: 3rem;
}

.subsection__intro h1 {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  margin-bottom: 1rem;
}

.subsection__intro-text {
  color: var(--color-text-muted, #444);
  line-height: 1.7;
}

.subsection__items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
