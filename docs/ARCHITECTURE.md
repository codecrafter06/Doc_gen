# System Architecture

## Overview

The Documentation Generator Agent is built using a modular, service-oriented architecture that separates concerns and enables extensibility.

## Core Components

### 1. Frontend Layer (Next.js App Router)

**Pages:**
- `app/page.tsx` - Home page with input interface
- `app/preview/[id]/page.tsx` - Documentation preview and download

**Features:**
- Client-side form handling
- File upload support
- Real-time loading states
- Responsive design with Tailwind CSS

### 2. API Layer (Next.js Route Handlers)

**Endpoints:**
- `POST /api/analyze` - Accepts input, orchestrates analysis, returns doc ID
- `GET /api/generate` - Downloads generated documentation

**Responsibilities:**
- Request validation
- Service orchestration
- Error handling
- Response formatting

### 3. Service Layer (Analyzers)

#### RepositoryAnalyzer
```typescript
class RepositoryAnalyzer {
  analyzeZip(buffer: Buffer): ProjectStructure
  analyzeGithub(url: string): ProjectStructure
  private buildStructure()
  private detectLanguages()
  private detectFrameworks()
}
```

**Purpose:** Extract project structure, languages, frameworks, and key files

#### APISpecAnalyzer
```typescript
class APISpecAnalyzer {
  analyzeOpenAPI(spec: string): APIEndpoint[]
  extractFromCode(files: any[]): APIEndpoint[]
  private extractMethods()
  private pathFromFile()
}
```

**Purpose:** Parse OpenAPI specs and extract API endpoints from code

#### DocumentationComposer
```typescript
class DocumentationComposer {
  compose(structure, endpoints, aiAnalysis): string
  private generateTree()
  private extractEnvVars()
  private formatEndpoints()
}
```

**Purpose:** Combine analysis results into structured Markdown

### 4. AI Integration Layer

**Gemini Service:**
```typescript
analyzeWithGemini(prompt: string): Promise<string>
generateDocumentation(structure, apiSpec): Promise<string>
```

**Purpose:** 
- Enhance documentation with AI insights
- Generate human-readable descriptions
- Ensure accuracy through structured prompts

## Data Flow

```
User Input (GitHub URL / ZIP / OpenAPI)
    ↓
API Route Handler (/api/analyze)
    ↓
Repository/API Analyzer
    ↓
Project Structure Extraction
    ↓
Gemini AI Enhancement
    ↓
Documentation Composer
    ↓
Markdown Output
    ↓
Preview Page + Download
```

## Design Decisions

### 1. Modular Services
Each analyzer is independent and can be extended without affecting others.

### 2. AI-Enhanced, Not AI-Dependent
The system extracts real data first, then uses AI to enhance readability.

### 3. Type Safety
TypeScript interfaces ensure data consistency across layers.

### 4. Stateless API
Documentation stored in memory (can be replaced with database).

### 5. Progressive Enhancement
Works without JavaScript for basic functionality.

## Extensibility Points

### Adding New Input Types
1. Create new analyzer in `lib/analyzers/`
2. Add case in `api/analyze/route.ts`
3. Update UI in `app/page.tsx`

### Adding New Output Formats
1. Extend `DocumentationComposer`
2. Add format handler in `api/generate/route.ts`

### Integrating Different AI Models
1. Create new service in `lib/`
2. Update `generateDocumentation()` function

## Security Considerations

- Input validation on all endpoints
- File size limits for uploads
- API key stored in environment variables
- No sensitive data in client-side code

## Performance Optimizations

- Lazy loading of large files
- Streaming responses for large repos
- Caching of analyzed structures
- Parallel processing of file analysis

## Error Handling Strategy

1. **Input Validation** - Fail fast with clear messages
2. **Service Errors** - Graceful degradation
3. **AI Failures** - Fallback to basic documentation
4. **User Feedback** - Clear error states in UI

## Testing Strategy

- Unit tests for analyzers
- Integration tests for API routes
- E2E tests for user flows
- Mock AI responses for consistency

---

This architecture prioritizes:
- ✅ Maintainability
- ✅ Extensibility
- ✅ Type Safety
- ✅ Performance
- ✅ Developer Experience
