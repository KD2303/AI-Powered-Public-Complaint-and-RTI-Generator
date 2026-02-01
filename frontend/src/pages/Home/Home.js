import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container home-page">
      <div className="hero-section">
        <h1>AI-Powered Public Complaint & RTI Generator</h1>
        <p className="subtitle">
          Empowering citizens to file effective Right to Information applications and public complaints using AI.
        </p>
      </div>

      <div className="mode-selection">
        <div className="mode-card guided">
          <div className="icon">📋</div>
          <h2>Guided Mode</h2>
          <p>Best for beginners. Answer simple questions step-by-step.</p>
          <ul className="features-list">
            <li>Step-by-step questionnaire</li>
            <li>No legal knowledge required</li>
            <li>Auto-formatting</li>
          </ul>
          <button 
            className="btn btn-primary btn-block"
            onClick={() => navigate('/guided')}
          >
            Start Guided Mode
          </button>
        </div>

        <div className="mode-card assisted">
          <div className="icon">⚡</div>
          <h2>Assisted Mode</h2>
          <p>For advanced users. Write freely with AI assistance.</p>
          <ul className="features-list">
            <li>Free-text input</li>
            <li>Real-time drafting</li>
            <li>Smart suggestions</li>
          </ul>
          <button 
            className="btn btn-secondary btn-block"
            onClick={() => navigate('/assisted')}
          >
            Start Assisted Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
