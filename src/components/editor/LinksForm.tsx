'use client';

import React from 'react';
import { CustomLink } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LinksFormProps {
  data: CustomLink[];
  onChange: (updated: CustomLink[]) => void;
}

export const LinksForm: React.FC<LinksFormProps> = ({ data, onChange }) => {
  const handleItemChange = (index: number, field: keyof CustomLink, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem: CustomLink = {
      id: `link-${Date.now()}`,
      label: '',
      url: '',
    };
    onChange([...data, newItem]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <motion.div
          key={item.id || index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 border border-zinc-800 rounded-2xl bg-[#16181D] space-y-3 hover:border-zinc-700 transition-colors"
        >
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              Link #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-zinc-500 hover:text-red-400 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Link Label / Title</label>
              <input
                type="text"
                value={item.label || ''}
                onChange={(e) => handleItemChange(index, 'label', e.target.value)}
                placeholder="e.g. Portfolio, Medium, Dribbble"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Destination URL</label>
              <input
                type="url"
                value={item.url || ''}
                onChange={(e) => handleItemChange(index, 'url', e.target.value)}
                placeholder="https://..."
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="button"
        onClick={handleAdd}
        className="w-full py-3 border border-dashed border-zinc-700 hover:border-[#7C3AED] text-zinc-300 hover:text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all bg-[#16181D]/50 hover:bg-[#16181D] cursor-pointer"
      >
        <Plus className="w-4 h-4 text-[#38BDF8]" />
        <span>Add Custom Link</span>
      </motion.button>
    </div>
  );
};
