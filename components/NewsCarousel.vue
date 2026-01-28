<template>
  <div class="news-carousel">
    <!-- Track con le slide -->
    <div class="news-carousel__viewport" ref="viewport">
      <div
        class="news-carousel__track"
        :style="trackStyle"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <article
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="news-carousel__slide"
          :class="{ 'news-carousel__slide--active': index === currentIndex }"
        >
          <div class="news-carousel__card">
            <!-- Immagine di sfondo -->
            <div class="news-carousel__image-wrapper">
              <img
                :src="slide.image"
                :alt="slide.title"
                class="news-carousel__image"
                loading="lazy"
              />
              <div class="news-carousel__overlay"></div>
            </div>

            <!-- Categoria in alto -->
            <span class="news-carousel__category">{{ slide.category }}</span>

            <!-- Contenuto in basso -->
            <div class="news-carousel__content">
              <h3 class="news-carousel__title">{{ slide.title }}</h3>
            </div>

            <!-- Pulsante + -->
            <NuxtLink
              v-if="slide.link"
              :to="slide.link"
              class="news-carousel__action-btn"
              aria-label="Leggi di più"
            >
              <span>+</span>
            </NuxtLink>

            <a
              v-else-if="slide.pdf"
              :href="slide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="news-carousel__action-btn"
              aria-label="Scarica PDF"
            >
              <span>+</span>
            </a>
          </div>
        </article>
      </div>
    </div>

    <!-- Navigazione -->
    <div class="news-carousel__nav-container">
      <div class="news-carousel__arrows">
        <button
          class="news-carousel__arrow news-carousel__arrow--prev"
          @click="prev"
          aria-label="Slide precedente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          class="news-carousel__arrow news-carousel__arrow--next"
          @click="next"
          aria-label="Slide successiva"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <!-- Dots -->
      <div class="news-carousel__dots">
        <button
          v-for="(slide, index) in slides"
          :key="`dot-${slide.id}`"
          class="news-carousel__dot"
          :class="{ 'news-carousel__dot--active': index === currentIndex }"
          @click="goTo(index)"
          :aria-label="`Vai alla slide ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import carouselData from "~/data/carousel.js";

// Props
const props = defineProps({
  autoplay: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number,
    default: 5000,
  },
});

// State
const slides = ref(carouselData);
const currentIndex = ref(0);
const viewport = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const currentTranslate = ref(0);

let autoplayInterval = null;

// Computed - calcola la larghezza della slide in base al viewport
const trackStyle = computed(() => {
  // Ogni slide occupa circa il 55% del viewport su desktop
  const slideWidth = 58; // percentuale
  const gap = 1.5; // percentuale gap
  const offset = currentIndex.value * (slideWidth + gap);

  return {
    transform: `translateX(-${offset}%)`,
  };
});

// Methods
const next = () => {
  if (currentIndex.value < slides.value.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Torna alla prima slide
  }
  resetAutoplay();
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = slides.value.length - 1; // Va all'ultima slide
  }
  resetAutoplay();
};

const goTo = (index) => {
  currentIndex.value = index;
  resetAutoplay();
};

// Drag/Swipe functionality
const startDrag = (e) => {
  isDragging.value = true;
  startX.value = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchmove", onDrag);
  document.addEventListener("touchend", endDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;

  const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  const diff = currentX - startX.value;
  currentTranslate.value = diff;
};

const endDrag = () => {
  isDragging.value = false;

  // Se il drag è abbastanza lungo, cambia slide (con loop)
  if (currentTranslate.value < -50) {
    next();
  } else if (currentTranslate.value > 50) {
    prev();
  }

  currentTranslate.value = 0;

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", endDrag);
};

const startAutoplay = () => {
  if (props.autoplay) {
    autoplayInterval = setInterval(() => {
      if (currentIndex.value < slides.value.length - 1) {
        next();
      } else {
        currentIndex.value = 0;
      }
    }, props.interval);
  }
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

const resetAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

// Lifecycle
onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style lang="scss" scoped>
.news-carousel {
  --slide-width: 58%;
  --slide-gap: 1.5%;
  --slide-height: 420px;
  --border-radius: 16px;
  --accent-color: #e85a2c;
  --transition-speed: 0.5s;

  width: 100%;
  padding: 2rem 0;
  overflow: hidden;

  &__viewport {
    width: 100%;
    overflow: visible;
    padding-left: 5%;
  }

  &__track {
    display: flex;
    gap: var(--slide-gap);
    transition: transform var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  &__slide {
    flex: 0 0 var(--slide-width);
    min-width: var(--slide-width);
    height: var(--slide-height);
    transition: opacity var(--transition-speed) ease;
  }

  &__card {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    overflow: hidden;
    background: #1a1a1a;
  }

  &__image-wrapper {
    position: absolute;
    inset: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;

    .news-carousel__card:hover & {
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
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
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
      background: darken(#e85a2c, 8%);
      transform: scale(1.1);
    }
  }

  // Navigation container
  &__nav-container {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 0 0 5%;
  }

  &__arrows {
    display: flex;
    gap: 0.5rem;
  }

  &__arrow {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1.5px solid #333;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    svg {
      width: 20px;
      height: 20px;
      stroke: #333;
      transition: stroke 0.3s ease;
    }

    &:hover {
      background: #333;

      svg {
        stroke: #fff;
      }
    }
  }

  &__dots {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1.5px solid #333;
    background: transparent;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(51, 51, 51, 0.3);
    }

    &--active {
      background: #333;
    }
  }

  // ==========================================
  // RESPONSIVE - TABLET
  // ==========================================
  @media (max-width: 992px) {
    --slide-width: 75%;
    --slide-height: 380px;

    &__viewport {
      padding-left: 4%;
    }

    &__nav-container {
      padding-left: 4%;
    }
  }

  // ==========================================
  // RESPONSIVE - MOBILE
  // ==========================================
  @media (max-width: 576px) {
    --slide-width: 85%;
    --slide-height: 320px;
    --border-radius: 12px;

    &__viewport {
      padding-left: 4%;
    }

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
      font-size: 1.1rem;
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

    &__nav-container {
      padding-left: 4%;
      gap: 1rem;
    }

    &__arrow {
      width: 38px;
      height: 38px;

      svg {
        width: 18px;
        height: 18px;
      }
    }

    &__dot {
      width: 8px;
      height: 8px;
    }
  }
}
</style>
