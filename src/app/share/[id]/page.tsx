'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TemplateRenderer } from '@/components/preview/TemplateRenderer';
import { ExportPdfButton } from '@/components/preview/ExportPdfButton';
import { ResumeData, TemplateId } from '@/lib/types';
import { Sparkles, ArrowRight, Layers, AlertCircle, Share2, Check } from 'lucide-react';

export default function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadResume() {
      try {
        setLoading(true);
        const res = await fetch(`/api/share/${id}`);
        if (!res.ok) throw new Error('Resume not found');
        const data = await res.json();
        setResumeData(data);
      } catch (err: any) {
        setError(err.message || 'Could not load public resume link.');
      } finally {
        setLoading(false);
      }
    }
    loadResume();
  }, [id]);

  const handleTemplateChange = (templateId: TemplateId) => {
    if (resumeData) {
      setResumeData({ ...resumeData, templateId });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F5] flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white">
      {/* Top Bar */}
      <header className="w-full border-b border-zinc-900 bg-[#0A0A0B]/90 backdrop-blur-md sticky top-0 z-50 px-4 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-purple-500 to-[#38BDF8] flex items-center justify-center shadow-lg shadow-purple-900/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight font-heading hidden sm:inline">
              Shinex <span className="text-[#38BDF8]">AI</span>
            </span>
          </Link>

          {resumeData && (
            <div className="flex items-center gap-3">
              {/* Template Switcher */}
              <div className="hidden md:flex items-center gap-1.5 bg-[#111214] border border-zinc-800 p-1 rounded-xl">
                {(['minimal-white', 'elite-black', 'modern-glass'] as TemplateId[]).map((tId) => (
                  <button
                    key={tId}
                    onClick={() => handleTemplateChange(tId)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all capitalize ${resumeData.templateId === tId
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                  >
                    {tId.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Share link button */}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-xs px-3 py-2 rounded-xl border border-zinc-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share Link'}</span>
              </button>

              <ExportPdfButton data={resumeData} />
            </div>
          )}

          <Link
            href="/editor"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:from-purple-600 hover:to-[#7C3AED] text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md shadow-purple-900/30 transition-all shrink-0"
          >
            <span>Create Yours</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8">
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#111214] border border-zinc-800 flex items-center justify-center shadow-xl">
              <Sparkles className="w-6 h-6 text-[#7C3AED] animate-pulse" />
            </div>
            <p className="text-zinc-400 text-sm font-medium">Loading professional resume identity...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/40 border border-rose-800/40 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white font-heading">Resume Not Found</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">{error}</p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg"
            >
              <span>Build New Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {!loading && !error && resumeData && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-[800px] shadow-2xl rounded-xl overflow-hidden border border-zinc-800 bg-[#111214]">
              <TemplateRenderer data={resumeData} />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
