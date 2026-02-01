/**
 * Rule-Based Structural Engine
 * Handles RTI and Complaint structure schemas
 * This is deterministic, not AI-based
 */

export const DocumentType = {
  RTI: 'RTI',
  COMPLAINT: 'COMPLAINT',
  UNKNOWN: 'UNKNOWN'
};

export const RTIStructure = {
  sections: [
    { id: 'applicant', name: 'Applicant Details', required: true },
    { id: 'authority', name: 'Public Authority', required: true },
    { id: 'subject', name: 'Subject Line', required: true },
    { id: 'requests', name: 'Information Requests', required: true },
    { id: 'timePeriod', name: 'Time Period', required: false },
    { id: 'fee', name: 'Fee Declaration', required: false },
    { id: 'closing', name: 'Closing Statement', required: true }
  ]
};

export const ComplaintStructure = {
  sections: [
    { id: 'applicant', name: 'Applicant Details', required: true },
    { id: 'authority', name: 'Authority/Grievance Cell', required: true },
    { id: 'issue', name: 'Issue Description', required: true },
    { id: 'relief', name: 'Relief Sought', required: true },
    { id: 'closing', name: 'Closing Statement', required: true }
  ]
};

/**
 * Validates if document meets minimum requirements
 */
export const validateDocument = (documentType, data) => {
  const structure = documentType === DocumentType.RTI ? RTIStructure : ComplaintStructure;
  const errors = [];
  
  structure.sections.forEach(section => {
    if (section.required && (!data[section.id] || data[section.id].trim() === '')) {
      errors.push(`${section.name} is required`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Determines document type based on keywords and intent
 * Rule-based classification
 */
export const determineDocumentType = (issueText) => {
  const lowerText = issueText.toLowerCase();
  
  // RTI indicators
  const rtiKeywords = [
    'information', 'rti', 'right to information', 'details', 'records',
    'documents', 'copies', 'data', 'statistics', 'report', 'know'
  ];
  
  // Complaint indicators
  const complaintKeywords = [
    'complaint', 'problem', 'issue', 'grievance', 'dispute', 'harassment',
    'corruption', 'misconduct', 'action', 'redressal', 'solve', 'fix'
  ];
  
  let rtiScore = 0;
  let complaintScore = 0;
  
  rtiKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) rtiScore++;
  });
  
  complaintKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) complaintScore++;
  });
  
  if (rtiScore > complaintScore && rtiScore > 0) {
    return { type: DocumentType.RTI, confidence: 'high' };
  } else if (complaintScore > rtiScore && complaintScore > 0) {
    return { type: DocumentType.COMPLAINT, confidence: 'high' };
  } else if (rtiScore > 0 || complaintScore > 0) {
    return { 
      type: rtiScore >= complaintScore ? DocumentType.RTI : DocumentType.COMPLAINT, 
      confidence: 'medium' 
    };
  }
  
  return { type: DocumentType.UNKNOWN, confidence: 'low' };
};

/**
 * Generates RTI document structure
 */
export const generateRTIDocument = (data) => {
  const {
    applicantName,
    applicantAddress,
    applicantState,
    applicantPhone,
    applicantEmail,
    authority,
    subject,
    issueDescription,
    timePeriod,
    previousRTI,
    previousRTINumber,
    language
  } = data;
  
  const sections = {
    header: language === 'hindi' ? 'सूचना का अधिकार अधिनियम, 2005 के तहत आवेदन' : 'Application under Right to Information Act, 2005',
    
    toSection: `${language === 'hindi' ? 'सेवा में' : 'To'},
${authority || (language === 'hindi' ? '[प्राधिकरण का नाम]' : '[Public Authority Name]')}`,
    
    fromSection: `${language === 'hindi' ? 'आवेदक' : 'Applicant'}:
${applicantName}
${applicantAddress}
${applicantState}
${applicantPhone ? `${language === 'hindi' ? 'फोन' : 'Phone'}: ${applicantPhone}` : ''}
${applicantEmail ? `${language === 'hindi' ? 'ईमेल' : 'Email'}: ${applicantEmail}` : ''}`,
    
    subject: `${language === 'hindi' ? 'विषय' : 'Subject'}: ${subject || (language === 'hindi' ? 'सूचना के अधिकार के तहत सूचना का अनुरोध' : 'Request for Information under RTI Act')}`,
    
    salutation: language === 'hindi' ? 'महोदय/महोदया,' : 'Sir/Madam,',
    
    body: previousRTI 
      ? `${language === 'hindi' ? 'मैं आपके कार्यालय में पहले दायर आरटीआई आवेदन (संदर्भ संख्या:' : 'This is with reference to my previous RTI application filed with your office (Reference Number:'} ${previousRTINumber || (language === 'hindi' ? '[संदर्भ संख्या]' : '[Reference Number]')}) ${language === 'hindi' ? 'के संदर्भ में निम्नलिखित जानकारी का अनुरोध कर रहा/रही हूं:' : 'and I hereby request the following information:'}`
      : `${language === 'hindi' ? 'मैं सूचना के अधिकार अधिनियम, 2005 के तहत निम्नलिखित जानकारी का अनुरोध कर रहा/रही हूं:' : 'Under the Right to Information Act, 2005, I hereby request the following information:'}`,
    
    requests: issueDescription || (language === 'hindi' ? '[यहां अपने सूचना अनुरोध दर्ज करें]' : '[Enter your information requests here]'),
    
    timePeriod: timePeriod 
      ? `\n${language === 'hindi' ? 'समय अवधि' : 'Time Period'}: ${timePeriod}`
      : '',
    
    fee: language === 'hindi' 
      ? '\nमैं आवेदन शुल्क के रूप में आवश्यक राशि का भुगतान करने के लिए तैयार हूं।'
      : '\nI am willing to pay the required application fee.',
    
    closing: language === 'hindi' 
      ? 'कृपया अधिनियम के प्रावधानों के अनुसार निर्धारित समय सीमा के भीतर अनुरोधित जानकारी प्रदान करें।\n\nधन्यवाद।'
      : 'Please provide the requested information within the stipulated time frame as per the provisions of the Act.\n\nThank you.'
  };
  
  return sections;
};

/**
 * Generates Complaint document structure
 */
export const generateComplaintDocument = (data) => {
  const {
    applicantName,
    applicantAddress,
    applicantState,
    applicantPhone,
    applicantEmail,
    authority,
    subject,
    issueDescription,
    reliefSought,
    language
  } = data;
  
  const sections = {
    header: language === 'hindi' ? 'शिकायत पत्र' : 'Complaint Letter',
    
    toSection: `${language === 'hindi' ? 'सेवा में' : 'To'},
${authority || (language === 'hindi' ? '[संबंधित प्राधिकरण/शिकायत निवारण प्रकोष्ठ]' : '[Concerned Authority/Grievance Cell]')}`,
    
    fromSection: `${language === 'hindi' ? 'शिकायतकर्ता' : 'Complainant'}:
${applicantName}
${applicantAddress}
${applicantState}
${applicantPhone ? `${language === 'hindi' ? 'फोन' : 'Phone'}: ${applicantPhone}` : ''}
${applicantEmail ? `${language === 'hindi' ? 'ईमेल' : 'Email'}: ${applicantEmail}` : ''}`,
    
    subject: `${language === 'hindi' ? 'विषय' : 'Subject'}: ${subject || (language === 'hindi' ? 'शिकायत पंजीकरण' : 'Complaint Registration')}`,
    
    salutation: language === 'hindi' ? 'महोदय/महोदया,' : 'Sir/Madam,',
    
    body: language === 'hindi' 
      ? 'मैं निम्नलिखित मुद्दे के संबंध में औपचारिक शिकायत दर्ज करना चाहता/चाहती हूं:'
      : 'I wish to file a formal complaint regarding the following matter:',
    
    issue: issueDescription || (language === 'hindi' ? '[अपनी शिकायत का विवरण यहां दर्ज करें]' : '[Enter your complaint details here]'),
    
    reliefHeader: language === 'hindi' ? '\nअनुरोधित निवारण:' : '\nRelief Sought:',
    
    relief: reliefSought || (language === 'hindi' ? '[आप क्या कार्रवाई या समाधान चाहते हैं]' : '[What action or resolution you seek]'),
    
    closing: language === 'hindi' 
      ? '\nकृपया इस मामले को प्राथमिकता के आधार पर देखें और उचित कार्रवाई करें।\n\nधन्यवाद।'
      : '\nKindly look into this matter on priority and take appropriate action.\n\nThank you.'
  };
  
  return sections;
};
