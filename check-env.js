// Script de vérification des variables d'environnement
// Exécutez avec: node check-env.js

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n=== Vérification des variables d\'environnement ===\n');

if (!supabaseUrl) {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL est MANQUANTE');
} else {
  console.log('✅ NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
}

if (!supabaseKey) {
  console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY est MANQUANTE');
} else {
  console.log('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY est configurée');
  console.log('   Début de la clé:', supabaseKey.substring(0, 30) + '...');
  
  // Décoder le payload JWT pour vérifier le rôle
  try {
    const parts = supabaseKey.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      console.log('   Rôle:', payload.role);
      console.log('   Ref:', payload.ref);
      
      if (payload.role === 'anon') {
        console.log('   ✅ C\'est bien la clé ANON (correcte)');
      } else {
        console.log('   ⚠️  Ce n\'est PAS la clé ANON ! Utilisez la clé "anon public"');
      }
    }
  } catch (e) {
    console.log('   ⚠️  Impossible de décoder la clé');
  }
}

console.log('\n=== Instructions ===');
console.log('1. Si une variable est manquante, créez/modifiez le fichier .env.local');
console.log('2. Format attendu:');
console.log('   NEXT_PUBLIC_SUPABASE_URL=https://kgwmdzrripcerpaincoo.supabase.co');
console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon');
console.log('3. Après modification, redémarrez le serveur: npm run dev\n');









