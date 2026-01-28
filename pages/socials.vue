<script setup>
useSeoMeta({
  title: "Social | Gruppo Insubrico di Ornitologia",
  description:
    "Seguici sui social media per restare aggiornato sulle nostre attività.",
});
useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/socials" }],
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <section class="title-section jumbo-bg">
          <div class="overlay">
            <div class="title uppercase">
              <h1 id="news">social</h1>
            </div>
          </div>
        </section>
        <section class="social-links">
          <a
            href="https://www.facebook.com/GruppoInsubricoDiOrnitologia"
            target="_blank"
            class="social-card facebook"
          >
            <span>Facebook</span>
          </a>
          <a
            href="https://www.instagram.com/gruppoinsubricoornitologia/"
            target="_blank"
            class="social-card instagram"
          >
            <span>Instagram</span>
          </a>
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
    background: url(/assets/images/socials/tortore.webp) center/ cover no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }

  .social-links {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;

    .social-card {
      padding: 3rem 4rem;
      border-radius: 1rem;
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.05);
      }

      &.facebook {
        background: #1877f2;
      }

      &.instagram {
        background: linear-gradient(
          45deg,
          #f09433,
          #e6683c,
          #dc2743,
          #cc2366,
          #bc1888
        );
      }
    }
  }
}
</style>
