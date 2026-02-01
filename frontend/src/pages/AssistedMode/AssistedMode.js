import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useDebounce from '../../hooks/useDebounce';
import { generateDraft } from '../../services/draftService';
import ApplicantForm from '../../components/ApplicantForm/ApplicantForm';
import DraftPreview from '../../components/DraftPreview/DraftPreview';
import DownloadPanel from '../../components/DownloadPanel/DownloadPanel';
import ConfidenceNotice from '../../components/ConfidenceNotice/ConfidenceNotice';
import './AssistedMode.css';

const AssistedMode = () => {
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_address: '',
    applicant_state: '',
    applicant_phone: '',
    applicant_email: '',
    issue_description: '',
    document_type: 'information_request', // default
    language: 'english',
    tone: 'neutral'
  });

  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce the entire form data to prevent too many API calls
  const debouncedData = useDebounce(formData, 1500);

  useEffect(() => {
    // Only generate if we have minimum required fields
    if (debouncedData.issue_description && debouncedData.issue_description.length > 10) {
      handleGenerateDraft(debouncedData);
    }
  }, [debouncedData]);

  const handleGenerateDraft = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateDraft(data);
      setDraft(result);
    } catch (err) {
      console.error(err);
      // Don't show toast on auto-updates to avoid spamming
      setError("Could not update draft. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualRegenerate = () => {
     if (!formData.issue_description) {
        toast.warning("Please describe your issue first.");
        return;
     }
     handleGenerateDraft(formData);
  };

  const handleDraftEdit = (newText) => {
    setDraft(prev => ({ ...prev, draft_text: newText }));
  };

  return (
    <div className="container assisted-mode">
      <div className="header-section">
        <h2>Assisted Drafting</h2>
        <p className="text-muted">Write freely, and we'll format it for you.</p>
      </div>

      <div className="split-view">
        <div className="input-panel">
          <ApplicantForm 
            data={formData} 
            onChange={(newData) => setFormData(newData)} 
          />
          
          <div className="card mt-4">
            <h3>Issue Details</h3>
            <div className="input-group">
              <label className="input-label">Describe your issue or request *</label>
              <textarea
                className="form-textarea"
                rows="6"
                placeholder="e.g. I applied for a ration card 3 months ago but haven't received it yet..."
                value={formData.issue_description}
                onChange={(e) => setFormData({ ...formData, issue_description: e.target.value })}
              />
            </div>
            
            <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
               <div className="input-group">
                <label className="input-label">Document Type</label>
                <select 
                  className="form-select"
                  value={formData.document_type}
                  onChange={(e) => setFormData({ ...formData, document_type: e.target.value })}
                >
                  <option value="information_request">RTI - Information</option>
                  <option value="records_request">RTI - Records</option>
                  <option value="inspection_request">RTI - Inspection</option>
                  <option value="grievance">Complaint - Grievance</option>
                </select>
              </div>

               <div className="input-group">
                <label className="input-label">Language</label>
                <select 
                  className="form-select"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>

               <div className="input-group">
                <label className="input-label">Tone</label>
                <select 
                  className="form-select"
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                >
                  <option value="neutral">Neutral</option>
                  <option value="formal">Formal</option>
                  <option value="assertive">Assertive</option>
                </select>
              </div>
            </div>

            <button 
                className="btn btn-primary mt-4" 
                onClick={handleManualRegenerate}
                disabled={loading}
            >
                {loading ? 'Generating...' : 'Regenerate Draft'}
            </button>
          </div>
        </div>

        <div className="preview-panel">
          {error && (
             <div className="card" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>
               {error}
             </div>
          )}
          
          {draft ? (
            <>
              {draft.confidence && (
                <ConfidenceNotice 
                    level={draft.confidence.level} 
                    explanation={draft.confidence.explanation}
                />
              )}
              <DraftPreview 
                draftText={draft.draft_text} 
                onEdit={handleDraftEdit}
              />
              <div className="mt-4">
                <DownloadPanel draftData={{ ...formData, draft_text: draft.draft_text }} />
              </div>
            </>
          ) : (
            <div className="empty-state card text-center" style={{ padding: '4rem 2rem' }}>
              <span style={{ fontSize: '3rem' }}>📄</span>
              <h3>Your draft will appear here</h3>
              <p className="text-muted">Start typing your issue details to see the magic happen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistedMode;
