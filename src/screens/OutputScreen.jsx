import React from 'react';
import { Copy, RefreshCcw, Activity, ShieldCheck, Target, HeartHandshake, Eye } from 'lucide-react';
import { generateFollowUps } from '../store/followUpLogic'; // Note: followUpLogic might need an update for new keys, but we can bypass it safely if needed.

export default function OutputScreen({ results, leadData, answers, repData, onRestart }) {
  // We can still use generateFollowUps for deeper automation, but the prompt emphasizes the exact output screen components:
  
  const getTemperatureColor = (temp) => {
    if (!temp) return 'var(--text-secondary)';
    if (temp.includes('Hot')) return '#fca5a5';     
    if (temp.includes('Warm')) return '#fcd34d';    
    if (temp.includes('Cold') || temp.includes('Researching')) return '#93c5fd';    
    return 'var(--text-secondary)';
  }

  const handleCopyCRM = () => {
    const data = {
      Customer: leadData,
      Intelligence: results,
      RepEvaluation: repData || 'Not Completed'
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Full Analytical Payload copied to clipboard");
  };

  return (
    <div className="main-content slide-up" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid var(--accent-primary)', padding: '0.5rem 1rem', borderRadius: '100px', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '1rem' }}>
             <ShieldCheck size={16} /> SHOWROOM REPORT
           </div>
           <h2 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>Match Intelligence</h2>
           <div style={{ color: 'var(--text-secondary)' }}>Lead: {leadData?.firstName} {leadData?.lastName} | {leadData?.email}</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={handleCopyCRM} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 1.5rem' }}>
            <Copy size={16}/> Copy to Clipboard
          </button>
          <button className="btn btn-primary" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
            <RefreshCcw size={16}/> Finalize & Close
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        
        {/* Left Column: Core Profile Data */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={18} /> 1. Customer Profile
              </h3>
              <div style={{ fontSize: '1.4rem', fontWeight: 400, color: 'white', background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--accent-primary)' }}>
                {results?.buyerOrientation}
              </div>
           </div>

           <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} /> 2. Primary Friction
              </h3>
              <div style={{ fontSize: '1.4rem', fontWeight: 400, color: '#fca5a5', background: 'rgba(252, 165, 165, 0.1)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #fca5a5' }}>
                {results?.primaryFriction}
              </div>
           </div>

           <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={18} /> 3. Recommended Demo Lane
              </h3>
              <div style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--accent-primary)' }}>
                {results?.demoLane}
              </div>
           </div>
        </div>

        {/* Right Column: Execution Strategy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           
           <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  4. Best Two Starting Chairs
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                   {results?.topChairs?.map((chair, idx) => (
                      <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--accent-primary)', background: 'rgba(14, 165, 233, 0.05)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '1.5rem', fontWeight: 500, color: 'white' }}>
                        {chair}
                      </div>
                   ))}
                </div>
                {results?.backupChairs && results?.backupChairs.length > 0 && (
                  <div style={{ marginTop: '1rem', color: 'var(--text-tertiary)', fontSize: '0.95rem' }}>
                    <strong>Backups:</strong> {results.backupChairs.join(', ')}
                  </div>
                )}
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  5. Rep Framing Prompt
                </h3>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'white', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', fontStyle: 'italic' }}>
                  "{results?.repFraming}"
                </p>
              </div>

           </div>

           <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HeartHandshake size={18} /> 6. Strategic Follow-Up Angle
              </h3>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.15rem', lineHeight: '1.6', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                Target strategy if no sale happens today: <strong style={{ color: 'var(--accent-primary)' }}>{results?.followUpAngle}</strong>
                <br/><br/>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                 Send messaging aligned completely around the `{results?.followUpAngle}` approach, acknowledging `{results?.primaryFriction}` as the key constraint.
                </span>
              </p>
           </div>
           
        </div>
      </div>
    </div>
  );
}
