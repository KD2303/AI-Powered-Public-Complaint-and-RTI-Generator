/**
 * AI Inference Layer
 * Handles intent extraction, authority inference, and AI-based processing
 * This layer is provider-agnostic and swappable
 */

/**
 * Confidence levels for AI inferences
 */
export const ConfidenceLevel = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

/**
 * Extracts intent from user's issue description
 * In production, this would call an AI API
 * For now, returns structured inference
 */
export const extractIntent = async (issueText, language = 'english') => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const lowerText = issueText.toLowerCase();
  
  // Extract potential information requests (for RTI)
  const informationKeywords = ['how many', 'list of', 'details of', 'information about', 'copies of', 'records of'];
  const hasInformationRequest = informationKeywords.some(keyword => lowerText.includes(keyword));
  
  // Extract action requests (for complaints)
  const actionKeywords = ['need', 'want', 'should', 'must', 'require', 'fix', 'solve', 'address'];
  const hasActionRequest = actionKeywords.some(keyword => lowerText.includes(keyword));
  
  // Extract entities
  const entities = {
    timePeriod: extractTimePeriod(issueText),
    location: extractLocation(issueText),
    department: extractDepartment(issueText)
  };
  
  return {
    isInformationRequest: hasInformationRequest,
    isActionRequest: hasActionRequest,
    entities,
    confidence: hasInformationRequest || hasActionRequest ? ConfidenceLevel.MEDIUM : ConfidenceLevel.LOW,
    suggestedDocumentType: hasInformationRequest ? 'RTI' : hasActionRequest ? 'COMPLAINT' : 'UNKNOWN'
  };
};

/**
 * Suggests appropriate authority based on issue and location
 */
export const suggestAuthority = async (issueText, state, entities) => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const lowerText = issueText.toLowerCase();
  const authorities = [];
  
  // Department-based authority mapping
  const departmentMap = {
    'municipal': `Municipal Corporation, ${state}`,
    'corporation': `Municipal Corporation, ${state}`,
    'electricity': `State Electricity Board, ${state}`,
    'water': `Water Supply Department, ${state}`,
    'police': `Police Department, ${state}`,
    'transport': `Transport Department, ${state}`,
    'education': `Education Department, ${state}`,
    'health': `Health Department, ${state}`,
    'public works': `Public Works Department (PWD), ${state}`,
    'pwd': `Public Works Department (PWD), ${state}`,
    'revenue': `Revenue Department, ${state}`,
    'forest': `Forest Department, ${state}`,
    'agriculture': `Agriculture Department, ${state}`
  };
  
  // Check for department keywords
  for (const [keyword, authority] of Object.entries(departmentMap)) {
    if (lowerText.includes(keyword)) {
      authorities.push({
        name: authority,
        confidence: ConfidenceLevel.MEDIUM,
        reason: `Issue relates to ${keyword}`
      });
    }
  }
  
  // Default state-level authority
  if (authorities.length === 0) {
    authorities.push({
      name: `Public Information Officer, ${state} Government`,
      confidence: ConfidenceLevel.LOW,
      reason: 'Default state-level authority'
    });
  }
  
  return authorities;
};

/**
 * Adapts tone of the document
 */
export const adaptTone = (text, tone) => {
  // In production, this would use AI to rephrase
  // For now, we add tone-specific prefixes/suffixes
  
  const toneMap = {
    neutral: {
      prefix: '',
      suffix: ''
    },
    formal: {
      prefix: 'I respectfully submit that ',
      suffix: ' I trust this matter will receive due attention.'
    },
    strict: {
      prefix: 'I must bring to your immediate attention that ',
      suffix: ' I expect prompt action on this matter as per applicable regulations.'
    }
  };
  
  const selectedTone = toneMap[tone] || toneMap.neutral;
  return `${selectedTone.prefix}${text}${selectedTone.suffix}`;
};

/**
 * Translates text to Hindi
 * In production, would use translation API
 */
export const translateToHindi = async (text) => {
  // Placeholder - in production, integrate with translation service
  await new Promise(resolve => setTimeout(resolve, 200));
  return text; // Return as-is for now
};

/**
 * Helper: Extract time period from text
 */
const extractTimePeriod = (text) => {
  // Simple year extraction
  const yearPattern = /\b(19|20)\d{2}\b/g;
  const years = text.match(yearPattern);
  
  if (years && years.length > 0) {
    return years.join(', ');
  }
  
  // Month/year patterns
  const monthYearPattern = /(january|february|march|april|may|june|july|august|september|october|november|december)\s+(19|20)\d{2}/gi;
  const monthYear = text.match(monthYearPattern);
  
  if (monthYear) {
    return monthYear[0];
  }
  
  return null;
};

/**
 * Helper: Extract location from text
 */
const extractLocation = (text) => {
  // Simple location extraction (would be more sophisticated with NER)
  const locationKeywords = ['in', 'at', 'near', 'located in'];
  const words = text.split(' ');
  
  for (let i = 0; i < words.length; i++) {
    if (locationKeywords.includes(words[i].toLowerCase()) && i + 1 < words.length) {
      return words[i + 1];
    }
  }
  
  return null;
};

/**
 * Helper: Extract department/domain from text
 */
const extractDepartment = (text) => {
  const lowerText = text.toLowerCase();
  const departments = [
    'municipal', 'electricity', 'water', 'police', 'transport',
    'education', 'health', 'public works', 'revenue', 'forest', 'agriculture'
  ];
  
  for (const dept of departments) {
    if (lowerText.includes(dept)) {
      return dept;
    }
  }
  
  return null;
};

/**
 * Generate subject line from issue description
 */
export const generateSubject = async (issueText, documentType) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Extract key phrases (first 60 characters as fallback)
  const shortened = issueText.substring(0, 60).trim();
  
  if (documentType === 'RTI') {
    return `Request for Information: ${shortened}...`;
  } else {
    return `Complaint regarding: ${shortened}...`;
  }
};
