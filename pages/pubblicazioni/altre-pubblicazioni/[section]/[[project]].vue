<script setup lang="ts">
// Sezioni e progetti di ricerca in Pubblicazioni → Altre Pubblicazioni
// (vista "pubblicazioni": solo PDF e link ai risultati).
//   /pubblicazioni/altre-pubblicazioni/<sezione>             → sezione
//   /pubblicazioni/altre-pubblicazioni/<sezione>/<progetto>  → progetto
// Solo le sezioni in RESULTS_SECTIONS (useProgetti.ts); le altre → 404.
// La pagina /pubblicazioni/altre-pubblicazioni resta pubblicazioni/[...slug].vue.
// Il nome della cartella deve coincidere con RESULTS_BASE_PATH.
import {
  RESULTS_BASE_PATH,
  RESULTS_SECTIONS,
} from "~/composables/useProgetti";

const route = useRoute();

const segments = computed(() =>
  [route.params.section, route.params.project]
    .flat()
    .filter((s): s is string => typeof s === "string" && s.length > 0),
);

// Titolo di "Altre Pubblicazioni" preso dall'albero di Pubblicazioni
const { buildCrumbs } = usePubblicazioni();
const parentSlug = RESULTS_BASE_PATH.split("/").pop() ?? "";
const rootCrumbs = [
  { title: "Pubblicazioni", to: "/pubblicazioni" },
  {
    title: buildCrumbs([parentSlug])[0]?.title ?? "Altre Pubblicazioni",
    to: RESULTS_BASE_PATH,
  },
];
</script>

<template>
  <ProgettiResearchView
    :key="segments.join('/')"
    :segments="segments"
    view="pubblicazioni"
    :base-path="RESULTS_BASE_PATH"
    :root-crumbs="rootCrumbs"
    :allowed-sections="RESULTS_SECTIONS"
  />
</template>
