'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

interface OnboardingBannerProps {
  onSelectSection: (section: any) => void;
}

export const OnboardingBanner: React.FC<OnboardingBannerProps> = ({ onSelectSection }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-6 bg-gradient-to-r from-purple-950/60 via-[#16181D] to-sky-950/60 border border-[#7C3AED]/40 rounded-2xl p-4 sm:p-5 relative shadow-lg overflow-hidden"
      >
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#7C3AED]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#38BDF8] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md shadow-purple-900/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                <span>Welcome to JOEX AI Studio</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#7C3AED]/30 text-[#38BDF8] border border-[#7C3AED]/40">
                  Quickstart
                </span>
              </h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed max-w-xl">
                Build your executive-ready resume in 3 steps: fill your basic details, refine bullets with the{' '}
                <span className="text-[#38BDF8] font-semibold">AI Assistant</span> dropdown, and check your{' '}
                <span className="text-emerald-400 font-semibold">ATS Health Score</span>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3.5">
                <button
                  onClick={() => onSelectSection('personal')}
                  className="flex items-center gap-2 text-left p-2 rounded-xl bg-black/40 border border-zinc-800 hover:border-purple-500/50 transition-colors text-xs text-zinc-200"
                >
                  <span className="w-5 h-5 rounded-lg bg-purple-950 text-[#7C3AED] flex items-center justify-center font-bold text-[11px]">1</span>
                  <span className="truncate">Fill Info</span>
                </button>
                <button
                  onClick={() => onSelectSection('experience')}
                  className="flex items-center gap-2 text-left p-2 rounded-xl bg-black/40 border border-zinc-800 hover:border-purple-500/50 transition-colors text-xs text-zinc-200"
                >
                  <span className="w-5 h-5 rounded-lg bg-purple-950 text-[#38BDF8] flex items-center justify-center font-bold text-[11px]">2</span>
                  <span className="truncate">AI Enhancements</span>
                </button>
                <button
                  onClick={() => onSelectSection('personal')}
                  className="flex items-center gap-2 text-left p-2 rounded-xl bg-black/40 border border-zinc-800 hover:border-purple-500/50 transition-colors text-xs text-zinc-200"
                >
                  <span className="w-5 h-5 rounded-lg bg-purple-950 text-emerald-400 flex items-center justify-center font-bold text-[11px]">3</span>
                  <span className="truncate">Export PDF</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
