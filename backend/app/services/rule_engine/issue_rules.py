"""
Issue Rules - Maps issues to departments
Deterministic mapping for common issue categories
"""

from typing import Dict, List, Optional

# Issue category to department mapping
ISSUE_DEPARTMENT_MAP = {
    "electricity": {
        "departments": ["State Electricity Board", "DISCOM", "Power Department"],
        "keywords": ["electricity", "power", "meter", "billing", "load shedding", "transformer"]
    },
    "water": {
        "departments": ["Water Supply Department", "Municipal Corporation", "Jal Board"],
        "keywords": ["water", "water supply", "pipeline", "sewage", "drainage"]
    },
    "roads": {
        "departments": ["PWD", "Municipal Corporation", "NHAI"],
        "keywords": ["road", "pothole", "highway", "street", "footpath"]
    },
    "education": {
        "departments": ["Education Department", "School Board", "University"],
        "keywords": ["school", "college", "education", "admission", "fees", "certificate"]
    },
    "health": {
        "departments": ["Health Department", "Hospital Administration", "Medical Board"],
        "keywords": ["hospital", "health", "medical", "doctor", "medicine", "treatment"]
    },
    "police": {
        "departments": ["Police Department", "SP Office", "Police Commissioner"],
        "keywords": ["police", "fir", "crime", "theft", "harassment", "safety"]
    },
    "land": {
        "departments": ["Revenue Department", "Land Records", "Tehsildar"],
        "keywords": ["land", "property", "registry", "mutation", "encroachment"]
    },
    "transport": {
        "departments": ["RTO", "Transport Department", "Traffic Police"],
        "keywords": ["vehicle", "license", "registration", "traffic", "bus", "transport"]
    },
    "ration": {
        "departments": ["Food & Civil Supplies", "PDS Office"],
        "keywords": ["ration", "pds", "food", "fair price", "aadhar", "ration card"]
    },
    "pension": {
        "departments": ["Pension Department", "Treasury Office"],
        "keywords": ["pension", "retirement", "epf", "gratuity"]
    }
}


def map_issue_to_department(text: str) -> Dict:
    """
    Map user's issue description to relevant departments.
    Returns matched departments with confidence.
    """
    text_lower = text.lower()
    matches = []
    
    for category, data in ISSUE_DEPARTMENT_MAP.items():
        keyword_matches = sum(1 for kw in data["keywords"] if kw in text_lower)
        if keyword_matches > 0:
            matches.append({
                "category": category,
                "departments": data["departments"],
                "confidence": min(0.9, 0.4 + (keyword_matches * 0.15)),
                "keyword_matches": keyword_matches
            })
    
    # Sort by confidence
    matches.sort(key=lambda x: x["confidence"], reverse=True)
    
    return {
        "matches": matches[:3],  # Top 3 matches
        "primary_category": matches[0]["category"] if matches else None,
        "primary_departments": matches[0]["departments"] if matches else []
    }
