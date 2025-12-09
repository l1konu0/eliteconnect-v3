-- ============================================
-- CONFIGURATION TABLE CONTACTS POUR ELITE CONNECT
-- ============================================
-- Ce script crée la table contacts pour stocker les informations de contact des membres
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- 1. Créer la table contacts
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

-- 2. Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS contacts_user_id_idx ON contacts(user_id);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts(created_at DESC);

-- 3. Activer Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 4. Politique : Les utilisateurs peuvent voir tous les contacts (tous les membres)
CREATE POLICY "Anyone can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- 5. Politique : Les utilisateurs peuvent créer leurs propres contacts
CREATE POLICY "Users can create own contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 6. Politique : Les utilisateurs peuvent modifier leurs propres contacts
CREATE POLICY "Users can update own contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 7. Politique : Les utilisateurs peuvent supprimer leurs propres contacts
CREATE POLICY "Users can delete own contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 8. Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Déclencher la mise à jour automatique de updated_at
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VÉRIFICATION
-- ============================================
-- Vérifiez la structure de la table :
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'contacts';

