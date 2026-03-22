import React, { useState, useEffect } from 'react';
import { isSupabaseConfigured, signIn, getStores } from '../services/supabase';
import { loginUserLocal } from '../services/db';
import { MapPin, Lock, ShieldCheck, User, Mail, Loader } from 'lucide-react';

const LOCAL_STORES = ["Santa Clara", "Daly City", "Roseville", "Walnut Creek"];

export default function LoginScreen({ onLogin }) {
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const useSupabase = isSupabaseConfigured();

  useEffect(() => {
    if (useSupabase) {
      getStores().then(data => {
        setStores(data);
        if (data.length > 0) setStore(data[0].id);
      });
    } else {
      setStores(LOCAL_STORES.map((name, i) => ({ id: String(i), name })));
      setStore('0');
    }
  }, [useSupabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (useSupabase) {
        // Supabase Auth
        const result = await signIn(email, password);
        if (result.error) {
          setError(result.error);
          setLoading(false);
          return;
        }
        onLogin(result.user);
      } else {
        // Local fallback auth
        const storeName = stores.find(s => s.id === store)?.name || 'Demo Store';
        const account = loginUserLocal(email, password);
        if (account) {
          onLogin({ ...account, storeLocation: storeName });
        } else {
          setError('Invalid credentials. (Hint: admin/admin or Name/demo)');
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }

    setLoading(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      width: '100vw', 
      position: 'absolute', 
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'var(--bg-darker)'
    }}>
      
      {/* Left: Cinematic Background Area */}
      <div className="login-bg" style={{ flex: 1.3, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10%' }}>
        <div style={{ 
           position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
           backgroundImage: 'url(/showroom_bg.png)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           filter: 'contrast(1.1) brightness(0.9)',
           zIndex: 1
        }} />
        <div style={{
           position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
           background: 'linear-gradient(90deg, transparent 40%, var(--bg-darker) 100%)',
           zIndex: 2
        }} />
        <div style={{
           position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
           background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)',
           zIndex: 2
        }} />
        
        <div className="slide-up" style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(14, 165, 233, 0.2)', padding: '0.5rem 1rem', borderRadius: '100px', border: '1px solid var(--accent-primary)', marginBottom: '1.5rem', color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px' }}>
             <ShieldCheck size={16} /> ENTERPRISE EDITION
           </div>
           <h1 style={{ fontSize: '4.5rem', fontWeight: 300, marginBottom: '1rem', color: 'white', textShadow: '0 10px 30px rgba(0,0,0,1)', lineHeight: 1.1 }}>
             Showroom<br/><strong style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>Terminal OS.</strong>
           </h1>
           <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', textShadow: '0 4px 15px rgba(0,0,0,1)', maxWidth: '450px' }}>
             The intelligent consultation engine built for the world's most premium wellness products.
           </p>
        </div>
      </div>

      {/* Right: Glass Auth Form */}
      <div style={{ flex: 1, background: 'var(--bg-darker)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%', position: 'relative', zIndex: 10 }}>
        
        <div className="slide-up" style={{ animationDelay: '0.2s', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 400 }}>Staff Login</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Secure portal for Sales Reps and Managers.</p>
            {!useSupabase && (
              <div style={{ marginTop: '0.75rem', padding: '0.5rem 1rem', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '6px', fontSize: '0.8rem', color: '#fbbf24' }}>
                ⚠️ Running in demo mode (localStorage). Connect Supabase for production.
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Store Selection */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <MapPin size={16} color="var(--accent-primary)" /> Active Store Location
              </label>
              <select 
                value={store} 
                onChange={e => setStore(e.target.value)}
                style={{ 
                  width: '100%', padding: '1.2rem', borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', 
                  color: 'white', fontSize: '1.05rem', outline: 'none', cursor: 'pointer',
                  appearance: 'none'
                }} 
              >
                {stores.map(s => <option key={s.id} value={s.id} style={{ background: '#0f172a' }}>{s.name}</option>)}
              </select>
            </div>

            {/* Email / Username */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {useSupabase ? <Mail size={16} color="var(--accent-primary)" /> : <User size={16} color="var(--accent-primary)" />}
                {useSupabase ? 'Email Address' : 'Username'}
              </label>
              <input 
                type={useSupabase ? 'email' : 'text'}
                value={email} 
                onChange={e => setEmail(e.target.value)}
                style={{ 
                  width: '100%', padding: '1.2rem', borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)', 
                  color: 'white', fontSize: '1.05rem', outline: 'none', transition: 'all 0.3s' 
                }} 
                placeholder={useSupabase ? 'you@company.com' : 'Enter admin or your name'}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Lock size={16} color="var(--accent-primary)" /> Password
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                style={{ 
                  width: '100%', padding: '1.2rem', borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)', 
                  color: 'white', fontSize: '1.05rem', outline: 'none', transition: 'all 0.3s',
                  letterSpacing: '0.2em'
                }} 
                placeholder="••••••"
                required
              />
            </div>

            {error && <div style={{ color: '#fca5a5', fontSize: '0.9rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>{error}</div>}

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ 
                width: '100%', padding: '1.2rem', marginTop: '1rem', fontSize: '1.1rem', 
                letterSpacing: '2px', display: 'flex', justifyContent: 'center', 
                alignItems: 'center', gap: '0.75rem',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'wait' : 'pointer'
              }}
            >
              {loading ? <><Loader size={20} className="spin" /> AUTHENTICATING...</> : <><ShieldCheck size={20} /> LOGIN</>}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
