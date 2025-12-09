# 🔧 Dépannage - Problème de Connexion

## ❌ Erreur : "Invalid login credentials"

Cette erreur peut avoir plusieurs causes. Suivez ces étapes pour diagnostiquer :

---

## ✅ Étape 1 : Vérifier que le compte existe

### Dans Supabase Dashboard :

1. Allez dans **Authentication > Users**
2. Cherchez votre email dans la liste
3. Si vous ne voyez **pas** votre email → **Le compte n'existe pas**, il faut s'inscrire d'abord

### Ou exécutez cette requête SQL :

```sql
SELECT email, email_confirmed_at, created_at 
FROM auth.users 
WHERE email = 'votre-email@gmail.com';
```

- Si aucun résultat → Le compte n'existe pas, allez sur `/signup` pour créer un compte
- Si vous voyez l'email → Passez à l'étape 2

---

## ✅ Étape 2 : Vérifier la confirmation de l'email

### Si l'email n'est pas confirmé :

Dans Supabase, l'email peut nécessiter une confirmation. Vérifiez :

1. **Dashboard > Authentication > Users**
2. Cliquez sur votre utilisateur
3. Regardez le champ **Email Confirmed** :
   - ✅ **Confirmé** → Passez à l'étape 3
   - ❌ **Non confirmé** → Voir ci-dessous

### Solution si l'email n'est pas confirmé :

#### Option A : Confirmer manuellement dans Supabase

1. Allez dans **Authentication > Users**
2. Cliquez sur votre utilisateur
3. Cliquez sur **"Confirm email"** ou **"Send confirmation email"**

#### Option B : Désactiver la confirmation d'email (pour le développement)

1. Allez dans **Authentication > Settings**
2. Désactivez **"Enable email confirmations"** (temporairement pour tester)
3. Réessayez de vous connecter

#### Option C : Vérifier votre boîte email

- Vérifiez vos spams
- Cherchez un email de Supabase avec un lien de confirmation
- Cliquez sur le lien pour confirmer

---

## ✅ Étape 3 : Vérifier le mot de passe

### Si le mot de passe est oublié :

1. Allez sur `/auth/reset-password`
2. Entrez votre email
3. Vous recevrez un email pour réinitialiser le mot de passe

### Ou réinitialiser directement dans Supabase :

1. **Dashboard > Authentication > Users**
2. Cliquez sur votre utilisateur
3. Cliquez sur **"Reset password"**
4. Un email sera envoyé

---

## ✅ Étape 4 : Vérifier la configuration Supabase

### Vérifier les variables d'environnement :

Assurez-vous que votre fichier `.env.local` contient :

```env
NEXT_PUBLIC_SUPABASE_URL=https://kgwmdzrripcerpaincoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
```

### Vérifier les URLs de redirection :

1. **Dashboard > Authentication > URL Configuration**
2. Vérifiez que ces URLs sont configurées :
   - Site URL : `http://localhost:3000` (pour le développement)
   - Redirect URLs : 
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/auth/update-password`

---

## ✅ Étape 5 : Créer un nouveau compte (si nécessaire)

Si le compte n'existe pas ou si vous voulez repartir de zéro :

1. Allez sur `/signup`
2. Créez un nouveau compte avec :
   - Email valide
   - Mot de passe fort (minimum 6 caractères)
   - Nom complet
3. Vérifiez votre email et confirmez le compte
4. Reconnectez-vous sur `/login`

---

## 🔍 Vérification complète dans Supabase

Exécutez cette requête pour voir tous les détails de votre compte :

```sql
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  u.created_at,
  p.full_name,
  p.is_admin,
  p.profile_completed
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE u.email = 'votre-email@gmail.com';
```

Cela vous donnera toutes les informations sur votre compte.

---

## 🚀 Solution rapide (pour tester)

Si vous voulez juste tester rapidement :

1. **Créez un nouveau compte** sur `/signup`
2. **Dans Supabase Dashboard > Authentication > Users**, confirmez l'email manuellement
3. **Connectez-vous** sur `/login`
4. **Complétez votre profil** si nécessaire
5. **Définissez-vous comme admin** avec le script `set-admin-by-email.sql`

---

## ❓ Besoin d'aide ?

Si le problème persiste :

1. Vérifiez la console du navigateur (F12) pour voir les erreurs détaillées
2. Vérifiez les logs Supabase (Dashboard > Logs)
3. Vérifiez que le serveur de développement tourne (`npm run dev`)


