<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import carousel from "~/data/carousel";
import Button from "~/components/utili/Button.vue";

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
        <!-- Logo container -->
        <section class="logo-container">
          <!-- Logo -->
          <div>
            <div class="fade-wrapper-2 logo-box">
              <img src="../assets/images/logo/gio-cerchio.svg" alt="" />
            </div>
          </div>
        </section>

        <!-- Jumbo section -->
        <section
          id="home-title"
          class="jumbo-bg"
          :style="{ backgroundImage: currentBackgroundImage }"
        ></section>

        <!-- Direction-aware slider -->
        <section class="direction-slider-section">
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
              dell&rsquo;educazione ambientale e della promozione della cultura
              naturalistica tra i cittadini e persegue, nell&rsquo;ambito
              territoriale locale come scopo prioritario lo studio e la
              salvaguardia dell&rsquo;avifauna, nonch&eacute; la gestione e la
              valorizzazione di aree di interesse naturalistico.
            </p>

            <hr class="first-line" />

            <p class="second-paragraph">
              Osservare un uccello in volo significa raccontare una storia di
              natura, territorio e biodiversit&agrave;. La nostra associazione
              mobilita una rete dinamica di cittadini, appassionati e
              ricercatori, uniti dal desiderio di comprendere a fondo le specie
              locali e i loro ecosistemi. Attraverso progetti mirati sul campo,
              divulgazione scientifica e gestione attiva delle oasi protette,
              lavoriamo quotidianamente per tutelare la biodiversit&agrave; e
              rinsaldare il legame profondo tra comunit&agrave; e territorio.
            </p>

            <hr class="second-line" />

            <p class="third-paragraph">
              Crediamo che conoscere la natura sia il primo passo per
              proteggerla. Il sodalizio investe risorse ed energie nel
              monitoraggio scientifico, trasformando i dati raccolti in efficaci
              strumenti di conservazione e in preziosi elementi a disposizione
              delle autorit&agrave; competenti per una gestione consapevole del
              territorio, utili a pianificare interventi mirati di tutela
              ambientale. Questa sinergia tra ricerca e sensibilizzazione
              permette di salvaguardare concretamente la fauna selvatica,
              valorizzando l'immenso patrimonio ecologico circostante.
            </p>

            <hr class="third-line" />

            <p class="fourth-paragraph">
              Studiare, conoscere, proteggere. Sosteniamo un modello di sviluppo
              sostenibile in cui la cittadinanza attiva diventa custode
              consapevole del paesaggio, garantendo un futuro alle ricchezze
              biologiche della nostra regione
            </p>
            <div class="button-container">
              <Button to="/chi-siamo" class="uppercase">chi siamo </Button>
            </div>
          </div>
        </section>

        <!-- News overview -->
        <section class="news-section">
          <div class="news-container d-flex">
            <div class="sections-title news-box">
              <h2 class="title-1 title-color part-1 uppercase">le</h2>
              <h2 class="title-2 title-color part-2 uppercase">news</h2>
              <h2 class="title-1 title-color part-3 uppercase">del g. i. o.</h2>
            </div>
          </div>

          <!-- Carosello -->
          <div class="news-carousel-wrapper">
            <NewsCarousel />
          </div>

          <!-- News button -->
          <div class="button">
            <Button to="/news" class="uppercase">Leggi tutte le news</Button>
          </div>
        </section>

        <!-- Activities section -->
        <section class="activities-section">
          <div class="activities-container news-container d-flex">
            <!-- Grid section -->
            <div class="activities-box">
              <div class="activities-list d-grid uppercase">
                <NuxtLink to="/progetti" class="activity-card card-1 d-flex">
                  <div class="card-default d-flex">
                    <span class="bg-blue">progetti di ricerca</span>
                  </div>
                  <div class="card-hover bg-blue">
                    <img
                      src="~/assets/images/activities-section/arrow-right-white.svg"
                      alt=""
                    />
                    <p>progetti di ricerca</p>
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
                    <span class="bg-blue">pubblicazioni scientifiche</span>
                  </div>
                  <div class="card-hover bg-blue">
                    <img
                      src="~/assets/images/activities-section/arrow-right-white.svg"
                      alt=""
                    />
                    <p>pubblicazioni scientifiche</p>
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
  font-weight: 500;
  text-align: center;
  padding-top: clamp(2rem, 4vw, 4rem);
  padding-bottom: clamp(1.5rem, 3vw, 3rem);
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

  .fade-wrapper-2 {
    opacity: 0;
    animation: fadeIn 4.5s ease-in-out forwards;
  }
}
// END jumbo section

// ==========================================
// DIRECTION-AWARE SLIDER
// ==========================================
.logo-container {
  width: 100%;
  margin-top: 6rem;
  position: relative;
  margin-bottom: 5rem;

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

  @media (max-width: 576px) {
    padding-top: 2rem;
    padding-bottom: 0;
  }

  hr {
    border: none;
    margin-bottom: 3rem;
    border-bottom: 1px solid white;

    @media (max-width: 576px) {
      margin-bottom: 2rem;
    }
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
      padding: 2rem 0 0 0;
      font-size: 1rem;
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

      @media (max-width: 576px) {
        margin: 0 auto;
        margin-bottom: 2rem;
      }
    }

    .second-paragraph,
    .fourth-paragraph {
      margin-right: 0;
      transform: translateX(-50px);

      @media (max-width: 576px) {
        margin: 0 auto;
        margin-bottom: 2rem;
      }
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
    margin-top: 6rem;
    font-weight: 500;
    letter-spacing: 0.15rem;
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
    margin-left: 6.5rem;
    margin-right: 0rem;
    border-left: 2px solid rgb(200, 200, 200);
  }

  .activities-box {
    width: 55%;

    margin-left: 2rem;
    margin-right: -4rem;

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
    margin-left: 1.5rem;

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
      padding-left: clamp(1rem, 6vw, 2rem);
    }

    .title-2 {
      font-size: clamp(2.5rem, 8vw, 6rem);
      padding-top: clamp(1rem, 3vw, 3rem);
      padding-left: clamp(6rem, 0vw, 12rem);
    }
  }
}
// END activities section

// ==========================================
// MEDIA QUERIES - DESKTOP UP TO 1400px
// ==========================================
@media (min-width: 993px) and (max-width: 1400px) {
  // Activities section
  .activities-container {
    flex-direction: column-reverse;
    padding-top: clamp(15rem, 15vw, 15rem);

    hr {
      display: none;
    }

    .activities-box {
      width: 80%;
      margin-top: 2rem;
      margin-left: 0;
      margin-right: 0;

      .activities-list {
        gap: 3rem;
      }
    }

    .activities-title {
      width: 100%;
      margin-left: 0;
      text-align: center;

      .title-1 {
        padding-left: 0;
      }

      .title-2 {
        padding-left: 0;
        position: relative;
      }
    }
  }
  // END activities section
}

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
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
        padding-left: 0;

        .title-1 {
          padding-left: 0;
          text-align: center;
        }

        .title-2 {
          padding-left: 0;
          text-align: center;
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
    padding-top: clamp(15rem, 15vw, 15rem);

    hr {
      display: none;
      margin-left: 0;
      margin-right: 1rem;
    }

    .activities-box {
      width: 100%;
      margin-top: 2rem;
      margin-left: 0;
      margin-right: 0;

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
      margin-left: 0;
      text-align: center;

      .title-1 {
        padding-left: 0;
      }

      .title-2 {
        padding-left: 0;
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

    // News section
    .news-section {
      .news-container {
        .sections-title {
          padding-left: 0;

          .title-1 {
            font-size: clamp(2rem, 4vw, 2rem);
          }

          .title-2 {
            font-size: clamp(3.5rem, 8vw, 3.5rem);
          }
        }
      }
    }
    // END news section

    // Activities
    .activities-container {
      padding-top: clamp(12rem, 15vw, 12rem);

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
        .title-1 {
          font-size: clamp(2rem, 4vw, 2rem);
        }

        .title-2 {
          padding-left: 0;
          padding-right: 2rem;
          font-size: clamp(3.5rem, 4vw, 3.5rem);
        }
      }
    }
  }
}
</style>
