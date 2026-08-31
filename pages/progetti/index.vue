<script setup lang="ts">
const { getHome } = useProgetti();
const { data: home } = await getHome();
console.log("HOME:", JSON.stringify(home.value));
const router = useRouter();

useSeoMeta({
  title: "Progetti | Gruppo Insubrico di Ornitologia",
  description:
    "I progetti di ricerca e conservazione del Gruppo Insubrico Ornitologico.",
  ogTitle: "Progetti | Gruppo Insubrico di Ornitologia",
});

useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/progetti" }],
});

function handleContentClick(e: MouseEvent) {
  const a = (e.target as HTMLElement).closest("a");
  if (!a) return;
  const href = a.getAttribute("href");
  // solo link interni relativi
  if (href && href.startsWith("/")) {
    e.preventDefault();
    router.push(href);
  }
}
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
            <p
              class="main-description__intro"
              v-html="home?.intro_text"
              @click="handleContentClick"
            ></p>
          </div>

          <div class="cards-section">
            <SharedNavCard
              v-for="card in home?.cards"
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
