import React, { useState } from 'react';
import { Save, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

// ── All 15 chairs for multi-select ──
const ALL_CHAIRS = [
  "Brio Sport", "D.Core 2", "D.Core Cirrus JP", "D.Core Stratus JP",
  "OHCO M8 NEO LE", "DualTech 4D", "Brio Plus", "OHCO M8 NEO",
  "KOYO 303TS", "OHCO R6", "Panasonic MAF1", "Panasonic MAN1",
  "DualTech Pro AI 4D", "Panasonic MAK1", "Solara"
];

// ── Section wrapper ──
function Section({ title, number, children, color = 'var(--accent-primary)' }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{
        fontSize: '1.1rem', marginBottom: '1.25rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        color: color,
      }}>
        <span style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: `${color}22`, border: `1px solid ${color}44`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.8rem', fontWeight: 700,
        }}>
          {number}
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ── Chip selector ──
function ChipSelect({ options, value, onChange, multi = false, columns = 3 }) {
  const handleClick = (opt) => {
    if (multi) {
      const arr = value || [];
      onChange(arr.includes(opt) ? arr.filter(v => v !== opt) : [...arr, opt]);
    } else {
      onChange(opt);
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '0.5rem',
    }}>
      {options.map(opt => {
        const isSelected = multi ? (value || []).includes(opt) : value === opt;
        return (
          <button key={opt} type="button" onClick={() => handleClick(opt)} style={{
            padding: '0.75rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
            background: isSelected ? 'rgba(14, 165, 233, 0.12)' : 'rgba(0,0,0,0.2)',
            color: isSelected ? 'white' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: isSelected ? 600 : 400,
            textAlign: 'center',
            transition: 'all 0.15s',
            lineHeight: '1.3',
          }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ── Toggle (Yes / No) ──
function Toggle({ value, onChange, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.15)',
      borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)',
      marginBottom: '0.5rem',
    }}>
      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['Yes', 'No'].map(opt => (
          <button key={opt} type="button" onClick={() => onChange(opt === 'Yes')} style={{
            padding: '0.4rem 1rem', borderRadius: '100px',
            border: `1px solid ${value === (opt === 'Yes') ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
            background: value === (opt === 'Yes') ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
            color: value === (opt === 'Yes') ? 'white' : 'var(--text-tertiary)',
            cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
          }}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Dropdown select ──
function DropdownSelect({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%', padding: '0.85rem 1rem',
        borderRadius: 'var(--radius-sm)',
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid var(--glass-border)',
        color: value ? 'white' : 'var(--text-tertiary)',
        fontSize: '0.95rem', outline: 'none',
      }}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
}


// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════

export default function RepPostDemoScreen({ results, onSubmit }) {
  // ── Section A: Chair Exposure ──
  const [triedChairs, setTriedChairs] = useState([]);
  const [chairOrder, setChairOrder] = useState({ first: '', second: '', third: '', fourth: '' });
  const [mostTimeSpent, setMostTimeSpent] = useState('');
  const [mostQuestions, setMostQuestions] = useState('');
  const [strongestReaction, setStrongestReaction] = useState('');
  const [repBestFit, setRepBestFit] = useState('');

  // ── Section B: Demo Behavior ──
  const [engagementLevel, setEngagementLevel] = useState('');
  const [reactionType, setReactionType] = useState('');
  const [decisiveness, setDecisiveness] = useState('');
  const [decisionStyle, setDecisionStyle] = useState('');
  const [matteredMost, setMatteredMost] = useState('');

  // ── Section C: Objection Capture ──
  const [statedObjection, setStatedObjection] = useState('');
  const [customerQuote, setCustomerQuote] = useState('');
  const [objectionRealness, setObjectionRealness] = useState('');
  const [likelyHiddenObjection, setLikelyHiddenObjection] = useState('');

  // ── Section D: Buying Signals ──
  const [signals, setSignals] = useState({
    askedPayment: null,
    askedDelivery: null,
    askedWarranty: null,
    gaveTimeline: null,
    revisitedChair: null,
    mentionedPartner: null,
    mentionedMeasurements: null,
    requestedSummary: null,
  });
  const [timelineMention, setTimelineMention] = useState('');

  // ── Section E: Next-Step ──
  const [leadJudgment, setLeadJudgment] = useState('');
  const [bestNextAction, setBestNextAction] = useState('');
  const [nextStepLocked, setNextStepLocked] = useState(null);
  const [nextStepType, setNextStepType] = useState('');
  const [purchaseStatus, setPurchaseStatus] = useState('');

  const updateSignal = (key, val) => setSignals(prev => ({ ...prev, [key]: val }));

  // ── Validation ──
  const validate = () => {
    const errors = [];
    if (triedChairs.length === 0) errors.push("Select at least one chair the customer tried");
    if (!repBestFit) errors.push("Select your best-fit recommendation");
    if (!statedObjection) errors.push("Select the real objection");
    if (!leadJudgment) errors.push("Select your lead judgment");
    if (!purchaseStatus) errors.push("Select the purchase status");
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) {
      alert("Required fields missing:\n\n• " + errors.join("\n• "));
      return;
    }

    onSubmit({
      // A
      triedChairs,
      chairOrder,
      mostTimeSpent,
      mostQuestions,
      strongestReaction,
      repBestFit,
      // B
      engagementLevel,
      reactionType,
      decisiveness,
      decisionStyle,
      matteredMost,
      // C
      statedObjection,
      customerQuote,
      objectionRealness,
      likelyHiddenObjection,
      // D
      buyingSignals: {
        ...signals,
        gaveTimeline: signals.gaveTimeline,
        timelineMention,
      },
      // E
      leadJudgment,
      bestNextAction,
      nextStepLocked,
      nextStepType,
      purchaseStatus,
    });
  };


  return (
    <div className="main-content slide-up" style={{ maxWidth: '800px', margin: '0 auto', padding: '3vh 1rem 6vh' }}>

      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
          Post-Demo Intelligence
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
          Fill this out after the customer leaves the showroom floor. Mostly dropdowns — takes 60–90 seconds.
        </p>
      </header>

      <form onSubmit={handleSubmit}>

        {/* ═══ SECTION A: Chair Exposure ═══ */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <Section title="Chair Exposure" number="A" color="#38bdf8">

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                1. Which chairs did the customer try? <span style={{ color: '#fca5a5' }}>*</span>
              </label>
              <ChipSelect options={ALL_CHAIRS} value={triedChairs} onChange={setTriedChairs} multi columns={3} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                2. In what order did they try them?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {['first', 'second', 'third', 'fourth'].map((pos, idx) => (
                  <div key={pos}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                      {pos} chair {idx > 1 ? '(optional)' : ''}
                    </div>
                    <DropdownSelect
                      value={chairOrder[pos]}
                      onChange={(v) => setChairOrder(prev => ({ ...prev, [pos]: v }))}
                      options={triedChairs.length > 0 ? triedChairs : ALL_CHAIRS}
                      placeholder={`Select ${pos}...`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>3. Most time spent in?</label>
                <DropdownSelect value={mostTimeSpent} onChange={setMostTimeSpent} options={triedChairs.length > 0 ? triedChairs : ALL_CHAIRS} placeholder="Select chair..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>4. Most questions about?</label>
                <DropdownSelect value={mostQuestions} onChange={setMostQuestions} options={triedChairs.length > 0 ? triedChairs : ALL_CHAIRS} placeholder="Select chair..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>5. Strongest positive reaction?</label>
                <DropdownSelect value={strongestReaction} onChange={setStrongestReaction} options={triedChairs.length > 0 ? triedChairs : ALL_CHAIRS} placeholder="Select chair..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>6. Your best-fit recommendation? <span style={{ color: '#fca5a5' }}>*</span></label>
                <DropdownSelect value={repBestFit} onChange={setRepBestFit} options={ALL_CHAIRS} placeholder="Select chair..." />
              </div>
            </div>
          </Section>
        </div>


        {/* ═══ SECTION B: Demo Behavior ═══ */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <Section title="Demo Behavior Observation" number="B" color="#a78bfa">

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>7. Engagement level</label>
              <ChipSelect options={["Very engaged", "Engaged", "Neutral", "Distracted", "Low engagement"]} value={engagementLevel} onChange={setEngagementLevel} columns={5} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>8. Reaction to the right-feeling chair</label>
              <ChipSelect options={["Visibly excited / impressed", "Relaxed and positive", "Thoughtful but interested", "Hard to read", "Unimpressed"]} value={reactionType} onChange={setReactionType} columns={3} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>9. Decisiveness</label>
              <ChipSelect options={["Ready to decide", "Close but needs one thing resolved", "Interested but not ready", "Just exploring", "Very non-committal"]} value={decisiveness} onChange={setDecisiveness} columns={3} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>10. Decision processing style</label>
              <ChipSelect options={["Mostly emotional / instinctive", "Balanced", "Mostly analytical", "Over-comparing everything"]} value={decisionStyle} onChange={setDecisionStyle} columns={4} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>11. What mattered most during demo?</label>
              <ChipSelect options={["Comfort / body feel", "Premium design / experience", "Financing / affordability", "Service / warranty trust", "Space / practical fit"]} value={matteredMost} onChange={setMatteredMost} columns={3} />
            </div>
          </Section>
        </div>


        {/* ═══ SECTION C: True Objection Capture ═══ */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <Section title="True Objection Capture" number="C" color="#f87171">

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>12. Real objection at the end <span style={{ color: '#fca5a5' }}>*</span></label>
              <ChipSelect
                options={["Price / payment", "Partner / spouse", "Space / measurements", "Wants to research more", "Not fully convinced on fit", "Delivery / service concern", "No clear objection stated"]}
                value={statedObjection} onChange={setStatedObjection} columns={3}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>13. What did they actually say?</label>
              <input
                type="text" value={customerQuote} onChange={(e) => setCustomerQuote(e.target.value)}
                placeholder='e.g. "I need to talk to my wife" or "I should measure first"'
                style={{
                  width: '100%', padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--glass-border)', color: 'white',
                  fontSize: '0.95rem', outline: 'none', fontStyle: 'italic',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>14. Is the stated objection real or surface?</label>
              <ChipSelect options={["Real objection", "Probably surface objection", "Not sure"]} value={objectionRealness} onChange={setObjectionRealness} columns={3} />
            </div>

            {(objectionRealness === 'Probably surface objection' || objectionRealness === 'Not sure') && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>15. If surface, what's your best read?</label>
                <ChipSelect options={["Price discomfort", "Decision anxiety", "Needs partner permission", "Comparison overload", "Trust / certainty issue", "Low urgency"]} value={likelyHiddenObjection} onChange={setLikelyHiddenObjection} columns={3} />
              </div>
            )}
          </Section>
        </div>


        {/* ═══ SECTION D: Buying Signals ═══ */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <Section title="Buying Signals" number="D" color="#34d399">
            <Toggle label="16. Asked about payment options?" value={signals.askedPayment} onChange={(v) => updateSignal('askedPayment', v)} />
            <Toggle label="17. Asked about delivery / setup?" value={signals.askedDelivery} onChange={(v) => updateSignal('askedDelivery', v)} />
            <Toggle label="18. Asked about warranty / service?" value={signals.askedWarranty} onChange={(v) => updateSignal('askedWarranty', v)} />
            <Toggle label="19. Mentioned when they want it?" value={signals.gaveTimeline} onChange={(v) => updateSignal('gaveTimeline', v)} />
            {signals.gaveTimeline && (
              <div style={{ marginBottom: '0.5rem', paddingLeft: '1rem' }}>
                <ChipSelect options={["Today / ASAP", "Within 1–2 weeks", "Within a month", "No timeline given"]} value={timelineMention} onChange={setTimelineMention} columns={4} />
              </div>
            )}
            <Toggle label="20. Asked to revisit a chair a second time?" value={signals.revisitedChair} onChange={(v) => updateSignal('revisitedChair', v)} />
            <Toggle label="21. Mentioned spouse / partner approval?" value={signals.mentionedPartner} onChange={(v) => updateSignal('mentionedPartner', v)} />
            <Toggle label="22. Mentioned measurements / room fit?" value={signals.mentionedMeasurements} onChange={(v) => updateSignal('mentionedMeasurements', v)} />
            <Toggle label="23. Asked for links / summary to review later?" value={signals.requestedSummary} onChange={(v) => updateSignal('requestedSummary', v)} />
          </Section>
        </div>


        {/* ═══ SECTION E: Next-Step Enforcement ═══ */}
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <Section title="Next-Step Enforcement" number="E" color="#fbbf24">

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>24. Your lead judgment right now <span style={{ color: '#fca5a5' }}>*</span></label>
              <ChipSelect options={["Hot", "Warm", "Lukewarm", "Cold"]} value={leadJudgment} onChange={setLeadJudgment} columns={4} />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>25. Best next action</label>
              <ChipSelect
                options={["Close today", "Send spouse summary", "Send dimensions / fit check", "Send financing comparison", "Send 2-chair comparison summary", "Put into nurture sequence", "Book return demo"]}
                value={bestNextAction} onChange={setBestNextAction} columns={3}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>26. Was a next step actually locked before they left?</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[true, false].map(val => (
                  <button key={String(val)} type="button" onClick={() => setNextStepLocked(val)} style={{
                    flex: 1, padding: '0.85rem', borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${nextStepLocked === val ? (val ? '#34d399' : '#fca5a5') : 'var(--glass-border)'}`,
                    background: nextStepLocked === val ? (val ? 'rgba(52, 211, 153, 0.12)' : 'rgba(239, 68, 68, 0.12)') : 'rgba(0,0,0,0.2)',
                    color: 'white', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
                  }}>
                    {val ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>

            {nextStepLocked && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>27. What was locked?</label>
                <ChipSelect
                  options={["Return visit booked", "Follow-up call time agreed", "Measurement follow-up agreed", "Financing follow-up agreed", "Spouse summary requested", "Purchased today"]}
                  value={nextStepType} onChange={setNextStepType} columns={3}
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>28. Purchase status <span style={{ color: '#fca5a5' }}>*</span></label>
              <ChipSelect options={["Closed Won", "Open Hot", "Open Warm", "Open Lukewarm", "Closed Lost"]} value={purchaseStatus} onChange={setPurchaseStatus} columns={5} />
            </div>
          </Section>
        </div>


        {/* ── Info Banner ── */}
        <div style={{
          padding: '1.25rem', background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start',
        }}>
          <AlertCircle size={22} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#93c5fd', lineHeight: '1.5' }}>
            Submitting will generate the final chair recommendation, lead score, follow-up sequence, and sync everything to the CRM board.
          </p>
        </div>

        {/* ── Submit ── */}
        <button type="submit" className="btn btn-primary" style={{
          width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '0.5rem', padding: '1.2rem', fontSize: '1.1rem',
        }}>
          <Save size={20} /> Generate Final Intelligence & Sync
        </button>

      </form>
    </div>
  );
}
