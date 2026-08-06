import type { NewsItem } from "~/types/news";
import newsData from "~/server/data/news.json";

const news = newsData as NewsItem[];
export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  const item = news.find((n) => n.slug === slug);

  if (!item)
    throw createError({
      statusCode: 404,
      statusMessage: "News non trovata",
    });

  return item;
});
