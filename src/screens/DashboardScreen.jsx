import React, { useState, useEffect } from 'react';
import { getLeadRecords, updateLeadRecord } from '../services/db';
import { Users, Plus, LogOut, ArrowLeft, Mail, Phone, Calendar, Target, Activity, Send, CheckCircle, MessageSquare, Loader, Award, ArrowRight, AlertTriangle, Thermometer } from 'lucide-react';
import { generateFollowUps } from '../store/followUpLogic';

const STATUS_COLORS = {
  'New Lead': '#94a3b8',
  'Demo Pending': '#fdab3d',
  'Demo Completed': '#579bfc',
  'Follow-up Sent': '#a25ddc',
  'Closed Won': '#00c875',
  'Closed Lost': '#e2445c'
};

const TEMP_COLORS = {
  HOT: { bg: 'rgba(239, 68, 68, 0.15)', text: '#fca5a5', border: 'rgba(239, 68, 68, 0.3)' },
  WARM: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fcd34d', border: 'rgba(245, 158, 11, 0.3)' },
  LUKEWARM: { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)' },
  COLD: { bg: 'rgba(59, 130, 246, 0.15)', text: '#93c5fd', border: 'rgba(59, 130, 246, 0.3)' },
};

function parseTemperature(tempStr) {
  if (!tempStr) return { band: 'PENDING', score: null };
  const match = tempStr.match(/^(HOT|WARM|LUKEWARM|COLD)\s*\((\d+)\)/i);
  if (match) return { band: match[1].toUpperCase(), score: parseInt(match[2]) };
  if (tempStr.includes('Hot')) return { band: 'HOT', score: null };
  if (tempStr.includes('Warm')) return { band: 'WARM', score: null };
  if (tempStr.includes('Cold')) return { band: 'COLD', score: null };
  return { band: 'PENDING', score: null };
}

export default function DashboardScreen({ user, onNewConsult, onLogout, onResumeDemo }) {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      try {
        const data = await getLeadRecords(user);
        setLeads(data);
      } catch (err) {
        console.error('Failed to fetch leads:', err);
      }
      setLoading(false);
    }
    fetchLeads();
  }, [user]);

  const updateStatus = async (leadId, newStatus) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const updated = { ...l, boardStatus: newStatus };
        if (selectedLead?.id === leadId) setSelectedLead(updated);
        return updated;
      }
      return l;
    }));
    await updateLeadRecord(leadId, { boardStatus: newStatus });
  };

  const formatDate = (iso) => {
    if (!iso) return 'N/A';
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const TemperatureBadge = ({ temp }) => {
    const { band, score } = parseTemperature(temp);
    const tc = TEMP_COLORS[band] || { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)' };
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
        background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`,
        padding: '0.35rem 0.85rem', borderRadius: '100px',
        fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap',
      }}>
        {band}{score !== null ? ` (${score})` : ''}
      </span>
    );
  };


  // ═══ LEAD DETAIL VIEW ═══
  if (selectedLead) {
    const lead = selectedLead;
    const fd = lead.finalDecision;
    const followUps = generateFollowUps(lead.customer, lead.intelligence, lead.repNotes, fd);

    return (
      <div className="main-content slide-up" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <button className="btn btn-secondary" onClick={() => setSelectedLead(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 2fr', gap: '2rem' }}>

          {/* Left: Customer Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{lead.customer?.firstName} {lead.customer?.lastName}</h2>
                  <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.9rem' }}><Mail size={14} /> {lead.customer?.email}</div>
                  <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.9rem' }}><Phone size={14} /> {lead.customer?.phone || 'N/A'}</div>
                  <div style={{ color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}><Calendar size={14} /> {formatDate(lead.date)}</div>
                </div>
                <TemperatureBadge temp={lead.temperature} />
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1rem 0' }} />
              <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                <div><strong>Store:</strong> {lead.storeLocation || 'N/A'}</div>
                <div><strong>Rep:</strong> {lead.repName || 'N/A'}</div>
                {fd && <div style={{ marginTop: '0.5rem' }}><strong>Best Fit:</strong> <span style={{ color: 'var(--accent-primary)' }}>{fd.finalBestFitChair}</span></div>}
                {fd && <div><strong>Backup:</strong> {fd.backupChair}</div>}
                {fd && <div><strong>Objection:</strong> <span style={{ color: '#fca5a5' }}>{fd.realObjection}</span></div>}
                {fd && <div><strong>Next Action:</strong> {fd.nextBestAction}</div>}
              </div>
            </div>

            {/* Discovery Answers */}
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.02)' }}>
                <MessageSquare size={16} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>Discovery Answers</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {lead.answers?.length > 0 ? lead.answers.map((ans, idx) => (
                  <li key={idx} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', borderLeft: '3px solid var(--accent-primary)', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                    {ans}
                  </li>
                )) : (
                  <li style={{ color: 'var(--text-tertiary)' }}>No discovery answers recorded.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Right: Intelligence + Follow-Up */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Intelligence Grid */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Target size={16} /> Intelligence Match</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Demo Lane</div>
                  <div style={{ fontSize: '1rem', color: 'var(--accent-primary)' }}>{lead.intelligence?.demoLane || 'N/A'}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Friction</div>
                  <div style={{ fontSize: '1rem', color: '#fca5a5' }}>{lead.intelligence?.primaryFriction || 'N/A'}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Orientation</div>
                  <div style={{ fontSize: '1rem', color: 'white' }}>{lead.intelligence?.buyerOrientation || 'N/A'}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Target Chairs</div>
                  <div style={{ fontSize: '1rem', color: 'white' }}>{lead.intelligence?.topChairs?.join(', ') || 'N/A'}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Follow-Up</div>
                  <div style={{ fontSize: '1rem', color: 'white' }}>{fd?.followUpAngle || lead.intelligence?.followUpAngle || 'N/A'}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', marginBottom: '0.3rem', textTransform: 'uppercase' }}>Next Step</div>
                  <div style={{ fontSize: '1rem', color: fd?.nextStepLocked ? '#34d399' : '#fca5a5' }}>
                    {fd?.nextStepLocked ? `✓ ${fd.nextStepType}` : '✗ Not locked'}
                  </div>
                </div>
              </div>
            </div>

            {/* Follow-Up Sequence */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Send size={16} /> Follow-Up Sequence</h3>

              {!lead.repNotes ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fcd34d', padding: '1.25rem', borderRadius: '6px', marginBottom: '1.25rem' }}>
                    <strong>Demo Pending</strong>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#fde68a' }}>Complete the physical demo, then fill out the Post-Demo Report to unlock follow-up automations.</p>
                  </div>
                  <button className="btn btn-primary" onClick={() => onResumeDemo(lead)} style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={18} /> Complete Post-Demo Report
                  </button>
                </div>
              ) : (
                <>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                    {followUps.type === "Post-Purchase"
                      ? "Sale completed! Onboarding sequence below."
                      : `Friction-based sequence: ${followUps.frictionType || 'General'}`
                    }
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {followUps.messages.map((fp, idx) => (
                      <div key={idx} style={{
                        padding: '1.25rem', borderRadius: '6px',
                        background: followUps.type === 'Post-Purchase' ? 'rgba(52, 211, 153, 0.05)' : 'rgba(14, 165, 233, 0.05)',
                        borderLeft: `4px solid ${followUps.type === 'Post-Purchase' ? '#34d399' : 'var(--accent-primary)'}`,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <div>
                            <strong style={{ color: 'white', display: 'block', fontSize: '1rem', marginBottom: '0.2rem' }}>{fp.time}</strong>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{fp.title}</span>
                          </div>
                          <button onClick={() => updateStatus(lead.id, 'Follow-up Sent')} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <CheckCircle size={12} /> Sent
                          </button>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>"{fp.message}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }


  // ═══ TABLE VIEW ═══
  return (
    <div className="main-content slide-up" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Welcome, <span style={{ color: 'var(--accent-primary)' }}>{user?.name}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            {user?.role === 'admin' ? 'Global Admin Dashboard' : 'Your Sales Pipeline'}
            <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.5rem' }}>• {user?.storeLocation}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.1rem' }}>
            <LogOut size={16} /> Logout
          </button>
          <button className="btn btn-primary" onClick={onNewConsult} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.25rem' }}>
            <Plus size={18} /> New Consultation
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={18} color="var(--accent-primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>Lead Pipeline</h3>
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginLeft: 'auto' }}>{leads.length} leads</span>
        </div>

        {loading ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <Loader size={24} className="spin" style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p>Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>No records found.</p>
            <p>Click "New Consultation" to begin.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.25)' }}>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer</th>
                  <th style={{ padding: '1rem 1rem', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase' }}>Rep</th>
                  <th style={{ padding: '1rem 1rem', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase' }}>Best Fit</th>
                  <th style={{ padding: '1rem 1rem', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase' }}>Temp</th>
                  <th style={{ padding: '1rem 1rem', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase' }}>Objection</th>
                  <th style={{ padding: '1rem 1rem', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase' }}>Next Step</th>
                  <th style={{ padding: '1rem 1rem', color: 'var(--text-tertiary)', fontWeight: 500, fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const fd = lead.finalDecision;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      style={{
                        cursor: 'pointer', borderTop: '1px solid var(--glass-border)',
                        transition: 'background 0.1s', background: 'rgba(0,0,0,0.1)',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                    >
                      <td style={{ padding: '1rem 1.25rem', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: STATUS_COLORS[lead.boardStatus || 'New Lead'] }} />
                        <div style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>{lead.customer?.firstName} {lead.customer?.lastName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>{formatDate(lead.date)}</div>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{lead.repName || user?.name}</td>
                      <td style={{ padding: '1rem', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
                        {fd?.finalBestFitChair || lead.intelligence?.topChairs?.[0] || '—'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <TemperatureBadge temp={lead.temperature} />
                      </td>
                      <td style={{ padding: '1rem', color: '#fca5a5', fontSize: '0.85rem' }}>
                        {fd?.realObjection || lead.intelligence?.primaryFriction || '—'}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                        {fd?.nextStepLocked ? (
                          <span style={{ color: '#34d399' }}>✓ {fd.nextStepType}</span>
                        ) : fd ? (
                          <span style={{ color: '#fca5a5' }}>✗ Not locked</span>
                        ) : (
                          <span style={{ color: 'var(--text-tertiary)' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '0' }}>
                        <select
                          value={lead.boardStatus || 'New Lead'}
                          onChange={(e) => { e.stopPropagation(); updateStatus(lead.id, e.target.value); }}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            appearance: 'none', background: STATUS_COLORS[lead.boardStatus || 'New Lead'],
                            color: 'white', border: 'none', width: '100%', height: '100%',
                            minHeight: '68px', padding: '0 1.5rem 0 1rem', textAlign: 'center',
                            fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', outline: 'none',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                          }}
                        >
                          {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s} style={{ background: 'var(--bg-dark)' }}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
