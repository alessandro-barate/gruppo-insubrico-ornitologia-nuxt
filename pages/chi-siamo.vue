<script setup lang="ts">
// SEO
useSeoMeta({
  title: "Chi Siamo | Gruppo Insubrico di Ornitologia",
  description:
    "Scopri chi siamo, la nostra storia e la missione del Gruppo Insubrico Ornitologico.",
  ogTitle: "Chi Siamo | Gruppo Insubrico di Ornitologia",
  ogDescription:
    "Scopri chi siamo, la nostra storia e la missione del Gruppo Insubrico Ornitologico.",
});

useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/chi-siamo" }],
});

// Stato
const activeSection = ref("");
const isPanelOpen = ref(false);
const isModalOpen = ref(false);
const textContentRef = ref<HTMLElement | null>(null);
const selectionBarRef = ref<HTMLElement | null>(null);

// Funzione di easing smooth (ease-out-quart - rallenta dolcemente)
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

// Scroll smooth custom con callback alla fine
const smoothScrollTo = (
  element: HTMLElement,
  duration: number = 800,
  offset: number = 0,
  onComplete?: () => void,
) => {
  const elementRect = element.getBoundingClientRect();
  const targetPosition =
    elementRect.top +
    window.pageYOffset -
    window.innerHeight / 2 +
    element.offsetHeight / 2 +
    offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else if (onComplete) {
      onComplete();
    }
  };

  requestAnimationFrame(animation);
};

// Toggle panel direttivo
const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};

// Toggle sezioni iscrizione (per desktop - toggle on/off)
const toggleSection = (section: string) => {
  // Caso 1: clicco lo stesso bottone → chiudo e scrolla verso i bottoni
  if (activeSection.value === section) {
    activeSection.value = "";
    // Scrolla verso i bottoni dopo la chiusura
    setTimeout(() => {
      if (selectionBarRef.value) {
        smoothScrollTo(selectionBarRef.value, 800, 0);
      }
    }, 200);
  }
  // Caso 2: c'è già una sezione aperta → cambio solo il contenuto (no scroll)
  else if (activeSection.value !== "") {
    activeSection.value = section;
  }
  // Caso 3: apertura da zero → scroll + poi mostra contenuto
  else {
    if (textContentRef.value) {
      smoothScrollTo(textContentRef.value, 800, 150, () => {
        activeSection.value = section;
      });
    } else {
      activeSection.value = section;
    }
  }
};

// Mostra sezione in modal (per tablet/mobile)
const displayModal = (section: string) => {
  activeSection.value = section;
  isModalOpen.value = true;
};

// Chiudi modal
const closeModal = () => {
  isModalOpen.value = false;
  activeSection.value = "";
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Jumbo -->
        <section class="title-section jumbo-bg">
          <div class="overlay">
            <div class="title uppercase">
              <h1 id="about-us">chi siamo</h1>
            </div>
          </div>
        </section>

        <!-- Articles section -->
        <section class="article-container d-flex">
          <!-- Article section -->
          <article class="paragraphs-container">
            <!-- First paragraph -->
            <p class="first-paragraph">
              Il Gruppo Insubrico di Ornitologia (GIO) si forma nel 1999 per
              iniziativa di Piero Alberti, Walter Guenzani e Fabio Saporetti
              presso il Civico Museo Insubrico di Storia naturale di Induno
              Olona, grazie all'ospitalità offerta dal Curatore Gianluca Danini.
              <br />
              Scopo principale dell'associazione è quello di promuovere
              l'indagine ornitologica a livello provinciale ed insubrico,
              unitamente ad attività di divulgazione con l'organizzazione di
              conferenze, corsi e convegni, collaborando anche con enti pubblici
              e privati.
            </p>

            <hr class="first-line" />

            <!-- Second paragraph -->
            <div class="second-paragraph-container d-flex">
              <p class="second-paragraph">
                Nel dicembre 2009 il GIO, per volontà di 9 soci fondatori, si
                costituisce come Onlus presso il Registro di Varese, spostandosi
                da Induno Olona a Clivio, nell'edificio che diverrà la sede del
                nuovo Civico Museo Insubrico di Storia Naturale di Clivio e
                Induno Olona.
                <br />
                Per il periodo 2010-2012 viene eletto il primo Consiglio
                Direttivo con Fabio Saporetti (Presidente), Monica Carabella
                (Vice-Presidente) e 3 Consiglieri: Paolo Casali (poi sostituito
                da Andrea Vidolini), Silvio Colaone e Walter Guenzani.
              </p>
            </div>

            <hr class="second-line" />
          </article>

          <!-- Button-container per panel -->
          <div
            class="button-container d-flex"
            :class="{ 'panel-open': isPanelOpen }"
          >
            <div class="half-circle gradient-color">
              <button @click="togglePanel" class="toggle-btn">
                <div class="toggle-icon">
                  <span
                    class="bar bar1"
                    :class="{ active: isPanelOpen }"
                  ></span>
                  <span
                    class="bar bar2"
                    :class="{ active: isPanelOpen }"
                  ></span>
                </div>
              </button>
            </div>
          </div>

          <!-- List container (direttivo) -->
          <div
            class="right-container gradient-color-reverse"
            :class="{ active: isPanelOpen }"
          >
            <div class="list-container">
              <h2>Dal 2025 il direttivo è così composto</h2>
              <div class="list">
                <h4>Presidente</h4>
                <ul>
                  <li>Milo Manica</li>
                </ul>
              </div>

              <div class="list">
                <h4>Vice-Presidenti</h4>
                <ul>
                  <li>Daniela Casola</li>
                  <li>Fabio Saporetti</li>
                </ul>
              </div>

              <div class="list">
                <h4>Consiglieri</h4>
                <ul>
                  <li>Ilaria Cervellin</li>
                  <li>Silvio Cova</li>
                  <li>Nicola Larroux</li>
                  <li>Jacopo Sacchet</li>
                </ul>
              </div>

              <div class="list">
                <h4>Segretaria amministrativa e tesoreria</h4>
                <ul>
                  <li>Rosita Pigni</li>
                </ul>
              </div>

              <div class="list">
                <h4>Presidenti negli scorsi anni</h4>
                <ul>
                  <li>Fabio Saporetti</li>
                  <li>Monia Carabella</li>
                  <li>Walter Guenzani</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Team image section -->
        <section class="team-container">
          <div class="team-image">
            <img
              src="~/assets/images/gruppo-gio-2023.jpg"
              alt="Foto di gruppo GIO 2023"
            />
          </div>
        </section>

        <!-- Subscribe section -->
        <section
          class="subscribe-section"
          :class="{
            'has-content': activeSection !== '',
            'content-year': activeSection === 'year',
            'content-month': activeSection === 'month',
            'content-members': activeSection === 'members',
          }"
        >
          <div class="subscribe-container">
            <div class="subscribe-box">
              <div class="subscribe-text">
                <div class="subscribe-title">
                  <h2>Diventare socio del GIO</h2>
                </div>
                <p class="bottom-paragraph">
                  Associarsi al Gruppo Insubrico di Ornitologia significa
                  sentirsi parte attiva di un gruppo di amici realmente
                  appassionati di avifauna, sotto i variegati aspetti che
                  spaziano dal birdwatching all'ornitologia vera e propria.
                  <br /><br />
                  Punto centrale e irrinunciabile dello spirito
                  dell'associazione è quello di promuovere la conoscenza e la
                  conservazione della fauna e degli habitat, che rientrano negli
                  aspetti più generali del rispetto della vita che ci circonda e
                  del miglioramento della qualità dell'ambiente in cui viviamo.
                  <br /><br />
                  Se siete curiosi e avete voglia di scoprire, studiare,
                  condividere, dedicarvi ai monitoraggi e censimenti, e anche
                  alla didattica dell'ornitologia, il GIO è l'associazione che
                  fa per voi!
                </p>
              </div>

              <hr class="third-line" />

              <!-- Buttons container - Desktop -->
              <div class="details-container desktop-only">
                <div ref="selectionBarRef" class="selection-bar">
                  <!-- First card -->
                  <div
                    class="selector uppercase"
                    :class="{ highlight: activeSection === 'year' }"
                  >
                    <p class="number">1</p>
                    <p>iscrizione</p>
                    <p>annuale</p>
                    <hr />
                    <div class="find-out-more-container">
                      <p class="find-out-more">Scopri di più</p>
                      <button @click="toggleSection('year')">
                        <img src="~/assets/images/chevron-right.svg" alt="" />
                      </button>
                    </div>
                  </div>

                  <!-- Second card -->
                  <div
                    class="selector uppercase"
                    :class="{ highlight: activeSection === 'month' }"
                  >
                    <p class="number">2</p>
                    <p>riunioni</p>
                    <p>mensili</p>
                    <hr />
                    <div class="find-out-more-container">
                      <p class="find-out-more">Scopri di più</p>
                      <button @click="toggleSection('month')">
                        <img src="~/assets/images/chevron-right.svg" alt="" />
                      </button>
                    </div>
                  </div>

                  <!-- Third card -->
                  <div
                    class="selector uppercase"
                    :class="{ highlight: activeSection === 'members' }"
                  >
                    <p class="number">3</p>
                    <p>comunicazioni</p>
                    <p>tra soci</p>
                    <hr />
                    <div class="find-out-more-container">
                      <p class="find-out-more">Scopri di più</p>
                      <button @click="toggleSection('members')">
                        <img src="~/assets/images/chevron-right.svg" alt="" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Contenitore testi con sfondo azzurro -->
                <div
                  ref="textContentRef"
                  class="text-content-wrapper"
                  :class="{ active: activeSection !== '' }"
                >
                  <!-- Yearly subscription -->
                  <div
                    class="choice-bottom-paragraph"
                    :class="{ show: activeSection === 'year' }"
                  >
                    <h3>ISCRIZIONE ANNUALE</h3>
                    <p>
                      Chiunque condivida gli scopi della nostra associazione e
                      abbia un po' di tempo libero da dedicare a questa
                      particolare forma di "volontariato di ricerca", o voglia
                      comunque sostenere il GIO, può iscriversi pagando una
                      quota annuale di 20 euro (10 euro per minorenni e
                      studenti).
                      <br /><br />
                      La quota di iscrizione comprende l'assicurazione
                      "responsabilità civile" obbligatoria per le onlus.
                      All'iscrizione il GIO rilascia una tessera, con il
                      "bollino" di validità dell'anno in corso, a cui si
                      aggiungeranno i successivi bollini annuali adesivi.
                    </p>
                  </div>

                  <!-- Monthly meetings -->
                  <div
                    class="choice-bottom-paragraph"
                    :class="{ show: activeSection === 'month' }"
                  >
                    <h3>RIUNIONI MENSILI</h3>
                    <p>
                      Ci riuniamo il secondo lunedì di ogni mese (escluso
                      agosto, di solito) in un locale presso il Comune di
                      Casciago (VA), dove ci aggiorniamo sui progetti in corso,
                      proponiamo e organizziamo iniziative con un "ordine del
                      giorno" che viene mandato dal Presidente tempestivamente
                      per mail a tutti i soci, che possono proporre ulteriori
                      argomenti o apportare modifiche.
                      <br /><br />
                      Gli incontri ufficiali (come l'assemblea annuale) vengono
                      invece tenuti presso la nostra sede al Civico Museo
                      Insubrico di Storia Naturale a Clivio (VA).
                      <br /><br />
                      Le riunioni mensili sono incontri informali in cui ci si
                      confronta anche su osservazioni ornitologiche, viaggi
                      naturalistici, commenti e visione di pubblicazioni e
                      fotografie ecc.
                    </p>
                  </div>

                  <!-- Members communications -->
                  <div
                    class="choice-bottom-paragraph"
                    :class="{ show: activeSection === 'members' }"
                  >
                    <h3>COMUNICAZIONI TRA SOCI</h3>
                    <p>
                      Tutti i soci sono compresi nella mailing-list del GIO,
                      attraverso cui si viene informati dell'intera attività del
                      gruppo. Alcuni argomenti, di solito quelli più formali e
                      amministrativi, vengono trattati dal Consiglio Direttivo,
                      che ne informa quindi il resto dei soci in occasione delle
                      riunioni mensili.
                      <br /><br />
                      Abbiamo anche un Tesoriere e un Vice-tesoriere che si
                      occupano delle questioni finanziarie come le entrate e le
                      uscite, il rendiconto economico, i rimborsi spese e
                      acquisti vari.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Buttons container - Tablet/Mobile -->
              <div class="details-container tablet-mobile-only">
                <div class="selection-bar">
                  <button
                    class="selector uppercase"
                    :class="{ highlight: activeSection === 'year' }"
                    @click="displayModal('year')"
                  >
                    <span>iscrizione annuale</span>
                  </button>

                  <button
                    class="selector uppercase"
                    :class="{ highlight: activeSection === 'month' }"
                    @click="displayModal('month')"
                  >
                    <span>riunioni mensili</span>
                  </button>

                  <button
                    class="selector uppercase"
                    :class="{ highlight: activeSection === 'members' }"
                    @click="displayModal('members')"
                  >
                    <span>comunicazioni tra soci</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Modal per tablet -->
        <div class="modal-overlay" :class="{ active: isModalOpen }">
          <div class="modal-content">
            <button class="modal-close" @click="closeModal">
              <span>&times;</span>
            </button>

            <!-- Yearly subscription -->
            <div v-if="activeSection === 'year'" class="modal-body">
              <h3>ISCRIZIONE ANNUALE</h3>
              <p>
                Chiunque condivida gli scopi della nostra associazione e abbia
                un po' di tempo libero da dedicare a questa particolare forma di
                "volontariato di ricerca", o voglia comunque sostenere il GIO,
                può iscriversi pagando una quota annuale di 20 euro (10 euro per
                minorenni e studenti).
                <br /><br />
                La quota di iscrizione comprende l'assicurazione "responsabilità
                civile" obbligatoria per le onlus. All'iscrizione il GIO
                rilascia una tessera, con il "bollino" di validità dell'anno in
                corso, a cui si aggiungeranno i successivi bollini annuali
                adesivi.
              </p>
            </div>

            <!-- Monthly meetings -->
            <div v-if="activeSection === 'month'" class="modal-body">
              <h3>RIUNIONI MENSILI</h3>
              <p>
                Ci riuniamo il secondo lunedì di ogni mese (escluso agosto, di
                solito) in un locale presso il Comune di Casciago (VA), dove ci
                aggiorniamo sui progetti in corso, proponiamo e organizziamo
                iniziative con un "ordine del giorno" che viene mandato dal
                Presidente tempestivamente per mail a tutti i soci, che possono
                proporre ulteriori argomenti o apportare modifiche.
                <br /><br />
                Gli incontri ufficiali (come l'assemblea annuale) vengono invece
                tenuti presso la nostra sede al Civico Museo Insubrico di Storia
                Naturale a Clivio (VA).
                <br /><br />
                Le riunioni mensili sono incontri informali in cui ci si
                confronta anche su osservazioni ornitologiche, viaggi
                naturalistici, commenti e visione di pubblicazioni e fotografie
                ecc.
              </p>
            </div>

            <!-- Members communications -->
            <div v-if="activeSection === 'members'" class="modal-body">
              <h3>COMUNICAZIONI TRA SOCI</h3>
              <p>
                Tutti i soci sono compresi nella mailing-list del GIO,
                attraverso cui si viene informati dell'intera attività del
                gruppo. Alcuni argomenti, di solito quelli più formali e
                amministrativi, vengono trattati dal Consiglio Direttivo, che ne
                informa quindi il resto dei soci in occasione delle riunioni
                mensili.
                <br /><br />
                Abbiamo anche un Tesoriere e un Vice-tesoriere che si occupano
                delle questioni finanziarie come le entrate e le uscite, il
                rendiconto economico, i rimborsi spese e acquisti vari.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  cursor: pointer;
}

.first-paragraph,
.second-paragraph,
.bottom-paragraph {
  line-height: 1.65rem;
}

.first-line,
.second-line,
.third-line {
  position: relative;
  border: none;
}

// Jumbo section
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
    background: url(/assets/images/jumbo.webp) center/cover no-repeat;

    .title {
      text-align: center;
      padding-top: 10rem;
    }
  }
}
// END jumbo section

// Description section
.article-container {
  width: 95%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  .paragraphs-container {
    width: 95%;
    transition: width 0.4s ease;

    .first-paragraph {
      width: 70%;
      padding: 1rem 0 2.3rem 2rem;
    }

    .second-paragraph-container {
      width: 100%;
      justify-content: end;
      margin-bottom: 4rem;
      padding: 4rem 2rem 0rem 0rem;

      .second-paragraph {
        width: 70%;
      }
    }

    .first-line,
    .second-line {
      border-top: 2px solid rgb(141, 141, 141);
    }

    .first-line {
      left: -20%;
      width: 40%;
    }

    .second-line {
      left: 0%;
      width: 50%;
    }
  }

  // Button per aprire panel direttivo
  .button-container {
    position: absolute;
    right: 0;
    top: 35%;
    transform: translateY(-50%);
    z-index: 100;
    transition: right 0.4s ease;

    &.panel-open {
      right: 380px;
    }

    .half-circle {
      width: 50px;
      height: 80px;
      border-radius: 60px 0 0 60px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 3px;

      .toggle-btn {
        width: 30px;
        height: 50px;
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        .toggle-icon {
          width: 18px;
          height: 14px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;

          .bar {
            width: 100%;
            height: 2px;
            background: white;
            border-radius: 1px;
            transition: all 0.3s ease;
          }

          .bar1.active {
            transform: rotate(45deg) translateY(4px);
          }

          .bar2.active {
            transform: rotate(-45deg) translateY(-4px);
          }
        }
      }
    }
  }

  // Panel direttivo
  .right-container {
    position: absolute;
    right: -400px;
    top: 0;
    width: 380px;
    height: 100%;
    padding: 2rem;
    transition: right 0.4s ease;
    overflow-y: auto;
    z-index: 99;
    border-radius: 5%;

    &.active {
      right: 0;
    }

    .list-container {
      h2 {
        font-size: 1.4rem;
        margin-bottom: 1.5rem;
        color: white;
        text-align: center;
      }

      .list {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);

        h4 {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.5rem;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            color: white;
            font-size: 1.1rem;
            padding: 0.2rem 0;
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
// END description section

// Team image section
.team-container {
  width: 100%;
  text-align: center;
  margin-top: 3rem;

  .team-image {
    width: 100%;

    img {
      width: 60%;
    }
  }
}
// END team image section

// Subscribe section
.subscribe-section {
  min-height: 105vh;
  margin-top: 3rem;
  position: relative;
  padding-top: 12rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  transition: min-height 0.5s ease;

  background-image:
    linear-gradient(90deg, #0077ffd9, #e9e9e9d9),
    url(../assets/images/gruppo-angera.webp);

  &::after {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 150px;
    background: #ffffff;
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }

  .subscribe-container {
    width: 70%;
    margin: 0 auto;

    .bottom-paragraph {
      font-size: 1.2rem;
    }

    .subscribe-title {
      text-align: center;
      padding-bottom: 2rem;

      h2 {
        font-size: 2.5rem;
      }
    }
  }

  .third-line {
    left: 20%;
    width: 50%;
    margin-top: 3rem;
    border-top: 2px solid rgb(0, 0, 0);
  }

  // Desktop version
  .details-container.desktop-only {
    width: 100%;
    margin: 0 auto;
    padding-top: 5rem;

    .selection-bar {
      display: flex;
      justify-content: center;

      .selector {
        font-size: 1.2rem;
        padding: 1rem 2rem;
        margin-left: 2rem;
        border: 1px solid black;
        border-radius: 0.7rem;
        transition: all 0.8s;
        // background: linear-gradient(90deg, #d2420d, #ffbf00);
        background: linear-gradient(90deg, #ffffff, #0d59d2);

        hr {
          border: none;
          margin-top: 5rem;
          margin-bottom: 1.5rem;
          border-top: 1px solid black;
        }

        .number {
          margin-bottom: 1rem;
          font-size: 4rem;
          text-align: start;
          font-style: italic;
          color: rgba(82, 82, 82, 0.9);
        }

        .find-out-more-container {
          display: flex;
          align-items: center;
          padding-bottom: 1rem;

          img {
            width: 100%;
            transition: transform 0.6s;

            &:hover {
              transform: scale(1.2);
            }
          }

          .find-out-more {
            font-size: 1rem;
            margin-left: 0;
            text-transform: none;
          }
        }

        button {
          width: 12%;
          padding: 0;
          border: none;
          margin-right: 0;
          border-radius: 50%;
          background-color: unset;
        }

        &.highlight {
          transform: translate(10px, -10px);
          background: rgb(241, 241, 135) !important;
          box-shadow: -10px 10px rgba(80, 80, 80, 0.7);
        }

        &:hover {
          background: beige;
          transform: translate(10px, -10px);
          box-shadow: -10px 10px rgba(80, 80, 80, 0.7);
        }
      }
    }

    // Wrapper per i testi con sfondo azzurro
    .text-content-wrapper {
      margin-top: 3rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 0;
      padding: 0;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: all 0.5s ease;
      border-bottom: 1px solid black;

      // Full width breakout
      width: 100vw;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      &.active {
        padding: 2rem 2.5rem;
        max-height: 800px;
        opacity: 1;
      }

      .choice-bottom-paragraph {
        display: none;
        text-align: center;

        &.show {
          display: block;
          animation: fadeIn 0.4s ease;
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: rgb(0, 0, 0);
        }

        p {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(0, 0, 0, 0.95);
        }
      }
    }
  }

  // Tablet/Mobile version - nascosta su desktop
  .details-container.tablet-mobile-only {
    display: none;
  }
}
// END subscribe section

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Scrollbar del panel
.article-container {
  .right-container::-webkit-scrollbar {
    width: 8px;
  }

  .right-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  .right-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}

// Fade transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Modal nascosto su desktop
.modal-overlay {
  display: none;
}

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
  .col {
    .article-container {
      .paragraphs-container {
        width: 100%;

        .first-paragraph {
          width: 90%;
        }

        .first-line {
          left: 0;
          width: 75%;
        }
      }
    }

    .team-container {
      .team-image img {
        width: 80%;
      }
    }

    .subscribe-section {
      min-height: auto;
      padding-bottom: 8rem;

      .subscribe-container {
        .subscribe-box {
          .third-line {
            left: 0;
            width: 100%;
          }

          // Nascondo la versione desktop
          .details-container.desktop-only {
            display: none;
          }

          // Mostro la versione tablet/mobile
          .details-container.tablet-mobile-only {
            display: block;
            width: 65%;
            margin: 0 auto;
            padding-top: 5rem;

            .selection-bar {
              display: flex;
              flex-direction: column;
              align-items: center;

              .selector {
                width: 100%;
                margin-left: 0;
                margin-bottom: 1.5rem;
                padding: 1rem 2rem;
                border: none;
                border-radius: 0.3rem;
                transition: all 0.3s;
                // background: linear-gradient(90deg, #d2420d, #ffbf00);
                background: linear-gradient(90deg, #ffffff, #0d59d2);

                p {
                  font-size: 1.3rem;
                }

                &.highlight {
                  background: rgb(241, 241, 135) !important;
                }

                // &:hover {
                //   background: linear-gradient(90deg, #d2420d, #ffbf00);
                // }
              }
            }
          }
        }
      }
    }
  }

  // Modal styles per tablet
  .modal-overlay {
    display: flex;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

  .modal-content {
    position: relative;
    background: white;
    width: 85%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 1rem;
    padding: 2.5rem 2rem;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    transform: translateY(20px);
    transition: transform 0.3s ease;

    .active & {
      transform: translateY(0);
    }
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    span {
      font-size: 2.5rem;
      line-height: 1;
      color: #333;
    }

    &:hover {
      transform: scale(1.1);

      span {
        color: #d2420d;
      }
    }
  }

  .modal-body {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      color: #333;
      text-align: center;
    }

    p {
      font-size: 1rem;
      line-height: 1.7;
      color: #444;
    }
  }
}

// ==========================================
// MEDIA QUERIES - MOBILE
// ==========================================
@media (max-width: 576px) {
  .col {
    .subscribe-section {
      .subscribe-container {
        width: 90%;

        .subscribe-box {
          .details-container.tablet-mobile-only {
            width: 90%;
          }
        }
      }
    }
  }
}
</style>
