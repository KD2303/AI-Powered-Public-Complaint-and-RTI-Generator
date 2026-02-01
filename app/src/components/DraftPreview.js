/**
 * Draft Preview Component
 * Shows generated document with metadata
 */

import React, { useState } from 'react';
import { assembleFinalDocument } from '../services/draftAssembly';
import './DraftPreview.css';

const DraftPreview = ({ draft, mode }) => {
  const [editedSections, setEditedSections] = useState(draft.sections);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSectionEdit = (sectionKey, value) => {
    setEditedSections(prev => ({
      ...prev,
      [sectionKey]: value
    }));
  };
  
  const finalDocument = assembleFinalDocument(
    isEditing ? editedSections : draft.sections,
    draft.documentType
  );
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(finalDocument);
    alert('Document copied to clipboard!');
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([finalDocument], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${draft.documentType}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div className="draft-preview">
      <div className="draft-metadata">
        <div className="metadata-item">
          <span className="metadata-label">Document Type:</span>
          <span className={`document-type-badge ${draft.documentType.toLowerCase()}`}>
            {draft.documentType}
          </span>
        </div>
        
        <div className="metadata-item">
          <span className="metadata-label">Confidence:</span>
          <span className={`confidence-badge ${draft.confidence}`}>
            {draft.confidence}
          </span>
        </div>
        
        {draft.authorities && draft.authorities.length > 0 && (
          <div className="metadata-item">
            <span className="metadata-label">Suggested Authority:</span>
            <span className="authority-name">{draft.authorities[0].name}</span>
            {draft.authorities[0].confidence === 'low' && (
              <span className="confidence-warning"> (Low confidence - please verify)</span>
            )}
          </div>
        )}
      </div>
      
      {mode === 'editable' && (
        <div className="edit-controls">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="toggle-edit-button"
          >
            {isEditing ? '👁️ Preview Mode' : '✏️ Edit Mode'}
          </button>
        </div>
      )}
      
      <div className="document-preview">
        {isEditing ? (
          <div className="editable-sections">
            <h4>Edit Document Sections</h4>
            <p className="edit-notice">Changes will be reflected in the final document</p>
            
            {Object.entries(editedSections).map(([key, value]) => (
              <div key={key} className="editable-section">
                <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                <textarea
                  value={value}
                  onChange={(e) => handleSectionEdit(key, e.target.value)}
                  rows={value.split('\n').length + 2}
                />
              </div>
            ))}
          </div>
        ) : (
          <pre className="document-text">{finalDocument}</pre>
        )}
      </div>
      
      {mode === 'editable' && (
        <div className="preview-actions">
          <button onClick={handleCopyToClipboard} className="action-button">
            📋 Copy to Clipboard
          </button>
          <button onClick={handleDownload} className="action-button">
            💾 Download as Text
          </button>
        </div>
      )}
      
      {draft.validation && !draft.validation.isValid && (
        <div className="validation-errors">
          <h4>⚠️ Validation Warnings:</h4>
          <ul>
            {draft.validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DraftPreview;
