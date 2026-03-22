-- ============================================================
-- Massage Chair Demo CRM — Supabase Schema
-- Run this in your Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- 1. STORES TABLE
CREATE TABLE IF NOT EXISTS stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- 2. PROFILES TABLE (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'rep' CHECK (role IN ('admin', 'rep', 'manager')),
  store_id UUID REFERENCES stores(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) NOT NULL,
  rep_id UUID REFERENCES profiles(id) NOT NULL,
  
  -- Customer PII (protected by RLS)
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT,
  customer_email TEXT,
  customer_mobile TEXT,
  
  -- Consent tracking
  contact_consent BOOLEAN DEFAULT FALSE,
  medical_consent JSONB DEFAULT '{}',
  
  -- Questionnaire data
  answers JSONB DEFAULT '[]',
  
  -- Scoring intelligence
  intelligence JSONB DEFAULT '{}',
  
  -- CRM fields
  temperature TEXT DEFAULT 'Pending Demo' CHECK (temperature IN ('Pending Demo', 'Hot', 'Warm', 'Cold', 'Closed Won', 'Closed Lost')),
  board_status TEXT DEFAULT 'Demo Pending' CHECK (board_status IN ('Demo Pending', 'Demo Completed', 'Follow-Up', 'Closed Won', 'Closed Lost')),
  demo_lane TEXT,
  
  -- Rep notes (post-demo)
  rep_notes JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

-- PROFILES: Users can read their own profile
CREATE POLICY "users_read_own_profile" ON profiles
  FOR SELECT USING (id = auth.uid());

-- PROFILES: Users can read profiles in their store (for seeing rep names)
CREATE POLICY "users_read_store_profiles" ON profiles
  FOR SELECT USING (
    store_id = (SELECT store_id FROM profiles WHERE id = auth.uid())
  );

-- PROFILES: Admins can read all profiles
CREATE POLICY "admins_read_all_profiles" ON profiles
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- LEADS: Reps can SELECT leads from their own store
CREATE POLICY "reps_read_store_leads" ON leads
  FOR SELECT USING (
    store_id = (SELECT store_id FROM profiles WHERE id = auth.uid())
  );

-- LEADS: Reps can INSERT leads for their store
CREATE POLICY "reps_insert_leads" ON leads
  FOR INSERT WITH CHECK (
    rep_id = auth.uid() AND
    store_id = (SELECT store_id FROM profiles WHERE id = auth.uid())
  );

-- LEADS: Reps can UPDATE their own leads
CREATE POLICY "reps_update_own_leads" ON leads
  FOR UPDATE USING (rep_id = auth.uid());

-- LEADS: Admins can do everything with leads
CREATE POLICY "admins_all_leads" ON leads
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- STORES: Everyone can read stores (for dropdowns)
CREATE POLICY "anyone_read_stores" ON stores
  FOR SELECT USING (true);

-- STORES: Only admins can manage stores
CREATE POLICY "admins_manage_stores" ON stores
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================================
-- AUTO-UPDATE TIMESTAMP TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role, store_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'rep'),
    (NEW.raw_user_meta_data->>'store_id')::UUID
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- SEED DATA: Create initial store (adjust name as needed)
-- ============================================================

INSERT INTO stores (name, address) VALUES 
  ('Orlando Showroom', 'Orlando, FL'),
  ('Dallas Showroom', 'Dallas, TX')
ON CONFLICT (name) DO NOTHING;
