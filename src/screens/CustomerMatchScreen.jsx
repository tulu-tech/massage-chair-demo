import React from 'react';
import { ArrowRight, CheckCircle2, Award, DollarSign } from 'lucide-react';
import { productLibrary } from '../data/productLibrary';
import { productKnowledge } from '../data/productKnowledge';

export default function CustomerMatchScreen({ results, leadData, onBeginDemo }) {
  const name = leadData?.firstName || 'Guest';

  if (!results) return null;

  const getChairInfo = (chairName) => {
    const pk = productKnowledge[chairName];
    const pl = productLibrary[chairName];
    return {
      description: pl?.description || pk?.corePositioning?.primaryUseCase || 'A premium wellness chair designed for comfort and recovery.',
      url: pl?.url || null,
      salePrice: pk?.pricing?.salePrice || null,
      listPrice: pk?.pricing?.listPrice || null,
      brand: pk?.brand || '',
      colors: pk?.colors || [],
    };
  };

  return (
    <div className="main-content slide-up" style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '5vh 1rem 10vh' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(14, 165, 233, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', border: '1px solid var(--glass-border-focus)' }}>
          <Award size={36} color="var(--accent-primary)" />
        </div>
        <h1 style={{
          fontSize: '2.8rem', fontWeight: 300, marginBottom: '1.5rem', letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {name}, we found your match.
        </h1>
        <div style={{ 
          background: 'rgba(255,255,255,0.03)', 
          border: '1px solid var(--glass-border)', 
          padding: '1.75rem', 
          borderRadius: 'var(--radius-lg)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0, fontWeight: 300 }}>
            {results.matchReason}
          </p>
        </div>
      </header>

      {/* Budget Context */}
      {results.budgetBand && results.budgetBand !== 'Flexible' && (
        <div style={{
          textAlign: 'center', marginBottom: '2rem', color: 'var(--text-tertiary)', fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        }}>
          <DollarSign size={14} />
          Based on your {results.budgetBand} investment range
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        {results.topChairs && results.topChairs.map((chair, idx) => {
          const info = getChairInfo(chair);
          return (
            <div key={chair} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {idx === 0 && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-primary)', color: 'black', padding: '0.25rem 1rem', fontSize: '0.75rem', fontWeight: 600, borderBottomLeftRadius: 'var(--radius-sm)' }}>
                  Top Match
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <CheckCircle2 color="var(--accent-primary)" size={24} />
                <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 400 }}>{chair}</h3>
              </div>

              {/* Price */}
              {info.salePrice && (
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                    ${info.salePrice.toLocaleString()}
                  </span>
                  {info.listPrice && info.listPrice > info.salePrice && (
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>
                      ${info.listPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
              
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', flex: 1, marginBottom: '1.5rem' }}>
                {info.description}
              </p>

              {/* Colors */}
              {info.colors.length > 0 && (
                <div style={{ marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                  Available in: {info.colors.join(', ')}
                </div>
              )}
              
              {info.url && (
                <a href={info.url} target="_blank" rel="noreferrer" style={{ 
                  color: 'white', textDecoration: 'none', fontWeight: 500, 
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.7rem 1.25rem', background: 'rgba(255,255,255,0.05)',
                  borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)',
                  alignSelf: 'flex-start', fontSize: '0.9rem',
                  transition: 'background 0.2s',
                }}>
                  View Details <ArrowRight size={14} />
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Backup Chairs */}
      {results.backupChairs && results.backupChairs.length > 0 && (
        <div style={{
          textAlign: 'center', marginBottom: '2rem', padding: '1.25rem',
          background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--glass-border)',
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            Also Worth Trying
          </div>
          <div style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            {results.backupChairs.map(c => {
              const price = getChairInfo(c).salePrice;
              return price ? `${c} (${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)})` : c;
            }).join('  •  ')}
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '2.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
         <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 400 }}>Ready to feel the difference?</h3>
         <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
           Our specialist has prepared these exact models on the showroom floor for you.
         </p>
         <button className="btn btn-primary" onClick={onBeginDemo} style={{ padding: '1rem 3rem', fontSize: '1.05rem', letterSpacing: '1px' }}>
           BEGIN SHOWROOM DEMO
         </button>
      </div>
      
    </div>
  );
}
