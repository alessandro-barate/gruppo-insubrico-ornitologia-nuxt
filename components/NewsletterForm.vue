<script setup lang="ts">
// Form di iscrizione alla newsletter (Mailchimp, vedi useNewsletter.ts).
// Lo stesso componente in tre posti, con tre stili:
//   variant="menu"   → fondo del menu a tutto schermo (mobile/tablet)
//   variant="modal"  → modale "Iscriviti alla newsletter" del footer
//   variant="panel"  → pagina Social e link utili, sotto "Newsletter"
const props = withDefaults(
  defineProps<{
    variant?: "menu" | "modal" | "panel";
  }>(),
  { variant: "panel" },
);

const { email, privacy, website, status, message, submit } = useNewsletter();

// id univoci: i form possono stare nella stessa pagina (menu + footer…)
const uid = useId();
const emailId = `newsletter-email-${uid}`;
const msgId = `newsletter-msg-${uid}`;

const placeholder = computed(() =>
  props.variant === "menu" ? "Iscriviti alla Newsletter" : "La tua email",
);
const loading = computed(() => status.value === "loading");
const privacyUrl = NEWSLETTER_PRIVACY_URL;
</script>

<template>
  <form
    class="newsletter-form"
    :class="`newsletter-form--${variant}`"
    novalidate
    @submit.prevent="submit"
  >
    <label :for="emailId" class="newsletter-form__label">
      Iscriviti alla newsletter
    </label>

    <div class="newsletter-form__row">
      <input
        :id="emailId"
        v-model="email"
        type="email"
        inputmode="email"
        autocomplete="email"
        :placeholder="placeholder"
        :disabled="loading"
        :aria-invalid="status === 'error' ? true : undefined"
        :aria-describedby="message ? msgId : undefined"
      />
      <button
        type="submit"
        class="newsletter-form__submit"
        :disabled="loading"
        :aria-label="variant === 'menu' ? 'Iscriviti' : undefined"
      >
        <span v-if="loading" class="newsletter-form__spinner" aria-hidden="true" />
        <template v-else-if="variant === 'menu'">
          <span aria-hidden="true">→</span>
        </template>
        <template v-else>Iscriviti</template>
      </button>
    </div>

    <!-- Honeypot: nascosto agli utenti, lo compilano solo i bot -->
    <input
      v-model="website"
      type="text"
      name="website"
      class="newsletter-form__hp"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    />

    <label class="newsletter-form__consent">
      <input v-model="privacy" type="checkbox" :disabled="loading" />
      <span>
        Acconsento a ricevere la newsletter del G.I.O.<template
          v-if="privacyUrl"
        >
          (<NuxtLink :to="privacyUrl" target="_blank"
            >informativa privacy</NuxtLink
          >)</template
        >
      </span>
    </label>

    <p
      v-if="message"
      :id="msgId"
      class="newsletter-form__msg"
      :class="`newsletter-form__msg--${status}`"
      :role="status === 'error' ? 'alert' : 'status'"
    >
      {{ message }}
    </p>
  </form>
</template>

<style scoped lang="scss">
.newsletter-form {
  width: 100%;
  margin: 0;
  text-align: left;
  text-transform: none;
  letter-spacing: normal;

  // annulla i margini automatici che gli stili globali danno a span/img
  span {
    margin: 0;
  }

  // Etichetta solo per i lettori di schermo (il placeholder la mostra già)
  &__label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input[type="email"] {
    flex: 1;
    min-width: 0;
    margin: 0;
    font: inherit;
    outline: none;
  }

  &__submit {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font: inherit;
    cursor: pointer;

    &:disabled {
      cursor: wait;
    }
  }

  &__hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  &__consent {
    display: flex;
    align-items: flex-start;
    gap: 0.45rem;
    margin-top: 0.6rem;
    font-size: 0.8rem;
    line-height: 1.4;
    cursor: pointer;

    input {
      flex-shrink: 0;
      width: 0.95rem;
      height: 0.95rem;
      margin: 0.1rem 0 0;
      cursor: pointer;
    }

    a {
      color: inherit;
      text-decoration: underline;
    }
  }

  &__msg {
    margin: 0.6rem 0 0;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  &__spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: newsletter-spin 0.7s linear infinite;
  }

  // ─── Menu a tutto schermo: fondo scuro, linea sotto ───
  &--menu {
    width: auto;
    color: rgba(255, 255, 255, 0.6);

    .newsletter-form__row {
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      transition: border-color 0.3s ease;

      &:focus-within {
        border-color: rgba(255, 255, 255, 0.8);
      }
    }

    input[type="email"] {
      width: 200px;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.875rem;

      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }

      @media (max-width: 576px) {
        width: 150px;
        font-size: 0.75rem;
      }
    }

    .newsletter-form__submit {
      width: 1.6rem;
      padding: 0;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.6);
      font-size: 1rem;
      transition: color 0.3s ease;

      &:hover,
      &:focus-visible {
        color: #fff;
      }
    }

    .newsletter-form__consent {
      max-width: 230px;
      font-size: 0.7rem;
    }

    .newsletter-form__msg {
      max-width: 230px;
      font-size: 0.75rem;

      &--success {
        color: #b9f0c4;
      }

      &--error {
        color: #ffc2b8;
      }
    }
  }

  // ─── Modale del footer: fondo blu, titolo color bisque ─
  &--modal {
    color: #ddd;

    input[type="email"] {
      padding: 0.75rem 1rem;
      border: 2px solid transparent;
      border-radius: 6px;
      background: #fff;
      color: #222;
      font-size: 1rem;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: bisque;
      }
    }

    .newsletter-form__submit {
      min-width: 6.5rem;
      padding: 0.75rem 1.1rem;
      border: none;
      border-radius: 6px;
      background: bisque;
      color: #031a8c;
      font-weight: 600;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.9;
      }

      &:focus-visible {
        outline: 3px solid #fff;
        outline-offset: 2px;
      }
    }

    .newsletter-form__consent {
      margin-top: 0.85rem;
      font-size: 0.85rem;
    }

    .newsletter-form__msg {
      margin-top: 1rem;
      padding: 0.6rem 0.8rem;
      border-left: 3px solid #b9f0c4;
      background: rgba(255, 255, 255, 0.08);
      color: #fff;

      &--error {
        border-left-color: #ffb4a6;
      }
    }

    // Mobile stretto: campo e pulsante uno sopra l'altro
    @media (max-width: 400px) {
      .newsletter-form__row {
        flex-direction: column;
        align-items: stretch;
      }
    }
  }

  // ─── Pagina Social e link utili: sul fondo blu ────────
  &--panel {
    max-width: 460px;
    color: #fff;

    input[type="email"] {
      padding: 0.8rem 1rem;
      border: 2px solid transparent;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.95);
      color: #222;
      font-size: 1rem;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: #233162;
      }
    }

    .newsletter-form__submit {
      min-width: 6.5rem;
      padding: 0.8rem 1.2rem;
      border: none;
      border-radius: 8px;
      background: #233162;
      color: #fff;
      font-weight: 600;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.9;
      }

      &:focus-visible {
        outline: 3px solid #fff;
        outline-offset: 2px;
      }
    }

    .newsletter-form__consent {
      font-size: 0.85rem;
    }

    .newsletter-form__msg {
      display: inline-block;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      background: rgba(35, 49, 98, 0.85);
      color: #fff;

      &--error {
        background: rgba(122, 14, 0, 0.85);
      }
    }
  }
}

@keyframes newsletter-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
