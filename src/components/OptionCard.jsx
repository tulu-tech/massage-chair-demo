import React from 'react';
import './OptionCard.css';
import classNames from 'classnames';
import { Check } from 'lucide-react';

export default function OptionCard({ label, selected, onClick }) {
  return (
    <button 
      className={classNames('option-card glass-panel glass-panel-interactive', { 'option-card-selected': selected })}
      onClick={onClick}
    >
      <span className="option-label">{label}</span>
      <div className={classNames('option-radio', { 'option-radio-selected': selected })}>
        {selected && <Check size={16} strokeWidth={3} />}
      </div>
    </button>
  );
}
