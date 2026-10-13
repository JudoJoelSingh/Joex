'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, FileText, CheckCircle2, ArrowLeft, LayoutTemplate, Share2, Check } from 'lucide-react';
import { ExportPdfButton } from '../preview/ExportPdfButton';
import { ResumeData, TemplateId } from '@/lib/types';

interface HeaderProps {
  resumeData?: ResumeData;
  onTemplateChange?: (templateId: TemplateId) => void;
  isSaved?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  resumeData,
  onTemplateChange,
  isSaved = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShareLink = () => {
    if (!resumeData) return;
    const shareUrl = `${window.location.origin}/share/${resumeData.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0B]/90 backdrop-blur-md border-b border-zinc-800 text-white px-4 sm:px-6 py-3 shadow-xl print:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand logo & Title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-purple-500 to-[#38BDF8] flex items-center justify-center shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent font-heading">
              Shinex <span className="text-[#38BDF8]">AI</span>
            </span>
          </Link>

          {resumeData && (
            <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400 border-l border-zinc-800 pl-4">
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="truncate max-w-[180px] font-medium text-zinc-200">
                {resumeData.title || 'Untitled Resume'}
              </span>
              {isSaved && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Saved
                </span>
              )}
            </div>
          )}
        </div>

        {/* Template Selector & Action Controls */}
        <div className="flex items-center gap-2.5">
          {resumeData && onTemplateChange && (
            <div className="flex items-center gap-1.5 bg-[#16181D] border border-zinc-700/80 rounded-xl px-2.5 py-1 shadow-inner">
              <LayoutTemplate className="w-3.5 h-3.5 text-[#38BDF8] hidden sm:inline" />
              <span className="text-[11px] font-semibold text-zinc-400 hidden md:inline">
                Template:
              </span>
              <select
                value={resumeData.templateId || 'minimal-white'}
                onChange={(e) => onTemplateChange(e.target.value as TemplateId)}
                className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer border-none focus:ring-0"
              >
                <option value="minimal-white" className="bg-[#16181D] text-white">
                  Minimal White (ATS)
                </option>
                <option value="elite-black" className="bg-[#16181D] text-white">
                  Elite Black (Luxury)
                </option>
                <option value="modern-glass" className="bg-[#16181D] text-white">
                  Modern Glass (Executive)
                </option>
              </select>
            </div>
          )}

          {resumeData && (
            <button
              onClick={handleShareLink}
              title="Copy Public Link"
              className="inline-flex items-center gap-1.5 bg-[#16181D] hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs px-3 py-2 rounded-xl border border-zinc-700/80 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#38BDF8]" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share Link'}</span>
            </button>
          )}

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-2 rounded-xl hover:bg-zinc-800/80 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          {resumeData && <ExportPdfButton data={resumeData} />}
        </div>
      </div>
    </header>
  );
};
