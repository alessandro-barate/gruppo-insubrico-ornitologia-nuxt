<script setup lang="ts">
// Pagina Progetti: testo descrittivo + galleria di immagini.
// Le schede delle ricerche sono state spostate in Pubblicazioni → Paper.
const { getPage } = useProgetti();
const { data: page } = await getPage();
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
  // Rispetta i link da aprire in nuova scheda e ctrl/cmd-click
  if (a.target === "_blank") return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
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

        <!-- Testo descrittivo -->
        <section>
          <div class="main-description">
            <h2>Progetti di Ricerca</h2>
            <p
              class="main-description__intro"
              v-html="page?.intro_text"
              @click="handleContentClick"
            ></p>
          </div>

          <!-- Galleria immagini -->
          <div v-if="page?.gallery?.length" class="gallery-section">
            <ProgettiGallery :images="page.gallery" />
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
      padding-top: 4rem;
    }
  }

  .main-description {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    padding-bottom: 2rem;

    @media (max-width: 576px) {
      width: 90%;
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

  .gallery-section {
    margin-bottom: 22rem;
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
