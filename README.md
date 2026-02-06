# 📚 Documentation Generator Agent

AI-powered technical documentation generator built with Next.js 16 and Google Gemini 2.0 Flash.

## 🎯 Features

- **Multiple Input Types**
  - GitHub repository URL
  - ZIP folder upload
  - OpenAPI/Swagger spec (JSON/YAML)

- **Smart Analysis**
  - Automatic project structure detection
  - Language and framework identification
  - Dependency extraction
  - API endpoint discovery

- **AI-Enhanced Documentation**
  - Powered by Google Gemini 2.0 Flash
  - Accurate, non-hallucinated content
  - Cross-referenced code analysis
  - Clear assumption marking

- **Professional Output**
  - Project overview
  - Tech stack breakdown
  - Folder structure explanation
  - Setup instructions
  - Environment variables
  - API documentation
  - Error handling notes

## 🏗️ Architecture

```
app/
├── page.tsx                    # Home page with upload interface
├── preview/[id]/page.tsx       # Documentation preview
├── api/
│   ├── analyze/route.ts        # Analysis endpoint
│   └── generate/route.ts       # Download endpoint
lib/
├── analyzers/
│   ├── repository-analyzer.ts  # Code repository analysis
│   ├── api-spec-analyzer.ts    # OpenAPI spec parsing
│   └── documentation-composer.ts # Markdown generation
├── gemini.ts                   # Gemini AI integration
└── types.ts                    # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd doc_gen
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Analyze GitHub Repository
1. Select "GitHub" input type
2. Enter repository URL (e.g., `https://github.com/vercel/next.js`)
3. Click "Generate Documentation"

### Upload ZIP Folder
1. Select "ZIP" input type
2. Upload your project ZIP file
3. Click "Generate Documentation"

### Upload OpenAPI Spec
1. Select "OpenAPI" input type
2. Upload JSON or YAML file
3. Click "Generate Documentation"

## 🔧 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **AI Model:** Google Gemini 2.0 Flash
- **Styling:** Tailwind CSS 4
- **File Processing:** adm-zip, js-yaml

## 📦 Dependencies

```json
{
  "@google/generative-ai": "^latest",
  "adm-zip": "^latest",
  "js-yaml": "^latest",
  "next": "16.1.6",
  "react": "19.2.3"
}
```

## 🎨 Design Principles

1. **Accuracy First** - Cross-reference code instead of guessing
2. **No Hallucinations** - Only document what exists
3. **Clear Assumptions** - Mark inferred information
4. **Extensible** - Modular architecture for future agents
5. **Developer-Focused** - Clean, professional UI

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## 📝 Output Format

Generated documentation includes:

- ✅ Project overview
- ✅ Tech stack analysis
- ✅ Folder structure
- ✅ Setup instructions
- ✅ Environment variables
- ✅ API endpoints (with examples)
- ✅ Error handling notes
- ✅ Assumptions and inferences

## 🚧 Future Enhancements

- [ ] PDF export
- [ ] Database storage
- [ ] GitHub OAuth integration
- [ ] Real-time collaboration
- [ ] Custom templates
- [ ] Multi-language support

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

---

Built with ❤️ using Next.js and Google Gemini AI
