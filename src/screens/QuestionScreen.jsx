import React from 'react';
import ProgressIndicator from '../components/ProgressIndicator';
import * as Icons from 'lucide-react';

export default function QuestionScreen({ question, currentStep, totalSteps, onAnswer }) {
  if (!question) return null;

  return (
    <div className="main-content slide-up" key={question.id} style={{ width: '100%', maxWidth: '850px', margin: '0 auto', padding: '5vh 1rem' }}>
      <ProgressIndicator current={currentStep} total={totalSteps} />

      {/* Step label */}
      <div style={{ 
        textAlign: 'center', marginBottom: '0.75rem',
        color: 'var(--text-tertiary)', fontSize: '0.85rem', letterSpacing: '1px',
      }}>
        QUESTION {currentStep} OF {totalSteps}
        {question.shortTitle && (
          <span style={{ marginLeft: '0.75rem', color: 'var(--accent-primary)', fontWeight: 500 }}>
            — {question.shortTitle}
          </span>
        )}
      </div>
      
      <h2 style={{ 
        fontSize: '2.2rem', 
        marginBottom: '0.5rem', 
        textAlign: 'center', 
        lineHeight: '1.3', 
        fontWeight: 400,
        color: 'var(--text-primary)',
      }}>
        {question.title}
      </h2>

      <p style={{
        textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem',
        marginBottom: '0.5rem',
      }}>
        This helps us narrow down the best fit for your body, home, and budget.
      </p>

      <div className="options-grid">
        {question.options.map((option) => {
          const IconComponent = Icons[option.icon] || Icons.HelpCircle;

          return (
            <button 
              key={option.id}
              className="option-btn"
              onClick={() => onAnswer(option)}
            >
              <div className="option-icon">
                 <IconComponent size={24} strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: '1.15rem', fontWeight: 300, lineHeight: 1.4 }}>
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
