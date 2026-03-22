import React from 'react';
import ProgressIndicator from '../components/ProgressIndicator';
import * as Icons from 'lucide-react';

export default function QuestionScreen({ question, currentStep, totalSteps, onAnswer }) {
  if (!question) return null;

  return (
    <div className="main-content slide-up" key={question.id} style={{ width: '100%', maxWidth: '850px', margin: '0 auto', padding: '6vh 0' }}>
      <ProgressIndicator current={currentStep} total={totalSteps} />
      
      <h2 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '1rem', 
        textAlign: 'center', 
        lineHeight: '1.3', 
        fontWeight: 400,
        background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        {question.title}
      </h2>

      <div className="options-grid">
        {question.options.map((option, idx) => {
          const IconComponent = Icons[option.icon] || Icons.HelpCircle;

          return (
            <button 
              key={idx}
              className="option-btn"
              onClick={() => onAnswer(option)}
            >
              <div className="option-icon">
                 <IconComponent size={24} strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 300, lineHeight: 1.4 }}>
                {option.text}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
