// server/api/search.get.ts
// Mock dell'endpoint di ricerca: GET /api/search?q=rondone&limit=8
// Risponde { q, total, data: SearchResult[] } (vedi composables/useSearch.ts),
// ordinati per pertinenza. Quando Laravel sarà pronto, la sua rotta
// /api/search dovrà restituire la stessa forma.
import { searchSite } from "~/server/utils/searchIndex";
import { SEARCH_MIN_LENGTH } from "~/composables/useSearch";

const MAX_LIMIT = 200;

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const q = String(query.q ?? "").trim().slice(0, 100);
  const limit = Math.min(Math.max(Number(query.limit) || 8, 1), MAX_LIMIT);

  if (q.length < SEARCH_MIN_LENGTH) {
    return { q, total: 0, data: [] };
  }

  return { q, ...searchSite(q, limit) };
});
