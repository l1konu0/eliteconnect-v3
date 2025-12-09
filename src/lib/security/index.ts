/**
 * Export centralisé des utilitaires de sécurité
 */

// Validation
export {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateURL,
  validateInteger,
  validateDate,
  sanitizeString,
  type ValidationResult
} from './validation';

// Rate limiting
export {
  checkRateLimit,
  getRateLimitIdentifier,
  RateLimitConfigs,
  type RateLimitOptions,
  type RateLimitResult
} from './rate-limit';

// Middleware
export {
  securityMiddleware,
  withSecurity
} from './middleware';

// Logging
export {
  logSecurityEvent,
  logAuthAttempt,
  logValidationError,
  getRecentLogs,
  getLogsByType,
  getLogsByUser,
  getLogsByIP,
  detectSuspiciousActivity,
  SecurityEventType,
  type SecurityLog
} from './logger';

// CSRF Protection
export {
  generateCSRFToken,
  createCSRFToken,
  getCSRFToken,
  verifyCSRFToken,
  validateCSRFRequest,
  getCSRFTokenForClient
} from './csrf';

// Server Component Security (RCE Protection)
export {
  safeString,
  safeUrl,
  safeEmail,
  safeNumber,
  safeBoolean,
  safeObject,
  safeStringArray
} from './server-safe';

