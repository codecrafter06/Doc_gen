# 🚀 DEPLOYMENT QUICK REFERENCE

## ✅ Pre-Deployment Verification

```bash
# 1. Type check
npx tsc --noEmit
# Expected: No errors

# 2. Build
npm run build
# Expected: ✓ Compiled successfully

# 3. Test locally
npm run start
# Expected: Server running on http://localhost:3000
```

---

## 🔑 Environment Variables (REQUIRED)

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key: https://aistudio.google.com/app/apikey

---

## 📦 Vercel Deployment

### Option 1: CLI
```bash
npm install -g vercel
vercel --prod
```

### Option 2: GitHub Integration
1. Push to GitHub
2. Import in Vercel dashboard
3. Add environment variable
4. Deploy

---

## 🧪 Post-Deployment Tests

1. **Home Page:** https://your-domain.vercel.app
2. **GitHub Analysis:** Test with `https://github.com/vercel/next.js`
3. **ZIP Upload:** Upload a small project ZIP
4. **OpenAPI:** Upload a sample OpenAPI spec
5. **Preview:** Verify documentation displays
6. **Download:** Test markdown download

---

## 🐛 Common Issues

### Build Fails
- Check Node.js version (18+)
- Run `npm install` again
- Clear `.next` folder

### API Errors
- Verify `GEMINI_API_KEY` is set
- Check API key is valid
- Check Gemini API quota

### Preview Not Loading
- Check browser console
- Verify documentation was generated
- Check API route logs in Vercel

---

## 📊 Monitoring

### Vercel Dashboard
- Functions → Check API route logs
- Analytics → Monitor performance
- Deployments → View build logs

### Key Metrics
- Response time: < 30s
- Error rate: < 5%
- Success rate: > 95%

---

## 🔄 Quick Fixes

### Clear Cache
```bash
rm -rf .next
npm run build
```

### Reset Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check Logs
```bash
vercel logs [deployment-url]
```

---

## 📞 Emergency Contacts

- Vercel Status: https://vercel-status.com
- Gemini API Status: https://status.cloud.google.com
- GitHub API Status: https://www.githubstatus.com

---

## ✨ Success Criteria

- [x] Build completes without errors
- [x] TypeScript compiles successfully
- [x] All API routes respond
- [x] Documentation generates correctly
- [x] Preview page displays markdown
- [x] Download works

---

**Status:** ✅ READY TO DEPLOY

All systems verified. Deploy with confidence!
