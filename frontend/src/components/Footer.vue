<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <svg viewBox="0 0 100 100" width="40" height="40">
              <defs>
                <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#6366f1" />
                  <stop offset="100%" style="stop-color:#8b5cf6" />
                </linearGradient>
              </defs>
              <path d="M50 5 L90 20 L90 45 C90 70 70 90 50 95 C30 90 10 70 10 45 L10 20 Z" fill="url(#footerLogoGrad)"/>
              <path d="M45 55 L35 45 L40 40 L45 45 L60 30 L65 35 Z" fill="white"/>
            </svg>
            <span>DataShield</span>
          </div>
          <p class="footer-description">
            Pioneros en anonimización de datos en España. Protegemos tu privacidad mientras aprovechas el poder de la inteligencia artificial.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="GitHub">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="footer-column">
            <h4>Producto</h4>
            <a href="#plataforma">Plataforma</a>
            <a href="#precios">Precios</a>
            <a href="#">API</a>
            <a href="#">Documentación</a>
          </div>
          <div class="footer-column">
            <h4>Empresa</h4>
            <a href="#sobre-nosotros">Sobre Nosotros</a>
            <a href="#">Blog</a>
            <a href="#">Empleo</a>
            <a href="#">Contacto</a>
          </div>
          <div class="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">GDPR</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} DataShield. Todos los derechos reservados.</p>
        <p class="footer-tagline">🇪🇸 Hecho con orgullo en España</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: var(--dark);
  color: var(--gray-300);
  padding: 80px 0 30px;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 60px;
  margin-bottom: 60px;
}

.footer-brand .logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.footer-brand .logo span {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--white);
}

.footer-description {
  color: var(--gray-400);
  line-height: 1.8;
  margin-bottom: 24px;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--dark-light);
  color: var(--gray-400);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-column h4 {
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.footer-column a {
  display: block;
  color: var(--gray-400);
  padding: 8px 0;
  transition: color 0.3s ease;
}

.footer-column a:hover {
  color: var(--primary-light);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid var(--dark-light);
}

.footer-bottom p {
  color: var(--gray-500);
  font-size: 0.9rem;
}

.footer-tagline {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>
