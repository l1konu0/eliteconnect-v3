# 📋 Guide - Demandes d'Adhésion (Request Invitation)

## ✅ Ce qui a été créé

### 1. Formulaire fonctionnel
- Le bouton "Request Invitation" ouvre un modal avec un formulaire
- Les demandes sont maintenant enregistrées dans Supabase
- Message de confirmation après envoi

### 2. Table Supabase
- Table `membership_requests` pour stocker toutes les demandes
- Statuts : `pending`, `reviewed`, `approved`, `rejected`

## 📋 Configuration

### Étape 1 : Créer la table dans Supabase

1. Allez sur votre dashboard Supabase : https://supabase.com/dashboard/project/kgwmdzrripcerpaincoo
2. Ouvrez **SQL Editor** > **New Query**
3. Copiez le contenu du fichier `supabase-membership-requests.sql`
4. Collez et exécutez le script

**OU** exécutez cette requête :

```sql
CREATE TABLE IF NOT EXISTS public.membership_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  profession_company TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX membership_requests_status_idx ON public.membership_requests(status);
CREATE INDEX membership_requests_created_at_idx ON public.membership_requests(created_at DESC);
CREATE INDEX membership_requests_email_idx ON public.membership_requests(email);

ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create membership request"
  ON public.membership_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all requests"
  ON public.membership_requests FOR SELECT
  TO authenticated
  USING (true);
```

## 📍 Où voir les demandes ?

### Option 1 : Dans Supabase Dashboard (Recommandé)

1. Allez sur votre dashboard Supabase
2. Cliquez sur **"Table Editor"** dans le menu de gauche
3. Sélectionnez la table **`membership_requests`**
4. Vous verrez toutes les demandes avec :
   - Nom complet
   - Profession/Entreprise
   - Email
   - Message
   - Statut (pending, reviewed, approved, rejected)
   - Date de création

### Option 2 : Créer une page admin (Optionnel)

Vous pouvez créer une page `/admin/requests` pour voir et gérer les demandes directement depuis votre site.

## 📊 Structure de la table

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique |
| `full_name` | TEXT | Nom complet |
| `profession_company` | TEXT | Profession/Entreprise |
| `email` | TEXT | Email |
| `message` | TEXT | Message/Motivation |
| `status` | TEXT | Statut : pending, reviewed, approved, rejected |
| `reviewed_by` | UUID | ID de l'admin qui a revu |
| `reviewed_at` | TIMESTAMP | Date de révision |
| `notes` | TEXT | Notes internes |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |

## 🔄 Flux

1. **Utilisateur clique sur "Request Invitation"**
   - Depuis le header ou la page membership
   - Ouvre un modal avec le formulaire

2. **Utilisateur remplit le formulaire**
   - Nom complet
   - Profession/Entreprise
   - Email
   - Message/Motivation

3. **Envoi de la demande**
   - Les données sont enregistrées dans Supabase
   - Statut initial : `pending`
   - Message de confirmation affiché

4. **Vous recevez la demande**
   - Dans Supabase Table Editor > `membership_requests`
   - Vous pouvez voir toutes les informations
   - Vous pouvez changer le statut manuellement

## ✨ Prochaines améliorations possibles

- [ ] Page admin pour gérer les demandes
- [ ] Email de notification quand une nouvelle demande arrive
- [ ] Email de confirmation à l'utilisateur
- [ ] Système de filtres et recherche
- [ ] Export des demandes (CSV, PDF)
- [ ] Commentaires/notes sur chaque demande

---

**Tout est prêt !** Exécutez le script SQL pour activer le système de demandes. 🚀

