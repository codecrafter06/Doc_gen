import { NextRequest, NextResponse } from 'next/server';
import { RepositoryAnalyzer } from '@/lib/analyzers/repository-analyzer';
import { APISpecAnalyzer } from '@/lib/analyzers/api-spec-analyzer';
import { DocumentationComposer } from '@/lib/analyzers/documentation-composer';
import { generateDocumentation } from '@/lib/gemini';
import { ProjectStructure } from '@/lib/types';

const docsStore = new Map<string, string>();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const type = formData.get('type') as string;
    
    const repoAnalyzer = new RepositoryAnalyzer();
    const apiAnalyzer = new APISpecAnalyzer();
    const composer = new DocumentationComposer();
    
    let structure: ProjectStructure;
    let endpoints: any[] = [];
    
    if (type === 'github') {
      const url = formData.get('url') as string;
      structure = await repoAnalyzer.analyzeGithub(url);
      endpoints = apiAnalyzer.extractFromCode(structure.files);
    } else if (type === 'zip') {
      const file = formData.get('file') as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      structure = await repoAnalyzer.analyzeZip(buffer);
      endpoints = apiAnalyzer.extractFromCode(structure.files);
    } else if (type === 'openapi') {
      const file = formData.get('file') as File;
      const content = await file.text();
      endpoints = apiAnalyzer.analyzeOpenAPI(content);
      structure = { name: 'API Documentation', languages: [], frameworks: [], dependencies: {}, files: [], keyFiles: {} };
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
    
    const aiAnalysis = await generateDocumentation(structure, endpoints);
    const markdown = composer.compose(structure, endpoints, aiAnalysis);
    
    const id = Date.now().toString();
    docsStore.set(id, markdown);
    
    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  
  const markdown = docsStore.get(id);
  
  if (!markdown) {
    return NextResponse.json({ error: 'Documentation not found' }, { status: 404 });
  }
  
  return NextResponse.json({ markdown });
}
