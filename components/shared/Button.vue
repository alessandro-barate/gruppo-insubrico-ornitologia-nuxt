<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

withDefaults(
  defineProps<{
    to?: RouteLocationRaw;
    disabled?: boolean;
    ariaLabel?: string;
    variant?: "static";
  }>(),
  {
    disabled: false,
    variant: "static",
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

.static {
  background: linear-gradient(90deg, #ff8636, #f9a268);
  color: #333;
}
</style>
