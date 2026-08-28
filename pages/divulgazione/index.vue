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
              La <strong>divulgazione</strong> &egrave; una delle
              attivit&agrave; fondamentali del
              <strong>Gruppo Insubrico di Ornitologia</strong> e rappresenta il
              principale strumento per
              <strong
                >condividere conoscenze, promuovere la cultura
                scientifica</strong
              >
              e <strong>sensibilizzare alla tutela dell'avifauna</strong>.
              Attraverso
              <strong
                >corsi di ornitologia, serate divulgative, incontri e
                convegni</strong
              >, il <strong>G.I.O.</strong> favorisce il
              <strong>dialogo tra ricercatori, appassionati e cittadini</strong
              >. In questa sezione sono raccolte le
              <strong>iniziative</strong> organizzate nel corso degli anni,
              testimonianza dell'impegno della nostra associazione nella
              <strong>formazione</strong>, nella <strong>ricerca</strong> e
              nella <strong>diffusione della conoscenza ornitologica</strong>.
            </p>
          </div>

          <div class="cards-section">
            <SharedNavCard
              v-for="sub in subsections"
              :key="sub.slug"
              :to="`/divulgazione/${sub.slug}`"
              :title="sub.title"
              :excerpt="sub.intro_excerpt"
              :image="sub.image_path"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-card {
  min-height: 375px;
}

.col {
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

  .cards-section {
    margin-bottom: 14rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 5rem;
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
