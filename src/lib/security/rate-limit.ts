/**
 * Système de rate limiting simple pour protéger contre les abus
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// Store en mémoire (en production, utiliser Redis ou une base de données)
const store: RateLimitStore = {};

// Nettoyer le store périodiquement
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60000); // Nettoyer toutes les minutes

export interface RateLimitOptions {
  windowMs: number; // Fenêtre de temps en millisecondes
  maxRequests: number; // Nombre maximum de requêtes
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Vérifie le rate limit pour un identifiant (IP, userId, etc.)
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 60000, maxRequests: 100 }
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  
  // Si l'entrée n'existe pas ou est expirée, créer une nouvelle
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + options.windowMs
    };
    
    return {
      success: true,
      remaining: options.maxRequests - 1,
      resetTime: store[key].resetTime
    };
  }
  
  // Incrémenter le compteur
  store[key].count++;
  
  // Vérifier si la limite est dépassée
  if (store[key].count > options.maxRequests) {
    const retryAfter = Math.ceil((store[key].resetTime - now) / 1000);
    
    return {
      success: false,
      remaining: 0,
      resetTime: store[key].resetTime,
      retryAfter
    };
  }
  
  return {
    success: true,
    remaining: options.maxRequests - store[key].count,
    resetTime: store[key].resetTime
  };
}

/**
 * Obtient l'identifiant de rate limiting depuis une requête
 */
export function getRateLimitIdentifier(request: Request): string {
  // Essayer d'obtenir l'IP depuis les headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  return ip;
}

/**
 * Rate limit configs prédéfinis
 */
export const RateLimitConfigs = {
  // Limite générale pour les requêtes API
  api: {
    windowMs: 60000, // 1 minute
    maxRequests: 60
  },
  
  // Limite pour l'authentification (plus strict)
  auth: {
    windowMs: 900000, // 15 minutes
    maxRequests: 5
  },
  
  // Limite pour les formulaires
  form: {
    windowMs: 60000, // 1 minute
    maxRequests: 10
  },
  
  // Limite pour les uploads
  upload: {
    windowMs: 3600000, // 1 heure
    maxRequests: 20
  }
};

