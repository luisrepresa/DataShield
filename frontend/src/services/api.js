import axios from 'axios'

const API_BASE = '/api'

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para añadir token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('datashield_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('datashield_token')
      localStorage.removeItem('datashield_user')
      window.location.href = '/#/login'
    }
    return Promise.reject(error)
  }
)

// Auth
export const auth = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data)
}

// User Dashboard
export const user = {
  getDashboard: () => api.get('/user/dashboard'),
  getHistory: (page = 1, limit = 20) => api.get(`/user/history?page=${page}&limit=${limit}`),
  getStats: () => api.get('/user/stats'),
  getPatterns: () => api.get('/user/patterns'),
  createPattern: (data) => api.post('/user/patterns', data),
  deletePattern: (id) => api.delete(`/user/patterns/${id}`),
  getApiKeys: () => api.get('/user/api-keys'),
  createApiKey: (name) => api.post('/user/api-keys', { name }),
  deleteApiKey: (id) => api.delete(`/user/api-keys/${id}`),
  getBilling: () => api.get('/user/billing'),
  recordAnonymization: (data) => api.post('/user/record-anonymization', data)
}

// Admin
export const admin = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getBilling: () => api.get('/admin/billing'),
  getUsageStats: () => api.get('/admin/usage-stats'),
  getActivity: () => api.get('/admin/activity'),
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data) => api.put('/admin/settings', data)
}

// Payments
export const payments = {
  getPlans: () => api.get('/payments/plans'),
  createCheckout: (data) => api.post('/payments/create-checkout-session', data),
  processPayment: (data) => api.post('/payments/process-payment', data)
}

// Anonymization
export const anonymization = {
  detect: (text, customPatterns) => api.post('/anonymization/detect', { text, customPatterns }),
  anonymize: (text, sensitiveItems) => api.post('/anonymization/anonymize', { text, sensitiveItems }),
  deanonymize: (text, sessionId, manualMapping) => api.post('/anonymization/deanonymize', { text, sessionId, manualMapping }),
  getPatterns: () => api.get('/anonymization/patterns')
}

export default api
