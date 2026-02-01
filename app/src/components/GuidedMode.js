/**
 * Guided Mode Component
 * Step-by-step questions for beginners
 */

import React, { useState } from 'react';
import { generateDraft } from '../services/draftAssembly';
import ApplicantForm from './ApplicantForm';
import DraftPreview from './DraftPreview';
import SubmissionGuidancePanel from './SubmissionGuidancePanel';
import './GuidedMode.css';

const GuidedMode = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantAddress: '',
    applicantState: '',
    applicantPhone: '',
    applicantEmail: '',
    issueDescription: '',
    documentType: '',
    language: 'english',
    tone: 'neutral',
    previousRTI: false,
    previousRTINumber: ''
  });
  
  const [guidedAnswers, setGuidedAnswers] = useState({
    problemType: '', // 'information' or 'complaint'
    problemDescription: '',
    specificRequest: ''
  });
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleGuidedAnswerChange = (field, value) => {
    setGuidedAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    
    // Construct issue description from guided answers
    const issueDescription = `${guidedAnswers.problemDescription}\n\n${guidedAnswers.specificRequest}`;
    
    const finalData = {
      ...formData,
      issueDescription
    };
    
    const result = await generateDraft(finalData);
    
    if (result.success) {
      setDraft(result);
      setCurrentStep(4); // Move to preview step
    }
    
    setIsGenerating(false);
  };
  
  return (
    <div className="guided-mode">
      <div className="mode-header">
        <button onClick={onBack} className="back-button">← Back to Mode Selection</button>
        <h2>Guided Mode</h2>
        <p>Answer simple questions - we'll handle the rest</p>
      </div>
      
      <div className="progress-bar">
        <div className="progress-step" data-active={currentStep >= 1}>1. Your Details</div>
        <div className="progress-step" data-active={currentStep >= 2}>2. Your Issue</div>
        <div className="progress-step" data-active={currentStep >= 3}>3. Preferences</div>
        <div className="progress-step" data-active={currentStep >= 4}>4. Review</div>
        <div className="progress-step" data-active={currentStep >= 5}>5. Submit</div>
      </div>
      
      <div className="guided-content">
        {currentStep === 1 && (
          <div className="step-content">
            <h3>Step 1: Tell us about yourself</h3>
            <p className="step-description">We need your basic information for the application</p>
            
            <ApplicantForm
              formData={formData}
              onChange={handleInputChange}
              mode="guided"
            />
            
            <div className="step-actions">
              <button
                onClick={handleNextStep}
                disabled={!formData.applicantName || !formData.applicantAddress || !formData.applicantState}
                className="btn-primary"
              >
                Next Step →
              </button>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="step-content">
            <h3>Step 2: What do you need help with?</h3>
            <p className="step-description">Answer in simple words - we'll understand</p>
            
            <div className="question-section">
              <label>
                <strong>Are you trying to:</strong>
              </label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="problemType"
                    value="information"
                    checked={guidedAnswers.problemType === 'information'}
                    onChange={(e) => handleGuidedAnswerChange('problemType', e.target.value)}
                  />
                  <div className="radio-label">
                    <span className="radio-title">Get information or records</span>
                    <span className="radio-desc">You want to know something, get documents, or access data from a government office</span>
                  </div>
                </label>
                
                <label className="radio-option">
                  <input
                    type="radio"
                    name="problemType"
                    value="complaint"
                    checked={guidedAnswers.problemType === 'complaint'}
                    onChange={(e) => handleGuidedAnswerChange('problemType', e.target.value)}
                  />
                  <div className="radio-label">
                    <span className="radio-title">Report a problem or complaint</span>
                    <span className="radio-desc">You're facing an issue and want someone to fix it or take action</span>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="question-section">
              <label htmlFor="problemDescription">
                <strong>What is your problem? (in your own words)</strong>
              </label>
              <textarea
                id="problemDescription"
                value={guidedAnswers.problemDescription}
                onChange={(e) => handleGuidedAnswerChange('problemDescription', e.target.value)}
                placeholder="Example: My street has potholes and they haven't been repaired for months"
                rows={4}
                className="form-control"
              />
            </div>
            
            <div className="question-section">
              <label htmlFor="specificRequest">
                <strong>
                  {guidedAnswers.problemType === 'information' 
                    ? 'What specific information do you need?'
                    : 'What do you want them to do about it?'}
                </strong>
              </label>
              <textarea
                id="specificRequest"
                value={guidedAnswers.specificRequest}
                onChange={(e) => handleGuidedAnswerChange('specificRequest', e.target.value)}
                placeholder={
                  guidedAnswers.problemType === 'information'
                    ? 'Example: I want to know when the repair work was planned and what is the budget'
                    : 'Example: I want the potholes to be filled immediately'
                }
                rows={4}
                className="form-control"
              />
            </div>
            
            <div className="step-actions">
              <button onClick={handlePreviousStep} className="btn-secondary">
                ← Previous
              </button>
              <button
                onClick={handleNextStep}
                disabled={!guidedAnswers.problemType || !guidedAnswers.problemDescription}
                className="btn-primary"
              >
                Next Step →
              </button>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="step-content">
            <h3>Step 3: Final preferences</h3>
            <p className="step-description">Choose your language and tone</p>
            
            <div className="preferences-section">
              <div className="preference-group question-section">
                <label htmlFor="language">
                  <strong>Language</strong>
                </label>
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
              
              <div className="preference-group question-section">
                <label htmlFor="tone">
                  <strong>Tone</strong>
                </label>
                <select
                  id="tone"
                  value={formData.tone}
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  className="form-control"
                >
                  <option value="neutral">Neutral (Recommended)</option>
                  <option value="formal">Formal</option>
                  <option value="strict">Strict but Polite</option>
                </select>
              </div>
            </div>
            
            {guidedAnswers.problemType === 'information' && (
              <div className="previous-rti-section question-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.previousRTI}
                    onChange={(e) => handleInputChange('previousRTI', e.target.checked)}
                  />
                  <span>Have you filed an RTI about this before?</span>
                </label>
                
                {formData.previousRTI && (
                  <input
                    type="text"
                    placeholder="Enter previous RTI reference number (if you have it)"
                    value={formData.previousRTINumber}
                    onChange={(e) => handleInputChange('previousRTINumber', e.target.value)}
                    className="form-control mt-2"
                  />
                )}
              </div>
            )}
            
            <div className="step-actions">
              <button onClick={handlePreviousStep} className="btn-secondary">
                ← Previous
              </button>
              <button
                onClick={handleGenerateDraft}
                disabled={isGenerating}
                className="btn-primary"
              >
                {isGenerating ? 'Generating Draft...' : 'Generate My Document →'}
              </button>
            </div>
          </div>
        )}
        
        {currentStep === 4 && draft && (
          <div className="step-content">
            <h3>Step 4: Review your document</h3>
            <p className="step-description">Check everything and make changes if needed</p>
            
            <DraftPreview draft={draft} mode="editable" />
            
            <div className="step-actions">
              <button onClick={handlePreviousStep} className="btn-secondary">
                ← Back to Edit
              </button>
              <button onClick={handleNextStep} className="btn-primary">
                Looks Good - Show Submission Guide →
              </button>
            </div>
          </div>
        )}
        
        {currentStep === 5 && draft && (
          <div className="step-content">
            <h3>Step 5: How to submit</h3>
            <SubmissionGuidancePanel
              documentType={draft.documentType}
              authority={draft.authorities[0]?.name}
              state={formData.applicantState}
              onBack={handlePreviousStep}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidedMode;
