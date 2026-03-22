import React from 'react';
import { ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { productLibrary } from '../data/productLibrary';

export default function CustomerMatchScreen({ results, leadData, onBeginDemo }) {
  const name = leadData?.firstName || 'Guest';

  if (!results) return null;

  return (
    <div className="main-content slide-up" style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '5vh 0 10vh' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', border: '1px solid var(--glass-border-focus)' }}>
          <Award size={36} color="var(--accent-primary)" />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1.5rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {name}, we found your match.
        </h1>
        <div style={{ 
          background: 'rgba(255,255,255,0.03)', 
          border: '1px solid var(--glass-border)', 
          padding: '2rem', 
          borderRadius: 'var(--radius-lg)',
          maxWidth: '750px',
          margin: '0 auto'
        }}>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0, fontWeight: 300 }}>
            {results.matchReason}
          </p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        {results.topChairs && results.topChairs.map((chair, idx) => {
          const info = productLibrary[chair];
          return (
            <div key={chair} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {idx === 0 && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-primary)', color: 'black', padding: '0.25rem 1rem', fontSize: '0.8rem', fontWeight: 600, borderBottomLeftRadius: 'var(--radius-sm)' }}>
                  Top Match
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <CheckCircle2 color="var(--accent-primary)" size={28} />
                <h3 style={{ fontSize: '1.75rem', margin: 0, fontWeight: 400 }}>{chair}</h3>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.05rem', flex: 1, marginBottom: '2rem' }}>
                {info?.description || 'A premium wellness and recovery chair designed for ultimate comfort and durability.'}
              </p>
              
              {info?.url && (
                <a href={info.url} target="_blank" rel="noreferrer" style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontWeight: 500, 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--glass-border)',
                  alignSelf: 'flex-start',
                  transition: 'background 0.2s',
                  ':hover': { background: 'rgba(255,255,255,0.1)' }
                }}>
                  View Official Details <ArrowRight size={16} />
                </a>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
         <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 400 }}>Ready to feel the difference?</h3>
         <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
           Our product specialist has prepared these exact models on the showroom floor for you to test. 
         </p>
         <button className="btn btn-primary" onClick={onBeginDemo} style={{ padding: '1rem 3rem', fontSize: '1.1rem', letterSpacing: '1px' }}>
           BEGIN SHOWROOM DEMO
         </button>
      </div>
      
    </div>
  );
}
