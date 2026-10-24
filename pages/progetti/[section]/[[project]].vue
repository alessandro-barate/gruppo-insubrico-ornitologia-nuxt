<script setup lang="ts">
// Sezioni e progetti nella pagina Progetti.
//   /progetti/<sezione>             → sezione
//   /progetti/<sezione>/<progetto>  → progetto (sezioni navigabili)
// Il contenuto è in components/progetti/ResearchView.vue.
import { PROGETTI_BASE_PATH } from "~/composables/useProgetti";

const route = useRoute();

// [section] obbligatorio, [[project]] facoltativo
const segments = computed(() =>
  [route.params.section, route.params.project]
    .flat()
    .filter((s): s is string => typeof s === "string" && s.length > 0),
);

const rootCrumbs = [{ title: "Progetti", to: PROGETTI_BASE_PATH }];
</script>

<template>
  <ProgettiResearchView
    :key="segments.join('/')"
    :segments="segments"
    :base-path="PROGETTI_BASE_PATH"
    :root-crumbs="rootCrumbs"
  />
</template>
