const express = require('express');
const cors = require('cors');
const path = require('path');
const anonymizationRoutes = require('./routes/anonymization');
const paymentsRoutes = require('./routes/payments');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Servir frontend en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
}

// Routes
app.use('/api/anonymization', anonymizationRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DataShield API funcionando correctamente' });
});

// Servir frontend para cualquier otra ruta en producción (SPA)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log('🛡️  DataShield Backend corriendo en http://localhost:' + PORT);
  console.log('📋 Usuarios de prueba disponibles:');
  console.log('   Admin: admin@datashield.es / Admin2024!');
  console.log('   Starter: starter@demo.com / Starter123!');
  console.log('   Pro: pro@demo.com / Pro12345!');
  console.log('   Enterprise: enterprise@demo.com / Enterprise1!');
});
