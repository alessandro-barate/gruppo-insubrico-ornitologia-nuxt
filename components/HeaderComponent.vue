<script setup lang="ts">
// Refs per gestire lo stato
const isMenuOpen = ref(false);
const isSearchOpen = ref(false);

// Header sticky allo scroll
const handleScroll = () => {
  const header = document.querySelector("header");
  if (!header) return;

  if (
    window.innerWidth < 1000 ||
    (window.scrollY > 50 && window.innerWidth >= 1000)
  ) {
    header.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky-header");
  }
};

// Toggle menu hamburger
const toggleNavbarHamburger = () => {
  const listPage = document.querySelector(".list-page") as HTMLElement;
  const bar2 = document.getElementById("bar-2");

  if (!listPage || !bar2) return;

  if (listPage.classList.contains("visible")) {
    listPage.classList.add("closing");
    listPage.classList.remove("visible");

    setTimeout(() => {
      listPage.classList.remove("closing");
      listPage.style.visibility = "hidden";
    }, 500);
  } else {
    listPage.style.visibility = "";
    listPage.classList.add("visible");
  }

  bar2.classList.toggle("bar-active");
  isMenuOpen.value = !isMenuOpen.value;
};

// Chiudi menu
const closeMenu = () => {
  const listPage = document.querySelector(".list-page") as HTMLElement;
  const bar2 = document.getElementById("bar-2");

  if (!listPage || !bar2) return;

  listPage.classList.add("closing");
  listPage.classList.remove("visible");

  setTimeout(() => {
    listPage.classList.remove("closing");
    listPage.style.visibility = "hidden";
  }, 500);

  bar2.classList.remove("bar-active");
  isMenuOpen.value = false;
};

// Apri search bar
const openSearchBar = (event: Event) => {
  event.stopPropagation();
  isSearchOpen.value = true;
};

// Chiudi search bar quando si clicca fuori
const handleClickOutside = (event: Event) => {
  const searchSection = document.querySelector(".search-bar-section");
  if (searchSection && !searchSection.contains(event.target as Node)) {
    isSearchOpen.value = false;
  }
};

// Lifecycle
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("click", handleClickOutside);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header>
    <div class="container gradient-color-header">
      <div class="row">
        <div class="col d-flex">
          <nav id="nav-menu" class="d-flex">
            <!-- Desktop nav menu -->
            <ul class="nav-menu nav-menu--desktop d-flex">
              <li>
                <NuxtLink to="/" data-index="01">Home</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/chi-siamo" data-index="02">Chi siamo</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/news" data-index="03">News</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/progetti" data-index="04">Progetti</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/divulgazione" data-index="05"
                  >Divulgazione</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/pubblicazioni" data-index="06"
                  >Pubblicazioni</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/links" data-index="07"
                  >Social e Link utili</NuxtLink
                >
              </li>
            </ul>

            <!-- Hamburger menu -->
            <div class="hamburger-menu-container d-flex">
              <div @click="toggleNavbarHamburger()" class="hamburger-menu">
                <span class="bar"></span>
                <span class="bar" id="bar-2"></span>
                <span class="bar"></span>
              </div>
            </div>

            <!-- List page (fullscreen menu mobile) -->
            <div class="list-page">
              <div class="menu-logo">
                <span>G I O</span>
              </div>

              <div class="close-button-container">
                <button @click="closeMenu()">
                  <img
                    src="~/assets/images/header-menu/close-button.svg"
                    alt="Chiudi menu"
                  />
                </button>
              </div>

              <ul class="nav-menu">
                <li>
                  <NuxtLink to="/" @click="closeMenu()" data-index="01"
                    >Home</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/chi-siamo" @click="closeMenu()" data-index="02"
                    >Chi siamo</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/news" @click="closeMenu()" data-index="03"
                    >News</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/progetti" @click="closeMenu()" data-index="04"
                    >Progetti</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/divulgazione"
                    @click="closeMenu()"
                    data-index="05"
                    >Divulgazione</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/pubblicazioni"
                    @click="closeMenu()"
                    data-index="06"
                    >Pubblicazioni</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/links" @click="closeMenu()" data-index="07"
                    >Social e Link utili</NuxtLink
                  >
                </li>
              </ul>

              <div class="menu-footer">
                <div class="newsletter-section">
                  <form @submit.prevent>
                    <input
                      type="email"
                      placeholder="Iscriviti alla Newsletter"
                    />
                    <button type="submit" aria-label="Invia">
                      <span>→</span>
                    </button>
                  </form>
                </div>
                <div class="company-name">
                  <span>Gruppo Insubrico di Ornitologia</span>
                </div>
                <div class="social-links">
                  <a
                    href="https://www.instagram.com/gruppoinsubricoornitologia/"
                    target="_blank"
                    >Instagram</a
                  >
                  <a
                    href="https://www.facebook.com/GruppoInsubricoDiOrnitologia"
                    target="_blank"
                    >Facebook</a
                  >
                </div>
              </div>
            </div>

            <!-- Search bar section -->
            <div class="search-bar-section">
              <div class="search-bar-box d-flex">
                <button @click="openSearchBar">
                  <img src="~/assets/images/magnifier-lens.png" alt="Ricerca" />
                </button>
              </div>
              <div class="input-field" :class="{ visible: isSearchOpen }">
                <form @submit.prevent>
                  <input
                    type="search"
                    id="search-field"
                    placeholder="Cerca nel sito"
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.sticky-header {
  top: 0;
  z-index: 1000;
  position: sticky;
}

.container {
  margin-bottom: 0px;

  .col {
    width: 100%;

    nav {
      width: 92%;
      height: 60px;
      margin: 0 auto;
      align-items: center;

      .nav-menu--desktop {
        display: none;
        gap: 2rem;
        list-style: none;
        padding: 0;
        margin: 0;

        @media (min-width: 993px) {
          display: flex;
          align-items: center;
          flex: 1;
        }

        @media (min-width: 1200px) {
          gap: 3rem;
        }

        @media (min-width: 1400px) {
          gap: 4rem;
        }

        @media (min-width: 1600px) {
          gap: 5rem;
        }

        li {
          margin-left: 0;
          margin-right: 0;

          a {
            display: inline-block;
            transition: transform 0.5s ease-in-out;

            &:hover {
              transform: scale(1.1);
            }
          }
        }
      }

      .hamburger-menu-container {
        width: 90%;
        position: relative;
        align-items: center;
        display: flex;

        @media (min-width: 993px) {
          display: none;
        }

        .hamburger-menu {
          cursor: pointer;
          margin-left: 3.3rem;

          .bar {
            display: block;
            width: 35px;
            height: 3px;
            margin: 8px auto;
            border-radius: 30%;
            background-color: rgb(200, 200, 200);
            transition: transform 0.6s ease-in-out;
          }

          :deep(.bar-active) {
            left: 0;
            position: relative;
            transform: translateX(10px);
          }
        }
      }

      .list-page {
        width: 100vw;
        height: calc(100vh - 60px);
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 60px;
        left: 0;
        z-index: 110;
        background: url(~/assets/images/header-menu/cesena-desktop.webp)
          no-repeat center / cover;
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 0.4s ease-in-out,
          visibility 0.4s ease-in-out;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: -1;
        }

        .menu-logo {
          position: absolute;
          top: 2rem;
          left: 3rem;

          span {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 0.3em;
          }
        }

        .close-button-container {
          position: absolute;
          top: 2rem;
          right: 3rem;
          opacity: 0;

          button {
            border: none;
            cursor: pointer;
            background-color: transparent;
            transition: transform 0.3s ease-in-out;

            &:hover {
              transform: scale(1.1);
            }

            img {
              width: 40px;
              height: 40px;
              filter: brightness(0) invert(1);
            }
          }
        }

        .nav-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          padding: 4rem 0 1rem;
          list-style: none;
          margin: 0;

          li {
            width: 100%;
            position: relative;
            display: flex;
            margin-bottom: -8px;
            opacity: 0;

            &:nth-child(even) {
              justify-content: flex-end;
              padding-left: 35%;
            }
            &:nth-child(odd) {
              justify-content: flex-start;
              padding-right: 35%;
            }

            a {
              position: relative;
              display: inline-block;
              font-size: clamp(1.5rem, 4.5vw, 3rem);
              font-weight: 700;
              text-transform: uppercase;
              text-decoration: none;
              color: transparent;
              -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
              letter-spacing: -0.02em;
              transition: all 0.3s ease-out;
              cursor: pointer;

              &::before {
                content: attr(data-index);
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 0.875rem;
                color: rgba(255, 255, 255, 0.4);
                font-weight: 400;
              }

              &:hover {
                color: #fff;
                -webkit-text-stroke: 1px #fff;
              }
            }

            &:nth-child(odd) a::before {
              right: calc(100% + 1rem);
            }
            &:nth-child(even) a::before {
              left: calc(100% + 1rem);
            }
          }
        }

        .menu-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);

          .newsletter-section form {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            padding-bottom: 0.5rem;

            input {
              background: transparent;
              border: none;
              color: rgba(255, 255, 255, 0.6);
              font-size: 0.875rem;
              width: 200px;
              outline: none;

              &::placeholder {
                color: rgba(255, 255, 255, 0.6);
              }
            }

            button {
              background: transparent;
              border: none;
              color: rgba(255, 255, 255, 0.6);
              cursor: pointer;
              font-size: 1rem;
              transition: color 0.3s ease;

              &:hover {
                color: #fff;
              }
            }
          }

          .company-name span {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.875rem;
          }

          .social-links {
            display: flex;
            gap: 2rem;

            a {
              color: rgba(255, 255, 255, 0.6);
              text-decoration: none;
              font-size: 0.875rem;
              transition: color 0.3s ease;

              &:hover {
                color: #fff;
              }
            }
          }
        }

        &.visible {
          opacity: 1;
          visibility: visible;

          .menu-logo {
            opacity: 0;
            animation: fadeIn 0.4s ease-out forwards;
            animation-delay: 0.2s;
          }

          .close-button-container {
            opacity: 0;
            animation: fadeIn 0.4s ease-out forwards;
            animation-delay: 0.3s;
          }

          .nav-menu li {
            opacity: 0;
            animation: slideInFromBottom 0.5s ease-out forwards;

            @for $i from 1 through 8 {
              &:nth-child(#{$i}) {
                animation-delay: #{0.1 + $i * 0.06}s;
              }
            }
          }

          .menu-footer {
            opacity: 0;
            animation: fadeIn 0.4s ease-out forwards;
            animation-delay: 0.6s;
          }
        }

        &.closing {
          opacity: 1;
          visibility: visible;

          .nav-menu li {
            opacity: 1;
            animation: slideOutToTop 0.3s ease-in forwards;

            @for $i from 1 through 8 {
              &:nth-child(#{$i}) {
                animation-delay: #{(8 - $i) * 0.04}s;
              }
            }
          }

          .close-button-container,
          .menu-logo,
          .menu-footer {
            opacity: 1;
            animation: fadeOut 0.3s ease-in forwards;
          }
        }
      }

      .search-bar-section {
        width: 8%;
        position: relative;

        @media (max-width: 992px) {
          width: 10%;
        }

        .search-bar-box {
          width: 80%;
          margin-right: 0;
          position: relative;
          justify-content: end;

          @media (max-width: 576px) {
            width: 100%;
          }

          @media (min-width: 577px) and (max-width: 768px) {
            width: 90%;
          }

          @media (min-width: 769px) {
            width: 70%;
          }

          @media (min-width: 1281px) {
            width: 60%;
          }

          button {
            border: none;
            cursor: pointer;
            margin-right: 0;
            background-color: transparent;

            img {
              width: 65%;
              transition: transform 0.5s ease-in-out;

              @media (max-width: 576px) {
                width: 100%;
              }

              @media (min-width: 577px) and (max-width: 768px) {
                width: 80%;
              }

              @media (min-width: 769px) {
                width: 75%;
              }

              &:hover {
                transform: scale(1.1);
              }
            }
          }
        }

        .input-field {
          right: 0;
          top: 100%;
          display: none;
          position: absolute;
          padding-top: 1rem;

          &.visible {
            display: block;
          }
        }

        input {
          border: none;
          padding: 0.5rem 1rem;
          text-align: center;
          border-radius: 0.4rem;
          background-color: black;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
}

@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOutToTop {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (max-width: 992px) {
  .container .col nav {
    .list-page {
      .menu-logo {
        top: 1.5rem;
        left: 2rem;
      }

      .close-button-container {
        top: 1.5rem;
        right: 2rem;

        button img {
          width: 35px;
          height: 35px;
        }
      }

      .nav-menu {
        margin-top: 2rem;
        padding: 2rem 2rem 0.5rem;

        li {
          margin-bottom: 0.3rem;

          &:nth-child(even) {
            justify-content: unset;
            padding-left: 0;
          }

          &:nth-child(odd) {
            justify-content: unset;
            padding-right: 0%;
          }

          a {
            font-size: clamp(1.4rem, 7vw, 2.5rem);
          }
        }
      }

      .menu-footer {
        flex-direction: column;
        gap: 0.75rem;
        padding: 0.75rem 2rem;
        text-align: center;

        .company-name {
          display: none;
        }

        .social-links {
          gap: 1.5rem;
        }
      }

      .search-bar-section {
        width: 12%;

        .search-bar-box button img {
          width: 100%;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .container .col nav {
    .hamburger-menu-container .hamburger-menu .bar {
      width: 30px;
      height: 2px;
    }

    .list-page {
      .menu-logo {
        top: 1rem;
        left: 1.5rem;

        span {
          font-size: 1.2rem;
        }
      }

      .close-button-container {
        top: 1rem;
        right: 1.5rem;

        button img {
          width: 30px;
          height: 30px;
        }
      }

      .nav-menu {
        padding: 0;
        justify-content: center;

        li {
          width: 100%;
          margin-bottom: 0.25rem;
          justify-content: center !important;
          padding-left: 0 !important;
          padding-right: 0 !important;

          a {
            font-size: clamp(1.8rem, 10vw, 2.5rem);
          }
        }
      }

      .menu-footer {
        padding: 1rem 1.5rem;

        .newsletter-section form input {
          width: 150px;
          font-size: 0.75rem;
        }

        .social-links {
          gap: 1rem;
        }
      }
    }
  }
}
</style>
