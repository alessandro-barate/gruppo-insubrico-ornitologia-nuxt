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
  text-decoration: none;
}

.primary {
  color: #333;
  background: linear-gradient(90deg, #ff8636, #f9a268);
}

.dark {
  color: #ebf2fc;
  background-color: #233162;
}

/* fill arancione che sale dal basso su hover */
.body::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(90deg, #ff8636, #f9a268);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

/* variante PRIMARY: base arancione, fill che sale BLU */
.primary::before {
  background: #233162;
}

.body:hover::before,
.body:focus-visible::before {
  transform: translateY(0);
}

.body-content {
  position: relative;
  z-index: 1;
  display: inline-flex;
}

/* ogni parola è una finestra che mostra una riga per volta */
.body-content :deep(.word) {
  display: inline-block;
  position: relative;
  vertical-align: top;
  white-space: pre; /* preserva gli spazi dei title_parts */
  line-height: 1.2;
  color: inherit;
  overflow: hidden; /* ritaglia il proprio ::after */
  transition: color 0s linear 0.3s;
}
/* a riposo il testo blu è visibile; su hover diventa trasparente
   (il box resta, così fa da finestra) */
.body:hover .body-content :deep(.word),
.body:focus-visible .body-content :deep(.word) {
  color: transparent;
  transition: color 0s linear 0s;
}

/* seconda copia: parte una riga sotto e sale al centro */
.body-content :deep(.word)::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  line-height: 1.2;
  color: #fff;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.body:hover .body-content :deep(.word)::after,
.body:focus-visible .body-content :deep(.word)::after {
  transform: translateY(0);
}

/* cascata + spaziatura tra parole */
.body-content :deep(.word:nth-child(1)),
.body-content :deep(.word:nth-child(2)) {
  margin-right: 0.23rem;
}
.body-content :deep(.word:nth-child(1))::after {
  transition-delay: 0s;
}
.body-content :deep(.word:nth-child(2))::after {
  transition-delay: 0.08s;
}
.body-content :deep(.word:nth-child(3))::after {
  transition-delay: 0.16s;
}

@media (prefers-reduced-motion: reduce) {
  .body::before,
  .body-content :deep(.word)::after {
    transition: none;
  }
}
</style>
