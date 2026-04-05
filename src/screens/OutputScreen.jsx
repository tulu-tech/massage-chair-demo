import React from 'react';
import { Copy, RefreshCcw, Target, Activity, ShieldCheck, HeartHandshake, Eye, Thermometer, Award, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { ACTION_LABELS } from '../store/finalDecisionEngine';

export default function OutputScreen({ results, leadData, finalDecision, onRestart }) {
  if (!finalDecision) return null;

  const tempColors = {
    HOT: { bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)', text: '#fca5a5' },
    WARM: { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', text: '#fcd34d' },
    LUKEWARM: { bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.3)', text: '#cbd5e1' },
    COLD: { bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)', text: '#93c5fd' },
  };

  const tc = tempColors[finalDecision.leadTemperature] || tempColors.WARM;

  const handleCopy = () => {
    const payload = {
      Customer: leadData,
      Decision: finalDecision,
      Discovery: results,
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    alert("Full intelligence payload copied to clipboard");
  };

  const InfoCard = ({ label, value, color = 'white', bg = 'rgba(0,0,0,0.3)' }) => (
    <div style={{
      padding: '1.25rem', background: bg,
      borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)',
    }}>
      <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: '1.1rem', color, fontWeight: 500 }}>{value || 'N/A'}</div>
    </div>
  );

  return (
    <div className="main-content slide-up" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem 4rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: tc.bg, border: `1px solid ${tc.border}`,
            padding: '0.5rem 1rem', borderRadius: '100px', color: tc.text,
            fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '1rem',
          }}>
            <Thermometer size={14} /> FINAL INTELLIGENCE REPORT
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>
            {leadData?.firstName} {leadData?.lastName}
          </h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {leadData?.email} • Score: {finalDecision.leadScore}/100
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.25rem' }}>
            <Copy size={16} /> Copy
          </button>
          <button className="btn btn-primary" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.5rem' }}>
            <RefreshCcw size={16} /> Close & Return
          </button>
        </div>
      </div>

      {/* Temperature Banner */}
      <div style={{
        padding: '1.5rem 2rem', marginBottom: '2rem',
        background: tc.bg, border: `1px solid ${tc.border}`,
        borderRadius: 'var(--radius-sm)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>LEAD TEMPERATURE</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: tc.text }}>
            {finalDecision.leadTemperature} ({finalDecision.leadScore})
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>PURCHASE STATUS</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, color: finalDecision.purchaseStatus === 'Closed Won' ? '#34d399' : 'white' }}>
            {finalDecision.purchaseStatus}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 2fr', gap: '1.5rem' }}>

        {/* ══ LEFT COLUMN: Decision Profile ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* A. Customer Decision Profile */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={16} /> Customer Profile
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <InfoCard label="Buyer Orientation" value={finalDecision.buyerOrientation} color="var(--accent-primary)" />
              <InfoCard label="Primary Friction" value={finalDecision.primaryFriction} color="#fca5a5" />
              <InfoCard label="Real Objection" value={finalDecision.realObjection} color="#f87171" bg="rgba(239, 68, 68, 0.05)" />
              <InfoCard label="Decision Complexity" value={finalDecision.decisionComplexity} />
              <InfoCard label="Certainty Need" value={finalDecision.certaintyNeed} />
            </div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN: Chair Decision + Action ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* B. Chair Decision */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={16} /> Chair Decision
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                padding: '1.5rem', background: 'rgba(14, 165, 233, 0.08)',
                border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)',
                textAlign: 'center', position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-primary)', color: 'black', padding: '0.15rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, borderBottomLeftRadius: '6px' }}>
                  BEST FIT
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>{finalDecision.finalBestFitChair}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', lineHeight: '1.4' }}>{finalDecision.whyFinalChairWon}</div>
              </div>
              <div style={{
                padding: '1.5rem', background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)',
                textAlign: 'center', position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--glass-border)', color: 'var(--text-secondary)', padding: '0.15rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, borderBottomLeftRadius: '6px' }}>
                  BACKUP
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 600, color: 'white', marginBottom: '0.5rem' }}>{finalDecision.backupChair}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', lineHeight: '1.4' }}>{finalDecision.whyBackupRelevant}</div>
              </div>
            </div>
          </div>

          {/* C. Next Action */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowRight size={16} /> Next Best Action
            </h3>

            <div style={{
              padding: '1.25rem', background: 'rgba(52, 211, 153, 0.08)',
              border: '1px solid rgba(52, 211, 153, 0.25)', borderRadius: 'var(--radius-sm)',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 600, color: '#34d399', marginBottom: '0.5rem' }}>
                {ACTION_LABELS[finalDecision.nextBestAction] || finalDecision.nextBestAction}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                {finalDecision.nextStepLocked ? (
                  <><CheckCircle size={14} color="#34d399" /> Next step locked: {finalDecision.nextStepType}</>
                ) : (
                  <><AlertTriangle size={14} color="#fca5a5" /> No next step locked — follow up required</>
                )}
              </div>
            </div>
          </div>

          {/* D. Follow-Up Angle */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HeartHandshake size={16} /> Follow-Up Angle
            </h3>
            <div style={{
              padding: '1.25rem', background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ fontSize: '1.15rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                {finalDecision.followUpAngle}
              </div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                All follow-up messaging should align with the <strong>{finalDecision.followUpAngle}</strong> approach,
                acknowledging <strong>{finalDecision.realObjection}</strong> as the key constraint.
                Lead with {finalDecision.finalBestFitChair} positioning in all communications.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
