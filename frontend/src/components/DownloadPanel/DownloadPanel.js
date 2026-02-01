import React, { useState } from 'react';
import { downloadFile, downloadBlob } from '../../utils/fileDownload';
import { downloadDocument } from '../../services/draftService';
import { toast } from 'react-toastify';

const DownloadPanel = ({ draftData }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format) => {
    setDownloading(true);
    try {
      // If just text file, we can do it client side
      if (format === 'txt') {
        downloadFile(draftData.draft_text, 'draft_application.txt');
        toast.success("Downloaded as Text File");
      } else {
        // For PDF/DOCX call backend
        const blob = await downloadDocument({
            draft_text: draftData.draft_text,
            applicant_name: draftData.applicant_name,
            document_type: draftData.document_type || 'document',
            format: format
        }, format);
        
        const extension = format === 'excel' ? 'xlsx' : format;
        downloadBlob(blob, `application.${extension}`);
        toast.success(`Downloaded as ${format.toUpperCase()}`);
      }
    } catch (error) {
      toast.error(`Failed to download ${format.toUpperCase()}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="card download-panel text-center">
      <h3>Download Options</h3>
      <p className="mb-4 text-muted">Select a format to save your document</p>
      
      <div className="button-group" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          className="btn btn-primary" 
          onClick={() => handleDownload('pdf')}
          disabled={downloading}
        >
          📄 PDF
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => handleDownload('docx')}
          disabled={downloading}
        >
          📝 Word
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => handleDownload('txt')}
          disabled={downloading}
        >
          Plain Text
        </button>
      </div>
    </div>
  );
};

export default DownloadPanel;
