<script setup>
useSeoMeta({
  title: "Contattaci | Gruppo Insubrico di Ornitologia",
  description:
    "Il form di contatto per mettersi in contato con il Gruppo Insubrico Ornitologico.",
  ogTitle: "Contattaci | Gruppo Insubrico di Ornitologia",
});

useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/form" }],
});

const config = useRuntimeConfig();

const form = reactive({
  name: "",
  surname: "",
  mail: "",
  message: "",
  website: "", // Honeypot, deve restare vuoto, se pieno è bot
});

const loading = ref(false);
const feedback = ref(null); // { type: 'success' | 'error', text: string }

async function submitForm() {
  loading.value = true;
  feedback.value = null;

  try {
    await $fetch("/contact", {
      baseURL: config.public.apiBase,
      method: "POST",
      body: form,
    });

    feedback.value = {
      type: "success",
      text: "Messaggio inviato con successo!",
    };
    form.name = form.surname = form.mail = form.message = form.website = "";
  } catch (e) {
    const msg =
      e?.data?.message || "Si è verificato un errore. Riprova più tardi.";
    feedback.value = { type: "error", text: msg };
  } finally {
    loading.value = false;
  }
}
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
          <form @submit.prevent="submitForm">
            <div class="details-row">
              <label for="name"></label>
              <input
                type="text"
                name="name"
                id="name"
                v-model="form.name"
                placeholder="Nome*"
                required
              />
              <label for="surname"></label>
              <input
                type="text"
                name="surname"
                id="surname"
                v-model="form.surname"
                placeholder="Cognome*"
                required
              />
            </div>
            <div class="email-row">
              <label for="mail"></label>
              <input
                type="email"
                name="mail"
                id="mail"
                v-model="form.mail"
                placeholder="Indirizzo mail*"
                required
              />
            </div>
            <div class="message-row">
              <label for="message"></label>
              <textarea
                name="message"
                id="message"
                v-model="form.message"
                rows="5"
                cols="50"
                placeholder="Scrivi qui il tuo messaggio*"
                required
              />
            </div>
            <input
              type="text"
              name="website"
              id="website"
              v-model="form.website"
              autocomplete="off"
              tabindex="-1"
              aria-hidden="true"
              class="website-row"
            />
            <button type="submit" :disabled="loading" class="static">
              {{ loading ? "Invio in corso..." : "Invia" }}
            </button>
            <p v-if="feedback" :class="feedback.type">{{ feedback.text }}</p>
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

        .website-row {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
        }

        .static {
          border: none;
          color: #333;
          cursor: pointer;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          border-radius: 50px;
          padding: 0.5rem 1.5rem;
          transition: all 0.4s ease-in-out;
          background: linear-gradient(90deg, #ff8636, #f9a268);

          &:hover {
            transform: scale(1.05);
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
