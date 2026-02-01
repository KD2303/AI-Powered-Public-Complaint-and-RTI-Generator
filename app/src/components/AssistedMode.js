/**
 * Assisted Mode Component
 * Free-text input with live draft projection (split-screen)
 */

import React, { useState } from 'react';
import { useDebouncedDraft } from '../hooks/useDebouncedDraft';
import ApplicantForm from './ApplicantForm';
import DraftPreview from './DraftPreview';
import SubmissionGuidancePanel from './SubmissionGuidancePanel';
import './AssistedMode.css';

const AssistedMode = ({ onBack }) => {
  const [step, setStep] = useState(1); // 1: Input, 2: Preview, 3: Guidance
  const [autoDraftEnabled, setAutoDraftEnabled] = useState(true);
  
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantAddress: '',
    applicantState: '',
    applicantPhone: '',
    applicantEmail: '',
    issueDescription: '',
    language: 'english',
    tone: 'neutral',
    previousRTI: false,
    previousRTINumber: ''
  });
  
  const { draft, isGenerating, lastUpdated, error } = useDebouncedDraft(
    formData,
    autoDraftEnabled && step === 1
  );
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleFinalizeDraft = () => {
    setStep(2);
  };
  
  const handleProceedToGuidance = () => {
    setStep(3);
  };
  
  return (
    <div className="assisted-mode">
      <div className="mode-header">
        <button onClick={onBack} className="back-button">← Back to Mode Selection</button>
        <h2>Assisted Mode</h2>
        <p>Write freely and see your draft update in real-time</p>
      </div>
      
      {step === 1 && (
        <div className="split-screen">
          <div className="input-panel">
            <ApplicantForm 
              formData={formData}
              onChange={handleInputChange}
              mode="assisted"
            />
            
            <div className="issue-input-section">
              <label htmlFor="issueDescription">
                <strong>Describe Your Issue</strong>
                <span className="field-hint">Write freely - tell us what you need</span>
              </label>
              <textarea
                id="issueDescription"
                value={formData.issueDescription}
                onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                placeholder="Example: I need information about road repair work done in my locality in 2024. How much budget was allocated and which contractor was hired?

OR

I am facing continuous water supply issues in my area. Despite multiple complaints, no action has been taken. I need this resolved urgently."
                rows={12}
                className="form-control"
              />
              
              <div className="options-row">
                <div className="option-group">
                  <label htmlFor="language">Language</label>
                  <select
                    id="language"
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="form-control"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
                
                <div className="option-group">
                  <label htmlFor="tone">Tone</label>
                  <select
                    id="tone"
                    value={formData.tone}
                    onChange={(e) => handleInputChange('tone', e.target.value)}
                    className="form-control"
                  >
                    <option value="neutral">Neutral</option>
                    <option value="formal">Formal</option>
                    <option value="strict">Strict but Polite</option>
                  </select>
                </div>
              </div>
              
              <div className="previous-rti-section">
                <label style={{display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer'}}>
                  <input
                    type="checkbox"
                    checked={formData.previousRTI}
                    onChange={(e) => handleInputChange('previousRTI', e.target.checked)}
                    style={{width: '1.2rem', height: '1.2rem'}}
                  />
                  This is a follow-up to a previous RTI application
                </label>
                
                {formData.previousRTI && (
                  <input
                    type="text"
                    placeholder="Enter previous RTI reference number"
                    value={formData.previousRTINumber}
                    onChange={(e) => handleInputChange('previousRTINumber', e.target.value)}
                    className="form-control"
                  />
                )}
              </div>
            </div>
            
            <div className="auto-draft-controls">
              <label style={{display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer'}}>
                <input
                  type="checkbox"
                  checked={autoDraftEnabled}
                  onChange={(e) => setAutoDraftEnabled(e.target.checked)}
                  style={{width: '1.2rem', height: '1.2rem'}}
                />
                Enable live draft preview (updates after you pause typing)
              </label>
            </div>
            
            <button
              onClick={handleFinalizeDraft}
              className="btn-primary"
              disabled={!draft || isGenerating}
              style={{marginTop: '1rem', width: '100%'}}
            >
              Finalize Draft →
            </button>
          </div>
          
          <div className="preview-panel">
            <div className="preview-header">
              <h3>Live Draft Preview</h3>
              {autoDraftEnabled && (
                <div className={`preview-status ${isGenerating ? 'generating' : ''}`}>
                  {isGenerating ? (
                    <span>⟳ Generating...</span>
                  ) : (
                    lastUpdated && (
                      <span className="status-updated">
                        ✓ Updated {new Date(lastUpdated).toLocaleTimeString()}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
            
            {!draft && !isGenerating && (
               <div className="preview-notice" style={{color: '#718096', fontStyle: 'italic', padding: '1rem', textAlign: 'center'}}>
                  Auto-generated preview — review before finalizing
               </div>
            )}
            
            {error && <div className="preview-error">{error}</div>}
            
            {!autoDraftEnabled && (
              <div className="preview-disabled">
                <p>Live preview is disabled. Enable it to see your draft update automatically.</p>
              </div>
            )}
            
            {autoDraftEnabled && !draft && !isGenerating && (
              <div className="preview-empty">
                <p>Start typing your issue description to see the draft appear here...</p>
              </div>
            )}
            
            {draft && <DraftPreview draft={draft} mode="live" />}
          </div>
        </div>
      )}
      
      {step === 2 && draft && (
        <div className="finalize-step">
          <DraftPreview draft={draft} mode="editable" />
          <div className="finalize-actions" style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
            <button onClick={() => setStep(1)} className="btn-secondary">
              ← Back to Edit
            </button>
            <button onClick={handleProceedToGuidance} className="btn-primary">
              Proceed to Submission Guidance →
            </button>
          </div>
        </div>
      )}
      
      {step === 3 && draft && (
        <SubmissionGuidancePanel
          documentType={draft.documentType}
          authority={draft.authorities[0]?.name}
          state={formData.applicantState}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
};

export default AssistedMode;
