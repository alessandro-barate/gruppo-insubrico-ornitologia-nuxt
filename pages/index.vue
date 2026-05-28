<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import carousel from "~/data/carousel";

// Importa le immagini per il carousel
import nibbio from "~/assets/images/jumbo-home/nibbio.webp";
import nibbio2 from "~/assets/images/jumbo-home/nibbio-2.webp";
import nibbio3 from "~/assets/images/jumbo-home/nibbio-3.webp";
import nibbio4 from "~/assets/images/jumbo-home/nibbio-4.webp";

// SEO per la homepage
useSeoMeta({
  title: "Home | Gruppo Insubrico di Ornitologia",
  description:
    "Benvenuti nel sito del Gruppo Insubrico Ornitologico. Scopri le nostre attività di ricerca e conservazione.",
  ogTitle: "Gruppo Insubrico di Ornitologia",
  ogDescription: "Associazione per lo studio e la conservazione degli uccelli.",
  ogType: "website",
});

useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/" }],
});

// Slider logic (solo se hasSlider = true)
const currentIndex = ref(0);
let slideInterval = null;
let slides = [
  {
    image: nibbio,
  },
  {
    image: nibbio2,
  },
  {
    image: nibbio3,
  },
  {
    image: nibbio4,
  },
];

// Direction-aware slider
const hoveredSlide = ref(null);
const slideDirection = ref("from-bottom");
const sliderCurrentIndex = ref(0);

const sliderItems = [
  {
    image: nibbio,
    title: "Non lasciare traccia in natura",
    description:
      "Passa nella natura con rispetto: osserva, impara, non lasciare traccia.",
    text: "",
    quote: "",
  },
  {
    image: nibbio2,
    title: "Restare curiosi come da bambini",
    description:
      "La curiosità nasce da bambini: custodiamola per continuare a scoprire la natura.",
    text: "Le parole di Gianluca Danini:",
    quote:
      "Ciò che spinge tutti alla ricerca è la curiosità. È una cosa che nasce da bambini ed è bene tenersela da adulti, anzi direi anche a settant'anni, come faccio io...",
  },
  {
    image: nibbio3,
    title: "Osservare la natura dal quotidiano",
    description:
      "La natura è ovunque: impariamo a osservarla, a partire dal balcone di casa.",
    text: "",
    quote: "",
  },
  {
    image: nibbio4,
    title: "Oltre l'osservazione",
    description:
      "Conoscere per proteggere: ricerca e divulgazione per la tutela dell'avifauna insubrica.",
    text: "",
    quote: "",
  },
];

// Numero di slide visibili in base alla viewport
const slidesPerView = ref(3);

const updateSlidesPerView = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth > 1024) {
      slidesPerView.value = 3;
    } else if (window.innerWidth > 576) {
      slidesPerView.value = 2;
    } else {
      slidesPerView.value = 1;
    }
  }
};

const nextSliderSlide = () => {
  const maxIndex = sliderItems.length - slidesPerView.value;
  if (sliderCurrentIndex.value < maxIndex) {
    sliderCurrentIndex.value++;
  }
};

const prevSliderSlide = () => {
  if (sliderCurrentIndex.value > 0) {
    sliderCurrentIndex.value--;
  }
};

const canGoPrev = computed(() => sliderCurrentIndex.value > 0);
const canGoNext = computed(
  () => sliderCurrentIndex.value < sliderItems.length - slidesPerView.value,
);

// Calcola il transform corretto in base alle card visibili
const sliderTransform = computed(() => {
  // Desktop (3 cards): ogni step = 31% + 1rem gap
  // Tablet (2 cards): ogni step = 48% + 1rem gap
  // Mobile (1 card): ogni step = 100% + gap
  const baseWidth =
    slidesPerView.value === 3 ? 31 : slidesPerView.value === 2 ? 48 : 100;
  const gapInRem = 1;

  // Convertiamo rem in percentuale approssimativa (1rem ≈ 1.5%)
  const gapPercent = gapInRem * 1.5;

  return `translateX(-${sliderCurrentIndex.value * (baseWidth + gapPercent)}%)`;
});

const handleSlideHover = (index, event) => {
  hoveredSlide.value = index;

  // Determina la direzione da cui arriva il mouse
  const slide = event.currentTarget;
  const rect = slide.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const width = rect.width;
  const height = rect.height;

  // Calcola da quale lato è entrato il mouse
  const fromTop = y;
  const fromBottom = height - y;
  const fromLeft = x;
  const fromRight = width - x;

  const min = Math.min(fromTop, fromBottom, fromLeft, fromRight);

  if (min === fromTop) slideDirection.value = "from-top";
  else if (min === fromBottom) slideDirection.value = "from-bottom";
  else if (min === fromLeft) slideDirection.value = "from-left";
  else slideDirection.value = "from-right";
};

const nextSlide = () => {
  if (slides && slides.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % slides.length;
  }
};

// Computed property per il background dinamico
const currentBackgroundImage = computed(() => {
  if (slides && slides.length > 0) {
    const imagePath = slides[currentIndex.value].image;
    return `url(${imagePath})`;
  }
  return `url(${nibbio})`;
});

// IntersectionObserver per animazioni scroll
onMounted(() => {
  // Update slides per view on mount and resize
  updateSlidesPerView();
  window.addEventListener("resize", updateSlidesPerView);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  const observerLow = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerLow.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  // Elementi da osservare
  const newsBox = document.querySelector(".news-box");
  const subscriptionTitle = document.querySelector(".subscription-title");
  const activitiesTitle = document.querySelector(".activities-title");
  const firstParagraph = document.querySelector(".first-paragraph");
  const secondParagraph = document.querySelector(".second-paragraph");
  const thirdParagraph = document.querySelector(".third-paragraph");
  const fourthParagraph = document.querySelector(".fourth-paragraph");
  const firstLine = document.querySelector(".first-line");
  const secondLine = document.querySelector(".second-line");
  const thirdLine = document.querySelector(".third-line");

  if (newsBox) observer.observe(newsBox);
  if (subscriptionTitle) observer.observe(subscriptionTitle);
  if (activitiesTitle) observer.observe(activitiesTitle);
  if (firstParagraph) observerLow.observe(firstParagraph);
  if (secondParagraph) observerLow.observe(secondParagraph);
  if (thirdParagraph) observerLow.observe(thirdParagraph);
  if (fourthParagraph) observerLow.observe(fourthParagraph);
  if (firstLine) observerLow.observe(firstLine);
  if (secondLine) observerLow.observe(secondLine);
  if (thirdLine) observerLow.observe(thirdLine);

  if (slides && slides.length > 1) {
    slideInterval = setInterval(nextSlide, 4000);
  }
});

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateSlidesPerView);
  }
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Jumbo section -->
        <section
          id="home-title"
          class="title-section jumbo-bg"
          :style="{ backgroundImage: currentBackgroundImage }"
        >
          <!-- Organization's name -->
          <div class="title-container title-container-2">
            <div class="fade-wrapper-2">
              <p class="uppercase">gruppo insubrico di ornitologia</p>
            </div>
          </div>
        </section>

        <!-- Direction-aware slider -->
        <section class="direction-slider-section">
          <!-- Logo -->
          <div class="logo-container">
            <div class="logo-box">
              <img src="../assets/images/logo/gio-cerchio.svg" alt="" />
            </div>
          </div>

          <div class="slider-wrapper">
            <!-- Previous arrow -->
            <button
              class="slider-nav slider-nav-prev"
              @click="prevSliderSlide"
              :disabled="!canGoPrev"
              aria-label="Slide precedente"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <!-- Slider container -->
            <div class="slider-container">
              <div class="slider-track" :style="{ transform: sliderTransform }">
                <div
                  v-for="(slide, index) in sliderItems"
                  :key="index"
                  :class="['slider-item', { active: hoveredSlide === index }]"
                  @mouseenter="handleSlideHover(index, $event)"
                  @mouseleave="hoveredSlide = null"
                >
                  <div
                    class="slide-image"
                    :style="{ backgroundImage: `url(${slide.image})` }"
                  ></div>
                  <div :class="['slide-overlay', slideDirection]">
                    <div class="slide-content">
                      <h3 class="slide-title uppercase">{{ slide.title }}</h3>
                      <p class="slide-description">
                        {{ slide.description }}
                      </p>
                      <p id="text" class="slide-description">
                        {{ slide.text }}
                      </p>
                      <p class="slide-description italic">
                        {{ slide.quote }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Next arrow -->
            <button
              class="slider-nav slider-nav-next"
              @click="nextSliderSlide"
              :disabled="!canGoNext"
              aria-label="Slide successiva"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </section>

        <section class="mission-section">
          <div class="square">
            <p class="first-paragraph">
              Il Gruppo Insubrico di Ornitologia si ispira ai principi
              dell'educazione ambientale e della promozione della cultura
              naturalistica tra i cittadini e persegue, nell'ambito territoriale
              locale come scopo prioritario lo studio e la conservazione
              dell'avifauna, nonché la gestione e la valorizzazione di aree di
              interesse naturalistico.
            </p>

            <hr class="first-line" />

            <p class="second-paragraph">
              Crediamo che conoscere la natura sia il primo passo per
              proteggerla. Il Gruppo Insubrico di Ornitologia promuove la
              cultura naturalistica e l'educazione ambientale, coinvolgendo
              cittadini, appassionati e ricercatori nello studio dell'avifauna e
              dei suoi habitat. Attraverso ricerca, divulgazione e gestione di
              aree di interesse naturalistico lavoriamo per conservare la
              biodiversità e rafforzare il legame tra persone e territorio.
            </p>

            <hr class="second-line" />

            <p class="third-paragraph">
              Osservare un uccello in volo significa raccontare una storia di
              natura, territorio e biodiversità. Il Gruppo Insubrico di
              Ornitologia nasce per studiare e proteggere l'avifauna locale,
              promuovendo allo stesso tempo la conoscenza della natura tra i
              cittadini. Con attività di ricerca, monitoraggio e divulgazione
              lavoriamo per custodire gli habitat e valorizzare le aree
              naturalistiche del nostro territorio.
            </p>

            <hr class="third-line" />

            <p class="fourth-paragraph">
              Studiare, conoscere, proteggere. Il Gruppo Insubrico di
              Ornitologia promuove la cultura naturalistica e l'educazione
              ambientale attraverso lo studio e la conservazione dell'avifauna e
              dei suoi habitat, contribuendo alla tutela e alla valorizzazione
              del patrimonio naturale del territorio.
            </p>
            <div class="button-container">
              <NuxtLink to="/chi-siamo">
                <button class="uppercase">chi siamo</button>
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- News overview -->
        <section class="news-section">
          <div class="news-container d-flex">
            <div class="sections-title news-box">
              <h2 class="title-1 title-color part-1 uppercase">le ultime</h2>
              <h2 class="title-2 title-color part-2 uppercase">news</h2>
              <h2 class="title-1 title-color part-3 uppercase">del g i o</h2>
            </div>
            <div class="news-description">
              <p>Le nostre news più recenti</p>
              <hr />
            </div>
          </div>

          <!-- Carosello -->
          <div class="news-carousel-wrapper">
            <NewsCarousel />
          </div>

          <!-- News button -->
          <div class="button">
            <NuxtLink to="/news">
              <button>Leggi tutte le news</button>
            </NuxtLink>
          </div>
        </section>

        <!-- Subscribe section -->
        <!-- <section>
          <div class="subscription-container news-container">
            <div class="sections-title subscription-title">
              <h2 class="title-1 title-color uppercase">diventa nostro</h2>
              <h2 class="title-2 title-color gradient-color uppercase">
                socio
              </h2>
            </div>
            <hr />
            <div class="subscription-box gradient-color-subscribe">
              <div class="card-logo">
                <img src="~/assets/images/subscribe-icon.svg" alt="" />
              </div>
              <div class="subscription-description">
                <h3 class="uppercase">unisciti al g i o !</h3>
                <p>
                  Vuoi diventare parte del gruppo o solo sostenerci?
                  <br />
                  Scopri come.
                </p>
                <p>Ti aspettiamo!</p>
              </div>
              <div class="subscription-button button">
                <NuxtLink to="/chi-siamo">
                  <button>Diventa socio</button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section> -->

        <!-- Activities section -->
        <section class="activities-section">
          <div class="activities-container news-container d-flex">
            <!-- Grid section -->
            <div class="activities-box">
              <div class="activities-list d-grid uppercase">
                <NuxtLink to="/progetti" class="activity-card card-1 d-flex">
                  <div class="card-default d-flex">
                    <span class="bg-blue">progetti</span>
                  </div>
                  <div class="card-hover bg-blue">
                    <img
                      src="~/assets/images/activities-section/arrow-right-white.svg"
                      alt=""
                    />
                    <p>progetti</p>
                  </div>
                </NuxtLink>

                <NuxtLink
                  to="/divulgazione"
                  class="activity-card card-3 d-flex"
                >
                  <div class="card-default d-flex">
                    <span class="bg-blue">divulgazione</span>
                  </div>
                  <div class="card-hover bg-blue">
                    <img
                      src="~/assets/images/activities-section/arrow-right-white.svg"
                      alt=""
                    />
                    <p>divulgazione</p>
                  </div>
                </NuxtLink>

                <NuxtLink
                  to="/pubblicazioni"
                  class="activity-card card-5 d-flex"
                >
                  <div class="card-default d-flex">
                    <span class="bg-blue">pubblicazioni</span>
                  </div>
                  <div class="card-hover bg-blue">
                    <img
                      src="~/assets/images/activities-section/arrow-right-white.svg"
                      alt=""
                    />
                    <p>pubblicazioni</p>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <hr />

            <!-- Activities title and description -->
            <div class="sections-title activities-title">
              <h2 class="title-1 uppercase">scopri le nostre</h2>
              <h2 class="title-2 uppercase">attività</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Buttons
.button {
  width: 100%;
  text-align: center;
  padding-top: clamp(2rem, 4vw, 4rem);
  padding-bottom: clamp(1.5rem, 3vw, 3rem);

  button {
    border: none;
    color: white;
    cursor: pointer;
    font-weight: 500;
    border-radius: 0.5rem;
    padding: clamp(0.75rem, 2vw, 1rem);
    font-size: clamp(0.875rem, 2vw, 1rem);
  }
}
// END buttons

// Jumbo section
.col {
  .jumbo-bg {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    transition: background-image 0.8s ease-in-out;
  }

  .title-section {
    position: relative;
    width: 100%;
    height: 110vh;
    overflow: hidden;
  }

  .title-container {
    width: 90%;
    text-align: center;
    padding-top: 2rem;

    .fade-wrapper-2 {
      opacity: 0;
      animation: fadeIn 4.5s ease-in-out forwards;

      p {
        font-size: clamp(1.5rem, 4vw, 4rem);
        font-weight: 600;
        letter-spacing: clamp(0.3rem, 2vw, 1rem);
        background: linear-gradient(90deg, #233162, #4e62c5);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;

        @media (max-width: 576px) {
          font-size: clamp(2.5rem, 4vw, 6rem);
        }

        @media (min-width: 577px) and (max-width: 1080px) {
          font-size: clamp(2.5rem, 5vw, 6rem);
        }
      }
    }
  }

  .title-container-3 {
    padding-top: 1rem;
  }
}
// END jumbo section

// ==========================================
// DIRECTION-AWARE SLIDER
// ==========================================
.logo-container {
  margin-bottom: 8rem;

  .logo-box {
    img {
      width: 40%;

      @media (max-width: 576px) {
        width: 60%;
      }

      @media (min-width: 577px) and (max-width: 992px) {
        width: 70%;
      }
    }
  }
}

.direction-slider-section {
  width: 100%;
  margin-bottom: 10rem;
  padding: clamp(3rem, 8vw, 5rem) 0;
  background: #ebf2fc;
  position: relative;
}

.slider-wrapper {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 2rem);
  max-width: 1750px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 4rem);
}

.slider-nav {
  flex-shrink: 0;
  width: clamp(40px, 5vw, 40px);
  height: clamp(40px, 5vw, 40px);
  border: none;
  border-radius: 50%;
  background: #233162;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;

  svg {
    width: 60%;
    height: 60%;
  }

  &:hover:not(:disabled) {
    background: rgba(3, 26, 140, 1);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
}

.slider-container {
  flex: 1;
  overflow: hidden;
  height: clamp(400px, 50vh, 600px);
}

.slider-track {
  display: flex;
  gap: 1rem;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  width: max-content; // Importante: permette al track di estendersi oltre il container */
}

.slider-item {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  // Desktop (>1024px): 3 card visibili su 4 totali
  // Larghezza container ~1400px max, togliamo padding e frecce = ~1100px disponibili
  // Diviso 3 card + gaps = base ~31% del container visibile
  width: 31%;
  min-width: 280px;

  &:hover {
    width: 50%; // Card espansa al 50%

    // Quando una card è in hover, le altre si restringono
    & ~ .slider-item:not(:hover) {
      width: 25%;
    }
  }

  // Quando un'altra card prima di questa è in hover
  &:has(~ .slider-item:hover) {
    width: 25%;
  }

  .slide-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover .slide-image {
    transform: scale(1.05);
  }

  .slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    display: flex;
    align-items: flex-end;
    padding: clamp(1.5rem, 3vw, 3rem);
    opacity: 0;
    transition: opacity 0.4s ease;

    .slide-content {
      width: 100%;
      transform: translateY(20px);
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
    }

    .slide-title {
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      font-weight: 600;
      color: white;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }

    .slide-description {
      font-size: clamp(0.95rem, 1.5vw, 1.1rem);
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.5;
      margin: 0;
    }

    #text {
      margin-top: 1rem;
    }

    // Direction-aware animations
    &.from-top .slide-content {
      animation: slideFromTop 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    &.from-bottom .slide-content {
      animation: slideFromBottom 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    &.from-left .slide-content {
      animation: slideFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    &.from-right .slide-content {
      animation: slideFromRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  }

  &.active .slide-overlay {
    opacity: 1;
  }

  // Overlay sempre visibile su mobile/tablet
  @media (max-width: 992px) {
    .slide-overlay {
      opacity: 1;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.75) 0%,
        rgba(0, 0, 0, 0.3) 60%,
        rgba(0, 0, 0, 0) 100%
      );

      .slide-content {
        transform: translateY(0);
      }
    }
  }
}

// Direction-aware animations
@keyframes slideFromTop {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideFromBottom {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideFromLeft {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideFromRight {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
// END direction-aware slider

// Mission section
.mission-section {
  position: relative;
  width: 100%;
  padding-top: 8rem;
  padding-bottom: 8rem;
  background-color: #233162;

  hr {
    border: none;
    margin-bottom: 3rem;
    border-bottom: 1px solid white;
  }

  .first-line {
    width: 40%;
    margin-left: 10%;

    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0;
    }
  }

  .second-line {
    width: 40%;
    margin-left: 45%;

    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0;
    }
  }

  .third-line {
    width: 40%;
    margin-left: 20%;

    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0;
    }
  }

  .square {
    width: 80%;
    padding: 4rem;
    font-size: 1.2rem;
    line-height: 1.7rem;
    color: rgb(200, 200, 200);

    @media (max-width: 768px) {
      padding: 2rem;
    }

    .first-paragraph,
    .second-paragraph,
    .third-paragraph,
    .fourth-paragraph {
      width: 80%;
      margin-bottom: 3rem;
      opacity: 0;
      transition: all 1s cubic-bezier(0.77, 0, 0.175, 1);

      @media (max-width: 768px) {
        width: 90%;
      }
    }

    .first-line,
    .second-line,
    .third-line {
      opacity: 0;
      transition: all 1s cubic-bezier(0.77, 0, 0.175, 1);
    }

    .first-line,
    .third-line {
      transform: translateX(50px);
    }

    .second-line {
      transform: translateX(-50px);
    }

    .first-line.visible,
    .second-line.visible,
    .third-line.visible {
      opacity: 1;
    }

    .first-line.visible {
      transform: translateX(0);
    }

    .second-line.visible {
      transform: translateX(0);
      transition-delay: 0.15s;
    }

    .third-line.visible {
      transform: translateX(0);
      transition-delay: 0.3s;
    }

    .first-paragraph,
    .third-paragraph {
      margin-left: 0;
      transform: translateX(50px);
    }

    .second-paragraph,
    .fourth-paragraph {
      margin-right: 0;
      transform: translateX(-50px);
    }

    .first-paragraph.visible {
      opacity: 1;
      transform: translateX(0);
    }

    .second-paragraph.visible {
      opacity: 1;
      transform: translateX(0);
      transition-delay: 0.15s;
    }

    .third-paragraph.visible {
      opacity: 1;
      transform: translateX(0);
      transition-delay: 0.3s;
    }

    .fourth-paragraph.visible {
      opacity: 1;
      transform: translateX(0);
      transition-delay: 0.45s;
    }
  }

  .button-container {
    text-align: center;
    margin-top: 4rem;

    button {
      border: none;
      padding: 1rem;
      cursor: pointer;
      border-radius: 5px;
      background-color: rgb(200, 200, 200);
      transition: all 0.5s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

// News section
.news-section {
  position: relative;
  padding-top: 15rem;

  .news-container {
    width: 100%;
    flex-wrap: wrap;

    .sections-title {
      width: 50%;
      padding-left: 5rem;

      .part-1,
      .part-2,
      .part-3 {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-align: left;
        opacity: 0;
        transform: translateX(-100%);
      }

      &.visible {
        .part-1 {
          animation: slideInLeft 1s ease-in-out forwards;
        }

        .part-2 {
          animation: slideInLeft 1s ease-in-out 0.3s forwards;
        }

        .part-3 {
          animation: slideInLeft 1s ease-in-out 0.6s forwards;
        }
      }

      .title-1 {
        font-size: clamp(1.5rem, 4vw, 3rem);
        padding-top: 2rem;
        padding-left: clamp(1rem, 6vw, 6rem);
      }

      .title-2 {
        font-size: clamp(2.5rem, 8vw, 6rem);
        padding-top: clamp(1rem, 3vw, 3rem);
        padding-left: clamp(2rem, 10vw, 12rem);
      }
    }

    .news-description {
      width: 50%;
      text-align: center;

      p {
        font-size: clamp(1rem, 2vw, 1.7rem);
        padding-top: clamp(2rem, 6vw, 6rem);
      }

      hr {
        width: 20%;
        border: none;
        margin-left: clamp(2rem, 8vw, 8rem);
        margin-top: clamp(1.5rem, 4vw, 4rem);
        border-bottom: 2px solid rgb(141, 141, 141);
      }
    }
  }

  .news-carousel-wrapper {
    margin-top: 5rem;
  }

  button {
    background: linear-gradient(90deg, #ff8636, #f9a268);

    &:hover {
      color: rgb(0, 0, 0);
    }
  }
}
// END news section

// Subscription section
// .subscription-container {
//   padding-top: clamp(4rem, 10vw, 10rem);
//   padding-bottom: clamp(6rem, 14vw, 14rem);
//   width: 100%;
//   position: relative;
//   min-height: clamp(500px, 80vh, 1000px);
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   background-attachment: fixed;
//   background-image: url(../assets/images/activities-section/parallax-image.webp);

//   .sections-title {
//     margin-bottom: 2rem;
//     overflow: hidden;

//     .title-1,
//     .title-2 {
//       opacity: 0;
//       transform: translateY(-100%);
//     }

//     &.visible {
//       .title-1 {
//         animation: slideInTop 1s ease-in-out forwards;
//       }

//       .title-2 {
//         animation: slideInTop 1s ease-in-out 0.3s forwards;
//       }
//     }

//     .title-1 {
//       font-size: clamp(1.5rem, 4vw, 3rem);
//       padding-top: 2rem;
//       padding-left: clamp(1rem, 6vw, 6rem);
//     }

//     .title-2 {
//       font-size: clamp(2.5rem, 8vw, 6rem);
//       padding-top: clamp(1rem, 3vw, 3rem);
//       padding-left: clamp(2rem, 10vw, 12rem);
//     }
//   }

//   .subscription-box {
//     margin: 0 auto;
//     width: clamp(85%, 70vw, 70%);
//     padding: clamp(0.75rem, 2vw, 1rem);
//     border-radius: 0.5rem;

//     .card-logo {
//       width: 100%;
//       padding-top: 1rem;
//       margin-bottom: clamp(1rem, 2vw, 2rem);

//       img {
//         width: clamp(8%, 5vw, 5%);
//       }
//     }

//     h3 {
//       font-size: clamp(1.5rem, 4vw, 3rem);
//     }

//     p {
//       font-size: clamp(1rem, 2vw, 1.5rem);
//       margin-top: 1rem;
//       margin-bottom: clamp(1rem, 2vw, 2rem);
//     }

//     .subscription-button {
//       text-align: center;
//     }

//     .button {
//       padding-bottom: 1rem;

//       button {
//         background: linear-gradient(90deg, #d2420d, #ffbf00);

//         &:hover {
//           color: rgb(0, 0, 0);
//         }
//       }
//     }
//   }

//   hr {
//     width: 10%;
//     border: none;
//     margin-left: clamp(2rem, 10vw, 10rem);
//     margin-bottom: 2rem;
//     border-bottom: 2px solid rgb(141, 141, 141);
//   }
// }
// END subscription section

// Activities section
.activities-container {
  width: 100%;
  margin: 0 auto;
  padding-top: clamp(20rem, 15vw, 20rem);
  padding-bottom: clamp(18rem, 14vw, 18rem);
  position: relative;
  align-items: center;
  flex-wrap: wrap;
  min-height: clamp(500px, 80vh, 1000px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url(../assets/images/activities-section/parallax-image.webp);

  hr {
    height: clamp(100px, 20vw, 210px);
    align-self: flex-end;
    border: none;
    border-left: 2px solid rgb(200, 200, 200);
  }

  .activities-box {
    width: 55%;

    .activities-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: clamp(0.5rem, 2vw, 1rem);

      .activity-card {
        width: 100%;
        border-radius: 0.5rem;
        position: relative;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        cursor: pointer;
        container-type: inline-size;

        .card-default {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: end;
          text-align: center;
          background-size: cover;
          background-position: center;
          opacity: 1;
          color: rgba(255, 255, 255, 0.9);
          transition: opacity 0.5s ease-in-out;

          span {
            font-weight: 500;
            width: 100%;
            padding: 5%;
            display: inline-block;
            opacity: 0.9;
            font-size: 9cqw;
          }
        }

        .card-hover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;

          img {
            width: 17%;
            margin-bottom: 5%;
          }

          p {
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
            padding: 5%;
            font-size: 10cqw;
          }
        }

        &:hover {
          .card-default {
            opacity: 0;
          }

          .card-hover {
            opacity: 1;
          }
        }
      }

      .card-1,
      .card-3,
      .card-5 {
        background-size: cover;
        background-position: center;
      }

      .card-1 {
        background-image: url(../assets/images/activities-section/grid-1.webp);
      }
      .card-3 {
        background-image: url(../assets/images/activities-section/grid-2.webp);
      }
      .card-5 {
        background-image: url(../assets/images/activities-section/grid-3.webp);
      }
    }
  }

  .activities-title {
    margin-top: clamp(1rem, 4vw, 4rem);
    overflow: hidden;

    .title-1,
    .title-2 {
      opacity: 0;
      color: rgb(200, 200, 200);
      transform: translateX(100%);
    }

    &.visible {
      .title-1 {
        animation: slideInRight 1s ease-in-out forwards;
      }

      .title-2 {
        margin-bottom: 2rem;
        animation: slideInRight 1s ease-in-out 0.3s forwards;
      }
    }

    .title-1 {
      font-size: clamp(1.5rem, 4vw, 3rem);
      padding-top: 2rem;
      padding-left: clamp(1rem, 6vw, 6rem);
    }

    .title-2 {
      font-size: clamp(2.5rem, 8vw, 6rem);
      padding-top: clamp(1rem, 3vw, 3rem);
      padding-left: clamp(2rem, 10vw, 12rem);
    }
  }
}
// END activities section

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
  // Jumbo section
  .col {
    .title-section {
      height: 110vh;
    }
  }
  // END jumbo section

  // Direction-aware slider
  .direction-slider-section {
    padding: clamp(2rem, 5vw, 4rem) 0;

    .slider-container {
      height: clamp(350px, 40vh, 500px);
    }

    .slider-nav {
      width: 45px;
      height: 45px;
    }

    // Tablet: 2 card visibili su 4 - sistema espansione
    .slider-item {
      // Base: 2 card visibili = ~48% ciascuna
      width: 48%;
      min-width: 250px;

      &:hover {
        width: 65%; // Card espansa

        & ~ .slider-item:not(:hover) {
          width: 35%; // Altre compresse
        }
      }

      &:has(~ .slider-item:hover) {
        width: 35%;
      }

      .slide-overlay {
        .slide-title {
          font-size: clamp(1.2rem, 2.5vw, 2rem);
        }

        .slide-description {
          font-size: clamp(0.85rem, 1.3vw, 1rem);
        }
      }
    }
  }
  // END direction-aware slider

  // News section
  .news-section {
    .news-container {
      flex-direction: column;
      align-items: center;

      .sections-title {
        width: 100%;
        text-align: center;

        .title-1 {
          padding-left: 0;
          text-align: center;
        }

        .title-2 {
          padding-left: clamp(2rem, 16vw, 12rem);
          text-align: center;
        }
      }

      .news-description {
        width: 100%;

        hr {
          width: 60%;
          margin: 2rem auto;
        }
      }
    }
  }
  // END news section

  // Subscription
  .subscription-container {
    // background-attachment: scroll; -> Fix per iOS
    hr {
      display: none;
    }

    .sections-title {
      margin-top: 3rem;
      margin-bottom: 4rem;
    }

    .subscription-box {
      width: 90%;
      margin-bottom: 4rem;
    }
  }

  // Activities section
  .activities-container {
    flex-direction: column-reverse;

    hr {
      display: none;
    }

    .activities-box {
      width: 100%;
      margin-top: 2rem;

      .activities-list {
        .activity-card {
          .card-default:hover {
            opacity: 1;
          }

          .card-hover {
            display: none;
          }
        }
      }
    }

    .activities-title {
      width: 100%;
      text-align: center;

      .title-2 {
        left: 5rem;
        position: relative;
      }
    }
  }
  // END activities section
}

// ==========================================
// MEDIA QUERIES - MOBILE
// ==========================================
@media (max-width: 576px) {
  .col {
    // Jumbo
    .title-section {
      height: 79vh;
    }

    // Direction-aware slider - Mobile (1 card visible su 4)
    .direction-slider-section {
      padding: clamp(1.5rem, 4vw, 3rem) 0;

      .slider-wrapper {
        gap: 0.75rem;
        padding: 0 1rem;
      }

      .slider-nav {
        width: 40px;
        height: 40px;
      }

      .slider-container {
        height: 300px;
      }

      .slider-track {
        gap: 0.75rem;
      }

      .slider-item {
        // Mobile: 1 card = 100% width, sempre uguale
        width: 100%;
        min-width: auto;
        transition: none; // Rimuovi animazioni

        // Disabilita hover expansion su mobile
        &:hover {
          width: 100%;
        }

        // Disabilita tutte le animazioni di contrazione
        &:has(~ .slider-item:hover) {
          width: 100%;
        }

        .slide-image {
          transition: none; // Rimuovi zoom immagine
        }

        .slide-overlay {
          opacity: 1;
          transition: none; // Rimuovi animazioni overlay

          .slide-content {
            transform: none; // Rimuovi transform
            transition: none;
          }

          .slide-title {
            font-size: clamp(1.3rem, 5vw, 1.8rem);
          }

          .slide-description {
            font-size: clamp(0.9rem, 3vw, 1rem);
          }
        }
      }
    }

    // News
    .news-section {
      .news-container {
        .news-description {
          hr {
            width: 50%;
          }
        }
      }
    }

    // Activities
    .activities-container {
      .activities-box {
        .activities-list {
          grid-template-columns: 1fr;
          gap: 3rem;

          .activity-card {
            width: 70%;
            margin: 0 auto;
          }
        }
      }

      .activities-title {
        .title-2 {
          padding-left: 0;
          padding-right: 2rem;
        }
      }
    }
  }
}
</style>
