<template>
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-pattern"></div>
    </div>
    <div class="container hero-content">
      <div class="hero-text">
        <div class="hero-badge">
          <span class="badge-icon">🇪🇸</span>
          <span>Pioneros en España</span>
        </div>
        <h1 class="hero-title">
          Protege tu <span class="gradient-text">privacidad</span> al usar
          <span class="gradient-text">Inteligencia Artificial</span>
        </h1>
        <p class="hero-description">
          DataShield es la primera plataforma española de anonimización de datos para IA. 
          Envía prompts a ChatGPT, Gemini o cualquier IA sin exponer información sensible.
        </p>
        <div class="hero-actions">
          <a href="#plataforma" class="btn btn-primary">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Empezar Ahora
          </a>
          <a href="#como-ayudamos" class="btn btn-outline">
            Descubre Más
          </a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-value">100%</span>
            <span class="stat-label">Privacidad</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">GDPR</span>
            <span class="stat-label">Compliance</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">&lt;1s</span>
            <span class="stat-label">Procesamiento</span>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="visual-card animate-float">
          <div class="visual-header">
            <div class="visual-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="visual-title">Prompt Original</span>
          </div>
          <div class="visual-content">
            <p>Hola, soy <span class="highlight danger">María García</span> y mi email es <span class="highlight danger">maria@email.com</span>. Mi DNI es <span class="highlight danger">12345678A</span>.</p>
          </div>
          <div class="visual-arrow">↓</div>
          <div class="visual-header">
            <span class="visual-title protected">Prompt Protegido</span>
          </div>
          <div class="visual-content">
            <p>Hola, soy <span class="highlight success">[NOMBRE_a1b2]</span> y mi email es <span class="highlight success">[EMAIL_c3d4]</span>. Mi DNI es <span class="highlight success">[DNI_e5f6]</span>.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-wave">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="var(--gray-100)"/>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.9rem;
  color: var(--primary-light);
  margin-bottom: 24px;
}

.badge-icon {
  font-size: 1.1rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--white);
  margin-bottom: 24px;
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--gray-400);
  line-height: 1.8;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--white);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--gray-500);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--gray-600);
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.visual-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  padding: 24px;
  width: 100%;
  max-width: 450px;
}

.visual-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.visual-dots {
  display: flex;
  gap: 6px;
}

.visual-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--gray-600);
}

.visual-dots span:first-child { background: #ef4444; }
.visual-dots span:nth-child(2) { background: #f59e0b; }
.visual-dots span:last-child { background: #10b981; }

.visual-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--gray-400);
}

.visual-title.protected {
  color: var(--success);
}

.visual-content {
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius);
  padding: 16px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  color: var(--gray-300);
  line-height: 1.6;
}

.highlight {
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.highlight.danger {
  background: rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.highlight.success {
  background: rgba(16, 185, 129, 0.3);
  color: #6ee7b7;
}

.visual-arrow {
  text-align: center;
  font-size: 1.5rem;
  color: var(--primary-light);
  margin: 16px 0;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.hero-wave svg {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .hero-visual {
    order: -1;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-stats {
    flex-wrap: wrap;
  }
}
</style>
