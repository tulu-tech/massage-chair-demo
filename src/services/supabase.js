import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase')) {
  console.warn(
    '⚠️ Supabase not configured. Running in offline/localStorage mode.\n' +
    'To connect Supabase, update .env with your project URL and anon key.'
  );
}

export const supabase = (supabaseUrl && !supabaseUrl.includes('your_supabase'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = () => !!supabase;

// ── Auth Helpers ──

export async function signIn(email, password) {
  if (!supabase) return { error: 'Supabase not configured' };
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) return { error: error.message };
  
  // Fetch profile to get role & store
  const { data: profile } = await supabase
    .from('profiles')
    .select('*, stores(name)')
    .eq('id', data.user.id)
    .single();
  
  return {
    user: {
      id: data.user.id,
      email: data.user.email,
      name: profile?.full_name || data.user.email,
      role: profile?.role || 'rep',
      storeId: profile?.store_id,
      storeLocation: profile?.stores?.name || 'Unknown Store',
    },
    session: data.session,
  };
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return null;
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*, stores(name)')
    .eq('id', session.user.id)
    .single();
  
  return {
    id: session.user.id,
    email: session.user.email,
    name: profile?.full_name || session.user.email,
    role: profile?.role || 'rep',
    storeId: profile?.store_id,
    storeLocation: profile?.stores?.name || 'Unknown Store',
  };
}

export async function createRepUser(email, password, fullName, storeId) {
  if (!supabase) return { error: 'Supabase not configured' };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: 'rep',
        store_id: storeId,
      }
    }
  });

  if (error) return { error: error.message };
  return { user: data.user };
}

// ── Store Helpers ──

export async function getStores() {
  if (!supabase) return [];
  const { data } = await supabase.from('stores').select('*').order('name');
  return data || [];
}
