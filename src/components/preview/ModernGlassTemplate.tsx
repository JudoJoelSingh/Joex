'use client';

import React from 'react';
import { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from 'lucide-react';

interface ModernGlassTemplateProps {
  data: ResumeData;
}

export const ModernGlassTemplate: React.FC<ModernGlassTemplateProps> = ({ data }) => {
  const {
    personalDetails,
    workExperience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    links = [],
  } = data;

  return (
    <div className="w-full bg-[#111625] text-slate-100 shadow-2xl border border-slate-700/60 rounded-xl p-8 sm:p-12 min-h-[1050px] font-sans antialiased text-sm leading-relaxed relative overflow-hidden print:bg-white print:text-black print:shadow-none print:border-none print:p-0">
      {/* Top Glass Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7C3AED] via-[#38BDF8] to-indigo-500 print:hidden" />

      {/* Header */}
      <header className="border-b border-slate-800 pb-6 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase mb-1">
          {personalDetails.fullName || 'Your Name'}
        </h1>
        {personalDetails.jobTitle && (
          <p className="text-lg font-medium text-sky-400 tracking-wide mb-3">
            {personalDetails.jobTitle}
          </p>
        )}

        {/* Contact Info Badges */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-300">
          {personalDetails.email && (
            <div className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <a href={`mailto:${personalDetails.email}`} className="hover:underline">
                {personalDetails.email}
              </a>
            </div>
          )}
          {personalDetails.phone && (
            <div className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{personalDetails.phone}</span>
            </div>
          )}
          {personalDetails.location && (
            <div className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{personalDetails.location}</span>
            </div>
          )}
          {personalDetails.website && (
            <div className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <a href={personalDetails.website} target="_blank" rel="noreferrer" className="hover:underline">
                {personalDetails.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {personalDetails.linkedin && (
            <div className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700">
              <LinkIcon className="w-3.5 h-3.5 text-sky-400" />
              <a href={personalDetails.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                {personalDetails.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
              </a>
            </div>
          )}
          {personalDetails.github && (
            <div className="flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700">
              <LinkIcon className="w-3.5 h-3.5 text-sky-400" />
              <a href={personalDetails.github} target="_blank" rel="noreferrer" className="hover:underline">
                {personalDetails.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/')}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalDetails.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 mb-2">
            Professional Overview
          </h2>
          <p className="text-slate-200 leading-normal text-xs sm:text-sm whitespace-pre-line">
            {personalDetails.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap justify-between items-baseline mb-0.5">
                  <h3 className="font-semibold text-white text-sm">
                    {exp.position} <span className="font-normal text-sky-300">| {exp.company}</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{' '}
                    {exp.current ? 'Present' : exp.endDate} {exp.location ? `(${exp.location})` : ''}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed pl-1 mt-1">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 mb-3">
            Education & Background
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-wrap justify-between items-baseline">
                  <h3 className="font-semibold text-white text-sm">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  <span className="font-medium text-sky-300">{edu.institution}</span>
                  {edu.location && ` • ${edu.location}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </div>
                {edu.description && (
                  <p className="text-xs text-slate-400 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 mb-3">
            Key Competencies
          </h2>
          <div className="space-y-2 text-xs">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id} className="flex flex-wrap gap-1.5 items-baseline">
                {skillGroup.category && (
                  <span className="font-semibold text-white min-w-[140px]">
                    {skillGroup.category}:
                  </span>
                )}
                <span className="text-slate-200">
                  {Array.isArray(skillGroup.items)
                    ? skillGroup.items.join(' • ')
                    : skillGroup.items}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 mb-3">
            Projects & Work
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-wrap justify-between items-baseline">
                  <h3 className="font-semibold text-white text-sm">
                    {proj.title}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-xs font-normal text-sky-400 hover:underline"
                      >
                        [Link]
                      </a>
                    )}
                  </h3>
                  {(proj.startDate || proj.endDate) && (
                    <span className="text-xs text-slate-400">
                      {proj.startDate} {proj.startDate && proj.endDate ? '–' : ''} {proj.endDate}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <p className="text-xs text-slate-400 italic mb-1">
                    Tech Stack: {proj.technologies}
                  </p>
                )}
                {proj.description && (
                  <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 mb-3">
            Certifications
          </h2>
          <div className="space-y-1.5 text-xs">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-white">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-400"> — {cert.issuer}</span>}
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noreferrer" className="ml-1.5 text-sky-400 hover:underline">
                      (Verify)
                    </a>
                  )}
                </div>
                {cert.date && <span className="text-slate-400">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      {links.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 border-b border-slate-800 pb-1 mb-2">
            Links & Handles
          </h2>
          <div className="flex flex-wrap gap-4 text-xs">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-200 hover:text-white font-medium hover:underline"
              >
                {link.label}: <span className="text-sky-400">{link.url}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
