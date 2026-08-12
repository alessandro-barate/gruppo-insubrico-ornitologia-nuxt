<script setup lang="ts">
const { getSubsections } = useDivulgazione();
const { data: subsections } = await getSubsections();

useSeoMeta({
  title: "Divulgazione | Gruppo Insubrico di Ornitologia",
  description:
    "Corsi di ornitologia, eventi e convegni organizzati dal Gruppo Insubrico di Ornitologia.",
  ogTitle: "Divulgazione | Gruppo Insubrico di Ornitologia",
});

useHead({
  link: [
    { rel: "canonical", href: "https://gruppoinsubrico.com/divulgazione" },
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
            <h1 id="scientific-dissemination">divulgazione</h1>
          </div>
        </section>

        <!-- Sezione contenuti -->
        <section>
          <div class="main-description">
            <p class="main-description__intro">
              La divulgazione &egrave; una delle attivit&agrave; fondamentali
              del Gruppo Insubrico di Ornitologia e rappresenta il principale
              strumento per condividere conoscenze, promuovere la cultura
              scientifica e sensibilizzare alla tutela dell'avifauna. Attraverso
              corsi di ornitologia, serate divulgative, incontri e convegni, il
              G.I.O. favorisce il dialogo tra ricercatori, appassionati e
              cittadini. In questa sezione sono raccolte le iniziative
              organizzate nel corso degli anni, testimonianza dell'impegno della
              nostra associazione nella formazione, nella ricerca e nella
              diffusione della conoscenza ornitologica.
            </p>
          </div>

          <div class="cards-section">
            <DivulgazioneSubsectionCard
              v-for="sub in subsections"
              :key="sub.slug"
              :subsection="sub"
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
    bottom: -348px;
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
    background: url(/assets/images/scientific-dissemination/cincia-bigia.webp)
      center/ cover no-repeat;

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

    &__intro {
      font-size: 1.1rem;
      margin-bottom: 4rem;
      color: #333;
      line-height: 1.75rem;
    }
  }
}
</style>
