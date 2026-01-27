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
        <section class="title-section jumbo-bg">
          <div class="overlay">
            <div class="title uppercase">
              <h1 id="projects">progetti</h1>
            </div>
          </div>
        </section>

        <section class="links-section">
          <NuxtLink to="/progetti/iwc" class="project-link" data-index="01">
            IWC - International Waterbird Census
          </NuxtLink>

          <NuxtLink to="/progetti/rondoni" class="project-link" data-index="02">
            Progetto Rondoni
          </NuxtLink>

          <NuxtLink to="/progetti/zps" class="project-link" data-index="03">
            ZPS - Zone di Protezione Speciale
          </NuxtLink>
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
    background: url(/) center/ cover no-repeat;

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

    .project-link {
      padding: 1.5rem 2rem;
      background: linear-gradient(90deg, #0077ff, #00c3ff);
      color: white;
      text-decoration: none;
      border-radius: 0.5rem;
      font-size: 1.2rem;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        transform: translateX(10px);
        box-shadow: 0 4px 15px rgba(0, 119, 255, 0.3);
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
