const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Base de datos simulada de usuarios
const users = new Map();

// Usuarios de ejemplo predefinidos
const defaultUsers = [
  {
    id: 'admin-001',
    email: 'admin@datashield.es',
    password: 'Admin2024!',
    name: 'Administrador',
    role: 'admin',
    plan: 'enterprise',
    company: 'DataShield España S.L.',
    createdAt: new Date('2024-01-01'),
    isActive: true,
    usage: {
      anonymizationsThisMonth: 1250,
      anonymizationsTotal: 45000,
      lastActivity: new Date()
    }
  },
  {
    id: 'user-starter-001',
    email: 'starter@demo.com',
    password: 'Starter123!',
    name: 'Usuario Starter',
    role: 'user',
    plan: 'starter',
    company: 'Freelance',
    createdAt: new Date('2024-06-15'),
    isActive: true,
    usage: {
      anonymizationsThisMonth: 234,
      anonymizationsTotal: 1500,
      lastActivity: new Date()
    }
  },
  {
    id: 'user-pro-001',
    email: 'pro@demo.com',
    password: 'Pro12345!',
    name: 'Usuario Professional',
    role: 'user',
    plan: 'professional',
    company: 'Tech Solutions S.L.',
    createdAt: new Date('2024-03-20'),
    isActive: true,
    usage: {
      anonymizationsThisMonth: 2100,
      anonymizationsTotal: 18500,
      lastActivity: new Date()
    }
  },
  {
    id: 'user-enterprise-001',
    email: 'enterprise@demo.com',
    password: 'Enterprise1!',
    name: 'Usuario Enterprise',
    role: 'user',
    plan: 'enterprise',
    company: 'Global Corp S.A.',
    createdAt: new Date('2024-02-10'),
    isActive: true,
    usage: {
      anonymizationsThisMonth: 8500,
      anonymizationsTotal: 125000,
      lastActivity: new Date()
    }
  }
];

// Inicializar usuarios predefinidos
defaultUsers.forEach(user => {
  users.set(user.id, { ...user });
});

// Sesiones activas
const sessions = new Map();

// Límites por plan
const planLimits = {
  starter: {
    anonymizationsPerMonth: 500,
    historyDays: 7,
    apiAccess: false,
    customPatterns: 0,
    dataTypes: 8
  },
  professional: {
    anonymizationsPerMonth: 5000,
    historyDays: 90,
    apiAccess: true,
    customPatterns: 5,
    dataTypes: 20
  },
  enterprise: {
    anonymizationsPerMonth: -1, // ilimitado
    historyDays: -1,
    apiAccess: true,
    customPatterns: -1,
    dataTypes: -1
  }
};

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario por email
    let foundUser = null;
    for (const user of users.values()) {
      if (user.email === email) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (foundUser.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (!foundUser.isActive) {
      return res.status(403).json({ error: 'Cuenta desactivada' });
    }

    // Crear sesión
    const token = uuidv4();
    const session = {
      token,
      userId: foundUser.id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
    };
    sessions.set(token, session);

    // Actualizar última actividad
    foundUser.usage.lastActivity = new Date();

    // Responder sin la contraseña
    const { password: _, ...userWithoutPassword } = foundUser;

    res.json({
      success: true,
      token,
      user: userWithoutPassword,
      planLimits: planLimits[foundUser.plan]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registro
router.post('/register', (req, res) => {
  try {
    const { email, password, name, company, plan = 'starter' } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, contraseña y nombre son requeridos' });
    }

    // Verificar si el email ya existe
    for (const user of users.values()) {
      if (user.email === email) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }
    }

    // Validar contraseña
    if (password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Crear usuario
    const userId = uuidv4();
    const newUser = {
      id: userId,
      email,
      password,
      name,
      role: 'user',
      plan,
      company: company || null,
      createdAt: new Date(),
      isActive: true,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días de prueba
      usage: {
        anonymizationsThisMonth: 0,
        anonymizationsTotal: 0,
        lastActivity: new Date()
      }
    };

    users.set(userId, newUser);

    // Crear sesión automáticamente
    const token = uuidv4();
    sessions.set(token, {
      token,
      userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    const { password: _, ...userWithoutPassword } = newUser;

    res.json({
      success: true,
      message: 'Cuenta creada correctamente. ¡Bienvenido a DataShield!',
      token,
      user: userWithoutPassword,
      planLimits: planLimits[plan]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    sessions.delete(token);
  }
  res.json({ success: true, message: 'Sesión cerrada' });
});

// Verificar token y obtener usuario actual
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const session = sessions.get(token);
    if (!session) {
      return res.status(401).json({ error: 'Sesión inválida' });
    }

    if (new Date() > session.expiresAt) {
      sessions.delete(token);
      return res.status(401).json({ error: 'Sesión expirada' });
    }

    const user = users.get(session.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword,
      planLimits: planLimits[user.plan]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar perfil
router.put('/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const session = sessions.get(token);
    
    if (!session) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const user = users.get(session.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { name, company, currentPassword, newPassword } = req.body;

    if (name) user.name = name;
    if (company !== undefined) user.company = company;

    // Cambiar contraseña
    if (currentPassword && newPassword) {
      if (user.password !== currentPassword) {
        return res.status(400).json({ error: 'Contraseña actual incorrecta' });
      }
      if (newPassword.length < 8) {
        return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 8 caracteres' });
      }
      user.password = newPassword;
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Perfil actualizado',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware de autenticación exportable
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
  req.session = session;
  next();
};

// Middleware de admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
  }
  next();
};

// Exportar usuarios y sesiones para uso en otros módulos
module.exports = router;
module.exports.users = users;
module.exports.sessions = sessions;
module.exports.planLimits = planLimits;
module.exports.authMiddleware = authMiddleware;
module.exports.adminMiddleware = adminMiddleware;
