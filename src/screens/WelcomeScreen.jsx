import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WelcomeScreen({ onNext }) {
  return (
    <div className="main-content slide-up" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      textAlign: 'center'
    }}>
      
      <div style={{
        background: 'rgba(14, 165, 233, 0.1)',
        padding: '2.5rem 4rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border-focus)',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 0 40px rgba(14, 165, 233, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '1rem', 
          fontWeight: 300,
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Find the Best Starting Point
        </h1>
        
        <p style={{ 
          fontSize: '1.4rem', 
          color: 'var(--text-secondary)', 
          marginBottom: '3rem', 
          lineHeight: '1.5',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          A quick guided match to narrow the showroom to the two chairs most likely to fit your comfort, home, and buying style.
        </p>

        <button 
          className="btn btn-primary" 
          onClick={onNext}
          style={{ padding: '1.25rem 3rem', fontSize: '1.25rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', justifyContent: 'center' }}
        >
          START GUIDED MATCH <ArrowRight size={24} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.95rem' }}>
            <CheckCircle2 size={16} color="var(--accent-primary)" /> Takes about 60 seconds
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.95rem' }}>
            <CheckCircle2 size={16} color="var(--accent-primary)" /> Personalized
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.95rem' }}>
            <CheckCircle2 size={16} color="var(--accent-primary)" /> Rep-guided
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.95rem' }}>
            <CheckCircle2 size={16} color="var(--accent-primary)" /> Designed to simplify the decision
          </div>
        </div>
      </div>
      
    </div>
  );
}
