/**
 * Protection CSRF (Cross-Site Request Forgery)
 */

import { cookies } from 'next/headers';

const CSRF_TOKEN_COOKIE_NAME = 'csrf-token';
const CSRF_TOKEN_HEADER_NAME = 'x-csrf-token';
const CSRF_TOKEN_LENGTH = 32;

/**
 * Génère un token CSRF sécurisé
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(CSRF_TOKEN_LENGTH);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Fallback pour Node.js
    const crypto = require('crypto');
    crypto.randomFillSync(array);
  }
  
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Génère et stocke un token CSRF dans les cookies
 */
export async function createCSRFToken(): Promise<string> {
  const token = generateCSRFToken();
  const cookieStore = await cookies();
  
  cookieStore.set(CSRF_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 heures
    path: '/'
  });
  
  return token;
}

/**
 * Récupère le token CSRF depuis les cookies
 */
export async function getCSRFToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CSRF_TOKEN_COOKIE_NAME);
  return token?.value || null;
}

/**
 * Vérifie si un token CSRF est valide
 */
export async function verifyCSRFToken(token: string | null): Promise<boolean> {
  if (!token) {
    return false;
  }
  
  const storedToken = await getCSRFToken();
  
  if (!storedToken) {
    return false;
  }
  
  // Comparaison constante dans le temps pour éviter les attaques par timing
  return constantTimeEqual(token, storedToken);
}

/**
 * Comparaison constante dans le temps (protection contre les attaques par timing)
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Middleware pour vérifier le token CSRF dans les requêtes
 */
export async function validateCSRFRequest(
  request: Request
): Promise<{ valid: boolean; error?: string }> {
  // Seulement pour les méthodes qui modifient l'état
  const method = request.method;
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return { valid: true };
  }
  
  // Récupérer le token depuis le header
  const token = request.headers.get(CSRF_TOKEN_HEADER_NAME);
  
  // Vérifier le token
  const isValid = await verifyCSRFToken(token);
  
  if (!isValid) {
    return {
      valid: false,
      error: 'Token CSRF invalide ou manquant'
    };
  }
  
  return { valid: true };
}

/**
 * Helper pour obtenir le token CSRF côté client
 * (à appeler depuis un Server Component ou Server Action)
 */
export async function getCSRFTokenForClient(): Promise<string> {
  let token = await getCSRFToken();
  
  if (!token) {
    token = await createCSRFToken();
  }
  
  return token;
}

