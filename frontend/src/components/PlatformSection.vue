<template>
  <section id="plataforma" class="section platform-section">
    <div class="container">
      <h2 class="section-title">Plataforma de Anonimización</h2>
      <p class="section-subtitle">
        Prueba nuestra tecnología ahora mismo. Escribe un texto con datos sensibles y observa la magia.
      </p>
      
      <div class="platform-wrapper">
        <div class="platform-tabs">
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'anonymize' }"
            @click="activeTab = 'anonymize'"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            Anonimizar
          </button>
          <button 
            class="tab-btn"
            :class="{ active: activeTab === 'restore' }"
            @click="activeTab = 'restore'"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Restaurar
          </button>
        </div>
        
        <!-- Pestaña Anonimizar -->
        <div v-if="activeTab === 'anonymize'" class="platform-content">
          <div class="input-section">
            <div class="section-header">
              <h3>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Tu Prompt Original
              </h3>
              <button class="btn-icon" @click="loadExample" title="Cargar ejemplo">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
            </div>
            <textarea 
              v-model="originalText"
              class="form-textarea main-textarea"
              placeholder="Escribe aquí tu prompt con datos sensibles...&#10;&#10;Ejemplo: Hola, me llamo María García y mi email es maria@email.com. Mi DNI es 12345678A y mi teléfono es 612 345 678."
              @input="resetDetection"
            ></textarea>
            
            <div class="action-row">
              <button 
                class="btn btn-primary"
                @click="detectSensitiveData"
                :disabled="!originalText.trim() || isProcessing"
              >
                <svg v-if="!isProcessing" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <span v-if="isProcessing" class="spinner"></span>
                {{ isProcessing ? 'Analizando...' : 'Detectar Datos Sensibles' }}
              </button>
            </div>
          </div>
          
          <!-- Datos detectados -->
          <div v-if="detectedData.length > 0" class="detected-section">
            <div class="section-header">
              <h3>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                Datos Detectados ({{ detectedData.length }})
              </h3>
            </div>
            
            <div class="detected-items">
              <div 
                v-for="(item, index) in detectedData" 
                :key="index"
                class="detected-item"
              >
                <div class="item-info">
                  <span class="item-original">{{ item.original }}</span>
                  <span class="item-arrow">→</span>
                  <span class="item-tag">[{{ item.type }}_{{ item.id }}]</span>
                </div>
                <div class="item-type">
                  <span :class="'tag tag-' + getTagColor(item.type)">{{ item.type }}</span>
                </div>
              </div>
            </div>
            
            <div class="action-row">
              <button 
                class="btn btn-primary"
                @click="anonymizeText"
                :disabled="isProcessing"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Generar Prompt Anonimizado
              </button>
            </div>
          </div>
          
          <!-- Resultado anonimizado -->
          <div v-if="anonymizedText" class="result-section">
            <div class="section-header">
              <h3>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                Prompt Protegido
              </h3>
              <button class="btn-icon" @click="copyToClipboard(anonymizedText)" title="Copiar">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
            <div class="result-box">
              <p v-html="highlightTags(anonymizedText)"></p>
            </div>
            <div class="result-info">
              <span class="info-badge success">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                ¡Listo! Copia este texto y envíalo a cualquier IA
              </span>
              <span class="session-id">Session ID: {{ sessionId }}</span>
            </div>
          </div>
        </div>
        
        <!-- Pestaña Restaurar -->
        <div v-if="activeTab === 'restore'" class="platform-content">
          <div class="input-section">
            <div class="section-header">
              <h3>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
                Respuesta de la IA (con etiquetas)
              </h3>
            </div>
            <textarea 
              v-model="aiResponse"
              class="form-textarea main-textarea"
              placeholder="Pega aquí la respuesta de la IA que contiene las etiquetas [TIPO_id]...&#10;&#10;La respuesta se restaurará automáticamente con tus datos originales."
            ></textarea>
            
            <div class="action-row">
              <button 
                class="btn btn-primary"
                @click="restoreData"
                :disabled="!aiResponse.trim() || isProcessing"
              >
                <svg v-if="!isProcessing" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span v-if="isProcessing" class="spinner"></span>
                {{ isProcessing ? 'Restaurando...' : 'Restaurar Datos Originales' }}
              </button>
            </div>
          </div>
          
          <!-- Resultado restaurado -->
          <div v-if="restoredText" class="result-section">
            <div class="section-header">
              <h3>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Respuesta Completa
              </h3>
              <button class="btn-icon" @click="copyToClipboard(restoredText)" title="Copiar">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
            <div class="result-box restored">
              <p>{{ restoredText }}</p>
            </div>
            <div class="result-info">
              <span class="info-badge success">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                ¡Datos restaurados correctamente!
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Toast notification -->
      <transition name="toast">
        <div v-if="showToast" class="toast" :class="toastType">
          {{ toastMessage }}
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

const API_BASE = '/api/anonymization'

export default {
  name: 'PlatformSection',
  data() {
    return {
      activeTab: 'anonymize',
      originalText: '',
      detectedData: [],
      anonymizedText: '',
      sessionId: '',
      aiResponse: '',
      restoredText: '',
      isProcessing: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      currentMapping: {}
    }
  },
  methods: {
    loadExample() {
      this.originalText = `Hola, me llamo María García López y necesito ayuda con un problema legal.

Mi email es maria.garcia@gmail.com y mi teléfono de contacto es 612 345 678.
Mi DNI es 12345678A y vivo en la Calle Mayor 45, 28001 Madrid.

El pasado 15/03/2024 recibí una carta del banco donde tengo mi cuenta 
ES91 2100 0418 4502 0005 1332 solicitando documentación adicional.

¿Podrías ayudarme a redactar una respuesta formal?`
      this.resetDetection()
    },
    
    resetDetection() {
      this.detectedData = []
      this.anonymizedText = ''
      this.sessionId = ''
    },
    
    async detectSensitiveData() {
      if (!this.originalText.trim()) return
      
      this.isProcessing = true
      try {
        const response = await axios.post(`${API_BASE}/detect`, {
          text: this.originalText
        })
        
        this.detectedData = response.data.detectedData
        
        if (this.detectedData.length === 0) {
          this.showNotification('No se detectaron datos sensibles en el texto', 'warning')
        } else {
          this.showNotification(`Se detectaron ${this.detectedData.length} datos sensibles`, 'success')
        }
      } catch (error) {
        console.error('Error detecting data:', error)
        this.showNotification('Error al analizar el texto', 'error')
      } finally {
        this.isProcessing = false
      }
    },
    
    async anonymizeText() {
      if (this.detectedData.length === 0) return
      
      this.isProcessing = true
      try {
        const response = await axios.post(`${API_BASE}/anonymize`, {
          text: this.originalText,
          sensitiveItems: this.detectedData
        })
        
        this.anonymizedText = response.data.anonymizedText
        this.sessionId = response.data.sessionId
        
        // Guardar mapeo para restauración
        this.currentMapping = {}
        this.detectedData.forEach(item => {
          this.currentMapping[`[${item.type}_${item.id}]`] = item.original
        })
        
        this.showNotification('¡Texto anonimizado correctamente!', 'success')
      } catch (error) {
        console.error('Error anonymizing:', error)
        this.showNotification('Error al anonimizar el texto', 'error')
      } finally {
        this.isProcessing = false
      }
    },
    
    async restoreData() {
      if (!this.aiResponse.trim()) return
      
      this.isProcessing = true
      try {
        const response = await axios.post(`${API_BASE}/deanonymize`, {
          text: this.aiResponse,
          sessionId: this.sessionId || null,
          manualMapping: Object.keys(this.currentMapping).length > 0 ? this.currentMapping : null
        })
        
        this.restoredText = response.data.deanonymizedText
        this.showNotification('¡Datos restaurados correctamente!', 'success')
      } catch (error) {
        console.error('Error restoring:', error)
        this.showNotification('Error al restaurar los datos. Asegúrate de haber anonimizado primero.', 'error')
      } finally {
        this.isProcessing = false
      }
    },
    
    highlightTags(text) {
      return text.replace(/\[([A-Z_]+)_([a-z0-9]+)\]/g, '<span class="tag-highlight">[$1_$2]</span>')
    },
    
    getTagColor(type) {
      const colors = {
        'EMAIL': 'primary',
        'TELEFONO': 'success',
        'DNI': 'warning',
        'NIE': 'warning',
        'NOMBRE': 'danger',
        'TARJETA': 'danger',
        'IBAN': 'primary',
        'FECHA': 'success',
        'CP': 'primary',
        'IP': 'warning'
      }
      return colors[type] || 'primary'
    },
    
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text)
        this.showNotification('¡Copiado al portapapeles!', 'success')
      } catch {
        this.showNotification('Error al copiar', 'error')
      }
    },
    
    showNotification(message, type = 'success') {
      this.toastMessage = message
      this.toastType = type
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.platform-section {
  background: linear-gradient(180deg, var(--white) 0%, var(--gray-100) 100%);
  padding-bottom: 120px;
}

.platform-wrapper {
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  border: 1px solid var(--gray-200);
}

.platform-tabs {
  display: flex;
  background: var(--gray-100);
  padding: 8px;
  gap: 8px;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-500);
  background: transparent;
  border-radius: var(--radius);
  transition: all 0.3s ease;
}

.tab-btn:hover {
  color: var(--primary);
}

.tab-btn.active {
  background: var(--white);
  color: var(--primary);
  box-shadow: var(--shadow);
}

.platform-content {
  padding: 32px;
}

.input-section,
.detected-section,
.result-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-header h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--dark);
}

.section-header h3 svg {
  color: var(--primary);
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-100);
  border-radius: 8px;
  color: var(--gray-500);
  transition: all 0.3s ease;
}

.btn-icon:hover {
  background: var(--primary);
  color: var(--white);
}

.main-textarea {
  min-height: 180px;
  font-size: 1rem;
  line-height: 1.7;
}

.action-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.detected-items {
  background: var(--gray-100);
  border-radius: var(--radius);
  padding: 16px;
  max-height: 300px;
  overflow-y: auto;
}

.detected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--white);
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid var(--gray-200);
}

.detected-item:last-child {
  margin-bottom: 0;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
}

.item-original {
  color: var(--danger);
  background: rgba(239, 68, 68, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}

.item-arrow {
  color: var(--gray-400);
}

.item-tag {
  color: var(--success);
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}

.result-box {
  background: var(--dark);
  border-radius: var(--radius);
  padding: 24px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--gray-300);
}

.result-box.restored {
  background: linear-gradient(135deg, #065f46 0%, #064e3b 100%);
  color: #d1fae5;
}

.result-box :deep(.tag-highlight) {
  background: rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.result-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.info-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.info-badge.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.session-id {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  color: var(--gray-400);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Toast */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 24px;
  border-radius: var(--radius);
  font-weight: 500;
  z-index: 1001;
  box-shadow: var(--shadow-lg);
}

.toast.success {
  background: var(--success);
  color: var(--white);
}

.toast.error {
  background: var(--danger);
  color: var(--white);
}

.toast.warning {
  background: var(--warning);
  color: var(--dark);
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

@media (max-width: 768px) {
  .platform-content {
    padding: 20px;
  }

  .detected-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .item-info {
    flex-wrap: wrap;
  }

  .result-info {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
