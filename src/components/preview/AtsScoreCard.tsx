'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeData } from '@/lib/types';
import { Sparkles, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Loader2, Gauge } from 'lucide-react';

interface AtsScoreResult {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  summary: string;
  improvements: {
    category: string;
    issue: string;
    fix: string;
    impact: 'high' | 'medium' | 'low';
  }[];
  source?: string;
}

interface AtsScoreCardProps {
  resumeData: ResumeData;
}

export const AtsScoreCard: React.FC<AtsScoreCardProps> = ({ resumeData }) => {
  const [result, setResult] = useState<AtsScoreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/ats-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resumeData }),
      });
      if (!res.ok) throw new Error('Score calculation failed');
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError('Could not calculate ATS score. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
    if (score >= 60) return 'text-[#38BDF8] border-sky-500/30 bg-sky-950/40';
    if (score >= 40) return 'text-amber-400 border-amber-500/30 bg-amber-950/40';
    return 'text-rose-400 border-rose-500/30 bg-rose-950/40';
  };

  const getBadgeColor = (impact: 'high' | 'medium' | 'low') => {
    if (impact === 'high') return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    if (impact === 'medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
  };

  return (
    <div className="bg-[#111214] border border-zinc-800 rounded-2xl p-4 shadow-xl mb-4 transition-all duration-300 print:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#38BDF8] flex items-center justify-center text-white shadow-md shadow-purple-900/20">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white font-heading">ATS Health Scanner</h3>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-purple-950 text-[#7C3AED] border border-[#7C3AED]/30">
                AI Engine
              </span>
            </div>
            <p className="text-xs text-zinc-400">Scan formatting & keyword strength for recruiters</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!result && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={analyzeResume}
              disabled={loading}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-purple-600 hover:from-purple-600 hover:to-[#7C3AED] text-white shadow-md shadow-purple-900/30 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Scan Resume</span>
                </>
              )}
            </motion.button>
          )}

          {result && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-3 text-xs text-rose-400 bg-rose-950/30 border border-rose-800/40 p-2.5 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-3 border-t border-zinc-800/80 space-y-3"
            >
              {/* Score summary bar */}
              <div className="flex items-center justify-between bg-[#0E0F12] p-3 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-extrabold font-heading ${getScoreColor(
                      result.score
                    )}`}
                  >
                    <span className="text-lg leading-none">{result.score}</span>
                    <span className="text-[9px] opacity-80 uppercase tracking-tight">/100</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">Grade {result.grade}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-tight line-clamp-2 mt-0.5">
                      {result.summary}
                    </p>
                  </div>
                </div>

                <button
                  onClick={analyzeResume}
                  disabled={loading}
                  className="text-[11px] font-medium text-[#38BDF8] hover:underline shrink-0 p-1"
                >
                  {loading ? 'Re-scanning...' : 'Re-scan'}
                </button>
              </div>

              {/* Improvements */}
              {result.improvements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Targeted Improvements
                  </h4>
                  {result.improvements.map((imp, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0E0F12] border border-zinc-800/90 rounded-xl p-2.5 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-zinc-200">{imp.category}</span>
                        <span
                          className={`text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded border ${getBadgeColor(
                            imp.impact
                          )}`}
                        >
                          {imp.impact} priority
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[11px]">{imp.issue}</p>
                      <div className="text-[#38BDF8] text-[11px] font-medium flex items-center gap-1 pt-0.5">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span>{imp.fix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
