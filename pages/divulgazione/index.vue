<script setup>
useSeoMeta({
  title: "Divulgazione | Gruppo Insubrico di Ornitologia",
  description:
    "Conferenze, corsi e eventi organizzati dal Gruppo Insubrico Ornitologico.",
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
        <section class="title-section jumbo-bg">
          <div class="overlay">
            <div class="title uppercase">
              <h1 id="scientific-dissemination">divulgazione</h1>
            </div>
          </div>
        </section>
        <section class="links-section">
          <NuxtLink to="/divulgazione/convegni" class="div-link" data-index="01"
            >Convegni</NuxtLink
          >
          <NuxtLink to="/divulgazione/corsi" class="div-link" data-index="02"
            >Corsi</NuxtLink
          >
          <NuxtLink to="/divulgazione/eventi" class="div-link" data-index="03"
            >Eventi</NuxtLink
          >
          <NuxtLink
            to="/divulgazione/rassegna-stampa"
            class="div-link"
            data-index="04"
            >Rassegna Stampa</NuxtLink
          >
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
    background: url() center/ cover no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }

  .links-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 600px;
    margin: 0 auto;

    .div-link {
      padding: 1.5rem 2rem;
      background: linear-gradient(90deg, #00c853, #00e676);
      color: white;
      text-decoration: none;
      border-radius: 0.5rem;
      font-size: 1.2rem;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        transform: translateX(10px);
        box-shadow: 0 4px 15px rgba(0, 200, 83, 0.3);
      }

      &::before {
        content: attr(data-index);
        margin-right: 1rem;
        opacity: 0.6;
      }
    }
  }
}
</style>
