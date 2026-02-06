import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const format = req.nextUrl.searchParams.get('format') || 'md';
  
  const docs = (global as any).docs || {};
  const markdown = docs[id!];
  
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
  
  return NextResponse.json({ error: 'Format not supported' }, { status: 400 });
}
