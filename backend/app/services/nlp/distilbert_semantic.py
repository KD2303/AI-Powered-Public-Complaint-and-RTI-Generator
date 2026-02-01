"""
DistilBERT Semantic Engine
Used ONLY for similarity matching and ranking
NOT for generation or classification decisions
"""

from typing import List, Tuple, Optional
import numpy as np

# Model will be loaded on first use
_model = None
_tokenizer = None


def get_model():
    """Lazy load DistilBERT model"""
    global _model, _tokenizer
    
    if _model is None:
        try:
            from transformers import DistilBertModel, DistilBertTokenizer
            
            _tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
            _model = DistilBertModel.from_pretrained('distilbert-base-uncased')
        except Exception as e:
            raise RuntimeError(f"Failed to load DistilBERT: {e}")
    
    return _model, _tokenizer


def get_embedding(text: str) -> np.ndarray:
    """
    Get sentence embedding using DistilBERT.
    Uses mean pooling of last hidden states.
    """
    import torch
    
    model, tokenizer = get_model()
    
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Mean pooling
    embedding = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()
    return embedding


def compute_similarity(text1: str, text2: str) -> float:
    """
    Compute cosine similarity between two texts.
    Returns value between 0 and 1.
    """
    emb1 = get_embedding(text1)
    emb2 = get_embedding(text2)
    
    # Cosine similarity
    similarity = np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))
    return float(similarity)


def rank_by_similarity(query: str, candidates: List[str]) -> List[Tuple[str, float]]:
    """
    Rank candidate texts by similarity to query.
    Returns list of (candidate, score) tuples, sorted by score descending.
    
    USE CASE: Authority matching, template selection
    NOT FOR: Classification decisions (use rule engine)
    """
    query_emb = get_embedding(query)
    
    results = []
    for candidate in candidates:
        cand_emb = get_embedding(candidate)
        score = np.dot(query_emb, cand_emb) / (np.linalg.norm(query_emb) * np.linalg.norm(cand_emb))
        results.append((candidate, float(score)))
    
    results.sort(key=lambda x: x[1], reverse=True)
    return results
