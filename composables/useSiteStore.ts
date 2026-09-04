// Configurazione sito
export const useSiteStore = () => {
  return {
    siteName: "Gruppo Insubrico di Ornitologia",
    siteUrl: "https://gruppoinsubrico.com",
    defaultImage: "/images/og-default.jpg",
  };
};

// Cookie banner text
export const useCookies = () => {
  return {
    text: "Non collezioniamo cookie.",
  };
};

// Meta descriptions per pagina (opzionale, per uso centralizzato)
export const useMetaDescriptions = () => {
  return {
    Homepage: {
      title: "Home",
      description:
        "Benvenuti nel sito del Gruppo Insubrico Ornitologico. Scopri le nostre attività di ricerca e conservazione.",
    },
    ChiSiamo: {
      title: "Chi Siamo",
      description:
        "Scopri chi siamo, la nostra storia e la missione del Gruppo Insubrico Ornitologico.",
    },
    Divulgazione: {
      title: "Divulgazione",
      description:
        "Conferenze, corsi e eventi organizzati dal Gruppo Insubrico Ornitologico.",
    },
    Socials: {
      title: "Social",
      description:
        "Seguici sui social media per restare aggiornato sulle nostre attività.",
    },
    Links: {
      title: "Link Utili",
      description: "Link utili e risorse per l'ornitologia ed il birdwatching.",
    },
    News: {
      title: "Notizie",
      description:
        "Ultime notizie e aggiornamenti dal Gruppo Insubrico Ornitologico.",
    },
    Progetti: {
      title: "Progetti",
      description:
        "I progetti di ricerca e conservazione del Gruppo Insubrico Ornitologico.",
    },
    Pubblicazioni: {
      title: "Pubblicazioni",
      description:
        "Pubblicazioni divulgative del Gruppo Insubrico Ornitologico.",
    },
  };
};
