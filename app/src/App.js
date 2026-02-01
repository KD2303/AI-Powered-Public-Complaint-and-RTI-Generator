/**
 * Main Application Component
 * Handles dual-mode interaction (Guided vs Assisted)
 */

import React, { useState } from 'react';
import GuidedMode from './components/GuidedMode';
import AssistedMode from './components/AssistedMode';
import ModeSelector from './components/ModeSelector';
import './App.css';

function App() {
  const [mode, setMode] = useState(null); // null, 'guided', 'assisted'
  
  const resetMode = () => {
    setMode(null);
  };
  
  return (
    <div className="App">
      <header className="app-header">
        <h1>AI-Powered Public Complaint & RTI Generator</h1>
        <p className="tagline">Making civic participation accessible to everyone</p>
      </header>
      
      <main className="app-main">
        {mode === null && (
          <ModeSelector onSelectMode={setMode} />
        )}
        
        {mode === 'guided' && (
          <GuidedMode onBack={resetMode} />
        )}
        
        {mode === 'assisted' && (
          <AssistedMode onBack={resetMode} />
        )}
      </main>
      
      <footer className="app-footer">
        <p className="disclaimer">
          ⚠️ <strong>Disclaimer:</strong> All generated content is advisory. 
          Users must review, edit, and submit documents as per applicable laws. 
          This tool does not provide legal advice or guarantees.
        </p>
      </footer>
    </div>
  );
}

export default App;
