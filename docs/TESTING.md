# 🧪 Testing Guide

## Pre-Flight Checklist

Before testing, ensure:
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] Gemini API key in `.env.local`
- [ ] Dev server running (`npm run dev`)
- [ ] Browser open at http://localhost:3000

## Test Cases

### Test 1: GitHub Repository Analysis ⭐ RECOMMENDED

**Input:**
- Type: GitHub
- URL: `https://github.com/vercel/next.js`

**Expected Output:**
- Project name: "next.js"
- Languages: JavaScript, TypeScript
- Frameworks: Next.js, React
- Folder structure displayed
- API endpoints (if any)
- Setup instructions
- Download button works

**Time:** ~30-60 seconds

---

### Test 2: Small GitHub Repo (Faster)

**Input:**
- Type: GitHub
- URL: `https://github.com/sindresorhus/is`

**Expected Output:**
- Quick analysis (< 20 seconds)
- Simple project structure
- Minimal dependencies
- Clear documentation

---

### Test 3: ZIP File Upload

**Preparation:**
1. Create a simple project folder:
```
my-test-project/
├── package.json
├── README.md
└── src/
    └── index.js
```

2. Create `package.json`:
```json
{
  "name": "test-project",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

3. Create `README.md`:
```markdown
# Test Project
A simple test project for documentation generation.
```

4. ZIP the folder

**Input:**
- Type: ZIP
- File: Upload the created ZIP

**Expected Output:**
- Project name: "test-project"
- Dependencies: Express
- Folder structure
- Setup instructions

---

### Test 4: OpenAPI Specification

**Preparation:**
Create `api-spec.json`:
```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "version": "1.0.0"
  },
  "paths": {
    "/users": {
      "get": {
        "summary": "Get all users",
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      }
    }
  }
}
```

**Input:**
- Type: OpenAPI
- File: Upload `api-spec.json`

**Expected Output:**
- API endpoints documented
- GET /users endpoint
- Request/response examples
- Download works

---

## Validation Checklist

After each test, verify:

### UI/UX
- [ ] Loading state shows during analysis
- [ ] No console errors
- [ ] Smooth transitions
- [ ] Responsive design works
- [ ] Dark theme displays correctly

### Documentation Quality
- [ ] Project name is correct
- [ ] Tech stack is accurate
- [ ] Folder structure makes sense
- [ ] Setup instructions are clear
- [ ] No hallucinated information
- [ ] Assumptions are marked

### Functionality
- [ ] Preview page loads
- [ ] Markdown is properly formatted
- [ ] Download button works
- [ ] Downloaded file is valid Markdown
- [ ] "New Project" button returns to home

### AI Integration
- [ ] Gemini API responds
- [ ] Analysis is coherent
- [ ] No generic/template responses
- [ ] Project-specific insights

---

## Troubleshooting Tests

### Test: Invalid GitHub URL

**Input:** `https://github.com/invalid/repo/that/does/not/exist`

**Expected:** Error message displayed

---

### Test: Empty ZIP File

**Input:** Upload empty ZIP

**Expected:** Graceful error handling

---

### Test: Invalid OpenAPI Spec

**Input:** Upload text file as OpenAPI

**Expected:** Parse error with clear message

---

## Performance Benchmarks

| Input Type | Size | Expected Time |
|------------|------|---------------|
| Small GitHub repo | < 10 files | 10-20 sec |
| Medium GitHub repo | 10-100 files | 30-60 sec |
| Large GitHub repo | 100+ files | 1-2 min |
| ZIP file | < 5MB | 15-30 sec |
| OpenAPI spec | < 1MB | 5-10 sec |

---

## Sample Test Repositories

### Recommended for Testing:

1. **Simple:**
   - `https://github.com/sindresorhus/is`
   - `https://github.com/chalk/chalk`

2. **Medium:**
   - `https://github.com/expressjs/express`
   - `https://github.com/axios/axios`

3. **Complex:**
   - `https://github.com/vercel/next.js`
   - `https://github.com/facebook/react`

---

## Success Criteria

✅ **Test Passed If:**
- Documentation generates without errors
- Output is accurate and relevant
- Download works correctly
- UI is responsive and clear
- No console errors
- Performance is acceptable

❌ **Test Failed If:**
- Analysis crashes
- Documentation is generic/hallucinated
- Download doesn't work
- UI breaks or freezes
- Console shows errors
- Takes > 5 minutes

---

## Automated Testing (Future)

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## Reporting Issues

If tests fail, check:
1. Gemini API key is valid
2. Internet connection is stable
3. Node.js version is 18+
4. All dependencies installed
5. No port conflicts (3000)

---

## Next Steps After Testing

1. ✅ All tests pass → Ready for production
2. ⚠️ Some tests fail → Check troubleshooting
3. 🚀 Ready to deploy → See deployment guide

---

Happy Testing! 🎉
