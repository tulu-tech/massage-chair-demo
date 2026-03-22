import React, { useState, useEffect } from 'react';
import { getLeadRecords, updateLeadRecord } from '../services/db';
import { Users, Plus, LogOut, ArrowLeft, Mail, Phone, Calendar, Target, Activity, Send, MapPin, CheckCircle, MessageSquare, Loader } from 'lucide-react';
import { generateFollowUps } from '../store/followUpLogic';

const STATUS_COLORS = {
  'New Lead': '#c4c4c4',
  'Demo Pending': '#fdab3d',
  'Demo Completed': '#579bfc',
  'Follow-up Sent': '#a25ddc',
  'Closed Won': '#00c875',
  'Closed Lost': '#e2445c'
};

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

  const updateLeadStatus = async (leadId, newStatus) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const updated = { ...l, boardStatus: newStatus };
        if (selectedLead && selectedLead.id === leadId) setSelectedLead(updated);
        return updated;
      }
      return l;
    }));
    await updateLeadRecord(leadId, { boardStatus: newStatus });
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const d = new Date(isoString);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  const getTemperatureBadge = (temp) => {
    const isHot = temp?.includes('Hot');
    const isWarm = temp?.includes('Warm');
    const isClosed = temp?.includes('Closed');
    
    let displayTemp = temp || 'Pending';
    if (displayTemp.includes('(')) {
       displayTemp = displayTemp.split(' ')[0];
    }
    
    return (
      <span style={{ 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isClosed ? 'rgba(52, 211, 153, 0.15)' : isHot ? 'rgba(239, 68, 68, 0.15)' : isWarm ? 'rgba(245, 158, 11, 0.15)' : 'rgba(148, 163, 184, 0.15)',
        color: isClosed ? '#34d399' : isHot ? '#fca5a5' : isWarm ? '#fcd34d' : '#cbd5e1',
        border: `1px solid ${isClosed ? 'rgba(52, 211, 153, 0.3)' : isHot ? 'rgba(239, 68, 68, 0.3)' : isWarm ? 'rgba(245, 158, 11, 0.3)' : 'rgba(148, 163, 184, 0.3)'}`,
        padding: '0.4rem 1rem', 
        borderRadius: '100px', 
        fontSize: '0.85rem', 
        fontWeight: 600,
        whiteSpace: 'nowrap'
      }}>
        {displayTemp}
      </span>
    );
  };

  if (selectedLead) {
    const lead = selectedLead;
    const followUps = generateFollowUps(lead.customer, lead.intelligence, lead.repNotes);

    return (
      <div className="main-content slide-up" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <button className="btn btn-secondary" onClick={() => setSelectedLead(null)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem' }}>
          
          {/* Left Column: Customer & Answers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{lead.customer?.firstName} {lead.customer?.lastName}</h2>
                  <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><Mail size={14}/> {lead.customer?.email}</div>
                  <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><Phone size={14}/> {lead.customer?.mobile || 'N/A'}</div>
                  <div style={{ color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}><Calendar size={14}/> {formatDate(lead.date)}</div>
                </div>
                {getTemperatureBadge(lead.temperature)}
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1.5rem 0' }} />
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.95rem' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong>Store:</strong> {lead.storeLocation || 'N/A'}</div>
                <div><strong>Rep:</strong> {lead.repName || 'N/A'}</div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.02)' }}>
                <MessageSquare size={18} color="var(--accent-primary)"/>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Discovery Answers</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: '1.5rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {lead.answers && lead.answers.length > 0 ? (
                  lead.answers.map((ans, idx) => (
                    <li key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-primary)', color: 'var(--text-primary)' }}>
                      {ans}
                    </li>
                  ))
                ) : (
                   <li style={{ color: 'var(--text-tertiary)' }}>No discovery answers recorded.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Right Column: Intelligence & Follow Up */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Target size={18}/> Artificial Intelligence Match</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                   <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Demo Lane</div>
                   <div style={{ fontSize: '1.2rem', color: 'var(--accent-primary)' }}>{lead.intelligence?.demoLane || 'N/A'}</div>
                 </div>
                 <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                   <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Strategic Follow-Up Angle</div>
                   <div style={{ fontSize: '1.2rem', color: 'white' }}>{lead.repNotes?.didPurchase ? `Post-Purchase: ${lead.repNotes.purchasedChair}` : lead.intelligence?.followUpAngle || 'N/A'}</div>
                 </div>
                 <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                   <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Primary Friction</div>
                   <div style={{ fontSize: '1.2rem', color: '#fca5a5' }}>{lead.repNotes?.didPurchase ? 'Resolved (Sale Closed)' : lead.intelligence?.primaryFriction || 'N/A'}</div>
                 </div>
                 <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                   <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Top Target Chairs</div>
                   <div style={{ fontSize: '1.2rem', color: 'white' }}>{lead.intelligence?.topChairs?.join(', ') || 'N/A'}</div>
                 </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Send size={18}/> Automated Follow-Up Sequence</h3>
              
              {!lead.repNotes ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fcd34d', padding: '1.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
                     <strong>Demo Pending</strong>
                     <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: '#fde68a' }}>Complete the physical showroom demo with the customer, then fill out the Post-Demo Rep form to unlock personalized SMS/Email automations.</p>
                  </div>
                  <button className="btn btn-primary" onClick={() => onResumeDemo(lead)} style={{ width: '100%', padding: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                     <CheckCircle size={18} /> Complete Post-Demo Report
                  </button>
                </div>
              ) : (
                <>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    {followUps.type === "Post-Purchase" 
                      ? "The customer has purchased! The following onboarding and confirmation sequence will be triggered."
                      : `Based on the \`${lead.intelligence?.followUpAngle}\` strategy, here is the generated communication sequence.`
                    }
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {followUps.messages.map((fp, idx) => (
                      <div key={idx} style={{ padding: '1.5rem', background: followUps.type === 'Post-Purchase' ? 'rgba(52, 211, 153, 0.05)' : 'rgba(14, 165, 233, 0.05)', borderRadius: 'var(--radius-sm)', borderLeft: `4px solid ${followUps.type === 'Post-Purchase' ? '#34d399' : 'var(--accent-primary)'}` }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                              <strong style={{ color: 'white', display: 'block', fontSize: '1.1rem', marginBottom: '0.3rem' }}>{fp.time}</strong>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{fp.title}</span>
                            </div>
                            <button 
                              onClick={() => updateLeadStatus(lead.id, 'Follow-up Sent')}
                              className="btn btn-secondary" 
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                            >
                              <CheckCircle size={14} /> Mark Sent
                            </button>
                         </div>
                         <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                           <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>"{fp.message}"</p>
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

  // --- DEFAULT TABLE VIEW ---
  return (
    <div className="main-content slide-up" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Welcome, <span style={{ color: 'var(--accent-primary)' }}>{user?.name}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            {user?.role === 'admin' ? 'Global Admin Dashboard' : 'Your Personal Sales Cohort'} 
            <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.5rem' }}>• {user?.storeLocation}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}>
             <LogOut size={16} /> Logout
          </button>
          <button className="btn btn-primary" onClick={onNewConsult} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
             <Plus size={18} /> New Consultation
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
           <Users size={20} color="var(--accent-primary)" />
           <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Recent Leads & Deals</h3>
        </div>
        
        {loading ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <Loader size={24} className="spin" style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p>Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No records found.</p>
            <p>Click "New Consultation" to capture your first lead.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <th style={{ padding: '1.25rem 2rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', width: '25%' }}>Customer</th>
                  <th style={{ padding: '1.25rem 2rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', width: '15%' }}>User</th>
                  <th style={{ padding: '1.25rem 2rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', width: '20%' }}>Target Lane</th>
                  <th style={{ padding: '1.25rem 2rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', width: '15%' }}>Deal Temp</th>
                  <th style={{ padding: '1.25rem 2rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', width: '25%' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr 
                    key={lead.id} 
                    onClick={() => setSelectedLead(lead)}
                    style={{ 
                      cursor: 'pointer',
                      borderTop: '1px solid var(--glass-border)', 
                      transition: 'background 0.1s', 
                      background: 'rgba(0,0,0,0.15)',
                      ':hover': { background: 'rgba(255,255,255,0.05)' } 
                    }}
                  >
                    <td style={{ padding: '1rem 2rem', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: STATUS_COLORS[lead.boardStatus || 'New Lead'] }} />
                      <div style={{ fontWeight: 600, color: 'white', fontSize: '1.05rem' }}>{lead.customer?.firstName} {lead.customer?.lastName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.3rem' }}>{formatDate(lead.date)}</div>
                    </td>
                    <td style={{ padding: '1rem 2rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', height: '100%', borderLeft: '1px solid var(--glass-border)' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'white', fontWeight: 'bold' }}>
                         {lead.repName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span style={{ fontSize: '0.95rem' }}>{lead.repName || user?.name || 'Unknown'}</span>
                    </td>
                    <td style={{ padding: '1rem 2rem', color: '#e2e8f0', fontSize: '0.95rem', borderLeft: '1px solid var(--glass-border)' }}>{lead.laneName}</td>
                    <td style={{ padding: '1rem 2rem', borderLeft: '1px solid var(--glass-border)' }}>
                      {getTemperatureBadge(lead.temperature)}
                    </td>
                    <td style={{ padding: '0', position: 'relative', width: '160px', borderLeft: '1px solid var(--glass-border)' }}>
                      <select 
                        value={lead.boardStatus || 'New Lead'} 
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          appearance: 'none',
                          background: STATUS_COLORS[lead.boardStatus || 'New Lead'],
                          color: 'white',
                          border: 'none',
                          width: '100%',
                          height: '100%',
                          minHeight: '76px', // Slight increase to ensure fills row
                          padding: '0 2rem 0 1rem', // Space for arrow
                          textAlign: 'center',
                          fontWeight: '600',
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          outline: 'none',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden'
                        }}
                      >
                         {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s} style={{background: 'var(--bg-dark)'}}>{s}</option>)}
                      </select>
                      {/* Monday.com style corner fold icon representation */}
                      <div style={{ position: 'absolute', right: '0', top: '0', width: '15px', height: '15px', background: 'rgba(0,0,0,0.2)', clipPath: 'polygon(100% 0, 0% 0, 100% 100%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '5px solid white', opacity: 0.9 }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
