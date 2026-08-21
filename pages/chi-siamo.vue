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

// Toggle sezione iscrizione (per desktop - toggle on/off)
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
  // Caso 2: apertura da zero → scroll + poi mostra contenuto
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
    { threshold: 0.7 },
  );

  // Elementi da osservare
  const items = document.querySelectorAll<HTMLElement>(
    ".first-paragraph, .second-paragraph",
  );

  items.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.2}s`;
    observer.observe(el);
  });
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Jumbo -->
        <section class="title-section jumbo-bg">
          <div class="title uppercase">
            <h1 id="about-us">chi siamo</h1>
          </div>
        </section>

        <!-- Articles section -->
        <section class="article-container d-flex">
          <!-- Article section -->
          <article class="paragraphs-container">
            <!-- First paragraph -->
            <p class="first-paragraph">
              <strong>Il Gruppo Insubrico di Ornitologia (G.I.O.)</strong> si
              forma nel <strong>1999</strong> per iniziativa di Piero Alberti,
              Walter Guenzani e Fabio Saporetti presso il
              <strong
                >Civico Museo Insubrico di Storia Naturale di Induno
                Olona</strong
              >, grazie all&rsquo;&nbsp;ospitalit&agrave; offerta dal Curatore
              Gianluca Danini.
              <br />
              Nel <strong>dicembre 2009</strong> il G.I.O., per volont&agrave;
              di 9 soci fondatori, si costituisce come
              <strong>Onlus</strong> presso il Registro di Varese, spostandosi
              da Induno Olona a <strong>Clivio</strong>,
              nell&rsquo;&nbsp;edificio che diverr&agrave; la sede del nuovo
              Museo Civico di Storia Naturale di Clivio e Induno Olona.
            </p>

            <hr class="break-line" />

            <!-- Second paragraph -->
            <div class="second-paragraph-container d-flex">
              <p class="second-paragraph">
                Per il periodo 2010-2012 viene eletto il
                <strong>primo Consiglio Direttivo</strong> con
                <strong>Fabio Saporetti (Presidente)</strong>, Monica Carabella
                (Vice-Presidente) e 3 Consiglieri: Paolo Casali (poi sostituito
                da Andrea Vidolini), Silvio Colaone e Walter Guenzani.
                <br />
                Dal <strong>2022</strong> il G.I.O. &egrave; iscritto al
                <strong>Runts</strong> come
                <strong>Organizzazione di Volontariato (ODV)</strong> senza
                scopo di lucro. Dopo
                <strong>oltre 20 anni di attivit&agrave;</strong> conta
                <strong>pi&ugrave; di 80 soci</strong> ed &egrave;
                <strong
                  >l&rsquo;&nbsp;associazione di riferimento per
                  l&rsquo;&nbsp;ornitologia dell&rsquo;&nbsp;area
                  varesina</strong
                >
                e ha tuttora <strong>sede ufficiale</strong> presso il
                <strong
                  >Civico Museo Insubrico di Storia Naturale di Clivio e Induno
                  Olona</strong
                >.
              </p>
            </div>

            <hr class="break-line" />

            <!-- Third paragraph -->
            <div class="second-paragraph-container d-flex">
              <p class="second-paragraph">
                Scopo principale dell&rsquo;&nbsp;associazione &egrave; quello
                di
                <strong>promuovere l&rsquo;&nbsp;indagine ornitologica</strong>
                a livello provinciale ed insubrico, unitamente ad
                <strong>attivit&agrave; di divulgazione</strong> con
                l&rsquo;&nbsp;organizzazione di
                <strong>conferenze, corsi didattici e convegni</strong>. Si
                occupa di
                <strong
                  >censimenti, monitoraggi, studi ecologici, pubblicazioni
                  scientifiche e divulgative</strong
                >
                sull&rsquo;&nbsp;avifauna e
                <strong
                  >collabora regolarmente con enti pubblici e privati e
                  istituzioni territoriali</strong
                >, tra cui la Provincia di Varese,
                l&rsquo;&nbsp;Universit&agrave; degli Studi
                dell&rsquo;&nbsp;Insubria, le Comunit&agrave; Montane del
                Verbano e del Piambello.
              </p>
            </div>
          </article>

          <!-- Button-container per panel -->
          <div
            class="button-container d-flex"
            :class="{ 'panel-open': isPanelOpen }"
          >
            <div class="half-circle bg-blue">
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
          <div class="right-container bg-blue" :class="{ active: isPanelOpen }">
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
              src="~/assets/images/chi-siamo/gruppo-gio-2023.jpg"
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
          }"
        >
          <div class="subscribe-container">
            <div class="subscribe-box">
              <!-- Buttons container - Desktop -->
              <div class="details-container desktop-only">
                <div ref="selectionBarRef" class="selection-bar">
                  <!-- Card diventare soci -->
                  <div
                    class="activity-card card-1 d-flex uppercase"
                    :class="{ highlight: activeSection === 'year' }"
                    @click="toggleSection('year')"
                  >
                    <div class="card-default d-flex">
                      <span class="bg-blue">diventa socio del g.i.o.</span>
                    </div>
                    <div class="card-hover bg-blue">
                      <img
                        src="~/assets/images/activities-section/arrow-right-white.svg"
                        alt="Freccia rivolta a destra che permette di cliccare un bottone che apre la sezione che spiega come diventari soci del G.I.O."
                      />
                      <p>scopri di più</p>
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
                    <h3>Diventa socio del Gruppo Insubrico di Ornitologia</h3>
                    <p>
                      Associarsi al
                      <strong>Gruppo Insubrico di Ornitologia</strong> significa
                      sentirsi parte attiva di un gruppo di amici realmente
                      appassionati di avifauna, sotto i variegati aspetti che
                      spaziano dal
                      <strong>birdwatching all&rsquo;ornitologia</strong> vera e
                      propria.<br />Punto centrale e irrinunciabile dello
                      spirito dell&rsquo;associazione &egrave; quello di
                      <strong
                        >promuovere la conoscenza e la conservazione
                        dell&rsquo;avifauna e degli habitat naturali</strong
                      >, che rientrano negli aspetti pi&ugrave; generali del
                      rispetto della vita che ci circonda e del miglioramento
                      della qualit&agrave; dell&rsquo;ambiente in cui viviamo.
                      <br />Se siete curiosi e avete voglia di scoprire,
                      studiare, condividere, dedicarvi ai
                      <strong>monitoraggi e censimenti</strong>, e anche alla
                      <strong>didattica</strong> dell&rsquo;ornitologia, il
                      G.I.O. &egrave; l&rsquo;associazione che fa per voi.
                      <br /><br />
                    </p>
                    <h3>iscrizione annuale</h3>
                    <p>
                      Chiunque condivida gli scopi della nostra associazione e
                      abbia un po&rsquo; di tempo libero da dedicare a questa
                      particolare forma di &ldquo;volontariato di
                      ricerca&rdquo;, o voglia comunque sostenere il G.I.O.,
                      pu&ograve; iscriversi pagando una
                      <strong>quota annuale</strong>. La quota di iscrizione
                      comprende
                      <strong
                        >l&rsquo;assicurazione &ldquo;responsabilit&agrave;
                        civile&rdquo;</strong
                      >
                      obbligatoria per le onlus. All&rsquo;iscrizione il G.I.O.
                      rilascia una <strong>tessera socio</strong>, con il
                      &ldquo;bollino&rdquo; di validit&agrave; dell&rsquo;anno
                      in corso, a cui si aggiungeranno i successivi bollini
                      annuali adesivi.
                    </p>
                    <br /><br />
                    <h3>riunioni mensili</h3>
                    <p>
                      Ci riuniamo il
                      <strong>secondo luned&igrave; di ogni mese</strong> presso
                      la
                      <strong
                        >Biblioteca Comunale del Comune di Gazzada Schianno
                        (VA)</strong
                      >
                      per condividere aggiornamenti sui progetti in corso,&nbsp;
                      idee e nuove iniziative con un ordine del giorno, che
                      viene mandato dal Presidente per mail ai soci, che possono
                      proporre ulteriori argomenti o apportare modifiche.&nbsp;
                      Le <strong>assemblee ufficiali</strong> (come
                      l&rsquo;assemblea annuale) si svolgono invece presso la
                      nostra sede al
                      <strong
                        >Civico Museo Insubrico di Storia Naturale a Clivio
                        (VA)</strong
                      >. <br /><br />Le riunioni mensili sono
                      <strong>incontri informali</strong> in cui ci si confronta
                      anche su osservazioni ornitologiche, viaggi naturalistici,
                      commenti e visione di pubblicazioni e fotografie ecc.
                    </p>
                    <br /><br />
                    <h3>comunicazioni tra i soci</h3>
                    <p>
                      I soci sono compresi nella
                      <strong>mailing-list</strong> del G.I.O. e possono entrare
                      a far parte del <strong>gruppo WhatsApp dei soci</strong>,
                      attraverso cui si viene informati dell&rsquo;intera
                      attivit&agrave; del gruppo. Alcuni argomenti, di solito
                      quelli pi&ugrave; formali e amministrativi, vengono
                      trattati dal Consiglio Direttivo, che ne informa quindi il
                      resto dei soci in occasione delle riunioni mensili.
                      Abbiamo anche un Tesoriere e un Vice-tesoriere che si
                      occupano delle questioni finanziarie (entrate e uscite,
                      rendiconto economico, rimborsi spese, acquisti vari).
                    </p>
                    <br /><br />
                    <h3>donazioni</h3>
                    <p>
                      Privati, enti e istituzioni possono contribuire al
                      finanziamento delle nostre attivit&agrave; di ricerca,
                      divulgazione e organizzazione di eventi specifici con una
                      <strong>donazione al G.I.O.</strong>, godendo dei
                      <strong>benefici fiscali di legge</strong>. <br /><br />
                      Per informazioni scrivere una mail alla segreteria usando
                      il <NuxtLink to="/form">form di contatto</NuxtLink>.
                    </p>
                    <br /><br />
                    <h3>modulo di iscrizione</h3>
                    <p>
                      Vuoi unirti a noi?
                      <NuxtLink to="/module">Clicca il link</NuxtLink> e compila
                      il modulo.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Buttons container - Tablet/Mobile -->
              <div class="details-container tablet-mobile-only">
                <div class="selection-bar">
                  <div
                    class="activity-card card-1 d-flex uppercase"
                    @click="displayModal('year')"
                  >
                    <div class="card-default d-flex">
                      <span class="bg-blue">diventare soci del g.i.o.</span>
                    </div>
                  </div>
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

.break-line {
  position: relative;
  border: none;
  width: 40%;
  border-top: 1px solid rgb(141, 141, 141);
}

// Jumbo section
.col {
  .title-section {
    position: relative;
    width: 100%;
    height: 700px;
    overflow: hidden;
    margin-bottom: 3rem;

    .overlay {
      height: 100%;
    }
  }

  .jumbo-bg {
    background: url(/assets/images/chi-siamo/jumbo.webp) center/cover no-repeat;

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

    .first-paragraph,
    .second-paragraph {
      opacity: 0;
      margin-top: 0;
      transform: translateY(-50px);
      transition:
        opacity 0.6s ease,
        transform 0.6s ease;

      @media (max-width: 576px) {
        margin: 0 auto;
        margin-bottom: 2rem;
      }

      &.visible {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .first-paragraph {
      width: 70%;
      padding: 2rem 2rem 2.3rem 2rem;
    }

    .second-paragraph-container {
      width: 100%;
      justify-content: end;
      margin-bottom: 4rem;
      padding: 4rem 2rem 0rem 2rem;

      .second-paragraph {
        width: 70%;
      }
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
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.5rem;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            color: white;
            font-size: 1rem;
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
  padding-top: 17rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  transition: min-height 0.5s ease;

  background-image:
    linear-gradient(90deg, #233162, #233162b6),
    url(../assets/images/chi-siamo/aironi-bianchi.webp);

  &::after {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 150px;
    background: #ebf2fc;
    clip-path: polygon(0 0, 100% 0, 0 100%);

    @media (max-width: 576px) {
      height: 90px;
    }
  }

  .subscribe-container {
    width: 70%;
    margin: 0 auto;

    .bottom-paragraph {
      font-size: 1.2rem;
    }
  }

  .break-line {
    width: 50%;
    margin-top: 3rem;
    border-top: 1px solid rgb(0, 0, 0);
  }

  // Desktop version
  .details-container.desktop-only {
    width: 100%;
    margin: 0 auto;
    padding-top: 5rem;

    .selection-bar {
      display: flex;
      justify-content: center;

      // Card con lo stesso stile delle activity-card della home
      .activity-card {
        width: 300px;
        max-width: 80%;
        border-radius: 0.5rem;
        position: relative;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        cursor: pointer;
        container-type: inline-size;
        background-size: cover;
        background-position: center;
        background-image: url(../assets/images/chi-siamo/diventare-soci.webp);

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

        &:hover,
        &.highlight {
          .card-default {
            opacity: 0;
          }

          .card-hover {
            opacity: 1;
          }
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
        padding: 4rem 2.5rem 10rem 2.5rem;
        max-height: 1550px;
        opacity: 1;
      }

      .choice-bottom-paragraph {
        display: none;

        &.show {
          width: 60%;
          display: block;
          animation: fadeIn 0.4s ease;

          h3 {
            color: #333;
            text-align: center;
          }
        }

        h3 {
          text-transform: uppercase;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #333;
        }

        p {
          font-size: 1rem;
          line-height: 1.7;
          color: #333;
        }

        a {
          color: rgb(255, 60, 0);
          transition:
            color 0.4s ease-in-out,
            text-decoration 0.4s ease-in-out;

          &:hover {
            color: #233162;
            text-decoration: underline 2px solid rgb(0, 68, 255);
          }
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
          .break-line {
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

              .activity-card {
                width: 300px;
                max-width: 100%;
                border-radius: 0.5rem;
                position: relative;
                aspect-ratio: 1 / 1;
                overflow: hidden;
                cursor: pointer;
                container-type: inline-size;
                background-size: cover;
                background-position: center;
                background-image: url(../assets/images/activities-section/grid-1.webp);

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

                  span {
                    font-weight: 500;
                    width: 100%;
                    padding: 5%;
                    display: inline-block;
                    opacity: 0.9;
                    font-size: 9cqw;
                  }
                }

                // Su tablet/mobile la card resta nello stato default
                .card-hover {
                  display: none;
                }
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
      margin-bottom: 1rem;
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
