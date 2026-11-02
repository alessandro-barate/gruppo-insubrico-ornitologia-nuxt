// ─── API LARAVEL ─────────────────────────────────────────
// Tutti i dati del sito arrivano dal backend Laravel, all'indirizzo
// NUXT_PUBLIC_API_BASE (es. https://api.gruppoinsubrico.com/api).
//
// useApiData(key, path) = useAsyncData + $fetch verso Laravel, con una
// regola sola in più: se Laravel risponde 404 il risultato è null, così
// le pagine possono fare `if (!data.value) throw createError(404)` come
// facevano con i mock. Gli altri errori (backend spento, 500…) passano
// alla pagina di errore di Nuxt.

export function apiFetch<T>(path: string, opts: { query?: Record<string, unknown> } = {}) {
  const config = useRuntimeConfig();
  return $fetch<T>(path, { baseURL: config.public.apiBase, query: opts.query });
}

export function useApiData<T>(
  key: string,
  path: string,
  opts: { query?: Record<string, unknown> } = {},
) {
  return useAsyncData<T | null>(key, async () => {
    try {
      return await apiFetch<T>(path, opts);
    } catch (err: any) {
      if ((err?.statusCode ?? err?.status) === 404) return null;
      throw err;
    }
  });
}
