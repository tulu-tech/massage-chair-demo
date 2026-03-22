export const LOCAL_DB_KEY = 'crm_leads_db';

export function loginUser(username, password) {
  if (username.toLowerCase() === 'matt' && password === 'matt') {
    return { role: 'admin', name: 'Matt' };
  }
  if (username && password === 'demo') {
    return { role: 'rep', name: username };
  }
  return null;
}

export function saveLeadRecord(record) {
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

export function getLeadRecords(user) {
  const existing = JSON.parse(localStorage.getItem(LOCAL_DB_KEY) || '[]');
  if (!user) return [];
  if (user.role === 'admin') return existing.reverse();
  return existing.filter(r => r.repName === user.name).reverse();
}
