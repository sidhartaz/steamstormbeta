// src/cache.js

// 🧠 Caché simple en memoria (mientras el servidor esté encendido)
const cache = new Map();

// ⏱ Tiempo de vida: 1 hora
const TTL_MS = 1000 * 60 * 60;

/**
 * Obtiene un valor desde la caché.
 */
export function getFromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > TTL_MS;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.value;
}

/**
 * Guarda un valor en la caché.
 */
export function saveInCache(key, value) {
  cache.set(key, { value, timestamp: Date.now() });
}
