<script setup>
useSeoMeta({
  title: "Divulgazione | Gruppo Insubrico di Ornitologia",
  description:
    "Le attività divulgative del Gruppo Insubrico Ornitologico: convegni, corsi, eventi.",
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

        <!-- Sezione contenuti con filtri -->
        <ContentSection
          content-type="divulgazione"
          intro-text="Le nostre attività di divulgazione e sensibilizzazione sul territorio."
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.col {
  &::after {
    content: "";
    position: absolute;
    bottom: -611px;
    left: 0;
    width: 100%;
    height: 150px;
    background: #8c8882;
    clip-path: polygon(0 100%, 100% 0, 100% 100%);
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
}
</style>
