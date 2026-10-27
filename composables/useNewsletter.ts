// ─── NEWSLETTER ──────────────────────────────────────────
// Sul sito c'è solo l'iscrizione: tutto il resto (iscritti aggiunti a
// mano, invio delle newsletter) si fa da Mailchimp.
//
// Il form chiama POST {apiBase}/newsletter/subscribe con
//   { email, privacy, website }   (website = honeypot anti-bot, vuoto)
// e riceve { message }. In caso di errore: { message } con stato 4xx/5xx.
// Laravel (NewsletterController) inoltra l'indirizzo a Mailchimp con
// doppio opt-in: la mail di conferma la manda Mailchimp.
// In dev risponde il mock server/api/newsletter/subscribe.post.ts.

// Indirizzo dell'informativa privacy. Vuoto = testo del consenso senza
// link. Quando la pagina esisterà, es. "/privacy", il link compare da solo
// in tutti i form.
export const NEWSLETTER_PRIVACY_URL = "";

export type NewsletterStatus = "idle" | "loading" | "success" | "error";

interface NewsletterResponse {
  message: string;
}

const GENERIC_ERROR = "Si è verificato un errore. Riprova più tardi.";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Stato di UN form: ogni form (menu, footer, pagina Social) ha il suo
export function useNewsletter() {
  const config = useRuntimeConfig();

  const email = ref("");
  const privacy = ref(false);
  const website = ref(""); // honeypot: deve restare vuoto
  const status = ref<NewsletterStatus>("idle");
  const message = ref("");

  const isValidEmail = computed(() => EMAIL_RE.test(email.value.trim()));

  // Scrivendo di nuovo dopo un messaggio, il messaggio sparisce
  watch([email, privacy], () => {
    if (status.value === "error" || status.value === "success") {
      status.value = "idle";
      message.value = "";
    }
  });

  async function submit() {
    if (status.value === "loading") return;

    // Controlli lato browser: messaggi subito, senza chiamare il server
    if (!isValidEmail.value) {
      status.value = "error";
      message.value = "Inserisci un indirizzo email valido.";
      return;
    }
    if (!privacy.value) {
      status.value = "error";
      message.value = "Per iscriverti devi dare il consenso.";
      return;
    }

    status.value = "loading";
    message.value = "";

    try {
      const res = await $fetch<NewsletterResponse>("/newsletter/subscribe", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: {
          email: email.value.trim(),
          privacy: privacy.value,
          website: website.value,
        },
      });
      email.value = "";
      privacy.value = false;
      // dopo il reset (che fa scattare il watch sopra)
      await nextTick();
      status.value = "success";
      message.value =
        res?.message ||
        "Quasi fatto! Controlla la tua casella email per confermare l'iscrizione.";
    } catch (err: any) {
      status.value = "error";
      message.value =
        err?.data?.message ||
        (err?.status === 429
          ? "Troppi tentativi. Riprova tra un minuto."
          : GENERIC_ERROR);
    }
  }

  return { email, privacy, website, status, message, submit };
}
