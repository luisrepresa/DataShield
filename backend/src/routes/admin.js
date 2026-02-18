const express = require('express');
const router = express.Router();
const { users, sessions, planLimits, authMiddleware, adminMiddleware } = require('./auth');

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);
router.use(adminMiddleware);

// Dashboard principal de admin
router.get('/dashboard', (req, res) => {
  try {
    const allUsers = Array.from(users.values()).map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });

    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    // Estadísticas generales
    const stats = {
      totalUsers: allUsers.length,
      activeUsers: allUsers.filter(u => u.isActive).length,
      newUsersThisMonth: allUsers.filter(u => {
        const created = new Date(u.createdAt);
        return created.getMonth() === thisMonth && created.getFullYear() === thisYear;
      }).length,
      usersByPlan: {
        starter: allUsers.filter(u => u.plan === 'starter').length,
        professional: allUsers.filter(u => u.plan === 'professional').length,
        enterprise: allUsers.filter(u => u.plan === 'enterprise').length
      },
      totalAnonymizations: allUsers.reduce((sum, u) => sum + (u.usage?.anonymizationsTotal || 0), 0),
      anonymizationsThisMonth: allUsers.reduce((sum, u) => sum + (u.usage?.anonymizationsThisMonth || 0), 0)
    };

    // Calcular ingresos (MRR - Monthly Recurring Revenue)
    const prices = {
      starter: 9,
      professional: 29,
      enterprise: 99
    };

    const mrr = allUsers
      .filter(u => u.isActive && u.role !== 'admin')
      .reduce((sum, u) => sum + (prices[u.plan] || 0), 0);

    const arr = mrr * 12; // Annual Recurring Revenue

    // Usuarios recientes
    const recentUsers = allUsers
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    // Usuarios más activos
    const topUsers = allUsers
      .sort((a, b) => (b.usage?.anonymizationsThisMonth || 0) - (a.usage?.anonymizationsThisMonth || 0))
      .slice(0, 10);

    res.json({
      success: true,
      stats,
      revenue: {
        mrr,
        arr,
        currency: 'EUR'
      },
      recentUsers,
      topUsers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos los usuarios
router.get('/users', (req, res) => {
  try {
    const { page = 1, limit = 20, plan, status, search } = req.query;

    let allUsers = Array.from(users.values()).map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });

    // Filtros
    if (plan) {
      allUsers = allUsers.filter(u => u.plan === plan);
    }

    if (status === 'active') {
      allUsers = allUsers.filter(u => u.isActive);
    } else if (status === 'inactive') {
      allUsers = allUsers.filter(u => !u.isActive);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      allUsers = allUsers.filter(u => 
        u.name.toLowerCase().includes(searchLower) ||
        u.email.toLowerCase().includes(searchLower) ||
        (u.company && u.company.toLowerCase().includes(searchLower))
      );
    }

    // Ordenar por fecha de creación (más reciente primero)
    allUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    res.json({
      success: true,
      users: paginatedUsers,
      pagination: {
        total: allUsers.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(allUsers.length / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener usuario específico
router.get('/users/:userId', (req, res) => {
  try {
    const user = users.get(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword,
      planLimits: planLimits[user.plan]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar usuario (admin)
router.put('/users/:userId', (req, res) => {
  try {
    const user = users.get(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { name, email, plan, isActive, role, company } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (plan) user.plan = plan;
    if (isActive !== undefined) user.isActive = isActive;
    if (role) user.role = role;
    if (company !== undefined) user.company = company;

    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Usuario actualizado',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar usuario
router.delete('/users/:userId', (req, res) => {
  try {
    const user = users.get(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ error: 'No se puede eliminar un administrador' });
    }

    users.delete(req.params.userId);

    // Eliminar sesiones del usuario
    for (const [token, session] of sessions.entries()) {
      if (session.userId === req.params.userId) {
        sessions.delete(token);
      }
    }

    res.json({
      success: true,
      message: 'Usuario eliminado'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Estadísticas de facturación
router.get('/billing', (req, res) => {
  try {
    const allUsers = Array.from(users.values()).filter(u => u.role !== 'admin' && u.isActive);

    const prices = {
      starter: { monthly: 9, annual: 7 },
      professional: { monthly: 29, annual: 24 },
      enterprise: { monthly: 99, annual: 79 }
    };

    // Simular datos de facturación
    const billing = {
      currentMonth: {
        revenue: allUsers.reduce((sum, u) => sum + (prices[u.plan]?.monthly || 0), 0),
        transactions: allUsers.length,
        newSubscriptions: 3,
        cancellations: 0,
        upgrades: 2,
        downgrades: 0
      },
      mrr: allUsers.reduce((sum, u) => sum + (prices[u.plan]?.monthly || 0), 0),
      arr: allUsers.reduce((sum, u) => sum + (prices[u.plan]?.monthly || 0) * 12, 0),
      revenueByPlan: {
        starter: allUsers.filter(u => u.plan === 'starter').length * prices.starter.monthly,
        professional: allUsers.filter(u => u.plan === 'professional').length * prices.professional.monthly,
        enterprise: allUsers.filter(u => u.plan === 'enterprise').length * prices.enterprise.monthly
      },
      churnRate: 2.5, // %
      averageRevenuePerUser: allUsers.length > 0 
        ? (allUsers.reduce((sum, u) => sum + (prices[u.plan]?.monthly || 0), 0) / allUsers.length).toFixed(2)
        : 0,
      lifetimeValue: 450, // € promedio
      paymentMethods: {
        card: 75,
        paypal: 20,
        transfer: 5
      }
    };

    // Historial de ingresos (últimos 6 meses simulados)
    const revenueHistory = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      revenueHistory.push({
        month: month.toISOString().slice(0, 7),
        revenue: Math.floor(billing.mrr * (0.8 + Math.random() * 0.4)),
        users: Math.floor(allUsers.length * (0.7 + i * 0.06))
      });
    }

    res.json({
      success: true,
      billing,
      revenueHistory,
      currency: 'EUR'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Estadísticas de uso de la plataforma
router.get('/usage-stats', (req, res) => {
  try {
    const allUsers = Array.from(users.values());

    // Simular estadísticas de uso
    const usageStats = {
      totalAnonymizations: allUsers.reduce((sum, u) => sum + (u.usage?.anonymizationsTotal || 0), 0),
      anonymizationsThisMonth: allUsers.reduce((sum, u) => sum + (u.usage?.anonymizationsThisMonth || 0), 0),
      averagePerUser: allUsers.length > 0
        ? Math.floor(allUsers.reduce((sum, u) => sum + (u.usage?.anonymizationsThisMonth || 0), 0) / allUsers.length)
        : 0,
      peakHour: '10:00 - 11:00',
      peakDay: 'Martes',
      dataTypesDetected: {
        email: 35000,
        phone: 28000,
        dni: 22000,
        name: 45000,
        address: 18000,
        creditCard: 8000,
        iban: 12000,
        date: 25000
      },
      apiUsage: {
        totalCalls: 125000,
        callsThisMonth: 18500,
        averageResponseTime: '145ms',
        errorRate: 0.02
      },
      browserExtension: {
        chromeInstalls: 1250,
        firefoxInstalls: 380,
        activeUsers: 890
      }
    };

    // Uso por día de la semana (simulado)
    const usageByDay = [
      { day: 'Lunes', anonymizations: 4500 },
      { day: 'Martes', anonymizations: 5200 },
      { day: 'Miércoles', anonymizations: 4800 },
      { day: 'Jueves', anonymizations: 4600 },
      { day: 'Viernes', anonymizations: 3800 },
      { day: 'Sábado', anonymizations: 1200 },
      { day: 'Domingo', anonymizations: 900 }
    ];

    res.json({
      success: true,
      usageStats,
      usageByDay
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actividad reciente del sistema
router.get('/activity', (req, res) => {
  try {
    // Simular actividad reciente
    const activities = [
      { id: 1, type: 'user_signup', message: 'Nuevo usuario registrado: maria@empresa.com', timestamp: new Date(Date.now() - 5 * 60000), plan: 'professional' },
      { id: 2, type: 'subscription_upgrade', message: 'Usuario actualizó a Professional', timestamp: new Date(Date.now() - 15 * 60000), plan: 'professional' },
      { id: 3, type: 'payment_success', message: 'Pago recibido: €29.00', timestamp: new Date(Date.now() - 30 * 60000), amount: 29 },
      { id: 4, type: 'user_signup', message: 'Nuevo usuario registrado: carlos@startup.io', timestamp: new Date(Date.now() - 45 * 60000), plan: 'starter' },
      { id: 5, type: 'api_key_generated', message: 'Nueva API key generada para Tech Solutions', timestamp: new Date(Date.now() - 60 * 60000) },
      { id: 6, type: 'subscription_cancel', message: 'Suscripción cancelada: juan@gmail.com', timestamp: new Date(Date.now() - 90 * 60000) },
      { id: 7, type: 'payment_success', message: 'Pago recibido: €99.00', timestamp: new Date(Date.now() - 120 * 60000), amount: 99 },
      { id: 8, type: 'user_signup', message: 'Nuevo usuario registrado: laura@consulting.es', timestamp: new Date(Date.now() - 180 * 60000), plan: 'enterprise' },
    ];

    res.json({
      success: true,
      activities
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Configuración del sistema
router.get('/settings', (req, res) => {
  res.json({
    success: true,
    settings: {
      maintenanceMode: false,
      registrationEnabled: true,
      trialDays: 14,
      maxFreeAnonymizations: 50,
      supportEmail: 'soporte@datashield.es',
      apiRateLimit: {
        starter: 0,
        professional: 10000,
        enterprise: -1
      }
    }
  });
});

router.put('/settings', (req, res) => {
  // En producción, guardaría en base de datos
  res.json({
    success: true,
    message: 'Configuración actualizada'
  });
});

module.exports = router;
