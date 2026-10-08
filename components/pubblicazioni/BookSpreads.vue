<script setup lang="ts">
import type { QuadernoPage } from "~/composables/usePubblicazioni";

// Pagine interne di un Quaderno mostrate "a libro aperto": le immagini
// vengono accoppiate a due a due (pagina sinistra + pagina destra), una
// coppia per riga. L'ordine è quello della lista: 1-2 sulla prima riga,
// 3-4 sulla seconda, e così via. Se le pagine sono dispari, l'ultima
// riga mostra una pagina sola, centrata.
const props = defineProps<{
  pages: QuadernoPage[];
  // titolo del Quaderno, usato per il testo alternativo di default
  title: string;
}>();

const spreads = computed(() => {
  const rows: QuadernoPage[][] = [];
  for (let i = 0; i < props.pages.length; i += 2) {
    rows.push(props.pages.slice(i, i + 2));
  }
  return rows;
});

function altFor(page: QuadernoPage, index: number) {
  return page.alt || `${props.title} - pagina interna ${index + 1}`;
}
</script>

<template>
  <div v-if="pages.length" class="book">
    <div
      v-for="(spread, s) in spreads"
      :key="spread.map((p) => p.id).join('-')"
      class="book__spread"
      :class="{ 'book__spread--single': spread.length === 1 }"
    >
      <!-- Ogni pagina si apre a grandezza piena in una nuova scheda -->
      <a
        v-for="(page, i) in spread"
        :key="page.id"
        :href="page.image_path"
        target="_blank"
        rel="noopener"
        class="book__page"
        :class="i === 0 ? 'book__page--left' : 'book__page--right'"
      >
        <img
          :src="page.image_path"
          :alt="altFor(page, s * 2 + i)"
          loading="lazy"
        />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.book {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin: 1rem 0;

  &__spread {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
    // ombra esterna del libro
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);

    &--single {
      grid-template-columns: 1fr;
      max-width: 380px;
    }
  }

  &__page {
    position: relative;
    display: block;
    line-height: 0;
    background: #fff;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    // Ombra della rilegatura: sfuma verso il centro del libro
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 12%;
      pointer-events: none;
    }

    &--left::after {
      right: 0;
      background: linear-gradient(to left, rgba(0, 0, 0, 0.22), transparent);
    }

    &--right::after {
      left: 0;
      background: linear-gradient(to right, rgba(0, 0, 0, 0.22), transparent);
    }
  }

  // Pagina singola: niente rilegatura
  &__spread--single &__page::after {
    display: none;
  }
}
</style>
