# AI-Powered Public Complaint & RTI Generator

A civic tech application that helps Indian citizens draft Right to Information (RTI) applications and public complaints with AI assistance while maintaining human control.

## 🎯 Purpose

This tool addresses the cognitive, structural, and procedural gaps citizens face when filing:
- **RTI Applications** (Right to Information Act, 2005)
- **Public Complaints** to government departments

### Key Features
- ✅ **Dual-Mode Interaction**: Guided mode for beginners, Assisted mode for power users
- ✅ **Live Draft Projection**: See your document form in real-time with debounced updates
- ✅ **Rule-Based Structure**: Deterministic document formatting per legal standards
- ✅ **AI Intent Inference**: Smart detection of document type and requirements
- ✅ **Authority Suggestions**: Get recommendations for the right government office
- ✅ **Bilingual Support**: English and Hindi
- ✅ **Tone Selection**: Neutral, Formal, or Strict but Polite
- ✅ **Editable Preview**: Full control over final document
- ✅ **Submission Guidance**: Step-by-step instructions for filing
- ✅ **Multi-format Export**: PDF, DOCX, and XLSX download options

## 🏗️ Architecture

### Design Philosophy
- **Rules decide what is allowed** (structure, mandatory fields, legal format)
- **AI infers what the user means** (intent, document type, authority)
- **Users retain final control** (editable preview, manual overrides)
- **No database storage** – Privacy-first, stateless design

### Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, React Router DOM, Axios |
| **Backend** | FastAPI, Uvicorn, Pydantic |
| **NLP/AI** | spaCy, DistilBERT (Transformers), scikit-learn |
| **Document Generation** | ReportLab (PDF), python-docx (DOCX), openpyxl (XLSX) |
| **Language Support** | Indic NLP Library, langdetect |

---

## 📂 Project Structure

```
AI-Powered-Public-Complaint-RTI-Generator/
│
├── frontend/                                   # React Frontend
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ApplicantForm/                 # User details + issue input
│   │   │   ├── DraftPreview/                  # Shows generated RTI / Complaint
│   │   │   ├── SubmissionGuidancePanel/       # How & where to submit
│   │   │   ├── ConfidenceNotice/              # AI confidence + user confirmation
│   │   │   └── DownloadPanel/                 # PDF / DOCX / XLSX download
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout/                    # Header, footer, container
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/                          # Landing + explanation
│   │   │   ├── GuidedMode/                    # Rule-first (minimal AI)
│   │   │   └── AssistedMode/                  # NLP-assisted mode
│   │   │
│   │   ├── services/
│   │   │   ├── inferenceService.js            # Calls /infer API
│   │   │   ├── draftService.js                # Calls /draft API
│   │   │   └── authorityService.js            # Calls /authority API
│   │   │
│   │   ├── hooks/
│   │   │   └── useDebounce.js
│   │   │
│   │   ├── utils/
│   │   │   └── fileDownload.js                # Blob → file logic
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── package.json
│   └── README.md
│
├── backend/                                    # Python Backend (FastAPI, stateless)
│   ├── app/
│   │   ├── main.py                            # FastAPI entry point
│   │   │
│   │   ├── api/                               # HTTP routes
│   │   │   ├── infer.py                       # Intent + NLP inference
│   │   │   ├── draft.py                       # Draft generation
│   │   │   ├── authority.py                   # Authority suggestion
│   │   │   └── download.py                    # PDF / DOCX / XLSX export
│   │   │
│   │   ├── services/                          # Core business logic
│   │   │   ├── rule_engine/                   # 🔒 PRIMARY DECISION LAYER
│   │   │   │   ├── intent_rules.py            # RTI vs Complaint vs Appeal
│   │   │   │   ├── legal_triggers.py          # RTI sections, grievance markers
│   │   │   │   └── issue_rules.py             # Issue → department mapping
│   │   │   │
│   │   │   ├── nlp/                           # 🔒 STRICTLY BOUNDED AI
│   │   │   │   ├── spacy_engine.py            # NER + phrase rules (CORE)
│   │   │   │   ├── distilbert_semantic.py     # Similarity / ranking ONLY
│   │   │   │   └── confidence_gate.py         # Confidence thresholds & fallback
│   │   │   │
│   │   │   ├── authority_resolver.py          # Deterministic authority logic
│   │   │   ├── draft_assembler.py             # Fills legal templates
│   │   │   ├── document_generator.py          # PDF / DOCX / XLSX creation
│   │   │   └── audit_logger.py                # Explainability & decision logs
│   │   │
│   │   ├── schemas/                           # Pydantic request/response contracts
│   │   │   ├── applicant.py
│   │   │   ├── issue.py
│   │   │   ├── inference.py                   # Intent + confidence schema
│   │   │   └── draft.py
│   │   │
│   │   ├── templates/                         # NON-AI legal content
│   │   │   ├── rti/
│   │   │   │   ├── information_request.txt
│   │   │   │   ├── records_request.txt
│   │   │   │   └── inspection_request.txt
│   │   │   │
│   │   │   └── complaint/
│   │   │       ├── grievance.txt
│   │   │       ├── escalation.txt
│   │   │       └── follow_up.txt
│   │   │
│   │   ├── utils/
│   │   │   ├── language_normalizer.py         # Indian language cleanup
│   │   │   ├── text_sanitizer.py              # PII safety + cleanup
│   │   │   └── tone.py                        # Neutral / assertive tone
│   │   │
│   │   └── config.py                          # Env + app config
│   │
│   ├── requirements.txt
│   └── README.md
│
├── ml/                                        # 🔒 MODEL ASSETS ONLY (NO LOGIC)
│   ├── spacy/
│   │   ├── custom_ner/                        # Trained entities (ORG, DEPT, DATE)
│   │   └── patterns/                          # Phrase & matcher rules
│   │
│   ├── distilbert/
│   │   └── embeddings_cache/                  # Optional caching
│   │
│   └── MODEL_USAGE_POLICY.md                  # 🚨 Non-negotiable AI rules
│
├── docs/                                      # Documentation & justification
│   ├── architecture.md                        # System overview
│   ├── decision_flow.md                       # Rule → NLP → fallback flow
│   ├── ai_safety_notes.md                     # Why AI is bounded
│   ├── privacy_policy.md                      # No-DB, no-storage explanation
│   └── future_scope.md                        # Clearly marked optional features
│
├── .env.example                               # Environment variables template
├── README.md                                  # Project overview
└── LICENSE
```

---

## 📦 Requirements

### Backend (Python)

```txt
# Core Framework
fastapi
uvicorn[standard]
pydantic
python-dotenv
loguru

# NLP & AI
spacy
spacy-lookups-data
transformers
torch
numpy
scikit-learn

# Indic Language Support
indic-nlp-library
langdetect
regex
unidecode
python-dateutil

# Document Generation
reportlab
python-docx
openpyxl
aiofiles

# Testing
pytest
```

### Frontend (Node.js)

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "react-toastify": "^10.x",
    "file-saver": "^2.x"
  }
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ (for frontend)
- **Python** 3.10+ (for backend)
- **pip** or **conda** for Python packages

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Copy environment file
cp ../.env.example .env

# Start the server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 How to Use

### Guided Mode (For Beginners)
1. Select **Guided Mode** from the home screen
2. Fill in your personal details
3. Answer simple questions about your issue
4. Choose language and tone preferences
5. Review the generated document
6. Download as PDF/DOCX/XLSX
7. Get submission instructions

### Assisted Mode (For Advanced Users)
1. Select **Assisted Mode** from the home screen
2. Fill in your personal details
3. Write freely in the issue description box
4. Watch the live draft update on the right panel
5. Enable/disable auto-draft as needed
6. Finalize and edit the document
7. Download in your preferred format
8. Get submission instructions

---

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/infer` | POST | Analyze text and infer intent/document type |
| `/api/draft` | POST | Generate draft document |
| `/api/authority` | POST | Get authority suggestions |
| `/api/download/pdf` | POST | Export as PDF |
| `/api/download/docx` | POST | Export as DOCX |
| `/api/download/xlsx` | POST | Export as XLSX |

---

## 🔒 AI Safety & Boundaries

This project follows strict AI boundaries:

1. **Rule Engine is Primary** – All structural decisions are rule-based
2. **AI is Advisory Only** – NLP assists but doesn't decide
3. **Confidence Gating** – Low-confidence results require user confirmation
4. **No Hallucination Risk** – Templates are human-written, AI only fills placeholders
5. **Full Transparency** – Users see confidence scores and can override

See [docs/ai_safety_notes.md](docs/ai_safety_notes.md) for detailed policy.

---

## 🌐 Supported States

All Indian states and union territories are supported:
- 28 States
- 8 Union Territories

---

## ⚠️ Disclaimer

**This tool provides drafting assistance only.** All generated content is advisory. Users must:
- Review all content carefully
- Edit as needed
- Verify authority addresses
- Submit as per applicable laws

This tool does NOT provide legal advice or guarantees.

---

## 🤝 Contributing

Contributions are welcome! This project aims to make civic participation more accessible.

### Areas for Contribution
- UI/UX improvements
- Additional language support (regional Indian languages)
- Better NER training for Indian government entities
- State-specific portal integrations
- Accessibility enhancements
- Test coverage

---

## 📝 License

This project is created for educational and civic purposes.

---

## 🔮 Future Enhancements

- [ ] Regional language UI (Tamil, Telugu, Bengali, etc.)
- [ ] Voice input support
- [ ] Mobile app (React Native)
- [ ] Integration with government portals
- [ ] Appeal tracking system
- [ ] Community-contributed templates

---

**Built with ❤️ for the citizens of India**
