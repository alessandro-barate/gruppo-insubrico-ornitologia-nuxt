// server/api/newsletter/subscribe.post.ts
// Mock di POST /api/newsletter/subscribe, SOLO per lo sviluppo: simula le
// risposte di NewsletterController (Laravel) senza chiamare Mailchimp.
// Prova con:
//   errore@esempio.it → errore di Mailchimp (422)
//   lento@esempio.it  → risposta dopo 2 secondi
// In produzione (build) risponde 503: così nessuno crede di essersi
// iscritto finché la rotta Laravel non è online.
import type { H3Event } from "h3";

// Risponde come Laravel: { message } con il codice di stato giusto
function fail(event: H3Event, status: number, message: string) {
  setResponseStatus(event, status);
  return { message };
}

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    return fail(
      event,
      503,
      "L'iscrizione alla newsletter non è ancora attiva. Riprova tra qualche giorno.",
    );
  }

  const body = await readBody<{
    email?: string;
    privacy?: boolean;
    website?: string;
  }>(event);

  // Honeypot compilato = bot: risposta "ok" ma nessuna iscrizione
  if (body?.website) return { message: "ok" };

  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail(event, 422, "Inserisci un indirizzo email valido.");
  }
  if (body?.privacy !== true) {
    return fail(event, 422, "Per iscriverti devi dare il consenso.");
  }

  if (email.startsWith("lento@")) {
    await new Promise((r) => setTimeout(r, 2000));
  }
  if (email.startsWith("errore@")) {
    return fail(
      event,
      422,
      "Non è stato possibile iscrivere questo indirizzo. Verifica che sia corretto.",
    );
  }

  return {
    message:
      "Quasi fatto! Controlla la tua casella email per confermare l'iscrizione.",
  };
});
