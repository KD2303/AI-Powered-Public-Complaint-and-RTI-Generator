"""
Legal Triggers - RTI Act sections and grievance markers
"""

from typing import List, Dict

# RTI Act 2005 sections that may be relevant
RTI_SECTIONS = {
    "section_6": {
        "title": "Request for obtaining information",
        "triggers": ["application", "request", "seeking information"],
        "description": "Standard RTI application under Section 6(1)"
    },
    "section_7": {
        "title": "Disposal of request",
        "triggers": ["30 days", "time limit", "no response"],
        "description": "Timeline for response (30 days)"
    },
    "section_8": {
        "title": "Exemption from disclosure",
        "triggers": ["exemption", "cannot disclose", "refused"],
        "description": "Information exempt from disclosure"
    },
    "section_19": {
        "title": "Appeal",
        "triggers": ["appeal", "first appeal", "second appeal"],
        "description": "Appeal against decisions"
    }
}

# Grievance markers for complaints
GRIEVANCE_MARKERS = {
    "service_delay": {
        "triggers": ["delay", "pending", "waiting", "no action"],
        "severity": "medium"
    },
    "corruption": {
        "triggers": ["bribe", "corruption", "money demanded", "illegal payment"],
        "severity": "high"
    },
    "misconduct": {
        "triggers": ["rude behavior", "harassment", "misconduct", "misbehavior"],
        "severity": "high"
    },
    "infrastructure": {
        "triggers": ["broken", "damaged", "not working", "poor condition"],
        "severity": "medium"
    }
}


def detect_legal_triggers(text: str) -> Dict:
    """
    Detect legal triggers in user text.
    Returns relevant sections and markers.
    """
    text_lower = text.lower()
    result = {
        "rti_sections": [],
        "grievance_markers": [],
        "suggested_citations": []
    }
    
    # Check RTI sections
    for section_id, section_data in RTI_SECTIONS.items():
        for trigger in section_data["triggers"]:
            if trigger in text_lower:
                result["rti_sections"].append({
                    "section": section_id,
                    "title": section_data["title"],
                    "description": section_data["description"]
                })
                break
    
    # Check grievance markers
    for marker_id, marker_data in GRIEVANCE_MARKERS.items():
        for trigger in marker_data["triggers"]:
            if trigger in text_lower:
                result["grievance_markers"].append({
                    "type": marker_id,
                    "severity": marker_data["severity"]
                })
                break
    
    return result
