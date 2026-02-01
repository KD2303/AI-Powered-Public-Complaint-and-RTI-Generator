/**
 * Draft Assembly Service
 * Combines rule engine and AI inference to generate document drafts
 */

import { 
  determineDocumentType, 
  generateRTIDocument, 
  generateComplaintDocument,
  validateDocument 
} from './ruleEngine';
import { 
  extractIntent, 
  suggestAuthority, 
  generateSubject,
  adaptTone 
} from './aiInference';

/**
 * Main draft generation function
 * Orchestrates AI inference and rule-based structuring
 */
export const generateDraft = async (formData) => {
  const {
    applicantName,
    applicantAddress,
    applicantState,
    applicantPhone,
    applicantEmail,
    issueDescription,
    language = 'english',
    tone = 'neutral',
    previousRTI = false,
    previousRTINumber = ''
  } = formData;
  
  if (!issueDescription || issueDescription.trim().length < 10) {
    return {
      success: false,
      message: 'Issue description is too short. Please provide more details.',
      draft: null
    };
  }
  
  try {
    // Step 1: AI Intent Extraction
    const intent = await extractIntent(issueDescription, language);
    
    // Step 2: Rule-based Document Type Determination
    const documentTypeResult = determineDocumentType(issueDescription);
    
    // Combine AI and rule-based classification
    const finalDocumentType = documentTypeResult.confidence === 'high' 
      ? documentTypeResult.type 
      : intent.suggestedDocumentType;
    
    // Step 3: Authority Suggestion
    const authorities = await suggestAuthority(
      issueDescription, 
      applicantState, 
      intent.entities
    );
    
    // Step 4: Generate Subject
    const subject = await generateSubject(issueDescription, finalDocumentType);
    
    // Step 5: Apply tone adaptation
    const adaptedIssue = adaptTone(issueDescription, tone);
    
    // Step 6: Prepare document data
    const documentData = {
      applicantName,
      applicantAddress,
      applicantState,
      applicantPhone,
      applicantEmail,
      authority: authorities[0]?.name || '',
      subject,
      issueDescription: adaptedIssue,
      timePeriod: intent.entities.timePeriod,
      language,
      previousRTI,
      previousRTINumber
    };
    
    // Step 7: Generate structured document
    let sections;
    if (finalDocumentType === 'RTI') {
      sections = generateRTIDocument(documentData);
    } else if (finalDocumentType === 'COMPLAINT') {
      // For complaints, add relief sought
      documentData.reliefSought = extractReliefSought(issueDescription);
      sections = generateComplaintDocument(documentData);
    } else {
      // Default to complaint for unknown types
      documentData.reliefSought = 'Please take appropriate action.';
      sections = generateComplaintDocument(documentData);
    }
    
    // Step 8: Validate document
    const validation = validateDocument(finalDocumentType, documentData);
    
    // Step 9: Return draft with metadata
    return {
      success: true,
      documentType: finalDocumentType,
      confidence: documentTypeResult.confidence,
      sections,
      authorities,
      intent,
      validation,
      metadata: {
        generatedAt: new Date().toISOString(),
        language,
        tone
      }
    };
    
  } catch (error) {
    console.error('Draft generation error:', error);
    return {
      success: false,
      message: 'Failed to generate draft. Please try again.',
      error: error.message
    };
  }
};

/**
 * Extract relief sought from issue description
 */
const extractReliefSought = (issueText) => {
  const lowerText = issueText.toLowerCase();
  
  // Look for explicit relief statements
  const reliefPatterns = [
    /i want (.+)/i,
    /i need (.+)/i,
    /please (.+)/i,
    /kindly (.+)/i,
    /request (.+)/i
  ];
  
  for (const pattern of reliefPatterns) {
    const match = issueText.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // Default relief based on issue type
  if (lowerText.includes('repair') || lowerText.includes('fix')) {
    return 'Please arrange for immediate repair/fixing of the mentioned issue.';
  } else if (lowerText.includes('refund') || lowerText.includes('payment')) {
    return 'Please process the refund/payment at the earliest.';
  } else if (lowerText.includes('action') || lowerText.includes('investigate')) {
    return 'Please investigate the matter and take appropriate action.';
  }
  
  return 'Please look into this matter and provide appropriate resolution.';
};

/**
 * Assemble final document text from sections
 */
export const assembleFinalDocument = (sections, documentType) => {
  if (documentType === 'RTI') {
    return `${sections.header}

${sections.toSection}

${sections.fromSection}

${sections.subject}

${sections.salutation}

${sections.body}

${sections.requests}
${sections.timePeriod}

${sections.fee}

${sections.closing}

${sections.fromSection.split('\n')[1]}`;
  } else {
    return `${sections.header}

${sections.toSection}

${sections.fromSection}

${sections.subject}

${sections.salutation}

${sections.body}

${sections.issue}

${sections.reliefHeader}
${sections.relief}

${sections.closing}

${sections.fromSection.split('\n')[1]}`;
  }
};
