<script setup>
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

        <!-- Sezione contenuti con filtri -->
        <ContentSection
          content-type="progetti"
          intro-text="I nostri progetti di ricerca e conservazione per la tutela dell'avifauna."
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    background: url(/assets/images/projects/piro-piro.webp) center/ cover
      no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }
}
</style>
