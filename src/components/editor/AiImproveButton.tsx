'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, TrendingUp, FileText, ChevronDown } from 'lucide-react';
import { AiActionType } from '@/lib/types';

interface AiImproveButtonProps {
  type: 'summary' | 'experience' | 'project' | 'skills';
  text: string;
  context?: { jobTitle?: string; company?: string; position?: string };
  onApply: (enhancedText: string) => void;
  label?: string;
}

export const AiImproveButton: React.FC<AiImproveButtonProps> = ({
  type,
  text,
  context,
  onApply,
  label = 'AI Assistant',
}) => {
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTriggerAction = async (actionType: AiActionType) => {
    setMenuOpen(false);
    try {
      setLoading(true);
      const response = await fetch('/api/ai/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          actionType,
          text,
          jobTitle: context?.jobTitle,
          company: context?.company,
          position: context?.position,
        }),
      });

      const data = await response.json();
      if (data.result) {
        onApply(data.result);
      }
    } catch (err) {
      console.error('AI improvement failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {loading ? (
        /* Cinematic glowing pulsing button during loading */
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white px-3 py-1.5 rounded-lg shadow-lg ai-shimmer-btn cursor-wait"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin text-[#38BDF8]" />
          <span className="tracking-wide">AI Crafting...</span>
        </motion.div>
      ) : (
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-purple-600 to-[#38BDF8] hover:from-purple-600 hover:to-sky-400 px-3 py-1.5 rounded-lg shadow-md shadow-purple-900/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-200" />
            <span>{label}</span>
            <ChevronDown className="w-3 h-3 text-sky-200" />
          </motion.button>
        </div>
      )}

      {/* Action Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-[#16181D] border border-zinc-700 shadow-2xl z-50 overflow-hidden py-1"
          >
            <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
              Select AI Action
            </div>

            <button
              type="button"
              onClick={() => handleTriggerAction('rewrite')}
              className="w-full text-left px-3 py-2 text-xs text-zinc-200 hover:bg-[#7C3AED]/20 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Rewrite Bullet Points</span>
            </button>

            <button
              type="button"
              onClick={() => handleTriggerAction('quantify')}
              className="w-full text-left px-3 py-2 text-xs text-zinc-200 hover:bg-[#7C3AED]/20 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Quantify Metrics</span>
            </button>

            <button
              type="button"
              onClick={() => handleTriggerAction('wording')}
              className="w-full text-left px-3 py-2 text-xs text-zinc-200 hover:bg-[#7C3AED]/20 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Enhance Executive Wording</span>
            </button>

            <button
              type="button"
              onClick={() => handleTriggerAction('summary')}
              className="w-full text-left px-3 py-2 text-xs text-zinc-200 hover:bg-[#7C3AED]/20 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Polished Summary</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
