/**
 * Submission Guidance Panel Component
 * Provides rule-based submission instructions
 */

import React from 'react';
import { getSubmissionGuidance, getStateSpecificInfo, formatPostalAddress } from '../services/submissionGuidance';
import './SubmissionGuidancePanel.css';

const SubmissionGuidancePanel = ({ documentType, authority, state, onBack }) => {
  const guidance = getSubmissionGuidance(documentType, authority, state);
  const stateInfo = getStateSpecificInfo(state);
  const postalAddress = formatPostalAddress(authority, state);
  
  return (
    <div className="submission-guidance">
      <h3>📤 Submission Guidance</h3>
      <p className="guidance-intro">Here's how to submit your {documentType}</p>
      
      <div className="guidance-section">
        <h4>Submission Methods</h4>
        <div className="submission-methods">
          {guidance.methods.map((method, index) => (
            <div key={index} className="method-card">
              <div className="method-type">{method.type}</div>
              <h5>{method.title}</h5>
              <p>{method.description}</p>
              {method.url && (
                <a href={method.url} target="_blank" rel="noopener noreferrer" className="portal-link">
                  Visit Portal →
                </a>
              )}
            </div>
          ))}
        </div>
        
        {stateInfo.rtiPortal && documentType === 'RTI' && (
          <div className="state-specific-portal">
            <strong>State-Specific Portal:</strong>
            <a href={stateInfo.rtiPortal} target="_blank" rel="noopener noreferrer">
              {state} RTI Portal →
            </a>
          </div>
        )}
        
        {stateInfo.grievancePortal && documentType === 'COMPLAINT' && (
          <div className="state-specific-portal">
            <strong>State-Specific Portal:</strong>
            <a href={stateInfo.grievancePortal} target="_blank" rel="noopener noreferrer">
              {state} Grievance Portal →
            </a>
          </div>
        )}
      </div>
      
      {guidance.fees && (
        <div className="guidance-section">
          <h4>💰 Fee Information</h4>
          <div className="fee-details">
            <div className="fee-amount">
              <strong>Amount:</strong> {guidance.fees.amount}
            </div>
            <div className="fee-description">{guidance.fees.description}</div>
            {guidance.fees.exemptions && (
              <div className="fee-exemption">
                <strong>Exemption:</strong> {guidance.fees.exemptions}
              </div>
            )}
          </div>
        </div>
      )}
      
      {guidance.timeline && (
        <div className="guidance-section">
          <h4>⏱️ Response Timeline</h4>
          <div className="timeline-details">
            <div className="timeline-standard">
              <strong>Standard:</strong> {guidance.timeline.standard}
            </div>
            {guidance.timeline.urgent && (
              <div className="timeline-urgent">
                <strong>Urgent (Life & Liberty):</strong> {guidance.timeline.urgent}
              </div>
            )}
            <p className="timeline-description">{guidance.timeline.description}</p>
          </div>
        </div>
      )}
      
      <div className="guidance-section">
        <h4>📮 Postal Submission Address</h4>
        <div className="postal-address">
          <pre>{postalAddress.fullAddress}</pre>
          <p className="address-note">
            Note: Please verify the exact address from the department's official website or contact them directly.
          </p>
        </div>
      </div>
      
      {guidance.tips && guidance.tips.length > 0 && (
        <div className="guidance-section">
          <h4>💡 Important Tips</h4>
          <ul className="tips-list">
            {guidance.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="guidance-footer">
        <div className="disclaimer-box">
          <strong>⚠️ Important:</strong> This guidance is for reference only. 
          Always verify submission procedures and addresses from official sources before submitting.
        </div>
        
        {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back to Document
          </button>
        )}
      </div>
    </div>
  );
};

export default SubmissionGuidancePanel;
