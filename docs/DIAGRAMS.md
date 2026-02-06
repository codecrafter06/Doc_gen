# System Flow Diagram

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                     (Next.js App Router)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │   Home Page  │───▶│  Preview     │───▶│   Download   │    │
│  │  (Upload)    │    │   Page       │    │    Page      │    │
│  └──────────────┘    └──────────────┘    └──────────────┘    │
│         │                    ▲                    ▲            │
└─────────┼────────────────────┼────────────────────┼────────────┘
          │                    │                    │
          ▼                    │                    │
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                               │
│                    (Route Handlers)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────┐    ┌──────────────────────────┐ │
│  │   POST /api/analyze      │    │  GET /api/generate       │ │
│  │  - Validate input        │    │  - Retrieve docs         │ │
│  │  - Orchestrate services  │    │  - Format response       │ │
│  │  - Return doc ID         │    │  - Send file             │ │
│  └──────────────────────────┘    └──────────────────────────┘ │
│              │                                                  │
└──────────────┼──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                              │
│                   (Business Logic)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────┐  ┌────────────────────┐               │
│  │ Repository         │  │ API Spec           │               │
│  │ Analyzer           │  │ Analyzer           │               │
│  │ - Parse GitHub     │  │ - Parse OpenAPI    │               │
│  │ - Extract ZIP      │  │ - Extract routes   │               │
│  │ - Detect langs     │  │ - Find endpoints   │               │
│  │ - Find frameworks  │  │ - Parse schemas    │               │
│  └────────────────────┘  └────────────────────┘               │
│           │                       │                             │
│           └───────────┬───────────┘                             │
│                       ▼                                         │
│           ┌────────────────────────┐                           │
│           │  Documentation         │                           │
│           │  Composer              │                           │
│           │  - Combine results     │                           │
│           │  - Format markdown     │                           │
│           │  - Structure output    │                           │
│           └────────────────────────┘                           │
│                       │                                         │
└───────────────────────┼─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AI LAYER                                   │
│                 (Gemini Integration)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Google Gemini 2.5 Flash                                 │ │
│  │  - Enhance documentation                                 │ │
│  │  - Generate descriptions                                 │ │
│  │  - Ensure accuracy                                       │ │
│  │  - Add context                                           │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
INPUT
  │
  ├─ GitHub URL ──────┐
  ├─ ZIP File ────────┼──▶ Repository Analyzer
  └─ OpenAPI Spec ────┘
                      │
                      ▼
              Project Structure
                      │
                      ├──▶ Language Detection
                      ├──▶ Framework Detection
                      ├──▶ Dependency Extraction
                      └──▶ Key File Identification
                      │
                      ▼
              API Spec Analyzer
                      │
                      ├──▶ Endpoint Discovery
                      ├──▶ Method Extraction
                      └──▶ Schema Parsing
                      │
                      ▼
              Gemini AI Enhancement
                      │
                      ├──▶ Context Analysis
                      ├──▶ Description Generation
                      └──▶ Accuracy Verification
                      │
                      ▼
              Documentation Composer
                      │
                      ├──▶ Markdown Formatting
                      ├──▶ Section Organization
                      └──▶ Final Assembly
                      │
                      ▼
                   OUTPUT
                      │
                      ├──▶ Preview Page
                      └──▶ Download File
```

## Component Interaction

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Upload/Submit
       ▼
┌─────────────┐
│  Home Page  │
└──────┬──────┘
       │ 2. POST FormData
       ▼
┌─────────────────┐
│ /api/analyze    │◀─────┐
└──────┬──────────┘      │
       │ 3. Analyze       │
       ▼                  │
┌─────────────────┐      │
│   Analyzers     │      │
│  - Repository   │      │
│  - API Spec     │      │
└──────┬──────────┘      │
       │ 4. Structure     │
       ▼                  │
┌─────────────────┐      │
│  Gemini AI      │      │
│  Enhancement    │      │
└──────┬──────────┘      │
       │ 5. Enhanced      │
       ▼                  │
┌─────────────────┐      │
│   Composer      │      │
│  (Markdown)     │      │
└──────┬──────────┘      │
       │ 6. Store         │
       └──────────────────┘
       │ 7. Return ID
       ▼
┌─────────────────┐
│  Preview Page   │
└──────┬──────────┘
       │ 8. Display
       ▼
┌─────────────────┐
│  User Views     │
│  & Downloads    │
└─────────────────┘
```

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│  React 19 + Next.js 16 + Tailwind 4    │
└─────────────────────────────────────────┘
                  │
┌─────────────────────────────────────────┐
│         APPLICATION LAYER               │
│  TypeScript + Server Actions            │
└─────────────────────────────────────────┘
                  │
┌─────────────────────────────────────────┐
│         BUSINESS LOGIC LAYER            │
│  Analyzers + Composers + Services       │
└─────────────────────────────────────────┘
                  │
┌─────────────────────────────────────────┐
│         INTEGRATION LAYER               │
│  Google Gemini AI + GitHub API          │
└─────────────────────────────────────────┘
                  │
┌─────────────────────────────────────────┐
│         DATA LAYER                      │
│  In-Memory Storage (Extensible)         │
└─────────────────────────────────────────┘
```

## File Processing Pipeline

```
GitHub URL
    │
    ▼
┌─────────────┐
│ Fetch Repo  │
│   via API   │
└──────┬──────┘
       │
       ▼
┌─────────────┐      ZIP File
│  File List  │◀─────────┐
└──────┬──────┘          │
       │                 │
       ▼                 ▼
┌─────────────┐    ┌─────────────┐
│ Extract Key │    │  Unzip &    │
│   Files     │    │  Extract    │
└──────┬──────┘    └──────┬──────┘
       │                  │
       └────────┬─────────┘
                ▼
       ┌─────────────────┐
       │  Parse Content  │
       │  - package.json │
       │  - README.md    │
       │  - Dockerfile   │
       │  - .env.example │
       └────────┬────────┘
                ▼
       ┌─────────────────┐
       │  Build Project  │
       │   Structure     │
       └────────┬────────┘
                ▼
       ┌─────────────────┐
       │  Send to AI     │
       │  for Analysis   │
       └────────┬────────┘
                ▼
       ┌─────────────────┐
       │  Generate Docs  │
       └─────────────────┘
```

## Error Handling Flow

```
User Input
    │
    ▼
┌─────────────┐
│  Validate   │──✗──▶ Show Error
└──────┬──────┘
       │ ✓
       ▼
┌─────────────┐
│   Process   │──✗──▶ Catch & Log
└──────┬──────┘
       │ ✓
       ▼
┌─────────────┐
│  AI Call    │──✗──▶ Fallback Mode
└──────┬──────┘
       │ ✓
       ▼
┌─────────────┐
│  Generate   │──✗──▶ Retry Logic
└──────┬──────┘
       │ ✓
       ▼
   Success!
```

---

This diagram shows the complete system architecture and data flow of the Documentation Generator Agent.
