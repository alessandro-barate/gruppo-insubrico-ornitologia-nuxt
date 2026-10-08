// server/api/news/index.get.ts
// Mock endpoint per la lista news. Quando Laravel sarà pronto,
// puntare API_BASE al backend: la forma della risposta resta la stessa.
import newsData from "~/data/carousel.js";

export default defineEventHandler((event) => {
  const query = getQuery(event);

  // Ordina dalla più recente (date in ISO: '2025-01-20')
  const all = [...newsData].sort((a, b) =>
    String(b.date).localeCompare(String(a.date))
  );

  const page = Number(query.page) || 1;
  const perPage = Number(query.perPage) || 6;
  const start = (page - 1) * perPage;

  return {
    data: all.slice(start, start + perPage),
    total: all.length,
    page,
    perPage,
  };
});