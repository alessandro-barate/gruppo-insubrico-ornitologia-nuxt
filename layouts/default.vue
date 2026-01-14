<script setup>
// Stato per scroll-to-top button
const visible = ref(false);
const showPanel = ref(false);

// Scroll to top
function scrollUp() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Gestione scroll
function handleScroll() {
  visible.value = window.scrollY > 300;
}

// Lifecycle
onMounted(() => {
  // Disabilita scroll restoration del browser
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div id="app">
    <HeaderComponent />

    <!-- Contenuto pagina (sostituisce router-view) -->
    <slot />

    <!-- Pulsanti fissi -->
    <div class="buttons-container d-flex">
      <!-- Cookies button -->
      <div id="cookies-button">
        <button @click="showPanel = true">
          <img
            src="~/assets/images/cookies-icon.svg"
            alt="Collegamento all'informativa dei cookie"
          />
          <p>Cookies</p>
        </button>
      </div>

      <!-- Up button -->
      <div id="up-button">
        <button v-show="visible" aria-label="Torna in alto" @click="scrollUp">
          <img
            src="~/assets/images/up-arrow.svg"
            alt="Freccia in alto per scorrere la pagina in su"
          />
        </button>
      </div>
    </div>

    <CookieBanner :force-show="showPanel" @close="showPanel = false" />
    <FooterComponent />
  </div>
</template>

<style scoped>
button {
  border: none;
  cursor: pointer;
  background-color: transparent;
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}

#cookies-button,
#up-button {
  position: fixed;
}

#cookies-button {
  left: 2%;
  bottom: 3rem;

  img {
    width: 2em;
  }

  p {
    color: black;
    font-size: 0.7rem;
    -webkit-text-fill-color: black;
  }
}

#up-button {
  right: 2%;
  z-index: 999;
  bottom: 2.9rem;

  img {
    width: 2rem;
  }
}

/* Media queries */
/* Mobile layout */
@media (max-width: 936px) {
  button:hover {
    transform: none;
  }

  #cookies-button {
    bottom: 2.7rem;
  }

  #up-button {
    right: 20px;
    bottom: 53px;
  }
}
</style>
