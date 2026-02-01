/**
 * Applicant Form Component
 * Reusable form for collecting applicant details
 */

import React from 'react';
import './ApplicantForm.css';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const ApplicantForm = ({ formData, onChange, mode }) => {
  return (
    <div className="applicant-form">
      <h4>{mode === 'guided' ? 'Your Information' : 'Applicant Details'}</h4>
      
      <div className="form-group">
        <label htmlFor="applicantName">
          Full Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="applicantName"
          value={formData.applicantName}
          onChange={(e) => onChange('applicantName', e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="applicantAddress">
          Postal Address <span className="required">*</span>
        </label>
        <textarea
          id="applicantAddress"
          value={formData.applicantAddress}
          onChange={(e) => onChange('applicantAddress', e.target.value)}
          placeholder="Enter your complete postal address"
          rows={3}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="applicantState">
          State <span className="required">*</span>
        </label>
        <select
          id="applicantState"
          value={formData.applicantState}
          onChange={(e) => onChange('applicantState', e.target.value)}
          required
        >
          <option value="">Select your state</option>
          {INDIAN_STATES.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="applicantPhone">
            Phone Number <span className="optional">(optional)</span>
          </label>
          <input
            type="tel"
            id="applicantPhone"
            value={formData.applicantPhone}
            onChange={(e) => onChange('applicantPhone', e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="applicantEmail">
            Email <span className="optional">(optional)</span>
          </label>
          <input
            type="email"
            id="applicantEmail"
            value={formData.applicantEmail}
            onChange={(e) => onChange('applicantEmail', e.target.value)}
            placeholder="Enter email address"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantForm;
