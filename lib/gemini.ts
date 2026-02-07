import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY not set - AI features will not work');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeWithGemini(prompt: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Gemini API error:', errorMessage);
    throw new Error(`AI analysis failed: ${errorMessage}`);
  }
}

export async function generateDocumentation(
  projectStructure: any,
  apiSpec?: any
): Promise<string> {
  const prompt = `You are a technical documentation expert. Analyze this project and generate comprehensive documentation.

Project Name: ${projectStructure.name}
Languages: ${projectStructure.languages.join(', ')}
Frameworks: ${projectStructure.frameworks.join(', ')}
Dependencies: ${Object.keys(projectStructure.dependencies || {}).slice(0, 10).join(', ')}

README Content:
${projectStructure.keyFiles?.readme || 'No README found'}

${apiSpec && apiSpec.length > 0 ? `API Endpoints Found: ${apiSpec.length}` : ''}

Generate a concise technical documentation with:
1. Project Overview (2-3 sentences about what this project does)
2. Key Technologies Used
3. Main Features (if identifiable from README)
4. Setup Instructions (if available)
5. Any notable configurations

Be accurate and only document what you can verify from the provided information.`;

  return analyzeWithGemini(prompt);
}
