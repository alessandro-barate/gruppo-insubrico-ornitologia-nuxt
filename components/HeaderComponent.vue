<script setup lang="ts">
const router = useRouter();

// Refs per gestire lo stato
const isMenuOpen = ref(false);
const isSearchOpen = ref(false);

// Mappa route names Vue -> paths Nuxt
const routeMap: Record<string, string> = {
  Homepage: "/",
  "Chi Siamo": "/chi-siamo",
  News: "/news",
  Progetti: "/progetti",
  Divulgazione: "/divulgazione",
  Pubblicazioni: "/pubblicazioni",
  Socials: "/socials",
  Links: "/links",
};

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

// Chiudi menu e naviga
const closeMenu = (routeName?: string) => {
  const listPage = document.querySelector(".list-page") as HTMLElement;
  const bar2 = document.getElementById("bar-2");

  if (!listPage || !bar2) return;

  listPage.classList.add("closing");
  listPage.classList.remove("visible");

  setTimeout(() => {
    listPage.classList.remove("closing");
    listPage.style.visibility = "hidden";

    if (routeName && routeMap[routeName]) {
      router.push(routeMap[routeName]);
    }
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
    <div class="container gradient-color">
      <div class="row">
        <div class="col d-flex">
          <nav class="d-flex">
            <!-- Hamburger menu -->
            <div class="hamburger-menu-container d-flex">
              <div @click="toggleNavbarHamburger()" class="hamburger-menu">
                <span class="bar"></span>
                <span class="bar" id="bar-2"></span>
                <span class="bar"></span>
              </div>
            </div>

            <!-- List page (fullscreen menu) -->
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

              <ul class="nav-menu d-flex">
                <li>
                  <a
                    href="/"
                    @click.prevent="closeMenu('Homepage')"
                    data-index="01"
                    >Home</a
                  >
                </li>
                <li>
                  <a
                    href="/chi-siamo"
                    @click.prevent="closeMenu('Chi Siamo')"
                    data-index="02"
                    >Chi siamo</a
                  >
                </li>
                <li>
                  <a
                    href="/news"
                    @click.prevent="closeMenu('News')"
                    data-index="03"
                    >News</a
                  >
                </li>
                <li>
                  <a
                    href="/progetti"
                    @click.prevent="closeMenu('Progetti')"
                    data-index="04"
                    >Progetti</a
                  >
                </li>
                <li>
                  <a
                    href="/divulgazione"
                    @click.prevent="closeMenu('Divulgazione')"
                    data-index="05"
                    >Divulgazione</a
                  >
                </li>
                <li>
                  <a
                    href="/pubblicazioni"
                    @click.prevent="closeMenu('Pubblicazioni')"
                    data-index="06"
                    >Pubblicazioni</a
                  >
                </li>
                <li>
                  <a
                    href="/socials"
                    @click.prevent="closeMenu('Socials')"
                    data-index="07"
                    >Social</a
                  >
                </li>
                <li>
                  <a
                    href="/links"
                    @click.prevent="closeMenu('Links')"
                    data-index="08"
                    >Link utili</a
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
                  <a href="https://www.change.org/" target="_blank">Change</a>
                </div>
              </div>
            </div>

            <!-- Search bar section -->
            <div class="search-bar-section">
              <div class="search-bar-box d-flex">
                <button @click="openSearchBar">
                  <img src="~/assets/images/magnifier.svg" alt="Ricerca" />
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
      width: 90%;
      height: 60px;
      margin: 0 auto;

      .hamburger-menu-container {
        width: 50%;
        position: relative;
        align-items: center;

        .hamburger-menu {
          cursor: pointer;

          .bar {
            display: block;
            width: 35px;
            height: 3px;
            margin: 8px auto;
            border-radius: 30%;
            background-color: rgb(0, 0, 0);
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
        height: 92vh;
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
        transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;

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
            color: #fff;
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
          align-items: center;
          padding: 4.5rem 3rem 1rem;
          list-style: none;
          margin: 0;

          li {
            width: 60%;
            position: relative;
            display: flex;
            margin-bottom: 0.15rem;
            opacity: 0;

            &:nth-child(odd) {
              justify-content: flex-start;
            }
            &:nth-child(even) {
              justify-content: flex-end;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 3rem;
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
        width: 50%;
        position: relative;
        justify-content: end;

        .search-bar-box {
          width: 100%;
          padding-top: 1rem;
          position: relative;
          justify-content: end;

          button {
            border: none;
            cursor: pointer;
            background-color: transparent;

            img {
              width: 20%;
              transition: transform 0.5s ease-in-out;

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
          padding-top: 0.5rem;

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
  .container .col nav .list-page {
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
      padding: 4rem 2rem 0.5rem;
      li {
        margin-bottom: 1.5rem;
        a {
          font-size: clamp(1.4rem, 6vw, 2.5rem);
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
          width: 85%;
          margin-bottom: 0.25rem;
          justify-content: center !important;
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
