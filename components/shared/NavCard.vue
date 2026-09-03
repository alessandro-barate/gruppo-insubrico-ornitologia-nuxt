<script setup lang="ts">
// Card di navigazione condivisa da Divulgazione, Pubblicazioni e Progetti.
// Riceve il link GIÀ COSTRUITO (`to`) più i campi da mostrare.
defineProps<{
  to: string;
  title: string;
  excerpt?: string;
  image?: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="nav-card"
    :style="image ? { backgroundImage: `url(${image})` } : undefined"
  >
    <div class="nav-card__body">
      <h2>{{ title }}</h2>
      <!-- <p v-if="excerpt">{{ excerpt }}</p> -->
      <!-- <span class="nav-card__cta">Scopri di più</span> -->
    </div>
  </NuxtLink>
</template>

<style scoped>
.nav-card {
  text-align: center;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 220px;
  overflow: hidden;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: #ffffff;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

/* Overlay scuro per rendere i testi ben leggibili */
.nav-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.35) 60%,
    rgba(0, 0, 0, 0.2) 100%
  );
  transition: background 0.4s ease;
}

.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.nav-card:hover::before {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.5) 60%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

.nav-card__body {
  position: relative; /* sopra l'overlay */
  z-index: 1;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-card__body h2 {
  font-size: 1.25rem;
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.nav-card__body p {
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
}

.nav-card__cta {
  margin-top: 0.5rem;
  font-weight: 600;
  color: #c8c8c8;
}
</style>
