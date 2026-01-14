<script setup lang="ts">
import { useCookies } from "~/composables/useSiteStore";

// Props
const props = defineProps<{
  forceShow?: boolean;
}>();

// Emit
const emit = defineEmits<{
  close: [];
}>();

// State
const cookieInfo = useCookies();
const showCookieBanner = ref(false);
const consentValidityDays = 180;
const storageAvailable = ref(true);

// Computed
const shouldShowBanner = computed(
  () => props.forceShow || showCookieBanner.value
);

// Controlla se localStorage è disponibile (importante per Safari iOS)
const checkStorageAvailability = () => {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    storageAvailable.value = true;
  } catch (e) {
    console.warn("localStorage non disponibile:", e);
    storageAvailable.value = false;
  }
};

// Imposta la scadenza del consenso
const setConsentExpiry = () => {
  if (!storageAvailable.value) return;

  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + consentValidityDays);
    localStorage.setItem("cookieExpiryDate", expiryDate.toISOString());
  } catch (error) {
    console.warn("Impossibile salvare expiry date:", error);
  }
};

// Controlla se mostrare il banner
const checkCookieConsent = () => {
  if (!storageAvailable.value) {
    setTimeout(() => {
      showCookieBanner.value = true;
    }, 6000);
    return;
  }

  try {
    const cookieAccepted = localStorage.getItem("cookieAccepted");
    const expiryDateStr = localStorage.getItem("cookieExpiryDate");

    if (cookieAccepted !== "true") {
      setTimeout(() => {
        showCookieBanner.value = true;
      }, 6000);
    }

    if (!expiryDateStr) {
      setConsentExpiry();
      return;
    }

    const expiryDate = new Date(expiryDateStr);
    const currentDate = new Date();

    if (currentDate > expiryDate) {
      console.log("Cookie consent expired. Showing the banner again");
      showCookieBanner.value = true;
    } else {
      showCookieBanner.value = false;
    }
  } catch (error) {
    console.warn("Errore accesso localStorage:", error);
    setTimeout(() => {
      showCookieBanner.value = true;
    }, 6000);
  }
};

// Accetta cookies
const acceptCookies = () => {
  if (storageAvailable.value) {
    try {
      localStorage.setItem("cookieAccepted", "true");
      setConsentExpiry();
    } catch (error) {
      console.warn("Impossibile salvare consenso:", error);
    }
  }
  showCookieBanner.value = false;
  emit("close");
};

// Lifecycle - solo client-side
onMounted(() => {
  checkStorageAvailability();
  checkCookieConsent();
});
</script>

<template>
  <Transition name="fade-scale">
    <div class="cookies-overlay" v-if="shouldShowBanner">
      <!-- Black overlay -->
      <div class="overlay-background"></div>

      <!-- Centered banner -->
      <div class="cookie-zoomed-container">
        <div class="cookie-banner overlay gradient-color-subscribe-cookie">
          <div class="cookie-banner-title">
            <h3>Cookies</h3>
          </div>

          <hr />

          <div class="cookie-banner-description">
            <p>{{ cookieInfo.text }}</p>
          </div>

          <div class="cookie-banner-button">
            <button @click="acceptCookies">Ho capito</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.fade-scale-enter-active,
.fade-scale-leave-active {
  .overlay-background {
    transition: opacity 1.5s ease;
  }

  .cookie-zoomed-container {
    transition: all 1.5s ease;
  }
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  .overlay-background {
    opacity: 0;
  }

  .cookie-zoomed-container {
    opacity: 0;
    transform: translateX(-50%) scale(0.95);
  }
}

.cookies-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
}

.overlay-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: all;
  opacity: 1;
}

.cookie-zoomed-container {
  width: 30%;
  position: fixed;
  bottom: 10%;
  left: 50%;
  z-index: 9999;
  transform: translateX(-50%);
  opacity: 1;

  .overlay {
    border-radius: 1rem;
  }
}

.cookie-banner {
  padding: 20px;
  background: linear-gradient(90deg, #d2420d, #ffbf00);
  border-radius: 1rem;

  &.overlay {
    padding: 40px;
  }

  .cookie-banner-title,
  .cookie-banner-description {
    margin-bottom: 10px;
  }

  h3 {
    font-size: 22px;
    color: rgba(255, 255, 255, 0.9);
  }

  hr {
    width: 20%;
    border: none;
    margin-left: 5rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.6);
  }

  p {
    font-size: 16px;
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.9);
  }

  .cookie-banner-button {
    text-align: center;
    margin-top: 20px;

    button {
      border: none;
      color: black;
      font-size: 16px;
      font-weight: bold;
      background-color: transparent;
      cursor: pointer;
      transition: 0.5s ease-in-out;

      &:hover {
        color: yellow;
        transform: scale(1.1);
      }
    }
  }
}

// MEDIA QUERIES - MOBILE
@media (max-width: 936px) {
  .cookie-zoomed-container {
    width: 100%;
    left: 0;
    bottom: 0;
    position: fixed;
    transform: translateX(0);

    .cookie-banner.overlay {
      width: 100%;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    .cookie-banner-title {
      text-align: center;
    }
  }

  .fade-scale-enter-from,
  .fade-scale-leave-to {
    .cookie-zoomed-container {
      transform: translateX(0) scale(0.95);
    }
  }
}
</style>
