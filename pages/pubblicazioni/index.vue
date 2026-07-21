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

        <!-- Sezione contenuti con filtri -->
        <ContentSection
          content-type="pubblicazioni"
          intro-text="Le nostre pubblicazioni scientifiche e divulgative sull'ornitologia."
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
    background: url(/assets/images/publications/fistioni-turchi.webp) center/
      cover no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }
}
</style>
