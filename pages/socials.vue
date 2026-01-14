<script setup>
useSeoMeta({
  title: 'Social | Gruppo Insubrico di Ornitologia',
  description: 'Seguici sui social media per restare aggiornato sulle nostre attività.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://gruppoinsubrico.com/socials' }] })
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <section class="title-section"><h1>SOCIAL</h1></section>
        <section class="social-links">
          <a href="https://www.facebook.com/GruppoInsubricoDiOrnitologia" target="_blank" class="social-card facebook">
            <span>Facebook</span>
          </a>
          <a href="https://www.instagram.com/gruppoinsubricoornitologia/" target="_blank" class="social-card instagram">
            <span>Instagram</span>
          </a>
        </section>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container { min-height: 80vh; padding: 6rem 2rem;
  .title-section { text-align: center; margin-bottom: 4rem; h1 { font-size: 3rem; } }
  .social-links { display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;
    .social-card { 
      padding: 3rem 4rem; border-radius: 1rem; color: white; text-decoration: none;
      font-size: 1.5rem; transition: transform 0.3s ease;
      &:hover { transform: scale(1.05); }
      &.facebook { background: #1877f2; }
      &.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
    }
  }
}
</style>
