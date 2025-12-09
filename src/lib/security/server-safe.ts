/**
 * Utilitaires de sécurité pour React Server Components
 * Protection contre les vulnérabilités RCE (Remote Code Execution)
 */

import { sanitizeString } from './validation';

/**
 * Sanitise une valeur pour l'affichage dans un Server Component
 * Protection contre XSS et injection de code
 */
export function safeString(value: string | null | undefined, defaultValue: string = ''): string {
  if (!value || typeof value !== 'string') {
    return defaultValue;
  }
  
  // Sanitiser la chaîne
  return sanitizeString(value);
}

/**
 * Sanitise une URL pour l'utilisation dans les attributs href ou src
 */
export function safeUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }
  
  // Vérifier que c'est une URL valide et sécurisée
  try {
    const urlObj = new URL(url);
    
    // Autoriser seulement HTTPS en production
    if (process.env.NODE_ENV === 'production' && urlObj.protocol !== 'https:') {
      return null;
    }
    
    // Autoriser seulement certains domaines (optionnel)
    const allowedDomains = [
      'supabase.co',
      'supabase.in',
      'supabase.storage',
      'vercel.app',
      'localhost'
    ];
    
    const isAllowed = allowedDomains.some(domain => urlObj.hostname.includes(domain));
    if (!isAllowed && process.env.NODE_ENV === 'production') {
      // En production, bloquer les domaines non autorisés
      return null;
    }
    
    return url;
  } catch {
    // URL invalide
    return null;
  }
}

/**
 * Sanitise un email pour l'affichage
 */
export function safeEmail(email: string | null | undefined): string {
  if (!email || typeof email !== 'string') {
    return '';
  }
  
  // Vérifier le format d'email basique
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '';
  }
  
  // Sanitiser
  return sanitizeString(email, 255);
}

/**
 * Sanitise un nombre pour l'affichage
 */
export function safeNumber(value: number | null | undefined, defaultValue: number = 0): number {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return defaultValue;
  }
  
  return value;
}

/**
 * Sanitise un booléen
 */
export function safeBoolean(value: boolean | null | undefined, defaultValue: boolean = false): boolean {
  if (typeof value !== 'boolean') {
    return defaultValue;
  }
  
  return value;
}

/**
 * Sanitise un objet pour l'affichage (récursif)
 */
export function safeObject<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  defaultValue: Partial<T> = {}
): Partial<T> {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return defaultValue;
  }
  
  const sanitized: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = safeString(value) as T[keyof T];
    } else if (typeof value === 'number') {
      sanitized[key as keyof T] = safeNumber(value) as T[keyof T];
    } else if (typeof value === 'boolean') {
      sanitized[key as keyof T] = safeBoolean(value) as T[keyof T];
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key as keyof T] = safeObject(value as Record<string, unknown>, {}) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
}

/**
 * Sanitise un tableau de chaînes
 */
export function safeStringArray(arr: (string | null | undefined)[] | null | undefined): string[] {
  if (!Array.isArray(arr)) {
    return [];
  }
  
  return arr
    .filter((item): item is string => typeof item === 'string' && item.length > 0)
    .map(item => safeString(item));
}

