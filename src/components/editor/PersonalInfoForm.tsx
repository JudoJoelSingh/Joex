'use client';

import React from 'react';
import { PersonalDetails } from '@/lib/types';
import { AiImproveButton } from './AiImproveButton';

interface PersonalInfoFormProps {
  data: PersonalDetails;
  onChange: (updated: PersonalDetails) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name</label>
          <input
            type="text"
            value={data.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g. Alex Morgan"
            className="w-full text-sm bg-[#16181D] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Job Title</label>
          <input
            type="text"
            value={data.jobTitle || ''}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full text-sm bg-[#16181D] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Address</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="alex@example.com"
            className="w-full text-sm bg-[#16181D] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Phone Number</label>
          <input
            type="text"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 234-5678"
            className="w-full text-sm bg-[#16181D] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Location</label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full text-sm bg-[#16181D] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">Personal Portfolio / Website</label>
          <input
            type="url"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://alexmorgan.dev"
            className="w-full text-sm bg-[#16181D] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">LinkedIn Profile</label>
          <input
            type="url"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/alexmorgan"
            className="w-full text-sm bg-[#16181D] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">GitHub Profile</label>
          <input
            type="url"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/alexmorgan"
            className="w-full text-sm bg-[#16181D] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-zinc-300">Executive Summary</label>
          <AiImproveButton
            type="summary"
            text={data.summary || ''}
            context={{ jobTitle: data.jobTitle }}
            onApply={(improvedText) => handleChange('summary', improvedText)}
          />
        </div>
        <textarea
          rows={4}
          value={data.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Brief 3-4 sentence overview of your accomplishments, trajectory, and core strengths..."
          className="w-full text-sm bg-[#16181D] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition-all resize-y leading-relaxed"
        />
      </div>
    </div>
  );
};
