/**
 * Mode Selector Component
 * Allows users to choose between Guided or Assisted mode
 */

import React from 'react';
import './ModeSelector.css';

const ModeSelector = ({ onSelectMode }) => {
  return (
    <div className="mode-selector">
      <h2>How would you like to proceed?</h2>
      <p className="mode-description">
        Choose the mode that best fits your comfort level
      </p>
      
      <div className="mode-cards">
        <div className="mode-card" onClick={() => onSelectMode('guided')}>
          <div className="mode-icon">📋</div>
          <h3>Guided Mode</h3>
          <p className="mode-label">For Beginners</p>
          <ul className="mode-features">
            <li>Step-by-step questions</li>
            <li>No legal jargon</li>
            <li>Automatic document type detection</li>
            <li>Authority suggestions</li>
          </ul>
          <button className="mode-button">Start Guided Mode</button>
        </div>
        
        <div className="mode-card" onClick={() => onSelectMode('assisted')}>
          <div className="mode-icon">✍️</div>
          <h3>Assisted Mode</h3>
          <p className="mode-label">For Semi-aware Users</p>
          <ul className="mode-features">
            <li>Free-text description</li>
            <li>Live draft preview</li>
            <li>Real-time feedback</li>
            <li>Full flexibility</li>
          </ul>
          <button className="mode-button">Start Assisted Mode</button>
        </div>
      </div>
      
      <div className="mode-info">
        <p>
          <strong>Not sure which to choose?</strong> Both modes use the same powerful backend. 
          Guided mode walks you through with questions, while Assisted mode lets you write freely.
        </p>
      </div>
    </div>
  );
};

export default ModeSelector;
