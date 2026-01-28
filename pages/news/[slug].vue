<script setup>
useSeoMeta({
  title: "News | Gruppo Insubrico di Ornitologia",
  description:
    "Ultime notizie e aggiornamenti dal Gruppo Insubrico Ornitologico.",
});
useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/news" }],
});
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
          <p>Le ultime notizie dal GIO...</p>
          <!-- Qui andranno le news caricate dal backend Laravel -->
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
    background: url(/assets/images/news/beccaccini.webp) center/ cover no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }

  .news-list {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
