<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

withDefaults(
  defineProps<{
    to?: RouteLocationRaw;
    disabled?: boolean;
    ariaLabel?: string;
  }>(),
  {
    disabled: false,
  },
);

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <NuxtLink v-if="to" :to="to" :aria-label="ariaLabel" class="body"
    ><slot />
  </NuxtLink>
</template>
<style></style>
