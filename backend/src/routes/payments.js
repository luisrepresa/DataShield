const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Simulación de base de datos de suscripciones
const subscriptions = new Map();
const customers = new Map();

// Planes disponibles
const plans = {
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Perfecto para particulares y freelancers',
    prices: {
      monthly: 900, // en céntimos (9€)
      annual: 700   // en céntimos (7€/mes = 84€/año)
    },
    features: {
      anonymizationsPerMonth: 500,
      historyDays: 7,
      apiAccess: false,
      customPatterns: 0,
      dataTypes: 8,
      support: 'email'
    }
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Para profesionales y pequeñas empresas',
    prices: {
      monthly: 2900, // 29€
      annual: 2400   // 24€/mes
    },
    features: {
      anonymizationsPerMonth: 5000,
      historyDays: 90,
      apiAccess: true,
      apiCallsPerMonth: 10000,
      customPatterns: 5,
      dataTypes: 20,
      browserExtension: true,
      support: 'priority'
    }
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Para grandes empresas y corporaciones',
    prices: {
      monthly: 9900, // 99€
      annual: 7900   // 79€/mes
    },
    features: {
      anonymizationsPerMonth: -1, // ilimitado
      historyDays: -1, // ilimitado
      apiAccess: true,
      apiCallsPerMonth: -1, // ilimitado
      customPatterns: -1, // ilimitado
      dataTypes: -1, // todos
      browserExtension: true,
      sso: true,
      teamManagement: true,
      analytics: true,
      sla: 99.9,
      support: '24/7',
      accountManager: true
    }
  }
};

// Obtener todos los planes
router.get('/plans', (req, res) => {
  res.json({ 
    success: true, 
    plans: Object.values(plans) 
  });
});

// Obtener un plan específico
router.get('/plans/:planId', (req, res) => {
  const plan = plans[req.params.planId];
  if (!plan) {
    return res.status(404).json({ error: 'Plan no encontrado' });
  }
  res.json({ success: true, plan });
});

// Crear una sesión de checkout (simulado)
router.post('/create-checkout-session', (req, res) => {
  try {
    const { planId, billingPeriod, customerInfo } = req.body;

    if (!planId || !plans[planId]) {
      return res.status(400).json({ error: 'Plan inválido' });
    }

    if (!billingPeriod || !['monthly', 'annual'].includes(billingPeriod)) {
      return res.status(400).json({ error: 'Período de facturación inválido' });
    }

    if (!customerInfo || !customerInfo.email || !customerInfo.name) {
      return res.status(400).json({ error: 'Información del cliente incompleta' });
    }

    const plan = plans[planId];
    const price = plan.prices[billingPeriod];
    const sessionId = uuidv4();

    // Crear cliente si no existe
    let customerId = null;
    for (const [id, customer] of customers.entries()) {
      if (customer.email === customerInfo.email) {
        customerId = id;
        break;
      }
    }

    if (!customerId) {
      customerId = uuidv4();
      customers.set(customerId, {
        id: customerId,
        email: customerInfo.email,
        name: customerInfo.name,
        company: customerInfo.company || null,
        createdAt: new Date()
      });
    }

    // Calcular precio total
    const totalAmount = billingPeriod === 'annual' ? price * 12 : price;

    res.json({
      success: true,
      sessionId,
      customerId,
      planId,
      billingPeriod,
      pricePerMonth: price,
      totalAmount,
      currency: 'eur',
      // URL simulada de Stripe
      checkoutUrl: `http://localhost:5173/checkout?session=${sessionId}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Procesar pago (simulado)
router.post('/process-payment', (req, res) => {
  try {
    const { sessionId, paymentMethod } = req.body;

    // Validar datos de tarjeta (simulado)
    if (!paymentMethod || !paymentMethod.cardNumber || !paymentMethod.expiry || !paymentMethod.cvc) {
      return res.status(400).json({ error: 'Datos de pago incompletos' });
    }

    // Simular validación de tarjeta
    const cardNumber = paymentMethod.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return res.status(400).json({ error: 'Número de tarjeta inválido' });
    }

    // Simular procesamiento exitoso
    const paymentId = uuidv4();
    const subscriptionId = uuidv4();

    // Crear suscripción
    subscriptions.set(subscriptionId, {
      id: subscriptionId,
      sessionId,
      paymentId,
      status: 'active',
      createdAt: new Date(),
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 días
      trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 días de prueba
    });

    res.json({
      success: true,
      paymentId,
      subscriptionId,
      status: 'succeeded',
      message: '¡Pago procesado correctamente! Tu suscripción está activa.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar suscripción
router.get('/subscription/:subscriptionId', (req, res) => {
  const subscription = subscriptions.get(req.params.subscriptionId);
  if (!subscription) {
    return res.status(404).json({ error: 'Suscripción no encontrada' });
  }
  res.json({ success: true, subscription });
});

// Cancelar suscripción
router.post('/subscription/:subscriptionId/cancel', (req, res) => {
  const subscription = subscriptions.get(req.params.subscriptionId);
  if (!subscription) {
    return res.status(404).json({ error: 'Suscripción no encontrada' });
  }

  subscription.status = 'canceled';
  subscription.canceledAt = new Date();

  res.json({
    success: true,
    message: 'Suscripción cancelada. Tendrás acceso hasta el fin del período actual.',
    subscription
  });
});

// Webhook simulado para eventos de Stripe
router.post('/webhook', (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'checkout.session.completed':
      console.log('Checkout completado:', event.data);
      break;
    case 'invoice.paid':
      console.log('Factura pagada:', event.data);
      break;
    case 'invoice.payment_failed':
      console.log('Pago fallido:', event.data);
      break;
    case 'customer.subscription.deleted':
      console.log('Suscripción cancelada:', event.data);
      break;
    default:
      console.log('Evento no manejado:', event.type);
  }

  res.json({ received: true });
});

// Obtener estadísticas de facturación (para dashboard)
router.get('/billing-stats', (req, res) => {
  const stats = {
    totalCustomers: customers.size,
    activeSubscriptions: [...subscriptions.values()].filter(s => s.status === 'active').length,
    canceledSubscriptions: [...subscriptions.values()].filter(s => s.status === 'canceled').length,
    mrr: calculateMRR()
  };

  res.json({ success: true, stats });
});

function calculateMRR() {
  // Calcular Monthly Recurring Revenue (simulado)
  let mrr = 0;
  // En producción, esto calcularía el MRR real basado en las suscripciones activas
  return mrr;
}

module.exports = router;
