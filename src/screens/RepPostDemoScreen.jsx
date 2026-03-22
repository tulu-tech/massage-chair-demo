import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { productLibrary } from '../data/productLibrary';

export default function RepPostDemoScreen({ results, onSubmit }) {
  const [testedChairs, setTestedChairs] = useState([]);
  const [preferredChair, setPreferredChair] = useState('');
  const [didPurchase, setDidPurchase] = useState(null);
  const [purchasedChair, setPurchasedChair] = useState('');
  const [temperature, setTemperature] = useState('');
  const [objection, setObjection] = useState('');

  const recommendedChairs = results?.topChairs || [];
  const allChairs = Object.keys(productLibrary).slice(0, 10); // show a few fallback chairs

  const handleToggleTested = (chair) => {
    setTestedChairs(prev => prev.includes(chair) ? prev.filter(c => c !== chair) : [...prev, chair]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (didPurchase === null) {
      alert("Please indicate if a purchase was made.");
      return;
    }
    if (didPurchase && !purchasedChair) {
      alert("Please select which chair was purchased.");
      return;
    }
    if (!didPurchase && (!preferredChair || !temperature || !objection)) {
       alert("Please complete the preferred chair, temperature, and objection sections to unlock Nurture Automations.");
       return;
    }
    
    onSubmit({ 
      testedChairs, 
      preferredChair: didPurchase ? purchasedChair : preferredChair, 
      didPurchase,
      purchasedChair: didPurchase ? purchasedChair : null,
      temperature: didPurchase ? 'Closed Won' : temperature,
      objection: didPurchase ? 'None' : objection
    });
  };

  return (
    <div className="main-content slide-up" style={{ maxWidth: '800px', margin: '0 auto', padding: '4vh 0' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>Post-Demo Evaluation</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Fill out this form AFTER the customer leaves the showroom to generate CRM Automations.</p>
      </header>

      <form className="glass-panel" style={{ padding: '2.5rem' }} onSubmit={handleSubmit}>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>1. Which chairs did they physically sit in?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
             {recommendedChairs.length > 0 ? recommendedChairs.map(chair => (
                <button
                  key={chair}
                  type="button"
                  onClick={() => handleToggleTested(chair)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${testedChairs.includes(chair) ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                    background: testedChairs.includes(chair) ? 'rgba(212, 175, 55, 0.15)' : 'rgba(0,0,0,0.2)',
                    color: 'white',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {chair}
                </button>
             )) : allChairs.map(chair => (
                <button
                  key={chair}
                  type="button"
                  onClick={() => handleToggleTested(chair)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${testedChairs.includes(chair) ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                    background: testedChairs.includes(chair) ? 'rgba(212, 175, 55, 0.15)' : 'rgba(0,0,0,0.2)',
                    color: 'white',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {chair}
                </button>
             ))}
          </div>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>2. Which chair was their ultimate favorite? (or purchased)</h3>
          <select 
            value={preferredChair} 
            onChange={(e) => setPreferredChair(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1.1rem', outline: 'none' }}
          >
            <option value="" disabled>Select the winning chair...</option>
            {testedChairs.length > 0 
              ? testedChairs.map(c => <option key={c} value={c}>{c}</option>)
              : recommendedChairs.map(c => <option key={c} value={c}>{c}</option>)
            }
            <option value="Other">Other (Not listed)</option>
          </select>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>3. Did the customer purchase a chair today?</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button type="button" onClick={() => setDidPurchase(true)} style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-sm)', border: `1px solid ${didPurchase === true ? '#34d399' : 'var(--glass-border)'}`, background: didPurchase === true ? 'rgba(52, 211, 153, 0.15)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer' }}>Yes, closed the sale</button>
             <button type="button" onClick={() => setDidPurchase(false)} style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-sm)', border: `1px solid ${didPurchase === false ? '#fca5a5' : 'var(--glass-border)'}`, background: didPurchase === false ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer' }}>No, still deciding</button>
          </div>
        </div>

        {didPurchase === true && (
          <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: 'var(--radius-sm)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#34d399' }}>Which chair did they buy?</h3>
            <select value={purchasedChair} onChange={(e) => setPurchasedChair(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1.1rem', outline: 'none' }}>
              <option value="" disabled>Select the purchased chair...</option>
              {testedChairs.length > 0 ? testedChairs.map(c => <option key={c} value={c}>{c}</option>) : allChairs.map(c => <option key={c} value={c}>{c}</option>)}
              <option value="Other">Other (Not listed)</option>
            </select>
          </div>
        )}

        {didPurchase === false && (
          <>
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>4. How 'Hot' is this deal?</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['Hot (Ready to Buy)', 'Warm (Needs Nurturing)', 'Cold (Just Browsing)'].map(temp => (
                   <button key={temp} type="button" onClick={() => setTemperature(temp)} style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-sm)', border: `1px solid ${temperature === temp ? 'var(--accent-primary)' : 'var(--glass-border)'}`, background: temperature === temp ? 'rgba(212, 175, 55, 0.15)' : 'rgba(0,0,0,0.2)', color: 'white', cursor: 'pointer' }}>
                     {temp.split(' ')[0]}
                   </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>5. Primary Blocker / Next Step?</h3>
              <select value={objection} onChange={(e) => setObjection(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1.1rem', outline: 'none' }}>
                <option value="" disabled>Select the main objection...</option>
                <option value="Price/Budget">Price / Processing Financing</option>
                <option value="Partner">Needs Partner/Spouse Approval</option>
                <option value="Measurements">Needs to check room measurements</option>
                <option value="Researching">Still researching other brands</option>
                <option value="None">None - Ready for Invoice</option>
              </select>
            </div>
          </>
        )}

        <div style={{ padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 'var(--radius-sm)', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <AlertCircle size={24} color="#60a5fa" style={{ flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#93c5fd', lineHeight: '1.5' }}>
              Submitting this form will automatically generate the hyper-personalized 24/72 hour Follow-up Emails tailored around their favorite chair and chosen blocker. Data will immediately sync to Google Sheets.
            </p>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1.2rem', fontSize: '1.1rem' }}>
          <Save size={20} /> Generate CRM Strategy & Sync
        </button>

      </form>
    </div>
  );
}
