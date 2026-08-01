export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface CustomLink {
  id: string;
  label: string;
  url: string;
}

export type TemplateId = 'minimal-white' | 'elite-black' | 'modern-glass';

export interface ResumeData {
  id: string;
  title: string;
  templateId: TemplateId;
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  links: CustomLink[];
  updatedAt?: string;
}

export type SectionType = 
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'links';

export type AiActionType = 'rewrite' | 'summary' | 'wording' | 'quantify';
