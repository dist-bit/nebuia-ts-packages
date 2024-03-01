let sdk;

if (typeof module === 'undefined' || typeof module.exports === 'undefined') {
  // Si no hay soporte para CommonJS (por ejemplo, en un entorno que soporta módulos ESM)
  sdk = import('./dist/sdk.js');
} else {
  // Si hay soporte para CommonJS
  sdk = require('./dist/sdk.cjs');
}

module.exports = sdk;
