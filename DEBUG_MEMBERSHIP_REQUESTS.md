# 🔍 Diagnostic - Demandes d'Adhésion

## Problème : Les demandes ne s'affichent pas dans Supabase

### Vérification 1 : La table existe-t-elle ?

1. Allez sur votre dashboard Supabase : https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo
2. Cliquez sur **"Table Editor"** dans le menu de gauche
3. Vérifiez si vous voyez la table **`membership_requests`**

**Si la table n'existe pas :**
→ Exécutez le script `create-membership-requests-simple.sql` dans SQL Editor

### Vérification 2 : Vérifier les erreurs dans la console

1. Ouvrez votre site : http://localhost:3000
2. Ouvrez la console du navigateur (F12 > Console)
3. Remplissez le formulaire "Request Invitation"
4. Regardez s'il y a des erreurs dans la console

### Vérification 3 : Vérifier les logs Supabase

1. Allez sur votre dashboard Supabase
2. Cliquez sur **"Logs"** dans le menu de gauche
3. Sélectionnez **"API Logs"**
4. Regardez s'il y a des erreurs lors de l'insertion

### Vérification 4 : Tester directement dans Supabase

Exécutez cette requête dans SQL Editor pour tester :

```sql
-- Insérer une demande de test
INSERT INTO public.membership_requests (
  full_name,
  profession_company,
  email,
  message,
  status
) VALUES (
  'Test User',
  'Test Company',
  'test@example.com',
  'Ceci est un test',
  'pending'
);

-- Vérifier que la demande a été créée
SELECT * FROM public.membership_requests;
```

Si cette requête fonctionne, le problème vient du code. Si elle ne fonctionne pas, le problème vient de la table ou des politiques.

### Solution rapide : Recréer la table

Si la table existe mais ne fonctionne pas, supprimez-la et recréez-la :

```sql
-- ATTENTION : Cela supprimera toutes les données existantes
DROP TABLE IF EXISTS public.membership_requests CASCADE;

-- Puis exécutez le script create-membership-requests-simple.sql
```

---

## Messages d'erreur courants

### "relation 'public.membership_requests' does not exist"
→ La table n'existe pas. Exécutez le script de création.

### "new row violates row-level security policy"
→ Les politiques RLS bloquent l'insertion. Vérifiez les politiques dans SQL Editor.

### "permission denied for table membership_requests"
→ Problème de permissions. Vérifiez les politiques RLS.

---

## Test rapide

1. Ouvrez la console du navigateur (F12)
2. Remplissez le formulaire
3. Regardez les messages dans la console
4. Copiez les erreurs et partagez-les









