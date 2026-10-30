<script setup lang="ts">
// Contenuto "Diventa socio" della pagina Chi Siamo.
// Unica fonte per desktop (pannello "Scopri di più") e tablet/mobile
// (modale): un testo modificato qui cambia in entrambe le versioni.
//
// Testi e immagini sono modificabili dal pannello (Testi delle pagine →
// Chi siamo, campi "Diventa socio › …"). I testi qui sotto sono gli
// originali, usati finché il campo del pannello è vuoto.
const { c, inline } = await usePageContent("chi-siamo");
const router = useRouter();

const DEFAULTS = {
  join_intro: "Associarsi al <strong>Gruppo Insubrico di Ornitologia</strong> significa sentirsi parte attiva di un gruppo di amici realmente appassionati di avifauna, sotto i variegati aspetti che spaziano dal <strong>birdwatching all&rsquo;ornitologia</strong> vera e propria.<br />Punto centrale e irrinunciabile dello spirito dell&rsquo;associazione &egrave; quello di <strong>promuovere la conoscenza e la conservazione dell&rsquo;avifauna e degli habitat naturali</strong>, che rientrano negli aspetti pi&ugrave; generali del rispetto della vita che ci circonda e del miglioramento della qualit&agrave; dell&rsquo;ambiente in cui viviamo. <br />Se siete curiosi e avete voglia di scoprire, studiare, condividere, dedicarvi ai <strong>monitoraggi e censimenti</strong>, e anche alla <strong>didattica</strong> dell&rsquo;ornitologia, il G.I.O. &egrave; l&rsquo;associazione che fa per voi. ",
  annual_text: "Chiunque condivida gli scopi della nostra associazione e abbia un po&rsquo; di tempo libero da dedicare a questa particolare forma di &ldquo;volontariato di ricerca&rdquo;, o voglia comunque sostenere il G.I.O., pu&ograve; iscriversi pagando una <strong>quota annuale</strong>. La quota di iscrizione comprende <strong>l&rsquo;assicurazione &ldquo;responsabilit&agrave; civile&rdquo;</strong> obbligatoria per le onlus. All&rsquo;iscrizione il G.I.O. rilascia una <strong>tessera socio</strong>, con il &ldquo;bollino&rdquo; di validit&agrave; dell&rsquo;anno in corso, a cui si aggiungeranno i successivi bollini annuali adesivi. ",
  meetings_text: "Ci riuniamo il <strong>secondo luned&igrave; di ogni mese</strong> presso la <strong>Biblioteca Comunale del Comune di Gazzada Schianno (VA)</strong> per condividere aggiornamenti sui progetti in corso,&nbsp; idee e nuove iniziative con un ordine del giorno, che viene mandato dal Presidente per mail ai soci, che possono proporre ulteriori argomenti o apportare modifiche.&nbsp; Le <strong>assemblee ufficiali</strong> (come l&rsquo;assemblea annuale) si svolgono invece presso la nostra sede al <strong>Civico Museo Insubrico di Storia Naturale a Clivio (VA)</strong>. <br /><br />Le riunioni mensili sono <strong>incontri informali</strong> in cui ci si confronta anche su osservazioni ornitologiche, viaggi naturalistici, commenti e visione di pubblicazioni e fotografie ecc. ",
  comms_text: "I soci sono compresi nella <strong>mailing-list</strong> del G.I.O. e possono entrare a far parte del <strong>gruppo WhatsApp dei soci</strong>, attraverso cui si viene informati dell&rsquo;intera attivit&agrave; del gruppo. Alcuni argomenti, di solito quelli pi&ugrave; formali e amministrativi, vengono trattati dal Consiglio Direttivo, che ne informa quindi il resto dei soci in occasione delle riunioni mensili. Abbiamo anche un Tesoriere e un Vice-tesoriere che si occupano delle questioni finanziarie (entrate e uscite, rendiconto economico, rimborsi spese, acquisti vari). ",
  donations_text: "Privati, enti e istituzioni possono contribuire al finanziamento delle nostre attivit&agrave; di ricerca, divulgazione e organizzazione di eventi specifici con una <strong>donazione al G.I.O.</strong>, godendo dei <strong>benefici fiscali di legge</strong>. <br /><br /> Per informazioni scrivere una mail alla segreteria usando il <a href=\"/form\" class=\"specific-link\">form di contatto</a>.",
  form_text: "Vuoi unirti a noi? <a href=\"/module\" class=\"specific-link\">Clicca il link</a> e compila il modulo.",
};

// Paragrafo: testo del pannello (o originale) + lo spazio che lo separa
// dall'immagine successiva
const para = (key: keyof typeof DEFAULTS, spaced = false) =>
  inline(key, DEFAULTS[key]) + (spaced ? "<br /><br />" : "");

// I link interni nei testi (es. /form, /module) navigano senza ricaricare
function handleLinkClick(e: MouseEvent) {
  const a = (e.target as HTMLElement).closest("a");
  if (!a || a.target === "_blank") return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const href = a.getAttribute("href");
  if (href && href.startsWith("/")) {
    e.preventDefault();
    router.push(href);
  }
}
</script>

<template>
  <div class="iscrizione" @click="handleLinkClick">
    <h3>{{ c("join_title", "Diventa socio del Gruppo Insubrico di Ornitologia") }}</h3>
    <p v-html="para('join_intro', true)"></p>
    <div class="iscrizione__cards">
      <img
        :src="c('join_card_front', '/images/chi-siamo/tessera-fronte.webp')"
        alt="Tessera socio del G.I.O., fronte."
        loading="lazy"
      />
      <img
        :src="c('join_card_back', '/images/chi-siamo/tessera-retro.webp')"
        alt="Tessera socio del G.I.O., retro."
        loading="lazy"
      />
    </div>
    <h3>{{ c("annual_title", "iscrizione annuale") }}</h3>
    <p v-html="para('annual_text', true)"></p>
    <div class="iscrizione__image">
      <img
        :src="c('annual_image', '/images/chi-siamo/gruppo-1.webp')"
        :alt="
          c(
            'annual_image_alt',
            'Soci del G.I.O. in posa mentre tengono tra le braccia il terzo Quaderno del G.I.O.',
          )
        "
        loading="lazy"
      />
    </div>
    <br /><br />
    <h3>{{ c("meetings_title", "riunioni mensili") }}</h3>
    <p v-html="para('meetings_text', true)"></p>
    <div class="iscrizione__image">
      <img
        :src="c('meetings_image', '/images/chi-siamo/gruppo-2.webp')"
        :alt="
          c(
            'meetings_image_alt',
            'Soci del G.I.O. in posa davanti ad un tavolo con sopra dei vasi con fiori.',
          )
        "
        loading="lazy"
      />
    </div>
    <br /><br />
    <h3>{{ c("comms_title", "comunicazioni tra i soci") }}</h3>
    <p v-html="para('comms_text', true)"></p>
    <div class="iscrizione__image">
      <img
        :src="c('comms_image', '/images/chi-siamo/XXII-cio-lecce.webp')"
        :alt="
          c(
            'comms_image_alt',
            'Soci del G.I.O. al XXII Convegno Italiano di Ornitologia di Lecce',
          )
        "
        loading="lazy"
      />
    </div>
    <br /><br />
    <h3>{{ c("donations_title", "donazioni") }}</h3>
    <p v-html="para('donations_text', false)"></p>
    <br /><br />
    <h3>{{ c("form_title", "modulo di iscrizione") }}</h3>
    <p v-html="para('form_text', false)"></p>
  </div>
</template>

<style scoped lang="scss">
.iscrizione {
  h3 {
    text-transform: uppercase;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1rem;
    line-height: 1.7;
    color: #333;
  }

  // Tessera fronte/retro, affiancate
  &__cards {
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-bottom: 3rem;

    img {
      width: calc(50% - 0.5rem);
      height: auto;
    }
  }

  // Foto a tutta larghezza
  &__image {
    width: 100%;

    img {
      width: 100%;
      height: auto;
    }
  }

  // Tablet/mobile (modale): titoli un po' più piccoli
  @media (max-width: 992px) {
    h3 {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 576px) {
    &__cards {
      gap: 0.5rem;
      display: block;
      margin-bottom: 2.5rem;

      img {
        width: 100%;
      }

      & img:first-child {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
