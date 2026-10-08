<script setup lang="ts">
import type { QuadernoPage } from "~/composables/usePubblicazioni";

// Pagine interne di un Quaderno mostrate "a libro aperto": le immagini
// vengono accoppiate a due a due (pagina sinistra + pagina destra), una
// coppia per riga. L'ordine è quello della lista: 1-2 sulla prima riga,
// 3-4 sulla seconda, e così via. Se le pagine sono dispari, l'ultima
// riga mostra una pagina sola, centrata.
// Al clic su una pagina si apre un overlay scuro con la pagina ingrandita:
// riquadro centrato su desktop/tablet, a tutto schermo su mobile.
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

// ─── Overlay ────────────────────────────────────────────
// Indice (nella lista completa) della pagina aperta, null = chiuso
const openIndex = ref<number | null>(null);
const openPage = computed(() =>
  openIndex.value === null ? null : (props.pages[openIndex.value] ?? null),
);
const closeButton = ref<HTMLButtonElement | null>(null);

function open(index: number) {
  openIndex.value = index;
}

function close() {
  openIndex.value = null;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

// Mentre l'overlay è aperto: pagina sotto bloccata, Esc per chiudere,
// focus sulla X (così da tastiera si chiude subito con Invio).
watch(openPage, async (page) => {
  if (!import.meta.client) return;
  if (page) {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeydown);
    await nextTick();
    closeButton.value?.focus();
  } else {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", onKeydown);
  }
});

// Se si cambia pagina del sito con l'overlay aperto, ripulisco tutto
onBeforeUnmount(() => {
  if (!import.meta.client) return;
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div v-if="pages.length" class="book">
    <div
      v-for="(spread, s) in spreads"
      :key="spread.map((p) => p.id).join('-')"
      class="book__spread"
      :class="{ 'book__spread--single': spread.length === 1 }"
    >
      <button
        v-for="(page, i) in spread"
        :key="page.id"
        type="button"
        class="book__page"
        :class="i === 0 ? 'book__page--left' : 'book__page--right'"
        :aria-label="`Ingrandisci ${altFor(page, s * 2 + i)}`"
        @click="open(s * 2 + i)"
      >
        <img
          :src="page.image_path"
          :alt="altFor(page, s * 2 + i)"
          loading="lazy"
        />
      </button>
    </div>

    <!-- Overlay: montato nel body, così sta sopra header e pulsanti fissi -->
    <Teleport to="body">
      <Transition name="book-overlay">
        <div
          v-if="openPage"
          class="book-overlay"
          role="dialog"
          aria-modal="true"
          :aria-label="altFor(openPage, openIndex!)"
          @click.self="close"
        >
          <div class="book-overlay__box">
            <button
              ref="closeButton"
              type="button"
              class="book-overlay__close"
              aria-label="Chiudi"
              @click="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <img
              :src="openPage.image_path"
              :alt="altFor(openPage, openIndex!)"
              class="book-overlay__image"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
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
    padding: 0;
    border: none;
    line-height: 0;
    background: #fff;
    cursor: zoom-in;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:focus-visible {
      outline: 3px solid #2c6e49;
      outline-offset: -3px;
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

// ─── Overlay ────────────────────────────────────────────
.book-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.82);

  // Desktop e tablet: riquadro centrato, non a tutta pagina
  &__box {
    position: relative;
    display: flex;
    max-width: min(900px, 90vw);
    max-height: 85vh;
    line-height: 0;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  &__image {
    max-width: 100%;
    max-height: 85vh;
    width: auto;
    height: auto;
    object-fit: contain;
    background: #fff;
  }

  &__close {
    position: absolute;
    top: -1.1rem;
    right: -1.1rem;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.6rem;
    height: 2.6rem;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: #fff;
    color: #222;
    font-size: 1.9rem;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    transition: transform 0.4s ease;

    &:hover {
      transform: scale(1.08);
    }

    &:focus-visible {
      outline: 3px solid #2c6e49;
      outline-offset: 2px;
    }
  }

  // Mobile: a tutto schermo, X in alto a destra sopra l'immagine
  @media (max-width: 767px) {
    padding: 0;
    background: rgba(0, 0, 0, 0.95);

    &__box {
      width: 100%;
      height: 100%;
      max-width: none;
      max-height: none;
      align-items: center;
      justify-content: center;
      box-shadow: none;
    }

    &__image {
      width: 100%;
      height: 100%;
      max-height: none;
      background: transparent;
    }

    &__close {
      position: fixed;
      top: 1rem;
      right: 1rem;
    }
  }
}

// Comparsa/scomparsa in dissolvenza
.book-overlay-enter-active,
.book-overlay-leave-active {
  transition: opacity 0.4s ease;
}

.book-overlay-enter-from,
.book-overlay-leave-to {
  opacity: 0;
}
</style>
