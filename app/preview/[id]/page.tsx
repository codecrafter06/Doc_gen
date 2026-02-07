'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function PreviewPage() {
  const params = useParams();
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDocs() {
      if (!params.id) {
        setError('Invalid documentation ID');
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`/api/generate?id=${params.id}`);
        
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Failed to load documentation');
          return;
        }
        
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
        } else if (data.markdown) {
          setMarkdown(data.markdown);
        } else {
          setError('Invalid response format');
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDocs();
  }, [params.id]);

  const handleDownload = () => {
    if (!markdown) {
      console.error('No markdown content to download');
      return;
    }
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documentation.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', margin: '0 auto 2rem', filter: 'drop-shadow(0 0 20px rgba(212,255,0,0.6))' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', animation: 'spin 2s linear infinite' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#d4ff00" strokeWidth="2" strokeDasharray="60 200" />
            </svg>
          </div>
          <div style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#666' }}>LOADING DOCUMENTATION</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', fontWeight: '900', color: '#d4ff00', marginBottom: '1.5rem' }}>ERROR</div>
          <div style={{ fontSize: '14px', color: '#888', marginBottom: '2rem' }}>{error}</div>
          <a href="/" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: '#d4ff00', color: '#000', fontSize: '11px', letterSpacing: '0.3em', fontWeight: '700', textDecoration: 'none' }}>
            RETURN HOME
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #111' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#666', marginBottom: '0.25rem' }}>DOCUMENTATION</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fff' }}>PREVIEW</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleDownload}
              style={{ padding: '0.75rem 1.5rem', background: '#d4ff00', color: '#000', border: 'none', fontSize: '10px', letterSpacing: '0.3em', fontWeight: '700', cursor: 'pointer', boxShadow: '0 0 20px rgba(212,255,0,0.3)' }}
            >
              DOWNLOAD
            </button>
            <a
              href="/"
              style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: '#fff', border: '1px solid #222', fontSize: '10px', letterSpacing: '0.3em', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}
            >
              NEW PROJECT
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 3rem' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-2rem', background: 'radial-gradient(circle at center, rgba(212,255,0,0.08), transparent)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>
          
          <div style={{ position: 'relative', padding: '3rem', background: '#050505', border: '1px solid #111' }}>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#fff', margin: 0 }}>
              {markdown}
            </pre>
          </div>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#666' }}>
            GENERATED WITH GEMINI 2.0
          </div>
          <button
            onClick={handleDownload}
            style={{ padding: '1rem 2.5rem', background: '#d4ff00', color: '#000', border: 'none', fontSize: '11px', letterSpacing: '0.3em', fontWeight: '700', cursor: 'pointer', boxShadow: '0 0 30px rgba(212,255,0,0.3)' }}
          >
            DOWNLOAD MARKDOWN
          </button>
        </div>
      </div>
    </div>
  );
}
