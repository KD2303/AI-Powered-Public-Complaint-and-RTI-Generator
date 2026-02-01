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

## 🏗️ Architecture

### Design Philosophy
- **Rules decide what is allowed** (structure, mandatory fields, legal format)
- **AI infers what the user means** (intent, document type, authority)
- **Users retain final control** (editable preview, manual overrides)

### Technology Stack
- **Frontend**: React 19
- **State Management**: React Hooks
- **Services Layer**: 
  - Rule Engine (deterministic)
  - AI Inference Layer (provider-agnostic)
  - Draft Assembly Service
  - Submission Guidance Module

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 How to Use

### Guided Mode (For Beginners)
1. Select **Guided Mode** from the home screen
2. Fill in your personal details
3. Answer simple questions about your issue
4. Choose language and tone preferences
5. Review the generated document
6. Get submission instructions

### Assisted Mode (For Advanced Users)
1. Select **Assisted Mode** from the home screen
2. Fill in your personal details
3. Write freely in the issue description box
4. Watch the live draft update on the right panel
5. Enable/disable auto-draft as needed
6. Finalize and edit the document
7. Get submission instructions

## 📂 Project Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ModeSelector.js          # Home screen mode selection
│   │   ├── GuidedMode.js            # Step-by-step guided interface
│   │   ├── AssistedMode.js          # Free-text with live draft
│   │   ├── ApplicantForm.js         # Reusable applicant details form
│   │   ├── DraftPreview.js          # Document preview with editing
│   │   └── SubmissionGuidancePanel.js # Filing instructions
│   ├── services/
│   │   ├── ruleEngine.js            # Document structure rules
│   │   ├── aiInference.js           # AI intent extraction
│   │   ├── draftAssembly.js         # Document generation orchestration
│   │   └── submissionGuidance.js    # Filing guidance logic
│   ├── hooks/
│   │   └── useDebouncedDraft.js     # Debounced live draft hook
│   ├── App.js                       # Main application component
│   └── index.js                     # Application entry point
```

## 🔧 Configuration

### Debounce Delay
The live draft update delay can be configured in `hooks/useDebouncedDraft.js`:
```javascript
const DEBOUNCE_DELAY = 1500; // milliseconds
```

### AI Provider Integration
To integrate with an actual AI provider, update the functions in `services/aiInference.js`:
- `extractIntent()`
- `suggestAuthority()`
- `translateToHindi()`

## 🌐 Supported States

All Indian states and union territories are supported:
- 28 States
- 8 Union Territories

## ⚠️ Disclaimer

**This tool provides drafting assistance only.** All generated content is advisory. Users must:
- Review all content carefully
- Edit as needed
- Verify authority addresses
- Submit as per applicable laws

This tool does NOT provide legal advice or guarantees.

## 🎨 Customization

### Adding New Document Types
1. Define structure in `services/ruleEngine.js`
2. Add generation function
3. Update classification logic

### Adding Languages
1. Update document generation functions in `ruleEngine.js`
2. Add language option to forms
3. Implement translation service integration

## 📝 License

This project is created for educational and civic purposes.

## 🤝 Contributing

Contributions are welcome! This project aims to make civic participation more accessible.

### Areas for Contribution
- UI/UX improvements
- Additional language support
- Better AI inference
- State-specific portal integrations
- Accessibility enhancements

## 📞 Support

For issues or questions, please refer to the project documentation.

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real AI model integration (OpenAI, Anthropic, etc.)
- [ ] PDF generation
- [ ] Document templates library
- [ ] Historical tracking
- [ ] Multi-language UI
- [ ] Mobile app version

---

**Built with ❤️ for the citizens of India**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
