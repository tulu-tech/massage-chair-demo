import React, { useState } from 'react';
import { ArrowRight, User, Phone, Mail, MessageSquare } from 'lucide-react';

const followUpMethods = [
  { id: 'text', label: 'Text / SMS', icon: 'MessageSquare' },
  { id: 'email', label: 'Email', icon: 'Mail' },
  { id: 'phone', label: 'Phone Call', icon: 'Phone' },
];

export default function LeadCaptureScreen({ onNext }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    preferredFollowUp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) {
      alert('Please provide your first name and email to continue.');
      return;
    }
    onNext(formData);
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    borderRadius: 'var(--radius-sm)',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid var(--glass-border)',
    color: 'white',
    fontSize: '1.1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: 500,
  };

  return (
    <div className="main-content slide-up" style={{ maxWidth: '600px', margin: '0 auto', padding: '8vh 1rem' }}>

      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          fontWeight: 300,
          background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Let's get started.
        </h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          So we can save your recommendations and send anything helpful after your visit.
        </p>
      </div>

      <form className="glass-panel" style={{ padding: '2.5rem' }} onSubmit={handleSubmit}>

        {/* Name Row */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>First Name *</label>
            <input
              type="text" name="firstName" value={formData.firstName} onChange={handleChange}
              style={inputStyle}
              placeholder="Your first name"
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Last Name</label>
            <input
              type="text" name="lastName" value={formData.lastName} onChange={handleChange}
              style={inputStyle}
              placeholder="Your last name"
            />
          </div>
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>Phone Number</label>
          <input
            type="tel" name="phone" value={formData.phone} onChange={handleChange}
            style={inputStyle}
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={labelStyle}>Email Address *</label>
          <input
            type="email" name="email" value={formData.email} onChange={handleChange}
            style={inputStyle}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Preferred Follow-Up Method */}
        <div style={{ marginBottom: '2.5rem' }}>
          <label style={labelStyle}>Preferred Follow-Up Method</label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {followUpMethods.map(method => (
              <button
                key={method.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, preferredFollowUp: method.id }))}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${formData.preferredFollowUp === method.id ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                  background: formData.preferredFollowUp === method.id ? 'rgba(14, 165, 233, 0.12)' : 'rgba(0,0,0,0.2)',
                  color: formData.preferredFollowUp === method.id ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  fontWeight: formData.preferredFollowUp === method.id ? 600 : 400,
                }}
              >
                {method.icon === 'MessageSquare' && <MessageSquare size={16} />}
                {method.icon === 'Mail' && <Mail size={16} />}
                {method.icon === 'Phone' && <Phone size={16} />}
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{
          width: '100%',
          padding: '1.25rem',
          fontSize: '1.1rem',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}>
          CONTINUE TO MATCHING <ArrowRight size={20} />
        </button>

      </form>
    </div>
  );
}
