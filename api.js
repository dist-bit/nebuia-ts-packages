let api;

if (typeof module === 'undefined' || typeof module.exports === 'undefined') {
  // Si no hay soporte para CommonJS (por ejemplo, en un entorno que soporta módulos ESM)
  api = import('./dist/api.js');
} else {
  // Si hay soporte para CommonJS
  api = require('./dist/api.cjs');
}

module.exports = api;
