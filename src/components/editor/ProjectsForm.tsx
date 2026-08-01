'use client';

import React from 'react';
import { Project } from '@/lib/types';
import { AiImproveButton } from './AiImproveButton';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectsFormProps {
  data: Project[];
  onChange: (updated: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const handleItemChange = (index: number, field: keyof Project, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: '',
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
              Project #{index + 1}
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
              <label className="block text-xs font-medium text-zinc-300 mb-1">Project Title</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                placeholder="e.g. DevPulse Analytics Engine"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Technologies Used</label>
              <input
                type="text"
                value={item.technologies || ''}
                onChange={(e) => handleItemChange(index, 'technologies', e.target.value)}
                placeholder="Next.js, Node.js, Redis, Tailwind"
                className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Project URL / GitHub</label>
              <input
                type="url"
                value={item.link || ''}
                onChange={(e) => handleItemChange(index, 'link', e.target.value)}
                placeholder="https://github.com/username/project"
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
                  placeholder="e.g. 2023-01"
                  className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">End Date</label>
                <input
                  type="text"
                  value={item.endDate || ''}
                  onChange={(e) => handleItemChange(index, 'endDate', e.target.value)}
                  placeholder="e.g. 2023-06"
                  className="w-full text-sm bg-[#0E0F12] border border-zinc-700/80 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-zinc-300">
                Description & Key Results
              </label>
              <AiImproveButton
                type="project"
                text={item.description || ''}
                onApply={(improved) => handleItemChange(index, 'description', improved)}
              />
            </div>
            <textarea
              rows={3}
              value={item.description || ''}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              placeholder="Built an open-source dashboard reaching 1,000+ monthly active users..."
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
        <span>Add Project</span>
      </motion.button>
    </div>
  );
};
