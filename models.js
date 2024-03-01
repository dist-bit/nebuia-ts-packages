let models;

if (typeof module === 'undefined' || typeof module.exports === 'undefined') {
  // Si no hay soporte para CommonJS (por ejemplo, en un entorno que soporta módulos ESM)
  models = import('./dist/models.js');
} else {
  // Si hay soporte para CommonJS
  models = require('./dist/models.cjs');
}

module.exports = models;
