const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Almacén temporal de datos sensibles (en producción usar Redis o DB)
const sensitiveDataStore = new Map();

// Patrones para detectar datos sensibles
const patterns = {
  email: {
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    label: 'EMAIL'
  },
  phone: {
    regex: /(\+34\s?)?[6789]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/g,
    label: 'TELEFONO'
  },
  dni: {
    regex: /\b\d{8}[A-Za-z]\b/g,
    label: 'DNI'
  },
  nie: {
    regex: /\b[XYZxyz]\d{7}[A-Za-z]\b/g,
    label: 'NIE'
  },
  creditCard: {
    regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
    label: 'TARJETA'
  },
  iban: {
    regex: /\b[A-Z]{2}\d{2}[\s]?\d{4}[\s]?\d{4}[\s]?\d{2}[\s]?\d{10}\b/gi,
    label: 'IBAN'
  },
  postalCode: {
    regex: /\b\d{5}\b/g,
    label: 'CP'
  },
  date: {
    regex: /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g,
    label: 'FECHA'
  },
  ip: {
    regex: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,
    label: 'IP'
  },
  name: {
    // Nombres propios españoles comunes (simplificado)
    regex: /\b(María|Juan|Pedro|Ana|Luis|Carmen|José|Antonio|Manuel|Francisco|David|Javier|Daniel|Carlos|Miguel|Rafael|Pablo|Sergio|Fernando|Jorge|Alberto|Alejandro|Diego|Adrián|Raúl|Álvaro|Rubén|Óscar|Enrique|Vicente|Ramón|Andrés|Joaquín|Eduardo|Roberto|Arturo|Emilio|Salvador|Gabriel|Guillermo|Gonzalo|Marcos|Ignacio|Martín|Iván|Héctor|Hugo|Lucas|Mateo|Leo|Iker|Marc|Pol|Arnau|Oriol|Pau|Jordi|Xavier|Montserrat|Nuria|Mireia|Laia|Alba|Laura|Marta|Sara|Paula|Elena|Andrea|Sofía|Lucía|Valentina|Emma|Olivia|Isabella|Camila|Victoria|Natalia|Claudia|Teresa|Pilar|Rosa|Dolores|Concepción|Isabel|Francisca|Josefa|Antonia|Margarita)[a-záéíóúñ]*\b/gi,
    label: 'NOMBRE'
  }
};

// Detectar datos sensibles en el texto
router.post('/detect', (req, res) => {
  try {
    const { text, customPatterns = [] } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'El texto es requerido' });
    }

    const detectedData = [];
    let processedText = text;

    // Combinar patrones predefinidos con personalizados
    const allPatterns = { ...patterns };
    customPatterns.forEach(cp => {
      if (cp.regex && cp.label) {
        allPatterns[cp.label.toLowerCase()] = {
          regex: new RegExp(cp.regex, 'gi'),
          label: cp.label
        };
      }
    });

    // Detectar todos los datos sensibles
    Object.entries(allPatterns).forEach(([key, pattern]) => {
      const matches = text.match(pattern.regex);
      if (matches) {
        matches.forEach(match => {
          if (!detectedData.find(d => d.original === match)) {
            detectedData.push({
              original: match,
              type: pattern.label,
              id: uuidv4().slice(0, 8)
            });
          }
        });
      }
    });

    res.json({
      success: true,
      detectedData,
      totalFound: detectedData.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Anonimizar texto
router.post('/anonymize', (req, res) => {
  try {
    const { text, sensitiveItems } = req.body;
    
    if (!text || !sensitiveItems) {
      return res.status(400).json({ error: 'Texto y datos sensibles son requeridos' });
    }

    const sessionId = uuidv4();
    let anonymizedText = text;
    const mapping = {};

    // Ordenar por longitud descendente para evitar reemplazos parciales
    const sortedItems = [...sensitiveItems].sort((a, b) => b.original.length - a.original.length);

    sortedItems.forEach(item => {
      const tag = `[${item.type}_${item.id}]`;
      mapping[tag] = item.original;
      // Escapar caracteres especiales en regex
      const escapedOriginal = item.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      anonymizedText = anonymizedText.replace(new RegExp(escapedOriginal, 'g'), tag);
    });

    // Guardar mapeo para recuperación posterior
    sensitiveDataStore.set(sessionId, {
      mapping,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
    });

    res.json({
      success: true,
      sessionId,
      anonymizedText,
      tagsCount: Object.keys(mapping).length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Desanonimizar texto (restaurar datos originales)
router.post('/deanonymize', (req, res) => {
  try {
    const { text, sessionId, manualMapping } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'El texto es requerido' });
    }

    let mapping = manualMapping;

    // Si hay sessionId, recuperar mapeo guardado
    if (sessionId && sensitiveDataStore.has(sessionId)) {
      const stored = sensitiveDataStore.get(sessionId);
      mapping = stored.mapping;
    }

    if (!mapping) {
      return res.status(400).json({ error: 'Se requiere sessionId válido o mapeo manual' });
    }

    let deanonymizedText = text;

    // Restaurar datos originales
    Object.entries(mapping).forEach(([tag, original]) => {
      deanonymizedText = deanonymizedText.replace(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), original);
    });

    res.json({
      success: true,
      deanonymizedText
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener patrones disponibles
router.get('/patterns', (req, res) => {
  const patternList = Object.entries(patterns).map(([key, value]) => ({
    key,
    label: value.label,
    description: getPatternDescription(key)
  }));

  res.json({ patterns: patternList });
});

function getPatternDescription(key) {
  const descriptions = {
    email: 'Direcciones de correo electrónico',
    phone: 'Números de teléfono españoles',
    dni: 'Documento Nacional de Identidad',
    nie: 'Número de Identidad de Extranjero',
    creditCard: 'Números de tarjeta de crédito',
    iban: 'Números de cuenta bancaria IBAN',
    postalCode: 'Códigos postales',
    date: 'Fechas en formato DD/MM/AAAA',
    ip: 'Direcciones IP',
    name: 'Nombres propios comunes'
  };
  return descriptions[key] || key;
}

// Limpiar sesiones expiradas cada hora
setInterval(() => {
  const now = new Date();
  for (const [sessionId, data] of sensitiveDataStore.entries()) {
    if (data.expiresAt < now) {
      sensitiveDataStore.delete(sessionId);
    }
  }
}, 60 * 60 * 1000);

module.exports = router;
