/**
 * Utilitaires de sécurité pour React Client Components
 * Protection contre les vulnérabilités XSS
 */

/**
 * Sanitise une valeur pour l'affichage dans un Client Component
 * Protection contre XSS
 */
export function safeString(value: string | null | undefined, defaultValue: string = ''): string {
  if (!value || typeof value !== 'string') {
    return defaultValue;
  }
  
  // Échapper les caractères HTML dangereux
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Sanitise une URL pour l'utilisation dans les attributs href ou src
 */
export function safeUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }
  
  // Vérifier que c'est une URL valide
  try {
    const urlObj = new URL(url);
    
    // Autoriser seulement HTTPS et HTTP (pour le développement)
    if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
      return null;
    }
    
    // En production, forcer HTTPS
    if (typeof window !== 'undefined' && window.location.protocol === 'https:' && urlObj.protocol === 'http:') {
      return null;
    }
    
    return url;
  } catch {
    // URL invalide
    return null;
  }
}

