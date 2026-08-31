import { nextTick, ref } from "vue";

// ─────────────────────────────────────────────────────────
// Scroll condizionale condiviso da tutte le paginazioni del sito,
// client-side (usePagination) e server-side (es. index News).
//
// Regola: dopo un cambio pagina, riallinea la finestra all'inizio
// della lista SOLO se questo è finito sopra il bordo alto del
// viewport; altrimenti resta dov'è (niente salto in cima).
//
// USO
//   const { listTop, scrollIfNeeded } = useConditionalScroll()
//   // ...nel gestore di cambio pagina, DOPO aver aggiornato la pagina:
//   scrollIfNeeded()
//   // template: <div ref="listTop"> …item… </div>
// ─────────────────────────────────────────────────────────

export function useConditionalScroll() {
  // Ref al contenitore della lista da agganciare nel template.
  const listTop = ref<HTMLElement | null>(null);

  // Attende il render della nuova pagina, poi scrolla solo se serve.
  function scrollIfNeeded() {
    nextTick(() => {
      const el = listTop.value;
      if (!el) return;
      if (el.getBoundingClientRect().top < 0) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  return { listTop, scrollIfNeeded };
}
