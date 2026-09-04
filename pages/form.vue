<script>
useSeoMeta({
  title: "Contattaci | Gruppo Insubrico di Ornitologia",
  description:
    "Il form di contatto per mettersi in contato con il Gruppo Insubrico Ornitologico.",
  ogTitle: "Contattaci | Gruppo Insubrico di Ornitologia",
});

useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/form" }],
});
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="form-title">
          <h1>Form di contatto</h1>
          <p>
            Hai bisogno di contattarci? Scrivici una mail compilando il form
            sottostante.
          </p>
        </div>
        <div class="form-container">
          <form action="" method="get">
            <div class="details-row">
              <label for="name"></label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nome*"
                required
              />
              <label for="surname"></label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Cognome*"
                required
              />
            </div>
            <div class="email-row">
              <label for="mail"></label>
              <input
                type="mail"
                name="mail"
                id="mail"
                placeholder="Mail*"
                required
              />
            </div>
            <div class="message-row">
              <label for="message"></label>
              <textarea
                type="text"
                name="message"
                id="message"
                rows="5"
                cols="50"
                placeholder="Scrivi qui il tuo messaggio*"
              />
            </div>
          </form>
          <div class="bottom-text">
            <p>*Campi obbligatori</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  width: 100%;
  padding-bottom: 10rem;

  .col {
    width: 80%;

    input,
    textarea {
      border: none;
      border-bottom: 1px solid black;
      background-color: transparent;
    }

    .form-title {
      margin-top: 4rem;
      text-align: center;
      margin-bottom: 2rem;

      h1 {
        margin-bottom: 1.5rem;
      }
    }

    .form-container {
      text-align: center;
      padding-top: 5rem;
      padding-bottom: 5rem;

      form {
        width: 50%;

        .details-row,
        .email-row {
          margin-bottom: 6rem;
        }

        .details-row {
          display: flex;

          #name,
          #surname {
            width: 40%;
          }
        }

        .email-row {
          #mail {
            width: 55%;
          }
        }
      }

      .bottom-text {
        width: 50%;
        font-size: 0.9rem;
        margin-top: 2rem;
        text-align: start;
      }
    }
  }
}
</style>
