<script setup lang="ts">
import type { GalleryImage } from "~/composables/useProgetti";

// Galleria a griglia con ingrandimento a schermo intero.
// Uso: <ProgettiGallery :images="page.gallery" />
// Tastiera nell'ingrandimento: ← → per scorrere, Esc per chiudere.
const props = defineProps<{
  images: GalleryImage[];
}>();

const openIndex = ref<number | null>(null);
const current = computed(() =>
  openIndex.value === null ? null : props.images[openIndex.value],
);

function open(i: number) {
  openIndex.value = i;
}

function close() {
  openIndex.value = null;
}

function step(delta: number) {
  if (openIndex.value === null) return;
  const n = props.images.length;
  openIndex.value = (openIndex.value + delta + n) % n;
}

function onKey(e: KeyboardEvent) {
  if (openIndex.value === null) return;
  if (e.key === "Escape") close();
  else if (e.key === "ArrowRight") step(1);
  else if (e.key === "ArrowLeft") step(-1);
}

// Blocca lo scroll della pagina mentre l'immagine è ingrandita
watch(openIndex, (i) => {
  if (import.meta.client) document.body.style.overflow = i === null ? "" : "hidden";
});

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="gallery">
    <button
      v-for="(img, i) in images"
      :key="img.src"
      type="button"
      class="gallery__item"
      :aria-label="`Ingrandisci: ${img.alt}`"
      @click="open(i)"
    >
      <img :src="img.src" :alt="img.alt" loading="lazy" />
      <span v-if="img.caption" class="gallery__caption">{{ img.caption }}</span>
    </button>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="current"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="current.alt"
          @click.self="close"
        >
          <button type="button" class="lightbox__close" aria-label="Chiudi" @click="close">
            ×
          </button>
          <button
            v-if="images.length > 1"
            type="button"
            class="lightbox__nav lightbox__nav--prev"
            aria-label="Immagine precedente"
            @click="step(-1)"
          >
            ‹
          </button>

          <figure class="lightbox__figure">
            <img :src="current.src" :alt="current.alt" />
            <figcaption v-if="current.caption">{{ current.caption }}</figcaption>
          </figure>

          <button
            v-if="images.length > 1"
            type="button"
            class="lightbox__nav lightbox__nav--next"
            aria-label="Immagine successiva"
            @click="step(1)"
          >
            ›
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 576px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
  }

  &__item {
    position: relative;
    display: block;
    // con aspect-ratio l'item non si allarga da solo: senza width
    // le immagini piccole restano più strette della colonna
    width: 100%;
    padding: 0;
    border: none;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background: #eee;
    cursor: zoom-in;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s ease;
    }

    &:hover img,
    &:focus-visible img {
      transform: scale(1.05);
    }
  }

  &__caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 1rem;
    color: #fff;
    font-size: 0.9rem;
    text-align: left;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000; // sopra l'header (z-index 1000)
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.88);

  &__figure {
    margin: 0;
    max-width: min(1200px, 100%);
    max-height: 100%;
    text-align: center;

    img {
      max-width: 100%;
      max-height: 82vh;
      object-fit: contain;
      border-radius: 8px;
    }

    figcaption {
      margin-top: 0.75rem;
      color: #eee;
    }
  }

  &__close,
  &__nav {
    position: absolute;
    border: none;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    cursor: pointer;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    font-size: 2rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  &__close {
    top: 1rem;
    right: 1rem;
  }

  &__nav {
    top: 50%;
    transform: translateY(-50%);

    &--prev {
      left: 1rem;
    }

    &--next {
      right: 1rem;
    }
  }

  @media (max-width: 576px) {
    padding: 1rem;

    &__nav {
      top: auto;
      bottom: 1rem;
      transform: none;
    }
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
