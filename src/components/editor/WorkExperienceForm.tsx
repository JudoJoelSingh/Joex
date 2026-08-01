'use client';

import React from 'react';
import { WorkExperience } from '@/lib/types';
import { AiImproveButton } from './AiImproveButton';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (updated: WorkExperience[]) => void;
  jobTitle?: string;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  data,
  onChange,
  jobTitle,
}) => {
  const handleItemChange = (index: number, field: keyof WorkExperience, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newItem]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {data.map((item, index) => (
        <motion.div
          key={item.id || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 border border-zinc-800 rounded-2xl bg-[#16181D] space-y-4 relative hover:border-zinc-700 transition-colors"
        >
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              Experience #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-zinc-500 hover:text-red-400 transition-colors p-1"
              title="Remove entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Position / Role</label>
              <input
                type="text"
                value={item.position || ''}
                onChange={(e) => handleItemChange(index, 'position', e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Company Name</label>
              <input
                type="text"
                value={item.company || ''}
                onChange={(e) => handleItemChange(index, 'company', e.target.value)}
                placeholder="e.g. TechFlow Inc."
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Location</label>
              <input
                type="text"
                value={item.location || ''}
                onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Start Date</label>
                <input
                  type="text"
                  value={item.startDate || ''}
                  onChange={(e) => handleItemChange(index, 'startDate', e.target.value)}
                  placeholder="e.g. 2021-03"
                  className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">End Date</label>
                <input
                  type="text"
                  disabled={item.current}
                  value={item.current ? 'Present' : item.endDate || ''}
                  onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                  placeholder="e.g. 2023-08"
                  className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none disabled:opacity-40"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id={`current-${item.id}`}
              checked={item.current || false}
              onChange={(e) => handleItemChange(index, 'current', e.target.checked)}
              className="rounded border-zinc-700 bg-zinc-900 text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <label htmlFor={`current-${item.id}`} className="text-xs text-zinc-300 font-medium">
              I currently work here
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-zinc-300">
                Responsibilities & Achievements (Bullet Points)
              </label>
              <AiImproveButton
                type="experience"
                text={item.description || ''}
                context={{ jobTitle, company: item.company, position: item.position }}
                onApply={(improved) => handleItemChange(index, 'description', improved)}
              />
            </div>
            <textarea
              rows={4}
              value={item.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              placeholder="• Architected microservice architecture reducing API latency by 35%..."
              className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none resize-y"
            />
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
        <span>Add Work Experience</span>
      </motion.button>
    </div>
  );
};
