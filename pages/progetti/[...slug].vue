<script setup lang="ts">
// Le ricerche sono state spostate da /progetti/... a /pubblicazioni/paper/...
// Questa pagina reindirizza (301) i vecchi indirizzi delle sezioni, così
// eventuali link già condivisi continuano a funzionare.
import { RICERCHE_BASE_PATH } from "~/composables/useRicerche";

const route = useRoute();

const segments = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug].filter(Boolean);

// Reindirizza solo se il primo segmento è una sezione esistente
const { getSections } = useRicerche();
const { data: sections } = await getSections();

if (!sections.value?.some((s) => s.slug === segments[0])) {
  throw createError({
    statusCode: 404,
    statusMessage: "Pagina non trovata",
    fatal: true,
  });
}

await navigateTo(`${RICERCHE_BASE_PATH}/${segments.join("/")}`, {
  redirectCode: 301,
  replace: true,
});
</script>

<template>
  <div />
</template>
