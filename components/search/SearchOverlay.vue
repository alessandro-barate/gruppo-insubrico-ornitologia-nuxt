<script setup lang="ts">
// Overlay di ricerca, aperto dalla lente nell'header (o con Ctrl/⌘ + K).
// Cerca mentre si scrive e mostra i primi risultati raggruppati per
// sezione; "Vedi tutti i risultati" porta alla pagina /cerca.
// Tastiera: ↑/↓ scorrono i risultati, Invio apre, Esc chiude.
// Desktop/tablet: riquadro centrato. Mobile: a tutto schermo.
import type { SearchResult } from "~/composables/useSearch";

const open = defineModel<boolean>("open", { default: false });

const OVERLAY_LIMIT = 8; // risultati mostrati nell'overlay
const DEBOUNCE_MS = 250;

const route = useRoute();
const router = useRouter();
const { search } = useSearch();

const query = ref("");
const results = ref<SearchResult[]>([]);
const total = ref(0);
const loading = ref(false);
const failed = ref(false);
const activeIndex = ref(-1);

const input = ref<HTMLInputElement | null>(null);
let opener: HTMLElement | null = null; // per ridare il focus alla lente

const trimmed = computed(() => query.value.trim());
const tooShort = computed(() => trimmed.value.length < SEARCH_MIN_LENGTH);

// ─── Ricerca (con debounce) ─────────────────────────────
let timer: ReturnType<typeof setTimeout> | undefined;
let requestId = 0; // scarta le risposte arrivate fuori ordine

watch(trimmed, (q) => {
  clearTimeout(timer);
  activeIndex.value = -1;
  failed.value = false;

  if (q.length < SEARCH_MIN_LENGTH) {
    results.value = [];
    total.value = 0;
    loading.value = false;
    return;
  }

  loading.value = true;
  timer = setTimeout(async () => {
    const id = ++requestId;
    try {
      const res = await search(q, OVERLAY_LIMIT);
      if (id !== requestId) return;
      results.value = res.data;
      total.value = res.total;
    } catch {
      if (id !== requestId) return;
      failed.value = true;
      results.value = [];
      total.value = 0;
    } finally {
      if (id === requestId) loading.value = false;
    }
  }, DEBOUNCE_MS);
});

// Gruppi nell'ordine di pertinenza: il gruppo del risultato migliore
// viene per primo. `index` è la posizione nella lista piatta (tastiera).
const groups = computed(() => {
  const map = new Map<string, { label: string; items: { result: SearchResult; index: number }[] }>();
  results.value.forEach((result, index) => {
    if (!map.has(result.type)) {
      map.set(result.type, { label: result.type_label, items: [] });
    }
    map.get(result.type)!.items.push({ result, index });
  });
  return [...map.entries()].map(([type, g]) => ({ type, ...g }));
});

const allResultsLink = computed(() => ({
  path: "/cerca",
  query: { q: trimmed.value },
}));

// ─── Apertura / chiusura ────────────────────────────────
// restoreFocus: ridà il focus alla lente (non quando si cambia pagina)
let restoreFocus = true;
function close(withFocus = true) {
  restoreFocus = withFocus;
  open.value = false;
}

function onGlobalKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && open.value) {
    e.preventDefault();
    close();
  }
}

watch(open, async (isOpen) => {
  if (!import.meta.client) return;
  if (isOpen) {
    opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    await nextTick();
    input.value?.focus();
    input.value?.select();
  } else {
    document.body.style.overflow = "";
    activeIndex.value = -1;
    if (restoreFocus) opener?.focus?.();
    restoreFocus = true;
  }
});

// Cambiando pagina (anche solo #ancora) l'overlay si chiude
watch(
  () => route.fullPath,
  () => close(false),
);

// Ctrl/⌘ + K apre la ricerca da qualunque pagina
function onShortcut(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    open.value = true;
  }
}

onMounted(() => {
  window.addEventListener("keydown", onShortcut);
  window.addEventListener("keydown", onGlobalKeydown);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
  window.removeEventListener("keydown", onShortcut);
  window.removeEventListener("keydown", onGlobalKeydown);
  if (import.meta.client) document.body.style.overflow = "";
});

// ─── Tastiera nel campo di ricerca ──────────────────────
function moveActive(step: number) {
  const n = results.value.length;
  if (!n) return;
  activeIndex.value = (activeIndex.value + step + n) % n;
  nextTick(() => {
    document
      .getElementById(`search-option-${activeIndex.value}`)
      ?.scrollIntoView({ block: "nearest" });
  });
}

function openResult(result: SearchResult) {
  if (result.target === "page") {
    router.push(result.url);
  } else {
    window.open(result.url, "_blank", "noopener");
  }
  close(result.target !== "page");
}

function onSubmit() {
  const active = results.value[activeIndex.value];
  if (active) return openResult(active);
  if (!tooShort.value) router.push(allResultsLink.value);
}
</script>

<template>
  <Teleport to="body">
    <Transition name="search-fade">
      <div
        v-if="open"
        class="search-overlay"
        @click.self="close()"
      >
        <div
          class="search-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Cerca nel sito"
        >
          <!-- Campo di ricerca -->
          <form class="search-panel__form" role="search" @submit.prevent="onSubmit">
            <img
              class="search-panel__icon"
              src="~/assets/images/header-menu/magnifier-lens.png"
              alt=""
              aria-hidden="true"
            />
            <input
              ref="input"
              v-model="query"
              type="search"
              class="search-panel__input"
              placeholder="Cerca nel sito…"
              autocomplete="off"
              spellcheck="false"
              role="combobox"
              aria-label="Cerca nel sito"
              aria-autocomplete="list"
              aria-controls="search-listbox"
              :aria-expanded="results.length > 0"
              :aria-activedescendant="
                activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
              "
              @keydown.down.prevent="moveActive(1)"
              @keydown.up.prevent="moveActive(-1)"
            />
            <button
              type="button"
              class="search-panel__close"
              aria-label="Chiudi la ricerca"
              @click="close()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </form>

          <!-- Risultati e messaggi -->
          <div class="search-panel__body" aria-live="polite">
            <p v-if="tooShort" class="search-panel__hint">
              Cerca tra pubblicazioni, progetti, news, corsi ed eventi.
              <span class="search-panel__keys">
                Usa <kbd>↑</kbd> <kbd>↓</kbd> per muoverti e <kbd>Invio</kbd> per
                aprire.
              </span>
            </p>

            <p v-else-if="failed" class="search-panel__hint">
              Si è verificato un errore durante la ricerca. Riprova tra poco.
            </p>

            <p
              v-else-if="!loading && results.length === 0"
              class="search-panel__hint"
            >
              Nessun risultato per <strong>“{{ trimmed }}”</strong>.
            </p>

            <ul
              v-else
              id="search-listbox"
              class="search-panel__groups"
              :class="{ 'is-loading': loading }"
              role="listbox"
              aria-label="Risultati della ricerca"
            >
              <li
                v-for="group in groups"
                :key="group.type"
                role="presentation"
                class="search-panel__group"
              >
                <span class="search-panel__group-title" aria-hidden="true">
                  {{ group.label }}
                </span>
                <ul role="presentation">
                  <li
                    v-for="item in group.items"
                    :id="`search-option-${item.index}`"
                    :key="item.result.id"
                    role="option"
                    :aria-selected="item.index === activeIndex"
                    @mouseenter="activeIndex = item.index"
                  >
                    <SearchResultItem
                      :result="item.result"
                      :active="item.index === activeIndex"
                      @select="close(false)"
                    />
                  </li>
                </ul>
              </li>
            </ul>

            <span v-if="loading" class="search-panel__spinner" aria-label="Ricerca in corso" />
          </div>

          <!-- Tutti i risultati -->
          <NuxtLink
            v-if="!tooShort && !failed && total > 0"
            :to="allResultsLink"
            class="search-panel__all"
          >
            {{
              total > results.length
                ? `Vedi tutti i ${total} risultati`
                : "Apri la pagina dei risultati"
            }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
$blue: #233162;

.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10vh 1.5rem 2rem;
  background: rgba(0, 0, 0, 0.75);
}

.search-panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 760px;
  max-height: 80vh;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  // annulla i margini automatici degli stili globali
  span,
  img {
    margin: 0;
  }

  &__form {
    // larghezza e margini fissati: lo stile globale dei form li cambia
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: $blue;
  }

  &__icon {
    flex-shrink: 0;
    width: 22px;
    height: auto;
  }

  &__input {
    flex: 1;
    min-width: 0;
    padding: 0.6rem 0.25rem;
    border: none;
    background: transparent;
    color: #fff;
    font: inherit;
    font-size: 1.15rem;
    outline: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    // niente "x" nativa del campo search: c'è già il pulsante di chiusura
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
  }

  &__close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: #fff;
    color: $blue;
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.08);
    }

    &:focus-visible {
      outline: 3px solid #fff;
      outline-offset: 2px;
    }
  }

  &__body {
    position: relative;
    flex: 1;
    min-height: 6rem;
    overflow-y: auto;
    padding: 0.5rem;
    overscroll-behavior: contain;
  }

  &__hint {
    padding: 1.5rem 1rem;
    color: #555;
    text-align: center;
    line-height: 1.6;
  }

  &__keys {
    display: block;
    margin-top: 0.5rem !important;
    font-size: 0.85rem;
    color: #777;

    kbd {
      padding: 0.05rem 0.35rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f6f6f6;
      font-family: inherit;
      font-size: 0.8rem;
    }

    // su touch le frecce non servono
    @media (hover: none) {
      display: none;
    }
  }

  &__groups {
    list-style: none;
    padding: 0;
    margin: 0;
    transition: opacity 0.15s ease;

    &.is-loading {
      opacity: 0.5;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }

  &__group + &__group {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(35, 49, 98, 0.12);
  }

  &__group-title {
    display: block;
    padding: 0.4rem 1rem 0.2rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #777;
  }

  &__spinner {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 22px;
    height: 22px;
    border: 3px solid #e6e6e6;
    border-top-color: $blue;
    border-radius: 50%;
    animation: search-spin 0.8s linear infinite;
  }

  &__all {
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.9rem 1rem;
    border-top: 1px solid rgba(35, 49, 98, 0.15);
    color: $blue;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s ease;

    &:hover,
    &:focus-visible {
      background: rgba(35, 49, 98, 0.06);
    }
  }
}

@keyframes search-spin {
  to {
    transform: rotate(360deg);
  }
}

// Comparsa/scomparsa in dissolvenza
.search-fade-enter-active,
.search-fade-leave-active {
  transition: opacity 0.2s ease;
}

.search-fade-enter-from,
.search-fade-leave-to {
  opacity: 0;
}

// Mobile: a tutto schermo
@media (max-width: 576px) {
  .search-overlay {
    padding: 0;
  }

  .search-panel {
    max-width: none;
    height: 100%;
    max-height: none;
    border-radius: 0;
  }
}
</style>
