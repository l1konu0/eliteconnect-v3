# 🚀 Configuration Rapide du Storage - Profile Pictures

## ⚠️ Erreur : "Bucket not found"

Si vous voyez cette erreur, c'est que le bucket `profile-pictures` n'a pas été créé dans Supabase Storage.

## ⚠️ Erreur : "must be owner of table objects"

Si vous voyez cette erreur lors de l'exécution du script SQL, utilisez la méthode via l'interface (Option 1) qui ne nécessite pas de permissions spéciales.

## ✅ Solution Rapide (2 minutes)

### Option 1 : Via l'interface Supabase (RECOMMANDÉ - Pas de problème de permissions)

1. **Allez sur votre dashboard Supabase** :
   - https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo/storage/buckets

2. **Cliquez sur "New bucket"**

3. **Configurez le bucket** :
   - **Name** : `profile-pictures` (exactement comme ça, sans espaces)
   - **Public bucket** : ✅ **COCHEZ cette case** (très important !)
   - **File size limit** : `5242880` (5 MB)
   - **Allowed MIME types** : `image/jpeg,image/png,image/webp,image/jpg` (optionnel)

4. **Cliquez sur "Create bucket"**

5. **Configurez les politiques de sécurité** :
   - Allez dans **Storage > Policies** (ou exécutez le script SQL ci-dessous)
   - Sélectionnez le bucket `profile-pictures`
   - Cliquez sur **"New Policy"**
   - Créez les 4 politiques suivantes :

#### Politique 1 : Upload (INSERT)
- **Policy name** : `Users can upload own profile picture`
- **Allowed operation** : `INSERT`
- **Target roles** : `authenticated`
- **Policy definition** :
```sql
bucket_id = 'profile-pictures'
```

#### Politique 2 : Lecture (SELECT)
- **Policy name** : `Anyone can view profile pictures`
- **Allowed operation** : `SELECT`
- **Target roles** : `public`
- **Policy definition** :
```sql
bucket_id = 'profile-pictures'
```

#### Politique 3 : Suppression (DELETE)
- **Policy name** : `Users can delete own profile picture`
- **Allowed operation** : `DELETE`
- **Target roles** : `authenticated`
- **Policy definition** :
```sql
bucket_id = 'profile-pictures'
```

#### Politique 4 : Mise à jour (UPDATE)
- **Policy name** : `Users can update own profile picture`
- **Allowed operation** : `UPDATE`
- **Target roles** : `authenticated`
- **Policy definition (USING)** :
```sql
bucket_id = 'profile-pictures'
```
- **Policy definition (WITH CHECK)** :
```sql
bucket_id = 'profile-pictures'
```

---

### Option 2 : Via SQL (Si vous avez les permissions)

**⚠️ IMPORTANT** : Si vous obtenez l'erreur "must be owner of table objects", utilisez l'Option 1 (interface) à la place.

1. **Créez d'abord le bucket via l'interface** (Option 1, étapes 1-4)

2. **Ensuite, exécutez seulement les politiques** :
   - Allez dans SQL Editor : https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo/sql/new
   - Copiez-collez le contenu du fichier `create-profile-pictures-bucket-safe.sql`
   - Cliquez sur "Run" (ou Ctrl+Enter)

3. **C'est fait !** ✅

---

## 🔍 Vérification

Après avoir créé le bucket, testez :

1. Allez sur `/complete-profile`
2. Essayez d'uploader une image
3. L'erreur "Bucket not found" devrait disparaître

---

## 🐛 Si ça ne fonctionne toujours pas

### Vérifier que le bucket existe :
```sql
SELECT * FROM storage.buckets WHERE id = 'profile-pictures';
```

### Vérifier les politiques :
```sql
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%profile%';
```

### Vérifier RLS :
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'storage' 
  AND tablename = 'objects';
```

---

## 📝 Notes importantes

- ✅ Le bucket **DOIT** être public pour que les images s'affichent
- ✅ Le nom du bucket **DOIT** être exactement `profile-pictures` (sans espaces, avec tiret)
- ✅ Les politiques RLS sont nécessaires pour la sécurité
- ✅ La taille maximale est de 5 MB par défaut

---

## 🎯 Prochaines étapes

Une fois le bucket créé :
1. Testez l'upload d'une photo
2. Vérifiez que l'image apparaît dans le portail
3. Profitez ! 🎉

