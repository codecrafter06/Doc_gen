export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const type = formData.get('type');

    if (!type || typeof type !== 'string') {
      return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }

    const repoAnalyzer = new RepositoryAnalyzer();
    const apiAnalyzer = new APISpecAnalyzer();
    const composer = new DocumentationComposer();

    let structure: ProjectStructure;
    let endpoints: any[] = [];

    if (type === 'github') {
      const url = formData.get('url');

      if (!url || typeof url !== 'string') {
        return NextResponse.json({ error: 'GitHub URL required' }, { status: 400 });
      }

      structure = await repoAnalyzer.analyzeGithub(url);
      endpoints = apiAnalyzer.extractFromCode(structure.files);

    } else if (type === 'zip') {
      const file = formData.get('file');

      if (!(file instanceof File)) {
        return NextResponse.json({ error: 'ZIP file required' }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      structure = await repoAnalyzer.analyzeZip(buffer);
      endpoints = apiAnalyzer.extractFromCode(structure.files);

    } else if (type === 'openapi') {
      const file = formData.get('file');

      if (!(file instanceof File)) {
        return NextResponse.json({ error: 'OpenAPI file required' }, { status: 400 });
      }

      const content = await file.text();
      endpoints = apiAnalyzer.analyzeOpenAPI(content);

      structure = {
        name: 'API Documentation',
        languages: [],
        frameworks: [],
        dependencies: {},
        files: [],
        keyFiles: {},
      };

    } else {
      return NextResponse.json({ error: 'Unsupported type' }, { status: 400 });
    }

    const aiAnalysis = await generateDocumentation(structure, endpoints);

    const markdown = composer.compose(structure, endpoints, aiAnalysis);

    const id = Date.now().toString();
    docsStore.set(id, markdown);

    return NextResponse.json({ id, success: true });

  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
