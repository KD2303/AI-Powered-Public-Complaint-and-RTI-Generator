/**
 * Submission Guidance Module
 * Provides rule-based submission instructions
 */

export const getSubmissionGuidance = (documentType, authority, state) => {
  const guidance = {
    documentType,
    authority,
    state,
    methods: [],
    fees: null,
    timeline: null,
    tips: []
  };
  
  if (documentType === 'RTI') {
    guidance.methods = [
      {
        type: 'Online',
        title: 'RTI Online Portal',
        url: 'https://rtionline.gov.in/',
        description: 'Submit your RTI application online through the official government portal'
      },
      {
        type: 'Post',
        title: 'By Post/In Person',
        description: 'Send the application via registered post or submit in person to the Public Information Officer'
      }
    ];
    
    guidance.fees = {
      amount: '₹10',
      description: 'Application fee (may vary by state)',
      exemptions: 'BPL card holders are exempt from fees'
    };
    
    guidance.timeline = {
      standard: '30 days',
      urgent: '48 hours (for life and liberty matters)',
      description: 'The authority must respond within 30 days as per RTI Act, 2005'
    };
    
    guidance.tips = [
      'Keep a copy of your application for records',
      'Note down the application/acknowledgment number',
      'If no response within 30 days, you can file a first appeal',
      'Clearly number each information request',
      'Be specific about the time period for which you need information'
    ];
    
  } else if (documentType === 'COMPLAINT') {
    guidance.methods = [
      {
        type: 'Online',
        title: 'Public Grievance Portal',
        url: 'https://pgportal.gov.in/',
        description: 'Lodge your complaint through the centralized public grievance portal'
      },
      {
        type: 'Post',
        title: 'By Post/In Person',
        description: 'Send the complaint via registered post or submit in person to the concerned department'
      }
    ];
    
    guidance.fees = {
      amount: 'Free',
      description: 'No fee required for filing complaints',
      exemptions: 'N/A'
    };
    
    guidance.timeline = {
      standard: '60 days',
      description: 'Departments typically respond within 60 days'
    };
    
    guidance.tips = [
      'Attach supporting documents if available',
      'Keep a copy of the complaint and all correspondence',
      'Note down the complaint/registration number',
      'Follow up regularly if no response is received',
      'Escalate to higher authority if issue is not resolved'
    ];
  }
  
  return guidance;
};

/**
 * Get state-specific portals and contact information
 */
export const getStateSpecificInfo = (state) => {
  // This would be expanded with actual state-specific information
  const stateInfo = {
    state,
    rtiPortal: null,
    grievancePortal: null,
    contactInfo: null
  };
  
  // Sample state-specific mappings
  const statePortals = {
    'Delhi': {
      rtiPortal: 'https://rtionline.delhi.gov.in/',
      grievancePortal: 'https://esamadhan.delhi.gov.in/'
    },
    'Maharashtra': {
      rtiPortal: 'https://rtionline.maharashtra.gov.in/',
      grievancePortal: 'https://grievances.maharashtra.gov.in/'
    },
    'Karnataka': {
      rtiPortal: 'https://www.kannadaganaka.kar.nic.in/',
      grievancePortal: 'https://cm.karnataka.gov.in/'
    }
    // Add more states as needed
  };
  
  if (statePortals[state]) {
    stateInfo.rtiPortal = statePortals[state].rtiPortal;
    stateInfo.grievancePortal = statePortals[state].grievancePortal;
  }
  
  return stateInfo;
};

/**
 * Format postal address for submission
 */
export const formatPostalAddress = (authority, state) => {
  return {
    recipient: authority,
    addressLine: '[Department Address]',
    city: '[City]',
    state: state,
    pincode: '[Pincode]',
    fullAddress: `${authority}\n[Department Address]\n[City], ${state} - [Pincode]`
  };
};
