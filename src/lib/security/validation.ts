/**
 * Utilitaires de validation et sanitisation pour la sécurité
 */

// Types de validation
export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

/**
 * Valide un email
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email || typeof email !== 'string') {
    errors.push('L\'email est requis');
    return { isValid: false, errors };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    errors.push('Format d\'email invalide');
  }
  
  if (email.length > 255) {
    errors.push('L\'email est trop long (max 255 caractères)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valide un nom (sanitise et vérifie)
 */
export function validateName(name: string, minLength: number = 2, maxLength: number = 100): ValidationResult {
  const errors: string[] = [];
  
  if (!name || typeof name !== 'string') {
    errors.push('Le nom est requis');
    return { isValid: false, errors };
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length < minLength) {
    errors.push(`Le nom doit contenir au moins ${minLength} caractères`);
  }
  
  if (trimmed.length > maxLength) {
    errors.push(`Le nom ne peut pas dépasser ${maxLength} caractères`);
  }
  
  // Vérifier les caractères dangereux (XSS)
  const dangerousChars = /[<>\"']/;
  if (dangerousChars.test(trimmed)) {
    errors.push('Le nom contient des caractères non autorisés');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Sanitise une chaîne de texte (supprime les caractères dangereux)
 */
export function sanitizeString(input: string, maxLength: number = 10000): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Supprimer les balises HTML
  let sanitized = input
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .trim();
  
  // Limiter la longueur
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

/**
 * Valide une URL
 */
export function validateURL(url: string): ValidationResult {
  const errors: string[] = [];
  
  if (!url || typeof url !== 'string') {
    errors.push('L\'URL est requise');
    return { isValid: false, errors };
  }
  
  try {
    const urlObj = new URL(url);
    
    // Vérifier que c'est HTTPS en production
    if (process.env.NODE_ENV === 'production' && urlObj.protocol !== 'https:') {
      errors.push('Seules les URLs HTTPS sont autorisées');
    }
    
    // Vérifier les domaines autorisés (optionnel)
    const allowedDomains = [
      'supabase.co',
      'supabase.in',
      'youtube.com',
      'youtu.be',
      'vimeo.com'
    ];
    
    const isAllowed = allowedDomains.some(domain => urlObj.hostname.includes(domain));
    if (!isAllowed && urlObj.protocol.startsWith('http')) {
      // Autoriser les URLs locales en développement
      if (process.env.NODE_ENV === 'production') {
        errors.push('Ce domaine n\'est pas autorisé');
      }
    }
  } catch {
    errors.push('Format d\'URL invalide');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valide un mot de passe
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password || typeof password !== 'string') {
    errors.push('Le mot de passe est requis');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }
  
  if (password.length > 128) {
    errors.push('Le mot de passe ne peut pas dépasser 128 caractères');
  }
  
  // Vérifier la complexité (optionnel, peut être ajusté)
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    errors.push('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valide un numéro de téléphone (format basique)
 */
export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];
  
  if (!phone || typeof phone !== 'string') {
    return { isValid: true, errors }; // Optionnel
  }
  
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone.trim())) {
    errors.push('Format de téléphone invalide');
  }
  
  if (phone.length > 20) {
    errors.push('Le numéro de téléphone est trop long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valide un entier avec limites
 */
export function validateInteger(value: string | number, min?: number, max?: number): ValidationResult {
  const errors: string[] = [];
  
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  
  if (isNaN(num)) {
    errors.push('Valeur numérique invalide');
    return { isValid: false, errors };
  }
  
  if (min !== undefined && num < min) {
    errors.push(`La valeur doit être au moins ${min}`);
  }
  
  if (max !== undefined && num > max) {
    errors.push(`La valeur ne peut pas dépasser ${max}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valide une date
 */
export function validateDate(dateString: string, minDate?: Date, maxDate?: Date): ValidationResult {
  const errors: string[] = [];
  
  if (!dateString || typeof dateString !== 'string') {
    errors.push('La date est requise');
    return { isValid: false, errors };
  }
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    errors.push('Format de date invalide');
    return { isValid: false, errors };
  }
  
  if (minDate && date < minDate) {
    errors.push(`La date doit être après ${minDate.toLocaleDateString()}`);
  }
  
  if (maxDate && date > maxDate) {
    errors.push(`La date doit être avant ${maxDate.toLocaleDateString()}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

