# Test Instructions

## The application is already running on http://localhost:3000

### To test:

1. Open your browser to: http://localhost:3000

2. Test with a simple GitHub repository:
   - Enter: `https://github.com/sindresorhus/is`
   - Click "Generate Documentation"
   - Wait 10-20 seconds
   - You should see the documentation preview

### If you see a blank screen:

1. Open browser console (F12)
2. Check for errors
3. Verify the API key is set in `.env.local`

### To restart the server:

```bash
# Stop the current server (Ctrl+C in the terminal where it's running)
# Then run:
npm run dev
```

### Quick Test URLs:

- Small repo (fast): `https://github.com/sindresorhus/is`
- Medium repo: `https://github.com/chalk/chalk`

### Expected Flow:

1. Home page → Enter GitHub URL
2. Click "Generate Documentation" → Shows loading spinner
3. Redirects to `/preview/[id]` → Shows "Loading documentation..."
4. Documentation appears → Can download as Markdown

### If it's not working:

Check the terminal where `npm run dev` is running for error messages.
