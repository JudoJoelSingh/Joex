'use client';

import React from 'react';
import { SkillGroup } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillsFormProps {
  data: SkillGroup[];
  onChange: (updated: SkillGroup[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const handleCategoryChange = (index: number, category: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], category };
    onChange(updated);
  };

  const handleItemsChange = (index: number, itemsString: string) => {
    const updated = [...data];
    const itemsArray = itemsString.split(',').map((s) => s.trim()).filter(Boolean);
    updated[index] = { ...updated[index], items: itemsArray };
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem: SkillGroup = {
      id: `skill-${Date.now()}`,
      category: '',
      items: [],
    };
    onChange([...data, newItem]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {data.map((group, index) => (
        <motion.div
          key={group.id || index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 border border-zinc-800 rounded-2xl bg-[#16181D] space-y-3 hover:border-zinc-700 transition-colors"
        >
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              Skill Group #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-zinc-500 hover:text-red-400 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Category Name</label>
              <input
                type="text"
                value={group.category || ''}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                placeholder="e.g. Languages"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Skills <span className="text-zinc-500">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={Array.isArray(group.items) ? group.items.join(', ') : group.items || ''}
                onChange={(e) => handleItemsChange(index, e.target.value)}
                placeholder="TypeScript, React, Node.js, Python, Docker"
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
        <span>Add Skill Category</span>
      </motion.button>
    </div>
  );
};
