<script setup>
const { getHome } = useProgetti();
const { data } = await getHome();

useSeoMeta({
  title: "Progetti | Gruppo Insubrico di Ornitologia",
  description:
    "I progetti di ricerca e conservazione del Gruppo Insubrico Ornitologico.",
  ogTitle: "Progetti | Gruppo Insubrico di Ornitologia",
});

useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/progetti" }],
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Hero Section (specifica per questa pagina) -->
        <section class="title-section jumbo-bg">
          <div class="title uppercase">
            <h1 id="projects">progetti</h1>
          </div>
        </section>

        <!-- Sezione contenuti -->
        <section>
          <div class="main-description">
            <h2>Progetti di Ricerca</h2>
            <p class="main-description__intro">
              Il G.I.O. ha intrapreso <strong>progetti di ricerca</strong> nel
              campo dell'ornitologia fin dai suoi esordi. Il nostro atto
              costitutivo recita che: “la nostra associazione persegue come
              scopo prioritario
              <strong>lo studio e la conservazione dell'avifauna</strong>
              Infatti è sempre stato nello spirito dei nostri soci
              <strong
                >fare ricerca sul territorio della provincia di Varese</strong
              >
              per individuare l'avifauna presente, lo
              <strong>stato di conservazione</strong> e i
              <strong>cambiamenti e le trasformazioni</strong> avvenuti nel
              tempo. I risultati delle ricerche riportate qui sotto sono
              consultabili alla pagina
              <NuxtLink to="/pubblicazioni" class="specific-link"
                >Pubblicazioni Scientifiche</NuxtLink
              >.
            </p>
          </div>

          <div class="cards-section">
            <SharedNavCard
              v-for="card in data.cards"
              :key="card.slug"
              :to="`/progetti/${card.slug}`"
              :title="card.title"
              :excerpt="card.intro_excerpt"
              :image="card.image_path"
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
    bottom: -734px;
    left: 0;
    width: 100%;
    height: 150px;
    background: #8c8882;
    clip-path: polygon(0 100%, 100% 0, 100% 100%);

    @media (max-width: 576px) {
      bottom: -720px;
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
    background: url(/assets/images/projects/piro-piro.webp) center/ cover
      no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }

  .main-description {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    padding-bottom: 2rem;

    @media (max-width: 576px) {
      width: 95%;
    }

    h2 {
      margin-bottom: 1rem;
      text-align: center;
    }

    &__intro {
      font-size: 1.1rem;
      margin-bottom: 4rem;
      color: #333;
      line-height: 1.75rem;
    }
  }

  .cards-section {
    margin-bottom: 22rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    width: 90%;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 576px) {
      width: 95%;
    }
  }
}
</style>
