'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/lib/types';
import { Download, Printer, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExportPdfButtonProps {
  data: ResumeData;
}

export const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsGenerating(true);
      const { pdf } = await import('@react-pdf/renderer');
      const { PdfDocument } = await import('./PdfDocument');

      const blob = await pdf(<PdfDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const filename = `${(data.personalDetails.fullName || 'Resume').replace(/\s+/g, '_')}_JOEX_AI.pdf`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed, falling back to print:', err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex items-center gap-2 print:hidden">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleDownloadPdf}
        disabled={isGenerating}
        className={`inline-flex items-center gap-2 font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg transition-all duration-200 cursor-pointer ${
          isGenerating
            ? 'ai-shimmer-btn text-white shadow-purple-900/30 cursor-wait'
            : 'bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] hover:from-purple-600 hover:to-sky-400 text-white shadow-purple-900/30'
        }`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Exporting PDF...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => window.print()}
        title="Print"
        className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm px-3 py-2 rounded-xl border border-zinc-700 transition-colors cursor-pointer"
      >
        <Printer className="w-4 h-4" />
        <span className="hidden sm:inline">Print</span>
      </motion.button>
    </div>
  );
};
