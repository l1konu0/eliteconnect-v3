-- ============================================
-- SUPPRIMER UN UTILISATEUR ET TOUTES SES DONNÉES MANUELLEMENT
-- ============================================
-- ⚠️ REMPLACEZ 'USER_UUID_HERE' par l'UUID réel de l'utilisateur à supprimer
-- Vous pouvez trouver l'UUID dans Supabase Dashboard > Authentication > Users

-- Définir l'UUID de l'utilisateur à supprimer
DO $$
DECLARE
  user_uuid UUID := 'USER_UUID_HERE'; -- ⚠️ REMPLACEZ ICI
BEGIN
  -- 1. Supprimer les contacts de l'utilisateur
  DELETE FROM public.contacts WHERE user_id = user_uuid;
  
  -- 2. Supprimer les RSVPs aux événements
  DELETE FROM public.event_rsvps WHERE user_id = user_uuid;
  
  -- 3. Supprimer les photos d'événements uploadées par l'utilisateur
  DELETE FROM public.event_photos WHERE uploaded_by = user_uuid;
  
  -- 4. Supprimer les invitations créées par l'utilisateur
  DELETE FROM public.event_invitations WHERE invited_by = user_uuid;
  
  -- 5. Supprimer les invitations reçues par l'utilisateur
  DELETE FROM public.event_invitations WHERE invited_user_id = user_uuid;
  
  -- 6. Mettre à NULL reviewed_by dans membership_requests (garder les demandes)
  UPDATE public.membership_requests 
  SET reviewed_by = NULL 
  WHERE reviewed_by = user_uuid;
  
  -- 7. Supprimer le profil
  DELETE FROM public.profiles WHERE id = user_uuid;
  
  -- 8. Supprimer l'utilisateur de auth.users
  -- ⚠️ Cette commande doit être exécutée avec les privilèges admin
  -- Vous pouvez aussi le faire depuis le dashboard Supabase après avoir supprimé les données ci-dessus
  -- DELETE FROM auth.users WHERE id = user_uuid;
  
  RAISE NOTICE 'Toutes les données liées à l''utilisateur % ont été supprimées. Vous pouvez maintenant supprimer l''utilisateur depuis le dashboard.', user_uuid;
END $$;

-- ============================================
-- ALTERNATIVE : Utiliser une fonction pour trouver l'utilisateur par email
-- ============================================
-- Si vous préférez utiliser l'email au lieu de l'UUID :

-- DO $$
-- DECLARE
--   user_uuid UUID;
--   user_email TEXT := 'user@example.com'; -- ⚠️ REMPLACEZ ICI
-- BEGIN
--   -- Trouver l'UUID par email
--   SELECT id INTO user_uuid FROM auth.users WHERE email = user_email;
--   
--   IF user_uuid IS NULL THEN
--     RAISE EXCEPTION 'Utilisateur avec email % non trouvé', user_email;
--   END IF;
--   
--   -- Supprimer toutes les données (même code que ci-dessus)
--   DELETE FROM public.contacts WHERE user_id = user_uuid;
--   DELETE FROM public.event_rsvps WHERE user_id = user_uuid;
--   DELETE FROM public.event_photos WHERE uploaded_by = user_uuid;
--   DELETE FROM public.event_invitations WHERE invited_by = user_uuid;
--   DELETE FROM public.event_invitations WHERE invited_user_id = user_uuid;
--   UPDATE public.membership_requests SET reviewed_by = NULL WHERE reviewed_by = user_uuid;
--   DELETE FROM public.profiles WHERE id = user_uuid;
--   
--   RAISE NOTICE 'Toutes les données liées à l''utilisateur % (%) ont été supprimées.', user_email, user_uuid;
-- END $$;
