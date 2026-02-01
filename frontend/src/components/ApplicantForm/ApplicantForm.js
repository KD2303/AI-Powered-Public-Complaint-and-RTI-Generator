import React from 'react';

const ApplicantForm = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="card applicant-form">
      <h3>Applicant Details</h3>
      <div className="form-grid">
        <div className="input-group">
          <label className="input-label">Full Name *</label>
          <input
            type="text"
            name="applicant_name"
            value={data.applicant_name || ''}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. Rahul Sharma"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">Address *</label>
          <textarea
            name="applicant_address"
            value={data.applicant_address || ''}
            onChange={handleChange}
            className="form-textarea"
            rows="3"
            placeholder="Full postal address"
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">State *</label>
          <input
            type="text"
            name="applicant_state"
            value={data.applicant_state || ''}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. Maharashtra"
            required
          />
        </div>

        <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Phone (Optional)</label>
            <input
              type="tel"
              name="applicant_phone"
              value={data.applicant_phone || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="+91..."
            />
          </div>
          <div className="input-group">
            <label className="input-label">Email (Optional)</label>
            <input
              type="email"
              name="applicant_email"
              value={data.applicant_email || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="example@mail.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantForm;
