import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';

const medicalItems = [
  {
    id: 'notPregnant',
    label: 'I confirm that I am not currently pregnant.',
    icon: '🚫'
  },
  {
    id: 'ageRequirement',
    label: 'I confirm that I am older than 12 years of age.',
    icon: '✅'
  },
  {
    id: 'noMedicalIssue',
    label: 'I confirm that I do not have any medical condition that would prevent me from safely using a massage chair.',
    icon: '🩺'
  }
];

export default function ConsentScreen({ onAccept }) {
  const [checks, setChecks] = useState({
    notPregnant: false,
    ageRequirement: false,
    noMedicalIssue: false,
    contactConsent: false,
  });

  const allChecked = Object.values(checks).every(Boolean);

  const toggle = (id) => {
    setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAccept = () => {
    onAccept({
      medicalConsent: {
        notPregnant: checks.notPregnant,
        ageRequirement: checks.ageRequirement,
        noMedicalIssue: checks.noMedicalIssue,
      },
      contactConsent: checks.contactConsent,
      consentTimestamp: new Date().toISOString(),
    });
  };

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
        background: 'rgba(14, 165, 233, 0.05)',
        padding: '2.5rem 3rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border-focus)',
        maxWidth: '700px',
        width: '100%',
        boxShadow: '0 0 40px rgba(14, 165, 233, 0.08)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem',
        }}>
          <ShieldCheck size={32} color="var(--accent-primary)" />
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 300,
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Safety & Consent
          </h2>
        </div>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          lineHeight: '1.6',
          maxWidth: '550px',
          margin: '0 auto 2rem',
        }}>
          Before we begin your personalized chair match, please confirm the following for your safety and comfort.
        </p>

        {/* Medical Consent Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {medicalItems.map(item => (
            <label
              key={item.id}
              onClick={() => toggle(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.1rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: checks[item.id]
                  ? 'rgba(14, 165, 233, 0.12)'
                  : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${checks[item.id] ? 'rgba(14, 165, 233, 0.5)' : 'var(--glass-border)'}`,
                cursor: 'pointer',
                transition: 'var(--transition)',
                textAlign: 'left',
              }}
            >
              <div style={{
                width: '26px',
                height: '26px',
                minWidth: '26px',
                borderRadius: '6px',
                border: `2px solid ${checks[item.id] ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'}`,
                background: checks[item.id]
                  ? 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)'
                  : 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)',
                fontSize: '14px',
                color: '#fff',
                fontWeight: 700,
              }}>
                {checks[item.id] && '✓'}
              </div>
              <span style={{
                color: checks[item.id] ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                transition: 'var(--transition)',
              }}>
                {item.label}
              </span>
            </label>
          ))}
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1.5rem 0' }} />

        {/* Contact Consent */}
        <label
          onClick={() => toggle('contactConsent')}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            background: checks.contactConsent
              ? 'rgba(52, 211, 153, 0.1)'
              : 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${checks.contactConsent ? 'rgba(52, 211, 153, 0.4)' : 'var(--glass-border)'}`,
            cursor: 'pointer',
            transition: 'var(--transition)',
            textAlign: 'left',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{
            width: '26px',
            height: '26px',
            minWidth: '26px',
            borderRadius: '6px',
            border: `2px solid ${checks.contactConsent ? '#34d399' : 'rgba(255,255,255,0.2)'}`,
            background: checks.contactConsent
              ? 'linear-gradient(135deg, #34d399 0%, #059669 100%)'
              : 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition)',
            fontSize: '14px',
            color: '#fff',
            fontWeight: 700,
            marginTop: '2px',
          }}>
            {checks.contactConsent && '✓'}
          </div>
          <div>
            <span style={{
              color: checks.contactConsent ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: '1.5',
              display: 'block',
            }}>
              I authorize this store to save my profile, recommendations, and contact me regarding my consultation.
            </span>
            <span style={{
              color: 'var(--text-tertiary)',
              fontSize: '0.8rem',
              marginTop: '0.5rem',
              display: 'block',
              lineHeight: '1.4',
            }}>
              The information captured will be processed by the sales person to provide you with personalized recommendations and follow-up assistance.
            </span>
          </div>
        </label>

        {/* Warning */}
        {!allChecked && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            color: 'var(--text-tertiary)',
            fontSize: '0.9rem',
          }}>
            <AlertTriangle size={16} />
            <span>Please confirm all items above to continue</span>
          </div>
        )}

        {/* Button */}
        <button
          className="btn btn-primary"
          disabled={!allChecked}
          onClick={handleAccept}
          style={{
            width: '100%',
            padding: '1.25rem 3rem',
            fontSize: '1.15rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            opacity: allChecked ? 1 : 0.35,
            cursor: allChecked ? 'pointer' : 'not-allowed',
            transition: 'var(--transition)',
          }}
        >
          I ACKNOWLEDGE & CONTINUE <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
