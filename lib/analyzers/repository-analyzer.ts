import { ProjectStructure, FileNode } from '../types';
import AdmZip from 'adm-zip';

export class RepositoryAnalyzer {
  async analyzeZip(buffer: Uint8Array): Promise<ProjectStructure> {
    const zip = new AdmZip(Buffer.from(buffer));
    const entries = zip.getEntries();
    
    const files: FileNode[] = [];
    const keyFiles: any = {};
    
    for (const entry of entries) {
      if (entry.isDirectory) continue;
      
      const path = entry.entryName;
      const content = entry.getData().toString('utf8');
      
      files.push({ path, type: 'file', content });
      
      if (path.endsWith('README.md')) keyFiles.readme = content;
      if (path.endsWith('package.json')) {
        try {
          keyFiles.packageJson = JSON.parse(content);
        } catch {}
      }
      if (path.endsWith('Dockerfile')) keyFiles.dockerfile = content;
      if (path.includes('.env.example')) keyFiles.envExample = content;
    }
    
    return this.buildStructure(files, keyFiles);
  }
  
  async analyzeGithub(url: string): Promise<ProjectStructure> {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error('Invalid GitHub URL');
    
    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, '');
    
    // Fetch basic repo info
    const repoInfo = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`);
    if (!repoInfo.ok) {
      throw new Error(`Repository not found: ${repoInfo.status} ${repoInfo.statusText}`);
    }
    
    const repoData = await repoInfo.json();
    
    // Fetch key files only (simplified approach)
    const keyFiles: any = {};
    const files: FileNode[] = [];
    
    // Try to fetch package.json
    try {
      const pkgRes = await fetch(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/main/package.json`);
      if (pkgRes.ok) {
        const pkgText = await pkgRes.text();
        keyFiles.packageJson = JSON.parse(pkgText);
        files.push({ path: 'package.json', type: 'file', content: pkgText });
      }
    } catch {}
    
    // Try master branch if main fails
    if (!keyFiles.packageJson) {
      try {
        const pkgRes = await fetch(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/master/package.json`);
        if (pkgRes.ok) {
          const pkgText = await pkgRes.text();
          keyFiles.packageJson = JSON.parse(pkgText);
          files.push({ path: 'package.json', type: 'file', content: pkgText });
        }
      } catch {}
    }
    
    // Try to fetch README
    try {
      const readmeRes = await fetch(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/main/README.md`);
      if (readmeRes.ok) {
        keyFiles.readme = await readmeRes.text();
      }
    } catch {}
    
    if (!keyFiles.readme) {
      try {
        const readmeRes = await fetch(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/master/README.md`);
        if (readmeRes.ok) {
          keyFiles.readme = await readmeRes.text();
        }
      } catch {}
    }
    
    // Use repo description if no README
    if (!keyFiles.readme && repoData.description) {
      keyFiles.readme = `# ${repoData.name}\n\n${repoData.description}`;
    }
    
    return this.buildStructure(files, keyFiles);
  }
  
  private buildStructure(files: FileNode[], keyFiles: any): ProjectStructure {
    const languages = this.detectLanguages(files);
    const frameworks = this.detectFrameworks(files, keyFiles);
    const dependencies = keyFiles.packageJson?.dependencies || {};
    
    return {
      name: keyFiles.packageJson?.name || 'Project',
      languages,
      frameworks,
      dependencies,
      files,
      keyFiles
    };
  }
  
  private detectLanguages(files: FileNode[]): string[] {
    const extensions = new Set(
      files
        .map(f => f.path.split('.').pop())
        .filter((ext): ext is string => ext !== undefined)
    );
    const langMap: Record<string, string> = {
      ts: 'TypeScript', js: 'JavaScript', py: 'Python',
      java: 'Java', go: 'Go', rs: 'Rust', rb: 'Ruby'
    };
    return [...extensions]
      .map(ext => langMap[ext])
      .filter((lang): lang is string => lang !== undefined);
  }
  
  private detectFrameworks(files: FileNode[], keyFiles: any): string[] {
    const frameworks: string[] = [];
    const deps = { 
      ...(keyFiles.packageJson?.dependencies || {}), 
      ...(keyFiles.packageJson?.devDependencies || {}) 
    };
    
    if (deps.next) frameworks.push('Next.js');
    if (deps.react) frameworks.push('React');
    if (deps.express) frameworks.push('Express');
    if (deps.vue) frameworks.push('Vue');
    if (files.some(f => f.path.includes('Dockerfile'))) frameworks.push('Docker');
    
    return frameworks;
  }
}
