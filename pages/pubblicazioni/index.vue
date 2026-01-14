<script setup>
useSeoMeta({
  title: 'Pubblicazioni | Gruppo Insubrico di Ornitologia',
  description: 'Pubblicazioni divulgative del Gruppo Insubrico Ornitologico.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://gruppoinsubrico.com/pubblicazioni' }] })
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <section class="title-section"><h1>PUBBLICAZIONI</h1></section>
        <section class="links-section">
          <NuxtLink to="/pubblicazioni/quaderni" class="pub-link" data-index="01">Quaderni</NuxtLink>
          <NuxtLink to="/pubblicazioni/resoconto-ornitologico" class="pub-link" data-index="02">Resoconto Ornitologico</NuxtLink>
          <NuxtLink to="/pubblicazioni/bol" class="pub-link" data-index="03">BOL</NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container { min-height: 80vh; padding: 6rem 2rem;
  .title-section { text-align: center; margin-bottom: 4rem; h1 { font-size: 3rem; } }
  .links-section { display: flex; flex-direction: column; gap: 2rem; max-width: 600px; margin: 0 auto;
    .pub-link {
      padding: 1.5rem 2rem;
      background: linear-gradient(90deg, #d2420d, #ffbf00);
      color: white; text-decoration: none; border-radius: 0.5rem; font-size: 1.2rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      &:hover { transform: translateX(10px); box-shadow: 0 4px 15px rgba(210, 66, 13, 0.3); }
      &::before { content: attr(data-index); margin-right: 1rem; opacity: 0.6; }
    }
  }
}
</style>
