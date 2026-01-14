// Configurazione sito
export const useSiteStore = () => {
  return {
    siteName: 'Gruppo Insubrico di Ornitologia',
    siteUrl: 'https://gruppoinsubrico.com',
    defaultImage: '/images/og-default.jpg',
  }
}

// Cookie banner text
export const useCookies = () => {
  return {
    text: 'Non collezioniamo cookie.',
  }
}

// Link utili organizzati per categoria
export const useLinks = () => {
  return {
    ornithology: [
      { title: 'Ornitho Italia', href: 'https://www.ornitho.it' },
      { title: 'Centro Italiano Studi Ornitologici', href: 'https://www.ciso-coi.org' },
      { title: 'Gruppo Piemontese Studi Ornitologici', href: 'https://www.gpso.it' },
      { title: 'CROS Varenna', href: 'http://www.crosvarenna.it' },
      { title: 'Gruppo Ornitologico Lombardo', href: 'http://www.gol-onlus.it' },
      { title: 'Associazione Ornitologi Emilia Romagna', href: 'https://www.asoer.org' },
      { title: 'Associazione Faunisti Veneti', href: 'https://www.faunistiveneti.it' },
      { title: 'Associazione Studi Ornitologici e Ricerche Ecologiche FVG', href: 'https://astorefvg.org' },
      { title: 'Gruppo Ricerche Avifauna - Brescia', href: 'https://www.grupporicercheavifauna.it' },
      { title: 'European Bird Census Council', href: 'https://www.ebcc.info' },
      { title: 'Vogelwarte Sempach (CH)', href: 'https://www.vogelwarte.ch' },
      { title: 'Ornitho - Svizzera', href: 'https://www.ornitho.ch' },
      { title: 'Ficedula (CH)', href: 'https://www.ficedula.ch' },
      { title: 'British Trust for Ornithology', href: 'https://www.bto.org' },
      { title: 'Institut Català d\'Ornitologia', href: 'https://www.ornitologia.org' },
      { title: 'Società di Scienze Naturali del VCO', href: 'http://www.scienzenaturalivco.org' },
    ],
    birdwatching: [
      { title: 'EBN Italia', href: 'https://www.ebnitalia.it' },
      { title: 'Birdin\' Lombardia', href: 'https://www.birdinlombardia.it' },
      { title: 'Cuneo Birding', href: 'http://www.cuneobirding.it' },
      { title: 'Liguria Birding', href: 'https://www.liguriabirding.net' },
    ],
    nature: [
      { title: 'Lega Italiana Protezione Uccelli', href: 'https://www.lipu.it' },
      { title: 'World Wildlife Fund', href: 'https://www.wwf.it' },
      { title: 'BirdLife International', href: 'https://www.birdlife.org' },
      { title: 'RSPB - UK', href: 'https://www.rspb.org.uk' },
      { title: 'NABU - Germania', href: 'https://www.nabu.de' },
      { title: 'Ligue pour la Protection des Oiseaux', href: 'https://www.lpo.fr' },
      { title: 'Lega Abolizione Caccia', href: 'https://www.abolizionecaccia.it' },
      { title: 'Viaggiatori per natura', href: 'https://www.animal-trip.com' },
    ],
  }
}

// Meta descriptions per pagina (opzionale, per uso centralizzato)
export const useMetaDescriptions = () => {
  return {
    Homepage: {
      title: 'Home',
      description: 'Benvenuti nel sito del Gruppo Insubrico Ornitologico. Scopri le nostre attività di ricerca e conservazione.',
    },
    ChiSiamo: {
      title: 'Chi Siamo',
      description: 'Scopri chi siamo, la nostra storia e la missione del Gruppo Insubrico Ornitologico.',
    },
    Divulgazione: {
      title: 'Divulgazione',
      description: 'Conferenze, corsi e eventi organizzati dal Gruppo Insubrico Ornitologico.',
    },
    Socials: {
      title: 'Social',
      description: 'Seguici sui social media per restare aggiornato sulle nostre attività.',
    },
    Links: {
      title: 'Link Utili',
      description: 'Link utili e risorse per l\'ornitologia ed il birdwatching.',
    },
    News: {
      title: 'Notizie',
      description: 'Ultime notizie e aggiornamenti dal Gruppo Insubrico Ornitologico.',
    },
    Progetti: {
      title: 'Progetti',
      description: 'I progetti di ricerca e conservazione del Gruppo Insubrico Ornitologico.',
    },
    Pubblicazioni: {
      title: 'Pubblicazioni',
      description: 'Pubblicazioni divulgative del Gruppo Insubrico Ornitologico.',
    },
  }
}
