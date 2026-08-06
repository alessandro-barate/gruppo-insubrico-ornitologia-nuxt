<script setup>
const route = useRoute();
const config = useRuntimeConfig();

// Recupera la singola news in base allo slug in URL.
// SSR reale: la news arriva già renderizzata dal server (buono per la SEO).
const { data: article, error } = await useFetch(`/news/${route.params.slug}`, {
  baseURL: config.public.apiBase,
});

// Se lo slug non esiste, mostra la pagina 404 di Nuxt
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "News non trovata",
    fatal: true,
  });
}

// SEO dinamica basata sulla news caricata
useSeoMeta({
  title: () => `${article.value?.title} | Gruppo Insubrico di Ornitologia`,
  description: () => article.value?.excerpt,
});
useHead({
  link: [
    {
      rel: "canonical",
      href: `https://gruppoinsubrico.com/news/${route.params.slug}`,
    },
  ],
});

// Data formattata in italiano (es. "20 gennaio 2025")
const formattedDate = computed(() => {
  if (!article.value?.date) return "";
  return new Date(article.value.date).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <article v-if="article" class="news-detail">
          <!-- Header con immagine di copertina -->
          <header
            class="news-detail__hero"
            :style="{ backgroundImage: `url(${article.image})` }"
          >
            <div class="news-detail__hero-overlay">
              <span v-if="article.category" class="news-detail__category">
                {{ article.category }}
              </span>
              <h1 class="news-detail__title">{{ article.title }}</h1>
              <time
                v-if="formattedDate"
                class="news-detail__date"
                :datetime="article.date"
              >
                {{ formattedDate }}
              </time>
            </div>
          </header>

          <!-- Corpo della news -->
          <div class="news-detail__content">
            <p class="news-detail__excerpt">{{ article.excerpt }}</p>
            <div class="news-detail__body">{{ article.body }}</div>

            <!-- Azioni: PDF e/o link esterno (possono coesistere) -->
            <div
              v-if="article.pdf || article.externalLink"
              class="news-detail__actions"
            >
              <a
                v-if="article.pdf"
                :href="article.pdf"
                class="news-detail__btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Scarica il documento allegato
              </a>
              <a
                v-if="article.externalLink"
                :href="article.externalLink"
                class="news-detail__btn news-detail__btn--outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vai al sito
              </a>
            </div>
          </div>

          <!-- Torna all'elenco -->
          <div class="news-detail__footer">
            <NuxtLink to="/news" class="news-detail__back">
              ‹ Torna alle news
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.col {
  .news-detail {
    &__hero {
      position: relative;
      width: 100%;
      height: 500px;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: flex-end;
      margin-bottom: 3rem;
    }

    &__hero-overlay {
      width: 100%;
      padding: 3rem;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0)
      );
      color: #fff;
    }

    &__category {
      display: inline-block;
      padding: 0.35rem 1rem;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: linear-gradient(90deg, #002fff, #00e1ff);
      border-radius: 6px;
    }

    &__title {
      font-size: clamp(1.8rem, 4vw, 3rem);
      line-height: 1.15;
      margin-bottom: 1rem;
    }

    &__date {
      font-size: 1rem;
      opacity: 0.85;
    }

    &__content {
      width: 90%;
      max-width: 800px;
      margin: 0 auto;
    }

    &__excerpt {
      font-size: clamp(1.15rem, 2.2vw, 1.4rem);
      font-weight: 500;
      line-height: 1.6;
      color: #333;
      margin-bottom: 2rem;
    }

    &__body {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #444;
      white-space: pre-line;
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2.5rem;
    }

    &__btn {
      display: inline-block;
      padding: 0.9rem 1.75rem;
      font-weight: 500;
      color: #fff;
      background: linear-gradient(90deg, #002fff, #00e1ff);
      border: 1px solid transparent;
      border-radius: 8px;
      text-decoration: none;
      transition: transform 0.25s ease;

      &:hover {
        transform: translateY(-2px);
      }

      &--outline {
        color: #002fff;
        background: transparent;
        border-color: #002fff;
      }
    }

    &__footer {
      width: 90%;
      max-width: 800px;
      margin: 4rem auto 6rem;
    }

    &__back {
      font-size: 1.05rem;
      font-weight: 500;
      color: #002fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 576px) {
  .col {
    .news-detail {
      &__hero {
        height: 320px;
      }

      &__hero-overlay {
        padding: 1.5rem;
      }

      &__content,
      &__footer {
        width: 95%;
      }
    }
  }
}
</style>
