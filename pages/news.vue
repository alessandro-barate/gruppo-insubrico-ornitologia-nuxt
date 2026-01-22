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
        <section class="title-section uppercase">
          <h1 id="news">news</h1>
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
.container {
  min-height: 80vh;
  padding: 6rem 2rem;

  .title-section {
    text-align: center;
    margin-bottom: 4rem;
  }

  .news-list {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
