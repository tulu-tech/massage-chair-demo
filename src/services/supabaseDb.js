import { supabase, isSupabaseConfigured } from './supabase';

// ── Save Lead ──

export async function saveLeadToSupabase(record) {
  if (!isSupabaseConfigured()) return null;

  const leadData = {
    store_id: record.storeId,
    rep_id: record.repId,
    customer_first_name: record.customer?.firstName || '',
    customer_last_name: record.customer?.lastName || '',
    customer_email: record.customer?.email || '',
    customer_mobile: record.customer?.phone || record.customer?.mobile || '',
    contact_consent: record.consent?.contactConsent || record.customer?.consent || false,
    medical_consent: record.medicalConsent || {},
    answers: record.answers || [],
    intelligence: record.intelligence || {},
    temperature: record.temperature || 'Pending Demo',
    board_status: record.boardStatus || 'Demo Pending',
    demo_lane: record.intelligence?.demoLane || null,
    rep_notes: record.repNotes || {},
  };

  // Update existing or insert new
  if (record.supabaseId) {
    const { data, error } = await supabase
      .from('leads')
      .update(leadData)
      .eq('id', record.supabaseId)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return null;
    }
    return data.id;
  } else {
    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return null;
    }
    return data.id;
  }
}

// ── Fetch Leads ──

export async function getLeadsFromSupabase(user) {
  if (!isSupabaseConfigured()) return [];

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  // RLS handles store-level filtering automatically,
  // but reps might want to see only their own leads
  if (user?.role === 'rep') {
    query = query.eq('rep_id', user.id);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase fetch error:', error);
    return [];
  }

  // Transform to match existing app format
  return (data || []).map(row => ({
    id: row.id,
    supabaseId: row.id,
    customer: {
      firstName: row.customer_first_name,
      lastName: row.customer_last_name,
      email: row.customer_email,
      mobile: row.customer_mobile,
      consent: row.contact_consent,
    },
    medicalConsent: row.medical_consent,
    repName: null, // filled by join if needed
    storeLocation: null,
    temperature: row.temperature,
    laneName: row.demo_lane,
    boardStatus: row.board_status,
    date: row.created_at,
    answers: row.answers || [],
    intelligence: row.intelligence || {},
    repNotes: row.rep_notes || {},
  }));
}

// ── Update Lead Status ──

export async function updateLeadStatus(leadId, updates) {
  if (!isSupabaseConfigured()) return false;

  const updateData = {};
  if (updates.temperature) updateData.temperature = updates.temperature;
  if (updates.boardStatus) updateData.board_status = updates.boardStatus;
  if (updates.repNotes) updateData.rep_notes = updates.repNotes;

  const { error } = await supabase
    .from('leads')
    .update(updateData)
    .eq('id', leadId);

  if (error) {
    console.error('Supabase status update error:', error);
    return false;
  }
  return true;
}
