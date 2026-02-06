# 🚀 Quick Setup Guide

## Step 1: Get Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

## Step 2: Configure Environment

Open `.env.local` and add your API key:

```bash
GEMINI_API_KEY=your_actual_api_key_here
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run Development Server

```bash
npm run dev
```

## Step 5: Open Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Test the Application

### Test 1: GitHub Repository
1. Select "GitHub" input type
2. Enter: `https://github.com/vercel/next.js`
3. Click "Generate Documentation"
4. Wait for analysis (may take 30-60 seconds)
5. View and download the generated docs

### Test 2: ZIP Upload
1. Create a ZIP of any project folder
2. Select "ZIP" input type
3. Upload the ZIP file
4. Generate documentation

### Test 3: OpenAPI Spec
1. Get a sample OpenAPI spec (JSON/YAML)
2. Select "OpenAPI" input type
3. Upload the file
4. Generate API documentation

## 📋 Checklist

- [ ] Node.js 18+ installed
- [ ] Gemini API key obtained
- [ ] `.env.local` configured
- [ ] Dependencies installed
- [ ] Dev server running
- [ ] Browser opened to localhost:3000
- [ ] Test with sample repository

## ⚠️ Common Issues

### "GEMINI_API_KEY is not defined"
- Check `.env.local` exists
- Verify API key is correct
- Restart dev server after adding key

### "Module not found"
- Run `npm install` again
- Delete `node_modules` and reinstall
- Check Node.js version (18+)

### "Analysis taking too long"
- Large repositories may take 1-2 minutes
- Check internet connection
- Verify Gemini API quota

## 🎉 You're Ready!

The Documentation Generator Agent is now running. Start analyzing your projects!

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Check [USAGE.md](./USAGE.md) for detailed examples
- Explore the code in `lib/analyzers/`
- Customize prompts in `lib/gemini.ts`

---

Need help? Check the README.md or create an issue.
