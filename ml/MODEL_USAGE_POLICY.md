# 🚨 MODEL USAGE POLICY

## Non-Negotiable Rules for AI/ML in This Project

### 1. Rule Engine is PRIMARY
- All structural decisions MUST go through the rule engine first
- AI/NLP is ONLY used when rules cannot determine the answer
- Never bypass rules with AI predictions

### 2. AI is BOUNDED
- spaCy: Used ONLY for NER (Named Entity Recognition) and phrase matching
- DistilBERT: Used ONLY for semantic similarity ranking, NOT generation
- No generative AI (GPT, Claude, etc.) for document content

### 3. Confidence Gating
- Any AI prediction below 70% confidence MUST trigger user confirmation
- Low confidence results should show alternatives
- Users can always override AI suggestions

### 4. No Hallucination Risk
- Document templates are human-written
- AI only fills placeholders with extracted/validated data
- No free-form text generation for legal content

### 5. Audit Trail
- All AI decisions must be logged
- Users can see why a decision was made
- Explainability is mandatory

## Forbidden Actions
❌ Using AI to generate legal advice  
❌ Auto-submitting documents without user review  
❌ Storing user data beyond session  
❌ Training models on user input without consent  

## Allowed Actions
✅ Entity extraction (names, dates, organizations)  
✅ Intent classification (RTI vs Complaint)  
✅ Authority matching via semantic similarity  
✅ Language detection and normalization  
