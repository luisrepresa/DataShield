# DataShield 🛡️

Plataforma de anonimización de datos personales con cumplimiento GDPR.

## 🚀 Despliegue en Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template)

## 📋 Características

- ✅ Anonimización de datos en tiempo real
- ✅ Dashboard de usuario completo
- ✅ Panel de administración
- ✅ Historial de uso
- ✅ Múltiples planes de suscripción
- ✅ Cumplimiento GDPR

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# Ejecutar en desarrollo
cd backend && npm run dev    # Puerto 3001
cd frontend && npm run dev   # Puerto 5173
```

## 👤 Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@datashield.es | Admin2024! |
| Starter | starter@demo.com | Starter123! |
| Pro | pro@demo.com | Pro12345! |
| Enterprise | enterprise@demo.com | Enterprise1! |

## 📁 Estructura

```
DataShield/
├── backend/          # API Node.js + Express
│   └── src/
│       ├── index.js
│       └── routes/
├── frontend/         # Vue.js 3 + Vite
│   └── src/
│       ├── components/
│       ├── views/
│       └── services/
└── package.json
```

## 🌐 Variables de Entorno

```env
NODE_ENV=production
PORT=3001
```

## 📄 Licencia

MIT © DataShield España
