'use client';

import React from 'react';
import { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from 'lucide-react';

interface MinimalWhiteTemplateProps {
  data: ResumeData;
}

export const MinimalWhiteTemplate: React.FC<MinimalWhiteTemplateProps> = ({ data }) => {
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
    <div className="w-full bg-white text-slate-900 shadow-xl border border-slate-200 rounded-lg p-8 sm:p-12 min-h-[1050px] font-sans antialiased text-sm leading-relaxed print:shadow-none print:border-none print:p-0">
      {/* Header */}
      <header className="border-b border-slate-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase mb-1">
          {personalDetails.fullName || 'Your Name'}
        </h1>
        {personalDetails.jobTitle && (
          <p className="text-lg font-medium text-slate-700 tracking-wide mb-3">
            {personalDetails.jobTitle}
          </p>
        )}

        {/* Contact info items */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
          {personalDetails.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <a href={`mailto:${personalDetails.email}`} className="hover:underline">
                {personalDetails.email}
              </a>
            </div>
          )}
          {personalDetails.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{personalDetails.phone}</span>
            </div>
          )}
          {personalDetails.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{personalDetails.location}</span>
            </div>
          )}
          {personalDetails.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <a href={personalDetails.website} target="_blank" rel="noreferrer" className="hover:underline">
                {personalDetails.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {personalDetails.linkedin && (
            <div className="flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
              <a href={personalDetails.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                {personalDetails.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
              </a>
            </div>
          )}
          {personalDetails.github && (
            <div className="flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
              <a href={personalDetails.github} target="_blank" rel="noreferrer" className="hover:underline">
                {personalDetails.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/')}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personalDetails.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-normal text-xs sm:text-sm whitespace-pre-line">
            {personalDetails.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap justify-between items-baseline mb-0.5">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {exp.position} <span className="font-normal text-slate-600">| {exp.company}</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{' '}
                    {exp.current ? 'Present' : exp.endDate} {exp.location ? `(${exp.location})` : ''}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed pl-1 mt-1">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-wrap justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-700">
                  <span className="font-medium">{edu.institution}</span>
                  {edu.location && ` • ${edu.location}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </div>
                {edu.description && (
                  <p className="text-xs text-slate-600 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Skills & Competencies
          </h2>
          <div className="space-y-2 text-xs">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id} className="flex flex-wrap gap-1.5 items-baseline">
                {skillGroup.category && (
                  <span className="font-semibold text-slate-900 min-w-[140px]">
                    {skillGroup.category}:
                  </span>
                )}
                <span className="text-slate-700">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-wrap justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {proj.title}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-xs font-normal text-blue-600 hover:underline"
                      >
                        [Link]
                      </a>
                    )}
                  </h3>
                  {(proj.startDate || proj.endDate) && (
                    <span className="text-xs text-slate-500">
                      {proj.startDate} {proj.startDate && proj.endDate ? '–' : ''} {proj.endDate}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <p className="text-xs text-slate-500 italic mb-1">
                    Tech Stack: {proj.technologies}
                  </p>
                )}
                {proj.description && (
                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Certifications
          </h2>
          <div className="space-y-1.5 text-xs">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-slate-900">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noreferrer" className="ml-1.5 text-blue-600 hover:underline">
                      (Verify)
                    </a>
                  )}
                </div>
                {cert.date && <span className="text-slate-500">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional Links */}
      {links.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
            Links & Media
          </h2>
          <div className="flex flex-wrap gap-4 text-xs">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-700 hover:text-slate-900 font-medium hover:underline"
              >
                {link.label}: <span className="text-blue-600">{link.url}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
