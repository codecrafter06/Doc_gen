export interface ProjectInput {
  type: 'github' | 'zip' | 'openapi';
  data: string | File;
}

export interface ProjectStructure {
  name: string;
  languages: string[];
  frameworks: string[];
  dependencies: Record<string, string>;
  files: FileNode[];
  keyFiles: {
    readme?: string;
    packageJson?: any;
    dockerfile?: string;
    envExample?: string;
  };
}

export interface FileNode {
  path: string;
  type: 'file' | 'directory';
  content?: string;
}

export interface APIEndpoint {
  path: string;
  method: string;
  description?: string;
  parameters?: any[];
  requestBody?: any;
  responses?: Record<string, any>;
}

export interface Documentation {
  projectName: string;
  overview: string;
  techStack: string[];
  folderStructure: string;
  setup: string[];
  envVariables: string[];
  apiEndpoints: APIEndpoint[];
  errorHandling: string;
  assumptions: string[];
}
