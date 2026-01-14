<script setup>
const showPrivacy = ref(false)

// Email generation (anti-spam)
const openMail = () => {
  const user = 'gruppoinsubricoornitologia'
  const domain = 'gmail'
  const tld = 'com'
  window.location.href = `mailto:${user}@${domain}.${tld}`
}
</script>

<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="main-container">
            <!-- Logo box -->
            <div class="logo-box">
              <div class="logo-container d-flex">
                <img
                  class="footer-logo"
                  src="~/assets/images/gio-logo.webp"
                  alt="Logo del Gruppo Insubrico di Ornitologia"
                />
              </div>
              <div class="logo-text">
                <h1>Gruppo Insubrico di Ornitologia</h1>
              </div>
            </div>

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
                    <a href="https://maps.app.goo.gl/eLrT1GPGxuw4QmLeA" target="_blank">Dove siamo</a>
                  </p>
                  <p>Codice Fiscale</p>
                  <p>ODV - RUNTS 89826 del 07.11.2022</p>
                </div>

                <!-- Second column -->
                <div class="details-column">
                  <h3 class="uppercase">il gruppo</h3>
                  <p>
                    <a href="/documents/atto-costitutivo.pdf" target="_blank">Atto Costitutivo</a>
                  </p>
                  <p>
                    <a href="/documents/statuto.pdf" target="_blank">Statuto</a>
                  </p>
                  <p>
                    <a href="/documents/iscrizione-registro-volontariato.pdf" target="_blank">
                      Iscrizione Registro Volontariato
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.col {
  width: 100%;
  background-size: cover;
  background-image: url(~/assets/images/footer-image.jpg);

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

      .logo-text {
        width: 100%;
        display: flex;
        text-align: center;
        align-items: center;

        h1 {
          font-size: 3.2rem;
        }
      }
    }

    .details-container {
      display: flex;
      width: 100%;
      margin: 0 auto;
      padding-bottom: 3rem;
      border-radius: 0.5rem;

      .copyright-container {
        width: 30%;
        font-size: 1.1rem;
        padding-top: 6rem;
        padding-left: 2.5rem;

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

        a {
          transition: color 0.3s ease-in-out, text-decoration 0.6s ease-in-out;

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
      .logo-container img { width: 64%; }
      .logo-text h1 { font-size: 2rem; }
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

      .details-column { width: 45%; }
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
      .logo-container { display: none; }
      .logo-text h1 { font-size: 2rem; }
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
        padding-left: 1rem;

        h3 {
          text-align: start;
          margin-bottom: 2rem;
        }

        p {
          text-align: end;
          padding-right: 1rem;
        }
      }
    }
  }
}
</style>
