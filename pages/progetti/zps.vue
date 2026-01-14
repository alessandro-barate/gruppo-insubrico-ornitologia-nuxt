<script setup>
useSeoMeta({
  title: 'ZPS - Zone di Protezione Speciale | GIO',
  description: 'Progetto ZPS del Gruppo Insubrico di Ornitologia.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://gruppoinsubrico.com/progetti/zps' }] })
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <section class="title-section"><h1>ZPS - Zone di Protezione Speciale</h1></section>
        <section class="content-section">
          <p>Contenuto della pagina ZPS in sviluppo...</p>
          <NuxtLink to="/progetti" class="back-link">← Torna ai progetti</NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container { min-height: 80vh; padding: 6rem 2rem;
  .title-section { text-align: center; margin-bottom: 4rem; h1 { font-size: 2.5rem; } }
  .content-section { max-width: 800px; margin: 0 auto;
    .back-link { display: inline-block; margin-top: 2rem; color: #0077ff; &:hover { text-decoration: underline; } }
  }
}
</style>
