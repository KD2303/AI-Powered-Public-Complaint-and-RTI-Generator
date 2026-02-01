import React from 'react';

const DraftPreview = ({ draftText, onEdit }) => {
  return (
    <div className="card draft-preview">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Document Preview</h3>
        <span className="text-sm text-muted">You can edit directly below</span>
      </div>
      
      <textarea
        value={draftText}
        onChange={(e) => onEdit(e.target.value)}
        className="form-textarea"
        style={{ 
          minHeight: '500px', 
          fontFamily: 'monospace', 
          fontSize: '14px',
          lineHeight: '1.6',
          padding: '2rem',
          backgroundColor: '#fdfdfd'
        }}
      />
    </div>
  );
};

export default DraftPreview;
