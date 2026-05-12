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
  const firstBox = document.querySelector(".first-box");
  const secondBox = document.querySelector(".second-box");
  const firstParagraph = document.querySelector(".first-paragraph");
  const secondParagraph = document.querySelector(".second-paragraph");
  const thirdParagraph = document.querySelector(".third-paragraph");
  const fourthParagraph = document.querySelector(".fourth-paragraph");

  if (newsBox) observer.observe(newsBox);
  if (subscriptionTitle) observer.observe(subscriptionTitle);
  if (activitiesTitle) observer.observe(activitiesTitle);
  if (firstParagraph) observerLow.observe(firstParagraph);
  if (secondParagraph) observerLow.observe(secondParagraph);
  if (thirdParagraph) observerLow.observe(thirdParagraph);
  if (fourthParagraph) observerLow.observe(fourthParagraph);
  if (firstBox) observerLow.observe(firstBox);
  if (secondBox) observerLow.observe(secondBox);

  if (slides && slides.length > 1) {
    slideInterval = setInterval(nextSlide, 4000);
  }
});

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Jumbo section -->
        <section
          class="title-section jumbo-bg d-flex"
          :style="{ backgroundImage: currentBackgroundImage }"
        >
          <!-- Organization's name -->
          <div class="title-container title-container-2">
            <div class="fade-wrapper-2">
              <p class="uppercase">gruppo insubrico di ornitologia</p>
            </div>
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
                <button class="uppercase">cosa facciamo</button>
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
                    <img src="~/assets/images/arrow-right-white.svg" alt="" />
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
                    <img src="~/assets/images/arrow-right-white.svg" alt="" />
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
                    <img src="~/assets/images/arrow-right-white.svg" alt="" />
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
        background: linear-gradient(90deg, #031a8c, #4e62c5);
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

// Mission section
.mission-section {
  position: relative;
  width: 100%;
  padding-top: 8rem;
  padding-bottom: 8rem;
  background-color: #031a8c;

  hr {
    border: none;
    margin-bottom: 3rem;
    border-bottom: 1px solid white;
  }

  .first-line {
    width: 40%;
    margin-left: 10%;
  }

  .second-line {
    width: 40%;
    margin-left: 45%;
  }

  .third-line {
    width: 40%;
    margin-left: 20%;
  }

  .square {
    width: 80%;
    padding: 4rem;
    font-size: 1.2rem;
    line-height: 1.7rem;
    color: rgb(200, 200, 200);

    .first-paragraph,
    .second-paragraph,
    .third-paragraph,
    .fourth-paragraph {
      width: 80%;
      margin-bottom: 3rem;
      opacity: 0;
      transition: all 1s cubic-bezier(0.77, 0, 0.175, 1);
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
//   background-image: url(../assets/images/parallax-image.webp);

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
  background-image: url(../assets/images/parallax-image.webp);

  hr {
    height: clamp(100px, 20vw, 210px);
    align-self: flex-end;
    border: none;
    border-left: 2px solid rgb(141, 141, 141);
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
        background-image: url(../assets/images/grid-1.webp);
      }
      .card-3 {
        background-image: url(../assets/images/grid-3.webp);
      }
      .card-5 {
        background-image: url(../assets/images/grid-5.webp);
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
      height: 80vh;
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
