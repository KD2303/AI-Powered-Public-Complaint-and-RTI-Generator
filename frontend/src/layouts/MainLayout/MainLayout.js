import React from 'react';
import { Link } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <header className="app-header">
        <div className="container header-content">
          <Link to="/" className="brand-logo">
            <span className="logo-icon">🏛️</span>
            <h1>CivicDraft</h1>
          </Link>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/guided" className="nav-link">Guided Mode</Link>
            <Link to="/assisted" className="nav-link">Assisted Mode</Link>
          </nav>
        </div>
      </header>

      <main className="app-content">
        {children}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p className="disclaimer">
            <strong>Disclaimer:</strong> This tool utilizes AI to assist in drafting public complaints and RTI applications. 
            All generated content is advisory and should be reviewed before submission.
            We do not store your personal data.
          </p>
          <p className="copyright">
            &copy; {new Date().getFullYear()} AI-Powered Public Complaint & RTI Generator
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
