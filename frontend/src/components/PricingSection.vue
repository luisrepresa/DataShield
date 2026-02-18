<template>
  <section id="precios" class="section pricing-section">
    <div class="container">
      <h2 class="section-title">Planes y Precios</h2>
      <p class="section-subtitle">
        Elige el plan que mejor se adapte a tus necesidades. Todos incluyen 14 días de prueba gratuita.
      </p>
      
      <div class="billing-toggle">
        <span :class="{ active: !isAnnual }">Mensual</span>
        <button class="toggle-btn" @click="isAnnual = !isAnnual" :class="{ annual: isAnnual }">
          <span class="toggle-indicator"></span>
        </button>
        <span :class="{ active: isAnnual }">Anual <span class="discount-badge">-20%</span></span>
      </div>
      
      <div class="pricing-grid">
        <!-- Plan Starter -->
        <div class="pricing-card">
          <div class="card-header">
            <div class="plan-icon starter">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="plan-name">Starter</h3>
            <p class="plan-description">Perfecto para particulares y freelancers</p>
          </div>
          
          <div class="card-pricing">
            <div class="price">
              <span class="currency">€</span>
              <span class="amount">{{ isAnnual ? '7' : '9' }}</span>
              <span class="period">/mes</span>
            </div>
            <p class="price-note" v-if="isAnnual">Facturado anualmente (84€/año)</p>
            <p class="price-note" v-else>Facturado mensualmente</p>
          </div>
          
          <ul class="features-list">
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>500</strong> anonimizaciones/mes</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Detección automática básica</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>8 tipos de datos sensibles</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Historial 7 días</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Soporte por email</span>
            </li>
            <li class="not-included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <span>API Access</span>
            </li>
            <li class="not-included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <span>Patrones personalizados</span>
            </li>
          </ul>
          
          <button class="btn btn-secondary plan-btn" @click="selectPlan('starter')">
            Empezar Prueba Gratis
          </button>
        </div>
        
        <!-- Plan Professional -->
        <div class="pricing-card featured">
          <div class="popular-badge">Más Popular</div>
          <div class="card-header">
            <div class="plan-icon professional">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="plan-name">Professional</h3>
            <p class="plan-description">Para profesionales y pequeñas empresas</p>
          </div>
          
          <div class="card-pricing">
            <div class="price">
              <span class="currency">€</span>
              <span class="amount">{{ isAnnual ? '24' : '29' }}</span>
              <span class="period">/mes</span>
            </div>
            <p class="price-note" v-if="isAnnual">Facturado anualmente (288€/año)</p>
            <p class="price-note" v-else>Facturado mensualmente</p>
          </div>
          
          <ul class="features-list">
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>5.000</strong> anonimizaciones/mes</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Detección IA avanzada</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>20+</strong> tipos de datos sensibles</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Historial <strong>90 días</strong></span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>API Access</strong> (10K calls/mes)</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>5</strong> patrones personalizados</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Extensión Chrome/Firefox</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Soporte prioritario</span>
            </li>
          </ul>
          
          <button class="btn btn-primary plan-btn" @click="selectPlan('professional')">
            Empezar Prueba Gratis
          </button>
        </div>
        
        <!-- Plan Enterprise -->
        <div class="pricing-card">
          <div class="card-header">
            <div class="plan-icon enterprise">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3 class="plan-name">Enterprise</h3>
            <p class="plan-description">Para grandes empresas y corporaciones</p>
          </div>
          
          <div class="card-pricing">
            <div class="price">
              <span class="currency">€</span>
              <span class="amount">{{ isAnnual ? '79' : '99' }}</span>
              <span class="period">/mes</span>
            </div>
            <p class="price-note" v-if="isAnnual">Facturado anualmente (948€/año)</p>
            <p class="price-note" v-else>Facturado mensualmente</p>
          </div>
          
          <ul class="features-list">
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>Ilimitadas</strong> anonimizaciones</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>IA con modelo dedicado</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>Todos</strong> los tipos de datos</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Historial <strong>ilimitado</strong></span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>API ilimitada</strong> + webhooks</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Patrones <strong>ilimitados</strong></span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>SSO</strong> y gestión de equipos</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Dashboard analíticas</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span><strong>SLA 99.9%</strong> garantizado</span>
            </li>
            <li class="included">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Soporte 24/7 + Account Manager</span>
            </li>
          </ul>
          
          <button class="btn btn-secondary plan-btn" @click="selectPlan('enterprise')">
            Contactar Ventas
          </button>
        </div>
      </div>
      
      <div class="pricing-footer">
        <div class="guarantee">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <div>
            <strong>Garantía de devolución 30 días</strong>
            <p>Si no estás satisfecho, te devolvemos el 100% de tu dinero</p>
          </div>
        </div>
        <div class="payment-methods">
          <span>Métodos de pago:</span>
          <div class="methods-icons">
            <div class="method-icon" title="Visa">
              <svg viewBox="0 0 48 48" width="40" height="28">
                <rect fill="#1565C0" width="48" height="48" rx="6"/>
                <text x="24" y="30" fill="white" font-size="14" font-weight="bold" text-anchor="middle">VISA</text>
              </svg>
            </div>
            <div class="method-icon" title="Mastercard">
              <svg viewBox="0 0 48 48" width="40" height="28">
                <rect fill="#FF5722" width="48" height="48" rx="6"/>
                <circle cx="18" cy="24" r="12" fill="#EB001B" opacity="0.8"/>
                <circle cx="30" cy="24" r="12" fill="#F79E1B" opacity="0.8"/>
              </svg>
            </div>
            <div class="method-icon" title="PayPal">
              <svg viewBox="0 0 48 48" width="40" height="28">
                <rect fill="#003087" width="48" height="48" rx="6"/>
                <text x="24" y="28" fill="white" font-size="10" font-weight="bold" text-anchor="middle">PayPal</text>
              </svg>
            </div>
            <div class="method-icon" title="Apple Pay">
              <svg viewBox="0 0 48 48" width="40" height="28">
                <rect fill="#000" width="48" height="48" rx="6"/>
                <text x="24" y="28" fill="white" font-size="10" font-weight="bold" text-anchor="middle">Apple</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal de Pago -->
    <Teleport to="body">
      <div v-if="showPaymentModal" class="modal-overlay" @click.self="closeModal">
        <div class="payment-modal">
          <button class="modal-close" @click="closeModal">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="modal-header">
            <div class="modal-icon" :class="selectedPlan">
              <svg v-if="selectedPlan === 'starter'" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <svg v-else-if="selectedPlan === 'professional'" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <svg v-else width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3>Plan {{ getPlanName(selectedPlan) }}</h3>
            <p class="modal-price">
              <span class="modal-amount">€{{ getPrice(selectedPlan) }}</span>
              <span class="modal-period">/mes</span>
            </p>
          </div>
          
          <form @submit.prevent="processPayment" class="payment-form">
            <div class="form-section">
              <h4>Información Personal</h4>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Nombre completo</label>
                  <input type="text" class="form-input" v-model="paymentForm.name" required placeholder="Juan García">
                </div>
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-input" v-model="paymentForm.email" required placeholder="juan@empresa.com">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Empresa (opcional)</label>
                <input type="text" class="form-input" v-model="paymentForm.company" placeholder="Mi Empresa S.L.">
              </div>
            </div>
            
            <div class="form-section">
              <h4>Datos de Pago</h4>
              <div class="form-group">
                <label class="form-label">Número de tarjeta</label>
                <div class="card-input-wrapper">
                  <input 
                    type="text" 
                    class="form-input card-input" 
                    v-model="paymentForm.cardNumber" 
                    required 
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    @input="formatCardNumber"
                  >
                  <div class="card-icons">
                    <svg viewBox="0 0 48 48" width="32" height="24">
                      <rect fill="#1565C0" width="48" height="48" rx="4"/>
                      <text x="24" y="30" fill="white" font-size="12" font-weight="bold" text-anchor="middle">VISA</text>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Fecha expiración</label>
                  <input 
                    type="text" 
                    class="form-input" 
                    v-model="paymentForm.expiry" 
                    required 
                    placeholder="MM/AA"
                    maxlength="5"
                    @input="formatExpiry"
                  >
                </div>
                <div class="form-group">
                  <label class="form-label">CVC</label>
                  <input 
                    type="text" 
                    class="form-input" 
                    v-model="paymentForm.cvc" 
                    required 
                    placeholder="123"
                    maxlength="4"
                  >
                </div>
              </div>
            </div>
            
            <div class="form-section summary">
              <div class="summary-row">
                <span>Plan {{ getPlanName(selectedPlan) }}</span>
                <span>€{{ getPrice(selectedPlan) }}/mes</span>
              </div>
              <div class="summary-row" v-if="isAnnual">
                <span>Descuento anual (20%)</span>
                <span class="discount">-€{{ getDiscount(selectedPlan) }}</span>
              </div>
              <div class="summary-row total">
                <span>Total {{ isAnnual ? 'anual' : 'mensual' }}</span>
                <span>€{{ getTotalPrice(selectedPlan) }}</span>
              </div>
            </div>
            
            <div class="form-agreement">
              <label class="checkbox-label">
                <input type="checkbox" v-model="paymentForm.agree" required>
                <span class="checkmark"></span>
                <span>Acepto los <a href="#">Términos de Servicio</a> y la <a href="#">Política de Privacidad</a></span>
              </label>
            </div>
            
            <button type="submit" class="btn btn-primary btn-pay" :disabled="isProcessingPayment">
              <span v-if="isProcessingPayment" class="spinner"></span>
              <svg v-else width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              {{ isProcessingPayment ? 'Procesando...' : `Pagar €${getTotalPrice(selectedPlan)}` }}
            </button>
            
            <p class="secure-note">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Pago seguro con encriptación SSL de 256 bits
            </p>
          </form>
        </div>
      </div>
    </Teleport>
    
    <!-- Toast -->
    <transition name="toast">
      <div v-if="showToast" class="toast" :class="toastType">
        {{ toastMessage }}
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'PricingSection',
  data() {
    return {
      isAnnual: true,
      showPaymentModal: false,
      selectedPlan: '',
      isProcessingPayment: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      paymentForm: {
        name: '',
        email: '',
        company: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        agree: false
      },
      prices: {
        starter: { monthly: 9, annual: 7 },
        professional: { monthly: 29, annual: 24 },
        enterprise: { monthly: 99, annual: 79 }
      }
    }
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan
      if (plan === 'enterprise') {
        // Para enterprise, mostrar formulario de contacto o email
        window.location.href = 'mailto:ventas@datashield.es?subject=Consulta Plan Enterprise'
        return
      }
      this.showPaymentModal = true
    },
    
    closeModal() {
      this.showPaymentModal = false
      this.resetForm()
    },
    
    resetForm() {
      this.paymentForm = {
        name: '',
        email: '',
        company: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        agree: false
      }
    },
    
    getPlanName(plan) {
      const names = {
        starter: 'Starter',
        professional: 'Professional',
        enterprise: 'Enterprise'
      }
      return names[plan] || plan
    },
    
    getPrice(plan) {
      if (!this.prices[plan]) return 0
      return this.isAnnual ? this.prices[plan].annual : this.prices[plan].monthly
    },
    
    getDiscount(plan) {
      if (!this.prices[plan]) return 0
      const monthly = this.prices[plan].monthly * 12
      const annual = this.prices[plan].annual * 12
      return monthly - annual
    },
    
    getTotalPrice(plan) {
      if (!this.prices[plan]) return 0
      if (this.isAnnual) {
        return this.prices[plan].annual * 12
      }
      return this.prices[plan].monthly
    },
    
    formatCardNumber(e) {
      let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '')
      value = value.match(/.{1,4}/g)?.join(' ') || value
      this.paymentForm.cardNumber = value
    },
    
    formatExpiry(e) {
      let value = e.target.value.replace(/\D/g, '')
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4)
      }
      this.paymentForm.expiry = value
    },
    
    async processPayment() {
      this.isProcessingPayment = true
      
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      this.isProcessingPayment = false
      this.showPaymentModal = false
      this.showNotification('¡Pago procesado correctamente! Bienvenido a DataShield 🎉', 'success')
      this.resetForm()
    },
    
    showNotification(message, type = 'success') {
      this.toastMessage = message
      this.toastType = type
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 5000)
    }
  }
}
</script>

<style scoped>
.pricing-section {
  background: linear-gradient(180deg, var(--gray-100) 0%, var(--white) 100%);
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 60px;
}

.billing-toggle span {
  font-weight: 500;
  color: var(--gray-400);
  transition: color 0.3s ease;
}

.billing-toggle span.active {
  color: var(--dark);
}

.toggle-btn {
  width: 60px;
  height: 32px;
  background: var(--gray-300);
  border-radius: 20px;
  position: relative;
  transition: background 0.3s ease;
}

.toggle-btn.annual {
  background: var(--primary);
}

.toggle-indicator {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: var(--white);
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: var(--shadow);
}

.toggle-btn.annual .toggle-indicator {
  transform: translateX(28px);
}

.discount-badge {
  background: var(--success);
  color: var(--white);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 8px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 60px;
}

.pricing-card {
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: 40px 32px;
  border: 2px solid var(--gray-200);
  transition: all 0.3s ease;
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.pricing-card.featured {
  border-color: var(--primary);
  transform: scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.25);
}

.pricing-card.featured:hover {
  transform: scale(1.05) translateY(-8px);
}

.popular-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gradient-primary);
  color: var(--white);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

.card-header {
  text-align: center;
  margin-bottom: 32px;
}

.plan-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.plan-icon.starter {
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary);
}

.plan-icon.professional {
  background: var(--gradient-primary);
  color: var(--white);
}

.plan-icon.enterprise {
  background: rgba(15, 23, 42, 0.1);
  color: var(--dark);
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 8px;
}

.plan-description {
  color: var(--gray-500);
  font-size: 0.95rem;
}

.card-pricing {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--gray-200);
}

.price {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}

.currency {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark);
  margin-top: 8px;
}

.amount {
  font-size: 4rem;
  font-weight: 800;
  color: var(--dark);
  line-height: 1;
}

.period {
  font-size: 1rem;
  color: var(--gray-500);
  margin-top: 24px;
}

.price-note {
  font-size: 0.85rem;
  color: var(--gray-400);
  margin-top: 8px;
}

.features-list {
  list-style: none;
  margin-bottom: 32px;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  font-size: 0.95rem;
}

.features-list li.included {
  color: var(--dark);
}

.features-list li.included svg {
  color: var(--success);
  flex-shrink: 0;
  margin-top: 2px;
}

.features-list li.not-included {
  color: var(--gray-400);
}

.features-list li.not-included svg {
  color: var(--gray-300);
  flex-shrink: 0;
  margin-top: 2px;
}

.features-list li strong {
  color: var(--primary);
}

.plan-btn {
  width: 100%;
  padding: 16px;
  font-size: 1rem;
}

.pricing-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  background: var(--gray-100);
  border-radius: var(--radius-lg);
  flex-wrap: wrap;
  gap: 24px;
}

.guarantee {
  display: flex;
  align-items: center;
  gap: 16px;
}

.guarantee svg {
  color: var(--success);
  flex-shrink: 0;
}

.guarantee strong {
  display: block;
  color: var(--dark);
  margin-bottom: 4px;
}

.guarantee p {
  color: var(--gray-500);
  font-size: 0.9rem;
  margin: 0;
}

.payment-methods {
  display: flex;
  align-items: center;
  gap: 16px;
}

.payment-methods span {
  color: var(--gray-500);
  font-size: 0.9rem;
}

.methods-icons {
  display: flex;
  gap: 8px;
}

.method-icon {
  background: var(--white);
  padding: 6px;
  border-radius: 6px;
  box-shadow: var(--shadow-sm);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.payment-modal {
  background: var(--white);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-100);
  border-radius: 10px;
  color: var(--gray-500);
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: var(--gray-200);
  color: var(--dark);
}

.modal-header {
  text-align: center;
  padding: 40px 32px 32px;
  background: var(--gray-100);
}

.modal-icon {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: var(--white);
}

.modal-icon.starter {
  background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
}

.modal-icon.professional {
  background: var(--gradient-primary);
}

.modal-icon.enterprise {
  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
}

.modal-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 8px;
}

.modal-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.modal-amount {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
}

.modal-period {
  color: var(--gray-500);
}

.payment-form {
  padding: 32px;
}

.form-section {
  margin-bottom: 28px;
}

.form-section h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-row .form-group {
  margin-bottom: 0;
}

.card-input-wrapper {
  position: relative;
}

.card-input {
  padding-right: 50px;
}

.card-icons {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.form-section.summary {
  background: var(--gray-100);
  padding: 20px;
  border-radius: var(--radius);
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.95rem;
  color: var(--gray-600);
}

.summary-row .discount {
  color: var(--success);
}

.summary-row.total {
  border-top: 2px solid var(--gray-200);
  margin-top: 12px;
  padding-top: 16px;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--dark);
}

.form-agreement {
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--gray-600);
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray-300);
  border-radius: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.checkbox-label input:checked + .checkmark {
  background: var(--primary);
  border-color: var(--primary);
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  color: var(--white);
  font-size: 12px;
  font-weight: bold;
}

.checkbox-label a {
  color: var(--primary);
  text-decoration: underline;
}

.btn-pay {
  width: 100%;
  padding: 18px;
  font-size: 1.1rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.secure-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 0.85rem;
  color: var(--gray-500);
}

.secure-note svg {
  color: var(--success);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 32px;
  border-radius: var(--radius);
  font-weight: 500;
  z-index: 3000;
  box-shadow: var(--shadow-lg);
}

.toast.success {
  background: var(--success);
  color: var(--white);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (max-width: 1024px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
  }

  .pricing-card.featured {
    transform: none;
  }

  .pricing-card.featured:hover {
    transform: translateY(-8px);
  }
}

@media (max-width: 640px) {
  .pricing-footer {
    flex-direction: column;
    text-align: center;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
