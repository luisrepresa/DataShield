<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar-content">
      <a href="#" class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 100 100" width="40" height="40">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#6366f1" />
                <stop offset="100%" style="stop-color:#8b5cf6" />
              </linearGradient>
            </defs>
            <path d="M50 5 L90 20 L90 45 C90 70 70 90 50 95 C30 90 10 70 10 45 L10 20 Z" fill="url(#logoGrad)"/>
            <path d="M45 55 L35 45 L40 40 L45 45 L60 30 L65 35 Z" fill="white"/>
          </svg>
        </div>
        <span class="logo-text">DataShield</span>
      </a>
      
      <div class="nav-links" :class="{ active: menuOpen }">
        <a href="#sobre-nosotros" class="nav-link" @click="closeMenu">Sobre Nosotros</a>
        <a href="#como-ayudamos" class="nav-link" @click="closeMenu">Cómo Ayudamos</a>
        <a href="#plataforma" class="nav-link" @click="closeMenu">Plataforma</a>
        <a href="#precios" class="nav-link" @click="closeMenu">Precios</a>
        <a href="#precios" class="btn btn-primary nav-cta" @click="closeMenu">Empezar Gratis</a>
      </div>
      
      <button class="menu-toggle" @click="toggleMenu" aria-label="Menú">
        <span :class="{ active: menuOpen }"></span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isScrolled: false,
      menuOpen: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    closeMenu() {
      this.menuOpen = false
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow);
  padding: 12px 0;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-weight: 500;
  color: var(--gray-600);
  transition: color 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-cta {
  padding: 10px 20px;
  font-size: 0.9rem;
}

.menu-toggle {
  display: none;
  width: 32px;
  height: 32px;
  background: transparent;
  position: relative;
}

.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--dark);
  position: absolute;
  transition: all 0.3s ease;
}

.menu-toggle span {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu-toggle span::before {
  content: '';
  top: -8px;
}

.menu-toggle span::after {
  content: '';
  top: 8px;
}

.menu-toggle span.active {
  background: transparent;
}

.menu-toggle span.active::before {
  top: 0;
  transform: rotate(45deg);
}

.menu-toggle span.active::after {
  top: 0;
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--white);
    flex-direction: column;
    padding: 24px;
    gap: 16px;
    box-shadow: var(--shadow-lg);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav-cta {
    width: 100%;
  }
}
</style>
