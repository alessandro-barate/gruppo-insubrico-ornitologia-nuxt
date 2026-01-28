<template>
  <div
    class="news-carousel"
    @mouseenter="pauseScroll"
    @mouseleave="resumeScroll"
  >
    <!-- Track con le slide -->
    <div class="news-carousel__viewport" ref="viewport">
      <div
        class="news-carousel__track"
        ref="track"
        :class="{
          'news-carousel__track--paused': isPaused,
          'news-carousel__track--dragging': isDragging,
        }"
        :style="trackStyle"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <!-- Prima serie di slide -->
        <article
          v-for="(slide, index) in slides"
          :key="'a-' + slide.id"
          class="news-carousel__slide"
        >
          <div class="news-carousel__card">
            <div class="news-carousel__image-wrapper">
              <img
                :src="slide.image"
                :alt="slide.title"
                class="news-carousel__image"
                loading="lazy"
              />
              <div class="news-carousel__overlay"></div>
            </div>

            <span class="news-carousel__category">{{ slide.category }}</span>

            <div class="news-carousel__content">
              <h3 class="news-carousel__title">{{ slide.title }}</h3>
            </div>

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

        <!-- Seconda serie di slide (duplicata per loop infinito) -->
        <article
          v-for="(slide, index) in slides"
          :key="'b-' + slide.id"
          class="news-carousel__slide"
        >
          <div class="news-carousel__card">
            <div class="news-carousel__image-wrapper">
              <img
                :src="slide.image"
                :alt="slide.title"
                class="news-carousel__image"
                loading="lazy"
              />
              <div class="news-carousel__overlay"></div>
            </div>

            <span class="news-carousel__category">{{ slide.category }}</span>

            <div class="news-carousel__content">
              <h3 class="news-carousel__title">{{ slide.title }}</h3>
            </div>

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

    <!-- 
    =============================================
    NAVIGAZIONE MANUALE (decommentare se necessario)
    =============================================
    <div class="news-carousel__nav-container">
      <div class="news-carousel__arrows">
        <button
          class="news-carousel__arrow news-carousel__arrow--prev"
          @click="prev"
          aria-label="Slide precedente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          class="news-carousel__arrow news-carousel__arrow--next"
          @click="next"
          aria-label="Slide successiva"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

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
    -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import carouselData from "~/data/carousel.js";

// Props
const props = defineProps({
  scrollDuration: {
    type: Number,
    default: 25, // secondi per un ciclo completo
  },
});

// State
const slides = ref(carouselData);
const isPaused = ref(false);
const isDragging = ref(false);
const track = ref(null);
const viewport = ref(null);

// Drag state
const startX = ref(0);
const scrollLeft = ref(0);
const dragOffset = ref(0);

// Computed
const trackStyle = computed(() => {
  if (isDragging.value) {
    return {
      animationDuration: props.scrollDuration + "s",
      transform: `translateX(${dragOffset.value}px)`,
    };
  }
  return {
    animationDuration: props.scrollDuration + "s",
  };
});

// Methods - Scorrimento continuo
const pauseScroll = () => {
  isPaused.value = true;
};

const resumeScroll = () => {
  if (!isDragging.value) {
    isPaused.value = false;
  }
};

// Methods - Drag manuale
const startDrag = (e) => {
  isDragging.value = true;
  isPaused.value = true;

  startX.value = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;

  // Ottieni la posizione attuale del transform dall'animazione
  if (track.value) {
    const style = window.getComputedStyle(track.value);
    const matrix = new DOMMatrix(style.transform);
    scrollLeft.value = matrix.m41; // translateX value
    dragOffset.value = scrollLeft.value;
  }

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchmove", onDrag, { passive: false });
  document.addEventListener("touchend", endDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;

  e.preventDefault();

  const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  const diff = currentX - startX.value;
  dragOffset.value = scrollLeft.value + diff;
};

const endDrag = () => {
  isDragging.value = false;

  // Resetta e riprendi l'animazione
  dragOffset.value = 0;
  isPaused.value = false;

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", endDrag);
};

// Cleanup
onUnmounted(() => {
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", endDrag);
});

/*
=============================================
NAVIGAZIONE MANUALE (decommentare se necessario)
=============================================
const currentIndex = ref(0)

const next = () => {
  if (currentIndex.value < slides.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = slides.value.length - 1
  }
}

const goTo = (index) => {
  currentIndex.value = index
}
*/
</script>

<style lang="scss" scoped>
.news-carousel {
  --slide-width: 500px;
  --slide-gap: 24px;
  --slide-height: 420px;
  --border-radius: 16px;
  --accent-color: #e85a2c;

  width: 100%;
  padding: 2rem 0;
  overflow: hidden;

  &__viewport {
    width: 100%;
    overflow: hidden;
  }

  &__track {
    display: flex;
    gap: var(--slide-gap);
    width: max-content;
    animation: scroll linear infinite;
    cursor: grab;

    &--paused {
      animation-play-state: paused;
    }

    &--dragging {
      animation: none;
      cursor: grabbing;
    }
  }

  &__slide {
    flex: 0 0 var(--slide-width);
    width: var(--slide-width);
    height: var(--slide-height);
    user-select: none;
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

  // ==========================================
  // RESPONSIVE - TABLET
  // ==========================================
  @media (max-width: 992px) {
    --slide-width: 400px;
    --slide-height: 380px;
    --slide-gap: 20px;
  }

  // ==========================================
  // RESPONSIVE - MOBILE
  // ==========================================
  @media (max-width: 576px) {
    --slide-width: 300px;
    --slide-height: 320px;
    --slide-gap: 16px;
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
  }
}

// Animazione scorrimento continuo
// Trasla di metà perché le slide sono duplicate
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/*
=============================================
STILI NAVIGAZIONE MANUALE (decommentare se necessario)
=============================================
.news-carousel {
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
}

@media (max-width: 576px) {
  .news-carousel {
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
*/
</style>
