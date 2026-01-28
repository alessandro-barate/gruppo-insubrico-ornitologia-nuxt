<script setup>
import newsData from "~/data/carousel.js"; // Per ora usa i dati mock, poi sostituirai con API

useSeoMeta({
  title: "News | Gruppo Insubrico di Ornitologia",
  description:
    "Ultime notizie e aggiornamenti dal Gruppo Insubrico Ornitologico.",
});
useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/news" }],
});

// In futuro sostituirai con:
// const { data: newsList } = await useFetch('/api/news')
const newsList = ref(newsData);

console.log("newsList:", newsList.value);
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <section class="title-section jumbo-bg">
          <div class="overlay">
            <div class="title uppercase">
              <h1 id="news">news</h1>
            </div>
          </div>
        </section>

        <section class="news-list">
          <p class="news-list__intro">Le ultime notizie dal GIO...</p>

          <div class="news-grid">
            <div
              v-for="news in newsList"
              :key="news.id"
              class="news-grid__item"
            >
              <NewsCard :news="news" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.col {
  .title-section {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    margin-bottom: 3rem;

    .overlay {
      height: 100%;
    }
  }

  .jumbo-bg {
    background: url(/assets/images/news/beccaccini.webp) center/cover no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }

  .news-list {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    padding-bottom: 4rem;

    &__intro {
      font-size: clamp(1rem, 2vw, 1.3rem);
      margin-bottom: 2rem;
      color: #555;
    }
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    &__item {
      aspect-ratio: 4 / 3;
      min-height: 300px;
    }
  }
}

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
  .col {
    .news-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;

      &__item {
        height: 300px;
      }
    }
  }
}

// ==========================================
// MEDIA QUERIES - MOBILE
// ==========================================
@media (max-width: 576px) {
  .col {
    .title-section {
      height: 350px;
    }

    .news-list {
      width: 95%;
    }

    .news-grid {
      grid-template-columns: 1fr;
      gap: 1rem;

      &__item {
        height: 250px;
      }
    }
  }
}
</style>
