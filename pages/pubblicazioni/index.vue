<script setup>
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
        <section>
          <div class="main-description">
            <p class="main-description__intro">
              Le pubblicazioni scientifiche del Gruppo Insubrico di Ornitologia
              raccolgono oltre vent'anni di attivit&agrave; scientifica e
              divulgativa, documentando ricerche, monitoraggi e studi dedicati
              all'avifauna. In questa sezione sono disponibili i
              <strong><em>Quaderni del G.I.O.</em></strong
              >, il <strong><em>Bollettino Ornitologico Lombardo</em></strong
              >, gli
              <strong><em>Uccelli della Provincia di Varese</em></strong> che
              comprende la <strong><em>Lista degli uccelli</em></strong> e il
              <strong
                ><em
                  >Resoconto ornitologico della provincia di Varese</em
                ></strong
              >, oltre alla bibliografia dei lavori scientifici realizzati dai
              soci. Un patrimonio di conoscenze messo a disposizione di
              ricercatori, appassionati e di tutti gli interessati
              all'ornitologia.
            </p>
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
    bottom: -348px;
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

  .main-description {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    padding-bottom: 17rem;

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
}
</style>
