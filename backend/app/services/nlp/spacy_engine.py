"""
spaCy NLP Engine
Handles Named Entity Recognition and phrase matching
SECONDARY to rule engine - only used when rules don't match
"""

import spacy
from typing import Dict, List, Optional

# Load model (will be initialized on first use)
_nlp = None


def get_nlp():
    """Lazy load spaCy model"""
    global _nlp
    if _nlp is None:
        try:
            _nlp = spacy.load("en_core_web_sm")
        except OSError:
            raise RuntimeError(
                "spaCy model not found. Run: python -m spacy download en_core_web_sm"
            )
    return _nlp


def extract_entities(text: str) -> Dict[str, List[str]]:
    """
    Extract named entities from text using spaCy.
    
    Returns dict with entity types as keys:
    - PERSON: Names
    - ORG: Organizations
    - GPE: Locations (cities, states)
    - DATE: Dates
    - MONEY: Monetary values
    """
    nlp = get_nlp()
    doc = nlp(text)
    
    entities = {}
    for ent in doc.ents:
        if ent.label_ not in entities:
            entities[ent.label_] = []
        entities[ent.label_].append(ent.text)
    
    return entities


def extract_key_phrases(text: str, top_n: int = 5) -> List[str]:
    """
    Extract key noun phrases from text.
    Useful for understanding the main topics.
    """
    nlp = get_nlp()
    doc = nlp(text)
    
    # Extract noun chunks
    phrases = []
    for chunk in doc.noun_chunks:
        # Filter out very short or common phrases
        if len(chunk.text) > 3 and chunk.root.pos_ in ["NOUN", "PROPN"]:
            phrases.append(chunk.text.lower())
    
    # Return unique phrases
    return list(set(phrases))[:top_n]


def analyze_sentiment_basic(text: str) -> str:
    """
    Basic sentiment analysis using keyword matching.
    Returns: 'urgent', 'frustrated', 'neutral'
    
    Note: This is rule-based, not ML-based.
    """
    text_lower = text.lower()
    
    urgent_words = ["urgent", "immediately", "emergency", "asap", "critical"]
    frustrated_words = ["frustrated", "angry", "disappointed", "fed up", "worst"]
    
    if any(word in text_lower for word in urgent_words):
        return "urgent"
    elif any(word in text_lower for word in frustrated_words):
        return "frustrated"
    else:
        return "neutral"
