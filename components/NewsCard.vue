<script setup>
defineProps({
  news: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="news-card">
    <!-- Immagine di sfondo -->
    <div class="news-card__image-wrapper">
      <img
        :src="news.image"
        :alt="news.title"
        class="news-card__image"
        loading="lazy"
      />
      <div class="news-card__overlay"></div>
    </div>

    <!-- Categoria in alto -->
    <span class="news-card__category">{{ news.category }}</span>

    <!-- Contenuto in basso -->
    <div class="news-card__content">
      <h3 class="news-card__title">{{ news.title }}</h3>
    </div>

    <!-- La card apre SEMPRE la pagina di dettaglio.
         PDF ed eventuali link esterni sono gestiti dentro il dettaglio. -->
    <NuxtLink
      :to="`/news/${news.slug || news.id}`"
      class="news-card__action-btn"
      aria-label="Leggi di più"
    >
      <span>+</span>
    </NuxtLink>
  </article>
</template>

<style lang="scss" scoped>
@use "sass:color";

.news-card {
  --border-radius: 16px;
  --accent-color: #002fff;

  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  overflow: hidden;
  background: #1a1a1a;

  &__image-wrapper {
    position: absolute;
    inset: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;

    .news-card:hover & {
      transform: scale(1.05);
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.2) 40%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }

  &__category {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    z-index: 2;
    letter-spacing: 0.02em;
  }

  &__content {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    right: 5rem;
    z-index: 2;
  }

  &__title {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 600;
    color: #fff;
    line-height: 1.3;
    margin: 0;
  }

  &__action-btn {
    position: absolute;
    bottom: 1.25rem;
    right: 1.25rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--accent-color);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 3;
    text-decoration: none;

    span {
      color: #fff;
      font-size: 1.75rem;
      font-weight: 300;
      line-height: 1;
    }

    &:hover {
      background: color.adjust(#002fff, $lightness: -8%);
      transform: scale(1.1);
    }
  }

  // ==========================================
  // RESPONSIVE - MOBILE
  // ==========================================
  @media (max-width: 576px) {
    --border-radius: 12px;

    &__category {
      top: 1rem;
      left: 1rem;
      font-size: 0.8rem;
    }

    &__content {
      bottom: 1rem;
      left: 1rem;
      right: 4rem;
    }

    &__title {
      font-size: 1rem;
    }

    &__action-btn {
      width: 40px;
      height: 40px;
      bottom: 1rem;
      right: 1rem;

      span {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
