# 📦 Guide de Migration des Partenaires

## 🎯 Objectif

Migrer les partenaires qui étaient en dur dans le code vers la base de données Supabase, pour pouvoir les gérer depuis le portail admin.

---

## ✅ Étapes à suivre

### Étape 1 : Créer la table partners (si pas déjà fait)

1. Allez dans **Supabase Dashboard > SQL Editor**
2. Exécutez le script `create-partners-table.sql`
3. Vérifiez que la table a été créée : **Table Editor > partners**

### Étape 2 : Créer le bucket Storage (si pas déjà fait)

1. Allez dans **Storage**
2. Créez un nouveau bucket nommé `partner-logos`
3. Activez **"Public bucket"** ✅
4. Créez le bucket

### Étape 3 : Configurer les politiques Storage

1. Dans **SQL Editor**, exécutez le script `create-partners-storage-policies.sql`
2. Cela permettra aux admins d'uploader des logos

### Étape 4 : Insérer les partenaires existants

1. Dans **SQL Editor**, exécutez le script `insert-existing-partners.sql`
2. Cela va ajouter tous les partenaires qui étaient en dur dans le code :
   - 4 Partenaires Stratégiques
   - 6 Partenaires Technologiques
   - 4 Marques & Collaborations

### Étape 5 : Vérifier

1. Allez sur `/partners` - Les partenaires devraient s'afficher
2. Connectez-vous en admin
3. Allez sur `/portal/partners/manage` - Vous devriez voir tous les partenaires
4. Vous pouvez maintenant :
   - Modifier les noms
   - Uploader des logos
   - Ajouter des sites web
   - Ajouter des descriptions
   - Activer/désactiver

---

## 📝 Partenaires qui seront ajoutés

### Partenaires Stratégiques (4)
- Partner Name 1
- Partner Name 2
- Partner Name 3
- Partner Name 4

### Partenaires Technologiques (6)
- Tech Partner 1
- Tech Partner 2
- Tech Partner 3
- Tech Partner 4
- Tech Partner 5
- Tech Partner 6

### Marques & Collaborations (4)
- Brand 1
- Brand 2
- Brand 3
- Brand 4

---

## 🎨 Après la migration

Une fois les partenaires dans la base de données :

1. **Modifiez les noms** : Remplacez "Partner Name 1" par les vrais noms
2. **Ajoutez les logos** : Upload depuis `/portal/partners/manage`
3. **Ajoutez les sites web** : Si les partenaires ont des sites
4. **Ajoutez des descriptions** : Pour donner plus de contexte

---

## ⚠️ Important

- Les partenaires sont créés **sans logos** (logo_url = NULL)
- Vous devrez uploader les logos manuellement depuis le portail admin
- Les noms sont des placeholders - modifiez-les avec les vrais noms
- Tous les partenaires sont **actifs** par défaut (is_active = true)

---

## 🔍 Vérification SQL

Pour vérifier que les partenaires ont été insérés :

```sql
SELECT 
  id,
  name,
  category,
  logo_url,
  website_url,
  is_active,
  display_order
FROM public.partners
ORDER BY category, display_order;
```

Vous devriez voir 14 partenaires au total.

---

**Une fois la migration terminée, vous pourrez gérer tous les partenaires depuis le portail admin ! 🎉**






