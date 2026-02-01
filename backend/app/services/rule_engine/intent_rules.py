"""
Intent Rules - Rule Engine for Document Type Classification
PRIMARY decision layer - runs before any AI/NLP
"""

from typing import Tuple, Optional

# Keywords that strongly indicate RTI
RTI_KEYWORDS = [
    "information", "records", "documents", "copies", "rti",
    "right to information", "public authority", "inspection",
    "certified copies", "section 6", "section 8"
]

# Keywords that strongly indicate Complaint
COMPLAINT_KEYWORDS = [
    "complaint", "grievance", "problem", "issue", "harassment",
    "corruption", "delay", "negligence", "misconduct", "fraud",
    "not working", "broken", "damaged", "poor service"
]

# Keywords that indicate Appeal
APPEAL_KEYWORDS = [
    "appeal", "review", "reconsider", "rejected", "denial",
    "first appeal", "second appeal", "information commission"
]


def classify_intent(text: str) -> Tuple[str, float]:
    """
    Classify user intent based on keyword matching.
    Returns (intent, confidence)
    
    Priority:
    1. Exact keyword match = high confidence
    2. Partial match = medium confidence
    3. No match = unknown (defer to NLP)
    """
    text_lower = text.lower()
    
    # Count keyword matches
    rti_score = sum(1 for kw in RTI_KEYWORDS if kw in text_lower)
    complaint_score = sum(1 for kw in COMPLAINT_KEYWORDS if kw in text_lower)
    appeal_score = sum(1 for kw in APPEAL_KEYWORDS if kw in text_lower)
    
    max_score = max(rti_score, complaint_score, appeal_score)
    
    if max_score == 0:
        return ("unknown", 0.0)
    
    # Determine winner
    if rti_score == max_score and rti_score > complaint_score:
        confidence = min(0.9, 0.5 + (rti_score * 0.1))
        return ("rti", confidence)
    elif complaint_score == max_score and complaint_score > rti_score:
        confidence = min(0.9, 0.5 + (complaint_score * 0.1))
        return ("complaint", confidence)
    elif appeal_score == max_score:
        confidence = min(0.9, 0.5 + (appeal_score * 0.1))
        return ("appeal", confidence)
    else:
        # Mixed signals - low confidence
        return ("unknown", 0.3)
