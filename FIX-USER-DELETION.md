# Guide : Corriger l'erreur de suppression d'utilisateur dans Supabase

## Problème

Lorsque vous essayez de supprimer un utilisateur dans le dashboard Supabase, vous obtenez l'erreur :
```
Failed to delete selected users: Database error deleting user
```

## Cause

Cette erreur se produit car certaines tables ont des contraintes de clé étrangère (`FOREIGN KEY`) qui référencent `auth.users(id)` **sans** `ON DELETE CASCADE` ou `ON DELETE SET NULL`.

Les tables concernées sont :
1. **`profiles`** : La clé primaire `id` référence `auth.users(id)` sans CASCADE
2. **`membership_requests`** : La colonne `reviewed_by` référence `auth.users(id)` sans CASCADE ni SET NULL

## Solution 1 : Corriger les contraintes (Recommandé)

Exécutez le script `fix-user-deletion-cascade.sql` dans l'éditeur SQL de Supabase :

1. Allez dans **Supabase Dashboard > SQL Editor > New Query**
2. Copiez-collez le contenu de `fix-user-deletion-cascade.sql`
3. Exécutez le script

Ce script va :
- Ajouter `ON DELETE CASCADE` à la table `profiles`
- Ajouter `ON DELETE SET NULL` à `membership_requests.reviewed_by`

**Avantages** :
- ✅ Suppression automatique des données liées
- ✅ Plus besoin de supprimer manuellement
- ✅ Solution permanente

## Solution 2 : Supprimer manuellement les données (Alternative)

Si vous préférez ne pas modifier les contraintes, vous pouvez utiliser le script `delete-user-manually.sql` qui supprime toutes les données liées avant de supprimer l'utilisateur.

**⚠️ Attention** : Cette méthode nécessite de connaître l'UUID de l'utilisateur à supprimer.

## Vérification

Après avoir appliqué la Solution 1, vous pouvez vérifier que les contraintes sont correctes avec cette requête :

```sql
SELECT 
  tc.table_name, 
  kcu.column_name, 
  ccu.table_name AS foreign_table_name,
  rc.delete_rule
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
  ON rc.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND ccu.table_name = 'users'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;
```

Toutes les contraintes devraient avoir `delete_rule` = `CASCADE` ou `SET NULL`.

## Tables déjà configurées correctement

Ces tables ont déjà `ON DELETE CASCADE` et ne nécessitent pas de modification :
- ✅ `contacts` (user_id)
- ✅ `event_rsvps` (user_id)
- ✅ `event_photos` (uploaded_by)
- ✅ `event_invitations` (invited_by, invited_user_id)
- ✅ `events` (created_by)
