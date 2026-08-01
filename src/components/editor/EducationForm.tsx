'use client';

import React from 'react';
import { Education } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationFormProps {
  data: Education[];
  onChange: (updated: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const handleItemChange = (index: number, field: keyof Education, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
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
          className="p-5 border border-zinc-800 rounded-2xl bg-[#16181D] space-y-4 hover:border-zinc-700 transition-colors"
        >
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              Education #{index + 1}
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
              <label className="block text-xs font-medium text-zinc-300 mb-1">Institution / University</label>
              <input
                type="text"
                value={item.institution || ''}
                onChange={(e) => handleItemChange(index, 'institution', e.target.value)}
                placeholder="e.g. UC Berkeley"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Degree</label>
              <input
                type="text"
                value={item.degree || ''}
                onChange={(e) => handleItemChange(index, 'degree', e.target.value)}
                placeholder="e.g. Bachelor of Science"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Field of Study / Major</label>
              <input
                type="text"
                value={item.fieldOfStudy || ''}
                onChange={(e) => handleItemChange(index, 'fieldOfStudy', e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Location</label>
              <input
                type="text"
                value={item.location || ''}
                onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                placeholder="e.g. Berkeley, CA"
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
                  placeholder="e.g. 2017-08"
                  className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">End Date</label>
                <input
                  type="text"
                  value={item.endDate || ''}
                  onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                  placeholder="e.g. 2021-05"
                  className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">GPA (Optional)</label>
              <input
                type="text"
                value={item.gpa || ''}
                onChange={(e) => handleItemChange(index, 'gpa', e.target.value)}
                placeholder="e.g. 3.8 / 4.0"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Honors / Key Coursework (Optional)
            </label>
            <input
              type="text"
              value={item.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              placeholder="e.g. Dean's List, Algorithms, Distributed Systems"
              className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
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
        <span>Add Education</span>
      </motion.button>
    </div>
  );
};
