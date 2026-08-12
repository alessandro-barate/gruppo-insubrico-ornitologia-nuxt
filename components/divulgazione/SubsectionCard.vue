<script setup lang="ts">
import type { SubsectionCardData } from "~/composables/useDivulgazione";
import Button from "~/components/utili/Button.vue";

defineProps<{
  subsection: SubsectionCardData;
}>();
</script>

<template>
  <div class="subsection-cards-container">
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
      >
        <h2>{{ subsection.title }}</h2>
        <!-- <p v-if="subsection.intro_excerpt">{{ subsection.intro_excerpt }}</p> -->
      </Button>
    </div>
  </div>
</template>

<style scoped>
.subsection-cards-container {
  width: 100%;

  .subsection-card {
    width: 40%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 1rem;
    text-align: center;
    border-radius: 50px;
    background-color: aqua;

    .body {
      color: #333;
    }
  }
}
</style>
