<script setup lang="ts">
import type { TypedLink } from "~/composables/useProgetti";

defineProps<{
  link: TypedLink;
}>();

// Etichetta breve del tipo, usata come "badge" testuale dell'icona.
// (Se in futuro userai SVG dedicati, qui mappi kind → componente icona.)
const KIND_ICON: Record<TypedLink["kind"], string> = {
  pdf: "/images/pdf-icon.png",
  external: "/images/link-icon.png",
  excel: "/images/excel-icon.png",
  powerpoint: "/images/powerpoint-icon.png",
  word: "/images/word-icon.png",
};
</script>

<template>
  <a
    :href="link.url"
    target="_blank"
    rel="noopener noreferrer"
    class="typed-link"
    :class="`typed-link--${link.kind}`"
  >
    <img class="typed-icon" :src="KIND_ICON[link.kind]" alt="" />
    <span class="typed-link__label">{{ link.label }}</span>
  </a>
</template>

<style scoped lang="scss">
@use "~/assets/scss/_partials/typed-link" as *;
</style>
