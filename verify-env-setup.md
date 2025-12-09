# Vérification de la Configuration

## ✅ Vérification de la clé API

Votre clé API commence par `eyJ...` et contient `"role":"anon"` - c'est correct !

## 📝 Vérification du fichier .env.local

Assurez-vous que votre fichier `.env.local` contient exactement :

```env
NEXT_PUBLIC_SUPABASE_URL=https://kgwmdzrripcerpaincoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnd21kenJyaXBjZXJwYWluY29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTAxNzYsImV4cCI6MjA4MDc2NjE3Nn0.NbRtgJfW424MQdRxri6aYLa96wJ5ZS4-Jo51wvjca0c
```

**⚠️ Important :**
- Pas d'espaces avant ou après le `=`
- Pas de guillemets autour de la valeur
- Pas de ligne vide avant ou après

## 🔄 Redémarrer le serveur

Après avoir vérifié/modifié `.env.local`, **redémarrez le serveur** :

1. Arrêtez le serveur (Ctrl+C dans le terminal)
2. Relancez : `npm run dev`
3. Testez sur http://localhost:3000/test-supabase

## ✅ Vérifier les politiques RLS

Assurez-vous d'avoir exécuté le script `fix-rls-ultimate-solution.sql` dans SQL Editor de Supabase.

Vérifiez que la politique existe :
```sql
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'membership_requests';
```

Vous devriez voir une politique `insert_membership_requests_all_roles` avec `roles` contenant `{anon,authenticated,public}`.




