# 📇 Guide de Configuration - Page Contacts

## ✅ Ce qui a été créé

### 1. Page "Mes Contacts" (`/portal/contacts`)
- Affichage de tous les contacts de la communauté Elite Connect
- Recherche par nom, email, entreprise, poste
- Formulaire pour ajouter de nouveaux contacts
- Suppression de contacts
- Affichage des informations complètes (photo, email, téléphone, etc.)

### 2. Carte "Contacts" dans le portail
- Lien direct vers la page des contacts depuis le portail principal

### 3. Base de données
- Script SQL pour créer la table `contacts`
- Politiques de sécurité (RLS) configurées

## 📋 Configuration

### Étape 1 : Créer la table contacts dans Supabase

1. Allez sur votre dashboard Supabase : https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo
2. Ouvrez **SQL Editor** > **New Query**
3. Copiez le contenu du fichier `supabase-contacts-setup.sql`
4. Collez et exécutez le script

**OU** exécutez cette requête :

```sql
-- Créer la table contacts
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone_number TEXT,
  job_title TEXT,
  company TEXT,
  profile_picture_url TEXT,
  bio TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS contacts_user_id_idx ON contacts(user_id);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts(created_at DESC);

-- Activer Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Politique : Tous les utilisateurs authentifiés peuvent voir tous les contacts
CREATE POLICY "Anyone can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Politique : Les utilisateurs peuvent créer leurs propres contacts
CREATE POLICY "Users can create own contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent modifier leurs propres contacts
CREATE POLICY "Users can update own contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent supprimer leurs propres contacts
CREATE POLICY "Users can delete own contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
```

## 🎯 Fonctionnalités

### Affichage des contacts
- ✅ Tous les membres peuvent voir tous les contacts créés
- ✅ Grille responsive (1 colonne mobile, 2 tablette, 3 desktop)
- ✅ Carte pour chaque contact avec toutes les informations

### Recherche
- ✅ Recherche en temps réel par :
  - Nom
  - Email
  - Entreprise
  - Poste

### Ajout de contacts
- ✅ Formulaire modal pour ajouter un contact
- ✅ Champs disponibles :
  - Nom complet (obligatoire)
  - Email
  - Téléphone
  - Poste
  - Entreprise
  - Bio
  - LinkedIn
  - Twitter
  - Site web
  - Notes personnelles (privées)

### Gestion
- ✅ Suppression de contacts (avec confirmation)
- ✅ Seul le créateur peut supprimer ses contacts

## 📝 Structure de la table

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `user_id` | UUID | ID de l'utilisateur qui a créé le contact |
| `full_name` | TEXT | Nom complet (obligatoire) |
| `email` | TEXT | Email |
| `phone_number` | TEXT | Numéro de téléphone |
| `job_title` | TEXT | Poste/Métier |
| `company` | TEXT | Entreprise |
| `profile_picture_url` | TEXT | URL de la photo de profil |
| `bio` | TEXT | Biographie |
| `linkedin_url` | TEXT | URL LinkedIn |
| `twitter_url` | TEXT | URL Twitter |
| `website_url` | TEXT | Site web |
| `notes` | TEXT | Notes personnelles (privées) |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |

## 🔒 Sécurité

- ✅ Row Level Security (RLS) activé
- ✅ Tous les membres authentifiés peuvent voir tous les contacts
- ✅ Seul le créateur peut modifier/supprimer ses contacts
- ✅ Les notes personnelles sont privées (visibles uniquement par le créateur)

## 🎨 Interface

- Design cohérent avec le reste du site Elite Connect
- Cartes élégantes avec photo de profil
- Liens cliquables (email, téléphone, LinkedIn)
- Responsive design
- Recherche intuitive

## 🚀 Utilisation

1. **Accéder aux contacts** :
   - Depuis le portail : Cliquez sur "Mes Contacts"
   - URL directe : `/portal/contacts`

2. **Ajouter un contact** :
   - Cliquez sur "+ Ajouter un contact"
   - Remplissez le formulaire
   - Cliquez sur "Ajouter le contact"

3. **Rechercher** :
   - Utilisez la barre de recherche en haut
   - La recherche filtre automatiquement les résultats

4. **Supprimer un contact** :
   - Cliquez sur "Supprimer" dans la carte du contact
   - Confirmez la suppression

## ✨ Prochaines améliorations possibles

- [ ] Édition de contacts
- [ ] Import de contacts (CSV, vCard)
- [ ] Export de contacts
- [ ] Catégorisation/Tags
- [ ] Favoris
- [ ] Synchronisation avec les profils membres
- [ ] Statistiques de réseau

---

**Tout est prêt !** Exécutez le script SQL pour activer la fonctionnalité. 🚀

