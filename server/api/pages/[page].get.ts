// server/api/pages/[page].get.ts
// Mock dei testi/immagini modificabili dal pannello (usePageContent).
// Imita la rotta Laravel GET /api/pages/{page}, che restituisce una mappa
// { chiave: valore }. Qui la mappa è vuota: nessun testo modificato, quindi
// le pagine mostrano i loro testi di default.
// Quando API_BASE punterà a Laravel, questo file non verrà più usato.
export default defineEventHandler(() => {
  return {};
});
