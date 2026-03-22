import { isSupabaseConfigured } from './supabase';
import { saveLeadToSupabase, getLeadsFromSupabase, updateLeadStatus } from './supabaseDb';

export const LOCAL_DB_KEY = 'crm_leads_db';

// ── Legacy Local Auth (fallback when Supabase is not configured) ──

export function loginUserLocal(username, password) {
  if (username.toLowerCase() === 'matt' && password === 'matt') {
    return { role: 'admin', name: 'Matt', storeLocation: 'Demo Store' };
  }
  if (username && password === 'demo') {
    return { role: 'rep', name: username, storeLocation: 'Demo Store' };
  }
  return null;
}

// ── Save Lead (Supabase + localStorage fallback) ──

export async function saveLeadRecord(record) {
  // Always save to localStorage as backup
  const localId = saveToLocalStorage(record);

  // If Supabase is configured, also save there
  if (isSupabaseConfigured()) {
    try {
      const supabaseId = await saveLeadToSupabase(record);
      if (supabaseId) {
        // Store the Supabase ID in localStorage record for future syncing
        updateLocalRecord(localId, { supabaseId });
        return supabaseId;
      }
    } catch (err) {
      console.error('Supabase save failed, using localStorage:', err);
    }
  }

  return localId;
}

// ── Fetch Leads (Supabase or localStorage) ──

export async function getLeadRecords(user) {
  if (isSupabaseConfigured()) {
    try {
      const leads = await getLeadsFromSupabase(user);
      if (leads.length > 0) return leads;
    } catch (err) {
      console.error('Supabase fetch failed, falling back to localStorage:', err);
    }
  }

  // Fallback to localStorage
  return getFromLocalStorage(user);
}

// ── Update Lead Status ──

export async function updateLeadRecord(id, updates) {
  // Update localStorage
  const existing = JSON.parse(localStorage.getItem(LOCAL_DB_KEY) || '[]');
  const idx = existing.findIndex(r => r.id === id || r.supabaseId === id);
  if (idx >= 0) {
    existing[idx] = { ...existing[idx], ...updates };
    localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(existing));
  }

  // Update Supabase
  if (isSupabaseConfigured()) {
    try {
      await updateLeadStatus(id, updates);
    } catch (err) {
      console.error('Supabase update failed:', err);
    }
  }
}

// ── localStorage Helpers (internal) ──

function saveToLocalStorage(record) {
  const existing = JSON.parse(localStorage.getItem(LOCAL_DB_KEY) || '[]');
  if (record.id) {
    const idx = existing.findIndex(r => r.id === record.id);
    if (idx >= 0) existing[idx] = record;
    else existing.push(record);
  } else {
    record.id = Date.now().toString();
    existing.push(record);
  }
  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(existing));
  return record.id;
}

function updateLocalRecord(localId, updates) {
  const existing = JSON.parse(localStorage.getItem(LOCAL_DB_KEY) || '[]');
  const idx = existing.findIndex(r => r.id === localId);
  if (idx >= 0) {
    existing[idx] = { ...existing[idx], ...updates };
    localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(existing));
  }
}

function getFromLocalStorage(user) {
  const existing = JSON.parse(localStorage.getItem(LOCAL_DB_KEY) || '[]');
  if (!user) return [];
  if (user.role === 'admin') return existing.reverse();
  return existing.filter(r => r.repName === user.name).reverse();
}
