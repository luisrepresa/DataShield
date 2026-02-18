<template>
  <section id="sobre-nosotros" class="section about-section">
    <div class="container">
      <h2 class="section-title">Sobre Nosotros</h2>
      <p class="section-subtitle">
        Somos pioneros en la protección de datos personales en el uso de inteligencia artificial en España
      </p>
      
      <div class="about-content">
        <div class="about-image">
          <div class="image-wrapper">
            <div class="image-decoration"></div>
            <div class="image-placeholder">
              <svg width="120" height="120" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="about-text">
          <div class="about-badge">
            <span class="badge-flag">🇪🇸</span>
            <span>Primera empresa de España en anonimización para IA</span>
          </div>
          
          <h3 class="about-heading">
            Nacimos para proteger lo que más importa: <span>tu privacidad</span>
          </h3>
          
          <p class="about-description">
            En DataShield creemos que la inteligencia artificial debe ser accesible para todos, 
            pero sin comprometer la seguridad de tus datos personales. Fundada en 2024, somos 
            la primera empresa española especializada en anonimización de datos para el uso 
            seguro de herramientas de IA como ChatGPT, Gemini, Claude y otras.
          </p>
          
          <p class="about-description">
            Nuestro equipo de expertos en ciberseguridad, privacidad y procesamiento de lenguaje 
            natural ha desarrollado tecnología única que detecta y protege automáticamente 
            información sensible antes de enviarla a cualquier sistema de IA.
          </p>
          
          <div class="about-values">
            <div class="value-item">
              <div class="value-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <h4>Seguridad Total</h4>
                <p>Tus datos nunca salen de tu control</p>
              </div>
            </div>
            
            <div class="value-item">
              <div class="value-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div>
                <h4>GDPR Compliance</h4>
                <p>100% cumplimiento normativo europeo</p>
              </div>
            </div>
            
            <div class="value-item">
              <div class="value-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div>
                <h4>Tecnología Propia</h4>
                <p>Desarrollada íntegramente en España</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection'
}
</script>

<style scoped>
.about-section {
  background: var(--gray-100);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;
}

.about-image {
  position: relative;
}

.image-wrapper {
  position: relative;
}

.image-decoration {
  position: absolute;
  top: -20px;
  left: -20px;
  right: 20px;
  bottom: 20px;
  background: var(--gradient-primary);
  border-radius: var(--radius-xl);
  opacity: 0.1;
}

.image-placeholder {
  position: relative;
  aspect-ratio: 4/3;
  background: var(--white);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-xl);
  color: var(--primary);
}

.about-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(99, 102, 241, 0.1);
  padding: 10px 18px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--primary);
  margin-bottom: 24px;
}

.badge-flag {
  font-size: 1.2rem;
}

.about-heading {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--dark);
  line-height: 1.3;
  margin-bottom: 24px;
}

.about-heading span {
  color: var(--primary);
}

.about-description {
  color: var(--gray-600);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
}

.about-values {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
}

.value-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.value-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--gradient-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
}

.value-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 4px;
}

.value-item p {
  color: var(--gray-500);
  font-size: 0.95rem;
}

@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .about-image {
    order: -1;
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .about-heading {
    font-size: 1.75rem;
  }
}
</style>
