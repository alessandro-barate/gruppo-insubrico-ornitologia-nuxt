<script setup>
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from "vue";
// import carousel from "~/data/carousel";
import Button from "~/components/shared/Button.vue";

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

// Testi e immagini modificabili dal pannello (Testi delle pagine → Home).
// Il secondo argomento di c() / inline() è il testo originale del sito,
// usato finché il campo nel pannello è vuoto.
const { c, m, inline, bg } = await usePageContent("home");

// Immagini della copertina a rotazione
const heroDefaults = [
  "/images/home/slider/nibbio.webp",
  "/images/home/slider/nibbio-2.webp",
  "/images/home/slider/nibbio-3.webp",
  "/images/home/slider/nibbio-4.webp",
];

// Sfondi delle card di solo testo (fino a 992px), uno per card:
// posizione 1 = card di testo della card 1, e così via.
const heroDefaultsTestSlide = [
  "/images/home/slider/cielo-alberi.webp",
  "/images/home/slider/cielo-tramonto.webp",
  "/images/home/slider/cielo-tramonto-rosa.webp",
  "/images/home/slider/cielo-tramonto-arancio.webp",
];

// Versioni per mobile (fino a 768px) delle immagini predefinite, nella
// stessa posizione di heroDefaults; null = si usa quella desktop.
// Valgono solo finché la foto non viene sostituita dal pannello.
const heroMobileDefaults = [
  null,
  null,
  "/images/home/slider/nibbio-3-mobile.webp",
  null,
];

// Stile con la foto desktop e quella mobile: la sceglie il CSS
// (var(--bg) / var(--bg-mobile)), così il browser scarica solo quella
// che serve e non c'è nessun cambio di immagine dopo il caricamento.
const bgVars = (desktop, mobile) => ({
  "--bg": `url(${desktop})`,
  "--bg-mobile": `url(${mobile || desktop})`,
});

// Versione per telefono della foto i: per le foto predefinite quella di
// heroMobileDefaults; per quelle caricate dal pannello la versione per
// telefono del backend (ritaglio dedicato o copia leggera) del campo `key`
const mobileFor = (image, i, key = `hero_${i + 1}`) =>
  image === heroDefaults[i] ? heroMobileDefaults[i] : m(key) || null;
const heroImages = computed(() =>
  heroDefaults.map((img, i) => c(`hero_${i + 1}`, img)),
);

// Slider logic (solo se hasSlider = true)
const currentIndex = ref(0);
let slideInterval = null;
const slides = computed(() =>
  heroImages.value.map((image, i) => ({
    image,
    imageMobile: mobileFor(image, i),
  })),
);

// Direction-aware slider
const hoveredSlide = ref(null);
const slideDirection = ref("from-bottom");
const sliderCurrentIndex = ref(0);

// Testi originali delle card (default se il campo del pannello è vuoto)
const sliderDefaults = [
  {
    title: "Non lasciare traccia in natura",
    description:
      "Passa nella natura con <strong>rispetto: osserva, impara, non lasciare traccia</strong>.",
    text: "",
    quote: "",
  },
  {
    title: "Restare curiosi come da bambini",
    description:
      "La <strong>curiosità</strong> nasce da bambini: custodiamola per continuare a <strong>scoprire la natura</strong>.",
    text: "Le parole di Gianluca Danini:",
    quote:
      "<strong>&laquo;Ciò che spinge tutti alla ricerca è la curiosità. È una cosa che nasce da bambini ed è bene tenersela da adulti, anzi direi anche a settant'anni, come faccio io...&raquo;</strong>",
  },
  {
    title: "Osservare la natura dal quotidiano",
    description:
      "La natura è ovunque: <strong>impariamo a osservarla</strong>, a partire dal <strong>balcone di casa</strong>.",
    text: "",
    quote: "",
  },
  {
    title: "Oltre l'osservazione",
    description:
      "<strong>Conoscere per proteggere: ricerca e divulgazione</strong> per la <strong>tutela dell'avifauna insubrica</strong>.",
    text: "",
    quote: "",
  },
];

// Card N: campi card_N_title, card_N_description, card_N_text,
// card_N_quote, card_N_image. Senza un'immagine propria, la card usa
// la stessa immagine N della copertina.
const sliderItems = computed(() =>
  sliderDefaults.map((d, i) => {
    const n = i + 1;
    return {
      image: c(`card_${n}_image`, heroImages.value[i]),
      imageMobile: mobileFor(
        c(`card_${n}_image`, heroImages.value[i]),
        i,
        c(`card_${n}_image`) ? `card_${n}_image` : `hero_${n}`,
      ),
      title: c(`card_${n}_title`, d.title),
      description: inline(`card_${n}_description`, d.description),
      text: c(`card_${n}_text`, d.text),
      quote: inline(`card_${n}_quote`, d.quote),
    };
  }),
);

// Card mostrate dallo slider.
// - Desktop (> 992px, 2 card visibili): le 4 card con foto e testo che
//   compare al passaggio del mouse.
// - Fino a 992px (1 card visibile): 8 card, ognuna divisa in due: le
//   dispari (1, 3, 5, 7) solo con la foto, le pari (2, 4, 6, 8) solo
//   con il testo su sfondo color cielo.
const isSplitSlider = computed(() => slidesPerView.value === 1);
const sliderCards = computed(() => {
  if (!isSplitSlider.value) {
    return sliderItems.value.map((item) => ({ kind: "full", ...item }));
  }
  return sliderItems.value.flatMap((item, i) => [
    {
      kind: "image",
      image: item.image,
      imageMobile: item.imageMobile,
      title: item.title,
    },
    { kind: "text", ...item, textBg: heroDefaultsTestSlide[i] },
  ]);
});

// Testo di presentazione (4 paragrafi): testi originali
const missionDefaults = [
  "Il Gruppo Insubrico di Ornitologia si ispira ai principi dell&rsquo;&nbsp;<strong>educazione ambientale</strong> e della <strong>promozione della cultura naturalistica</strong> tra i cittadini e persegue, nell&rsquo;&nbsp;ambito territoriale locale come scopo prioritario <strong>lo studio e la salvaguardia dell&rsquo;&nbsp;avifauna</strong>, nonch&eacute; la <strong>gestione e la valorizzazione di aree di interesse naturalistico</strong>.",
  "Osservare un uccello in volo significa raccontare una storia di natura, territorio e <strong>biodiversit&agrave;</strong>. La nostra associazione mobilita una <strong>rete dinamica di cittadini, appassionati e ricercatori</strong>, uniti dal desiderio di comprendere a fondo le <strong>specie locali</strong> e i loro <strong>ecosistemi</strong>. Attraverso <strong>progetti mirati sul campo e divulgazione scientifica</strong>, lavoriamo quotidianamente per <strong>tutelare la biodiversit&agrave;</strong> e rinsaldare il legame profondo tra comunit&agrave; e territorio.",
  "Crediamo che <strong>conoscere la natura sia il primo passo per proteggerla</strong>. Il sodalizio investe risorse ed energie nel <strong>monitoraggio scientifico</strong>, trasformando i dati raccolti in <strong>efficaci strumenti di conservazione</strong> e in preziosi elementi a disposizione delle autorit&agrave; competenti per una <strong>gestione consapevole del territorio</strong>, utili a pianificare <strong>interventi mirati di tutela ambientale</strong>. Questa sinergia tra <strong>ricerca e sensibilizzazione</strong> permette di salvaguardare concretamente l&rsquo;&nbsp;<strong>avifauna selvatica</strong>, valorizzando il patrimonio ecologico circostante.",
  "<strong>Studiare, conoscere, proteggere</strong>. Sosteniamo un modello di <strong>sviluppo sostenibile</strong> in cui la <strong>cittadinanza attiva</strong> diventa <strong>custode consapevole del paesaggio</strong>, garantendo un futuro alle ricchezze biologiche della nostra regione.",
];

// Numero di slide visibili in base alla viewport
const slidesPerView = ref(3);

// Riferimenti per misurare le larghezze reali dal DOM.
// Lo scroll è calcolato in PIXEL (non in % approssimate), così gli
// step sono esatti e l'ultima card si allinea al bordo destro.
const sliderContainerRef = ref(null);
const containerWidth = ref(0);
const GAP_PX = 16; // 1rem su desktop/tablet (0.75rem = 12px su mobile)

// Fino a 992px: carosello a swipe. La card corrente occupa questa
// frazione della larghezza e le vicine "spuntano" ai lati.
const SWIPE_CARD_RATIO = 0.72;
const SWIPE_GAP_PX = 12;

const measureContainer = () => {
  if (sliderContainerRef.value) {
    containerWidth.value = sliderContainerRef.value.clientWidth;
  }
};

const updateSlidesPerView = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth > 992) {
      slidesPerView.value = 2;
    } else {
      slidesPerView.value = 1;
    }
    // Rimisura il container a ogni resize (la larghezza cambia)
    nextTick(measureContainer);
  }
};

const nextSliderSlide = () => {
  const maxIndex = sliderCards.value.length - slidesPerView.value;
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
  () =>
    sliderCurrentIndex.value < sliderCards.value.length - slidesPerView.value,
);

// Cambiando viewport il numero di card cambia (4 ↔ 8): resto sulla
// stessa card (foto e testo della card N sono le posizioni 2N-2 e 2N-1)
// e non oltre l'ultima posizione possibile.
watch(isSplitSlider, (split, wasSplit) => {
  if (split === wasSplit) return;
  const i = sliderCurrentIndex.value;
  const next = split ? i * 2 : Math.floor(i / 2);
  const max = Math.max(0, sliderCards.value.length - slidesPerView.value);
  sliderCurrentIndex.value = Math.min(next, max);
});

// Larghezza esatta di una card, in PIXEL, calcolata dal container reale:
// (container − gap complessivi tra le card visibili) / card visibili.
// In px espliciti perché una % sul track (width:max-content) è ambigua.
const cardStyle = computed(() => {
  if (!containerWidth.value) return undefined;
  if (isSplitSlider.value) {
    const w = containerWidth.value * SWIPE_CARD_RATIO;
    return { width: `${w}px`, minWidth: `${w}px` };
  }
  const gap = slidesPerView.value === 1 ? 12 : GAP_PX;
  const perView = slidesPerView.value;
  const w = (containerWidth.value - gap * (perView - 1)) / perView;
  return { width: `${w}px`, minWidth: `${w}px` };
});

// Calcola il transform in PIXEL, usando la STESSA larghezza-card
// calcolata per lo stile (stessa base = niente disallineamenti).
// Lo scroll non supera mai il massimo (track − container), così
// all'ultimo step l'ultima card resta allineata al bordo destro.
const sliderTransform = computed(() => {
  // Fino a 992px lo scorrimento è nativo (swipe), niente transform
  if (isSplitSlider.value) return "none";
  if (!containerWidth.value) return "translateX(0)";
  const gap = slidesPerView.value === 1 ? 12 : GAP_PX;
  const perView = slidesPerView.value;
  const card = (containerWidth.value - gap * (perView - 1)) / perView;
  const step = card + gap;

  const desired = sliderCurrentIndex.value * step;

  // track = n card + (n−1) gap
  const count = sliderCards.value.length;
  const trackWidth = count * card + (count - 1) * gap;
  const maxScroll = Math.max(0, trackWidth - containerWidth.value);

  const offset = Math.min(desired, maxScroll);
  return `translateX(-${offset}px)`;
});

// ─── Swipe (fino a 992px) ───────────────────────────────
// Spazio prima della prima card e dopo l'ultima, così anche quelle
// possono stare al centro dello schermo.
const swipeTrackStyle = computed(() => {
  if (!isSplitSlider.value || !containerWidth.value) return undefined;
  const side = (containerWidth.value * (1 - SWIPE_CARD_RATIO)) / 2;
  return { paddingLeft: `${side}px`, paddingRight: `${side}px` };
});

const swipeStep = () => containerWidth.value * SWIPE_CARD_RATIO + SWIPE_GAP_PX;

// La card al centro diventa quella corrente (piena, le altre più piccole)
let swipeFrame = null;
const onSliderScroll = () => {
  if (!isSplitSlider.value || swipeFrame) return;
  swipeFrame = requestAnimationFrame(() => {
    swipeFrame = null;
    const el = sliderContainerRef.value;
    if (!el || !containerWidth.value) return;
    const i = Math.round(el.scrollLeft / swipeStep());
    sliderCurrentIndex.value = Math.max(
      0,
      Math.min(i, sliderCards.value.length - 1),
    );
  });
};

// Entrando nel carosello a swipe (es. rotazione del tablet) porto in
// vista la card corrente; tornando su desktop azzero lo scroll nativo.
watch(isSplitSlider, (split) => {
  nextTick(() => {
    measureContainer();
    const el = sliderContainerRef.value;
    if (!el) return;
    el.scrollLeft = split ? sliderCurrentIndex.value * swipeStep() : 0;
  });
});
// ────────────────────────────────────────────────────────

const handleSlideHover = (index, event) => {
  // In mobile (1 card) niente effetto hover: card statica.
  if (slidesPerView.value === 1) return;

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
  if (slides.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  }
};

// Computed property per il background dinamico
const currentBackgroundStyle = computed(() => {
  const slide = slides.value[currentIndex.value] ?? slides.value[0];
  return bgVars(slide.image, slide.imageMobile);
});

// IntersectionObserver per animazioni scroll
onMounted(() => {
  // Update slides per view on mount and resize
  updateSlidesPerView();
  nextTick(measureContainer);
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

  if (slides.value.length > 1) {
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
              <img src="/images/logo/gio-cerchio.svg" alt="" />
            </div>
          </div>
        </section>

        <!-- Jumbo section -->
        <section
          id="home-title"
          class="jumbo-bg"
          :style="currentBackgroundStyle"
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
            <div
              class="slider-container"
              ref="sliderContainerRef"
              @scroll.passive="onSliderScroll"
            >
              <div
                class="slider-track"
                :style="[{ transform: sliderTransform }, swipeTrackStyle]"
              >
                <div
                  v-for="(slide, index) in sliderCards"
                  :key="`${slide.kind}-${index}`"
                  :class="[
                    'slider-item',
                    `slider-item--${slide.kind}`,
                    {
                      active: hoveredSlide === index,
                      'is-current':
                        isSplitSlider && index === sliderCurrentIndex,
                      'is-prev': isSplitSlider && index < sliderCurrentIndex,
                      'is-next': isSplitSlider && index > sliderCurrentIndex,
                    },
                  ]"
                  :style="cardStyle"
                  @mouseenter="handleSlideHover(index, $event)"
                  @mouseleave="hoveredSlide = null"
                >
                  <!-- Fino a 992px, card pari: solo testo su sfondo cielo -->
                  <div
                    v-if="slide.kind === 'text'"
                    class="slide-text"
                    :style="
                      slide.textBg
                        ? { '--text-bg': `url(${slide.textBg})` }
                        : undefined
                    "
                  >
                    <h3 class="slide-text__title uppercase">
                      {{ slide.title }}
                    </h3>
                    <p
                      class="slide-text__description"
                      v-html="slide.description"
                    ></p>
                    <p v-if="slide.text" class="slide-text__description">
                      {{ slide.text }}
                    </p>
                    <p
                      v-if="slide.quote"
                      class="slide-text__description"
                      v-html="slide.quote"
                    ></p>
                  </div>

                  <!-- Foto: sempre su desktop, card dispari fino a 992px -->
                  <div
                    v-else
                    class="slide-image"
                    role="img"
                    :aria-label="
                      slide.kind === 'image' ? slide.title : undefined
                    "
                    :style="bgVars(slide.image, slide.imageMobile)"
                  ></div>

                  <!-- Testo sopra la foto: solo su desktop -->
                  <div
                    v-if="slide.kind === 'full'"
                    :class="['slide-overlay', slideDirection]"
                  >
                    <div class="slide-content">
                      <h3 class="slide-title uppercase">{{ slide.title }}</h3>
                      <p
                        class="slide-description"
                        v-html="slide.description"
                      ></p>
                      <p id="text" class="slide-description">
                        {{ slide.text }}
                      </p>
                      <p class="slide-description" v-html="slide.quote"></p>
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
            <p
              class="first-paragraph"
              v-html="inline('mission_1', missionDefaults[0])"
            ></p>

            <hr class="first-line" />

            <p
              class="second-paragraph"
              v-html="inline('mission_2', missionDefaults[1])"
            ></p>

            <hr class="second-line" />

            <p
              class="third-paragraph"
              v-html="inline('mission_3', missionDefaults[2])"
            ></p>

            <hr class="third-line" />

            <p
              class="fourth-paragraph"
              v-html="inline('mission_4', missionDefaults[3])"
            ></p>
            <div class="button-container">
              <Button
                to="/chi-siamo"
                class="uppercase"
                variant="static"
                id="chi-siamo-button"
                >chi siamo
              </Button>
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
            <Button
              to="/news"
              class="uppercase"
              variant="static"
              id="news-button"
              >Leggi tutte le news</Button
            >
          </div>
        </section>

        <!-- Activities section -->
        <section class="activities-section">
          <div
            class="activities-container news-container d-flex"
            :style="bg('activities_image')"
          >
            <!-- Grid section -->
            <div class="activities-box">
              <div class="activities-list d-grid uppercase">
                <NuxtLink
                  to="/progetti"
                  class="activity-card card-1 d-flex"
                  :style="bg('activity_projects_image')"
                >
                  <div class="card-default d-flex">
                    <span class="bg-blue">progetti di ricerca</span>
                  </div>
                  <div class="card-hover bg-blue">
                    <img
                      src="~/assets/images/activities-section/arrow-right-white.svg"
                      alt="Bottone che indirizza alla pagina dei Progetti di ricerca del G.I.O."
                    />
                    <p>progetti di ricerca</p>
                  </div>
                </NuxtLink>

                <NuxtLink
                  to="/divulgazione"
                  class="activity-card card-3 d-flex"
                  :style="bg('activity_outreach_image')"
                >
                  <div class="card-default d-flex">
                    <span class="bg-blue">divulgazione</span>
                  </div>
                  <div class="card-hover bg-blue">
                    <img
                      src="~/assets/images/activities-section/arrow-right-white.svg"
                      alt="Bottone che indirizza alla pagina dei Divulgazione del G.I.O."
                    />
                    <p>divulgazione</p>
                  </div>
                </NuxtLink>

                <NuxtLink
                  to="/pubblicazioni"
                  class="activity-card card-5 d-flex"
                  :style="bg('activity_publications_image')"
                >
                  <div class="card-default d-flex">
                    <span class="bg-blue">pubblicazioni scientifiche</span>
                  </div>
                  <div class="card-hover bg-blue">
                    <img
                      src="~/assets/images/activities-section/arrow-right-white.svg"
                      alt="Bottone che indirizza alla pagina delle Pubblicazioni del G.I.O."
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
    background-image: var(--bg);
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
  display: flex;
  align-items: center; // centra le card, lo scale cresce simmetricamente
}

.slider-track {
  display: flex;
  gap: 1rem;
  height: 88%; // meno del container: lo scale hover cresce nello spazio sopra/sotto
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  width: max-content; // Importante: permette al track di estendersi oltre il container */
}

.slider-item {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  // La larghezza esatta arriva dallo stile inline (cardStyle, in px),
  // calcolata dal container reale. Niente width/min-width qui, che
  // falserebbero il calcolo (una % sul track max-content è ambigua).
  transform-origin: center center;
  z-index: 1;

  // Espansione con scale(): la card cresce visivamente SENZA
  // spostare le vicine (nessun salto). L'ultima card cresce verso
  // sinistra (transform-origin a destra), le altre dal centro.
  &:hover {
    transform: scale(1.02);
    z-index: 2; // sopra le vicine mentre è espansa
  }

  // Ultima card: origine a destra così l'espansione va verso sinistra
  // e non viene tagliata dal bordo destro del container.
  &:last-child {
    transform-origin: right center;
  }

  // Prima card: origine a sinistra, cresce verso destra
  &:first-child {
    transform-origin: left center;
  }

  .slide-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: var(--bg);
    background-size: cover;
    background-position: center;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  // Card di solo testo (fino a 992px): sfondo color cielo
  .slide-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.75rem;
    padding: clamp(1.25rem, 4vw, 2.5rem);
    // Sfondo della card (heroDefaultsTestSlide). Sotto c'è cielo-alberi
    // come riserva: si vede se l'immagine della card manca o non si carica.
    background-image:
      var(--text-bg, none), url("/images/home/slider/cielo-alberi.webp");
    background-size: cover;
    background-position: center;
    color: white;
    overflow-y: auto; // testi lunghi: scorrono dentro la card

    &__title {
      font-size: clamp(1.2rem, 4.5vw, 1.8rem);
      font-weight: 600;
      letter-spacing: 0.05em;
      margin: 0;
      margin-bottom: 1rem;
    }

    &__description {
      font-size: clamp(0.9rem, 2.8vw, 1.05rem);
      line-height: 1.5;
      margin: 0;
    }
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
    width: 95%;
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
    letter-spacing: 0.1rem;
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
  background-image: url(/images/home/activities-section/parallax-image.webp);

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
        background-image: url(/images/home/activities-section/grid-1.webp);
      }
      .card-3 {
        background-image: url(/images/home/activities-section/grid-2.webp);
      }
      .card-5 {
        background-image: url(/images/home/activities-section/grid-3.webp);
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

    // Una card alla volta, senza ingrandimento al passaggio del mouse:
    // il track occupa tutta l'altezza, così card con foto e card di
    // testo sono alte uguali (quanto lo slider)
    .slider-track {
      height: 100%;
      gap: 12px; // = SWIPE_GAP_PX nello script
      transition: none;
    }

    // Carosello a swipe: niente frecce, le card arrivano fino ai bordi
    // dello schermo e le vicine spuntano ai lati
    .slider-wrapper {
      gap: 0;
      padding: 0;
    }

    .slider-nav {
      display: none;
    }

    .slider-container {
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none; // niente barra di scorrimento

      &::-webkit-scrollbar {
        display: none;
      }
    }

    // Sotto 992px: 1 card visibile, piena e statica.
    // La larghezza esatta è imposta via stile inline (px); qui
    // annulliamo espansione ed effetti hover.
    .slider-item {
      min-width: auto;
      scroll-snap-align: center;
      scroll-snap-stop: always; // uno swipe = una card
      transform: scale(0.88); // le vicine, più piccole
      opacity: 0.85;
      transition:
        transform 0.35s ease,
        transform-origin 0.35s ease,
        opacity 0.35s ease;

      // Rimpicciolimento dal centro, anche per la prima e l'ultima card
      &,
      &:first-child,
      &:last-child {
        transform-origin: center center;
      }

      // Nessun ingrandimento al passaggio del mouse (è un effetto desktop)
      &:hover {
        transform: scale(0.88);
      }

      // Card laterali leggermente inclinate in prospettiva: ruotano
      // attorno al bordo vicino alla card centrale (che resta al suo
      // posto), mentre il lato esterno viene verso chi guarda
      &.is-prev {
        transform-origin: right center;
        transform: perspective(700px) rotateY(20deg) scale(0.88);
      }

      &.is-next {
        transform-origin: left center;
        transform: perspective(700px) rotateY(-20deg) scale(0.88);
      }

      &.is-current,
      &.is-current:hover {
        transform: none;
        opacity: 1;
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
@media (max-width: 768px) {
  // Foto in versione mobile (vedi heroMobileDefaults)
  .col .jumbo-bg,
  .slider-item .slide-image {
    background-image: var(--bg-mobile);
  }

  .col {
    // Direction-aware slider - Mobile (1 card visible su 4)
    .direction-slider-section {
      padding: clamp(1.5rem, 4vw, 3rem) 0;

      .slider-container {
        height: 500px;
      }

      .slider-item {
        // Mobile: card sempre piena e statica.
        // La larghezza esatta è imposta via stile inline (px); qui
        // annulliamo ogni espansione, transizione ed effetto hover.
        min-width: auto;

        .slide-image {
          transition: none; // niente zoom immagine
          transform: none;
        }

        // Card di solo testo: più compatta, così anche i testi lunghi
        // (es. la citazione della card 2) stanno nella card
        .slide-text {
          gap: 0.5rem;
          padding: 1rem 1.25rem;

          &__title {
            font-size: clamp(1.05rem, 4.5vw, 1.3rem);
          }

          &__description {
            font-size: clamp(0.8rem, 3.4vw, 0.9rem);
            line-height: 1.4;
          }
        }

        .slide-overlay {
          opacity: 1;
          transition: none; // overlay sempre visibile, senza animazione

          .slide-content {
            transform: none;
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
