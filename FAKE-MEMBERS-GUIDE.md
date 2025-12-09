# 👥 Guide - Création de Membres Fictifs

## 🎯 Objectif

Créer 5 membres fictifs avec des photos de profil pour tester le système d'invitations et afficher des membres dans l'interface.

---

## 📋 Méthode Recommandée (Membres Fonctionnels)

### Étape 1 : Créer les utilisateurs dans Authentication

1. Allez dans **Supabase Dashboard > Authentication > Users**
2. Cliquez sur **"Add user"** ou **"Create user"**
3. Créez 5 utilisateurs avec ces informations :

| Email | Mot de passe | Nom complet |
|-------|--------------|-------------|
| ahmed.benali@eliteconnect.tn | (générez un mot de passe) | Ahmed Benali |
| sarah.trabelsi@eliteconnect.tn | (générez un mot de passe) | Sarah Trabelsi |
| karim.mezghani@eliteconnect.tn | (générez un mot de passe) | Karim Mezghani |
| leila.hamdi@eliteconnect.tn | (générez un mot de passe) | Leila Hamdi |
| youssef.khelifi@eliteconnect.tn | (générez un mot de passe) | Youssef Khelifi |

4. **Notez l'ID de chaque utilisateur** (visible dans la liste des utilisateurs)

### Étape 2 : Exécuter le script SQL

1. Ouvrez le fichier `create-fake-members.sql`
2. **Remplacez** chaque `'REMPLACEZ_PAR_ID_UTILISATEUR_X'` par l'ID réel de l'utilisateur correspondant
3. Exécutez le script dans **SQL Editor** de Supabase

### Étape 3 : Vérifier

Les 5 membres devraient maintenant apparaître :
- Dans `/portal/contacts`
- Dans la liste des membres lors de la sélection d'invitations
- Avec leurs photos de profil générées automatiquement

---

## 🚀 Méthode Rapide (Membres d'Affichage Seulement)

Si vous voulez juste des membres pour l'affichage (sans authentification) :

1. Exécutez directement `create-fake-members-simple.sql` dans SQL Editor
2. Les profils seront créés automatiquement avec des UUIDs générés
3. ⚠️ **Note** : Ces membres ne pourront pas se connecter car ils n'ont pas de compte dans Authentication

---

## 👤 Membres Créés

### 1. Ahmed Benali
- **Poste** : CEO & Founder
- **Entreprise** : TechInnovate Tunisia
- **Bio** : Entrepreneur passionné par l'innovation technologique

### 2. Sarah Trabelsi
- **Poste** : Investment Director
- **Entreprise** : Mediterranean Ventures
- **Bio** : Directrice d'investissement spécialisée dans les startups tech

### 3. Karim Mezghani
- **Poste** : Senior Business Consultant
- **Entreprise** : Elite Consulting Group
- **Bio** : Consultant en stratégie avec 15 ans d'expérience

### 4. Leila Hamdi
- **Poste** : Marketing Director
- **Entreprise** : Brand Excellence Tunisia
- **Bio** : Expert en branding et communication stratégique

### 5. Youssef Khelifi
- **Poste** : Real Estate Developer
- **Entreprise** : Premium Properties Tunisia
- **Bio** : Spécialisé dans les projets immobiliers haut de gamme

---

## 🖼️ Photos de Profil

Les photos utilisent **ui-avatars.com** qui génère automatiquement des avatars basés sur les noms avec :
- Couleur de fond : Or (#D4AF37) - Couleur Elite Connect
- Couleur du texte : Noir (#0A0A0A)
- Taille : 200x200 pixels

### Pour utiliser de vraies photos :

1. Upload les photos dans **Supabase Storage > profile-pictures**
2. Remplacez les URLs `ui-avatars.com` par les URLs publiques des photos dans la table `profiles`

---

## ✅ Vérification

Pour vérifier que les membres ont été créés :

```sql
SELECT 
  id,
  full_name,
  job_title,
  company,
  profile_picture_url,
  profile_completed
FROM public.profiles
WHERE full_name IN ('Ahmed Benali', 'Sarah Trabelsi', 'Karim Mezghani', 'Leila Hamdi', 'Youssef Khelifi')
ORDER BY full_name;
```

Vous devriez voir 5 membres avec leurs photos de profil ! 🎉

---

## 🔧 Utilisation

Ces membres fictifs peuvent être utilisés pour :
- ✅ Tester le système d'invitations d'événements
- ✅ Afficher des membres dans `/portal/contacts`
- ✅ Tester la sélection de membres lors de la création d'événements
- ✅ Avoir des données de démonstration

---

**Les membres fictifs sont prêts ! 🎉**


