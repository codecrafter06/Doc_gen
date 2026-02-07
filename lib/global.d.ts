declare global {
  var docs: Record<string, string>;
  
  namespace NodeJS {
    interface Global {
      docs: Record<string, string>;
    }
  }
}

export {};
