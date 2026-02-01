"""
Confidence Gate
Controls when AI predictions are used vs when user confirmation is required
"""

from typing import Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum


class ConfidenceLevel(Enum):
    HIGH = "high"        # > 0.9 - Auto-apply
    MEDIUM = "medium"    # 0.7 - 0.9 - Suggest with highlight
    LOW = "low"          # 0.5 - 0.7 - Show alternatives
    VERY_LOW = "very_low"  # < 0.5 - Manual input required


@dataclass
class GatedResult:
    """Result with confidence gating applied"""
    value: Any
    confidence: float
    level: ConfidenceLevel
    requires_confirmation: bool
    alternatives: list
    explanation: str


# Thresholds (configurable)
THRESHOLDS = {
    "high": 0.9,
    "medium": 0.7,
    "low": 0.5
}


def get_confidence_level(confidence: float) -> ConfidenceLevel:
    """Determine confidence level from score"""
    if confidence >= THRESHOLDS["high"]:
        return ConfidenceLevel.HIGH
    elif confidence >= THRESHOLDS["medium"]:
        return ConfidenceLevel.MEDIUM
    elif confidence >= THRESHOLDS["low"]:
        return ConfidenceLevel.LOW
    else:
        return ConfidenceLevel.VERY_LOW


def gate_result(
    value: Any,
    confidence: float,
    alternatives: list = None,
    context: str = ""
) -> GatedResult:
    """
    Apply confidence gating to a result.
    Determines if user confirmation is needed.
    """
    level = get_confidence_level(confidence)
    
    requires_confirmation = level in [ConfidenceLevel.LOW, ConfidenceLevel.VERY_LOW]
    
    explanations = {
        ConfidenceLevel.HIGH: f"High confidence ({confidence:.0%}) - auto-applied",
        ConfidenceLevel.MEDIUM: f"Medium confidence ({confidence:.0%}) - please verify",
        ConfidenceLevel.LOW: f"Low confidence ({confidence:.0%}) - please select from options",
        ConfidenceLevel.VERY_LOW: f"Very low confidence ({confidence:.0%}) - manual input recommended"
    }
    
    return GatedResult(
        value=value,
        confidence=confidence,
        level=level,
        requires_confirmation=requires_confirmation,
        alternatives=alternatives or [],
        explanation=explanations[level]
    )


def should_use_nlp(rule_confidence: float) -> bool:
    """
    Decide if NLP should be invoked.
    Only use NLP if rule engine has low confidence.
    """
    return rule_confidence < THRESHOLDS["medium"]
