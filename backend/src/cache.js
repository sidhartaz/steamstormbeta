// src/cache.js

// 🧠 Caché simple en memoria (solo vive mientras el servidor esté encendido)
const cache = new Map();

// ⏰ Tiempo de vida: 1 hora (en milisegundos)
const TTL_MS = 1000 * 60 * 60;

/**
 * Devuelve un valor de caché si existe y no expiró.
 */
export function getFromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > TTL_MS;
  if (isExpired) {
    cache.delete(key); // limpia si expiró
    return null;
  }

  return entry.value;
}

/**
 * Guarda un valor en la caché.
 */
export function saveInCache(key, value) {
  cache.set(key, {
    value,
    timestamp: Date.now(),
  });
}
