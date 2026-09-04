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

// Icona per tipo di allegato (stessi file usati nei Progetti/TypedLink).
const ATTACHMENT_ICON = {
  pdf: "/images/pdf-icon.png",
  word: "/images/word-icon.png",
  excel: "/images/excel-icon.png",
  powerpoint: "/images/powerpoint-icon.png",
  external: "/images/link-icon.png",
};
const iconFor = (type) => ATTACHMENT_ICON[type] ?? ATTACHMENT_ICON.pdf;
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <article v-if="article" class="news-detail">
          <!-- Header con immagine di copertina -->
          <div
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
          </div>

          <!-- Corpo della news -->
          <div class="news-detail__content">
            <!-- Breadcrumb -->
            <nav class="breadcrumb">
              <NuxtLink to="/news" class="breadcrumb__link">
                <img
                  src="~/assets/images/scientific-dissemination/chevron-left.svg"
                  alt="Bottone per tornare alla lista delle news"
                />Torna alle news
              </NuxtLink>
            </nav>
            <p class="news-detail__excerpt">{{ article.excerpt }}</p>
            <div class="news-detail__body">{{ article.body }}</div>

            <!-- Allegati: elenco di file (pdf, word, excel, powerpoint) -->
            <div
              v-if="article.attachments && article.attachments.length"
              class="news-detail__attachments"
            >
              <h2 class="news-detail__attachments-title">Allegati</h2>
              <ul class="news-detail__attachments-list">
                <li
                  v-for="(file, i) in article.attachments"
                  :key="i"
                  class="news-detail__attachment"
                >
                  <a
                    :href="file.url"
                    class="typed-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      :src="iconFor(file.type)"
                      alt=""
                      class="typed-link__icon"
                    />
                    <span class="typed-link__label">
                      {{ file.label }}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/scss/_partials/subsection" as *;
@use "~/assets/scss/_partials/typed-link" as *;

.col {
  .news-detail {
    margin-bottom: 20rem;
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
      font-size: 1rem;
      line-height: 1.7;
      color: #444;
      white-space: pre-line;
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2.5rem;
    }

    &__attachments {
      margin-top: 3.5rem;
    }

    &__attachments-title {
      font-size: 1.2rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    &__attachments-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 0.75rem;

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    &__footer {
      width: 90%;
      max-width: 800px;
      margin: 4rem auto 6rem;
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
