import { NextRequest, NextResponse } from 'next/server';

// Use Node.js runtime for consistency
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const format = req.nextUrl.searchParams.get('format') || 'md';
  
  if (!id) {
    return NextResponse.json({ error: 'ID parameter required' }, { status: 400 });
  }
  
  const docs = global.docs || {};
  const markdown = docs[id];
  
  if (!markdown) {
    return NextResponse.json({ error: 'Documentation not found' }, { status: 404 });
  }
  
  if (format === 'md') {
    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': `attachment; filename="documentation.md"`
      }
    });
  }
  
  // Return as JSON for preview
  return NextResponse.json({ markdown });
}
