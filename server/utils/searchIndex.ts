// ─── Indice di ricerca (MOCK) ────────────────────────────
// Raccoglie i contenuti mock dei composable in "documenti" di testo
// semplice e li indicizza con MiniSearch. Usato da server/api/search.get.ts.
// Con Laravel questo file sparisce: la ricerca la farà il backend
// (es. Laravel Scout), restituendo la stessa forma SearchResponse.
import MiniSearch from "minisearch";
import type {
  SearchResult,
  SearchResultType,
  SearchTarget,
} from "~/composables/useSearch";
import type { PubNode } from "~/composables/usePubblicazioni";
import { PUBBLICAZIONI_TREE } from "~/composables/usePubblicazioni";
import {
  PROGETTI_PROJECTS,
  PROGETTI_SECTIONS,
  PROGETTI_BASE_PATH,
  blocksFor,
  projectPartFor,
} from "~/composables/useProgetti";
import { DIVULGAZIONE_SUBSECTIONS } from "~/composables/useDivulgazione";
import { LINKS_DATA } from "~/composables/useLinks";
import newsData from "~/data/carousel.js";

// Etichetta di ogni tipo (intestazione dei gruppi nell'overlay)
export const TYPE_LABELS: Record<SearchResultType, string> = {
  pagina: "Pagine",
  news: "News",
  progetto: "Progetti",
  pubblicazione: "Pubblicazioni",
  bibliografia: "Bibliografia",
  divulgazione: "Divulgazione",
  link: "Link utili",
};

interface SearchDoc {
  id: string;
  type: SearchResultType;
  title: string;
  text: string;
  context?: string;
  year?: number;
  url: string;
  target: SearchTarget;
}

// ─── Pagine statiche ─────────────────────────────────────
// I testi di queste pagine sono scritti nei template, non nei dati:
// qui una descrizione con le parole che un utente potrebbe cercare.
const STATIC_PAGES: Omit<SearchDoc, "type" | "target">[] = [
  {
    id: "pagina-home",
    title: "Home",
    url: "/",
    text: "Gruppo Insubrico di Ornitologia G.I.O. Associazione per lo studio e la conservazione degli uccelli in provincia di Varese. Le news e le attività del G.I.O.",
  },
  {
    id: "pagina-chi-siamo",
    title: "Chi siamo",
    url: "/chi-siamo",
    text: "La storia, la missione e il Consiglio Direttivo del Gruppo Insubrico di Ornitologia, Organizzazione di Volontariato (ODV) con sede al Civico Museo Insubrico di Storia Naturale di Clivio. Diventa socio: iscrizione annuale, quota, tessera socio, riunioni mensili, assemblea, comunicazioni tra i soci, donazioni.",
  },
  {
    id: "pagina-news",
    title: "News",
    url: "/news",
    text: "Notizie e aggiornamenti sulle attività del G.I.O.: eventi, progetti, monitoraggi, iniziative e pubblicazioni.",
  },
  {
    id: "pagina-progetti",
    title: "Progetti",
    url: "/progetti",
    text: "Progetti di ricerca in corso e terminati, monitoraggi, censimenti e atlanti ornitologici in provincia di Varese.",
  },
  {
    id: "pagina-divulgazione",
    title: "Divulgazione",
    url: "/divulgazione",
    text: "Corsi di birdwatching e ornitologia, serate divulgative, incontri, convegni ed eventi organizzati dal G.I.O.",
  },
  {
    id: "pagina-pubblicazioni",
    title: "Pubblicazioni",
    url: "/pubblicazioni",
    text: "Quaderni del G.I.O., BOL Bollettino Ornitologico Lombardo, Uccelli della Provincia di Varese, check-list, resoconti ornitologici, bibliografia e risultati delle ricerche.",
  },
  {
    id: "pagina-links",
    title: "Social e link utili",
    url: "/links",
    text: "Seguici su Facebook e Instagram, iscriviti alla newsletter. Link utili e risorse per l'ornitologia e il birdwatching.",
  },
  {
    id: "pagina-contatti",
    title: "Form di contatto",
    url: "/form",
    text: "Contattaci, scrivici una mail, informazioni, richiesta copie dei Quaderni, donazioni.",
  },
  {
    id: "pagina-modulo",
    title: "Modulo di iscrizione",
    url: "/module",
    text: "Iscriviti al G.I.O., diventa socio, modulo di iscrizione annuale.",
  },
];

// ─── Pulizia del testo ───────────────────────────────────
const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  laquo: "«",
  raquo: "»",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  euro: "€",
  deg: "°",
  agrave: "à",
  aacute: "á",
  egrave: "è",
  eacute: "é",
  igrave: "ì",
  iacute: "í",
  ograve: "ò",
  oacute: "ó",
  ugrave: "ù",
  uacute: "ú",
  Agrave: "À",
  Egrave: "È",
  Eacute: "É",
  Igrave: "Ì",
  Ograve: "Ò",
  Ugrave: "Ù",
  auml: "ä",
  ouml: "ö",
  uuml: "ü",
  ccedil: "ç",
};

function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === "#") {
      const n =
        code[1] === "x" || code[1] === "X"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[code] ?? m;
  });
}

// HTML → testo semplice su una riga
export function toPlainText(html?: string): string {
  if (!html) return "";
  return decodeEntities(
    html
      .replace(/<(br|\/p|\/li|\/h\d|\/ul)\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();
}

// minuscolo e senza accenti (stessa regola di highlightTerms nel frontend)
function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trim()}…`;
}

function fileTarget(url: string): SearchTarget {
  return /^https?:\/\//i.test(url) ? "external" : "file";
}

// ─── Raccolta dei documenti ──────────────────────────────
function collectPubblicazioni(
  nodes: PubNode[],
  parentPath: string,
  parentContext: string,
  docs: SearchDoc[],
) {
  for (const node of nodes) {
    const path = `${parentPath}/${node.slug}`;
    const context = `${parentContext} › ${node.title}`;

    // La pagina della sottosezione
    docs.push({
      id: `pub-${path}`,
      type: "pubblicazione",
      title: node.title,
      text: toPlainText(
        [node.intro_excerpt, node.intro_text, node.second_intro_text]
          .filter(Boolean)
          .join(" "),
      ),
      context: parentContext,
      url: path,
      target: "page",
    });

    switch (node.type) {
      case "group":
        collectPubblicazioni(node.children, path, context, docs);
        break;

      case "detail":
        // il testo del dettaglio va nella stessa pagina appena aggiunta
        docs[docs.length - 1].text += ` ${toPlainText(node.body)}`;
        break;

      case "cards":
        for (const item of node.items) {
          docs.push({
            id: `pub-${path}-card-${item.id}`,
            type: "pubblicazione",
            title: item.title,
            text: toPlainText(item.body),
            context,
            url: path,
            target: "page",
          });
        }
        break;

      case "pdf-list":
        // Ogni PDF (BOL, resoconti…) apre direttamente il file
        for (const item of node.items) {
          if (!item.pdf_url?.trim()) continue;
          docs.push({
            id: `pub-${path}-pdf-${item.id}`,
            type: "pubblicazione",
            title: item.year ? `${node.title} ${item.year} – ${item.title}` : `${node.title} – ${item.title}`,
            text: "",
            context,
            year: item.year,
            url: item.pdf_url,
            target: fileTarget(item.pdf_url),
          });
        }
        break;

      case "bibliography":
        for (const item of node.items) {
          const text = toPlainText(item.text);
          if (!text) continue;
          // l'anno della citazione, se c'è (es. "Rossi M., 2015. …")
          const year = Number(text.match(/\b(19|20)\d{2}\b/)?.[0]);
          docs.push({
            id: `pub-${path}-bib-${item.id}`,
            type: "bibliografia",
            // la citazione intera fa da titolo (niente estratto)
            title: text,
            text: "",
            context,
            year: Number.isFinite(year) ? year : undefined,
            // con il PDF il risultato apre il PDF, come nella pagina
            url: item.pdf_url?.trim() || path,
            target: item.pdf_url?.trim() ? fileTarget(item.pdf_url) : "page",
          });
        }

        break;
    }
  }
}

function collectProgetti(docs: SearchDoc[]) {
  for (const section of PROGETTI_SECTIONS) {
    const sectionUrl = `${PROGETTI_BASE_PATH}/${section.slug}`;
    docs.push({
      id: `prog-${section.slug}`,
      type: "progetto",
      title: section.title,
      text: toPlainText(`${section.intro_excerpt ?? ""} ${section.intro_text ?? ""}`),
      context: "Progetti",
      url: sectionUrl,
      target: "page",
    });

    const part = projectPartFor(section.slug);
    for (const project of PROGETTI_PROJECTS) {
      if (project.section_slug !== section.slug) continue;

      // Sezioni navigabili: pagina propria. Le altre: progetto nella lista.
      const url = section.projects_are_navigable
        ? `${sectionUrl}/${project.slug}`
        : sectionUrl;
      // Solo ciò che la pagina mostra davvero (vedi blocksFor)
      const blocks = blocksFor(project, part);

      docs.push({
        id: `prog-${section.slug}-${project.id}`,
        type: "progetto",
        title: project.title,
        text: toPlainText(
          [project.intro, ...blocks.map((b) => b.text)].filter(Boolean).join(" "),
        ),
        context: `Progetti › ${section.title}`,
        url,
        target: "page",
      });

      // I file del progetto (solo dove sono visibili, es. Atlanti)
      blocks
        .flatMap((b) => b.links ?? [])
        .forEach((link, i) => {
          docs.push({
            id: `prog-${section.slug}-${project.id}-file-${i}`,
            type: "progetto",
            title: link.label,
            text: "",
            context: `Progetti › ${project.title}`,
            url: link.url,
            target: fileTarget(link.url),
          });
        });
    }
  }
}

function collectDivulgazione(docs: SearchDoc[]) {
  for (const sub of Object.values(DIVULGAZIONE_SUBSECTIONS)) {
    const url = `/divulgazione/${sub.slug}`;
    docs.push({
      id: `div-${sub.slug}`,
      type: "divulgazione",
      title: sub.title,
      text: toPlainText(`${sub.intro_excerpt ?? ""} ${sub.intro_text}`),
      context: "Divulgazione",
      url,
      target: "page",
    });

    for (const item of sub.items) {
      const year = Number(item.year);
      docs.push({
        id: `div-${sub.slug}-${item.id}`,
        type: "divulgazione",
        title: item.title,
        text: toPlainText(item.body),
        context: `Divulgazione › ${sub.title}`,
        year: Number.isFinite(year) && year > 0 ? year : undefined,
        url,
        target: "page",
      });
    }
  }
}

function collectNews(docs: SearchDoc[]) {
  for (const n of newsData as Array<Record<string, any>>) {
    const year = Number(String(n.date ?? "").slice(0, 4));
    docs.push({
      id: `news-${n.slug}`,
      type: "news",
      title: String(n.title ?? ""),
      text: toPlainText(`${n.excerpt ?? ""} ${n.body ?? ""}`),
      context: n.category ? `News › ${n.category}` : "News",
      year: Number.isFinite(year) && year > 0 ? year : undefined,
      url: `/news/${n.slug}`,
      target: "page",
    });
  }
}

function collectLinks(docs: SearchDoc[]) {
  for (const subsections of Object.values(LINKS_DATA)) {
    for (const sub of subsections) {
      for (const group of sub.groups) {
        for (const link of group.links) {
          if (!link.href?.trim()) continue;
          docs.push({
            id: `link-${link.href}`,
            type: "link",
            title: link.title.trim(),
            // il sottotitolo inizia con " - ": lo tolgo
            text: (link.subtitle ?? "").replace(/^\s*[-–]\s*/, "").trim(),
            context: [sub.title, group.title].filter(Boolean).join(" › "),
            url: link.href,
            target: "external",
          });
        }
      }
    }
  }
}

function buildDocuments(): SearchDoc[] {
  const docs: SearchDoc[] = STATIC_PAGES.map((p) => ({
    ...p,
    type: "pagina",
    target: "page",
  }));
  collectNews(docs);
  collectProgetti(docs);
  collectPubblicazioni(PUBBLICAZIONI_TREE, "/pubblicazioni", "Pubblicazioni", docs);
  collectDivulgazione(docs);
  collectLinks(docs);

  // id univoci (MiniSearch li richiede): in caso di doppioni tengo il primo
  const seen = new Set<string>();
  return docs.filter((d) => {
    if (!d.title || seen.has(d.id)) return false;
    seen.add(d.id);
    return true;
  });
}

// ─── Indice ──────────────────────────────────────────────
// Costruito alla prima ricerca e poi riusato (i dati mock non cambiano).
let index: MiniSearch<SearchDoc> | null = null;
const docsById = new Map<string, SearchDoc>();

function getIndex(): MiniSearch<SearchDoc> {
  if (index) return index;

  const docs = buildDocuments();
  docs.forEach((d) => docsById.set(d.id, d));

  index = new MiniSearch<SearchDoc>({
    fields: ["title", "context", "text"],
    storeFields: [],
    // minuscolo e senza accenti: "perche" trova "perché"
    processTerm: (term) => {
      const t = fold(term);
      return t.length > 1 ? t : null; // ignora le lettere singole
    },
    searchOptions: {
      boost: { title: 3, context: 1.2 },
      prefix: true, // "ron" trova "rondone"
      fuzzy: (term) => (term.length > 4 ? 0.2 : false), // errori di battitura
      combineWith: "AND", // con più parole devono esserci tutte
    },
  });
  index.addAll(docs);
  return index;
}

// Pezzo di testo attorno alla prima parola trovata
function makeExcerpt(text: string, terms: string[], max = 170): string | undefined {
  if (!text) return undefined;
  const folded = fold(text);
  let pos = -1;
  for (const t of terms) {
    const re = new RegExp(`(^|[^\\p{L}\\p{N}])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "u");
    const m = re.exec(folded);
    if (m && (pos === -1 || m.index < pos)) pos = m.index + m[1].length;
  }
  if (pos <= 40 || text.length <= max) return truncate(text, max);

  let start = text.lastIndexOf(" ", pos - 40);
  start = start === -1 ? 0 : start + 1;
  return `…${truncate(text.slice(start), max)}`;
}

export function searchSite(q: string, limit: number) {
  const results = getIndex().search(q);
  const data: SearchResult[] = results.slice(0, limit).map((r) => {
    const doc = docsById.get(String(r.id))!;
    return {
      id: doc.id,
      type: doc.type,
      type_label: TYPE_LABELS[doc.type],
      title: doc.title,
      excerpt: doc.text === doc.title ? undefined : makeExcerpt(doc.text, r.terms),
      context: doc.context,
      year: doc.year,
      url: doc.url,
      target: doc.target,
      terms: r.terms,
    };
  });
  return { total: results.length, data };
}
