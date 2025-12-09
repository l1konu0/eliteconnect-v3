/**
 * Système de logging de sécurité
 */

export enum SecurityEventType {
  AUTH_FAILURE = 'auth_failure',
  AUTH_SUCCESS = 'auth_success',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  VALIDATION_ERROR = 'validation_error',
  SQL_INJECTION_ATTEMPT = 'sql_injection_attempt',
  XSS_ATTEMPT = 'xss_attempt',
  CSRF_ATTEMPT = 'csrf_attempt'
}

export interface SecurityLog {
  type: SecurityEventType;
  message: string;
  metadata?: Record<string, any>;
  timestamp: Date;
  ip?: string;
  userAgent?: string;
  userId?: string;
}

// Store des logs (en production, envoyer vers un service de logging)
const logs: SecurityLog[] = [];
const MAX_LOGS = 1000; // Limiter le nombre de logs en mémoire

/**
 * Log un événement de sécurité
 */
export function logSecurityEvent(
  type: SecurityEventType,
  message: string,
  metadata?: {
    ip?: string;
    userAgent?: string;
    userId?: string;
    [key: string]: any;
  }
) {
  const log: SecurityLog = {
    type,
    message,
    metadata: metadata ? { ...metadata } : undefined,
    timestamp: new Date(),
    ip: metadata?.ip,
    userAgent: metadata?.userAgent,
    userId: metadata?.userId
  };
  
  // Ajouter au store
  logs.push(log);
  
  // Limiter la taille du store
  if (logs.length > MAX_LOGS) {
    logs.shift();
  }
  
  // En production, envoyer vers un service de logging (ex: Sentry, LogRocket, etc.)
  if (process.env.NODE_ENV === 'production') {
    // TODO: Intégrer avec un service de logging
    console.warn('[SECURITY]', log);
  } else {
    // En développement, afficher dans la console
    console.warn('[SECURITY LOG]', {
      type: log.type,
      message: log.message,
      timestamp: log.timestamp.toISOString(),
      ...log.metadata
    });
  }
  
  return log;
}

/**
 * Obtenir les logs récents
 */
export function getRecentLogs(limit: number = 100): SecurityLog[] {
  return logs.slice(-limit);
}

/**
 * Obtenir les logs par type
 */
export function getLogsByType(type: SecurityEventType, limit: number = 100): SecurityLog[] {
  return logs
    .filter(log => log.type === type)
    .slice(-limit);
}

/**
 * Obtenir les logs pour un utilisateur
 */
export function getLogsByUser(userId: string, limit: number = 100): SecurityLog[] {
  return logs
    .filter(log => log.userId === userId)
    .slice(-limit);
}

/**
 * Obtenir les logs pour une IP
 */
export function getLogsByIP(ip: string, limit: number = 100): SecurityLog[] {
  return logs
    .filter(log => log.ip === ip)
    .slice(-limit);
}

/**
 * Détecter une activité suspecte
 */
export function detectSuspiciousActivity(ip: string, userId?: string): boolean {
  const recentLogs = getLogsByIP(ip, 100);
  const last5Minutes = new Date(Date.now() - 5 * 60 * 1000);
  
  const recentFailures = recentLogs.filter(
    log => 
      log.timestamp > last5Minutes &&
      (log.type === SecurityEventType.AUTH_FAILURE ||
       log.type === SecurityEventType.RATE_LIMIT_EXCEEDED ||
       log.type === SecurityEventType.UNAUTHORIZED_ACCESS)
  );
  
  // Si plus de 10 échecs en 5 minutes, activité suspecte
  if (recentFailures.length > 10) {
    logSecurityEvent(
      SecurityEventType.SUSPICIOUS_ACTIVITY,
      `Activité suspecte détectée pour IP ${ip}`,
      { ip, userId, failureCount: recentFailures.length }
    );
    return true;
  }
  
  return false;
}

/**
 * Helper pour logger les tentatives d'authentification
 */
export function logAuthAttempt(
  success: boolean,
  email: string,
  metadata?: {
    ip?: string;
    userAgent?: string;
    userId?: string;
  }
) {
  const type = success 
    ? SecurityEventType.AUTH_SUCCESS 
    : SecurityEventType.AUTH_FAILURE;
  
  const message = success
    ? `Authentification réussie pour ${email}`
    : `Tentative d'authentification échouée pour ${email}`;
  
  logSecurityEvent(type, message, { ...metadata, email });
}

/**
 * Helper pour logger les erreurs de validation
 */
export function logValidationError(
  field: string,
  value: string,
  errors: string[],
  metadata?: {
    ip?: string;
    userAgent?: string;
    userId?: string;
  }
) {
  logSecurityEvent(
    SecurityEventType.VALIDATION_ERROR,
    `Erreur de validation pour le champ ${field}`,
    {
      ...metadata,
      field,
      value: value.substring(0, 100), // Limiter la longueur
      errors
    }
  );
}

