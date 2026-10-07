// server/api/news/[slug].get.ts
// Mock endpoint per la singola news. Quando Laravel sarà pronto,
// puntare API_BASE al backend: la forma della risposta resta la stessa.
import newsData from "~/data/carousel.js";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  const item = newsData.find((n) => n.slug === slug);

  if (!item) {
    throw createError({
      statusCode: 404,
      statusMessage: "News non trovata",
    });
  }

  return item;
});
