<script setup lang="ts">
import type { SubsectionItem } from "~/composables/useDivulgazione";

const props = defineProps<{
  item: SubsectionItem;
}>();

// Link da mostrare: `links` può mancare, essere vuoto o contenere voci
// lasciate a metà dal pannello (senza url). Si tengono solo quelli con
// un indirizzo; se nessuno è valido, il blocco dei link non compare.
const visibleLinks = computed(() =>
  (props.item.links ?? []).filter((link) => link.url?.trim()),
);

// ─── Locandina zoomata ───────────────────────────────
// ref() per stato reattivo: con `let` Vue non si accorge
// del cambio e lo zoomed container non compare.
const isZoomed = ref(false);
const closeButton = ref<HTMLButtonElement | null>(null);

function zoomImage() {
  isZoomed.value = true;
}

function closeZoom() {
  isZoomed.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") closeZoom();
}

// Con locandina aperta: pagina sotto bloccata, Esc per chiudere,
// focus sulla X per chiudere da tastiera con Invio
watch(isZoomed, async (open) => {
  if (!import.meta.client) return;
  if (open) {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeydown);
    await nextTick();
    closeButton.value?.focus();
  } else {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", onKeydown);
  }
});

// Se si cambia pagina con la locandina aperta, ripulisco tutto
onBeforeUnmount(() => {
  if (!import.meta.client) return;
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <article class="item-card">
    <h3>{{ item.title }}</h3>
    <h4>{{ item.year }}</h4>
    <div v-if="item.image_path" class="item-card__media">
      <button
        type="button"
        class="item-card__zoom-trigger"
        :aria-label="`Ingrandisci la locandina: ${item.title}`"
        @click="zoomImage"
      >
        <img :src="item.image_path" :alt="item.title" loading="lazy" />
      </button>
    </div>

    <div class="item-card__content">
      <!-- body arriva come HTML sanitizzato dal backend -->
      <div class="item-card__body" v-html="item.body" />

      <ul v-if="visibleLinks.length" class="item-card__links">
        <li v-for="link in visibleLinks" :key="link.url">
          <a :href="link.url" target="_blank" rel="noopener noreferrer">
            {{ link.label || "Apri il link" }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Locandina zoomata -->
    <Teleport to="body">
      <Transition name="zoom">
        <div
          v-if="isZoomed && item.image_path"
          class="zoom-overlay"
          role="dialog"
          aria-modal="true"
          :aria-label="`Locandina: ${item.title}`"
          @click.self="closeZoom"
        >
          <div class="zoomed-container">
            <button
              ref="closeButton"
              type="button"
              class="zoomed-container__close"
              aria-label="Chiudi"
              @click="closeZoom"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <img :src="item.image_path" :alt="item.title" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </article>
</template>

<style scoped>
.item-card {
  width: 60%;
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--color-surface, #fff);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);

  h3 {
    margin-bottom: 1rem;
  }

  h4 {
    margin-bottom: 1.5rem;
  }
}

.item-card__media {
  width: 80%;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: var(--color-surface-alt, #eee);
}

/* La locandina è un pulsante: cliccabile anche da tastiera */
.item-card__zoom-trigger {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: zoom-in;

  &:focus-visible {
    outline: 3px solid #233162;
    outline-offset: -3px;
  }
}

.item-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.item-card__content h3 {
  margin: 0 0 0.75rem;
  font-size: 1.4rem;
}

.item-card__body {
  color: var(--color-text-muted, #444);
  line-height: 1.7;
}

.item-card__links {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.item-card__links a {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: var(--color-accent, #233162);
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
}

.item-card__links a:hover {
  opacity: 0.9;
}

/* ─── Locandina zoomata ──────────────────────────────── */
/* Overlay scuro sulla pagina sottostante */
.zoom-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.75);
}

/* Riquadro blu (stesso blu del sito, .bg-blue) con la locandina */
.zoomed-container {
  position: relative;
  display: flex;
  max-width: min(900px, 90vw);
  max-height: 90vh;
  padding: 1.5rem;
  border-radius: 12px;
  background: #233162;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  img {
    display: block;
    max-width: 100%;
    max-height: calc(90vh - 3rem);
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 6px;
  }
}

.zoomed-container__close {
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
  color: #233162;
  font-size: 1.9rem;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }

  &:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 2px;
  }
}

/* Comparsa/scomparsa in dissolvenza */
.zoom-enter-active,
.zoom-leave-active {
  transition: opacity 0.25s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
}

/* Stack su mobile */
@media (max-width: 640px) {
  .item-card {
    grid-template-columns: 1fr;
  }

  .zoom-overlay {
    padding: 1.5rem 1rem;
  }

  .zoomed-container {
    padding: 0.75rem;
    max-width: 100%;

    img {
      max-height: calc(90vh - 1.5rem);
    }
  }

  /* X dentro lo schermo anche quando il riquadro è largo quanto la pagina */
  .zoomed-container__close {
    top: -0.9rem;
    right: -0.5rem;
  }
}
</style>
