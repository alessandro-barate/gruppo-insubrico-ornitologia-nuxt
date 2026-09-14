<script setup lang="ts">
// SEO
useSeoMeta({
  title: "Link Utili | Gruppo Insubrico di Ornitologia",
  description: "Link utili e risorse per l'ornitologia ed il birdwatching.",
  ogTitle: "Link Utili | Gruppo Insubrico di Ornitologia",
});

useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/links" }],
});

// Import links dal composable
const { data: links } = await useLinks();

// Categoria attiva. Parte sempre da "portali" così SSR e client
// coincidono (niente hydration mismatch). Sotto i 577px la svuotiamo
// in onMounted — dove window esiste ed è lato client.
const activeCategory = ref<string>("portali");

// Dati categorie con nomi e allineamento
const categories = {
  portali: {
    name: "Portali di osservazioni e citizen science",
    centered: false,
  },
  organizzazioni: {
    name: "Organizzazioni internazionali e scientifiche",
    centered: true,
  },
  reti: {
    name: "Italia - reti, associazioni e gruppi regionali",
    centered: true,
  },
  turismo: {
    name: "Turismo naturalistico",
    centered: true,
  },
};

// Soglia mobile: sotto questa larghezza i pannelli fanno toggle e
// nessuno resta aperto di default.
const MOBILE_BREAKPOINT = 577;

// Click su un pannello. In MOBILE fa da toggle: cliccare la categoria
// già aperta la chiude (nessun pannello aperto). Su desktop apre e
// basta (resta sempre un pannello aperto, come prima).
const setCategory = (categoryKey: string) => {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  if (isMobile && activeCategory.value === categoryKey) {
    activeCategory.value = ""; // richiudi il pannello già aperto
  } else {
    activeCategory.value = categoryKey;
  }
};

// Sottosezioni di una categoria: ognuna è resa come una colonna
// (con il suo titolo) nel pannello.
const getSubsections = (categoryKey: string) => {
  return links.value?.[categoryKey as keyof typeof categories] || [];
};

// Gestione soglia 577px: sotto nessuna tab aperta, sopra "portali".
// Agiamo SOLO quando si attraversa la soglia, non a ogni resize, così
// nel desktop l'utente resta libero di cambiare tab senza che il
// ridimensionamento gliele sovrascriva.
let wasMobile = false;

const handleResize = () => {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  if (isMobile === wasMobile) return; // nessun attraversamento: non toccare nulla
  wasMobile = isMobile;
  activeCategory.value = isMobile ? "" : "portali";
};

onMounted(() => {
  // Stato iniziale della soglia + tab chiusa se si atterra sotto 577px.
  wasMobile = window.innerWidth < MOBILE_BREAKPOINT;
  if (wasMobile) {
    activeCategory.value = "";
  }
  window.addEventListener("resize", handleResize);

  const observerLow = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerLow.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  // Elementi da osservare
  const firstBox = document.querySelector(".first-box");
  const secondBox = document.querySelector(".second-box");

  if (firstBox) observerLow.observe(firstBox);
  if (secondBox) observerLow.observe(secondBox);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Title -->
        <section>
          <div class="title-container">
            <h1 id="links" class="uppercase">social e link utili</h1>
          </div>
        </section>

        <!-- Horizontal Accordion -->
        <section class="accordion-section">
          <div class="accordion-container">
            <div
              v-for="(category, key) in categories"
              :key="key"
              class="accordion-panel"
              :class="[`bg-${key}`, { active: activeCategory === key }]"
              @click="setCategory(key as string)"
            >
              <!-- Overlay scuro -->
              <div class="panel-overlay"></div>

              <!-- Tab label (sempre visibile) -->
              <div class="panel-tab">
                <span class="tab-text">{{ category.name }}</span>
              </div>

              <!-- Separator -->
              <div class="panel-separator"></div>

              <!-- Content (visibile solo quando attivo) -->
              <div class="panel-content">
                <div
                  class="links-columns"
                  :class="{ centered: category.centered }"
                >
                  <div
                    v-for="(subsection, subIndex) in getSubsections(
                      key as string,
                    )"
                    :key="subIndex"
                    class="links-subsection d-flex"
                  >
                    <h3 class="links-subsection__title">
                      {{ subsection.title }}
                    </h3>
                    <div
                      v-for="(group, groupIndex) in subsection.groups"
                      :key="groupIndex"
                      class="links-group"
                      :class="{ 'links-group--reti': key === 'reti' }"
                    >
                      <h4
                        class="links-group__title"
                        :class="{ 'links-group__title--reti': key === 'reti' }"
                      >
                        {{ group.title }}
                      </h4>
                      <ul class="links-list">
                        <li
                          v-for="(link, index) in group.links"
                          :key="index"
                          class="link-item"
                        >
                          <a
                            :href="link.href"
                            target="_blank"
                            rel="noopener noreferrer"
                            @click.stop
                          >
                            {{ link.title }}
                          </a>
                          <span v-if="link.subtitle" class="link-subtitle">{{
                            link.subtitle
                          }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Contacts section -->
      <div class="col-2">
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
                    src="~/assets/images/links-socials/facebook.png"
                    alt="Link alla pagina Facebook del G.I.O."
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
                    src="~/assets/images/links-socials/instagram.svg"
                    alt="Link alla pagina Instagram del G.I.O."
                  />
                </a>
                <h3>Seguici su Instagram</h3>
              </div>

              <hr class="space" />

              <!-- Newsletter -->
              <div class="newsletter">
                <NuxtLink to="/form">
                  <img
                    src="~/assets/images/links-socials/newsletter.svg"
                    alt="Link alla pagina del form di contatto"
                  />
                </NuxtLink>
                <h3>Scrivici una mail</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.links-group__title--reti,
.links-subsection__title {
  color: white;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.links-group--reti {
  width: 70%;
}

.row {
  .col {
    width: 100%;
    padding-bottom: 12rem;
    background-position: center;
    background-size: cover;
    background-image: url(../assets/images/links-socials/gheppio.jpg);

    .title-container {
      width: 100%;
      padding-top: 10rem;
      text-align: center;
    }
  }
}

.accordion-section {
  padding: 0 5%;
  padding-top: 7rem;
}

.accordion-container {
  display: flex;
  width: 85%;
  margin: 0 auto;
  height: 70vh;
  min-height: 500px;
  max-height: 800px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.accordion-panel {
  position: relative;
  flex: 0 0 60px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &.bg-portali {
    margin-left: 0;
    background-image: url(../assets/images/links-socials/nibbio-bruno.webp);
  }

  &.bg-organizzazioni {
    background-image: url(../assets/images/links-socials/aquila-reale.webp);
  }

  &.bg-reti {
    background-image: url(../assets/images/links-socials/ibis-eremita.webp);
  }

  &.bg-turismo {
    margin-right: 0;
    background-image: url(../assets/images/links-socials/nibbio-reale.webp);
  }

  &.active {
    flex: 1 1 auto;
    cursor: default;

    .panel-overlay {
      background: linear-gradient(
        90deg,
        rgb(0, 0, 0) 0%,
        rgba(0, 0, 0, 0.4) 30%,
        rgba(0, 0, 0, 0.7) 100%
      );
    }

    .panel-content {
      opacity: 1;
      visibility: visible;
      transition-delay: 0.3s;
    }

    .panel-tab {
      background: transparent;
    }
  }

  &:not(.active):hover {
    flex: 0 0 80px;

    .panel-overlay {
      background: rgba(0, 0, 0, 0.4);
    }
  }
}

.panel-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: background 0.4s ease;
  z-index: 1;
}

.panel-tab {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.4s ease;
}

.tab-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: white;
  white-space: nowrap;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.panel-separator {
  position: absolute;
  right: 0;
  top: 5%;
  bottom: 5%;
  width: 1px;
  background: rgba(255, 255, 255, 0.3);
  z-index: 5;
}

.panel-content {
  position: absolute;
  left: 80px;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.4s ease,
    visibility 0.4s ease;
}

.links-columns {
  display: flex;
  gap: 3rem;
  justify-content: flex-start;
  align-items: flex-start;

  &.centered {
    justify-content: center;
  }
}

.links-subsection {
  gap: 1rem;
  width: 90%;
  overflow: auto;
  max-height: 500px;
  margin-left: 1.5rem;
  flex-direction: column;

  .links-group {
    margin-left: 0;
    padding-top: 1rem;

    .links-group__title--reti {
      margin-bottom: 1.5rem;
    }
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
    margin: 0;
  }

  .links-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .link-item {
      margin-left: 0;

      a {
        color: white;
        font-size: 1rem;
        letter-spacing: 0.02em;
        text-decoration: underline;
        text-underline-offset: 0.2rem;
        transition: all 0.3s ease;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);

        &:hover {
          color: rgba(255, 140, 0, 0.9);
        }
      }

      .link-subtitle {
        color: rgba(255, 255, 255, 0.705);
      }
    }
  }
}

// Contacts section
.contacts-container {
  width: 100%;
  position: relative;
  padding-bottom: 10rem;
  background-image:
    linear-gradient(90deg, rgba(0, 119, 255, 0.85), rgba(233, 233, 233, 0.85)),
    url(../assets/images/links-socials/social.jpg);
  padding-top: 10rem;
  min-height: clamp(500px, 80vh, 875px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(
      90deg,
      #a8d5f4 0%,
      #acd9f8 20%,
      #b0ddfc 45%,
      #b2dffe 73%,
      #b6def8 100%
    );
    clip-path: polygon(0% 0%, 100% 0, 0% 100%);

    @media (max-width: 576px) {
      height: 90px;
    }
  }

  &::after {
    @media (max-width: 576px) {
      height: 90px;
    }
  }

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
      .newsletter {
        width: 100%;
        display: flex;
        padding-left: clamp(1rem, 3vw, 3rem);
        align-items: center;
        height: calc(100% / 3);
        margin-left: 0;

        a {
          margin-left: 0;
          margin-right: 0;
          width: clamp(80px, 20%, 80px);
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
    }
  }
}
// END contacts section

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
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

        .facebook a,
        .instagram a,
        .newsletter a {
          width: 13%;

          img {
            width: 100%;
          }
        }

        .space {
          width: 75%;
        }

        .facebook,
        .instagram,
        .newsletter {
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
      }
    }
  }
  // END contacts section

  .accordion-container {
    height: 60vh;
    min-height: 450px;
  }

  .accordion-panel {
    flex: 0 0 50px;

    &:not(.active):hover {
      flex: 0 0 65px;
    }
  }

  .panel-tab {
    width: 50px;
  }

  .tab-text {
    font-size: 0.9rem;
  }

  .panel-content {
    left: 60px;
    right: 20px;
  }

  .links-columns {
    gap: 2rem;
  }

  .link-item {
    a {
      font-size: 0.9rem;
    }
  }
}

// ==========================================
// MEDIA QUERIES - MOBILE
// ==========================================
@media (max-width: 576px) {
  .row {
    .col {
      .title-container {
        padding-top: 8rem;
      }
    }
  }

  // Contacts
  .contacts-container {
    // background-attachment: scroll; -> Fix per iOS

    .contacts-box {
      .socials-container {
        .facebook a,
        .instagram a,
        .newsletter a {
          width: 16%;
        }

        .facebook,
        .instagram,
        .newsletter {
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

  .accordion-section {
    padding: 0 3%;
    padding-top: 5rem;
  }

  .accordion-container {
    display: block;
    width: 100%;
    // flex-direction: column;
    height: auto;
    min-height: unset;
    max-height: unset;
  }

  .accordion-panel {
    flex: 0 0 60px;
    min-height: 60px;
    // In mobile il pannello cambia ALTEZZA (non larghezza): transizioniamo
    // flex-basis + min/max-height così apertura e chiusura sono fluide.
    transition:
      flex 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      min-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    &.active {
      // Altezza FISSA del pannello aperto: la lista interna scorre,
      // il pannello non cresce col contenuto.
      flex: 0 0 400px;
      min-height: 400px;
      max-height: 400px;
    }

    &:not(.active):hover {
      flex: 0 0 70px;
    }
  }

  .panel-tab {
    width: 100%;
    height: 60px;
    top: 0;
    bottom: unset;
  }

  .tab-text {
    writing-mode: horizontal-tb;
    transform: none;
    font-size: 0.85rem;
  }

  .panel-separator {
    left: 5%;
    right: 5%;
    top: unset;
    bottom: 0;
    width: unset;
    height: 1px;
  }

  .panel-content {
    left: 15px;
    right: 15px;
    top: 70px;
    bottom: 15px; // ancora il content in basso: definisce l'area scrollabile
    transform: none;
    overflow-y: auto; // la lista scorre dentro il pannello a altezza fissa
    -webkit-overflow-scrolling: touch; // scroll fluido su iOS
  }

  // In mobile scorre il .panel-content: le sottosezioni NON devono
  // avere il loro scroll interno (eviterebbe lo scroll annidato).
  .links-subsection {
    overflow: visible;
    max-height: none;
  }

  .links-columns {
    flex-direction: column;
    gap: 0.5rem;

    &.centered {
      align-items: center;
    }
  }

  .link-item {
    a {
      font-size: 0.85rem;
    }
  }
}
</style>
