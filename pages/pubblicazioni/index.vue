<script setup>
const { getHome } = usePubblicazioni();
const { data } = await getHome();

console.log("intro_text:", data.value?.intro_text);
console.log("cards:", data.value?.cards?.length);

useSeoMeta({
  title: "Pubblicazioni | Gruppo Insubrico di Ornitologia",
  description:
    "Le pubblicazioni scientifiche e divulgative del Gruppo Insubrico Ornitologico.",
  ogTitle: "Pubblicazioni | Gruppo Insubrico di Ornitologia",
});

useHead({
  link: [
    { rel: "canonical", href: "https://gruppoinsubrico.com/pubblicazioni" },
  ],
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Hero Section (specifica per questa pagina) -->
        <section class="title-section jumbo-bg">
          <div class="title uppercase">
            <h1 id="publications">pubblicazioni</h1>
          </div>
        </section>

        <!-- Sezione contenuti -->
        <section class="content-section">
          <div class="main-description">
            <p class="main-description__intro" v-html="data.intro_text"></p>
          </div>

          <div class="pubblicazioni__grid">
            <PubblicazioniNavCard
              v-for="card in data.cards"
              :key="card.slug"
              :card="card"
              base-path="/pubblicazioni"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.col {
  &::after {
    content: "";
    position: absolute;
    bottom: -782px;
    left: 0;
    width: 100%;
    height: 150px;
    background: #8c8882;
    clip-path: polygon(0 100%, 100% 0, 100% 100%);

    @media (max-width: 576px) {
      bottom: -743px;
      height: 90px;
    }
  }

  .title-section {
    position: relative;
    width: 100%;
    height: 700px;
    overflow: hidden;
    margin-bottom: 3rem;

    .overlay {
      height: 100%;
    }
  }

  .jumbo-bg {
    background: url(/assets/images/publications/fistioni-turchi.webp) center/
      cover no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }

  .content-section {
    width: 90%;
    margin-bottom: 17rem;

    .main-description {
      max-width: 1400px;
      margin: 0 auto;
      padding-bottom: 5rem;

      @media (max-width: 576px) {
        width: 95%;
      }

      &__intro {
        font-size: 1.1rem;
        margin-bottom: 4rem;
        color: #333;
        line-height: 1.75rem;
      }
    }

    .pubblicazioni__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
  }
}
</style>
