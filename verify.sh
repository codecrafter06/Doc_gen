#!/bin/bash

echo "🔍 Verifying Production Readiness..."
echo ""

# Check if imports exist in route.ts
if grep -q "import { NextRequest, NextResponse } from 'next/server';" app/api/analyze/route.ts; then
    echo "✅ Imports present in route.ts"
else
    echo "❌ Missing imports in route.ts"
    exit 1
fi

# Check TypeScript compilation
echo ""
echo "🔧 Running TypeScript check..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript errors found"
    exit 1
fi

# Check build
echo ""
echo "🏗️  Running production build..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 All checks passed! Ready for deployment."
echo ""
echo "📝 Next steps:"
echo "1. Commit all changes: git add . && git commit -m 'Production fixes'"
echo "2. Push to GitHub: git push origin main"
echo "3. In Vercel dashboard, click 'Redeploy' on the latest deployment"
echo "4. Or trigger new deployment: vercel --prod"
