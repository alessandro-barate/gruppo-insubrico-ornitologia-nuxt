<script setup>
/**
 * Schermata del pannello admin: "Testi e immagini delle pagine".
 * Uso (auto-import con prefisso cartella): <AdminPageContentsEditor />
 *
 * NB autenticazione: le chiamate usano `adminFetch` qui sotto.
 * Adattalo a come autentica già il tuo pannello (cookie Sanctum o token Bearer).
 */
const config = useRuntimeConfig();

const adminFetch = (url, opts = {}) =>
  $fetch(url, {
    baseURL: config.public.apiBase,
    credentials: "include", // cookie Sanctum
    headers: { Accept: "application/json" },
    // headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, // se usi token
    ...opts,
  });

// Nomi leggibili delle pagine nel menu a tendina
const pageLabels = {
  home: "Home",
  news: "News",
  "chi-siamo": "Chi siamo",
  divulgazione: "Divulgazione",
  pubblicazioni: "Pubblicazioni",
  progetti: "Progetti",
  contatti: "Social e Link utili",
};

const groups = ref({});
const selectedPage = ref("");
const drafts = reactive({}); // testi in modifica, per id
const files = reactive({}); // file immagine scelti, per id
const saving = reactive({}); // stato di salvataggio, per id
const messages = reactive({}); // esito, per id
const loadError = ref("");

const pages = computed(() => Object.keys(groups.value));
const fields = computed(() => groups.value[selectedPage.value] ?? []);

async function load() {
  loadError.value = "";
  try {
    groups.value = await adminFetch("/admin/page-contents");
    if (!selectedPage.value) selectedPage.value = pages.value[0] ?? "";
    for (const list of Object.values(groups.value)) {
      for (const f of list) drafts[f.id] = f.value ?? "";
    }
  } catch {
    loadError.value =
      "Impossibile caricare i contenuti. Verifica di aver effettuato l'accesso.";
  }
}

function replaceField(updated) {
  const list = groups.value[updated.page];
  const i = list.findIndex((f) => f.id === updated.id);
  if (i !== -1) list[i] = updated;
  drafts[updated.id] = updated.value ?? "";
  files[updated.id] = null;
}

async function save(field) {
  saving[field.id] = true;
  messages[field.id] = "";
  try {
    let body;
    if (field.type === "image") {
      if (!files[field.id]) {
        messages[field.id] = "Seleziona prima un'immagine.";
        return;
      }
      body = new FormData();
      body.append("image", files[field.id]);
    } else {
      body = { value: drafts[field.id] };
    }
    const updated = await adminFetch(`/admin/page-contents/${field.id}`, {
      method: "POST",
      body,
    });
    replaceField(updated);
    messages[field.id] = "Salvato.";
  } catch (e) {
    messages[field.id] = e?.data?.message ?? "Errore durante il salvataggio.";
  } finally {
    saving[field.id] = false;
  }
}

async function reset(field) {
  saving[field.id] = true;
  messages[field.id] = "";
  try {
    const updated = await adminFetch(`/admin/page-contents/${field.id}/value`, {
      method: "DELETE",
    });
    replaceField(updated);
    messages[field.id] = "Ripristinato il contenuto originale.";
  } catch {
    messages[field.id] = "Errore durante il ripristino.";
  } finally {
    saving[field.id] = false;
  }
}

function onFile(field, event) {
  files[field.id] = event.target.files?.[0] ?? null;
}

onMounted(load);
</script>

<template>
  <section class="pce">
    <h2>Testi e immagini delle pagine</h2>
    <p class="pce__hint">
      Se lasci un campo vuoto o premi "Ripristina", sul sito torna il contenuto
      originale.
    </p>

    <p v-if="loadError" class="pce__error">{{ loadError }}</p>

    <template v-else>
      <label class="pce__select">
        Pagina:
        <select v-model="selectedPage">
          <option v-for="p in pages" :key="p" :value="p">
            {{ pageLabels[p] ?? p }}
          </option>
        </select>
      </label>

      <div v-for="field in fields" :key="field.id" class="pce__field">
        <h3>{{ field.label }}</h3>

        <!-- Testo breve -->
        <input
          v-if="field.type === 'text'"
          v-model="drafts[field.id]"
          type="text"
        />

        <!-- Testo lungo con formattazione semplice -->
        <template v-else-if="field.type === 'html'">
          <textarea v-model="drafts[field.id]" rows="8"></textarea>
          <small>
            Formattazione ammessa: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;,
            &lt;br&gt;, elenchi, link.
          </small>
        </template>

        <!-- Immagine -->
        <template v-else-if="field.type === 'image'">
          <img
            v-if="field.public_value"
            :src="field.public_value"
            alt="Immagine attuale"
            class="pce__preview"
          />
          <p v-else class="pce__hint">Ora è in uso l'immagine originale.</p>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            @change="onFile(field, $event)"
          />
          <small>Formati: JPG, PNG, WEBP. Massimo 5 MB.</small>
        </template>

        <div class="pce__actions">
          <button :disabled="saving[field.id]" @click="save(field)">
            {{ saving[field.id] ? "Salvataggio…" : "Salva" }}
          </button>
          <button
            :disabled="saving[field.id] || !field.value"
            class="pce__secondary"
            @click="reset(field)"
          >
            Ripristina originale
          </button>
          <span v-if="messages[field.id]" class="pce__msg">
            {{ messages[field.id] }}
          </span>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
// Stile minimo: adattalo a quello del tuo pannello
.pce {
  max-width: 900px;

  &__hint,
  small {
    color: #666;
  }

  &__error {
    color: #b00020;
  }

  &__select {
    display: block;
    margin: 1.5rem 0;
  }

  &__field {
    padding: 1.5rem 0;
    border-top: 1px solid #ddd;

    input[type="text"],
    textarea {
      width: 100%;
      padding: 0.5rem;
      font: inherit;
    }
  }

  &__preview {
    display: block;
    max-width: 320px;
    margin-bottom: 0.75rem;
    border-radius: 8px;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-top: 0.75rem;
  }

  &__msg {
    color: #333;
  }
}
</style>
