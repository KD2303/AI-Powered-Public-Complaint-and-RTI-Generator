import React from 'react';
import './SubmissionGuidancePanel.css';

const SubmissionGuidancePanel = ({ documentType, department }) => {
  const getGuidance = () => {
    if (documentType === 'rti' || documentType === 'information_request') {
      return (
        <>
            <h3><i className="fas fa-info-circle"></i> How to Submit an RTI</h3>
            <ol>
                <li><strong>Print and Sign:</strong> Print the generated draft and sign it at the bottom.</li>
                <li><strong>Application Fee:</strong> Attach the required fee (usually ₹10) via Postal Order or Demand Draft favoring "Accounts Officer" of the public authority.</li>
                <li><strong>Submit:</strong> Send it via Speed Post or submit it in person at the {department || "concerned department's"} PIO office.</li>
                <li><strong>Acknowledgement:</strong> Keep the receipt and tracking number safe.</li>
            </ol>
            <div className="alert-box">
                <strong>Timeline:</strong> You should receive a reply within 30 days.
            </div>
        </>
      );
    } else {
       return (
        <>
            <h3><i className="fas fa-exclamation-circle"></i> How to Submit a Complaint</h3>
            <ol>
                <li><strong>Signature:</strong> Ensure the complaint is signed and dated.</li>
                <li><strong>Evidence:</strong> Attach copies of any supporting documents (photos, previous letters, receipts).</li>
                <li><strong>Submission Channel:</strong> Visit the official portal (e.g., CPGRAMS in India) or send via Registered Post.</li>
                <li><strong>Follow-up:</strong> Note down the complaint reference number if submitted online.</li>
            </ol>
        </>
      );
    }
  };

  return (
    <div className="submission-guidance">
        {getGuidance()}
    </div>
  );
};

export default SubmissionGuidancePanel;
