<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

withDefaults(
  defineProps<{
    to?: RouteLocationRaw;
    disabled?: boolean;
    ariaLabel?: string;
    variant?: "primary" | "dark";
  }>(),
  {
    disabled: false,
    variant: "primary",
  },
);

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :aria-label="ariaLabel"
    :class="variant"
    class="body"
    ><span class="body-content"><slot /></span>
  </NuxtLink>
</template>
<style scoped>
.body {
  align-items: center;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.primary {
  color: #333;
  background: linear-gradient(90deg, #ff8636, #f9a268);
}

.dark {
  color: #ebf2fc;
  background-color: #233162;
}

/* il fill che sale dal basso all'hover */
.body::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: #1a2340; /* tinta di arrivo */
  transform: translateY(100%);
  transition: transform 0.5s ease;
}

.body:hover::before,
.body:focus-visible::before {
  transform: translateY(0);
}

/* il testo sta sopra il fill */
.body-content {
  position: relative;
  z-index: 1;
}

/* animazione degli span in ingresso */
.body-content :deep(span) {
  display: inline-block; /* necessario per translateY */
  transform: translateY(80%);
  opacity: 0;
  transition:
    transform 0.5s ease,
    opacity 0.5s ease,
    color 0.5s ease;
}

.body:hover .body-content :deep(span),
.body:focus-visible .body-content :deep(span) {
  transform: translateY(0);
  opacity: 1;
  color: #fff;
}

/* delay scalati per effetto "a cascata" */
.body-content :deep(span:nth-child(1)) {
  transition-delay: 0s;
}
.body-content :deep(span:nth-child(2)) {
  transition-delay: 0.1s;
}
.body-content :deep(span:nth-child(3)) {
  transition-delay: 0.2s;
}

@media (prefers-reduced-motion: reduce) {
  .body::before,
  .body-content :deep(span) {
    transition: none;
  }
}
</style>
