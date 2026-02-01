import React from 'react';

const ConfidenceNotice = ({ confidence, level, explanation }) => {
  if (level === 'high') return null;

  let color = 'var(--color-warning)';
  let bg = '#fff8e1';
  
  if (level === 'low' || level === 'very_low') {
    color = 'var(--color-error)';
    bg = '#fff1f0';
  }

  return (
    <div 
      className="card confidence-notice" 
      style={{ 
        backgroundColor: bg, 
        border: `1px solid ${color}`,
        marginBottom: '1rem'
      }}
    >
      <h4 style={{ color: color, marginBottom: '0.5rem' }}>
        ⚠️ AI Confidence: {level === 'very_low' ? 'Very Low' : level.charAt(0).toUpperCase() + level.slice(1)}
      </h4>
      <p style={{ margin: 0 }}>
        {explanation || "The AI is not fully sure about your request. Please review the generate draft carefully."}
      </p>
    </div>
  );
};

export default ConfidenceNotice;
