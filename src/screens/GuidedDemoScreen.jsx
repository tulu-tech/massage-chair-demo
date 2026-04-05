import React from 'react';
import { Play, AlertTriangle, Target, Eye, EyeOff, ShieldAlert, ArrowRight, CheckCircle } from 'lucide-react';

export default function GuidedDemoScreen({ results, leadData, onCompleteDemo }) {
  if (!results) return null;

  const name = leadData?.firstName || 'Customer';
  const chairs = results.topChairs || [];
  const backups = results.backupChairs || [];
  const emphasize = results.emphasize || [];
  const warnings = results.doNotLeadWith || [];
  const likelyObjection = results.likelyObjection || 'think about it';
  const framing = results.repFraming || '';

  const objectionLabels = {
    'spouse': '🤝 Spouse / Partner Alignment',
    'space': '📐 Space / Measurements',
    'payment': '💳 Price / Payment Comfort',
    'comparison': '⚖️ Comparison / Research',
    'think about it': '🧠 "Let me think about it"',
  };

  return (
    <div className="main-content slide-up" style={{ maxWidth: '900px', margin: '0 auto', padding: '4vh 1rem' }}>

      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)',
          padding: '0.5rem 1.25rem', borderRadius: '100px', color: '#34d399',
          fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '1rem',
        }}>
          <Play size={14} /> GUIDED DEMO MODE
        </div>
        <h2 style={{
          fontSize: '2.2rem', fontWeight: 300, marginBottom: '0.75rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Demo Strategy for {name}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
          Use this guide during the physical demo. Follow the chair order and emphasis points below.
        </p>
      </header>

      {/* Suggested Start Chairs */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
          <Target size={18} /> Suggested Start Chairs
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {chairs.map((chair, idx) => (
            <div key={chair} style={{
              padding: '1.5rem',
              background: idx === 0 ? 'rgba(14, 165, 233, 0.08)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${idx === 0 ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
              position: 'relative',
            }}>
              {idx === 0 && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  background: 'var(--accent-primary)', color: 'black',
                  padding: '0.2rem 0.75rem', fontSize: '0.75rem', fontWeight: 600,
                  borderBottomLeftRadius: 'var(--radius-sm)',
                }}>
                  START HERE
                </div>
              )}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {idx === 0 ? 'First Chair' : 'Second Chair'}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 500, color: 'white' }}>{chair}</div>
            </div>
          ))}
        </div>
        {backups.length > 0 && (
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            <strong>Backup options:</strong> {backups.join(', ')}
          </div>
        )}
      </div>

      {/* Why These Two */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'white' }}>
          Why These Two
        </h3>
        <p style={{
          fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)',
          background: 'rgba(255,255,255,0.03)', padding: '1.25rem',
          borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--accent-primary)',
          fontStyle: 'italic',
        }}>
          "{framing}"
        </p>
      </div>

      {/* Two-column layout for emphasis and warnings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>

        {/* What to Emphasize */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399' }}>
            <Eye size={16} /> What to Emphasize
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {emphasize.map((item, idx) => (
              <li key={idx} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: 'var(--text-secondary)', fontSize: '0.95rem',
                padding: '0.5rem 0.75rem', background: 'rgba(52, 211, 153, 0.05)',
                borderRadius: '4px',
              }}>
                <CheckCircle size={14} color="#34d399" style={{ flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What NOT to Lead With */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fca5a5' }}>
            <EyeOff size={16} /> What NOT to Lead With
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {warnings.map((item, idx) => (
              <li key={idx} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: 'var(--text-secondary)', fontSize: '0.95rem',
                padding: '0.5rem 0.75rem', background: 'rgba(239, 68, 68, 0.05)',
                borderRadius: '4px',
              }}>
                <AlertTriangle size={14} color="#fca5a5" style={{ flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Likely Objection */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fcd34d' }}>
          <ShieldAlert size={16} /> Likely Objection
        </h3>
        <div style={{
          fontSize: '1.15rem', color: 'white',
          background: 'rgba(245, 158, 11, 0.08)', padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.2)',
        }}>
          {objectionLabels[likelyObjection] || likelyObjection}
        </div>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
          Be prepared for this objection to surface during or after the demo. Have your response ready.
        </p>
      </div>

      {/* Action Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-primary"
          onClick={onCompleteDemo}
          style={{
            padding: '1.25rem 3rem', fontSize: '1.15rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          }}
        >
          DEMO COMPLETE → FILL POST-DEMO REPORT <ArrowRight size={20} />
        </button>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '1rem' }}>
          Fill the post-demo report after the customer leaves the showroom floor.
        </p>
      </div>
    </div>
  );
}
