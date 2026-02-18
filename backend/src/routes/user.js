const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { users, sessions, planLimits } = require('./auth');

// Historial de anonimizaciones por usuario
const anonymizationHistory = new Map();

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const session = sessions.get(token);
  if (!session || new Date() > session.expiresAt) {
    return res.status(401).json({ error: 'Sesión inválida o expirada' });
  }

  const user = users.get(session.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  req.user = user;
  next();
};

// Aplicar auth a todas las rutas
router.use(authMiddleware);

// Dashboard del usuario
router.get('/dashboard', (req, res) => {
  try {
    const user = req.user;
    const limits = planLimits[user.plan];
    
    // Obtener historial del usuario
    const history = anonymizationHistory.get(user.id) || [];
    const recentHistory = history.slice(-10).reverse();

    // Calcular uso
    const usagePercentage = limits.anonymizationsPerMonth === -1 
      ? 0 
      : Math.round((user.usage.anonymizationsThisMonth / limits.anonymizationsPerMonth) * 100);

    const dashboard = {
      user: {
        name: user.name,
        email: user.email,
        plan: user.plan,
        company: user.company,
        memberSince: user.createdAt,
        trialEndsAt: user.trialEndsAt
      },
      usage: {
        anonymizationsThisMonth: user.usage.anonymizationsThisMonth,
        anonymizationsTotal: user.usage.anonymizationsTotal,
        limit: limits.anonymizationsPerMonth,
        percentage: usagePercentage,
        remaining: limits.anonymizationsPerMonth === -1 
          ? 'Ilimitado' 
          : limits.anonymizationsPerMonth - user.usage.anonymizationsThisMonth
      },
      plan: {
        name: user.plan.charAt(0).toUpperCase() + user.plan.slice(1),
        limits,
        features: getPlanFeatures(user.plan)
      },
      recentActivity: recentHistory,
      quickStats: {
        savedDataPoints: user.usage.anonymizationsTotal * 3.5, // promedio de datos por anonimización
        timeSaved: Math.round(user.usage.anonymizationsTotal * 0.5), // minutos ahorrados
        privacyScore: 98
      }
    };

    res.json({ success: true, dashboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Historial de anonimizaciones
router.get('/history', (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const history = anonymizationHistory.get(req.user.id) || [];
    
    // Ordenar por fecha descendente
    const sortedHistory = [...history].reverse();
    
    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedHistory = sortedHistory.slice(startIndex, endIndex);

    res.json({
      success: true,
      history: paginatedHistory,
      pagination: {
        total: history.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(history.length / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar anonimización (llamado internamente)
router.post('/record-anonymization', (req, res) => {
  try {
    const { originalLength, anonymizedLength, dataTypesFound, sessionId } = req.body;
    const user = req.user;
    const limits = planLimits[user.plan];

    // Verificar límites
    if (limits.anonymizationsPerMonth !== -1 && 
        user.usage.anonymizationsThisMonth >= limits.anonymizationsPerMonth) {
      return res.status(403).json({ 
        error: 'Has alcanzado el límite de anonimizaciones de tu plan',
        upgradeRequired: true
      });
    }

    // Registrar en historial
    const record = {
      id: uuidv4(),
      timestamp: new Date(),
      originalLength,
      anonymizedLength,
      dataTypesFound,
      sessionId
    };

    if (!anonymizationHistory.has(user.id)) {
      anonymizationHistory.set(user.id, []);
    }
    anonymizationHistory.get(user.id).push(record);

    // Actualizar contadores del usuario
    user.usage.anonymizationsThisMonth++;
    user.usage.anonymizationsTotal++;
    user.usage.lastActivity = new Date();

    res.json({ 
      success: true, 
      record,
      usage: {
        thisMonth: user.usage.anonymizationsThisMonth,
        limit: limits.anonymizationsPerMonth,
        remaining: limits.anonymizationsPerMonth === -1 
          ? 'Ilimitado' 
          : limits.anonymizationsPerMonth - user.usage.anonymizationsThisMonth
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener estadísticas de uso
router.get('/stats', (req, res) => {
  try {
    const user = req.user;
    const history = anonymizationHistory.get(user.id) || [];
    
    // Estadísticas por tipo de dato
    const dataTypeStats = {};
    history.forEach(record => {
      if (record.dataTypesFound) {
        record.dataTypesFound.forEach(type => {
          dataTypeStats[type] = (dataTypeStats[type] || 0) + 1;
        });
      }
    });

    // Uso por día (últimos 7 días)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = history.filter(r => 
        r.timestamp && new Date(r.timestamp).toISOString().split('T')[0] === dateStr
      ).length;
      
      last7Days.push({ date: dateStr, count });
    }

    res.json({
      success: true,
      stats: {
        totalAnonymizations: user.usage.anonymizationsTotal,
        thisMonth: user.usage.anonymizationsThisMonth,
        dataTypeStats,
        usageByDay: last7Days,
        averageDataPointsPerAnonymization: 3.5,
        mostCommonDataType: Object.entries(dataTypeStats)
          .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Patrones personalizados del usuario
const userPatterns = new Map();

router.get('/patterns', (req, res) => {
  try {
    const patterns = userPatterns.get(req.user.id) || [];
    const limits = planLimits[req.user.plan];
    
    res.json({
      success: true,
      patterns,
      limit: limits.customPatterns,
      remaining: limits.customPatterns === -1 
        ? 'Ilimitado' 
        : limits.customPatterns - patterns.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/patterns', (req, res) => {
  try {
    const { name, regex, label, description } = req.body;
    const limits = planLimits[req.user.plan];
    
    if (!userPatterns.has(req.user.id)) {
      userPatterns.set(req.user.id, []);
    }
    
    const patterns = userPatterns.get(req.user.id);
    
    // Verificar límite
    if (limits.customPatterns !== -1 && patterns.length >= limits.customPatterns) {
      return res.status(403).json({ 
        error: 'Has alcanzado el límite de patrones personalizados',
        upgradeRequired: true
      });
    }

    // Validar regex
    try {
      new RegExp(regex);
    } catch (e) {
      return res.status(400).json({ error: 'Expresión regular inválida' });
    }

    const pattern = {
      id: uuidv4(),
      name,
      regex,
      label: label.toUpperCase(),
      description,
      createdAt: new Date()
    };

    patterns.push(pattern);

    res.json({
      success: true,
      pattern,
      message: 'Patrón creado correctamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/patterns/:patternId', (req, res) => {
  try {
    const patterns = userPatterns.get(req.user.id) || [];
    const index = patterns.findIndex(p => p.id === req.params.patternId);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Patrón no encontrado' });
    }

    patterns.splice(index, 1);

    res.json({
      success: true,
      message: 'Patrón eliminado'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Keys (para plan Professional y Enterprise)
const apiKeys = new Map();

router.get('/api-keys', (req, res) => {
  try {
    const limits = planLimits[req.user.plan];
    
    if (!limits.apiAccess) {
      return res.status(403).json({ 
        error: 'Tu plan no incluye acceso a la API',
        upgradeRequired: true
      });
    }

    const keys = apiKeys.get(req.user.id) || [];
    
    // Ocultar parte de las keys
    const maskedKeys = keys.map(k => ({
      ...k,
      key: k.key.slice(0, 8) + '...' + k.key.slice(-4)
    }));

    res.json({
      success: true,
      apiKeys: maskedKeys
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/api-keys', (req, res) => {
  try {
    const { name } = req.body;
    const limits = planLimits[req.user.plan];
    
    if (!limits.apiAccess) {
      return res.status(403).json({ 
        error: 'Tu plan no incluye acceso a la API',
        upgradeRequired: true
      });
    }

    if (!apiKeys.has(req.user.id)) {
      apiKeys.set(req.user.id, []);
    }

    const key = 'ds_' + uuidv4().replace(/-/g, '');
    const apiKey = {
      id: uuidv4(),
      name: name || 'API Key',
      key,
      createdAt: new Date(),
      lastUsed: null,
      usageCount: 0
    };

    apiKeys.get(req.user.id).push(apiKey);

    res.json({
      success: true,
      apiKey, // Devolver la key completa solo en la creación
      message: 'Guarda esta API key, no podrás verla completa de nuevo'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/api-keys/:keyId', (req, res) => {
  try {
    const keys = apiKeys.get(req.user.id) || [];
    const index = keys.findIndex(k => k.id === req.params.keyId);
    
    if (index === -1) {
      return res.status(404).json({ error: 'API Key no encontrada' });
    }

    keys.splice(index, 1);

    res.json({
      success: true,
      message: 'API Key eliminada'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Información de facturación del usuario
router.get('/billing', (req, res) => {
  try {
    const user = req.user;
    const prices = {
      starter: { monthly: 9, annual: 84 },
      professional: { monthly: 29, annual: 288 },
      enterprise: { monthly: 99, annual: 948 }
    };

    // Simular historial de facturas
    const invoices = [
      {
        id: 'INV-2024-001',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        amount: prices[user.plan].monthly,
        status: 'paid',
        plan: user.plan
      },
      {
        id: 'INV-2024-002',
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        amount: prices[user.plan].monthly,
        status: 'paid',
        plan: user.plan
      }
    ];

    res.json({
      success: true,
      billing: {
        currentPlan: user.plan,
        price: prices[user.plan],
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        paymentMethod: {
          type: 'card',
          last4: '4242',
          brand: 'Visa',
          expiryMonth: 12,
          expiryYear: 2027
        }
      },
      invoices
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getPlanFeatures(plan) {
  const features = {
    starter: [
      '500 anonimizaciones/mes',
      '8 tipos de datos sensibles',
      'Historial 7 días',
      'Soporte por email'
    ],
    professional: [
      '5.000 anonimizaciones/mes',
      '20+ tipos de datos sensibles',
      'Historial 90 días',
      'API Access (10K calls/mes)',
      '5 patrones personalizados',
      'Extensión navegador',
      'Soporte prioritario'
    ],
    enterprise: [
      'Anonimizaciones ilimitadas',
      'Todos los tipos de datos',
      'Historial ilimitado',
      'API ilimitada',
      'Patrones ilimitados',
      'SSO y gestión equipos',
      'Dashboard analíticas',
      'SLA 99.9%',
      'Soporte 24/7'
    ]
  };

  return features[plan] || [];
}

module.exports = router;
