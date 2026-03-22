import React from 'react';
import './ProgressIndicator.css';

export default function ProgressIndicator({ current, total }) {
  const progress = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="progress-container fade-in">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
