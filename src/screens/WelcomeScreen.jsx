import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export default function WelcomeScreen({ onNext }) {
  return (
    <div className="main-content slide-up" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
    }}>
      
      <div style={{
        background: 'rgba(14, 165, 233, 0.06)',
        padding: '3rem 3.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border-focus)',
        maxWidth: '780px',
        width: '100%',
        boxShadow: '0 0 60px rgba(14, 165, 233, 0.08)',
      }}>

        <div style={{ marginBottom: '1.5rem' }}>
          <Sparkles size={40} color="var(--accent-primary)" strokeWidth={1.5} />
        </div>

        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem', 
          fontWeight: 300,
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2,
        }}>
          Your Personal Chair Match
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-secondary)', 
          marginBottom: '2.5rem', 
          lineHeight: '1.6',
          maxWidth: '560px',
          margin: '0 auto 2.5rem',
        }}>
          We're here to find the right fit for your body, home, and lifestyle — not push a product. A quick guided consultation to narrow the showroom to the chairs most likely to match you.
        </p>

        <button 
          className="btn btn-primary" 
          onClick={onNext}
          style={{ padding: '1.25rem 3rem', fontSize: '1.2rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', justifyContent: 'center' }}
        >
          START CONSULTATION <ArrowRight size={22} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', textAlign: 'left', maxWidth: '460px', margin: '0 auto' }}>
          {[
            'Takes about 90 seconds',
            'Personalized to your needs',
            'Rep-guided experience',
            'Your data stays private',
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
              <CheckCircle2 size={15} color="var(--accent-primary)" />
              {text}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
