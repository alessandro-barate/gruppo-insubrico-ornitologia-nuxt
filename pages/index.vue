<script setup>
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
    { threshold: 0.3 }
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
    { threshold: 0.1 }
  );

  // Elementi da osservare
  const newsBox = document.querySelector(".news-box");
  const subscriptionTitle = document.querySelector(".subscription-title");
  const activitiesTitle = document.querySelector(".activities-title");
  const firstBox = document.querySelector(".first-box");
  const secondBox = document.querySelector(".second-box");

  if (newsBox) observer.observe(newsBox);
  if (subscriptionTitle) observer.observe(subscriptionTitle);
  if (activitiesTitle) observer.observe(activitiesTitle);
  if (firstBox) observerLow.observe(firstBox);
  if (secondBox) observerLow.observe(secondBox);
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Jumbo section -->
        <section class="title-section jumbo-bg d-flex">
          <div class="overlay">
            <!-- Logo container -->
            <div class="logo-section fade-wrapper-3">
              <div class="logo-container">
                <div class="overlay-2">
                  <img
                    src="~/assets/images/gio-logo.webp"
                    alt="Logo del Gruppo Insubrico di Ornitologia"
                  />
                </div>
              </div>
            </div>

            <!-- Organization's name -->
            <div class="title-container title-container-2">
              <div class="fade-wrapper-2">
                <p class="uppercase">gruppo insubrico</p>
              </div>
            </div>

            <div class="title-container title-container-3">
              <div class="fade-wrapper-2">
                <p class="uppercase">di ornitologia</p>
              </div>
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

          <!-- News list -->
          <div class="news-list-container">
            <p>In mobile fare carosello</p>
            <div class="news-list-box d-flex">
              <div class="single-news">
                <img src="~/assets/images/bird-1.webp" alt="" />
              </div>
              <div class="single-news">
                <img src="~/assets/images/bird-2.jpg" alt="" />
              </div>
              <div class="single-news">
                <img src="~/assets/images/bird-3.jpg" alt="" />
              </div>
            </div>
          </div>

          <!-- News button -->
          <div class="button">
            <NuxtLink to="/news">
              <button>Leggi tutte le news</button>
            </NuxtLink>
          </div>
        </section>

        <!-- Subscribe section -->
        <section>
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
        </section>

        <!-- Activities section -->
        <section>
          <div class="activities-container news-container d-flex">
            <!-- Grid section -->
            <div class="activities-box">
              <div class="activities-list d-grid uppercase">
                <NuxtLink to="/progetti" class="activity-card card-1 d-flex">
                  <div class="card-default d-flex">
                    <span class="gradient-color">progetti</span>
                  </div>
                  <div class="card-hover gradient-color">
                    <img src="~/assets/images/arrow-right.svg" alt="" />
                    <p>progetti</p>
                  </div>
                </NuxtLink>

                <NuxtLink
                  to="/divulgazione"
                  class="activity-card card-3 d-flex"
                >
                  <div class="card-default d-flex">
                    <span class="gradient-color">divulgazione</span>
                  </div>
                  <div class="card-hover gradient-color">
                    <img src="~/assets/images/arrow-right.svg" alt="" />
                    <p>divulgazione</p>
                  </div>
                </NuxtLink>

                <NuxtLink
                  to="/pubblicazioni"
                  class="activity-card card-5 d-flex"
                >
                  <div class="card-default d-flex">
                    <span class="gradient-color">pubblicazioni</span>
                  </div>
                  <div class="card-hover gradient-color">
                    <img src="~/assets/images/arrow-right.svg" alt="" />
                    <p>pubblicazioni</p>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <hr />

            <!-- Activities title and description -->
            <div class="sections-title activities-title">
              <h2 class="title-1 title-color uppercase">scopri le nostre</h2>
              <h2 class="title-2 title-color uppercase">attività</h2>
            </div>
          </div>
        </section>

        <!-- Contacts section -->
        <section class="contacts-container">
          <div class="contacts-box d-flex">
            <div class="contacts-text uppercase">
              <div class="first-box">
                <h3 class="text-1">resta sempre aggiornato!</h3>
                <h3 class="text-2">seguici sui nostri</h3>
                <h2 class="text-3">social</h2>
              </div>

              <hr />

              <div class="second-box">
                <h3 class="text-4">e iscriviti alla</h3>
                <h2 class="text-5">newsletter</h2>
              </div>
            </div>
            <div class="socials-container">
              <!-- Facebook -->
              <div class="facebook">
                <a
                  href="https://www.facebook.com/GruppoInsubricoDiOrnitologia"
                  target="_blank"
                >
                  <img
                    src="~/assets/images/facebook.png"
                    alt="Facebook logo e link"
                  />
                </a>
                <h3>Aggiungigi su Facebook</h3>
              </div>

              <hr class="space" />

              <!-- Instagram -->
              <div class="instagram">
                <a
                  href="https://www.instagram.com/gruppoinsubricoornitologia/"
                  target="_blank"
                >
                  <img
                    src="~/assets/images/instagram.svg"
                    alt="Instagram logo e link"
                  />
                </a>
                <h3>Seguici su Instagram</h3>
              </div>

              <hr class="space" />

              <!-- Newsletter -->
              <div class="newsletter">
                <a href="">
                  <img
                    src="~/assets/images/newsletter.svg"
                    alt="Newsletter e link"
                  />
                </a>
                <h3>Iscriviti alla nostra newsletter</h3>
              </div>

              <hr class="space" />

              <!-- Change -->
              <div class="change">
                <a href="https://www.change.org/" target="_blank">
                  <img
                    src="~/assets/images/change.svg"
                    alt="Change.org logo e link"
                  />
                </a>
                <h3>Sostieni le nostre campagne o lanciane una</h3>
              </div>
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
    background: url(../assets/images/jumbo-home.webp) center/cover no-repeat;
  }

  .title-section {
    position: relative;
    width: 100%;
    height: 140vh;
    overflow: hidden;

    .logo-section {
      width: 100%;
      margin-top: clamp(2rem, 5vw, 5rem);
      padding-bottom: clamp(1.5rem, 3vw, 3rem);

      .logo-container {
        width: 100%;
        text-align: center;

        .overlay-2 {
          width: clamp(40%, 25vw, 25%);
          margin: 0 auto;

          img {
            width: 80%;
          }
        }
      }
    }

    .fade-wrapper-3 {
      opacity: 0;
      animation: fadeIn 6s ease-in-out forwards;
    }
  }

  .title-container {
    width: 100%;
    text-align: center;
    padding-top: 1rem;

    p {
      font-size: clamp(1.5rem, 4vw, 3rem);
    }

    .fade-wrapper-2 {
      opacity: 0;
      animation: fadeIn 4.5s ease-in-out forwards;

      p {
        font-size: clamp(1.5rem, 4vw, 3.2rem);
        font-weight: 600;
        letter-spacing: clamp(0.3rem, 2vw, 1rem);
        background: linear-gradient(90deg, #1f1f1f, #b6b6b6);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }
  }

  .title-container-3 {
    padding-top: 1rem;
  }
}
// END jumbo section

// News section
.news-section {
  .news-container {
    width: 100%;
    flex-wrap: wrap;

    .sections-title {
      width: 50%;

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

  .news-list-container {
    // Variable for card dimension
    --news-card-size: clamp(200px, 25vw, 300px);
    width: 95%;
    margin: 0 auto;
    margin-top: 2rem;

    .news-list-box {
      display: grid;
      grid-template-columns: repeat(3, var(--news-card-size));
      justify-content: center;
      gap: clamp(12px, 2vw, 24px);
      padding: clamp(10px, 2vw, 20px);

      .single-news {
        aspect-ratio: 1 / 1;
        width: 100%;
        overflow: hidden;
        border-radius: 1rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;

          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }

  button {
    background: linear-gradient(90deg, #0077ff, #00e1ff);

    &:hover {
      color: rgb(0, 0, 0);
    }
  }
}
// END news section

// Subscription section
.subscription-container {
  padding-top: clamp(4rem, 10vw, 10rem);
  padding-bottom: clamp(6rem, 14vw, 14rem);
  width: 100%;
  position: relative;
  min-height: clamp(500px, 80vh, 1000px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url(../assets/images/parallax-image.webp);

  .sections-title {
    margin-bottom: 2rem;
    overflow: hidden;

    .title-1,
    .title-2 {
      opacity: 0;
      transform: translateY(-100%);
    }

    &.visible {
      .title-1 {
        animation: slideInTop 1s ease-in-out forwards;
      }

      .title-2 {
        animation: slideInTop 1s ease-in-out 0.3s forwards;
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

  .subscription-box {
    margin: 0 auto;
    width: clamp(85%, 70vw, 70%);
    padding: clamp(0.75rem, 2vw, 1rem);
    border-radius: 0.5rem;

    .card-logo {
      width: 100%;
      padding-top: 1rem;
      margin-bottom: clamp(1rem, 2vw, 2rem);

      img {
        width: clamp(8%, 5vw, 5%);
      }
    }

    h3 {
      font-size: clamp(1.5rem, 4vw, 3rem);
    }

    p {
      font-size: clamp(1rem, 2vw, 1.5rem);
      margin-top: 1rem;
      margin-bottom: clamp(1rem, 2vw, 2rem);
    }

    .subscription-button {
      text-align: center;
    }

    .button {
      padding-bottom: 1rem;

      button {
        background: linear-gradient(90deg, #d2420d, #ffbf00);

        &:hover {
          color: rgb(0, 0, 0);
        }
      }
    }
  }

  hr {
    width: 10%;
    border: none;
    margin-left: clamp(2rem, 10vw, 10rem);
    margin-bottom: 2rem;
    border-bottom: 2px solid rgb(141, 141, 141);
  }
}
// END subscription section

// Activities section
.activities-container {
  width: 90%;
  margin: 0 auto;
  padding-top: clamp(2rem, 5vw, 5rem);
  padding-bottom: clamp(2rem, 5vw, 5rem);
  position: relative;
  align-items: center;
  flex-wrap: wrap;

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
          transition: opacity 0.5s ease-in-out;

          span {
            font-weight: 500;
            width: 100%;
            padding: 5%;
            display: inline-block;
            opacity: 0.8;
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
            color: black;
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
      .card-2,
      .card-3,
      .card-4,
      .card-5 {
        background-size: cover;
        background-position: center;
      }

      .card-1 {
        background-image: url(../assets/images/grid-1.webp);
      }
      .card-2 {
        background-image: url(../assets/images/grid-2.webp);
      }
      .card-3 {
        background-image: url(../assets/images/grid-3.webp);
      }
      .card-4 {
        background-image: url(../assets/images/grid-4.webp);
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

// Contacts section
.contacts-container {
  width: 100%;
  position: relative;
  padding-bottom: 3rem;
  background-image: linear-gradient(
      90deg,
      rgba(0, 119, 255, 0.85),
      rgba(233, 233, 233, 0.85)
    ),
    url(../assets/images/social.jpg);
  padding-top: clamp(4rem, 10vw, 10rem);
  min-height: clamp(500px, 80vh, 875px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  .contacts-box {
    width: 95%;
    padding: clamp(1rem, 2vw, 2rem);
    margin: 0 auto;
    flex-wrap: wrap;

    .contacts-text {
      width: 60%;
      color: white;
      padding-top: 3rem;

      h2 {
        font-size: clamp(2.5rem, 8vw, 6rem);
      }

      h3 {
        font-size: clamp(1.2rem, 4vw, 3rem);
      }

      hr {
        width: clamp(100px, 20vw, 250px);
        border: none;
        margin-left: clamp(5rem, 25vw, 25rem);
        border-bottom: 2px solid white;
      }

      .first-box {
        opacity: 0;
        overflow: hidden;
        transform: translateX(50%);

        &.visible {
          animation: slideInLeft 1s ease-in-out forwards;
        }
      }

      .second-box {
        opacity: 0;
        overflow: hidden;
        transform: translateY(100%);

        &.visible {
          animation: slideInBottom 1s ease-in-out forwards;
        }
      }

      .text-1 {
        margin-bottom: 0.8rem;
      }

      .text-2 {
        margin-left: clamp(0.5rem, 1vw, 1rem);
        margin-bottom: clamp(1rem, 2vw, 2rem);
      }

      .text-3 {
        margin-left: clamp(2rem, 7vw, 7rem);
        margin-bottom: clamp(1.5rem, 3vw, 3rem);
      }

      .text-4 {
        margin-top: clamp(1rem, 2vw, 2rem);
        margin-left: clamp(1rem, 3vw, 3rem);
        margin-bottom: clamp(1rem, 2vw, 2rem);
      }

      .text-5 {
        margin-left: clamp(1.5rem, 4vw, 4rem);
      }
    }

    .socials-container {
      width: 40%;
      display: flex;
      flex-direction: column;

      .space {
        border: none;
        width: 70%;
        margin-left: clamp(2rem, 12vw, 12rem);
        border-bottom: 2px solid black;
      }

      .facebook,
      .instagram,
      .newsletter,
      .change {
        display: flex;
        padding-left: clamp(1rem, 3vw, 3rem);
        align-items: center;
        height: calc(100% / 3);
        margin-left: 0;

        a {
          width: clamp(90px, 20%, 90px);
          min-width: 50px;
          z-index: 1;
          border-radius: 26px;
          position: relative;
          padding: 6px 6px 6px 6px;
          border: 3px solid black;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, #d2420d, #ffbf00);
            border-radius: 23px;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
            z-index: -1;
          }

          &:hover::before {
            opacity: 1;
          }
        }

        h3 {
          padding-left: clamp(1rem, 4vw, 4rem);
          font-size: clamp(0.9rem, 2vw, 1.5rem);
        }
      }

      .facebook a {
        width: clamp(78px, 20%, 78px);
      }

      .instagram a {
        width: clamp(86px, 20%, 86px);
      }

      .newsletter a {
        width: clamp(84px, 20%, 84px);
      }

      .change a {
        width: clamp(105px, 20%, 105px);
      }
    }
  }
}
// END contacts section

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
  // Jumbo section
  .col {
    .title-section {
      height: 110vh;

      .overlay {
        .logo-section {
          .logo-container {
            .overlay-2 {
              img {
                width: 100%;
              }
            }
          }
        }
      }
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

  // Contacts section
  .contacts-container {
    .contacts-box {
      margin-top: 5rem;
      flex-direction: column;

      .contacts-text {
        width: 100%;
        text-align: center;
        margin-bottom: 3rem;

        hr {
          margin: 1.5rem auto;
        }

        .text-2,
        .text-3,
        .text-4,
        .text-5 {
          margin-left: 0;
        }
      }

      .socials-container {
        width: 100%;
        align-items: center;

        .space {
          width: 65%;
          margin-left: auto;
          margin-right: auto;
        }

        .facebook a {
          width: 33%;
        }

        .instagram a {
          width: 38%;
        }

        .newsletter a {
          width: 27%;
        }

        .space {
          width: 75%;
        }

        .facebook,
        .instagram,
        .newsletter,
        .change {
          padding-left: 0;
          padding: 2rem 0;
          flex-direction: column;
          text-align: center;

          h3 {
            font-size: 1.3rem;
            padding-top: 1rem;
            padding-left: 1.5rem;
          }
        }

        .change a {
          width: clamp(50px, 25%, 100px);
        }
      }
    }
  }
  // END contacts section
}

// ==========================================
// MEDIA QUERIES - MOBILE
// ==========================================
@media (max-width: 576px) {
  .col {
    // Jumbo
    .title-section {
      height: 80vh;

      .logo-section {
        .logo-container {
          .overlay-2 {
            img {
              width: 100%;
              padding-top: 1rem;
            }
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

      .news-list-container {
        --news-card-size: min(300px, 80vw);

        .news-list-box {
          grid-template-columns: var(--news-card-size);
          gap: 3rem;

          .single-news {
            aspect-ratio: 1 / 1;
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

    // Contacts
    .contacts-container {
      // background-attachment: scroll; -> Fix per iOS

      .contacts-box {
        .socials-container {
          .facebook,
          .instagram,
          .newsletter,
          .change {
            h3 {
              padding-left: 0;
              padding-top: 0.5rem;
            }
          }

          .space {
            width: 70%;
          }
        }
      }
    }
  }
}
</style>
