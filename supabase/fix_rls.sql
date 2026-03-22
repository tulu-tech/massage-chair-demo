-- ============================================================
-- FIX: Drop broken recursive RLS policies and recreate
-- Run this in Supabase SQL Editor
-- ============================================================

-- Drop ALL existing policies
DROP POLICY IF EXISTS "users_read_own_profile" ON profiles;
DROP POLICY IF EXISTS "users_read_store_profiles" ON profiles;
DROP POLICY IF EXISTS "admins_read_all_profiles" ON profiles;
DROP POLICY IF EXISTS "reps_read_store_leads" ON leads;
DROP POLICY IF EXISTS "reps_insert_leads" ON leads;
DROP POLICY IF EXISTS "reps_update_own_leads" ON leads;
DROP POLICY IF EXISTS "admins_all_leads" ON leads;
DROP POLICY IF EXISTS "anyone_read_stores" ON stores;
DROP POLICY IF EXISTS "admins_manage_stores" ON stores;

-- ============================================================
-- STORES: Everyone can read (needed for login dropdown)
-- ============================================================
CREATE POLICY "stores_select" ON stores FOR SELECT USING (true);

-- ============================================================
-- PROFILES: Simple non-recursive policies using auth.uid()
-- ============================================================

-- Users can read their own profile (no subquery needed)
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (id = auth.uid());

-- Users can update their own profile
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (id = auth.uid());

-- ============================================================
-- LEADS: Use auth.uid() directly, avoid subqueries on profiles
-- ============================================================

-- Reps can read their own leads
CREATE POLICY "leads_select_own" ON leads
  FOR SELECT USING (rep_id = auth.uid());

-- Reps can insert their own leads
CREATE POLICY "leads_insert_own" ON leads
  FOR INSERT WITH CHECK (rep_id = auth.uid());

-- Reps can update their own leads
CREATE POLICY "leads_update_own" ON leads
  FOR UPDATE USING (rep_id = auth.uid());

-- ============================================================
-- Make sure user and profile exist
-- ============================================================

-- Check if user already exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'tulu@genesismechanics.com') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password,
      email_confirmed_at, role, aud,
      raw_user_meta_data, created_at, updated_at
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'tulu@genesismechanics.com',
      crypt('Tulu2026!', gen_salt('bf')),
      NOW(), 'authenticated', 'authenticated',
      '{"full_name": "Tulu"}',
      NOW(), NOW()
    );
  END IF;
END $$;

-- Ensure profile exists for the user
INSERT INTO profiles (id, full_name, role, store_id)
SELECT
  u.id,
  'Tulu',
  'admin',
  (SELECT id FROM stores WHERE name = 'Orlando Showroom' LIMIT 1)
FROM auth.users u
WHERE u.email = 'tulu@genesismechanics.com'
ON CONFLICT (id) DO UPDATE
  SET role = 'admin', full_name = 'Tulu',
      store_id = (SELECT id FROM stores WHERE name = 'Orlando Showroom' LIMIT 1);

-- Verify everything
SELECT 'STORES:' as section;
SELECT id, name FROM stores;

SELECT 'USER:' as section;
SELECT id, email FROM auth.users WHERE email = 'tulu@genesismechanics.com';

SELECT 'PROFILE:' as section;
SELECT p.id, p.full_name, p.role, s.name as store
FROM profiles p
LEFT JOIN stores s ON s.id = p.store_id
WHERE p.id = (SELECT id FROM auth.users WHERE email = 'tulu@genesismechanics.com');
