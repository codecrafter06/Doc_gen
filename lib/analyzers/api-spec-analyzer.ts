import { APIEndpoint } from '../types';
import yaml from 'js-yaml';

export class APISpecAnalyzer {
  analyzeOpenAPI(spec: string): APIEndpoint[] {
    let parsed: any;
    
    try {
      parsed = JSON.parse(spec);
    } catch {
      try {
        parsed = yaml.load(spec, { schema: yaml.JSON_SCHEMA });
      } catch (error) {
        throw new Error('Invalid OpenAPI spec: must be valid JSON or YAML');
      }
    }
    
    const endpoints: APIEndpoint[] = [];
    const paths = parsed.paths || {};
    
    for (const [path, methods] of Object.entries(paths)) {
      if (!methods || typeof methods !== 'object') continue;
      
      for (const [method, details] of Object.entries(methods as Record<string, any>)) {
        if (!details || typeof details !== 'object') continue;
        
        endpoints.push({
          path,
          method: method.toUpperCase(),
          description: (details as any).summary || (details as any).description,
          parameters: (details as any).parameters,
          requestBody: (details as any).requestBody,
          responses: (details as any).responses
        });
      }
    }
    
    return endpoints;
  }
  
  extractFromCode(files: any[]): APIEndpoint[] {
    const endpoints: APIEndpoint[] = [];
    
    // Look for Next.js API routes
    const apiFiles = files.filter(f => 
      f.path.includes('/api/') || f.path.includes('/app/api/')
    );
    
    for (const file of apiFiles) {
      const methods = this.extractMethods(file.content);
      const path = this.pathFromFile(file.path);
      
      for (const method of methods) {
        endpoints.push({
          path,
          method,
          description: `Endpoint at ${path}`
        });
      }
    }
    
    return endpoints;
  }
  
  private extractMethods(content: string): string[] {
    const methods: string[] = [];
    if (content.includes('export async function GET')) methods.push('GET');
    if (content.includes('export async function POST')) methods.push('POST');
    if (content.includes('export async function PUT')) methods.push('PUT');
    if (content.includes('export async function DELETE')) methods.push('DELETE');
    if (content.includes('export async function PATCH')) methods.push('PATCH');
    return methods;
  }
  
  private pathFromFile(filePath: string): string {
    const match = filePath.match(/\/api\/(.+)\/route\.(ts|js)/);
    return match ? `/api/${match[1]}` : filePath;
  }
}
