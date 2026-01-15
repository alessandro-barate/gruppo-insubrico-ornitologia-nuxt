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

// Toggle panel direttivo
const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};

// Mostra/nascondi sezioni iscrizione
const display = (section: string) => {
  activeSection.value = section;
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Title -->
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
            <div class="half-circle">
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
            class="right-container gradient-color"
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
        <section class="subscribe-section">
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

              <!-- Buttons container -->
              <div class="details-container">
                <div class="selection-bar">
                  <button
                    class="selector uppercase"
                    :class="{ highlight: activeSection === 'year' }"
                    @click="display('year')"
                  >
                    <span>iscrizione annuale</span>
                  </button>

                  <button
                    class="selector uppercase"
                    :class="{ highlight: activeSection === 'month' }"
                    @click="display('month')"
                  >
                    <span>riunioni mensili</span>
                  </button>

                  <button
                    class="selector uppercase"
                    :class="{ highlight: activeSection === 'members' }"
                    @click="display('members')"
                  >
                    <span>comunicazioni tra soci</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom paragraph -->
          <div class="subscribe-text-bottom">
            <!-- Yearly subscription -->
            <div
              class="choice-bottom-paragraph"
              :class="{ show: activeSection === 'year' }"
            >
              <h3>ISCRIZIONE ANNUALE</h3>
              <p>
                Chiunque condivida gli scopi della nostra associazione e abbia
                un po’ di tempo libero da dedicare a questa particolare forma di
                “volontariato di ricerca”, o voglia comunque sostenere il GIO,
                può iscriversi pagando una quota annuale di 20 euro (10 euro per
                minorenni e studenti).
                <br />
                <br />
                La quota di iscrizione comprende l’assicurazione “responsabilità
                civile” obbligatoria per le onlus. All’iscrizione il GIO
                rilascia una tessera, con il “bollino” di validità dell’anno in
                corso, a cui si aggiungeranno i successivi bollini annuali
                adesivi.
              </p>
            </div>

            <!-- Monthly meetings -->
            <div
              class="choice-bottom-paragraph"
              :class="{ show: activeSection === 'month' }"
            >
              <h3>RIUNIONI MENSILI</h3>
              <p>
                Ci riuniamo il secondo lunedì di ogni mese (escluso agosto, di
                solito) in un locale presso il Comune di Casciago (VA), dove ci
                aggiorniamo sui progetti in corso, proponiamo e organizziamo
                iniziative con un "ordine del giorno" che viene mandato dal
                Presidente tempestivamente per mail a tutti i soci, che possono
                proporre ulteriori argomenti o apportare modifiche.
                <br />
                <br />
                Gli incontri ufficiali (come l'assemblea annuale) vengono invece
                tenuti presso la nostra sede al Civico Museo Insubrico di Storia
                Naturale a Clivio (VA).
                <br />
                <br />
                Le riunioni mensili sono incontri informali in cui ci si
                confronta anche su osservazioni ornitologiche, viaggi
                naturalistici, commenti e visione di pubblicazioni e fotografie
                ecc.
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
                attraverso cui si viene informati dell’intera attività del
                gruppo. Alcuni argomenti, di solito quelli più formali e
                amministrativi, vengono trattati dal Consiglio Direttivo, che ne
                informa quindi il resto dei soci in occasione delle riunioni
                mensili.
                <br />
                <br />
                Abbiamo anche un Tesoriere e un Vice-tesoriere che si occupano
                delle questioni finanziarie come le entrate e le uscite, il
                rendiconto economico, i rimborsi spese e acquisti vari.
              </p>
            </div>
          </div>
        </section>
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
      width: 30%;
      left: 15rem;
    }

    .second-line {
      width: 10%;
      left: 60rem;
    }

    .team-image {
      width: 100%;
      text-align: center;

      img {
        width: 70%;
      }
    }
  }

  .button-container {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    align-items: center;
    background-color: transparent;
    transition: right 1s ease;
    z-index: 100;

    &.panel-open {
      right: 400px;
    }

    .half-circle {
      width: 80px;
      height: 6rem;
      border-radius: 50% 0 0 50%;
    }

    .toggle-btn {
      font-size: 2rem;
      height: 6rem;
      width: 100%;
      border: none;
      border-radius: 50% 0 0 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #0077ff;

      .toggle-icon {
        position: relative;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.5s ease-in-out;

        &:hover {
          transform: scale(1.1);
        }
      }

      .bar {
        position: absolute;
        width: 3px;
        height: 45px;
        background-color: rgb(0, 0, 0);
        transition: all 1s ease;
      }

      .bar1 {
        left: 8px;

        &.active {
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
        }
      }

      .bar2 {
        right: 8px;

        &.active {
          right: 50%;
          transform: translateX(50%) rotate(-45deg);
        }
      }
    }
  }

  .right-container {
    position: absolute;
    right: -380px;
    top: 0;
    width: 400px;
    height: 100%;
    border-top-left-radius: 1.3rem;
    border-bottom-left-radius: 1.3rem;
    padding: 2rem 2rem;
    overflow-y: auto;
    transition: right 1s ease;
    z-index: 99;
    color: rgb(0, 0, 0);

    &.active {
      right: 0;
    }

    .list-container {
      h2 {
        font-size: 1.8rem;
        margin-bottom: 2rem;
        font-weight: 300;
      }

      .list {
        margin-bottom: 2rem;

        h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        ul {
          list-style: none;
          padding-left: 0;

          li {
            padding: 0.3rem 0;
            font-size: 1rem;
            color: rgba(0, 0, 0, 0.9);
            border-bottom: 1px solid rgba(0, 0, 0, 0.6);

            &:last-child {
              border-bottom: none;
            }
          }
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
  height: 140vh;
  margin-top: 3rem;
  position: relative;
  padding-top: 12rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  background-image: linear-gradient(90deg, #0077ffd9, #e9e9e9d9),
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

  .details-container {
    width: 80%;
    margin: 0 auto;
    padding-top: 5rem;

    .selection-bar {
      display: flex;
      justify-content: center;

      .selector {
        padding: 1rem 2rem;
        margin-left: 0.5rem;
        border: none;
        border-radius: 0.3rem;
        transition: all 1s;
        background: linear-gradient(90deg, #d2420d, #ffbf00);

        &.highlight {
          background: rgb(241, 241, 135) !important;
        }

        &:hover {
          background: beige;
        }
      }
    }
  }

  .subscribe-text-bottom {
    width: 100%;
    text-align: center;
    position: relative;
    margin: 0 auto;

    .choice-bottom-paragraph {
      position: absolute;
      line-height: 1.65rem;
      left: 50%;
      transform: translateX(-50%);
      width: 70%;
      margin-top: 4rem;
      padding-left: 2rem;
      padding-right: 2rem;
      border-left: 2px solid black;

      opacity: 0;
      max-height: 0;
      overflow: hidden;
      transition: all 0.6s ease-in-out;

      &.show {
        opacity: 1;
        max-height: 1000px;
      }

      h3 {
        font-size: 1.5rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.15rem;
      }
    }
  }
}
// END subscribe section

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

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
}

// ==========================================
// MEDIA QUERIES - MOBILE
// ==========================================
@media (max-width: 576px) {
}
</style>
