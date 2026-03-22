import React, { useState } from 'react';

export default function LeadCaptureScreen({ onNext }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    consent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.consent) {
      alert('Please fill out your name, email, and provide consent.');
      return;
    }
    onNext(formData);
  };

  return (
    <div className="main-content slide-up" style={{ maxWidth: '600px', margin: '0 auto', padding: '10vh 0' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 300 }}>Let's get started.</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          So we can save your recommendations and send anything helpful after your visit.
        </p>
      </div>

      <form className="glass-panel" style={{ padding: '3rem' }} onSubmit={handleSubmit}>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>First Name</label>
            <input 
              type="text" name="firstName" value={formData.firstName} onChange={handleChange}
              style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1.1rem', outline: 'none' }}
              placeholder="Your first name"
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Last Name</label>
            <input 
              type="text" name="lastName" value={formData.lastName} onChange={handleChange}
              style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1.1rem', outline: 'none' }}
              placeholder="Your last name"
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mobile Number</label>
          <input 
            type="tel" name="mobile" value={formData.mobile} onChange={handleChange}
            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1.1rem', outline: 'none' }}
            placeholder="(555) 123-4567"
          />
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange}
            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1.1rem', outline: 'none' }}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Consent Block */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', marginBottom: '2.5rem' }}>
           <label style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }}>
             <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} style={{ marginTop: '0.25rem', width: '20px', height: '20px', cursor: 'pointer' }} />
             <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
               I authorize this store to save my profile recommendations and contact me regarding my consultation.
             </span>
           </label>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', letterSpacing: '1px' }}>
          CONTINUE TO MATCHING
        </button>

      </form>
    </div>
  );
}
