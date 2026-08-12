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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
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

/* fill scuro che sale dal basso su hover */
.body::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(90deg, #ff8636, #f9a268);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.body:hover::before,
.body:focus-visible::before {
  transform: translateY(0);
}

.body-content {
  position: relative;
  z-index: 1;
}

/* LAYER NORMALE: centrato e fermo. Su hover svanisce (non si sposta). */
.body-content :deep(.word) {
  display: inline-block;
  position: relative;
  vertical-align: top;
  white-space: pre; /* preserva gli spazi dei title_parts */
  color: inherit;
  /* transition: opacity 0.4s ease; */
}
.body:hover .body-content :deep(.word),
.body:focus-visible .body-content :deep(.word) {
  opacity: 1;
}

/* SECONDO LAYER (::after): parte dal basso, sale al centro su hover */
.body-content :deep(.word)::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0; /* stessa posizione del testo normale */
  color: #fff;
  opacity: 0;
  transform: translateY(80%); /* parte più in basso */
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.body:hover .body-content :deep(.word)::after,
.body:focus-visible .body-content :deep(.word)::after {
  opacity: 1;
  transform: translateY(0); /* arriva esattamente al centro */
}

/* cascata: delay crescenti per parola, validi in entrata e uscita */
.body-content :deep(.word:nth-child(1)),
.body-content :deep(.word:nth-child(1))::after {
  transition-delay: 0s;
}
.body-content :deep(.word:nth-child(2)),
.body-content :deep(.word:nth-child(2))::after {
  transition-delay: 0.08s;
}
.body-content :deep(.word:nth-child(3)),
.body-content :deep(.word:nth-child(3))::after {
  transition-delay: 0.16s;
}

@media (prefers-reduced-motion: reduce) {
  .body::before,
  .body-content :deep(.word),
  .body-content :deep(.word)::after {
    transition: none;
  }
}
</style>
