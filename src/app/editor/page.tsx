'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/ui/Header';
import { TemplateRenderer } from '@/components/preview/TemplateRenderer';
import { AtsScoreCard } from '@/components/preview/AtsScoreCard';
import { OnboardingBanner } from '@/components/editor/OnboardingBanner';
import { PersonalInfoForm } from '@/components/editor/PersonalInfoForm';
import { WorkExperienceForm } from '@/components/editor/WorkExperienceForm';
import { EducationForm } from '@/components/editor/EducationForm';
import { SkillsForm } from '@/components/editor/SkillsForm';
import { ProjectsForm } from '@/components/editor/ProjectsForm';
import { CertificationsForm } from '@/components/editor/CertificationsForm';
import { LinksForm } from '@/components/editor/LinksForm';
import { initialResumeData } from '@/lib/defaultResume';
import { ResumeData, SectionType, TemplateId } from '@/lib/types';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Link2,
  Eye,
  Edit3,
  Sparkles,
  RotateCcw,
  Sparkle,
} from 'lucide-react';

export default function EditorPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeSection, setActiveSection] = useState<SectionType>('personal');
  const [isSaved, setIsSaved] = useState(true);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');

  // Load saved resume from localStorage on client load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shinex_resume_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.personalDetails) {
          setResumeData(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
  }, []);

  // Autosave sync to API & localStorage
  useEffect(() => {
    setIsSaved(false);
    const timer = setTimeout(async () => {
      try {
        localStorage.setItem('shinex_resume_data', JSON.stringify(resumeData));
        await fetch('/api/resumes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(resumeData),
        });
        setIsSaved(true);
      } catch (err) {
        console.warn('Autosave sync failed:', err);
        setIsSaved(true);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [resumeData]);

  const handleTemplateChange = (templateId: TemplateId) => {
    setResumeData((prev) => ({ ...prev, templateId }));
  };

  const handleLoadDemoData = () => {
    setResumeData(initialResumeData);
  };

  const handleResetData = () => {
    setResumeData({
      id: `resume-${Date.now()}`,
      title: 'My Clean Resume',
      templateId: 'minimal-white',
      personalDetails: { fullName: '', jobTitle: '', email: '', phone: '', location: '', summary: '' },
      workExperience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      links: [],
    });
  };

  const sections: { id: SectionType; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Work Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Wrench className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
    { id: 'links', label: 'Links', icon: <Link2 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 flex flex-col font-sans selection:bg-[#7C3AED] selection:text-white">
      <Header
        resumeData={resumeData}
        onTemplateChange={handleTemplateChange}
        isSaved={isSaved}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-zinc-800 bg-[#111214] px-4 py-2 print:hidden">
        <button
          onClick={() => setMobileTab('edit')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-colors ${
            mobileTab === 'edit'
              ? 'bg-[#7C3AED] text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Edit3 className="w-4 h-4" /> Studio Editor
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-colors ${
            mobileTab === 'preview'
              ? 'bg-[#7C3AED] text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Eye className="w-4 h-4" /> Live Preview
        </button>
      </div>

      {/* Workspace Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 print:block print:p-0">
        {/* Left Column: Studio Form Editor */}
        <div
          className={`lg:col-span-6 xl:col-span-5 flex flex-col bg-[#111214] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl ${
            mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
          } print:hidden`}
        >
          {/* Resume Title Header Input & Quick Actions */}
          <div className="p-3.5 border-b border-zinc-800 bg-[#16181D]/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <input
                type="text"
                value={resumeData.title || ''}
                onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                placeholder="Resume Document Title..."
                className="bg-transparent text-sm font-semibold text-white placeholder-zinc-500 outline-none w-full focus:ring-1 focus:ring-[#7C3AED] rounded px-2 py-1"
              />
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleLoadDemoData}
                title="Load Sample Executive Resume Data"
                className="text-[11px] font-medium text-zinc-400 hover:text-[#38BDF8] bg-zinc-800/60 hover:bg-zinc-800 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                <Sparkle className="w-3 h-3 text-[#38BDF8]" />
                <span>Demo Data</span>
              </button>
              <button
                onClick={handleResetData}
                title="Clear All Fields"
                className="text-[11px] font-medium text-zinc-400 hover:text-rose-400 bg-zinc-800/60 hover:bg-zinc-800 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Section Navigation Pills */}
          <div className="flex overflow-x-auto border-b border-zinc-800/80 bg-[#0E0F12] p-2 gap-1.5 scrollbar-none">
            {sections.map((sec) => (
              <motion.button
                key={sec.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-gradient-to-r from-[#7C3AED] to-purple-600 text-white shadow-lg shadow-purple-900/40'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {sec.icon}
                <span>{sec.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Animated Section Form Pane */}
          <div className="flex-1 p-5 overflow-y-auto max-h-[calc(100vh-220px)] text-zinc-200">
            <OnboardingBanner onSelectSection={(sec) => setActiveSection(sec)} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {activeSection === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personalDetails}
                    onChange={(updated) =>
                      setResumeData({ ...resumeData, personalDetails: updated })
                    }
                  />
                )}

                {activeSection === 'experience' && (
                  <WorkExperienceForm
                    data={resumeData.workExperience}
                    jobTitle={resumeData.personalDetails.jobTitle}
                    onChange={(updated) =>
                      setResumeData({ ...resumeData, workExperience: updated })
                    }
                  />
                )}

                {activeSection === 'education' && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(updated) => setResumeData({ ...resumeData, education: updated })}
                  />
                )}

                {activeSection === 'skills' && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(updated) => setResumeData({ ...resumeData, skills: updated })}
                  />
                )}

                {activeSection === 'projects' && (
                  <ProjectsForm
                    data={resumeData.projects}
                    onChange={(updated) => setResumeData({ ...resumeData, projects: updated })}
                  />
                )}

                {activeSection === 'certifications' && (
                  <CertificationsForm
                    data={resumeData.certifications}
                    onChange={(updated) =>
                      setResumeData({ ...resumeData, certifications: updated })
                    }
                  />
                )}

                {activeSection === 'links' && (
                  <LinksForm
                    data={resumeData.links}
                    onChange={(updated) => setResumeData({ ...resumeData, links: updated })}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Real-Time Live Preview Pane */}
        <div
          className={`lg:col-span-6 xl:col-span-7 flex flex-col ${
            mobileTab === 'edit' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* ATS Health Scanner Card */}
          <AtsScoreCard resumeData={resumeData} />

          <div className="flex items-center justify-between mb-2.5 text-xs font-semibold text-zinc-400 print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse"></span>
              <span className="text-zinc-200">Real-Time Studio Preview</span>
            </div>
            <span className="text-zinc-500 capitalize">
              Active: {resumeData.templateId || 'minimal-white'}
            </span>
          </div>

          {/* Rendered Template Document */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-270px)] rounded-2xl border border-zinc-800/80 shadow-2xl p-1 bg-zinc-950 scrollbar-thin scrollbar-thumb-zinc-800 print:max-h-none print:overflow-visible print:border-none print:p-0">
            <TemplateRenderer data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
