<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-left">
        <div class="login-branding">
          <div class="logo-icon">
            <svg viewBox="0 0 100 100" width="60" height="60">
              <defs>
                <linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#6366f1" />
                  <stop offset="100%" style="stop-color:#8b5cf6" />
                </linearGradient>
              </defs>
              <path d="M50 5 L90 20 L90 45 C90 70 70 90 50 95 C30 90 10 70 10 45 L10 20 Z" fill="url(#loginLogoGrad)"/>
              <path d="M45 55 L35 45 L40 40 L45 45 L60 30 L65 35 Z" fill="white"/>
            </svg>
          </div>
          <h1>DataShield</h1>
          <p>Plataforma líder en anonimización de datos personales. Protege la privacidad, cumple con GDPR.</p>
        </div>
        <div class="login-features">
          <div class="feature">
            <i class="icon">🔒</i>
            <span>Encriptación de extremo a extremo</span>
          </div>
          <div class="feature">
            <i class="icon">⚡</i>
            <span>Procesamiento en tiempo real</span>
          </div>
          <div class="feature">
            <i class="icon">📊</i>
            <span>Dashboard completo de análisis</span>
          </div>
          <div class="feature">
            <i class="icon">🌍</i>
            <span>Cumplimiento GDPR garantizado</span>
          </div>
        </div>
      </div>
      
      <div class="login-right">
        <div class="login-form-container">
          <div class="form-header">
            <h2>{{ isRegister ? 'Crear Cuenta' : 'Iniciar Sesión' }}</h2>
            <p>{{ isRegister ? 'Comienza tu prueba gratuita de 14 días' : 'Accede a tu cuenta de DataShield' }}</p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="login-form">
            <div v-if="isRegister" class="form-group">
              <label for="name">Nombre completo</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                placeholder="Tu nombre"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="password">Contraseña</label>
              <div class="password-input">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="form.password" 
                  placeholder="••••••••"
                  required
                />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>
            
            <div v-if="isRegister" class="form-group">
              <label for="company">Empresa (opcional)</label>
              <input 
                type="text" 
                id="company" 
                v-model="form.company" 
                placeholder="Nombre de tu empresa"
              />
            </div>
            
            <div v-if="!isRegister" class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" v-model="rememberMe" />
                <span>Recordarme</span>
              </label>
              <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            
            <div v-if="error" class="error-message">
              <span>⚠️</span> {{ error }}
            </div>
            
            <button type="submit" class="btn-submit" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              {{ loading ? 'Procesando...' : (isRegister ? 'Crear Cuenta' : 'Iniciar Sesión') }}
            </button>
          </form>
          
          <div class="form-footer">
            <p v-if="!isRegister">
              ¿No tienes cuenta? 
              <a href="#" @click.prevent="isRegister = true">Regístrate gratis</a>
            </p>
            <p v-else>
              ¿Ya tienes cuenta? 
              <a href="#" @click.prevent="isRegister = false">Inicia sesión</a>
            </p>
          </div>
          
          <div class="demo-users">
            <p class="demo-title">👤 Usuarios de demostración:</p>
            <div class="demo-list">
              <button @click="fillDemo('admin')" class="demo-btn admin">
                <span class="badge">Admin</span>
                admin@datashield.es
              </button>
              <button @click="fillDemo('starter')" class="demo-btn">
                <span class="badge starter">Starter</span>
                starter@demo.com
              </button>
              <button @click="fillDemo('pro')" class="demo-btn">
                <span class="badge pro">Pro</span>
                pro@demo.com
              </button>
              <button @click="fillDemo('enterprise')" class="demo-btn">
                <span class="badge enterprise">Enterprise</span>
                enterprise@demo.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../services/api'

export default {
  name: 'Login',
  data() {
    return {
      isRegister: false,
      showPassword: false,
      rememberMe: false,
      loading: false,
      error: null,
      form: {
        name: '',
        email: '',
        password: '',
        company: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.error = null
      
      try {
        let response
        if (this.isRegister) {
          response = await auth.register(this.form)
        } else {
          response = await auth.login(this.form.email, this.form.password)
        }
        
        const { token, user } = response.data
        
        localStorage.setItem('datashield_token', token)
        localStorage.setItem('datashield_user', JSON.stringify(user))
        
        // Redirigir según el rol
        if (user.role === 'admin') {
          this.$router.push('/admin')
        } else {
          this.$router.push('/dashboard')
        }
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al procesar la solicitud'
      } finally {
        this.loading = false
      }
    },
    fillDemo(type) {
      const demos = {
        admin: { email: 'admin@datashield.es', password: 'Admin2024!' },
        starter: { email: 'starter@demo.com', password: 'Starter123!' },
        pro: { email: 'pro@demo.com', password: 'Pro12345!' },
        enterprise: { email: 'enterprise@demo.com', password: 'Enterprise1!' }
      }
      this.form.email = demos[type].email
      this.form.password = demos[type].password
      this.isRegister = false
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-container {
  display: flex;
  width: 100%;
  max-width: 1400px;
  margin: auto;
  min-height: 100vh;
}

.login-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  color: white;
}

.login-branding {
  margin-bottom: 60px;
}

.login-branding .logo-icon {
  margin-bottom: 20px;
}

.login-branding h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 16px;
}

.login-branding p {
  font-size: 1.2rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 400px;
}

.login-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.1rem;
}

.feature .icon {
  font-size: 1.5rem;
}

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
  border-radius: 40px 0 0 40px;
}

.login-form-container {
  width: 100%;
  max-width: 420px;
}

.form-header {
  margin-bottom: 32px;
  text-align: center;
}

.form-header h2 {
  font-size: 2rem;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.form-header p {
  color: #666;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.form-group input {
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.password-input {
  position: relative;
}

.password-input input {
  width: 100%;
  padding-right: 50px;
}

.toggle-password {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #666;
}

.forgot-password {
  color: #6366f1;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-submit {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.form-footer {
  margin-top: 24px;
  text-align: center;
  color: #666;
}

.form-footer a {
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}

.demo-users {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.demo-title {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 12px;
}

.demo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  color: #374151;
  transition: all 0.2s ease;
}

.demo-btn:hover {
  background: #f1f5f9;
  border-color: #6366f1;
}

.demo-btn .badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.demo-btn.admin .badge {
  background: #dc2626;
  color: white;
}

.demo-btn .badge.starter {
  background: #10b981;
  color: white;
}

.demo-btn .badge.pro {
  background: #6366f1;
  color: white;
}

.demo-btn .badge.enterprise {
  background: #f59e0b;
  color: white;
}

@media (max-width: 1024px) {
  .login-container {
    flex-direction: column;
  }
  
  .login-left {
    padding: 40px;
    text-align: center;
    align-items: center;
  }
  
  .login-right {
    border-radius: 40px 40px 0 0;
    padding: 40px 20px;
  }
  
  .login-branding h1 {
    font-size: 2rem;
  }
  
  .login-features {
    display: none;
  }
}
</style>
