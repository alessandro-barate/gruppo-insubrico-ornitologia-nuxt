<script setup>
useSeoMeta({
  title: 'Divulgazione | Gruppo Insubrico di Ornitologia',
  description: 'Conferenze, corsi e eventi organizzati dal Gruppo Insubrico Ornitologico.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://gruppoinsubrico.com/divulgazione' }] })
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <section class="title-section"><h1>DIVULGAZIONE</h1></section>
        <section class="links-section">
          <NuxtLink to="/divulgazione/convegni" class="div-link" data-index="01">Convegni</NuxtLink>
          <NuxtLink to="/divulgazione/corsi" class="div-link" data-index="02">Corsi</NuxtLink>
          <NuxtLink to="/divulgazione/eventi" class="div-link" data-index="03">Eventi</NuxtLink>
          <NuxtLink to="/divulgazione/rassegna-stampa" class="div-link" data-index="04">Rassegna Stampa</NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container { min-height: 80vh; padding: 6rem 2rem;
  .title-section { text-align: center; margin-bottom: 4rem; h1 { font-size: 3rem; } }
  .links-section { display: flex; flex-direction: column; gap: 2rem; max-width: 600px; margin: 0 auto;
    .div-link {
      padding: 1.5rem 2rem;
      background: linear-gradient(90deg, #00c853, #00e676);
      color: white; text-decoration: none; border-radius: 0.5rem; font-size: 1.2rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      &:hover { transform: translateX(10px); box-shadow: 0 4px 15px rgba(0, 200, 83, 0.3); }
      &::before { content: attr(data-index); margin-right: 1rem; opacity: 0.6; }
    }
  }
}
</style>
