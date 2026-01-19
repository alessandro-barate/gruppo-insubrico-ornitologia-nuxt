<script setup lang="ts">
// SEO
useSeoMeta({
  title: "Link Utili | Gruppo Insubrico di Ornitologia",
  description: "Link utili e risorse per l'ornitologia ed il birdwatching.",
  ogTitle: "Link Utili | Gruppo Insubrico di Ornitologia",
});

useHead({
  link: [{ rel: "canonical", href: "https://gruppoinsubrico.com/links" }],
});

// Import links dal composable
const links = useLinks();

// Categoria attiva
const activeCategory = ref<string>("ornithology");

// Dati categorie con nomi e configurazione colonne
const categories = {
  ornithology: {
    name: "Ornitologia",
    columns: 2,
    centered: false,
  },
  birdwatching: {
    name: "Birdwatching",
    columns: 1,
    centered: true,
  },
  nature: {
    name: "Natura",
    columns: 2,
    centered: true,
  },
};

// Cambio categoria
const setCategory = (categoryKey: string) => {
  activeCategory.value = categoryKey;
};

// Divide array in chunks per le colonne
const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// Links della categoria divisi in colonne
const getLinksColumns = (categoryKey: string) => {
  const categoryLinks = links[categoryKey] || [];
  const config = categories[categoryKey as keyof typeof categories];
  const columns = config?.columns || 2;

  if (columns === 1) {
    return [categoryLinks];
  }

  const itemsPerColumn = Math.ceil(categoryLinks.length / columns);
  return chunkArray(categoryLinks, itemsPerColumn);
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Title -->
        <section>
          <div class="title-container">
            <h1 id="links" class="uppercase">link utili</h1>
          </div>
        </section>

        <!-- Horizontal Accordion -->
        <section class="accordion-section">
          <div class="accordion-container">
            <div
              v-for="(category, key) in categories"
              :key="key"
              class="accordion-panel"
              :class="[`bg-${key}`, { active: activeCategory === key }]"
              @click="setCategory(key as string)"
            >
              <!-- Overlay scuro -->
              <div class="panel-overlay"></div>

              <!-- Tab label (sempre visibile) -->
              <div class="panel-tab">
                <span class="tab-text">{{ category.name }}</span>
              </div>

              <!-- Separator -->
              <div class="panel-separator"></div>

              <!-- Content (visibile solo quando attivo) -->
              <div class="panel-content">
                <div
                  class="links-columns"
                  :class="{ centered: category.centered }"
                >
                  <ul
                    v-for="(column, colIndex) in getLinksColumns(key as string)"
                    :key="colIndex"
                    class="links-list"
                  >
                    <li
                      v-for="(link, index) in column"
                      :key="index"
                      class="link-item"
                    >
                      <a
                        :href="link.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        @click.stop
                      >
                        {{ link.title }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  width: 100%;
  background-position: center;
  background-size: cover;
  background-image: url(../assets/images/gheppio.jpg);

  .col {
    width: 100%;
    padding-bottom: 6rem;
    background-color: rgba(0, 0, 0, 0.7);

    .title-container {
      width: 100%;
      padding-top: 10rem;
      text-align: center;
    }
  }
}

.accordion-section {
  padding: 0 5%;
  padding-top: 7rem;
}

.accordion-container {
  display: flex;
  width: 85%;
  margin: 0 auto;
  height: 70vh;
  min-height: 500px;
  max-height: 800px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.accordion-panel {
  position: relative;
  flex: 0 0 60px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &.bg-ornithology {
    background-image: url(../assets/images/poiana.webp);
  }

  &.bg-birdwatching {
    background-image: url(../assets/images/birdwatching.webp);
  }

  &.bg-nature {
    background-image: url(../assets/images/nature.webp);
  }

  &.active {
    flex: 1 1 auto;
    cursor: default;

    .panel-overlay {
      background: linear-gradient(
        90deg,
        rgb(0, 0, 0) 0%,
        rgba(0, 0, 0, 0.4) 30%,
        rgba(0, 0, 0, 0.7) 100%
      );
    }

    .panel-content {
      opacity: 1;
      visibility: visible;
      transition-delay: 0.3s;
    }

    .panel-tab {
      background: transparent;
    }
  }

  &:not(.active):hover {
    flex: 0 0 80px;

    .panel-overlay {
      background: rgba(0, 0, 0, 0.4);
    }
  }
}

.panel-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: background 0.4s ease;
  z-index: 1;
}

.panel-tab {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.4s ease;
}

.tab-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: white;
  white-space: nowrap;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.panel-separator {
  position: absolute;
  right: 0;
  top: 5%;
  bottom: 5%;
  width: 1px;
  background: rgba(255, 255, 255, 0.3);
  z-index: 5;
}

.panel-content {
  position: absolute;
  left: 80px;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.4s ease,
    visibility 0.4s ease;
}

.links-columns {
  display: flex;
  gap: 3rem;
  justify-content: flex-start;
  align-items: flex-start;

  &.centered {
    justify-content: center;
  }
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-item {
  a {
    color: white;
    font-size: 1rem;
    letter-spacing: 0.02em;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
    transition: all 0.3s ease;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);

    &:hover {
      color: rgba(255, 140, 0, 0.9);
    }
  }
}

// ==========================================
// MEDIA QUERIES - TABLET
// ==========================================
@media (max-width: 992px) {
  .accordion-container {
    height: 60vh;
    min-height: 450px;
  }

  .accordion-panel {
    flex: 0 0 50px;

    &:not(.active):hover {
      flex: 0 0 65px;
    }
  }

  .panel-tab {
    width: 50px;
  }

  .tab-text {
    font-size: 0.9rem;
  }

  .panel-content {
    left: 60px;
    right: 20px;
  }

  .links-columns {
    gap: 2rem;
  }

  .link-item {
    a {
      font-size: 0.9rem;
    }
  }
}

// ==========================================
// MEDIA QUERIES - MOBILE
// ==========================================
@media (max-width: 576px) {
  .row {
    .col {
      .title-container {
        padding-top: 8rem;
      }
    }
  }

  .accordion-section {
    padding: 0 3%;
    padding-top: 5rem;
  }

  .accordion-container {
    width: 100%;
    flex-direction: column;
    height: auto;
    min-height: unset;
    max-height: unset;
  }

  .accordion-panel {
    flex: 0 0 60px;
    min-height: 60px;

    &.active {
      flex: 0 0 auto;
      min-height: 350px;
    }

    &:not(.active):hover {
      flex: 0 0 70px;
    }
  }

  .panel-tab {
    width: 100%;
    height: 60px;
    top: 0;
    bottom: unset;
  }

  .tab-text {
    writing-mode: horizontal-tb;
    transform: none;
    font-size: 0.85rem;
  }

  .panel-separator {
    left: 5%;
    right: 5%;
    top: unset;
    bottom: 0;
    width: unset;
    height: 1px;
  }

  .panel-content {
    left: 15px;
    right: 15px;
    top: 70px;
    transform: none;
  }

  .links-columns {
    flex-direction: column;
    gap: 0.5rem;

    &.centered {
      align-items: center;
    }
  }

  .link-item {
    a {
      font-size: 0.85rem;
    }
  }
}
</style>
