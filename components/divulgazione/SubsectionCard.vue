<script setup lang="ts">
import type { SubsectionCardData } from "~/composables/useDivulgazione";
import Button from "~/components/utili/Button.vue";

defineProps<{
  subsection: SubsectionCardData;
}>();
</script>

<template>
  <div class="subsection-card">
    <img
      v-if="subsection.image_path"
      :src="subsection.image_path"
      :alt="subsection.title"
      loading="lazy"
    />
    <Button
      :to="`/divulgazione/${subsection.slug}`"
      :aria-label="subsection.aria_label"
      variant="dark"
      class="single-card"
    >
      <span
        v-for="(part, i) in subsection.title_parts"
        :key="i"
        class="word"
        :data-text="part"
        >{{ part }}</span
      >
      <!-- <h2>{{ subsection.title }}</h2> -->
      <!-- <p v-if="subsection.intro_excerpt">{{ subsection.intro_excerpt }}</p> -->
    </Button>
  </div>
</template>

<style scoped>
.subsection-card {
  width: 100%;
  text-align: center;

  .single-card {
    margin-top: 2rem;
    margin-bottom: 2rem;

    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>
