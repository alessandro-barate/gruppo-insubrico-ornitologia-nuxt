<script setup>
const showPrivacy = ref(false);
const showZoomedCard = ref(false);

// Email generation (anti-spam)
const openMail = () => {
  const user = "gruppoinsubricoornitologia";
  const domain = "gmail";
  const tld = "com";
  window.location.href = `mailto:${user}@${domain}.${tld}`;
};

// Modal controls
const openZoomedCard = () => {
  showZoomedCard.value = true;
  // Previene lo scroll della pagina quando la modal è aperta
  document.body.style.overflow = "hidden";
};

const closeZoomedCard = () => {
  showZoomedCard.value = false;
  // Ripristina lo scroll della pagina
  document.body.style.overflow = "";
};

// Gestione tasto ESC per chiudere la modal
const handleEscKey = (event) => {
  if (event.key === "Escape" && showZoomedCard.value) {
    closeZoomedCard();
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("keydown", handleEscKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscKey);
  // Assicura che lo scroll sia ripristinato se il componente viene smontato
  document.body.style.overflow = "";
});
</script>

<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="main-container">
            <!-- Details section -->
            <div class="details-container">
              <!-- Copyright container -->
              <div class="copyright-container">
                <p>Gruppo Insubrico di Ornitologia</p>
                <p>&copy; 2014</p>
              </div>

              <!-- Footer details columns -->
              <div class="footer-details">
                <!-- First column -->
                <div class="details-column">
                  <h3 class="uppercase">contatti</h3>
                  <p>
                    <a href="#" @click.prevent="openMail">Scrivici una mail</a>
                  </p>
                  <p>
                    <a
                      href="https://maps.app.goo.gl/G423vvUeF7CLoAFDA"
                      target="_blank"
                      >Dove siamo</a
                    >
                  </p>
                  <p class="fiscal-code">Codice Fiscale 95067870121</p>
                  <a
                    href="https://servizi.lavoro.gov.it/runts/it-it/Ricerca-enti"
                    target="_blank"
                    >ODV - RUNTS 89826 del 07.11.2022</a
                  >
                </div>

                <!-- Second column -->
                <div class="details-column">
                  <h3 class="uppercase">il gruppo</h3>
                  <p>
                    <a href="/documents/atto-costitutivo.pdf" target="_blank"
                      >Atto Costitutivo</a
                    >
                  </p>
                  <p>
                    <a href="/documents/statuto.pdf" target="_blank">Statuto</a>
                  </p>
                  <p>
                    <a
                      href="/documents/iscrizione-registro-volontariato.pdf"
                      target="_blank"
                    >
                      Iscrizione Registro Volontariato
                    </a>
                  </p>
                  <p>
                    <a href="#" @click.prevent="openZoomedCard">
                      Trasparenza sui Contributi Pubblici
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Overlay -->
    <Transition name="modal">
      <div v-if="showZoomedCard" class="modal-overlay" @click="closeZoomedCard">
        <div class="zoomed-card" @click.stop>
          <button class="close-button" @click="closeZoomedCard">
            <span>&times;</span>
          </button>
          <div class="card-content">
            <h2>Obbligo Legge 124/2017</h2>
            <p>
              Entro il 30 giugno di ogni anno, l'associazione è tenuta a
              pubblicare sul proprio sito l'elenco dei vantaggi economici
              (sovvenzioni, contributi, incarichi retribuiti) ricevuti da
              pubbliche amministrazioni se l'importo totale annuo è pari o
              superiore a <strong>10.000 euro</strong>.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </footer>
</template>

<style scoped lang="scss">
.col {
  width: 100%;
  background-size: cover;
  background-image: url(~/assets/images/footer/footer-image.jpg);

  .main-container {
    padding-top: 3rem;
    background-color: rgba(128, 128, 128, 0.9);

    .logo-box {
      display: flex;
      width: 100%;
      padding: 2rem;

      .logo-container {
        width: 100%;
        justify-content: center;

        img {
          width: 35%;
        }
      }
    }

    .details-container {
      display: flex;
      width: 95%;
      margin: 0 auto;
      padding-bottom: 3rem;
      border-radius: 0.5rem;

      .copyright-container {
        width: 30%;
        margin-top: 3rem;
        font-size: 1.1rem;
        padding-top: 3rem;
        padding-left: 2.5rem;
        border-top: 1px solid black;

        & p:last-child {
          font-size: 2rem;
          padding-top: 1rem;
        }
      }

      .footer-details {
        display: flex;
        width: 70%;
      }

      .details-column {
        margin-top: 3rem;
        text-align: center;
        width: 50%;
        color: black;
        border-top: 1px solid black;

        h3 {
          letter-spacing: 0.4rem;
          font-size: 1.5rem;
          padding-top: 3rem;
          margin-bottom: 4rem;
        }

        p {
          margin-bottom: 1.5rem;
        }

        a,
        .fiscal-code {
          transition:
            color 0.3s ease-in-out,
            text-decoration 0.6s ease-in-out;

          &:hover {
            color: bisque;
            text-underline-offset: 0.4rem;
            text-decoration: underline 2px solid bisque;
          }
        }
      }
    }
  }
}

// MEDIA QUERIES - TABLET
@media (max-width: 992px) {
  .col .main-container {
    .logo-box {
      .logo-container img {
        width: 64%;
      }
    }

    .details-container {
      flex-direction: column;
      align-items: center;

      .copyright-container {
        order: 1;
        width: 100%;
        padding: 2rem 0 0 0;
        margin-top: 2rem;
        text-align: center;
        border-top: 1px solid black;
      }

      .footer-details {
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
      }

      .details-column {
        width: 45%;
      }
    }
  }
}

// MEDIA QUERIES - MOBILE
@media (max-width: 576px) {
  .logo-container,
  .copyright-container {
    margin: 0 auto;
  }

  .logo-box .logo-container img,
  .copyright-container {
    width: 60%;
  }

  .col .main-container {
    .logo-box {
      .logo-container {
        display: none;
      }
    }

    .details-container {
      width: 90%;
      display: flex;
      flex-direction: column;

      .copyright-container {
        width: 100%;
        order: 3;
        margin-top: 3rem;
        padding-top: 3rem;
        padding-left: 0;
        text-align: center;
        border-top: 1px solid black;
      }

      .footer-details {
        flex-direction: column;
        width: 100%;
      }

      .details-column {
        width: 100%;
        text-align: end;
        padding-left: 1rem;

        h3 {
          text-align: start;
          margin-bottom: 2rem;
        }

        p {
          padding-right: 1rem;
        }
      }
    }
  }
}

// MODAL STYLES
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;

  .zoomed-card {
    position: relative;
    background-color: #031a8c;
    border: 2px solid #333;
    border-radius: 0.75rem;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      color: #fff;
      font-size: 2.5rem;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;

      &:hover {
        color: bisque;
        transform: rotate(90deg);
      }
    }

    .card-content {
      padding: 3rem 2.5rem 2.5rem 2.5rem;
      color: #fff;

      h2 {
        margin-bottom: 1.5rem;
        font-size: 1.8rem;
        color: bisque;
        text-align: center;
      }

      p {
        margin-bottom: 1rem;
        line-height: 1.6;
        font-size: 1rem;
        color: #ddd;
      }
    }
  }
}

// MODAL TRANSITIONS
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .zoomed-card {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .zoomed-card {
    transform: scale(0.8);
  }
}

// RESPONSIVE - MODAL
@media (max-width: 576px) {
  .modal-overlay {
    padding: 0.5rem;

    .zoomed-card {
      max-width: 100%;
      max-height: 90vh;

      .close-button {
        font-size: 2rem;
        width: 2rem;
        height: 2rem;
      }

      .card-content {
        padding: 2.5rem 1.5rem 1.5rem 1.5rem;

        h2 {
          font-size: 1.5rem;
        }

        p {
          font-size: 0.95rem;
        }
      }
    }
  }
}
</style>
