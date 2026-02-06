'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [type, setType] = useState<'github' | 'zip' | 'openapi'>('github');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('type', type);

    if (type === 'github') {
      formData.append('url', url);
    } else if (file) {
      formData.append('file', file);
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else if (data.id) {
        router.push(`/preview/${data.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to analyze project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative' }}>
      {/* Lime glow effect */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212,255,0,0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
      
      {/* Header */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 3rem', fontSize: '11px', letterSpacing: '0.15em', color: '#666' }}>
        <div>Project</div>
        <div>Services</div>
        <div>Field</div>
      </nav>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#666', marginBottom: '1.5rem' }}>AI-POWERED DOCUMENTATION</div>
          <h1 style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', fontWeight: '900', lineHeight: '0.9', letterSpacing: '-0.02em', margin: '0' }}>
            <span style={{ color: '#fff' }}>DOC</span>
            <span style={{ color: '#d4ff00', textShadow: '0 0 40px rgba(212,255,0,0.5)' }}>GEN</span>
          </h1>
          
          {/* Animated Symbol */}
          <div style={{ margin: '3rem auto', width: '80px', height: '80px' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 20px rgba(212,255,0,0.6))' }}>
              <path d="M50 20 Q30 30 30 50 Q30 70 50 80 Q70 70 70 50 Q70 30 50 20 Z" fill="none" stroke="#d4ff00" strokeWidth="2"/>
              <circle cx="50" cy="50" r="8" fill="#d4ff00"/>
            </svg>
          </div>
        </div>

        {/* Form */}
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            {/* Type Selector */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
              {(['github', 'zip', 'openapi'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    fontWeight: '600',
                    background: type === t ? '#d4ff00' : 'transparent',
                    color: type === t ? '#000' : '#666',
                    border: `1px solid ${type === t ? '#d4ff00' : '#222'}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: type === t ? '0 0 30px rgba(212,255,0,0.3)' : 'none'
                  }}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Input */}
            {type === 'github' ? (
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                required
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  background: 'transparent',
                  border: '1px solid #222',
                  color: '#fff',
                  fontSize: '14px',
                  textAlign: 'center',
                  outline: 'none',
                  marginBottom: '2rem',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#d4ff00'}
                onBlur={(e) => e.target.style.borderColor = '#222'}
              />
            ) : (
              <div style={{ border: '1px dashed #222', padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept={type === 'zip' ? '.zip' : '.json,.yaml,.yml'}
                  required
                  style={{ color: '#666', fontSize: '13px' }}
                />
              </div>
            )}

            {error && (
              <div style={{ padding: '1rem', marginBottom: '2rem', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', color: '#ff6b6b', fontSize: '13px', textAlign: 'center' }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.25rem',
                background: '#d4ff00',
                color: '#000',
                border: 'none',
                fontSize: '11px',
                letterSpacing: '0.3em',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.3s',
                boxShadow: '0 0 40px rgba(212,255,0,0.3)'
              }}
            >
              {loading ? 'ANALYZING...' : 'GENERATE DOCUMENTATION'}
            </button>
          </form>
        </div>
      </main>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: '#111', maxWidth: '1400px', margin: '6rem auto 0', padding: '0 2rem' }}>
        <div style={{ background: '#000', padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#d4ff00', marginBottom: '1rem' }}>01</div>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#666', marginBottom: '0.75rem' }}>SMART ANALYSIS</div>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>Automatic detection of languages, frameworks, and project structure</p>
        </div>
        <div style={{ background: '#000', padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#d4ff00', marginBottom: '1rem' }}>02</div>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#666', marginBottom: '0.75rem' }}>AI ENHANCEMENT</div>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>Powered by Gemini 2.0 for accurate, human-readable documentation</p>
        </div>
        <div style={{ background: '#000', padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#d4ff00', marginBottom: '1rem' }}>03</div>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#666', marginBottom: '0.75rem' }}>EXPORT READY</div>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>Professional Markdown output ready for any platform</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '3rem 2rem', fontSize: '10px', letterSpacing: '0.3em', color: '#666' }}>
        POWERED BY NEXT.JS × GEMINI AI
      </footer>
    </div>
  );
}
