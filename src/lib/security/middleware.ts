/**
 * Middleware de sécurité pour les routes API
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit, getRateLimitIdentifier, RateLimitConfigs } from './rate-limit';
import { validateCSRFRequest } from './csrf';

/**
 * Middleware de sécurité pour les routes API
 */
export async function securityMiddleware(
  request: NextRequest,
  options: {
    rateLimit?: typeof RateLimitConfigs[keyof typeof RateLimitConfigs];
    requireAuth?: boolean;
    requireCSRF?: boolean;
  } = {}
) {
  // 1. Vérification CSRF (pour les méthodes modifiant l'état)
  if (options.requireCSRF !== false) {
    const csrfValidation = await validateCSRFRequest(request);
    if (!csrfValidation.valid) {
      return NextResponse.json(
        { error: csrfValidation.error || 'Token CSRF invalide' },
        { status: 403 }
      );
    }
  }
  
  // 2. Rate limiting
  if (options.rateLimit) {
    const identifier = getRateLimitIdentifier(request);
    const rateLimitResult = checkRateLimit(identifier, options.rateLimit);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Trop de requêtes. Veuillez réessayer plus tard.',
          retryAfter: rateLimitResult.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
            'X-RateLimit-Limit': options.rateLimit.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
          }
        }
      );
    }
  }
  
  // 3. Vérification CORS (si nécessaire)
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'https://localhost:3000'
  ].filter(Boolean);
  
  if (origin && !allowedOrigins.includes(origin)) {
    // En production, bloquer les origines non autorisées
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Origine non autorisée' },
        { status: 403 }
      );
    }
  }
  
  // 4. Vérification de la taille du body (protection contre les attaques DoS)
  const contentLength = request.headers.get('content-length');
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    const maxSize = 10 * 1024 * 1024; // 10 MB
    
    if (size > maxSize) {
      return NextResponse.json(
        { error: 'Taille de requête trop importante' },
        { status: 413 }
      );
    }
  }
  
  // 5. Vérification Content-Type pour les POST/PUT
  const method = request.method;
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    const contentType = request.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      // Autoriser multipart/form-data pour les uploads
      if (!contentType?.includes('multipart/form-data')) {
        return NextResponse.json(
          { error: 'Content-Type invalide' },
          { status: 400 }
        );
      }
    }
  }
  
  return null; // Tout est OK, continuer
}

/**
 * Wrapper pour les routes API avec sécurité
 */
export function withSecurity(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options?: {
    rateLimit?: typeof RateLimitConfigs[keyof typeof RateLimitConfigs];
    requireAuth?: boolean;
    requireCSRF?: boolean;
  }
) {
  return async (request: NextRequest) => {
    // Appliquer le middleware de sécurité
    const securityResponse = await securityMiddleware(request, options);
    if (securityResponse) {
      return securityResponse;
    }
    
    // Exécuter le handler
    try {
      return await handler(request);
    } catch (error) {
      console.error('Erreur dans le handler API:', error);
      return NextResponse.json(
        { error: 'Erreur serveur interne' },
        { status: 500 }
      );
    }
  };
}

