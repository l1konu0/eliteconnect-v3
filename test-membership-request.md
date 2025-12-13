# 🧪 Test de la Demande d'Adhésion

## Étapes pour tester

### 1. Vérifier que la table existe

Dans Supabase Dashboard > Table Editor, vous devriez voir :
- ✅ `profiles`
- ✅ `contacts`
- ✅ `membership_requests` ← **Cette table doit exister**

### 2. Tester le formulaire avec la console ouverte

1. Ouvrez http://localhost:3000/membership
2. Appuyez sur **F12** pour ouvrir les outils de développement
3. Allez dans l'onglet **"Console"**
4. Cliquez sur **"Request Invitation"**
5. Remplissez le formulaire :
   - Nom complet
   - Profession/Entreprise
   - Email
   - Message
6. Cliquez sur **"Apply for Membership"**
7. **Regardez la console** - vous devriez voir soit :
   - ✅ "Demande enregistrée avec succès: [...]" (succès)
   - ❌ Une erreur rouge (problème)

### 3. Vérifier dans Supabase

1. Allez dans Supabase Dashboard > Table Editor
2. Sélectionnez la table `membership_requests`
3. Cliquez sur **"Refresh"** (ou F5)
4. Vous devriez voir votre demande

### 4. Si ça ne fonctionne toujours pas

Exécutez cette requête dans SQL Editor pour vérifier les politiques :

```sql
-- Vérifier les politiques RLS
SELECT * FROM pg_policies WHERE tablename = 'membership_requests';

-- Vérifier si la table existe
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'membership_requests';
```

---

## Erreurs courantes et solutions

### "relation 'public.membership_requests' does not exist"
**Solution :** Exécutez `create-membership-requests-simple.sql`

### "new row violates row-level security policy"
**Solution :** Vérifiez que la politique "Anyone can create membership request" existe

### Aucune erreur mais la demande n'apparaît pas
**Solution :** 
1. Vérifiez que vous regardez la bonne table
2. Cliquez sur "Refresh" dans Table Editor
3. Vérifiez les filtres dans Table Editor (peut-être qu'un filtre est actif)









