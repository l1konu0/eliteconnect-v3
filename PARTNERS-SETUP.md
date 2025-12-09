# 🏢 Guide de Configuration - Système de Partenaires

## ✅ Ce qui a été créé

### 1. **Base de données**
- Table `partners` pour stocker les informations des partenaires
- Politiques RLS configurées (lecture publique, modification admin uniquement)
- Support des catégories : strategic, technology, brands, other

### 2. **Pages créées**
- Page publique `/partners` - Affichage des partenaires
- Page admin `/portal/partners/manage` - Gestion des partenaires (ajout/modification/suppression)

### 3. **Fonctionnalités**
- Upload de logos via Supabase Storage
- Affichage par catégorie
- Gestion complète par les admins
- Activation/désactivation de partenaires

---

## 📋 Configuration

### Étape 1 : Créer la table dans Supabase

1. Allez sur votre dashboard Supabase
2. Ouvrez **SQL Editor** > **New Query**
3. Copiez et exécutez le contenu du fichier `create-partners-table.sql`

### Étape 2 : Créer le bucket Storage pour les logos

1. Dans Supabase, allez dans **Storage**
2. Cliquez sur **New bucket**
3. Nom du bucket : `partner-logos`
4. **Public bucket** : ✅ Activé (pour que les images soient accessibles publiquement)
5. Cliquez sur **Create bucket**

### Étape 3 : Configurer les politiques Storage

1. Dans **SQL Editor**, copiez et exécutez le contenu du fichier `create-partners-storage-policies.sql`

**OU** exécutez directement :

```sql
-- Politique : Tout le monde peut lire les logos
CREATE POLICY "Anyone can view partner logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'partner-logos');

-- Politique : Seuls les admins peuvent uploader des logos
CREATE POLICY "Only admins can upload partner logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'partner-logos' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);

-- Politique : Seuls les admins peuvent modifier des logos
CREATE POLICY "Only admins can update partner logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'partner-logos' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
)
WITH CHECK (
  bucket_id = 'partner-logos' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);

-- Politique : Seuls les admins peuvent supprimer des logos
CREATE POLICY "Only admins can delete partner logos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'partner-logos' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);
```

---

## 🚀 Utilisation

### Pour ajouter un partenaire (Admin uniquement) :

1. Connectez-vous en tant qu'admin
2. Allez sur `/portal`
3. Cliquez sur "Gérer les partenaires" dans la carte Administration
4. Cliquez sur "Ajouter un partenaire"
5. Remplissez le formulaire :
   - Nom du partenaire
   - Catégorie (Strategic, Technology, Brands, Other)
   - Upload du logo
   - Site web (optionnel)
   - Description (optionnel)
6. Cliquez sur "Créer le partenaire"

### Pour modifier/supprimer un partenaire :

1. Allez sur `/portal/partners/manage`
2. Cliquez sur "Modifier" ou "Supprimer" sur le partenaire souhaité

---

## 📝 Catégories disponibles

- **Strategic Partners** (`strategic`)
- **Technology Partners** (`technology`)
- **Brands & Collaborations** (`brands`)
- **Other** (`other`)

---

## 🎨 Affichage

La page `/partners` affiche automatiquement :
- Les partenaires actifs uniquement
- Organisés par catégorie
- Avec leurs logos uploadés
- Design responsive

---

## 🔒 Sécurité

- **Lecture** : Publique (tout le monde peut voir les partenaires actifs)
- **Modification** : Admin uniquement
- **Storage** : Logos accessibles publiquement, upload admin uniquement

---

**Le système de partenaires est prêt ! 🎉**

