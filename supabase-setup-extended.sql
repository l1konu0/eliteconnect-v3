-- ============================================
-- CONFIGURATION SUPABASE ÉTENDUE POUR ELITE CONNECT
-- ============================================
-- Ce script ajoute les champs supplémentaires pour le profil complet
-- Exécutez ce script APRÈS avoir exécuté le script de base (supabase-setup.sql)

-- 1. Ajouter les nouveaux champs à la table profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT FALSE;

-- 2. Mettre à jour la fonction pour inclure les nouveaux champs
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, profile_completed)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    FALSE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Créer une fonction pour mettre à jour le profil
CREATE OR REPLACE FUNCTION public.update_profile(
  p_id UUID,
  p_full_name TEXT,
  p_job_title TEXT,
  p_company TEXT,
  p_phone_number TEXT,
  p_profile_picture_url TEXT,
  p_bio TEXT
)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET 
    full_name = COALESCE(p_full_name, full_name),
    job_title = COALESCE(p_job_title, job_title),
    company = COALESCE(p_company, company),
    phone_number = COALESCE(p_phone_number, phone_number),
    profile_picture_url = COALESCE(p_profile_picture_url, profile_picture_url),
    bio = COALESCE(p_bio, bio),
    profile_completed = TRUE,
    updated_at = NOW()
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Politique pour permettre la mise à jour du profil complet
CREATE POLICY "Users can update own profile complete"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================
-- VÉRIFICATION
-- ============================================
-- Vérifiez la structure de la table :
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'profiles';

